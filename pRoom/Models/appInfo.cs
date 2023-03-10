using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Data.SQLite;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using pRoom.Models;

namespace pRoom
{
    public static class appInfo
    {
        public static string serverID = "123";
        public static string ConnectionString = "";

        public static string secret = "";
        public static string host = "";
        public static int isHost = 1;
        public static string exitUrl = "";
        public static string dbType = "sqlserver";
        public static string env = "proom";
        public static string path;
        public static string mediaServer = "t5.salampnu.com";
        public static string mediaServerPass = "aaaaa";
        public static string domainName;
        public static int record = 0;
        public static int live = 0;
        public static int mathEditor = 0;
        public static int develop = 0;
        public static int office = 0;

        public static string lang = "en";
        public static int demoMeetID = 2;
        public static string officeServer = "";
        public static string officeServerWopi = "";
        public static string mqttServer = "";
        public static string mqttServer2 = "";
        public static string pdfConverter = "";
        public static string poppler = "";
        public static string mupdf = "";
        public static string livekitcli = "";
        public static string recordServer = "";
        public static int random = (new Random()).Next(0, 10000);
        public static string randomStr = "?v=17";// (new Random()).Next(0, 10000);
        public static Process ppp = null;
        public static StreamWriter myStreamWriter = null;
        public static string Prefix = "psd";
        public static ChatHub hub;
        public static IHubContext<ChatHub> _hubContext = null;
        public static dddd dddd;


        public static IDbConnection GetDbconnection()
        {

            IDbConnection db;
            // Console.WriteLine(appInfo.ConnectionString);
            string _connectionString = "Server=127.0.0.1;Database=db2;User=root;Password=;";// "Server=127.0.0.1;Database=d;Uid=root;Pwd=pppp;";
            IDbConnection connection = new MySql.Data.MySqlClient.MySqlConnection(appInfo.ConnectionString);
            //return connection;
            if (dbType == "sqlserver") db = new SqlConnection(ConnectionString);
            else db = new SQLiteConnection(ConnectionString);
            //  db = new SqlConnection(_connectionString);
            //using (var connection = new SqlConnection("Server=myServerAddress;Database=myDataBase;User Id=myUsername;Password=myPassword;"))
            //{
            //    connection.Query<MyTable>("SELECT * FROM MyTable");
            //}
            return db;
        }
        // public static string ConnectionString = "Data Source=DESKTOP-68K4RUU;Initial Catalog=msg;Persist Security Info=True;User ID=sa;Password=passA1!";
    }
    public class appInfo1
    {

        public string ConnectionString = "";

        public string secret = "";
        public int isHost = 0;
        public string exitUrl;

    }
}
