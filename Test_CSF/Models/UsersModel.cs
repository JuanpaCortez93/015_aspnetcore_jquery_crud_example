using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Test_CSF.Models
{
    public class UsersModel
    {
        [Key]
        public int UserId { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string FirstName { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string LastName { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string Email { get; set; }

        [Column(TypeName = "varchar")]
        [MaxLength]
        public string Password { get; set; }

        [Column(TypeName = "nvarchar(16)")]
        public string ConfirmPassword { get; set; }

    }
}
