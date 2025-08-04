using Microsoft.VisualBasic;

namespace CoffeeBlog.Domain.Models;

public class Grinder
{
    public string? Id { get; set; }

    public string? Name { get; set; }

    public Boolean? Conical { get; set; }

    public int? BurrSize { get; set; }

    public float? Price { get; set; }
    
}