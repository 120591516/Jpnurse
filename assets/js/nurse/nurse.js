var lat1;
var lon1;
var param;
var nurseid = GetQueryString("id");
var path = basePath();

//alert(nurseid);
$(function() {
	toastLoading("正在加载...");
	$(".body").addClass("hide");

	setlocalStorage("nurseId", nurseid);

	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(pos) {
				lat1 = pos.coords.latitude;
				lon1 = pos.coords.longitude;
				param = {
					lon: lon1,
					lat: lat1,
					userId: nurseid,
				}
				sendAjaxTrue(n_index, param, "json", nurseindex)
			},
			function(err) { // 如果失败则执行该回调函数
				param = {
					userId: nurseid,
				}
				sendAjaxTrue(n_index, param, "json", nurseindex)
			}, { // 附带参数
				enableHighAccuracy: false, // 提高精度(耗费资源)
				/*	timeout: 5000, // 超过timeout则调用失败的回调函数*/
				maximumAge: 1000 // 获取到的地理信息的有效期，超过有效期则重新获取一次位置信息
			}

		);
		param = {
			userId: nurseid,
		}
		sendAjaxTrue(n_index, param, "json", nurseindex)

	}
	var param3 = {
		nurseId: nurseid,
	}
	sendAjaxTrue(nurselist, param3, "json", allpjlistcallback);
})

function nurseindex(data) {

	//	console.log(data);

	if(data.resultcode == 1) {
		var info = data.result.basicInfo;
		console.log(data)
		$("#nr_name").html(info[0].name);
		$("#nr_jl").html(info[0].distance + "km");
		if(info[0].sex == 0) {
			$("#sex").html('<img src="/assets/img/man.png" width="17" height="17"/>');
		}
		if(info[0].sex == 1) {
			$("#sex").html('<img src="/assets/img/woman.png" width="17" height="17"/>');
		}
		setlocalStorage("nurseName", info[0].name);

		$("#tx").attr("src", info[0].url);
		$("#workyear").html(info[0].workYear + "年");
		$("#age").html(info[0].age < 0 ? 0 : info[0].age);
		$("#yy").html(info[0].hospital);
		$("#serviceNumber").html(info[0].serviceNumber);
		$("#keshi").html(info[0].departmentName);
		var sv_jineng = [];
		var sv_item = [];
		$.each(data.result.skills, function(i, item) {
			if(item.ifnot == 1) {
				sv_jineng += [
					'<button>' + item.name + '</button>'
				].join("")
			}
		})
		$("#nurse_jineng").html(sv_jineng);
		$.each(data.result.serviceItems, function(i, item) {
			sv_item += [
				'<div class="public-cell n_xm_list public-cell-left">',
				'<div class="public_primary">',
				'<span>' + item.title + '</span>',
				'</div>',
				'<span class="n_list_price">￥' + item.price + '</span>',
				'<span><button onclick="yuyue(' + item.goods_id + ',\'' + item.title + '\')">预约</button></span>',
				'</div>'
			].join("");

		});
		$("#serviceItems").html(sv_item);
		$(".n_xm_list:last-child").removeClass("public-cell-left");
		var day1 = data.result.worktime[3].calendar;
		var day2 = data.result.worktime[4].calendar;
		var day3 = data.result.worktime[5].calendar;
		var day4 = data.result.worktime[6].calendar;
		var day_day1 = (day1.split("-")[1] + "-" + day1.split("-")[2]);
		var day_day2 = (day2.split("-")[1] + "-" + day2.split("-")[2]);
		var day_day3 = (day3.split("-")[1] + "-" + day3.split("-")[2]);
		var day_day4 = (day4.split("-")[1] + "-" + day4.split("-")[2]);
		$("#day1").html(day_day1);
		$("#day2").html(day_day2);
		$("#day3").html(day_day3);
		$("#day4").html(day_day4);
		var xianshi = [];
		$.each(data.result.worktime, function(i, item) {
			xianshi += [
				'<li class="clearfix">',
				'<img src="/assets/img/goods/hus_bukeyue.png" class="xs' + item.h9 + '"/>',
				'<img src="/assets/img/goods/hus_bukeyue.png" class="xs' + item.h10 + '"/>',
				'<img src="/assets/img/goods/hus_bukeyue.png" class="xs' + item.h11 + '"/>',
				'<img src="/assets/img/goods/hus_bukeyue.png" class="xs' + item.h12 + '"/>',
				'<img src="/assets/img/goods/hus_bukeyue.png" class="xs' + item.h13 + '"/>',
				'<img src="/assets/img/goods/hus_bukeyue.png" class="xs' + item.h14 + '"/>',
				'<img src="/assets/img/goods/hus_bukeyue.png" class="xs' + item.h15 + '"/>',
				'<img src="/assets/img/goods/hus_bukeyue.png" class="xs' + item.h16 + '"/>',
				'<img src="/assets/img/goods/hus_bukeyue.png" class="xs' + item.h17 + '"/>',
				'<img src="/assets/img/goods/hus_bukeyue.png" class="xs' + item.h18 + '"/>',
				'<img src="/assets/img/goods/hus_bukeyue.png" class="xs' + item.h19 + '"/>',
				'<img src="/assets/img/goods/hus_bukeyue.png" class="xs' + item.h20 + '"/>',
				'</li>'
			].join("")
		});
		ClosetoastLoading();
		$(".body").removeClass("hide");
		$("#n_t_ky").html(xianshi);
		$(".xs0").attr("src", "/assets/img/goods/hus_keyue.png");

	}

}

function yuyue(id, title) {
	$(".tanchu").removeClass("hide");
	$(".tanchu_div").removeClass("hide");
	$("body").css("overflow", "hidden")
	$("body").css("position", "fixed");
	$("#cptitle").html(title);
	setlocalStorage("goodsName", title);
	setlocalStorage("goodsId", id);
	var goodid = id;
	var param = {
		goodsId: goodid,
		userId: getlocalStorage("nurseId"),
	}
	sendAjaxTrue(getNurseServicePrice, param, "json", tclist)
}
var beforeId = "";

function tclist(data) {
	console.log(data);
	for(var i = 0; i < data.result.length; i++) {
		setlocalStorage("productId", data.result[i].productId);
		document.getElementById("level").innerHTML += "<button onclick=showButton('" + data.result[i].grade + "','" + data.result[i].name + "','" + data.result[i].goodsPrice[0].serviceTime + "','" + data.result[i].goodsPrice[0].serviceNumber + "','" + data.result[i].goodsPrice[0].profit + "','" + data.result[i].goodsPrice[0].price + "','" + data.result[i].goodsPrice[0].oldPrice + "','" + data.result[i].goodsPrice[0].id + "')>" + data.result[i].name + "</button>";
		var taocan = "<div id='" + data.result[i].grade + "' style='display:none'>";
		for(var j = 0; j < data.result[i].goodsPrice.length; j++) {
			if(i == 0 && j == 0) {
				setlocalStorage("pricePartId", data.result[i].goodsPrice[j].id);
			}
			taocan += "<button onclick = price(" + data.result[i].goodsPrice[j].price + "," + data.result[i].goodsPrice[j].oldPrice + "," + data.result[i].goodsPrice[j].serviceTime + "," + data.result[i].goodsPrice[j].serviceNumber + "," + data.result[i].goodsPrice[j].profit + ",'" + data.result[i].goodsPrice[j].id + "')>" + data.result[i].goodsPrice[j].title + " </button>";
		}
		document.getElementById("Specifications").innerHTML += taocan
		document.getElementById(data.result[0].grade).style.display = "block";
		beforeId = data.result[0].grade;
	}
	$(".st_goods_xz1 button").click(function() {
		$(".st_goods_xz1 button").removeAttr("id", "st_goods_active");
		$(this).attr("id", "st_goods_active");
	})
	$(".st_goods_xz2 button").click(function() {
		$(".st_goods_xz2 button").removeAttr("id", "st_goods_active");
		$(this).attr("id", "st_goods_active");
	})
	$(".st_goods_xz1 button").eq(0).attr("id", "st_goods_active");
	$(".st_goods_xz2 button").eq(0).attr("id", "st_goods_active");
	document.getElementById("price").innerHTML = "￥" + data.result[0].goodsPrice[0].price;

}

function allpjlistcallback(data) {
	console.log(data);
	$(".pj_i").html(data.result.list.length);
	var allpjhtml = [];
	if(data.result.list.length > 0) {
		$.each(data.result.list, function(i, item) {
			if(i < 2) {
				allpjhtml += [
					'<div class="e_box">',
					'<div class="public-cell">',
					'<div class="public_primary fz-14">匿名</div>',
					'<time style="color: #ACACAC;">' + getDateTime2(new Date(item.createTime.time)) + '</time>',
					'</div>',
					'<div class="pl-10 pr-10 fz-15">' + item.content + '</div>',
					'<img class="p-10" src="/assets/img/service/pj' + item.level + '.JPG"  width="172"/>',
					'</div>',
					'<hr class="n_hr pull-right" width="97%" />'
				].join("");
			}

		});
		$(".e_listbox").html(allpjhtml);
	} else {
		$("#allpj").hide();
		$(".e_listbox").html("");
	}

}

function showButton(id, name, serviceTime, serviceNumber, profit, price, oldPrice, pricePartId) {
	setlocalStorage("pricePartName", id)
	if(beforeId == id) {
		document.getElementById(id).style.display = "block";
	} else {
		document.getElementById(beforeId).style.display = "none";
		document.getElementById(id).style.display = "block";
	}
	$(".st_goods_xz1 button").removeAttr("id", "st_goods_active");
	$("#" + id).find("button").eq(0).attr("id", "st_goods_active");
	beforeId = id;
	document.getElementById("price").innerHTML = "￥" + price;
}

function price(price, oldPrice, serviceTime, serviceNumber, profit, pricePartId) {
	setlocalStorage("pricePartId", pricePartId)
	document.getElementById("price").innerHTML = "￥" + price;
}

function tanchu_close() {
	$(".tanchu").addClass("hide");
	$(".tanchu_div").addClass("hide");
	$("body").css("overflow", "auto");
	$("body").css("position", "relative");
	document.getElementById("price").innerHTML = "";
	document.getElementById("Specifications").innerHTML = "";
	document.getElementById("level").innerHTML = "";
}

function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}

function lijiYyue() {

	if(userProving()) {
		/**
		 * 请空出了用户信息的数据
		 */
		/*var userInfo = getlocalStorage("set");
		var goodsIds = getlocalStorage("goodsId");
		var pricePartIds = getlocalStorage("pricePartId");
		var nurseIds = getlocalStorage("nurseId");
		var userOpenID = '';
		if(!localStorageIsNotnull("userOpenID")){
			userOpenID = getlocalStorage("userOpenID");
		}
 		
		localStorage.clear();
		
		if(!IdValStrnigs(userOpenID)){
   			setlocalStorage('userOpenID',userOpenID);
   		}
		setlocalStorage("set", userInfo);
		setlocalStorage("goodsId", goodsIds);
		setlocalStorage("pricePartId", pricePartIds);
		setlocalStorage("nurseId", nurseIds);*/
		clearLocalStorage(5);
		if(localStorageIsNotnull("productId") || getlocalStorage("productId") != 141) {
			window.location.href = path + '/product/service/ordernurse.html'
		} else if(getlocalStorage("productId") == 141) {
			window.location.href = path + '/product/service/orderh.html'
		}

	} else {
		setlocalStorage("returnLoginURL", path + "/nurse/details.html?id=" + getlocalStorage("nurseId"));
		//		window.location.href = "/login/shortcut.html";
		window.location.href = path + "/login/loginAmong.html";
	}
}
$(".tanchu").click(function() {
	$(".tanchu").addClass("hide");
	$(".tanchu_div").addClass("hide");
	$("body").css("overflow", "auto");
	$("body").css("position", "relative");
	document.getElementById("price").innerHTML = "";
	document.getElementById("Specifications").innerHTML = "";
	document.getElementById("level").innerHTML = "";
})

function n_lists() {
	window.location.href = "/product/evaluatalist.html?id=" + nurseid;
}