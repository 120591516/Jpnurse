layui.use('flow', function() {
	var $ = layui.jquery; //不用额外加载jQuery，flow模块本身是有依赖jQuery的，直接用即可。
	var flow = layui.flow;

	flow.load({
		elem: '#tjlist', //流加载容器
		done: function(page, next) { //执行下一页的回调
			var lis = [];
			var uid = JSON.parse(localStorage.getItem("set"));
			param = {
				p: page,
				userId: uid.id
				//userId: 18309
			}
			sendAjaxTrue(pzlist, param, "json", function(res) {
				//假设你的列表返回在data集合中
				console.log(res);
				if(res.resultcode == 1) {
					if(res.result.list.length > 0) {
						var path = basePath();
						layui.each(res.result.list, function(index, item) {
							lis.push(
								'<a href="'+path+'/personal/healthy/pzdetails.html?id=' + item.id + '">',
								'<div class="public-cell public-cell-0">',
								'<div class="public_primary">',
								'<h1>' + item.title + '</h1>',
								'<p class="mt-10" style="height:19px">' + item.hospital + '</p>',
								'</div>',
								'<div>',
								'<p>' + item.accept_time + '</p>',
								'<p class="mt-10 pull-right">' + item.userName + '</p>',
								'</div>',
								'</div>',
								'</a>'
							);
						});
						next(lis.join(''), page < res.result.pages);
					} else {
						$("#tjlist").html("");
						$(".wu_sj").removeClass("hide");
					}
				} else {
					$("#tjlist").html("");
					$(".wu_sj").removeClass("hide");
				}
			});
		}
	});
});