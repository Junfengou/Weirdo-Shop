using Weirdo.Model.EntityModels;

namespace Weirdo.Services.CartService
{
    public interface ICartService
    {
        Task<List<CartResult>?> CreateCartItems(string? userEmail, int productId);
        Task<List<CartResult>> GetCartItems(string? userEmail);
        Task<List<CartResult>> RemoveCartItem(int productId, string email);
    }
}
