using System.ComponentModel.DataAnnotations.Schema;

namespace Weirdo.Model.EntityModels
{
    public class OrderItem
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
        public virtual Guid OrderId { get; set; }
        [ForeignKey("OrderId")]
        public virtual Order Order { get; set; }
        public virtual int ProductId { get; set; }
        [ForeignKey("ProductId")]
        public virtual Product Product { get; set; }
    }
}
