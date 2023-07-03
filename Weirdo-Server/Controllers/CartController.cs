using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Weirdo.Data;
using System.Net;
using Weirdo.Model.EntityModels;
using Weirdo.Services.CartService;
using Jose;
using Weirdo.Services.UserService;
using System.Security.Claims;

namespace Weirdo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : Controller
    {
        private readonly DataContext _context;
        private readonly ICartService _cartService;
        private readonly IUserService _userService;
        public CartController(DataContext context, ICartService cartService, IUserService userService)
        {
            _context = context;
            _cartService = cartService;
            _userService = userService;
        }
        [HttpPost]
        [Route("/addToCart/productId/{productId}")]
        public async Task<ActionResult> GetUserCart(int productId)
        {
            var bearerToken = HttpContext.Request.Headers["Authorization"].FirstOrDefault()?.Substring("Bearer ".Length);
            JsonResult result;
            if(!String.IsNullOrEmpty(bearerToken))
            {
                var userEmail = _userService.ExtractUserFromJWT(bearerToken);
                var cartItemList = await _cartService.CreateCartItems(userEmail, productId);
                result = Json(new { cartItemList = cartItemList });
                result.StatusCode = (int)HttpStatusCode.OK;
            }
            else
            {
                result = Json(new { cartMessage = "Something gone wrong" });
                result.StatusCode = (int)HttpStatusCode.Unauthorized;
            }
            
            return result;
        }
    }
}