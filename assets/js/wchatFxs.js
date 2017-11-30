$(function(){
	if(isWeiXin()) {
		setTimeout(setWchatCallback,1500);//1000毫秒=1.5秒后执行test方法
	}
})
/*
 * 
 * 分享到QQ: "menuItem:share:qq"
分享到Weibo: "menuItem:share:weiboApp"
收藏: "menuItem:favorite"
分享到FB: "menuItem:share:facebook"
分享到 QQ 空间/menuItem:share:QZone
 */
function setWchatCallback(){
	/*param = {//发送给数据库的数据				   	
			url_p :url_ps
	}*/
	sendAjaxTrue(getMenuShare, "", 'json', getWchatCallback);
}

function getWchatCallback(data){
		
		var resultbToObj=JSON.parse(data.result);
		var appid = resultbToObj.appid;
		var timestamp = resultbToObj.timestamp;
		var nonceStr = resultbToObj.nonceStr;
		var signature = resultbToObj.signature;
		wx.config({
		    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		    appId: appid, // 必填，公众号的唯一标识
		    timestamp: timestamp, // 必填，生成签名的时间戳
		    nonceStr: nonceStr, // 必填，生成签名的随机串
		    signature: signature,// 必填，签名，见附录1
		    jsApiList: ['onMenuShareTimeline',
			             'onMenuShareAppMessage',
			 		    'hideMenuItems',
					    'showMenuItems']  // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
		});
		wx.ready(function(){
		    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
			wx.checkJsApi({
			    jsApiList: ['onMenuShareTimeline',
			               'onMenuShareAppMessage',
			   		    'hideMenuItems',
					    'showMenuItems'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
			    success: function(res) {
			        // 以键值对的形式返回，可用的api值true，不可用为false
			        // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
			        //alert('wx.error: '+JSON.stringify(res));
			    }
			});
			
			
			// 显示分享朋友圈和朋友
			wx.showMenuItems({
			    menuList: ['onMenuShareTimeline',
			               'onMenuShareAppMessage'] // 要显示的菜单项，所有menu项见附录3
			});
			//	隐藏分享到微博。QQ，空间
			wx.hideMenuItems({
			    menuList: ['onMenuShareQQ',
			               'onMenuShareWeibo',
			               'onMenuShareQZone'] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
			});
			wx.onMenuShareTimeline({
			    title: $('#menu_title').val(), // 分享标题
			    link: $('#menu_url').val(), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
			    imgUrl: $('#menu_img').val(), // 分享图标
			    success: function () { 
			     // alert("分享成功");
			     setShareRecord(1);
			    },
			    cancel: function () { 
			        // 用户取消分享后执行的回调函数
			    	// alert("取消分享");
			    }
			});
			
			wx.onMenuShareAppMessage({
			    title: $('#menu_title').val(), // 分享标题
			    desc: $('#menu_desc').val(), // 分享描述
			    link: $('#menu_url').val(), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
			    imgUrl: $('#menu_img').val(), // 分享图标
			    type: 'link', // 分享类型,music、video或link，不填默认为link
			    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
			    success: function () { 
			        // 用户确认分享后执行的回调函数
			    	//	alert("分享成功");
			    	setShareRecord(2);
			    },
			    cancel: function () { 
			        // 用户取消分享后执行的回调函数
			    	//alert("取消分享");
			    }
			});
		});

		wx.error(function(res){
		    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
			//alert('wx.error: '+JSON.stringify(res));
		});
}

function setWchatCallbackPay(){
	/*param = {//发送给数据库的数据				   	
			url_p :url_ps
	}*/
	sendAjaxTrue(getMenuShare, "", 'json', getWchatCallbackPay);
}

function getWchatCallbackPay(data){
		
		var resultbToObj=JSON.parse(data.result);
		var appid = resultbToObj.appid;
		var timestamp = resultbToObj.timestamp;
		var nonceStr = resultbToObj.nonceStr;
		var signature = resultbToObj.signature;
		wx.config({
		    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		    appId: appid, // 必填，公众号的唯一标识
		    timestamp: timestamp, // 必填，生成签名的时间戳
		    nonceStr: nonceStr, // 必填，生成签名的随机串
		    signature: signature,// 必填，签名，见附录1
		    jsApiList: ['onMenuShareTimeline',
			             'onMenuShareAppMessage',
			 		    'hideMenuItems',
					    'showMenuItems',
		    			'chooseWXPay']  // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
		});
		wx.ready(function(){
		    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
			wx.checkJsApi({
			    jsApiList: ['onMenuShareTimeline',
			               'onMenuShareAppMessage',
			   		    'hideMenuItems',
					    'showMenuItems',
			    		'chooseWXPay'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
			    success: function(res) {
			        // 以键值对的形式返回，可用的api值true，不可用为false
			        // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
			        //alert('wx.error: '+JSON.stringify(res));
			    }
			});
			
			
			// 显示分享朋友圈和朋友
			wx.showMenuItems({
			    menuList: ['onMenuShareTimeline',
			               'onMenuShareAppMessage'] // 要显示的菜单项，所有menu项见附录3
			});
			//	隐藏分享到微博。QQ，空间
			wx.hideMenuItems({
			    menuList: ['onMenuShareQQ',
			               'onMenuShareWeibo',
			               'onMenuShareQZone'] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
			});
			wx.onMenuShareTimeline({
			    title: $('#menu_title').val(), // 分享标题
			    link: $('#menu_url').val(), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
			    imgUrl: $('#menu_img').val(), // 分享图标
			    success: function () { 
			     // alert("分享成功");
			    },
			    cancel: function () { 
			        // 用户取消分享后执行的回调函数
			    	// alert("取消分享");
			    }
			});
			
			wx.onMenuShareAppMessage({
			    title: $('#menu_title').val(), // 分享标题
			    desc: $('#menu_desc').val(), // 分享描述
			    link: $('#menu_url').val(), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
			    imgUrl: $('#menu_img').val(), // 分享图标
			    type: 'link', // 分享类型,music、video或link，不填默认为link
			    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
			    success: function () { 
			        // 用户确认分享后执行的回调函数
			    	//	alert("分享成功");
			    },
			    cancel: function () { 
			        // 用户取消分享后执行的回调函数
			    	//alert("取消分享");
			    }
			});
			/*	*/
		});

		wx.error(function(res){
		    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
			//alert('wx.error: '+JSON.stringify(res));
		});
}

function setShareRecord(type){
	var userCreatorId = "";
	if(userProving()){
		userCreatorId = getUserId();
	}
	
	paramShare = {//发送给数据库的数据				   	
		type :"",							//	资源类型，1服务，2商品,3其他分类
		goodsId :"",							//	资源id-服务。商品
		name :$('#menu_title').val(),		//	资源名称
		url :$('#menu_url').val(),			//	源资链接地址
		sharePlatform:type,					//	分享目标平台，1微信好友，2微信朋友圈，3QQ好友，4QQ空间，5微博，6其他平台
		shareDevice:5,						//	1ios用户端，2ios护士端，3Android用户端，4Android护士端，5wap站，6其他终端
		creatorId:userCreatorId,			//	 创建人
	}
	sendAjaxTrue(setShare, paramShare, "json", function(data) {
		console.log(data);		
	})
	
}






