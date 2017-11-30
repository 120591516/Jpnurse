$(".wu_sj").addClass("hide");
layui.use('flow', function() {
	var $ = layui.jquery; //不用额外加载jQuery，flow模块本身是有依赖jQuery的，直接用即可。
	var flow = layui.flow;

	flow.load({
		elem: '#mysc', //流加载容器
		done: function(page, next) { //执行下一页的回调
			var lis = [];

			function GetQueryString(name) {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
				var r = window.location.search.substr(1).match(reg);
				if(r != null) return unescape(r[2]);
				return null;
			}
			var informationId;
			var userId;
			var newid = GetQueryString("id");
			var infoid = JSON.parse(localStorage.getItem("set"));
			param = {
				informationId: newid,
				userId: infoid.id,
				p: page,
			}
			sendAjaxTrue(my_shoucang, param, "json", function(res) {
				//假设你的列表返回在data集合中
				console.log(res);
				if(res.resultcode == 1) {
					if(res.result.list.length > 0) {
						var path = basePath();
						layui.each(res.result.list, function(index, item) {
							lis.push(
								'<a href="'+path+'/news/details.html?id=' + item.id + '">',
								'<div class="public-cell zx_list public-cell-about">',
								'<img src="' + item.image + '" class="img"/>',
								'<div class="public_primary">',
								'<h1>' + item.title + '</h1>',
								'<div class="zx_list_time">',
								'<span>' + getDateTime2(new Date(item.create_time.time)) + '</span>',
								'<span class="pull-right">' + item.source + '</span>',
								'</div>',
								'</div>',
								'</div>',
								'</a>'
							);
						});
						next(lis.join(''), page < res.result.pages);
					} else {
						$("#mysc").html("");
						$(".wu_sj").removeClass("hide");
						
					}
				}
			});
		}
	});
});