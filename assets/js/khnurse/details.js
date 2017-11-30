$(function() {
	var infoid = JSON.parse(localStorage.getItem("set"));
	var param = {
		userId: infoid.id
	}
	var param1 = {
		id: infoid.id
	}	
	sendAjaxTrue(n_details, param, "json", detailscallback);
	HttpAjax(n_zirzlist, param1, "json", renzlistcallback);
	toastLoading("正在加载...");
})

function renzlistcallback(data) {
	console.log(data);
	if(data.resultcode == 1) {
		if(data.result.length > 0) {
			var flag=false;
			//alert(data.result.length)
			$.each(data.result, function(i, item) {
				if(item.type == 1) {
					if(item.status == 0) {
						$("#nursetype1").html("审核中...");
						$("#nursetypes1").removeAttr("onclick");
					} else if(item.status == 1) {
						$("#nursetype1").html("已认证！");
						$("#nursetype1").css("color", "green");
						$("#nursetype1").css("font-weight", "600");
						$("#nursetypes1").removeAttr("onclick");
					}
					flag=true;
				}
				if(item.type == 2) {
					if(item.status == 0) {
						$("#nursetype2").html("审核中...");
						$("#nursetypes2").removeAttr("onclick");
					} else if(item.status == 1) {
						$("#nursetype2").html("已认证！");
						$("#nursetype2").css("color", "green");
						$("#nursetype2").css("font-weight", "600");
						$("#nursetypes2").removeAttr("onclick");
					}
					flag=true;
				}
				if(item.type == 3) {
					if(item.status == 0) {
						$("#nursetype3").html("审核中...");
						$("#nursetypes3").removeAttr("onclick");
					} else if(item.status == 1) {
						$("#nursetype3").html("已认证！");
						$("#nursetype3").css("color", "green");
						$("#nursetype3").css("font-weight", "600");
						$("#nursetypes3").removeAttr("onclick");
					}
					flag=true;
				}
			})
			if(flag){
				localStorage.setItem("edit",1)
			}else{
				localStorage.setItem("edit",2)
			}
		}else{
			localStorage.setItem("edit",2)
		}
	}
}
function jq_qidai1(){
	layer.msg('敬请期待', { time: 2000 });
	return;
}
function jq_qidai2(){
	layer.msg('敬请期待', { time: 2000 });
	return;
}
function detailscallback(data) {
	console.log(data.resultcode);
	if(data.resultcode == 1) {		
		$("#name").html(data.result.name);
		$("#adress").html(data.result.address);
		$.each(data.result.nurseImages, function(i, item) {
			if(item.type == 1) {
				$("#demo1").attr("src", item.url);
			}
		})
		if(data.result.sex == 1) {
			$("#sex").html("女");
		}
		if(data.result.sex == 0) {
			$("#sex").html("男");
		}
		$("#wsxx").removeClass("hide");
		$("#nursetx").attr("src", data.result.nurseImages.url);
		ClosetoastLoading();
	} else {
		ClosetoastLoading();
		$("#wuxiaoxi").removeClass("hide");
	}

}