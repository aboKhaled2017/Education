"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
require("../../../global/helperDome");
$(function () {
    ImagesSettingOperaions.main();
    MembershipSettingOperations.main();
});
var ImagesSettingOperaions = {
    ImgsDataUrl: "/Admin/Settings/ListBgImages",
    DeleteImagesUrl: "/Admin/Settings/DeleteImage",
    BaseImgSrc: "/images/Student/backgrounds/",
    ImagesData: [],
    BgImages: $("#BgImages img"),
    AddImgBtn: $("#AddNewBgImg"),
    DeleteImgBtn: $("#DeleteBgImg"),
    handleImgSelectable: function () {
        $(document.body).on("click", "#BgImages img", function (e) {
            $(e.target).toggleClass("selected");
        });
    },
    GetImagesData: function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, $.get(this.ImgsDataUrl).done(function (data) {
                        _this.ImagesData = JSON.parse(data);
                    })];
            });
        });
    },
    CreateImages: function () {
        var container = $();
        for (var _i = 0, _a = this.ImagesData; _i < _a.length; _i++) {
            var imgName = _a[_i];
            var thumbnailImg = $("\n        <div class=\"col-md-4 imgCard\">\n            <img class=\"img-responsive img-thumbnail\" src=\"" + this.BaseImgSrc + imgName + "\">\n        </div>\n        ");
            thumbnailImg.find("img").data("name", imgName);
            container = container.add(thumbnailImg);
        }
        $("#BgImages .images").append(container);
    },
    CreateNewImage: function (imgName) {
        var imgSrc = "" + this.BaseImgSrc + imgName;
        var thumbnailImg = $("\n        <div class=\"col-md-4\">\n            <img class=\"img-responsive img-thumbnail\" src=\"" + imgSrc + "\">\n        </div>\n    ");
        thumbnailImg.find("img").data("name", imgName);
        $("#BgImages .images").append(thumbnailImg);
    },
    HandleAddNewImage: function () {
        var _this = this;
        var input = $("<input type='file' accept='image/*' id='uploadImg' class=\"hidden\"/>");
        $(document.body).append(input);
        this.AddImgBtn.click(function (e) {
            input.click();
        });
        input.change(function (e) {
            var file = e.target.files[0];
            var extension = "." + file.name.split(".").pop();
            var Name = "" + Date.now() + extension;
            if (file.type.indexOf("image") == -1) {
                $.notify({
                    message: "هذة النوعية من الصور غير مدعومة"
                });
                return;
            }
            _this.ImagesData.push(Name);
            var formData = new FormData();
            formData.append("Name", Name);
            formData.append("Value", JSON.stringify(_this.ImagesData));
            formData.append("Image", file);
            _this.AddImgBtn.pendingState(true, "fa-picture-o");
            $.ajax({
                url: "/Admin/Settings/SaveImage",
                data: formData,
                method: "POST",
                processData: false,
                cache: false,
                contentType: false
            })
                .done(function () {
                $.notify({
                    message: "تم حفظ الصورة بنجاح"
                });
                _this.CreateNewImage(Name);
            })
                .always(function () {
                _this.AddImgBtn.pendingState(false);
            })
                .catch(function (e) {
                $.notify({
                    message: "لم يتم حفظ الصورة,حدثت مشكلة فى السيرفر"
                });
                _this.ImagesData.pop();
            });
        });
    },
    HandleDeleteImage: function () {
        var _this = this;
        this.DeleteImgBtn.click(function (e) {
            var imgsName = [];
            var imgs = $("#BgImages img.selected");
            for (var i = 0; i < imgs.length; i++) {
                imgsName.push(imgs.eq(i).data("name"));
            }
            var oldImagesData = _this.ImagesData;
            _this.ImagesData = _this.ImagesData.filter(function (name) {
                if (imgsName.indexOf(name) == -1)
                    return name;
            });
            _this.DeleteImgBtn.pendingState(true, "fa-remove");
            $.post(_this.DeleteImagesUrl, {
                imgsName: imgsName,
                value: JSON.stringify(_this.ImagesData)
            })
                .always(function () {
                _this.DeleteImgBtn.pendingState(false);
            })
                .done(function () {
                $.notify({
                    message: "تمت عملية الحذف بنجاح"
                });
                imgs.fadeOut();
            })
                .catch(function (e) {
                $.notify({
                    message: "لم يتم حذف الصورة,حدثت مشكلة فى السيرفر"
                });
                _this.ImagesData = oldImagesData;
            });
        });
    },
    main: function () {
        var _this = this;
        this.handleImgSelectable();
        this.GetImagesData().then(function (d) {
            $(".loading").hide();
            _this.CreateImages();
            _this.HandleAddNewImage();
            _this.HandleDeleteImage();
        });
    }
};
var MembershipSettingOperations = {
    FetchMembershipDataUrl: "/Admin/Settings/GetMembership",
    SaveMembershipDataUrl: "/Admin/Settings/SaveMembership",
    Form: $("#MembershipForm"),
    get NameInp() {
        return this.Form.find("#Name");
    },
    get TitleInp() {
        return this.Form.find("#Title");
    },
    SaveBtn: $("#SaveBtn"),
    FetchMembershipData: function () {
        var _this = this;
        $.get(this.FetchMembershipDataUrl).done(function (data) {
            _this.NameInp.val(data.name);
            _this.TitleInp.val(data.title);
        });
    },
    GetFormEditedData: function () {
        return {
            name: this.NameInp.val(),
            title: this.TitleInp.val()
        };
    },
    HandleOnFormSubmit: function () {
        var _this = this;
        this.SaveBtn.click(function (e) {
            if (_this.Form.valid()) {
                var data = _this.GetFormEditedData();
                _this.SaveBtn.pendingState(true, "fa-send");
                $.post(_this.SaveMembershipDataUrl, {
                    Name: data.name,
                    Title: data.title
                })
                    .done(function () {
                    $.notify({
                        message: "تم تعديل بيانات العضوية بنجاح"
                    });
                })
                    .always(function () {
                    _this.SaveBtn.pendingState(false);
                })
                    .catch(function (e) {
                    var message = e.responseJSON && e.responseJSON.message
                        ? e.responseJSON.message
                        : "لا يمكن تنفيذ العملية الان,لحدوث مشكلة عند الخادم";
                    $.notify({
                        message: message,
                        title: "لم يتم تنفيذ العملية"
                    });
                });
            }
        });
    },
    main: function () {
        this.FetchMembershipData();
        this.HandleOnFormSubmit();
    }
};
//# sourceMappingURL=Settings.js.map