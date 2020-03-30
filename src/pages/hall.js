var HallPage = function () {
    var _self = this;
    var pageA, pageB;
    var pages = [];
    var pagePos = [{ x: 0, y: 0 }, { x: 0, y: 0 }];

    var gyeBindFlag = false;
    var showFlag = false;
    var controlFlag = false;
    var clickFlag = false;
    var centerX = 2545;
    var bgWidth = 6494;
    var nowIndex = 0;

    var moveViewFlag = false;
    var MoveData;
    var startData;
    var GyeData;

    var ParallaxTimer;

    /**
     * 初始化
     */
    _self.init = function () {
        uiInit();
        eventInit();
        setTimeout(function () {
            _self.open();
        }, 4500);
    }

    /**
     * 打开
     */
    _self.open = function () {
        controlFlag = true;
        showFlag = true;
        document.getElementById("gyeBtn").style.display = "none";
    }

    /**
     * 关闭
     */
    _self.close = function () {
        controlFlag = false;
    }

    /**
     * 销毁
     */
    _self.distroy = function () {
        showFlag = false;
        controlFlag = false;
        pageA.removeSelf();
        pageB.removeSelf();
    }

    /**
     * 陀螺仪授权
     */
    _self.gyeAuto = function () {
        if (!gyeBindFlag) {
            Laya.Browser.window.addEventListener("deviceorientation", (e) => {
                if (controlFlag) dealGyeData(e);
            }, false);
        }
    }

    /**
     * 事件初始化
     */
    function eventInit() {
        pageA.on(Laya.Event.MOUSE_DOWN, this, recordMoveData);
        pageA.on(Laya.Event.MOUSE_MOVE, this, changeMoveData);
        pageA.on(Laya.Event.MOUSE_UP, this, clearMoveData);

        pageB.on(Laya.Event.MOUSE_DOWN, this, recordMoveData);
        pageB.on(Laya.Event.MOUSE_MOVE, this, changeMoveData);
        pageB.on(Laya.Event.MOUSE_UP, this, clearMoveData);

        pageA.nextBtn.on(Laya.Event.CLICK, this, showPerfectionPage);
        pageB.nextBtn.on(Laya.Event.CLICK, this, showPerfectionPage);

        pageA.shipBtn.on(Laya.Event.CLICK, this, showIntro, ["ship"]);
        pageA.bellBtn.on(Laya.Event.CLICK, this, showIntro, ["bell"]);
        pageA.conch1Btn.on(Laya.Event.CLICK, this, showIntro, ["conch2"]);
        pageA.conch2Btn.on(Laya.Event.CLICK, this, showIntro, ["conch1"]);
        pageA.conch3Btn.on(Laya.Event.CLICK, this, showIntro, ["conch4"]);
        pageA.conch4Btn.on(Laya.Event.CLICK, this, showIntro, ["conch5"]);
        pageA.conch5Btn.on(Laya.Event.CLICK, this, showIntro, ["conch3"]);

        pageB.shipBtn.on(Laya.Event.CLICK, this, showIntro, ["ship"]);
        pageB.bellBtn.on(Laya.Event.CLICK, this, showIntro, ["bell"]);
        pageB.conch1Btn.on(Laya.Event.CLICK, this, showIntro, ["conch2"]);
        pageB.conch2Btn.on(Laya.Event.CLICK, this, showIntro, ["conch1"]);
        pageB.conch3Btn.on(Laya.Event.CLICK, this, showIntro, ["conch4"]);
        pageB.conch4Btn.on(Laya.Event.CLICK, this, showIntro, ["conch5"]);
        pageB.conch5Btn.on(Laya.Event.CLICK, this, showIntro, ["conch3"]);
    }

    /**
     * 显示介绍页面
     */
    function showIntro(name) {
        if (clickFlag) iIntro.show("intro", dialogData[name]);
    }

    /**
     * 显示臻萃馆页面
     */
    function showPerfectionPage() {
        if (showFlag && clickFlag) {
            showFlag = false;
            controlFlag = false;

            pageA.zOrder = 99;
            pageB.zOrder = 99;
            iPerfectionPage.init();

            Laya.Tween.to(pageA, {
                x: pageA.x - 300
            }, 1000, Laya.Ease.linearIn, null);
            Laya.Tween.to(pageB, {
                x: pageA.x - 300
            }, 1000, Laya.Ease.linearIn, null);

            Laya.Tween.to(pageA, {
                alpha: 0
            }, 700, Laya.Ease.linearIn, null, 1000);
            Laya.Tween.to(pageB, {
                alpha: 0
            }, 700, Laya.Ease.linearIn, null, 1000);

            setTimeout(function () {
                _self.distroy();
            }, 1700);
        }
    }

    /**
     * 处理陀螺仪数据
     * @param e 
     */
    function dealGyeData(e) {
        if (GyeData) {
            var diffX = e.alpha - GyeData.alpha;
            var diffY = e.gamma - GyeData.gamma;

            diffX = diffX < -20 || diffX > 20 ? 0 : diffX;
            diffY = diffY < -20 || diffY > 20 ? 0 : diffY;


            if (Math.abs(diffX) > 0.1) {
                pagePos[0].x += diffX * GYE_SENSITIVITY_X;
                pagePos[1].x += diffX * GYE_SENSITIVITY_X;
                GyeData.alpha = e.alpha;
            }

            if (Math.abs(diffY) > 0.05) {
                pagePos[0].y -= diffY * GYE_SENSITIVITY_Y;
                pagePos[1].y -= diffY * GYE_SENSITIVITY_Y;
                GyeData.gamma = e.gamma;
            }

            if (Math.abs(diffX) > 0.1 || Math.abs(diffY) > 0.05) {
                updatePagePos();
                updateParallax(diffX * 5, diffY * 5);
            }

        }
        GyeData = e;
        hideTips();

        gyeBindFlag = true;
        document.getElementById("gyeBtn").style.display = "none";
    }

    /**
     * 记录手指记录的值
     */
    function recordMoveData(e) {
        if (controlFlag) {
            moveViewFlag = true;
            MoveData = {};
            MoveData.x = e.stageX;
            MoveData.y = e.stageY;
            startData = {};
            startData.x = e.stageX;
            hideTips();
            clickFlag = true;
        }
    }

    /**
     * 改变手指记录的值
     */
    function changeMoveData(e) {
        if (controlFlag && MoveData && moveViewFlag) {
            var diffX = (e.stageX - MoveData.x) * MOVE_SENSITIVITY;
            var diffY = (e.stageY - MoveData.y) * MOVE_SENSITIVITY;

            pagePos[0].x += diffX;
            pagePos[1].x += diffX;
            pagePos[0].y += diffY;
            pagePos[1].y += diffY;

            updatePagePos();
            updateParallax(diffX, diffY);

            MoveData.x = e.stageX;
            MoveData.y = e.stageY;

            if (Math.abs(startData.x - e.stageX) > 15) clickFlag = false;
        }
    }

    /**
     * 清除手指记录的值
     */
    function clearMoveData() {
        MoveData = null;
        startData = null;
        moveViewFlag = false;
    }

    /**
     * 更新页面的位置
     */
    function updatePagePos() {
        correctData();

        pages[0].x = pagePos[0].x;
        pages[1].x = pagePos[1].x;
        pages[0].y = pagePos[0].y;
        pages[1].y = pagePos[1].y;
    }

    /**
     * 更新视差
     */
    function updateParallax(x, y) {
        ClearResumeParallax();
        // updateParallaxBg(x,y);
        updateParallaxPart(x, y, "part1", 10, PARALLAX_SENSITIVITY_PART1);
        updateParallaxPart(x, y, "part2", 20, PARALLAX_SENSITIVITY_PART2);
        updateParallaxPart(x, y, "part3", 40, PARALLAX_SENSITIVITY_PART3);


        clearTimeout(ParallaxTimer);
        ParallaxTimer = setTimeout(function () {
            resumeParallax();
        }, 200);
    }

    /**
     * 更新背景视差
     */
    function updateParallaxBg(x, y) {
        var diffS = Math.abs(x + y);
        var scale = pageA.bg.scaleY;

        scale -= diffS * SCALE_SENSITIVITY_BG;
        scale = scale < 0.98 ? 0.98 : scale;

        pageA.bg.scaleY = scale;
        pageB.bg.scaleY = scale;
    }

    /**
     * 更新视差
     * @param {*} x 
     * @param {*} y 
     */
    function updateParallaxPart(x, y, name, max, sens) {
        var lastx = pageA[name].x;
        var lasty = pageA[name].y;

        lastx -= x * sens;
        lastx = lastx > max ? max : lastx;
        lastx = lastx < -max ? -max : lastx;

        lasty -= y * sens;
        lasty = lasty > max ? max : lasty;
        lasty = lasty < -max ? -max : lasty;

        pageA[name].x = lastx;
        pageA[name].y = lasty;
        pageB[name].x = lastx;
        pageB[name].y = lasty;
    }

    /**
     * 清除恢复视差
     */
    function ClearResumeParallax() {
        // Laya.Tween.clearAll(pageA.bg);
        Laya.Tween.clearAll(pageA.part1);
        Laya.Tween.clearAll(pageA.part2);
        Laya.Tween.clearAll(pageA.part3);
        // Laya.Tween.clearAll(pageB.bg);
        Laya.Tween.clearAll(pageB.part1);
        Laya.Tween.clearAll(pageB.part2);
        Laya.Tween.clearAll(pageB.part3);
    }

    /**
     * 恢复视差
     */
    function resumeParallax() {
        // Laya.Tween.to(pageA.bg,{
        //     scaleY:1
        // },1000)
        // Laya.Tween.to(pageB.bg,{
        //     scaleY:1
        // },1000)

        Laya.Tween.to(pageA.part1, {
            x: 0,
            y: 0
        }, 1300)
        Laya.Tween.to(pageA.part2, {
            x: 0,
            y: 0
        }, 1200)
        Laya.Tween.to(pageA.part3, {
            x: 0,
            y: 0
        }, 700)
        Laya.Tween.to(pageB.part1, {
            x: 0,
            y: 0
        }, 1300)
        Laya.Tween.to(pageB.part2, {
            x: 0,
            y: 0
        }, 1200)
        Laya.Tween.to(pageB.part3, {
            x: 0,
            y: 0
        }, 700)
    }

    /**
     * 隐藏提示
     */
    function hideTips() {
        if (pageB.tips.visible) {
            Laya.Tween.to(pageA.tips, {
                alpha: 0
            }, 500);
            pageB.tips.visible = false;
            setTimeout(function () {
                pageA.tips.visible = false;
            }, 500)
        }
    }

    /**
     * 修正数据
     */
    function correctData() {
        var next = nowIndex == 1 ? 0 : 1;

        if (pagePos[nowIndex].x < -bgWidth + WindowW + 100 && pagePos[next].x < 0) pagePos[next].x += (bgWidth * 2);
        if (pagePos[nowIndex].x > -100 && pagePos[next].x > 0) pagePos[next].x -= (bgWidth * 2);

        if (pagePos[nowIndex].x < -bgWidth + WindowW / 2 || pagePos[nowIndex].x > WindowW / 2) {
            nowIndex = next;
            if (nowIndex == 1) {
                pageA.zOrder = 98;
                pageB.zOrder = 99;
            }
            else {
                pageA.zOrder = 99;
                pageB.zOrder = 98;
            }
        }

        pagePos[0].y = pagePos[0].y > 0 ? 0 : pagePos[0].y;
        pagePos[0].y = pagePos[0].y < -375 ? -375 : pagePos[0].y;
        pagePos[1].y = pagePos[1].y > 0 ? 0 : pagePos[1].y;
        pagePos[1].y = pagePos[1].y < -375 ? -375 : pagePos[1].y;
    }

    /**
     * ui初始化
     */
    function uiInit() {
        pageA = new hallUI();
        pageB = new hallUI();
        Laya.stage.addChild(pageB);
        Laya.stage.addChild(pageA);
        pages[0] = pageA.cont;
        pages[1] = pageB.cont;
        iClickTips.init(pageA.clickTips);
        iClickTips.init(pageB.clickTips);
        pagePos[0].x = -(centerX - 1624 / 2 - BgPageX);
        pagePos[1].x = -(bgWidth - pagePos[0].x);
        pagePos[0].y = -187;
        pagePos[1].y = -187;
        updatePagePos();
    }
}

var iHallPage = new HallPage();