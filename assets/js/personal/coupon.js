function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}
var infoid = JSON.parse(localStorage.getItem("set"));
$(function() {
	toastLoading("正在加载...");
	$(".wu_sj").addClass("hide");
	param = {
		userId: infoid.id,
		/*userId: 21422,*/
		status: 3,
	}
	param1 = {
		userId: infoid.id,
		/*userId: 21422,*/
	}
	sendAjaxTrue(allnum, param1, "json", allnumcallback);
	sendAjaxTrue(getUserAllVoucher, param, "json", returnUserAllVoucher);
})

function allnumcallback(data) {
	if(data.result.length > 0) {
		$.each(data.result, function(i, item) {
			if(item.status == "已过期") {
				var num_gq = item.num;
				$("#yiguoqi").html("已过期（" + num_gq + "）");

			}
			if(item.status == "未使用") {
				var num_wsy = item.num;
				$("#weishiyong").html("未使用（" + num_wsy + "）");
			}
			if(item.status == "已使用") {
				var num_ysy = item.num;
				$("#yishiyong").html("已使用（" + num_ysy + "）");
			}
		});
	} else {
		$("#yiguoqi").html("已过期（0）");
		$("#weishiyong").html("未使用（0）");
		$("#yishiyong").html("已使用（0）");
	}

}

function yhj_cz(obj) {
	$("#header_mg").html("");
	$(".wu_sj").addClass("hide");
	/*status 1.已使用2.已过期 3.可用*/

	param = {
		userId: infoid.id,
		/*userId: 21422,*/
		status: obj,
	}
	sendAjaxTrue(getUserAllVoucher, param, "json", returnUserAllVoucher);

}

function returnUserAllVoucher(data) {
	console.log(data);
	var coupon_html = [];
	if(data.resultcode == 1) {
		if(data.result.length > 0) {
			$.each(data.result, function(i, item) {

				// type 1.现金卷2.满减卷3.折扣卷4.已使用5.已过去 6.可用
				var typeName = '';
				var typePrice = '';
				var typeContent = '';
				var typeAmount = '';
				var html1 = '';
				var html2 = '';
				if(item.type == 1) {
					typeName = '现金券';
					typePrice = '元';
					typeContent = '现金券:满任意金额可用';
					typeAmount = item.amount;
				} else if(item.type == 2) {
					typeName = '满减券';
					typePrice = '元';
					typeContent = '满减券：满' + item.condition_amount + "可用";
					typeAmount = item.amount;
				} else if(item.type == 3) {
					typeName = '折扣券';
					typePrice = '折';
					typeContent = '折扣券：满任意金额可用';
					typeAmount = item.amount*10;
				}
				if(item.status == "未使用") {
					html1 = '<div class="yhj_price">';
					html2 = "";
				}
				if(item.status == "已过期") {
					html1 = '<div class="yhj_price" style="background:#A9A9A9">';
					html2 = "";
				}
				if(item.status == "已使用") {
					html1 = '<div class="yhj_price" style="background:#A9A9A9">';
					html2 = '<img src="/assets/img/personal/shiyong.png" width="50" height="50" style="position: absolute;top:0;right: 0;"/>';
				}
				coupon_html += [
					'<div class="yhj_list">',
					'<div class="public-cell" style="padding: 0;">' +
					html1 +
					'<p><em>' + typeAmount + '</em>' + typePrice + '</p>',
					'<p>' + typeName + '</p>',
					'</div>',
					'<div class="public_primary pt-5">',
					'<p class="ml-20 mr-20">' + typeContent + '</p>',
					'<p class="yhj_g_p mr-20">'+getDateTime3(new Date(item.start_time.time))+'&nbsp;—&nbsp;' + getDateTime3(new Date(item.end_time.time)) + '</p>',
					'<p class="yhj_g_p2" onclick="zk(\'' + i + '\')">',
					'<span class="fz-12">详细信息</span>',
					'<span><i class="right-up right_upp'+i+'"></i></span>',
					'</p>',
					'</div>',
					'</div>',
					'<p class="yhj_sm hide pk' + i + '">本券仅限 :' + item.productName + '类服务</p>' +
					html2 +
					'</div>'
				].join("");

			})
			$("#header_mg").html(coupon_html);
			/*$(".right-up").click(function() {
				$(this).toggleClass("right-down");
			})*/
			ClosetoastLoading();
		} else {
			$(".wu_sj").removeClass("hide");
		}
	} else {

		$('#yhj_keyong').html(data.result.length);
	}
}

function zk(obj) {

	$(".pk" + obj).toggleClass("hide");
	$(".right_upp" + obj).toggleClass("right-down");
}