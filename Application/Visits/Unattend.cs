using System;                           // Guid
using System.Net;                       // HttpStatusCode
using System.Threading;                 // CancellationToken
using System.Threading.Tasks;           // Task
using Application.Errors;               // RestException
using Application.Interfaces;           // IUserAccessor
using Domain;                           // UserVisit
using MediatR;                          // IRequest
using Microsoft.EntityFrameworkCore;    // SingleOrDefaultAsync
using Persistence;                      // DataContext

namespace Application.Visits
{
    public class Unattend
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
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
                var activity = await _context.Visits.FindAsync(request.Id);

                if (activity == null)
                    throw new RestException(HttpStatusCode.NotFound, new { Visit = "Cound not find activity" });

                var user = await _context.Users.SingleOrDefaultAsync(x =>
                    x.UserName == _userAccessor.GetCurrentUsername());

                var attendance = await _context.UserVisits
                    .SingleOrDefaultAsync(x => x.VisitId == activity.Id &&
                        x.AppUserId == user.Id);

                if (attendance == null)
                    return Unit.Value;

                if (attendance.IsHost)
                    throw new RestException(HttpStatusCode.BadRequest, new { Attendance = "You cannot remove yourself as host" });

                _context.UserVisits.Remove(attendance);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}