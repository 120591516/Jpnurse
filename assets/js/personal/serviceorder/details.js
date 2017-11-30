function order_detail(data) {
	ClosetoastLoading();
	console.info(data.result);
	var result = data.result;
	$(".gwc img").attr("src", result.url);
	var scheduleName = '';
	var schedule = result.schedule;
	switch(schedule) {
		//0:待支付,1:待接单,2:已接单,3:执行中,4:待确定,5:已完成,6:已取消,7:申诉中
		case 0:
			scheduleName = '待付款';
			break;
		case 1:
			scheduleName = '处理中';
			break;
		case 2:
			scheduleName = '待服务';
			break;
		case 3:
			scheduleName = '服务中';
			break;
		case 4:
			scheduleName = '待评价';
			break;
		case 5:
			scheduleName = '已完成';
			break;
		case 6:
			scheduleName = '已取消';
			break;
		case 7:
			scheduleName = '申诉中';
			break;
	}
	if(schedule == 0) {
		var createTime = result.createTime.time;
		var now = new Date().getTime();
		var nTime = now - createTime;
		var hour = Math.floor(nTime / 3600 / 1000);
		if(hour > 2) {

			scheduleName = '	已失效';
		} else {
			scheduleName = '	待付款';
		}
	}
	//商品名称
	$('#base h1').html(result.orderGoods.title);
	//规格
	$('.guige').html(result.orderGoods.gradeName + '/' + result.orderGoods.priceTitle);
	//价格
	$('.tk_price').html('￥' + result.orderGoods.price );
	//护士姓名 电话
	if(result.nurseName != ''&&schedule!=0&&schedule!=8) {
		$('#receiverPhone').html(result.nursePhone);

		$('#patientName h1').html('护士：' + result.nurseName);

	} else {
		$('#nurse').hide();
	}
	//下单时间
	$('#createTime h1').html('下单时间：' + format(new Date(result.createTime.time)));
	//预约时间 服务时间
	$('#appointmentTime h1').html('服务时间：' + format(new Date(result.appointmentTime.time)));
	//服务地址
	if(result.orderOther.address.indexOf(',') > 0) {
		var address = replace(result.orderOther.address);
		address += result.orderOther.detailAddress;
		$('#address h1').html('服务地址：' + address);
	} else if(result.orderOther.detailAddress != '') {
		$('#address h1').html('详细地址：' + result.orderOther.detailAddress);
	} else {
		$('#address').hide();
	}
	if(result.orderOther.hospital != '') {
		$('#hospital h1').html('医院：' + result.orderOther.hospital);
	} else {
		$('#hospital').hide();
	}
	console.info(result.orderOther.departmentId != '')
	if(result.orderOther.departmentId != '') {
		$('#departmentId h1').html('科室：' + result.orderOther.departmentId);
	} else {
		$('#departmentId').hide();
	}
	//进度
	$('.order-list-xq span').html(scheduleName);
	//订单编号
	$('.order-list-xq div').html('订单编号：' + result.orderNo);
	//工具药品
	//判断是打针还是护理
	if(result.goods.dzTool == 1) {
		//dzTool表示打针
		$('#drug h1').html('是否有工具：' + result.orderOther.drug);
	}
	if(result.goods.hlTool == 1) {
		//dzTool表示护理
		$('#tool h1').html('是否有药品：' + result.orderOther.tool);
	}
	if(result.goods.dzTool == 0) {
		$('#drug').hide();
	}
	if(result.goods.hlTool == 0) {
		$('#tool').hide();
	}
	//备注
	if(result.remarks != '') {
		$('#remarks h1').html('备注：' + result.remarks);
	} else {
		$('#remarks').hide();
	}
	//价格
	//总价
	$('#price').html('￥' + result.orderGoods.price);
	//优惠价
	//var voucherPrice = result.orderGoods.price - result.orderGoods.payPrice
	$('#voucherPrice').html('-￥' + result.voucherPrice);
	//活动优惠
	$('#activityPrice').html('-￥' + result.activityPromotionPrice);
	//实际支付价格
	$('#payPrice em').html('￥' + result.orderGoods.payPrice);
	if(schedule <= 2 || schedule > 5) {
		$('#orderService').hide();
	}
	var serviceList = result.orderServiceList;
	if(schedule == 3 || schedule == 5) {
		if(serviceList.length > 1) {
			var surplusNumber = 0;
			console.info(result.orderServiceList);
			$('#serviceNumber h1').html('套餐服务：' + serviceList.length + '次')
			var serviceList = '';
			var serviceScheduleName = '';
			$.each(result.orderServiceList, function(i, item) {
				if(item.schedule == 0) {
					surplusNumber += 1;
				}
				switch(item.schedule) {
					//0:未开始,1:执行中,2:待确认,3:已完成,4:已取消
					case 0:
						serviceScheduleName = '未开始';
						break;
					case 1:
						serviceScheduleName = '执行中';
						break;
					case 2:
						serviceScheduleName = '待确认';
						break;
					case 3:
						serviceScheduleName = '已完成';
						break;
					case 4:
						serviceScheduleName = '已取消';
						break;
				}
				var k = new change((i + 1) + "")
				serviceList += '<div class="public-cell color  public-cell-0">';
				serviceList += '<div class="public_primary">';
				serviceList += '<h1 class="s_h1" style="color: #ACACAC;">';
				serviceList += '第' + k.pri_ary() + '次：' + serviceScheduleName;
				var time = '';
				console.info(item.endServiceTime != null);
				if(item.endServiceTime != null) {
					time = format(new Date(item.endServiceTime.time));
				}
				serviceList += '</h1>';
				serviceList += '</div>';
				serviceList += '<span class="s_h1" style="color: #ACACAC;">' + time + '</span>';
				serviceList += '</div>';
			})
			$('#serviceNumber span').html('剩余：' + surplusNumber + '次')
			$('#serviceList').empty().append(serviceList);
		} else {
			$('#orderService').hide();
		}
	}
	var buttonAppend = '';
	if(schedule != 3) {
		if(schedule < 3) {
			if(schedule == 0) {
				var createTime = result.createTime.time;
				var now = new Date().getTime();
				var nTime = now - createTime;
				var hour = Math.floor(nTime / 3600 / 1000);
				if(hour < 2) {
					buttonAppend += '<button class="queren_btn" id="pay_btn" onclick="immediate_payment(\'' + result.id + '\',\'' + result.orderNo + '\',\'' + result.goods.title + '\',\'' + result.orderGoods.payPrice + '\')">立即付款</button>';
					buttonAppend += '<button class="queren_btn_active" onclick="cancellationOrder(\'' + result.id + '\')">取消订单</button>';
				} else {
					buttonAppend += '<button class="queren_btn" id="pay_btn" onclick="reAppointment(' + result.goods.id + ')">再次预约</button>';
				}
			} else {
				buttonAppend += '<button class="queren_btn_active" onclick="cancellationOrder(\'' + result.id + '\')">取消订单</button>';
			}
		}
		if(schedule < 7 && schedule > 4) {
			buttonAppend += '<button class="queren_btn" id="pay_btn" onclick="reAppointment(' + result.goods.id + ')">再次预约</button>';
		}
		if(schedule ==4){
			buttonAppend += '<button class="queren_btn" id="pay_btn" onclick="reAppointment(' + result.goods.id + ')">再次预约</button>';
			buttonAppend += '<button class="queren_btn_active" onclick="toEvaluate(\'' + result.id + '\')">评价</button>';
		}
		$('.d_footer').html(buttonAppend);
	} else {
		$('.d_footer').hide();
	}
}

/**
 * 再次预约
 * @param {Object} goods_id 商品id
 */
var path = basePath();
function reAppointment(goods_id) {
	window.location.href = path+"/product/service/details1.html?id=" + goods_id;
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
				layer.msg(data.result, {
					time: 1000
				});
				setTimeout(function(){
					window.location.reload();
				},1000)
			})
		}
	});
}
/**
 *  立即支付
 * @param {Object} orderId 订单id
 * @param {Object} orderNo 订单号
 * @param {Object} goodsName 商品名称
 * @param {Object} payPrice 支付金额
 */
function immediate_payment(orderId, orderNo, goodsName, payPrice) {

	/**
	 * 请空出了用户信息的数据
	 */
	/*var localRe = getlocalStorage("re");
	var localCode = getlocalStorage("code");
	var userInfo = getlocalStorage("set");
	var goodsIds = getlocalStorage("goodsId");
	var userOpenID = '';
	if(!localStorageIsNotnull("userOpenID")) {
		userOpenID = getlocalStorage("userOpenID");
	}
	localStorage.clear();
	if(!IdValStrnigs(userOpenID)) {
		setlocalStorage('userOpenID', userOpenID);
	}
	setlocalStorage("set", userInfo);
	setlocalStorage("goodsId", goodsIds);
	setlocalStorage("re",localRe);
	setlocalStorage("code",localCode);*/
	
	clearLocalStorage(4);
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
	window.location.href = path+"/product/pay.html"

}
function toEvaluate(id){
	window.location.href='/product/evaluate.html?id='+id;
}
