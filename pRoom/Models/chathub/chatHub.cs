using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using pRoom.Models.eventModel;
using System.Dynamic;

namespace pRoom.Models
{
    public static class mHub
    {
        public static async Task send(int meetid, string message)
        {
            if (appInfo._hubContext == null) return;
          //  Console.WriteLine("send 2 result to : " + meetid);
             
            try
            {
                // await Clients.Caller.SendAsync("ReceiveMessage", "ggggggggggggggggggggggggggg");
                await appInfo._hubContext.Clients.Group(meetid.ToString()).SendAsync("ReceiveMessage", message);
            }
            catch { Console.WriteLine("...................... errrrrr in mhub send"); }

            // await Clients.Group(meetid.ToString()).SendAsync("ReceiveMessage", message);
            //  await Clients.All.SendAsync("ReceiveMessage", "ggggggggggggggggggggggggggg");
        }
        public static async Task BroadcastToConnection(string data, string connectionId)
        {
            if (appInfo._hubContext == null) return;
            if (connectionId == null) return;
            await appInfo._hubContext.Clients.Client(connectionId).SendAsync("ReceiveMessage", data);
        }
        public static async Task BroadcastToConnection2(dynamic d, string connectionId)
        {
            var jsonString = Newtonsoft.Json.JsonConvert.SerializeObject(d);
            await BroadcastToConnection(jsonString, connectionId);
        }
    }
    public class dddd  
    {
        private readonly IHubContext<ChatHub> _hubContext;

        public dddd(IHubContext<ChatHub> hubContext)
        {
            _hubContext = hubContext;
        }
        public async Task send(int meetid, string message)
        {
            Console.WriteLine("send join result to : " + meetid);
            Console.WriteLine(message);
            try
            {
                // await Clients.Caller.SendAsync("ReceiveMessage", "ggggggggggggggggggggggggggg");
                await _hubContext.Clients.Group(meetid.ToString()).SendAsync("ReceiveMessage", message);
            }
            catch { Console.WriteLine("...................... errrrrr"); }

            // await Clients.Group(meetid.ToString()).SendAsync("ReceiveMessage", message);
            //  await Clients.All.SendAsync("ReceiveMessage", "ggggggggggggggggggggggggggg");
        }
    }
    public    class ChatHub : Hub
    {
        
        public ChatHub()
        {
            //Console.WriteLine("chathub create ...................");
           
           // appInfo.hub = this;
        }
        public override async Task OnDisconnectedAsync(Exception? exception)
        {
             
            var u = getUserInfo();
            var meet = meetService.GetMeeting(int.Parse(u.meetid));
            if (meet != null)
            {
                if (meet.userManager.userDic.TryGetValue(u.userid, out userMD per))
                {
                    //Console.WriteLine("user disconnrct id is : " + per.id + " n " + per.name);
                    var conid = this.Context.ConnectionId;
                    if (conid == per.ConnectionId)
                    {
                        per.isOffLine = 1;

                        List<userMD> offlineUsers = new List<userMD>() { per };
                        socketService.broadcastOffLineUser(meet, offlineUsers);
                    }
                    else
                    {
                        Console.WriteLine("new con found : " + per.nickname);
                    }
                   
                }
            }
        }
        public override async Task OnConnectedAsync()
        {
            var u = getUserInfo();
            var meet = meetService.GetMeeting(int.Parse(u.meetid));
            if (meet != null)
            {
                if (meet.userManager.userDic.TryGetValue(u.userid, out userMD per))
                {
                    // Console.WriteLine("user id is : " + per.id+" n "+per.name );
                    if (per.join == 1)
                    {
                        await messengerUtil.sendExitToUser(per.ConnectionId);
                    }
                    per.ConnectionId = this.Context.ConnectionId;
                    await messageParser.hamdlJoin(meet, per);
                }
                else
                {
                    await messengerUtil.sendReloadToUser(this.Context.ConnectionId, "0");
                }
                await Groups.AddToGroupAsync(this.Context.ConnectionId, u.meetid);
            }
            else
            {
                await messengerUtil.sendReloadToUser(this.Context.ConnectionId,"0");
            }
           
            
            return;
            // var httpContext = this.GetHttpContext();
            var httpContext = this.Context.GetHttpContext();
            var meetid = httpContext.Request.Query["meetid"].ToString();
            var id = httpContext.Request.Query["id"].ToString();
            await this.Groups.AddToGroupAsync(this.Context.ConnectionId, "j");
            this.Context.Items.Add("meetid", meetid);
            // this.Clients.Group("j").SendAsync()
            Console.WriteLine(id);
            Console.WriteLine(meetid);
        }
        public async Task SendMessage(string message)
        {
           // Console.WriteLine("ggggggg");
             
           // Console.WriteLine(message);
           // await send(1,message);
            var exObj = JsonConvert.DeserializeObject<ExpandoObject>(message) as dynamic;
            await messageParser.parseSimple(exObj, message, Context.ConnectionId, null);
            // await Clients.All.SendAsync("ReceiveMessage", message);
        }
        public async Task send(int meetid, string message)
        {
            Console.WriteLine("send join result to : " + meetid);
            Console.WriteLine(message);
            try
            {
               // await Clients.Caller.SendAsync("ReceiveMessage", "ggggggggggggggggggggggggggg");
                await this.Clients.Group(meetid.ToString()).SendAsync("ReceiveMessage", message);
            }
            catch { Console.WriteLine("...................... errrrrr"); }
         
          // await Clients.Group(meetid.ToString()).SendAsync("ReceiveMessage", message);
           //  await Clients.All.SendAsync("ReceiveMessage", "ggggggggggggggggggggggggggg");
        }
        public async Task send2(int meetid, dynamic d)
        {

            //try
            //{
            var jsonString = Newtonsoft.Json.JsonConvert.SerializeObject(d);
            await send(meetid, jsonString);
            //}
            //catch
            //{

            //}


        }

        public userInfoTmp getUserInfo()
        {
            var httpContext = this.Context.GetHttpContext();
            var meetid = httpContext.Request.Query["meetid"].ToString();
            var userid = httpContext.Request.Query["userid"].ToString();
            userInfoTmp u = new userInfoTmp() { meetid = meetid, userid = userid };
            return u;
        }
        public async Task BroadcastToConnection(string data, string connectionId)
        {
            await Clients.Client(connectionId).SendAsync("ReceiveMessage", data);
        }
        public async Task BroadcastToConnection2(dynamic d, string connectionId)
        {
            var jsonString = Newtonsoft.Json.JsonConvert.SerializeObject(d);
            await BroadcastToConnection(jsonString, connectionId);
        }

    }
    public class userInfoTmp
    {
        public string meetid { get; set; }
        public string userid { get; set; }
    }
}
