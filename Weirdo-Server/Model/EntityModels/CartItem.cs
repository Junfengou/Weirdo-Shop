namespace Weirdo.Model.EntityModels
{
    public class CartItem
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
        public virtual Guid CartItemCartId { get; set; }
        public virtual Cart Cart { get; set; }
        public virtual int CartItemProductId { get; set; }
        public virtual Product Product { get; set; }
    }
}
