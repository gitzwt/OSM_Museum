var LabPage = function () {
    var _self = this;
    var page;
    var pageX = 0;
    var tips;

    var showFlag = false;
    var tipsFlag = false;
    var controlFlag = false;
    var clickFlag = false;
    var moveViewFlag = false;
    var MoveData;
    var startData;
    var bgWidth = 3248;

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

        page.nextBtn.on(Laya.Event.CLICK, this, showResPage);

        page.wallBtn.on(Laya.Event.CLICK, this, showIntro,["wall"]);
        page.productBtn.on(Laya.Event.CLICK, this, showIntro,["product"]);
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
            startData = {};
            startData.x = e.stageX;
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

            if(Math.abs(startData.x - e.stageX) > 15) clickFlag = false;
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
    function updatePagePos(){
        correctData();
        page.cont.x = pageX;
    }

    /**
     * 修正数据
     */
    function correctData(){
        pageX = pageX > 0 ? 0 :pageX;
        pageX = pageX < -(bgWidth - WindowW) ? -(bgWidth - WindowW) :pageX;
    }

    /**
     * 显示结果页面
     */
    function showResPage(){
        if(showFlag && clickFlag){
            showFlag = false;
            page.zOrder = 99;

            Laya.Tween.to(page, {
                scaleX: 1.5,
                scaleY: 1.5
            }, 800);

            Laya.Tween.to(page, {
                y: page.y + 150,
                x: page.x - 50
            }, 1000,Laya.Ease.linearIn,null,800);

            Laya.Tween.to(page, {
                alpha:0
            }, 500,Laya.Ease.linearIn,null,1800);

            setTimeout(function(){
                iResultPage.init();
            },1800)

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
        page = new labUI();
        tips = iSlideTips.init(page);
        iClickTips.init(page.clickTips);
        tipsFlag = true;
        Laya.stage.addChild(page);
        pageX = BgPageX;
        page.pivotX = page.pivotX + BgPageX;
        page.x = page.x + BgPageX;
        updatePagePos();
        
        maskInit();
    }

    /**
     * 遮罩初始化
     */
    function maskInit(){
        var maskSp = new Laya.Sprite();
        maskSp.loadImage('images/lab/mask.png');
        page.maskSp.mask = maskSp;

        var lightSp = new Laya.Sprite();
        lightSp.loadImage('images/lab/mask2.png');
        page.lightSp.mask = lightSp;
    }
}
iLabPage = new LabPage();