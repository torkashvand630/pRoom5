using Dapper;
using Dapper.Contrib.Extensions;
using Microsoft.AspNetCore.Http;
using pRoom.Models.eventModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace pRoom.Models
{
    [Table("tblRequest")]
    public class requestMD
    {
        [Key]
        public int id { get; set; }
        public string name { get; set; }
        public int meetID { get; set; }
        public int status { get; set; }
        public DateTime insertTime { get; set; }
        public int duration { get; set; }


    }
    public class requestMDVM
    {
        public requestMD req;
        public joinRoomResult joinroom;
        public int meetID;
        public string serverID=appInfo.serverID;
        public string mqttServer = appInfo.mqttServer;
        public int start;
        public int fileCount;

    }


    public class requestReposotory
    {

        public void Add(meeting meet)
        {
            string sQuery = "INSERT INTO tblRequest (name,meetID,status, insertTime , duration )"
                               + " VALUES(@name,@meetID,@status, @insertTime ,@duration ); SELECT CAST(SCOPE_IDENTITY() as int)";
            using var db = appInfo.GetDbconnection();
            db.Open();
            int id = db.Query<int>(sQuery, new { name = "record", meetID = meet.id, status = 0, insertTime = DateTime.Now, duration = meet.meetManagPrpperty.duration }).Single();
            //  runChrome(id);
        }
        public void addRecord(requestMD m)
        {
            using var db = appInfo.GetDbconnection();
            db.Open();
            db.Insert(m);
        }
        public void runChrome(int id)
        {
            //string command = "https://learn100.ir/n/" + 10;
            //ProcessStartInfo ps = new ProcessStartInfo(command) { UseShellExecute = true };
            //var browserExecutable = "chrome/Chrome-bin/chrome.exe";// @"E:\chrome\ch7\chromium\src\out\ali6\chrome.exe";// "C:\\Users\\Administrator\\AppData\\Local\\Chromium\\Application\\chrome.exe";
            //Process.Start(browserExecutable, command);
            // string domainName = HttpContext.Request.Url.GetLeftPart(UriPartial.Authority);
            // string domainName = HttpContext.Current.Request.Url.GetLeftPart(UriPartial.Authority);
            System.Diagnostics.Process.Start("cmd", "/C start " + appInfo.domainName + "/record/index/" + id);
        }

        public requestMD get()
        {
            using var db = appInfo.GetDbconnection();
            //using var db = appInfo.GetDbconnection();
            try
            {
                var m = db.Query<requestMD>("Select * From tblRequest where status=0").FirstOrDefault();
                return m;
            }
            catch
            {
                Console.WriteLine("error in db connection ....");
                return null;
            }

        }
        public requestMD getAndSet()
        {
            using var db = appInfo.GetDbconnection();
            Object objLock = new Object();

            lock (objLock)
            {
                try
                {
                    var m = db.Query<requestMD>("Select * From tblRequest where status=0").FirstOrDefault();
                    if (m != null)
                    {
                        m.status = 1;
                        update(m);
                    }
                    return m;
                }
                catch
                {
                    Console.WriteLine("error in db connection ....");
                    return null;
                }
            }


        }
        public requestMD get(int id)
        {
            using var db = appInfo.GetDbconnection();

            var m = db.Query<requestMD>("Select * From tblRequest where id=" + id).FirstOrDefault();
            return m;
        }
        public requestMD getByMeetID(int id)
        {
            using var db = appInfo.GetDbconnection();

            var m = db.Query<requestMD>("Select * From tblRequest where meetID=" + id).FirstOrDefault();
            return m;
        }
        public void update(requestMD m)
        {
            using var db = appInfo.GetDbconnection();
            //db.Query<meetManagPrpperty>("UPDATE Room set createStatus='" + m.createStatus + "'  where id=" + m.id).FirstOrDefault();
            var r = db.Update(m);
            // db.Update(new eventRoom { id=m.id , name = m.name,description=m.description,password=m.password,duration=m.duration,startTime=m.startTime ,createStatus= m.createStatus});

        }
    }
}
