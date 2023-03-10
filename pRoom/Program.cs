using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using pRoom;
using pRoom.Models;
using pRoom.Models.eventModel;
using System.Configuration;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.AddCors(o => o.AddPolicy("MyPolicy", builder =>
{
    builder.AllowAnyOrigin()
           .AllowAnyMethod()
           .AllowAnyHeader();

}));
builder.Services.AddAntiforgery(o => o.HeaderName = "XSRF-TOKEN");
builder.Services.AddScoped<IuserManagerEvent, userManagerEvent>();
builder.Services.TryAddSingleton<IHttpContextAccessor, Microsoft.AspNetCore.Http.HttpContextAccessor>();
builder.Services.AddSignalR(o =>
{
    o.EnableDetailedErrors = true;
    o.MaximumReceiveMessageSize = 1000240; // bytes
});
//builder.Services.AddSingleton<ChatHub>();
var app = builder.Build();
app.UseHttpsRedirection();
Startup st = new Startup();
app.MapHub<ChatHub>("/chatHub");
 
appInfo.hub = new ChatHub();
//var hubContext = builder.Services.GetService(typeof(IHubContext<ChatHub>));
app.Use(async (context, next) =>
{
    if (APPST.readyStatus == 0)
    {
        Console.WriteLine("app not ready............................");
        await next.Invoke();
    }
    else
    {
        if (appInfo._hubContext == null)
        {
            var hubContext = context.RequestServices.GetRequiredService<IHubContext<ChatHub>>();
            appInfo._hubContext = hubContext;
            Console.WriteLine("set hubcontext");
        }

        //appInfo.dddd = new dddd(hubContext);
        // Console.WriteLine(context.Request.PathBase);

        var p = context.Request.Path.ToString();
        if (p.StartsWith("/fa/") || p == "/fa")
        {
            context.Request.Path = p.Replace("/fa", "");
            context.Request.Headers.Add("lang", "fa");

        }
        if (p.StartsWith("/en/") || p == "/en")
        {
            context.Request.Path = p.Replace("/en", "");
            context.Request.Headers.Add("lang", "en");

        }

        await next.Invoke();
    }
   
    //Do logging or other work that does not write to the Response.
});

st.mappedConfigure(app, app.Environment);
//app.Map("/fa", st.MyMiddleware);

//app.Use(async (context, next) =>
//{
//     Console.WriteLine("Hello World From 1st Middleware!");

//    await next();
//});


//app.Run(async context => await context.Response.WriteAsync("Hello World!"));
//app.Run(st.MyMiddleware);
Console.WriteLine("app is ready222 .... ");
APPST.readyStatus = 1;
app.Run();



namespace pRoom
{
    public class Startup
    {
        public async Task MyMiddleware(IApplicationBuilder app)
        {
             
            app.Run(async context =>
            {
                
                //context.Request.PathBase = "";
                //Console.WriteLine(context.Request.PathBase);
                //Console.WriteLine(context.Request.Path);
                //await context.Response.WriteAsync(context.Request.PathBase);
            });
        }
        public void mappedConfigure(IApplicationBuilder app, IWebHostEnvironment env)
        {


            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
                APPST.isHost = 1;
            }
           // app.UseHsts();
            var provider = new FileExtensionContentTypeProvider();
            var extList = new List<string> { "DOCX", "DOC", "DOT", "ODT", "FODT", "RTF", "TXT" , "PPTX", "PPT", "PPS",
                                             "POT", "ODP", "FODP" ,  "XLSX", "ODS", "FODS" };
            foreach (var r in extList)
            {
                provider.Mappings["." + r] = "application/x-msdownload";
                provider.Mappings["." + r.ToLower()] = "application/x-msdownload";
            }
            app.UseStaticFiles(new StaticFileOptions
            {
                ContentTypeProvider = provider
            });


            // app.UseCors("MyPolicy2");
            //app.UseHttpsRedirection();
            //  app.UseStaticFiles();
            appInfo.path = env.ContentRootPath;
            //app.UseHttpsRedirection();
            app.UseRouting();
            app.UseCors("MyPolicy");
            app.UseAuthorization();
            loadAppInfo();
            // pRoom.Models.drupal.nodeRepos.getNode(15);
            meetManagerService.load();
            simpleTimer.start();
            //  saveMeetTimer.start();
            app.UseWebSockets();
             
           // Task.Run(() => { mqtt.connect().Wait(); });
            // mqtt.start();
            // app.UseMiddleware<ChatWebSocketMiddleware>();

            meetService.loadingDic = new System.Collections.Concurrent.ConcurrentDictionary<int, int>();
            //  app.UsePathBase(new PathString("/ddd/"));
            // app.UsePathBase("/ddd");
            //app.Use((context, next) =>
            //{
            //    context.Request.PathBase = "/ddd";
            //    return next();
            //});
            
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });
           
            // app.Run();


            //  app.UseAuthorization();


        }
        public void loadAppInfo()
        {
            loadAppInfoBase();
         //   var env_1 = Configuration.GetValue<string>("env", "envTemp");
          //  appInfo.env = env_1;
         
            if (appInfo.host == "") appInfo.host = appInfo.mediaServer;
           
            string DbFile = appInfo.path + "/wwwroot/files/db1.db";
           
            if (appInfo.dbType != "sqlserver") appInfo.ConnectionString = "Data Source=" + DbFile;

            var p = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "en.json");
            var jsonString1 = File.ReadAllText(p);
            var t = JsonConvert.DeserializeObject<TranslateMD>(jsonString1);
            Translate.langDic.Add("en", t);
            p = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "fa.json");
            jsonString1 = File.ReadAllText(p);
            t = JsonConvert.DeserializeObject<TranslateMD>(jsonString1);
            Translate.langDic.Add("fa", t);
            Translate.t = Translate.langDic[appInfo.lang];


        }
        public void loadAppInfoBase()
        {
            Console.WriteLine(appInfo.path);
            Console.WriteLine(Directory.GetCurrentDirectory());
            var p = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/files", "appConf.json");
            // string p = appInfo.path + "/wwwroot/files/appConf.json";
            var str = File.ReadAllText(p);
            var j = JObject.Parse(str);
            appInfo.officeServer = (string)j["officeServer"];
            appInfo.lang = (string)j["lang"];
            if (appInfo.lang == "language") appInfo.lang = "en";
            appInfo.mediaServer = (string)j["mediaServer"];

            appInfo.pdfConverter = (string)j["pdfConverter"];
            appInfo.ConnectionString = (string)j["ConnectionString"];
            appInfo.demoMeetID = (int)j["demoMeetID"];
            appInfo.isHost = (int)j["isHost"];
            appInfo.exitUrl = (string)j["exitUrl"];
            appInfo.domainName = (string)j["domainName"];

            appInfo.host = (string)j["host"];
            try
            {
                appInfo.record = (int)j["record"];
                appInfo.live = (int)j["live"];
                appInfo.mathEditor = (int)j["mathEditor"];
                appInfo.develop = (int)j["develop"];
                appInfo.office = (int)j["office"];
                Console.WriteLine("record : " + appInfo.record + " matheditor : " + appInfo.mathEditor + " develop : " + appInfo.develop + " office : " + appInfo.office);
                
            }
            catch { }

            appInfo.secret = (string)j["secret"];
            var randomStr = (string)j["randomStr"];
            if (randomStr!=null && randomStr != "") appInfo.randomStr = randomStr;

            var mediaServerEnv = (string)j["mediaServerEnv"];
            if (mediaServerEnv != "mediaServerEnvironment") appInfo.mediaServer = "wss://" + mediaServerEnv ;

            var officeServerEnv = (string)j["officeServerEnv"];
            if (officeServerEnv != "officeServerEnvironment") appInfo.officeServer = "https://" + officeServerEnv;

            appInfo.mqttServer = (string)j["mqttServer"];
            appInfo.mqttServer2 = (string)j["mqttServer2"];
            var mqttServerEnv = (string)j["mqttServerEnv"];
            if (mqttServerEnv != "mqttServerEnvironment") appInfo.mqttServer = "wss://" + mqttServerEnv;

            var recordServer = (string)j["recordServer"];
            if (recordServer != null) appInfo.recordServer = recordServer;
            appInfo.serverID = (string)j["serverID"];
            if (appInfo.serverID == null || appInfo.serverID == "") appInfo.serverID = (new Random()).Next(0, 10000).ToString();

            var poppler = (string)j["poppler"];
            if (poppler != null) appInfo.poppler = poppler;

            string mupdf = (string)(j["mupdf"]);
            if (mupdf != null) appInfo.mupdf = mupdf;

            var livekitcli = (string)j["livekitcli"];
            if (livekitcli != null) appInfo.livekitcli = livekitcli;

            Console.WriteLine("offic server is : " + appInfo.officeServer);
            Console.WriteLine("webrtc server is : " + appInfo.mediaServer);
            Console.WriteLine("mqqt server is : " + appInfo.mqttServer);
            Console.WriteLine("mqqt server2 is : " + appInfo.mqttServer2);
            Console.WriteLine("server id is : " + appInfo.serverID);
            Console.WriteLine("server record : " + appInfo.record);
            Console.WriteLine("server live : " + appInfo.live);
            Console.WriteLine("ConnectionString : " + appInfo.ConnectionString);
            Console.WriteLine("poppler : " + appInfo.poppler);
            Console.WriteLine("mupdf : " + appInfo.mupdf);

            //appInfo1 a = JsonConvert.DeserializeObject<appInfo1>(str);
            //appInfo.ConnectionString = a.ConnectionString;
            //appInfo.secret = a.secret;
            //appInfo.isHost = a.isHost;
            //appInfo.exitUrl = a.exitUrl;
            //Console.WriteLine("appInfo domain" + appInfo.secret);
        }

    }
}