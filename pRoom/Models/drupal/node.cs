using Dapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pRoom.Models.drupal
{
    public class Node22
    {
        public int id { get; set; }
        public string langcode { get; set; }
        public string title { get; set; }
        public string password { get; set; }
        public string studentPassword { get; set; }
        public string uuid { get; set; }
        public Node22()
        {

        }
        public Node22(int id , string title,string langcode, string password, string studentPassword)
        {
            this.id = id;
            this.title = nodeRepos22.TruncateLongString(title, 20);
            this.langcode = langcode;
            this.password = password;
            this.studentPassword = studentPassword;
            Console.WriteLine(this.title);
            Console.WriteLine("passw : " + password);
        }
    }
    public static class nodeRepos22
    {
        public static Node22   getNode(int id)
        {
            using var db = appInfo.GetDbconnection();
            var node = db.Query("Select * From node where   nid="+id).FirstOrDefault();
            Console.WriteLine("node");

            if (node == null) return null;
            if (node.type != "meet") return null;
            var vidFild = node.vid;
            Console.WriteLine((uint)vidFild);
            if (vidFild == null || vidFild == 0) return null;
            
            var NodeData = db.Query("Select * From node_field_revision where   nid=" + id + " AND vid=" + (uint)vidFild).FirstOrDefault();
            if (NodeData == null) return null;

            var Nodepassword = db.Query("Select * From node__field_password where   entity_id =" + id + " AND revision_id=" + (uint)vidFild).FirstOrDefault();
            if (Nodepassword == null) return null;

            var studentPassword = db.Query("Select * From node__field_student_password where   entity_id =" + id + " AND revision_id=" + (uint)vidFild).FirstOrDefault();
            if (studentPassword == null) return null;

            Node22 n = new Node22(id, NodeData.title,node.langcode,Nodepassword.field_password_value, studentPassword.field_student_password_value);
            Console.WriteLine(NodeData.title);
            // else Console.WriteLine("not found");
            return n;

            // return m;
        }

        public static Node22 getNodeByUuid(string uuid)
        {
            using var db = appInfo.GetDbconnection();
            var node = db.Query("Select * From node where   uuid='" + uuid+"'").FirstOrDefault();
           
            if (node == null) return null;
            if (node.type != "meet") return null;
            var vidFild = node.vid;
            Console.WriteLine((uint)vidFild);
            if (vidFild == null || vidFild == 0) return null;

            var NodeData = db.Query("Select * From node_field_revision where   nid=" + (uint)node.nid + " AND vid=" + (uint)vidFild).FirstOrDefault();
            if (NodeData == null) return null;
            Node22 n = new Node22()
            {
                id= (int)node.nid,
                title =NodeData.title,
                uuid=uuid
            };
            return n;
        }

        public static string TruncateLongString(this string str, int maxLength)
        {
            if (string.IsNullOrEmpty(str)) return str;

            return str.Substring(0, Math.Min(str.Length, maxLength));
        }
    }
}
