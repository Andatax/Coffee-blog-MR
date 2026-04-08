using CoffeeBlog.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace CoffeeBlog.Infrastructure.Data
{
    public class CoffeeBlogContext : DbContext
    {
        public CoffeeBlogContext(DbContextOptions<CoffeeBlogContext> options) : base(options)
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
                entity.HasKey(user => user.Id);
                entity.Property(user => user.Email).IsRequired().HasMaxLength(256);
                entity.HasIndex(user => user.Email).IsUnique();
                entity.Property(user => user.Username).IsRequired().HasMaxLength(30);

                entity.HasMany(user => user.Recipes).WithOne().HasForeignKey("UserId").OnDelete(DeleteBehavior.Cascade);

                entity.HasMany(user => user.Coffees).WithOne().HasForeignKey("UserId").OnDelete(DeleteBehavior.Cascade);
            });
            builder.Entity<Brewer>(entity =>
            {
                entity.HasKey(brewer => brewer.Id);
                entity.Property(brewer => brewer.Name).IsRequired().HasMaxLength(25);
                entity.Property(brewer => brewer.Brand);
            });
            builder.Entity<Coffee>(entity =>
            {
                entity.HasKey(coffee => coffee.Id);
                entity.Property(coffee => coffee.Name).IsRequired().HasMaxLength(40);
                entity.Property(coffee => coffee.Notes).HasMaxLength(1000);
                entity.Property(coffee => coffee.Roast).HasMaxLength(10);
                entity.Property(coffee => coffee.Origin).HasMaxLength(30);
                entity.Property(coffee => coffee.Variety).HasMaxLength(0);
                entity.Property(coffee => coffee.Process).HasMaxLength(0);
                entity.Property(coffee => coffee.Altitude).HasMaxLength(0);


                entity.HasMany(coffee => coffee.Roasteries).WithOne().HasForeignKey("coffeeId");

            });
            builder.Entity<Grinder>(entity =>
            {
                entity.HasKey(grinder => grinder.Id);
                entity.Property(grinder => grinder.Name).HasMaxLength(100);
                entity.Property(grinder => grinder.BurrSize).HasMaxLength(3);
            });

        }
    }
}