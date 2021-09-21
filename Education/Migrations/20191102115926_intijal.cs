using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Education.Migrations
{
    public partial class intijal : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "admin",
                columns: table => new
                {
                    id = table.Column<string>(nullable: false),
                    name = table.Column<string>(maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_admin", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "category",
                columns: table => new
                {
                    id = table.Column<Guid>(nullable: false),
                    name = table.Column<string>(maxLength: 100, nullable: true),
                    superid = table.Column<Guid>(nullable: true),
                    isEnabled = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_category", x => x.id);
                    table.ForeignKey(
                        name: "FK_category_category_superid",
                        column: x => x.superid,
                        principalTable: "category",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "setting",
                columns: table => new
                {
                    key = table.Column<string>(nullable: false),
                    value = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_setting", x => x.key);
                });

            migrationBuilder.CreateTable(
                name: "student",
                columns: table => new
                {
                    id = table.Column<string>(nullable: false),
                    fname = table.Column<string>(maxLength: 30, nullable: false),
                    lname = table.Column<string>(maxLength: 30, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_student", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "teacher",
                columns: table => new
                {
                    id = table.Column<string>(nullable: false),
                    name = table.Column<string>(maxLength: 50, nullable: false),
                    title = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_teacher", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "studentInfo",
                columns: table => new
                {
                    id = table.Column<string>(nullable: false),
                    school = table.Column<string>(maxLength: 100, nullable: false),
                    fullName = table.Column<string>(maxLength: 50, nullable: false),
                    phone = table.Column<string>(maxLength: 11, nullable: false),
                    birthDate = table.Column<DateTime>(type: "date", nullable: false),
                    fatherWork = table.Column<string>(maxLength: 50, nullable: false),
                    fatherPhone = table.Column<string>(maxLength: 11, nullable: false),
                    categoryID = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_studentInfo", x => x.id);
                    table.ForeignKey(
                        name: "FK_studentInfo_category_categoryID",
                        column: x => x.categoryID,
                        principalTable: "category",
                        principalColumn: "id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_studentInfo_student_id",
                        column: x => x.id,
                        principalTable: "student",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "course",
                columns: table => new
                {
                    id = table.Column<Guid>(nullable: false),
                    name = table.Column<string>(maxLength: 60, nullable: false),
                    desc = table.Column<string>(nullable: false),
                    isOpened = table.Column<bool>(nullable: false),
                    cost = table.Column<double>(nullable: true),
                    startDate = table.Column<DateTime>(nullable: true),
                    notify = table.Column<string>(nullable: true),
                    period = table.Column<string>(maxLength: 50, nullable: true),
                    imgSrc = table.Column<string>(nullable: true),
                    imgType = table.Column<string>(nullable: true),
                    teacherId = table.Column<string>(nullable: false),
                    categoryID = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_course", x => x.id);
                    table.ForeignKey(
                        name: "FK_course_category_categoryID",
                        column: x => x.categoryID,
                        principalTable: "category",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_course_teacher_teacherId",
                        column: x => x.teacherId,
                        principalTable: "teacher",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "studentCourse",
                columns: table => new
                {
                    studentId = table.Column<string>(nullable: false),
                    courseId = table.Column<Guid>(nullable: false),
                    status = table.Column<int>(nullable: false),
                    regDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_studentCourse", x => new { x.courseId, x.studentId });
                    table.ForeignKey(
                        name: "FK_studentCourse_course_courseId",
                        column: x => x.courseId,
                        principalTable: "course",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_studentCourse_student_studentId",
                        column: x => x.studentId,
                        principalTable: "student",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "videoTutorial",
                columns: table => new
                {
                    id = table.Column<Guid>(nullable: false),
                    url = table.Column<string>(nullable: false),
                    title = table.Column<string>(nullable: false),
                    description = table.Column<string>(nullable: false),
                    duration = table.Column<int>(nullable: false),
                    isYoutube = table.Column<bool>(nullable: false),
                    number = table.Column<short>(nullable: false),
                    date = table.Column<DateTime>(type: "date", nullable: false),
                    courseId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_videoTutorial", x => x.id);
                    table.ForeignKey(
                        name: "FK_videoTutorial_course_courseId",
                        column: x => x.courseId,
                        principalTable: "course",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_category_superid",
                table: "category",
                column: "superid");

            migrationBuilder.CreateIndex(
                name: "IX_course_categoryID",
                table: "course",
                column: "categoryID");

            migrationBuilder.CreateIndex(
                name: "IX_course_teacherId",
                table: "course",
                column: "teacherId");

            migrationBuilder.CreateIndex(
                name: "IX_studentCourse_studentId",
                table: "studentCourse",
                column: "studentId");

            migrationBuilder.CreateIndex(
                name: "IX_studentInfo_categoryID",
                table: "studentInfo",
                column: "categoryID");

            migrationBuilder.CreateIndex(
                name: "IX_videoTutorial_courseId",
                table: "videoTutorial",
                column: "courseId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "admin");

            migrationBuilder.DropTable(
                name: "setting");

            migrationBuilder.DropTable(
                name: "studentCourse");

            migrationBuilder.DropTable(
                name: "studentInfo");

            migrationBuilder.DropTable(
                name: "videoTutorial");

            migrationBuilder.DropTable(
                name: "student");

            migrationBuilder.DropTable(
                name: "course");

            migrationBuilder.DropTable(
                name: "category");

            migrationBuilder.DropTable(
                name: "teacher");
        }
    }
}
