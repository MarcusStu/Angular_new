using Angular_new.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

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
            object newInfo = null;
            newInfo = db.People.Single(p => p.Id == Id);
            return Json(newInfo, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Edit(int? Id, string Name, string Gender, string Adress, string City)
        {
            object newInfo = null;
            //newInfo = db.People.Add();
            db.SaveChanges();
            return Json(newInfo, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Create(Person newPerson) //, int Id, string Name, string Gender, string Adress, string City
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
                return Json(aPerson.Name + "Dident exist in database", JsonRequestBehavior.AllowGet);
            }

            db.People.Remove(aPerson);
            db.SaveChanges();


            return Json(aPerson, JsonRequestBehavior.AllowGet);
        }
    }
}