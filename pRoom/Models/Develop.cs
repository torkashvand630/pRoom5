using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pRoom.Models
{
    public static class Develop
    {
        public static async Task<string> parse(message m, meeting meet)
        {
             Console.WriteLine(m.messStr);
            var action = m.d.action;
            if (action == null) return "";
            switch (action)
            {
                case "selectLanguage":
                    await selectLanguage(m, meet );
                    break;
            }
            return "";

        }
        public static async Task<string> selectLanguage(message m, meeting meet)
        {
            await mqtt.send(meet.id, m.d);
            try
            {
                var lang = m.d.lang;
                if (lang != null) meet.developMD.lastFile = lang;
            }
            catch { }
            return "";
        }
    }
    public class DevelopMD
    {
        public string lastFile = "html";
    }
}
