using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using reactnet.Data;
using reactnet.Models;
using reactnet.Models.APIModels;

namespace reactnet.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthorizationController : ControllerBase
{
    private readonly IConfiguration config;
    private readonly ApplicationDbContext db;
    private readonly UserManager<ApplicationUser> userManager;

    public AuthorizationController(IConfiguration configuration, ApplicationDbContext applicationDb,
        UserManager<ApplicationUser> userManager)
    {
        config = configuration;
        db = applicationDb;
        this.userManager = userManager;
    }

    /// <summary>
    ///     Login User and return JWT Token
    /// </summary>
    /// <param name="loginInfo"></param>
    /// <returns></returns>
    [AllowAnonymous]
    [HttpPost]
    [Route("login")]
    public IActionResult Login([FromBody] LoginModel loginInfo)
    {
        try
        {
            // Find given user

            var currentUser = db.Users.FirstOrDefault(x => x.Email.ToLower() == loginInfo.Email.ToLower());
            if (currentUser == null)
                // User not found
                return StatusCode(200, "User not found");
            // If login credentials are false, return invalid, else return token

            return userManager.CheckPasswordAsync(currentUser, loginInfo.Password).Result == false
                ? StatusCode(401, "Invalid Details")
                : StatusCode(200, new { token = GenerateJsonWebToken(currentUser) });
        }
        catch (Exception e)
        {
            return StatusCode(500, e.Message);
        }
    }

    /// <summary>
    ///     Generate JWT token for given User
    /// </summary>
    /// <param name="user"></param>
    /// <returns></returns>
    private string GenerateJsonWebToken(ApplicationUser user)
    {
        // Implement secure key

        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config.GetValue<string>("Jwt:Key")));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        // Add user claim

        var authClaims = new List<Claim>
        {
            new(ClaimTypes.Name, user.UserName),
            new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new(ClaimTypes.NameIdentifier, user.Id)
        };

        // Add role Claim

        var userRoles = userManager.GetRolesAsync(user).Result;
        authClaims.AddRange(userRoles.Select(userRole => new Claim(ClaimTypes.Role, userRole)));

        // Generate Token

        var token = new JwtSecurityToken(
            config.GetValue<string>("Jwt:Issuer"),
            config.GetValue<string>("Jwt:Issuer"),
            expires: DateTime.Now.AddHours(10),
            claims: authClaims,
            signingCredentials: credentials);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}