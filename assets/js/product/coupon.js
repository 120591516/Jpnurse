function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}
$(function() {
	/*var goodsId = GetQueryString("goodsId");
	var pricePartId = GetQueryString("pricePartId");*/
	var goodsId = "";
	var pricePartId = "";
	var typeVocher= "1";
	if(!IdValStrnigs(GetQueryString("type"))){
		typeVocher = GetQueryString("type");
		goodsId = GetQueryString("id");
		pricePartId = GetQueryString("cpId");
		setlocalStorage("pricePartId",pricePartId);
	}else{
		goodsId = localStorage.getItem("goodsId");
		pricePartId =localStorage.getItem("pricePartId");
	}
	setlocalStorage("typeVocher",typeVocher);
	/*userId 用户id
	goodsId 商品的id
	pricePartId 下单商品的价格明细表id*/
	
	var nurseIdv = '';
	if(!localStorageIsNotnull("nurseId") && getlocalStorage("pnigtaiType") == 0){
		nurseIdv = getlocalStorage("nurseId");
	}
	param = {
		userId: getUserId(),
		goodsId :	goodsId,
		pricePartId : pricePartId,
		nurseId	: nurseIdv,
		type : typeVocher,
	}
	sendAjaxTrue(getUserVoucher, param, "json", returnUserAllVoucher);
})

function returnUserAllVoucher(data){
	console.log(data);
	var coupon_html = [];
	if(data.resultcode == 1){
		if(data.result.length > 0){
		$.each(data.result, function(i, item) {
				
				// type 1.现金卷2.满减卷3.折扣卷4.已使用5.已过去 6.可用
				var typeName = '';
				var typePrice = '';
				var typeContent = '';
				var typeAmount =0;
				if(item.type == 1){
					typeName = '现金券';
					typePrice = '元';
					typeContent = '现金券:满任意金额可用';
					typeAmount =item.amount;
				}else if (item.type == 2){
					typeName = '满减券';
					typePrice = '元';
					typeContent = '满减券：满'+item.condition_amount+'可用';
					typeAmount =item.amount;
				}else if (item.type == 3){
					typeName = '折扣券';
					typePrice = '折';
					typeContent = '折扣券:满任意金额可用';
					typeAmount =item.amount * 10;
				}else if (item.type == 4){
					typeName = '已使用';
					typeAmount =item.amount;
				}else if (item.type == 5){
					typeName = '已过期';
					typeAmount =item.amount;
				}else if (item.type == 6){
					typeName = '未使用';
					typeAmount =item.amount;
				}else{
					typeName = '通用券';
					typeAmount =item.amount;
				}
				coupon_html +=[ /*'<div class="yhj_list"	>',
					'		<div class="public-cell" onclick="couponEmploy(\''+item.vu_id+'\',\''+typePrice+'\',\''+item.amount+'\');">',
					'			<div class="yhj_price">',
					'				<p><em>'+typeAmount+'</em>'+typePrice+'</p>',
					'				<h1>'+typeName+'</h1>',
					'			</div>',
					'			<div class="public_primary">',
					'				<p>'+typeContent+'</p>',
					'				<p class="mt-10">有效期至：'+getDateTime2(new Date(item.vu_end_time.time))+'</p>',
					'			</div>',
					'		</div>',
					'		<p class="yhj_sm">本券只限 '+item.productName+' 类使用</p>',
					'<img src="/assets/img/personal/yhj.png" width="30" height="30"  class="p_yhj"/>',
					'</div>'*/
					'<div class="yhj_list">',
					'<div class="public-cell" style="padding: 0;" onclick="couponEmploy(\''+item.vu_id+'\',\''+typePrice+'\',\''+typeAmount+'\');">',
					'<div class="yhj_price">',
					'<p><em>' + typeAmount + '</em>'+typePrice+'</p>',
					'<p>' + typeName + '</p>',
					'</div>',
					'<div class="public_primary pt-5">',
					'<p class="ml-20 mr-20">' + typeContent + '</p>',
					'<p class="yhj_g_p mr-20">'+getDateTime3(new Date(item.vu_start_time.time))+'-' + getDateTime3(new Date(item.vu_end_time.time)) + '</p>',
					'<p class="yhj_g_p2" style="height:15px">',
					/*'<span class="fz-12">详细信息</span>',
					'<span><i class="right-up" onclick="zk(\'' + i + '\')"></i></span>',*/
					'</p>',
					'</div>',
					'</div>',
					'<p class="yhj_sm hide pk' + i + '">本券仅限 :' + item.productName + '类服务</p>',				
					'</div>'
				].join("");
			})
			$("#header_mg").html(coupon_html);
			/*$(".right-up").click(function() {
				$(this).toggleClass("right-down");
			})*/
			ClosetoastLoading();
		}
	}else{
		$('#yhj_keyong').html("");
	}
}
/*function zk(obj) {
	$(this).toggleClass("right-down");
	$(".pk" + obj).toggleClass("hide");
}*/
function couponEmploy(voucherUseId,typePrice,amount){
	/*userId: 用户id
voucherUseId： 用户优惠券id
pricePartId ： 价格id*/
	console.log(voucherUseId);
	
	if(!localStorageIsNotnull("typeVocher")){
		if(getlocalStorage("typeVocher") == 4){
			var businessArrId = getlocalStorage("businessArrId");
			for(var a=0;a<businessArrId.length;a++){
				var voucherUseId_b = "voucherUseId_"+businessArrId[a];
				if(!localStorageIsNotnull(voucherUseId_b)){
					if(getlocalStorage(voucherUseId_b) == voucherUseId){
						layer.msg("此优惠券已被使用~!",{time:500});
						return false;
					}
				}
			}
			var businessIdVoucher = getlocalStorage("businessIdVoucher");
			//	优惠券ID
			localStorage.setItem("voucherUseId_"+businessIdVoucher, voucherUseId);
			//	优惠券类型名称
			localStorage.setItem("voucherTypePrice_"+businessIdVoucher, typePrice);
			//	优惠券金额
			localStorage.setItem("voucherTypePriceamount_"+businessIdVoucher, amount);
		}else{
			//	优惠券ID
			localStorage.setItem("voucherUseId", voucherUseId);
			//	优惠券类型名称
			localStorage.setItem("voucherTypePrice", typePrice);
			//	优惠券金额
			localStorage.setItem("voucherTypePriceamount", amount);
		}
	}else{
		//	优惠券ID
		localStorage.setItem("voucherUseId", voucherUseId);
		//	优惠券类型名称
		localStorage.setItem("voucherTypePrice", typePrice);
		//	优惠券金额
		localStorage.setItem("voucherTypePriceamount", amount);
	}
	var nurseIdv = '';
	if(!localStorageIsNotnull("nurseId") && getlocalStorage("pnigtaiType") == 0){
		nurseIdv = getlocalStorage("nurseId");
	}
	param = {
		userId: getUserId(),
		voucherUseId :	voucherUseId,
		pricePartId : localStorage.getItem("pricePartId"),
		nurseId:nurseIdv,
		type:getlocalStorage("typeVocher"),
	}
	sendAjaxTrue(getVoucherGoodsPrice, param, "json", returnUserEmployVoucher);

}

function returnUserEmployVoucher(data){
	console.log(data);
	if(data.resultcode == 1){
		if(getlocalStorage("typeVocher") == 4){
			//	优惠后的价格
			localStorage.setItem("priceCouponVoucher_"+getlocalStorage("businessIdVoucher"), data.result);
		}else{
			//	优惠后的价格
			localStorage.setItem("priceCouponVoucher", data.result);
		}
	}else{
		localStorage.setItem("priceCouponVoucher",0);
	}
	if(localStorageIsNotnull("returnLoginURL")){
		window.history.go(-1);
	}else{
		window.location.href = getlocalStorage("returnLoginURL");
	}
}
