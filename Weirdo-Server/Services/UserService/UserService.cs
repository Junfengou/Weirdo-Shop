using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using SuperHeroes_Project.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Weirdo.Model.EntityModels;

namespace Weirdo.Services.UserService
{
    public class UserService: IUserService
    {
        private readonly DataContext _context;
        private readonly IConfiguration _configuration;
        public UserService(DataContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;

        }

        public async Task<User> Register(User newUser)
        {
            var user = new User();
            var passwordHash = BCrypt.Net.BCrypt.HashPassword(newUser.Password);
            user.Id = Guid.NewGuid();
            user.Email = newUser.Email;
            user.Password = passwordHash;
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            return user;
        }
        public async Task<LoginModel> Login(User loginUser)
        {
            var user = await _context.Users.FirstOrDefaultAsync(user => user.Email == loginUser.Email);

            //var product = await _context.Products.FirstOrDefaultAsync(item => item.Id == id);
            var loginResult = new LoginModel();
            if (user == null || user.Email != loginUser.Email)
            {
                loginResult.ErrorMessage = "User Not Found";
                loginResult.Token = null;
            }

            if (!BCrypt.Net.BCrypt.Verify(loginUser.Password, user?.Password))
            {
                loginResult.ErrorMessage = "Something gone wrong or user not found";
                loginResult.Token = null;
            }

            var token = CreateToken(user);
            loginResult.Token = token;
            return loginResult;
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

        public class LoginModel
        {
            public string? ErrorMessage { get; set; }
            public string? Token { get; set; }
        }
    }
}
