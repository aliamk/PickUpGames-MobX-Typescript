using System;               // Guid

namespace Application.Comments
{
    public class CommentDto
    {
        public Guid Id { get; set; }
        public string Body { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Username { get; set; }            // Needed to route to the user's profile
        public string DisplayName { get; set; }
        public string Image { get; set; }
    }
}