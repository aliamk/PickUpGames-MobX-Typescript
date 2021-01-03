using System.Collections.Generic;       // List
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
        public class Query : IRequest<List<VisitDto>> { }
        public class Handler : IRequestHandler<Query, List<VisitDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<List<VisitDto>> Handle(Query request,
                CancellationToken cancellationToken)
            {
                var visits = await _context.Visits.ToListAsync();

                return _mapper.Map<List<Visit>, List<VisitDto>>(visits);
            }
        }
    }
}