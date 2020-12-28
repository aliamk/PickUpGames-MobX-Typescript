using System;

namespace Domain
{
    public class Visit
    {
        public Guid Id { get; set; }
        public String Title { get; set; }
        public String Description { get; set; }
        public DateTime Date { get; set; }
        public String Location { get; set; }
    }

}