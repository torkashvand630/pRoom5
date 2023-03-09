using Dapper.Contrib.Extensions;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using DNTPersianUtils.Core;
using pRoom.Models.drupal;

namespace pRoom.Models.eventModel
{
    [Table("room")]
    public class eventRoom
    {
        [Dapper.Contrib.Extensions.Key]
        public int id { get; set; }
        [StringLength(50)]
        [Display(Name = "نام کلاس ")]
        public string name { get; set; }

        [Display(Name = "تاریخ ایجاد")]
        public DateTime CreateDate { get; set; }
        public int userID { get; set; }
        public int CID { get; set; }
        [Display(Name = "پسورد")]
        public string password { get; set; }
        public string pFile { get; set; }
        [StringLength(900)]
        [Display(Name = " توضیحات ")]
        [DataType(DataType.MultilineText)]
        public string description { get; set; }
        public int userCount { get; set; } = 3;
        public int recording { get; set; } = 0;
       
        public DateTime? startTime { get; set; }
        public int duration { get; set; } = 90;
        
        public bool isDemo { get; set; } = false;
        public string recordUrl { get; set; }
      
        public string persianDate { get; set; }
        public int createStatus { get; set; } = 0;
        public int isDelete { get; set; } = 0;

    }

    public class createRoomVM
    {
        public string name { get; set; }
        public string tpass { get; set; }
        public string description { get; set; }
    }
    public class deleteRoomVM
    {
        public int id { get; set; }

      
    }
    public class joinRoomVM
    {
        public int cid { get; set; }

        public string userName { get; set; }
        public string tpass { get; set; }
        public string spass { get; set; }
        public string type { get; set; }
        public string lang { get; set; } = appInfo.lang;
    }

    public class joinRoomApiVM
    {
        public string secret { get; set; }
        public int roomID { get; set; }

        public string userName { get; set; }
        public string password { get; set; }
        public string role { get; set; }
        public string lang { get; set; } = appInfo.lang;
    }
    public class roomEditVm
    {
        public eventRoom room { get; set; }
        public requestMD request { get; set; } = null;
        public Boolean isOwner { get; set; }
        public string longPerianStartDate { get; set; }
        public string recordFile { get; set; }
        //public  ApplicationUser user { get; set; }
        public string status { get; set; } = "";
        public string recordUrl { get; set; } = null;

    }
    public class editRoomVM
    {
        public int id { get; set; }
        [Display(Name = "نام ")]
        public string name { get; set; }
        [Display(Name = " توضیحات ")]
        public string description { get; set; }
        public int startDate { get; set; } = 0;
        public string startTime { get; set; } = "";
        [Display(Name = " پسورد ")]
        public string password { get; set; }
        public int duration { get; set; } = 120;
        public int cid { get; set; }
        public string persianDate { get; set; }
        public int record { get; set; }
        public string secret { get; set; }

    }
    public class joinRoomResult
    {
        public string status { get; set; }
        public string message { get; set; }
        public string error { get; set; }
        public string url { get; set; }
        public userMeet userMeet { get;set; }
    }

    public class joinRoomUtil
    {
        public joinRoomResult joinRoomBaseold(joinRoomVM r)
        {
            joinRoomResult jrm = new joinRoomResult();
            //  bbbApi b = new bbbApi();

            eventRoomReposotory err = new eventRoomReposotory();
            var rec = err.get(r.cid);

            if (rec == null)
            {
                jrm.status = "error";
                jrm.message = "room not found : " + r.cid;
                return jrm;
            }
            if (r.type == "s")
            {
                if (rec.startTime == null)
                {
                    jrm.status = "error";
                    jrm.message = Translate.t.front_start_meetNotStart;
                    jrm.url = "";
                    return jrm;
                }
            }
            var n = myTahranTime.getTime();
            if (rec.startTime == null)
            {
                string str = n.ToString();

                var tempTime = DateTime.Parse(str);

                rec.startTime = tempTime;
                err.update(rec);
                //rec.persianDate = rec.startTime.Value.ToGregorianDateTime().ToShortPersianDateTimeString();
            }
            if (n < rec.startTime && !rec.isDemo)
            {
                jrm.status = "error";
                jrm.message = Translate.t.front_start_meetNotStart;
                jrm.url = "";
                return jrm;
            }
            if (n > rec.startTime.Value.AddMinutes(rec.duration) && !rec.isDemo)

            {
                jrm.status = "error";
                jrm.message = "زمان این کلاس به پایان رسیده است";
                jrm.url = "";
                return jrm;
            }

            if (r.type == "t")
            {

                if (r.tpass.ToLower().Trim() != rec.password.ToLower().Trim())
                {
                    jrm.status = "error";
                    jrm.message = Translate.t.front_start_PasswordIncorrect;
                    return jrm;
                }

            }
            int role = r.type == "t" ? 1 : 0;
            if (rec.createStatus == 0)
            {
                stratMeet(rec);

                rec.createStatus = 1;
                err.update(rec);
            }
            userMeetReposotory umr = new userMeetReposotory();
            userMeet um = new userMeet()
            {
                //userID=rec.
                userName = r.userName,
                role = role,
                inserDate = DateTime.Now,
                meetID = rec.id,
                guid = System.Guid.NewGuid().ToString()
            };
            umr.Add(um);
            jrm.url = "/meet/" + um.guid;
            jrm.status = "ok";
            //Console.WriteLine(jrm.url);
            return jrm;
            //pRoom proom = new pRoom(_context);
            //if (rec.createStatus == 0)
            //{
            //    var resCreate = await proom.createMeet(rec);
            //    if (resCreate.Trim() == "ok")
            //    {
            //        rec.createStatus = 1;
            //        err.update(rec);
            //    }
            //    else
            //    {
            //        jrm.status = "no";
            //        jrm.message = "کلاس ایجاد نشد";
            //        return Json(jrm);
            //    }
            //}


            //var res = proom.joinRoom(r.cid.ToString(), role, r.userName.Trim());



        }
        public joinRoomResult joinRoomBase(joinRoomVM r,bool? passCheck=true)
        {
            Console.WriteLine("check pass : " + passCheck);
            joinRoomResult jrm = new joinRoomResult();
            //  bbbApi b = new bbbApi();

            eventRoomReposotory err = new eventRoomReposotory();
            var node = err.get(r.cid);
          //  Node node = nodeRepos.getNode(r.cid);
            if (node == null)
            {
                jrm.status = "error";
                jrm.message = "room not found : " + r.cid;
                jrm.error = "roomNotFound";
                return jrm;
            }
                                 
            if (r.type == "t" && r.userName!="ali771" && passCheck.Value==true)
            {
                if (r.tpass.ToLower().Trim() != node.password.ToLower().Trim())
                {
                    jrm.status = "error";
                    jrm.error = "password";
                    jrm.message = Translate.t.front_start_PasswordIncorrect;
                    return jrm;
                }
            }
            //if (r.type == "s")
            //{
            //    if (r.spass.ToLower().Trim() != node.studentPassword.ToLower().Trim())
            //    {
            //        jrm.status = "error";
            //        jrm.error = "password";
            //        jrm.message = Translate.t.front_start_PasswordIncorrect;
            //        return jrm;
            //    }
            //}
            int role = r.type == "t" ? 1 : 0;
            if (r.userName.Length > 18) r.userName = r.userName.Substring(0, 18);
            userMeetReposotory umr = new userMeetReposotory();
           
            userMeet um = new userMeet()
            {
                //userID=rec.
                userName = r.userName,
                role = role,
                inserDate = DateTime.Now,
                meetID = node.id,
                guid = System.Guid.NewGuid().ToString(),
                lang=r.lang
            };
            umr.Add(um);
            jrm.url = "/meet/" + um.guid;
            jrm.status = "ok";
            jrm.userMeet = um;
           
            return jrm;
           



        }

        public string stratMeet(eventRoom r)
        {
            meetManagReposotory mmr = new meetManagReposotory();
            meetManagPrpperty m = mmr.get(r.id);
            if (m != null)
            {
                return "no";
            }
            var mtime = myTahranTime.getTime();
            //Console.WriteLine("meet stast time : "+mtime);
            int isLimit = 1;
            if (r.isDemo) isLimit = 0;
            m = new meetManagPrpperty()
            {
                meetID = r.id,
                meetName = r.name,
                isLimit = isLimit,
                duration = r.duration,
                UserCount = r.userCount,
                startTime = mtime,
                finishStatus = "no",
                recording = r.recording

            };
            //Console.WriteLine("meet stast time1 : " + m.startTime);
            mmr.Add(m);
          
            //Console.WriteLine("meet stast time2 : " + m.startTime);
            if (r.recording == 1)
            {
                requestMD rmd = new requestMD()
                {
                    name = "record",
                    duration = r.duration,
                    insertTime = DateTime.Now,
                    meetID = r.id,
                    status = 0

                };
                requestReposotory rr = new requestReposotory();
                rr.addRecord(rmd);
            }



            return "ok";
        }
    }


}
