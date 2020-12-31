using System;                   // Guid + DateTime
using System.Threading;         // IRequestHandler
using System.Threading.Tasks;   // IRequestHandler
using Domain;                   // Visit
using FluentValidation;         // AbstractValidator
using MediatR;                  // IRequest
using Persistence;              // DataContext

// FOR USERS TO ADD A VISIT ITEM TO THE DATABASE

namespace Application.Visits
{
    public class Create
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public String Title { get; set; }
            public String Description { get; set; }
            public string Category { get; set; }
            public DateTime Date { get; set; }
            public string Venue { get; set; }
            public string City { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Title).NotEmpty();
                RuleFor(x => x.Description).NotEmpty();
                RuleFor(x => x.Category).NotEmpty();
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
                var visit = new Visit
                {
                    Id = request.Id,
                    Title = request.Title,
                    Description = request.Description,
                    Category = request.Category,
                    Date = request.Date,
                    Venue = request.Venue,
                    City = request.City
                };
                _context.Visits.Add(visit);

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