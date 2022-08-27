using Duende.IdentityServer.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using reactnet.Models;

namespace reactnet.Data;

public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
{
	public ApplicationDbContext(DbContextOptions options, IOptions<OperationalStoreOptions> operationalStoreOptions)
		: base(options, operationalStoreOptions)
	{
	}

	public DbSet<Restaurant> Restuarant { get; set; }
	public DbSet<Order> Order { get; set; }
	public DbSet<Reservation> Reservation { get; set; }
	public DbSet<Meal> Meal { get; set; }

	protected override void OnModelCreating(ModelBuilder builder)
	{
		base.OnModelCreating(builder);
		var hasher = new PasswordHasher<ApplicationUser>();

		// Seed the user roles

		builder.Entity<IdentityRole>().HasData(new IdentityRole
		{
			Id = "5ce0c370-ea9e-4ce2-9af9-b30eb09777d4",
			Name = UserRoleConstants.ADMIN,
			NormalizedName = UserRoleConstants.ADMIN.ToUpper()
		});

		builder.Entity<IdentityRole>().HasData(new IdentityRole
		{
			Id = "62dcb6de-ee7b-46bf-adc7-88157f7aa797",
			Name = UserRoleConstants.BASIC,
			NormalizedName = UserRoleConstants.BASIC.ToUpper()
		});

		builder.Entity<IdentityRole>().HasData(new IdentityRole
		{
			Id = "fec8fe9f-35e3-4b85-a2b4-029655d3633d",
			Name = UserRoleConstants.STANDARD,
			NormalizedName = UserRoleConstants.STANDARD.ToUpper()
		});

		// Seed the Admin

		builder.Entity<ApplicationUser>(u =>
		{
			u.HasData(new ApplicationUser
			{
				Id = "a18be9c0-aa65-4af8-bd17-00bd9344e575",
				Name = "Admin",
				Surname = "Administrator",
				UserName = "Admin",
				NormalizedUserName = "admin",
				Email = "admin@test.com",
				LoginEmail = "admin@test.com",
				NormalizedEmail = "admin@test.com",
				EmailConfirmed = true,
				PasswordHash = hasher.HashPassword(null, "admin"),
				PasswordResetToken = new Guid().ToString(),
				SecurityStamp = new Guid().ToString(),
				DateTimeCreated = DateTime.Now,
				DateTimeActivated = DateTime.Now,
				AccessFailedCount = 0,
				IsActive = true,
				LockoutEnabled = false,
				TwoFactorEnabled = false
			});
		});

		// Seed the UserRoles Table

		builder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string>
		{
			RoleId = "5ce0c370-ea9e-4ce2-9af9-b30eb09777d4",
			UserId = "a18be9c0-aa65-4af8-bd17-00bd9344e575"
		});
	}
}