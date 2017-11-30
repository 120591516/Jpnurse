function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}
var path = basePath();
function IdVal(id) {
	var str = $("#" + id).val();
	if(str == "") {
		return true;
	} else {
		return false;
	}
}

function add_address() {
	/*var addressid = GetQueryString("id");*/
	var name1 = $("#name").val();
	var phone1 = $("#phone").val();
	var address1 = $("#detailsaddress").val();
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
	if(!/^1[3|5|7|8]\d{9}$/.test(phone1)) {
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
	var defaultaddress;
	//alert()
	if($('#check').is(':checked')) {
		defaultaddress = 1;
	} else {
		defaultaddress = 0;
	}
	for(var i = 0; i < result.length; i++) {
		//document.write(result[i]);
		var province1 = result[0];
		var city1 = result[1];
		var area1 = result[2];
	}
	var infoid = JSON.parse(localStorage.getItem("set"));
	var param1 = {
		name: name1,
		phone: phone1,
		detailaddress: address1,
		province: province1,
		city: city1,
		area: area1,
		creatorId: infoid.id,
		creatorName: infoid.name,
		defaultAddress: defaultaddress,
	}
	HttpAjax(address_add, param1, "json", addaddress)

}

function addaddress(data) {
	if(data.resultcode == 1) {
		window.location.href = path+"/personal/address/index.html";
	} else {
		toast("添加失败，请重新填写！")
	}
}