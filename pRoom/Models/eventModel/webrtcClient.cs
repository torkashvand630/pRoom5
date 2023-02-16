
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Dynamic;
using System.Linq;
using System.Net;
using System.Runtime.InteropServices;
using System.Threading.Tasks;

namespace pRoom.Models.eventModel
{
    public class webrtcClient
    {

        public void addRoomToWebrtcRoom(int roomID, Boolean isdemo)
        {
            return;
            try
            {
                var baseAddress = "http://" + appInfo.mediaServer + ":8088/janus";
                string parsedContent = "{\"janus\":\"create\",\"transaction\":\"jj\" }";
                string atach = "{\"janus\":\"attach\",\"plugin\":\"janus.plugin.videoroom\",\"opaque_id\":\" " + webRtcUtil.RandomString(14) + " \",\"transaction\":\"aJFyBUFL7OFS\"}";
                string create = "{\"janus\":\"message\",\"body\":{\"request\":\"create\",\"room\":" + roomID + ",\"permanent\":" + isdemo.ToString().ToLower() + ",\"description\":\"nnnnnn\",\"bitrate\":128000,\"publishers\":100,\"record\":false,\"videocodec\":\"vp9\",\"video_svc\":true },\"transaction\":\"iLwOX3LhFOJt\"}";
                var cli = new WebClient();
                cli.Headers[HttpRequestHeader.ContentType] = "application/json";
                string response = cli.UploadString(baseAddress, parsedContent);
                var exObj = JsonConvert.DeserializeObject<ExpandoObject>(response) as dynamic;
                var id = exObj.data.id;
                baseAddress += "/" + id;
                response = cli.UploadString(baseAddress, atach);
                exObj = JsonConvert.DeserializeObject<ExpandoObject>(response) as dynamic;
                id = exObj.data.id;
                baseAddress += "/" + id;
                response = cli.UploadString(baseAddress, create);
                exObj = JsonConvert.DeserializeObject<ExpandoObject>(response) as dynamic;
                id = exObj.plugindata.data.room;
                Console.WriteLine("webrtc room created in backend : " + id);
            }
            catch
            {
                Console.WriteLine("error in create webrtc rooom " + roomID);
            }


        }
    }
    public static class liveKit
    {
        public static async Task<string> getToken(string name, string userId , int meetID)
        {
            name = name.Replace(" ", "");
            if(name.Length>5)
            name = name.Substring(0, 5);
            string command = "";// "pdftoppm -jpeg " + pdfFile + " " + outFile;
            if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
            {
                command = appInfo.livekitcli + "livekit-cli create-token --api-key devkey --api-secret secret --join --room "+meetID+ " --name "+name+"  --identity " + userId+" --valid-for 24h";
                Console.WriteLine("platform is win");
            }
           // Console.WriteLine(command);
            // string result = "";
            using (System.Diagnostics.Process proc = new System.Diagnostics.Process())
            {
                proc.StartInfo.WindowStyle = ProcessWindowStyle.Normal;
                proc.StartInfo.Verb = "runas";
                proc.StartInfo.FileName = @"C:\Windows\System32\cmd.exe";
                proc.StartInfo.Arguments = "/c " + command;
                proc.StartInfo.UseShellExecute = false;
                proc.StartInfo.RedirectStandardOutput = true;
                proc.StartInfo.RedirectStandardError = true;
                proc.StartInfo.CreateNoWindow = true;

                proc.Start();
                string result = proc.StandardOutput.ReadToEnd();
              //  Console.WriteLine("101");
                await proc.WaitForExitAsync();

              //  Console.WriteLine(result);
                if (result == null || result == "") return "";
                var resPart = result.Split('\n').ToList();
                if (resPart.Count < 9) return "";

              //  Console.WriteLine(resPart[7]);
                var tokrnPart = resPart[7].Split(':').ToList();
                if (tokrnPart.Count != 2) return "";
                var token = tokrnPart[1].Trim();
              //  Console.WriteLine(token);
                return token;



            }
        }
    }
    public static class webRtcUtil
    {
        private static Random random = new Random();
        public static string RandomString(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }
    }

}
