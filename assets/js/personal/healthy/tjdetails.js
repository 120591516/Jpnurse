function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}
$(function() {
	var uid = JSON.parse(localStorage.getItem("set"));
	//alert(uid.id)
	var u_id = GetQueryString("id");
	param = {
		id: u_id,
		userId: uid.id
		//userId: 21422
	}
	sendAjaxTrue(tjdetails, param, "json", tjcallback)
})

function tjcallback(data) {
	console.log(data);
	if(data.resultcode == 1) {		
		var tjdetail = data.result;
		$("#username").html(tjdetail.userName);
		if(tjdetail.sex == 0) {
			$("#sex").html("男");
		}
		if(tjdetail.sex == 1) {
			$("#sex").html("女");
		}
		$("#age").html(tjdetail.age + "岁");
		$("#udate").html(getDateTime2(new Date(tjdetail.health_time.time)));
		$("#nursename").html(tjdetail.nurseName);
		$("#nursephone").html(tjdetail.nursePhone);
		$("#hospital").html(tjdetail.hospital);
		$("#taocan").html(tjdetail.title);
		$("#zj_img").attr("src", tjdetail.image);
	}else{
		$("#tjxq").html();
	}

}