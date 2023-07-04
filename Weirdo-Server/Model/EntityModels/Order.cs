using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Weirdo.Model.EntityModels
{
    public class Order
    {
        public Guid Id { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
        public int Price { get; set; }

        public virtual Guid UserId { get; set; }
        [ForeignKey("UserId")]
        [JsonIgnore]
        public virtual User User { get; set; }
    }
}
