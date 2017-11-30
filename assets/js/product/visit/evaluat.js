function submityj() {
	var id = getUrlParam("id");
	var infoid = JSON.parse(localStorage.getItem("set"));
	var level = $("#level").val();
	var textwa = $("#textwa").val();
	var param = {
		creatorId: infoid.id,
		orderId: id,
		level: level,
		content: textwa,
	}
	sendAjaxTrue(pjinsert, param, "json", pjcallback);
}

function pjcallback(data) {
	if(data.resultcode == 1) {
		layer.msg("评价成功！", { time: 2000 });
		setTimeout(self.location = document.referrer, 2000);
	} else {
		layer.msg(data.msg, { time: 2000 });
	}
}