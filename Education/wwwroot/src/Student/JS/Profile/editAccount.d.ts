export declare const EditAccountHandlingObject: {
    EditAccountForm: JQuery<HTMLElement>;
    readonly SubmitBtn: JQuery<HTMLElement>;
    changeUserName(newName: string): void;
    start(): void;
};
export declare const EditPasswordHandlingObject: {
    EditPasswordForm: JQuery<HTMLElement>;
    readonly SubmitBtn: JQuery<HTMLElement>;
    start(): void;
};
export declare const EditMembershipHandlingObject: {
    membershipAccountSection: JQuery<HTMLElement>;
    MembershipForm: JQuery<HTMLElement>;
    readonly SubmitRegisBtn: JQuery<HTMLElement>;
    readonly SubmitEditBtn: JQuery<HTMLElement>;
    readonly SubmitBtn: JQuery<HTMLElement>;
    readonly isMembershipRegistered: boolean;
    formUrl(): "/Profile/Membership?type=edit" | "/Profile/Membership?type=register";
    readonly formMemberSection: JQuery<HTMLElement>;
    readonly formNotMemberSection: JQuery<HTMLElement>;
    toggleFormAction(): void;
    start(): void;
};
//# sourceMappingURL=editAccount.d.ts.map