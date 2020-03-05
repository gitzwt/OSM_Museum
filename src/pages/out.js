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
        }, 13000);
    }

    /**
     * 销毁
     */
    _self.distroy = function(){
        showFlag = false;
        page.removeSelf();
    }

    /**
     * 事件初始化
     */
    function eventInit(){
        page.openBtn.on(Laya.Event.CLICK,this,showOutView);
        page.enterBtn.on(Laya.Event.CLICK,this,showHallPage);
    }

    /**
     * 显示外景
     */
    function showOutView(){
        page.ar.alpha = 1;
        page.ar.visible = true;
        Laya.Tween.to(page.aside, {
            alpha: 0
        }, 700);

        setTimeout(function(){
            page.aside.visible = false;
        },700);
    }

    /**
     * 显示大厅页面
     */
    function showHallPage(){
        if(showFlag){
            showFlag = false;
            page.zOrder = 99;
            iHallPage.init();
            Laya.Tween.to(page, {
                scaleX: 1.5,
                scaleY: 1.5
            }, 1500,Laya.Ease.linearIn,null,50);

            Laya.Tween.to(page, {
                scaleX: 2,
                scaleY: 2,
                alpha:0
            }, 750,Laya.Ease.linearIn,null,1500);

            setTimeout(function(){
                _self.distroy();
            },2500);
        }
    }

    /**
     * ui初始化
     */
    function uiInit() {
        page = new outUI();
        Laya.stage.addChild(page);
        page.x = BgPageX + page.pivotX;
    }
}
iOutPage = new OutPage();