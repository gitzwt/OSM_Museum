var API = new importAPI();

function importAPI () {
	var _self = this;

	var requestDomain = "https://129.204.187.100/api/blockchain/state";

	function _Ajax(opts){
	    var type = opts.type || "POST";
	    $.ajax({
	        type: type,
	        url: requestDomain + "?code=" + opts.data,
	        dataType: 'json',
	        async: true,
	        // data: opts.data,
	        success: function(data){
                if (opts.onSuccess) opts.onSuccess(data);
	        },
	        error: function(){
	        	alert("网络可能存在问题，请刷新试试！");
	        }
	    });
	}

	/**
     * 获取码
     * @param {*} onSuccess 回调函数
     */
	_self.GetCodeInfo = function(data,onSuccess){
		_Ajax({
            API:"GetCodeInfo",
			type: 'GET',
            data:data,
            onSuccess:onSuccess
        });
    }//end func

}//end import