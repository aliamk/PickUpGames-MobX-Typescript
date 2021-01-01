using System;                   // Exception
using System.Net;               // HttpStatusCode
using System.Threading;         // CancellationToken
using System.Threading.Tasks;   // Task
using Application.Errors;       // RestException
using FluentValidation;         // AbstractValidator
using MediatR;                  // IRequest
using Persistence;              // DataContext


namespace Application.Visits
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }            // User can't edit this but it's included for identification purposes
            public string Title { get; set; }
            public string Description { get; set; }
            // public string Category { get; set; }
            public DateTime? Date { get; set; }     // Question mark added because it's optional
            public string Venue { get; set; }
            public string City { get; set; }
        }

        // Using the Fluent Validation package to intercept and validate data sent by the user
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Title).NotEmpty();
                RuleFor(x => x.Description).NotEmpty();
                // RuleFor(x => x.Category).NotEmpty();
                RuleFor(x => x.Date).NotEmpty();
                RuleFor(x => x.Venue).NotEmpty();
                RuleFor(x => x.City).NotEmpty();
            }
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
                if (visit == null)
                    throw new RestException(HttpStatusCode.NotFound, new { visit = "Not found" });
                //  Else, delete the visit
                _context.Remove(visit);

                // User can edit all of these files.  If user doesn't enter a Title field, just leave it as Title
                visit.Title = request.Title ?? visit.Title;
                visit.Description = request.Description ?? visit.Description;
                // visit.Category = request.Category ?? visit.Category;
                visit.Date = request.Date ?? visit.Date;
                visit.Venue = request.Venue ?? visit.Venue;
                visit.City = request.City ?? visit.City;

                // If SaveChangesAsync returns a value more than 0, this means user has 
                // successfully added an item to the database and we just want to return that value
                var success = await _context.SaveChangesAsync() > 0;
                if (success) return Unit.Value;
                //  Else, return this error message
                throw new Exception("Problem saving changes");
            }
        }
    }
}