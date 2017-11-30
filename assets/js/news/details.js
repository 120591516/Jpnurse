function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}
var path = basePath();
$(function() {
	var zxid = GetQueryString("id");
	var flag=userProving();
	var infoid="";
	if(flag){
	 infoid = JSON.parse(localStorage.getItem("set"));
	}	
	var param;
	if(infoid == null || infoid == "") {
		param = {
			id: zxid,
		}
	} else {
		param = {
			userId: infoid.id,
			id: zxid,
		}
	}
	toastLoading("正在加载...");
	sendAjaxTrue(zx_xq, param, "json", zx_content);
})

function zx_content(data) {

	//console.log(data);
	console.log(data.result);
	if(data.resultcode == 1) {
		ClosetoastLoading();
		$("#newsdetails").removeClass("hide");
		$("#zx_title").html(data.result.title);
		$("title").html(data.result.title);
		$("#zx_time").html(getDateTime2(new Date(data.result.createTime.time)));
		$("#zx_source").html(data.result.source);
		$("#zx_content").html(data.result.content);
		var obj = document.getElementById("shouc");
		if(data.result.collection == true) {

			obj.setAttribute("src", "/assets/img/personal/561446619903600295.png");
		} else {

			obj.setAttribute("src", "/assets/img/personal/701953148989397547.png");
		}

	}
}
pjlist();

function pjlist() {
	layui.use('flow', function() {
		var $ = layui.jquery; //不用额外加载jQuery，flow模块本身是有依赖jQuery的，直接用即可。
		var flow = layui.flow;
		flow.load({
			elem: '#zx_pl', //流加载容器
			isAuto: false,
			done: function(page, next) { //执行下一页的回调
				var lis = [];
				var userId;
				var newid = GetQueryString("id");
				//var infoid = JSON.parse(localStorage.getItem("set"));
				param = {
					//userId: infoid.id,
					p: page,
					id: newid,
				}
				sendAjaxTrue(zx_pj, param, "json", function(res) {
					//假设你的列表返回在data集合中
					//console.log(res);
					$("#plnum").html(res.result.total);
					if(res.resultcode == 1) {
						if(res.result.list.length > 0) {
							$("#zx_pl").removeClass("hide");
							$(".zx_img").addClass("hide");
							layui.each(res.result.list, function(index, item) {
								lis.push(
									'<div class="pl_list public-cell-left">',
									'<img src="' + item.headPicture + '" />',
									'<div class="public_primary">',
									'<p class="pl_content2">',
									'<span>' + item.creatorName + '</span>',
									'<span>' + getDateTime2(new Date(item.createTime.time)) + '</span>',
									'</p>',
									'<p class="pl_content">' + item.content + '</p>',
									'</div>',
									'</div>'
								);
							});
							//执行下一页渲染，第二参数为：满足“加载更多”的条件，即后面仍有分页
							//pages为Ajax返回的总页数，只有当前页小于总页数的情况下，才会继续出现加载更多
							next(lis.join(''), page < res.result.pages);
						} else {
							$(".zx_img").removeClass("hide");
							$("#zx_pl").addClass("hide");
						}
					}
				});
			}
		});
	});
}

function mypl() {
	$(".zx_foot").addClass("hide");
	$(".pinglu_bg").removeClass("hide");
	$(".zx_foot2").removeClass("hide");
	$("#plcontent").focus();
	$(window).scrollTop(9999);
}
/*$("#plcontent").blur(function() {
	$(".zx_foot").removeClass("hide");
	$(".zx_foot2").addClass("hide");
})*/

function shoucang() {
	var creatorId;
	var creatorName;
	var newid = GetQueryString("id");
	var infoid = JSON.parse(localStorage.getItem("set"));
	//userId: infoid.id,
	if(!userProving()) {
		window.location.href = path+"/login/loginAmong.html";
	} else {
		param = {
			creatorId: infoid.id,
			informationId: newid,
			creatorName: infoid.name,
		}
		HttpAjax(zx_shoucang, param, "json", shoucang_success);
	}

}

function shoucang_success(data) {
	//console.log(data);
	var obj = document.getElementById("shouc");
	if(data.msg == "您已取消收藏！") {
		obj.setAttribute("src", "/assets/img/personal/701953148989397547.png");
	} else {
		obj.setAttribute("src", "/assets/img/personal/561446619903600295.png");
	}
	layer.msg(data.msg,{time:2000});
}
/**发表评论**/
function fabiao() {
	$("#plcontent").focus();	
	if(userProving()) {
		var fb_info = JSON.parse(localStorage.getItem("set"));
		function GetQueryString(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
			var r = window.location.search.substr(1).match(reg);
			if(r != null) return unescape(r[2]);
			return null;
		}
		var newid = GetQueryString("id");
		var id = fb_info.id;
		var name = fb_info.name;
		var contentpl = $("#plcontent").val();
		if(contentpl == "" || contentpl == null) {
			return false;
		} else {
			param = {
				creatorId: id,
				creatorName: name,
				content: contentpl,
				informationId: newid,
				p: 1,
			}
			HttpAjax(fb_pl, param, "json", fbCallBack);
		}
	} else {
		window.location.href = path+"/login/loginAmong.html";
	}

}

function fbCallBack(data) {
	if(data.resultcode == 1) {
		layui.use('layer', function() {
			var $ = layui.jquery,
				layer = layui.layer;
			layer.msg('发布成功！',{time:2000});
		})
	}
	$("#plcontent").val("");
	$(".pinglu_bg").addClass("hide");
	$(".zx_foot2").addClass("hide");
	$(".zx_foot").removeClass("hide");
	$("#zx_pl").html("");
	pjlist();
}
$(".pinglu_bg").click(function() {
	$(".pinglu_bg").addClass("hide");
	$(".zx_foot2").addClass("hide");
	$(".zx_foot").removeClass("hide");
})