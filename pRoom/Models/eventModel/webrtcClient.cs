 
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Net;
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
                string atach = "{\"janus\":\"attach\",\"plugin\":\"janus.plugin.videoroom\",\"opaque_id\":\" "+webRtcUtil.RandomString(14)+" \",\"transaction\":\"aJFyBUFL7OFS\"}";
                string create = "{\"janus\":\"message\",\"body\":{\"request\":\"create\",\"room\":" +roomID + ",\"permanent\":" + isdemo.ToString().ToLower() + ",\"description\":\"nnnnnn\",\"bitrate\":128000,\"publishers\":100,\"record\":false,\"videocodec\":\"vp9\",\"video_svc\":true },\"transaction\":\"iLwOX3LhFOJt\"}";
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
                Console.WriteLine("error in create webrtc rooom " +roomID);
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
