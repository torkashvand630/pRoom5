using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Dynamic;
using System.IO;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

namespace pRoom
{
    public class ChatWebSocketMiddleware
    {
        //  private static ConcurrentDictionary<string, WebSocket> _sockets = new ConcurrentDictionary<string, WebSocket>();
       
        int y = 0;
        public static long breakeCounter = 0;

        public DateTime dTime = DateTime.Now; 
        private readonly RequestDelegate _next;

        public ChatWebSocketMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            if (!context.WebSockets.IsWebSocketRequest)
            {
               // Console.WriteLine("IsWebSocketRequest ***********************************************");
                await _next.Invoke(context);
                return;
            }
            // Console.WriteLine(y++);
            //var kList = context.Request.Headers.Keys;
            //foreach(var i in kList)
            //{
                
            //    Microsoft.Extensions.Primitives.StringValues j;
            //      context.Request.Headers.TryGetValue(i, out j);
            //   // Console.WriteLine(i  +" = " +j);
            //}
           
            if (DateTime.Now<dTime.AddSeconds(2))   return;
            CancellationToken ct = context.RequestAborted;
            WebSocket currentSocket = await context.WebSockets.AcceptWebSocketAsync();
             
           var socketId = Guid.NewGuid().ToString();
            socketService.add(currentSocket, socketId);
           // _sockets.TryAdd(socketId, currentSocket);

            while (true)
            {
                if (ct.IsCancellationRequested )
                {
                    break;
                }
               
                var res=   await ReceiveStringAsync(socketId, currentSocket, ct);
                if (res != "ok")
                {
                    if (currentSocket.State != WebSocketState.Open)
                    {
                        break;
                    }
                }
                //if (string.IsNullOrEmpty(response))
                //{


                //    continue;
                //}

                //foreach (var socket in _sockets)
                //{
                //    //if(socket.Value.State != WebSocketState.Open)
                //    //{
                //    //    continue;
                //    //}

                //  //  await SendStringAsync(socket.Value, response, ct);
                //}
            }
           await socketService.remove(socketId);
            //  WebSocket dummy;
            // _sockets.TryRemove(socketId, out dummy);
            try
            {
               // await currentSocket.CloseAsync(WebSocketCloseStatus.NormalClosure, "Closing", ct);
                currentSocket.Dispose();
            }
            catch {
                Console.WriteLine("error in close websocket.");
            };
           
        }

        private static Task SendStringAsync(WebSocket socket, string data, CancellationToken ct = default(CancellationToken))
        {
            var buffer = Encoding.UTF8.GetBytes(data);
            var segment = new ArraySegment<byte>(buffer);
            return socket.SendAsync(segment, WebSocketMessageType.Text, true, ct);
        }

        private static async Task<string> ReceiveStringAsync(string guid,WebSocket socket, CancellationToken ct = default(CancellationToken))
        {
            
            if (socket.State != WebSocketState.Open)
            {
               // Console.WriteLine("break : "+ breakeCounter++);
                return "no";
            }
             var buffer = new ArraySegment<byte>(new byte[8192]);
            using (var ms = new MemoryStream())
            {
                WebSocketReceiveResult result;
                do
                {
                    ct.ThrowIfCancellationRequested();
                    try
                    {
                        result = await socket.ReceiveAsync(buffer, ct);
                    }
                    catch
                    {
                        return null;
                    }
                   
                    ms.Write(buffer.Array, buffer.Offset, result.Count);
                }
                while (!result.EndOfMessage);
                buffer = null;
                ms.Seek(0, SeekOrigin.Begin);
                if (result.MessageType != WebSocketMessageType.Text)
                {
                    return null;
                }
                result = null;
                
              
                using (var reader = new StreamReader(ms, Encoding.UTF8))
                {
                    var s= await reader.ReadToEndAsync();
                    var exObj = JsonConvert.DeserializeObject<ExpandoObject>(s) as dynamic;                    
                    await  messageParser.parseSimple(exObj,s,guid);
                    return "ok";
                }
            }
        }
    }
    public class socketUserMeet
    {
        public WebSocket socket;
        public int meetID = 0;
        public userMD user = null;
        public socketUserMeet(WebSocket w)
        {
            this.socket = w;
        }
    }
    public static class socketService
    {
        private static ConcurrentDictionary<string, socketUserMeet> dic = new ConcurrentDictionary<string, socketUserMeet>();
        public static void add(WebSocket w,string guid)
        {
            if(!dic.ContainsKey(guid))
             {
                socketUserMeet s = new socketUserMeet(w);
                dic.TryAdd(guid, s);
            }
        }
        public static WebSocket update(string guid,int meetID,userMD u)
        {
            if (dic.TryGetValue(guid, out socketUserMeet s))
            {
                s.meetID = meetID;
                s.user = u;
                return s.socket;
            }
            else return null;
        }
        public static async Task<string> remove(string guid)
        {
            if (dic.ContainsKey(guid))
            {
                socketUserMeet s;
                dic.TryRemove(guid,out s);
                
                if (s != null)
                {
                    if (s.user != null)
                    {

                        s.user.isOffLine = 1;
                      await  chechVplayerOwner(s);
                    }
                    
                }
               
                broadcast(s);
               // s.socket.Dispose();
            }
            return "";
        }
        public static void broadcast(socketUserMeet s)
        {
            if (s.meetID == 0 || s.user == null) return;
            meeting meet = meetService.GetMeeting(s.meetID);
            if (meet == null) return;
           // var user=meet.userManager.userDic.
            List<userMD> uList = new List<userMD>();
            uList.Add(s.user);
            broadcastOffLineUser(meet, uList);
            //meet.userManager.userDic.TryRemove(s.user.name,out userMD  p);
            //Console.WriteLine("broadcast ... ");
            
        }
        public static void broadcastOffLineUser(meeting meet,List<userMD> recS)
        {
            dynamic d = new System.Dynamic.ExpandoObject();
            d.type = "userManager";
            d.action = "offlineUser";
            d.userList = recS;
            var jsonString = Newtonsoft.Json.JsonConvert.SerializeObject(d);
            mqtt.send(  meet.id, jsonString);
           // meet.userManager.sendToAllAsync(jsonString);
        }
        public static void broadcastONLineUser(meeting meet, Dictionary<string,userMD> recS)
        {
            dynamic d = new System.Dynamic.ExpandoObject();
            d.type = "userManager";
            d.action = "onlineUser";
            d.activePanel = meet.activePanel;
            d.userList = recS;
            var jsonString = Newtonsoft.Json.JsonConvert.SerializeObject(d);
            mqtt.send(meet.id, jsonString);
            //meet.userManager.sendToAllAsync(jsonString);
        }
        public async static Task<string> reloadUserPage(message m, string guid)
        {

            dynamic d100 = new System.Dynamic.ExpandoObject();
            d100.type = "userManager";
            d100.action = "reload";
            var jsonString = Newtonsoft.Json.JsonConvert.SerializeObject(d100);
            CancellationToken ct = default(CancellationToken);
            var buffer = Encoding.UTF8.GetBytes(jsonString);
            var segment = new ArraySegment<byte>(buffer);
            if(dic.TryGetValue(guid,out socketUserMeet s))
            {
                try
                {
                    await s.socket.SendAsync(segment, WebSocketMessageType.Text, true, ct);
                }
                catch
                {
                    Console.WriteLine("erroooooooooor in sockert  : " + m.userName);
                }
            }
          

            return "";

        }

        public async static Task<string> chechVplayerOwner(socketUserMeet s)
        {
            var meet = meetService.GetMeeting(s.meetID);
            if (meet != null)
            {
                if(meet.activePanel== "vPlayer")
                if (meet.vPlayerModel.admin.name == s.user.name)
                {
                    Console.WriteLine("vplayer owner left");
                        meet.activePanel = "board";
                        meet.nextPanel = "board";
                    dynamic d = new System.Dynamic.ExpandoObject();
                    d.type = "panelControler";
                    d.action = meet.activePanel;
                        mqtt.send(meet.id, d);
                      //  await meet.userManager.sendToAllAsync(d);
                }
            }
            return "";
        }
        
    }
}
