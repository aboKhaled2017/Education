export const RegisterHandlingObject = {
  RegisterForm: $("#internalRegisterForm"),
  get formAlertEl() {
    return RegisterHandlingObject.RegisterForm.find(".formAlert");
  },
  submitBtn: $("#registerSubmitBtn"),
  HandleFormSubmit() {
    RegisterHandlingObject.submitBtn.click(e => {
      if (RegisterHandlingObject.RegisterForm.valid()) {
        RegisterHandlingObject.RegisterForm.ajaxSubmit(
          "/Register",
          "POST",
          (defAjax, model) => {
            defAjax
              .done(data => {
                location.href = data;
              })
              .catch(data => {
                RegisterHandlingObject.formAlertEl
                  .text(data.responseText)
                  .fadeIn();
              })
              .always(() => {
                RegisterHandlingObject.submitBtn.pendingState(false);
              });
          },
          () => {
            RegisterHandlingObject.submitBtn.pendingState(true, "fa-send");
          }
        );
      }
    });
  },
  HandleInputOperations() {
    RegisterHandlingObject.RegisterForm.find("input").keyup(() => {
      RegisterHandlingObject.formAlertEl.fadeOut();
    });
  },
  start() {
    this.HandleFormSubmit();
    this.HandleInputOperations();
  }
};
export const LoginHandlingObject = {
  LoginForm: $("#internalLoginForm"),
  get formAlertEl() {
    return LoginHandlingObject.LoginForm.find(".formAlert");
  },
  submitBtn: $("#loginSubmitBtn"),
  HandleFormSubmit() {
    LoginHandlingObject.submitBtn.click(e => {
      if (LoginHandlingObject.LoginForm.valid()) {
        LoginHandlingObject.LoginForm.ajaxSubmit(
          "/Login",
          "POST",
          (defAjax, model) => {
            defAjax
              .done(data => {
                location.href = data;
              })
              .catch(data => {
                LoginHandlingObject.formAlertEl
                  .text(data.responseText)
                  .fadeIn();
              })
              .always(() => {
                LoginHandlingObject.submitBtn.pendingState(false);
              });
          },
          () => {
            LoginHandlingObject.submitBtn.pendingState(true, "fa-send");
          }
        );
      }
    });
  },
  HandleInputOperations() {
    LoginHandlingObject.LoginForm.find("input").keyup(() => {
      LoginHandlingObject.formAlertEl.fadeOut();
    });
  },
  start() {
    this.HandleFormSubmit();
    this.HandleInputOperations();
  }
};
