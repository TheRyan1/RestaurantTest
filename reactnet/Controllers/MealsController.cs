using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using reactnet.Data;
using reactnet.Helpers;
using reactnet.Models;

namespace reactnet.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MealsController : ControllerBase
{
    private readonly ApplicationDbContext _dbContenxt;

    public MealsController(ApplicationDbContext dbContext)
    {
        _dbContenxt = dbContext;
    }

    /// <summary>
    ///     Gets the meals for a specific or all restaurants
    /// </summary>
    /// <param></param>
    /// <returns></returns>
    [Authorize]
    [HttpGet("{id}")]
    public async Task<List<Meal>> Get(int id)
    {
        // Get the logged in user
        var user = ControllerHelpers.GetUser(User, _dbContenxt);

        // Return all for the admin
        if (user.Role == UserRoleConstants.ADMIN)
            return id != 0
                ? await _dbContenxt.Meal.Where(x => x.RestaurantID == id).Include(x => x.Restaurant).ToListAsync()
                : await _dbContenxt.Meal.Include(x => x.Restaurant).ToListAsync();

        //If the ID is 0, no specific restaurant was selected so return them all

        return id != 0
            ? await _dbContenxt.Meal.Where(x => x.RestaurantID == id && x.Restaurant.UserID == user.Id)
                .Include(x => x.Restaurant).ToListAsync()
            : await _dbContenxt.Meal.Where(x => x.Restaurant.UserID == user.Id).Include(x => x.Restaurant)
                .ToListAsync();
    }

    /// <summary>
    ///     Creates or updates a meal
    /// </summary>
    /// <param name="user"></param>
    /// <returns></returns>
    [Authorize]
    [HttpPost]
    public async Task<IActionResult> Post([FromBody] Meal data)
    {
        try
        {
            // Check if it's an updating item

            var existingMeal = await _dbContenxt.Meal.FirstOrDefaultAsync(x => x.Id == data.Id);

            // If a meal exists, then it is going to update

            if (existingMeal != null)
            {
                existingMeal.Description = data.Description;
                existingMeal.Drink = data.Drink;
                existingMeal.Main = data.Main;
                existingMeal.Name = data.Name;

                await _dbContenxt.SaveChangesAsync();
                return StatusCode(200, "Success");
            }

            // Create a new meal

            var newMeal = new Meal
            {
                RestaurantID = data.RestaurantID,
                Description = data.Description,
                Name = data.Name,
                Main = data.Main,
                Drink = data.Drink
            };

            await _dbContenxt.Meal.AddAsync(newMeal);
            await _dbContenxt.SaveChangesAsync();
            return StatusCode(200, "Success");
        }
        catch (Exception e)
        {
            return StatusCode(500, e.Message);
        }
    }
}