namespace Weirdo.Services.OrderService
{
    public interface IOrderService
    {
        Task<OrderResult?> CreateOrder(string email);
    }
}
