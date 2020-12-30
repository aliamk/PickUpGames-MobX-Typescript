using System;                   // Exception
using System.Net;               // HttpStatusCode
using System.Threading;         // CancellationToken
using System.Threading.Tasks;   // Task
using Application.Errors;       // RestException
using MediatR;                  // IRequest
using Persistence;              // DataContext


namespace Application.Visits
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var visit = await _context.Visits.FindAsync(request.Id);
                // If the a match for the visit id is not found, return error message
                if (visit == null)
                    throw new RestException(HttpStatusCode.NotFound, new { visit = "Not found" });
                //  Else, delete the visit
                _context.Remove(visit);

                // If SaveChangesAsync returns a value more than 0, this means user has 
                // successfully added an item to the database and we just want to return that value
                var success = await _context.SaveChangesAsync() > 0;
                if (success) return Unit.Value;
                //  Else, retirn this error message
                throw new Exception("Problem saving changes");
            }
        }
    }
}