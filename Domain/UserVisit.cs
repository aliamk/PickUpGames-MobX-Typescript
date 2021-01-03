using System;           // Guid + DateTime

namespace Domain
{
    public class UserVisit
    {
        public string AppUserId { get; set; }
        public virtual AppUser AppUser { get; set; }
        public Guid VisitId { get; set; }
        public virtual Visit Visit { get; set; }
        public DateTime DateJoined { get; set; }
        public bool IsHost { get; set; }
    }
}