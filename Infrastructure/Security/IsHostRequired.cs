using System;                                                   // Guid
using System.Linq;                                              // SingleOrDefault
using System.Security.Claims;                                   // ClaimTypes
using System.Threading.Tasks;                                   // Task
using Microsoft.AspNetCore.Authorization;                       // AuthorizationHandler
using Microsoft.AspNetCore.Http;                                // IHttpContextAccessor
using Microsoft.AspNetCore.Mvc.Filters;                         // AuthorizationFilterContext
using Persistence;                                              // DataContext

namespace Infrastructure.Security
{
    public class IsHostRequirement : IAuthorizationRequirement
    {
    }

    public class IsHostRequirementHandler : AuthorizationHandler<IsHostRequirement>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;                     // Bring in context for User and Visit
        private readonly DataContext _context;
        public IsHostRequirementHandler(IHttpContextAccessor httpContextAccessor, DataContext context)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsHostRequirement requirement)
        {
            if (context.Resource is AuthorizationFilterContext authContext)
            {
                var currentUserName = _httpContextAccessor.HttpContext.User?.Claims?.SingleOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;

                var visitId = Guid.Parse(authContext.RouteData.Values["id"].ToString());    // Project IDs are GUIDS which need parsing into strings to be passed to the route parameter 

                var visit = _context.Visits.FindAsync(visitId).Result;                      // Get the visit by ID

                var host = visit.UserVisits.FirstOrDefault(x => x.IsHost);                  // Get the  UserVisit Id and check for host parameter

                if (host?.AppUser?.UserName == currentUserName)                             // If host's username matches currentUserName, allow user to edit/delete
                    context.Succeed(requirement);
            }
            else
            {
                context.Fail();
            }

            return Task.CompletedTask;
        }
    }
}