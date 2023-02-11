using Dapper;

using System.Data;
using System.Data.SqlClient;
using Dapper.Contrib.Extensions;

namespace pRoom.Models.eventModel
{
    [Table("userInfo")]
    public class userInfo
    {
        public int id { get; set; }
        public int userID { get; set; }
        public string userName { get; set; }
        public int meetID { get; set; }
        public string guid { get; set; }
        public DateTime inserDate { get; set; }
        public string agent { get; set; }
    }
    public class userInfoReposotory
    {

        public void Add(userInfo m)
        {
            using var db = appInfo.GetDbconnection();
            var m2 = db.Insert(m);
            Console.WriteLine(m2);
        }
    }
}
