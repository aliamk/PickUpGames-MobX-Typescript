using System.Threading.Tasks;       // Task

namespace Application.Interfaces
{
    public interface IEmailSender
    {
        Task SendEmailAsync(string userEmail, string emailSubject, string message);
    }
}