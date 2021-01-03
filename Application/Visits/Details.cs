using System;                           // Guid
using System.Net;                       // HttpStatusCode
using System.Threading;                 // IRequestHandler
using System.Threading.Tasks;           // IRequestHandler
using Application.Errors;               // RestException
using Domain;                           // Visit
using MediatR;                          // IRequest
using Microsoft.EntityFrameworkCore;    // Include
using Persistence;                      // DataContext

// REQUEST A SINGLE VISIT FROM THE VISITS TABLE

namespace Application.Visits
{
    public class Details
    {
        public class Query : IRequest<VisitDTO>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, VisitDTO>
        {
            private readonly DataContext _context; // Initialise field from parameter (on context)
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<VisitDTO> Handle(Query request,
                CancellationToken cancellationToken)
            {
                var visit = await _context.Visits
                    .Include(x => x.UserVisits)
                    .ThenInclude(x => x.AppUser)
                    .SingleOrDefaultAsync(x => x.Id == request.Id);

                if (visit == null)
                    throw new RestException(HttpStatusCode.NotFound, new { visit = "Not found" });
                //  Else, delete the visit
                _context.Remove(visit);

                return visit;
            }
        }
    }
}