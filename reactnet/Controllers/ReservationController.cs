using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using reactnet.Data;
using reactnet.Helpers;
using reactnet.Models;

namespace reactnet.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ReservationController : ControllerBase
{
	private readonly ApplicationDbContext _dbContenxt;

	public ReservationController(ApplicationDbContext dbContext)
	{
		_dbContenxt = dbContext;
	}

	/// <summary>
	///     Gets the reservation for a specific or all restaurants
	/// </summary>
	/// <param></param>
	/// <returns></returns>
	[Authorize]
	[HttpGet("{id}/{reservationID}")]
	public async Task<List<Reservation>> Get(int id, int reservationID)
	{
		// Get the logged in user
		var user = ControllerHelpers.GetUser(User, _dbContenxt);

		// Return everything if the admin is logged in

		if (user.Role == UserRoleConstants.ADMIN)
		{
			if (reservationID != 0)
				return await _dbContenxt.Reservation.Where(x => x.Id == reservationID).ToListAsync();
			return id != 0
				? await _dbContenxt.Reservation.Where(x => x.RestaurantID == id).Include(x => x.Restaurant)
					.Include(x => x.Orders).ToListAsync()
				: await _dbContenxt.Reservation.Include(x => x.Restaurant).Include(x => x.Orders).ToListAsync();
		}

		//Handle for a regular user 

		if (reservationID != 0) return await _dbContenxt.Reservation.Where(x => x.Id == reservationID).ToListAsync();
		return id != 0
			? await _dbContenxt.Reservation.Where(x => x.RestaurantID == id).Include(x => x.Restaurant)
				.Include(x => x.Orders).ToListAsync()
			: await _dbContenxt.Reservation.Where(x => x.Restaurant.UserID == user.Id).Include(x => x.Restaurant)
				.Include(x => x.Orders).ToListAsync();
	}

	/// <summary>
	///     Creates or updates a reservation
	/// </summary>
	/// <returns></returns>
	[Authorize]
	[HttpPost]
	public async Task<IActionResult> Post([FromBody] Reservation data)
	{
		try
		{
			// Check if it's an updating item
			var existingReservation = await _dbContenxt.Reservation.FirstOrDefaultAsync(x => x.Id == data.Id);

			if (existingReservation != null)
			{
				existingReservation.Description = data.Description;
				existingReservation.ReservationsStatusEnum = data.ReservationsStatusEnum;
				existingReservation.StartDateTime = data.StartDateTime;
				await _dbContenxt.SaveChangesAsync();
				return StatusCode(200, "Success");
			}

			var newReservation = new Reservation
			{
				RestaurantID = data.RestaurantID,
				Description = data.Description,
				ReservationsStatusEnum = data.ReservationsStatusEnum,
				StartDateTime = data.StartDateTime
			};

			await _dbContenxt.Reservation.AddAsync(newReservation);
			await _dbContenxt.SaveChangesAsync();
			return StatusCode(200, "Success");
		}
		catch (Exception e)
		{
			return StatusCode(200, e.Message);
		}
	}

	public string GetUserID()
	{
		return User.FindFirstValue(ClaimTypes.NameIdentifier);
	}
}