using System.Threading.Tasks;           // Task
using Application.Interfaces;           // IEmailSender
using Microsoft.Extensions.Options;     // IOptions
using SendGrid;                         // SendGridClient
using SendGrid.Helpers.Mail;            // SendGridMessage

namespace Infrastructure.Email
{
    public class EmailSender : IEmailSender             // Use the IEmailSender interface
    {
        private readonly IOptions<SendGridSettings> _settings;
        public EmailSender(IOptions<SendGridSettings> settings)
        {
            _settings = settings;
        }

        public async Task SendEmailAsync(string userEmail, string emailSubject, string message)
        {
            // throw new System.NotImplementedException();
            var client = new SendGridClient(_settings.Value.Key);
            var msg = new SendGridMessage
            {
                From = new EmailAddress("info@aliamalek.dev", _settings.Value.User),
                Subject = emailSubject,
                PlainTextContent = message,
                HtmlContent = message
            };
            msg.AddTo(new EmailAddress(userEmail));
            // don't add click tracking to the email links we send inside our email
            msg.SetClickTracking(false, false);

            await client.SendEmailAsync(msg);
        }
    }
}