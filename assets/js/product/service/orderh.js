function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}
var path = basePath();
$(function() {
	var arr = new Array('北京', '天津', '内蒙古', '山西', '河北', '河南', '湖北',
					'湖南', '山东', '辽宁', '吉林', '黑龙江', '上海', '江苏', '安徽', '福建',
					'江西', '浙江', '海南', '广西', '重庆', '四川', '广东', '贵州', '云南', '西藏',
					'甘肃', '青海', '宁夏', '台湾', '陕西', '澳门', '香港', '新疆', '钓鱼岛');
	var html = "";
	for (var i = 0; i < arr.length; i++) {
		var sheng = arr[i];
		html += '<div onClick="b1(' + "'b" + i + "'" + ')" id="b' + i
				+ '">' + sheng + '</div>';
	}
	document.getElementById("province11").innerHTML = html;
	
	if(!localStorageIsNotnull("xd_name")){
		$('#xd_name').val(getlocalStorage("xd_name"));
	}else{
		if(getUserName() != getUserPhone()){
			$('#xd_name').val(getUserName());
		}
	}
	if(!localStorageIsNotnull("xd_phone")){
		$('#xd_phone').val(getlocalStorage("xd_phone"));
	}else{
		$('#xd_phone').val(getUserPhone());
	}
	
	if(!localStorageIsNotnull("xd_province")){
		$('#xd_province').val(getlocalStorage("xd_province"));
	}
	if(!localStorageIsNotnull("xd_hospital")){
		$('#xd_hospital').val(getlocalStorage("xd_hospital"));
	}
	if(!localStorageIsNotnull("xd_department")){
		$('#xd_department').val(getlocalStorage("xd_department"));
	}
	
	/*if(!localStorageIsNotnull("xd_doctor")){
		$('#xd_doctor').val(getlocalStorage("xd_doctor"));
	}*/
	
	/*if(!localStorageIsNotnull("xd_detaileAddress")){
		$('#xd_detaileAddress').val(getlocalStorage("xd_detaileAddress"));
	}*/
	if(!localStorageIsNotnull("appDate")){
		$('#appDate').val(getlocalStorage("appDate"));
	}
	
	if(!localStorageIsNotnull("remarks")){
		$('#remarks').val(getlocalStorage("remarks"));
	}
	
	if(localStorageIsNotnull("nurseId")){
		servicegoodDetail();
	}else{
		serviceNurseGoodDetail();
	}
	
})

function servicegoodDetail(){
	var param = {
		goodsId: getlocalStorage("goodsId"),
		siteId:site,
		deviceType : 2,
	}
	sendAjaxTrue(getOneGoodsDetail, param, "json", servicegoodDetailCike);
}

function serviceNurseGoodDetail(){
	var param = {
		goodsId: getlocalStorage("goodsId"),
		userId: getlocalStorage("nurseId"),
	}
	sendAjaxTrue(getNurseServicePrice, param, "json", returnNurseServicegoodDetail)
}

function returnNurseServicegoodDetail(data){
	console.log(data);
	if(data.resultcode == 1) {
		if(data.result !=null && data.result != '' && data.result.length > 0){
			
			if(data.result[0] !=null && data.result[0] != ''){
				$('#goodsTitle').html(data.result[0].goodsName);
				/*	没有优惠券，取商品里的价格信息	*/
				$('#goodsPrice').html("<i>￥</i>"+data.result[0].goodsPrice[0].price+'/元1次');
				console.log(data.result[0].goodsName);
				console.log("-----------------");
				setlocalStorage("payPrice",data.result[0].goodsPrice[0].price)
				//	$('#actualPrice').html(data.result.goods.grade[0].goodsPrice[0].price);
//				localStorage.setItem("goodsId", data.result.goods.id);
				localStorage.setItem("pricePartId", data.result[0].goodsPrice[0].id);
				selectCouponU(getlocalStorage("goodsId"),data.result[0].goodsPrice[0].id);
			}
		}else{
			window.location.href =path+"/index.html";
		}
	}else{
		window.location.href = path+"/index.html";
	}
}

function servicegoodDetailCike(data){
	console.log(data);
	if(data.resultcode == 1) {
		if(data.result !=null && data.result != ''){
			if(data.result.goods !=null && data.result.goods != ''){
				$('#goodsTitle').html(data.result.goods.grade[0].name);
				/*	没有优惠券，取商品里的价格信息	*/
				$('#goodsPrice').html("<i>￥</i>"+data.result.goods.grade[0].goodsPrice[0].price+'/元1次');
				
				setlocalStorage("payPrice",data.result.goods.grade[0].goodsPrice[0].price)
				//	$('#actualPrice').html(data.result.goods.grade[0].goodsPrice[0].price);
				localStorage.setItem("goodsId", data.result.goods.id);
				localStorage.setItem("pricePartId", data.result.goods.grade[0].goodsPrice[0].id);
				selectCouponU(data.result.goods.id,data.result.goods.grade[0].goodsPrice[0].id);
			}
		}
	}
}

function getTime(){
	var xd_name = $('#xd_name').val();
	var xd_phone = $('#xd_phone').val();
	var xd_province = $('#xd_province').val();
	var xd_hospital = $('#xd_hospital').val();
	var xd_department = $('#xd_department').val();
	var remarks =$('#remarks').val();
	
	if(!IdValStrnigs(remarks)){
		setlocalStorage("remarks",remarks);
	}
	if(!IdValStrnigs(xd_department)){
		setlocalStorage("xd_department",xd_department);
	}
	if(IdValStrnigs(xd_name)){
		layer.msg("请输入姓名!",{time:500});
		return false;
	}
	if(IdValStrnigs(xd_phone)){
		layer.msg("请输入手机号!",{time:500});
		return false;
	}
	if(IdValStrnigs(xd_province)){
		layer.msg("请选择省份!",{time:500});
		return false;
	}
	if(IdValStrnigs(xd_hospital)){
		layer.msg("请选择医院!",{time:500});
		return false;
	}
	
	setlocalStorage("xd_name",xd_name);
	setlocalStorage("xd_phone",xd_phone);
	setlocalStorage("xd_province",xd_province);
	setlocalStorage("xd_hospital",xd_hospital);
	if ($("input[name='shi']:checked").val() != undefined) {
		var shi = $("input[name='shi']:checked").val();
		setlocalStorage("checked_shi",shi);
	}
	if ($("input[name='huli']:checked").val() != undefined) {
		var huli = $("input[name='huli']:checked").val();
		setlocalStorage("checked_huli",huli);
	}
	window.location.href = path+"/nurse/time.html?orderXtype=2";
}

function province() {
	var name = $('#xd_name').val();
	var phone = $('#xd_phone').val();
	var xd_doctor = $('#xd_doctor').val();
/*	var xd_detaileAddress = $('#xd_detaileAddress').val();*/
	var appDate = $('#appDate').val();
	var remarks = $('#remarks').val();
	if(IdValStrnigs(name)){
		layer.msg("请输入姓名!",{time:500});
		return;
	}
	if(IdValStrnigs(phone)){
		layer.msg("请输入手机号!",{time:500});
		return;
	}
	if(!IdValStrnigs(xd_doctor)){
		setlocalStorage("xd_doctor",xd_doctor);
	}
	/*if(!IdValStrnigs(xd_detaileAddress)){
		setlocalStorage("xd_detaileAddress",xd_detaileAddress);
	}*/
	if(!IdValStrnigs(appDate)){
		setlocalStorage("appDate",appDate);
	}
	if(!IdValStrnigs(remarks)){
		setlocalStorage("remarks",remarks);
	}
	setlocalStorage("xd_name",name);
	setlocalStorage("xd_phone",phone);
	document.getElementById("shda_shengfen").style.display = "block";
	document.getElementById("sahda_sf_popbox").style.display = "block";
}

function pupclose2() {
	document.getElementById("shda_shengfen").style.display = "none";
	document.getElementById("sahda_sf_popbox").style.display = "none";
}
function b1(id) {
	var zhi = document.getElementById(id).innerHTML;
	document.getElementById('xd_province').value = zhi;
	document.getElementById("shda_shengfen").style.display = "none";
	document.getElementById("sahda_sf_popbox").style.display = "none";
}
function checkHospatil() {
			var name = $('#xd_name').val();
			var phone = $('#xd_phone').val();
			var province = $('#xd_province').val();
			var xd_doctor = $('#xd_doctor').val();
			var xd_department = $('#xd_department').val();
			/*var xd_detaileAddress = $('#xd_detaileAddress').val();*/
			var appDate = $('#appDate').val();
			var remarks = $('#remarks').val();
			if (province == "") {
				layer.msg("请选择省份!",{time:500});
				return;
			}
			if(IdValStrnigs(name)){
				layer.msg("请输入姓名!",{time:500});
				return;
			}
			if(IdValStrnigs(phone)){
				layer.msg("请输入手机号!",{time:500});
				return;
			}
			if(!IdValStrnigs(xd_doctor)){
				setlocalStorage("xd_doctor",xd_doctor);
			}
			if(!IdValStrnigs(xd_department)){
				setlocalStorage("xd_department",xd_department);
			}
			/*if(!IdValStrnigs(xd_detaileAddress)){
				setlocalStorage("xd_detaileAddress",xd_detaileAddress);
			}*/
			if(!IdValStrnigs(appDate)){
					var dateee = new Date(appDate).toJSON();  
					var dateees = new Date(+new Date(dateee)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'')    
				setlocalStorage("appDate",dateees);
			}
			if(!IdValStrnigs(remarks)){
				setlocalStorage("remarks",remarks);
			}
					
			setlocalStorage("xd_name",name);
			setlocalStorage("xd_phone",phone);
			setlocalStorage("xd_province",province);
			window.location.href = path+"/product/service/hospital.html";
}