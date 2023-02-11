using Dapper;
using Dapper.Contrib.Extensions;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace pRoom.Models.eventModel
{
    public class eventRoomReposotory
    {


        public void Add(eventRoom m)
        {

            string sQuery = "INSERT INTO room (name , CreateDate , userID , CID , duration , password , description , userCount  ,  startTime , createStatus , persianDate , recording ,recordUrl,isDemo )"
                                   + " VALUES( @name , @CreateDate , @userID , @CID , @duration , @password , @description , @userCount  ,  @startTime , @createStatus , @persianDate , @recording , @recordUrl , @isDemo );SELECT CAST(SCOPE_IDENTITY() as int)";
            using var db = appInfo.GetDbconnection();
            // var id = db.Query<int>(sQuery, m).Single();
            var id = db.Insert(m);
            m.id = (int)id;

        }
        public int AddMeet(pRoom.Controllers.PostApiController.createMeetApiModel m)
        {
            string guid = System.Guid.NewGuid().ToString();
           
            string sQuery = "select nodeadd('"+guid+"','"+m.title+"','"+m.description+"','"+m.password+ "','" + m.spassword + "','" + m.lang+"')";
            Console.WriteLine(sQuery);
            using var db = appInfo.GetDbconnection();
            // var id = db.Query<int>(sQuery, m).Single();
            var id = db.Query<int>(sQuery).SingleOrDefault();
            Console.WriteLine(id);
            return id;

        }
        public List<eventRoom> getAll(int userID)
        {
            using var db = appInfo.GetDbconnection();
            var m = db.Query<eventRoom>("Select * From room where isDelete=0 and userID=" + userID).ToList();
            return m;

        }
        public List<eventRoom> getAll()
        {
            using var db = appInfo.GetDbconnection();
            var m = db.Query<eventRoom>("Select * From room where isDelete=0 " ).ToList();
            return m;

        }
        public eventRoom get(int id)
        {
            using var db = appInfo.GetDbconnection();
            var m = db.Query<eventRoom>("Select * From room where id=" + id).SingleOrDefault();
            return m;

        }
        public eventRoom delete(int id)
        {
            using var db = appInfo.GetDbconnection();
            var m = db.Query<eventRoom>("UPDATE    Room Set isDelete=1  where id=" + id).SingleOrDefault();
            // var m = db.Query<eventRoom>("delete  From room where id=" + id).SingleOrDefault();
            return m;

        }
        public void update(eventRoom m)
        {
            using var db = appInfo.GetDbconnection();
            //db.Query<meetManagPrpperty>("UPDATE Room set createStatus='" + m.createStatus + "'  where id=" + m.id).FirstOrDefault();
            var r = db.Update(m);
            // db.Update(new eventRoom { id=m.id , name = m.name,description=m.description,password=m.password,duration=m.duration,startTime=m.startTime ,createStatus= m.createStatus});

        }
    }
}
