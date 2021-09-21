using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Education.Areas.Admin;
namespace Education.Areas.Admin.Models
{
    public class AdminLoginModel
    {
        [Required(ErrorMessage ="هذا الحقل مطلوب")]
        [Display(Name ="اسم المستخدم")]
        public string Username { get; set; }


        [DataType(DataType.Password)]
        [Required(ErrorMessage = "هذا الحقل مطلوب")]
        [Display(Name ="كلمة السر")]
        public string Password { get; set; }

        [Display(Name = "تذكرنى؟")]
        public bool RememberMe { get; set; }
    }
}
