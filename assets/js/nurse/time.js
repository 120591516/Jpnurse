function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}
var path = basePath();
$(function() {
	if(GetQueryString("orderXtype") != null && GetQueryString("orderXtype") != '') {
		var orderXtype = GetQueryString("orderXtype");
		setlocalStorage("orderXtype", orderXtype);
	}
	removeLocalStorage("nurseTarget");

	console.log(getlocalStorage("nurseId"));
	console.log(getlocalStorage('productId'));
	var timeNurseId =getlocalStorage("nurseId");
	if(timeNurseId==10022){
		timeNurseId =0;
	}
	param = {
		userId: timeNurseId,
		productId: getlocalStorage('productId'),
		/*userId: 18306*/
	}
	sendAjaxTrue(n_workTime, param, "json", timelists);
})

function timelists(data) {
	console.log(data);
	if(data.resultcode == 1) {
		if(data.result.length > 0) {
			var monthDayList = [];
			var weekHourList = [];
			var workMothDay_Flag = false;
			$.each(data.result, function(i, item) {
				var sj = '';
				if(item.h9 == 1) {
					sj += '<li class="n_ul_li"> <span>' + item.w9 + '</span> <br/> 不可约 </li>';
				} else {
					workMothDay_Flag = true;
					sj += '<li class="n_ul_li n_li_active"> <span>' + item.w9 + '</span> <br/> 可约  </li>';
				}
				if(item.h10 == 1) {
					sj += '<li class="n_ul_li"> <span>' + item.w10 + '</span> <br/> 不可约 </li>';
				} else {
					workMothDay_Flag = true;
					sj += '<li class="n_ul_li n_li_active"> <span>' + item.w10 + '</span> <br/> 可约  </li>';
				}
				if(item.h11 == 1) {
					sj += '<li class="n_ul_li"> <span>' + item.w11 + '</span> <br/> 不可约 </li>';
				} else {
					workMothDay_Flag = true;
					sj += '<li class="n_ul_li n_li_active"> <span>' + item.w11 + '</span> <br/> 可约  </li>';
				}
				if(item.h12 == 1) {
					sj += '<li class="n_ul_li"> <span>' + item.w12 + '</span> <br/> 不可约 </li>';
				} else {
					workMothDay_Flag = true;
					sj += '<li class="n_ul_li n_li_active"> <span>' + item.w12 + '</span> <br/> 可约  </li>';
				}
				if(item.h13 == 1) {
					sj += '<li class="n_ul_li"> <span>' + item.w13 + ' </span><br/> 不可约 </li>';
				} else {
					workMothDay_Flag = true;
					sj += '<li class="n_ul_li n_li_active"> <span>' + item.w13 + '</span> <br/> 可约  </li>';
				}
				if(item.h14 == 1) {
					sj += '<li class="n_ul_li"><span>' + item.w14 + '</span> <br/> 不可约 </li>';
				} else {
					workMothDay_Flag = true;
					sj += '<li class="n_ul_li n_li_active"> <span>' + item.w14 + '</span><br/> 可约  </li>';
				}
				if(item.h15 == 1) {
					sj += '<li class="n_ul_li"> <span>' + item.w15 + '</span> <br/> 不可约 </li>';
				} else {
					workMothDay_Flag = true;
					sj += '<li class="n_ul_li n_li_active"> <span>' + item.w15 + '</span> <br/> 可约  </li>';
				}
				if(item.h16 == 1) {
					sj += '<li class="n_ul_li"> <span>' + item.w16 + ' </span><br/> 不可约 </li>';
				} else {
					workMothDay_Flag = true;
					sj += '<li class="n_ul_li n_li_active"> <span>' + item.w16 + '</span> <br/> 可约  </li>';
				}
				if(item.h17 == 1) {
					sj += '<li class="n_ul_li"> <span>' + item.w17 + '</span> <br/> 不可约 </li>';
				} else {
					workMothDay_Flag = true;
					sj += '<li class="n_ul_li n_li_active"> <span>' + item.w17 + '</span> <br/> 可约  </li>';
				}
				if(item.h18 == 1) {
					sj += '<li class="n_ul_li"> <span>' + item.w18 + '</span><br/> 不可约 </li>';
				} else {
					workMothDay_Flag = true;
					sj += '<li class="n_ul_li n_li_active"> <span>' + item.w18 + '</span> <br/> 可约  </li>';
				}
				if(item.h19 == 1) {
					sj += '<li class="n_ul_li"> <span>' + item.w19 + '</span> <br/> 不可约 </li>';
				} else {
					workMothDay_Flag = true;
					sj += '<li class="n_ul_li n_li_active"> <span>' + item.w19 + '</span><br/> 可约  </li>';
				}
				if(item.h20 == 1) {
					sj += '<li class="n_ul_li"> <span>' + item.w20 + '</span><br/> 不可约 </li>';
				} else {
					workMothDay_Flag = true;
					sj += '<li class="n_ul_li n_li_active"> <span>' + item.w20 + '</span> <br/> 可约  </li>';
				}
				if(item.h21 == 1) {
					sj += '<li class="n_ul_li"> <span>' + item.w21 + '</span><br/> 不可约 </li>';
				} else {
					workMothDay_Flag = true;
					sj += '<li class="n_ul_li n_li_active"> <span>' + item.w21 + '</span> <br/> 可约  </li>';
				}

				$("#work" + i).html(sj);
				$("#n_week" + i).html(item.week);
				var riqi = '';
				if(workMothDay_Flag && $('#weekHour').html() == '')
					riqi = '<div class="sv_time time_active" onclick="rqQh(' + i + ')" >' + nyrZyr(item.calendar) + '</div>';
				else
					riqi = '<div class="sv_time" onclick="rqQh(' + i + ')" >' + nyrZyr(item.calendar) + '</div>';

				monthDayList += [riqi].join("");
				weekHourList += [sj].join("");
				if(workMothDay_Flag && $('#weekHour').html() == '') {
					$('#n_week').html(item.week);
					$("#weekHour").html(sj);
				}
			})
			$("#monthDay").html(monthDayList);
			$(".sv_time").click(function() {
				$(".sv_time").removeClass("time_active");
				$(this).addClass("time_active");
			})
			$(".n_li_active").click(function() {
				$(".n_ul_li").removeClass("n_li_active1");
				$(this).addClass("n_li_active1");
				/*alert($('.time_active').html());
				alert($("#n_week").html());
				alert($(this).find("span").html());*/

			})
			/*$("#weekHour").html(weekHourList);*/
		} else {
			window.history.go(-1);
		}
	} else {
		window.history.go(-1);
	}
}

function rqQh(i) {
	$("#weekHour").html('');
	$("#n_week").html('');
	$("#weekHour").html($("#work" + i).html());
	$("#n_week").html($("#n_week" + i).html());

	$(".n_li_active").click(function() {
		$(".n_ul_li").removeClass("n_li_active1");
		$(this).addClass("n_li_active1");
	})
}

function confirmSelect() {
	/*alert($('.time_active').html());
	alert($("#n_week").html());
	alert($('.n_li_active1').find("span").html());*/
	var ny = $('.time_active').html();
	var xs = $('.n_li_active1').find("span").html();
	if(!IdValStrnigs(ny) && 　!IdValStrnigs(xs)) {
		var date = new Date;
		var year = date.getFullYear();
		setlocalStorage("appDate", year + '-' + ny + ' ' + xs + ':00');
		if(!localStorageIsNotnull("orderXtype")) {
			var orderXtype = getlocalStorage("orderXtype");
			if(orderXtype == 1) {
				window.location.href = path+"/product/service/order1.html";
			} else if(orderXtype == 2) {
				window.location.href =path+"/product/service/orderh.html";
			} else if(orderXtype == 6) {
				window.location.href =path+"/product/service/ordernurse.html";
			}
		}
	} else {
		alert('请选择时间');
	}
}

function nyrZyr(time) {
	var a = time.split("-");
	if(a.length > 2) {
		var y = a[0];
		var m = a[1];
		var d = a[2];
		return m + '-' + d;
	}
	return '';
}