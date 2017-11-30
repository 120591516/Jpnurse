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

function public_login() {
	var tel = $('#phoneCode').val();
	var ph=$("#phoneCode").val();
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
	var param = {
		phone:ph,
		verificattionCode: $("#code").val(),
	}
	localStorage.setItem("phone", ph);
	sendAjaxTrue(yzm_code, param, "json", loginCodeCallBack);

}
var path = basePath();
function loginCodeCallBack(data) {
	if(data.resultcode == 0) {
		toast(data.msg);
		return;
	}
	//console.log(data);

	window.location.href = path+"/personal/option/password.html";
}

function updatepwd() {
	var edit_phone=localStorage.getItem("phone");
	var pwd=$("#pwd").val();
	if(IdVal("pwd")) {
		toast("请填写密码");
		return;
	}
	var param = {
		phone:edit_phone,
		password:pwd,
		type:1
	}
	sendAjaxTrue(edit_pwd, param, "json", editpwdCallBack);
}
function editpwdCallBack(data){
	if(data.resultcode == 0) {
		toast(data.msg);
		return;
	}
	window.location.href = path+"/login/password.html";
}
