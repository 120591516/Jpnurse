var num = 1;
var type;
var goodid;
var lat1;
var lon1;
var nurseN;
var ctiy_dw;
var path = basePath();
$(function() {
	toastLoading("正在加载...");
	ctiy_dw = sessionStorage.getItem("city_dw1");
	console.log(ctiy_dw)
	nurselist();
})

function nurselist() {
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition( // 该函数有如下三个参数
			function(pos) { // 如果成功则执行该回调函数
				lat1 = pos.coords.latitude;
				lon1 = pos.coords.longitude;
				var param = {
					lon: lon1,
					lat: lat1,
					/*lon:113.321323,						
					lat:23.135698,*/
					city: ctiy_dw,
					p: num,
					type: type,
					goodsId: goodid,
					nurseName: nurseN,
				}
				sendAjaxTrue(n_list, param, "json", nlists);
			},
			function(err) { // 如果失败则执行该回调函数
				var param = {
					p: num,
					type: type,
					city: ctiy_dw,
					goodsId: goodid,
					nurseName: nurseN,
				}
				sendAjaxTrue(n_list, param, "json", nlists);
			}, { // 附带参数
				enableHighAccuracy: false, // 提高精度(耗费资源)
				/*	timeout: 5000, // 超过timeout则调用失败的回调函数*/
				maximumAge: 1000 // 获取到的地理信息的有效期，超过有效期则重新获取一次位置信息
			}

		);
	}
}

function nlists(res) {
	console.log(res);
	$(".wu_sj").addClass("hide");
	if(res.result.pages == 1) {
		$(".lists_more_btn").hide();
	} else {
		if(num == res.result.pages) {
			$(".lists_more_btn").html("没有更多数据了");
			$(".lists_more_btn").attr("disabled", "disabled")
		} else {
			$(".lists_more_btn").show();
			$(".lists_more_btn").removeAttr("disabled");
			$(".lists_more_btn").html("加载更多");
		}

	}
	var nlists = [];
	if(res.resultcode == 1) {
		if(res.result.list.length > 0) {
			$.each(res.result.list, function(index, item) {
				nlists += [
					'<a href="' + path + '/nurse/details.html?id=' + item.nurseId + '">',
					/*'<div class="public-cell nurse_list public-cell-0">',
					'<img src="' + item.url + '" class="nurse_title_img" />',
					'<div class="public_primary">',
					'<p>',
					'<span class="n_name">' + item.nurseName + '</span>',
					'<span class="n_sex"><img src="/assets/img/service/hus_xingbie_nv@2x.png" class="nurseSex' + item.nurseSex + '"/></span>',
					'<span class="n_jl">',
					'<img src="/assets/img/service/hus_xingbie_juli@2x.png"/>',
					'<span>' + item.distance + 'km</span>',
					'</span>',
					'</p>',
					'<div class="n_btn">',
					'<button>' + item.nurseHospital + '</button>',
					'<button>' + item.workYear + '年工作经验</button>',
					'</div>',
					'<p>· 服务' + item.serviceNumber + '次</p>',
					'</div>',
					'</div>',*/
					'<div class="public-cell public-cell-left1" style="position: relative;">',
					'<img src="' + item.url + '" width="40" height="40" class="nlist_tx mr-20"/>',
					'<img src="/assets/img/service/hus_xingbie_nv@2x.png" width="15" height="15" class="nurseSex' + item.nurseSex + '" id="n_sex_img"/>',
					'<div class="public_primary">',
					'<p>',
					'<span class="fz-15" style="font-weight:600;">' + item.nurseName + '</span>',
					/*'<span class="fz-12 ml-5">· 服务' + item.serviceNumber + '次</span>',*/
					'<span class="n_jl">',
					'<span>距您：' + item.distance + 'km</span>',
					'</span>',
					'</p>',
					'<p class="n_list_bq">',
					'<span>' + item.workYear + '年工作经验</span>',
					'<span class="ml-20">' + item.nurseHospital + '</span>',
					'</p>',
					'</div>',
					'</div>',
					'</a>'
				].join("");

			});
			$("#nlist").append(nlists);
			ClosetoastLoading();
			$(".n_lists").removeClass("hide");
			$(".nurseSex0").attr("src", "/assets/img/service/hus_xingbie_nan@2x.png");
		} else {
			ClosetoastLoading();
			$(".n_lists").addClass("hide");
			$(".wu_sj").removeClass("hide");
		}
	}

}

function lists_more_btn() {
	num++;
	nurselist();
}

function paixu(obj) {
	type = obj;
	num = 1;
	$("#nlist").html("");
	$(".wu_sj").addClass("hide");
	$(".n_lists").addClass("hide");
	toastLoading("正在加载...");
	nurselist();
}
$(".paixu").click(function() {
	$(".paixu").removeClass("n_active");
	$(this).addClass("n_active");
})
$(".leixing").click(function() {
	$(".leixing").removeClass("n_active2");
	$(this).addClass("n_active2");
})

function leix(id) {
	if(id == "" || id == null) {
		$("#qf_ptjj_bg").hide();
		$(".lx_all").hide();
		goodid = "";
		$("#nlist").html("");
		$(".wu_sj").addClass("hide");
		$(".n_lists").addClass("hide");
		toastLoading("正在加载...");
		nurselist();
	} else {
		$("#qf_ptjj_bg").show();
		$(".lx_all").show();
		var productid = id;
		var param = {
			productId: productid,
		}
		sendAjaxTrue(n_leixing, param, "json", leixinlist)
	}

}

function leixinlist(data) {
	//console.log(data);
	var lxlist = [];
	if(data.resultcode == 1) {
		if(data.result.length > 0) {
			$.each(data.result, function(i, item) {
				lxlist += [
					'<p onclick="aboutcx(' + item.id + ')">' + item.title + '</p>'
				].join("")
			});
			$(".lx_all").html(lxlist);
		}
	}

}

function aboutcx(id) {
	$("#qf_ptjj_bg").hide();
	$(".lx_all").hide();
	goodid = id;
	//alert(goodid)
	num = 1;
	$("#nlist").html("");
	$(".wu_sj").addClass("hide");
	$(".n_lists").addClass("hide");
	toastLoading("正在加载...");
	nurselist();
}
$("#qf_ptjj_bg").click(function() {
	$("#qf_ptjj_bg").hide();
	$(".lx_all").hide();
})

function IdVal(id) {
	var str = $("#" + id).val();
	if(str == "") {
		return true;
	} else {
		return false;
	}
}

function search_n() {
	/*if(IdVal("n_name")) {
		layer.msg("请输入您要搜索的护士", { time: 2000 });
		return;
	}*/
	nurseN = $("#n_name").val();
	num = 1;
	$("#nlist").html("");
	$(".lists_more_btn").hide();
	toastLoading("正在加载...");
	nurselist();
}

function clearv() {
	$("#n_name").val("");
}

function shouye() {
	window.location.href = path + '/index.html';
}

function nurse() {
	window.location.href = path + '/nurse/index.html'
}

function i_jingxuan() {
	window.location.href = path + '/activity/index.html';
}