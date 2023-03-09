using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using pRoom.Models;
using pRoom.Models.eventModel;

namespace pRoom.Controllers
{
    public class recordController : Controller
    {
        public IActionResult simple()
        {
            simpleRecorder s = new simpleRecorder();
            
            return View(s);

        }
        public class simpleRecorder
        {
            public string serverID = appInfo.serverID;
            public string mqttServer = appInfo.mqttServer;
        }
        [HttpGet("record/{secret}/{username}")]
        public IActionResult start(string secret ,string username)
        {
            ViewBag.secret = secret;
            ViewBag.username = username;
            return View();

        }
        public IActionResult start2()
        {

            return View();

        }
        [HttpPost]
        public JsonResult getMessage([FromBody] recordGetMessageVM r)
        {
            recordSendMessageVM rsmm = new recordSendMessageVM();
           
            if (r.secret != appInfo.secret)
            {
                
                rsmm.state = "no";
                rsmm.message = "secret not valid";
                return Json(rsmm);
                 
            }
            requestReposotory reqReposotory = new requestReposotory();
            var rec = reqReposotory.getAndSet();
            if(rec == null)
            {
                rsmm.state = "no";
                rsmm.message = "requst not found";
                return Json(rsmm);
            }
            var meetID = rec.meetID;
            var meet = meetService.GetMeeting(meetID);
            if (meet == null)
            {
                rsmm.state = "no";
                rsmm.message = "meet not found";
                return Json(rsmm);
            }
            if (meet.recordMD.status > 0)
            {
                rsmm.state = "no";
                rsmm.message = "meet is record befor";
                return Json(rsmm);
            }
            meet.recordMD.status = 1;
            rsmm.state = "ok";
            rsmm.message = "requst   found";
            rsmm.req = rec;
            Console.WriteLine("requst for meet record ::::: meetid : " + rec.meetID + " requst id : " + rec.id + " time : " + DateTime.Now);
            try
            {
                return Json(rsmm);
            }
            catch
            {
                return Json(rsmm);
            }
            finally
            {
                rec.status = 2;

                reqReposotory.update(rec);
            }
           
        }


        public IActionResult Index(int id, int? duration)
        {
            if (duration == null) duration = 1;

            requestReposotory rr = new requestReposotory();

            // requestMD req = rr.get(id);
            requestMD req = new requestMD()
            {
                duration = 40,
                id = 20,
                meetID = 1,
                name = "record",
                status = 1
            };

            try
            {
                req.duration = duration.Value;
                return View(req);
            }
            catch
            {
                Console.WriteLine("erroe in requst : " + id);

                return View(req);
            }
            finally
            {
                req.status = 20;
               // rr.update(req);
            }

        }

        [HttpGet("record/rec/{id}/{username}/{start}/{fileCount}")]
        public IActionResult rec(int id,string userName,int start,int fileCount, int? duration )
        {
            if (userName == null) userName = "alialiali";
            if (duration == null) duration = 1;
            
            requestMDVM _requestMDVM = new requestMDVM();
            requestReposotory rr = new requestReposotory();

           // requestMD req = rr.get(id);
            joinRoomVM joinroom = new joinRoomVM();
            joinroom.cid = id;// req.meetID;
           
            joinroom.type = "s";
            joinroom.userName = userName;

            var res = (new joinRoomUtil()).joinRoomBase(joinroom);
           
            _requestMDVM.joinroom = res;
            _requestMDVM.req = null;
            _requestMDVM.meetID = id;
            _requestMDVM.start = start;
            _requestMDVM.fileCount = fileCount;



            try
            {
               // req.duration = duration.Value;
                return View(_requestMDVM);
            }
            catch
            {
                Console.WriteLine("erroe in requst : " + id);

                return View(_requestMDVM);
            }
            finally
            {
               // req.status = 10;
               // rr.update(req);
            }

        }
        public IActionResult rec2(int id, int? duration)
        {
            if (duration == null) duration = 1;

            requestMDVM _requestMDVM = new requestMDVM();
            requestReposotory rr = new requestReposotory();

            requestMD req = rr.get(id);
            joinRoomVM joinroom = new joinRoomVM();
            joinroom.cid = req.meetID;
            joinroom.type = "s";
            joinroom.userName = "alialiali";

            var res = (new joinRoomUtil()).joinRoomBase(joinroom);

            _requestMDVM.joinroom = res;
            _requestMDVM.req = req;


            try
            {
                // req.duration = duration.Value;
                return View(_requestMDVM);
            }
            catch
            {
                Console.WriteLine("erroe in requst : " + id);

                return View(_requestMDVM);
            }
            finally
            {
                req.status = 20;
                rr.update(req);
            }

        }

        [HttpPost]         
        [RequestFormLimits(MultipartBodyLengthLimit = 2097152000)]
        [RequestSizeLimit(2097152000)]
        public async Task<JsonResult> uploadWebm(IList<IFormFile> files)
        {

            Console.WriteLine("file upload webm : " );
            var fileID = int.Parse(Request.Form["fileID"][0].Trim());           
            var meetID = int.Parse(Request.Form["meetID"][0].Trim());
            var meet = meetService.GetMeeting(meetID);
            string envWWWPATH = appInfo.path + "/wwwroot/";
            var pdfPath = envWWWPATH + "files/record/" + meetID + ".webm";

            string jsonString = "{'ok':'upload complate}";
            foreach (IFormFile source in files)
            {                                
                //var exit = System.IO.Directory.Exists(pdfPath);
                //if (!exit) System.IO.Directory.CreateDirectory(pdfPath);
               
                using (FileStream output = System.IO.File.Create(pdfPath))
                await source.CopyToAsync(output);
                var _eventRoomReposotory = new eventRoomReposotory();
                var room = _eventRoomReposotory.get(meetID);
                if (room != null)
                {
                    room.recordUrl = "/files/record/" + meetID + ".webm";  
                    _eventRoomReposotory.update(room);
                }
                 
            }
            return Json( jsonString);

        }

       // public Process ppp =null;
       //public StreamWriter myStreamWriter =null;
       // public int isstart=0;
        [HttpPost]
        [RequestFormLimits(MultipartBodyLengthLimit = 2097152000)]
        [RequestSizeLimit(2097152000)]
        public async Task<JsonResult> uploadtest(IList<IFormFile> files)
        {

            Console.WriteLine("file upload webm : ");
           
           

            string jsonString = "{'ok':'upload complate}";
            foreach (IFormFile source in files)
            {
                using (var reader = new StreamReader(source.OpenReadStream()))
                {
                    //Console.WriteLine("isstart : " + isstart);
                   // var s = reader.ReadToEnd();
                    if (appInfo.ppp==null)  gg();
                    
                    var bytes = default(byte[]);
                    using (var memstream = new MemoryStream())
                    {
                        var buffer = new byte[512];
                        var bytesRead = default(int);
                        while ((bytesRead = reader.BaseStream.Read(buffer, 0, buffer.Length)) > 0)
                        {
                            memstream.Write(buffer, 0, bytesRead);
                            
                        }

                        memstream.WriteTo(appInfo.ppp.StandardInput.BaseStream);
                      //  appInfo.ppp.StandardInput.Flush();
                       // bytes = memstream.ToArray();
                    }
                    var err = appInfo.ppp.StandardError;

                  //  appInfo.ppp.StandardInput.BaseStream.Write(bytes);
                    ///  appInfo.myStreamWriter.Flush();
                 //   Console.WriteLine(" write data : "+bytes.Length);
                   
                   
                   // Console.WriteLine(s.Length);
                    StreamReader reader2 = appInfo.ppp.StandardOutput;
                    string output = err.ReadToEnd();

                    // Write the redirected output to this application's window.
                    Console.WriteLine(output);

                }
                //var exit = System.IO.Directory.Exists(pdfPath);
                //if (!exit) System.IO.Directory.CreateDirectory(pdfPath);

                //using (FileStream output = System.IO.File.Create(pdfPath))
                //    await source.CopyToAsync(output);
                //var _eventRoomReposotory = new eventRoomReposotory();
                //var room = _eventRoomReposotory.get(meetID);
                //if (room != null)
                //{
                //    room.recordUrl = "/files/record/" + meetID + ".webm";
                //    _eventRoomReposotory.update(room);
                //}

            }
            return Json(jsonString);

        }

        public void gg()
        {
            var processStartInfo = new ProcessStartInfo()
            {
                // ffmpeg arguments
                Arguments =getArg(),
                FileName = @"C:\Users\ali\Downloads\Vingester-win-x64\ffmpeg-2021-05-26-git-7a879cce37-full_build\bin\ffmpeg.exe",
                UseShellExecute = false,
                CreateNoWindow = true,
                RedirectStandardInput = true,
                RedirectStandardOutput = true,
                RedirectStandardError=true
        };
            Console.WriteLine("start ffmpeg process ...");
            appInfo.ppp = Process.Start(processStartInfo);
             appInfo.myStreamWriter = appInfo.ppp.StandardInput;
            StreamReader reader = appInfo.ppp.StandardOutput;
            string output = reader.ReadToEnd();

            // Write the redirected output to this application's window.
            Console.WriteLine(output);

            appInfo.ppp.WaitForExit();

        }
        public string getArg()
        {
            var s = "-i - -c:v libx264 -preset ultrafast -tune zerolatency -max_muxing_queue_size 1000 -bufsize 5000 -r 10 -g 30 -keyint_min 30  -x264opts keyint=30 -crf 25 -pix_fmt yuv420p -profile:v baseline -level 3 -c:a aac -b:a 44k -ar 44100 -f flv rtmp://localhost:1935/stream/144";
          var  s2 = "-f dshow -i video=\"screen-capture-recorder\":audio=\"Stereo Mix(IDT High Definition\" " +
                " - vcodec libx264 - preset ultrafast - tune zerolatency - r 10 - async 1 - acodec libmp3lame - ab 24k - ar 22050 - bsf:v h264_mp4toannexb " +
                  "-maxrate 750k - bufsize 3000k - f mpegts rtmp://localhost:1935/stream/144";
            Console.WriteLine(s);
            return s;
        }

        [HttpPost]
        [RequestFormLimits(MultipartBodyLengthLimit = 2097152000)]
        [RequestSizeLimit(2097152000)]
        public async Task<JsonResult> uploadWebm2(IList<IFormFile> files)
        {

            Console.WriteLine("file upload webm : ");
            var fileID = int.Parse(Request.Form["fileID"][0].Trim());
            var meetID = int.Parse(Request.Form["meetID"][0].Trim());
            var meet = meetService.GetMeeting(meetID);
            string envWWWPATH = appInfo.path + "/wwwroot/";
            var pdfPath = envWWWPATH + "files/record/" + meetID + ".webm";

            string jsonString = "{'ok':'upload complate}";
            foreach (IFormFile source in files)
            {
                //var exit = System.IO.Directory.Exists(pdfPath);
                //if (!exit) System.IO.Directory.CreateDirectory(pdfPath);

                using (FileStream output = System.IO.File.Create(pdfPath))
                    await source.CopyToAsync(output);
               

            }
            return Json(jsonString);

        }
        public IActionResult bb()
        {
            return View();
        }

        public class recordGetMessageVM
        {
            public string secret { get; set; }
        }

        public class recordSendMessageVM
        {
            public string state { get; set; }
            public requestMD req { get; set; } 
            public string message { get; set; }
        }
    }
}
