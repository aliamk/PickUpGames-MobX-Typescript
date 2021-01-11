using Microsoft.AspNetCore.Mvc;             // HttpPost
using System.Threading.Tasks;               // Task
using Domain;                               // AppUser
using Application.User;                     // Login
using Microsoft.AspNetCore.Authorization;   // AllowAnonymous

namespace API.Controllers
{
    public class UserController : BaseController
    {
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<User>> Login(Login.Query query)
        {
            return await Mediator.Send(query);
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult> Register(Register.Command command)
        {
            var command.Origin = Request.Headers["origin"];
            await Mediator.Send(command);
            return Ok("Registration successful - please check your email");
        }

        [HttpGet]
        public async Task<ActionResult<User>> CurrentUser()
        {
            return await Mediator.Send(new CurrentUser.Query());
        }
    }
}