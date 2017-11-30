var path = basePath();
$(function() {
	/*var indexformId = GetQueryString("pid");
	console.log(indexformId);*/
	//var city = remote_ip_info['city'];
	//var city = "北京";
/*	if(!IdValStrnigs(indexformId)) {
		setlocalStorage("pid", indexformId);
	}*/
	
	toastLoading("正在加载...");
	sendAjaxTrue(index_lb, "", "json", allindex);
	sendAjaxTrue(indeximg,"","json",function(data){
		console.log(data);
		$(".index_g img").attr("src",data.result[0].image);
	})
	/*资讯滚动*/
	setInterval('AutoScroll(".index_zx_top")', 3000);
})

/*资讯*/
function AutoScroll(obj) {
	$(obj).find("ul:first").animate({
		marginTop: "-16px"
	}, 1500, function() {
		$(this).css({ marginTop: "0px" }).find("li:first").appendTo(this);
	});
}
/*首页数据*/
function allindex(data) {
	//console.log(data);
	console.log(data.result.advertising);
	var index_lb = [];
	var index_pl = [];
	var index_gg = "";
	var index_zx = [];
	var index_rm = [];
	if(data.resultcode == 1) {
		if(data.result.advertising.length > 0) {
			$.each(data.result.advertising, function(i, item) {
				index_lb += [
					'<div class="swiper-slide">',
					'<a href="' + item.link + '">',
					'<img src="' + item.image + '"/>',
					'</a>',
					'</div>'
				].join("");
			})
			$(".swiper-wrapper").html(index_lb);
			var swiper = new Swiper('.swiper-container', {
				pagination: '.swiper-pagination',
				slidesPerView: 1,
				paginationClickable: true,
				spaceBetween: 30,
				loop: true,
				autoplay: 2500,
				autoplayDisableOnInteraction: false,
				observer: true, //修改swiper自己或子元素时，自动初始化swiper
				observeParents: true, //修改swiper的父元素时，自动初始化swiper
			});
		} else {
			console.log(data.msg);
		}
		if(data.result.product.length > 0) {
			//console.log(data.result.product);
			$.each(data.result.product, function(i, item) {
				if(i <= 4) {
					index_pl += [
						'<div class="index_box" onclick="sv_list(' + item.id + ')">',
						'<img src="' + item.url + '" />',
						'<p>' + item.title + '</p>',
						'</div>'
					].join("");
				} else {
					return false;
				}
			})
			$(".index_l").html(index_pl);
		}
		//console.log(data.result.adposition);
		/*	if(data.result.adposition.length > 0) {
				index_gg += '<img src="' + data.result.adposition[0].url + '" class="img-responsive" />';
				$(".index_g").html(index_gg);
			}*/
		if(data.result.information.length > 0) {
			//console.log(data.result.information);
			$.each(data.result.information, function(i, item) {
				index_zx += [
					'<li>',
					'<a href="'+path+'/news/details.html?id=' + item.id + '">' +
					item.title +
					'</a>',
					'</li>'
				].join("");
			})
			$("#zx").html(index_zx);
		}
		if(data.result.columnGoods.length > 0) {
			console.log(data.result.columnGoods);
			$.each(data.result.columnGoods, function(i, item) {
				var yhbtn="";
				if(item.apPrice==0){
					yhbtn="";
				}else{
					yhbtn='<button>'+item.apType+'</button>';
				}
				index_rm += [
					'<a href="'+path+'/product/service/details1.html?id=' + item.id + '"><div class="public-cell img-width public-cell-about">',
					'<img src="' + item.url + '" />',
					'<div class="public_primary">',
					'<h1>' + item.title + '</h1>',
					'<div class="n_btn">'+yhbtn+'</div>',
					'<p>' + item.sub_title + '</p>',
					'</div>',
					'</div></a>'
				].join("");
			})
			$("#rm").html(index_rm);
		}

		ClosetoastLoading();
		$(".mui-content").show();

	} else {
		console.log(data.msg);
	}

}
/*定位样式*/
$(window).on("scroll", function() {
	var t = $(this).scrollTop(); //获取滚动距离 || document.body.scrollTop
	var tt = t / 180;
	$(".indexlb_head_bg").css("opacity", tt);
})

function sv_list(id) {
	/**护士上门id=137/医学康复id=135/母婴id=133/医疗体检id=139/医疗导航id=141**/
	window.location.href = path+"/product/service/index.html?id=" + id;
}