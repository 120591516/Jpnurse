function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}
var num = 1;
var path = basePath();
$(function() {
	toastLoading("正在加载...");
	recommendNurselist();
})

function recommendNurselist() {
	if(localStorageIsNotnull("appDate")) {
		window.history.go(-1);
	}
	var lat1;
	var lon1;
	var param;
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition( // 该函数有如下三个参数
			function(pos) { // 如果成功则执行该回调函数
				lat1 = pos.coords.latitude;
				lon1 = pos.coords.longitude;
				param = {
					lon: lon1,
					lat: lat1,
					p:num,
					goodsId: getlocalStorage("goodsId"),
					time: getlocalStorage("appDate"),
					priceId: getlocalStorage("priceId"),
				}
				sendAjaxTrue(getRecommendNurse, param, "json", returnRecommendNurselists);
			},
			function(err) { // 如果失败则执行该回调函数
				param = {
					p:num,
					goodsId: getlocalStorage("goodsId"),
					time: getlocalStorage("appDate"),
					priceId: getlocalStorage("priceId"),
				}
				sendAjaxTrue(getRecommendNurse, param, "json", returnRecommendNurselists);
			}, { // 附带参数
				enableHighAccuracy: false, // 提高精度(耗费资源)
				/*	timeout: 5000, // 超过timeout则调用失败的回调函数*/
				maximumAge: 1000 // 获取到的地理信息的有效期，超过有效期则重新获取一次位置信息
			}

		);
	}	
}

function returnRecommendNurselists(data) {
	console.log(data);
	if(data.resultcode == 1 && 　!IdValStrnigs(data.result)) {
		if(data.result.pages == 1) {
			$(".lists_more_btn").hide();
		} else {
			if(num == data.result.pages) {
				$(".lists_more_btn").html("没有更多数据了");
				$(".lists_more_btn").attr("disabled", "disabled")
			} else {
				$(".lists_more_btn").show();
				$(".lists_more_btn").removeAttr("disabled");
				$(".lists_more_btn").html("加载更多");
			}
		}
		
		if(data.result.list.length > 0) {
			var nurseList = [];
			$.each(data.result.list, function(i, item) {
				var nurseSexs = 1;
				if(item.nurseSex == 1) {
					nurseSexs = '/assets/img/service/hus_xingbie_nv@2x.png';
				} else {
					nurseSexs = '/assets/img/service/hus_xingbie_nan@2x.png';
				}
				nurseList += [
					'<div class="public-cell public-cell-left1" style="position: relative;" onclick="selectNurse(' + i + ');">',
					'<img src="' + item.url + '" width="40" height="40" class="nlist_tx mr-20"/>',
					'<img src="' + nurseSexs + '" width="15" height="15" class="nurseSex' + item.nurseSex + '" id="n_sex_img"/>',
					'<div class="public_primary">',
					'<p>',
					'<span class="fz-15" style="font-weight:600;">' + item.nurseName + '</span>',
					/*'<span class="fz-12 ml-5">· 服务' + item.serviceNumber + '次</span>',*/
					'<span class="n_jl">',
					'<span>距您: ' + item.distance + 'km</span>',
					'</span>',
					'</p>',
					'<p class="n_list_bq">',
					'<span>' + item.workYear + '年工作经验</span>',
					'<span class="ml-20">' + item.nurseHospital + '</span>',
					'</p>',
					'</div>',
					'</div>'
				].join("");

			})

			$("#nurseList").append(nurseList);
		}
	}
	ClosetoastLoading();
}

function lists_more_btn() {
	num++;
	recommendNurselist();
}

function selectNurse(nurse_i) {
	setlocalStorage("nurseTarget", nurse_i);
	//	window.history.go(-1);
	window.location.href = path+"/product/service/order1.html";
}