using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace reactnet.Models
{
    public class Meal
    {
        [Key]
        public int Id {get;set;}
        public string? Name {get;set;}
        public string? Main {get;set;}
        public string? Drink {get;set;}
        public string? Description {get;set;}

        [ForeignKey("RestaurantID")]
        public virtual Restaurant? Restaurant {get;set;}
        public int? RestaurantID {get;set;}
       
        
        
    }
}