var HallPage = function(){
    var _self = this;
    var page;
    var pages = [];
    var pageXs = [0,0];

    var showFlag = false;
    var controlFlag = false;
    var clickFlag = false;
    var centerX = 2545;
    var bgWidth = 6494;
    var nowIndex = 0;

    var moveViewFlag = false;
    var MoveData;
    var GyeData;

    /**
     * 初始化
     */
    _self.init = function(){
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
        Laya.Browser.window.addEventListener("deviceorientation", (e) => {
                if (controlFlag) dealGyeData(e);
        }, false);

        page.on(Laya.Event.MOUSE_DOWN, this, recordMoveData);
        page.on(Laya.Event.MOUSE_MOVE, this, changeInitGyeData);
        page.on(Laya.Event.MOUSE_UP, this, clearMoveData);

        page.nextBtn1.on(Laya.Event.CLICK,this,showPerfectionPage);
        page.nextBtn2.on(Laya.Event.CLICK,this,showPerfectionPage);
    }

    /**
     * 显示臻萃馆页面
     */
    function showPerfectionPage(){
        if(showFlag && clickFlag){
            showFlag = false;
            controlFlag = false;

            page.zOrder = 99;
            iPerfectionPage.init();

            Laya.Tween.to(page, {
                scaleX: 1.5,
                scaleY: 1.5
            }, 800);

            Laya.Tween.to(page, {
                x: page.x - 200,
                alpha:0
            }, 800,Laya.Ease.linearIn,null,800);

            setTimeout(function(){
                _self.distroy();
            },1600);
        }
    }

    /**
     * 处理陀螺仪数据
     * @param e 
     */
    function dealGyeData(e) {
        if (GyeData) {
            var diffX = e.alpha - GyeData;

            diffX = diffX < -180 ? diffX + 360 : diffX;
            diffX = diffX > 180 ? -diffX + 360 : diffX;

            pageXs[0] += diffX * GYE_SENSITIVITY;
            pageXs[1] += diffX * GYE_SENSITIVITY;
            updatePagePos();            
        }
        GyeData = e.alpha;
        hideTips();
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

            pageXs[0] += diffX;
            pageXs[1] += diffX;

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

        pages[0].x = pageXs[0];
        pages[1].x = pageXs[1];
    }

    /**
     * 隐藏提示
     */
    function hideTips(){
        if(page.tips2.visible){
            Laya.Tween.to(page.tips1, {
                alpha:0
            }, 500);
            page.tips2.visible = false;
            setTimeout(function(){
                page.tips1.visible = false;
            },500)
        }
    }

    /**
     * 修正数据
     */
    function correctData(){
        var next = nowIndex == 1 ? 0 : 1;

        if(pageXs[nowIndex] < -bgWidth + WindowW + 100 && pageXs[next] < 0) pageXs[next] += (bgWidth * 2);
        if(pageXs[nowIndex] > -100 && pageXs[next] > 0) pageXs[next] -= (bgWidth * 2);
        
        if(pageXs[nowIndex] < -bgWidth + WindowW + 100 || pageXs[nowIndex] > WindowW){
            nowIndex = next;
            pages[nowIndex].zOrder = 99;
            pages[next].zOrder = 98;
        }
    }

    /**
     * ui初始化
     */
    function uiInit() {
        page = new hallUI();
        Laya.stage.addChild(page);
        pages[0] = page.cont1;
        pages[1] = page.cont2;
        iClickTips.init(page.clickTips1);
        iClickTips.init(page.clickTips2);
        pageXs[0] = -(centerX - 1624 / 2 + BgPageX);
        pageXs[1] = -(bgWidth - pageXs[0]); 
        updatePagePos();
    }
}

var iHallPage = new HallPage();