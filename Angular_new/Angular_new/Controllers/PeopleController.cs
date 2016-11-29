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
    }
}