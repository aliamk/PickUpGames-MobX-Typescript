using System;                               // Exception
using System.Linq;                          // FirstOrDefault
using System.Net;                           // HttpStatusCode
using System.Text;                          // Encoding
using System.Threading;                     // CancellationToken
using System.Threading.Tasks;               // Task
using Application.Errors;                   // RestException
using Application.Interfaces;               // IJwtGenerator
using Application.Validators;               // Password
using Domain;                               // AppUser
using FluentValidation;                     // AbstractValidator
using MediatR;                              // IRequest
using Microsoft.AspNetCore.Identity;        // UserManager
using Microsoft.AspNetCore.WebUtilities;    // WebEncoders
using Microsoft.EntityFrameworkCore;        // AnyAsync
using Persistence;                          // DataContext

namespace Application.User
{
    public class Register
    {
        public class Command : IRequest
        {
            public string DisplayName { get; set; }
            public string Username { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }

            // Get origin of email from the API endpoints header (to use with registration email token)
            public string Origin { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.DisplayName).NotEmpty();
                RuleFor(x => x.Username).NotEmpty();
                RuleFor(x => x.Email).NotEmpty().EmailAddress();
                RuleFor(x => x.Password).Password();
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly UserManager<AppUser> _userManager;
            private readonly IEmailSender _emailSender;
            public Handler(DataContext context, UserManager<AppUser> userManager, IEmailSender emailSender)
            {
                _emailSender = emailSender;
                _userManager = userManager;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                // handler logic
                if (await _context.Users.AnyAsync(x => x.Email == request.Email))
                    throw new RestException(HttpStatusCode.BadRequest, new { Email = "Email already exists" });

                if (await _context.Users.AnyAsync(x => x.UserName == request.Username))
                    throw new RestException(HttpStatusCode.BadRequest, new { Username = "Username already exists" });

                var user = new AppUser
                {
                    DisplayName = request.DisplayName,
                    Email = request.Email,
                    UserName = request.Username
                };

                // Create new user if request is successful
                var result = await _userManager.CreateAsync(user, request.Password);
                // Don't create new user if request is NOT successful
                if (!result.Succeeded) throw new Exception("Problem creating user");

                // Generate a token to send via email and pass in the user
                var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                // Generates a token in pure string format, not query string
                token = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));
                // What the confirm registration url should look like in the email
                var verifyUrl = $"{request.Origin}/user/verifyEmail?token={token}&email={request.Email}";
                // What the email should look like
                var message = $"<p>Please click the below link to verify your email address:</p><p><a href='{verifyUrl}'>{verifyUrl}></a></p>";
                // Replace the JwtGenerator with this method
                await _emailSender.SendEmailAsync(request.Email, "Please verify email address", message);

                return Unit.Value;
            }
        }
    }
}