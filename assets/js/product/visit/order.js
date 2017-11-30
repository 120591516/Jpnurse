var infoid = JSON.parse(localStorage.getItem("set"));
var Id = getUrlParam("id");
var path = basePath();
var limit = 1;
var p_id;
var path = basePath();
$(function() {
	var param1 = {
		id: Id
	}
	var param = {
		creatorId: infoid.id
	}
	var param3 = {
		userId: infoid.id
	}

	sendAjaxTrue(healtydetails, param1, "json", listtypecallback);
	sendAjaxTrue(relationlist, param, "json", listcallback);

	if(!localStorageIsNotnull("txd_addess") && !localStorageIsNotnull("txd_detailaddess")) {
		$("#xd_addess").val(getlocalStorage("txd_addess"));
		$("#xd_detailaddess").val(getlocalStorage("txd_detailaddess"));
	} else {
		sendAjaxTrue(getReceiveAddress, param3, "json", setReceiveAddress);
	}
})
var appprice = "";
var actualPrice = "";
var downprice = "";
var downprice1 = "";
/*获取套餐列表*/
function listtypecallback(data) {
	console.log(data);
	var addtypelist = [];
	var title1 = data.result.title;
	var type = "";
	var typename = "";
	var price = "";
	if(data.resultcode == 1) {

		$.each(data.result.jkwyPackagePriceList, function(index, item) {
			if(item.activityPromotion == null) {
				type = 0;
			} else {
				type = 1;
				typename = item.activityPromotion.typeName;
				price = item.activityPromotion.price;

			}
			addtypelist += [
				'<div class="jk_tc" supportNumber="' + item.supportNumber + '"  id="' + item.id + '"  typename="' + typename + '"  price="' + price + '"  type="' + type + '">',
				'<h3 class="ml-10 fz-14">' + title1 + item.title + '</h3>',
				'<div>',
				'<small>￥</small><em>' + item.price + '</em>',
				'</div>',
				'</div>'
			].join("");
		})
		$("#typelist").html(addtypelist);
		//判断有无p_id也就是判断一开始上来的选中状态（套餐类型）
		if(localStorageIsNotnull("p_id")) {
			p_id = data.result.jkwyPackagePriceList[0].id;
			g_id = data.result.id;
			limit = data.result.jkwyPackagePriceList[0].supportFee;
			setlocalStorage("p_id", p_id);
			setlocalStorage("limit", limit);
			if($("#" + p_id + "").attr("type") == 1) {
				$("#shandanlj").show();
				$("#aptype").html($("#" + p_id + "").attr("typeName"));
				$("#apprice").html($("#" + p_id + "").attr("price"));
				if(localStorageIsNotnull("voucherUseId")) {
					appprice = $("#apprice").html();

					if(localStorageIsNotnull("downprice")) {
						actualPrice = data.result.jkwyPackagePriceList[0].price;
						downprice = (actualPrice - appprice).toFixed(2);
						if(downprice <= 0) {
							$("#actualPrice").html("0");
							setlocalStorage("downprice", 0);
						} else {
							$("#actualPrice").html(downprice);
							setlocalStorage("downprice", downprice);
						}
					} else {
						actualPrice = getlocalStorage("downprice");
					}

				} else {

					appprice = $("#apprice").html();
					downprice1 = (getlocalStorage("priceCouponVoucher") - appprice).toFixed(2);
					console.log(getlocalStorage("priceCouponVoucher"));
					console.log(appprice);
					console.log(downprice1)
					if(downprice1 <= 0) {
						$("#actualPrice").html("0");
						setlocalStorage("downprice", 0);
					} else {
						$("#actualPrice").html(downprice1);
						setlocalStorage("downprice", downprice1);
					}

				}
			}
			if($("#" + p_id + "").attr("type") == 0) {
				$("#shandanlj").hide();
				if(localStorageIsNotnull("voucherUseId")) {
					if(localStorageIsNotnull("downprice")) {
						$("#actualPrice").html(data.result.jkwyPackagePriceList[0].price);
						setlocalStorage("downprice", data.result.jkwyPackagePriceList[0].price);
					} else {
						$("#actualPrice").html(getlocalStorage("downprice"));
					}

					/*setlocalStorage("downprice", data.result.jkwyPackagePriceList[0].price);*/
				} else {
					$("#actualPrice").html(getlocalStorage("priceCouponVoucher"));
					setlocalStorage("downprice", getlocalStorage("priceCouponVoucher"));

				}
			}
			$(".jk_tc:nth-child(1)").addClass("jk_active");
			$(".jk_tc:nth-child(1)").append('<img src="/assets/img/service/xiadan-houhou@2x.png" class="jk_xz" width="35" height="35" />')
		} else {
			p_id = getlocalStorage("p_id");
			g_id = data.result.id;
			limit = getlocalStorage("limit");
			$(".jk_tc").removeClass("jk_active");
			$(".jk_tc img").remove();
			if($("#" + p_id + "").attr("type") == 1) {
				$("#shandanlj").show();
				$("#aptype").html($("#" + p_id + "").attr("typeName"));
				$("#apprice").html($("#" + p_id + "").attr("price"));
				if(localStorageIsNotnull("voucherUseId")) {
					appprice = $("#apprice").html();

					if(localStorageIsNotnull("downprice")) {
						actualPrice = data.result.jkwyPackagePriceList[0].price;
						downprice = (actualPrice - appprice).toFixed(2);
						if(downprice <= 0) {
							$("#actualPrice").html("0");
							setlocalStorage("downprice", 0);
						} else {
							$("#actualPrice").html(downprice);
							setlocalStorage("downprice", downprice);
						}
					} else {
						actualPrice = getlocalStorage("downprice");
					}

				} else {

					appprice = $("#apprice").html();
					downprice1 = (getlocalStorage("priceCouponVoucher") - appprice).toFixed(2);
					console.log(getlocalStorage("priceCouponVoucher"));
					console.log(appprice);
					console.log(downprice1)
					if(downprice1 <= 0) {
						$("#actualPrice").html("0");
						setlocalStorage("downprice", 0);
					} else {
						$("#actualPrice").html(downprice1);
						setlocalStorage("downprice", downprice1);
					}

				}
			}
			if($("#" + p_id + "").attr("type") == 0) {
				$("#shandanlj").hide();
				if(localStorageIsNotnull("voucherUseId")) {
					if(localStorageIsNotnull("downprice")) {
						$("#actualPrice").html(data.result.jkwyPackagePriceList[0].price);
						setlocalStorage("downprice", data.result.jkwyPackagePriceList[0].price);
					} else {
						$("#actualPrice").html(getlocalStorage("downprice"));
					}

					/*setlocalStorage("downprice", data.result.jkwyPackagePriceList[0].price);*/
				} else {
					$("#actualPrice").html(getlocalStorage("priceCouponVoucher"));
					setlocalStorage("downprice", getlocalStorage("priceCouponVoucher"));

				}
			}
			$("#" + p_id + "").addClass("jk_active");
			$("#" + p_id + "").append('<img src="/assets/img/service/xiadan-houhou@2x.png" class="jk_xz" width="35" height="35" />');
		}
		tanfangyhj(g_id, p_id);
		if(!localStorageIsNotnull("downprice")) {
			$("#actualPrice").html(downprice);
		}
		$(".jk_tc").click(function() {
			$(".jk_tc").removeClass("jk_active");
			$(".jk_tc img").remove();
			$(this).addClass("jk_active");
			$(this).append('<img src="/assets/img/service/xiadan-houhou@2x.png" class="jk_xz" width="35" height="35" />');
			$("#actualPrice").html($(this).find("em").html());
			$("#couponContent").html("");
			limit = $(this).attr("supportNumber");
			p_id = $(this).attr("id");
			/*tanfangyhj(g_id, p_id);*/
			console.log(limit);
			clearLocalStorage("priceCouponVoucher");
			$("#couponContent").html("未使用");
			setlocalStorage("limit", limit);
			setlocalStorage("p_id", p_id);
			if($(this).attr("type") == 1) {
				$("#shandanlj").show();
				actualPrice = $("#actualPrice").html();
				$("#aptype").html($(this).attr("typeName"));
				$("#apprice").html($(this).attr("price"));
				appprice = $("#apprice").html();
				downprice = (actualPrice - appprice).toFixed(2);
				if(downprice <= 0) {
					$("#actualPrice").html("0");
					setlocalStorage("downprice", 0);
				} else {
					$("#actualPrice").html(downprice);
					setlocalStorage("downprice", downprice);
					console.log(downprice);
				}
			}
			if($(this).attr("type") == 0) {
				$("#shandanlj").hide();
				$("#actualPrice").html($(this).find("em").html());
				setlocalStorage("downprice", $(this).find("em").html())

			}
		})
	} else {
		$("#typelist").html("");
	}
}
/*获取亲友列表*/
function listcallback(data) {
	console.log(data);
	var addlist = [];
	if(data.resultcode == 1) {

		/*if(data.result.length >= 1) {
			$("#friendlist").addClass("public-cell-left");
			
		} else {
			$("#friendlist").removeClass("public-cell-left");
			
		}*/
		if(data.result.length >= 2) {
			$(".jk_more").show();
			$(".smaddress").css("margin-top", "50px");
		} else {
			$(".jk_more").hide();
			$(".smaddress").css("margin-top", "10px");
		}
		$.each(data.result, function(index, item) {
			if(item.ifOrder == 1) {
				/*$(".jk_ts" + item.id).show();*/
				//var jkname = item.jkwyOrderList[0].jkwyPackagePrice.jkwyPackage.title + item.jkwyOrderList[0].jkwyPackagePrice.title;
				var jkname = item.jpTitle + item.jppTitle;

			}
			/*if(item.ifOrder == 0) {
				$(".jk_ts").hide();
			}*/
			addlist += [
				'<div class="public-cell3 public-cell-left">',
				'<span class="public-chec3"><input type="checkbox" class="radio" name="checkbox" id="' + item.id + '" shibie="1"/><label class="radio" for="' + item.id + '" onclick="doCheck()"></label>',
				'</span>',
				'<div class="public_primary">',
				'<div class="jk_qy">',
				'<img src="/assets/img/service/xingming@2x.png" width="19" height="19" />',
				'<span>' + item.name + '</span>',
				'<i>' + item.relation + '</i>',
				'<img src="/assets/img/service/bianji@2x.png" width="18" height="18" class="pull-right imgremove" data_type="' + jkname + '"  onclick="editrelation(\'' + item.id + '\')"/>',
				'</div>',
				'<div class="jk_qy mt-10 mb-10">',
				'<img src="/assets/img/service/shenfenzhenghao@2x.png" width="19" height="19" />',
				'<span>' + item.sfz + '</span>',
				'</div>',
				'<p class="jk_ts" data_type="' + jkname + '">*该用户已购买' + jkname + '</p>',
				'</div>',
				'</div>'
			].join("");
		})
		$("#addlist").html(addlist);
		$(".public-cell3:last-child").removeClass("public-cell-left");
		$(".jk_ts[data_type='undefined']").hide();
		$(".imgremove[data_type!='undefined']").removeAttr("onclick");
		$(".imgremove[data_type!='undefined']").click(function() {
			layer.msg("该用户已经购买服务，不可编辑信息！", { time: 3000 });
		})

		if(localStorageIsNotnull("relationid")) {
			var arr = [];
			$("input:checkbox").eq(0).attr("checked", "checked");
			$("input[type='checkbox']:checked").each(function() {　　
				arr.push($(this).attr("id"));
			})
			setlocalStorage('relationid', arr.toString());
		} else {
			var relationid = getlocalStorage("relationid");
			var relarry = relationid.split(',');
			limit = relarry.length;
			for(var i = 0; i < relarry.length; i++) {
				//console.log(relarry[i]);
				$("#" + relarry[i] + "").attr("checked", "checked");
			}
		}

		$(".public-cell3:nth-child(2)").nextAll().hide();
		savelocal();
	} else {
		$("#addlist").html("");
	}
}

function tanfangyhj(goodid, productId) {
	var param2 = {
		userId: infoid.id,
		goodsId: goodid, //套餐id
		pricePartId: productId, //类型id
		type: 5
	}
	sendAjaxTrue(getUserVoucher, param2, "json", returnUserAllVoucher);
}

function returnUserAllVoucher(data) {
	console.log(data);

	if(localStorageIsNotnull("voucherUseId")) {
		if(data.result.length == 0) {
			$(".yhj_keyong").addClass("yhj_wu");
			$(".yhj_keyong").html("无可用");
			$("#yhjorder").removeAttr('onclick');
		}
		if(data.result.length > 0) {
			var num_yhj = data.result.length;
			$(".yhj_keyong").html(num_yhj + "张可用");
			$("#couponContent").html("未使用");
		}
		$("#actualPrice").html(getlocalStorage("downprice"));
		console.log(getlocalStorage("downprice"));
	} else {
		var pricetype = getlocalStorage("voucherTypePrice");
		var price = getlocalStorage("voucherTypePriceamount");
		var num_yhj = data.result.length;
		$(".yhj_keyong").html(num_yhj + "张可用");
		$("#couponContent").css("color", "red");
		if(pricetype == "元") {
			$("#couponContent").html("-￥" + price);
		}
		if(pricetype == "折") {
			$("#couponContent").html(price + "折");
		}
		$("#actualPrice").html(getlocalStorage("downprice"));
		console.log(getlocalStorage("downprice"));
	}

}

function doCheck() {
	console.log($("input[type='checkbox']:checked").length);
	$("input[type='checkbox']").attr('disabled', true);
	$("input[type='checkbox']:checked").attr('shibie', "2");
	if(!localStorageIsNotnull("limit")) {
		limit = getlocalStorage("limit");
	}
	if($("input[type='checkbox']:checked").length >= limit) {
		$("input[shibie='2']:checked").attr('disabled', false);
		layer.msg("此项服务只能选择" + limit + "个人", { time: 2000 });

	} else {
		$("input[type='checkbox']").attr('disabled', false);
	}
}

function checkmore() {
	$(".public-cell3:nth-child(2)").nextAll().toggle();
}

function savelocal() {
	var arr = [];
	$("input[type='checkbox']:checked").each(function() {　　
		arr.push($(this).attr("id"));
	})
	var xd_addess = $("#xd_addess").val();
	var xd_detailaddess = $("#xd_detailaddess").val();
	if(!IdValStrnigs("xd_addess")) {
		setlocalStorage('txd_addess', xd_addess);
	}
	if(!IdValStrnigs("xd_detailaddess")) {
		setlocalStorage('txd_detailaddess', xd_detailaddess);
	}
	setlocalStorage('relationid', arr.toString());
}

function addfirends() {
	savelocal();
	window.location.href = "addfriend.html";
}

function editrelation(id) {
	savelocal();
	window.location.href = "editfriend.html?id=" + id;
}

function yhxieyi() {
	window.location.href = path + "/product/Agreement.html";
}

function selectCoupon() {
	savelocal();
	/*setlocalStorage("pricePartId", p_id);*/
	setlocalStorage("returnLoginURL", "/product/visit/order.html?id=" + Id);
	window.location.href = path + "/product/Coupon.html?type=5&id=" + g_id + "&cpId=" + p_id;

}

function orderpay() {
	var xd_addess = $("#xd_addess").val();
	var xd_detailaddess = $("#xd_detailaddess").val();
	var code = $("#tjrcode").val();
	var price = $("#actualPrice").html();
	if(xd_addess == "" || xd_addess == null) {
		layer.msg("请选择上门地址!", { time: 2000 });
		return;
	}
	if(xd_detailaddess == "" || xd_detailaddess == null) {
		layer.msg("请填写详细地址!", { time: 2000 });
		return;
	}
	if($("input[type='checkbox']:checked").length != limit) {
		layer.msg("亲友人数与所选服务不匹配", { time: 3000 });
		return;
	}
	savelocal();
	var paramo = {
		creatorId: infoid.id,
		jkwyRelationId: getlocalStorage("relationid"), //亲友id
		jkwyPackageId: g_id,
		jkwyPackagePriceId: p_id,
		voucherUserId: getlocalStorage("voucherUseId"),
		code: code,
		payPrice: price,
		address: xd_addess,
		detailAddress: xd_detailaddess,
	}
	sendAjaxTrue(healtyorder, paramo, "json", orderlistcallback)
}

function orderlistcallback(data) {
	console.log(data);
	if(data.resultcode == 1) {
		setlocalStorage("payprice", data.result.payPrice);
		setlocalStorage("goodsName", data.result.goodsName);
		setlocalStorage("orderNo", data.result.no);
		setlocalStorage("orderId", data.result.orderId);
		window.location.href = path + "/product/tpay.html";
	} else {
		layer.msg(data.msg, { time: 3000 });
	}
}

function setReceiveAddress(data) {
	if(data.resultcode == 1) {
		if(data.result.length > 0) {
			var xd_detailaddess = data.result[0].detailaddress;
			var address = data.result[0].province + "," + data.result[0].city + "," + data.result[0].area;
			$("#xd_addess").val(address);
			$("#xd_detailaddess").val(xd_detailaddess);
		} else {
			$("#xd_addess").val("");
			$("#xd_detailaddess").val("");
		}

	} else {
		$("#xd_addess").val("");
		$("#xd_detailaddess").val("");
	}
}