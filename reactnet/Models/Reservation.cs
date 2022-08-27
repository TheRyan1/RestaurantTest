using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using reactnet.Enums;

namespace reactnet.Models;

public class Reservation
{
	[Key] public int Id { get; set; }
	public DateTime StartDateTime { get; set; }
	public string? Description { get; set; }
	public ReservationStatus ReservationsStatusEnum { get; set; }

	[ForeignKey("RestaurantID")] public virtual Restaurant? Restaurant { get; set; }
	public int? RestaurantID { get; set; }

	public virtual List<Order>? Orders { get; set; }
}