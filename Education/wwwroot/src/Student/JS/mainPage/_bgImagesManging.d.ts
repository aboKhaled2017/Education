declare type studentLoccalStorage = {
    "currentImage": number;
    "viewVideosAgain"?: boolean;
};
export declare let bgImagesManagers: {
    targetImgElement: JQuery<HTMLElement>;
    studentStorageObjName: string;
    studentObjStorage: {
        currentImage: number;
    };
    startHandle(): void;
    readonly isStudentStorageObjFounded: boolean;
    circulateImageShow(): void;
    initalizeLocalStorage(): void;
    currentStudentStorageObj(): studentLoccalStorage;
    readonly bgImages: string[];
    bgImagesBasePath: string;
    getImagePath(imgName: string): string;
    setCurrentImage(index: number): void;
    changeBackgroundImage(): void;
};
export {};
//# sourceMappingURL=_bgImagesManging.d.ts.map