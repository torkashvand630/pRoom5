using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
//using smsPortal.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
//using Aspose.Pdf.Operators;
//using Microsoft.EntityFrameworkCore;
//using vRoom.Data;

//using System.Web.UI.WebControls;
//using System.Web.UI.HtmlControls;

//using System.Web.Mvc;

namespace pRoom.Models.eventModel
{
    public interface IuserManagerEvent
    {
        string login(string UserName, string PassWord );
       // string setdb(ApplicationDbContext mdb);
        mUser GetUser();
        void eee(HttpContext hh);
        void ddd();
        void Logout();
        void setCookies(mUser u);
    }
    public  class userManagerEvent: IuserManagerEvent
    {
       // public ApplicationDbContext db;

       
        public mUser muser;
        public loginUser loginUser;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public userManagerEvent(IHttpContextAccessor h )
        {
            _httpContextAccessor = h;
              
        }

        

        public void ddd()
        {
            _httpContextAccessor.HttpContext.Response.Redirect("dddddddddd");
        }
       public void eee(HttpContext hh)
        {
            hh.Response.Redirect("fffffffffff");
        }
        public string login(string email, string PassWord )
        {
            eventUserReposotory eur = new eventUserReposotory();
            var rec = eur.get(email,PassWord);
            //var rec = db.mUsers.FirstOrDefault(a => a.Email == email.Trim() && a.Password == PassWord.Trim());
            if (rec == null)
                return "0";
            setCookies(rec);
            //var guid = System.Guid.NewGuid();
            //var logier = db.loginUsers.FirstOrDefault(a => a.userID == rec.Id);
            //if (logier == null)
            //{
            //    logier = new loginUser()
            //    {
            //        userID = rec.Id,
            //    };
            //    db.loginUsers.Add(logier);
            //}

            //logier.dateTime = DateTime.Now;
            //logier.guid = guid.ToString();
            //db.SaveChanges();
           
            //HttpContext.Current.Response.Cookies["BookGUID"].Value = _loginUser.guid;
            //HttpContext.Current.Response.Cookies["BookGUID"].Expires = DateTime.Now.AddDays(1);
            //this.muser = rec;
            //this.loginUser = logier;

            return "ok";
        }
        public void setCookies(mUser u)
        {
            CookieOptions option = new CookieOptions();
            option.Expires = DateTime.Now.AddDays(100);

            _httpContextAccessor.HttpContext.Response.Cookies.Append("GUID", u.Guid, option);
        }
        public  void Logout()
        {
            //var user = GetUser();
            //var loginUser1 = db.loginUsers.FirstOrDefault(a => a.userID == user.Id);
            //if (loginUser1 != null)
            //{s
            //    db.loginUsers.Remove(loginUser1);
            //    db.SaveChanges();
            //}
            //CookieOptions option = new CookieOptions();
            //option.Expires = DateTime.Now.AddDays(1);

            //_httpContextAccessor.HttpContext.Response.Cookies.Append("GUID", "", option);
            //exit();

        }

        public void Get()
        {
            //  RedirectResult("/Home/login");
        }

        public mUser GetUser()
        {
             
            if (_httpContextAccessor.HttpContext.Request.Cookies["GUID"] == null)
            {
                //Console.WriteLine("guid not found 111111111111111");
                
                return null;
            }

            var GUID = _httpContextAccessor.HttpContext.Request.Cookies["GUID"];
            if (GUID == "" || GUID == null)
            {
                //Console.WriteLine("guid not found 222222222222");
               
                return null;
            }
            eventUserReposotory eur = new eventUserReposotory();

            var rec = eur.getByGuid(GUID);
            return rec;
            //loginUser = db.loginUsers.FirstOrDefault(a => a.guid == smsGUID);
            //if(loginUser==null)
            //{
               
            //    Console.WriteLine("guid not found 222222222222");
            //    return null;
            //}

            //var user = db.mUsers.FirstOrDefault(a => a.Id == loginUser.userID);
            //if (user == null)
            //{
              
            //    Console.WriteLine("guid not found 222222222222");
            //    return null;
            //}
            //this.muser = user;
           
            return null;
        }

        public void exit()
        {
            _httpContextAccessor.HttpContext.Response.Redirect("/Home/login");
            
        }

        public object GetService(Type serviceType)
        {
            return null;
           // throw new NotImplementedException();
        }

        public void signout()
        {
            
        }

        //public bool isAccessable(string accessAction, int accessMode)
        //{
        //    // var user = GetUser();
        //    var access = db.accesss.Where(a => a.name == accessAction).FirstOrDefault();
        //    if (access == null) return true;
        //    var userAccesss = db.userAccesss.Where(a => a.access.name == accessAction && a.portalUserID == portalUser.id).FirstOrDefault();
        //    if (userAccesss != null)
        //    {
        //        if (userAccesss.accessMode >= accessMode) return true;
        //        else return false;
        //    }
        //    var roleAccess = db.roleAccesss.Where(a => a.roleID == portalUser.roleID && a.access.name == accessAction).FirstOrDefault();
        //    if (roleAccess != null)
        //    {
        //        if (roleAccess.accessMode >= accessMode) return true;
        //        else return false;
        //    }
        //    return false;
        //}
    }
}