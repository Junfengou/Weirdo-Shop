using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Weirdo.Data;
using System.Net;
using Weirdo.Model.EntityModels;
using Weirdo.Services.CartService;

namespace Weirdo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : Controller
    {
        private readonly DataContext _context;
        private readonly ICartService _cartService;
        public CartController(DataContext context, ICartService cartService)
        {
            _context = context;
            _cartService = cartService;
        }
        [HttpGet]
        public async Task<ActionResult> GetUserCart()
        {
            JsonResult result;
            var test = await _cartService.CreateCartItems("FC236502-4A63-45CB-A110-FBE70D290FD0", 1015);
            result = Json(new { test = "test" });
            result.StatusCode = (int)HttpStatusCode.OK;

            return result;
        }
    }
}