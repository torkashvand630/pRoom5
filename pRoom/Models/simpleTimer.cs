using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net.WebSockets;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using Dapper;
using System.Timers;
using pRoom.Models;

namespace pRoom
{
    public static class simpleTimer
    {
        public static System.Timers.Timer sTimer = new System.Timers.Timer();
        public static System.Timers.Timer ScreenShareTimer = new System.Timers.Timer();
        public static System.Timers.Timer mqttTimer = new System.Timers.Timer();

        public static bool b = true;

        public static void start()
        {
            sTimer.Interval = 30000;
            sTimer.Elapsed += OnTimedEvent;
            sTimer.AutoReset = true;
            sTimer.Enabled = true;
            b = true;
            sTimer.Start();

            mqttTimer.Interval = 5000;
            mqttTimer.Elapsed += OnMqttTimedEvent;
            mqttTimer.AutoReset = true;
            mqttTimer.Enabled = true;
            mqttTimer.Start();

            //ScreenShareTimer.Interval = 6000;
            //ScreenShareTimer.Elapsed += OnScreenShareTimerEvent;
            //ScreenShareTimer.AutoReset = true;
            //ScreenShareTimer.Enabled = true;

            //  ScreenShareTimer.Start();
        }
        public static void stop()
        {
            sTimer.Stop();

        }
        private static async void OnMqttTimedEvent(Object source, ElapsedEventArgs e)
        {
            //if (!mqtt.client.IsConnected) await mqtt.connect();
            //Console.WriteLine("ddddddddddddddd");
            //foreach (var item in loadingMeet.meetDic)
            //{
            //    Console.WriteLine(item.Key);
                 
            //}
            //Console.WriteLine("...");

        }
        private static async void OnTimedEvent(Object source, ElapsedEventArgs e)
        {

            if (b)
            {
                b = false;

                await offlineUser();
                Models.eventModel.installserver.addserver();
                // _indexManager.bulkInsert();
                //  await crawler.doIt(1);
                b = true;

            }
            else
            {

            }
            // return "";
        }
        public async static Task<string> offlineUser()
        {
            //  var t = DateTime.Now.AddSeconds(-30);
            //  var t2= DateTime.Now.AddSeconds(-100);
            foreach (var meet in meetService.getAllReady())
            {
                //if (meet == null || meet.meetManagPrpperty.finishStatus != "no") continue;
                // if(!meet.isSubscribeMqtt) meet.isSubscribeMqtt =mqtt.Subscribe("meet_get_" + meet.id);
                await offlineUserForMeet(meet);
            }
            GC.Collect();
            GC.WaitForPendingFinalizers();
            GC.Collect();
            return "";
        }
        public async static Task<string> offlineUserForMeet(meeting meet)
        {
             
            var t = DateTime.Now.AddSeconds(-30);
            var t2 = DateTime.Now.AddSeconds(-320);
            var ulist = meet.userManager.userDic.Values.ToList();

            // var recS = ulist.Where(a => a.lastTime < t && a.isOffLine == 0).ToList();
            // var recS = ulist.Where(a =>   a.isOffLine == 0).ToList();
            // if (recS.Count < 1) continue;

            // foreach (var r in recS)  r.isOffLine = 1;
            // socketService.broadcastOffLineUser(meet, recS);
            var userListForDelete = ulist.Where(a => a.lastTime < t2).ToList();

            foreach (var r in userListForDelete)
            {
                //if (r.join == 1) meet.userManager.userDic.TryRemove(r.name, out userMD outUser);
                //else
                //{
                   // if (r.lastTime < t2) 
                    meet.userManager.userDic.TryRemove(r.name, out userMD outUser);
               // }
            }
            Dictionary<string, userMD> onlineUser = meet.userManager.userDic.Where(a => a.Value.isOffLine == 0 && a.Value.nickname != "ali771").ToDictionary(a => a.Key, a => a.Value);
            // Console.WriteLine("timer");
            socketService.broadcastONLineUser(meet, onlineUser);
            return "";
        }

        private static async void OnScreenShareTimerEvent(Object source, ElapsedEventArgs e)
        {

            // await  mqtt.send("t1", "kkkkkkkkkkkk");
            foreach (var meet in meetService.getAllReady())
            {
                if (meet == null) continue;//|| meet.meetManagPrpperty.finishStatus != "no"
                if (meet.activePanel == "screen")
                {
                    var lastTime = meet.screenShareModel.lastTime;
                    if (DateTime.Now > lastTime.AddSeconds(5))
                    {
                        meet.activePanel = meet.nextPanel;
                        Console.WriteLine("screenShareModel");
                        dynamic d = new System.Dynamic.ExpandoObject();
                        d.type = "panelControler";
                        d.action = meet.activePanel;
                        await mqtt.send(meet.id, d);
                        //await meet.userManager.sendToAllAsync(d);
                    }
                    else
                    {
                        // Console.WriteLine("ok");
                    }
                }

            }
        }
    }

    public static class saveMeetTimer
    {
        public static System.Timers.Timer sTimer = new System.Timers.Timer();

        public static bool b = true;

        public static void start()
        {
            //sTimer.Interval = 15000;
            //sTimer.Elapsed += OnTimedEvent;
            //sTimer.AutoReset = true;
            //sTimer.Enabled = true;
            //b = true;
            //sTimer.Start();

        }
        public static void stop()
        {
            sTimer.Stop();

        }
        private static async void OnTimedEvent(Object source, ElapsedEventArgs e)
        {

            if (b)
            {
                b = false;
                //save();
                await finishMeetByTime();
                b = true;
            }
            GC.Collect();
            GC.WaitForPendingFinalizers();
            GC.Collect();

        }
        public static string save()
        {
            bmsgRepository b = new bmsgRepository();
            foreach (var r in meetService.getAllReady())
            {
                if (r == null || r.meetManagPrpperty.finishStatus != "no" || r.isStop == 1) continue;
                b.saveBoard(r);
            }
            return "";
        }

        public static async Task<string> finishMeetByTime()
        {
            foreach (var r in meetService.getAllReady())
            {
                //TimeZoneInfo tzi = TimeZoneConverter.TZConvert.GetTimeZoneInfo("Iran Standard Time");
                //DateTime n = DateTime.Now.ToUniversalTime();
                //n = n.Add(tzi.GetUtcOffset(n));
                var n = myTahranTime.getTime();

                if (r == null || r.meetManagPrpperty.finishStatus != "no") continue;
                if (r.meetManagPrpperty.isLimit == 1 && r.meetManagPrpperty.startTime.AddMinutes(r.meetManagPrpperty.duration) < n)
                {

                    await meetManager.end(r, "finishByTime");
                }
            }

            return "";
        }
    }
    public static class myTahranTime
    {
        public static DateTime getTime()
        {
            TimeZoneInfo tzi = TimeZoneConverter.TZConvert.GetTimeZoneInfo("Iran Standard Time");
            DateTime n = DateTime.Now.ToUniversalTime();

            n = n.Add(tzi.GetUtcOffset(n));

            return n;
        }
    }

}
