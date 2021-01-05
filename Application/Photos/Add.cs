using System;                                   // Exception
using System.Linq;                              // Any
using System.Threading;                         // CancellationToken
using System.Threading.Tasks;                   // Task
using Application.Interfaces;                   // IPhotoAccessor
using Domain;
using MediatR;                                  // IRequest
using Microsoft.AspNetCore.Http;                // IFormFile
using Microsoft.EntityFrameworkCore;            // SingleOrDefaultAsync
using Persistence;                              // DataContext

namespace Application.Photos
{
    public class Add
    {
        public class Command : IRequest<Domain.Photo>
        {
            public IFormFile File { get; set; }
        }

        public class Handler : IRequestHandler<Command, Photo>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public IPhotoAccessor _photoAccessor { get; }

            public Handler(DataContext context, IUserAccessor userAccessor, IPhotoAccessor photoAccessor)
            {
                _photoAccessor = photoAccessor;
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Photo> Handle(Command request, CancellationToken cancellationToken)
            {
                var photoUploadResult = _photoAccessor.AddPhoto(request.File);

                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());

                var photo = new Photo
                {
                    Url = photoUploadResult.Url,
                    Id = photoUploadResult.PublicId
                };

                if (!user.Photos.Any(x => x.IsMain))                // If user has no main photo, assign this photo as main
                    photo.IsMain = true;

                user.Photos.Add(photo);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return photo;

                throw new Exception("Problem saving changes");
            }
        }
    }
}