using Domain;                                               // <Value>
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;    // IdentityDbContext
using Microsoft.EntityFrameworkCore;                        // DbContext (queries databases based on entities)

namespace Persistence
{
    public class DataContext : /*DbContext*/IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Value> Values { get; set; }
        public DbSet<Visit> Visits { get; set; }

        // Seed the database with initial values
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Value>()
                .HasData(
                    new Value { Id = 1, Name = "Value 101" },
                    new Value { Id = 2, Name = "Value 102" },
                    new Value { Id = 3, Name = "Value 103" }
                );
        }
    }
}
