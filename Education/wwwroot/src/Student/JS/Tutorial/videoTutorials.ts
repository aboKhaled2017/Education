import videojs from '../../../../lib/video/customVideo-js';
import { beforeVideoSetup } from '../../../../lib/video/customVideo-js';
import "../../../../lib/video/videojsPlaylist";
import "../../../../lib/video/videojsPlaylistUi";
import { pageIdentifier } from "../../../global/PageIdentifier";

$(async function () {
    if (pageIdentifier.pagetype != "tutorial") return;
  await  beforeVideoSetup.start();
    var player = videojs("video");
    playerOp.start(player);
});
const playerOp = {
    player: (null as unknown) as videojs.Player,
    videos: [{
        name: "ali saas",
        description: "ahmed samhe lll al777777777777 hwbf",
        duration: 45,
        sources: [
            { src: "/videos/Tutorials/v4.mp4", type: "video/mp4" },
            { src: "/videos/Tutorials/v4.webm", type: "video/webm" }
        ],
        thumbnail: [
            {
                srcset: "/images/videoRight.jpg",
                type: "image/jpeg",
                media: "(min-width:400px)"
            }
        ]
    },
        {
            name: "mohamed waleeeeeeeekkeeed",
            description: "ahmed samhe oooooooooooooohwbf",
            duration: 200,
            sources: [
                { src: "/videos/Tutorials/v3.mp4", type: "video/mp4" },
                { src: "/videos/Tutorials/v3.webm", type: "video/webm" }
            ],
            thumbnail: [
                {
                    srcset: "/images/videoRight.jpg",
                    type: "image/jpeg",
                    media: "(min-width:400px)"
                }
            ]
        },
        {
            name: "mohamed waleeeeeooeeeeeed",
            description: "ahmed samhe oooooooooooooohwbf",
            duration: 3700,
            sources: [
                { src: "/videos/Tutorials/v10.mp4", type: "video/mp4" },
                { src: "/videos/Tutorials/v10.webm", type: "video/webm" }
            ],
            thumbnail: [
                {
                    srcset: "/images/videoRight.jpg",
                    type: "image/jpeg",
                    media: "(min-width:400px)"
                }
            ]
        },
        {
            name: "mohamed waleeeeeeeppeeeed",
            description: "ahmed samhe oooooooooooooohwbf",
            duration: 45,
            sources: [
                { src: "/videos/Tutorials/v7.mp4", type: "video/mp4" },
                { src: "/videos/Tutorials/v7.webm", type: "video/webm" }
            ],
            thumbnail: [
                {
                    srcset: "/images/videoRight.jpg",
                    type: "image/jpeg",
                    media: "(min-width:400px)"
                }
            ]
        }] as videojs.videoItem[],
    VideosPlayList: [
        {
            name: "mohamed khaled",
            description: "ahmed mohamed 555555f hfbhew fb hbf hwbf",
            sources: [
                { src: "/videos/Tutorials/v1.mp4", type: "video/mp4" },
                { src: "/videos/Tutorials/v1.webm", type: "video/webm" }
            ],
            thumbnail: [
                {
                    srcset: "/images/videoLeft.jpg",
                    type: "image/jpeg",
                    media: "(min-width:400px)"
                }
            ]
        },
        {
            name: "mohamed ali",
            description: "ahmed samhe hhhh ali any 6666666666 fb hbf hwbf",
            duration: 45,
            sources: [
                { src: "/videos/Tutorials/v2.mp4", type: "video/mp4" },
                { src: "/videos/Tutorials/v2.webm", type: "video/webm" }
            ],
            thumbnail: [
                {
                    srcset: "/images/videoLeft.jpg",
                    type: "image/jpeg",
                    media: "(min-width:400px)"
                }
            ]
        },

    ] as videojs.videoItem[],
    loadMoreVideosBtn: $('#loadMoreVideos'),
    handleLoadMoreVideos() {
        playerOp.loadMoreVideosBtn.click(function () {
            $(this).pendingState(true, " ");
            playerOp.VideosPlayList.push(...playerOp.videos);
            playerOp.player.playlist(playerOp.VideosPlayList);
        });
    },
    loadPlayerVideos() {
        playerOp.player.playlist(playerOp.VideosPlayList);
    },
    start(player: videojs.Player) {
        this.player = player;
        playerOp.loadPlayerVideos();
        this.handleLoadMoreVideos();
        player.playlistUi();
    }
};
