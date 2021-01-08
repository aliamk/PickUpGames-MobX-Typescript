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
            // Get var username from the Hub Context (extraced into its own method - GetUserName below)
            string username = GetUsername();
            // Add username to the command which is being sent to the Create Handler
            command.Username = username;
            // Send comment via mediator
            var comment = await _mediator.Send(command);
            // Send comment to any user connected to this particular chathub
            await Clients.Group(command.VisitId.ToString()).SendAsync("ReceiveComment", comment);
        }

        private string GetUsername()
        {
            return Context.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;
        }

        public async Task AddToGroup(string groupName)
        {
            //When hub connection is started, the visit Id will be checked
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
            var username = GetUsername();
            await Clients.Group(groupName).SendAsync("Send", $"{username} has joined the group");
        }

        public async Task RemoveFromGroup(string groupName)
        {
            //When hub connection is started, the visit Id will be checked
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
            var username = GetUsername();
            await Clients.Group(groupName).SendAsync("Send", $"{username} has left the group");
        }
    }
}


