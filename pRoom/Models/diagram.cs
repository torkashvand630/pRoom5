using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace pRoom.Models
{
    public static class diagram
    {
        public static async Task<string> parse(message m, meeting meet)
        {
           // Console.WriteLine(m.messStr);
           
           
            if(isChang(m,meet)==true)
           // await meet.userManager.sendToAllAsync(m.messStr);
            await mqtt.send(meet.id, m.messStr);
            return "";
        }

        public static bool isChang(message m,  meeting meet)
        {
            var xml = m.d.m.data;
            var pageid = m.d.m.pageid;
            var pageText = "";
           
            XDocument doc = XDocument.Parse(xml);
            var root = doc.Elements("mxfile").FirstOrDefault();
            if (root != null)
            {
                var diagramList = root.Elements("diagram").ToList();
                if (diagramList != null && diagramList.Count > 0)
                {
                    foreach (var t in diagramList)
                    {
                        var id = t.Attribute("id").Value;
                        if (id != null)
                        {
                            if (id == pageid)
                            {
                                 
                                if(pageid==meet.diagramData.pageid)
                                {
                                    Console.WriteLine("------------");
                                    pageText = t.Value;
                                    if (pageText == meet.diagramData.pagetext)
                                    {
                                        Console.WriteLine("***************************");
                                        Console.WriteLine("***************************");
                                        return false;
                                    }
                                }
                                Console.WriteLine("***");
                                meet.diagramData.pagetext = pageText;
                                meet.diagramData.pageid = pageid;
                                meet.diagramData.LastMessage = m.messStr;
                               
                                return true;
                                Console.WriteLine(pageText);
                            }
                            Console.WriteLine(id);
                        }
                    }
                }
            }
            return false;
        }
    }
    public class diagramData
    {
        public string pageid = "";
        public string pagetext = "";
        public string LastMessage = "";
    }
}
