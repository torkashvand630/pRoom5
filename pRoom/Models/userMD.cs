using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net.WebSockets;
using System.Threading.Tasks;
using System.Threading;
using System.Text;

namespace pRoom
{
    public class userMD
    {

        public string name;
        public string nickname;
        public DateTime lastTime;
       // public WebSocket socket=null;
        public int meetID; 
        public int id;
        public int role = 0;
      //  public webrtcStream webrtcStream = new webrtcStream();
        public string connectionId = "";
        public int isOffLine = 1;
        public int join = 0;
        public int isRecorder = 0;
        public Permission permission = new Permission(0);
        public string ConnectionId;
        public userMD()
        {
        }
        public userMD(int publisher)
        {
            this.permission = new Permission(publisher);
        }

    } 
    public class webrtcStream
    {
        public string streamId = "";
        public long video { get; set; } = 0;
        public long audio { get; set; } = 0;
        public webrtcStream()
        {

        }
    }
  }
