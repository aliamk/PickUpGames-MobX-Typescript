using System.Linq;                          // FirstOrDefault
using System.Security.Claims;               // ClaimTypes
using System.Threading.Tasks;               // Task
using Application.Comments;                 // Create
using MediatR;                              // IMediator
using Microsoft.AspNetCore.SignalR;         // Hub

namespace API.SignalR
{
    public class ChatHub : Hub
    {
        private readonly IMediator _mediator;
        public ChatHub(IMediator mediator)                 // Using Mediator to send the comments to the create handler
        {
            _mediator = mediator;
        }

        public async Task SendComment(Create.Command command)
        {
            var username = Context.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;

            command.Username = username;

            var comment = await _mediator.Send(command);

            await Clients.All.SendAsync("ReceiveComment", comment);
        }
    }
}

// Task:
// Get var username from the Hub Context
// Add username to the command which is being sent to the Create Handler
// Send comment via mediator
// Send comment to any user connected to this particular chathub