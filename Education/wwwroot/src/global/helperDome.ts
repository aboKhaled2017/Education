/// <reference path="./declaration.d.ts" />
import "../Admin/Assests/BootstrapComponents/bootstrapNotify";
(function() {
  $.fn.pendingState = function(
    isPending: boolean,
    removedClass?: string,
    animatingClass?: string
  ) {
    if (!animatingClass) animatingClass = "fa-spinner fa-spin";
    if (removedClass) this.data("class", removedClass);
    else removedClass = this.data("class") as string;
    this.toggleClass("disabled").toggleAttr("disabled");
    if (isPending) {
      this.find("i")
        .removeClass(removedClass)
        .addClass(animatingClass);
    } else {
      this.find("i")
        .addClass(removedClass)
        .removeClass(animatingClass);
    }
    return this;
  };
  $.fn.switchPendingState = function(
    isPending: boolean,
    removedClass?: string,
    animatingClass?: string
  ) {
    if (!animatingClass) animatingClass = "fa-spinner fa-spin";
    if (removedClass) this.data("class", removedClass);
    else removedClass = this.data("class") as string;
    this.toggleClass("disabled").toggleAttr("disabled");
    if (isPending) {
      this.removeClass(removedClass).addClass(animatingClass);
    } else {
      this.addClass(removedClass).removeClass(animatingClass);
    }
    return this;
  };
  $.confirmNotify = (function() {
    let confirmTemplate = `
            <div data-notify="container" 
                class="col-xs-11 col-sm-4 alert alert-info alert-with-icon animated fadeInDown bootstrapNotify"
                role="alert" data-notify-position="top-center">
                <button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>
                <span data-notify="icon" class="pe-7s-check"></span>
                <span data-notify="title"></span> 
                <span data-notify="message"></span>
                <span class="text-center confirmControls">
                <button  class="btn btn-primary btn-sm">
                    <i class="fa fa-check"></i>
                    تأكيد
                </button>
                <button class="btn btn-danger btn-sm">
                    <i class="fa fa-close"></i>
                    الغاء
                </button>
                </span>
                <a href="#" target="_blank" data-notify="url"></a>
            </div>`;
    return (
      message: string,
      onConfirm: (isConfirmed: boolean) => void
    ): void => {
      let template = $(confirmTemplate);
      let controlsbtn = template.find(".confirmControls button");
      controlsbtn
        .eq(0)
        .data("result", true)
        .end()
        .eq(1)
        .data("result", false);
      template.find('span[data-notify="message"]').text(message);

      controlsbtn.click(function() {
        confirm.close(false);
        onConfirm($(this).data("result"));
      });
      var confirm = $.notify(
        {},
        {
          template: template,
          onClose(doAnyAction: boolean = true) {
            if (doAnyAction) onConfirm(false);
          },
          timer: 400000
        }
      ) as notifyObject;
    };
  })();
  $.fn.addPasswordShow = function() {
    const passwordInp = $(this);
    if (passwordInp.attr("type") != "password") return passwordInp;
    const eyeIcon = $('<i class="fa fa-eye fa-lg"></i>');
    passwordInp.after(eyeIcon);
    let topOffset: number =
      (passwordInp.outerHeight() as number) -
      (passwordInp.height() as number) / 2;
    eyeIcon
      .css({
        position: "absolute",
        left: "1%",
        top: `calc(100% - ${topOffset}px)`,
        color: "#337ab7",
        cursor: "pointer"
      })
      .parent()
      .css({
        position: "relative"
      })
      .end()
      .click(() => {
        passwordInp.attr("type") == "password"
          ? passwordInp.attr("type", "text")
          : passwordInp.attr("type", "password");
      });
    return passwordInp;
  };
  $.fn.ajaxSubmit = function(
    url: string,
      method: string,
      IsStringFiable: boolean=true,
    complete: (def: JQuery.jqXHR, model: { [key: string]: any }) => void,
    beforeSend: () => void
  ) {
    let objectData: { [key: string]: any } = {};

    if (!$(this).valid()) return false;
    $(this)
      .find("input")
      .each(function(i, inp) {
        var input = $(inp);
        var value: any = (input.val() as string).trim();
          if (value === "true" || value == "false")
              value = (value == "true")
                  ? true
                  : value=="false"?false:value;
        objectData[input.attr("name") as string] = value;
      });
    complete(
      $.ajax({
            url: url,
            data: IsStringFiable ? JSON.stringify(objectData) : objectData,
        method: method,
        beforeSend() {
          beforeSend();
        }
      }),
      objectData
    );
    return this;
  };
  $.fn.resetPassword = function() {
    this.find('input[type="password"]').val("");
    return this;
  };
  $.fn.toggleAttr = function(attr: string) {
    this.prop(attr) ? this.removeAttr(attr) : this.prop(attr, attr);
    return this;
  };
  $.fn.formAlert = function(): JQuery<HTMLElement> {
    var formAlert = this.find(".formAlert")
      .eq(0)
      .fadeToggle();
    this.find("input").focus(() => {
      formAlert.fadeOut();
    });
    return formAlert;
    };
  $.notifyCatch = function (model: any): notifyObject | null {
        let message = "لم يتم تنفيذ العملية ,لوجودمشكلة فى الخادم,حاول مرة اخرى";
        let notifyMessage = model && model.message ? model.message : message;
        return $.notify({ message: notifyMessage, title: "لقد فشلت العملية" });
    }
  $.UploadImage = function (BtnHandler: JQuery, OnGotImgFile: (file: File, ext: string) => void): void{
        let btnContext: JQuery;
        let input = $(
            `<input type='file' accept='image/*' id='uploadImg' class="hidden"/>`
        );
        $(document.body).append(input);
        BtnHandler.click(function (e) {
            input.click();
            btnContext = $(e.target).parents('.CourseCardTemplate:eq(0)');
        });
        input.change(e => {
            let file = ((<HTMLInputElement>e.target).files as FileList)[0];
            let extension = "." + file.name.split(".").pop();           
            if (file.type.indexOf("image") == -1) {
                $.notify({
                    message: "هذة النوعية من الصور غير مدعومة"
                });
                return;
            }
            OnGotImgFile.bind(btnContext)(file, extension);
         });          
    }
    $.fn.ShownOnlyIfChecked = function (TargetCheckedInput: JQuery<HTMLInputElement>): JQuery{
        TargetCheckedInput.is(':checked')
            ? this.show().parents('.form-group:eq(0)').show()
            : this.hide().parents('.form-group:eq(0)').hide();
        TargetCheckedInput.change(() => {
            this.toggle().parents('.form-group:eq(0)').toggle();
        })
        return this;
    }
    
})();
