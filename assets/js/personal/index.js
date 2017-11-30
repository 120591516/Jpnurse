$(function() {
	var infoid = JSON.parse(localStorage.getItem("set"));
	var param = {
		userId: infoid.id,
	}
	sendAjaxTrue(personal, param, "json", personalCallBack);

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

	function personalCallBack(data) {
		console.info(data);
		if(data.resultcode == 1) {
			var name = data.result.name;
			var sex = data.result.sex;
			var adress = data.result.address;
			var headimg = data.result.headPicture;
			var balance = data.result.balance;
			$("#name").html(name);
			if(sex == 0) {
				$("#sex").html("男");
			}
			if(sex == 1) {
				$("#sex").html("女");
			}
			$("#adress").html(adress);
			var baj = jine(''+balance+'');
			$("#p_price").html(baj);
			setlocalStorage("balance", balance);
			$("#headimg").attr("src", headimg);
		}
	}
})