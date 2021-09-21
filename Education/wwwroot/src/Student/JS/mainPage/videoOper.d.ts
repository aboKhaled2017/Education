/// <reference types="video.js" />
import videojs from '../../../../lib/video/customVideo-js';
export declare const videoStarter: () => {
    firstPlayerVideo: HTMLElement | null;
    secondPlayerVideo: HTMLElement | null;
    readonly secondPlayer: videojs.Player;
    firstPlayer(): videojs.Player;
    start(): Promise<void>;
};
//# sourceMappingURL=videoOper.d.ts.map