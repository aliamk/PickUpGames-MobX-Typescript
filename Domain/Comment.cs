using System;           // Guid

namespace Domain
{
    public class Comment
    {
        public Guid Id { get; set; }
        public string Body { get; set; }
        public virtual AppUser Author { get; set; }
        public virtual Visit Visit { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}