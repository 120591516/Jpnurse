$(function() {
	var param = {
		userId: getUserId(),
	};
	sendAjaxTrue(healtyArchives, param, "json", healtylist);
})

function healtylist(data) {
	console.log(data);
	if(data.resultcode == 1) {
		var h_list = [];
		var h_list1 = [];
		/*var title = data.result.goods[0].jkwyPackage.title + data.result.goods[0].title;
		var time = data.result.goods[0].jkwyOrderList[0].createTime.time;
		$('#jk_title').html(title);*/
		$.each(data.result.notGoods, function(i, item) {
			h_list1 += [
				'<div class="hr_box hr_yy" style="margin-bottom: 10px;">',
				'<div class="public-cell public-cell-about">',
				'<div class="public_primary fz-15">' + item.name + '的健康档案</div>',
				'<time class="pull-right fz-14" style="color: #A7A7A7;">更新于：' + getDateTime2(new Date(item.createTime.time)) + '</time>',
				'</div>',
				'<div class="public-cell">',
				'<img src="/assets/img/service/gernziliao@2x.png" width="24" height="24" />',
				'<div class="public_primary ml-10">',
				'<span class="fz-14">个人资料</span>',
				'</div>',
				'<em class="hr_wsd hide">(完善度98%)</em>',
				'</div>',
				'<div class="public-cell" style="padding-top: 0;">',
				'<img src="/assets/img/service/tizheng@2x.png" width="24" height="24" />',
				'<div class="public_primary ml-10">',
				'<span class="fz-14">体征检测</span>',
				'</div>',
				'<em class="hr_wsd hide" style="color:#F11212;"><i>●</i>(有异常)</em>',
				'</div>',
				'</div>'
			].join("");
		})

		$.each(data.result.goods, function(j, list) {
			h_list += '<div class="hr_single  hr_yy" style="margin-bottom: 10px;">';
			h_list += [
				'<p class="jk_title">',
				'<span id="jk_title" class="fz-14">' + list.jkwyPackage.title + list.jkwyPackagePrice.title + '</span>',
				'<span class="hr_xf hide">立即续费</span>',
				'</p>'
			].join("")
			$.each(list.jkwyRelationList, function(j, item) {
				h_list += [
					'<div class="hr_box" style="margin-bottom: 10px;">',
					'<div class="public-cell public-cell-about">',
					'<div class="public_primary fz-15">' + item.name + '的健康档案</div>',
					'<time class="pull-right fz-14" style="color: #A7A7A7;">更新于：' + getDateTime2(new Date(item.createTime.time)) + '</time>',
					'</div>',
					'<div class="public-cell">',
					'<img src="/assets/img/service/gernziliao@2x.png" width="24" height="24" />',
					'<div class="public_primary ml-10">',
					'<span class="fz-14">个人资料</span>',
					'</div>',
					'<em class="hr_wsd hide">(完善度98%)</em>',
					'</div>',
					'<div class="public-cell" style="padding-top: 0;">',
					'<img src="/assets/img/service/tizheng@2x.png" width="24" height="24" />',
					'<div class="public_primary ml-10">',
					'<span class="fz-14">体征检测</span>',
					'</div>',
					'<em class="hr_wsd hide" style="color:#F11212;"><i>●</i>(有异常)</em>',
					'</div>',
					'</div>'
				].join("");

			})
			if(list.ifExpire == 1) {
				h_list += '<p class="jk_title1 text-right">已持续为您服务' + list.lastTime + '天</p></div>';
			}
			if(list.ifExpire == 0) {
				h_list += '<p class="jk_title1 text-right">您的服务已结束</p></div>';
			}

		})

		$("#h_list_single").html(h_list);
		$("#listpersonal").html(h_list1);

	} else {
		$("#h_list_single").html("");
	}
}