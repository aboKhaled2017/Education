import { requestStatus } from "../../../global/functionality";
export const EditAccountHandlingObject = {
  EditAccountForm: $("#EditAccountForm"),
  get SubmitBtn() {
    return this.EditAccountForm.find("#AccountSubmitBtn") as JQuery;
  },
  changeUserName(newName: string) {
    $("#userNameElement").text(newName);
  },
  start() {
    EditAccountHandlingObject.SubmitBtn.click(() => {
      if (EditAccountHandlingObject.EditAccountForm.valid()) {
        this.EditAccountForm.ajaxSubmit(
          "/Profile/editAccount",
          "POST",
          (Def, model) => {
            Def.done(data => {
              this.changeUserName(model["fname"]);
              $.notify({
                message: data
              });
            })
              .always(() => {
                this.SubmitBtn.pendingState(false);
              })
              .catch(e => {
                $.notify({
                  message: e.responseText
                });
              });
          },
          //before send
          () => {
            this.SubmitBtn.pendingState(true, "fa-edit");
          }
        );
      }
    });
  }
};
export const EditPasswordHandlingObject = {
  EditPasswordForm: $("#EditPasswordForm"),
  get SubmitBtn() {
    return this.EditPasswordForm.find("#PasswordSubmitBtn");
  },
  start() {
    EditPasswordHandlingObject.SubmitBtn.click(() => {
      if (EditPasswordHandlingObject.EditPasswordForm.valid()) {
        this.EditPasswordForm.ajaxSubmit(
          "/Profile/ChangePassword",
          "POST",
          (Def, model) => {
            Def.done(data => {
              $.notify({
                message: data
              });
            })
              .always(() => {
                this.SubmitBtn.pendingState(false);
              })
              .catch(e => {
                if (e.status == requestStatus.NotFound)
                  this.EditPasswordForm.resetPassword()
                    .formAlert()
                    .text(e.responseText)
                    .end();
                $.notify({
                  message: e.responseText
                });
              });
          },
          //before send
          () => {
            this.SubmitBtn.pendingState(true, "fa-edit");
          }
        );
      }
    });
  }
};
export const EditMembershipHandlingObject = {
  membershipAccountSection: $("#membershipAccount"),
  MembershipForm: $("#MembershipForm"),
  get SubmitRegisBtn() {
    var btn = this.MembershipForm.find("#MemshipRegistBtn");
    btn.data("icon", "fa-user-circle");
    return btn;
  },
  get SubmitEditBtn() {
    var btn = this.MembershipForm.find("#MemshipEditBtn");
    btn.data("icon", "fa-user-circle");
    return btn;
  },
  get SubmitBtn() {
    return this.isMembershipRegistered
      ? this.SubmitEditBtn
      : this.SubmitRegisBtn;
  },
  get isMembershipRegistered(): boolean {
    return this.MembershipForm.data("isregistered") == "True";
  },
  formUrl() {
    return this.isMembershipRegistered
      ? "/Profile/Membership?type=edit"
      : "/Profile/Membership?type=register";
  },
  get formMemberSection() {
    return this.membershipAccountSection.find(".member");
  },
  get formNotMemberSection() {
    return this.membershipAccountSection.find(".notMember");
  },
  toggleFormAction() {
    this.formMemberSection.toggle();
    this.formNotMemberSection.toggle();
  },
  start() {
    var context = this;
    EditMembershipHandlingObject.SubmitBtn.click(() => {
      if (EditMembershipHandlingObject.MembershipForm.valid()) {
        this.MembershipForm.ajaxSubmit(
          this.formUrl(),
          "POST",
          (Def, model) => {
            Def.done(data => {
              $.notify(
                {
                  message: data
                },
                {
                  onClose() {
                    if (!context.isMembershipRegistered) {
                      context.toggleFormAction();
                      context.MembershipForm.data("isregistered", "True");
                    }
                  }
                }
              );
            })
              .always(() => {
                this.SubmitBtn.pendingState(false);
              })
              .catch(e => {
                $.notify({
                  message: e.responseText
                });
              });
          },
          //before send
          () => {
            this.SubmitBtn.pendingState(true, this.SubmitBtn.data("icon"));
          }
        );
      }
    });
  }
};
