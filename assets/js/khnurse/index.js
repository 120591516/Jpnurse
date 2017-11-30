$(function() {
	clearLocalStorage(11);
})

function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
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

function public_login2() {
	var cmdId = GetQueryString("recommendId");
	var code1 = GetQueryString("code");
	if(cmdId == "" || cmdId == null) {
		cmdId = "";
	}
	if(code1 == "" || code1 == null) {
		code1 = "";
	}
	var tel = $('#phoneCode').val();
	if(IdVal("phoneCode")) {
		layer.msg('请填写手机号！', { time: 2000 });
		return;
	}
	if(!/^1[3|5|7|8]\d{9}$/.test(tel)) {
		layer.msg('请输入正确的电话号码！', { time: 2000 });
		return;
	}
	if(IdVal("password")) {
		layer.msg('请输入密码！', { time: 2000 });
		return;
	}
	if(IdVal("yzm")) {
		layer.msg('请输入验证码！', { time: 2000 });
		return;
	}
	/*var userOpenID = "";
	
	if(!localStorageIsNotnull("userOpenID")){
		userOpenID = getlocalStorage("userOpenID");
	}*/
	param = {
		phone: $("#phoneCode").val(),
		password: $("#password").val(),
		verificattionCode: $("#yzm").val(),
		type: 0,
		code: code1,
		recommendId: cmdId
	}
	sendAjaxTrue(n_zc, param, "json", loginCodeCallBack);

}

function loginCodeCallBack(data) {
	console.log(data)
	if(data.resultcode == 0) {
		layer.msg(data.msg, { time: 2000 });
		return;
	} else {
		var code2 = GetQueryString("code");
		if(code2 == 'hlq') {
			var userValue = '{"id":"' + data.result.id + '"}';
			localStorage.setItem("set", userValue);
			window.location.href = "/khnurse/success.html";
		} else {
			window.location.href = "/khnurse/n_success.html";
		}

	}
	/*var openid_login = '';
	
	if(!IdValStrnigs(data.result.openid)){
		setlocalStorage("userOpenID",data.result.openid);
	}
	
	localStorage.setItem("set", userValue);
	if(localStorageIsNotnull("returnLoginURL")) {

		window.location.href = "/index.html";
	} else {

		window.location.href = getlocalStorage("returnLoginURL");
	}*/
}
/**
 * 点击获取验证码
 * 
 * 
 */
function getCode() {
	var tel = $('#phoneCode').val();
	if(IdVal("phoneCode")) {
		layer.msg('请填写手机号！', { time: 2000 });
		return;
	}
	if(!/^1[3|5|7|8]\d{9}$/.test(tel)) {
		layer.msg('请输入正确的电话号码！', { time: 2000 });
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