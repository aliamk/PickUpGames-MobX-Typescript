using System;                           // Guid
using System.Collections.Generic;       // ICollection
using System.Text.Json.Serialization;   //JsonProperty

namespace Application.Visits
{
    public class VisitDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public string Venue { get; set; }
        public string City { get; set; }

        [JsonPropertyName("attendees")]
        public ICollection<AttendeeDto> UserVisits { get; set; }

    }
}