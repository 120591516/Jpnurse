$(function() {
	toastLoading("正在加载...");
	sendAjaxTrue(healtylist, "", "json", health_list);
})
var path = basePath();

function health_list(data) {
	console.log(data);
	var sv_list2 = [];
	if(data.resultcode == 1) {
		if(data.result.length > 0) {
			
			$.each(data.result, function(i, item) {
				var yhbtn = "";
				if(item.activityPromotion != null) {
					yhbtn = '<button>' + item.activityPromotion.typeName + '</button>';
				} else {
					yhbtn = "";

				}
				sv_list2 += [
					'<a href="' + path + '/product/visit/details.html?id=' + item.id + '&title='+item.title+'">',
					'<div class="public-cell img-width public-cell-0 color">',
					'<img src="' + item.imgUrl + '" />',
					'<div class="public_primary">',
					'<h1>' + item.title + '</h1>',
					'<div class="n_btn">' + yhbtn + '</div>',
					'<p>' + item.subTitle + '</p>',
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