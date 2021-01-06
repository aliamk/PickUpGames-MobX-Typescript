using System;                               // Exception
using System.Linq;                          // FirstOrDefault
using System.Net;                           // HttpStatusCode
using System.Threading;                     // CancellationToken
using System.Threading.Tasks;               // Task
using Application.Errors;                   // RestException
using Application.Interfaces;               // IUserAccessor
using MediatR;                              // IRequest
using Microsoft.EntityFrameworkCore;
using Persistence;                          // DataContext

namespace Application.Photos
{
    public class SetMain
    {
        public class Command : IRequest
        {
            public string Id { get; set; }                  // Pass as parameter the ID of the photo we want to set as Main
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                // Get reference to user
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());
                // Get the photos from the user's collection
                var photo = user.Photos.FirstOrDefault(x => x.Id == request.Id);
                // Check if photo is null; if so, send error
                if (photo == null)
                    throw new RestException(HttpStatusCode.NotFound, new { Photo = "Not found" });
                // Get reference to current Main photo so it can be replaced
                var currentMain = user.Photos.FirstOrDefault(x => x.IsMain);
                // Make the current Main photo's IsMain to be false
                currentMain.IsMain = false;
                // Make the photo in memory's IsMain property to be true
                photo.IsMain = true;

                // Save changes
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}