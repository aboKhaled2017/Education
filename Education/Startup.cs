using System;
using System.Collections.Generic;
using System.Linq;
using Education.Data;
using Education.Data.Entities;
using Education.Services;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace Education
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        public IConfiguration Configuration { get; }
        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<FormOptions>(x => {
                x.ValueLengthLimit = int.MaxValue;
                x.MultipartBodyLengthLimit = int.MaxValue; // In case of multipart
            });
            services.Configure<CookiePolicyOptions>(options =>
            {
                // This lambda determines whether user consent for non-essential cookies is needed for a given request.
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });
            services.AddMvc(c => { }).SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            services.AddAuthorization(autorizationOptions =>
            {
                autorizationOptions.AddPolicy("AdminPolicy", policy =>
                {
                    policy.AuthenticationSchemes.Add("AdminScheme");
                    policy.RequireAuthenticatedUser();
                    policy.RequireRole("Admin");
                });
                autorizationOptions.AddPolicy("StudentPolicy", policy =>
                {
                    policy.AuthenticationSchemes.Add("StudentScheme");
                    policy.RequireAuthenticatedUser();
                    policy.RequireRole("Student");
                });
                /*autorizationOptions.AddPolicy("TeacherPolicy", policy => {
                    policy.AuthenticationSchemes.Add("TeacherScheme");
                    policy.RequireAuthenticatedUser();
                    policy.RequireRole("Teacher");
                });*/
            });
            services.AddAuthentication()
                .AddCookie("AdminScheme", CookieBuilder =>
                {
                    CookieBuilder.Cookie.Path = "/Admin";
                    CookieBuilder.LoginPath = "/Admin/Login";
                    CookieBuilder.AccessDeniedPath = "/Admin/AccessDenied";
                    CookieBuilder.Cookie.Name = "AdminCookie";
                })
                /*.AddCookie("TeacherScheme", CookieBuilder => {
                    CookieBuilder.Cookie.Path = "/Admin";
                    CookieBuilder.LoginPath = "/Admin/Login";
                    CookieBuilder.AccessDeniedPath = "/Admin/AccessDenied";
                    CookieBuilder.Cookie.Name = "AdminCookie";
                })*/
                .AddCookie("StudentScheme", CookieBuilder =>
                {
                    CookieBuilder.Cookie.Path = "/";
                    CookieBuilder.LoginPath = "/";
                    CookieBuilder.AccessDeniedPath = "/AccessDenied";
                    CookieBuilder.Cookie.Name = "StudentCookie";

                });

            services.AddDbContext<ApplicationDbContext>(options =>
            {
                options.UseSqlServer(Configuration.GetConnectionString("EduEntities"));
            });
            services.AddDbContext<EduEntities>(options =>
            {
                options.UseSqlServer(Configuration.GetConnectionString("EduEntities"));
            });
            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders()
                .AddDefaultUI();
            services.Configure<IdentityOptions>(options =>
            {
                options.Password.RequireNonAlphanumeric = false;
            });
            //services.AddDefaultIdentity<IdentityUser>().AddEntityFrameworkStores<EduEntities>();
            services.AddTransient<EduEntities, EduEntities>();
            services.AddTransient<IEmailSender, EmailSender>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, IServiceProvider serviceProvider)
        {
            if (app is null)
            {
                throw new ArgumentNullException(nameof(app));
            }
            /*for debugging*/
            env.EnvironmentName = "development";
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage();
            }
            else
            { /*in developement*/
                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage();

                app.UseExceptionHandler("/Home/Error");
                app.UseHsts();
            }
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseCookiePolicy();
            app.UseAuthentication();
            app.UseMvc(routes =>
            {
                #region 
                /*start admin routes*/
                routes.MapAreaRoute("AdminRoute", "Admin", "Admin/{controller=Home}/{action=Index}/{id?}");
                routes.MapRoute(
                    name: "Admin-Account",
                    template: "Admin/{action}",
                    defaults: new { area = "Admin", controller = "Account", action = "Login" });
                routes.MapRoute(
                    name: "Admin-action",
                    template: "Admin/{controller}/{action}/{id?}",
                    defaults: new { area = "Admin", controller = "Home", action = "index" });
                #endregion
                #region
                /*start Teacher routes*/
                routes.MapRoute(
                    name: "Teacher-Area-default",
                    template: "Teacher",
                    defaults: new { area = "Teacher", controller = "index", action = "index" });
                routes.MapRoute(
                    name: "Teacher-action",
                    template: "Teacher/{controller}/{action}/{id?}",
                    defaults: new { area = "Teacher", controller = "index", action = "index" });
                #endregion
                #region
                /*start student routes*/
                routes.MapRoute(
                    name: "Student-Area-default",
                    template: "",
                    defaults: new { area = "Student", controller = "Home", action = "index" },
                    constraints: new { area = "Student" });
                routes.MapRoute(
                    name: "Student-profile-default",
                    template: "profile/{action=index}",
                    defaults: new { area = "Student", controller = "profile" }
                );
                //for tutorial conntroller   
                routes.MapRoute(
                    name: "Student-tutorial-mainCategory",
                    template: "Tutorial/{id}/{mainCategory}",
                    defaults: new { area = "Student", controller = "tutorial", action = "MainCategory" }
                );
                routes.MapRoute(
                    name: "Student-tutorial-subCategory",
                    template: "Tutorial/{id}/{mainCategory}/{subCategory}",
                    defaults: new { area = "Student", controller = "tutorial", action = "SubCategory" }
                );
                routes.MapRoute(
                    name: "Student-tutorial-subject",
                    template: "Tutorial/{id}/{mainCategory}/{subCategory}/{subjId}/{subject}",
                    defaults: new { area = "Student", controller = "tutorial", action = "Subject" }
                );
                routes.MapRoute(
                    name: "Student-tutorial-Data",
                    template: "TutorialData/{action=index}",
                    defaults: new { area = "Student", controller = "tutorial" }
                );
                routes.MapRoute(
                    name: "Student-defaultAction",
                    template: "{action}/{id?}",
                    defaults: new { area = "Student", controller = "Home", action = "index" });
                routes.MapRoute(
                    name: "Student-controller-action",
                    template: "{controller}/{action}/{id?}",
                    defaults: new { area = "Student", controller = "Home", action = "index" });
                #endregion
            });
            IntializeData(serviceProvider);
        }
        private void IntializeData(IServiceProvider serviceProvider)
        {
            var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
            var userManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();
            var db = serviceProvider.GetRequiredService<EduEntities>();
            var appDbContext = serviceProvider.GetRequiredService<ApplicationDbContext>();
            CreateRolesAndUsers(db, appDbContext, userManager, roleManager);
            CreateCategories(db);
            AddDefaultImages(db);
        }
        private void CreateSPs(EduEntities db)
        {
            RawSqlString checkProc = @"if  exists (select * from sys.objects where object_id=OBJECT_ID('ReArrangeID'))
                                    drop proc ReArrangeID;";
            RawSqlString SP_ReArrangeId = @"
                                    
                                        CREATE  proc  ReArrangeID 
                                        @table varchar(50),
                                        @column varchar(20)
                                        as
                                        begin 
                                        declare @stamt varchar(500);
                                        set @stamt='declare @count int=(select count('+@column+') from '+ @table+');';
                                        set @stamt+=' declare @i int=1 ;';
                                        set @stamt+=' while @i<=@count ';
                                        set @stamt+=' begin';
                                        set @stamt+=' update top(@i) '+ @table+' set '+ @column+' =@i where  '+ @column+' =(select  max( '+ @column+' ) from (select top(@i) '+ @column+'  from '+  @table+' order by  '+ @column+'  asc)as t)'; 
                                        set @stamt+=' set @i=@i+1';
                                        set @stamt+=' end';
                                        exec(@stamt)
                                        end
                                    ";
            db.Database.ExecuteSqlCommand(checkProc);
            db.Database.ExecuteSqlCommand(SP_ReArrangeId);
        }
        private void CreateRolesAndUsers(EduEntities db, ApplicationDbContext appDbContext,
            UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            
            db.Database.Migrate();
            appDbContext.Database.Migrate();
            if (roleManager.Roles.Count() == 0)
            {
                var StudentRole = new IdentityRole("Student");
                var TeacherRole = new IdentityRole("Teacher");
                var AdminRole = new IdentityRole("Admin");
                roleManager.CreateAsync(StudentRole).Wait();
                roleManager.CreateAsync(TeacherRole).Wait();
                roleManager.CreateAsync(AdminRole).Wait();
            }

            //Check if the admin user exists and create it if not
            //Add to the Administrator role
            if (db.Admins.Count() == 0)
            {
                var admin = new Adminer { Id = Guid.NewGuid().ToString(), Name = "مصطفى همام" };
                db.Admins.Add(admin);
                db.SaveChanges();
                var adminUser = new ApplicationUser { Id = admin.Id, Email = "mohamed2511995@gmail.com", UserName = "mostafah123" };
                //await _UserManager.SetLockoutEnabledAsync(adminUser, true);               
                //await _UserManager.SetLockoutEndDateAsync(adminUser, new DateTimeOffset(20000,new TimeSpan(50000)));
                userManager.AddPasswordAsync(adminUser, "AAaa123").Wait();
                userManager.CreateAsync(adminUser).Wait();
                userManager.AddToRoleAsync(adminUser, "Admin").Wait();
            }
            if (db.Teachers.Count() == 0)
            {
                var teacher = new Teacher { Id = Guid.NewGuid().ToString(), Name = "مصطفى همام", Title = "مدرس جامعى فى كلية العلوم قسم الكمياء" };
                db.Teachers.Add(teacher);
                db.SaveChanges();
                var teacherUser = new ApplicationUser { Id = teacher.Id, Email = "mohamed2511995@gmail.com", UserName = "mostafa456" };
                //await _UserManager.SetLockoutEnabledAsync(adminUser, true);               
                //await _UserManager.SetLockoutEndDateAsync(adminUser, new DateTimeOffset(20000,new TimeSpan(50000)));
                userManager.AddPasswordAsync(teacherUser, "AAaa123").Wait();
                userManager.CreateAsync(teacherUser).Wait();
                userManager.AddToRoleAsync(teacherUser, "Teacher").Wait();
            }
        }
        private void CreateCategories(EduEntities db)
        {
            if (db.Categories.Count() > 1) return;
            string insertMainCategory = String.Format("insert into category(id,name,isEnabled)values('{0}','{1}',1)", Guid.Empty, "عام");
            db.Database.ExecuteSqlCommand(insertMainCategory);
            var mainCategory = db.Categories.Find(Guid.Empty);
            mainCategory.Name = "عام";
            db.Entry(mainCategory).State = EntityState.Modified;
            var categories = new List<Category> {

                new Category { Id = Guid.NewGuid (), Name = "اعدادى", IsEnabled = true,SubCategories=new List<Category>{
                    new Category { Id = Guid.NewGuid (), Name = "اولى اعدادى", IsEnabled = true },
                    new Category { Id = Guid.NewGuid (), Name = "ثانية اعدادى" },
                    new Category { Id = Guid.NewGuid (), Name = "ثالثة اعدادى",SubCategories=new List<Category>{
                        new Category { Id = Guid.NewGuid (), Name = "الترم الاول" },
                        new Category { Id = Guid.NewGuid (), Name = "الترم الثانى" },
                    }}
                }},
                new Category { Id = Guid.NewGuid (), Name = "ثانوى" },
                new Category { Id = Guid.NewGuid (), Name = "كلية", IsEnabled = true },
                new Category { Id = Guid.NewGuid (), Name = "معهد" },
                new Category { Id = Guid.NewGuid (), Name = "خريجين" },
            };
            db.Categories.AddRange(categories);
            db.SaveChanges();

        }
        private void AddDefaultImages(EduEntities db)
        {
            var imgTb = db.Settings.Find(Variables.SettingsTable.BackgroundImages);
            if (imgTb != null) return;
            var newImgTb = new Setting { Key = Variables.SettingsTable.BackgroundImages };
            newImgTb.Value = "[\"bg1.jpg\",\"bg2.jpg\",\"bg3.jpg\",\"bg4.jpg\"]";
            db.Settings.Add(newImgTb);
            db.SaveChanges();
        }
    }
}