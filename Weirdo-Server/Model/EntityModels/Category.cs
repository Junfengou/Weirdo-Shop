using System.ComponentModel.DataAnnotations.Schema;

namespace Weirdo.Model.EntityModels
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public virtual List<Product> Products { get; set; }
    }
}
