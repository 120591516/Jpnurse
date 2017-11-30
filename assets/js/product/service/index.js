function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}
var path = basePath();

function replaceTitle(title) {
	document.title = title;
}
$(function() {
	toastLoading("正在加载...");

	clearLocalStorage(0);

	var Id = GetQueryString("id");
	if(GetQueryString("code") != null && GetQueryString("code") != '') {
		setlocalStorage("tuigCode", GetQueryString("code"));
	}
	if(Id == '139') {
		replaceTitle("医疗体检");
		sendAjaxTrue(tj_list, "", "json", ti_list);

		$('#menu_img').val("https://jinpai.b0.upaiyun.com/jinpaihushi/JP20171116113553-57319.png"); //	分享图片
		$('#menu_title').val("北京主要三甲医院体检"); //	分享名字
		$('#menu_desc').val("约体检，查报告，一站搞定！"); //	分享介绍
		$('#menu_url').val('https://wap.goldnurse.com' + path + '/product/service/index.html?id=' + Id); //	分享链接

	} else {
		if(Id == '137') {

			$('#menu_img').val("https://jinpai.b0.upaiyun.com/jinpaihushi/JP20171116113513-11836.png"); //	分享图片
			$('#menu_title').val("护士到家，足不出户，贴心护理"); //	分享名字
			$('#menu_desc').val("打针输液、褥疮、胃管尿管、灌肠、吸痰、鼻饲等护理，轻松安全，价格实惠。"); //	分享介绍
			$('#menu_url').val('https://wap.goldnurse.com' + path + '/product/service/index.html?id=' + Id); //	分享链接

			replaceTitle("护士上门");
		}
		if(Id == '135') {

			$('#menu_img').val("https://jinpai.b0.upaiyun.com/jinpaihushi/JP20171116113526-92106.png"); //	分享图片
			$('#menu_title').val("专业的术后康复服务专家"); //	分享名字
			$('#menu_desc').val("打针输液、褥疮、胃管尿管、灌肠、吸痰、鼻饲等护理，轻松安全，价格实惠。"); //	分享介绍
			$('#menu_url').val('https://wap.goldnurse.com' + path + '/product/service/index.html?id=' + Id); //	分享链接

			replaceTitle("居家康复");
		}
		if(Id == '133') {

			$('#menu_img').val("https://jinpai.b0.upaiyun.com/jinpaihushi/JP20171116113537-70417.png"); //	分享图片
			$('#menu_title').val("科学有效的母婴护理"); //	分享名字
			$('#menu_desc').val("爱宝宝、爱妈妈，给家人更全面的爱！"); //	分享介绍
			$('#menu_url').val('https://wap.goldnurse.com' + path + '/product/service/index.html?id=' + Id); //	分享链接

			replaceTitle("母婴护理");
		}
		if(Id == '141') {

			$('#menu_img').val("https://jinpai.b0.upaiyun.com/jinpaihushi/JP20171116113411-83128.png"); //	分享图片
			$('#menu_title').val("代挂号，约专家，速度快，省钱多"); //	分享名字
			$('#menu_desc').val("北京主要三甲医院都能预约，还有护士全程贴身陪诊，方便快捷。"); //	分享介绍
			$('#menu_url').val('https://wap.goldnurse.com' + path + '/product/service/index.html?id=' + Id); //	分享链接
			replaceTitle("挂号陪诊");
		}
		var param = {
			productId: Id,
		}
		sendAjaxTrue(pl_list, param, "json", peizhen_list);
	}

})

function ti_list(data) {
	var sv_list2 = [];
	if(data.resultcode == 1) {
		if(data.result.length > 0) {
			//console.log(data.result);
			console.log(data);
			$.each(data.result, function(i, item) {
				var str = item.detail_imageUrl
				var imgurl = str.replace('https://jinpai.b0.upaiyun.com/', '/');
				sv_list2 += [
					'<a href="' + path + '/product/service/tijian_details.html?id=' + item.goodsId + '">',
					'<div class="public-cell mub2_list">',
					'<img src="' + item.imageUrl + '" />',
					'<div class="public_primary">',
					'<h1>' + item.name + '<i class="mb_icon">' + item.grade_name + '</i>', '</h1>',
					'<p class="mb_p">' + item.address + '</p>',
					'</div>',
					'</div>',
					'</a>'
				].join("");
			})
			$("#sv_server2").html(sv_list2);
			ClosetoastLoading();
		} else {
			$("#sv_server2").html("");
		}

	}

}

function peizhen_list(data) {
	var peizhen_html = [];
	console.log(data);
	if(data.resultcode == 1) {
		if(data.result.length > 0) {
			console.log(data.result);

			$.each(data.result, function(i, item) {

				var urlPath = "";
				if(item.product_id == '141') {
					urlPath = path + '/product/service/details2.html?id=' + item.id;
				} else {
					urlPath = path + '/product/service/details1.html?id=' + item.id;
				}
				var yhbtn = "";
				if(item.apPrice == 0) {
					yhbtn = "";
				} else {
					yhbtn = '<button>' + item.apType + '</button>';
				}
				peizhen_html += [
					/*	'<a href="'+urlPath+'"><div class="public-cell public-cell-0 yuyue_list">',
						'<img src="' + item.url + '" />',
						'<div class="public_primary">',
						'<h1>' + item.title + '</h1>',
						'<p class="yuyue_p">' + item.sub_title + '</p>',
						'<p class="yuyue_price">￥<em>' + item.price + '</em>', '</p>',
						'</div>',
						'<div class="yuyue_btn">',
						'<p> ·' + item.numberLen + '人已选</p>',
						'<button>预约</button>',
						'</div>',
						'</div></a>'*/
					'<a href="' + urlPath + '"><div class="public-cell img-width public-cell-0 color">',
					'<img src="' + item.url + '" />',
					'<div class="public_primary">',
					'<h1>' + item.title + '</h1>',
					'<div class="n_btn">' + yhbtn + '</div>',
					'<p>' + item.sub_title + '</p>',
					'</div>',
					'</div></a>'
				].join("");
			})
			$("#sv_server2").html(peizhen_html);

			// 加载分享按钮功能
			/*if(isWeiXin()) {
				setWchatCallback();
			}*/
			ClosetoastLoading();
		}
	}
}