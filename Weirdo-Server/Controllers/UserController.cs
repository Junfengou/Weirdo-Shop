
using Microsoft.AspNetCore.Mvc;
using WebApi.Authorization;
using Weirdo.Model.EntityModels;
using Weirdo.Services.UserService;

namespace Weirdo.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IUserService _userService;
        public UserController(IConfiguration configuration, IUserService userService)
        {
            _configuration = configuration;
            _userService = userService;
        }
        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(User newUser)
        {
            var user = await _userService.Register(newUser);

            return Ok(user);
        }
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<User>> Login(User loginUser)
        {
            var loginResult = await _userService.Login(loginUser);
            return Ok(loginResult.Token == null ? loginResult.ErrorMessage : loginResult.Token);
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _userService.GetUsers();
            return Ok(users);
        }
    }
}
