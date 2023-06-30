using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using SuperHeroes_Project.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WebApi.Authorization;
using Weirdo.Model.EntityModels;

namespace Weirdo.Services.UserService
{
    public class UserService: IUserService
    {
        private readonly DataContext _context;
        private readonly IConfiguration _configuration;
        private readonly IJwtUtils _jwtUtils;
        public UserService(DataContext context, IConfiguration configuration, IJwtUtils jwtUtils)
        {
            _context = context;
            _configuration = configuration;
            _jwtUtils = jwtUtils;

        }

        public async Task<List<User>> GetUsers()
        {
            return await _context.Users.ToListAsync();
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
            var loginResult = new LoginModel();
            var token = "";
            if (user == null || user.Email != loginUser.Email)
                loginResult.ErrorMessage = "User Not Found";

            //if (!BCrypt.Net.BCrypt.Verify(loginUser.Password, user?.Password))
            //    loginResult.ErrorMessage = "Something gone wrong or user not found";

            if (user != null) {
                token = _jwtUtils.GenerateJwtToken(user);
                loginResult.Token = token;
            }
            else
            {
                loginResult.ErrorMessage = "User Not Found";
            }
            return loginResult;
        }


        public async Task<User?> GetByEmail(string email)
        {
            return await _context.Users.FirstOrDefaultAsync(x => x.Email == email);
        }

        public class LoginModel
        {
            public string? ErrorMessage { get; set; }
            public string? Token { get; set; }
        }
    }
}
