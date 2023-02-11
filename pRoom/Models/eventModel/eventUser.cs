using Dapper.Contrib.Extensions;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace pRoom.Models.eventModel
{
    public class eventUser
    {

    }
    [Table("musers")]
    public class mUser
    {
        [Dapper.Contrib.Extensions.Key]
        public int id { get; set; }
        public string Password { get; set; }
        public string Guid { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Mobile { get; set; }
        public int RoleID { get; set; }
    }

    public class loginUser
    {
        public int id { get; set; }
        public int userID { get; set; }
        public string guid { get; set; }
        public DateTime dateTime { get; set; }

    }
    public class role
    {
        [Display(Name = "کد")]
        public int id { get; set; }
        [Display(Name = "نام")]
        public string name { get; set; }
    }
}
