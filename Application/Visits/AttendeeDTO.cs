using System.Collections.Generic;               // ICollection

namespace Application.Visits
{
    public class AttendeeDTO
    {
        public string Username { get; set; }
        public string DisplayName { get; set; }
        public string Image { get; set; }
        public bool IsHost { get; set; }
        public bool Following { get; set; }
        public ICollection<AttendeeDTO> Attendees { get; set; }
    }
}