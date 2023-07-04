using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using Weirdo.Services.OrderService;
using Weirdo.Services.UserService;

namespace Weirdo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : Controller
    {
        private readonly IOrderService _orderService;
        private readonly IUserService _userService;

        public OrderController(IOrderService orderService, IUserService userService)
        {
            _orderService = orderService;
            _userService = userService;
        }
        [HttpPost]
        [Route("createOrder")]
        public async Task<ActionResult> CreateOrder(OrderInfo orderInfo)
        {
            var bearerToken = HttpContext.Request.Headers["Authorization"].FirstOrDefault()?.Substring("Bearer ".Length);

            JsonResult result;
            if (!String.IsNullOrEmpty(bearerToken))
            {
                var userEmail = _userService.ExtractUserFromJWT(bearerToken);
                var cartItemList = await _orderService.CreateOrder(userEmail, orderInfo);
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

        [HttpGet]
        [Route("orders")]
        public async Task<ActionResult> GetOrders()
        {
            var bearerToken = HttpContext.Request.Headers["Authorization"].FirstOrDefault()?.Substring("Bearer ".Length);

            JsonResult result;
            if (!String.IsNullOrEmpty(bearerToken))
            {
                var userEmail = _userService.ExtractUserFromJWT(bearerToken);
                var orderList = await _orderService.GetOrders(userEmail);
                result = Json(new { result = orderList });
                result.StatusCode = (int)HttpStatusCode.OK;
            }
            else
            {
                result = Json(new { cartMessage = "Something gone wrong" });
                result.StatusCode = (int)HttpStatusCode.Unauthorized;
            }
            //var test = await _orderService.GetOrders("originalgangsterz6@gmail.com");
            //result = Json(new { test = "test" });
            //result.StatusCode = (int)HttpStatusCode.OK;
            return result;
        }

        [HttpGet]
        [Route("orderItems/orderId/{orderId}")]
        public async Task<ActionResult> GetOrderItems(string orderId)
        {
            var bearerToken = HttpContext.Request.Headers["Authorization"].FirstOrDefault()?.Substring("Bearer ".Length);

            JsonResult result;
            if (!String.IsNullOrEmpty(bearerToken))
            {
                var userEmail = _userService.ExtractUserFromJWT(bearerToken);
                var orderItemList = await _orderService.GetOrderItems(userEmail, orderId);
                result = Json(new { result = orderItemList });
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

    public class OrderInfo
    {
        public string Address { get; set; }
        public string City { get; set; }
        public string? State { get; set; }
        public string ZipCode { get; set; }
    }
}
