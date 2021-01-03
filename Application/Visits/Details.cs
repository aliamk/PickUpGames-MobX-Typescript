using System;                           // Guid
using System.Net;                       // HttpStatusCode
using System.Threading;                 // IRequestHandler
using System.Threading.Tasks;           // IRequestHandler
using Application.Errors;               // RestException
using AutoMapper;                       // IMapper
using Domain;                           // Visit
using MediatR;                          // IRequest
using Microsoft.EntityFrameworkCore;    // Include
using Persistence;                      // DataContext

// REQUEST A SINGLE VISIT FROM THE VISITS TABLE

namespace Application.Visits
{
    public class Details
    {
        public class Query : IRequest<VisitDto>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, VisitDto>
        {
            private readonly DataContext _context; // Initialise field from parameter (on context)
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            public async Task<VisitDto> Handle(Query request,
                CancellationToken cancellationToken)
            {
                var visit = await _context.Visits
                    .Include(x => x.UserVisits)
                    .ThenInclude(x => x.AppUser)
                    .SingleOrDefaultAsync(x => x.Id == request.Id);

                if (visit == null)
                    throw new RestException(HttpStatusCode.NotFound, new { visit = "Not found" });

                var visitToReturn = _mapper.Map<Visit, VisitDto>(visit);

                return visitToReturn;
            }
        }
    }
}