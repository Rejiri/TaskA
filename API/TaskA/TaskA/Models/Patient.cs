using System;
using System.ComponentModel.DataAnnotations;

namespace TaskA.Models
{
    public class Patient
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public int FileNo { get; set; }
        public string CitizenId { get; set; }
        [Required]
        public DateTime Birthdate { get; set; }
        [Required]
        public int Gender { get; set; }
        public string Nationality { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string ContactPerson { get; set; }
        public string ContactRelation { get; set; }
        public string ContactPhone { get; set; }
        public string PhotoUrl { get; set; }
        [Required]
        public DateTime FirstVisitDate { get; set; }

        internal DateTime RecordCreationDate;
    }
}
