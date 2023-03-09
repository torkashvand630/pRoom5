using Newtonsoft.Json.Linq;
using pRoom.Models;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using pRoom.Models.drupal;
using pRoom.Models.eventModel;

namespace pRoom
{
    public class meetNewVM
    {
        public string state = "no";
        public string errorMessage;
        public TranslateMD translate;
        public bool isLTR = true;
        public int isHost = 0;
        public int isRecorder = 0;
        public string meetName = "dddd";
        public int meetID;
        public string userName="";
        public string password = "";
        public string userMeetGUID = "";
        public string userMeetInfo = "";
        public void loadInfo()
        {
            this.userMeetInfo = Newtonsoft.Json.JsonConvert.SerializeObject(this);
        }
    }
    public class meetVM
    {
        public int meetID;
        public string userName;
        public string meetName;
        public string nickName;
        public int p;
        public long videoStartTime;
        public int isLimit = 1;
        public int isHost = 0;
        public JObject obj;
        public string js;
        public userMD user;
        public string jmeet;
        public int isRecorder = 0;
        public TranslateMD translate;
        public bool isLTR = true;

        public int mathEditor = appInfo.mathEditor;
        public int develop = appInfo.develop;
        public int office = appInfo.office;
        public int record = appInfo.record;
        

        public meetVM()
        {

            //this.obj = new JObject();
            //this.obj.Add("aaa", "pppppppppp");
            //this.obj.Add("aaa2", "nnnnnnnnnnnnnn");
            //dynamic d = new System.Dynamic.ExpandoObject();
            //d.type = "userManager";
            //d.action = "setStreamId";

            //this.js = this.js.Replace("&quot;&quot;", "'");
        }

        public void load(javaMeet j)
        {
            this.jmeet = Newtonsoft.Json.JsonConvert.SerializeObject(j);
        }
    }
    public class javaMeet
    {
        public int state = 0;
        public string error = "";
        public string meetID;
        public string userName;
        public string meetName;
        public string nickName;
        public int publish;

        public int isLimit = 1;
        public int isHost = 0;
        public int live = appInfo.live;
        public string exitUrl;
        public string lang;
        public userMD user;

        public int pageCount = 7;
        public int PdfPageCount = 0;
        public int pdfOrder = 0;


        public int fileID = 0;
        public int activePage = 1;
        public int play = 0;

        public int isMobile = 0;
        public int width = 1010;
        public int height = 810;

        public int mathEditor = appInfo.mathEditor;
        public int develop = appInfo.develop;
        public int office = appInfo.office;
        public int record = appInfo.record;

        public string mediaServer = appInfo.mediaServer;
        public string mediaServerPass = appInfo.mediaServerPass;

        public int isRecorder = 0;
        public TranslateMD translate;
        public bool isLTR = true;
        public string officeServer = appInfo.officeServerWopi;
        public string mqttServer = appInfo.mqttServer;
        public string serverID = appInfo.serverID;
        public string recordServer = appInfo.recordServer;
        public string Prefix = appInfo.Prefix;
        public string guid = "";
    }
    public class meetErrorVM
    {
        public int meetID;
        public string message;
        public int code=0;
    }
    public class meeting : IDisposable
    {
        public int id { get; set; }
        public meetManagPrpperty meetManagPrpperty;
        public string meetName { get; set; }
        public string status { get; set; }
        public byte isStop { get; set; }
        public int pdfCount { get; set; } = 0;
        public FilesModel filesModel { get; set; } = new FilesModel();
        public ChatMD chatMD { get; set; } = new ChatMD();
        public string guid { get; set; }
        public dynamic st = new System.Dynamic.ExpandoObject();
        public Models.BoardMD board = new Models.BoardMD();
        public byte[] base64data;
        public string Base64 = "";
        public long videoStartTime;
        public recordMD recordMD = new recordMD();
        public userManager userManager = new userManager();
        public int webrtcRoom = 0;
        public quizModel quizModel = null;
        public vPlayerModel vPlayerModel = new vPlayerModel();
        //  public string diagramLastMessage = "";
        public diagramData diagramData = new diagramData();
        public string activePanel = "board";
        public string nextPanel = "board";
        public screenShareModel screenShareModel = new screenShareModel();
        public MathEditorData MathEditorData = new MathEditorData();
        public offic offic;
        // public bool isSubscribeMqtt = false;
        public Permission permission = new Permission(0);
        public DevelopMD developMD = new DevelopMD();
        public int isDemo = 0;
        public int owner = 0;
        //public int readyStatus = 0;

        public object copy()
        {
            meeting m = (meeting)this.MemberwiseClone();
            m.board = (Models.BoardMD)this.board.copy();
            return m;
        }

        public meeting()
        {
            id = APPST.GetRandomNumber();

        }
        public void getZipData()
        {

            var jsonString = Newtonsoft.Json.JsonConvert.SerializeObject(this.board);
            // this.Base64 = Base64Encode(jsonString);
            this.base64data = zipping.Zip(jsonString);
            jsonString = null;
            // this.board.mList = null;
        }
        public string Base64Encode(string plainText)
        {
            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(plainText);
            return System.Convert.ToBase64String(plainTextBytes);
        }
        public meeting(meetManagPrpperty mp)
        {
            Console.WriteLine("create meet2 : " + mp.meetID);
            this.id = mp.meetID;
            this.meetManagPrpperty = mp;
            this.meetName = mp.meetName;
            this.board.meetID = mp.meetID;
            this.st.record = new System.Dynamic.ExpandoObject();
            this.st.record.status = "not";
            this.st.record.id = "0";
            this.userManager = new userManager();
            if (mp.finishStatus == "no")
            {
                this.loadFile();
                //  this.filesModel.fileCount++;
                this.board.loadFromDb(this.id);
                this.board.setDic(id, this);
            }
            this.offic = officControler.GetOffic(this.id);
            // mqtt.SubscribeAsync("meet_get_" + this.id);
            // Task.Run(() =>mqtt.SubscribeAsync("meet_get_" + this.id));
            // this.isSubscribeMqtt= mqtt.Subscribe("meet_get_"+appInfo.serverID+"_" + this.id);
        }
        public meeting(eventRoom node)
        {
            Console.WriteLine("create meet0 : " + node.id);
            this.id = node.id;
            this.meetManagPrpperty = null;
            this.meetName = node.name;
            this.board.meetID = node.id;
            this.st.record = new System.Dynamic.ExpandoObject();
            this.st.record.status = "not";
            this.st.record.id = "0";
            if (node.password == "0") this.isDemo = 1;
            this.owner = node.userID;
            this.userManager = new userManager();

            this.loadFile();
            //  this.filesModel.fileCount++;
            this.board.loadFromDb(this.id);
            this.board.setDic(id, this);
            chatService.loadAll(this);
            this.offic = officControler.GetOffic(this.id);
            // mqtt.SubscribeAsync("meet_get_" + this.id);
            // Task.Run(() =>mqtt.SubscribeAsync("meet_get_" + this.id));
            // this.isSubscribeMqtt = mqtt.Subscribe("meet_get_" + appInfo.serverID + "_" + this.id);

        }
        public void reset()
        {
            this.isStop = 1;
            this.board = new BoardMD();
            (new bmsgRepository()).deleteAll(this.id);
            this.chatMD = new ChatMD();
            this.board.meetID = this.id;
            this.filesModel = new FilesModel();
            (new fileRepository()).deleteAll(this.id);
            this.createDefultFile();
            this.pdfCount = 1;
            this.board.lastSaveMessageIndex = 0;

            this.board.setDic(this.id, this);
            (new chatMessageReposotory()).deleteAll(this.id);

            this.userManager = new userManager();
            this.isStop = 0;


        }
        protected virtual void Dispose(bool disposing)

        {
            // Dispose(true);
            // Suppress finalization.
            GC.SuppressFinalize(this);
        }
        public void Dispose()
        {
            Dispose(true);
            // This object will be cleaned up by the Dispose method.
            // Therefore, you should call GC.SupressFinalize to
            // take this object off the finalization queue
            // and prevent finalization code for this object
            // from executing a second time.
            GC.SuppressFinalize(this);
        }

        public void loadFile()
        {
            fileRepository fr = new fileRepository();
            var fList = fr.getBYMeetID(this.id);
            if (fList.Count > 0) this.filesModel.fileList = fList;
            else createDefultFile();
        }
        public void createDefultFile()
        {
            FileMD f = new FileMD()
            {
                inRoomID = 0,
                width = 1000,
                height = 800,
                pageCount = 7,
                ext = "pdf",
                name = "defult file",

            };
            this.filesModel.add(f);
        }
        public meeting(string name)
        {
            this.meetName = name;
        }

        //public List<userMD> userList = new List<userMD>();
    }


    public static class meetService
    {
        public static ConcurrentDictionary<int, int> loadingDic = new ConcurrentDictionary<int, int>();
        public static List<int> rMeet = new List<int>();
        public static int k = 0;
        private static readonly object balanceLock = new object();

        public static List<meeting> getAllReady()
        {
            var mList = APPST.meetDic.Values.Where(a => a != null).ToList();//|| meet.meetManagPrpperty.finishStatus != "no"
            return mList;
        }
         
        public static meeting GetMeeting(int id)
        {
            if (APPST.meetDic.TryGetValue(id, out meeting meet))
                return meet;
            else return null;
            // return  await GetMeeting(id, "");
        }
        public static meeting GetOrAddMeeting(int id)
        {
            if (APPST.meetDic.TryGetValue(id, out meeting meet))
                return meet;
            // pRoom.Models.drupal.Node node = pRoom.Models.drupal.nodeRepos.getNode(id);
            eventRoom node = (new eventRoomReposotory()).get(id);
            if (node == null) return null;
            meeting newMeet = new meeting(node);
            APPST.meetDic.TryAdd(node.id, newMeet);
            return newMeet;
            // return  await GetMeeting(id, "");
        }
        public static meeting GetMeeting(int id, string meetName, string userName)
        {
            if (APPST.meetDic.ContainsKey(id))
                return APPST.meetDic[id];
            else
            {

                lock (balanceLock)
                {
                    if (APPST.meetDic.ContainsKey(id))
                        return APPST.meetDic[id];
                    if (loadingDic.ContainsKey(id)) //if (k==1)// if(rMeet.Where(a=>a==id).Count()>0)//  
                    {
                        // Console.WriteLine("wate for meet ready .......................................................................................................... " + userName);
                        Thread.Sleep(1000);

                        return GetMeeting(id, meetName, userName);
                    }
                    k++;
                    loadingDic.TryAdd(id, 1);

                    // k++;
                    //rMeet.Add(id);
                    // Thread.Sleep(100);
                    //Console.WriteLine("rmmet count is :::::::::::::::::::: " + loadingDic.Count + " " + userName + " " + " k: " + k + "   " + DateTime.Now);
                }
                // k = 1;
                var meetManageP = (new meetManagReposotory()).get(id);
                var m = new meeting(meetManageP);
                //  m.meetManagPrpperty = meetManageP;
                //   m.board.setDic(id, m);
                APPST.meetDic.TryAdd(id, m);
                // k = 2;
                //  Console.WriteLine("rmmet2 count is :::::::::::::::::::: " + loadingDic.Count + " " + DateTime.Now + " " + userName);
                // loadingDic.TryRemove(id, out int rr);
                //  await  recording.startSessions(m);
                return m;



            }
        }
        public static string recordingMeet(meeting meet)
        {
            requestReposotory rq = new requestReposotory();
            rq.Add(meet);
            meet.recordMD.status = 1;
            return "";
            //await recording.startSessions(meet);
            //meet.recordMD.recordAble = 1;
            //meet.recordMD.status = 1;
            //Console.WriteLine("recording meet : " + meet.id);
            //return "";
        }
        public static async Task<meeting> GetMeetingPlay(int id)
        {
            if (APPST.meetDic.ContainsKey(id))
                return APPST.meetDic[id];
            else
            {
                //  var m = new meeting(id,"");
                //APPST.meetDic.Add(id, m);
                //m.board.setDic(id);
                //await recording.setMeetVideoStartTime(m);
                return null;
            }
        }
        public static bmsg messageToBmsg(message m)
        {
            var jsonString = Newtonsoft.Json.JsonConvert.SerializeObject(m);
            // Console.WriteLine(jsonString);
            //var fileID =  m.d.d.fileID ;
            //var pageID = m.d.d.num ;
            bmsg b = new bmsg()
            {
                meetID = m.meetID,
                str = m.messStr,
                //fileID = fileID,
                //pageID = pageID,
            };
            return b;
        }
    }

}
