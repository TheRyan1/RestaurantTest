using System.Security.Claims;
using reactnet.Data;
using reactnet.Models.APIModels;

namespace reactnet.Helpers;

public class ControllerHelpers
{
    /// <summary>
    ///     Returns the currently logged in user
    /// </summary>
    /// <param></param>
    /// <returns></returns>
    public static UserModel GetUser(ClaimsPrincipal User, ApplicationDbContext _dbContenxt)
    {
        // Get the UserID
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        // Get the details of the user
        var currentUser = _dbContenxt.Users
            .Join(_dbContenxt.UserRoles,
                u => u.Id,
                ur => ur.UserId,
                (u, ur) => new
                {
                    user = u,
                    userRoles = ur
                })
            .Join(_dbContenxt.Roles,
                ur => ur.userRoles.RoleId,
                r => r.Id,
                (ur, r) => new
                {
                    ur.user,
                    role = r
                })
            .FirstOrDefault(x => x.user.Id == userId);

        // If the user is null
        if (currentUser == null)
            // return empty user
            return new UserModel();

        // Load the user into the model to be sent back to the requesting method

        var Result = new UserModel(currentUser.user);

        // Update the role
        Result.Role = currentUser.role.Name;

        // Return

        return Result;
    }
}