export let categoriesTopBar = {
    trackWrapper: $('.tracks-wrapper'),
    get tracks() {
        return this.trackWrapper.find('>ul>li.track:not(.disabled):not(.superCategory)');
    },
    handleOnTrackClicked() {
        this.tracks.click(function () {
            $(this).toggleClass('active').siblings('.active').toggleClass('active');
        });
    },
    start() {
        if (!this.trackWrapper) return false;
        this.handleOnTrackClicked();
    }
}