using System.Linq;
using System.Threading;                 // CancellationToken
using System.Threading.Tasks;           // Task
using MediatR;                          // IRequest
using Microsoft.EntityFrameworkCore;
using Persistence;                      // DataContext

namespace Application.Profiles
{
    public class Details
    {
        public class Query : IRequest<Profile>
        {
            public string Username { get; set; }                        // Get users' profiles
        }

        public class Handler : IRequestHandler<Query, Profile>
        {
            private readonly DataContext __context;
            public Handler(DataContext _context)
            {
                __context = _context;
            }

            public async Task<Profile> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await __context.Users.SingleOrDefaultAsync(x => x.UserName == request.Username);
                // return await __context.ReadProfile(request.Username);
                return new Profile
                {
                    DisplayName = user.DisplayName,
                    Username = user.UserName,
                    Image = user.Photos.FirstOrDefault(x => x.IsMain)?.Url,
                    Photos = user.Photos,
                    Bio = user.Bio
                };
            }
        }
    }
}