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
    public class Attend
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
                var visit = await _context.Visits.FindAsync(request.Id);

                if (visit == null)
                    throw new RestException(HttpStatusCode.NotFound, new { Visit = "Cound not find visit" });

                var user = await _context.Users.SingleOrDefaultAsync(x =>
                    x.UserName == _userAccessor.GetCurrentUsername());

                var attendance = await _context.UserVisits
                    .SingleOrDefaultAsync(x => x.VisitId == visit.Id && x.AppUserId == user.Id);

                if (attendance != null)
                    throw new RestException(HttpStatusCode.BadRequest,
                        new { Attendance = "Already attending this visit" });

                attendance = new UserVisit
                {
                    Visit = visit,
                    AppUser = user,
                    IsHost = false,
                    DateJoined = DateTime.Now
                };

                _context.UserVisits.Add(attendance);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}