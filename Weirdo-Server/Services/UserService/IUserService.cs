using Microsoft.AspNetCore.Mvc;
using Weirdo.Model.EntityModels;
using static Weirdo.Services.UserService.UserService;

namespace Weirdo.Services.UserService
{
    public interface IUserService
    {
        Task<User> Register(User newUser);
        Task<LoginModel> Login(User loginUser);
    }
}
