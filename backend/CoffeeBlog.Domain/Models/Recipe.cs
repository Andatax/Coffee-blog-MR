using System.Buffers;

namespace CoffeeBlog.Domain.Models;

public class Recipe
{
    public string? Name { get; set; }
    public string? Description { get; set; } 

    public float? Brewtime { get; set; }

    public ICollection<Brewer> Brewers { get; set; } = new List<Brewer>();


}