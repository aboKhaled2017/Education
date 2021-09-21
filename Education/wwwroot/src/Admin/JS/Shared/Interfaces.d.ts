export interface Category {
    id: string;
    name: string;
    isEnabled: boolean;
    subs: number;
}
export interface CategoryListItem {
    id: string;
    superId: string | null;
    name: string;
    subs: string[];
}
export interface Course {
    id: string;
    name: string;
    description: string;
    isOpened: boolean;
    costOfCourse: number | null;
    period: string | null;
    categoryId: string;
    categoryName: string;
    backgroundImgSrc: string;
    startDateOfBegin: string | null;
    videosCount: number;
}
export interface ICourse {
    Id: string;
    Name: string;
    Description: string;
    IsOpened: boolean;
    CostOfCourse: number | null;
    Period: string | null;
    CategoryId: string;
    CategoryName: string;
    BackgroundImgSrc: string;
    StartDateOfBegin: string | null;
    VideosCount: number;
}
export interface VideoTutorial {
    id: string;
    title: string;
    description: string;
    number: number;
    url: string;
    date: string;
    isYoutube: boolean;
    duration: number;
}
export interface VideoFormData {
    CourseId: string;
    Title: string;
    Description: string;
    VideoNumber: number;
    IsYoutube: boolean;
    Video?: File | null;
    Url?: string | null;
}
export interface VideoFormData_Edit {
    Id_Edit: string;
    CourseId_Edit: string;
    IsVideoChanged: boolean;
    Title_Edit: string;
    Description_Edit: string;
    VideoNumber_Edit: number;
    IsYoutube_Edit: boolean;
    Video_Edit?: File | null;
    Url_Edit?: string | null;
    Duration: number;
}
//# sourceMappingURL=Interfaces.d.ts.map