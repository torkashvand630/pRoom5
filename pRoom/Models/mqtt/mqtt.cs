using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using MQTTnet;
using MQTTnet.Client;
using MQTTnet.Client.Disconnecting;
using MQTTnet.Client.Options;
//using MQTTnet.Client.Options;
using Newtonsoft.Json;
using pRoom.Models;

namespace pRoom
{
    public static class mqtt
    {
        public static IMqttClient client;
        public static bool isConnect = false;
        public static IMqttClientOptions options;

        public static void start()
        {
            
            var options = new MqttClientOptionsBuilder()
                 .WithWebSocketServer("localhost:8083/mqtt").WithClientId("server_"+Guid.NewGuid())
                 .Build();
            
            var factory = new MqttFactory();
            client = factory.CreateMqttClient();
            
            client.ConnectAsync(options, CancellationToken.None);
            
            //client.UseApplicationMessageReceivedHandler(async e =>
            //{                
            //    var m = Encoding.UTF8.GetString(e.ApplicationMessage.Payload);
            //    await onMessage(e.ApplicationMessage.Topic, m);                
            //});
            if (client.IsConnected)
            {
                Console.WriteLine("mqtt connect");
                isConnect = true;
                SubscribeMeets();
            }
            else
            {
                Console.WriteLine("mqtt connect erroooor");
            }
           

          
           // Subscribe("t1445");
           // send2("t1445", "dddddddddddd");
           // Task.Run(() => Subscribe("t50"));
           // Task.Run(() => send2("t50", "hhhhhhhhhh"));
           
           
        }

        public static async Task connect()
        {
            Console.WriteLine("try connect  to mqtt server ....");
            try
            {


                 options = new MqttClientOptionsBuilder()
                      .WithWebSocketServer(appInfo.mqttServer2+"/mqtt").WithClientId("server_"+Guid.NewGuid())
                      .Build();
                var factory = new MqttFactory();
                client = factory.CreateMqttClient();
                await client.ConnectAsync(options, CancellationToken.None);

                client.UseApplicationMessageReceivedHandler(async e =>
                {

                    var m = Encoding.UTF8.GetString(e.ApplicationMessage.Payload);
                    await onMessage(e.ApplicationMessage.Topic, m);


                });

               // client.DisconnectedHandler = new MqttClientDisconnectedHandlerDelegate(OnDisconnected);
                
                if (client.IsConnected)
                {
                    Console.WriteLine("mqtt server connect complate");
                    isConnect = true;
                     SubscribeMeets();
                }
                else
                {
                    Console.WriteLine("mqtt connect erroooor");
                }
            }
            catch
            {
                Console.WriteLine("mqtt connect erroooor");
            }
            // Task.Run(() => send("t1", "hhhhhhhhhh"));
            //  Task.Run(() => SubscribeAsync("t1444"));
            // Console.WriteLine("mqtt connect22");




            return;
        }

        
        private static async Task OnDisconnected(MqttClientDisconnectedEventArgs e)
        {
            Console.WriteLine("mqtt disconnect");
            isConnect = false;
            await Task.Delay(TimeSpan.FromSeconds(5));
            await client.ReconnectAsync();
            if (client.IsConnected)
            {
                Console.WriteLine("mqtt server connect complate ..");
                isConnect = true;
                SubscribeMeets();
            }
            // await client.ConnectAsync(options, CancellationToken.None);
        }
        private static async Task OnConnect(MqttClientDisconnectedEventArgs e)
        {
            Console.WriteLine("mqtt connrct ..... ...................................");
             
        }
        public static async Task  SubscribeAsync(string topic)
        {
            if (!isConnect) return  ;
            client.UseConnectedHandler(async e =>
            {
                await client.SubscribeAsync(new MqttTopicFilterBuilder().WithTopic(topic).Build());
            });
            return  ;
        }
        public static bool Subscribe(string topic)
        {
            if (isConnect && client.IsConnected)
            {
                // Console.WriteLine("conected");
                try
                {
                    client.SubscribeAsync(new MqttTopicFilterBuilder().WithTopic(topic).WithExactlyOnceQoS().Build());
                    return true;
                }
                catch
                {
                    return false;
                }
            }
            return false;
           // else Console.WriteLine("not conected");
            //if (!isConnect) return;
            //client.UseConnectedHandler( e =>
            //{
            //      client.SubscribeAsync(new MqttTopicFilterBuilder().WithTopic(topic).Build());
            //});
            //return;
        }
        public static void send2(string topic, string m)
        {
          //  if (!isConnect) return;
            client.UseConnectedHandler(  e =>
            {
                var message = new MqttApplicationMessageBuilder().WithTopic(topic)
             .WithPayload(m)
             .WithExactlyOnceQoS()
             .Build();
                 client.PublishAsync(message, CancellationToken.None); // Since 3.0.5 with CancellationToken
            });
          

        }
        public static async Task  send(string topic, string m)
        {
            Console.WriteLine("mmmmmmmmmmmmmmmmmmmmmmmmmmmmm");
            return;
            if (!client.IsConnected)
            {
                Console.WriteLine("mqtt client disconect : for send message");
                return;
            }
            try
            {


                var message = new MqttApplicationMessageBuilder().WithTopic(topic)
                  .WithPayload(m) 
                  .WithExactlyOnceQoS()
                  .Build();
                await client.PublishAsync(message, CancellationToken.None); // Since 3.0.5 with CancellationToken
            }
            catch
            {

            }
        }
        public static async Task send(int meetid, string s)
        {
            
            //Console.WriteLine(s);
           // await send("meet_send_" + appInfo.serverID + "_" + meetid, s);
            //await appInfo.hub.send(meetid, s);
            await mHub.send(meetid, s);// appInfo._hubContext.Clients.Group(meetid.ToString()).SendAsync("ReceiveMessage", s);

        }
        public static async Task send(int meetid, dynamic d)
        {
            try
            {
                var jsonString = Newtonsoft.Json.JsonConvert.SerializeObject(d);
               // await send("meet_send_" + appInfo.serverID + "_" + meetid, jsonString);
                await send( meetid, jsonString);
            }
            catch
            {

            }
           

        }
        public static async Task  onMessage(string topic, string s)
        {
            var exObj = JsonConvert.DeserializeObject<ExpandoObject>(s) as dynamic;
            await messageParser.parseSimple(exObj, s, null);
          //  Console.WriteLine(topic +" : "+s);
        }

        public static void SubscribeMeets()
        {
            var topic = "allmeet_" + appInfo.serverID;
            Subscribe(topic);
            return;
            //var meets = meetService.getAllReady();
            //foreach(var r in meets)
            //{
            //  r.isSubscribeMqtt=  Subscribe("meet_get_"+appInfo.serverID+"_" + r.id);
            //   // await mqtt.SubscribeAsync("meet_get_" + r.id);
            //}
        }
    }
}
