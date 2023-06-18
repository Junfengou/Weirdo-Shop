using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Weirdo.Model.EntityModels
{
    public class Category
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }

        [JsonIgnore]
        public virtual List<Product>? Products { get; set; }
    }
}
