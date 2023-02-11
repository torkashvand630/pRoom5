using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using pRoom.Models.eventModel;
using pRoom.Models;
namespace pRoom.Controllers
{
    [EnableCors("MyPolicy")]    
    public class userController : Controller
    {
        public IuserManagerEvent _userManager;
        public userController(IuserManagerEvent u)
        {
            _userManager = u;
        }
        public IActionResult Index()
        {
            return View();
        }
        [HttpGet("ddd")]
        public IActionResult ddd()
        {
            return View();
        }
        public ActionResult Register()
        {
            MyPage myPage = new MyPage(Request);
            myPage.muser = _userManager.GetUser();
            ViewBag.mypage = myPage;
            return View();
        }

        [HttpPost]
        public JsonResult Register([FromBody] regesterVM r)
        {
            joinRoomResult jrm = new joinRoomResult();
            r.email = r.email.ToLower().Trim();

            eventUserReposotory eur = new eventUserReposotory();
            var rec = eur.getByEmail(r.email);
            if (rec != null)
            {
                jrm.status = "no";
                jrm.message = Translate.t.front_user_emailRepetitious;
                return Json(jrm);
            }
             rec = new mUser()
            {
                Name = r.name,
                Email = r.email,
                Password = r.pass,
                Guid = System.Guid.NewGuid().ToString(),
                RoleID = 1,
                Mobile=""
            };

            eur.Add(rec);
            _userManager.setCookies(rec);
            jrm.status = "ok";
            return Json(jrm);
        }

       
        public ActionResult Login()
        {
            MyPage myPage = new MyPage(Request);
            myPage.muser = _userManager.GetUser();
            ViewBag.mypage = myPage;
            return View();
        }

        [HttpPost]
        public string Login([FromBody] logInVM r)
        {
            var s = _userManager.login(r.email, r.pass);
            Console.WriteLine(s);
            return s;
        }

        [HttpPost]
        
        public string login2([FromBody] logInVM r)
        {
            var s = _userManager.login(r.email, r.pass);
            //Console.WriteLine("gggggggggggg");
            return s;
        }

        public ActionResult Logout()
        {
            _userManager.Logout();
            return View();
        }
    }
}
