using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SuperHeroes_Project.Data;
using System.Net;
using Weirdo.Model.EntityModels;

namespace Weirdo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : Controller
    {
        private readonly DataContext _context;
        public CartController(DataContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult> GetUserCart()
        {
            JsonResult result;
            //var test = await _cartService.GetCartItems("4BD4431B-8592-4CD1-B018-4E666D11F1EE");
            result = Json(new { test = "test" });
            result.StatusCode = (int)HttpStatusCode.OK;

            return result;
        }
    }
}

//try
//{
//    var test = $"select * from Carts where UserId = '58834F98-817E-4A8C-BF99-21878955D302'";
//    var cart = await _context.Carts.FromSqlRaw(test).FirstOrDefaultAsync();
//    if (cart == null)
//    {
//        var newCart = new Cart();
//        //newCart.UserId = Guid.Parse(userId);
//        newCart.CreatedAt = DateTime.Now;
//        newCart.Price = 0;
//        await _context.Carts.AddAsync(newCart);
//        await _context.SaveChangesAsync();
//    }
//    var cartItem = await _context.CartItems.FirstOrDefaultAsync(cartItem => cartItem.Product.Id == productId);
//    if (cartItem == null)
//    {
//        var newCartItem = new CartItem();
//        newCartItem.Cart.CartId = cart.CartId;
//        newCartItem.Product.Id = productId;
//        newCartItem.Quantity = 1;
//        await _context.CartItems.AddAsync(newCartItem);
//        await _context.SaveChangesAsync();
//    }
//    else
//    {
//        cartItem.Quantity += 1;
//        await _context.SaveChangesAsync();
//    }
//    var cartItemSql = $"select * from dbo.CartItems where CartId = {cart?.CartId}";
//    var cartItemsList = await _context.CartItems.FromSqlRaw(cartItemSql).ToListAsync();
//    return cartItemsList;
//}
//catch (Exception ex)
//{
//    var test = ex.Message;
//    return null;
//}