using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.Extensions.Configuration;
using Weirdo.Controllers;
using Weirdo.Data;
using Weirdo.Model.EntityModels;
using Weirdo.Services.CartService;

namespace Weirdo.Services.OrderService
{
    public class OrderService : IOrderService
    {
        private readonly DataContext _context;
        private readonly IConfiguration _configuration;
        private readonly ICartService _cartService;
        public OrderService(DataContext context, IConfiguration configuration, ICartService cartService)
        {
            _context = context;
            _configuration = configuration;
            _cartService = cartService;

        }
        public async Task<List<CartResult>?> CreateOrder(string email, OrderInfo orderInfo)
        {
            if (String.IsNullOrEmpty(email))
                return null;

            var customer = await _context.Users.FirstAsync(user => user.Email == email);
            customer.UserCartId = null;
            await _context.SaveChangesAsync();

            var connectionString = _configuration.GetConnectionString("DbConnectionString");
            using var connection = new SqlConnection(connectionString);
            var resultSql = $"select c.Id as CartId, c.Price as TotalPrice, ci.Id as CartItemId, ci.CartItemProductId as ProductId," +
                $"ci.Quantity from Carts c join CartItems ci " +
                $"on c.Id = ci.CartItemCartId where c.CartUserId = @userId";
            var cartResults = await connection.QueryAsync<CartRes>(resultSql, new { userId = customer.Id });

            var newOrder = new Order
            {
                Id = Guid.NewGuid(),
                CreatedAt = DateTimeOffset.Now,
                Price = cartResults.First().TotalPrice,
                Address = orderInfo.Address,
                City = orderInfo.City,
                State = orderInfo.State,
                ZipCode = orderInfo.ZipCode,
                UserId = customer.Id,
            };
            await _context.AddAsync(newOrder);
            await _context.SaveChangesAsync();

            var newlyCreatedOrder = await _context.Orders.FirstAsync(item => item.UserId == customer.Id);


            foreach (var cartResult in cartResults)
            {
                var newOrderItem = new OrderItem
                {
                    OrderId = newlyCreatedOrder.Id,
                    ProductId = cartResult.ProductId,
                    Quantity = cartResult.Quantity,
                };
                await _context.AddAsync(newOrderItem);
                await _context.SaveChangesAsync();
            }

            var cartItems = await _context.CartItems.ToListAsync();
            var cart = await _context.Carts.FirstAsync(item => item.CartUserId == customer.Id);

            foreach (var cartItem in cartItems)
            { 
                _context.CartItems.Remove(cartItem);
                await _context.SaveChangesAsync();
            }

            _context.Carts.Remove(cart);
            await _context.SaveChangesAsync();

            return await _cartService.fetchCartResult(customer.Email);
        }

        public async Task<List<OrderResult>?> GetOrders(string email)
        {
            if (String.IsNullOrEmpty(email))
                return null;

            var connectionString = _configuration.GetConnectionString("DbConnectionString");
            using var connection = new SqlConnection(connectionString);
            var orderSql = $"select o.Id, u.Email, o.Price as TotalPrice, o.CreatedAt from Orders o " +
                $"join Users u on o.UserId = u.Id where u.Email = @email";
            var orderResults = await connection.QueryAsync<OrderResult>(orderSql, new { email });
            return orderResults.ToList();
        }

        public async Task<List<OrderItemsResult>?> GetOrderItems(string email, string orderId)
        {
            if (String.IsNullOrEmpty(email))
                return null;

            var id = Guid.Parse(orderId);
            var connectionString = _configuration.GetConnectionString("DbConnectionString");
            using var connection = new SqlConnection(connectionString);
            var orderSql = $"select o.Id, oi.ProductId, p.Name as ProductName, oi.Quantity, p.Price as ProductPrice, p.ImagePath, " +
                $"o.Price as TotalPrice, o.CreatedAt," +
                $"o.Address, o.City, o.State, o.ZipCode, u.Email " +
                $"from Orders o join OrderItems oi on o.Id = oi.OrderId " +
                $"join Products p on oi.ProductId = p.Id " +
                $"join Users u on u.Id = o.UserId where " +
                $"u.Email = @email and o.Id = @orderId";
            var orderItemResults = await connection.QueryAsync<OrderItemsResult>(orderSql, new { email, orderId = id });
            return orderItemResults.ToList();
        }
    }

    public class CartRes
    {
        public Guid CartId { get; set; }
        public int TotalPrice { get; set; }
        public int CartItemId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }

    public class OrderResult
    {
        public Guid Id { get; set; }
        public int TotalPrice { get; set; }
        public string Email { get; set; }
        public DateTimeOffset CreatedAt { get; set; }

    }

    public class OrderItemsResult
    {
        public Guid Id { get; set;}
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string ImagePath { get; set; }
        public int Quantity { get; set; }
        public int ProductPrice { get; set; }
        public int TotalPrice { get; set; }
        public DateTimeOffset CreatedAt { get; set; }

        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string ZipCode { get; set; }

    }
}
