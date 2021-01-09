using System;                           // DateTime                    
using System.Collections.Generic;       // List
using System.Linq;                      // AsQueryable
using System.Threading;                 // IRequestHandler (Implement Interface)
using System.Threading.Tasks;           // IRequestHandler (Implement Interface)
using Application.Interfaces;           // IUserAccessor
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
            public Query(int? limit, int? offset, bool isGoing, bool isHost, DateTime? startDate)
            {
                Limit = limit;
                Offset = offset;
                IsGoing = isGoing;
                IsHost = isHost;
                StartDate = startDate ?? DateTime.Now;
            }
            public int? Limit { get; set; }
            public int? Offset { get; set; }
            public bool IsGoing { get; set; }
            public bool IsHost { get; set; }
            public DateTime? StartDate { get; set; }
        }
        public class Handler : IRequestHandler<Query, VisitsEnvelope>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _mapper = mapper;
                _userAccessor = userAccessor;
                _context = context;
            }

            public IUserAccessor UserAccessor { get; }

            public async Task<VisitsEnvelope> Handle(Query request,
                CancellationToken cancellationToken)
            {
                var queryable = _context.Visits
                    .Where(x => x.Date >= request.StartDate)
                    .OrderBy(x => x.Date)
                    .AsQueryable();

                if (request.IsGoing && !request.IsHost)
                {
                    queryable = queryable.Where(x => x.UserVisits.Any(a => a.AppUser.UserName == _userAccessor.GetCurrentUsername()));
                }

                if (request.IsHost && !request.IsGoing)
                {
                    queryable = queryable.Where(x => x.UserVisits.Any(a => a.AppUser.UserName == _userAccessor.GetCurrentUsername() && a.IsHost));
                }

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