pjlist();
var level = "";
$(function() {
	var nurseid = getUrlParam("id");
	var param2 = {
		nurseId: nurseid,
	}
	sendAjaxTrue(nursepj, param2, "json", nursepjcallback);
})

function pjlist() {
	layui.use('flow', function() {
		var $ = layui.jquery;
		var flow = layui.flow;

		flow.load({
			elem: '#e_listbox',
			done: function(page, next) {
				var lis = [];
				var id = getUrlParam("id");
				var param = {
					nurseId: id,
					level: level,
					p: page,
				}
				sendAjaxTrue(nurselist, param, "json", function(res) {
					console.log(res);
					if(res.resultcode == 1) {
						if(res.result.list.length > 0) {
							var path = basePath();
							layui.each(res.result.list, function(index, item) {
								lis.push(
									'<div class="e_box">',
									'<div class="public-cell">',
									'<div class="public_primary fz-14">匿名</div>',
									'<time style="color: #ACACAC;">' + getDateTime2(new Date(item.createTime.time)) + '</time>',
									'</div>',
									'<div class="pl-10 pr-10 fz-15">' + item.content + '</div>',
									'<img class="p-10" src="/assets/img/service/pj' + item.level + '.JPG"  width="172"/>',
									'</div>',
									'<hr class="pull-right" width="97%" />'
								);
							});
							next(lis.join(''), page < res.result.pages);
						} else {
							$("#e_listbox").html("");
						}
					}
				});
			}
		});
	});
}

$(".e_list button").click(function() {
	$(".e_list button").removeAttr("id");
	$(this).attr("id", "pj_active");
	level = $(this).attr("name");
	$("#e_listbox").html("");
	pjlist();
})

function nursepjcallback(data) {
	if(data.resultcode == 1) {
		$(".pj_i1").html(data.result.level_1);
		$(".pj_i2").html(data.result.level_2);
		$(".pj_i3").html(data.result.level_3);
		$(".pj_i4").html(data.result.level_4);
		$(".pj_i5").html(data.result.level_5);
	}else{
		$(".pj_i1").html("0");
		$(".pj_i2").html("0");
		$(".pj_i3").html("0");
		$(".pj_i4").html("0");
		$(".pj_i5").html("0");
	}

}