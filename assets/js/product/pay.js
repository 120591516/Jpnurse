/*$(function() {
	toastLoading("正在加载...");

	var creatorId = getUserId(); //	creatorId
 
	var creatorName = getUserName(); //	creatorName
	if(getlocalStorage("serviceAndGoodsType") == 1) {
		var patientName = getlocalStorage("patientName");
		var patientPhone = getlocalStorage("patientPhone");
		var appointmentTime = getlocalStorage("appointmentTime");
		var xd_addsId = getlocalStorage("xd_addsId");
		var address = getlocalStorage("address");
		var detailAddress = getlocalStorage("detailAddress");
		var remarks = getlocalStorage("remarks");
		var remark = getlocalStorage("remark");
		var drug = getlocalStorage("drug");
		var isProve = getlocalStorage("isProve");
		var tool = getlocalStorage("tool");
		var departmentId = getlocalStorage("departmentId");
		var hospital = getlocalStorage("hospital");
		var insurance = getlocalStorage("insurance");
		var name = getlocalStorage("name");
		var sfz = getlocalStorage("sfz");
		var images = getlocalStorage("images");
		var voucherUseId = getlocalStorage("voucherUseId");
		var expectorId = getlocalStorage("expectorId");
		var expectorDoctor = getlocalStorage("expectorDoctor");
		var recommendId = getlocalStorage("recommendId");
		var productId = getlocalStorage("productId");
		var title = getlocalStorage("title");
		var goodsId = getlocalStorage("goodsId");
		var serviceNumber = getlocalStorage("serviceNumber");
		var onePrice = getlocalStorage("onePrice");
		var price = getlocalStorage("price");
		var pricePartId = getlocalStorage("pricePartId");
		var payPrice = getlocalStorage("payPrice");
		var profit = getlocalStorage("profit");
		var schedule = getlocalStorage("schedule");
		var order_img = getlocalStorage("order_img");
		var device = getlocalStorage("device");
		var platformId = getlocalStorage("platformId");
		var siteId = getlocalStorage("siteId");
		console.log("creatorId==" + creatorId);
		console.log("creatorName==" + creatorName);
		console.log("patientName==" + patientName);
		console.log("patientPhone==" + patientPhone);
		console.log("appointmentTime==" + appointmentTime);
		console.log("xd_addsId==" + xd_addsId);
		console.log("address==" + address);
		console.log("detailAddress==" + detailAddress);
		console.log("remarks==" + remarks);
		console.log("remark==" + remark);
		console.log("drug==" + drug);
		console.log("isProve==" + isProve);
		console.log("tool==" + tool);
		console.log("departmentId==" + departmentId);
		console.log("hospital==" + hospital);
		console.log("insurance==" + insurance);
		console.log("name==" + name);
		console.log("sfz==" + sfz);
		console.log("images==" + images);
		console.log("voucherUseId==" + voucherUseId);
		console.log("expectorId==" + expectorId);
		console.log("expectorDoctor==" + expectorDoctor);
		console.log("recommendId==" + recommendId);
		console.log("productId==" + productId);
		console.log("title==" + title);
		console.log("goodsId==" + goodsId);
		console.log("serviceNumber==" + serviceNumber);
		console.log("onePrice==" + onePrice);
		console.log("price==" + serviceNumber);
		console.log("pricePartId==" + pricePartId);
		console.log("payPrice==" + payPrice);
		console.log("profit==" + profit);
		console.log("schedule==" + schedule);
		console.log("order_img==" + order_img);
		console.log("device==" + device);
		console.log("platformId==" + platformId);
		console.log("siteId==" + siteId);

		param = {
			creatorId: creatorId,
			creatorName: creatorName,
			patientName: patientName,
			patientPhone: patientPhone,
			appointmentTime: appointmentTime,
			addressId: xd_addsId,
			address: detailAddress,
			province: address,
			detailAddress: detailAddress,
			remarks: remarks,
			remark: remark,
			drug: drug,
			isProve: isProve,
			tool: tool,
			departmentId: departmentId,
			hospital: hospital,
			insurance: insurance,
			name: name,
			sfz: sfz,
			images: images,
			voucherUseId: voucherUseId,
			expectorId: expectorId,
			expectorDoctor: expectorDoctor,
			recommendId: recommendId,
			productId: productId,
			title: title,
			goodsId: goodsId,
			serviceNumber: serviceNumber,
			onePrice: onePrice,
			price: price,
			pricePartId: pricePartId,
			payPrice: payPrice,
			profit: profit,
			schedule: schedule,
			order_img: order_img,
			device: device,
			platformId: platformId,
			siteId: siteId,
		}
		HttpAjax(createOrderNewsss, param, "json", orderPay);
	} else if(getlocalStorage("serviceAndGoodsType") == 2){
		 var commodityIds = getlocalStorage("commodityIds");
		 var cpIds = getlocalStorage("cpIds");
		 var userAddressId = getlocalStorage("userAddressId");
		 var remark = getlocalStorage("remark");
		 var carIds = getlocalStorage("carIds");
		 var payPrice = getlocalStorage("payPrice");
		 var number = getlocalStorage("number");
		  var re = getlocalStorage("re");
		 document.getElementById("payPrice").innerHTML = "￥"+payPrice;
		 
		param = {
				userId: creatorId,
				commodityIds: commodityIds,
				cpIds: cpIds,
				userAddressId: userAddressId,
				carIds: carIds,
				remark: remark,
				payPrice: payPrice,
				number : number,
				guideId:re,
			}
		 
		 sendAjaxTrue(createOrder, param, "json", function(data) {
				if(data.resultcode == 1) {
					param = {
						goodsName: data.result.goodsName,
						orderNo: data.result.orderNo,
						userId: creatorId,
						return_url: 'https://wap.jinpaihushi.com/personal/order/goods/orderlist.html',
						payParice: data.result.payParice,
						serviceType:2,
						show_url:'https://wap.jinpaihushi.com',
						type: 1,
						source: 4,
					}
					
					sendAjaxTrue(orderPays_par, param, "json", returnOrderPay);
				}

			})
	}else if(getlocalStorage("serviceAndGoodsType") == 3){
		var goodsName = getlocalStorage("goodsName");
		var orderNos = getlocalStorage("orderNos");
		var payPrice = getlocalStorage("payPrice");
					param = {
						goodsName: goodsName,
						orderNo: orderNos,
						userId: creatorId,
						return_url: 'https://wap.jinpaihushi.com/personal/order/goods/orderlist.html',
						payParice: payPrice,
						serviceType:2,
						show_url:'https://wap.jinpaihushi.com',
						type: 1,
						source: 4,
					}
					
					sendAjaxTrue(orderPays_par, param, "json", returnOrderPay);
				 

			 
	}else if(getlocalStorage("serviceAndGoodsType") == 4){
		var goodsName = getlocalStorage("ipN_goodsName");
		var orderNos = getlocalStorage("ipN_orderNo");
		var payPrice = getlocalStorage("ipN_payPrice");
					param = {
						goodsName: goodsName,
						orderNo: orderNos,
						userId: creatorId,
						return_url: 'https://wap.jinpaihushi.com/personal/order/goods/orderlist.html',
						payParice: payPrice,
						serviceType:2,
						show_url:'https://wap.jinpaihushi.com',
						type: 1,
						source: 4,
					}
					
					sendAjaxTrue(orderPays_par, param, "json", returnOrderPay);
	}

})*/

$(function() {
	window.history.forward(1);
	if(isWeiXin()){
		setWchatCallbackPay();
	}
	param = { //发送给数据库的数据				   	
		userId: getUserId(),
	}
	sendAjaxTrue(getUserAccount, param, 'json', getUserAccountCallback);
})
		
function getUserAccountCallback(data){
	if(data.resultcode == 1){
		$("#balance").html('￥'+data.result.balance);
	}
}
var path = basePath();
$(function() {

	if (isWeiXin()) {
		// 执行操作
		$('#alipay_hide').addClass('hide');
	}
	$('#payPrice').html("￥" + getlocalStorage("payPrice"));
	
	var payUserid = getUserId();
	if (!localStorageIsNotnull("zf_type") ) {
		if( getlocalStorage("serviceAndGoodsType") == 1  ){
			if (!localStorageIsNotnull("payOrderId")) {
				param = {
					orderId: getlocalStorage("payOrderId"),
					userId: payUserid,
				}
				sendAjaxTrue(getUserOrderStatus, param, "json", returnPayUserOrderStatus);
			}
			if (!localStorageIsNotnull("ipN_orderId")) {
				param = {
					orderId: getlocalStorage('ipN_orderId'),
					userId: payUserid,
				}
				sendAjaxTrue(getUserOrderStatus, param, "json", returnPayUserOrderStatus);
			}
		}
		
		
		if( getlocalStorage("serviceAndGoodsType") == 3 ){
			if(!localStorageIsNotnull("payOrderNo")){
				param = {
					orderNo: getlocalStorage("payOrderNo"),
					userId: payUserid,
				}
				sendAjaxTrue(getStatusByOrderNo, param, "json", returnPayUserOrderStatus);
			}
		}
		if(getlocalStorage("serviceAndGoodsType") == 2){
			if(!localStorageIsNotnull("toPayFlag")){
				location.href = path+"/personal/order/goods/orderlist.html"
			}
		}
	}
	
})

setInterval('myrefresh()', 5000); //指定1秒刷新一次 

function myrefresh() {
	var payUserid = getUserId();
	if (!localStorageIsNotnull("zf_type")) {
		if( getlocalStorage("serviceAndGoodsType") == 1 ){
			if (!localStorageIsNotnull("payOrderId")) {
				param = {
					orderId: getlocalStorage("payOrderId"),
					userId: payUserid,
				}
				sendAjaxTrue(getUserOrderStatus, param, "json", returnPayUserOrderStatus);
			}
			if (!localStorageIsNotnull("ipN_orderId")) {
				param = {
					orderId: getlocalStorage('ipN_orderId'),
					userId: payUserid,
				}
				sendAjaxTrue(getUserOrderStatus, param, "json", returnPayUserOrderStatus);
			}
		}
		
		if( getlocalStorage("serviceAndGoodsType") == 3 ){
			if(!localStorageIsNotnull("payOrderNo")){
				param = {
					orderNo: getlocalStorage("payOrderNo"),
					userId: payUserid,
				}
				sendAjaxTrue(getStatusByOrderNo, param, "json", returnPayUserOrderStatus);
			}
		}
		
		if(getlocalStorage("serviceAndGoodsType") == 2){
			if(!localStorageIsNotnull("toPayFlag")){
				location.href =path+"/personal/order/goods/orderlist.html"
			}
		}
	}
}

function returnPayUserOrderStatus(data) {
	console.info(data.result);
	if (data.result == 1) {
		window.location.href =path+"/personal/order/goods/orderlist.html";
	}
}

function returnPayUserOrderStatusGoods(data){
	console.info(data.result);
	if (data.result == 1) {
		window.location.href = path+"/personal/order/goods/orderlist.html";
	}
}

function orderDoPay(){
	var zf_type = $("input[name='zf']:checked").val();
	if (IdValStrnigs(zf_type)) {
		layer.msg("请选择支付方式!", {
			time: 500
		});
		return false;
	}
	setlocalStorage("zf_type", zf_type);
	
	if(zf_type == 5){
		toastCallBack("确认支付？","",orderDoPayOne);
	}else{
		orderDoPayOne();
	}
}

function orderDoPayOne() {
	
	if (isWeiXin() && getlocalStorage("zf_type") != 5) {
		// 执行操作
		setlocalStorage("zf_type", 4);
	}
	var creatorId = getUserId(); //	creatorId
	var openid_pay = '';
	if (!localStorageIsNotnull("userOpenID")) {
		openid_pay = getlocalStorage("userOpenID");
	}
	var creatorName = getUserName(); //	creatorName
	if (getlocalStorage("serviceAndGoodsType") == 1) {
		//	getlocalStorage("payOrderId");
		param = {
			goodsName: getlocalStorage("goodsName"),
			orderNo: getlocalStorage("orderNo"),
			userId: creatorId,
			return_url: 'https://wap.goldnurse.com'+path+'/personal/order/service/orderlist.html',
			payParice: getlocalStorage("payPrice"),
			serviceType: 1, //	支付1：服务，2：商品
			show_url: 'https://wap.goldnurse.com',
			type: getlocalStorage("zf_type"), //	支付方式	1：支付宝；2微信扫码；3：微信web支付
			source: 4, //	平台,4-端
			openid: openid_pay,
		}
		sendAjaxTrue(orderPays_par, param, "json", returnOrderPay);
		
	} else if (getlocalStorage("serviceAndGoodsType") == 2) {
		var carIds = getlocalStorage("carIds");
		var voucherMapId_ = getlocalStorage("voucherMapId_");
		var userAddressId = getlocalStorage("userAddressId");
		var recommendId = getlocalStorage("re");
		var remarkMap_ = getlocalStorage("remarkMap_");
		var payPrice = getlocalStorage("payPrice");
		var number = 0;
		var code = getlocalStorage("code");
		param = {
			carArr: carIds,
			userId: creatorId,
			voucherMapId_: voucherMapId_,
			userAddressId: userAddressId,
			recommendId: recommendId,
			remarkArr: remarkMap_,
			payPrice: payPrice,
			number: number,
			code:code,
			device:deviceType,
			platformId:platformId,
			siteId : site,
		}

		sendAjaxTrue(createOrders, param, "json", function(data) {
			
			console.log(data);
			if (data.resultcode == 1) {
				setlocalStorage("payOrderNo", data.result.orderNo);
				param = {
					goodsName: data.result.goodsName,
					orderNo: data.result.orderNo,
					userId: creatorId,
					return_url: 'https://wap.goldnurse.com'+path+'/personal/order/goods/orderlist.html',
					payParice: data.result.payPrice,
					serviceType: 2,
					show_url: 'https://wap.goldnurse.com',
					type: getlocalStorage("zf_type"),
					source: 4,
					openid: openid_pay,
				}

				sendAjaxTrue(orderPays_par, param, "json", returnOrderPay);
			}
		})
	} else if (getlocalStorage("serviceAndGoodsType") == 3) {
		var goodsName = getlocalStorage("goodsName");
		var orderNos = getlocalStorage("orderNos");
		var payPrice = getlocalStorage("payPrice");
		setlocalStorage("payOrderNo", orderNos);
		param = {
			goodsName: goodsName,
			orderNo: orderNos,
			userId: creatorId,
			return_url: 'https://wap.goldnurse.com'+path+'/personal/order/goods/orderlist.html',
			payParice: payPrice,
			serviceType: 2,
			show_url: 'https://wap.goldnurse.com',
			type: getlocalStorage("zf_type"),
			source: 4,
			openid: openid_pay,
		}

		sendAjaxTrue(orderPays_par, param, "json", returnOrderPay);

	} else if (getlocalStorage("serviceAndGoodsType") == 4) {
		var goodsName = getlocalStorage("ipN_goodsName");
		var orderNos = getlocalStorage("ipN_orderNo");
		var payPrice = getlocalStorage("ipN_payPrice");
		setlocalStorage("payOrderNo", orderNos);
		param = {
			goodsName: goodsName,
			orderNo: orderNos,
			userId: creatorId,
			return_url: 'https://wap.goldnurse.com'+path+'/personal/order/service/orderlist.html',
			payParice: payPrice,
			serviceType: 1,
			show_url: 'https://wap.goldnurse.com',
			type: getlocalStorage("zf_type"),
			source: 4,
			openid: openid_pay,
		}

		sendAjaxTrue(orderPays_par, param, "json", returnOrderPay);
	}

}

function returnOrderPay(data) {
	console.log(data);
	if (data.resultcode == 1) {
		
		if(getlocalStorage("serviceAndGoodsType") ==2){
			setlocalStorage("toPayFlag",1);
		}
		
		if (getlocalStorage("zf_type") == 3) {
			window.location.href = data.result.url;
		} else if (getlocalStorage("zf_type") == 4) {

//			var chooseWXPay_data = JSON.parse(data.result);
			wx.chooseWXPay({
				timestamp: data.result.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
				nonceStr: data.result.nonce_str, // 支付签名随机串，不长于 32 位
				package: data.result.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
				signType: data.result.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
				paySign: data.result.paySign, // 支付签名
				success: function(res) {
					// 支付成功后的回调函数
					if(getlocalStorage("serviceAndGoodsType") == 2 || getlocalStorage("serviceAndGoodsType") == 3 ){
						window.location.href = path+"/personal/order/goods/orderlist.html";
					}else{
						window.location.href = path+"/personal/order/service/orderlist.html";
					}
				},
				cancel: function() {
					// 用户取消分享后执行的回调函数
				}
			});
		} else if (getlocalStorage("zf_type") == 5){
//			layer.msg(data.msg, { time: 900 });
			// 支付成功后的回调函数
			if(getlocalStorage("serviceAndGoodsType") == 2 || getlocalStorage("serviceAndGoodsType") == 3 ){
				toast(data.msg,"",path+"/personal/order/goods/orderlist.html");
//				window.location.href = "/personal/order/goods/orderlist.html";
			}else{
				toast(data.msg,"",path+"/personal/order/service/orderlist.html");
//				window.location.href = "/personal/order/service/orderlist.html";
			}
		} else {
			$('#alipay').html(data.result.sign_from);
		}
	} else {
		if(getlocalStorage("serviceAndGoodsType") ==2){
			setlocalStorage("toPayFlag",1);
		}
		layer.msg(data.msg, {
			time: 900
		});
		
	}
}
 