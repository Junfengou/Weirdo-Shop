using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Weirdo.Model.EntityModels
{
    public class User
    {
        [Key]
        [JsonIgnore]
        public Guid Id { get; set; }
        [JsonIgnore]
        public string? FirstName { get; set; }
        [JsonIgnore]
        public string? LastName { get; set; }
        public string Email { get; set; }

        public string Password { get; set; }

        [JsonIgnore]
        public Guid? UserCartId { get; set; }
    }
}
