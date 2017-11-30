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
	var thId = GetQueryString("thId");
	if(GetQueryString("code") !=null && GetQueryString("code") != '' ){
		setlocalStorage("tuigCode",GetQueryString("code"));
	}
	if(GetQueryString("re") !=null && GetQueryString("re") != '' ){
		setlocalStorage("recommendId",GetQueryString("re"));
	}
	if(!userProving()){
		$('#menu_url').val('https://wap.goldnurse.com'+path+'/product/service/details2.html?id='+Id);				//	未登录分享链接
	}else{
		$('#menu_url').val('https://wap.goldnurse.com'+path+'/product/service/details2.html?id='+Id+"&re="+getUserId());	//	登录分享链接
	}
	$('#menu_img').val('https://jinpai.b0.upaiyun.com/WeChat/1500618193746.jpg');	//	分享图片
	$('#menu_title').val("金牌护士");					//	分享名字
	setlocalStorage("goodsId",Id)
	var param = {
		goodsId: Id,
		siteId:site,
		deviceType : 2,
	}
	sendAjaxTrue(getOneGoodsDetail, param, "json", servicegoodDetail);
	
})

function servicegoodDetail(data){
	console.log(data);		
	if(data.resultcode == 1) {
		if(data.result !=null && data.result != ''){
			document.title = data.result.goods.title;
			if(data.result.goods !=null && data.result.goods != ''){
				$('.sv_img').html(data.result.goods.content);
			}
		}
	}
	// 加载分享按钮功能
			/*if(isWeiXin()){
				setWchatCallback();
			}*/
}

function subscribe(){
	
	/*var storage=window.localStorage;
    for(var i=0;i<storage.length;i++){
        var key=storage.key(i);
        if(key != 'set' && key != 'goodsId'){
        	removeLocalStorage(key);
        	i=-1;
        }
    }*/
   
   /**
	 * 请空出了用户信息的数据
	 */
   /*var userInfo = getlocalStorage("set");
   var goodsIds = getlocalStorage("goodsId");
   var userOpenID = '';
   if(!localStorageIsNotnull("userOpenID")){
   	userOpenID = getlocalStorage("userOpenID");
   }
   localStorage.clear();
   if(!IdValStrnigs(userOpenID)){
   		setlocalStorage('userOpenID',userOpenID);
   }
   setlocalStorage("set",userInfo);
   setlocalStorage("goodsId",goodsIds);*/
	
	clearLocalStorage(2);
	if(userProving()){
		window.location.href = path+"/product/service/orderh.html";
	}else{
		setlocalStorage("returnLoginURL",path+"/product/service/details2.html?id="+getlocalStorage("goodsId"));
		//		window.location.href = "/login/shortcut.html";
			window.location.href =path+"/login/loginAmong.html";
	}
}