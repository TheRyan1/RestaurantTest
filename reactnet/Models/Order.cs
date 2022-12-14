using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace reactnet.Models;

public class Order
{
	[Key] public int Id { get; set; }
	public string? Description { get; set; }

	[ForeignKey("ReservationID")] public virtual Reservation? Reservation { get; set; }
	public int? ReservationID { get; set; }

	[ForeignKey("MealID")] public virtual Meal? Meal { get; set; }
	public int? MealID { get; set; }
}