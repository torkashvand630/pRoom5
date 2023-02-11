using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pRoom.Models.eventModel
{
    public class MyPage
    {
        public string name;
        public mUser muser = null;
        public TranslateMD t;
        public string lang = appInfo.lang;
        public MyPage(string lang)
        {
            this.t = Translate.langDic[lang];
        }
        public MyPage()
        {
            this.t = Translate.langDic[lang];
        }
        public MyPage(HttpRequest r)
        {
             
             
            if (r.Headers.ContainsKey("lang"))
            {
                this.lang = r.Headers["lang"];
              
                
            }
            this.t = Translate.langDic[this.lang];

            // var res = r.Headers.TryGetValue("lang",  (Microsoft.Extensions.Primitives.StringValues)lang);
        }


    }
    

}
