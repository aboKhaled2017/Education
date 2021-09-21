using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Education.Areas.Admin.Models
{
    public class AdminerAccountModel
    {
        [Required(ErrorMessage = "هذا الحقل مطلوب")]
        [StringLength(25,MinimumLength =3, ErrorMessage = "على الاقل 3 حروف وعلى الاكثر 25 حرف")]
        [RegularExpression("^[a-zA-Z0-9_]{3,25}$",ErrorMessage ="اسم مستخدم غير صحيح")]
        [Display(Name = "اسم المستخدم")]
        [Remote(action:"isUserNotNameExists",controller:"account",HttpMethod ="POST",ErrorMessage ="اسم المستخدم محجوز من قبل")]
        public string UserName { get; set; }
        [Required(ErrorMessage = "هذا الحقل مطلوب")]
        [StringLength(50, ErrorMessage = " على الاقل من 6 حروف وعلى الاكثر 50 حرف", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,50}", ErrorMessage = "على الاقل لحرف كبير وحرف صغير ورقم ورمز وتتكون على الاقل من 6 حروف")]
        [Display(Name = "كلمة السر")]
        public string password { get; set; }
    }
    public class AdminerModel : AdminerAccountModel
    {
        public string Id { get; set; }
        [Required(ErrorMessage = "هذا الحقل مطلوب")]
        [RegularExpression("^(([a-zA-Z]{3,15})\\s{1,2}([a-zA-Z ]{3,15})|([\u0600-\u06FF ]{3,15})\\s{1,2}([\u0600-\u06FF ]{3,15}))$", ErrorMessage = "اسم غير صحيح")]
        [Display(Name = "الاسم")]
        public string Name { get; set; }
    }
    public class AdminUser
    {
        public virtual string Id { get; set; }
        public string UserName { get; set; }
    }
    public class AdminerViewModel
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string UserName { get; set; }
    }

}
