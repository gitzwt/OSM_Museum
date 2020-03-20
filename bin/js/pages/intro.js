var Intro = function () {
    var _self = this;
    var page;
    var bg;
    var introBox;
    var peopleBox, peoples = [];
    var animeFlag = true;

    var nowIntro, nextIntro;
    var introKey = "";
    var introNums = 0;
    var nowIntroId = 0;

    var nowPeople = 0;
    var standPos = 142;
    var peoplePos = [{
        dis: 0,
        scale: 1
    }, {
        dis: 190,
        scale: 0.9
    }, {
        dis: 250,
        scale: 0.75
    }, {
        dis: 240,
        scale: 0.5
    }];

    /**
     * 初始化
     */
    _self.init = function () {
        page = new introUI();
        bg = page.bg;
        introBox = page.introBox;
        nowIntro = page.ia;
        nextIntro = page.ib;
        peopleBox = page.peopleBox;
        var mask = new Laya.Sprite();
        mask.graphics.drawRect(0, 0, page.intro.width, page.intro.height, "#ffffff");
        page.intro.mask = mask;
        peopleBoxInit();
        eventInit();
        Laya.Dialog.manager.maskLayer.alpha = 0;
        var screenProp = Laya.Browser.height / Laya.Browser.width;
        if (screenProp < 0.54) {
            page.cont.scaleX = 1.2;
            page.cont.scaleY = 1.2;
        }
    }

    /**
     * 显示
     */
    _self.show = function (type, data) {
        if (type == "intro") {
            updateIntroUI(data);
            peopleBox.visible = false;
        }
        else if (type == "people") {
            bg.source = Laya.Loader.getRes('images/dialog/peoples/bg.png');
            introBox.visible = false;
            peopleBox.visible = true;
        }
        pageShow();
    }

    /**
     * 更新 介绍页面的ui
     */
    function updateIntroUI(data) {
        bg.source = Laya.Loader.getRes('images/dialog/' + data.bg);
        if (data.hasOwnProperty("nums")) {
            introNums = data.nums;
            nowIntroId = 1;
            introKey = data.key;
            nowIntro.source = Laya.Loader.getRes('images/dialog/' + introKey + '/1' + nowIntroId + ".png");
            introBox.visible = true;
        }
        else {
            introBox.visible = false;
        }
    }

    /**
     * 事件初始化
     */
    function eventInit() {
        page.backBtn.on(Laya.Event.CLICK, this, pageHide);

        page.arR.on(Laya.Event.CLICK, this, switchIntro, [1]);
        page.arL.on(Laya.Event.CLICK, this, switchIntro, [-1]);

        page.arRbtn.on(Laya.Event.CLICK, this, switchPeople, [1]);
        page.arLbtn.on(Laya.Event.CLICK, this, switchPeople, [-1]);

        page.on(Laya.Event.MOUSE_DOWN, this, recordMoveData);
        page.on(Laya.Event.MOUSE_MOVE, this, changeMoveData);
    }

    /**
     * 记录手指记录的值
     */
    function recordMoveData(e) {
        MoveData = {};
        MoveData.x = e.stageX;
        MoveData.y = e.stageY;
    }

    /**
     * 改变手指记录的值
     */
    function changeMoveData(e) {
        if (MoveData) {
            var diffX = e.stageX - MoveData.x;
            if (diffX > 50) {
                if (introBox.visible) switchIntro(-1);
                else switchPeople(-1);
                MoveData = null;
            }
            else if (diffX < -50) {
                if (introBox.visible) switchIntro(1);
                else switchPeople(1);
                MoveData = null;
            }
        }
    }

    /**
     * 人物的页面初始化
     */
    function peopleBoxInit() {
        for (var i = 0; i < page.peoples._childs.length; i++) {
            peoples.push(page.peoples._childs[i]);
        }

        for (var i = 0; i < peoples.length; i++) {
            peoples[i].zOrder = 4 - i;
        }
    }

    /**
     * 切换介绍
     */
    function switchIntro(dir) {
        if (animeFlag) {
            animeFlag = false;
            nowIntroId += dir;
            nowIntroId = nowIntroId <= 0 ? introNums : nowIntroId;
            nowIntroId = nowIntroId > introNums ? 1 : nowIntroId;

            nextIntro.source = Laya.Loader.getRes('images/dialog/' + introKey + '/1' + nowIntroId + ".png");

            Laya.Tween.to(nowIntro, {
                x: -dir * nowIntro.width,
                alpha: 0
            }, 500);

            nextIntro.x = dir * nextIntro.width;
            nextIntro.alpha = 0;
            Laya.Tween.to(nextIntro, {
                x: 0,
                alpha: 1
            }, 500);

            var item = nextIntro;
            nextIntro = nowIntro;
            nowIntro = item;

            setTimeout(function () {
                animeFlag = true;
            }, 500)
        }
    }

    /**
     * 切换人物
     */
    function switchPeople(dir) {
        if (animeFlag && ((nowPeople > 0 && dir < 0) || (nowPeople < 3 && dir > 0))){
            animeFlag = false;
            nowPeople += dir;

            for (var i = 0; i < peoples.length; i++) {
                movePoeples(peoples[i], i);
            }

            setTimeout(function () {
                animeFlag = true;
            }, 300)
        }
    }

    /**
     * 移动人物的动画
     * @param {*} ele 
     * @param {*} index 
     */
    function movePoeples(ele, index) {
        var dis = Math.abs(index - nowPeople);
        var data = peoplePos[dis];
        var x = index - nowPeople < 0 ? standPos - data.dis : standPos + data.dis;
        var scale = data.scale;

        Laya.Tween.to(ele, {
            x: x,
            scaleX: scale,
            scaleY: scale
        }, 300);

        var shadow = ele.getChildByName("shadow");
        if(dis == 0){
            Laya.Tween.to(shadow, {
                alpha: 0
            }, 300);
        }
        else{
            Laya.Tween.to(shadow, {
                alpha: 1
            }, 300);
        }

        setTimeout(function(){
            ele.zOrder = 4 - (dis);
        },150);
    }

    /**
     * 页面显示
     */
    function pageShow() {
        page.popup();
    }

    /**
     * 页面隐藏
     */
    function pageHide() {
        page.close();
    }
}
var iIntro = new Intro();