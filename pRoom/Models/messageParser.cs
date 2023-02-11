using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net.WebSockets;
using System.Threading.Tasks;
using Microsoft.AspNetCore.WebSockets;
using System.Text;
using System.Threading;
using pRoom.Models;

namespace pRoom
{
    public static class messageParser
    {
        public static async Task<string> parseSimple(dynamic d,   string messStr,string connectionid, string guid=null)
        {

            using message m = new message(d, messStr);
           
            var meet = meetService.GetMeeting(m.meetID);
            if (meet == null)
            {
                await messengerUtil.sendReloadToUser(connectionid,"1");
                return "";
            }

            if (!meet.userManager.userDic.TryGetValue(m.userName, out m.user))
            {
                await messengerUtil.sendReloadToUser(connectionid,"0");
                return "";
                //Console.WriteLine("user not found : " + m.userName);
                //dynamic d100 = new System.Dynamic.ExpandoObject();
                //d100.type = "userManager";
                //d100.action = "reload";
                // var jsonString = Newtonsoft.Json.JsonConvert.SerializeObject(d100);
                // await mqtt.send("user_"+m.meetID+"_" + m.userName, jsonString);
                // await socketService.reloadUserPage(m, guid);
                //  await mHub.BroadcastToConnection2(d100, connectionid);
               
            }
           

            switch (m.type)
            {
                case "join":                    
                    await Join(m,   meet, guid);
                    break;

                case "activeFile":                   
                    await activeFile(m, meet);
                    break;
                case "textMessage":
                    await chatService.parse(m, meet);// textMessage(m, meet);
                    break;
                case "record":
                   
                    await Models.recording.parse(m, meet);
                    break;

                case "board":
                    await Models.Board.parse(m, meet);
                    break;
                case "mouse":
                    await Models.Board.parseMouse(m, meet);
                    break;
                case "saveBoard":
                    saveBoard(m);
                    break;
                case "userManager":
                    await meet.userManager.parse(m,meet.id);
                    break;
                case "meetManager":
                    await meetManager.parse(m, meet);
                    break; 
                case "quiz":
                    await quiz.parse(m, meet);
                    break;
                case "vPlayer":
                    await vPlayer.parse(m, meet);
                    break;
                case "ping":
                    meet.userManager.ping(m);
                    break;
                case "panelControler":
                    await panelControler.parse(m, meet);
                    break; 
                case "diagram":
                    await diagram.parse(m, meet);
                    break;
                case "MathEditor":
                    await MathEditor.parse(m, meet);
                    break;
                case "offic":
                    await officControler.parse(m, meet);
                    break;
                case "fileuploadMqtt":
                      mqttFile.parse(m, meet);
                    break;
                case "Develop":
                  await  Develop.parse(m, meet);
                    break;
            }
            m.Dispose();
            return "";
        }


        public static void saveBoard(message m)
        {
            bmsgRepository b = new bmsgRepository();
            b.saveBoardByMessage(m);
            
        }
        public static async Task<string> activeFile(message m, meeting meet)
        {
            // var meet = APPST.meetDic[m.meetID];
            // meet.chatMD.add(m.userName, m.d.text);
            meet.vPlayerModel.isActive = 0;
            //  await meet.userManager.sendToAllAsync(m.d);
            await mqtt.send(meet.id, m.d);
            return "";
        }
       
        public static async Task<string> userMessage(message m, meeting meet)
        {
            return "";
            //var s = m.d.text;
            //var recS = userList.users.Where(a => a.meetID == m.meetID).ToList();


            //dynamic d = new System.Dynamic.ExpandoObject();
            //d.type = "message";
            //d.text = s;
            //d.from = m.userName;
            //CancellationToken ct = default(CancellationToken);
            //var jsonString = Newtonsoft.Json.JsonConvert.SerializeObject(d);
            //var buffer = Encoding.UTF8.GetBytes(jsonString);
            //var segment = new ArraySegment<byte>(buffer);
            //foreach (var r in recS)
            //{
            //    r.socket.SendAsync(segment, WebSocketMessageType.Text, true, ct);
            
            //}
            ///////////////string jsonString = Newtonsoft.Json.JsonConvert.SerializeObject(m);
        }

        public static async Task hamdlJoin(meeting meet,userMD user)
        {
            user.lastTime = DateTime.Now;
            user.isOffLine = 0;
            user.join = 1;
            dynamic d = new System.Dynamic.ExpandoObject();
            d.type = "meetSatus";
            d.meet = meet;
            await mHub.BroadcastToConnection2(d, user.ConnectionId);
            d.meet = null;
            d = null;

            await meet.userManager.sendNewUser(user, meet.id);
        }

        public async static Task<string> Join(message m,   meeting meet, string guid)
        {
            return "";           
            m.user.lastTime = DateTime.Now;
            m.user.isOffLine = 0;
            m.user.join = 1;
           // m.user.socket = socketService.update(guid, meet.id, m.user);
            
            //using (var copyMeet = (meeting)meet.copy())
            //{
            //    copyMeet.getZipData();
            //    copyMeet.board.dic = new Dictionary<long, Dictionary<long, List<bmsg>>>();
            //    //copyMeet.board.mList = new List<message>();                             
                      
            //}
             
            dynamic d = new System.Dynamic.ExpandoObject();
            d.type = "meetSatus";
            d.meet = meet;
           // await meet.userManager.sendToUser(d, m.user,meet.id);
            await mHub.BroadcastToConnection2(d, m.user.ConnectionId);
          // await appInfo.hub.BroadcastToConnection2(d, m.user.ConnectionId);
            // await appInfo.hub.send2(meet.id, d);
            // await meet.userManager.sendNewUser(m.user);    
            d.meet = null;
            d = null;
            
            await meet.userManager.sendNewUser(m.user,meet.id);
            // var lookup = copyMeet.userManager.userDic.Values.Where(a => a.isOffLine == 0).ToList().ToLookup(a => a.id.ToString(), a => a);
           
            return "";
        }
        public async static Task<byte> checkExistUserInMeet(message m,  meeting meet, string guid)
        {
            if (meet.userManager.userDic.TryGetValue(m.userName, out userMD user))
            {
                m.user = user;
                return 1;
            }
            else
            {
                await socketService.reloadUserPage(m, guid);
                return 0;

            }
        }


    }
}
