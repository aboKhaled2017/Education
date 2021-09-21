import "../../../global/helperDome";
$(function() {
  ImagesSettingOperaions.main();
  MembershipSettingOperations.main();
});
interface MembershipModel {
  name: string;
  title: string;
}
let ImagesSettingOperaions = {
  ImgsDataUrl: "/Admin/Settings/ListBgImages",
  DeleteImagesUrl: "/Admin/Settings/DeleteImage",
  BaseImgSrc: "/images/Student/backgrounds/",
  ImagesData: [] as string[],
  BgImages: $("#BgImages img"),
  AddImgBtn: $("#AddNewBgImg"),
  DeleteImgBtn: $("#DeleteBgImg"),
  handleImgSelectable() {
    $(document.body).on("click", "#BgImages img", e => {
      $(e.target).toggleClass("selected");
    });
  },
  async GetImagesData() {
    return $.get(this.ImgsDataUrl).done(data => {
      this.ImagesData = JSON.parse(data);
    });
  },
  CreateImages() {
    let container = $();
    for (let imgName of this.ImagesData) {
      let thumbnailImg = $(`
        <div class="col-md-4 imgCard">
            <img class="img-responsive img-thumbnail" src="${
              this.BaseImgSrc
            }${imgName}">
        </div>
        `);
      thumbnailImg.find("img").data("name", imgName);
      container = container.add(thumbnailImg);
    }
    $("#BgImages .images").append(container);
  },
  CreateNewImage(imgName: string) {
    let imgSrc = `${this.BaseImgSrc}${imgName}`;
    let thumbnailImg = $(`
        <div class="col-md-4">
            <img class="img-responsive img-thumbnail" src="${imgSrc}">
        </div>
    `);
    thumbnailImg.find("img").data("name", imgName);
    $("#BgImages .images").append(thumbnailImg);
  },
  HandleAddNewImage() {
    let input = $(
      `<input type='file' accept='image/*' id='uploadImg' class="hidden"/>`
    );
    $(document.body).append(input);
    this.AddImgBtn.click(e => {
      input.click();
    });
    input.change(e => {
      let file = ((<HTMLInputElement>e.target).files as FileList)[0];
      let extension = "." + file.name.split(".").pop();
      let Name = `${Date.now()}${extension}`;
      if (file.type.indexOf("image") == -1) {
        $.notify({
          message: "هذة النوعية من الصور غير مدعومة"
        });
        return;
      }
      this.ImagesData.push(Name);
      let formData = new FormData();
      formData.append("Name", Name);
      formData.append("Value", JSON.stringify(this.ImagesData));
      formData.append("Image", file);
      this.AddImgBtn.pendingState(true, "fa-picture-o");
      $.ajax({
        url: "/Admin/Settings/SaveImage",
        data: formData,
        method: "POST",
        processData: false,
        cache: false,
        contentType: false
      })
        .done(() => {
          $.notify({
            message: "تم حفظ الصورة بنجاح"
          });
          this.CreateNewImage(Name);
        })
        .always(() => {
          this.AddImgBtn.pendingState(false);
        })
        .catch(e => {
          $.notify({
            message: "لم يتم حفظ الصورة,حدثت مشكلة فى السيرفر"
          });
          this.ImagesData.pop();
        });
    });
  },
  HandleDeleteImage() {
    this.DeleteImgBtn.click(e => {
      let imgsName: string[] = [];
      let imgs = $("#BgImages img.selected");
      for (let i = 0; i < imgs.length; i++) {
        imgsName.push(imgs.eq(i).data("name"));
      }
      let oldImagesData = this.ImagesData;
      this.ImagesData = this.ImagesData.filter(name => {
        if (imgsName.indexOf(name) == -1) return name;
      });
      this.DeleteImgBtn.pendingState(true, "fa-remove");
      $.post(this.DeleteImagesUrl, {
        imgsName: imgsName,
        value: JSON.stringify(this.ImagesData)
      })
        .always(() => {
          this.DeleteImgBtn.pendingState(false);
        })
        .done(() => {
          $.notify({
            message: "تمت عملية الحذف بنجاح"
          });
          imgs.fadeOut();
        })
        .catch(e => {
          $.notify({
            message: "لم يتم حذف الصورة,حدثت مشكلة فى السيرفر"
          });
          this.ImagesData = oldImagesData;
        });
    });
  },
  main() {
    this.handleImgSelectable();
    this.GetImagesData().then(d => {
      $(".loading").hide();
      this.CreateImages();
      this.HandleAddNewImage();
      this.HandleDeleteImage();
    });
  }
};
let MembershipSettingOperations = {
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
  FetchMembershipData() {
    $.get(this.FetchMembershipDataUrl).done((data: MembershipModel) => {
      this.NameInp.val(data.name);
      this.TitleInp.val(data.title);
    });
  },
  GetFormEditedData(): MembershipModel {
    return {
      name: this.NameInp.val() as string,
      title: this.TitleInp.val() as string
    };
  },
  HandleOnFormSubmit() {
    this.SaveBtn.click(e => {
      if (this.Form.valid()) {
        let data = this.GetFormEditedData();
        this.SaveBtn.pendingState(true, "fa-send");
        $.post(this.SaveMembershipDataUrl, {
          Name: data.name,
          Title: data.title
        })
          .done(() => {
            $.notify({
              message: "تم تعديل بيانات العضوية بنجاح"
            });
          })
          .always(() => {
            this.SaveBtn.pendingState(false);
          })
          .catch(e => {
            let message =
              e.responseJSON && e.responseJSON.message
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
  main() {
    this.FetchMembershipData();
    this.HandleOnFormSubmit();
  }
};
