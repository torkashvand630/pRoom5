using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pRoom.Models
{
    public static class screenShareControler
    {
       
        public static async Task<string> parse(message m, meeting meet)
        {
            meet.screenShareModel.lastTime = DateTime.Now;
            //Console.WriteLine(m.messStr);
            var action = m.d.action;
            switch (action)
            {
                case "showBoard":
                    // await showBoard(m, meet);
                    break;
            }
            return "";
        }
    }
    public class screenShareModel
    {
        public string ownerID { get; set; }
        public DateTime lastTime { get; set; } = DateTime.Now;
    }
}
