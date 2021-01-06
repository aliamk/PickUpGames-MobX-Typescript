using System;                               // Exception
using System.Linq;
using System.Net;                           // HttpStatusCode
using System.Threading;                     // CancellationToken
using System.Threading.Tasks;               // Tasks
using Application.Errors;                   // RestException
using Application.Interfaces;               // IUserAccessor
using MediatR;                              // IRequest
using Microsoft.EntityFrameworkCore;        // SingleOrDefaultAsync
using Persistence;                          // DataContext

namespace Application.Photos
{
    public class Delete
    {
        public class Command : IRequest
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IPhotoAccessor _photoAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor, IPhotoAccessor photoAccessor)
            {
                _photoAccessor = photoAccessor;
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                // Get reference to the user
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());
                // Take the user and look for photos with associated IDs 
                var photo = user.Photos.FirstOrDefault(x => x.Id == request.Id);
                // Check if photo is null and throw error
                if (photo == null)
                    throw new RestException(HttpStatusCode.NotFound, new { Photo = "Not found" });
                // Check if photo is user's main; if yes, don't allow delete
                if (photo.IsMain)
                    throw new RestException(HttpStatusCode.BadRequest, new { Photo = "You cannot delete your main photo" });
                // If pass both checks above then pass the photo.id to delete 
                var result = _photoAccessor.DeletePhoto(photo.Id);
                // If the attempted delete returns null the alert user of an error
                if (result == null)
                    throw new Exception("Problem deleting photo");
                // Otherwise, delete the photo
                user.Photos.Remove(photo);

                // Save changes
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}