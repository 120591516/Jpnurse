var path = basePath();
var Id = getUrlParam("id");
var title = getUrlParam("title");
$("title").html(title);
$(function() {
	toastLoading("正在加载...");
	/*if(GetQueryString("code") != null && GetQueryString("code") != '') {
		setlocalStorage("tuigCode", GetQueryString("code"));
	}
	if(GetQueryString("re") != null && GetQueryString("re") != '') {
		setlocalStorage("recommendId", GetQueryString("re"));
	}*/

	setlocalStorage("goodsId", Id);
	var param = {
		id: Id,
	}
	sendAjaxTrue(healtydetails, param, "json", tanfanglist);

})

function tanfanglist(data) {
	if(data.resultcode == 1) {
		if(data.result != null && data.result != '') {
			console.log(data.result);
			$("#goodsImage").attr("src", data.result.imgUrl);
			$("#goodsTitle").html(data.result.title);
			$("#goodsSubTitle").html(data.result.subTitle);
			$('#goodsContent').html(data.result.content);
			if(data.result.jkwyPackagePriceList[0].activityPromotion != null) {
				yhbtn = '<button>' + data.result.jkwyPackagePriceList[0].activityPromotion.typeName + '</button>';
				$(".n_btn1").show();
				$(".n_btn1").html(yhbtn);

			} else {
				yhbtn = "";

			}

			/*$('#menu_img').val(data.result.goods.images.url); 
			$('#menu_title').val(data.result.goods.title); 
			$('#menu_desc').val(data.result.goods.subTitle);*/

			$('#gradeName').html(data.result.jkwyPackagePriceList[0].title);
			$('#serviceTime').html(data.result.jkwyPackagePriceList[0].serviceTime + data.result.jkwyPackagePriceList[0].unit);
			$('#gPrice').html("￥" + data.result.jkwyPackagePriceList[0].price);
			$('#oldPrice').html("￥" + data.result.jkwyPackagePriceList[0].oldPrice);
		}
	}
	// 加载分享按钮功能
	/*if(isWeiXin()) {
		setWchatCallback();
	}*/
}

function subscribe() {

	clearLocalStorage(1);

	if(userProving()) {
		window.location.href = path + "/product/visit/order.html?id="+Id;
	} else {
		setlocalStorage("returnLoginURL", path + "/product/visit/details.html?id=" + getlocalStorage("goodsId"));
		window.location.href = path + "/login/loginAmong.html";
	}
}