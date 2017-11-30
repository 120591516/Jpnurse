function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}
var path = basePath();
$(function() {
	var storage=window.localStorage;
    for(var i=0;i<storage.length;i++){
        var key=storage.key(i);
        if(key != 'set'){
        	removeLocalStorage(key);
        }
    }
	toastLoading("正在加载...");
	var Id = GetQueryString("id");
	var img_url = GetQueryString("imgurl");
	var sv_tj_img="";
	sv_tj_img='<img src="'+img_url+'" class="img-responsive" />';
	$("#tjgood_xqimg").html(sv_tj_img);
	var param = {
		hospitalId: Id,
	}
	sendAjaxTrue(tj_goodlist, param, "json", servicegoodlist);
	
})

function servicegoodlist(data) {
	var sv_goodlist = [];	
	if(data.resultcode == 1) {
		if(data.result.length > 0) {
			console.log(data.result);			
			$.each(data.result, function(i, item) {
				sv_goodlist += [
					'<div class="public-cell public-cell-0 yuyue_list">',
						'<img src="'+item.url+'" />',
						'<div class="public_primary">',
							'<h1>'+item.title+'</h1>',
							'<p class="yuyue_p">'+item.sub_title+'</p>',
							'<p class="yuyue_price">￥<em>'+item.price+'</em>','</p>',
						'</div>',
						'<div class="yuyue_btn">',
							'<p> ·'+item.numberLen+'人已选</p>',
							'<a href="'+path+'/product/service/details2.html?tId='+item.t_id+'&thId='+item.th_id+'&id='+item.id+'"><button>预约</button></a>',
						'</div>',
					'</div>'
				].join("");
			});
			$("#tjgoodlist").html(sv_goodlist);
			ClosetoastLoading();
		}
	}

}