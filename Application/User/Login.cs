using System.Linq;                      // FirstOrDefault
using System.Net;                       // HttpStatusCode
using System.Threading;                 // CancellationToken
using System.Threading.Tasks;           // Task
using Application.Errors;               // RestException
using Application.Interfaces;           // IJwtGenerator
using Domain;                           // User
using FluentValidation;                 // AbstractValidator
using MediatR;                          // IRequest
using Microsoft.AspNetCore.Identity;    // UserManager

namespace Application.User
{
    public class Login
    {
        public class Query : IRequest<User>
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

        public class Handler : IRequestHandler<Query, User>
        {
            // Initialise field from parameter
            private readonly UserManager<AppUser> _userManager;
            private readonly SignInManager<AppUser> _signInManager;
            private readonly IJwtGenerator _jwtGenerator;
            public Handler(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, IJwtGenerator jwtGenerator)
            {
                _jwtGenerator = jwtGenerator;
                _signInManager = signInManager;
                _userManager = userManager;
            }

            public async Task<User> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _userManager.FindByEmailAsync(request.Email);

                if (user == null)
                    throw new RestException(HttpStatusCode.Unauthorized);

                if (!user.EmailConfirmed)
                    throw new RestException(HttpStatusCode.BadRequest, new
                    {
                        Email = "Email is not confirmed"
                    });

                var result = await _signInManager
                    .CheckPasswordSignInAsync(user, request.Password, false);

                if (result.Succeeded)
                {
                    // generate token
                    var refreshToken = _jwtGenerator.GenerateRefreshToken();
                    user.RefreshTokens.Add(refreshToken);
                    await _userManager.UpdateAsync(user);
                    return new User(user, _jwtGenerator, refreshToken.Token);
                }

                throw new RestException(HttpStatusCode.Unauthorized);
            }
        }
    }
}