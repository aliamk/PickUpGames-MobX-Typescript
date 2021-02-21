using System.Collections.Generic;           // ICollection
using System.Collections.ObjectModel;       // Collection
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public AppUser()
        { 
            Photos = new Collection<Photo>();
        }
        public string DisplayName { get; set; }
        public string Bio { get; set; }
        public virtual ICollection<UserVisit> UserVisits { get; set; }
        public virtual ICollection<Photo> Photos { get; set; }
        // public virtual ICollection<UserFollowing> Followings { get; set; }
        // public virtual ICollection<UserFollowing> Followers { get; set; }
        public virtual ICollection<RefreshToken> RefreshTokens { get; set; }
    }
}

// virtual = lazy loading