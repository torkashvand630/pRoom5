using Dapper;
using Dapper.Contrib.Extensions;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace pRoom
{
  //  [System.ComponentModel.DataAnnotations.Schema.Table("FileMD")]
    public class FileMD
    {
        public int id { get; set; }
        public int inRoomID { get; set; }
        public string ext { get; set; }
        public string name { get; set; }
        public int pageCount { get; set; }
        public int width { get; set; }
        public int height { get; set; }
        public dynamic d { get; set; }
        public int meetID { get; set; }
        public int dbStatus { get; set; }
        public int imgCount { get; set; } = 0;
    }
    public class FilesModel
    {
        public List<FileMD> fileList = new List<FileMD>();
        public int fileCount = 0;
        public void add(FileMD f)
        {            
            fileList.Add(f);
        }
        public FileMD add(string name,int meetID)
        {
            FileMD f = new FileMD();
            f.name = name;
            f.inRoomID = fileList.Count ;
            f.meetID = meetID;
            f.width = 0;
            f.height = 0;
            f.ext = "";
            f.pageCount = 0;
            this.fileList.Add(f);
            f.dbStatus = 1;
            fileRepository fr = new fileRepository();
            fr.Add(f);
            return f;
        }

        public async Task<string> sendToUser(meeting meet)
        {
           
            dynamic d = new System.Dynamic.ExpandoObject();
            d.type = "fileList";
            d.list = fileList;
            //var json = JsonConvert.SerializeObject(d);
            //await meet.userManager.sendToAllAsync(json);
            await mqtt.send(meet.id, d);
            return "";
        }
    }

    public class fileRepository
    {
        
        //  public string c = "Data Source=DESKTOP-NQ20L7O;Initial Catalog=msg;Persist Security Info=True;User ID=sa;Password=passA1!";
        // public string c = "Data Source=DESKTOP-68K4RUU;Initial Catalog=msg;Persist Security Info=True;User ID=sa;Password=passA1!";
        public void get()
        {
            List<bmsg> customers = new List<bmsg>();
            using var db = appInfo.GetDbconnection();
            customers = db.Query<bmsg>("Select * From tblFile").ToList();
            
           

        }
        public List<FileMD> getBYMeetID(int meetID)
        {
            List<FileMD> customers = new List<FileMD>();
            using var db = appInfo.GetDbconnection();

            customers = db.Query<FileMD>("Select * From tblFile where meetID=" + meetID).ToList();
            
            foreach (var r in customers) r.dbStatus = 1;
            return customers;

        }
        
        public void Add(FileMD f)
        {
            
            string sQuery = "INSERT INTO tblFile (meetID,ext,name,inRoomID,pageCount,width,height,dbStatus  )"
                               + " VALUES(@meetID,@ext,@name,@inRoomID,@pageCount,@width,@height,@dbStatus  ) ";
            //var jsonString = Newtonsoft.Json.JsonConvert.SerializeObject(f);
            //Console.WriteLine(jsonString);
            using var db = appInfo.GetDbconnection();
          
         db.Execute(sQuery, f);
              //  db.Open();
               // db.Query<int>(sQuery, new { meetID = f.meetID, ext = f.ext,inRoomID=f.inRoomID, name = f.name, pageCount = f.pageCount, width = f.width,height=f.height });            

        }
        public void deleteAll(int meetID)
        {
            string sQuery = "DELETE FROM tblFile WHERE meetID=" + meetID;
            using var db = appInfo.GetDbconnection();
            db.Execute(sQuery);                             
        }
        public void update(FileMD f)
        {
            Console.WriteLine("id = " + f.id);
            //string sQuery = "INSERT INTO tblFile (meetID,ext,name,inRoomID,pageCount,width,height  )"
            //                 + " VALUES(@meetID,@ext,@name,@inRoomID,@pageCount,@width,@height  ); ";
            //var jsonString = Newtonsoft.Json.JsonConvert.SerializeObject(f);
            //Console.WriteLine(jsonString);
            using var db = appInfo.GetDbconnection();
            string q = "UPDATE tblFile SET ext='" + f.ext + "', width='" + f.width + "', height='" + f.height + "', pageCount='" + f.pageCount + "', dbStatus='" + f.dbStatus + "' WHERE  inRoomID=" + f.inRoomID +" AND meetID="+f.meetID;
            db.Execute(q, f);



          //  db.Query<FileMD>("UPDATE tblFile set ext='" + f.ext + "', width='" + f.width + "', height='" + f.height + "', pageCount='" + f.pageCount + "', dbStatus='" + f.dbStatus + "' where id=" + f.id).FirstOrDefault();
            //  using var db = appInfo.GetDbconnection();
            //db.Query<meetManagPrpperty>("UPDATE Room set createStatus='" + m.createStatus + "'  where id=" + m.id).FirstOrDefault();
            //  var r = db.Update(f);
            // db.Update(new eventRoom { id=m.id , name = m.name,description=m.description,password=m.password,duration=m.duration,startTime=m.startTime ,createStatus= m.createStatus});

        }
    }
}
