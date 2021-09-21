using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Education.Student {
    public class StudentLoginModel {
        [Required (ErrorMessage = "هذا الحقل مطلوب")]
        [RegularExpression ("^[a-zA-Z0-9_\\.-]+@([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$", ErrorMessage = "البريد الالكترونى غير صحيح")]
        public virtual string email { get; set; }

        [Required (ErrorMessage = "هذا الحقل مطلوب")]
        [StringLength (50, ErrorMessage = " على الاقل من 6 حروف وعلى الاكثر 50 حرف", MinimumLength = 6)]
        [DataType (DataType.Password)]
        [RegularExpression ("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,50}", ErrorMessage = "على الاقل لحرف كبير وحرف صغير ورقم ورمز وتتكون على الاقل من 6 حروف")]
        [Display (Name = "كلمة السر")]
        public string password { get; set; }
        public bool RememberMe { get; set; }
    }
    public class StudentRegisterModel : StudentLoginModel {
        [Required (ErrorMessage = "هذا الحقل مطلوب")]
        [RegularExpression ("^[a-zA-Z0-9_\\.-]+@([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$", ErrorMessage = "البريد الالكترونى غير صحيح")]
        [Remote (action: "isEmailExists", controller: "Home", areaName: "Student", ErrorMessage = "البريد الالكترونى محجوز من قبل")]
        public override string email { get; set; }

        [Required (ErrorMessage = "هذا الحقل مطلوب")]
        [RegularExpression ("^((\\s?([a-zA-Z]){3,15}(\\s([a-zA-Z]){3,15})?\\s?)|(\\s?([\u0600-\u06FF]){3,15}(\\s([\u0600-\u06FF]){3,15})?\\s?))$", ErrorMessage = "ادخل اسم صحيح")]
        public string fname { get; set; }

        [Required (ErrorMessage = "هذا الحقل مطلوب")]
        [RegularExpression ("^((\\s?([a-zA-Z]){3,15}(\\s([a-zA-Z]){3,15})?\\s?)|(\\s?([\u0600-\u06FF]){3,15}(\\s([\u0600-\u06FF]){3,15})?\\s?))$", ErrorMessage = "ادخل اسم صحيح")]
        public string lname { get; set; }

        [DataType (DataType.Password)]
        [Compare ("password", ErrorMessage = "كلمتى السر غير متطابقتين")]
        [Required (ErrorMessage = "هذا الحقل مطلوب")]
        public string confirmPassword { get; set; }

    }
    public class StudentAccount {
        public string Id { get; set; }

        [Required (ErrorMessage = "هذا الحقل مطلوب")]
        [RegularExpression ("^[a-zA-Z0-9_\\.-]+@([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$", ErrorMessage = "البريد الالكترونى غير صحيح")]
        [Remote (action: "isEmailExists", controller: "Profile", areaName: "Student", ErrorMessage = "البريد الالكترونى محجوز من قبل", HttpMethod = "GET")]
        public string email { get; set; }

        [Required (ErrorMessage = "هذا الحقل مطلوب")]
        [RegularExpression ("^((\\s?([a-zA-Z]){3,15}(\\s([a-zA-Z]){3,15})?\\s?)|(\\s?([\u0600-\u06FF]){3,15}(\\s([\u0600-\u06FF]){3,15})?\\s?))$", ErrorMessage = "ادخل اسم صحيح")]
        public string fname { get; set; }

        [Required (ErrorMessage = "هذا الحقل مطلوب")]
        [RegularExpression ("^((\\s?([a-zA-Z]){3,15}(\\s([a-zA-Z]){3,15})?\\s?)|(\\s?([\u0600-\u06FF]){3,15}(\\s([\u0600-\u06FF]){3,15})?\\s?))$", ErrorMessage = "ادخل اسم صحيح")]
        public string lname { get; set; }
    }
    public class StudentIdentifier {
        public string id { get; set; }
        public string email { get; set; }
    }
}