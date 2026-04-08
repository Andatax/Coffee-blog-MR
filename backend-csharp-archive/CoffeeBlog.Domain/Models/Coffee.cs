using System.Runtime.CompilerServices;

namespace CoffeeBlog.Domain.Models;

public class Coffee
{
    public string? Id { get; set; }
    public string? Name { get; set; }

    public string? Notes { get; set; }

    public ICollection<Roastery>? Roasteries { get; set; } = new List<Roastery>();

    public string? Roast { get; set; }

    public string? Origin { get; set; }

    public string? Variety { get; set; }

    public string? Process { get; set; }

    public string? Altitude { get; set; }
}