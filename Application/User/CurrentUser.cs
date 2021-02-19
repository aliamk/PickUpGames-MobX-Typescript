using System.Linq;                      // FirstOrDefault
using System.Threading;                 // CancellationToken
using System.Threading.Tasks;           // Task
using Application.Interfaces;           // IJwtGenerator
using Domain;                           // AppUser
using MediatR;                          // IRequest
using Microsoft.AspNetCore.Identity;    // UserManager
using Persistence;                      // DataContext

namespace Application.User
{
    public class CurrentUser
    {
        public class Query : IRequest<User> { }

        public class Handler : IRequestHandler<Query, User>
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

            public async Task<User> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _userManager.FindByNameAsync(_userAccessor.GetCurrentUsername());

                var refreshToken = _jwtGenerator.GenerateRefreshToken();
                user.RefreshTokens.Add(refreshToken);
                await _userManager.UpdateAsync(user);

                return new User(user, _jwtGenerator, refreshToken.Token);
            }
        }
    }
}