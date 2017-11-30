var infoid = JSON.parse(localStorage.getItem("set"));
layui.use('upload', function() {
	var $ = layui.jquery,
		upload = layui.upload;
	//普通图片上传
	var uploadInst = upload.render({
		elem: '#test1',
		accept: 'images',
		size: 1000,
		url: img_tx,
		before: function(obj) {
			//预读本地文件示例，不支持ie8
			obj.preview(function(index, file, result) {
				var c = document.getElementById("myCanvas");
				var ctx = c.getContext("2d");
				var img1 = ctx.drawImage(result, 0, 0, img.width, img.height, 0, 0, 100, 100);
				$('#demo1').attr('src', img1)

			});
		},
		done: function(res) {
			//如果上传失败
			if(res.resultcode == 1) {
				$('#demo1').attr('src', res.result);

				setlocalStorage("images_jy", res.result)
			}else{

				alert(res.msg);
			}
			//上传成功
		},
		error: function() {
			//演示失败状态，并实现重传
			var demoText = $('#demoText');
			demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-mini demo-reload">重试</a>');
			demoText.find('.demo-reload').on('click', function() {
				uploadInst.upload();
			});
		}
	});
});

$(function() {
	if(!localStorageIsNotnull("images_arr") && !IdValStrnigs(getlocalStorage("images_arr"))){
		var images = getlocalStorage("images_arr");
		var images_arr = images.split(','); 
	    $("#demo1").attr('src',images_arr[0]);
	}
})
var path = basePath();
function tijiImages(){
	var demo1 = $("#demo1").attr('src');
	var demo_arr=new Array()
	if(!IdValStrnigs(demo1)){
		demo_arr[demo_arr.length]=demo1;
	}
	
	if(demo_arr.length <1){
		layer.msg("请上传图片!",{time:900});
		return false;
	}
	setlocalStorage("images_arr",demo_arr);
	window.location.href =path+"/product/service/order1.html";
}
