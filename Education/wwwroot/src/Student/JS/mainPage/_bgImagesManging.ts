type studentLoccalStorage = {
    "currentImage": number,
    "viewVideosAgain"?: boolean
}
export let bgImagesManagers = {
    targetImgElement: $('#imgBg>img:eq(0)'),
    studentStorageObjName: "StudentData",
    studentObjStorage: {
        currentImage: 0
    },
    startHandle() {
        this.circulateImageShow();
        this.changeBackgroundImage();
    },
    get isStudentStorageObjFounded(): boolean {
        return localStorage.getItem(this.studentStorageObjName) != null;
    },
    circulateImageShow() {
        if (!this.isStudentStorageObjFounded) this.initalizeLocalStorage();
        else {
            let nextIndex = 0;
            let currentIndex = this.currentStudentStorageObj().currentImage;
            let lastImgIndex = this.bgImages.length - 1;
            if (currentIndex != lastImgIndex)
                nextIndex = currentIndex + 1;
            this.setCurrentImage(nextIndex);
        }
    },
    initalizeLocalStorage() {
        let studnetobj: studentLoccalStorage = { currentImage: 0 };
        localStorage.setItem(this.studentStorageObjName, JSON.stringify(studnetobj));
    },
    currentStudentStorageObj(): studentLoccalStorage {
        return JSON.parse(localStorage[this.studentStorageObjName]);
    },
    get bgImages(): string[] {
        return [
            "bg2.jpg",
            "bg1.jpg",
            "bg3.jpg",
            "bg4.jpg"
        ];
    },
    bgImagesBasePath: "/images/Student/backgrounds/",
    getImagePath(imgName: string) {
        return `${this.bgImagesBasePath}${imgName}`
    },
    setCurrentImage(index: number) {
        this.studentObjStorage.currentImage = index;
        localStorage.setItem(this.studentStorageObjName, JSON.stringify(this.studentObjStorage));
    },
    changeBackgroundImage() {
        this.targetImgElement.prop('src', this.getImagePath(this.bgImages[this.studentObjStorage.currentImage]));
    }
}