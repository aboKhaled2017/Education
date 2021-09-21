using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Education.Models.ManageViewModels
{
    public class ChangePasswordViewModel
    {
        [Required(ErrorMessage = "هذا الحقل مطلوب")]
        [StringLength(50, ErrorMessage = " على الاقل من 6 حروف وعلى الاكثر 50 حرف", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,50}", ErrorMessage = "على الاقل لحرف كبير وحرف صغير ورقم ورمز وتتكون على الاقل من 6 حروف")]
        [Display(Name = "كلمة السر الحالية")]
        public string OldPassword { get; set; }

        [Required(ErrorMessage = "هذا الحقل مطلوب")]
        [StringLength(50, ErrorMessage = " على الاقل من 6 حروف وعلى الاكثر 50 حرف", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,50}", ErrorMessage = "على الاقل لحرف كبير وحرف صغير ورقم ورمز وتتكون على الاقل من 6 حروف")]
        [Display(Name = "كلمة السر الجديدة")]
        public string NewPassword { get; set; }

        [DataType(DataType.Password)]
        [Compare("NewPassword", ErrorMessage = "كلمتى السر غير متطابقتين")]
        [Required(ErrorMessage = "هذا الحقل مطلوب")]
        public string ConfirmPassword { get; set; }

    }
}
