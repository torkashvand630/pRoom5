using Dapper;
using Dapper.Contrib.Extensions;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace pRoom
{
    [Table("chatMessage")]
    public class chatMessage
    {
        [Dapper.Contrib.Extensions.Key]
        public int id { get; set; } 
        public int meetID{ get; set; }

          public string userName{ get; set; }
          public string nickName{ get; set; }
        public string text{ get; set; }
        public DateTime insertTime{ get; set; }
        public int isDelete { get; set; }
        public chatMessage()
        {

        }
        public chatMessage(string username,string text,string nickName,int meetID)
        {
            this.meetID = meetID;
            this.userName = username;
            this.nickName = nickName;
            this.text = text;
            this.insertTime = DateTime.Now;
            this.isDelete = 0;
            
        }
    }
    public class ChatMD
    {
        public List<chatMessage> chatList = new List<chatMessage>();
        public chatMessage add(string userName,string text,string nickName,int meetID)
        {
            chatMessage c = new chatMessage(userName, text, nickName,meetID);
            chatList.Add(c);
            chatMessageReposotory cmr = new chatMessageReposotory();
            cmr.Add(c);
            chatListSizeCheck();
            return c;
        }
        public void chatListSizeCheck()
        {
            if (chatList.Count > 400)
            {
                chatList=chatList.OrderByDescending(a => a.id).ToList().Take(300).OrderBy(a => a.id).ToList();
            }
        }
    }
    public static class chatService
    {
        public static ConcurrentDictionary<int, int> dic = new ConcurrentDictionary<int, int>();
        public static async Task<string> parse(message m, meeting meet)
        {
            var action = m.d.action;
            switch (action)
            {
                case "new":
                    await newMessage(m, meet);
                    break;
                case "delete":
                    await delete(m, meet);
                    break;

            }
            return "";
        }
        public static async Task<string> newMessage(message m, meeting meet)
        {
            //  var meet = APPST.meetDic[m.meetID];
            var c = meet.chatMD.add(m.userName, m.d.text, m.user.nickname, meet.id);
            dynamic d = new System.Dynamic.ExpandoObject();

            d.type = "textMessage";
            d.action = "new";
            d.m = c;
           // await meet.userManager.sendToAllAsync(d);
            await mqtt.send(meet.id, d);
            return "";
        }
        public static async Task<string> delete(message m, meeting meet)
        {
            if (m.user.role == 0) return "";
            //  var meet = APPST.meetDic[m.meetID];
            //var c = meet.chatMD.add(m.userName, m.d.text, m.user.nickname, meet.id);
            int id =int.Parse( m.d.id);
            var item = meet.chatMD.chatList.Where(a => a.id == id).FirstOrDefault();
            if (item == null) return "";
            
            item.isDelete = 1;
            chatMessageReposotory chr = new chatMessageReposotory();
            chr.update(item);
            dynamic d = new System.Dynamic.ExpandoObject();

            d.type = "textMessage";
            d.action = "delete";
            d.id = m.d.id;
           // await meet.userManager.sendToAllAsync(d);
            await mqtt.send(meet.id, d);
            return "";
        }
        public static void saveAll(meeting meet)
        {
            var index = 0;
            if (!dic.ContainsKey(meet.id)) dic.TryAdd(meet.id, 0);
            else index = dic[meet.id];
        }
        public static void loadAll(meeting meet)
        {
            chatMessageReposotory cmr = new chatMessageReposotory();
            var cList = cmr.getAll(meet.id);
            if (cList != null && cList.Count > 0)
                meet.chatMD.chatList = cList;
        }
    }
    public class chatMessageReposotory
    {
        
        public void Add(chatMessage m)
        {
            
            string sQuery = "INSERT INTO  chatMessage (meetID,userName,nickName, text,insertTime,isDelete )"
                               + " VALUES(@meetID,@userName,@nickName, @text, @insertTime, @isDelete  );SELECT CAST(SCOPE_IDENTITY() as int) ";
            using var db = appInfo.GetDbconnection();
            //  var id = db.Query<int>(sQuery, m).Single();
            var id = db.Insert(m);
            m.id = (int)id;
            // db.Open();
            // db.Query<int>(sQuery, new { meetID = m.meetID, userName = m.userName, nickName = m.nickName, text = m.text, insertTime = m.insertTime  });



        }
        public List<chatMessage> getAll(int meetID)
        {
            using var db = appInfo.GetDbconnection();
            var m = db.Query<chatMessage>("Select * From chatMessage where isDelete!=1 and meetID=" + meetID).OrderByDescending(a=>a.id).ToList().Take(80).OrderBy(a=>a.id).ToList();
                return m;
            
        }
        public void deleteAll(int meetID)
        {
            string sQuery = "DELETE FROM chatMessage WHERE meetID=" + meetID;
            using var db = appInfo.GetDbconnection();
            db.Execute(sQuery);

            
        }
        public void update(chatMessage m)
        {
            using var db = appInfo.GetDbconnection();
            //db.Query<meetManagPrpperty>("UPDATE Room set createStatus='" + m.createStatus + "'  where id=" + m.id).FirstOrDefault();
            var r = db.Update(m);
            // db.Update(new eventRoom { id=m.id , name = m.name,description=m.description,password=m.password,duration=m.duration,startTime=m.startTime ,createStatus= m.createStatus});

        }
    }
    }
