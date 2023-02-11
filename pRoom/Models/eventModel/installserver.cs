using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace pRoom.Models.eventModel
{
    public static class installserver
    {
        public static bool isAdd = true;
        public static string addserver()
        {
            if (isAdd) return "";
            isAdd = true;
            //string url = "https://en.learn100.ir/psd/installserver/" + appInfo.host;
            string url2 = "https://learn100.ir/psd/installserver/" + appInfo.host;
            using WebClient client = new WebClient();
            //try
            //{
            //    var html =  client.DownloadString(url);
            //    Console.WriteLine("add to remote server  en ");
            //}
            //catch { Console.WriteLine("error in add to remote server en "); }
            try
            {
                var html2 = client.DownloadString(url2);
                Console.WriteLine("add to remote server  fa ");
            }
            catch { Console.WriteLine("error in add to remote server fa "); }

            return "";
        }
    }
}
