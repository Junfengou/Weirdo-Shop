namespace Weirdo.Model.EntityModels
{
    public class Cart
    {
        public Guid Id { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
        public int Price { get; set; }

        public Guid UserId { get; set; }
        public virtual User User { get; set; }
    }
}
