/*function showServerTimeMsg(e) {
    var a = $("#comm_alert .popbox")
      , i = '<div class="popcon"><div class="tit">温馨提示</div><div class="con"><p>' + e + '：）</p></div></div><a href="javascript:void(0);" class="onebtn" id="service_url">我知道了</a>';
    a.html(i),
    $("#comm_alert").show()
}*/
function findOneWorkerAround() {
	var e = $("#cateid").val() || "26";
	cityid = getCookie("comm_cityid"),
	lat = getLocalStorage("lat"),
	lng = getLocalStorage("lng"),
	choosedDay = $(".weekbar li.active").eq(0).attr("day"),
	time = $(".detailtime li.active").eq(0).find("i").eq(0).text(),
	servicetime = choosedDay + "   " + time + ":00"
	/*  addressend = getLocalStorage("addressend"),
    duration = getJsonlocals(typelocal, "duration"),
    meijiaid = getJsonlocals(typelocal, "meijiaid"),
    xiejia = getJsonlocals(typelocal, "xiejia") || "0"*/;
	setCookie("servicetime",servicetime);
	//window.location='./jsp/H5/CreatOrder.jsp';
	/*window.history.go(-1);*/
	 window.location.href=document.referrer; 
}
function order() {
	var e = $(".weekbar li.active").eq(0).attr("day")
	, a = new Date(e).getDay()
	, i = $(".detailtime li.active").eq(0).find("i").eq(0).text()
	, t = getJsonlocals(typelocal, "duration")
	, o = (getJsonlocals(typelocal, "meijiaid"),
			getJsonlocals(typelocal, "meijiacode"),
			e + " " + i + ":00")
			, n = $("#comm_pf").val() || ""
			, r = $("#cateid").val()
			, s = $("#channel").val() || ""
			, l = getJsonlocals(typelocal, "servicetime");
	l && l != o && removeJsonLocal(typelocal, "allowchangeworker,sid,smobile,spic,sname"),
	setJsonlocals(typelocal, "servicetime", o),
	setJsonlocals(typelocal, "showtime", e + "(周" + getXingqiFromDayIndex(a) + ")" + i),
	setJsonlocals(typelocal, "duration", t);
	var c = "/meijiacomm/order?cateid=" + r + "&comm_pf=" + n + "&channel=" + s;
	window.location.href = c
}
function isactive() {
	var e = $(".detailtime li:not(.choosed)").hasClass("active");
	e ? $("#order").removeClass("btn_disable") : $("#order").addClass("btn_disable")
}
/*function getEndtime(e, a) {
    var i = "";
    -1 == e.toString().indexOf(".5") && "00" == a ? a = "00" : -1 == e.toString().indexOf(".5") && "30" == a ? a = "30" : -1 != e.toString().indexOf(".5") && "00" == a ? (e = e.toString().split(".")[0],
    a = "30") : -1 != e.toString().indexOf(".5") && "30" == a && (e = e.toString().split(".")[0],
    a = "00",
    e = parseInt(e) + 1);
    var i = e + ":" + a;
    return i
}*/
function showErrorMsg(e) {
	alert(e)
}
function initServiceDayTime(e, a) {
	$("#confirm").hasClass("onebtn_disable") && $("#confirm").removeClass("onebtn_disable"),
	getArryDay(e, a)
}
function getArryDay(e) {
	var a = $(".weekbar").eq(0)
	, i = "";
	a.empty();
	for (var t = -1, o = 0; o < jsonarray.length; o++) {
		var n = $jsoninfo[o]
		, r = new Date(n.date.replace(/-/g, "-")).Format("MM月dd日")
		, s = n.data
		, l = "";
		s && 0 != s.length || (l = "[满]",
				t == o - 1 && (e = new Date(new Date(e.replace(/-/g, "/")).getTime() + 864e5).Format("yyyy-MM-dd")),
				t = o);
		var c = "";
		console.info("显示日期：" + r);
		var c = "";
		e == n.date && (c = 'class="active"',
				setJsonlocals(typelocal, "active_time", e)),
				i += "<li " + c + ' day="' + n.date + '"><p>' + n.week + "</p><p>" + r + l + "</p></li>"
	}
	a.append(i)
	//设置时间轴的可滑动距离
	$('.weekbar').css("min-width",''+jsonarray.length * 80 +'px')
}
function getArryTrueTime(e, a) {
	for (var i = 0; i < jsonarray.length; i++)
		if (e == jsonarray[i].date)
			return a[i].data
}
//时间排版
function paibantime(e, a) {
	var i = getArryTrueTime(new Date(e).Format("yyyy-MM-dd"), a) || ""
	, t = $(".detailtime.clf").eq(0)
	, o = new Date(e)
	, n = "";
	t.empty(),
	$(".pull_up_loading").show(),
	o.setHours(9, 0, 0);
	for (var r = 0; 13 > r; r++) {
		var s = o.Format("h:mm")
		, l = "";
		-1 == $.inArray(s, i) && (l = 'class="choosed"'),
		n += "<li " + l + '><span><i class="from">' + s + "</i></span></li>",
		t.html(n),
		o.setTime(o.getTime() + 36e5)//1800000
	}
	$("#confirm").hasClass("onebtn_disable") || $("#confirm").addClass("onebtn_disable"),
	$(".pull_up_loading").hide()
}
function getXingqiFromDayIndex(e) {
	var a = {
			1: "一",
			2: "二",
			3: "三",
			4: "四",
			5: "五",
			6: "六",
			0: "日"
	};
	return a[e]
}
var startDayMS = $("#startDay").val() || ""
, isUpdating = !1
, typelocal = "mjinfo"
	, $jsoninfo = jsonarray
	, startDay = "";
$jsoninfo && $jsoninfo.length > 0 && (startDay = $jsoninfo[0].date || ""),
$(function() {
	isactive(),
	initServiceDayTime(new Date(startDay.replace(/-/g, "/")).Format("yyyy-MM-dd"), $jsoninfo),
	startDay = getJsonlocals(typelocal, "active_time") || startDay.replace(/-/g, "/"),
	paibantime(startDay.replace(/-/g, "/"), $jsoninfo),
	$("#order").on("click", function() {
		$(this).hasClass("btn_disable") || findOneWorkerAround()
	}),
	$(".weekbar").on("click", "li", function() {
		$(".pull_up_loading").hide(),
		$(this).addClass("active").siblings().removeClass("active");
		var e = $(".weekbar li.active").eq(0).attr("day");
		console.info("当前时间：" + e),
		paibantime(e, $jsoninfo),
		isactive()
	}),
	$(".detailtime").on("click", "li:not(.choosed)", function() {
		$(this).addClass("active").siblings().removeClass("active"),
		isactive()
	}),
	$("#comm_alert").on("click", "#service_url", function() {
		window.location.reload()
	})

});