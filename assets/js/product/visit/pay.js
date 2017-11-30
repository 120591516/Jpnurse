$(function() {
	$("#payPrice").html("￥" + getlocalStorage("payprice"));
	if(isWeiXin()) {
		setWchatCallbackPay();
		$('#alipay_hide').hide();
	}
})
var path = basePath();

function orderDoPay() {
	var zf_type = $("input[name='zf']:checked").val();
	if(IdValStrnigs(zf_type)) {
		layer.msg("请选择支付方式!", {
			time: 500
		});
		return false;
	}
	setlocalStorage("zf_type", zf_type);
	orderDoPayOne();
}

function orderDoPayOne() {

	if(isWeiXin()) {
		// 公众号支付
		setlocalStorage("zf_type", 4);
	}
	var creatorId = getUserId(); //	creatorId
	var openid_pay = '';
	if(!localStorageIsNotnull("userOpenID")) {
		openid_pay = getlocalStorage("userOpenID");
	}
	param = {
		goodsName: getlocalStorage("goodsName"),
		orderNo: getlocalStorage("orderNo"),
		userId: creatorId,
		return_url: 'https://wp.goldnurse.com/' + path + '/product/visit/success.html',
		payParice: getlocalStorage("payprice"),
		serviceType: 4, //	4：健康优护套餐
		show_url: 'https://wp.goldnurse.com/',
		type: getlocalStorage("zf_type"), //	支付方式	1：支付宝；3：微信web支付 4。公众号
		source: 4, //	平台,4-端
		openid: openid_pay,
	}
	sendAjaxTrue(orderPays_par, param, "json", returnOrderPay);

}

function returnOrderPay(data) {
	console.log(data);
	if(data.resultcode == 1) {
		if(getlocalStorage("zf_type") == 1) {
			$("#alipay").html(data.result.sign_from);
		} else if(getlocalStorage("zf_type") == 3) {
			window.location.href = data.result.url;
		} else {
			wx.chooseWXPay({
				timestamp: data.result.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
				nonceStr: data.result.nonce_str, // 支付签名随机串，不长于 32 位
				package: data.result.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
				signType: data.result.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
				paySign: data.result.paySign, // 支付签名
				success: function(res) {
					window.location.href = path + "/product/visit/success.html";
				},
				cancel: function() {
					// 用户取消分享后执行的回调函数
				}
			});
		}

	}if(data.resultcode == 2){
		window.location.href = path + "/product/visit/success.html";
	}
}