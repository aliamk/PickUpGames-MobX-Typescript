using System.Net;                       // HttpStatusCode
using System.Threading;                 // CancellationToken
using System.Threading.Tasks;           // Task
using Application.Errors;               // RestException
using Domain;                           // AppUser
using FluentValidation;                 // AbstractValidator
using MediatR;                          // IRequest
using Microsoft.AspNetCore.Identity;    // UserManager
using Persistence;                      // DataContext

namespace Application.User
{
    public class Login
    {
        public class Query : IRequest<AppUser>
        {
            public string Email { get; set; }
            public string Password { get; set; }

        }

        public class QueryValidator : AbstractValidator<Query>
        {
            public QueryValidator()
            {
                RuleFor(x => x.Email).NotEmpty();
                RuleFor(x => x.Password).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Query, AppUser>
        {
            // private readonly DataContext _context;
            private readonly UserManager<AppUser> _userManager;
            private readonly SignInManager<AppUser> _signInManager;
            public Handler(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager)
            {
                _signInManager = signInManager;
                _userManager = userManager;
                // _context = context;
            }

            public async Task<AppUser> Handle(Query request,
                CancellationToken cancellationToken)
            {
                // handler logic goes here
                var user = await _userManager.FindByEmailAsync(request.Email);

                if (user == null)
                    throw new RestException(HttpStatusCode.Unauthorized) // produces 401 error


                var result = await _signInManager.CheckPasswordSignInAsync(user, request.Password, false)
                if (result.Succeeded)
                {
                    // TODO: generate token
                    return user;
                }
                throw new RestException(HttpStatusCode.Unauthorized);
            }
        }
    }
}