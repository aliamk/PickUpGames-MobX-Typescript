using System.Collections.Generic;       // List
using System.Linq;                      // AsQueryable
using System.Threading;                 // IRequestHandler (Implement Interface)
using System.Threading.Tasks;           // IRequestHandler (Implement Interface)
using AutoMapper;                       // IMapper
using Domain;                           // Visit
using MediatR;                          // IRequest
using Microsoft.EntityFrameworkCore;    // ToListAsync
using Persistence;                      // DataContext

namespace Application.Visits
{
    public class List
    {
        public class VisitsEnvelope
        {
            public List<VisitDto> Visits { get; set; }
            public int VisitCount { get; set; }
        }
        public class Query : IRequest<VisitsEnvelope>
        {
            public Query(int? limit, int? offset)
            {
                Limit = limit;
                Offset = offset;
            }
            public int? Limit { get; set; }
            public int? Offset { get; set; }
        }
        public class Handler : IRequestHandler<Query, VisitsEnvelope>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<VisitsEnvelope> Handle(Query request,
                CancellationToken cancellationToken)
            {
                var queryable = _context.Visits.AsQueryable();
                var visits = await queryable
                    .Skip(request.Offset ?? 0)
                    .Take(request.Limit ?? 3).ToListAsync();

                return new VisitsEnvelope
                {
                    Visits = _mapper.Map<List<Visit>, List<VisitDto>>(visits),
                    VisitCount = queryable.Count()
                };
            }
        }
    }
}