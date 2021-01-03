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
            public Guid Id { get; set; }                                                                        // Visit ID
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;                                                                   // User's userId
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var visit = await _context.Visits.FindAsync(request.Id);                                        // Get the specific visit

                if (visit == null)
                    throw new RestException(HttpStatusCode.NotFound, new { Visit = "Cound not find visit" });   // Visit not found

                var user = await _context.Users.SingleOrDefaultAsync(x =>
                    x.UserName == _userAccessor.GetCurrentUsername());                                          // Get the user object

                var attendance = await _context.UserVisits
                    .SingleOrDefaultAsync(x => x.VisitId == visit.Id && x.AppUserId == user.Id);                // Get the attendance object

                if (attendance != null)                                                                         //  If attendance already exists
                    throw new RestException(HttpStatusCode.BadRequest,                                          //  throw an error bc user is
                        new { Attendance = "Already attending this visit" });                                   //  already attending this visit                              

                attendance = new UserVisit                                                                      // Otherwise create a new attendance
                {
                    Visit = visit,
                    AppUser = user,
                    IsHost = false,
                    DateJoined = DateTime.Now
                };

                _context.UserVisits.Add(attendance);                                                            // Pass in the new attendance

                // Save to database
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}