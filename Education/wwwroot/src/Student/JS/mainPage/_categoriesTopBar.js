"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriesTopBar = {
    trackWrapper: $('.tracks-wrapper'),
    get tracks() {
        return this.trackWrapper.find('>ul>li.track:not(.disabled):not(.superCategory)');
    },
    handleOnTrackClicked: function () {
        this.tracks.click(function () {
            $(this).toggleClass('active').siblings('.active').toggleClass('active');
        });
    },
    start: function () {
        if (!this.trackWrapper)
            return false;
        this.handleOnTrackClicked();
    }
};
//# sourceMappingURL=_categoriesTopBar.js.map