
let pageType: "home" | "profile" | "tutorial" | "admin_home" | "admin_profile";
export let pageIdentifier = {
    pagetype: pageType,
    start() {
        this.pagetype = $('body').data('page');
    }
};
pageIdentifier.start();
