"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var videoOper_1 = require("./videoOper");
var _categoriesTopBar_1 = require("./_categoriesTopBar");
var _registerLoginOper_1 = require("./_registerLoginOper");
var _bgImagesManging_1 = require("./_bgImagesManging");
var PageIdentifier_1 = require("../../../global/PageIdentifier");
$(function () {
    if (PageIdentifier_1.pageIdentifier.pagetype != "home")
        return;
    /*this object habdle the mainSlider operations */
    var handleSideBarOperations = function () {
        return {
            toogleOpenButton: $(".sidebar .nav li.toggleOpen"),
            sideBar: $(".sidebar"),
            mainPanel: $(".main-panel"),
            start: function () {
                var _this = this;
                this.toogleOpenButton.click(function () {
                    _this.sideBar.toggleClass("closedSideBar");
                    _this.toogleOpenButton
                        .toggleClass("open")
                        .find("i")
                        .toggleClass("rotate");
                    if (_this.toogleOpenButton.hasClass("open")) {
                        _this.mainPanel.addClass("translated").removeClass("unTranslated");
                    }
                    else {
                        _this.mainPanel.removeClass("translated").addClass("unTranslated");
                    }
                });
            }
        };
    };
    /*this is the maon object that will call of any other object to use */
    var mainOperations = {
        checkForVideoSection: function () {
            if (document.querySelector("#videoSection")) {
                videoOper_1.videoStarter().start();
            }
        },
        handlePreloader: function () {
            $(".loader").fadeOut();
            $("#preloder")
                .delay(200)
                .fadeOut("slow");
        },
        initWow: function () {
            var wowInitialization = "\n            let wow = new WOW({ animateClass: 'animated',offset:120,\n            callback: function(box) {\n            console.log(\"WOW: animating <\" + box.tagName.toLowerCase() + \">\")}});wow.init();";
            Function(wowInitialization)();
        },
        main: function () {
            this.initWow();
            _bgImagesManging_1.bgImagesManagers.startHandle();
            this.handlePreloader();
            _categoriesTopBar_1.categoriesTopBar.start(); //categories bar(of nav bar)
            handleSideBarOperations().start(); //sideBar
            this.checkForVideoSection(); //start videos
            _registerLoginOper_1.RegisterHandlingObject.start(); //register
            _registerLoginOper_1.LoginHandlingObject.start(); //login
        }
    }.main();
});
//# sourceMappingURL=main.js.map