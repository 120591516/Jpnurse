function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}
var path = basePath();
$(function() {
//	toastLoading("正在加载...");
	var Id = GetQueryString("id");
	var img_url = GetQueryString("imgurl");
	var imgurls="https://jinpai.b0.upaiyun.com/"+img_url;
	var sv_tj_img="";
	sv_tj_img='<img src="'+imgurls+'" class="img-responsive" />';
	$("#tjgood_xqimg").html(sv_tj_img);
	var param = {
		hospitalId: Id,
	}
	sendAjaxTrue(tj_goodlist, param, "json", servicegoodlist);
	
})

function servicegoodlist(data) {
	console.log(data);
	var sv_goodlist = [];	
	if(data.resultcode == 1) {
		if(data.result.length > 0) {
			console.log(data.result);			
			$.each(data.result, function(i, item) {
				sv_goodlist += [
					'<a href="'+path+'/product/service/tijian_details.html?tId='+item.t_id+'&thId='+item.th_id+'&id='+item.id+'"><div class="public-cell public-cell-0 yuyue_list">',
						'<img src="'+item.url+'" />',
						'<div class="public_primary">',
							'<h1>'+item.title+'</h1>',
							'<p class="yuyue_p">'+item.sub_title+'</p>',
						'</div>',
					'</div>',
					'</a>'
				].join("");
			});
			$("#tjgoodlist").html(sv_goodlist);
			ClosetoastLoading();
		}
	}
}
/*
 	'<a href="/product/service/tijian_details.html?tId='+item.t_id+'&thId='+item.th_id+'&id='+item.id+'"><div class="public-cell public-cell-0 yuyue_list">',
						'<img src="'+item.url+'" />',
						'<div class="public_primary">',
							'<h1>'+item.title+'</h1>',
							'<p class="yuyue_p">'+item.sub_title+'</p>',
							'<p class="yuyue_price">￥<em>'+item.price+'</em>','</p>',
						'</div>',
						'<div class="yuyue_btn">',
							'<p> ·'+item.numberLen+'人已选</p>',
							'<button>预约</button>',
						'</div>',
					'</div></a>'
 * */