using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Education.Data;
using Education.Data.Entities;
using Education.Models.ManageViewModels;
using Education.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Education.Student.Controllers
{
    public class ProfileController : mainController
    {
        public ProfileController(IConfiguration config, RoleManager<IdentityRole> roleManager, UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IEmailSender emailSender, EduEntities context) : base(config, roleManager, userManager, signInManager, emailSender, context) { }

        public async Task<IActionResult> Index()
        {
            var currentStudent = await getCurrentStudent();
            var studentMembership = await _db.StudentInfos.FirstOrDefaultAsync(s => s.StudentId == currentStudent.Id);
            var studentMembershipData = studentMembership == null ?
                null :
                new StudentMembership
                {
                    Id = studentMembership.StudentId,
                    BirthDate = studentMembership.BirthDate,
                    Phone = studentMembership.Phone,
                    FatherPhone = studentMembership.FatherPhone,
                    FatherWork = studentMembership.FatherWork,
                    School = studentMembership.School,
                    FullName = studentMembership.FullName,
                };
            var data = new Tuple<StudentAccount, ChangePasswordViewModel, StudentMembership>(
                    currentStudent, null, studentMembershipData);
            return View(data);
        }

        public JsonResult isEmailExists(string email)
        {
            if (String.IsNullOrEmpty(email)) return Json(true);
            string currentEmail = User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value;
            if (email == currentEmail) return Json(true);
            return Json(!_userManager.Users.Any(u => u.Email == email));
        }

        [HttpPost]
        public async Task<IActionResult> editAccount([FromBody] StudentAccount accountModel)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var updatedStudent = await _db.Students.FindAsync(accountModel.Id);
                    updatedStudent.Fname = accountModel.fname;
                    updatedStudent.Lname = accountModel.lname;
                    _db.Entry(updatedStudent).State = EntityState.Modified;
                    var upStudentRes = await _db.SaveChangesAsync();
                    if (upStudentRes == 1)
                    {
                        var updatedUser = await _userManager.Users.FirstOrDefaultAsync(u => u.Id == accountModel.Id.ToString());
                        if (updatedUser != null)
                        {
                            if (updatedUser.Email == accountModel.email.Trim())
                                return Ok("تم تعديل حسابك بنجاح");
                            updatedUser.Email = accountModel.email;
                            updatedUser.UserName = accountModel.email;
                            var result = await _userManager.UpdateAsync(updatedUser);
                            if (result.Succeeded)
                            {
                                await LogoutStudent();
                                var newClaim = StudentPrincipals(accountModel.email, accountModel.fname, updatedUser.Id);
                                await _SignStudentInAsync(updatedUser, accountModel.email, true, accountModel.fname);
                                return Ok("تم تعديل حسابك بنجاح");
                            }
                            else
                            {
                                return BadRequest("لم يتم تعديل البريد االالكترونى");
                            }
                        }
                    }
                }
                return BadRequest("لقد فشلت عملية تعديل البيانات");
            }
            catch
            {
                return BadRequest("لقد فشلت عملية تعديل البيانات");
            }
        }

        [HttpPost]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await _currentuser();
                if (user != null)
                {
                    var changePasswordResult = await _userManager.ChangePasswordAsync(user, model.OldPassword, model.NewPassword);
                    if (changePasswordResult.Succeeded)
                    {
                        await LogoutStudent();
                        await _SignStudentInAgainAsync(user);
                        return Ok("تم تغيير كلمة السر بنجاح");
                    }
                    else
                    {
                        return NotFound("كلمة السر القديمة غير صحيحة");
                    }
                }
            }
            return BadRequest("بيانات غير صحيحة");
        }

        [HttpPost()]
        public async Task<IActionResult> Membership([FromBody] StudentMembership model, [FromQuery] string type)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    string id = StudentCookieData().Id;
                    model.Id = id;
                    if (type == "register") return await MembershipRegister(model);
                    else if (type == "edit") return await MembershipEdit(model);
                    else return BadRequest();
                }
                catch
                {
                    return BadRequest("البيانات غير صحيحة");
                }
            }
            return BadRequest("البيانات غير صحيحة");
        }
        private async Task<IActionResult> MembershipRegister(StudentMembership model)
        {
            var newStdMemship = new StudentInfo
            {
                StudentId = model.Id,
                School = model.School,
                Phone = model.Phone,
                FullName = model.FullName,
                FatherPhone = model.FatherPhone,
                FatherWork = model.FatherWork,
                BirthDate = model.BirthDate,
                CategoryId = Guid.Empty
            };
            _db.StudentInfos.Add(newStdMemship);
            int result = await _db.SaveChangesAsync();
            if (result == 1) return Ok("تم تسجيل عضويتك بنجاح");
            return BadRequest("لقد فشلت عملية التسجيل");
        }
        private async Task<IActionResult> MembershipEdit([FromBody] StudentMembership model)
        {
            var currentStudentMemship = await _db.StudentInfos.FindAsync(model.Id);
            if (currentStudentMemship == null)
            {
                return NotFound("العضوية غير مسجلة من قبل");
            }
            else
            {
                currentStudentMemship.School = model.School;
                currentStudentMemship.Phone = model.Phone;
                currentStudentMemship.FullName = model.FullName;
                currentStudentMemship.FatherPhone = model.FatherPhone;
                currentStudentMemship.FatherWork = model.FatherWork;
                currentStudentMemship.BirthDate = model.BirthDate;
                _db.Entry(currentStudentMemship).State = EntityState.Modified;
                int res = await _db.SaveChangesAsync();
                if (res == 1) return Ok("تم تعديل بيانات عضويتك بنجاح");
            }
            return BadRequest("لم يتم تعديل البيانات  بعد");
        }
    }
}