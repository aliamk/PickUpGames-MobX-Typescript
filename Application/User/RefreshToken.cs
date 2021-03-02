using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;           // IRequestHandler
using Application.Errors;
using Application.Interfaces;           // IJwtGenerator  
using Domain;
using MediatR;                          // IRequest<User>
using Microsoft.AspNetCore.Identity;

namespace Application.User
{
    public class RefreshToken
    {
        public class Command : IRequest<User>
        {
            public string RefreshToken { get; set; }
        }

        public class Handler : IRequestHandler<Command, User>
        {
            private readonly UserManager<AppUser> _userManager;
            private readonly IJwtGenerator _jwtGenerator;
            private readonly IUserAccessor _userAccessor;
            public Handler(UserManager<AppUser> userManager, IJwtGenerator jwtGenerator, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _jwtGenerator = jwtGenerator;
                _userManager = userManager;
            }

            public async Task<User> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _userManager.FindByNameAsync(_userAccessor.GetCurrentUsername());
                // Is old token valid?
                var oldToken = user.RefreshTokens.SingleOrDefault(x => x.Token == request.RefreshToken);
                // If not, return a 401
                if (oldToken != null && !oldToken.IsActive) throw new RestException(HttpStatusCode.Unauthorized);
                // If an old token exists, revoke it
                if (oldToken != null)
                {
                    oldToken.Revoked = DateTime.UtcNow;
                }
                // Create new token
                var newRefreshToken = _jwtGenerator.GenerateRefreshToken();
                user.RefreshTokens.Add(newRefreshToken);
                // Update user
                await _userManager.UpdateAsync(user);
                // Return new user
                return new User(user, _jwtGenerator, newRefreshToken.Token);
            }
        }
    }
}