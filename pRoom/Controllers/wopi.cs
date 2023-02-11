using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using pRoom.Models.wopi;
using System.IO;
using System.Runtime.Serialization.Json;
using System.Text;
using System.Net;
//using System.Web.Script.Serialization;

namespace pRoom.Controllers
{
    public class wopi : Controller
    {


        [HttpGet]
        [Route("wopi/files/{id}")]
        public async Task<IActionResult> Get(string id)
        {
           
            var filename = id;// HttpUtility.UrlDecode(stringarr[3]);
            Console.WriteLine("getid :" + filename);
            var access_token = HttpContext.Request.Query["access_token"];
            Console.WriteLine("access token : " + access_token);
            var editSession = GetEditSession(filename);
          
            if (editSession == null) return Json("no");
            editSession.m_name = access_token;
            Console.WriteLine("getid2 :" + filename);

            // return Json(editSession.GetCheckFileInfo());

            var memoryStream = new MemoryStream();
            var json2 = new DataContractJsonSerializer(typeof(WopiCheckFileInfo));
            json2.WriteObject(memoryStream, editSession.GetCheckFileInfo());
            memoryStream.Flush();
            memoryStream.Position = 0;
            StreamReader streamReader = new StreamReader(memoryStream);
            var jsonResponse = Encoding.UTF8.GetBytes(streamReader.ReadToEnd());
            return File(jsonResponse, "application/json");


        }


        [HttpGet]
        [Route("wopi/files/{id}/contents")]
        public async Task<IActionResult> Contents(string id)
        {
            var filename = id;// HttpUtility.UrlDecode(stringarr[3]);
            Console.WriteLine("contents :"+filename);

            var editSession = GetEditSession(filename);
            if (editSession == null) return Json("no");
            //return Json("ok");
            var content = editSession.GetFileContent();
            Console.WriteLine("contents2 :" + filename);
            // context.Response.ContentType = @"application/octet-stream";
            // context.Response.ContentLength64 = content.Length;
            return File(content, "application/octet-stream");
            //HttpContext.Response.ContentType = @"application/octet-stream";
            //HttpContext.Response.ContentLength = content.Length;
            //HttpContext.Response.Body.Write(content , 0, content.Length);
            //  context.Response.Body.WriteAsync(content, 0, content.Length);
          //  return Json( "ok");
        }


        [HttpPost]
        [Route("wopi/files/{id}")]
        public async Task<IActionResult> post(string id)
        {
            Console.WriteLine("post id :");
            var i = (int)HttpStatusCode.OK;
            return Json("OK");
        }
        [HttpPost]
        [HttpPut]
        [Route("wopi/files/{id}/contents")]
        public async Task<IActionResult> ContentsPost(string id)
        {
            Console.WriteLine("post contents :");
            var filename = id;
            var ms = new MemoryStream();
            HttpContext.Request.BodyReader.CopyToAsync(ms);
            var editSession = GetEditSession(filename);
            if (editSession == null) return Json("no");
            editSession.Save(ms.ToArray());
            var i = (int)HttpStatusCode.OK;
            return Json("OK");
        }




        public EditSession GetEditSession(string filename)
        {
            //byte[] data = Convert.FromBase64String(filename);
            //filename = Encoding.UTF8.GetString(data);
          //  filename = "141_word115.docx";
            EditSession editSession = EditSessionManager.Instance.GetSession(filename);
           
            var meetID = filename.Split('_')[0];
            var fn= filename.Split('_')[1];

            if (editSession == null)
            {
                var fileExt = filename.Substring(filename.LastIndexOf('.') + 1);
                var filePath = appInfo.path + "/wwwroot/files/board/"+meetID+"/offic/" + fn;
                if (!System.IO.File.Exists(filePath)) return null;
                editSession = new FileSession(filename, filePath, @"marx.yu", @"marx yu", @"marx.yuf@gmail.com", false,meetID);

                EditSessionManager.Instance.AddSession(editSession);
            }
            return editSession;
        }

        // GET: wopi
        public ActionResult Index()
        {
            return View();
        }

        // GET: wopi/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: wopi/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: wopi/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: wopi/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: wopi/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: wopi/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: wopi/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}
