
function selectCouponU(goodsId,pricePartId){
	var userIdo = getUserId();
	if(IdValStrnigs(userIdo)){
		window.history.go(-1);
	}
	//	18309
	param = {
		userId: userIdo,
		goodsId :goodsId,
		pricePartId : pricePartId,
		nurseId : '',
	}
	sendAjaxTrue(getUserVoucher, param, "json", returnUserAllVoucher);
}

function returnUserAllVoucher(data){
	console.log(data);
	console.log('--------------------');
	if(data.resultcode == 1){
		
		if(data.result.length > 0){
			$('#yhjNumber').html(data.result.length);
			$('#yhj_Name').html("张");
			if(localStorage.getItem("voucherTypePrice") !=null && localStorage.getItem("voucherTypePrice") != ''
				&& localStorage.getItem("voucherTypePriceamount") !=null && localStorage.getItem("voucherTypePriceamount") != ''){
				//  拼接优惠券金额/折扣
				$('#couponContent').html(localStorage.getItem("voucherTypePriceamount")+"/"+localStorage.getItem("voucherTypePrice"));
			}
			//	
			if(localStorage.getItem("priceCouponVoucher") !=null && localStorage.getItem("priceCouponVoucher") != ''){
					$('#actualPrice').html(localStorage.getItem("priceCouponVoucher"));
			}
		}else{
			$('#yhj_Name').html("无");
			$('#couponContent').html("无");
		}
	}else{
		$('#yhj_Name').html("无");
		$('#couponContent').html("无");
	}
			/*if(!localStorageIsNotnull("voucherUseId")){
		$('#couponContent').html('已使用');
	}*/
	
	if(!localStorageIsNotnull("voucherUseId")){
		var voucherUseId = getlocalStorage("voucherUseId");
		var voucherTypePrice = getlocalStorage("voucherTypePrice");
		var voucherTypePriceamount = getlocalStorage("voucherTypePriceamount");
		couponEmploy(voucherUseId,voucherTypePrice,voucherTypePriceamount);
	}
}
var path = basePath();
function selectCoupon(typeI){
	
	var name = $('#xd_name').val();
	var phone = $('#xd_phone').val();
	
	var appDate = $('#appDate').val();
	var remarks = $('#remarks').val();
	var xd_province = '';
	var	xd_hospital = '';
	var	xd_department = '';
	var xd_doctor = '';
	var xd_detaileAddress = '';
	
	
	if(isIdNotNull("xd_province")){
		xd_province = $('#xd_province').val();
	}
	if(isIdNotNull("xd_hospital")){
		xd_hospital = $('#xd_hospital').val();
	}
	if(isIdNotNull("xd_department")){
		xd_department = $('#xd_department').val();
	}
	if(isIdNotNull("xd_doctor")){
		xd_doctor = $('#xd_doctor').val();
	}
	if(isIdNotNull("xd_detaileAddress")){
		xd_detaileAddress = $('#xd_detaileAddress').val();
	}
	
	if(IdValStrnigs(name)){
		layer.msg("请输入姓名!",{time:500});
		return false;
	}
	if(IdValStrnigs(phone)){
		layer.msg("请输入手机号!",{time:500});
		return false;
	}
	
	if(typeI == 2){
	}
	
	if(typeI == 3){
		
		if(IdValStrnigs(xd_province)){
			layer.msg("请选择地区!",{time:500});
			return false;
		}
		if(IdValStrnigs(xd_department)){
			layer.msg("请选择科室!",{time:500});
			return false;
		}
	}
	
	if(IdValStrnigs(appDate)){
		layer.msg("请选择时间!",{time:500});
		return false;
	}
	
	if(!IdValStrnigs(remarks)){
		setlocalStorage("remarks",remarks);
	}
	setlocalStorage("xd_name",name);
	setlocalStorage("xd_phone",phone);
	setlocalStorage("appDate",appDate);
	
	var numberCoupon = $('#yhjNumber').html();
	if(numberCoupon > 0){
		window.location.href = path+"/product/Coupon.html";
	}
}

function couponEmploy(voucherUseId,typePrice,amount){
	//	优惠券ID
	localStorage.setItem("voucherUseId", voucherUseId);
	//	优惠券类型名称actualPrice
	localStorage.setItem("voucherTypePrice", typePrice);
	//	优惠券金额
	localStorage.setItem("voucherTypePriceamount", amount);
	
	var nurseIdv = '';
	if(!localStorageIsNotnull("nurseId") && getlocalStorage("pnigtaiType") == 0){
		nurseIdv = getlocalStorage("nurseId");
	}
	var userIdo = getUserId();
	if(IdValStrnigs(userIdo)){
		window.history.go(-1);
	}
	//	18309
	param = {
		userId: userIdo,
		voucherUseId :	voucherUseId,
		pricePartId : localStorage.getItem("pricePartId"),
		nurseId:nurseIdv,
	}
	sendAjaxTrue(getVoucherGoodsPrice, param, "json", returnUserEmployVoucher);

}

function returnUserEmployVoucher(data){
	console.log(data);
	if(data.resultcode == 1){
		//	优惠后的价格
		localStorage.setItem("priceCouponVoucher", data.result);
		$('#actualPrice').html("￥" +data.result);
	}else{
		localStorage.setItem("priceCouponVoucher",0);
	}
	
}