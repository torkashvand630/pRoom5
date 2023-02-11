using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace pRoom
{
    public static class APPST
    {
        public static List<meeting> meetList = new List<meeting>();
        public static  ConcurrentDictionary<int, meeting> meetDic = new ConcurrentDictionary<int, meeting>();
      //  public static Dictionary<string, > meetDic = new Dictionary<int, meeting>();
        public static Dictionary<int, userMD> userDic = new Dictionary<int, userMD>();
        private static readonly Random getrandom = new Random();
        public static int readyStatus = 0;
        public static int isHost = 0;
        public static int loadingEnable = 1;
        public static int GetRandomNumber()
        {
            lock (getrandom) // synchronize
            {
                return getrandom.Next(0, int.MaxValue);
            }
        }
        public static T Clone<T>(T source)
        {
            if (!typeof(T).IsSerializable)
            {
                throw new ArgumentException("The type must be serializable.", "source");
            }

            //if (Object.ReferenceEquals(source, null))
            //{
            //    return default(T);
            //}

            System.Runtime.Serialization.IFormatter formatter = new System.Runtime.Serialization.Formatters.Binary.BinaryFormatter();
            Stream stream = new MemoryStream();
            using (stream)
            {
                formatter.Serialize(stream, source);
                stream.Seek(0, SeekOrigin.Begin);
                return (T)formatter.Deserialize(stream);
            }
        }
    }
    public sealed class Singleton
    {
        private static readonly Singleton instance = new Singleton();
        public int id = 0;
        // Explicit static constructor to tell C# compiler
        // not to mark type as beforefieldinit
        static Singleton()
        {
        }

        private Singleton()
        {
        }

        public static Singleton Instance
        {
            get
            {
                return instance;
            }
        }
        public static readonly  Dictionary<int, bool> meetDic = new Dictionary<int, bool>();

        public  bool set(int id)
        {
            meetDic.Add(id, true);

            return true;
        }
        public  bool remove(int id)
        {
           
            // meetDic.TryRemove(id);
            meetDic.Remove(id, out bool result);
            return true;
        }
        public  bool get2(int id)
        {
            Console.WriteLine("... " + meetDic.Count);
            if (meetDic.ContainsKey(id)) return true;
            return false;
           // var b = meetDic.TryGetValue(id, out bool result);
           // Console.WriteLine(DateTime.Now.ToShortTimeString() + " get result for meet : " + id + " value : " + b);
          //  return b;
        }
    }
    public static class loadingMeet
    {
        public static ConcurrentDictionary<int, bool> meetDic = new ConcurrentDictionary<int, bool>();

        public static bool set(int id)
        {
            meetDic.TryAdd(id, true);
             
            return true;
        }
        public static bool remove(int id)
        {
           // meetDic.TryRemove(id);
            meetDic.Remove(id,out bool result);
            return true;
        }
        public static bool get(int id)
        {
             
           var b= meetDic.TryGetValue(id, out bool result);
            Console.WriteLine(DateTime.Now.ToShortTimeString()+ " get result for meet : " + id + " value : " + b);
            return b;
        }
    }
}
