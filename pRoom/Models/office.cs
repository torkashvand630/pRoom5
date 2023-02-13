using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Linq;
using pRoom.Controllers;

namespace pRoom.Models
{
    public static class officControler
    {
        public static async Task<string> parse(message m, meeting meet)
        {
            var action = m.d.action;
            switch (action)
            {
                case "fileSelect":
                    await fileSelect(m, meet);
                    break;
            }

            return "";
        }
        public static async Task<string> fileSelect(message m, meeting meet)
        {
            await setOfficServerWopi();
            if (appInfo.officeServerWopi == null || appInfo.officeServerWopi == "") return "";
            var d = m.d;
            d.wopiUri = appInfo.officeServerWopi;
            var fileName = m.d.fileName;
            meet.offic.activeFile = fileName;
            //await meet.userManager.sendToAllAsync(d);
            await mqtt.send(meet.id, d);
            meet.activePanel = "offic";
            meet.nextPanel = "offic";
            return "";
        }
        public static async Task<string> setOfficServerWopi()
        {
            if (appInfo.officeServerWopi != "") return "";
            WebClient w = new WebClient();
            
            Uri u = new Uri(appInfo.officeServer + "/hosting/discovery");
            string str = "";
            try
            {
                str = await w.DownloadStringTaskAsync(u);
            }
            catch
            {
                return "";
            }
            if (str == null) return "";
            if (str.Length<1000) return "";
            
            XmlDocument xDoc = new XmlDocument();
            try
            {
                xDoc.LoadXml(str);
                var r = xDoc.GetElementsByTagName("action");


                if (r.Count > 0)
                {
                    var node = r[0];
                    var urlsrcAtt = node.Attributes["urlsrc"].Value; 
                    if(urlsrcAtt!=null && urlsrcAtt.Length > 10)
                    {
                        appInfo.officeServerWopi = urlsrcAtt;
                        Console.WriteLine("wopi url is : "+appInfo.officeServerWopi);
                    }
                  
                }
            }
            catch
            {
                return "";
            }
           
            return "";


        }
        public static void copyAll(string SourcePath, string DestinationPath)
        {
            //Now Create all of the directories
            foreach (string dirPath in Directory.GetDirectories(SourcePath, "*", SearchOption.AllDirectories))
                Directory.CreateDirectory(Path.Combine(DestinationPath, dirPath.Remove(0, SourcePath.Length)));

            //Copy all the files & Replaces any files with the same name
            foreach (string newPath in Directory.GetFiles(SourcePath, "*.*", SearchOption.AllDirectories))
                System.IO.File.Copy(newPath, Path.Combine(DestinationPath, newPath.Remove(0, SourcePath.Length)), true);
        }
        public static string createDefultFolder(int id)
        {
          //  return "";
            string envWWWPATH = appInfo.path + "/wwwroot/";
            var roomPath = envWWWPATH + "files/board/" + id;
            var exit = System.IO.Directory.Exists(roomPath);
            if (!exit) System.IO.Directory.CreateDirectory(roomPath);
            var filePath = envWWWPATH + "files/board/orgfile/";
            copyAll(filePath, roomPath);

            return "";
        }
        public static offic GetOffic(int meetID)
        {
            offic o = new offic();
            return o;
            string envWWWPATH = appInfo.path + "/wwwroot/";
            var filePath = envWWWPATH + "files/board/"+ meetID + "/offic/";
            var exit = System.IO.Directory.Exists(filePath);
            if (!exit) 
            {
                System.IO.Directory.CreateDirectory(filePath);
                createDefultFolder(meetID);
            }

            DirectoryInfo d = new DirectoryInfo(filePath);//Assuming Test is your Folder
            FileInfo[] Files = d.GetFiles(); //Getting Text files
           
             
            foreach (FileInfo file in Files.OrderBy(a=>a.CreationTime))
            {
                officFile f = new officFile();
                f.name = file.Name;
                f.ext = Path.GetExtension(file.Name);
                o.filelist.Add(f);
            };
            o.activeFile = "";
            
            return o;
        }
    }
    public class offic
    {
        public List<officFile> filelist=new List<officFile>();
        public string activeFile;
    }
    public class officFile
    {
        public long id;
        public string name;
        public string ext;

    }
}
