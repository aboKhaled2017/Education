import { videoStarter } from "./videoOper";
import { categoriesTopBar } from "./_categoriesTopBar";
import {
  LoginHandlingObject,
  RegisterHandlingObject
} from "./_registerLoginOper";
import { bgImagesManagers } from "./_bgImagesManging";
import { pageIdentifier } from "../../../global/PageIdentifier";
 
$(function () {
    if (pageIdentifier.pagetype != "home") return;
  /*this object habdle the mainSlider operations */
  const handleSideBarOperations = () => {
    return {
      toogleOpenButton: $(".sidebar .nav li.toggleOpen"),
      sideBar: $(".sidebar") as JQuery<Element>,
      mainPanel: $(".main-panel"),
      start: function() {
        this.toogleOpenButton.click(() => {
          this.sideBar.toggleClass("closedSideBar");
          this.toogleOpenButton
            .toggleClass("open")
            .find("i")
            .toggleClass("rotate");
          if (this.toogleOpenButton.hasClass("open")) {
            this.mainPanel.addClass("translated").removeClass("unTranslated");
          } else {
            this.mainPanel.removeClass("translated").addClass("unTranslated");
          }
        });
      }
    };
  };
  /*this is the maon object that will call of any other object to use */
  const mainOperations = {
    checkForVideoSection() {
      if (document.querySelector("#videoSection")) {
        videoStarter().start();
      }
    },
    handlePreloader() {
      $(".loader").fadeOut();
      $("#preloder")
        .delay(200)
        .fadeOut("slow");
    },
    initWow() {
      const wowInitialization = `
            let wow = new WOW({ animateClass: 'animated',offset:120,
            callback: function(box) {
            console.log("WOW: animating <" + box.tagName.toLowerCase() + ">")}});wow.init();`;
      Function(wowInitialization)();
    },
    main() {
      this.initWow();
      bgImagesManagers.startHandle();
      this.handlePreloader();
      categoriesTopBar.start(); //categories bar(of nav bar)
      handleSideBarOperations().start(); //sideBar
      this.checkForVideoSection(); //start videos
      RegisterHandlingObject.start(); //register
      LoginHandlingObject.start(); //login
    }
  }.main();
});
 
