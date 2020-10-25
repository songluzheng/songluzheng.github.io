$(document).ready(function(){	
	var member_site = 'https://member.'+getRootDomain();
	$(document).on('click', '.tip-menu-box .active', function(event) {
		var amount = $('input[name=payAmount]').val();
		if((!(/(^[1-9]\d*$)/.test(amount)))&&$("input[name=productId]").val()=='-1'){
			alert('金额必须为正整数');
			return false;
		}
		var _user = mylib.getUserDataByCookie();
        _that = $(this);
        if(!_user){
	        mylib.login(function() {
	            window.location.reload(true);
	        });//弹出登录框
	        return;
        }else{
			//支付方式
			var payChannel = $('input[name=payChannel]').val();
			
			MPAY.pay(payChannel);
			
			return false;
        }
	})
	
		//定义支付类库
	var MPAY = function(){
		
		var wxTime; //微信定时器
		
		//显示加载状态
		function showLoading(msg){
			var str = '';
			str += '<div class="m-pay-layer m-pay-loading">';
			str += '	<div class="m-pay-layer-bg"></div>';
			str += '	<div class="m-pay-layer-body m-pay-layer-loading">';
			str += '		<div class="m-pay-loading-jd"></div>';
			str += '		<div class="m-pay-loading-txt">'+msg+'</div>';
			str += '	</div>';
			str += '</div>';
			
			if($('.m-pay-loading').length == 0){
				$('body').append(str);
			}
		}
		
		//关闭弹窗
		function closeLayer(){
			if($('.m-pay-layer').length > 0){
				$('.m-pay-layer').remove();
			}
		}
		
		//微信支付二维码
		function showWxErweima(picUrl){
			var str = '';
			str += '<div class="m-pay-layer m-pay-wx">';
			str += '	<div class="m-pay-layer-bg"></div>';
			str += '	<div class="m-pay-layer-body m-pay-layer-wx">';
			str += '		<div class="m-pay-layer-close"></div>';
			str += '		<div class="m-pay-layer-wx-header">请使用微信APP扫码支付 </div>';
			str += '		<div class="m-pay-layer-wx-body"><img class="wxerweima" id="wxerweima" src="'+picUrl+'" /></div>';
			str += '	</div>';
			str += '</div>';
			
			if($('.m-pay-wx').length == 0){
				$('body').append(str);
			}
			
			$('body').off('click', '.m-pay-layer-close').on('click', '.m-pay-layer-close', function(){
				clearInterval(wxTime);
				closeLayer();
			});
		}
		
		//确认框
		function confirm(msg, btnMsg, callback){
			var str = '';
			str += '<div class="m-pay-layer m-pay-confirm">';
			str += '	<div class="m-pay-layer-bg"></div>';
			str += '	<div class="m-pay-layer-body m-pay-layer-confirm">';
			str += '		<div class="m-pay-layer-close"></div>';
			str += '		<div class="m-pay-layer-confirm-body">';
			str += '			<p>'+ msg +'</p>';
			str += '			<a href="javascript:;" class="m-pay-layer-confirm-btn">'+btnMsg+'</a>';
			str += '		</div>';
			str += '	</div>';
			str += '</div>';
			
			if($('.m-pay-confirm').length == 0){
				$('body').append(str);
			}
			
			//绑定按钮事件
			$('body').off('click', '.m-pay-layer-confirm-btn').on('click', '.m-pay-layer-confirm-btn', function(){
				callback();
			});
			
			//绑定关闭事件
			$('body').off('click', '.m-pay-layer-close').on('click', '.m-pay-layer-close', function(){
				closeLayer();
			});
		}
		
		//提示框
		function tips(msg, callback){
			var str = '';
			str += '<div class="m-pay-layer m-pay-tips">';
			str += '	<div class="m-pay-layer-bg"></div>';
			str += '	<div class="m-pay-layer-body m-pay-layer-tips">';
			str += '		<div class="m-pay-layer-tips-body">';
			str += '			<div class="m-pay-layer-tips-icon"></div>';
			str += '			<p>'+ msg +'</p>';
			str += '			<a href="javascript:;" class="m-pay-layer-confirm-btn">确认</a>';
			str += '		</div>';
			str += '	</div>';
			str += '</div>';
			
			if($('.m-pay-tips').length == 0){
				$('body').append(str);
			}
			
			//绑定确定按钮事件
			$('body').off('click', '.m-pay-layer-confirm-btn').on('click', '.m-pay-layer-confirm-btn', function(){
				closeLayer();
				callback();
			});
		}
		
		//支付
		function pay(payChannel){
			
			var form = $('#formPay');
			var query = form.serialize();
			var target = form.attr('action');
			//支付宝支付
			if(payChannel == '1'){
				//showLoading('正在使用支付宝支付...');
				form.submit();
				$('.tip-menu-confirm').removeClass('active');
				return false;
			}
				
        	$.ajax({
			    url: target,
			    data: query,
			    type: 'GET',
			    dataType: "jsonp",
    			jsonp: "callback",
			    success: function(res){
					if(res.code == 203){
						mylib.login(function() {
							window.location.reload(true);
						});
						return false;
					}
					if(res.code == 4){
						mylib.msg('创建订单失败:' + res.msg);
						$('.tip-menu-confirm').removeClass('active');
						return false;
					}

					//阿里支付
					// if(payChannel == '3'){
					// 	aliPay(res);
					// }
					
					//微信支付
					if(payChannel == '4'){
						showLoading('正在生成二维码...');
						wxPay(res);
					}
					//余额支付
					else if(payChannel == '8'){
						if(res.code == 2){
							confirm('余额不足，请充值！', '充值', function(){
								location.href = member_site+'/user/account';
							});
							return false;
						}
						yuePay(res);
					}else{
						alert('请选择支付方式');
						return false;
					}
					$('.tip-menu-confirm').addClass('active');
			    },
			});
		}
		
		//微信支付
		function wxPay(res){
			showWxErweima(member_site+'/user/qrcode?data=' + res['weixin_pc']);
			var count = 0;
			//定时刷新订单状态
			wxTime = setInterval(function(){
				$.ajax({
				    url: member_site+'/user/get-order-status?orderNo='+res.order_no,
				    type: 'GET',
				    dataType: "jsonp",
	    			jsonp: "callback",
				    success: function(data){
				    	console.log(data)
				    	if(data.status == 2){
							closeLayer();
							clearInterval(wxTime);
							tips('支付成功，感谢支持！', function(){
								window.location.reload();
							});
						}
				    }
				})
			}, 1500);
		}
		
		//阿里支付
		// function aliPay(res){
		// 	aliTime = setInterval(function(){
		// 		GW.sendAjax('/user/get-order-status?orderNo='+res.order_no, function(data){
					
		// 			if(data.status == 2){
		// 				closeLayer();
		// 				clearInterval(aliTime);
		// 				tips('购买成功', function(){
							
		// 				});
		// 			}
		// 		});
		// 	}, 1500);
		// }
		//余额支付
		function yuePay(res){
			console.log(res);
		}
		
		
		return {
			'showLoading': showLoading,
			'closeLayer': closeLayer,
			'showWxErweima': showWxErweima,
			'confirm': confirm,
			'tips': tips,
			'pay': pay,
		};
	}();
})