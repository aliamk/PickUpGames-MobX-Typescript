using System.Text;                          // Encoding
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;               // IEmailSender
using Domain;                               // AppUser
using MediatR;                              // IRequest
using Microsoft.AspNetCore.Identity;        // UserManager
using Microsoft.AspNetCore.WebUtilities;    // WebEncoders

namespace Application.User
{
    public class ResendEmailVerification
    {
        public class Query : IRequest
        {
            public string Email { get; set; }
            public string Origin { get; set; }
        }

        public class Handler : IRequestHandler<Query>
        {
            private readonly IEmailSender _emailsender;
            private readonly UserManager<AppUser> _userManager;
            public Handler(UserManager<AppUser> usermanager, IEmailSender emailsender)
            {
                _userManager = usermanager;
                _emailsender = emailsender;
            }

            public async Task<Unit> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _userManager.FindByEmailAsync(request.Email);
                // Generate a token to send via email and pass in the user
                var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                // Generates a token in pure string format, not query string
                token = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));
                // What the confirm registration url should look like in the email
                var verifyUrl = $"{request.Origin}/user/verifyEmail?token={token}&email={request.Email}";
                // What the email should look like
                var message = $"<p>Please click the below link to verify your email address:</p><p><a href='{verifyUrl}'>{verifyUrl}></a></p>";
                // Replace the JwtGenerator with this method
                await _emailsender.SendEmailAsync(request.Email, "Please verify email address", message);

                return Unit.Value;
            }
        }
    }
}