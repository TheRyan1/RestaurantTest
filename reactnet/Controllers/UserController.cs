using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using reactnet.Data;
using reactnet.Models;
using reactnet.Models.APIModels;

namespace reactnet.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly ApplicationDbContext db;
    private readonly UserManager<ApplicationUser> userManager;
    private readonly RoleManager<IdentityRole> roleManager;
    private readonly IConfiguration config;


    public UserController(RoleManager<IdentityRole> roleManager, ApplicationDbContext applicationDb,
        UserManager<ApplicationUser> userManager, IConfiguration configuration)
    {
        db = applicationDb;
        this.userManager = userManager;
        config = configuration;
        this.roleManager = roleManager;
    }

    /// <summary>
    /// Get Logged In User Information
    /// </summary>
    /// <returns></returns>
    [HttpGet("currentUser")]
    public async Task<IActionResult> Get()
    {
        try
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var currentUser = await db.Users
                .Join(db.UserRoles,
                    u => u.Id,
                    ur => ur.UserId,
                    (u, ur) => new
                    {
                        user = u,
                        userRoles = ur
                    })
                .Join(db.Roles,
                    ur => ur.userRoles.RoleId,
                    r => r.Id,
                    (ur, r) => new
                    {
                        user = ur.user,
                        role = r
                    })
                .FirstOrDefaultAsync(x => x.user.Id == userId);
            ;

            if (currentUser == null) return NotFound(new { message = "User not found" });

            var Result = new UserModel(currentUser.user);
            Result.Role = currentUser.role.Name;

            return StatusCode(200, Result);
        }
        catch (Exception e)
        {
            return StatusCode(500, new { message = e.Message });
        }
    }


    /// <summary>
    /// Gets All the users for the admin
    /// </summary>
    /// <returns></returns>
    [Authorize(Roles = "Admin")]
    [HttpGet("all")]
    public async Task<IActionResult> GetAll()
    {
        try
        {
            var result = await db.Users
                .Join(db.UserRoles,
                    u => u.Id,
                    ur => ur.UserId,
                    (u, ur) => new
                    {
                        user = u,
                        userRoles = ur
                    })
                .Join(db.Roles,
                    ur => ur.userRoles.RoleId,
                    r => r.Id,
                    (ur, r) => new
                    {
                        user = ur.user,
                        role = r
                    }).ToListAsync();
            var userList = new List<UserModel>();
            foreach (var user in result)
                userList.Add(new UserModel()
                {
                    Email = user.user.Email,
                    FirstName = user.user.Name,
                    LastName = user.user.Surname,
                    Id = user.user.Id,
                    IsActive = user.user.IsActive,
                    Role = user.role.Name,
                    Username = user.user.UserName
                });
            return StatusCode(200, userList);
        }
        catch (Exception e)
        {
            return StatusCode(500, e.Message);
        }
    }


    /// <summary>
    /// New User
    /// </summary>
    /// <param name="value"></param>
    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<IActionResult> Post([FromBody] UserModel model)
    {
        var hasher = new PasswordHasher<ApplicationUser>();

        var existingUser = db.Users.FirstOrDefault(x => x.Id == model.Id);
        if (existingUser != null)
        {
            existingUser.UserName = model.Username;
            existingUser.Name = model.FirstName;
            existingUser.Surname = model.LastName;
            existingUser.PasswordHash = hasher.HashPassword(null, model.Password);

            await db.SaveChangesAsync();
            return StatusCode(200, "success");
        }


        try
        {
            var currentUser = new ApplicationUser
            {
                //  Id = new Guid().ToString(),
                Name = model.FirstName,
                Surname = model.LastName,
                UserName = model.Email,
                NormalizedUserName = model.FirstName.ToLower(),
                Email = model.Email,
                LoginEmail = model.Email,
                NormalizedEmail = model.Email.ToUpper(),
                EmailConfirmed = true,
                PasswordHash = hasher.HashPassword(null, model.Password),
                PasswordResetToken = new Guid().ToString(),
                SecurityStamp = new Guid().ToString(),
                DateTimeCreated = DateTime.Now,
                DateTimeActivated = DateTime.Now,
                AccessFailedCount = 0,
                IsActive = true,
                LockoutEnabled = false,
                TwoFactorEnabled = false
            };

            var userResult = await userManager.CreateAsync(currentUser);

            // Add Role if user created
            if (userResult.Succeeded)
            {
                var roleResult = await userManager.AddToRoleAsync(currentUser, "Standard");

                if (!roleResult.Succeeded)
                    return StatusCode(500,
                        new ResultModel() { Message = roleResult.Errors.FirstOrDefault().Description });

                var user = await db.Users.Where(x => x.Email == model.Email).FirstOrDefaultAsync();


                // TODO : Implement Email sending
            }
            else
            {
                return StatusCode(500, new ResultModel() { Message = userResult.Errors.FirstOrDefault().Description });
            }

            return StatusCode(200, new ResultModel() { Message = "Success" });
        }
        catch (Exception e)
        {
            return StatusCode(500, e.Message);
        }
    }
}