function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}
$(function() {

	var storage = window.localStorage;
    for(var i=0;i<storage.length;i++){
        var key=storage.key(i);
        console.log(key);
    }
	toastLoading("正在加载...");
	if(!localStorageIsNotnull("goodsId")){
		setlocalStorage("goodsId",getlocalStorage("goodsId"));
	}else{
		/*Id = getlocalStorage("goodsId");*/
	}
	
	if(!localStorageIsNotnull("addessType") && getlocalStorage("addessType") == 1){
		
		$('#xd_name').val(getlocalStorage("xd_name"));
		$('#xd_phone').val(getlocalStorage("xd_phone"));
		$('#xd_addess').val(getlocalStorage("xd_addess"));
		$('#xd_detailaddess').val(getlocalStorage("xd_detailaddess"));
		/*alert(getlocalStorage("xd_name"));
		alert(getlocalStorage("xd_phone"));
		alert(getlocalStorage("xd_detailaddess"));*/
	}
	
	if(!localStorageIsNotnull("remarks")){
		$('#remarks').val(getlocalStorage("remarks"));
	}
	
	if(!localStorageIsNotnull("bx_name")){
		$('#bx_name').val(getlocalStorage("bx_name"));
	}
	if(!localStorageIsNotnull("bx_phone")){
		$('#bx_phone').val(getlocalStorage("bx_phone"));
	}
	
	if(!localStorageIsNotnull("appDate")){
		$('#appDate').val(getlocalStorage("appDate"));
	}
	if(!localStorageIsNotnull("pnigtaiType")){
		$('#pnigtaiType').val(getlocalStorage("pnigtaiType"));
	}
	//	查询商品详情
	servicegoodDetail();
	
})