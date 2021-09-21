import videojs from '../../../../lib/video/customVideo-js';
import { beforeVideoSetup } from '../../../../lib/video/customVideo-js';
/*this object construct videos and loading thier data */
export const videoStarter = () => {
  return {
    firstPlayerVideo: document.getElementById("guidalVideo"),
    secondPlayerVideo: document.getElementById("educationVideo"),
    get secondPlayer() {
      return videojs(this.secondPlayerVideo, {
        controlBar: { volumePanel: { inline: false } },
        notSupportedMessage: "please support Javascript in browser",
        // height: 234,
        preload: "false"
      });
    },
    firstPlayer() {
      var firstPlayer = videojs(
        this.firstPlayerVideo,
        {
          controlBar: { volumePanel: { inline: false } },
          notSupportedMessage: "please support Javascript in browser",
          //  height: 234,
          preload: "auto"
        },
        function() {
          //on ready
          (firstPlayer.play() as Promise<void>)
            .then(() => {
              firstPlayer.one("ended", e => {
                this.play();
              });
            })
            .catch(e => {
              firstPlayer.play();
            });
        }.bind(this.secondPlayer)
      );
      return firstPlayer;
    },
     async start() {
         await beforeVideoSetup.start();
      this.firstPlayer();
      handleVideosOperationAfterCreated().start();
    }
  };
};
/*this object make our modifications for videos*/
const handleVideosOperationAfterCreated = () => {
  return {
    videoJsElements: document.querySelectorAll("video-js"),
    start() {
      this.handleVideoOpacity();
      this.createFluidButton();
      this.addingVideoFluidButtons();
      this.bigButtonShowAndHide.call(this.videoJsElements);
    },  
    initalizeVideo: function(video: videojs.Player) {
      let vidEl = $(video.el());
      vidEl.data("parent", vidEl.parent());
    },
    toggleFluid: function() {},
    sourceOfFluidVidoe: null,
    destinationOfFluidVideo: $("#fluidPlayer") as JQuery<Element>,
    createFluidButton: function() {
      let that = this;
      var btnFluidComponent = videojs.getComponent("Button");
      var btnFluid = videojs["extend"](btnFluidComponent, {
        constructor: function() {
          btnFluidComponent.apply(this, arguments as any);
        },
        handleClick: function() {
          let videoPlayer = (this as videojs.Component).player();
          let isFluid = videoPlayer["fluid_"];
          if (isFluid) {
            videoPlayer.fluid(false);
            let videoEl = $(videoPlayer.el()).remove();
            that.sourceOfFluidVidoe.append(videoEl);
            that.destinationOfFluidVideo.hide();
          } else {
            videoPlayer.fluid(true);
            let videoEl = $((this as videojs.Component).player().el());
            that.sourceOfFluidVidoe = videoEl.parent();
            that.destinationOfFluidVideo.append(videoEl.remove()).show();
          }
        },
        buildCssClass: function() {
          return "class1 class2";
        },
        createControlTextEl: function(button) {
          return $(button).html("<i class='fa fa-random'></i>");
        }
      });
      videojs.registerComponent("btnFluid", btnFluid);
    },
    bigButtonShowAndHide: function() {
      $(this)
        .find("video")
        .on({
          pause: function() {
            $(this)
              .parent("video-js")
              .find(".vjs-big-play-button")
              .show();
          },
          play: function() {
            $(this)
              .parent("video-js")
              .find(".vjs-big-play-button")
              .hide();
          }
        });
    },
    addingVideoFluidButtons: function() {
      for (let player of Object.values(videojs.getPlayers())) {
        this.initalizeVideo(player);
        player.controlBar.addChild("btnFluid", {
          tabIndex: 3
        });
        let seekBtn = player.controlBar.getChild(
          "SeekToLive"
        ) as videojs.Component;
        player.controlBar.removeChild(seekBtn);
      }
    },
    handleVideoOpacity: function() {
      $(".video-player").on({
        mouseenter: function() {
          $(this).css("opacity", "1");
        },
        mouseleave: function(e) {
          let video = this.querySelector("video") as HTMLVideoElement;
          if (video.paused || video.ended) {
            $(this).css("opacity", ".7");
          }
        }
      });
    }
  };
};
