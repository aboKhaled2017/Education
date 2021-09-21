using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Education.Data.Entities;
using Education.Data;
using Microsoft.AspNetCore.Identity;
using Education.Areas.Admin.Models;
using static Education.Variables;

namespace Education.Areas.Admin.Controllers
{
    public class AdminersController : mainApiController
    {
        public AdminersController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, EduEntities db) : base(userManager, signInManager, db)
        {
        }
        // GET: api/Adminers
        [HttpGet]
        public IEnumerable<AdminerViewModel> GetAdminers()
        {
            return getAllAdminers();
        }

        // GET: api/Adminers/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetAdminer([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var adminer = await getAllAdminers().FirstAsync(a => a.Id == id.ToString());

            if (adminer == null)
            {
                return NotFound();
            }

            return Ok(adminer);
        }

        // PUT: api/Adminers/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAdminer([FromRoute] string id, [FromBody] AdminerModel adminer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (IsTheSameCurrentUser(id))
            {
                return BadRequest("current");
            }
            try
            {

                var updatedUser = _userManager.Users.Single(u => u.Id == id.ToString());
                updatedUser.PasswordHash = _userManager.PasswordHasher.HashPassword(updatedUser, adminer.password);
                updatedUser.UserName = adminer.UserName;
                var result = await _userManager.UpdateAsync(updatedUser);
                if (result.Succeeded)
                {
                    _db.Entry(new Adminer { Id = id, Name = adminer.Name }).State = EntityState.Modified;
                    await _db.SaveChangesAsync();
                }
            }
            catch
            {
                if (!AdminerExists(id))
                {
                    return NotFound();
                }
                else
                {
                    return BadRequest(false);
                }
            }

            return NoContent();
        }

        // POST: api/Adminers
        [HttpPost]
        public async Task<IActionResult> PostAdminer([FromBody] AdminerModel adminer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var user = new ApplicationUser { Id = Guid.NewGuid().ToString(), UserName = adminer.UserName };
                user.PasswordHash = _userManager.PasswordHasher.HashPassword(user, adminer.password);
                var result = await _userManager.CreateAsync(user);
                var newAdminer = new Adminer { Id = user.Id, Name = adminer.Name };
                if (result.Succeeded)
                {
                    // result = await _userManager.AddPasswordAsync(user, adminer.password);
                    result = await _userManager.AddToRoleAsync(user, "admin");
                    if (result.Succeeded)
                    {
                        _db.Admins.Add(newAdminer);
                        await _db.SaveChangesAsync();
                        adminer.Id =user.Id;
                        return CreatedAtAction("GetAdminer", new { id = adminer.Id });
                    }
                }
                await _userManager.DeleteAsync(user);
                _db.Remove(newAdminer);
                await _db.SaveChangesAsync();
            }
            catch
            {
                return BadRequest(ModelState);
            }
            return BadRequest(ModelState);
        }

        // DELETE: api/Adminers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAdminer([FromRoute] string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (IsTheSameCurrentUser(id))
            {
                return BadRequest("current");
            }
            var adminer = await _db.Admins.FindAsync(id);
            if (adminer == null)
            {
                return NotFound();
            }
            try
            {
                var deletedUser = await _userManager.Users.SingleAsync(u => u.Id == id.ToString());
                var result = await _userManager.DeleteAsync(deletedUser);
                if (result.Succeeded)
                {
                    _db.Admins.Remove(adminer);
                    await _db.SaveChangesAsync();
                }
            }
            catch
            {
                return NotFound();
            }

            return Ok(true);
        }

        private bool AdminerExists(string id)
        {
            return _db.Admins.Any(e => e.Id == id);
        }
        private IQueryable<AdminerViewModel> getAllAdminers()
        {
            var admins = _db.Admins.Select(a => new { Id = a.Id.ToString(), a.Name });
            var data = admins.Join(_userManager.Users, admin => admin.Id, user => user.Id,
                (admin, user) => new AdminerViewModel { Id = admin.Id, UserName = user.UserName, Name = admin.Name });
            return data;
        }
        private bool IsTheSameCurrentUser(string id)
        {
            return getCurrentUser().Id == id;
        }
    }
}