layui.use('flow', function() {
	var $ = layui.jquery; //不用额外加载jQuery，flow模块本身是有依赖jQuery的，直接用即可。
	var flow = layui.flow;

	flow.load({
		elem: '#zx', //流加载容器
		done: function(page, next) { //执行下一页的回调
			var lis = [];
			param = {
				p: page,
			}
			sendAjaxTrue(zx_lists, param, "json", function(res) {
				//假设你的列表返回在data集合中
				console.log(res);
				if(res.resultcode == 1) {
					if(res.result.list.length > 0) {
						var path = basePath();
						layui.each(res.result.list, function(index, item) {
							if(item.image == "" || item.image == null) {
								var newimg = '';
							} else {
								var newimg = '<img src="' + item.image + '" class="img"/>';
							}						
							lis.push(
								'<a href="'+path+'/news/details.html?id=' + item.id + '" class="aa">',
								'<div class="public-cell zx_list public-cell-about">' +
								newimg +
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
						/*next("zx_list").removeClass("public-cell-about");*/

						//执行下一页渲染，第二参数为：满足“加载更多”的条件，即后面仍有分页
						//pages为Ajax返回的总页数，只有当前页小于总页数的情况下，才会继续出现加载更多
						next(lis.join(''), page < res.result.pages);						
					}
				}
			});
		}
	});
});