import videojs from "video.js";
export const beforeVideoSetup ={
    gettingLangData: null,
    initializeVideoGlobalVariables() {
        window["vidGlobVars"] = {};
        window["vidGlobVars"]["arLang"] = null;
    },
   async loadVideoLangData(afterFinish:()=>void) {
       this.gettingLangData =await $.getJSON("/lib/video/ar.json").done(data => {
           window["vidGlobVars"]["arLang"] = data;
           afterFinish();
       });
    },
    beforePlayerCreated() {
        videojs.hook("setup", function (player: videojs.Player) {
            if (window["vidGlobVars"]["arLang"]) {
                videojs.addLanguage("ar", window["vidGlobVars"]["arLang"]);
                player.language("ar");
            } else {
                (beforeVideoSetup.gettingLangData as JQuery.jqXHR<any>).always(data => {
                    videojs.addLanguage("ar", window["vidGlobVars"]["arLang"]);
                    player.language("ar");
                });
            }
      });
    },
   async start() {
      this.initializeVideoGlobalVariables();
       await this.loadVideoLangData(() => {
            this.beforePlayerCreated();
        }); 
    }
}
export default videojs;
var icon = "vjs-icon-chapters";
const vjsAddittionUI = {
  videosContainer: $("#videosContainer"),
  player: (null as unknown) as videojs.Player,
  addVjsIconToggleDetails() {},
  addDescriptionUi() {
    var descriptionEl = document.createElement("div");
    var $descriptionEl = $(descriptionEl);
    $descriptionEl.prop("class", "subPlayerSection");
    $descriptionEl.append(`<p id="descEl"></p>`);
    $(this.player.el()).append(descriptionEl);
  },
  addNewUIFunctionalities() {
    vjsAddittionUI.addVjsIconToggleDetails();
    vjsAddittionUI.addDescriptionUi();
  },
  startHandlingForPlayer(_player: videojs.Player) {
    this.player = _player;
  }
};
