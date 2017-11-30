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

	setlocalStorage("goodsId", Id);
	var param = {
		goodsId: Id,
		siteId: site,
		deviceType: 2,
	}
	sendAjaxTrue(getOneGoodsDetail, param, "json", servicegoodDetail);

})

function servicegoodDetail(data) {
	console.log(data);
	if(data.resultcode == 1) {
		if(data.result != null && data.result != '') {
			if(data.result.goods != null && data.result.goods != '') {
				//document.title = data.result.goods.title;
				$('.sv_img').html(data.result.goods.content);
				$("#goodsImage").attr("src", data.result.goods.images.url);
				$("#goodsTitle").html(data.result.goods.title);
				$("#goodsSubTitle").html(data.result.goods.subTitle);
				$('#goodsContent').html(data.result.goods.content);
				$('#gradeName').html(data.result.goods.grade[0].goodsPrice[0].title);
				$('#serviceTime').html(data.result.goods.grade[0].goodsPrice[0].serviceTime + data.result.goods.grade[0].goodsPrice[0].unit);
				$('#gPrice').html("￥" + data.result.goods.grade[0].goodsPrice[0].price);
				$('#oldPrice').html("￥" + data.result.goods.grade[0].goodsPrice[0].oldPrice);
			}
		}
	}
}

function subscribe() {

	/**
	 * 请空出了用户信息的数据
	 */
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
	setlocalStorage("set", userInfo);
	setlocalStorage("goodsId", goodsIds);*/

	clearLocalStorage(3);
	if(userProving()) {
		window.location.href = path + "/product/service/order.html";
	} else {
		setlocalStorage("returnLoginURL", path + "/product/service/tijian_details.html?id=" + getlocalStorage("goodsId"));
		//		window.location.href = "/login/shortcut.html";
		window.location.href = path + "/login/loginAmong.html";
	}
}