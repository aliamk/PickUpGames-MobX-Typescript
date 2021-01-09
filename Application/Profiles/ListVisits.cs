using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class ListVisits
    {
        // Query class
        public class Query : IRequest<List<UserVisitDto>>
        {
            public string Username { get; set; }
            public string Predicate { get; set; }
        }

        // Handler Logic
        public class Handler : IRequestHandler<Query, List<UserVisitDto>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<UserVisitDto>> Handle(Query request,
                CancellationToken cancellationToken)
            {
                // Get user
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == request.Username);

                if (user == null)
                    throw new RestException(HttpStatusCode.NotFound, new { User = "Not found" });

                // Build the query (order by visit date and send as a queryable)
                var queryable = user.UserVisits
                    .OrderBy(a => a.Visit.Date)
                    .AsQueryable();

                switch (request.Predicate)
                {
                    case "past":
                        queryable = queryable.Where(a => a.Visit.Date <= DateTime.Now); // All visits prior to today's date
                        break;
                    case "hosting":
                        queryable = queryable.Where(a => a.IsHost);                     // All visits where user is the host
                        break;
                    default:
                        queryable = queryable.Where(a => a.Visit.Date >= DateTime.Now); // All visits in the future
                        break;
                }

                // Pass the UserVisits into a list
                var visits = queryable.ToList();
                // Store the new list as DTOs
                var visitsToReturn = new List<UserVisitDto>();

                // Create UserVisitDto from each of the Visits in the new list
                foreach (var visit in visits)
                {
                    var userVisit = new UserVisitDto
                    {
                        Id = visit.Visit.Id,
                        Title = visit.Visit.Title,
                        Date = visit.Visit.Date
                    };

                    // Add the UserVisitDto to the visitsToReturn list
                    visitsToReturn.Add(userVisit);
                }
                // Return the up-to-date visitsToReturn
                return visitsToReturn;
            }
        }
    }
}