function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}
var path = basePath();
$(function() {
	var addressid = GetQueryString("id");
	var param = {
		id: addressid,
	}
	sendAjaxTrue(address_huixian, param, "json", addresshuixian)

})

function addresshuixian(data) {
	//console.log(data);
	$("#name").val(data.result.name);
	$("#phone").val(data.result.phone);
	$("#address").val(data.result.province + ',' + data.result.city + ',' + data.result.area);
	$("#detailsaddress").val(data.result.detailaddress);

}

function edit_address() {
	var addressid = GetQueryString("id");
	var name = $("#name").val();
	var phone = $("#phone").val();
	var address = $("#detailsaddress").val();
	var dizhi = $("#address").val();
	var result = dizhi.split(",");
	if(IdVal("name")) {
		toast("姓名不能为空！")
		return;
	}
	if(IdVal("phone")) {
		toast("手机号码不能为空！")
		return;
	}
	if(!/^1[3|5|7|8]\d{9}$/.test(phone)) {
		toast("请输入正确的手机号码格式！")
		return;
	}
	if(IdVal("detailsaddress")) {
		toast("地址不能为空！")
		return;
	}
	if(IdVal("address")) {
		toast("详细地址不能为空！")
		return;
	}
	for(var i = 0; i < result.length; i++) {
		//document.write(result[i]);
		var province = result[0];
		var city = result[1];
		var area = result[2];
	}
	if($('#check').is(':checked')) {
		var defaultaddress = 1;
	} else {
		var defaultaddress = 0;
	}
	var infoid = JSON.parse(localStorage.getItem("set"));   
	var param = {
		name: name,
		phone: phone,
		detailaddress: address,
		province: province,
		city: city,
		defaultAddress:defaultaddress,
		area: area,
		id: addressid,
		creatorId: infoid.id,
	}
	HttpAjax(update_address, param, "json", editaddress)

}

function editaddress(data) {
	console.log(data);
	if(data.resultcode == 1) {
		window.location.href=path+"/personal/address/index.html"
	} else {
		toast("修改失败，请重新填写！")
	}
}