using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net.WebSockets;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using Dapper;
using System.Threading;
using System.Text;
using System.Collections.Concurrent;
using pRoom.Models;

namespace pRoom
{
    public class userManager
    {
        public ConcurrentDictionary<string, userMD> userDic = new ConcurrentDictionary<string, userMD>();

        public userManager()
        {
            this.userDic = new ConcurrentDictionary<string, userMD>();
        }
        public async Task<string> parse(message m, int meetID)
        {
            var action = m.d.action;
            switch (action)
            {
                case "addStream":
                    await addStream(m, meetID);
                    break;
                case "removeStream":
                    await removeStream(m, meetID);
                    break;
                case "permission":
                    await SetPermission(m, meetID);
                    break;
                case "raiseHand":
                    await raiseHand(m, meetID);
                    break;

            }
            return "";
        }
        public async Task raiseHand(message m, int meetID)
        {
            await mqtt.send(meetID, m.d);

        }
        public async Task<string> SetPermission(message m, int meetID)
        {
            if (m.user.role != 1) return "";
            var to = m.d.toUserName;
            Permission per = new Permission()
            {
                audio = m.d.audio,
                video = m.d.video,
                toolBox = m.d.toolBox,
                file = m.d.file,
                chat = m.d.chat,
                screen = m.d.screen,
                diagram = m.d.diagram,
                MathEditor = m.d.MathEditor,
                offic = m.d.offic,
                Develop = m.d.Develop,
            };
            if (to == "DefaultPermission")
            {
                var meet = meetService.GetMeeting(meetID);
                if (meet != null)
                {
                    meet.permission = per;
                    foreach (var u in meet.userManager.userDic)
                    {
                        try
                        {
                            if (u.Value.role == 0) u.Value.permission = per;
                        }
                        catch { };

                    }
                    await simpleTimer.offlineUserForMeet(meet);
                }
                dynamic d = new System.Dynamic.ExpandoObject();
                d.type = "userManager";
                d.action = "DefaultPermission";
                d.Permission = per;
                await mqtt.send(meetID, d);

                return "";
            }
            else
            {
                userMD user = getUserByUserName(to);
                if (user == null) return "";
                user.permission = per;
                m.d.user = user;
                await mqtt.send(meetID, m.d);
                return "";
            }




        }
        public userMD messagetToUserMap(message m, WebSocket w)
        {


            userMD u;
            if (m.d.reConecting)
            {
                long r = m.d.role;
                u = new userMD((int)(r));
            }

            else u = new userMD();
            u.name = m.userName;
            u.meetID = m.meetID;

            u.lastTime = DateTime.Now;
            u.isOffLine = 0;
            return u;
        }
        public userMD messagetToUserMapFromPing(message m, WebSocket w)
        {

            userMD u = new userMD();
            u.name = m.userName;
            u.meetID = m.meetID;

            u.lastTime = DateTime.Now;
            u.isOffLine = 0;
            return u;
        }
        public userMD getUserByUserName(string userName)
        {
            if (userDic.ContainsKey(userName))
            {
                return userDic[userName];
            }
            else return null;
        }
        public void addUser(userMD u)
        {
            //object x = new object();
            //lock (meetService.loadingDic)
            //{
            if (this.userDic.ContainsKey(u.name))
            {

                var rec = this.userDic[u.name];
                rec.lastTime = DateTime.Now;
                rec.isOffLine = 0;

            }
            else
            {

                this.userDic.TryAdd(u.name, u);
            }
            // }



        }


        public void ping(message m)
        {
            m.user.lastTime = DateTime.Now;
            m.user.isOffLine = 0;
        }
        public async Task<string> addStream(message m, int meetID)
        {
            var streamId = m.d.streamId;
            var video = m.d.video;

            var audio = m.d.audio;
            //m.user.webrtcStream.streamId = streamId;
            //m.user.webrtcStream.audio = audio;
            //m.user.webrtcStream.video = video;

            //dynamic d = new System.Dynamic.ExpandoObject();
            //d.type = "userManager";
            //d.action = "setStreamId";

            //d.user = m.user;
            //var jsonString = Newtonsoft.Json.JsonConvert.SerializeObject(d);
            await mqtt.send(meetID, m.messStr);

            return "";
        }
        public async Task<string> removeStream(message m, int meetID)
        {

            // m.user.webrtcStream.streamId = "";
            await mqtt.send(meetID, m.messStr);
            return "";
        }
        public async Task<string> sendMeetUserList(string userName, int meetID)
        {
            if (!userDic.ContainsKey(userName)) return "";
            var user = userDic[userName];
            dynamic d = new System.Dynamic.ExpandoObject();
            d.type = "userManager";
            d.action = "userList";
            d.userDic = userDic.Values.Where(a => a.isOffLine == 0).ToDictionary(a => a.name);

            await sendToUser(d, user, meetID);
            return "";
        }
        public async Task<string> sendNewUser(userMD user, int meetID)
        {
            dynamic d = new System.Dynamic.ExpandoObject();

            d.type = "userManager";
            d.action = "newUser";
            d.user = user;
            var jsonString = Newtonsoft.Json.JsonConvert.SerializeObject(d);
            await mqtt.send(meetID, jsonString);
            //await sendToAllAsync(jsonString);
            return "";
        }
        public async Task<string> sendToAllAsync21(dynamic d)
        {

            //  string meetIDstr = d.meetInfo.meetID;// int.Parse(s);
            //  int meetID = int.Parse(meetIDstr);
            // Console.WriteLine("meet id is : " + meetID);                    
            var jsonString = Newtonsoft.Json.JsonConvert.SerializeObject(d);
            await sendToAllAsync21(jsonString);

            return "";
        }
        public async Task<string> sendToAllAsync21(string jsonString)
        {



            return "";
        }
        public async Task sendToUser(object d, userMD u, int meetID)
        {
            await mHub.BroadcastToConnection2(d, u.ConnectionId);

            //  var jsonString = Newtonsoft.Json.JsonConvert.SerializeObject(d);

            //await mqtt.send("user_"+meetID+"_"+u.name, jsonString);

        }
        //public   async Task<string> sendToUser(object d, string userName)
        //{
        //    if (!userDic.ContainsKey(userName)) return "";
        //    var user = userDic[userName];
        //    await sendToUser(d, user);
        //    return "";
        //}
      

        public async Task<string> sendExitToUser(userMD user, int meetID)
        {
            dynamic d = new System.Dynamic.ExpandoObject();

            d.type = "userManager";
            d.action = "exit";
            d.user = user;
            //Console.WriteLine("user exit : " + d);
            // var jsonString = Newtonsoft.Json.JsonConvert.SerializeObject(d);
            await sendToUser(d, user, meetID);
            return "";
        }
    }
    public static class messengerUtil
    {
        public static async Task sendExitToUser(string ConnectionId)
        {
            dynamic d = new System.Dynamic.ExpandoObject();

            d.type = "userManager";
            d.action = "exit";
            await mHub.BroadcastToConnection2(d, ConnectionId);
        }
        public static async Task sendReloadToUser(string ConnectionId,string showWelcomMessage)
        {
            dynamic d = new System.Dynamic.ExpandoObject();

            d.type = "userManager";
            d.action = "reload";
           // if(showWelcomMessage==null ) d.x = "1";
             d.x = showWelcomMessage;
            await mHub.BroadcastToConnection2(d, ConnectionId);
        }
    }

    public class Permission
    {
        public long video { get; set; } = 0;
        public long audio { get; set; } = 1;
        public long toolBox { get; set; } = 0;
        public long file { get; set; } = 0;
        public long chat { get; set; } = 1;
        public long screen { get; set; } = 0;
        public long diagram { get; set; } = 0;
        public long MathEditor { get; set; } = 0;
        public long offic { get; set; } = 0;
        public long Develop { get; set; } = 0;
        public long Record { get; set; } = 0;
        public Permission(int publisher)
        {
            this.video = publisher;
            this.audio = 1;
            this.toolBox = publisher;
            this.file = publisher;
            this.chat = 1;
            this.screen = publisher;
            this.diagram = publisher;
            this.MathEditor = publisher;
            this.offic = publisher;
            this.Develop = publisher;
            if (appInfo.record == 1 && publisher == 1) this.Record = publisher;
        }
        public Permission()
        {

        }
    }
}
