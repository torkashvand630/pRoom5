namespace pRoom.Models.eventModel
{
    public class regesterVM
    {
        public  string name { get; set; }
        public  string pass { get;set; }
        public  string email { get;set; }
    }
    public class logInVM
    {
        
        public  string pass { get;set; }
        public  string email { get;set; }
    }
}