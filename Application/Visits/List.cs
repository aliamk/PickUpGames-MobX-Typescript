using System.Collections.Generic;       // List
using System.Threading;                 // IRequestHandler (Implement Interface)
using System.Threading.Tasks;           // IRequestHandler (Implement Interface)
using Domain;                           // Visit
using MediatR;                          // IRequest
using Microsoft.EntityFrameworkCore;    // ToListAsync
using Persistence;                      // DataContext

namespace Application.Visits
{
    public class List
    {
        public class Query : IRequest<List<Visit>> { }
        public class Handler : IRequestHandler<Query, List<Visit>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Visit>> Handle(Query request,
                CancellationToken cancellationToken)
            {
                var visits = await _context.Visits
                    .Include(x => x.UserVisits)
                    .ThenInclude(x => x.AppUser)
                    .ToListAsync();

                return visits;
            }
        }
    }
}