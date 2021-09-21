import { VideoTutorial, VideoFormData_Edit } from '../Shared/Interfaces';
export declare let CourseVideosTableOper: {
    VideosData: VideoTutorial[];
    HandleDataTableLoading(): void;
    HideSliblingTrHasEditing(tr: JQuery<HTMLElement>): void;
    ReconfigureVideoJsForColumn(id: number): void;
    HandleControlsBtns(): void;
    UpdateVideoRecord(record: VideoTutorial, newdata: VideoFormData_Edit): VideoTutorial;
    Main(): Promise<void>;
};
//# sourceMappingURL=_CourseVideosTable.d.ts.map