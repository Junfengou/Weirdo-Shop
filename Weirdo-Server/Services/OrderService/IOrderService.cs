using Weirdo.Controllers;
using Weirdo.Services.CartService;

namespace Weirdo.Services.OrderService
{
    public interface IOrderService
    {
        Task<List<CartResult>?> CreateOrder(string email, OrderInfo orderInfo);
        Task<List<OrderResult>?> GetOrders(string email);
    }
}
