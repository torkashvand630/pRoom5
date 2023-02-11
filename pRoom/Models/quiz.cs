using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pRoom.Models
{
    public class quizModel
    {
        public message m;
        public Dictionary<string, long> dic = new Dictionary<string, long>();
    }
    public static class quiz
    {
        public static async Task<string> parse(message m, meeting meet)
        {
            //Console.WriteLine(m.messStr);
            var action = m.d.action;
            switch (action)
            {
                case "quizCreate":
                    await quizCreate(m, meet);
                    break;
                case "answer":
                    await answer(m, meet);
                    break; 
                case "showResultForAll":
                    await showResultForAll(m, meet);
                    break;
                case "resultdetails":
                    await Resultdetails(m, meet);
                    break;
            }
            return "";
        }
        public static async Task<string> quizCreate(message m, meeting meet)
        {
              
            quizModel qm = meet.quizModel;// new quizModel();
            if (qm == null) qm = new quizModel();
            qm.m = m;
            meet.quizModel = qm;
            // await meet.userManager.sendToAllAsync(m.messStr);
            await mqtt.send(meet.id, m.messStr);
            return "";
        }
        public static async Task<string> showResultForAll(message m, meeting meet)
        {
            var qm = meet.quizModel;
            if (qm == null)
            {
                return "";
            }
            var rlist = qm.dic.ToList().GroupBy(a => a.Value);
            dynamic d = new System.Dynamic.ExpandoObject();
            d.type = "quiz";
            d.action = "showResultForAll";
            d.rlist = rlist;
           // await meet.userManager.sendToAllAsync(d);
            await mqtt.send(meet.id, d);
            return "";
        }
        public static async Task<string> Resultdetails(message m, meeting meet)
        {
            var qm = meet.quizModel;
            if (qm == null)
            {
                return "";
            }
             
            List<string> dList = new List<string>();
            var rlist = qm.dic.ToList().GroupBy(a => a.Value);
            foreach(var r in qm.dic.ToList())
            {
                if (meet.userManager.userDic.ContainsKey(r.Key))
                {
                    var p = meet.userManager.userDic[r.Key];
                    var q = p.nickname + " : "   + r.Value;
                    dList.Add(q);
                }
            }
            dynamic d = new System.Dynamic.ExpandoObject();
            d.type = "quiz";
            d.action = "resultdetails";
            d.rlist = rlist;
            d.dlist = dList;
           // await meet.userManager.sendToAllAsync(d);
            await mqtt.send(meet.id, d);
            return "";
        }
        public static async Task<string> answer(message m, meeting meet)
        {
            var answer = m.d.answer;
            //Console.WriteLine("answer is : " + answer);
            var qm = meet.quizModel;
            if (qm == null)
            {
                return "";
            }
            else
            {
                if (qm.dic.ContainsKey(m.userName))
                {
                    qm.dic[m.userName] = answer;
                    //Console.WriteLine("dic contain key : " + m.userName);
                }
                else
                {
                    qm.dic.Add(m.userName, answer);
                    //Console.WriteLine("dic  not found  key : " + m.userName);
                }
            }
             return await showResult(m , meet);
        }
        public static async Task<string> showResult(message m, meeting meet)
        {
            var qm = meet.quizModel;
            if (qm == null)
            {
                return "";
            }
            var rlist = qm.dic.ToList().GroupBy(a => a.Value);
            dynamic d = new System.Dynamic.ExpandoObject();
            d.type = "quiz";
            d.action = "result";
            d.rlist = rlist;
            // await meet.userManager.sendToAllAsync(d);
            await mqtt.send(meet.id, d);
            return "";
        }
    }
}
