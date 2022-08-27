using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace reactnet.Models;

public class Restaurant
{
    [Key] public int Id { get; set; }

    public string? Name { get; set; }
    public bool IsActive { get; set; }

    [ForeignKey("UserID")] public virtual ApplicationUser? User { get; set; }
    public string? UserID { get; set; }
    public virtual List<Order>? Orders { get; set; }
    public virtual List<Meal>? Meals { get; set; }

    public virtual List<Reservation>? Reservations { get; set; }
}