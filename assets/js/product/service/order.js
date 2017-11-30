function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}
$(function() {
	//	toastLoading("正在加载...");
	if(!localStorageIsNotnull("xd_name")) {
		$('#xd_name').val(getlocalStorage("xd_name"));
	} else {
		if(getUserName() != getUserPhone()) {
			$('#xd_name').val(getUserName());
		}
	}

	if(!localStorageIsNotnull("xd_phone")) {
		$('#xd_phone').val(getlocalStorage("xd_phone"));
	} else {
		$('#xd_phone').val(getUserPhone());
	}

	if(!localStorageIsNotnull("appDate")) {
		$('#appDate').val(getlocalStorage("appDate"));
	}
	if(!localStorageIsNotnull("remarks")) {
		$('#remarks').val(getlocalStorage("remarks"));
	}

	var param = {
		goodsId: getlocalStorage("goodsId"),
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
				//$('#goodsTitle').html(data.result.goods.title);
				$('#xd_hospital').val(data.result.goods.tijianHospitalName);
				setlocalStorage("xd_hospital", data.result.goods.tijianHospitalName)
				setlocalStorage("goodsName", data.result.goods.title)
				if(localStorageIsNotnull("pricePartId")){
					/*	没有优惠券，取商品里的价格信息	 */
					setlocalStorage("payPrice", data.result.goods.grade[0].goodsPrice[0].price);
					$("#xd_department").val(data.result.goods.grade[0].goodsPrice[0].title + "/￥" + data.result.goods.grade[0].goodsPrice[0].price);
					//$('#goodsPrice').html("<i>￥</i>" + data.result.goods.grade[0].goodsPrice[0].price);
					$('#actualPrice').html("￥" + data.result.goods.grade[0].goodsPrice[0].price);
					localStorage.setItem("pricePartId", data.result.goods.grade[0].goodsPrice[0].id);
				}else{
					$("#xd_department").val(getlocalStorage("xd_department"));
					$("#actualPrice").html("￥" + getlocalStorage("payPrice"));
					console.log(getlocalStorage("payPrice"));
				}
				//	缺一个医院名字
				//	localStorage.setItem("goodsPrice", data.result.goods.grade[0].goodsPrice[0].price);
				/*userId 用户id
				goodsId 商品的id
				pricePartId 下单商品的价格明细表id*/
				document.title = data.result.goods.title;
				//localStorage.setItem("goodsId", data.result.goods.id);
				
				if(localStorageIsNotnull("pricePartId")) {
					selectCouponU(data.result.goods.id, data.result.goods.grade[0].goodsPrice[0].id);
				} else {
					selectCouponU(data.result.goods.id, getlocalStorage("pricePartId"));
				}

				$("#yhj_price").val(data.result.goods.id);
			}
		}
	}
}
