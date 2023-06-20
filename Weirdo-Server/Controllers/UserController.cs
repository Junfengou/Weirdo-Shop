using BCrypt.Net;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Weirdo.Model.EntityModels;

namespace Weirdo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public UserController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(User newUser)
        {
            var user = new User();
            var passwordHash = BCrypt.Net.BCrypt.HashPassword(newUser.Password);
            user.Email = newUser.Email;
            user.Password = passwordHash;

            return Ok(user);
        }

        [HttpPost("login")]
        public async Task<ActionResult<User>> Login(User loginUser)
        {
            var user = new User();
            if (user.Email != loginUser.Email)
                return BadRequest("User Not Found");

            if(!BCrypt.Net.BCrypt.Verify(loginUser.Password, user.Password))
                return BadRequest("Something gone wrong or user not found");

            var token = CreateToken(user);

            return Ok(user);
        }

        private string CreateToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, user.Email)
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value!));

            var credential = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: credential
                );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }
    }
}
