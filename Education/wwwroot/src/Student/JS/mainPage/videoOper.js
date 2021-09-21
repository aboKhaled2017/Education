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
/*this object construct videos and loading thier data */
exports.videoStarter = function () {
    return {
        firstPlayerVideo: document.getElementById("guidalVideo"),
        secondPlayerVideo: document.getElementById("educationVideo"),
        get secondPlayer() {
            return customVideo_js_1.default(this.secondPlayerVideo, {
                controlBar: { volumePanel: { inline: false } },
                notSupportedMessage: "please support Javascript in browser",
                // height: 234,
                preload: "false"
            });
        },
        firstPlayer: function () {
            var firstPlayer = customVideo_js_1.default(this.firstPlayerVideo, {
                controlBar: { volumePanel: { inline: false } },
                notSupportedMessage: "please support Javascript in browser",
                //  height: 234,
                preload: "auto"
            }, function () {
                var _this = this;
                //on ready
                firstPlayer.play()
                    .then(function () {
                    firstPlayer.one("ended", function (e) {
                        _this.play();
                    });
                })
                    .catch(function (e) {
                    firstPlayer.play();
                });
            }.bind(this.secondPlayer));
            return firstPlayer;
        },
        start: function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, customVideo_js_2.beforeVideoSetup.start()];
                        case 1:
                            _a.sent();
                            this.firstPlayer();
                            handleVideosOperationAfterCreated().start();
                            return [2 /*return*/];
                    }
                });
            });
        }
    };
};
/*this object make our modifications for videos*/
var handleVideosOperationAfterCreated = function () {
    return {
        videoJsElements: document.querySelectorAll("video-js"),
        start: function () {
            this.handleVideoOpacity();
            this.createFluidButton();
            this.addingVideoFluidButtons();
            this.bigButtonShowAndHide.call(this.videoJsElements);
        },
        initalizeVideo: function (video) {
            var vidEl = $(video.el());
            vidEl.data("parent", vidEl.parent());
        },
        toggleFluid: function () { },
        sourceOfFluidVidoe: null,
        destinationOfFluidVideo: $("#fluidPlayer"),
        createFluidButton: function () {
            var that = this;
            var btnFluidComponent = customVideo_js_1.default.getComponent("Button");
            var btnFluid = customVideo_js_1.default["extend"](btnFluidComponent, {
                constructor: function () {
                    btnFluidComponent.apply(this, arguments);
                },
                handleClick: function () {
                    var videoPlayer = this.player();
                    var isFluid = videoPlayer["fluid_"];
                    if (isFluid) {
                        videoPlayer.fluid(false);
                        var videoEl = $(videoPlayer.el()).remove();
                        that.sourceOfFluidVidoe.append(videoEl);
                        that.destinationOfFluidVideo.hide();
                    }
                    else {
                        videoPlayer.fluid(true);
                        var videoEl = $(this.player().el());
                        that.sourceOfFluidVidoe = videoEl.parent();
                        that.destinationOfFluidVideo.append(videoEl.remove()).show();
                    }
                },
                buildCssClass: function () {
                    return "class1 class2";
                },
                createControlTextEl: function (button) {
                    return $(button).html("<i class='fa fa-random'></i>");
                }
            });
            customVideo_js_1.default.registerComponent("btnFluid", btnFluid);
        },
        bigButtonShowAndHide: function () {
            $(this)
                .find("video")
                .on({
                pause: function () {
                    $(this)
                        .parent("video-js")
                        .find(".vjs-big-play-button")
                        .show();
                },
                play: function () {
                    $(this)
                        .parent("video-js")
                        .find(".vjs-big-play-button")
                        .hide();
                }
            });
        },
        addingVideoFluidButtons: function () {
            for (var _i = 0, _a = Object.values(customVideo_js_1.default.getPlayers()); _i < _a.length; _i++) {
                var player = _a[_i];
                this.initalizeVideo(player);
                player.controlBar.addChild("btnFluid", {
                    tabIndex: 3
                });
                var seekBtn = player.controlBar.getChild("SeekToLive");
                player.controlBar.removeChild(seekBtn);
            }
        },
        handleVideoOpacity: function () {
            $(".video-player").on({
                mouseenter: function () {
                    $(this).css("opacity", "1");
                },
                mouseleave: function (e) {
                    var video = this.querySelector("video");
                    if (video.paused || video.ended) {
                        $(this).css("opacity", ".7");
                    }
                }
            });
        }
    };
};
//# sourceMappingURL=videoOper.js.map