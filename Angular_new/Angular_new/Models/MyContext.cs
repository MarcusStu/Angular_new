using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Angular_new.Models
{
    public class MyContext : DbContext
    {
        public MyContext() : base("DefaultConnection") { }

        public static MyContext Create()
        {
            return new MyContext();
        }

        public DbSet<Person> People { get; set; }

    }
}