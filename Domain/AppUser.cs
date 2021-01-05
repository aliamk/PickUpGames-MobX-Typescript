using System.Collections.Generic;           // ICollection
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }

        public string Bio { get; set; }
        public virtual ICollection<UserVisit> UserVisits { get; set; }
        public virtual ICollection<Photo> Photos { get; set; }
    }
}

// virtual = lazy loading