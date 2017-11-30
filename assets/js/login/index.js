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
//动态改变时间
function CountDown() {
	if(boo == false) {
		maxtime = 59;
		boo = true;
	}
	if(maxtime > 0) {
		seconds = Math.floor(maxtime % 60);
		msg = seconds + "秒"; //动态显示剩余时间。
		document.all["code_btn"].innerHTML = msg;
		maxtime = maxtime - 1;

	} else {
		clearInterval(timer);
		document.all["code_btn"].innerHTML = '获取验证码';
	}
}

function public_login() {
	var tel = $('#phoneCode').val();
	if(IdVal("phoneCode")) {
		toast("请填写手机号");
		return;
	}
	if(!/^1[3|5|7|8]\d{9}$/.test(tel)) {
		toast("请输入正确的电话号码");
		return;
	}
	if(IdVal("code")) {
		toast("请填写验证码");
		return;
	}
	
	var userOpenID = "";
	
	if(!localStorageIsNotnull("userOpenID")){
		userOpenID = getlocalStorage("userOpenID");
	}
	
	param = {
		phone: $("#phoneCode").val(),
		smsCode: $("#code").val(),
		type: 1,
		openid :userOpenID,
	}
	sendAjaxTrue(login1, param, "json", loginCodeCallBack);

}

function public_login2() {
	var tel = $('#phoneCode').val();
	if(IdVal("phoneCode")) {
		toast("请填写手机号");
		return;
	}
	if(!/^1[3|5|7|8]\d{9}$/.test(tel)) {
		toast("请输入正确的电话号码");
		return;
	}
	if(IdVal("password")) {
		toast("请输入密码");
		return;
	}
	var userOpenID = "";
	
	if(!localStorageIsNotnull("userOpenID")){
		userOpenID = getlocalStorage("userOpenID");
	}
	param = {
		phone: $("#phoneCode").val(),
		password: $("#password").val(),
		type: 1,
		openid :userOpenID,
	}
	sendAjaxTrue(login2, param, "json", loginCodeCallBack);

}
var path = basePath();
function loginCodeCallBack(data) {
    console.log(data)
	if(data.resultcode == 0) {
		toast(data.msg);
		return;
	}
	var userValue = '{"phone":"' + data.result.phone + '","id":"' + data.result.id + '","token":"' + data.result.token + '","name":"' + data.result.name + '"}';
	var openid_login = '';
	
	if(!IdValStrnigs(data.result.openid)){
		setlocalStorage("userOpenID",data.result.openid);
	}
	
	localStorage.setItem("set", userValue);
	if(localStorageIsNotnull("returnLoginURL")) {

		window.location.href =path+"/index.html";
	} else {

		window.location.href =getlocalStorage("returnLoginURL");
	}
}
/**
 * 点击获取验证码
 * 
 * 
 */
function getCode() {
	var tel = $('#phoneCode').val();
	if(IdVal("phoneCode")) {
		toast("请填写手机号");
		return;
	}
	if(!/^1[3|5|7|8]\d{9}$/.test(tel)) {
		toast("请输入正确的电话号码");
		return;
	}
	//电话号码填写正确  可以发送短信验证码
	else {
		if($('#code_btn').html() == "获取验证码") {
			$('#code_btn').html("60秒");
			boo = false;
			timer = setInterval("CountDown()", 1000);
			param = {
				phone: $("#phoneCode").val(),
			}
			sendAjaxTrue(yzm, param, "json", "");
		}
	}
}

/**
 * 判断用户是否登录
 */
function userProving() {
	if(localStorageIsNotnull("set")) {
		return false;
	}
	var infoid = JSON.parse(getlocalStorage("set"));
	if(IdValStrnigs(infoid)) {
		return false;
	}
	if(IdValStrnigs(infoid.phone) || IdValStrnigs(infoid.id) || IdValStrnigs(infoid.name)) {
		return false;
	}
	//	setlocalStorage("userOpenID",data.result.phone.openid);
	if(isWeiXin()){
		if(localStorageIsNotnull("userOpenID")){
			return false;
		}
	}
	return true;
}

function getUserId() {
	if(localStorageIsNotnull("set")) {
		return '';
	}
	var infoid = JSON.parse(getlocalStorage("set"));
	if(IdValStrnigs(infoid)) {
		return '';
	}
	if(IdValStrnigs(infoid.phone) || IdValStrnigs(infoid.id) || IdValStrnigs(infoid.name)) {
		return '';
	}
	return infoid.id;
}

function getUserPhone() {
	if(localStorageIsNotnull("set")) {
		return '';
	}
	var infoid = JSON.parse(getlocalStorage("set"));
	if(IdValStrnigs(infoid)) {
		return '';
	}
	if(IdValStrnigs(infoid.phone) || IdValStrnigs(infoid.id) || IdValStrnigs(infoid.name)) {
		return '';
	}
	return infoid.phone;
}

function getUserName() {
	if(localStorageIsNotnull("set")) {
		return '';
	}
	var infoid = JSON.parse(getlocalStorage("set"));
	if(IdValStrnigs(infoid)) {
		return '';
	}
	if(IdValStrnigs(infoid.phone) || IdValStrnigs(infoid.id) || IdValStrnigs(infoid.name)) {
		return '';
	}
	return infoid.name;
}