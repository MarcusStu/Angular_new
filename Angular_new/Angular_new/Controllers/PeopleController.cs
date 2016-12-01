using Angular_new.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using static Angular_new.Models.Country;

namespace Angular_new.Controllers
{
    public class PeopleController : Controller
    {
        MyContext db = new MyContext();
        // GET: People
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult AjaxThatReturnsJson()
        {

            var myInfo = db.People.ToList();
            return Json(myInfo, JsonRequestBehavior.AllowGet);
        }

        public JsonResult AjaxThatReturnsJsonPerson(int? Id)
        {
            object myInfo = null;

            myInfo = db.People.Single(p => p.Id == Id);

            if (myInfo == null)
            {
                myInfo = new { Id = 0, firstName = "Not", lastName = "Found" };
            }

            return Json(myInfo, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Edit(int? Id)
        {
            object editInfo = null;
            editInfo = db.People.Single(p => p.Id == Id);
            return Json(editInfo, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Edit(Person person)
        {
            if (ModelState.IsValid)
            {
                db.Entry(person).State = EntityState.Modified;
                db.SaveChanges();
                return Json(person, JsonRequestBehavior.AllowGet);
            }
            return Json(person, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Create(Person newPerson) //, int Id, string Name, string Gender, string Adress, string City, string Country
        {
            object newInfo = null;
            newInfo = db.People.Add(newPerson);
            db.SaveChanges();
            return Json(newInfo, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Remove(int? Id)
        {

            var aPerson = db.People.SingleOrDefault(p => p.Id == Id);

            if (aPerson == null)
            {
                return Json(aPerson.Name + "Didn't exist in the database!", JsonRequestBehavior.AllowGet);
            }

            db.People.Remove(aPerson);
            db.SaveChanges();


            return Json(aPerson, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetCountries()
        {
            var countriesenum = Enum.GetValues(typeof(Countries));
            List<string> countries = new List<string>();

            foreach (var country in countriesenum)
            {
                countries.Add(country.ToString());
            }

            return Json(countries, JsonRequestBehavior.AllowGet);
        }
    }
}