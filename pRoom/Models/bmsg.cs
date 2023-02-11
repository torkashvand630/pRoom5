using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net.WebSockets;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using Dapper;
using Newtonsoft.Json;
using System.Dynamic;
using System.Text;

namespace pRoom 
{
    public class bmsg
    {

        public long id { get; set; } 
      //  public long time { get; set; }
      //  public int boardID { get; set; }
       // public long fileID { get; set; }
        public string str { get; set; }
        public int meetID { get; set; }
     //   public long pageID { get; set; }


        
    }
    public class bmsgRepository
    {
        
      //  public string c = "Data Source=DESKTOP-NQ20L7O;Initial Catalog=msg;Persist Security Info=True;User ID=sa;Password=passA1!";
       // public string c = "Data Source=DESKTOP-68K4RUU;Initial Catalog=msg;Persist Security Info=True;User ID=sa;Password=passA1!";
        public void get()
        {
            List<bmsg> customers = new List<bmsg>();
            using var db = appInfo.GetDbconnection();

            customers = db.Query<bmsg>("Select * From bmsg").ToList();
            
            
        }
        public List<bmsg> getBYMeetID(int meetID)
        {
            List<bmsg> customers = new List<bmsg>();
            using var db = appInfo.GetDbconnection();

            customers = db.Query<bmsg>("Select * From bmsg where meetID="+meetID).ToList();
             
            return customers;

        }
        public void saveBoardByMessage(message m)
        {
            var meet = APPST.meetDic[m.meetID];
            saveBoard(meet);
        }
        public void saveBoard(meeting meet)
        {
          
            var mlist = meet.board.mList;
            List<bmsg> bList = new List<bmsg>();
            if (mlist.Count < 1) return;
            if (mlist.Count == meet.board.lastSaveMessageIndex+1) {  return; }
            int index = mlist.Count;
            for (int i = meet.board.lastSaveMessageIndex; i <index; i++)
            {
                var r = mlist[i];
               //  var jsonString = Newtonsoft.Json.JsonConvert.SerializeObject(r);
              
                bmsg b = new bmsg()
                {
                    meetID = meet.id,
                    str = r,
                   // time = r.d.date,
                  //pageID= r.d.d.num,
                  //fileID=  r.d.d.fileID ,
                };
                bList.Add(b);
              //  Add(b);

            }
            int counter = 0;
           // StringBuilder sb = new StringBuilder("INSERT INTO bmsg (meetID,time,str,fileID,pageID  )VALUES");
            StringBuilder sb = new StringBuilder("INSERT INTO bmsg (meetID,str  )VALUES");
            for (int i=0;i<bList.Count;i++)
            {
                var r = bList[i];
               // sb.Append("(" + r.meetID + "," + r.time + ",'" + r.str + "'," + r.fileID + "," + r.pageID + "),");
                sb.Append("(" + r.meetID  + ",'" + r.str+"' ),");
                if (counter++ > 998 || i == bList.Count - 1)
                {
                    var sQuery = sb.ToString().TrimEnd(',');
                    using var db = appInfo.GetDbconnection();
                    db.Open();
                        db.Execute(sQuery);
                    
                    counter = 0;
                    sb = new StringBuilder("INSERT INTO bmsg (meetID,str   )VALUES");
                    //Console.WriteLine("8888888888888888wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww");
                }                
            }
            meet.board.lastSaveMessageIndex = index-1;
        }
        public void Add(bmsg u)
        {
            //string sQuery = "INSERT INTO bmsg (meetID,time,str,fileID,pageID  )  VALUES(@meetID,@time,@str,@fileID,@pageID  ); ";
            string sQuery = "INSERT INTO bmsg (meetID,str   )  VALUES(@meetID,  @str  ); ";
            using var db = appInfo.GetDbconnection();
            db.Open();
                // db.Query<int>(sQuery, new { meetID = u.meetID, time = u.time, str = u.str,pageID=u.pageID,fileID=u.fileID });
                db.Query<int>(sQuery, new { meetID = u.meetID , str = u.str });

            
             
        }
        public void deleteAll(int meetID)
        {
            string sQuery = "DELETE FROM bmsg WHERE meetID=" + meetID;
            using var db = appInfo.GetDbconnection();
            db.Execute(sQuery);

             
        }
    }
}
