using Dapper;
using Dapper.Contrib.Extensions;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Data.SQLite;
using System.Linq;
using System.Threading.Tasks;

namespace pRoom.Models
{
    [Table("tblMeet")]
    public class meetManagPrpperty
    {
        [Dapper.Contrib.Extensions.Key]
        public int id { get; set; }
        public int meetID { get; set; }
        public string meetName { get; set; }
        public DateTime startTime { get; set; }
        public int duration { get; set; }
        public string finishStatus { get; set; }
        public int isLimit { get; set; }
        public int UserCount { get; set; }
        public int recording { get; set; } = 0;


    }
    public class meetManagReposotory
    {

        public void Add(meetManagPrpperty m)
        {
            string sQuery = "INSERT INTO tblMeet (meetID,meetName,finishStatus, duration,startTime,UserCount,isLimit )"
                               + " VALUES(@meetID,@meetName,@finishStatus, @duration,@startTime,@UserCount ,@isLimit ); ";
            using var db = appInfo.GetDbconnection();
            //   db.Open();
            //     db.Query<int>(sQuery, new { meetID = m.meetID, meetName = m.meetName, finishStatus = m.finishStatus, duration = m.duration, startTime = m.startTime, UserCount = m.UserCount, isLimit = m.isLimit });
            var id = db.Insert(m);
            m.id = (int)id;


        }
        public meetManagPrpperty get(int meetID)
        {
            using var db = appInfo.GetDbconnection();

            var m = db.Query<meetManagPrpperty>("Select * From tblMeet where meetID=" + meetID).FirstOrDefault();
            return m;

        }
        public List<meetManagPrpperty> getAll(string finishStatus)
        {
            using var db = appInfo.GetDbconnection();
            var m = db.Query<meetManagPrpperty>("Select * From tblMeet where finishStatus='" + finishStatus + "' ").ToList();
            return m;

        }
        public void updateFinishStatus(int meetID, string finishStatus)
        {
            using var db = appInfo.GetDbconnection();

            db.Query<meetManagPrpperty>("UPDATE tblMeet set finishStatus='" + finishStatus + "'  where meetID=" + meetID).FirstOrDefault();


        }
    }
}
