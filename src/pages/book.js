var Book = function () {
    var _self = this;
    var page;
   
    /**
     * 初始化
     */
    _self.init = function (info) {
        page = new bookUI();
        updateUI(info);
        eventInit();
    }

    /**
     * 显示
     */
    _self.show = function (type, data) {
        page.popup();
    }

    /**
     * 更新UI
     */
    function updateUI(info){
        page.times.text = info.queriedTimes;
        page.date.text = iUtils.dateFormat(info.generatedtime);
        page.num2.text = info.blockAddress;
        page.num1.text = info.guid;
    }

    /**
     * 事件初始化
     */
    function eventInit() {
        page.closeBtn.on(Laya.Event.CLICK, this, pageHide);
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
var iBook = new Book();