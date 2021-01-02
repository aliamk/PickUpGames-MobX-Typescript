using Microsoft.AspNetCore.Mvc;             // HttpPost
using System.Threading.Tasks;               // Task
using Domain;                               // AppUser
using Application.User;                     // Login
using Microsoft.AspNetCore.Authorization;   // AllowAnonymous

namespace API.Controllers
{
    [AllowAnonymous]
    public class UserController : BaseController
    {

        [HttpPost("login")]
        public async Task<ActionResult<User>> Login(Login.Query query)
        {
            return await Mediator.Send(query);
        }

        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(Register.Command command)
        {
            return await Mediator.Send(command);
        }
    }
}