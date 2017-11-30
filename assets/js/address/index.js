var infoid = JSON.parse(localStorage.getItem("set"));
var path = basePath();
function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}

$(function() {
	if(GetQueryString("orderXtype") != null && GetQueryString("orderXtype") != '') {
		var orderXtype = GetQueryString("orderXtype");
		setlocalStorage("orderXtype", orderXtype);
	} else {
		/*window.history.go(-1);*/
	}
	param = {

		userId: infoid.id,

	}
	sendAjaxTrue(address_list, param, "json", address_lists);
})

function address_lists(data) {
	console.log(data);
	var addresslist = [];
	if(data.resultcode == 1) {
		if(data.result.length > 0) {
			$(".ad_tishi").addClass("hide");
			$.each(data.result, function(i, item) {
				var onc = '';
				if(!localStorageIsNotnull("orderXtype") && getlocalStorage("orderXtype") == 1 || getlocalStorage("orderXtype") == 5 || getlocalStorage("orderXtype") == 6 || getlocalStorage("orderXtype") == 4) {
					onc = 'onclick=setAdds(\'' + item.name + '\',\'' + item.phone + '\',\'' + item.province + item.city + item.area + '\',\'' + item.detailaddress + '\',\'' + item.id + '\')';
				}

				addresslist += [
					'<div class="address_gl mb-10">',
					'<div ' + onc + '><p class="address_p1">',
					'<span>' + item.name + '</span>',
					'<span class="fz-15">' + item.phone + '</span>',
					'</p>',
					'<p>' + item.province + item.city + item.area + item.detailaddress + '</p></div>',
					'<hr class="ad_border" />',
					'<p class="address_p3">',
					'<span>',					
					'<input class="radio" type="radio" name="rd" id="check',
					i, '" onclick="shezhixz(\'' + item.id + '\')"/>设为默认地址 </span>',
					'<span class="pull-right  mr-20" onclick="detele(\'' + item.id + '\')">',
					'<img src="/assets/img/personal/shouhuodiz_shanc.png" />删除 </span>',
					'<a href="'+path+'/personal/address/edit.html?id=' + item.id + '">',
					'<span class="pull-right mr-20">',
					'<img src="/assets/img/personal/shouhuodiz_bianji.png" />编辑 </span>',
					'</a>',
					'</p>',
					'</div>'
				].join("");
			})

			$("#address").html(addresslist);
			$("#check0:radio").attr("checked", true);

		}
		if(data.result.length == 0) {
			$(".ad_tishi").removeClass("hide");
		}
	}

}
function shezhixz(obj){
	var infoid = JSON.parse(localStorage.getItem("set"));   
	var obj;
	var param = {
		id: obj,
		defaultAddress:1,
		creatorId: infoid.id,
	}
	HttpAjax(update_address, param, "json", function(data){
		window.location.reload();
	})
}

function toas2(title, tip, url) {
	if(tip == null || tip == "") {
		tip = "信息提示";
	}
	$('#tip1').html(tip);
	$('#content1').html(title);
	$('#con').html("确定");
	$('#can').html("取消");
	$('#con').show();
	$('#can').show();
	$('#dialog1').show().on('click', '.weui_btn_dialog', function(e) {
		$('#dialog1').off('click').hide();
		$('#con').off('click').hide();
		$('#can').off('click').hide();
	});
	if(url == null || url == "") {
		url = "";
	} else {
		$("#con").click(function() {
			console.info(url);
			window.location.href = url;
		});
	}
}

function detele(id) {
	toas1("确定要删除吗?");
	$("#con").click(function() {
		var param = {
			id: id,
			creatorId: infoid.id,
		}
		sendAjaxTrue(deteleaddress, param, "json", detele_ad);
	});
}

function detele_ad(data) {
	if(data.resultcode == 1) {
		window.location.reload();
	}

}

function setAdds(name, phone, adds, detailaddess, id) {
	setlocalStorage("xd_addsId", id);
	setlocalStorage("xd_name", name);
	setlocalStorage("xd_phone", phone);
	setlocalStorage("xd_addess", adds);
	setlocalStorage("xd_detailaddess", detailaddess);
	/*	localStorage.setItem("addsName", name);
		localStorage.setItem("addsPhone", phone);
		localStorage.setItem("addsAdds", adds);
		localStorage.setItem("addsId", id);*/
	if(getlocalStorage("orderXtype") == 1) {
		window.location.href = path+"/product/service/order1.html";

	} else if(getlocalStorage("orderXtype") == 4) {

		window.location.href =path+"/product/goods/order.html";

	} else if(getlocalStorage("orderXtype") == 5) {

		window.location.href = path+"/product/goods/oneOrder.html";

	} else if(getlocalStorage("orderXtype") == 6) {

		window.location.href = path+"/product/service/ordernurse.html";

	}
	/*window.history.go(-1);*/
}