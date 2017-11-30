var platformId = getlocalStorage("pid");
//console.log(platformId);
/*var  platformId;*/
var platformId1 = '4dabc4f4eba746929944cfb6ca4e6502';
if(IdValStrnigs(platformId)) {
	platformId = platformId1;
}
//var ip='http://192.168.7.2:8100';
//var ip='http://192.168.7.66:8061';
//var ip = 'https://s.goldnurse.com';
//var ip='http://192.168.7.2:8100';
//var ip='http://192.168.7.111:8080';
//var ip='http://192.168.7.66:8061';
//var ip = 'http://192.168.7.117:8080/jphs-https-service';
//var ip = 'http://localhost:8080';
var ip = 'http://192.168.7.90:8080';
//var ip = 'https://s.goldnurse.com';
//var ip = 'http://192.168.7.117:8080/jphs-https-service';
var deviceType = 6;
var columnId = 'cb02ca72-1e9f-43c5-9940-8035486e7eb7';
var site = '3790272c-0ad4-445d-9fe6-d1710f1b7e06';
var index_lb = ip + '/app/index.json?platformId=' + platformId + '&deviceType=2&columnId=cb02ca72-1e9f-43c5-9940-8035486e7eb7&siteId=3790272c-0ad4-445d-9fe6-d1710f1b7e06&channelId=09ecced8-9eac-449f-81ff-9dd18e34eda6';
var pl_list = ip + '/product/getGoodsList.json?platformId=' + platformId + '&deviceType=2&siteId=3790272c-0ad4-445d-9fe6-d1710f1b7e06';
var tj_list = ip + '/product/hospital.json?platformId=' + platformId + '&deviceType=2';
var tj_goodlist = ip + '/product/hospitalGoods.json?platformId=' + platformId + '&deviceType=2&siteId=3790272c-0ad4-445d-9fe6-d1710f1b7e06';
var zx_lists = ip + '/information/getList.json?channelId=09ecced8-9eac-449f-81ff-9dd18e34eda6';
var zx_xq = ip + '/information/getInformationDetail.json';
var zx_pj = ip + '/information/getInformationEvaluate.json';
var my_shoucang = ip + '/user/getCollection.json';
var zx_shoucang = ip + '/information/collectionInformation.json?device=6';
var fb_pl = ip + '/information/sendEvaluate.json?device=6';
/*******个人中心*************/
var personal = ip + '/user/getUserDetail.json';
var img_tx = ip + '/upload/index.jhtml?uname=jphs';
var img_tx1 = ip + '/upload/aindex.jhtml?uname=jphs';
var edit_p = ip + '/user/updateUserInfo.json';
var edit_pw = ip + '/regist/updatePwd.json';
var mingxi = ip + '/transaction/incomeBreakdownMonth.json';
var getUserAccount = ip + '/account/getUserAccount.json';
/*****个人中心-健康档案*******/
var tjlist = ip + '/healthRecords/getHealthLogList.json';
var pzlist = ip + '/healthRecords/getDiagnosisList.json';
var kflist = ip + '/healthRecords/getRecoveryList.json';
var tjdetails = ip + '/healthRecords/getHealthLogDetail.json';
var pjdetails = ip + '/healthRecords/getDiagnosisDetail.json';
var kfdetails = ip + '/healthRecords/getRecoveryDetail.json';
/*服务订单列表*/
var service_order_list = ip + '/order/getUserOrder.json';
/*服务订单详情*/
var service_order_detail = ip + '/order/getUserOrderDetail.json';
var cancel_service_order = ip + '/order/cancelOrder.json';
/**********用户端地址******************/
var address_list = ip + '/user/getReceiveAddress.json';
var address_huixian = ip + '/user/getAddressDetail.json';
var update_address = ip + '/user/updateReceiveAddress.json';
var address_add = ip + '/user/insertReceiveAddress.json';
var deteleaddress = ip + '/user/deleteReceiveAddress.json';
var getInsuranceDetail = ip + '/user/getInsuranceDetail.json';
/**********用户端登录******************/
var login1 = ip + '/login/quickLogin.json?device=6';
var login2 = ip + '/login/login.json';
var wechatLogin = ip + '/login/wechatLogin.json';
var yzm = ip + '/regist/sendMassage.json';
var edit_pwd = ip + '/regist/updatePwd.json';
var yzm_code = ip + '/regist/ifValidateCode.json';
/**********用户端护士******************/
var n_list = ip + '/user/getNurseList.json';
var n_leixing = ip + '/goods/getGoodsByProduct.json?platformId=' + platformId + '';
var n_index = ip + '/nurse/getHomepage.json';
var n_workTime = ip + '/worktime/getNurseWorktime.json';
var m_tc = ip + '/goods/getGoodsAllPrice.json?siteId=3790272c-0ad4-445d-9fe6-d1710f1b7e06';
var n_zc = ip + '/regist/user.json?device=7';
var n_info = ip + '/nurseAudting/wapPageone.json';
var n_details = ip + '/nurseAudting/getWapIndex.json';
var xzkshi_nic = ip + '/nurseAudting/getJobtitleAndDepartment.json';
var n_jneng = ip + '/skills/getskills.json';
var n_renzheng = ip + '/nurseAudting/setWapAudtingtwo.json';
var n_zirzlist = ip + '/nurseAudting/getAudting.json';
var nurseAudting = ip + '/nurseAudting/getNurseInstitutions.json';
/*	服务详情 */
var getOneGoodsDetail = ip + '/goods/getOneGoodsDetail.json';
/*	用户个人中心优惠券列表	*/
var getUserAllVoucher = ip + '/voucher/getUserAllVoucher.json';
/*	下单获取可用优惠券	 */
var getUserVoucher = ip + "/voucher/getUserVoucher.json";
var getUserAllVoucher = ip + '/voucher/getUserAllVoucher.json';
/*	优惠券使用	*/
var getVoucherGoodsPrice = ip + "/voucher/getGoodsPrice.json";
var allGoods = ip + '/commodity/getShopList.json';
var goodsDetail = ip + '/commodity/getShopDetail.json';
var insertCar = ip + '/car/insertCar.json';
var carList = ip + '/car/carList.json';
var carUpdateNumber = ip + '/car/updateNumber.json';
var deleteCar = ip + '/car/deleteIds.json';
var allnum = ip + '/voucher/getUserVoucherNum.json';
var userConvertVoucher=ip+'/voucher/userConvertVoucher.json';

var oneGoodsDetail = ip + '/commodity/getOneDetail.json';
var carImg = ip + '/commodity/getListByCar.json';

var createOrder = ip + '/commodityOrder/createShopOrder.json';
var createOrders = ip + '/commodityOrder/createShopOrders.json';
var shopOrderList = ip + "/commodityOrder/getOrderList.json";

var cancelOrder = ip + "/commodityOrder/cancelShopOrder.json";

var shopOrderDetail = ip + "/commodityOrder/getOrderDetail.json";

var remindTime = ip + "/commodityOrder/updateRemindTime.json";

var confimOrder = ip + "/commodityOrder/confimOrder.json";
var canelReturn = ip + "/commodity/return/cancelReturn.json";

var deleteOrders = ip + "/commodityOrder/deleteOrder.json";
var getLogistics = ip + "/commodityOrder/getLogistics.json";

var getTkInfo = ip + "/commodity/order/info/tkDetail.json";

var tjtkUrl = ip + "/cancel/order/tkReason.json";
var tjtkUpdateInfo = ip + "/commodity/return//updateInfo.json";
var getLogisticsInfo = ip + "/logistics/getLogisticsInfo.json";
var tjtaocan = ip + '/goods/getGoodsAllPrice.json';

// 查询订单状态
var getUserOrderStatus = ip + "/order/getUserOrderStatus.json";
var getStatusByOrderNo = ip + "/commodityOrder/getStatusByOrderNo.json";

var tjtkOneUrl = ip + "/commodity/order/info/tkOneReason.json";
var tkxq = ip + "/commodity/return/getInfo.json"
var getCom = ip + "/commodity/order/info/getCom.json";
/**
 * 支付
 */
var orderPays_par = ip + "/order/orderPay.json";

/**
 * 用户下单接口
 * Order order 订单信息
 * Insurance insurance 保险
 * */
var createOrderssss = ip + "/order/createOrder.json";
var createOrderNewsss = ip + "/order/createOrderNew.json";
/*	查询用户地址	*/
var getReceiveAddress = ip + "/user/getReceiveAddress.json";
/*	获取空闲时间userId=&productId=133	*/
var findWorkTime = ip + "/user/findWorkTime.json";
/*	lon 、lat 经纬度
goodsId 服务id
time 预约时间
priceId		*/
var getRecommendNurse = ip + "/nurse/getRecommendNurse.json";
var getNurseServicePrice = ip + "/nurse/getNurseServicePrice.json";

/**
 * 微信获取用户
 */
var getWecthUserInfo = ip + "/wechat/getUser.json";
/**
 * 微信获取分享签名
 */
var getMenuShare = ip + "/wechat/getMenuShare.json";
var setShare = ip + "/shareStatistics/insert.json";
/**
 * 判断用户是否关注公众号
 */
var getUserWecthIfFollow = ip + "/wechat/follow.json";

/**
 * family	相关接口
 */
//根据openid获取用户家庭护士
var familyOrder = ip + "/familyOrder/wechatFamily.json";
var userIfFamily = ip + "/familyOrder/userIfFamily.json";

//获取下单流程
var familyGetMode = ip + "/familyMode/getMode.json";
var setfamilyOrder = ip + "/familyOrder/ufl.json";
var setfamilyOrdergufo = ip + "/familyOrder/gufo.json";
var familygetRegister = ip + "/familyRegister/getRegister.json";
var familyconsultationList = ip + "/familyConsultation/consultationList.json";
var familyconsultationDetails = ip + "/familyConsultation/consultationDetails.json";

var familyhealthyList = ip + "/familyHealthy/healthyList.json";
var familyhealthyDetails = ip + "/familyHealthy/healthyDetails.json";
var familyMemberList = ip + "/familyMember/fmList.json";
/*新增城市选择精选列表*/
var cityxuanze=ip+'/city/getAll.json';
var jingxuan=ip+'/column/getColumnService.json?columnId=ee411755-b0fb-42f1-a878-9c7aade5ea17 ';
var curstomdz=ip+'/customService/createService.json';
/*验证token*/
var n_ifhefa = ip + '/nurse/ifNurseLegitimate.json';
/*白富美活动*/
var bfmList = ip + '/order/bfmJhOrderIncome.json';
var HsbfmAward = ip + '/account/getHsbfmAward.json';
/*双十一活动*/
var getVoucher=ip+'/activeCenter/voucher/getVoucher.json';
var getGoodsPromotion=ip+'/activity/promotion/getGoodsPromotion.json?platformId='+ platformId;
/*健康无忧护*/
var healtylist=ip+'/jkwy/package/list.json?platformId=' + platformId;
var healtydetails=ip+'/jkwy/package/details.json?platformId=' + platformId;
var addfirend=ip+'/jkwy/relation/insert.json';
var editfirend=ip+'/jkwy/relation/insert.json';
var relationlist=ip+'/jkwy/relation/query.json';
var healtyorder=ip+'/jkwy/order/createOrder.json?platformId=' + platformId;
var healtyArchives=ip+'/jkwy/order/getHealthyArchives.json';
/*评价*/
var pjinsert=ip+'/order/evaluation/insert.json';
var nursepj=ip+'/order/evaluation/evaluationCount.json';
var nurselist=ip+'/order/evaluation/list.json';
/*首页活动*/
var indeximg=ip+'/column/getColumnService.json?columnId=4ad88f29-94d9-4700-8b52-4ece399690ae';

/**
 * ajax post提交  
 * @param url  
 * @param param  
 * @param datat 为html,json,text  
 * @param callback回调函数  
 * @return  
 */
function sendAjaxTrue(url, param, datat, callback) {
	$.ajax({
		type: "get",
		url: url,
		data: param,
		dataType: datat,
		success: callback,
		error: function(data) {
			ClosetoastLoading();
			errorTip();
			//console.log(data.msg);
		}
	});
}

function basePath() {
	var path = "";
	if(IdValStrnigs($("#platform_path").val())) {
		path ="";
	} else {
		path = "/" + $("#platform_path").val();
	}

	return path;
}

function HttpAjax(url, param, datat, callback) {
	$.ajax({
		type: "post",
		url: url,
		data: param,
		dataType: datat,
		success: callback,
		error: function(data) {
			ClosetoastLoading();
			errorTip();
			//console.log(data.msg);
		}
	});
}
/**
 * 关闭加载匡
 */
function ClosetoastLoading() {
	$('#loadingToast').hide();
}

function ClosetoastLoading1() {
	$('.weui_load').hide();
}
/**
 * 加载匡
 * @param content  内容
 */
function toastLoading(content) {
	$('#showContent').html(content);
	$('#loadingToast').show();
}

function toastLoading1(content) {
	$('#showContent').html(content);
	$('.weui_load').show();
}
/**
 * 根据判断是否是空串
 * @param id
 * @returns {Boolean}
 */
function IdVal(id) {
	var str = $("#" + id).val();
	if(str == "") {
		return true;
	} else {
		return false;
	}
}

/**
 * 判断id是否存在
 * @param id
 * @returns {Boolean}
 */
function isIdNotNull(id) {
	if($("#" + id).length > 0) {
		return true;
	} else {
		return false;
	}
}

/**
 * 根据判断是否是空串
 * @param id
 * @returns {Boolean}
 */
function IdValStrnig(str) {
	if(str == "" || str == null) {
		return true;
	} else {
		return false;
	}
}

/**
 * 根据判断是否是空串
 * @param id
 * @returns {Boolean}
 */
function IdValStrnigs(str) {
	if(str == "" || str == null || str == undefined || str == 'undefined' || str == 'null') {
		return true;
	} else {
		return false;
	}
}

/**
 * 根据判断是否是空串
 * localStorage	空间里
 * @param id
 * @returns {Boolean}
 */
function localStorageIsNotnull(str) {
	if(getlocalStorage(str) == "" || getlocalStorage(str) == null || getlocalStorage(str) == "null") {
		return true;
	} else {
		return false;
	}
}

function phoneIs() {
	if(isIdNotNull("xd_phone")) {
		var telPhone = $('#xd_phone').val();
		if(!/^1[3|5|7|8]\d{9}$/.test(telPhone)) {
			toast("请输入正确的电话号码");
			return;
		}
	}
}

/**
 * 获取localStorage空间里的值
 * @param {Object} name
 */
function getlocalStorage(name) {
	return localStorage.getItem(name) || "";
}
/**
 * 获取localStorage空间里的值
 * @param {Object} name
 */
function setlocalStorage(name, value) {
	return localStorage.setItem(name, value);
}
/**
 * 删除localStorage空间里的值
 * @param {Object} name
 */
function removeLocalStorage(name) {
	localStorage.removeItem(name);
}

//	目前数量-	10
function clearLocalStorage(isScope) {
	/**
	 * 请空出了用户信息的数据
	 */
	var userInfo = getlocalStorage("set");
	var platformIds = getlocalStorage("pid");
	var userOpenID = '';
	if(!localStorageIsNotnull("userOpenID")) {
		userOpenID = getlocalStorage("userOpenID");
	}

	var goodsIds = "";
	var localRe = "";
	var localCode = "";
	var pricePartIds = "";
	var nurseIds = "";
	var localCoId = "";
	var localCpId = "";
	var localNumber = "";
	var localIds = "";
	var userBalance = "";
	var familyOCcode = "";
	var familyPromoCode = "";
	var nurseNames = "";
	var productId = "";
	var tuigCode = "";
	var recommendIds = "";

	if(!localStorageIsNotnull("balance")) {
		userBalance = getlocalStorage("balance");
	}

	if(isScope == 1 || isScope == 2 || isScope == 3 || isScope == 4 || isScope == 5 || isScope == 11 || isScope == 12) {
		goodsIds = getlocalStorage("goodsId");
		if(!localStorageIsNotnull("recommendId")) {
			recommendIds = getlocalStorage("recommendId");
		}
		if(!localStorageIsNotnull("tuigCode")) {
			tuigCode = getlocalStorage("tuigCode");
		}
	}
	if(isScope == 4 || isScope == 7 || isScope == 8) {
		localRe = getlocalStorage("re");
		localCode = getlocalStorage("code");
	}
	if(isScope == 5) {
		pricePartIds = getlocalStorage("pricePartId");
		nurseIds = getlocalStorage("nurseId");
		nurseNames = getlocalStorage("nurseName");
		productId = getlocalStorage("productId");
	}
	if(isScope == 7) {
		localCoId = getlocalStorage("coId");
		localCpId = getlocalStorage("cpId");
		localNumber = getlocalStorage("number");
	}
	if(isScope == 8) {
		localIds = getlocalStorage("ids");
	}

	if(isScope == 11 || isScope == 12) {
		nurseIds = getlocalStorage("nurseId");
		nurseNames = getlocalStorage("nurseName");
	}
	/*if(isScope == 9){
			familyPromoCode = getlocalStorage("familyPromoCode");
			familyOCcode = getlocalStorage("familyOCcode");
	}*/
	/**
	 * 清空localStorage
	 */
	localStorage.clear();
	setlocalStorage("pid", platformIds);
	setlocalStorage("set", userInfo);

	if(!IdValStrnigs(recommendIds)) {
		setlocalStorage('recommendId', recommendIds);
	}
	if(!IdValStrnigs(tuigCode)) {
		setlocalStorage('tuigCode', tuigCode);
	}
	if(!IdValStrnigs(nurseNames)) {
		setlocalStorage('nurseName', nurseNames);
	}
	if(!IdValStrnigs(productId)) {
		setlocalStorage('productId', productId);
	}
	if(!IdValStrnigs(familyOCcode)) {
		setlocalStorage('familyOCcode', familyOCcode);
	}
	if(!IdValStrnigs(familyPromoCode)) {
		setlocalStorage('familyPromoCode', familyPromoCode);
	}
	if(!IdValStrnigs(goodsIds)) {
		setlocalStorage('goodsId', goodsIds);
	}
	if(!IdValStrnigs(userOpenID)) {
		setlocalStorage('userOpenID', userOpenID);
	}
	if(!IdValStrnigs(userBalance)) {
		setlocalStorage("balance", userBalance);
	}
	if(!IdValStrnigs(localRe)) {
		setlocalStorage("re", localRe);
	}
	if(!IdValStrnigs(localCode)) {
		setlocalStorage("code", localCode);
	}
	if(!IdValStrnigs(pricePartIds)) {
		setlocalStorage("pricePartId", pricePartIds);
	}
	if(!IdValStrnigs(nurseIds)) {
		setlocalStorage("nurseId", nurseIds);
	}
	if(!IdValStrnigs(localCoId)) {
		setlocalStorage("coId", localCoId);
	}
	if(!IdValStrnigs(localCpId)) {
		setlocalStorage("cpId", localCpId);
	}
	if(!IdValStrnigs(localNumber)) {
		setlocalStorage("number", localNumber);
	}
	if(!IdValStrnigs(localIds)) {
		setlocalStorage("ids", localIds);
	}

}

/**
 * 2016年6月8日13:56:45  whs
 */
/**
 * 展示框
 */
function toast(title, tip, hrefContent) {
	if(tip == null || tip == "") {
		tip = "信息提示";
	}
	if(hrefContent == null || hrefContent == "") {
		hrefContent = "javascript:;";
	}
	if(hrefContent == "window.history.go(-1);") {
		hrefContent = "javascript:window.history.go(-1);";
	}
	$("#hrefContent").attr("href", hrefContent);
	$("#hrefContent").html("确定");
	$('#tip').html(tip);
	$('#content').html(title);
	$('#dialog2').show().on('click', '.weui_btn_dialog', function() {
		$('#dialog2').off('click').hide();
	});
}

function toas1(title, tip, url) {
	if(tip == null || tip == "") {
		tip = "信息提示";
	}
	$('#tip1').html(tip);
	$('#content1').html(title);
	$('#con').html("确定");
	$('#can').html("取消");
	$('#con').show();
	$('#can').show();
	$('#dialog1').show().on('click', '.weui_btn_dialog', function(e) {
		$('#dialog1').off('click').hide();
		$('#con').off('click').hide();
		$('#can').off('click').hide();
	});
	if(url == null || url == "") {
		url = "";
	} else {
		$("#con").click(function() {
			console.info(url);
			window.location.href = url;
		});
	}
}

/**
 * 多项展示框
 * @param title 内容
 * @param tip 标题
 * @param callback 地址
 */
function toastCallBack(title, tip, callback) {
	if(tip == null || tip == "") {
		tip = "信息提示";
	}
	$('#tip1').html(tip);
	$('#content1').html(title);
	$('#con').show();
	$('#can').show();
	$('#con').html("确定");
	$('#can').html("取消");
	$('#dialog1').show().on('click', '.weui_btn_dialog', function(e) {
		$('#dialog1').off('click').hide();
		$('#con').off('click').hide();
		$('#can').off('click').hide();
	});
	if(callback == null || callback == "") {
		callback = "";
	} else {
		$("#con").click(function() {
			callback();
		});
	}
}

/**
 * 错误提示框
 */
function errorTip() {
	toast("您的网络状况不好，请更换网络");
}

function replaceTitle(title) {
	var $body = $('body');
	document.title = title;
}

function replace(str) {
	if(str.indexOf(',') > 0) {
		str = str.replace(',', '-');
		replace(str);
	}
	return str;
}
//转时间格式
function getDateTime(date) {
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	var hh = date.getHours();
	var mm = date.getMinutes();
	var ss = date.getSeconds();
	return year + "-" + month + "-" + day + " " + hh + ":" + mm + ":" + ss;
}

function getDateTime2(date) {
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	return year + "-" + month + "-" + day;
}

function getDateTime3(date) {
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	return year + "." + month + "." + day;
}

function add0(m) {
	return m < 10 ? '0' + m : m
}

function format(shijianchuo) {
	//shijianchuo是整数，否则要parseInt转换
	var time = new Date(shijianchuo);
	var y = time.getFullYear();
	var m = time.getMonth() + 1;
	var d = time.getDate();
	var h = time.getHours();
	var mm = time.getMinutes();
	var s = time.getSeconds();
	return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
}
/**
 * 获取url参数 调用的时候 var orderId = GetRequest()['参数名'];
 */

function  GetRequest()  {      
	var  url  =  location.search;  //获取url中"?"符后的字串   
	var  theRequest  =  new  Object();      
	if (url.indexOf("?")  !=  -1)  {         
		var  str  =  url.substr(1);         
		strs  =  str.split("&");         
		for(var  i  =  0;  i  <  strs.length;  i ++)  {            
			theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);         
		}      
	}      
	return  theRequest;   
}
var path = basePath();

function tz_p() {
	if(!userProving()) {
		window.location.href = path + '/login/loginAmong.html';
	} else {
		window.location.href = path + '/personal/index.html';
	}

}

function jingxuan() {
	layer.msg("敬请期待!", { time: 2000 });
}

var _change = {
	ary0: ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"],
	ary1: ["", "十", "百", "千"],
	ary2: ["", "万", "亿", "兆"],
	init: function(name) {
		this.name = name;
	},
	strrev: function() {
		var ary = []
		for(var i = this.name.length; i >= 0; i--) {
			ary.push(this.name[i])
		}
		return ary.join("");
	}, //倒转字符串。
	pri_ary: function() {
		var $this = this
		var ary = this.strrev();
		var zero = ""
		var newary = ""
		var i4 = -1
		for(var i = 0; i < ary.length; i++) {
			if(i % 4 == 0) { //首先判断万级单位，每隔四个字符就让万级单位数组索引号递增
				i4++;
				newary = this.ary2[i4] + newary; //将万级单位存入该字符的读法中去，它肯定是放在当前字符读法的末尾，所以首先将它叠加入$r中，
				zero = ""; //在万级单位位置的“0”肯定是不用的读的，所以设置零的读法为空

			}
			//关于0的处理与判断。
			if(ary[i] == '0') { //如果读出的字符是“0”，执行如下判断这个“0”是否读作“零”
				switch(i % 4) {
					case 0:
						break;
						//如果位置索引能被4整除，表示它所处位置是万级单位位置，这个位置的0的读法在前面就已经设置好了，所以这里直接跳过
					case 1:
					case 2:
					case 3:
						if(ary[i - 1] != '0') {
							zero = "零"
						}; //如果不被4整除，那么都执行这段判断代码：如果它的下一位数字（针对当前字符串来说是上一个字符，因为之前执行了反转）也是0，那么跳过，否则读作“零”
						break;

				}

				newary = zero + newary;
				zero = '';
			} else { //如果不是“0”
				newary = this.ary0[parseInt(ary[i])] + this.ary1[i % 4] + newary; //就将该当字符转换成数值型,并作为数组ary0的索引号,以得到与之对应的中文读法，其后再跟上它的的一级单位（空、十、百还是千）最后再加上前面已存入的读法内容。
			}

		}
		if(newary.indexOf("零") == 0) {
			newary = newary.substr(1)
		} //处理前面的0
		return newary;
	}
}
//创建class类
function change() {
	this.init.apply(this, arguments);
}
change.prototype = _change

function changeTwoDecimal_f(x) {
	var f_x = parseFloat(x);
	if(isNaN(f_x)) {
		alert('function:changeTwoDecimal->parameter error');
		return false;
	}
	var f_x = Math.round(x * 100) / 100;
	var s_x = f_x.toString();
	var pos_decimal = s_x.indexOf('.');
	if(pos_decimal < 0) {
		pos_decimal = s_x.length;
		s_x += '.';
	}
	while(s_x.length <= pos_decimal + 2) {
		s_x += '0';
	}
	return s_x;
}

//判断是否是微信浏览器的函数
function isWeiXin() {
	var ua = window.navigator.userAgent.toLowerCase();
	if(ua.match(/MicroMessenger/i) == 'micromessenger') {
		return true;
	} else {
		return false;
	}
}
//既能获取中文url也能英文
function getUrlParam(key) {
	// 获取参数
	var url = window.location.search;
	// 正则筛选地址栏
	var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
	// 匹配目标参数
	var result = url.substr(1).match(reg);
	//返回参数值
	return result ? decodeURIComponent(result[2]) : null;
}

function jine(s) {
	if(/[^0-9\.]/.test(s)) return "invalid value";
	s = s.replace(/^(\d*)$/, "$1.");
	s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
	s = s.replace(".", ",");
	var re = /(\d)(\d{3},)/;
	while(re.test(s))
		s = s.replace(re, "$1,$2");
	s = s.replace(/,(\d\d)$/, ".$1");
	return "￥" + s.replace(/^\./, "0.")
}

function jine2(s) {
	if(/[^0-9\.]/.test(s)) return "invalid value";
	s = s.replace(/^(\d*)$/, "$1.");
	s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
	s = s.replace(".", ",");
	var re = /(\d)(\d{3},)/;
	while(re.test(s))
		s = s.replace(re, "$1,$2");
	s = s.replace(/,(\d\d)$/, ".$1");
	return  s.replace(/^\./, "0.")
}