using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using pRoom.Models.eventModel;

namespace pRoom.Controllers
{
    public class documentController : Controller
    {
        // GET: documentController
        public IuserManagerEvent _userManager;
        public IHttpContextAccessor _httpContextAccessor;
        public documentController(IuserManagerEvent u, IHttpContextAccessor httpContextAccessor)
        {
            _userManager = u;
            _httpContextAccessor = httpContextAccessor;
        }
        public ActionResult Index()
        {
            MyPage myPage = new MyPage(Request);
            myPage.muser = _userManager.GetUser();
            ViewBag.mypage = myPage;
            return View();
        }
        public ActionResult install()
        {
            MyPage myPage = new MyPage(Request);
            myPage.muser = _userManager.GetUser();
            ViewBag.mypage = myPage;
            return View();
        }
        public ActionResult api()
        {
            MyPage myPage = new MyPage(Request);
            myPage.muser = _userManager.GetUser();
            ViewBag.mypage = myPage;
            return View();
        } 
    }
}
