var SlideTips = function(){
    var _self = this;

    _self.init = function(box){
        var tips = new slideTipsUI();
        box.addChild(tips);
        tips.y = 600;
        tips.x = WindowW / 2 - 150;
        return tips;
    }
}

var iSlideTips = new SlideTips();