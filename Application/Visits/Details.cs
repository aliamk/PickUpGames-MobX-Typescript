using System;                   // Guid
using System.Threading;         //  IRequestHandler
using System.Threading.Tasks;   // IRequestHandler
using Domain;                   // Visit
using MediatR;                  // IRequest
using Persistence;              // DataContext

// REQUEST A SINGLE VISIT FROM THE VISITS TABLE

namespace Application.Visits
{
    public class Details
    {
        public class Query : IRequest<Visit>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Visit>
        {
            private readonly DataContext _context; // Initialise field from parameter (on context)
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Visit> Handle(Query request,
                CancellationToken cancellationToken)
            {
                var visit = await _context.Visits.FindAsync(request.Id);
                return visit;
            }
        }
    }
}