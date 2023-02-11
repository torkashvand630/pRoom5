#nullable disable

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net.WebSockets;
 

namespace pRoom
{
    public class message : IDisposable
    {
        public string userName;
        public int meetID;
        public string type;
        public string action="";
        public dynamic d= new System.Dynamic.ExpandoObject(); 
        public string messStr;
        public userMD user;
        
        public message(string userName,int meetID, dynamic d)
        {
            this.userName = userName;
            this.meetID = meetID;
            this.d = d;
        }
        public message(dynamic dd,string messStr)
        {                       
            this.userName = dd.meetInfo.userName;          
            this.meetID =int.Parse( dd.meetInfo.meetID);          
            this.type = dd.type;
            //try
            //{
            //    this.action = dd.action;
            //}
            //catch { this.action = ""; }
            this.messStr =  messStr;            
            this.d = dd;
        }
        public message(dynamic dd, string messStr,Boolean b)
        {
            this.userName = "1";
            this.meetID = 1;
            this.type = "board";
            this.action = "";
            this.messStr = "";// messStr;
            
            this.d.d = dd;
          
        }

        protected virtual void Dispose(bool disposing)

        {
             
            GC.SuppressFinalize(this);
        }
        public void Dispose()
        {
            Dispose(true);            
            GC.SuppressFinalize(this);
        }

    }
}
