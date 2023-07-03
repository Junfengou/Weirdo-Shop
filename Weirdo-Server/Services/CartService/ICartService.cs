using Weirdo.Model.EntityModels;

namespace Weirdo.Services.CartService
{
    public interface ICartService
    {
        Task<List<CartResult>?> CreateCartItems(string? userEmail, int productId);
    }
}
