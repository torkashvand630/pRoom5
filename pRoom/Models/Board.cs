using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices;
using System.Runtime.Serialization.Formatters.Binary;
using System.Threading.Tasks;

namespace pRoom.Models
{
    public static class Board
    {
      public static async Task<string> parse(message m,meeting meet)
        {

            // meet.vPlayerModel.isActive = 0;
            // var Timestamp = new DateTimeOffset(DateTime.UtcNow).ToUnixTimeMilliseconds();
            //  Console.WriteLine(Timestamp);
            //Timestamp = Timestamp / 100;           
            //m.d.date = Timestamp;
            //  var meet = APPST.meetDic[m.meetID];  
            var pageID = m.d.p;
            var fileID = m.d.f;
          //  Console.WriteLine(fileID);
            var action = m.d.action;
            if(action== "fileSelect" || action == "pageSelect")
            {
                var tmpFile = meet.filesModel.fileList.Where(a => a.inRoomID == fileID).FirstOrDefault();
                if (tmpFile == null) return "";
                if (pageID >= tmpFile.pageCount) return "";
                  meet.board.lastFileID =fileID;
                  meet.board.lastPageID = pageID;
                Console.WriteLine("set page id : page= " + pageID + " , file = " + fileID);
            }
            else
            {
                if(pageID!=meet.board.lastPageID || fileID != meet.board.lastFileID)
                {
                    Console.WriteLine("errrrrrrrrrrrrrrrrror page= " + pageID + " , file = " + fileID);
                    return "";
                }
                //try
                //{
                //    meet.board.messDic[fileID][pageID].Add(m.messStr);
                //}
                //catch
                //{
                //    Console.WriteLine("eroor in add board message to messdic");
                //    return "";
                //}
            }
            //var b = meetService.messageToBmsg(m);

            //if(meet.board.dic.TryGetValue(b.fileID,out Dictionary<long,List<bmsg>> f))
            //{
            //    if(f.TryGetValue(b.pageID,out List<bmsg> f2)){
            //        f2.Add(b);
            //        await meet.userManager.sendToAllAsync(m.messStr);
            //    }
            //    else
            //    {
            //        Console.WriteLine("file page not found : " + b.pageID);

            //    }
            //}
           
           // meet.board.bList[fileID][pageID].Add(m.messStr);
            // await meet.userManager.sendToAllAsync(m.messStr);
            await mqtt.send(meet.id, m.messStr);
            // var js = Newtonsoft.Json.JsonConvert.SerializeObject(m.d.d);//ggggggg

            meet.board.mList.Add(m.messStr);
           
            return "";
        }
        public static int GetObjectSize(object TestObject)
        {
            BinaryFormatter bf = new BinaryFormatter();
            MemoryStream ms = new MemoryStream();
            byte[] Array;
            bf.Serialize(ms, TestObject);
            Array = ms.ToArray();
            return Array.Length;
        }
        public static async Task<string> parseMouse(message m, meeting meet)
        {
            await mqtt.send(meet.id, m.messStr);
            return "";
        }
        }
    public class boardPageAcrivity
    {
        public int id { get; set; }
        public long startTime { get; set; }
        public long endTime { get; set; }
        public int startIndex { get; set; }
        public int endIndex { get; set; }
        public long fileID { get; set; }
        public long pageID { get; set; }
        public int count { get; set; }

    }
    public class BoardMD
    {
        public List<string> mList = new List<string>();
        public List<boardPageAcrivity> bpaList = new List<boardPageAcrivity>();
        public List<List<string>> bList = new List<List<string>>();
        public List<bFile> bFileList = new List<bFile>();
        public Dictionary<long, Dictionary<long, List<bmsg>>> dic = new Dictionary<long, Dictionary<long, List<bmsg>>>();
        public Dictionary<long, Dictionary<long, List<string>>> messDic = new Dictionary<long, Dictionary<long, List<string>>>();
        public List<bfileorg> bfileorglist = new List<bfileorg>();
        public string s;
        public long lastFileID = 0;
        public long lastPageID = 0;
        public int meetID;
        public int lastSaveMessageIndex = 0;
        public   void loadFromDb(int meetID)
        {
            
            bmsgRepository b = new bmsgRepository();
            var plist = b.getBYMeetID(meetID);
            
            // if (plist == null || plist.Count < 1) return;
            foreach (var r in plist)
            {
                
              //  var obj = JsonConvert.DeserializeObject<ExpandoObject>(r.str) as dynamic;
               // message m = new message(exObj, r.str,false);
                mList.Add(r.str);
            }
           
            this.lastSaveMessageIndex = mList.Count;
            
          //  GetBoardPageAcrivities();
           // Console.WriteLine("c 4 :" + DateTime.Now);
           // writeBoardPageAcrivities();
           // Console.WriteLine("c 5 :" + DateTime.Now);
            // getBLIst(meetID);
        }
        public void GetBoardPageAcrivities()
        {
            return;
            
            //if (mList.Count < 1) return;
            //boardPageAcrivity b = new boardPageAcrivity();
            //var m = mList[0];
            //b.fileID = m.d.d.fileID;
            //b.pageID =  m.d.d.num;
            //b.startTime = m.d.date;
            //b.startIndex = 0;
            //var last = 0;
            //for(int i = 1; i < mList.Count-1; i++)
            //{
            //    m = mList[i];
            //    var fileID =   m.d.d.fileID;
            //    var pageID =  m.d.d.num;
            //    if (fileID!=b.fileID || pageID != b.pageID)
            //    {
            //        var m2 = mList[i - 1];
            //        b.endTime = m2.d.date;
            //        b.endIndex = i-1;
            //        b.count = (i - last) ;
            //        bpaList.Add(b);
            //        b = new boardPageAcrivity();
            //        b.fileID =  m.d.d.fileID;
            //        b.pageID =  m.d.d.num;
            //        b.startTime = m.d.date;
            //        b.startIndex = i;
            //        last = i;
            //        m.d.isFirst = "1";
            //    }
            //    else m.d.isFirst = "0";
            //}
            //var  m3 = mList[mList.Count - 1];
            //b.endTime = m3.d.date;
            //b.endIndex = mList.Count - 1;
            //b.count = (mList.Count - last) - 1;
            //bpaList.Add(b);
           
        }
        public void getBLIst(int meetID)
        {
            //bfileorg kk = new bfileorg()
            //{
            //    fileID = 0,
            //    pagecount = 7,
            //};
            //this.bfileorglist.Add(kk);
            //bfileorg kk2 = new bfileorg()
            //{
            //    fileID = 1,
            //    pagecount = 5,
            //};
            //this.bfileorglist.Add(kk2);
           // this.setDic(meetID);
            //bFile bf = new bFile();
            //bf.fileID = 0;
            //for(int i = 0; i < 7; i++)
            //{
            //    bPage bp = new bPage();
            //    bp.pageID = i;
            //    bf.bPageList.Add(bp);
            //}
            //this.bFileList.Add(bf);
          
            //var v = plist.GroupBy(a => a.pageID);//.GroupBy(a => a.First().pageID);
            //var k = v.GroupBy(a => a.First().fileID);

            ////foreach(var t in v)
            ////{
            ////  var k=  t.GroupBy(a => a.pageID);
            ////}
            //this.s = Newtonsoft.Json.JsonConvert.SerializeObject(k);
           // this.d = JsonConvert.DeserializeObject<ExpandoObject>(v) as dynamic;

        }
        public void setDic(int meetID,meeting meet)
        {
           // var meet = APPST.meetDic[meetID];
            var filelist =meet.filesModel.fileList;
            for(int i = 0; i < filelist.Count; i++)
            {
                this.addFileToDic(filelist[i]);
                
            }
            //bmsgRepository b = new bmsgRepository();
            //var plist = b.getBYMeetID(meetID);
            //foreach (var r in plist)
            //{
            //    if (!dic.ContainsKey(r.fileID))
            //        dic.Add(r.fileID, new Dictionary<long, List<bmsg>>());
            //    var bfile = dic[r.fileID];

            //    if (!bfile.ContainsKey(r.pageID))
            //        bfile.Add(r.pageID, new List<bmsg>());
            //    var bpage = bfile[r.pageID];
            //    bpage.Add(r);

            //}
        }
        public void addFileToDic(FileMD f)
        {
            var fileID = f.inRoomID;
            var pagecount = f.pageCount;
            this.dic.Add(fileID, new Dictionary<long, List<bmsg>>());
            this.messDic.Add(fileID, new Dictionary<long, List<string>>());
            this.bList.Add( new List<string>());
            for (int j = 0; j < pagecount; j++)
            {
                this.dic[fileID].Add(j, new List<bmsg>());
                this.messDic[fileID].Add(j, new List<string>());
            }
           
            if (f.dbStatus == 0)
            {
                fileRepository fr = new fileRepository();
                f.meetID = this.meetID;
                f.dbStatus = 1;
                fr.Add(f);
            }
           
            
        }
        public void writeBoardPageAcrivities()
        {
            foreach(var r in bpaList)
            {
                var jsonString = Newtonsoft.Json.JsonConvert.SerializeObject(r);
              //  Console.WriteLine(jsonString);
            }
        }

        public object copy()
        {
            return this.MemberwiseClone();
        }

    }
    public class bPage
    {
        public int pageID { get; set; }
        public List<bmsg> blist = new List<bmsg>();
    }
    public class bFile
    {
        public int fileID { get; set; }
        public List<bPage> bPageList = new List<bPage>();
    }
   public class bfileorg
    {
        public int fileID;
        public int pagecount;

    }
    public class boardMessage
    {
        public int id { get; set; }
        public string userName { get; set; }
        public int meetID { get; set; }
         
    }

}
