namespace reactnet.Models.APIModels;

public class UserModel
{
	public UserModel()
	{
	}

	public UserModel(ApplicationUser model)
	{
		Id = model.Id;
		Username = model.UserName;
		FirstName = model.Name;
		LastName = model.Surname;
		Email = model.Email;
		IsActive = model.IsActive;
	}

	public string? Id { get; set; }
	public string? Username { get; set; }
	public string? Password { get; set; }
	public string FirstName { get; set; }
	public string LastName { get; set; }
	public string? Role { get; set; }
	public string Email { get; set; }
	public bool? IsActive { get; set; }
}