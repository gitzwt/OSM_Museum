var utils = function(){
    var _self = this;

    /**
     * 获得范围内随机整数
     */
	_self.randomRange = function (min, max) {
		var randomNumber;
		randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
		return randomNumber;
	} //end func 

	/**
	 * 字符串截取
	 * @param {*} str			需要截取的字符串
	 * @param {*} len			截取长度
	 */
	_self.setString = function(str, len) {
	    var strlen = 0;
	    var s = "";
	    for (var i = 0; i < str.length; i++) {
	        if (str.charCodeAt(i) > 128) {
	            strlen += 2;
	        } else {
	            strlen++;
	        }
	        s += str.charAt(i);
	        if (strlen >= len) {
	            return s + "...";
	        }
	    }
	    return s;
	} //end func

	/**
     * 获得http url参数
     */
	_self.getQueryString = function (name) {
		if (name && name != '') {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
			var r = window.location.search.substr(1).match(reg);
			if (r != null) return decodeURIComponent(r[2]);
			return null;
		} //end if
		else return null;
	} //end func

	/**
     * 获得http url参数
     */
	_self.dateFormat = function (date) {
		date = date.split("-");
		return parseInt(date[0]) + "年" + parseInt(date[1]) + "月" + parseInt(date[2]) + "日";
	} //end func
}

var iUtils = new utils();