using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Weirdo.Data;
using Weirdo.Model.EntityModels;

namespace Weirdo.Services.CartService
{
    public class CartService: ICartService
    {
        private readonly DataContext _context;
        private readonly IConfiguration _configuration;
        public CartService(DataContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }
        public async Task<List<CartResult>?> CreateCartItems(string? userEmail, int productId)
        {
            if (String.IsNullOrEmpty(userEmail))
                return null;
            var connectionString = _configuration.GetConnectionString("DbConnectionString");
            using var connection = new SqlConnection(connectionString);
            var customer = await _context.Users.FirstAsync(user => user.Email == userEmail);

            var sql = $"select * from Carts where CartUserId = '{customer.Id}'";
            var cart = await _context.Carts.FromSqlRaw(sql).FirstOrDefaultAsync();
            var product = await _context.Products.FirstOrDefaultAsync(item => item.Id == productId);
            if(cart == null)
            {
                var newCart = new Cart();
                newCart.Id = Guid.NewGuid();
                newCart.CreatedAt = DateTime.Now;
                newCart.Price = product?.Price ?? 0;
                newCart.CartUserId = customer.Id;
                await _context.AddAsync(newCart);
                await _context.SaveChangesAsync();
            }
            else if(cart != null && product != null)
            {
                cart.Price += product.Price;
                await _context.SaveChangesAsync();
            }

            var newOrExistingCart = await _context.Carts.FirstAsync(item => item.CartUserId == customer.Id);
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

            var resultSql = $"select c.Id, p.Name as ProductName, p.Price as ProductPrice, p.ImagePath, c.Price as TotalPrice, ci.Quantity, u.Email from Users u " +
                $"join Carts c on u.UserCartId = c.Id " +
                $"join CartItems ci on ci.CartItemCartId = c.Id " +
                $"join Products p on p.Id = ci.CartItemProductId";
            var results = connection.Query<CartResult>(resultSql).ToList();

            return results;
        }
    }

    public class CartResult
    {
        public Guid Id { get; set; }
        public string ProductName { get; set; }
        public int ProductPrice { get; set; }
        public string ImagePath { get; set; }
        public int TotalPrice { get; set; }
        public int Quantity { get; set; }
    }
}
