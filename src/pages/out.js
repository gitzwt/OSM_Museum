var OutPage = function () {
    var _self = this;
    var page;
    var showFlag = false;

    /**
     * 初始化
     */
    _self.init = function () {
        showFlag = true;
        uiInit();
    }

    /**
     * 开场动画
     */
    _self.openAnime = function () {
        page.load.visible = false;

        setTimeout(function () {
            page.openAni.play(0, false);
        }, 200);

        setTimeout(function () {
            eventInit();
            showOutView();
        }, 22000);
    }

    /**
     * 设置百分比
     */
    _self.setPer = function (num) {
        page.per.x = -650 + 650 * num;
        page.perword.text = parseInt(num * 100) + "%";
    }

    /**
     * 销毁
     */
    _self.distroy = function () {
        showFlag = false;
        page.removeSelf();
    }

    /**
     * 事件初始化
     */
    function eventInit() {
        page.enterBtn.on(Laya.Event.CLICK, this, showHallPage);
    }

    /**
     * 显示外景
     */
    function showOutView() {
        page.ar.alpha = 1;
        page.ar.visible = true;
        Laya.Tween.to(page.aside, {
            alpha: 0
        }, 500);
        Laya.Tween.to(page.word, {
            alpha: 1
        }, 500);

        setTimeout(function () {
            page.aside.visible = false;
        }, 500);

        document.getElementById("gyeBtn").addEventListener('click', startGye, false);
    }

    /**
     * 显示大厅页面
     */
    function showHallPage() {
        if (showFlag) {
            showFlag = false;
            page.zOrder = 99;
            iHallPage.init();
            Laya.Tween.to(page, {
                scaleX: 1.5,
                scaleY: 1.5
            }, 1000, Laya.Ease.linearIn, null, 50);

            Laya.Tween.to(page, {
                scaleX: 2,
                scaleY: 2,
                alpha: 0
            }, 800, Laya.Ease.linearIn, null, 1000);

            setTimeout(function () {
                _self.distroy();
            }, 1800);
        }
    }

    /**
     * 开启陀螺仪
     */
    function startGye() {
        // alert(111)
        if (typeof DeviceMotionEvent.requestPermission === 'function') {
            // alert(1)
            DeviceMotionEvent.requestPermission()
                .then(response => {
                    console.log("1" + response)
                    // if (response == 'granted') {
                        iHallPage.gyeAuto();
                    // }
                })
                .catch(res => {
                    console.log(res);
                })

            DeviceOrientationEvent.requestPermission()
                .then(response => {
                    console.log("2" + response)
                    // if (response == 'granted') {
                        iHallPage.gyeAuto();
                    // }
                })
                .catch(res => {
                    console.log(res);
                })
        } else {
            iHallPage.gyeAuto();
        }
        showHallPage();
    }

    /**
     * ui初始化
     */
    function uiInit() {
        page = new outUI();
        Laya.stage.addChild(page);
        page.x = BgPageX + page.pivotX;
        var mask = new Laya.Sprite();
        mask.graphics.drawRect(0, 0, 650, 4, "#ffffff");
        page.perbox.mask = mask;
    }
}
iOutPage = new OutPage();