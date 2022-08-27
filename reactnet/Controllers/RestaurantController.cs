using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using reactnet.Data;
using Microsoft.AspNetCore.Mvc;
using reactnet.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using reactnet.Models.APIModels;
using reactnet.Helpers;

namespace reactnet.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RestaurantController : ControllerBase
{
    private readonly ApplicationDbContext _dbContenxt;


    public RestaurantController(ApplicationDbContext dbContext)
    {
        _dbContenxt = dbContext;
    }

    /// <summary>
    /// Returns all the restaurants for the loggedin user
    /// </summary>
    /// <returns></returns>
    [Authorize]
    [HttpGet]
    public async Task<ActionResult<List<Restaurant>>> Get()
    {
        // Get User
        var user = ControllerHelpers.GetUser(User, _dbContenxt);

        // Return all the restuarants if the admin is requesting
        if (user.Role == UserRoleConstants.ADMIN)
            return await _dbContenxt.Restuarant.Include(x => x.Meals).Include(x => x.Reservations).ToListAsync();
        // Return only the restuarants for the user
        return await _dbContenxt.Restuarant.Where(x => x.UserID == user.Id).Include(x => x.Reservations)
            .Include(x => x.Meals).ToListAsync();
    }

    /// <summary>
    /// Creates or updates a restuarant 
    /// </summary>
    /// <returns></returns>
    [Authorize]
    [HttpPost]
    public async Task<IActionResult> Post([FromBody] Restaurant data)
    {
        try
        {
            // Get the requesting user
            var user = ControllerHelpers.GetUser(User, _dbContenxt);


            // Check if it's an updating item
            var existingRestaurant = await _dbContenxt.Restuarant.FirstOrDefaultAsync(x => x.Id == data.Id);

            if (existingRestaurant != null)
            {
                existingRestaurant.Name = data.Name;
                existingRestaurant.IsActive = data.IsActive;
                await _dbContenxt.SaveChangesAsync();
                return StatusCode(200, "Success");
            }

            var newRes = new Restaurant()
            {
                UserID = user.Id,
                Name = data.Name,
                IsActive = true
            };

            await _dbContenxt.Restuarant.AddAsync(newRes);
            await _dbContenxt.SaveChangesAsync();
            return StatusCode(200, "Success");
        }
        catch (Exception e)
        {
            return StatusCode(200, e.Message);
        }
    }
}