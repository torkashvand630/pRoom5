using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using System.Collections.Concurrent;
using System.IO;
using System.Net.WebSockets;
using System.Text;

using System.Net.Http.Headers;

using Microsoft.AspNetCore.Hosting;
using System.Threading;
using System.Diagnostics;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
//using Aspose.Pdf;
//using Aspose.Pdf.Devices;
using pRoom.Models;
//using Aspose.Pdf.Devices;
using System.Runtime.InteropServices;

namespace pRoom.Controllers
{
    public class fileUpController : Controller
    {
        // GET: fileUp


        private Microsoft.Extensions.Hosting.IHostingEnvironment _env;
        public fileUpController(Microsoft.Extensions.Hosting.IHostingEnvironment env)
        {

            _env = env;
        }

        [HttpPost]
        public async Task<string> uploadImg(IList<IFormFile> files)
        {
            var from = Request.Form["from"][0];

            var fileID = int.Parse(Request.Form["fileID"][0].Trim());
            var pageID = int.Parse(Request.Form["pageID"][0].Trim());

            var meetID = int.Parse(Request.Form["meetID"][0].Trim());

            var meet = meetService.GetMeeting(meetID);

            string envWWWPATH = _env.ContentRootPath + "\\wwwroot\\";

            string jsonString = "";
            foreach (IFormFile source in files)
            {




                FileMD filemd = meet.filesModel.fileList[fileID];// (++meet.pdfCount).ToString();
                var imgId = filemd.imgCount++;

                string imgPath = envWWWPATH + @"files\board\" + meetID + @"\img\" + fileID + "\\";
                var exit = System.IO.Directory.Exists(imgPath);
                if (!exit) System.IO.Directory.CreateDirectory(imgPath);
                var imgFilePath = imgPath + imgId + ".jpg";// GetPathAndFilename(filename);
                using (FileStream output = System.IO.File.Create(imgFilePath))
                    await source.CopyToAsync(output);

                var pp2 = imgFilePath;

                dynamic MyDynamic = new System.Dynamic.ExpandoObject();

                MyDynamic.userName = from;

                MyDynamic.meetID = meetID.ToString();
                jsonString = Newtonsoft.Json.JsonConvert.SerializeObject(MyDynamic);
                try
                {
                    return MyDynamic;
                }
                catch
                {
                    return jsonString;
                }
                finally
                {
                    //meetInfo: {userName: "1", meetID: "2"}
                    // { "type": "board", "board": "draw", "d": { "t": "pageSelect", "drawId": 1, "at": "", "num": pageID, "fileID": fileID, "del": 0, "type": "board", "board": "draw" } }
                    dynamic d = new System.Dynamic.ExpandoObject();
                    d.type = "board";
                    d.board = "draw";
                    d.meetInfo = MyDynamic;
                    dynamic d2 = new System.Dynamic.ExpandoObject();
                    d2.t = "setImage";
                    d2.action = "set";
                    d2.fileID = fileID;

                    d2.imgId = imgId;
                    d2.num = pageID;

                    d2.type = "board";
                    d2.board = "draw";
                    d2.width = 100;
                    d2.height = 200;
                    d2.type = "board";
                    d2.board = "draw";
                    d.d = d2;
                    jsonString = Newtonsoft.Json.JsonConvert.SerializeObject(d);
                    message m = new message(d, jsonString);
                    await Models.Board.parse(m, meet);
                    //  await meet.userManager.sendToAllAsync(d);

                }



            }
            return jsonString;

        }


        [HttpPost]
        [RequestSizeLimit(40000000)]
        public async Task<string> uploadFile(IList<IFormFile> files)
        {
            var from = Request.Form["from"][0];

            var meetID = int.Parse(Request.Form["meetID"][0].Trim());
            Console.WriteLine("file upload : " + meetID);
            //  string meetID = "4";
            var meet = meetService.GetMeeting(meetID);
            if (meet == null) return "";//|| meet.meetManagPrpperty.finishStatus != "no"
            string envWWWPATH = appInfo.path + "/wwwroot/";
            var pdfPath = envWWWPATH + "files/board/" + meetID + "/pdf/";
            var exit = System.IO.Directory.Exists(pdfPath);
            if (!exit) System.IO.Directory.CreateDirectory(pdfPath);
            string jsonString = "";
            foreach (IFormFile source in files)
            {




                string filename = ContentDispositionHeaderValue.Parse(source.ContentDisposition).FileName.Trim('"');
                //Console.WriteLine("filename : " + filename);
                var extension = Path.GetExtension(filename).ToLower();
                //Console.WriteLine("ext : " + extension);
                filename = this.EnsureCorrectFilename(filename);
                var tmpFile = meet.filesModel.add(filename, meetID);
                // (++meet.pdfCount).ToString();
                // string fileID = meet.filesModel.fileList.Count().ToString();// filemd.inRoomID.ToString();
                string outPicFile = envWWWPATH + "files/board/" + meetID + "/pic/" + tmpFile.inRoomID + "/";
                var pdfFilePath = pdfPath + tmpFile.inRoomID + extension;// GetPathAndFilename(filename);
                dynamic MyDynamic = new System.Dynamic.ExpandoObject();
                try
                {
                    if (System.IO.File.Exists(pdfFilePath))
                    {
                        System.IO.File.Delete(pdfFilePath);
                    }
                }
                catch
                {
                    return MyDynamic;
                }

                try
                {
                    using (FileStream output = System.IO.File.Create(pdfFilePath))
                        await source.CopyToAsync(output);
                }
                catch
                {
                    return MyDynamic;
                }

                if (meet == null) return "";//|| meet.meetManagPrpperty.finishStatus != "no"
                var pp2 = "files/board/b2/" + filename;



                MyDynamic.data = pp2;
                MyDynamic.pdfPageCount = 1;
                MyDynamic.meetID = meetID.ToString();
                jsonString = Newtonsoft.Json.JsonConvert.SerializeObject(MyDynamic);
                try
                {
                    return MyDynamic;
                }
                catch
                {
                    return jsonString;
                }
                finally
                {
                    // var t =  convertByPoppler(envWWWPATH,meetID,fileID,extension);
                    string t = "";
                    if (appInfo.pdfConverter == "aspose")
                        t = convertByAspose(envWWWPATH, meetID, tmpFile.inRoomID.ToString(), extension);
                    else
                        t = await convertByPoppler(envWWWPATH, meetID, tmpFile.inRoomID.ToString(), extension);

                    if (meet == null) t = "no";//|| meet.meetManagPrpperty.finishStatus != "no"
                    dynamic d = new System.Dynamic.ExpandoObject();
                    d.type = "file";
                    d.action = "file";
                    d.res = t;
                    if (t == "ok")
                    {

                        int pCount = getPdfPageCount(outPicFile);
                        if (pCount >= 1)
                        {
                            d.pdfPageCount = pCount;
                            System.Drawing.Image img = System.Drawing.Image.FromFile(outPicFile + "1.jpg");
                            //if (extension != ".pdf")
                            //{
                            //    img = resizeImage(img, outPicFile);
                            //}



                            d.meetInfo = MyDynamic;// meetID;
                            d.fileID = tmpFile.inRoomID;
                            //   d.href = pp2;
                            d.fileName = filename;

                            d.pdfOrder = tmpFile.inRoomID;

                            d.width = img.Width;
                            d.height = img.Height;
                            d.ext = extension;


                            //jsonString = Newtonsoft.Json.JsonConvert.SerializeObject(filemd);
                            //await userList.sendToAllAsync(jsonString,meetID);
                            //await meet.userManager.sendToAllAsync(d);
                            await mqtt.send(meet.id, d);
                            // await meet.filesModel.sendToUser(meet);
                            // FileMD filemd = meet.filesModel.add(filename);
                            tmpFile.d = d;
                            tmpFile.width = img.Width;
                            tmpFile.height = img.Height;
                            tmpFile.pageCount = d.pdfPageCount;
                            // tmpFile.dbStatus = 0;
                            tmpFile.ext = extension;
                            tmpFile.meetID = meetID;
                            meet.board.addFileToDic(tmpFile);
                            fileRepository fr = new fileRepository();
                            fr.update(tmpFile);
                        }
                    }
                    else
                    {
                        Console.WriteLine("errrrrrrrroor in convert file ....");
                        await mqtt.send(meet.id, d);
                    }

                }



            }
            return jsonString;

        }
        public string convertByAspose(string envWWWPATH, int meetID, string fileID, string ext)
        {
            return "no";
            //try
            //{


            //    var WorkPath = envWWWPATH + "files/board/";

            //    string outFile = WorkPath + meetID + "/pic/" + fileID + "/";
            //    string pdfFile = WorkPath + meetID + "/pdf/" + fileID + ".pdf";

            //    var exit = System.IO.Directory.Exists(outFile);
            //    if (!exit) System.IO.Directory.CreateDirectory(outFile);
            //    if (ext != ".pdf")
            //    {
            //        System.IO.File.Copy(WorkPath + meetID + "/pdf/" + fileID + ext, outFile + "1.jpg");
            //        return "ok";
            //    }


            //    string LData = "PExpY2Vuc2U+CjxEYXRhPgo8TGljZW5zZWRUbz5BdmVQb2ludDwvTGljZW5zZWRUbz4KPEVtYWlsVG8+aXRfYmlsbGluZ0BhdmVwb2ludC5jb208L0VtYWlsVG8+CjxMaWNlbnNlVHlwZT5EZXZlbG9wZXIgT0VNPC9MaWNlbnNlVHlwZT4KPExpY2Vuc2VOb3RlPkxpbWl0ZWQgdG8gMSBkZXZlbG9wZXIsIHVubGltaXRlZCBwaHlzaWNhbCBsb2NhdGlvbnM8L0xpY2Vuc2VOb3RlPgo8T3JkZXJJRD4xOTA1MjAwNzE1NDY8L09yZGVySUQ+CjxVc2VySUQ+MTU0ODI2PC9Vc2VySUQ+CjxPRU0+VGhpcyBpcyBhIHJlZGlzdHJpYnV0YWJsZSBsaWNlbnNlPC9PRU0+CjxQcm9kdWN0cz4KPFByb2R1Y3Q+QXNwb3NlLlRvdGFsIGZvciAuTkVUPC9Qcm9kdWN0Pgo8L1Byb2R1Y3RzPgo8RWRpdGlvblR5cGU+RW50ZXJwcmlzZTwvRWRpdGlvblR5cGU+CjxTZXJpYWxOdW1iZXI+Y2JmMzVkNWYtOWE2Ni00ZTI4LTg1ZGQtM2ExN2JiZTM0MTNhPC9TZXJpYWxOdW1iZXI+CjxTdWJzY3JpcHRpb25FeHBpcnk+MjAyMDA2MDQ8L1N1YnNjcmlwdGlvbkV4cGlyeT4KPExpY2Vuc2VWZXJzaW9uPjMuMDwvTGljZW5zZVZlcnNpb24+CjxMaWNlbnNlSW5zdHJ1Y3Rpb25zPmh0dHBzOi8vcHVyY2hhc2UuYXNwb3NlLmNvbS9wb2xpY2llcy91c2UtbGljZW5zZTwvTGljZW5zZUluc3RydWN0aW9ucz4KPC9EYXRhPgo8U2lnbmF0dXJlPnpqZDMrdWgzNTdiZHhqR3JWTTZCN3I2c250TkRBTlRXU2MyQi9RWS9hdmZxTnA0VHk5Z0kxR2V1NUdOaWVwRHArY1JrRFBMdjBDRTZ2MHNjYVZwK1JNTkF5SzdiUzdzeGZSL205Z0NtekFNUlptdUxQTm1laEtZVTNvOGJWVDJvWmRJeEY2dVRTMDhIclJxUnk5SWt6c3BxYmRrcEZFY0lGcHlLbDF2NlF2UT08L1NpZ25hdHVyZT4KPC9MaWNlbnNlPg==";
            //    Stream stream = new MemoryStream(Convert.FromBase64String(LData));
            //    stream.Seek(0, SeekOrigin.Begin);
            //    new Aspose.Pdf.License().SetLicense(stream);


            //    Document pdfDocument = new Document(pdfFile);

            //    for (int pageCount = 1; pageCount <= pdfDocument.Pages.Count; pageCount++)
            //    {
            //        using (FileStream imageStream = new FileStream(outFile + pageCount + ".jpg", FileMode.Create))
            //        {
            //            Resolution resolution = new Resolution(120);
            //            // JpegDevice jpegDevice = new JpegDevice(500, 700, resolution, 100);
            //            JpegDevice jpegDevice = new JpegDevice(resolution, 40);
            //            jpegDevice.Process(pdfDocument.Pages[pageCount], imageStream);
            //            imageStream.Close();
            //        }
            //    }


            //    return "ok";
            //}
            //catch { return "no"; }
        }
        //public System.Drawing.Image resizeImage(System.Drawing.Image  img,string outPath)
        //{
        //    int maxSize = 1500;
        //    Console.WriteLine("www : " + img.Width + " j : " + img.Height);
        //    var r = Math.Max(img.Width, img.Height);
        //    int w = img.Width;
        //    int h = img.Height;
        //    if (r > maxSize)
        //    {
        //        var scale = ((double)maxSize / r);
        //        Console.WriteLine("s : " + scale);
        //        w = (int)(img.Width * scale);
        //        h = (int)(img.Height * scale);
        //        Console.WriteLine("w : " + w);
        //        Console.WriteLine("h : " + h);
        //    }

        //    //var w = Math.Round((float)(img.Width) * (float)(scale));
        //    //var h = Math.Round((float)(img.Height) * (float)(scale));
        //    Bitmap new_image = new Bitmap((int)(w), (int)(h));
        //    Graphics g = Graphics.FromImage((System.Drawing.Image)new_image);
        //    //g.InterpolationMode = InterpolationMode.Low;
        //    //g.InterpolationMode = InterpolationMode.Low;
        //    //g.SmoothingMode = SmoothingMode.HighSpeed;
        //    //g.PixelOffsetMode = PixelOffsetMode.HighSpeed;
        //    //g.CompositingQuality = CompositingQuality.Default;
        //    g.DrawImage(img, 0, 0, (int)(w), (int)(h));
        //    img.Dispose();

        //    var encoder = ImageCodecInfo.GetImageEncoders()
        //                    .First(c => c.FormatID == ImageFormat.Jpeg.Guid);
        //    var encParams = new EncoderParameters(1);
        //    encParams.Param[0] = new EncoderParameter(System.Drawing.Imaging.Encoder.Quality, 70L);
        //    new_image.Save(outPath+"1.jpg", encoder, encParams);
        //    return new_image;



        //}

        public async Task<string> convertByPoppler(string envWWWPATH, int meetID, string fileID, string ext)
        {
            var WorkPath = envWWWPATH + "files/board/";

            string outFile = WorkPath + meetID + "/pic/" + fileID + "/";
            var exit = System.IO.Directory.Exists(outFile);
            if (!exit) System.IO.Directory.CreateDirectory(outFile);
            else
            {
                try
                {
                    var list = Directory.GetFiles(outFile, "*.*");
                    foreach (var f in list)
                    {
                        //if (System.IO.File.Exists(outFile + "1.jpg"))
                        //{
                        //    System.IO.File.Delete(outFile + "1.jpg");
                        //}
                        if (System.IO.File.Exists(f))
                        {
                            System.IO.File.Delete(f);
                        }
                    }

                }
                catch
                {
                    return "no";
                }
            }


            string pdfFile = WorkPath + meetID + "/pdf/" + fileID + ".pdf";


            if (ext != ".pdf")
            {
                try
                {

                    System.IO.File.Copy(WorkPath + meetID + "/pdf/" + fileID + ext, outFile + "1.jpg");
                    return "ok";
                }
                catch
                {
                    return "no";
                }

            }

            //./pdftoppm -jpeg 3.pdf 3.jpg
            string command = "pdftoppm -jpeg " + pdfFile + " " + outFile;
            if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
            {
                command = appInfo.poppler + pdfFile + " " + outFile;
                Console.WriteLine("platform is win");
            }
            Console.WriteLine(command);
            string result = "";
            using (System.Diagnostics.Process proc = new System.Diagnostics.Process())
            {
                try
                {
                    if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
                    {
                        // var processResults = await ProcessEx.RunAsync("git.exe", "pull");

                        proc.StartInfo.WindowStyle = ProcessWindowStyle.Normal;
                        proc.StartInfo.Verb = "runas";
                        proc.StartInfo.FileName = @"C:\Windows\System32\cmd.exe";
                        proc.StartInfo.Arguments = "/c " + command;
                        proc.StartInfo.UseShellExecute = false;
                        proc.StartInfo.RedirectStandardOutput = true;
                        proc.StartInfo.RedirectStandardError = true;
                        proc.StartInfo.CreateNoWindow = false;
                        proc.Start();
                        Console.WriteLine("101");
                        proc.Exited += delegate (object? sender, EventArgs args) {

                        };
                        await Task.Delay(5000);
                        Console.WriteLine("102");
                        if (proc.HasExited) return "ok";

                        await Task.Delay(5000);
                        Console.WriteLine("103");
                        if (proc.HasExited) return "ok";

                        await Task.Delay(5000);
                        Console.WriteLine("104");
                        if (proc.HasExited) return "ok";

                        await Task.Delay(5000);
                        proc.Kill(true);
                        //   result += proc.StandardOutput.ReadToEnd();
                        //  result += proc.StandardError.ReadToEnd();




                        Console.WriteLine("105");
                        //  await proc.WaitForExitAsync();
                        // proc.WaitForExit();
                        return "ok";
                    }
                    else
                    {
                        proc.StartInfo.FileName = "/bin/bash";
                        proc.StartInfo.Arguments = "-c \" " + command + " \"";
                        proc.StartInfo.UseShellExecute = false;
                        proc.StartInfo.RedirectStandardOutput = true;
                        proc.StartInfo.RedirectStandardError = true;
                        proc.Start();

                        result += proc.StandardOutput.ReadToEnd();
                        result += proc.StandardError.ReadToEnd();

                        proc.WaitForExit();
                        return "ok";
                    }


                }
                catch
                {
                    return "no";
                }
            }
            // Console.WriteLine("result is :" + result);
            // return result;
            return "ok";
        }

        public int getPdfPageCount(string p)
        {
            var list = Directory.GetFiles(p, "*.jpg");
            if (appInfo.pdfConverter == "aspose")
                return list.Count();
            foreach (var f in list)
            {
                var t = f;
                t = t.Replace("-00", "");
                t = t.Replace("-0", "");
                t = t.Replace("-", "");
                if (t != f)
                    try
                    {
                        System.IO.File.Move(f, t);
                    }
                    catch { }

            }
            return list.Count();
        }


        public class kkjj
        {
            public IList<IFormFile> files;
            public string hh;
        }
        private string EnsureCorrectFilename(string filename)
        {
            if (filename.Contains("\\"))
                filename = filename.Substring(filename.LastIndexOf("\\") + 1);

            return filename;
        }

        private string GetPathAndFilename(string filename)
        {

            string path = _env.ContentRootPath + "\\wwwroot\\files\\board\\b2\\" + filename;
            Console.WriteLine("path : " + path);
            return path;
            // var p = Environment.GetFolderPath("dd");
            // return this.hostingEnvironment.WebRootPath + "\\uploads\\" + filename;
        }

        [HttpPost]
        [RequestSizeLimit(40000000)]
        public async Task<string> uploadOfficFile(IList<IFormFile> files)
        {
            var from = Request.Form["from"][0];

            var meetID = int.Parse(Request.Form["meetID"][0].Trim());
            Console.WriteLine("file offic upload : " + meetID);
            //  string meetID = "4";
            var meet = meetService.GetMeeting(meetID);
            if (meet == null) return "";//|| meet.meetManagPrpperty.finishStatus != "no"
            string envWWWPATH = appInfo.path + "/wwwroot/";
            var officPath = envWWWPATH + "files/board/" + meetID + "/offic/";
            string jsonString = "";
            foreach (IFormFile source in files)
            {

                var exit = System.IO.Directory.Exists(officPath);
                if (!exit) officControler.createDefultFolder(meet.id);


                string filename = ContentDispositionHeaderValue.Parse(source.ContentDisposition).FileName.Trim('"');
                //Console.WriteLine("filename : " + filename);
                var extension = Path.GetExtension(filename).ToLower();
                //Console.WriteLine("ext : " + extension);
                filename = this.EnsureCorrectFilename(filename);
                filename = filename.Replace(" ", "-").Replace("_", "-");
                var filePath = officPath + filename;
                // (++meet.pdfCount).ToString();
                var isValid = !string.IsNullOrEmpty(filename) &&
                              filename.IndexOfAny(Path.GetInvalidFileNameChars()) < 0 &&
                             !System.IO.File.Exists(Path.Combine(filePath));

                if (!isValid) return "no";



                try
                {
                    using (FileStream output = System.IO.File.Create(filePath))
                        await source.CopyToAsync(output);
                    officFile o = new officFile()
                    {
                        ext = extension,
                        name = filename
                    };
                    meet.offic.filelist.Add(o);
                    dynamic d = new System.Dynamic.ExpandoObject();
                    d.type = "offic";
                    d.action = "uploadFile";
                    d.file = o;
                    //await meet.userManager.sendToAllAsync(d);
                    await mqtt.send(meet.id, d);


                    return "ok";
                }
                catch
                {
                    return "no";
                }
                finally
                {

                }



            }
            return jsonString;

        }

    }
}