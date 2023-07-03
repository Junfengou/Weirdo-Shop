using Microsoft.EntityFrameworkCore;
using Weirdo.Data;
using Weirdo.Model.EntityModels;

namespace Weirdo.Services.CartService
{
    public class CartService: ICartService
    {
        private readonly DataContext _context;
        public CartService(DataContext context)
        {
            _context = context;
        }
        public async Task<Cart?> GetCartItems(string userId)
        {
            var sql = $"select * from Carts where UserId = '{userId}'";
            var test = await _context.Carts.FromSqlRaw(sql).FirstOrDefaultAsync();
            return test;
        }
    }
}
