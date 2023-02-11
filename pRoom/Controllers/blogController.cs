using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using pRoom.Models.eventModel;

namespace pRoom.Controllers
{
    public class blogController : Controller
    { 
        public IuserManagerEvent _userManager;
        public blogController(IuserManagerEvent u)
        {
            _userManager = u;
        }
        public  IActionResult  item(int id)
        {

            MyPage myPage = new MyPage(Request);
            myPage.muser = _userManager.GetUser();
            ViewBag.mypage = myPage;



            var blog = (new blogReposotory()).get(id);
            if (blog == null)
            {
                return NotFound();
            }

            myPage.name = "blog_" + blog.id;
         
            ViewBag.mypage = myPage;
            return View(blog);
        }



        public async Task<IActionResult> About()
        {
            MyPage myPage = new MyPage(Request);
            myPage.muser = _userManager.GetUser();
           
            ViewBag.mypage = myPage;


            return View();
        }
        public async Task<IActionResult> x11(string id)
        {
           
            MyPage myPage = new MyPage(Request);
            myPage.muser = _userManager.GetUser();

            ViewBag.mypage = myPage;
            List<eventRoom> list = new List<eventRoom>();
            Console.WriteLine("secret : "+ id);
            if (id==null || id=="" || id.Trim() != appInfo.secret) return View(list);

            list = (new eventRoomReposotory()).getAll().OrderByDescending(a=>a.id).ToList();

            return View(list);
        }
        public async Task<IActionResult> x12(string id)
        {

            MyPage myPage = new MyPage(Request);
            myPage.muser = _userManager.GetUser();

            ViewBag.mypage = myPage;
            List<userMeet> list = new List<userMeet>();
            Console.WriteLine("secret : " + id);
            if (id == null || id == "" || id.Trim() != appInfo.secret) return View(list);

            list = (new userMeetReposotory()).getAll();

            return View(list);
        }
        public async Task<IActionResult> Contact()
        {
            MyPage myPage = new MyPage(Request);
            myPage.muser = _userManager.GetUser();
          
            ViewBag.mypage = myPage;


            return View();
        }


    }
}
