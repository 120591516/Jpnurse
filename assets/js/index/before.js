function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}
function setlocalStorage(name, value) {
	return localStorage.setItem(name, value);
}
function IdValStrnigs(str) {
	if(str == "" || str == null || str == undefined || str == 'undefined' || str == 'null') {
		return true;
	} else {
		return false;
	}
}
var indexformId = GetQueryString("pid");
//console.log(indexformId);
if(!IdValStrnigs(indexformId)) {
	setlocalStorage("pid", indexformId);
}