using Dapper;
using System;
using Dapper.Contrib.Extensions;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace pRoom.Models.eventModel
{
    public class eventUserReposotory
    {
        
         
        public void Add(mUser m)
        {
            m.Mobile = "jj";
            string sQuery = "INSERT INTO musers (Password , Guid , Name , Email , Mobile , RoleID )"
                               + " VALUES( @Password , @Guid , @Name , @Email , @Mobile , @RoleID );SELECT CAST(SCOPE_IDENTITY() as int)";
            using var db = appInfo.GetDbconnection();
           var  m2 = db.Insert(m);
          //  var id = db.Query<int>(sQuery, m).Single();
                m.id =(int)m2;

            

        }
        public mUser get(string email,string pass)
        {
            using var db = appInfo.GetDbconnection();
            var m = db.Query<mUser>("Select * From musers where  Password='" + pass + "' and Email='" + email + "' ").SingleOrDefault();
                return m;
             
        }
        public mUser getByEmail(string email)
        {
           // email = "hh";
           // return null;
            using var db = appInfo.GetDbconnection();
            var m = db.Query<mUser>("Select * From musers where    Email='" + email + "' ").FirstOrDefault();
            return m;
             

        }
        public mUser getByGuid(string guid)
        {
           // return null;
            using var db = appInfo.GetDbconnection();
            var m = db.Query<mUser>("Select * From musers where    Guid='" + guid + "' ").SingleOrDefault();
                return m;
            

        }
    }
}
