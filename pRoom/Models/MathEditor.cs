//using CSharpMath.SkiaSharp;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace pRoom.Models
{
    public static class MathEditor
    {
        public static async Task<string> parse(message m, meeting meet)
        {
            var data = m.d.m;
            if (data.m == meet.MathEditorData.LastMessage.m) return "";
            meet.MathEditorData.LastMessage =data;
            //byte[] dataB64 = Convert.FromBase64String(data);
            //string decodedString = System.Text.Encoding.UTF8.GetString(dataB64);
            //dynamic d = new System.Dynamic.ExpandoObject();
            //d.type = "MathEditor";
            //d.user = m.user.name;
            //d.m = data;
            //d.img = getImage(decodedString);
            // await meet.userManager.sendToAllAsync(m.messStr);
            await mqtt.send(meet.id, m.messStr);
            return "";
        }

        public static string getImage(string str)
        {
            // var painter = new MathPainter { LaTeX = @"\\\sum{\vec{F} } = \vec{0} \Rightarrow \frac{d\vec{v}}{dt} = 0 \\\sum{\vec{F} } = \vec{0} \Rightarrow \frac{d\vec{v}}{dt} = 0" }; // or TextPainter
            //var painter = new MathPainter { LaTeX = str }; // or TextPainter
            //using var png = painter.DrawAsStream();

            //var en = ConvertToBase64(png);
            //return en;
            return "";
        }

        public static string ConvertToBase64(Stream stream)
        {
            byte[] bytes;
            using (var memoryStream = new MemoryStream())
            {
                stream.CopyTo(memoryStream);
                bytes = memoryStream.ToArray();
            }

            string base64 = Convert.ToBase64String(bytes);
            return base64;
             
        }
    }
    public class MathEditorData
    {
        public string img = "";// "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";
        public dynamic LastMessage = new System.Dynamic.ExpandoObject();// "c2FtcGxlClxcXHN1bXtcdmVje0Z9IH0gPSBcdmVjezB9IFxSaWdodGFycm93IFxmcmFje2RcdmVje3Z9fXtkdH0gPSAwIApcXEUgPSBtY14yIApcXApcXApcXApcXGRTID0gXGZyYWN7XGRlbHRhIFF9e1R9IApcXA==";
        public MathEditorData()
        {
            this.LastMessage.m = "";// "c2FtcGxlClxcXHN1bXtcdmVje0Z9IH0gPSBcdmVjezB9IFxSaWdodGFycm93IFxmcmFje2RcdmVje3Z9fXtkdH0gPSAwIApcXEUgPSBtY14yIApcXApcXApcXApcXGRTID0gXGZyYWN7XGRlbHRhIFF9e1R9IApcXA==";
            this.LastMessage.mode = "0";
        }
    }
  
}
