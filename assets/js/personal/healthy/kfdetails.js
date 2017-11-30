function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}
$(function() {
	var uid = JSON.parse(localStorage.getItem("set"));
	var u_id = GetQueryString("id");
	param = {
		id: u_id,
		userId: uid.id
		//userId: 18309
	}
	sendAjaxTrue(kfdetails, param, "json",kfcallback)
})

function kfcallback(data) {
	console.log(data);
	if(data.resultcode == 1) {		
		var kfdetail = data.result;
		$("#username").html(kfdetail.userName);
		if(kfdetail.sex == 0) {
			$("#sex").html("男");
		}
		if(kfdetail.sex == 1) {
			$("#sex").html("女");
		}
		$("#age").html(kfdetail.age + "岁");
		$("#udate").html(kfdetail.accept_time);
		$("#nursename").html(kfdetail.nurseName);
		$("#nursephone").html(kfdetail.nursePhone);
		$("#evaluate_content").html(kfdetail.estimate);
		$("#advise").html(kfdetail.propose);
	}else{
		$("#kfxq").html();
	}

}