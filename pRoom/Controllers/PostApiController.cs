using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DNTPersianUtils.Core;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using pRoom.Models.eventModel;
using pRoom.Models;
using System.IO;

namespace pRoom.Controllers
{
    public class PostApiController : Controller
    {
        // GET: PostApiController
        [HttpPost]
        [HttpGet]
        public string Index(string id)
        {
            Console.WriteLine("rrrrrrrrrrrrrrr");
            Console.WriteLine(id);
          //  return Json("id=5");
            return "ggg";
        }

        [HttpPost]        

        public async Task<string> on_client_disconnecte2dAsync()
        {
            Console.WriteLine("on user disconnect called");
            using (StreamReader stream = new StreamReader(HttpContext.Request.Body))
            {
                string body =await stream.ReadToEndAsync();
                Console.WriteLine(body);
                // body = "param=somevalue&param2=someothervalue"
            }
            return "ok";
        }

        [HttpPost]
        public string on_client_disconnected([FromBody] disconnecting r)
        {
            //Console.WriteLine("on_client_disconnected");
            //Console.WriteLine(r);
            //Console.WriteLine(r.clientid);
            var parts = r.clientid.Split('_').ToList();
            if (parts.Count != 2) return "";
            int meetID;
            int userID;
            var success = int.TryParse(parts[0],out meetID);
            var success2 = int.TryParse(parts[1], out userID);
            if (!success || !success2) return "";
            var meet = meetService.GetMeeting(meetID);
            if (meet == null) return "";
            userMD user;
            var success3 = meet.userManager.userDic.TryGetValue(userID.ToString(), out user);
            if (!success3) return "";
            user.isOffLine = 1;
           
            List<userMD> offlineUsers = new List<userMD>() { user };
            socketService.broadcastOffLineUser(meet, offlineUsers);

            return  "id=on_client_disconnected";
        }

        public class disconnecting
        {
            public string action { get; set; }
            public string clientid { get; set; }
            public string username { get; set; }
            public string ipaddress { get; set; }
            public int? keepalive { get; set; }
            public int? proto_ver { get; set; }
            public int? connected_at { get; set; }

        }

        [HttpPost]
        public JsonResult create([FromBody] editRoomVM r)
        {
            CreateRoomResult result = new CreateRoomResult();
            string secret = r.secret;
            if (secret != appInfo.secret)
            {
                result.status = "error";
                result.message = "secret inValid";
                return Json(result);
            }
            
            eventRoom room = new eventRoom();
           
            room.name = r.name;
            room.password = r.password;
            room.description = r.description;
            room.recording = r.record;
            room.duration = 50;
            room.CID = 20;
            room.createStatus = 0;
            room.isDemo = false;

            room.userCount = 50;
            room.userID = 7;
            room.CreateDate = DateTime.Now;
            eventRoomReposotory erm = new eventRoomReposotory();
            erm.Add(room);
            officControler.createDefultFolder(room.id);
            
            result.status = "ok";
            result.roomID = room.id;
            result.message = "room create by id : " + room.id;
            result.url = "";// "https://" + appInfo.host + "/room/start/" + room.id;

            return Json(result);
        }
        public string cc()
        {
            eventRoomReposotory erm = new eventRoomReposotory();
         //   erm.AddMeet();
            return "ok";
        }

        [HttpPost]
        public JsonResult createOLD([FromBody] createMeetApiModel r)
        {
            CreateRoomResult result = new CreateRoomResult();
            string secret = r.secret;
            if (secret != appInfo.secret)
            {
                result.status = "error";
                result.message = "secret inValid";
                return Json(result);
            }

            //eventRoom room = new eventRoom();

            //room.name = r.title;
            //room.password = r.password;
            //room.description = r.description;
          //  room.recording = r.record;
          //  room.duration = r.duration;
          //  room.CID = 20;
          //  room.createStatus = 0;
           // room.isDemo = false;

          //  room.userCount = 50;
          //  room.userID = 7;
          //  room.CreateDate = DateTime.Now;
            eventRoomReposotory erm = new eventRoomReposotory();
            var id=  erm.AddMeet(r);
            if (id == 0)
            {
                result.status = "error";
                result.message = "database insert eroor";
                return Json(result);
            }
            officControler.createDefultFolder(id);

            result.status = "ok";
            result.roomID = id;
            result.message = "room create by id : " + id;
            result.url = "";// "https://" + appInfo.host + "/room/start/" + room.id;

            return Json(result);
        }
        [HttpPost]
        public JsonResult edit([FromBody] editRoomVM r)
        {
            CreateRoomResult result = new CreateRoomResult();
            string secret = r.secret;
            if (secret != appInfo.secret)
            {
                result.status = "error";
                result.message = "secret inValid";
                return Json(result);
            }
            eventRoomReposotory erm = new eventRoomReposotory();

            eventRoom room =erm.get(r.id);
            if (room == null)
            {
                result.status = "error";
                result.message = "room not exist";
                return Json(result);
            }

            room.name = r.name;
            room.password = r.password;
            room.description = r.description;
            room.recording = r.record;
           
            room.duration = 120;
            room.CID = 20;
            room.createStatus = 0;
            room.isDemo = false;

            room.userCount = 50;
            room.userID = 7;
            room.CreateDate = DateTime.Now;
           
            erm.update(room);
            result.status = "ok";
            result.roomID = room.id;
            result.message = "room edit -  id : " + room.id;
            result.url = "";// "https://" + appInfo.host + "/room/start/" + room.id;

            return Json(result);
        }


        [HttpGet("installserver/{id?}")]
        public string installserver(string id)
        {
            if (id == "" || id == null) id = "null";
            Console.WriteLine(id);
            chatMessage m = new chatMessage()
            {
                insertTime = DateTime.Now,
                text = id,
                meetID = 0,
                nickName = "server",
                userName = "1",
                isDelete = 0
            };
            chatMessageReposotory cmr = new chatMessageReposotory();
            try
            {
                cmr.Add(m);
                Console.WriteLine(" add server : " + id);
            }
            catch { Console.WriteLine("error in add server : " + id); }
          
            
            return "ok";
        }

        public class CreateRoomResult
        {
            public string status { get; set; }
            public int roomID { get; set; }
            public string message { get; set; }
            public string url { get; set; }
        }
        public class createMeetApiModel
        {
            public string secret { get; set; }
            public string title { get; set; }
            public string description { get; set; }
            public string password { get; set; }
            public string spassword { get; set; }
            public string lang { get; set; }
        }
    }
}
