var infoid = JSON.parse(localStorage.getItem("set"));
layui.use('upload', function() {
	var $ = layui.jquery,
	upload = layui.upload;
	//多图片上传
	upload.render({
	    elem: '#test1'
	    ,accept: 'images'
	    ,url: img_tx
	    ,multiple: true
	    ,before: function(obj){
	      //预读本地文件示例，不支持ie8
	      obj.preview(function(index, file, result){
	//      $('#demo1').append('<img src="'+ result +'" alt="'+ file.name +'" class="layui-upload-img">')
	      });
	    }
	    ,done: function(res){
	    	
	    	console.log(res);
	      	//上传完毕
	   		var imageNumber = $('#imageNumber').val();
		    if(imageNumber < 5){
		    	imageNumber++;
		    	$('#imageNumber').val(imageNumber);
		    	$("#demo"+imageNumber).attr('src',res.result);
		    	$("#demo"+imageNumber).removeClass('hide');
		    	$("#demos"+imageNumber).addClass('hide');
		    }
	    }
	});
});

$(function() {
	if(!localStorageIsNotnull("images_arr") && !IdValStrnigs(getlocalStorage("images_arr"))){
		var images = getlocalStorage("images_arr");
		var images_arr = images.split(','); 
		for(var a=0;a<images_arr.length;a++){
			var imageOne = images_arr[a];
			var aj = a+1;
	    	$("#demo"+aj).attr('src',imageOne);
	    	$("#demo"+aj).removeClass('hide');
	    	$("#demos"+aj).addClass('hide');
		}
	}
})

function setOneCiket(){
	$('#imageNumber').val(0);
	$("#demos1").removeClass('hide');
	$("#demo1").addClass('hide');
	
	$("#demos2").removeClass('hide');
	$("#demo2").addClass('hide');
		    	
	$("#demos3").removeClass('hide');
	$("#demo3").addClass('hide');
		    	
	$("#demos4").removeClass('hide');
	$("#demo4").addClass('hide');
	
}
var path = basePath();
function tijiImages(){
	
	var demo1 = $("#demo1").attr('src');
	var demo2= $("#demo2").attr('src');
	var demo3 = $("#demo3").attr('src');
	var demo4 = $("#demo4").attr('src');
	var demo_arr=new Array()
	if(!IdValStrnigs(demo1)){
		demo_arr[demo_arr.length]=demo1;
	}
	if(!IdValStrnigs(demo2)){
		demo_arr[demo_arr.length]=demo2;
	}
	if(!IdValStrnigs(demo3)){
		demo_arr[demo_arr.length]=demo3;
	}
	if(!IdValStrnigs(demo4)){
		demo_arr[demo_arr.length]=demo4;
	}
	if(demo_arr.length <1){
		layer.msg("请上传图片!",{time:900});
		return false;
	}
	setlocalStorage("images_arr",demo_arr);
	window.location.href = path+"/product/service/order1.html";
}
