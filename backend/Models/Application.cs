using System;

namespace backend.Models
{
    public class Application
    {
        public int ID { get; set; }
        public string Company { get; set; }
        public string Position { get; set; }
        public string Status { get; set; } // e.g. "Applied", "Interview", "Offer", "Rejected"
        public DateTime AppliedDate { get; set; }
    }
}
