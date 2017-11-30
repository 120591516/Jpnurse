function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}
var path = basePath();
$(function() {

	$('#mradio').attr("disabled", "disabled");
	//	toastLoading("正在加载...");
	if(!localStorageIsNotnull("goodsId")) {
		setlocalStorage("goodsId", getlocalStorage("goodsId"));
	} else {
		/*Id = getlocalStorage("goodsId");*/
	}

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

	var param = {
		goodsId: getlocalStorage("goodsId"),
		siteId: site,
		deviceType: 2,
	}
	sendAjaxTrue(getOneGoodsDetail, param, "json", returnServicegoodDetail);
}

function remoHite() {
	$("body").css("overflow", "auto");
	$("body").css("position", "relative");
	$('.order-gj').addClass('hide');
	$('#dzTool_zs').addClass('hide');
	$('#hlTool_zs').addClass('hide');
}

function returnServicegoodDetail(data) {
	console.log(data);
	var gradeList = [];
	if(data.resultcode == 1) {
		if(data.result != null && data.result != '') {
			var goodsTitle = data.result.goods.title;
			$('#goodsName').html(goodsTitle);
			var goodsId = data.result.goods.id;
			var dzTool = data.result.goods.dzTool;
			var hlTool = data.result.goods.hlTool;
			var insurance = data.result.goods.insurance;
			var xd_isProve = data.result.goods.isProve;
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
			//判断是内部单还是开放单
			var type = data.result.goods.type;
			if(type==0){
				$('#is_grab_single_false').hide();
				$('#is_grab_single_true').hide();
			}
//			else{
//			//是否是抢单还是指定单
//			var isGrabSingle = data.result.goods.isGrabSingle;
//				//isGrabSingle 值：1、抢单，2、指定，3、抢单+指定
//				//抢单模式
//				if(isGrabSingle==1){
//					//console.info("抢单模式");
//					//隐藏推荐护士
//					$('#is_grab_single_false').hide();
//				}
//				if(isGrabSingle==2){
//					//console.info("指定护士模式");
//					//隐藏推荐护士
//					$('#is_grab_single_true').hide();
//				}
//			}
			setlocalStorage("xd_isProve", xd_isProve);
			setlocalStorage("dztool", dzTool);
			setlocalStorage("hltool", hlTool);
			setlocalStorage("bx_neiro", insurance);
			setlocalStorage("goodsName", goodsTitle);
			var productName = data.result.goods.productName;
			var productId = data.result.goods.productId;
			// 产品品类ID
			setlocalStorage("productId", productId);
			$.each(data.result.goods.grade, function(i, item) {
				var gradeName = item.name;
				$.each(item.goodsPrice, function(ii, itemPp) {

					/*gradeList += ['<div onClick="a1(\''+itemPp.id+'\',\''+itemPp.price+'\',\''+itemPp.serviceNumber+'\')" id="'+itemPp.id+'">',
							itemPp.title+'/'+itemPp.price+'元',
							'/'+itemPp.serviceNumber+'次/'+itemPp.serviceTime+itemPp.unit,
							'</div>'*/
					/*gradeList += ['<div onClick="a1(\''+itemPp.priceId+'\',\''+itemPp.id+'\',\''+itemPp.price+'\',\''+itemPp.serviceNumber+'\')" id="'+itemPp.id+'">',
					itemPp.title+'/'+itemPp.price+'元',
					'</div>'*/

					gradeList += ['<div onClick="a1(\'' + itemPp.priceId + '\',\'' + itemPp.id + '\',\'' + itemPp.price + '\',\'' + itemPp.serviceNumber + '\')" id="' + itemPp.id + '">',
						itemPp.title + '/' + itemPp.price + '元',
						'</div>'
					].join("");

					if(i == 0 && ii == 0 && 　localStorageIsNotnull("this_pricePartId")) {
						document.getElementById('pricePartContent').innerHTML = gradeList;
						setlocalStorage("priceId", itemPp.priceId);
						setlocalStorage("pricePartContent", itemPp.title + '/' + itemPp.price + '元');
						setlocalStorage("actualPrice", itemPp.price);
						setlocalStorage("this_pricePartId", itemPp.id);
					}
				})
			})
			$("#gradeList").html(gradeList);
			$('#pricePartContent').html(getlocalStorage("pricePartContent"));
			$('#actualPrice').html(getlocalStorage("actualPrice"));
			
			getP();
			//	ls空间不为空则获取空间里的值
			if(!localStorageIsNotnull("pricePartIdContent")) {
				$('#pricePartContent').html(getlocalStorage('pricePartIdContent'));
			}
			if(!localStorageIsNotnull("priceCouponVoucher")) {
				$('#actualPrice').html(getlocalStorage('priceCouponVoucher'));
			}
			ClosetoastLoading();
		}
		//	获取用户服务地址
		getUserAddess();

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
				toast(1);
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
				layer.msg("请输入姓名!",{time:500});
				return false;
			}
			if(IdValStrnigs(xd_phone)){
				layer.msg("请输入手机号!",{time:500});
				return false;
			}
			if(IdValStrnigs(xd_addess)){
				layer.msg("请选择地区!",{time:500});
				return false;
			}
			if(IdValStrnigs(xd_detailaddess)){
				layer.msg("请输入详细地址!",{time:500});
				return false;
			}
			setlocalStorage("xd_addsId",100);
			setlocalStorage("xd_name",xd_name);
			setlocalStorage("xd_phone",xd_phone);
			setlocalStorage("xd_addess",xd_addess);
			setlocalStorage("xd_detailaddess",xd_detailaddess);*/
		}
	}

	/*var paramPa={
		userId:getUserId(),
		goodsId:getlocalStorage("goodsId"),
		priceId:getlocalStorage("priceId"),
		resourceType:1,
	}
	console.log("-----------1111111111-----------");
	console.log(paramPa);
	console.log("-----------11111111-----------");
	sendAjaxTrue(getGoodsPromotion,paramPa,"json",function(data){
		if(data.resultcode == 1){
			$("#shandanlj").show();
			$("#yhjorder").addClass("public-cell-about");
			$("#aptype").html(data.result.goods.apType);
			
			alert(1)
		}
	});*/

	if(localStorageIsNotnull("appDate")) {
		$('#yhj_Name').html("无");
		$('#couponContent').html("无");
		$('#nurseNumber').html('0');
		$("#nradio:radio").attr("checked", true);
		return false;
	}
	//	获取推荐护士
	recommendNurselist();
}

function getP() {
	var paramPa = {
		userId: getUserId(),
		goodsId: getlocalStorage("goodsId"),
		priceId: getlocalStorage("priceId"),
		resourceType: 1,
	}
	console.log("-----------1111111111-----------");
	console.log(paramPa);
	console.log("-----------11111111-----------");
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
			var apprice = 0;
			if($('#pnigtaiType').val() == 2){
				if(localStorageIsNotnull("voucherUseId")){
					apprice = Number(getlocalStorage("nursePrice")) - data.result.price;
				}else{
					apprice = Number(getlocalStorage("priceCouponVoucher")) - data.result.price;
				}
			}
			if($('#pnigtaiType').val() == 1){
				if(localStorageIsNotnull("voucherUseId")){
					apprice = Number(getlocalStorage("actualPrice")) - data.result.price;
				}else{
					apprice = Number(getlocalStorage("priceCouponVoucher")) - data.result.price;
				}
			}
			if(IdValStrnigs($('#pnigtaiType').val())){
				apprice = Number(getlocalStorage("actualPrice")) - data.result.price;
			}
				
			if(apprice <= 0) {
				apprice = 0;
			}
			$('#actualPrice').html(apprice);
		} else {
			$("#shandanlj").hide();
		}

	});
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

function getInsuranceDetailCike(data) {
	console.log(data);
	if(data.resultcode == 1) {
		$("#bx_name").val(data.result.name);
		$("#bx_sfz").val(data.result.sfz);
	}
}

function returnUserAllVoucher(data) {
	console.log(data);
	console.log('--------------------');
	if(data.resultcode == 1) {
		if(data.result.length > 0) {
			$('#yhjNumber').html(data.result.length);
			$('#yhj_Name').html("张");
			if(localStorage.getItem("voucherTypePrice") != null && localStorage.getItem("voucherTypePrice") != '' &&
				localStorage.getItem("voucherTypePriceamount") != null && localStorage.getItem("voucherTypePriceamount") != '') {
				//  拼接优惠券金额/折扣
				$('#couponContent').html(localStorage.getItem("voucherTypePriceamount") + "/" + localStorage.getItem("voucherTypePrice"));
			}
			//	
			if(localStorage.getItem("priceCouponVoucher") != null && localStorage.getItem("priceCouponVoucher") != '') {
				$('#actualPrice').html(localStorage.getItem("priceCouponVoucher"));
				getP();
			}
		} else {
			$('#yhj_Name').html("无");
			$('#couponContent').html("无");
		}
	} else {
		$('#yhj_Name').html("无");
		$('#couponContent').html("无");
	}

	if(!localStorageIsNotnull("voucherUseId")) {
		var voucherUseId = getlocalStorage("voucherUseId");
		var voucherTypePrice = getlocalStorage("voucherTypePrice");
		var voucherTypePriceamount = getlocalStorage("voucherTypePriceamount");
		couponEmploy(voucherUseId, voucherTypePrice, voucherTypePriceamount);
	} else {
		if($('#nurseNumber').html() > 0 && $('#pnigtaiType').val() == 2) {
			show_n(1);
		} else {
			hide_n(1);
		}
	}
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
		var bx_sfz = $('#bx_sfz').val();
		if(!IdValStrnigs(bx_sfz)) {
			setlocalStorage("bx_sfz", bx_sfz);
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
		if($("input[name='shi']:checked").val() != undefined) {
			var shi = $("input[name='shi']:checked").val();
			setlocalStorage("checked_shi", shi);
		}
		if($("input[name='huli']:checked").val() != undefined) {
			var huli = $("input[name='huli']:checked").val();
			setlocalStorage("checked_huli", huli);
		}
		setlocalStorage("returnLoginURL", path + "/product/service/order1.html");
		window.location.href = path + "/product/Coupon.html";
	}
}

function recommendNurselist() {
	if(localStorageIsNotnull("appDate")) {
		layer.msg("请选择时间!", { time: 500 });
		return false;
	}

	if($("input[name='shi']:checked").val() != undefined) {
		var shi = $("input[name='shi']:checked").val();
		setlocalStorage("checked_shi", shi);
	}
	if($("input[name='huli']:checked").val() != undefined) {
		var huli = $("input[name='huli']:checked").val();
		setlocalStorage("checked_huli", huli);
	}

	var lat1;
	var lon1;

	var seds = true;
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(pos) {
			lat1 = pos.coords.latitude;
			lon1 = pos.coords.longitude;
			seds = false;

			param = {
				lon: lon1,
				lat: lat1,
				goodsId: getlocalStorage("goodsId"),
				time: getlocalStorage("appDate"),
				priceId: getlocalStorage("priceId"),
			}
			sendAjaxTrue(getRecommendNurse, param, "json", returnRecommendNurselists);
		});
		if(seds) {
			param = {
				lon: lon1,
				lat: lat1,
				goodsId: getlocalStorage("goodsId"),
				time: getlocalStorage("appDate"),
				priceId: getlocalStorage("priceId"),
			}
			sendAjaxTrue(getRecommendNurse, param, "json", returnRecommendNurselists);
		}
	} else {
		param = {
			lon: lon1,
			lat: lat1,
			goodsId: getlocalStorage("goodsId"),
			time: getlocalStorage("appDate"),
			priceId: getlocalStorage("priceId"),
		}
		sendAjaxTrue(getRecommendNurse, param, "json", returnRecommendNurselists);
	}

}

function returnRecommendNurselists(data) {
	if(data.resultcode == 1 && 　!IdValStrnigs(data.result)) {
		$('#nurseNumber').html(data.result.list.length);
		if(data.result.list.length > 0) {
			var lenthNurse = 0;
			if(!localStorageIsNotnull("nurseTarget")) {
				lenthNurse = getlocalStorage("nurseTarget");
			}

			var nurseId = data.result.list[lenthNurse].nurseId;
			var nurseHospital = data.result.list[lenthNurse].nurseHospital;
			var nurseName = data.result.list[lenthNurse].nurseName;
			var nurseSex = data.result.list[lenthNurse].nurseSex;
			var nursePrice = data.result.list[lenthNurse].price;
			var price_id = data.result.list[lenthNurse].price_id;
			var price_part_id = data.result.list[lenthNurse].price_part_id;
			var nurse_url = data.result.list[lenthNurse].url;
			var serviceNumber = data.result.list[lenthNurse].serviceNumber;
			var workYear = data.result.list[lenthNurse].workYear;
			setlocalStorage("nurseId", nurseId);
			setlocalStorage("nurseHospital", nurseHospital);
			setlocalStorage("nurseName", nurseName);
			setlocalStorage("nurseSex", nurseSex);
			setlocalStorage("nursePrice", nursePrice);
			setlocalStorage("priceId", price_id);
			setlocalStorage("nurse_pricePartId", price_part_id);
			setlocalStorage("nurseUrl", nurse_url);
			setlocalStorage("nurseServiceNumber", serviceNumber);

			$('.n_name').html(nurseName);
			var sexH = '';
			if(nurseSex == 1) {
				sexH = '<img src="/assets/img/service/hus_xingbie_nv@2x.png" width="15" height="15" id="n_sex_img"/>';

			} else {
				sexH = '<img src="/assets/img/service/hus_xingbie_nan@2x.png" width="15" height="15" id="n_sex_img"/>';
			}
			if($('#pnigtaiType').val() == 2) {
				$('#actualPrice').html(getlocalStorage('nursePrice'));
				getP();
			}
			$('.n_price').html("￥" + nursePrice);
			$('#nurseHospital').html(nurseHospital);
			$('#nurseServiceNumber').html(serviceNumber);
			$('.nlist_tx').attr('src', nurse_url);
			$(".n_sex").html(sexH);
			$("#jingyan").html(workYear + "年工作经验");

		}
	}
	if($('#nurseNumber').html() > 0) {
		$('#mradio').removeAttr("disabled");
	}

	if($('#nurseNumber').html() > 0 && $('#pnigtaiType').val() == 2) {
		$("#mradio:radio").attr("checked", true);
		setlocalStorage("pricePartId", getlocalStorage("nurse_pricePartId"));
		selectCouponU(getlocalStorage("goodsId"), getlocalStorage("nurse_pricePartId"));
	} else {
		$("#nradio:radio").attr("checked", true);
		setlocalStorage("pricePartId", getlocalStorage("this_pricePartId"));
		selectCouponU(getlocalStorage("goodsId"), getlocalStorage("this_pricePartId"));
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
	if(!localStorageIsNotnull("nurseId") && getlocalStorage("pnigtaiType") == 2) {
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
		$('#actualPrice').html(data.result);
		getP();
	}
	/*else{
			localStorage.setItem("priceCouponVoucher",0);
		}*/

	if($('#nurseNumber').html() > 0 && $('#pnigtaiType').val() == 2) {
		show_n(1);
	} else {
		hide_n(1);
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
	window.location.href = path + "/nurse/time.html?orderXtype=1";
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

	window.location.href = path + "/product/service/fileupload2.html";
}