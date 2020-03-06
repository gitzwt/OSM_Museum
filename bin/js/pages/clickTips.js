var ClickTips = function(){
    var _self = this;

    _self.init = function(box){
        for (var i = 0; i < box._childs.length; i++) {
            var ele = box._childs[i];
            var tips = new clickTipsUI();
            ele.addChild(tips);
        }
    }
}

var iClickTips = new ClickTips();