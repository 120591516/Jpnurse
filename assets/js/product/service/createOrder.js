var co_type_Order = '';
var path = basePath();
function putAddess(co_type){
	co_type_Order = co_type;
	if(localStorageIsNotnull("xd_addsId")){
		var	xd_name	 = $('#xd_name').val();
		var xd_phone = $('#xd_phone').val();
		var xd_addess = $('#xd_addess').val();
		var xd_detailaddess = $('#xd_detailaddess').val();
		if(IdValStrnigs(xd_name)){
			layer.msg("请输入姓名!",{time:500});
			return false;
		}
		if(IdValStrnigs(xd_phone)){
			layer.msg("请输入手机号!",{time:500});
			return false;
		}
		
		if(!/^1[3|5|7|8]\d{9}$/.test(xd_phone)) {
			layer.msg("请输入正确的手机号!",{time:500});
			return;
		}
		
		if(IdValStrnigs(xd_addess)){
			layer.msg("请选择地区!",{time:500});
			return false;
		}
		if(IdValStrnigs(xd_detailaddess)){
			layer.msg("请输入详细地址!",{time:500});
			return false;
		}
		//
		var strs= new Array(); //定义一数组 
		strs=xd_addess.split(","); //字符分割 
		param = {
			name: xd_name,
			phone: xd_phone,
			detailaddress: xd_detailaddess,
			province: strs[0],
			city: strs[1],
			area: strs[2],
			creatorId: getUserId,
			creatorName:getUserName,
			defaultAddress: 1,
		}
		
	HttpAjax(address_add, param, "json", returnAddress_add);
		
	}else{
		createOrder(co_type);
	}
}

function returnAddress_add(data){
	console.log(data);
	if(data.resultcode == 1) {
		setlocalStorage("xd_addsId", data.result);
		createOrder(co_type_Order);
	}else{
		layer.msg(data.result,{time:900});
	}
}

var	creatorId		=	'';					//	creatorId
var	creatorName		=	'';					//	creatorName

var	patientName		=	'';					//	患者姓名
var	patientPhone	=	'';					//	患者手机号
var	appointmentTime	=	'';					//	预约时间
var	addressId			=	'';					//	地址
var	address			=	'';					//	地址
var	detailAddress	=	'';					//	详细地址
var	remarks			=	'';					//	备注
var	remark			=	'';					//	remark
var	drug			=	'';					//	是否有药品
var	isProve			=	'';					//	是否需要工具
var	tool			=	'';					//	工具

var	departmentId	=	'';					//	科室
var	hospital		=	'';					//	医院

var	insurance		=	'';					//	是否需要保险
var	name			=	'';					//	被保人name姓名
var	sfz				=	'';					//	身份证

var images			=	'';					//	images

var	voucherUseId	=	'';					//	优惠券ID

var	expectorId		=	'';					//	指定人
var	expectorDoctor	=	'';					//	指定医生
var	recommendId		=	'';					//	recommendId推荐人ID

var	productId		=	'';					//	productId
var	title			=	'';					//	goods	名
var	goodsId			=	'';					//	goodsId
var	serviceNumber	=	'';					//	serviceNumber服务次数
var	onePrice		=	'';					//	单次价格
var	price			=	'';					//	销售金额
var	pricePartId		=	'';					//	pricePartId
var payPrice		=	'';					//	实付金额
var	profit			=	'';					//	利润

var	schedule		=	'';					//	进度
var	order_img		=	'';					//	order_img
function createOrder(co_type){
	
	/*var device			=	'';					//	端
	var	platformId		=	'';					//	平台ID
	var siteId			=	'';					//	站点ID*/
	addressId = getlocalStorage("xd_addsId");
	if(!localStorageIsNotnull("voucherUseId")){
		voucherUseId = getlocalStorage("voucherUseId");
	}
	if(!localStorageIsNotnull("nurseId")){
		expectorId = getlocalStorage("nurseId");
	}
	if(!localStorageIsNotnull("productId")){
		productId = getlocalStorage("productId");
	}
	if(!localStorageIsNotnull("goodsName")){
		title = getlocalStorage("goodsName");
	}
	if(!localStorageIsNotnull("goodsId")){
		goodsId = getlocalStorage("goodsId");
	}
	if(!localStorageIsNotnull("serviceNumber")){
		serviceNumber = getlocalStorage("serviceNumber");
	}
	if(!localStorageIsNotnull("onePrice")){
		onePrice = getlocalStorage("onePrice");
	}
	if(!localStorageIsNotnull("pricePartId")){
		pricePartId = getlocalStorage("pricePartId");
	}
	if(!localStorageIsNotnull("actualPrice")){
		payPrice = getlocalStorage("actualPrice");
	}
	if(!localStorageIsNotnull("profit")){
		profit = getlocalStorage("profit");
	}
	
	if(co_type == 1){
		order1();
	}
	
	if(co_type == 2){
		order2();
	}
	
	if(co_type == 3){
		order3();	
	}
}

function order1(){
	if(!localStorageIsNotnull("addessType")){
			if(getlocalStorage("addessType") == 1){
				patientName = $('#xd_name').val();
				patientPhone = $('#xd_phone').val();
				address = $('#xd_addess').val();
				detailAddress = $('#xd_detailaddess').val();
				if(IdValStrnigs(patientName)){
					layer.msg("请输入姓名!",{time:500});
					return false;
				}
				if(IdValStrnigs(patientPhone)){
					layer.msg("请选输入手机号!",{time:500});
					return false;
				}
				if(IdValStrnigs(address)){
					layer.msg("请选择地区!",{time:500});
					return false;
				}
				if(IdValStrnigs(detailAddress)){
					layer.msg("请输入详细地址!",{time:500});
					return false;
				}
				setlocalStorage("xd_name",patientName);
				setlocalStorage("xd_phone",patientPhone);
				setlocalStorage("xd_addess",address);
				setlocalStorage("xd_detailaddess",detailAddress);
			}
			if(!localStorageIsNotnull("bx_neiro") && getlocalStorage("bx_neiro") == 1){
				name =$('#bx_name').val();
				sfz =$('#bx_sfz').val();
				if(IdValStrnigs(name)){
					layer.msg("请输入被保人姓名!",{time:500});
					return false;
				}
				if(IdValStrnigs(sfz)){
					layer.msg("请输入被保人身份证号!",{time:500});
					return false;
				}
				
				var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;  
				if(reg.test(sfz) === false)   {  
			       layer.msg("请输入正确的身份证号！",{time:500});
			       return  false;  
				}  
				setlocalStorage("bx_name",name);
				setlocalStorage("bx_sfz",sfz);
			}
		}
		appointmentTime = $('#appDate').val();
		
		getlocalStorage("dztool");
		getlocalStorage("hltool");
		if(getlocalStorage("dztool") == 1){
			if ($("input[name='shi']:checked").val() == undefined) {
				layer.msg("请选择是否有必备药品/工具!",{time:500});
				return false;
			}
			var  dztools = $("input[name='shi']:checked").val();
			if(dztools == '否'){
				$("body").css("overflow","hidden")
				$("body").css("position","fixed");
				$('.order-gj').removeClass('hide');
				$('#dzTool_zs').removeClass('hide');
				return false;
			}else{
				or1_jx();
			}
		}else{
			or1_jx();
		}
}

function or1_jx(){
	$("body").css("overflow","auto");
	$("body").css("position","relative");
	$('.order-gj').addClass('hide');
	$('#dzTool_zs').addClass('hide');
	if(!localStorageIsNotnull("addessType")){
			if(getlocalStorage("addessType") == 1){
				patientName = $('#xd_name').val();
				patientPhone = $('#xd_phone').val();
				address = $('#xd_addess').val();
				detailAddress = $('#xd_detailaddess').val();
				if(IdValStrnigs(patientName)){
					layer.msg("请输入姓名!",{time:500});
					return false;
				}
				if(IdValStrnigs(patientPhone)){
					layer.msg("请输入手机号!",{time:500});
					return false;
				}
				if(IdValStrnigs(address)){
					layer.msg("请选择地区!",{time:500});
					return false;
				}
				if(IdValStrnigs(detailAddress)){
					layer.msg("请输入详细地址!",{time:500});
					return false;
				}
				setlocalStorage("xd_name",patientName);
				setlocalStorage("xd_phone",patientPhone);
				setlocalStorage("xd_addess",address);
				setlocalStorage("xd_detailaddess",detailAddress);
			}
			if(!localStorageIsNotnull("bx_neiro") && getlocalStorage("bx_neiro") == 1){
				name =$('#bx_name').val();
				sfz =$('#bx_sfz').val();
				if(IdValStrnigs(name)){
					layer.msg("请输入被保人姓名!",{time:500});
					return false;
				}
				if(IdValStrnigs(sfz)){
					layer.msg("请输入被保人身份证号!",{time:500});
					return false;
				}
				var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;  
				if(reg.test(sfz) === false)   {  
			       layer.msg("请输入正确的身份证号！",{time:500});
			       return  false;  
				}
				setlocalStorage("bx_name",name);
				setlocalStorage("bx_sfz",sfz);
			}
		}
		appointmentTime = $('#appDate').val();
		
		if(getlocalStorage("hltool") == 1){
			
			if ($("input[name='huli']:checked").val() == undefined) {
				layer.msg("请选择是否有打针/护理工具!",{time:500});
				$("body").css("overflow","auto");
				$("body").css("position","relative");
				return false;
			}
			var  hltool = $("input[name='huli']:checked").val();
			
			if(hltool == '否'){
				$("body").css("overflow","hidden")
				$("body").css("position","fixed");
				$('.order-gj').removeClass('hide');
				$('#hlTool_zs').removeClass('hide');
				return false;
			}else{
				zzxdOnclik();
			}
		}else{
			zzxdOnclik();
		}
}

function order1_zh(){
		$("body").css("overflow","auto");
		$("body").css("position","relative");
		$('.order-gj').addClass('hide');
		$('#dzTool_zs').addClass('hide');
		$('#hlTool_zs').addClass('hide');
	if(!localStorageIsNotnull("addessType")){
			if(getlocalStorage("addessType") == 1){
				patientName = $('#xd_name').val();
				patientPhone = $('#xd_phone').val();
				address = $('#xd_addess').val();
				detailAddress = $('#xd_detailaddess').val();
				if(IdValStrnigs(patientName)){
					layer.msg("请输入姓名!",{time:500});
					return false;
				}
				if(IdValStrnigs(patientPhone)){
					layer.msg("请输入手机号!",{time:500});
					return false;
				}
				if(IdValStrnigs(address)){
					layer.msg("请选择地区!",{time:500});
					return false;
				}
				if(IdValStrnigs(detailAddress)){
					layer.msg("请输入详细地址!",{time:500});
					return false;
				}
				setlocalStorage("xd_name",patientName);
				setlocalStorage("xd_phone",patientPhone);
				setlocalStorage("xd_addess",address);
				setlocalStorage("xd_detailaddess",detailAddress);
			}
			if(!localStorageIsNotnull("bx_neiro") && getlocalStorage("bx_neiro") == 1){
				name =$('#bx_name').val();
				sfz =$('#bx_sfz').val();
				if(IdValStrnigs(name)){
					layer.msg("请输入被保人姓名!",{time:500});
					return false;
				}
				if(IdValStrnigs(sfz)){
					layer.msg("请输入被保人身份证号!",{time:500});
					return false;
				}
				var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;  
				if(reg.test(sfz) === false)   {  
					layer.msg("请输入正确的身份证号！",{time:500});
			       	return  false;  
				}
				setlocalStorage("bx_name",name);
				setlocalStorage("bx_sfz",sfz);
			}
		}
		appointmentTime = $('#appDate').val();
		if(getlocalStorage("xd_isProve") != 3){
			if(localStorageIsNotnull("images_arr") || IdValStrnigs(getlocalStorage("images_arr"))){
				layer.msg("请上传就以证明./药品证明!",{time:500});
				return  false;  
			}
		}
		zzxdOnclik();
}

function order2(){
		patientName = $('#xd_name').val();
		patientPhone = $('#xd_phone').val();
		if(IdValStrnigs(patientName)){
			layer.msg("请输入姓名!",{time:500});
			return false;
		}
		if(IdValStrnigs(patientPhone)){
			layer.msg("请输入手机号!",{time:500});
			return false;
		}
		if(!/^1[3|5|7|8]\d{9}$/.test(patientPhone)) {
			layer.msg("请输入正确的手机号!",{time:500});
			return;
		}
		if(IdValStrnigs(hospital)){
			hospital = getlocalStorage("xd_hospital");
		}
		var appTime = $('#appDate').val();
		if(IdValStrnigs(appTime)){
			layer.msg("请选择时间!",{time:500});
			return false;
		}
		payPrice = getlocalStorage("payPrice");
		/*var dateee = new Date(appTime).toJSON();  
		appointmentTime = new Date(+new Date(dateee)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');*/
		
		appointmentTime = appTime.replace(/T/g,' ');
		appointmentTime = appointmentTime.split('.')[0];
		
		if(appointmentTime.length < 18){
			appointmentTime = appointmentTime+":00";
		}
		
		setlocalStorage("xd_name",patientName);
		setlocalStorage("xd_phone",patientPhone);
		zzxdOnclik();
}

function order3(){
	patientName = $('#xd_name').val();
		patientPhone = $('#xd_phone').val();
		address = $('#xd_province').val();
		hospital = $('#xd_hospital').val();
		if(IdValStrnigs(hospital)){
			hospital = getlocalStorage("xd_hospital");
		}
		departmentId = $('#xd_department').val();
		detailAddress = $('#xd_detaileAddress').val();
		expectorDoctor = $('#xd_doctor').val();
		
		if(IdValStrnigs(patientName)){
			layer.msg("请上输入姓名!",{time:500});
			return false;
		}
		if(IdValStrnigs(patientPhone)){
			layer.msg("请输入手机号!",{time:500});
			return false;
		}
		
		if(!/^1[3|5|7|8]\d{9}$/.test(patientPhone)) {
			layer.msg("请输入正确的手机号!",{time:500});
			return;
		}
		
		if (IdValStrnigs(address)) {
			layer.msg("请选择省份!",{time:500});
			return;	
		}
		if(IdValStrnigs(hospital)){
			layer.msg("请选择医院!",{time:500});
			return;
		}
		setlocalStorage("xd_hospital",hospital);
		if(IdValStrnigs(departmentId)){
			layer.msg("请选择科室!",{time:500});
			return false;
		}
		/*if(IdValStrnigs(detailAddress)){
			layer.msg("请填写详细信息!",{time:500});
			return false;
		}*/
		var appTime = $('#appDate').val();
		if(IdValStrnigs(appTime)){
			layer.msg("请选择时间!",{time:500});
			return false;
		}
		payPrice = getlocalStorage("payPrice");
		 
		appointmentTime = appTime.replace(/T/g,' ');
		appointmentTime = appointmentTime.split('.')[0];
		
		if(appointmentTime.length < 18){
			appointmentTime = appointmentTime+":00";
		}
		
		setlocalStorage("xd_name",patientName);
		setlocalStorage("xd_phone",patientPhone);
		setlocalStorage("xd_province",address);
		setlocalStorage("xd_hospital",hospital);
		setlocalStorage("xd_department",departmentId);
		setlocalStorage("xd_detaileAddress",detailAddress);
		setlocalStorage("xd_doctor",expectorDoctor);
		
		setlocalStorage("departmentId",departmentId);
		setlocalStorage("detailAddress",detailAddress);
		setlocalStorage("expectorDoctor",expectorDoctor);
		zzxdOnclik();
}


function zzxdOnclik(){
	/*	页面公有数据	*/
	remarks =$('#remarks').val();
	if(!IdValStrnigs(remarks)){
		setlocalStorage("remarks",remarks);
	}
	if(IdValStrnigs(appointmentTime)){
		layer.msg("请选择时间!",{time:500});
		return false;
	}else{
//		setlocalStorage("appDate",dateees);
		setlocalStorage("appointmentTime",appointmentTime);
	}
	if(getlocalStorage("xd_isProve") == 1 || getlocalStorage("xd_isProve") == 2){
		if(localStorageIsNotnull("images_arr") || IdValStrnigs(getlocalStorage("images_arr"))){
			layer.msg("请上传就以证明/药品证明.!",{time:500});
			return  false;  
		}else{
			images = getlocalStorage("images_arr");
		}
	}
	
	if(!localStorageIsNotnull("dztool")){
		if(getlocalStorage("dztool") == 1){
			drug = $("input[name='shi']:checked").val();
		}
	}
	if(!localStorageIsNotnull("hltool")){
		if(getlocalStorage("hltool") == 1){
			tool = $("input[name='huli']:checked").val();
		}
	}
	
	if ($("[name='isState']:checkbox:checked").length == 0) {
		layer.msg("请查看-勾选同意用户协议!",{time:500});
		return false;
	}
	
	setlocalStorage("patientName",patientName);
	setlocalStorage("patientPhone",patientPhone);
	setlocalStorage("appointmentTime",appointmentTime);
	setlocalStorage("address",address);
	setlocalStorage("address",address);
	setlocalStorage("detailAddress",detailAddress);
	setlocalStorage("remarks",remarks);
	setlocalStorage("remark",remark);
	setlocalStorage("drug",drug);
	setlocalStorage("isProve",isProve);
	setlocalStorage("tool",tool);
	setlocalStorage("departmentId",departmentId);
	setlocalStorage("hospital",hospital);
	setlocalStorage("insurance",insurance);
	setlocalStorage("name",name);
	setlocalStorage("sfz",sfz);
	setlocalStorage("images",images);
	setlocalStorage("voucherUseId",voucherUseId);
	setlocalStorage("expectorId",expectorId);
	setlocalStorage("expectorDoctor",expectorDoctor);
	if(!localStorageIsNotnull("recommendId")){
		recommendId = getlocalStorage("recommendId");
	}
	setlocalStorage("recommendId",recommendId);
	setlocalStorage("productId",productId);
	setlocalStorage("title",title);
	setlocalStorage("goodsId",goodsId);
	setlocalStorage("serviceNumber",serviceNumber);
	setlocalStorage("onePrice",onePrice);
	setlocalStorage("price",price);
	setlocalStorage("pricePartId",pricePartId);
	setlocalStorage("payPrice",payPrice);
	setlocalStorage("profit",profit);
	setlocalStorage("schedule",schedule);
	setlocalStorage("order_img",order_img);
	setlocalStorage("device",deviceType);
	setlocalStorage("platformId",platformId);
	setlocalStorage("siteId",site);
	console.log("creatorId==" + getUserId());
		console.log("creatorName==" + creatorName);
		console.log("patientName==" + patientName);
		console.log("patientPhone==" + patientPhone);
		console.log("appointmentTime==" + appointmentTime);
		console.log("xd_addsId==" + getlocalStorage("xd_addsId"));
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
		console.log("device==" + deviceType);
		console.log("platformId==" + platformId);
		console.log("siteId==" + site);
		var tuigCode = "";
		if(!localStorageIsNotnull("tuigCode")){
			tuigCode = getlocalStorage("tuigCode");
		}
		var param = {
			creatorId: getUserId(),
			creatorName: getUserName(),
			patientName: patientName,
			patientPhone: patientPhone,
			appointmentTime: appointmentTime,
			addressId: getlocalStorage("xd_addsId"),
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
			device: deviceType,
			platformId: platformId,
			siteId: site,
			code : tuigCode,
		}
		HttpAjax(createOrderNewsss, param, "json", orderPay);
}
//source
function orderPay(data) {
	console.log(data);
	var userIdo = getUserId();
	if (IdValStrnigs(userIdo)) {
		window.location.href = path+"/index.html";
	}
	if(isWeiXin()){
		if (localStorageIsNotnull("userOpenID")) {
			window.location.href = path+"/index.html";
		}
	}
	if (data.resultcode == 1) {
		setlocalStorage("payOrderId", data.result.orderId);
		setlocalStorage("goodsName",data.result.goodsName);
		setlocalStorage("orderNo",data.result.orderNo);
		setlocalStorage("payPrice",data.result.payParice);
		setlocalStorage("serviceAndGoodsType",1);
		window.location.href = path+"/product/pay.html";	
	} else {
		layer.msg(data.msg, {time: 900 });
	}
}