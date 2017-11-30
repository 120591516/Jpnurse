/*
 *
 * 个人中心 -- 我的订单
 * */
var schedule = "";
user_service_order();

function user_service_order() {
	/*toastLoading("正在加载...");*/
	var infoid = JSON.parse(localStorage.getItem("set"));
	console.info(infoid);
	if(infoid != "" && infoid != null) {
		layui.use('flow', function() {
			var $ = layui.jquery;
			var flow = layui.flow;

			flow.load({
				elem: '#order_lists',
				done: function(page, next) {
					var lis = [];
					var id = getUrlParam("id");
					var id = infoid.id;
					param = {
						userId: id,
						schedule: schedule,
						p:page
					}
					sendAjaxTrue(service_order_list, param, "json", function(res) {
						console.log(res);
						if(res.resultcode == 1) {
							if(res.result.list.length > 0) {
								var path = basePath();
								layui.each(res.result.list, function(index, item) {
									var htmls_list_add = '';
									htmls_list_add += '<section class="order_lists' + index + ' mb-10">';
									htmls_list_add += '<a href="' + path + '/personal/order/service/details.html?id=' + item.id + '">';
									htmls_list_add += '<div class="order-list-xq">';
									htmls_list_add += '<div>';
									htmls_list_add += '	订单编号：' + item.order_no;
									htmls_list_add += '</div>';
									htmls_list_add += '<span>';
									if(item.SCHEDULE == 0) {
										htmls_list_add += '	待付款';
									}
									if(item.SCHEDULE == 1) {
										htmls_list_add += '待接单';
									}
									if(item.SCHEDULE == 2) {
										htmls_list_add += '待服务';
									}
									if(item.SCHEDULE == 3) {
										htmls_list_add += '进行中';
									}
									if(item.SCHEDULE == 4) {
										htmls_list_add += '待评价';
									}
									if(item.SCHEDULE == 5) {
										htmls_list_add += '已完成';
									}
									if(item.SCHEDULE == 6) {
										htmls_list_add += '已取消';
									}
									if(item.SCHEDULE == 7) {
										htmls_list_add += '申诉中';
									}
									if(item.SCHEDULE == 8) {
										htmls_list_add += '已失效';
									}
									htmls_list_add += '</span>';
									htmls_list_add += '</div>';
									htmls_list_add += '<div class="order-list-xq order-list-bg">';
									htmls_list_add += '	<img src="' + item.url + ' " />';
									htmls_list_add += '	<div>';
									htmls_list_add += '		<h1>';
									htmls_list_add += item.title;
									htmls_list_add += '			<span class="order-price">￥' + item.price + '</span>';
									htmls_list_add += '		</h1>';
									if(item.address.indexOf(',') > 0) {
										htmls_list_add += '		<p>' + replace(item.address) + item.detail_address + '</p>';
									} else {
										htmls_list_add += '		<p>' + item.detail_address + '</p>';
									}
									htmls_list_add += '		<p class="mt-5">' + format(new Date(item.appointment_time.time)) + '</p>';
									htmls_list_add += '	</div>';
									htmls_list_add += '</div>';
									if(item.name != '' && (item.SCHEDULE != 0 && item.SCHEDULE != 8)) {
										htmls_list_add += '<div class="public-cell color mt-10">';
										htmls_list_add += '	<div class="public_primary fz-14">';
										htmls_list_add += '		护士：' + item.name;
										htmls_list_add += '	</div>';
										htmls_list_add += '	<span class="fz-14">' + item.phone + '</span>';
										htmls_list_add += '</div>';
									}
									htmls_list_add += "</a>"
									if(item.SCHEDULE != 3) {
										htmls_list_add += '<div class="order-list-btn">';
										if(item.SCHEDULE < 3) {
											if(item.SCHEDULE == 0) {
												var createTime = item.create_time.time;
												var now = new Date().getTime();
												var nTime = now - createTime;
												var hour = Math.floor(nTime / 3600 / 1000);
												if(hour < 2) {
													htmls_list_add += '<button class="pull-right" id="pay_btn" onclick="immediate_payment(\'' + item.id + '\',\'' + item.order_no + '\',\'' + item.title + '\',\'' + item.pay_price + '\')">立即付款</button>';
												} else {
													htmls_list_add += '<button class="pull-right" id="pay_btn" onclick="reAppointment(' + item.goods_id + ')">再次预约</button>';
												}
											}
										}
										if((item.SCHEDULE < 7 && item.SCHEDULE > 4) || item.SCHEDULE == 8) {
											htmls_list_add += '<button class="pull-right" id="pay_btn" onclick="reAppointment(' + item.goods_id + ')">再次预约</button>';
										}
										if(item.SCHEDULE == 4) {
											htmls_list_add += '<button class="pull-right" id="pay_btn" onclick="reAppointment(' + item.goods_id + ')">再次预约</button>';
											htmls_list_add += '<button class="pull-right" onclick="toEvaluate(\'' + item.id + '\')">评价</button>';
										}
										htmls_list_add += '</div>';
									}
									htmls_list_add += '</section>';

									lis.push(
										htmls_list_add
									);
								});
								next(lis.join(''), page < res.result.pages);
							} else {
								$("#order_lists").html("");
							}
						}
					});
				}
			});
		});

		/*var id = infoid.id;
		param = {
			userId: id,
		}
		sendAjaxTrue(service_order_list, param, "json", userOrderCallback);*/
	}
}

/**
 * 再次预约
 * @param {Object} goods_id 商品id
 */
function reAppointment(goods_id) {
	window.location.href = path + "/product/service/details1.html?id=" + goods_id;
}

/**
 * 取消订单
 * @param {Object} order_id 订单id
 */
function cancellationOrder(order_id) {
	var msg = "如服务人员接单后用户取消订单，需至少提前5小时联系客服，如服务开始前1小时内退单，则平台会收取60%的服务费，如开始服务前2小时内退单，则平台会收取30%的服务费,如开始服务前5小时内退单，则平台会收取10%的服务费。"
	var infoid = JSON.parse(localStorage.getItem("set"));
	console.info(infoid);
	toas1(msg);
	$("#con").click(function() {
		if(infoid != "" && infoid != null) {
			var id = infoid.id;
			var param = {
				orderId: order_id,
				userId: id,
			};
			sendAjaxTrue(cancel_service_order, param, "json", function(data) {
				layer.msg(data.result, { time: 1000 });
				setTimeout(function() {
					window.location.reload();
				}, 1000)
			})
		}
	});
}

function immediate_payment(orderId, orderNo, goodsName, payPrice) {
	console.info(orderId);
	console.info(orderNo);
	console.info(goodsName);
	console.info(payPrice);
	setlocalStorage('ipN_orderId', orderId);
	setlocalStorage('ipN_orderNo', orderNo);
	setlocalStorage('ipN_goodsName', goodsName);
	setlocalStorage('ipN_payPrice', payPrice);
	setlocalStorage('payPrice', payPrice);
	setlocalStorage('serviceAndGoodsType', 4);
	window.location.href = path + "/product/pay.html"

}

function toEvaluate(id) {
	window.location.href = '/product/evaluate.html?id=' + id;
}
var path = basePath();

$(".order_tab div").click(function() {
	$("#order_lists").html("");
	$(".order_tab div").removeClass("order_tab_active");
	var a = $(this);
	schedule = $(this).attr('id');
	console.log(schedule);
	$(this).addClass("order_tab_active");
	user_service_order();
})