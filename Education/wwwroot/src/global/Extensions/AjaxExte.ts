$.AjaxXHRProgress = (OnUploading: (percentage: number) => void) => {
    return () => {
        var jqXHR = null;
        if ((window as any)["ActiveXObject"])
            jqXHR = new ((window as any)["ActiveXObject"] as any)(
                "Microsoft.XMLHTTP"
            );
        else jqXHR = new (window as any)["XMLHttpRequest"]();
        //uploadProgress
        (jqXHR.upload as HTMLElement).addEventListener(
            "progress",
            function (ev) {
                if (ev.lengthComputable) {
                    var percentageComplete = Math.round((ev.loaded * 100) / ev.total);
                    OnUploading(percentageComplete);
                }
            },
            false
        );
        //downloadProgress
        (jqXHR as HTMLElement).addEventListener(
            "progress",
            function (ev) {
                if (ev.lengthComputable) {
                    var percentageComplete = Math.round((ev.loaded * 100) / ev.total);
                    console.log("downloaded " + percentageComplete);
                }
            },
            false
        );
        return jqXHR;
    };
};
