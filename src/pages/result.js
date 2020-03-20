var ResultPage = function () {
    var _self = this;
    var page;
    var pageX = 0;

    /**
     * 初始化
     */
    _self.init = function () {
        uiInit();
        eventInit();

        judgeCode();
    }

    /**
     * 销毁
     */
    _self.distroy = function () {
        page.removeSelf();
    }

    /**
     * 事件初始化
     */
    function eventInit() {

        page.btn.on(Laya.Event.CLICK, this, showBookPage);
    }

    /**
     * 判断是否有code
     */
    function judgeCode() {
        var code = iUtils.getQueryString("fwm");
        // var info = null;
        var info = {
            "guid": 1,
            "productName": "35ml\u73cd\u73e0\u767d\u51c0\u900f\u6da6\u767d\u7cbe\u534e\u6db2\uff08\u70b9\u4eae\u7248\uff09",
            "generatedtime": "2020-03-10",
            "queriedTimes": 6,
            "blockAddress": "b478abd269b811eab3b652540065a75b"
        };
        if (code) {
            // try {
            //     API.GetCodeInfo(code, function (data) {
            //         // console.log(data)
            //         if (data.status == 0) {
            //             info = data.data;
            //             iBook.init(info);
            //         }
            //     });
            // }
            // catch (e){

            // }

            iBook.init(info);
            setTimeout(function () {
                if (info) {
                    var btn = page.btn;
                    btn.visible = true;
                    btn.alpha = 0;
                    Laya.Tween.to(btn, {
                        alpha: 1
                    }, 500);
                }
            }, 4000);
        }
    }

    /**
     * 显示证书页面
     */
    function showBookPage() {
        iBook.show();
    }

    /**
     * ui初始化
     */
    function uiInit() {
        page = new resultUI();
        Laya.stage.addChild(page);
        pageX = BgPageX;
        page.x = pageX;
        page.btn.x = -pageX + 85;
    }
}
iResultPage = new ResultPage();