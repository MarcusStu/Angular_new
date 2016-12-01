using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Angular_new.Models
{
    public class Person
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }
        public string Gender { get; set; }
        public string Adress { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
    }
}