using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Dapper;
 
using System.Data;
using System.Data.SqlClient;
using Dapper.Contrib.Extensions;

namespace pRoom.Models.eventModel
{
    [Table("usermeet")] 
    public class userMeet
    {
        [Dapper.Contrib.Extensions.Key]
        public int id { get; set; }
        public int userID { get; set; }
        public string userName { get; set; }
        public int meetID { get; set; }
        public string guid { get; set; }
        public DateTime inserDate { get; set; }
        public int role { get; set; }

        public string lang { get; set; } = appInfo.lang;
    }
    public class userMeetReposotory
    {
        
        public void Add(userMeet m)
        {
            string sQuery = "INSERT INTO userMeet (userName,Guid,meetID,inserDate,role,userID,lang )"
                               + " VALUES(@userName,@Guid,@meetID,@inserDate,@role,@userID,@lang );SELECT CAST(SCOPE_IDENTITY() as int)";
            using var db = appInfo.GetDbconnection();
           // var id = db.Query<int>(sQuery, m).Single();
           var id= db.Insert(m);
                m.id = (int)id;

             

        }
        public userMeet getByGuid(string Guid )
        {
            using var db = appInfo.GetDbconnection();
            var m = db.Query<userMeet>("Select * From usermeet where  Guid='" + Guid+"' ").SingleOrDefault();
                return m;             
        }
        public List<userMeet> getByMeetID(int meetID)
        {
            using var db = appInfo.GetDbconnection();
            var m = db.Query<userMeet>("Select * From usermeet where  meetID='" + meetID + "' ").ToList();
            return m;
        }
        public List<userMeet> getAll()
        {
            using var db = appInfo.GetDbconnection();
            var m = db.Query<userMeet>("Select * From usermeet ").ToList().OrderByDescending(a => a.id).Take(200).ToList(); 
            return m;

        }
    }
}
