var j;
$(function() {
	
	if(localStorageIsNotnull("xd_province")){
		window.history.go(-1);
	}
	
	var province = getlocalStorage("xd_province");
	var htmls = [];
	
	$.getJSON("/assets/js/hospatil.json", function(data) {
		$.each(data, function(infoIndex, info) {
			var date = province;
			if (info[date + ""] != undefined) {
				j = info[date + ""].content[0].hospital.length;
				for (var i = 0; i < j; i++) {
					//console.info(info[date + ""].content[0].hospital[i].name);
					/*htmls += '<div id = "hospatil' + i + '" onClick="check('
							+ "'hospatil" + i + "'" + ')">'
							+ info[date + ""].content[0].hospital[i].name
							+ '</div>';
							*/
					htmls += ['<div id = "hospatil' + i + '" class="public-cell public-cell-about" onClick="checksda(\'hospatil'+i+'\')">',
							' 	<h1 >'+info[date + ""].content[0].hospital[i].name+'</h1>',
							' </div>'].join("");
				}
			}
		});
		$('#hhd').html(htmls);
	});
	
	
	//输入框绑定事件
	$('#mm').on('focus', '#name', function() {
		con();
		}).on('blur', '#name', function() {
			con();
		}).on('input', '#name', function() {
			con();
		}).on('touchend', '#name', function() {
			con();
		});
	})
var path = basePath();
function checksda(hospital){
	$('#name').val($('#' + hospital).find('h1').html());
//	con();
	setlocalStorage("xd_hospital",$('#name').val())
	/*window.history.go(-1);*/
	window.location.href = path+"/product/service/orderh.html?eason="+Math.random();
}

//模糊查询
function con() {
	var name = $('#name').val();
	for (var i = 0; i < j; i++) {
		if ($('#hospatil' + i).html().indexOf(name) < 0) {
			$('#hospatil' + i).css("display", "none");
		} else {
			$('#hospatil' + i).css("display", "block");
		}
	}
}
