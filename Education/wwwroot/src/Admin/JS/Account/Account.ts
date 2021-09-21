/// <reference path="../../../global/declaration.d.ts"/>
import '../../../global/setting';
import '../../../global/helperDome';
import '../../Assests/BootstrapComponents/bootstrapNotify';
import { Routes } from '../../../global/Routes';
import { messages } from '../../../global/messages';
const changeNameOperation = {
    UpdateNameForm: $('#UpdateNameForm'),
    get NameSubmitBtn() {
        return this.UpdateNameForm.find('#NameSubmitBtn');
    },
    get NameInput() {
        return this.UpdateNameForm.find('#Name');
    },
    HandleOnNameUpdate() {
        this.UpdateNameForm.submit(e => {
            e.preventDefault();
            let SubmitBtn = this.NameSubmitBtn;
            let Name = (this.NameInput.val() as string).trim();;
            if (this.NameInput.valid()) {
                $.ajax({
                    url: Routes.makeUrlQuery(Routes.UpdateAccountName, { prop: "Name", val: Name }),
                    method: 'PUT',
                    beforeSend() {
                        SubmitBtn.pendingState(true, "fa-send");
                    }
                })
                    .always(() => {
                        SubmitBtn.pendingState(false);
                    })
                    .done(data => {
                        $.notify({
                            message: "تم تغيير الاسم بنجاح"
                        }, {
                                type: 'success',
                                timer: 4000
                            });
                    })
            }
        });
    },
}
const changeAccountOperation = {
    UpdateAccountForm: $('#UpdateAccountForm'),
    get AccountSubmitBtn() {
        return this.UpdateAccountForm.find('#accountSaveBtn');
    },
    get userNameInput() {
        return this.UpdateAccountForm.find('#UserName');
    },
    get passwordInput() {
        return this.UpdateAccountForm.find('#password');
    },
    confiremMessage: messages.changeAccountAlertion,
    submitForm(UserName: string, Password: string, SubmitBtn: JQuery) {
        $.ajax({
            url: Routes.UpdateAccount,
            method: 'POST',
            data: JSON.stringify({ UserName: UserName, Password: Password }),
            beforeSend() {
                SubmitBtn.pendingState(true, "fa-send");
            }
        })
            .always(() => {
                SubmitBtn.pendingState(false);
            })
            .done(data => {
                $.notify({
                    message: messages.redirectNotifing,
                }, {
                        onClose() {
                            location.href = Routes.adminArea;
                        }
                    },
                )
            })
    },
    HandleOnAccountUpadate() {
        this.passwordInput.addPasswordShow();
        this.UpdateAccountForm.submit(e => {
            e.preventDefault();
            let SubmitBtn = this.AccountSubmitBtn;
            if (this.userNameInput.valid() && this.passwordInput.valid()) {
                let UserName = (this.userNameInput.val() as string).trim();
                let Password = (this.passwordInput.val() as string).trim();

                $.confirmNotify(this.confiremMessage, (isConfirmed) => {
                    if (isConfirmed) this.submitForm(UserName, Password, SubmitBtn);
                });

            }
        });
    },
}
changeNameOperation.HandleOnNameUpdate();
changeAccountOperation.HandleOnAccountUpadate();
