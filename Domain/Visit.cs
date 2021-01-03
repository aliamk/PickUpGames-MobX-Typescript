using System;
using System.Collections.Generic;       // ICollection

namespace Domain
{
    public class Visit
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public string Venue { get; set; }
        public string City { get; set; }
        public ICollection<UserVisit> UserVisits { get; set; }
    }
}