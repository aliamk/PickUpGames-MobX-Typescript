using System;               // Guid

namespace Application.Visits
{
    public class VisitDTO
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public string Venue { get; set; }
        public string City { get; set; }
    }
}