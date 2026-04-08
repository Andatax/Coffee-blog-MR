namespace CoffeeBlog.Domain.Models;

public class User
{
    public string? Id { get; set; }
    public string? Username { get; set; }

    public string? Email { get; set; }

    private string? Password { get; set; }

    public string? RoleId { get; set; }

    public Boolean IsAdmin { get; set; }
    public ICollection<Recipe> Recipes { get; set; } = new List<Recipe>();

    public ICollection<Coffee> Coffees { get; set; } = new List<Coffee>();


}