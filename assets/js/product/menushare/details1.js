function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}
var path = basePath();
$(function() {
	toastLoading("正在加载...");

	var Id = GetQueryString("id");
	if(GetQueryString("code") !=null && GetQueryString("code") != '' ){
		setlocalStorage("tuigCode",GetQueryString("code"));
	}
	if(GetQueryString("re") !=null && GetQueryString("re") != '' ){
		setlocalStorage("nurserId",GetQueryString("re"));
		setlocalStorage("recommendId",GetQueryString("re"));
	}
	if(localStorageIsNotnull("tuigCode")){
		setlocalStorage("tuigCode","jphs");
	}
	if(!userProving()){
		$('#menu_url').val('https://wap.goldnurse.com'+path+'/common/menushare.html?gid='+Id+"&re="+getlocalStorage("nurseId")+"&code="+getlocalStorage("tuigCode"));				//	未登录分享链接
	}else{
		$('#menu_url').val('https://wap.goldnurse.com'+path+'/product/service/details1.html?id='+Id+"&re="+getUserId()+"&code="+getlocalStorage("tuigCode"));		//	登录分享链接
	}
	setlocalStorage("goodsId",Id);
	var param = {
		goodsId: Id,
		siteId:site,
		deviceType : 1,
	}
	sendAjaxTrue(getOneGoodsDetail, param, "json", servicegoodlist);
	
})

function servicegoodlist(data){
	console.log(data);		
	if(data.resultcode == 1){
		if(data.result != null && data.result !=''){
			console.log(data.result)
			document.title = data.result.goods.title;
			$("#goodsImage").attr("src",data.result.goods.images.url);
			$("#goodsTitle").html(data.result.goods.title);
			$("#goodsSubTitle").html(data.result.goods.subTitle);
			$('#goodsContent').html(data.result.goods.content);
			
			$('#menu_img').val(data.result.goods.images.url);				//	分享图片
			$('#menu_title').val(data.result.goods.title);					//	分享名字
			$('#menu_desc').val(data.result.goods.subTitle);	
			
			$('#gradeName').html(data.result.goods.grade[0].goodsPrice[0].title);
			$('#serviceTime').html(data.result.goods.grade[0].goodsPrice[0].serviceTime+data.result.goods.grade[0].goodsPrice[0].unit);
			$('#gPrice').html("￥"+data.result.goods.grade[0].goodsPrice[0].price);
			$('#oldPrice').html("￥"+data.result.goods.grade[0].goodsPrice[0].oldPrice);
		}
	}
	// 加载分享按钮功能
	/*if(isWeiXin()){
		setWchatCallback();
	}*/
}

function subscribe(){
	
  	clearLocalStorage(11);
  	
	if(userProving()){
		window.location.href =path+"/product/service/ordernurse.html";
	}else{
		setlocalStorage("returnLoginURL",path+"/product/menushare/details1.html?id="+getlocalStorage("goodsId"));
		window.location.href =path+"/login/loginAmong.html";
	}
}