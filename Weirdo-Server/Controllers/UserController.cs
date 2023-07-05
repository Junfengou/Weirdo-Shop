using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using Weirdo.Model.EntityModels;
using Weirdo.Services.UserService;

namespace Weirdo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly IUserService _userService;
        public UserController(IConfiguration configuration, IUserService userService)
        {
            _configuration = configuration;
            _userService = userService;
        }
        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(User newUser)
        {
            JsonResult result;
            var signupResult = await _userService.Register(newUser);
            result = Json(new { message = signupResult.Message });
            result.StatusCode = (int)HttpStatusCode.OK;
            return result;
        }

        [HttpPost("login")]
        public async Task<ActionResult<User>> Login(User loginUser)
        {
            JsonResult result;
            var loginResult = await _userService.Login(loginUser);
            result = Json(new {token = loginResult.Token, errorMessage = loginResult.ErrorMessage, isAdmin = loginResult.isAdmin });
            result.StatusCode = (int)HttpStatusCode.OK;
            return result;
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<List<User>>> GetUsers()
        {
            var users = await _userService.GetUsers();
            return Ok(users);
        }
    }
}
