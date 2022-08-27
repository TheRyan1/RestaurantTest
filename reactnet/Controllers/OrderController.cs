using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using reactnet.Models;
using reactnet.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace reactnet.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContenxt;
        public OrderController(ApplicationDbContext dbContext) => _dbContenxt = dbContext;

        /// <summary>
        /// Gets the order for a specific or all orders 
        /// </summary>
        /// <param></param>
        /// <returns></returns>
        [Authorize]
        [HttpGet("{id}/{reservationID}")]
        public async Task<List<Order>> Get(int id, int reservationID)
        {
            // If no reservation ID, return all the orders

            if (reservationID != 0)
            {
                return await _dbContenxt.Order
                .Where(x => x.Reservation.Id == reservationID)
                .Include(x => x.Meal)
                .ToListAsync();
            }

            return id != 0 ?
            await _dbContenxt.Order
            .Where(x => x.ReservationID == id)
            .Include(x => x.Reservation)
            .Include(x => x.Meal)
            .Include(x => x.Reservation.Restaurant)
            .ToListAsync() :
            await _dbContenxt.Order
            .Include(x => x.Reservation)
            .ThenInclude(x => x.Restaurant)
            .ToListAsync();
        }

        /// <summary>
        /// Creates or updates an order
        /// </summary>
        /// <param></param>
        /// <returns></returns>
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Order data)
        {
            try
            {
                // Check if it's an updating item

                var existingOrder = await _dbContenxt.Order.FirstOrDefaultAsync(x => x.Id == data.Id);

                if (existingOrder != null)
                {
                    existingOrder.MealID = data.MealID;
                    existingOrder.Description = data.Description;
                    await _dbContenxt.SaveChangesAsync();
                    return StatusCode(200, "Success");
                }

                var newOrder = new Order()
                {
                    MealID = data.MealID,
                    ReservationID = data.ReservationID,
                    Description = data.Description
                };

                await _dbContenxt.Order.AddAsync(newOrder);
                await _dbContenxt.SaveChangesAsync();
                return StatusCode(200, "Success");
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }


        }
    }
}