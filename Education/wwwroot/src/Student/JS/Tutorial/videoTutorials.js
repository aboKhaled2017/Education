"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var customVideo_js_1 = __importDefault(require("../../../../lib/video/customVideo-js"));
var customVideo_js_2 = require("../../../../lib/video/customVideo-js");
require("../../../../lib/video/videojsPlaylist");
require("../../../../lib/video/videojsPlaylistUi");
var PageIdentifier_1 = require("../../../global/PageIdentifier");
$(function () {
    return __awaiter(this, void 0, void 0, function () {
        var player;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (PageIdentifier_1.pageIdentifier.pagetype != "tutorial")
                        return [2 /*return*/];
                    return [4 /*yield*/, customVideo_js_2.beforeVideoSetup.start()];
                case 1:
                    _a.sent();
                    player = customVideo_js_1.default("video");
                    playerOp.start(player);
                    return [2 /*return*/];
            }
        });
    });
});
var playerOp = {
    player: null,
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
        }],
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
    ],
    loadMoreVideosBtn: $('#loadMoreVideos'),
    handleLoadMoreVideos: function () {
        playerOp.loadMoreVideosBtn.click(function () {
            var _a;
            $(this).pendingState(true, " ");
            (_a = playerOp.VideosPlayList).push.apply(_a, playerOp.videos);
            playerOp.player.playlist(playerOp.VideosPlayList);
        });
    },
    loadPlayerVideos: function () {
        playerOp.player.playlist(playerOp.VideosPlayList);
    },
    start: function (player) {
        this.player = player;
        playerOp.loadPlayerVideos();
        this.handleLoadMoreVideos();
        player.playlistUi();
    }
};
//# sourceMappingURL=videoTutorials.js.map