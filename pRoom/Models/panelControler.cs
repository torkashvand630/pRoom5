using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pRoom.Models
{
    
    public static class panelControler
    {
        public static async Task<string> parse(message m, meeting meet)
        {
            //Console.WriteLine(m.messStr);
            var action = m.d.action;
            switch (action)
            {
                case "board":
                    await showBoard(m, meet);
                    break;
                case "offic":
                    await offic(m, meet);
                    break;
                case "Diagram":
                    await diagram(m, meet);
                    break;
                case "MathEditor":
                    await MathEditor(m, meet);
                    break;
                case "Develop":
                    await Develop(m, meet);
                    break;
                case "vPlayer":
                    await vPlayer(m, meet);
                    break;
                case "Conference":
                    await Conference(m, meet);
                    break;
            }
            return "";
        }
        public static async Task<string> Conference(message m, meeting meet)
        {
            meet.activePanel = "Conference";           
            meet.vPlayerModel.isActive = 0;
            await mqtt.send(meet.id, m.messStr);
            return "";
        }
        public static async Task<string> offic(message m, meeting meet)
        {
            meet.activePanel = "offic";
            meet.nextPanel =  "offic";
            meet.vPlayerModel.isActive = 0;
            // await meet.userManager.sendToAllAsync(m.messStr);
            await mqtt.send(meet.id, m.messStr);
            return "";
        }
        public static async  Task<string> showBoard(message m, meeting meet)
        {
            meet.activePanel = "board";
            meet.nextPanel = "board";
            meet.vPlayerModel.isActive = 0;
            //await meet.userManager.sendToAllAsync(m.messStr);
            await mqtt.send(meet.id, m.messStr);
            return "";
        }
        public static async Task<string> diagram(message m, meeting meet)
        {
            meet.activePanel = "Diagram";
            meet.nextPanel = "Diagram";
            meet.vPlayerModel.isActive = 0;
            //await meet.userManager.sendToAllAsync(m.messStr);
            await mqtt.send(meet.id, m.messStr);
            return "";
        }
        public static async Task<string> Develop(message m, meeting meet)
        {
            meet.activePanel = "Develop";
            meet.nextPanel = "Develop";
            meet.vPlayerModel.isActive = 0;
            //await meet.userManager.sendToAllAsync(m.messStr);
            await mqtt.send(meet.id, m.messStr);
            return "";
        }
        public static async Task<string> MathEditor(message m, meeting meet)
        {
            meet.activePanel = "MathEditor";
            meet.nextPanel = "MathEditor";
            meet.vPlayerModel.isActive = 0;
            // await meet.userManager.sendToAllAsync(m.messStr);
            await mqtt.send(meet.id, m.messStr);
            return "";
        }
        public static async Task<string> vPlayer(message m, meeting meet)
        {
            meet.activePanel = "vPlayer";
            meet.nextPanel = "vPlayer";
            meet.vPlayerModel.isActive = 1;
            // await meet.userManager.sendToAllAsync(m.messStr);
            await mqtt.send(meet.id, m.messStr);
            return "";
        }
    }
}
