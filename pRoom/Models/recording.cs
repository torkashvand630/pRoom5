using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace pRoom.Models
{
    public class recordMD
    {
        public int recordAble = 0;
        public int status = 0;
        public string lastFileName;
    }
    public static class recording
    {
        public static  async Task<string> parse(message m,meeting meet)
        {
            var method = m.d.method;
          //  var meet = await meetService.GetMeeting(m.meetID);
            switch (method)
            {
                case "start":
                  var d=  await start(meet);
                   await meet.userManager.sendToUser(d, m.user,meet.id);
                    break;
                case "stop":
                    await stop(m,meet);
                    break;
                case "get":
                    await get(m,meet);
                    break;
            }
            return "";
        }
        public static string Base64Encode(string plainText)
        {
            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(plainText);
            return System.Convert.ToBase64String(plainTextBytes);
        }
        public static async Task<string> get(message m,meeting meet)
        {
           // var meet =await   meetService.GetMeeting(m.meetID);
            if (meet.st.record.status == "not")
            {
                dynamic d2 = new System.Dynamic.ExpandoObject();
                d2.type = "record";
                d2.method = "get";
                d2.status = "no";
                d2.message = "meet is not start befor";
               await meet.userManager.sendToUser(d2, m.user,meet.id);
                return "";
            }

            var id = meet.st.record.id ;
            if (id == "0") { return ""; }
            var myUri = new Uri("https://room.salampnu.com:4443/api/recordings/"+id);
            var myWebRequest = WebRequest.Create(myUri);
            var myHttpWebRequest = (HttpWebRequest)myWebRequest;
            myHttpWebRequest.PreAuthenticate = true;
            string s = "OPENVIDUAPP:MY_SECRET";
            s = Base64Encode(s);
            myHttpWebRequest.Headers.Add("Authorization", "Basic " + s);
            myHttpWebRequest.Accept = "application/json";
            myHttpWebRequest.Accept = "application/json";
            myHttpWebRequest.ContentType = "application/json";
            myHttpWebRequest.MediaType = "application/json";
            myHttpWebRequest.Method = "GET";
            var myWebResponse =await myWebRequest.GetResponseAsync();
            var responseStream = myWebResponse.GetResponseStream();
            if (responseStream == null)
            {
                return "";
            }

            var myStreamReader = new StreamReader(responseStream, Encoding.Default);
            var json = await myStreamReader.ReadToEndAsync();
            responseStream.Close();
            myWebResponse.Close();
            dynamic d = new System.Dynamic.ExpandoObject();
            d.type = "record";
            d.method = "get";
            d.res = json;
            await meet.userManager.sendToUser(d, m.user,meet.id);
          
            return "";
        }
        public static async Task<string> stop(message m,meeting meet)
        {
            //var meet =await  meetService.GetMeeting(m.meetID);
            if (meet.st.record.status != "start")
            {
                dynamic d2 = new System.Dynamic.ExpandoObject();
                d2.type = "record";
                d2.method = "stop";
                d2.status = "no";
                d2.message = "meet is not start befor";
                await meet.userManager.sendToUser(d2, m.user,meet.id);
                return "";
            }

            var id = meet.st.record.id;
            if(id=="0") { return ""; }
            var myUri = new Uri("https://room.salampnu.com:4443/api/recordings/stop/" + id);
            var myWebRequest = WebRequest.Create(myUri);
            var myHttpWebRequest = (HttpWebRequest)myWebRequest;
            myHttpWebRequest.PreAuthenticate = true;
            string s = "OPENVIDUAPP:MY_SECRET";
            s = Base64Encode(s);
            myHttpWebRequest.Headers.Add("Authorization", "Basic " + s);
            myHttpWebRequest.Accept = "application/json";
            myHttpWebRequest.Accept = "application/json";
            myHttpWebRequest.ContentType = "application/json";
            myHttpWebRequest.MediaType = "application/json";
            myHttpWebRequest.Method = "POST";
            var myWebResponse = await myWebRequest.GetResponseAsync();
            var responseStream = myWebResponse.GetResponseStream();
            if (responseStream == null)
            {
                return "";
            }

            var myStreamReader = new StreamReader(responseStream, Encoding.Default);
            var json = await myStreamReader.ReadToEndAsync();
            responseStream.Close();
            myWebResponse.Close();
            meet.st.record.status = "stop";
            dynamic d = new System.Dynamic.ExpandoObject();
            d.type = "record";
            d.method = "stop";
            d.res = json;
            await meet.userManager.sendToUser(d, m.user,meet.id);

          
            return "";
        }
        public static async Task<decimal> start(meeting meet)
        {
           // var meet = meetService.GetMeeting(m.meetID);
            if (meet.st.record.status == "start")
            {
                dynamic d2 = new System.Dynamic.ExpandoObject();
                d2.type = "record";
                d2.method = "start";
                d2.status = "no";
                d2.message = "meet is start befor";
               // userList.sendToUser(d2, m.userName);
                return d2;
            }
            var myUri = new Uri("https://room.salampnu.com:4443/api/recordings/start");
            var myWebRequest = WebRequest.Create(myUri);
            var myHttpWebRequest = (HttpWebRequest)myWebRequest;
            myHttpWebRequest.PreAuthenticate = true;
            string s = "OPENVIDUAPP:MY_SECRET";
            s = Base64Encode(s);
            myHttpWebRequest.Headers.Add("Authorization", "Basic " + s);
            myHttpWebRequest.Accept = "application/json";
            myHttpWebRequest.ContentType = "application/json";
            myHttpWebRequest.MediaType = "application/json";
            myHttpWebRequest.Method = "POST";
            using (var streamWriter = new StreamWriter(myHttpWebRequest.GetRequestStream()))
            {
                string json1 = "{\"session\":\""+meet.id+"\"}";
                Console.WriteLine(json1);
                streamWriter.Write(json1);
                streamWriter.Flush();
                streamWriter.Close();
            }

            var myWebResponse = await myWebRequest.GetResponseAsync();
            var responseStream = myWebResponse.GetResponseStream();
            if (responseStream == null)
            {
                dynamic d2 = new System.Dynamic.ExpandoObject();
                Console.WriteLine("recording is null");
                return d2;
            }

            var myStreamReader = new StreamReader(responseStream, Encoding.Default);
            var json = await myStreamReader.ReadToEndAsync();
            Console.WriteLine(json);
            responseStream.Close();
            myWebResponse.Close();
            var obj= JsonConvert.DeserializeObject<ExpandoObject>(json) as dynamic; 
            meet.st.record.status = "start";
            meet.st.record.id = obj.id;
            dynamic d = new System.Dynamic.ExpandoObject();
            d.type = "record";
            d.method = "start";
            d.res = json;
            d.status = "ok";
           // userList.sendToUser(d, m.userName);
            return d;
        }

        public static async Task<string> startSessions(meeting meet)
        {
            var myUri = new Uri("https://room.salampnu.com:4443/api/sessions");
            var myWebRequest = WebRequest.Create(myUri);
            var myHttpWebRequest = (HttpWebRequest)myWebRequest;
            myHttpWebRequest.PreAuthenticate = true;
            string s = "OPENVIDUAPP:MY_SECRET";
            s = Base64Encode(s);
            myHttpWebRequest.Headers.Add("Authorization", "Basic " + s);
            myHttpWebRequest.Accept = "application/json";
            myHttpWebRequest.ContentType = "application/json";
            myHttpWebRequest.MediaType = "application/json";
            myHttpWebRequest.Method = "POST";
            using (var streamWriter = new StreamWriter(myHttpWebRequest.GetRequestStream()))
            {
                string json1 = "{\"customSessionId\":\"" + meet.id + "\" ,\"recordingMode\":\"ALWAYS\" }";
                Console.WriteLine(json1);
                streamWriter.Write(json1);
                streamWriter.Flush();
                streamWriter.Close();
            }

            var myWebResponse = await myWebRequest.GetResponseAsync();
            var responseStream = myWebResponse.GetResponseStream();
            if (responseStream == null)
            {
                return "";
            }

            var myStreamReader = new StreamReader(responseStream, Encoding.Default);
            var json = await myStreamReader.ReadToEndAsync();
            Console.WriteLine("session start result");
            Console.WriteLine(json);
            responseStream.Close();
            myWebResponse.Close();
            meet.st.record.status = "start";
            meet.st.record.id = meet.id.ToString();
            var obj = JsonConvert.DeserializeObject<ExpandoObject>(json) as dynamic;
            //Console.WriteLine("rec res 1");
            //var r=   await start(meet);
            //Console.WriteLine("rec res 2");
            //var jsonString = Newtonsoft.Json.JsonConvert.SerializeObject(r);
            //Console.WriteLine("rec res : " + jsonString);
            return "ok";
        }
        public static async Task<string> setMeetVideoStartTime(meeting meet)
        {
            
            var myUri = new Uri("https://room.salampnu.com:4443/api/recordings/" + meet.id);
            var myWebRequest = WebRequest.Create(myUri);
            var myHttpWebRequest = (HttpWebRequest)myWebRequest;
            myHttpWebRequest.PreAuthenticate = true;
            string s = "OPENVIDUAPP:MY_SECRET";
            s = Base64Encode(s);
            myHttpWebRequest.Headers.Add("Authorization", "Basic " + s);
            myHttpWebRequest.Accept = "application/json";
            myHttpWebRequest.Accept = "application/json";
            myHttpWebRequest.ContentType = "application/json";
            myHttpWebRequest.MediaType = "application/json";
            myHttpWebRequest.Method = "GET";
            var myWebResponse = await myWebRequest.GetResponseAsync();
            var responseStream = myWebResponse.GetResponseStream();
            if (responseStream == null)
            {
                return "";
            }

            var myStreamReader = new StreamReader(responseStream, Encoding.Default);
            var json = await myStreamReader.ReadToEndAsync();
            Console.WriteLine("get meet video start time : ");
            Console.WriteLine(json);
            responseStream.Close();
            myWebResponse.Close();
            var obj = JsonConvert.DeserializeObject<ExpandoObject>(json) as dynamic;
             
            meet.videoStartTime = obj.createdAt/100 +45;
            return "";
        }
    }
}
