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
        public async Task<CartResult> CreateCartItems(string userId, int productId)
        {
            var sql = $"select * from Carts where CartUserId = '{userId}'";
            var cart = await _context.Carts.FromSqlRaw(sql).FirstOrDefaultAsync();
            var product = await _context.Products.FirstOrDefaultAsync(item => item.Id == productId);
            if(cart == null)
            {
                var newCart = new Cart();
                newCart.Id = Guid.NewGuid();
                newCart.CreatedAt = DateTime.Now;
                newCart.Price = product?.Price ?? 0;
                newCart.CartUserId = Guid.Parse(userId);
                await _context.AddAsync(newCart);
                await _context.SaveChangesAsync();
            }
            else if(cart != null && product != null)
            {
                cart.Price += product.Price;
                await _context.SaveChangesAsync();
            }

            var newOrExistingCart = await _context.Carts.FirstAsync(item => item.CartUserId == Guid.Parse(userId));
            var customer = await _context.Users.FirstAsync(user => user.Id == Guid.Parse(userId));
            if(customer.UserCartId == null)
            {
                customer.UserCartId = newOrExistingCart.Id;
                await _context.SaveChangesAsync();
            }

            var cartItem = await _context.CartItems.FirstOrDefaultAsync(cartItem => cartItem.CartItemProductId == productId);
            if (cartItem == null && newOrExistingCart != null)
            {
                var newCartItem = new CartItem();
                newCartItem.Quantity = 1;
                newCartItem.CartItemCartId = newOrExistingCart.Id;
                newCartItem.CartItemProductId = productId;
                await _context.AddAsync(newCartItem);
                await _context.SaveChangesAsync();
            }
            else if(cartItem != null)
            {
                cartItem.Quantity += 1;
                await _context.SaveChangesAsync();
            }
            var newOrExistingCartItem = await _context.CartItems.FirstAsync(item => item.CartItemProductId == productId);
            var newObj = new CartResult
            {
                CartId = newOrExistingCart.Id,
                UserId = newOrExistingCart.CartUserId,
                CreatedAt = newOrExistingCart.CreatedAt,
                ProductId = productId,
                Quantity = newOrExistingCartItem.Quantity
            };
            return newObj;
        }
    }

    public class CartResult
    {
        public Guid CartId { get; set; }
        public Guid UserId { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }
}
