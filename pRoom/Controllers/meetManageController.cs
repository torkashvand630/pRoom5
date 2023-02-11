using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using pRoom.Models;

namespace pRoom.Controllers
{
    public class meetManageController : Controller
    {
        private Microsoft.Extensions.Hosting.IHostingEnvironment _env;
        public meetManageController(Microsoft.Extensions.Hosting.IHostingEnvironment env)
        {

            _env = env;
        }
        public IActionResult Index()
        {
            return View();
        }

       
        [HttpGet("mm/{meetID}/{meetName?}/{isLimit?}/{duration?}/{UserCount?}")]
        public string manage(int meetID, string meetName, int? isLimit, int? duration, int? UserCount)
        {
            if (meetName == null || meetName == "") meetName = "کلاس ازمایشی 3";
            if (isLimit == null) isLimit = 1;
            if (duration == null) duration = 2;
            if (UserCount == null) UserCount = 10;


            meetManagReposotory mmr = new meetManagReposotory();
            meetManagPrpperty m = mmr.get(meetID);
            if (m != null)
            {
                return "no";
            }
            m = new meetManagPrpperty()
            {
                meetID = meetID,
                meetName = meetName,
                isLimit = isLimit.Value,
                duration = duration.Value,
                UserCount = UserCount.Value,
                startTime = DateTime.Now,
                finishStatus = "no"

            };

            mmr.Add(m);
            meeting meet = new meeting(m);
            APPST.meetDic.TryAdd(meet.id, meet);
            return "ok";
        }
        [HttpGet("reset/{meetID}")]
        public string reset(int meetID)
        {
            var meet = meetService.GetMeeting(meetID);
            if (meet == null) return "no";
            meet.reset();
            string envWWWPATH = _env.ContentRootPath + "\\wwwroot\\";
            var pdfPath = envWWWPATH + "files\\board\\" + meetID + "\\";
            try
            {
                Directory.Delete(pdfPath, true);
            }
            catch { Console.WriteLine("eroor in reset meet : file deelete"); }
          

            return "ok";
        }
        public string manage2(int meetID, string meetName, int? isLimit, int? duration, int? UserCount)
        {

            return "ok";
        }
    }
}
