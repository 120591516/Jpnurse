var qid = getUrlParam("id");
var infoid = JSON.parse(localStorage.getItem("set"));
$(function() {	
	var param = {
		id: qid,
		creatorId: infoid.id
	}
	sendAjaxTrue(relationlist, param, "json", editcallback);
})

function editcallback(data) {
	console.log(data);
	if(data.resultcode == 1) {
		$("#xd_name").val(data.result.name);
		$("#xd_card").val(data.result.sfz);
		$("#xd_phone").val(data.result.phone);
		if(data.result.sex == 1) {
			$("input[value='女']").attr("checked", "checked")
		}
		if(data.result.sex == 0) {
			$("input[value='男']").attr("checked", "checked")
		}
		$('.gaunxi_btn button').each(function() {

			if($(this).html() == data.result.relation) {
				$(this).attr("id", "xz_relation");
			}

		});
	}

}
$(".gaunxi_btn button").click(function() {
	$(".gaunxi_btn button").removeAttr("id", "xz_relation");
	$(this).attr("id", "xz_relation");
})

function addrelation() {
	var name = $("#xd_name").val();
	var card = $("#xd_card").val();
	var phone = $("#xd_phone").val();
	var sex = $("input[name='sex']:checked").val();
	var relation = $("#xz_relation").html();
	if(IdVal("xd_name")) {
		layer.msg("请输入姓名！", { time: 2000 });
		return;
	}
	if(IdVal("xd_card")) {
		layer.msg("请输入身份证号！", { time: 2000 });
		return;
	}
	if(!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(card)) {
		layer.msg("请输入正确的身份证号！", { time: 2000 });
		return;
	}
	if(IdVal("xd_phone")) {
		layer.msg("请输入手机号！", { time: 2000 });
		return;
	}
	if(!/^1[3|5|7|8]\d{9}$/.test(phone)) {
		layer.msg("请输入正确的电话号码！", { time: 2000 });
		return;
	}
	/*sex 0是男 1是女*/
	if(sex == "男") {
		sex = 0;
	}
	if(sex == "女") {
		sex = 1;
	}
	var param = {
		id: qid,
		name: name,
		phone: phone,
		sex: sex,
		relation: relation,
		sfz: card,
		birthday: '1996-07-13 00:00:00',
		creatorId: infoid.id
	}
	sendAjaxTrue(addfirend, param, "json", addcallback);

}

function addcallback(data) {
	if(data.resultcode == 1) {
		self.location=document.referrer;
	} else {
		layer.msg(data.msg, { time: 2000 });
	}
}