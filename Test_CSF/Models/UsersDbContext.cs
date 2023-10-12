using Microsoft.EntityFrameworkCore;

namespace Test_CSF.Models
{
    public class UsersDbContext : DbContext
    {
        public UsersDbContext(DbContextOptions<UsersDbContext> options) : base(options) { }

        public DbSet<UsersModel> Users { get; set; }
    }

}
