using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using pRoom.Models;

namespace pRoom.Models
{
    public static class meetManager
    {
        public static async Task<string> parse(message m, meeting meet)
        {
            var action = m.d.action;
            switch (action)
            {
                case "end":
                    await endFromUser(m, meet);
                    break;

            }
            return "";
        }
        public static async Task<string> endFromUser(message m, meeting meet)
        {
            if (m.user.role == 1) await end(meet, "finishByAdmin");
            return "";
        }
        public static async Task<string> end(meeting meet, string finishStatus)
        {
            Console.WriteLine("end meet :" + meet.id);
            if (meet.meetManagPrpperty.recording == 1)
            {
                
                requestReposotory rrp = new requestReposotory();
                var requst = rrp.getByMeetID(meet.id);
                if(requst!=null)
                {
                    if (requst.status == 0)
                    {
                        requst.status = 3;
                        rrp.update(requst);
                    }
                   
                }
               
            }
            //if (meet.meetManagPrpperty.recording == 1)
            //{
            //    requestMD request = new requestMD()
            //    {
            //        name = "stop",
            //        meetID = meet.id,
            //        insertTime = DateTime.Now,
            //        status = 0
            //    };
            //    requestReposotory rrp = new requestReposotory();
            //    rrp.addRecord(request);
            //}

            dynamic d100 = new System.Dynamic.ExpandoObject();
            d100.type = "meetManager";
            d100.action = "end";
            // await meet.userManager.sendToAllAsync(d100);
            await mqtt.send(meet.id, d100);
            meet.meetManagPrpperty.finishStatus = finishStatus;
            APPST.meetDic.TryRemove(meet.id, out meeting mOut);
            meetManagReposotory mmp = new meetManagReposotory();
            mmp.updateFinishStatus(meet.id, finishStatus);
            meet.userManager = null;
            meet.board = null;
            meet.Dispose();
            meet = null;
            GC.Collect();
            GC.WaitForPendingFinalizers();
            GC.Collect();

            return "";
        }
    }
    public static class meetManagerService
    {

        public static void load()
        {
            Console.WriteLine("app is ready .... ");
            //APPST.readyStatus = 1;
            return;
            meetManagReposotory mmp = new meetManagReposotory();

            var mList = mmp.getAll("no");
            
            var outList = mList.Where(a => a.startTime.AddMinutes(a.duration) <= DateTime.Now && a.isLimit == 1).ToList();
           
            foreach (var r in outList)
            {
                mmp.updateFinishStatus(r.meetID, "finishByTime");
            }
            var reabyList = mList.Where(a => a.startTime.AddMinutes(a.duration) > DateTime.Now || a.isLimit == 0).ToList();
           
            foreach (var r in reabyList)
            {
                meeting m = new meeting(r);
                chatService.loadAll(m);
                APPST.meetDic.TryAdd(m.id, m);
            }
            Console.WriteLine("app is ready .... ");
            APPST.readyStatus = 1;
        }
    }
}
