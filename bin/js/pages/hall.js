var HallPage = function(){
    var _self = this;
    var page;
    var pages = [];
    var pagePos = [{x:0,y:0},{x:0,y:0}];

    var showFlag = false;
    var controlFlag = false;
    var clickFlag = false;
    var centerX = 3817;
    var bgWidth = 9741;
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
        },4500);
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
            var diffX = e.alpha - GyeData.alpha;
            var diffY = e.gamma - GyeData.gamma;

            diffX = diffX < -20 || diffX > 20 ? 0 : diffX;            
            diffY = diffY < -20 || diffY > 20 ? 0 : diffY;

            pagePos[0].x += diffX * GYE_SENSITIVITY_X;
            pagePos[1].x += diffX * GYE_SENSITIVITY_X;
            pagePos[0].y += diffY * GYE_SENSITIVITY_Y;
            pagePos[1].y += diffY * GYE_SENSITIVITY_Y;
            updatePagePos();            
        }
        GyeData = e;
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
            var diffY = (e.stageY - MoveData.y) * MOVE_SENSITIVITY;

            pagePos[0].x += diffX;
            pagePos[1].x += diffX;
            pagePos[0].y += diffY;
            pagePos[1].y += diffY;

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

        pages[0].x = pagePos[0].x;
        pages[1].x = pagePos[1].x;
        pages[0].y = pagePos[0].y;
        pages[1].y = pagePos[1].y;
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

        if(pagePos[nowIndex].x < -bgWidth + WindowW + 100 && pagePos[next].x < 0) pagePos[next].x += (bgWidth * 2);
        if(pagePos[nowIndex].x > -100 && pagePos[next].x > 0) pagePos[next].x -= (bgWidth * 2);
        
        if(pagePos[nowIndex].x < -bgWidth + WindowW + 100 || pagePos[nowIndex].x > WindowW){
            nowIndex = next;
            pages[nowIndex].zOrder = 99;
            pages[next].zOrder = 98;
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
        page = new hallUI();
        Laya.stage.addChild(page);
        pages[0] = page.cont1;
        pages[1] = page.cont2;
        iClickTips.init(page.clickTips1);
        iClickTips.init(page.clickTips2);
        pagePos[0].x = -(centerX - 1624 / 2 - BgPageX);
        pagePos[1].x = -(bgWidth - pagePos[0].x);
        pagePos[0].y = -320;
        pagePos[1].y = -320;
        updatePagePos();
    }
}

var iHallPage = new HallPage();