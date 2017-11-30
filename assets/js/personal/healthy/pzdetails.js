function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}
$(function() {
	var u_id = GetQueryString("id");
	var uid = JSON.parse(localStorage.getItem("set"));
	param = {
		id: u_id,
		userId: uid.id
		//userId: 18309
	}
	sendAjaxTrue(pjdetails, param, "json", pjcallback)
})

function pjcallback(data) {
	console.log(data);
	if(data.resultcode == 1) {
		var pzdetail = data.result;
		var yplist = [];
		if(pzdetail.peizhenPharmacyRemind.length > 0) {
			$.each(pzdetail.peizhenPharmacyRemind, function(i, item) {
				yplist += [
					'<p class="color p-10">药品：' + item.drug + '</p>',
					'<div class="public-cell color" style="padding-top: 0;padding-bottom: 0;">',
					'<div class="pz_bz">' + item.content + '</div>',
					'</div>'
				].join("");
			})
			$("#yaopin_list").html(yplist);
		}else{
			$("#yytx").html("");
		}

		$("#username").html(pzdetail.userName);
		if(pzdetail.sex == 0) {
			$("#sex").html("男");
		}
		if(pzdetail.sex == 1) {
			$("#sex").html("女");
		}
		/*0是需要，1是不需要*/
		$("#age").html(pzdetail.age + "岁");
		$("#ndate").html(pzdetail.accept_time);
		$("#nursename").html("护士：" + pzdetail.nurseName);
		$("#nursephone").html(pzdetail.nursePhone);
		if(pzdetail.return_examine == 1) {
			$("#fuzhen").html("是");
			$("#fz_time").show();
			$("#fuzhen_time").html(pzdetail.examine_time);
		}
		if(pzdetail.return_examine == 0) {
			$("#fuzhen").html("否");
			$("#fz_time").hide();
		}
		if(pzdetail.rotate_examine == 1) {
			$("#zx").html("是");
			$("#tjkeshi").show();
			$("#zx_keshi").html(pzdetail.recommend_department);
		}
		if(pzdetail.rotate_examine == 0) {
			$("#fuzhen").html("否");
			$("#tjkeshi").hide();
		}
		if(pzdetail.remarks.length>0){
			$("#remark").html(pzdetail.remarks);
		}else{
			$("#pexinxi").removeClass("public-cell-left");
			$("#zysx").html("");
		}
		
	} else {
		$("#pzxq").html();
	}

}