using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Xml.Linq;
using HtmlAgilityPack;

namespace pRoom.Models
{
    public class vPlayerModel
    {
        public dynamic m=null;        
        public int isActive = 0;
        public userMD admin = null;
    }
    public static class vPlayer
    {
        public static async Task<string> parse(message m, meeting meet)
        {
            //Console.WriteLine(m.messStr);
            meet.vPlayerModel.m = m.d;
            meet.vPlayerModel.isActive = 1;
          
            var action = m.d.action;
            if(action== "setAdmin")
            {
               await setAdmin(m, meet);
            }
            else
            {
                if(meet.vPlayerModel.admin!=null &&  m.user.name==meet.vPlayerModel.admin.name)
                    if(meet.activePanel== "vPlayer")
                        await mqtt.send(meet.id, m.messStr);
                //await meet.userManager.sendToAllAsync(m.messStr);
            }
            //switch (action)
            //{
            //    case "setAdmin":
            //        await setAdmin(m, meet);
            //        break;
            //    default:
            //        await defaultCase(m, meet);
            //        break;

            //}
            return "";
        }

        
        public static async Task<string> setAdmin(message m, meeting meet)
        {
           // Console.WriteLine("player set admin");
            string url = m.d.url;
           
            string newUrl =await aparatCheck(url);
           
            m.d.url = newUrl;           
            meet.vPlayerModel.admin = m.user;                                 
            await mqtt.send(meet.id, m.d);
            return "";
        }
        public static async Task<string> aparatCheck(string url)
        {
            if (url.StartsWith("https://aparat.com/") || url.StartsWith("https://www.aparat.com/"))
            {
                Console.WriteLine("url is aparat");
                try
                {
                    string newUrl = await getAparatFileUrl(url);
                    return newUrl;
                }
                catch
                {
                    return "error";
                }
              
            }
            else return url;
            
        }
        public static async Task<string> getAparatFileUrl(string url)
        {
            //return "gwwwwwwwwwwwwwwwwwww";
            using WebClient client = new WebClient();
            var html = await client.DownloadStringTaskAsync(url);
            //Console.WriteLine("html length : " + html.Length);
           
            //XDocument doc = XDocument.Parse(html);
            //var root = doc.Elements("mxfile").FirstOrDefault();
             // HtmlWeb web = new HtmlWeb();
            var doc = new HtmlAgilityPack.HtmlDocument();
           doc.LoadHtml(html);
           // var doc = web.Load(url);
           // var dropdown = doc.DocumentNode.Descendants("div").Where(d => d.Attributes["class"].Value.Contains("download-dropdown")).FirstOrDefault();
            var dropdown = doc.DocumentNode.Descendants("div").Where(a => a.GetAttributeValue("class", "").Contains("download-dropdown")).FirstOrDefault();
            if (dropdown == null)
            {
                Console.WriteLine("dropdown not found");
                return "error";
            }
            
            var links = dropdown.Descendants("a").ToList();
            Console.WriteLine("link count : "+links.Count);
            if (links.Count < 1 || links == null) return "error";
            var num = Math.Min(4, links.Count);
            var href = links[num-1].GetAttributeValue("href", "").Trim();
            Console.WriteLine(href);
            return href;

        }
    }
}
