var CulturePage = function () {
    var _self = this;
    var page;
    var pageX = 0;
    var tips;

    var showFlag = false;
    var tipsFlag = false;
    var controlFlag = false;
    var clickFlag = false;
    var moveViewFlag = false;
    var lightAniFlag = true;
    var MoveData;
    var bgWidth = 5320;

    /**
     * 初始化
     */
    _self.init = function () {
        showFlag = true;
        uiInit();
        eventInit();
        setTimeout(function(){
            _self.open();
        },1500);
    }

    /**
     * 打开
     */
    _self.open = function(){
        controlFlag = true;
        showFlag = true;
    }

    /**
     * 关闭
     */
    _self.close = function(){
        controlFlag = false;
    }

    /**
     * 销毁
     */
    _self.distroy = function(){
        showFlag = false;
        controlFlag = false;
        page.removeSelf();
    }

    /**
     * 事件初始化
     */
    function eventInit(){
        page.on(Laya.Event.MOUSE_DOWN, this, recordMoveData);
        page.on(Laya.Event.MOUSE_MOVE, this, changeInitGyeData);
        page.on(Laya.Event.MOUSE_UP, this, clearMoveData);

        page.nextBtn.on(Laya.Event.CLICK, this, showLabPage);

        page.YJYBtn.on(Laya.Event.CLICK, this, showIntro,["YJY"]);
        page.kingBtn.on(Laya.Event.CLICK, this, showIntro,["king"]);
        page.farmBtn.on(Laya.Event.CLICK, this, showIntro,["farm"]);
        page.seaBtn.on(Laya.Event.CLICK, this, showIntro,["sea"]);
    }

    /**
     * 显示介绍页面
     */
    function showIntro(name){
        if(clickFlag) iIntro.show("intro",dialogData[name]);
    }

    /**
     * 记录手指记录的值
     */
    function recordMoveData(e) {
        if(controlFlag){
            moveViewFlag = true;
            MoveData = {};
            MoveData.x = e.stageX;
            MoveData.y = e.stageY;
            hideTips();
            clickFlag = true;
        }
    }

    /**
     * 改变陀螺仪记录的初始值
     */
    function changeInitGyeData(e) {
        if (controlFlag && MoveData && moveViewFlag) {
            var diffX = (e.stageX - MoveData.x) * MOVE_SENSITIVITY;

            pageX += diffX;

            updatePagePos();

            MoveData.x = e.stageX;
            MoveData.y = e.stageY;

            clickFlag = false;
        }
    }

    /**
     * 清除手指记录的值
     */
    function clearMoveData() {
        MoveData = null;
        moveViewFlag = false;
    }

    /**
     * 更新页面的位置
     */
    function updatePagePos(){
        correctData();
        page.cont.x = pageX;

        if(pageX < -1000  && lightAniFlag){
            lightAniFlag = false;

            page.lightAni.play(0,false);
            setTimeout(function(){
                page.lightAni.play(0,false);
            },3000);
        }
    }

    /**
     * 修正数据
     */
    function correctData(){
        pageX = pageX > 0 ? 0 :pageX;
        pageX = pageX < -(bgWidth - WindowW) ? -(bgWidth - WindowW) :pageX;
    }

    /**
     * 显示研究所
     */
    function showLabPage(){
        if(showFlag && clickFlag){
            showFlag = false;
            page.zOrder = 99;
            iLabPage.init();

            Laya.Tween.to(page, {
                scaleX: 1.5,
                scaleY: 1.5
            }, 800);

            Laya.Tween.to(page, {
                y: page.y + 150
            }, 1000,Laya.Ease.linearIn,null,800);

            Laya.Tween.to(page, {
                alpha:0
            }, 500,Laya.Ease.linearIn,null,1800);

            setTimeout(function(){
                _self.distroy();
            },2300);
        }
    }

    /**
     * 隐藏提示
     */
    function hideTips(){
        if(tipsFlag){
            tipsFlag = false;
            Laya.Tween.to(tips, {
                alpha:0
            }, 500);
            setTimeout(function(){
                tips.removeSelf();
                tips = null;
            },500)
        }
    }

    /**
     * ui初始化
     */
    function uiInit() {
        page = new cultureUI();
        tips = iSlideTips.init(page);
        iClickTips.init(page.clickTips);
        tipsFlag = true;
        Laya.stage.addChild(page);
        pageX = BgPageX + 50;
        page.pivotX = page.pivotX + BgPageX;
        page.x = page.x + BgPageX;
        updatePagePos();
    }
}
iCulturePage = new CulturePage();