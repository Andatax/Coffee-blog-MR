using CoffeeBlog.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace CoffeeBlog.Infrastructure.Data
{
    public class CoffeeBlogcontext : DbContext
    {
        public CoffeeBlogcontext(DbContextOptions<CoffeeBlogcontext> options) : base(options)
        {

        }
        public DbSet<User> Users { get; set; } = null!;
        public DbSet<Brewer> Brewers { get; set; } = null!;

        public DbSet<Coffee> Coffees { get; set; } = null!;
        public DbSet<Recipe> Recipes { get; set; } = null!;
        public DbSet<Grinder> Grinders { get; set; } = null!;
        public DbSet<Roastery> Roasteries { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<User>(entity =>
            {
                entity.HasKey(u => u.Id);
                entity.Property(u => u.Email).IsRequired().HasMaxLength(256);
                entity.HasIndex(u => u.Email).IsUnique();
            });
            builder.Entity<Brewer>(entity =>
            {
                entity.HasKey(u => u.Id);
                entity.Property(u => u.Name).IsRequired().HasMaxLength(25);
                entity.Property(u => u.Brand);
            });
            builder.Entity<Coffee>(entity=>
            {
                entity.HasKey(u => u.Id);
                entity.Property(u => u.Name);
            })

        }
    }
}