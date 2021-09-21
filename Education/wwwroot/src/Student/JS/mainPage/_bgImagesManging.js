"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bgImagesManagers = {
    targetImgElement: $('#imgBg>img:eq(0)'),
    studentStorageObjName: "StudentData",
    studentObjStorage: {
        currentImage: 0
    },
    startHandle: function () {
        this.circulateImageShow();
        this.changeBackgroundImage();
    },
    get isStudentStorageObjFounded() {
        return localStorage.getItem(this.studentStorageObjName) != null;
    },
    circulateImageShow: function () {
        if (!this.isStudentStorageObjFounded)
            this.initalizeLocalStorage();
        else {
            var nextIndex = 0;
            var currentIndex = this.currentStudentStorageObj().currentImage;
            var lastImgIndex = this.bgImages.length - 1;
            if (currentIndex != lastImgIndex)
                nextIndex = currentIndex + 1;
            this.setCurrentImage(nextIndex);
        }
    },
    initalizeLocalStorage: function () {
        var studnetobj = { currentImage: 0 };
        localStorage.setItem(this.studentStorageObjName, JSON.stringify(studnetobj));
    },
    currentStudentStorageObj: function () {
        return JSON.parse(localStorage[this.studentStorageObjName]);
    },
    get bgImages() {
        return [
            "bg2.jpg",
            "bg1.jpg",
            "bg3.jpg",
            "bg4.jpg"
        ];
    },
    bgImagesBasePath: "/images/Student/backgrounds/",
    getImagePath: function (imgName) {
        return "" + this.bgImagesBasePath + imgName;
    },
    setCurrentImage: function (index) {
        this.studentObjStorage.currentImage = index;
        localStorage.setItem(this.studentStorageObjName, JSON.stringify(this.studentObjStorage));
    },
    changeBackgroundImage: function () {
        this.targetImgElement.prop('src', this.getImagePath(this.bgImages[this.studentObjStorage.currentImage]));
    }
};
//# sourceMappingURL=_bgImagesManging.js.map