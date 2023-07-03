using Weirdo.Model.EntityModels;

namespace Weirdo.Services.CartService
{
    public interface ICartService
    {
        Task<Cart?> GetCartItems(string userId);
    }
}
