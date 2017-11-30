$(function() {
	var infoid = JSON.parse(localStorage.getItem("set"));
	var param = {
		userId: infoid.id
	}
	sendAjaxTrue(n_details, param, "json", detailscallback);
	
})
function detailscallback(data) {
	console.log(data);
	if(data.resultcode == 1) {
		$("#edit_id").val(data.result.id);
		$("#name").val(data.result.name);
		$("#pid").val(data.result.sfz);
		$("#address").val(data.result.address);
		$.each(data.result.nurseImages, function(i, item) {
			if(item.type == 1) {
				$("#demo1").attr("src", item.url);
			}
			if(item.type == 4) {
				$("#demo2").attr("src",item.url);
			}
			if(item.type == 5) {
				$("#demo3").attr("src",item.url);
			}
		})
		$("input[type=radio][name='sex'][value='"+data.result.sex+"']").attr("checked",'checked');
	}
}

function info_save() {
	var edit_id=$("#edit_id").val();
	var name = $("#name").val();
	var pid = $("#pid").val();
	var adress = $("#address").val();
	var demo1 = $("#demo1").attr("src");
	var demo2 = $("#demo2").attr("src");
	var demo3 = $("#demo3").attr("src");
	var sex = $('input:radio[name="sex"]:checked').val();
	if(IdValStrnigs(name)) {
		layer.msg('请填写姓名！', { time: 2000 });
		return;
	}
	if(IdValStrnigs(pid)) {
		layer.msg('请填写身份证号！', { time: 2000 });
		return;
	}
	if(IdValStrnigs(adress)) {
		layer.msg('请选择地址！', { time: 2000 });
		return;
	}
	if(demo1 == '/assets/img/khnurse/gerenzil_touxiang@2x.png') {
		layer.msg('请上传头像！', { time: 2000 });
		return;
	}
	if(demo2 == '/assets/img/khnurse/sfz.png') {
		layer.msg('请上传身份证照片！', { time: 2000 });
		return;
	}
	if(demo3 == '/assets/img/khnurse/sfz2.png') {
		layer.msg('请上传身份证照片！', { time: 2000 });
		return;
	}
	var infoid = JSON.parse(localStorage.getItem("set"));
	var param = {
		id:edit_id,
		userId: infoid.id,
		name: name,
		sfz: pid,
		addess: adress,
		sculpture: demo1,
		sfzz: demo2,
		sfzf: demo3,
		sex: sex
	}
	HttpAjax(n_info, param, "json", infocallback)
}

function infocallback(data) {
	console.log(data);
	if(data.resultcode == 1) {
		window.location.href = '/khnurse/select_identity.html';
	}else{
		layer.msg(data.msg, { time: 2000 });
	}
}