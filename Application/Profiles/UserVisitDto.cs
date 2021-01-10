using System;               // Guid + DateTime

namespace Application.Profiles
{
    public class UserVisitDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Venue { get; set; }
        public DateTime Date { get; set; }
    }
}