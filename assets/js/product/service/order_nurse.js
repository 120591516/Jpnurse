function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}
var path = basePath();
$(function() {

	toastLoading("正在加载...");
	if(localStorageIsNotnull("goodsId")) {
		window.history.go(-1);
	}
	var nurseId = getlocalStorage("nurseId");
	if(nurseId ==10022){
		console.info(nurseId);
		$("#nursePosition").hide();
	}
	var nurseName = getlocalStorage("nurseName");
	$('#nurseName').html(nurseName);
	if(!localStorageIsNotnull("addessType") && getlocalStorage("addessType") == 1) {

		$('#xd_name').val(getlocalStorage("xd_name"));
		$('#xd_phone').val(getlocalStorage("xd_phone"));
		$('#xd_addess').val(getlocalStorage("xd_addess"));
		$('#xd_detailaddess').val(getlocalStorage("xd_detailaddess"));
	}

	if(!localStorageIsNotnull("checked_shi")) {
		var checked_shi = getlocalStorage("checked_shi");
		if(checked_shi == '否') {
			$("#fou:radio").attr("checked", true);
		}
		if(checked_shi == '是') {
			$("#shi:radio").attr("checked", true);
		}
	}
	if(!localStorageIsNotnull("checked_huli")) {
		var checked_huli = getlocalStorage("checked_huli");
		if(checked_huli == '否') {
			$("#hulis:radio").attr("checked", true);
		}
		if(checked_huli == '是') {
			$("#huli:radio").attr("checked", true);
		}
	}

	if(!localStorageIsNotnull("remarks")) {
		$('#remarks').val(getlocalStorage("remarks"));
	}

	if(!localStorageIsNotnull("bx_name")) {
		$('#bx_name').val(getlocalStorage("bx_name"));
	}
	if(!localStorageIsNotnull("bx_sfz")) {
		$('#bx_sfz').val(getlocalStorage("bx_sfz"));
	}

	if(!localStorageIsNotnull("appDate")) {
		$('#appDate').val(getlocalStorage("appDate"));
	}
	if(!localStorageIsNotnull("pnigtaiType")) {
		$('#pnigtaiType').val(getlocalStorage("pnigtaiType"));
	}

	if(!localStorageIsNotnull("images_arr_length")) {
		$("#xd_isProve").val("已上传" + getlocalStorage("images_arr_length") + "张");
	} else {
		$("#xd_isProve").val("已上传0张");
	}
	//	查询商品详情
	servicegoodDetail();

})

function servicegoodDetail() {
	var nurseId = getlocalStorage("nurseId");
	if(nurseId!=10022){
		var param = {
		goodsId: getlocalStorage("goodsId"),
		userId: getlocalStorage("nurseId"),
		}
		sendAjaxTrue(getNurseServicePrice, param, "json", returnServicegoodDetail)
	}else{
		var param={
			goodsId : getlocalStorage("goodsId"),
		}
		sendAjaxTrue(m_tc,param,"json",returnServicegoodDetail)
	}
}
//http://192.168.7.90:8080/goods/getGoodsAllPrice.json?goodsId=226&siteId=3790272c-0ad4-445d-9fe6-d1710f1b7e06
function returnServicegoodDetail(data) {
	console.log(data);
	var gradeList = [];
	if(data.resultcode == 1) {
		if(data.result != null && data.result != '') {
			// 产品品类ID
			$.each(data.result, function(i, item) {
				var goodsName = item.goodsName;
				var productId = item.productId;

				var dzTool = item.dzTool;
				var hlTool = item.hlTool;
				var insurance = item.insurance;
				var xd_isProve = item.isProve;
				/*if(item.goods.apPrice != 0) {
					$("#shandanlj").show();
					$("#yhjorder").addClass("public-cell-about");
					$("#aptype").html(item.apType);
				}*/
				if(dzTool == 1) {
					$("#istool").removeClass("hide");
				}
				if(hlTool == 1) {
					$("#hltool").removeClass("hide");
				}

				if(insurance == 1) {
					$("#bx_neiro").removeClass("hide");
					var param = {
						id: getUserId(),
					}
					sendAjaxTrue(getInsuranceDetail, param, "json", getInsuranceDetailCike);
				}

				if(xd_isProve == 2 || xd_isProve == 1) {
					$("#xd_isProves").removeClass("hide");
				}

				setlocalStorage("xd_isProve", xd_isProve);
				setlocalStorage("dztool", dzTool);
				setlocalStorage("hltool", hlTool);
				setlocalStorage("bx_neiro", insurance);
				$.each(item.goodsPrice, function(ii, itemPp) {

					gradeList += ['<div onClick="a1(\'' + itemPp.priceId + '\',\'' + itemPp.id + '\',\'' + itemPp.price + '\',\'' + itemPp.serviceNumber + '\')" id="' + itemPp.id + '">',
						itemPp.title + '/' + itemPp.price + '元',
						'</div>'
					].join("");

					if(i == 0 && ii == 0 && 　localStorageIsNotnull("pricePartId")) {
						setlocalStorage("goodsName", goodsName);
						setlocalStorage("productId", productId);
						setlocalStorage("priceId", itemPp.priceId);
						setlocalStorage("pricePartContent", itemPp.title + '/' + itemPp.price + '元');
						setlocalStorage("actualPrice", itemPp.price);
						setlocalStorage("pricePartId", itemPp.id);
						getP();
					} else if(getlocalStorage("pricePartId") == itemPp.id) {
						setlocalStorage("goodsName", goodsName);
						setlocalStorage("productId", productId);
						setlocalStorage("priceId", itemPp.priceId);
						setlocalStorage("pricePartContent", itemPp.title + '/' + itemPp.price + '元');
						setlocalStorage("actualPrice", itemPp.price);
						setlocalStorage("pricePartId", itemPp.id);
						getP();
					}
				})
			})

			$("#goodsName").html(getlocalStorage("goodsName"));
			$("#gradeList").html(gradeList);
			$('#pricePartContent').html(getlocalStorage("pricePartContent"));
			$('#actualPrice').html("￥" + getlocalStorage("actualPrice"));

			if(!localStorageIsNotnull("pricePartIdContent")) {
				$('#pricePartContent').html(getlocalStorage('pricePartIdContent'));
			}
			if(!localStorageIsNotnull("priceCouponVoucher")) {
				$('#actualPrice').html("￥" + getlocalStorage('priceCouponVoucher'));
			}
			getP();
			ClosetoastLoading();
		}
		//	获取用户服务地址
		getUserAddess();

	}
}

function getInsuranceDetailCike(data) {
	console.log(data);
	if(data.resultcode == 1) {
		$("#bx_name").val(data.result.name);
		$("#bx_sfz").val(data.result.sfz);
	}
}

function getUserAddess() {
	var userIdo = getUserId();
	if(IdValStrnigs(userIdo)) {
		window.history.go(-1);
	}
	var param = {
		userId: userIdo,
	}
	sendAjaxTrue(getReceiveAddress, param, "json", setReceiveAddress);
}

function setReceiveAddress(data) {
	console.log(data);
	if(data.resultcode == 1) {
		if(data.result.length > 0) {
			$(".notadds").addClass("hide");
			$("#youadds").show();
			setlocalStorage("addessType", 0)
			if(!localStorageIsNotnull("xd_addsId")) {
				$('#xd_names').html(getlocalStorage("xd_name"));
				$('#xd_phones').html(getlocalStorage("xd_phone"));
				$('#xd_detailaddesss').html(getlocalStorage("xd_addess") + '' + getlocalStorage("xd_detailaddess"));
			} else {
				var province = data.result[0].province;
				var city = data.result[0].city;
				var area = data.result[0].area;
				var phone = data.result[0].phone;
				var name = data.result[0].name;
				var detailaddress = data.result[0].detailaddress;
				var id = data.result[0].id;
				setlocalStorage("xd_addsId", id);
				setlocalStorage("xd_name", name);
				setlocalStorage("xd_phone", phone);
				setlocalStorage("xd_addess", province + '' + city + '-' + area);
				setlocalStorage("xd_detailaddess", detailaddress);

				$('#xd_names').html(getlocalStorage("xd_name"));
				$('#xd_phones').html(getlocalStorage("xd_phone"));
				$('#xd_detailaddesss').html(getlocalStorage("xd_addess") + '' + getlocalStorage("xd_detailaddess"));

			}
		} else {
			$('#addessType').val('1');
			$(".notadds").removeClass("hide");
			$("#youadds").hide();
			setlocalStorage("addessType", 1)
			/*if(localStorageIsNotnull("xd_addsId")){
				alert(1);
				return;
			}
			var xd_name = $('#xd_name').val();
			var xd_phone = $('#xd_phone').val();
			var xd_addess = $('#xd_addess').val();
			var xd_detailaddess = $('#xd_detailaddess').val();
			var remarks =$('#remarks').val();
			if(!IdValStrnigs(remarks)){
				setlocalStorage("remarks",remarks);
			}
			if(IdValStrnigs(xd_name)){
				alert("请输入姓名");
				return false;
			}
			if(IdValStrnigs(xd_phone)){
				alert("请输入手机号");
				return false;
			}
			if(IdValStrnigs(xd_addess)){
				alert("请选择地区");
				return false;
			}
			if(IdValStrnigs(xd_detailaddess)){
				alert("请输入详细地址");
				return false;
			}
			setlocalStorage("xd_addsId",100);
			setlocalStorage("xd_name",xd_name);
			setlocalStorage("xd_phone",xd_phone);
			setlocalStorage("xd_addess",xd_addess);
			setlocalStorage("xd_detailaddess",xd_detailaddess);*/
		}
	}
	selectCouponU(getlocalStorage("goodsId"), getlocalStorage("pricePartId"));
}

function selectCouponU(goodsId, pricePartId) {
	var userIdo = getUserId();
	if(IdValStrnigs(userIdo)) {
		window.history.go(-1);
	}
	// 18309
	param = {
		userId: userIdo,
		goodsId: goodsId,
		pricePartId: pricePartId,
		nurseId: '',
	}
	sendAjaxTrue(getUserVoucher, param, "json", returnUserAllVoucher);
}

function returnUserAllVoucher(data) {
	console.log(data);
	console.log('--------------------');
	if(data.resultcode == 1) {
		$('#yhjNumber').html(data.result.length);
		if(data.result.length > 0) {
			if(localStorage.getItem("voucherTypePrice") != null && localStorage.getItem("voucherTypePrice") != '' &&
				localStorage.getItem("voucherTypePriceamount") != null && localStorage.getItem("voucherTypePriceamount") != '') {
				//  拼接优惠券金额/折扣
				$('#couponContent').html(localStorage.getItem("voucherTypePriceamount") + "/" + localStorage.getItem("voucherTypePrice"));
			}
			//	
			if(localStorage.getItem("priceCouponVoucher") != null && localStorage.getItem("priceCouponVoucher") != '') {
				$('#actualPrice').html("￥" + localStorage.getItem("priceCouponVoucher"));
				getP();
			}
		}
	} else {
		$('#yhjNumber').html(0);
	}

	if(!localStorageIsNotnull("voucherUseId")) {
		var voucherUseId = getlocalStorage("voucherUseId");
		var voucherTypePrice = getlocalStorage("voucherTypePrice");
		var voucherTypePriceamount = getlocalStorage("voucherTypePriceamount");
		couponEmploy(voucherUseId, voucherTypePrice, voucherTypePriceamount);
	}
}


function getP() {
	var paramPa = {
		userId: getUserId(),
		goodsId: getlocalStorage("goodsId"),
		priceId: getlocalStorage("priceId"),
		resourceType: 1,
	}
	console.log(paramPa);
	sendAjaxTrue(getGoodsPromotion, paramPa, "json", function(data) {
		console.log(data);
		if(data.resultcode == 1) {
			$("#shandanlj").show();
			$("#yhjorder").addClass("public-cell-0");
			if(data.result.type == 1) {
				$("#aptype").html("立减");
			}
			if(data.result.type == 2) {
				$("#aptype").html("第一单立减");
			}
			if(data.result.type == 3) {
				$("#aptype").html("第二单立减");
			}
			$("#apprice").html("-￥" + data.result.price);
			var apprice = getlocalStorage("actualPrice") - data.result.price;
			if(apprice <= 0) {
				apprice = 0;
			}
			$('#actualPrice').html(apprice);

		} else {
			$("#shandanlj").hide();
		}

	});
}

function selectCoupon() {
	var numberCoupon = $('#yhjNumber').html();
	if(numberCoupon > 0) {

		if(localStorageIsNotnull("appDate")) {
			layer.msg("请选择时间!", { time: 500 });
			return false;
		}

		var remarks = $('#remarks').val();
		if(!IdValStrnigs(remarks)) {
			setlocalStorage("remarks", remarks);
		}
		var bx_name = $('#bx_name').val();
		if(!IdValStrnigs(bx_name)) {
			setlocalStorage("bx_name", bx_name);
		}
		var bx_phone = $('#bx_phone').val();
		if(!IdValStrnigs(bx_phone)) {
			setlocalStorage("bx_phone", bx_phone);
		}
		if(!localStorageIsNotnull("addessType")) {
			if(getlocalStorage("addessType") == 1) {
				var xd_name = $('#xd_name').val();
				var xd_phone = $('#xd_phone').val();
				var xd_addess = $('#xd_addess').val();
				var xd_detailaddess = $('#xd_detailaddess').val();

				if(IdValStrnigs(xd_name)) {
					layer.msg("请输入姓名!", { time: 500 });
					return false;
				}
				if(IdValStrnigs(xd_phone)) {
					layer.msg("请输入手机号!", { time: 500 });
					return false;
				}
				if(IdValStrnigs(xd_addess)) {
					layer.msg("请选择地区!", { time: 500 });
					return false;
				}
				if(IdValStrnigs(xd_detailaddess)) {
					layer.msg("请输入详细地址!", { time: 500 });
					return false;
				}

				setlocalStorage("xd_name", xd_name);
				setlocalStorage("xd_phone", xd_phone);
				setlocalStorage("xd_addess", xd_addess);
				setlocalStorage("xd_detailaddess", xd_detailaddess);
			}
		}

		window.location.href = path + "/product/Coupon.html";
	}
}

function couponEmploy(voucherUseId, typePrice, amount) {
	//	优惠券ID
	localStorage.setItem("voucherUseId", voucherUseId);
	//	优惠券类型名称
	localStorage.setItem("voucherTypePrice", typePrice);
	//	优惠券金额
	localStorage.setItem("voucherTypePriceamount", amount);

	var nurseIdv = '';
	if(!localStorageIsNotnull("nurseId") && getlocalStorage("pnigtaiType") == 0) {
		nurseIdv = getlocalStorage("nurseId");
	}

	param = {
		userId: getUserId(),
		voucherUseId: voucherUseId,
		pricePartId: localStorage.getItem("pricePartId"),
		nurseId: nurseIdv,
	}
	sendAjaxTrue(getVoucherGoodsPrice, param, "json", returnUserEmployVoucher);

}

function returnUserEmployVoucher(data) {
	console.log(data);
	if(data.resultcode == 1) {
		//	优惠后的价格
		localStorage.setItem("priceCouponVoucher", data.result);
		$('#actualPrice').html("￥" + data.result);
		getP();
	}
}

function getTime() {
	if(!localStorageIsNotnull("addessType")) {
		if(getlocalStorage("addessType") == 1) {
			var xd_name = $('#xd_name').val();
			var xd_phone = $('#xd_phone').val();
			var xd_addess = $('#xd_addess').val();
			var xd_detailaddess = $('#xd_detailaddess').val();
			var remarks = $('#remarks').val();
			if(!IdValStrnigs(remarks)) {
				setlocalStorage("remarks", remarks);
			}
			var bx_name = $('#bx_name').val();
			if(!IdValStrnigs(bx_name)) {
				setlocalStorage("bx_name", bx_name);
			}
			var bx_phone = $('#bx_phone').val();
			if(!IdValStrnigs(bx_phone)) {
				setlocalStorage("bx_phone", bx_phone);
			}

			if(IdValStrnigs(xd_name)) {
				layer.msg("请输入姓名.!", { time: 500 });
				return false;
			}
			if(IdValStrnigs(xd_phone)) {
				layer.msg("请输入手机号!", { time: 500 });
				return false;
			}
			if(IdValStrnigs(xd_addess)) {
				layer.msg("请选择地址!", { time: 500 });
				return false;
			}
			if(IdValStrnigs(xd_detailaddess)) {
				layer.msg("请输入详细地址!", { time: 500 });
				return false;
			}

			setlocalStorage("xd_name", xd_name);
			setlocalStorage("xd_phone", xd_phone);
			setlocalStorage("xd_addess", xd_addess);
			setlocalStorage("xd_detailaddess", xd_detailaddess);
		}
	}
	var bx_name = $('#bx_name').val();
	if(!IdValStrnigs(bx_name)) {
		setlocalStorage("bx_name", bx_name);
	}
	var bx_sfz = $('#bx_sfz').val();
	if(!IdValStrnigs(bx_sfz)) {
		setlocalStorage("bx_sfz", bx_sfz);
	}
	if($("input[name='shi']:checked").val() != undefined) {
		var shi = $("input[name='shi']:checked").val();
		setlocalStorage("checked_shi", shi);
	}
	if($("input[name='huli']:checked").val() != undefined) {
		var huli = $("input[name='huli']:checked").val();
		setlocalStorage("checked_huli", huli);
	}

	window.location.href = path + "/nurse/time.html?orderXtype=6";
}

function setJyzm() {
	if(!localStorageIsNotnull("addessType")) {
		if(getlocalStorage("addessType") == 1) {
			var xd_name = $('#xd_name').val();
			var xd_phone = $('#xd_phone').val();
			var xd_addess = $('#xd_addess').val();
			var xd_detailaddess = $('#xd_detailaddess').val();
			var remarks = $('#remarks').val();
			if(!IdValStrnigs(remarks)) {
				setlocalStorage("remarks", remarks);
			}
			var bx_name = $('#bx_name').val();
			if(!IdValStrnigs(bx_name)) {
				setlocalStorage("bx_name", bx_name);
			}
			var bx_sfz = $('#bx_sfz').val();
			if(!IdValStrnigs(bx_sfz)) {
				setlocalStorage("bx_sfz", bx_sfz);
			}

			if(IdValStrnigs(xd_name)) {
				layer.msg("请输入姓名!", { time: 500 });
				return false;
			}
			if(IdValStrnigs(xd_phone)) {
				layer.msg("请输入手机号!", { time: 500 });
				return false;
			}
			if(IdValStrnigs(xd_addess)) {
				layer.msg("请选择地区!", { time: 500 });
				return false;
			}
			if(IdValStrnigs(xd_detailaddess)) {
				layer.msg("请输入详细地址!", { time: 500 });
				return false;
			}

			setlocalStorage("xd_name", xd_name);
			setlocalStorage("xd_phone", xd_phone);
			setlocalStorage("xd_addess", xd_addess);
			setlocalStorage("xd_detailaddess", xd_detailaddess);
		}
	}

	var remarks = $('#remarks').val();
	if(!IdValStrnigs(remarks)) {
		setlocalStorage("remarks", remarks);
	}
	if($("input[name='shi']:checked").val() != undefined) {
		var shi = $("input[name='shi']:checked").val();
		setlocalStorage("checked_shi", shi);
	}
	if($("input[name='huli']:checked").val() != undefined) {
		var huli = $("input[name='huli']:checked").val();
		setlocalStorage("checked_huli", huli);
	}
	if(!IdValStrnigs($('#bx_name').val())) {
		setlocalStorage("bx_name", $('#bx_name').val());
	}
	if(!IdValStrnigs($('#bx_sfz').val())) {
		setlocalStorage("bx_sfz", $('#bx_sfz').val());
	}

	setlocalStorage("upurldata", 1);
	window.location.href = path + "/product/service/fileupload2.html";
}