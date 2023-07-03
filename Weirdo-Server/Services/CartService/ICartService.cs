using Weirdo.Model.EntityModels;

namespace Weirdo.Services.CartService
{
    public interface ICartService
    {
        Task<CartResult> CreateCartItems(string userId, int productId);
    }
}
