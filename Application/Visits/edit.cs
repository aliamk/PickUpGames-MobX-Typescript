using System;                   // Exception
using System.Threading;         // CancellationToken
using System.Threading.Tasks;   // Task
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
            public DateTime? Date { get; set; }     // Question mark added because it's optional
            public string Location { get; set; }
        }

        // Using the Fluent Validation package to intercept and validate data sent by the user
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Title).NotEmpty();
                RuleFor(x => x.Description).NotEmpty();
                RuleFor(x => x.Date).NotEmpty();
                RuleFor(x => x.Location).NotEmpty();
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
                var activity = await _context.Visits.FindAsync(request.Id);
                if (activity == null)
                    throw new Exception("Could not find activity");

                // User can edit all of these files.  If user doesn't enter a Title field, just leave it as Title
                activity.Title = request.Title ?? activity.Title;
                activity.Description = request.Description ?? activity.Description;
                activity.Date = request.Date ?? activity.Date;
                activity.Location = request.Location ?? activity.Location;

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