using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace reactnet.Models;

public class ApplicationUser : IdentityUser
{
    /// <summary>
    /// User Name
    /// </summary>
    [Required]
    public string Name { get; set; }

    /// <summary>
    /// User Surname
    /// </summary>
    [Required]
    public string Surname { get; set; }

    /// <summary>
    /// User Email
    /// </summary>
    [Required]
    public string LoginEmail { get; set; }

    /// <summary>
    /// Token to reset user password
    /// </summary>
    [DefaultValue("")]
    public string PasswordResetToken { get; set; }

    /// <summary>
    /// Is user active
    /// </summary>
    [DefaultValue(true)]
    public bool IsActive { get; set; }

    /// <summary>
    /// Date and time created
    /// </summary>
    public DateTime DateTimeCreated { get; set; }

    /// <summary>
    /// Date and time activated
    /// </summary>
    public DateTime? DateTimeActivated { get; set; }
}