using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using SuperHeroes_Project.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Weirdo.Model.EntityModels;
using System;

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

            else if (!BCrypt.Net.BCrypt.Verify(loginUser.Password, user?.Password))
                loginResult.ErrorMessage = "Something gone wrong or user not found";

            else if (user != null) {
                token = CreateToken(user);
                loginResult.Token = token;
            }
            else
            {
                loginResult.ErrorMessage = "User Not Found";
            }

            var userEmail = VerifyUser(token);

            return loginResult;
        }

        private string CreateToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, "Admin")
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value!));
            var issuer = _configuration.GetSection("AppSettings:IssuerKey").Value!;

            var credential = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: null,
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: credential
                );

            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = false,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = issuer,
                IssuerSigningKey = key
            };

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            var validator = new JwtSecurityTokenHandler().ValidateToken(jwt, tokenValidationParameters, out var validatedToken);

            return jwt;
        }

        public bool VerifyUser(string jwt)
        {
            // Define your JWT settings (e.g., secret key and issuer)
            string issuer = _configuration.GetSection("AppSettings:IssuerKey").Value!;

            // Create a token validation parameters object
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = false,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = issuer,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value!))
            };

            try
            {
                // Validate the token and extract claims
                var tokenHandler = new JwtSecurityTokenHandler();
                ClaimsPrincipal claimsPrincipal = tokenHandler.ValidateToken(jwt, tokenValidationParameters, out _);

                // Retrieve the user's email from the claims
                var userEmail = claimsPrincipal.Claims.First().Value;

                return true;
            }
            catch (Exception)
            {
                // Return false if the token validation fails or any exception occurs
                return false;
            }
        }
        public class LoginModel
        {
            public string? ErrorMessage { get; set; }
            public string? Token { get; set; }
        }
    }
}
