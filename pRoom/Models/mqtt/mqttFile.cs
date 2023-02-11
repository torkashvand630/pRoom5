using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices;
using System.Runtime.Serialization.Formatters.Binary;
using System.Text;
using System.Threading.Tasks;

namespace pRoom.Models 
{
    public static class mqttFile
    {
        public static string parse(message m, meeting meet)
        {
             Console.WriteLine(m.messStr);
            var data = m.d.data;
           Console.WriteLine("2 :");
           var d2 = Base64Decode(data);
            Console.WriteLine(d2);
         //   var b = ObjectToByteArray(d2);
            Console.WriteLine("22");
            //var ms = new MemoryStream(data);
            //ms.Position = 0;

            var fpath = appInfo.path + "/wwwroot/files/" + "p1.pdf";

            //string src = data.Replace("data:image/jpeg;base64,", "");
            //Console.WriteLine("start : " + src);
            byte[] imgBytes = Convert.FromBase64String(data);
            using (var imageFile = new FileStream(fpath, FileMode.Create))
            {
                imageFile.Write(imgBytes, 0, imgBytes.Length);
                imageFile.Flush();
            }

            return "";

            //using (FileStream file = new FileStream(fpath, FileMode.Create, System.IO.FileAccess.Write))
            //{
            //    byte[] bytes = new byte[ms.Length];
            //    ms.Read(bytes, 0, (int)ms.Length);
            //    file.Write(bytes, 0, bytes.Length);
            //    ms.Close();
            //}
            //return "";
            // var  f=  File(imageDataByteArray, "image/png");
            //  File.WriteAllBytes(fpath, d2, Encoding.Unicode);
            //  return "";
            var writeStream = new FileStream(fpath, FileMode.Create);
            BinaryWriter bw = new BinaryWriter(writeStream , Encoding.ASCII);
            bw.Write(d2 );
            return "";
          
            Console.WriteLine("3");
           // Console.WriteLine("get mqtt file data : " + b.Count());
          
           // await File.WriteAllTextAsync(fpath, "hello");
            //  File.WriteAllBytes(fpath, b);
            //byte[] dataB64 = Convert.FromBase64String(data);
            //string decodedString = System.Text.Encoding.UTF8.GetString(dataB64);
            //dynamic d = new System.Dynamic.ExpandoObject();
            //d.type = "MathEditor";
            //d.user = m.user.name;
            //d.m = data;
            //d.img = getImage(decodedString);
            // await meet.userManager.sendToAllAsync(m.messStr);
            // await mqtt.send(meet.id, m.messStr);
            return "";
        }
        public static string Base64Decode(string base64EncodedData)
        {
            var base64EncodedBytes = System.Convert.FromBase64String(base64EncodedData);
            return System.Text.Encoding.UTF8.GetString(base64EncodedBytes);
        }
        public static byte[] ObjectToByteArray(Object obj)
        {
            BinaryFormatter bf = new BinaryFormatter();
            using (var ms = new MemoryStream())
            {
#pragma warning disable SYSLIB0011 // Type or member is obsolete
                bf.Serialize(ms, obj);
#pragma warning restore SYSLIB0011 // Type or member is obsolete
                return ms.ToArray();
            }
        }
        public static byte[] kkkk(Object obj)
        {
            return Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(obj));
        }
        public static byte[] ddd(object your_object)
        {
            var size = Marshal.SizeOf(your_object);
            // Both managed and unmanaged buffers required.
            var bytes = new byte[size];
            var ptr = Marshal.AllocHGlobal(size);
            // Copy object byte-to-byte to unmanaged memory.
            Marshal.StructureToPtr(your_object, ptr, false);
            // Copy data from unmanaged memory to managed buffer.
            Marshal.Copy(ptr, bytes, 0, size);
            // Release unmanaged memory.
            Marshal.FreeHGlobal(ptr);

            return bytes;
        }
    }
   
}
