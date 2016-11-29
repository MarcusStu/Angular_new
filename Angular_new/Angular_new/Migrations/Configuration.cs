namespace Angular_new.Migrations
{
    using Models;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<Angular_new.Models.MyContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
        }

        protected override void Seed(Angular_new.Models.MyContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //

            context.People.AddOrUpdate(
              p => p.Name,
              new Person { Name = "Andrew Peters", Gender = "Male", Adress = "Somestreet 4", City = "Jönköping" },
              new Person { Name = "Brice Lambson", Gender = "Male", Adress = "Somestreet 8", City = "Bankeryd" },
              new Person { Name = "Rowan Miller", Gender = "Male", Adress = "Somestreet 4", City = "Nässjö" }
            );
        }
    }
}
