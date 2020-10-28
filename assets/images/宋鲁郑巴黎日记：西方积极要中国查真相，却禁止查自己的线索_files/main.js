 /*
  * @ guanchazhe
  * @ © yinglianmingzhi
  * @ 2017-08-17
  */
//获取根域名
function getRootDomain(){
	var temp = document.domain.split(".");
	return temp[temp.length - 2] + '.' + temp[temp.length - 1];
};

function getUserCookieData(){
    var name = 'GCZWU';
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg)) {
        var user=arr[2].split("-");
        //返回用户信息数据，0为用户ID，1为用户名
        return user;
    }
    else return false;
}

 var Main = (function(window, undefined) {
	 
	 /*首页滚动
	 var $navEle = $('.j-nav-cell'),
		$subMenus = $('.j-sub-menu'),
		$headUser = $('.j-header-user'),
		$setMenu = $('.j-set-menu'),
		$fastNews = $('.j-content-fastNews'),
		$fastNewsStop = $('.j-stop'),
		$fastNewsPlay = $('.j-play'),
		marqueeVar2 = null,
		marqueeVar3 = null,
		marqueeVar4 = null,
		t = null,
		_speed = 30;
	$navEle.hover(function() {
		var $subMenu = $(this).find('.j-sub-menu'),
			_sunMenuLen = $subMenu.size();
		if (_sunMenuLen > 0) {
			t = setTimeout(function(){
				$subMenus.hide();
				$subMenu.show();
			},500);
		}
	}, function() {
		clearTimeout(t);
		$subMenus.hide();
	});

	$headUser.hover(function() {
		$setMenu.show();
	}, function() {
		$setMenu.hide();
	});

	$fastNewsPlay.on('click', 500, function() {
		$('.j-content-fastNews .list').removeClass('list-thick');
		$fastNews.removeClass('fastNews-one');
		$('#marquee2_2').hide();
		$('#marquee3_2').hide();
		$('#marquee4_2').hide();
		$('.content-fastNews-title').show();
		$('#marquee2').scrollTop(0);
		$('#marquee3').scrollTop(0);
		$('#marquee4').scrollTop(0);
		$fastNews.animate({
			height: 360
		}, function() {
			$fastNewsStop.height(17);
			$fastNewsPlay.height(0);
		});
		clearInterval(marqueeVar2);
		clearInterval(marqueeVar3);
		clearInterval(marqueeVar4);
	});
	$fastNewsStop.on('click', 500, function() {
		$fastNews.animate({
			height: 70
		}, function() {
			$fastNewsStop.height(0);
			$fastNewsPlay.height(17);
			$('#marquee2_2').show();
			$('#marquee3_2').show();
			$('#marquee4_2').show();
			$fastNews.addClass('fastNews-one');
			clearInterval(marqueeVar2);
			clearInterval(marqueeVar3);
			clearInterval(marqueeVar4);
			$('.content-fastNews-title').hide();
			$('.j-content-fastNews .list').addClass('list-thick');
			marqueeVar2 = setInterval(function() {
				marquee(2, 'up')
			}, _speed);
			marqueeVar3 = setInterval(function() {
				marquee(3, 'up')
			}, _speed);
			marqueeVar4 = setInterval(function() {
				marquee(4, 'up')
			}, _speed);
		});
	});

	//js无缝滚动代码
	function marquee(i, direction) {
		var obj = document.getElementById("marquee" + i);
		var obj1 = document.getElementById("marquee" + i + "_1");
		var obj2 = document.getElementById("marquee" + i + "_2");
		if (direction == "up") {
			if (obj2.offsetTop - obj.scrollTop <= 0) {
				obj.scrollTop -= (obj1.offsetHeight-1);
			} else {
				var tmp = obj.scrollTop;
				obj.scrollTop++;
				if (obj.scrollTop == tmp) {
					obj.scrollTop = 1;
				}
			}
		} else {
			if (obj2.offsetWidth - obj.scrollLeft <= 0) {
				obj.scrollLeft -= obj1.offsetWidth;
			} else {
				obj.scrollLeft++;
			}
		}
	}

	function marqueeStart(i, direction) {
		var obj = document.getElementById("marquee" + i);
		var obj1 = document.getElementById("marquee" + i + "_1");
		var obj2 = document.getElementById("marquee" + i + "_2");
		if (!obj) return false;
		obj2.innerHTML = obj1.innerHTML;

		if(i==3){
	 		clearInterval(marqueeVar3);
	 		marqueeVar3 = setInterval(function() {
	 			marquee(i, 'up')
	 		}, _speed);
		}else if(i==4){
	 		clearInterval(marqueeVar4);
	 		marqueeVar4 = setInterval(function() {
	 			marquee(i, 'up')
	 		}, _speed);
		}else{
	 		clearInterval(marqueeVar2);
	 		marqueeVar2 = setInterval(function() {
	 			marquee(i, 'up')
	 		}, _speed);
		}
		
		obj.onmouseover = function() {
			clearInterval(marqueeVar2);
			clearInterval(marqueeVar3);
			clearInterval(marqueeVar4);
		}
		obj.onmouseout = function() {
			clearInterval(marqueeVar2);
			marqueeVar2 = setInterval(function() {
				marquee(2, 'up')
			}, _speed);
			clearInterval(marqueeVar3);
			marqueeVar3 = setInterval(function() {
				marquee(3, 'up')
			}, _speed);
			clearInterval(marqueeVar4);
			marqueeVar4 = setInterval(function() {
				marquee(4, 'up')
			}, _speed);
		}
	}
 	*/
 	/*placeholder兼容ie8*/
 	function placeHolderIe() {
 		var placeholderfriend = {
 				focus: function(s) {
 					s = $(s).hide().prev().show().focus();
 					var idValue = s.attr("id");
 					if (idValue) {
 						s.attr("id", idValue.replace("placeholderfriend", ""));
 					}
 					var clsValue = s.attr("class");
 					if (clsValue) {
 						s.attr("class", clsValue.replace("placeholderfriend", ""));
 					}
 				}
 			}
 			//判断是否支持placeholder
 		function isPlaceholer() {
 			var input = document.createElement('input');
 			return "placeholder" in input;
 		}
 		//不支持的代码
 		if (!isPlaceholer()) {
 			$(function() {
 				var form = $(document);
 				//遍历所有文本框，添加placeholder模拟事件
 				var elements = form.find("input[type='text'][placeholder]");
 				elements.each(function() {
 					var s = $(this);
 					var pValue = s.attr("placeholder");
 					var sValue = s.val();
 					if (pValue) {
 						if (sValue == '') {
 							s.val(pValue);
 						}
 					}
 				});
 				elements.focus(function() {
 					var s = $(this);
 					var pValue = s.attr("placeholder");
 					var sValue = s.val();
 					if (sValue && pValue) {
 						if (sValue == pValue) {
 							s.val('');
 						}
 					}
 				});
 				elements.blur(function() {
 					var s = $(this);
 					var pValue = s.attr("placeholder");
 					var sValue = s.val();
 					if (!sValue) {
 						s.val(pValue);
 					}
 				});
 				//遍历所有密码框，添加placeholder模拟事件
 				var elementsPass = form.find("input[type='password'][placeholder]");
 				elementsPass.each(function(i) {
 					var s = $(this);
 					var pValue = s.attr("placeholder");
 					var sValue = s.val();
 					if (pValue) {
 						if (sValue == '') {
 							//DOM不支持type的修改，需要复制密码框属性，生成新的DOM
 							var html = this.outerHTML || "";
 							html = html.replace(/\s*type=(['"])?password\1/gi, " type=text placeholderfriend")
 								.replace(/\s*(?:value|on[a-z]+|name)(=(['"])?\S*\1)?/gi, " ")
 								.replace(/\s*placeholderfriend/, " placeholderfriend value='" + pValue + "' " + "onfocus='placeholderfriendfocus(this);' ");
 							var idValue = s.attr("id");
 							if (idValue) {
 								s.attr("id", idValue + "placeholderfriend");
 							}
 							var clsValue = s.attr("class");
 							if (clsValue) {
 								s.attr("class", clsValue + "placeholderfriend");
 							}
 							s.hide();
 							s.after(html);
 						}
 					}
 				});
 				elementsPass.blur(function() {
 					var s = $(this);
 					var sValue = s.val();
 					if (sValue == '') {
 						var idValue = s.attr("id");
 						if (idValue) {
 							s.attr("id", idValue + "placeholderfriend");
 						}
 						var clsValue = s.attr("class");
 						if (clsValue) {
 							s.attr("class", clsValue + "placeholderfriend");
 						}
 						s.hide().next().show();
 					}
 				});
 			});
 		}
 		window.placeholderfriendfocus = placeholderfriend.focus;
 	}
 	
 	//头条上方滑动
 	/*
 	$(function(){
 		if($(".content-topnews-box-neo").length>0){
	    	var topnewsTime;
	    	function TopnewsScroll(length){
	    		topnewsSpeed = 4;
				$(".content-topnews-box-neo-txt").animate({right: length+"px"},parseInt(length*topnewsSpeed*10*((length-parseInt($(".content-topnews-box-neo-txt").css("right")))/length)),"linear",function(){
	        		topnewsTime = setTimeout(function(){
	        			$(".content-topnews-box-neo-txt").fadeOut(200,function(){
		        			$(".content-topnews-box-neo-txt").css("right",0).fadeIn(200,function(){
		        				TopnewsScroll(length);
		        			})
		        		})
	        		},2000)
	        	});
			}
	
	    	topnews_first = $(".content-topnews-box-neo-txt a").first().offset();
	    	topnews_last = $(".content-topnews-box-neo-txt a").last().offset();
	    	topnews_diff = parseInt(topnews_last.left)+parseInt($(".content-topnews-box-neo-txt a").last().width())-parseInt(topnews_first.left)-1144;
	
	    	if(topnews_diff>0){
	    		TopnewsScroll(topnews_diff);
	
	        	$(".content-topnews-box-neo").mouseover(function(){
	        		clearTimeout(topnewsTime);
	        		if($(".content-topnews-box-neo-txt").css("opacity")==1){
	        			$(".content-topnews-box-neo-txt").stop();
	        		}
	        	})
	        	$(".content-topnews-box-neo").mouseleave(function(){
	        		if($(".content-topnews-box-neo-txt").css("opacity")==1){
	        			TopnewsScroll(topnews_diff);
	        		}
	        	})
	    	}
 		}
    })
    */
 	$(function(){
 		if($(".content-topnews-box-neo").length>0){
	    	function TopnewsScroll(length){
	    		topnewsSpeed = 4;
				$(".content-topnews-box-neo-txt").animate({right: length+"px"},parseInt(length*topnewsSpeed*10*((length-parseInt($(".content-topnews-box-neo-txt").css("right")))/length)),"linear",function(){
					$(".content-topnews-box-neo-txt").css('right',0);
					TopnewsScroll(length);
	        	});
			}
	    	
 			_widthBox = $('.content-topnews-box-neo-box').first().width();

    		TopnewsScroll(_widthBox);
    		
        	$(".content-topnews-box-neo").mouseover(function(){
    			$(".content-topnews-box-neo-txt").stop();
        	})
        	$(".content-topnews-box-neo").mouseleave(function(){
    			TopnewsScroll(_widthBox);
        	})
 		}
	})
 	$(document).on('click', '.J-fastRead-btn', function(event) {
 		event.preventDefault();
 		var _temp = $(this).parent().next('.c-fastRead-hidden').html();
 		Base.modal({
 			content: _temp,
 			type: 1,
 			title: '',
 			init: function() {
 				$('.c-modal').css({
 					'width': '810px',
 					'margin-left': '-405px'
 				});
 				$('.c-modal-title').css({
 					'border': 'none'
 				});
 				$('.c-modal-container').css({
 					'padding': '0 69px',
 					property2: 'value2'
 				});
 			},
 			callback: function() {
 				console.debug('阅读全文');
 			}
 		});
 	});
	
	//返回顶部
	$(window).scroll(function(){
 		if($(window).scrollTop()>=800){
 			$('.full_nav').show();	
 		}else{
 			$('.full_nav').hide();
 		}
 	});
	function reFullNav(){
		var left=($(window).width()-1200)/2+1200;
 		$('.full_nav').css('left',left);
 		 
 		var left1=0;
		var sellbook = $('#sellbook');
		if(sellbook.length==0)
		{
			left1=($(window).width()-1200)/2-$('.full_nav1').width()-25;
		}
		else
		{
			left1=($(window).width()-1200)/2-$('.full_nav1').find('img').eq(0).width()-10;
		}
		
 		$('.full_nav1').css('left',left1).show();
	}
	function _openUrl(targeturl)
	{
	    var tag = document.createElement("a");
	    tag.href=targeturl;
	    tag.target="_blank";
	    tag.id='opennew';
	    tag.innerHTML='';
	    document.getElementsByTagName("body")[0].appendChild(tag);
	    document.getElementById('opennew').click();
	    //e.click();
	    //$("#"+objid).trigger("click")
	    $("#opennew").remove();
	}
	window.onload=function(){
 		reFullNav()
 	}
	$(window).resize(function(){
		reFullNav();
 	});
	
	//评论区
 	$(document).on('click','.gocomment',function(){
 		var timer='';
 		var top=$(window).scrollTop();
 		var _top=$('.hotReviewList').offset().top;	
 		var speed=30;
 		if($(window).scrollTop()>_top){
	 		timer=setInterval(function(){
	 			top=top-speed;
	 			if(top<=_top){
	 				top=_top;
	 				clearInterval(timer);
	 			}
	 			$(window).scrollTop(top);
	 		},20)
 		}else{
 			timer=setInterval(function(){
	 			top=top+speed;
	 			if(top>=_top){
	 				top=_top;
	 				clearInterval(timer);
	 			}
	 			$(window).scrollTop(top);
	 		},20)
 		}
 	});
 	//返回顶部
 	$(document).on('click','.gotop',function(){
 		var timer='';
 		var top=$(window).scrollTop();
 		var speed=300;
 		timer=setInterval(function(){
 			top=top-speed;
 			if(top<=0){
 				top=0;
 				clearInterval(timer);
 			}
 			$(window).scrollTop(top);
 		},20)
 	});
 	//导航栏APP
 	$('.header-index-app').hover(function() {
 		left = $('#header-index-app').position().left;
 		$('.header-index-erweima').offset({'left':left-parseInt(18)});
 		$('.header-index-erweima').fadeIn(100);
	}, function() {
		$('.header-index-erweima').fadeOut(100);
	});
 	
 	$('.go-fengwen-post').click(function(){
 		var _user = mylib.getUserDataByCookie();
 		var bbs_site = getRootDomain();
 		_that = $(this);
        if(!_user){
	        mylib.login(function() {
	        	var wd = window.open();
	 			wd.location.href = "https://user."+bbs_site+"/post/index";
	 			window.location.reload(true);
	        });//弹出登录框
	        return false;
        }else{
 			var wd = window.open();
 			wd.location.href = "https://user."+bbs_site+"/post/index";
        }
 	})
 	
	$(document).on('hover','.scoreboard_column .scoreboard_group li',function(){
		group = $(this).text();
		$(".scoreboard_column .scoreboard_group li").removeClass("active");
		$(this).addClass("active");
		$(".scoreboard_column .scoreboard_detail li").hide();
		$(".scoreboard_group_"+group).show();
	});
	$(document).on('hover','.scoreboard_column_2 .scoreboard_group li',function(){
		group = $(this).text();
		$(".scoreboard_column_2 .scoreboard_group li").removeClass("active");
		$(this).addClass("active");
		$(".scoreboard_column_2 .scoreboard_detail li").hide();
		$(".scoreboard_8_"+group).show();
	});
	$(document).on('hover','.scoreboard_column_3 .scoreboard_group li',function(){
		group = $(this).text();
		$(".scoreboard_column_3 .scoreboard_group li").removeClass("active");
		$(this).addClass("active");
		$(".scoreboard_column_3 .scoreboard_detail li").hide();
		$(".scoreboard_4_"+group).show();
	});
	$(document).on('hover','.scoreboard_column_4 .scoreboard_group li',function(){
		group = $(this).text();
		$(".scoreboard_column_4 .scoreboard_group li").removeClass("active");
		$(this).addClass("active");
		$(".scoreboard_column_4 .scoreboard_detail li").hide();
		$(".scoreboard_2_"+group).show();
	});
 	

	
 	//首页新滚动模块
	/*
 	(function(){
 		var _fastNews = $('.fastNews-box');
 		var bbs_site = getRootDomain();
 		if(_fastNews.length>0){
 			$.ajax({ 
 				url: "/api/new_gundong.htm", 
 				type:'GET',
 				dataType: 'json', 
 				success: function(data){
 					if(data.code==0){
 	 					var html1='',html2='',html3='',item='';
 						for(var i=0;i<Math.min(10,data.kuaixun.length);i++){
 							if(typeof(data.kuaixun[i])!='undefined')
 								item='<li><span class="fastNews-box-dot"></span><a href="'+data.kuaixun[i].HTTP_URL+'?s=sygdkx" target="_blank">'+data.kuaixun[i].TITLE+'</a></li>'; 
 							else
 								item='<li></li>';
 							html1+='<div class="list list-thick"><ul>'+item+'</ul></div>';
 						}
 						for(var i=0;i<10;i++){
 							if(typeof(data.fenghot[i])!='undefined')
 								item='<li><span class="fastNews-box-dot"></span><a href="https://user.'+bbs_site+'/main/content?id='+data.fenghot[i].id+'&s=syfwqtzr" target="_blank">'+data.fenghot[i].title+'</a></li>'; 
 							else
 								item='<li></li>';
 							html2+='<div class="list list-thick"><ul>'+item+'</ul></div>';
 						}
 						for(var i=0;i<Math.min(10,data.member.length);i++){
 							if(typeof(data.member[i])!='undefined')
 								item='<li><span class="fastNews-box-dot"></span><a class="marquee_member" data-ref="//member.'+bbs_site+'/post/view?id='+data.member[i].id+'" href="javascript:;" onclick="return false">'+data.member[i].title+'</a></li>'; 
 							else
 								item='<li></li>';
 							html3+='<div class="list list-thick"><ul>'+item+'</ul></div>';
 						}
 						
 						$('.fastNews-box-left').prepend(html1);
 						$('.fastNews-box-center').prepend(html2);
 						$('.fastNews-box-right').prepend(html3);
 						marqueeStart(2, "up");marqueeStart(3, "up");marqueeStart(4, "up");

 						 	 					//观察聚焦
 	 					var _html = getNewsFocusHtml(data.kuaixun);
 	 					$('#news-index-focus').html(_html);
 					}
 				}
 			});
 		}
 		
 		$(document).on('click','.marquee_member',function(){
	 		var _user = mylib.getUserDataByCookie();
	 		_that = $(this);
	        if(!_user){
		        mylib.login(function() {
		            window.location.reload(true);
		        });//弹出登录框
		        return false;
	        }else{
	 			var wd = window.open();
	        	$.get('/api/isvip.htm',{id:_user[0]},function(result){
	        		result = JSON.parse(result);
	        		if(result.code==0){
	        			wd.location.href = _that.attr('data-ref');
 		       		}else{
 		       			wd.location.href = "https://member."+bbs_site;
 		       		}
        			return false;
	        	})
	        }
 		})
 	})();
 	
 	
 	(function(){
 		var _fastNews = $('.fastNews-box');
 		var bbs_site = getRootDomain();
 		var uid = getUserCookieData();
 		if(_fastNews.length>0){
 			$.ajax({ 
 				url: "/api/guanzhu.htm?uid="+uid[0], 
 				type:'GET',
 				dataType: 'json', 
 				success: function(data){
 					if(data.code==0){
 	 					var html3='',item='';
 						for(var i=0;i<Math.min(6,data.guanzhu.length);i++){
 							if(typeof(data.guanzhu[i])!='undefined'){
 								if(data.guanzhu[i].user_photo=="/static/imgs/default_user_pic.png")
 									item='<li to-uid="'+data.guanzhu[i].id+'"><a style="float:left" href="//user.'+bbs_site+'/user/personal-homepage?uid='+data.guanzhu[i].id+'" target="_blank"><img src="https://user.guancha.cn/static/imgs/default_user_pic.png"></a>';
 								else
 									item='<li to-uid="'+data.guanzhu[i].id+'"><a style="float:left" href="//user.'+bbs_site+'/user/personal-homepage?uid='+data.guanzhu[i].id+'" target="_blank"><img src="'+data.guanzhu[i].user_photo+'"></a>';
 								item+='<div class="fastNews-user"><span class="fastNews-name"><a href="//user.'+bbs_site+'/user/personal-homepage?uid='+data.guanzhu[i].id+'" target="_blank">'+data.guanzhu[i].user_nick+'</a></span>';
 								if(data.guanzhu[i].user_description!=null) item+='<span class="fastNews-desc">'+data.guanzhu[i].user_description+'</span>';
 								item+='</div>';
 								if(data.guanzhu[i].attended==1){
 									item+='<div class="fastNews-attend-attended" attended="done">已关注</div>';
 								}else{
 									item+='<div class="fastNews-attend"><span>+</span>关注</div>';
 								}
 								item+='</li>';
 							}else{
 								item='<li></li>';
 							}

 							html3+='<div class="list fastNews-guanzhu"><ul>'+item+'</ul></div>';
 						}
 						$('.fastNews-box-right').prepend(html3);
 						marqueeStart(4, "up");
 					}
 				}
 			});
 		}
 	})();
 	*/
 	
 	//风闻精选
 	(function(){
 		var _fengwen = $('.module-fengwen');
 		var html='';
 		var bbs_site = getRootDomain();
 		if(_fengwen.length>0){
 			$.ajax({ 
 				url: "/api/fengwen.htm", 
 				type:'GET',
 				dataType: 'json', 
 				success: function(data){
 					if(data.code==0){
 						for(var i=0;i<data.items.length;i++){
 							if(data.items[i].post_id!=null){
 								border = '';
 								if(i==0) border = 'style="border-top:0px;"';
 								if(data.items[i].user_photo==null) data.items[i].user_photo="/static/imgs/default_user_pic.png";
	 							html += '<div class="module-fengwen-box" '+border+'><div class="module-fengwen-user">';
	 							if(data.items[i].user_description&&data.items[i].user_description!=''){
	 								html += '<div><a href="http://user.'+bbs_site+'/user/personal-homepage?uid='+data.items[i].user_id+'&s=syfwjxtx" target="_blank"><img src="'+data.items[i].user_photo+'" alt="头像"></a></div><div class="module-fengwen-user-desc"><span><a href="http://user.'+bbs_site+'/user/personal-homepage?uid='+data.items[i].user_id+'&s=syfwjxnc" target="_blank">'+data.items[i].user_nick+'</a>&nbsp'+data.items[i].user_description+'</span>';
	 							}else{
	 								html += '<div><a href="http://user.'+bbs_site+'/user/personal-homepage?uid='+data.items[i].user_id+'&s=syfwjxtx" target="_blank"><img src="'+data.items[i].user_photo+'" alt="头像"></a></div><div class="module-fengwen-user-desc"><span><a href="http://user.'+bbs_site+'/user/personal-homepage?uid='+data.items[i].user_id+'&s=syfwjxnc" target="_blank">'+data.items[i].user_nick+'</a></span>';
	 							}
	 							html += '</div></div>';
	 							html += '<a href="http://user.'+bbs_site+'/main/content?id='+data.items[i].post_id+'&s=syfwjxbt" target="_blank"><div class="module-fengwen-title">'+data.items[i].title+'</div></a>'
	 							html += '<a href="http://user.'+bbs_site+'/main/content?id='+data.items[i].post_id+'&s=syfwjxbt" target="_blank"><p>'+data.items[i].desc+'</p></a>';
	 							if(data.items[i].praise_num==null) data.items[i].praise_num=0;
	 							html += '<div class="module-fengwen-comment">评论 <a href="http://user.'+bbs_site+'/main/content?id='+data.items[i].post_id+'&s=syfwjxpl" target="_blank">'+data.items[i].comment_num+'</a><div style="display:inline-block;width:10px;height:15px;"></div>赞 <a href="http://user.'+bbs_site+'/main/content?id='+data.items[i].post_id+'&s=syfwjxpl" target="_blank">'+data.items[i].praise_num+'</a></div>';
	 							html += '</div>';
 							}
 						}
 						if(html!='') html = '<div style="padding:0 10px;"><div class="module-fengwen-header"><a style="float:none" href="http://user.'+bbs_site+'/?s=syfwsq'+'" target="_blank"><span>&nbsp&nbsp&nbsp风闻社区</span></a><a href="http://user.'+bbs_site+'/?s=syckqb'+'" target="_blank">查看全部>></a></div>'+html+'</div>';
 						
 						_fengwen.html(html);
 					}
 				}
 			});
 		}
 	})();
 	
 	//首页观会员
 	(function(){
 		var _member = $('.module-member');
 		var html='';
 		var bbs_site = getRootDomain();
 		if(_member.length>0){
 			$.ajax({ 
 				url: "/api/member.htm", 
 				type:'GET',
 				dataType: 'json', 
 				success: function(data){
 					if(data.code==0){
 						for(var i=0;i<data.items.length;i++){
 							if(data.items[i].id!=null){
 								if(data.items[i].show_type==3){
	 								border = '';
	 								if(i==0) border = 'style="border-top:0px;"';
		 							html += '<div class="module-member-box" '+border+'>';
		 							html += '<div class="module-member-column"><a href="https://member.guancha.cn/guanxueyuan/list.html" target="_blank"><img width="28px" src="'+data.items[i].icon+'"></a><span><a href="https://member.guancha.cn/guanxueyuan/list.html" target="_blank">'+data.items[i].column+'</a></span>'
	 								html += '</div><div class="module-member-post" data-type="3" data-id="'+data.items[i].id+'">';
									html += '<h3>'+data.items[i].title+'</h3>';
		 							html += '<img src="'+data.items[i].h_pic+'">'
		 							html += '</div></div>';
 								}else if(data.items[i].show_type==4){
 									border = '';
	 								if(i==0) border = 'style="border-top:0px;"';
		 							html += '<div class="module-member-box" '+border+'>';
		 							html += '<div class="module-member-column"><a href="https://member.'+bbs_site+'/zaixianke/summary.html?id='+data.items[i].cid+'" target="_blank"><img style="width:30px;height:30px;border-radius:3em;float:left;" src="'+data.items[i].author_pic+'"></a>'
		 							html += '<div style="display:inline-block;max-width:332px;padding-left:8px;"><a href="https://member.'+bbs_site+'/zaixianke/summary.html?id='+data.items[i].cid+'" target="_blank">'+data.items[i].author_name+'</a><span style="left:0px;top:2px;display:block;font-size:12px;color:#7B7B7B;">'+data.items[i].author_desc_short+'</span></div>'
	 								html += '</div><div class="module-member-post" data-type="4" data-id="'+data.items[i].id+'">';
									html += '<h3>'+data.items[i].title+'</h3>';
		 							html += '<img src="'+data.items[i].pic+'">'
		 							html += '</div></div>';
 								}
 							}
 						}
 						if(html!='') html = '<div style="padding:0 10px;"><div class="module-fengwen-header"><a style="float:none" href="http://member.'+bbs_site+'" target="_blank"><span>&nbsp&nbsp&nbsp观学院</span></a><a href="http://member.'+bbs_site+'" target="_blank">查看全部>></a></div>'+html+'</div>';
 						
 						_member.html(html);
 					}
 				}
 			});
 			
 		 	$('body').on('click', '.module-member-post', function(event){
 		        var _user = mylib.getUserDataByCookie();
 		        _that = $(this);
 		        if(!_user){
 			        mylib.login(function() {
 			            window.location.reload(true);
 			        });//弹出登录框
 			        return;
 		        }else{
 		        	var wd = window.open();
 		        	$.get('/api/isvip.htm',{id:_user[0]},function(result){
 		        		result = JSON.parse(result);
 		        		if(result.code==0){
 		        			_mid = _that.attr('data-id');
 		        			if(_that.attr('data-type')==3){
 		        				wd.location.href = 'https://member.'+getRootDomain()+'/guanxueyuan/content.html?id='+_mid;
 		        			}else if(_that.attr('data-type')==4){
 		        				wd.location.href = 'https://member.'+getRootDomain()+'/zaixianke/content.html?id='+_mid;
 		        			}
 	 		       		}else{
 	 		       			wd.location.href = "https://member."+bbs_site;
 	 		       		}
 		        		return false;
 		        	})
 		        }
 		 	})
 		}
 	})();


 	//风闻热评
 	(function(){
 		var _fengwen = $('.fengwen-hot-comment');
 		var html='';
 		var bbs_site = getRootDomain();
 		if(_fengwen.length>0){
 			$.ajax({ 
 				url: "//app."+bbs_site+"/comment/get-hot-comment", 
 				type:'GET',
 				dataType: 'json', 
 				success: function(info){
 					if(info.code==0){
						html += '<div style="padding:0 10px;">'
						html += '	<h4 style="font-size:18px;padding:15px 0 20px 0">';
						html += '		<a href="'+info.data.post_url+'?s=zwyfwrpbt" target="_blank">'+info.data.title+'</a>';
						html += '	</h4>';
						html += '	<p>';
						html += '		<span style="color:#477aac"><a href="//user.'+bbs_site+'/user/personal-homepage?uid='+info.data.user_id+'" target="_blank" style="color:#477aac">'+info.data.user_nick+'</a>:</span>'
						html += '		<a href="'+info.data.post_url+'?s=zwyfwrprpzw" target="_blank">'+info.data.content+'</a>';
						html += '	</p>';
						html += '	<div class="module-fengwen-comment module-fengwen-comment-hot" cid="'+info.data.id+'">'
						html += '		<a class="praise">赞  <span>'+info.data.praise_num+'</span></a>'
						if(info.data.reply_count!='0'){
							html+= '&nbsp&nbsp<a href="//user.'+bbs_site+'/main/child-comments?id='+info.data.id+'&s=zwyfwrpckhf" target="_blank">查看回复 '+info.data.reply_count+'</a>'
						}
						html += '		<a href="//user.'+bbs_site+'/main/hot-comment-index?s=zwyfwrpqbrp" style="float:right;color:#bd0509;">全部热评</a>'	
						html += '	</div>'
						html += '</div>'
 					}
					if(html!='') html = '<div class="fengwen-comment-header"><a style="float:none" href="//user.'+bbs_site+'/main/hot-comment-index?s=zwyfwrp'+'" target="_blank"><span style="font-size:22px;color:#000">&nbsp&nbsp&nbsp风闻热评</span></a><a href="//user.'+bbs_site+'/main/hot-comment-index?s=zwyfwrpckqb" target="_blank">查看全部</a></div>'+html;
	 				_fengwen.html(html);
 				}
 			});
 		}
 	})();
 	
 	//世界杯积分榜
 	(function(){
 		var worldcup = $('.scoreboard_column');
 		var worldcup_group = ['A','B','C','D','E','F','G','H']
 		if(worldcup.length>0){
			_html_all = '<img src="https://i.guancha.cn/scoreboard.png?20180622" />';
			_html_all += '<ul class="scoreboard_group">'
			_html_all += '    <li class="active">A</li>'
			_html_all += '    <li>B</li><li>C</li><li>D</li><li>E</li><li>F</li><li>G</li><li>H</li>'
			_html_all += '</ul>'
			_html_all += '<ul class="scoreboard_detail">'
			worldcup_group.forEach(function(value,index,array){
				if(value=='A'){
					_html = '<li class="scoreboard_group_'+value+' active">';
				}else{
					_html = '<li class="scoreboard_group_'+value+'">';
				}
				_html +='    <img src="https://i.guancha.cn/2018worldcup_group_'+value+'.png" />'
				_html +='</li>'
 				_html_all += _html;
			});
 			_html_all +='</ul>'
			worldcup.html(_html_all);
 		}
 	})();
 	
 	//世界杯1/8日程
 	(function(){
 		var worldcup8 = $('.scoreboard_column_2');
 		if(worldcup8.length>0){
 			$.ajax({ 
 				url: "/api/worldcup8.htm", 
 				type:'GET',
 				dataType: 'json', 
 				success: function(data){
 					_html_all = '<img src="http://i.guancha.cn/2018worldcup8.png" />';
 					_html_all += '<ul class="scoreboard_group">'
 					_html_all += '    <li class="active">1</li>'
 					_html_all += '    <li>2</li><li>3</li><li>4</li><li>5</li><li>6</li><li>7</li><li>8</li>'
 					_html_all += '</ul>'
 					_html_all += '<ul class="scoreboard_detail">'
 					$.each(data.items,function(i,val,arr){
 						if(i=='1'){
 							_html = '<li class="scoreboard_8_'+i+' active">';
 						}else{
 							_html = '<li class="scoreboard_8_'+i+'">';
 						}
 						_html +='<div class="scoreboard_row" style="color:#000;line-height:56px;">'
						_html +='    <div class="scoreboard_row_text" style="width:119px;">'
						_html +='        <div class="scoreboard_box">'
							switch(i){
								case '1':
									_html +='<p>C1</p>'
									break;
								case '2':
									_html +='<p>A1</p>'
									break;
								case '3':
									_html +='<p>B1</p>'
									break;
								case '4':
									_html +='<p>D1</p>'
									break;
								case '5':
									_html +='<p>E1</p>'
									break;
								case '6':
									_html +='<p>G1</p>'
									break;
								case '7':
									_html +='<p>F1</p>'
									break;
								case '8':
									_html +='<p>H1</p>'
									break;
							}
 						if((val[0].score>val[1].score)&&(val[0].score!=''&&val[1].score!=''))
 							_html +='           <p style="color:red;font-weight:bold !important;">'+val[0].team+'</p>'
						else
							_html +='           <p>'+val[0].team+'</p>'
						_html +='        </div>'
						_html +='    </div>'
						_html +='    <div class="scoreboard_row_text" style="width:150px;">'
						_html +='        <div class="scoreboard_box">'
						switch(i){
							case '1':
								_html +='<p>喀山</p><p><label style="color:#6495ED;">6月30日 周六</label> 22:00</p>'
								break;
							case '2':
								_html +='<p>索契</p><p><label style="color:#6495ED;">7月1日 周日</label> 2:00</p>'
								break;
							case '3':
								_html +='<p>莫斯科</p><p><label style="color:#6495ED;">7月1日 周日</label> 22:00</p>'
								break;
							case '4':
								_html +='<p>下诺夫哥罗德</p><p><label style="color:#6495ED;">7月2日 周一</label> 2:00</p>'
								break;
							case '5':
								_html +='<p>萨马拉</p><p><label style="color:#6495ED;">7月2日 周一</label> 22:00</p>'
								break;
							case '6':
								_html +='<p>顿河罗斯托夫</p><p><label style="color:#6495ED;">7月3日 周二 </label> 2:00</p>'
								break;
							case '7':
								_html +='<p>圣彼得堡</p><p><label style="color:#6495ED;">7月3日 周二</label> 22:00</p>'
								break;
							case '8':
								_html +='<p>莫斯科</p><p><label style="color:#6495ED;">7月4日 周三</label> 2:00</p>'
								break;
						}
						_html +='        </div>'
						_html +='    </div>'
						_html +='    <div class="scoreboard_row_text" style="width:119px;">'
						_html +='        <div class="scoreboard_box">'
							switch(i){
								case '1':
									_html +='<p>D2</p>'
									break;
								case '2':
									_html +='<p>B2</p>'
									break;
								case '3':
									_html +='<p>A2</p>'
									break;
								case '4':
									_html +='<p>C2</p>'
									break;
								case '5':
									_html +='<p>F2</p>'
									break;
								case '6':
									_html +='<p>H2</p>'
									break;
								case '7':
									_html +='<p>E2</p>'
									break;
								case '8':
									_html +='<p>G2</p>'
									break;
							}
						if(val[0].score<val[1].score&&(val[0].score!=''&&val[1].score!=''))
							_html +='           <p style="color:red;font-weight:bold !important;">'+val[1].team+'</p>'
						else
							_html +='           <p>'+val[1].team+'</p>'
						_html +='        </div>'
						_html +='    </div>'
						_html +='</div>'
						if(!((val[0].score=='0'||val[0].score=='')&&(val[1].score=='0'||val[1].score==''))){
							_html +='<div class="scoreboard_row" style="color:#000;line-height:40px;">'
							_html +='    <span class="scoreboard_row_text" style="width:119px;">'+val[0].score+'</span>'
							_html +='    <span class="scoreboard_row_text" style="width:150px;">总比分</span>'
							_html +='    <span class="scoreboard_row_text" style="width:119px;">'+val[1].score+'</span>'
	 						_html +='</div>'
						}
 						if(!((val[0].process=='0'||val[0].process=='')&&(val[1].process=='0'||val[1].process==''))){
							_html +='<div class="scoreboard_row" style="color:#000;line-height:40px;">'
							_html +='    <span class="scoreboard_row_text" style="width:119px;">'+val[0].process+'</span>'
							_html +='    <span class="scoreboard_row_text" style="width:150px;">90分钟</span>'
							_html +='    <span class="scoreboard_row_text" style="width:119px;">'+val[1].process+'</span>'
							_html +='</div>'
 						}
 						if((!((val[0].penalty=='0'||val[0].penalty=='')&&(val[1].penalty=='0'||val[1].penalty=='')))||(!((val[0].overtime=='0'||val[0].overtime=='')&&(val[1].overtime=='0'||val[1].overtime=='')))){
							_html +='<div class="scoreboard_row" style="color:#000;line-height:40px;">'
							_html +='    <span class="scoreboard_row_text" style="width:119px;">'+val[0].overtime+'</span>'
							_html +='    <span class="scoreboard_row_text" style="width:150px;">加时</span>'
	 						_html +='    <span class="scoreboard_row_text" style="width:119px;">'+val[1].overtime+'</span>'
							_html +='</div>'
 						}
 						if(!((val[0].penalty=='0'||val[0].penalty=='')&&(val[1].penalty=='0'||val[1].penalty==''))){
							_html +='<div class="scoreboard_row" style="color:#000;line-height:40px;">'
							_html +='    <span class="scoreboard_row_text" style="width:119px;">'+val[0].penalty+'</span>'
							_html +='    <span class="scoreboard_row_text" style="width:150px;">点球</span>'
							_html +='    <span class="scoreboar d_row_text" style="width:119px;">'+val[1].penalty+'</span>'
							_html +='</div>'
 						}
 						_html +='</li>'
 						_html_all += _html;
　　　				})
 					_html_all +='</ul>'
 					worldcup8.html(_html_all);
 				}
 			});
 		}
 	})();
 	
 	//世界杯1/4日程
 	(function(){
 		var worldcup4 = $('.scoreboard_column_3');
 		if(worldcup4.length>0){
 			$.ajax({ 
 				url: "/api/worldcup4.htm", 
 				type:'GET',
 				dataType: 'json', 
 				success: function(data){
 					_html_all = '<img src="https://i.guancha.cn/2018worldcup4.png" />';
 					_html_all += '<ul class="scoreboard_group">'
 					_html_all += '    <li class="active">1</li>'
 					_html_all += '    <li>2</li><li>3</li><li>4</li>'
 					_html_all += '</ul>'
 					_html_all += '<ul class="scoreboard_detail">'
 					$.each(data.items,function(i,val,arr){
 						if(i=='1'){
 							_html = '<li class="scoreboard_4_'+i+' active">';
 						}else{
 							_html = '<li class="scoreboard_4_'+i+'">';
 						}
 						_html +='<div class="scoreboard_row" style="color:#000;line-height:56px;">'
						_html +='    <div class="scoreboard_row_text" style="width:119px;">'
						_html +='        <div class="scoreboard_box">'
 						if((val[0].score>val[1].score)&&(val[0].score!=''&&val[1].score!=''))
 							_html +='           <p style="color:red;font-weight:bold !important;">'+val[0].team+'</p>'
						else
							_html +='           <p>'+val[0].team+'</p>'
						_html +='        </div>'
						_html +='    </div>'
						_html +='    <div class="scoreboard_row_text" style="width:150px;">'
						_html +='        <div class="scoreboard_box">'
						switch(i){
							case '1':
								_html +='<p>下诺夫哥罗德</p><p><label style="color:#6495ED;">7月6日 周五</label> 22:00</p>'
								break;
							case '2':
								_html +='<p>喀山</p><p><label style="color:#6495ED;">7月7日 周六</label> 2:00</p>'
								break;
							case '3':
								_html +='<p>萨马拉</p><p><label style="color:#6495ED;">7月7日 周六</label> 22:00</p>'
								break;
							case '4':
								_html +='<p>索契</p><p><label style="color:#6495ED;">7月8日 周日</label> 2:00</p>'
								break;
						}
						_html +='        </div>'
						_html +='    </div>'
						_html +='    <div class="scoreboard_row_text" style="width:119px;">'
						_html +='        <div class="scoreboard_box">'
						if(val[0].score<val[1].score&&(val[0].score!=''&&val[1].score!=''))
							_html +='           <p style="color:red;font-weight:bold !important;">'+val[1].team+'</p>'
						else
							_html +='           <p>'+val[1].team+'</p>'
						_html +='        </div>'
						_html +='    </div>'
						_html +='</div>'
						if(!((val[0].score=='0'||val[0].score=='')&&(val[1].score=='0'||val[1].score==''))){
							_html +='<div class="scoreboard_row" style="color:#000;line-height:40px;">'
							_html +='    <span class="scoreboard_row_text" style="width:119px;">'+val[0].score+'</span>'
							_html +='    <span class="scoreboard_row_text" style="width:150px;">总比分</span>'
							_html +='    <span class="scoreboard_row_text" style="width:119px;">'+val[1].score+'</span>'
	 						_html +='</div>'
						}
						if(!((val[0].process=='0'||val[0].process=='')&&(val[1].process=='0'||val[1].process==''))){
							_html +='<div class="scoreboard_row" style="color:#000;line-height:40px;">'
							_html +='    <span class="scoreboard_row_text" style="width:119px;">'+val[0].process+'</span>'
							_html +='    <span class="scoreboard_row_text" style="width:150px;">90分钟</span>'
							_html +='    <span class="scoreboard_row_text" style="width:119px;">'+val[1].process+'</span>'
							_html +='</div>'
 						}
 						if((!((val[0].penalty=='0'||val[0].penalty=='')&&(val[1].penalty=='0'||val[1].penalty=='')))||(!((val[0].overtime=='0'||val[0].overtime=='')&&(val[1].overtime=='0'||val[1].overtime=='')))){
							_html +='<div class="scoreboard_row" style="color:#000;line-height:40px;">'
							_html +='    <span class="scoreboard_row_text" style="width:119px;">'+val[0].overtime+'</span>'
							_html +='    <span class="scoreboard_row_text" style="width:150px;">加时</span>'
	 						_html +='    <span class="scoreboard_row_text" style="width:119px;">'+val[1].overtime+'</span>'
							_html +='</div>'
 						}
 						if(!((val[0].penalty=='0'||val[0].penalty=='')&&(val[1].penalty=='0'||val[1].penalty==''))){
							_html +='<div class="scoreboard_row" style="color:#000;line-height:40px;">'
							_html +='    <span class="scoreboard_row_text" style="width:119px;">'+val[0].penalty+'</span>'
							_html +='    <span class="scoreboard_row_text" style="width:150px;">点球</span>'
							_html +='    <span class="scoreboard_row_text" style="width:119px;">'+val[1].penalty+'</span>'
							_html +='</div>'
 						}
 						_html +='</li>'
 						_html_all += _html;
　　　				})
 					_html_all +='</ul>'
 					worldcup4.html(_html_all);
 				}
 			});
 		}
 	})();
 	
 	//世界杯1/4日程
 	(function(){
 		var worldcup2 = $('.scoreboard_column_4');
 		if(worldcup2.length>0){
 			$.ajax({ 
 				url: "/api/worldcup2.htm", 
 				type:'GET',
 				dataType: 'json', 
 				success: function(data){
 					_html_all = '<img src="https://i.guancha.cn/2018worldcup2.jpg" />';
 					_html_all += '<ul class="scoreboard_group">'
 					_html_all += '    <li class="active">1</li>'
 					_html_all += '    <li>2</li>'
 					_html_all += '</ul>'
 					_html_all += '<ul class="scoreboard_detail">'
 					$.each(data.items,function(i,val,arr){
 						if(i=='1'){
 							_html = '<li class="scoreboard_2_'+i+' active">';
 						}else{
 							_html = '<li class="scoreboard_2_'+i+'">';
 						}
 						_html +='<div class="scoreboard_row" style="color:#000;line-height:56px;">'
						_html +='    <div class="scoreboard_row_text" style="width:119px;">'
						_html +='        <div class="scoreboard_box">'
 						if((val[0].score>val[1].score)&&(val[0].score!=''&&val[1].score!=''))
 							_html +='           <p style="color:red;font-weight:bold !important;">'+val[0].team+'</p>'
						else
							_html +='           <p>'+val[0].team+'</p>'
						_html +='        </div>'
						_html +='    </div>'
						_html +='    <div class="scoreboard_row_text" style="width:150px;">'
						_html +='        <div class="scoreboard_box">'
						switch(i){
							case '1':
								_html +='<p>圣彼得堡</p><p><label style="color:#6495ED;">7月11日 周三</label> 2:00</p>'
								break;
							case '2':
								_html +='<p>莫斯科</p><p><label style="color:#6495ED;">7月12日 周四</label> 2:00</p>'
								break;
						}
						_html +='        </div>'
						_html +='    </div>'
						_html +='    <div class="scoreboard_row_text" style="width:119px;">'
						_html +='        <div class="scoreboard_box">'
						if(val[0].score<val[1].score&&(val[0].score!=''&&val[1].score!=''))
							_html +='           <p style="color:red;font-weight:bold !important;">'+val[1].team+'</p>'
						else
							_html +='           <p>'+val[1].team+'</p>'
						_html +='        </div>'
						_html +='    </div>'
						_html +='</div>'
						if(!((val[0].score=='0'||val[0].score=='')&&(val[1].score=='0'||val[1].score==''))){
							_html +='<div class="scoreboard_row" style="color:#000;line-height:40px;">'
							_html +='    <span class="scoreboard_row_text" style="width:119px;">'+val[0].score+'</span>'
							_html +='    <span class="scoreboard_row_text" style="width:150px;">总比分</span>'
							_html +='    <span class="scoreboard_row_text" style="width:119px;">'+val[1].score+'</span>'
	 						_html +='</div>'
						}
						if(!((val[0].process=='0'||val[0].process=='')&&(val[1].process=='0'||val[1].process==''))){
							_html +='<div class="scoreboard_row" style="color:#000;line-height:40px;">'
							_html +='    <span class="scoreboard_row_text" style="width:119px;">'+val[0].process+'</span>'
							_html +='    <span class="scoreboard_row_text" style="width:150px;">90分钟</span>'
							_html +='    <span class="scoreboard_row_text" style="width:119px;">'+val[1].process+'</span>'
							_html +='</div>'
 						}
 						if((!((val[0].penalty=='0'||val[0].penalty=='')&&(val[1].penalty=='0'||val[1].penalty=='')))||(!((val[0].overtime=='0'||val[0].overtime=='')&&(val[1].overtime=='0'||val[1].overtime=='')))){
							_html +='<div class="scoreboard_row" style="color:#000;line-height:40px;">'
							_html +='    <span class="scoreboard_row_text" style="width:119px;">'+val[0].overtime+'</span>'
							_html +='    <span class="scoreboard_row_text" style="width:150px;">加时</span>'
	 						_html +='    <span class="scoreboard_row_text" style="width:119px;">'+val[1].overtime+'</span>'
							_html +='</div>'
 						}
 						if(!((val[0].penalty=='0'||val[0].penalty=='')&&(val[1].penalty=='0'||val[1].penalty==''))){
							_html +='<div class="scoreboard_row" style="color:#000;line-height:40px;">'
							_html +='    <span class="scoreboard_row_text" style="width:119px;">'+val[0].penalty+'</span>'
							_html +='    <span class="scoreboard_row_text" style="width:150px;">点球</span>'
							_html +='    <span class="scoreboard_row_text" style="width:119px;">'+val[1].penalty+'</span>'
							_html +='</div>'
 						}
 						_html +='</li>'
 						_html_all += _html;
　　　				})
 					_html_all +='</ul>'
 					worldcup2.html(_html_all);
 				}
 			});
 		}
 	})();
 	
 	//世界杯1/4日程
 	(function(){
 		var worldcup1 = $('.scoreboard_column_5');
 		if(worldcup1.length>0){
 			$.ajax({ 
 				url: "/api/worldcup1.htm", 
 				type:'GET',
 				dataType: 'json', 
 				success: function(data){
 					_html_all = '<img src="https://i.guancha.cn/2018worldcup1.jpg" />';
 					_html_all += '<ul class="scoreboard_detail">'
 					$.each(data.items,function(i,val,arr){
 						if(i=='1'){
 							_html = '<li class="scoreboard_2_'+i+' active">';
 						}else{
 							_html = '<li class="scoreboard_2_'+i+'">';
 						}
 						_html +='<div class="scoreboard_row" style="color:#000;line-height:56px;">'
						_html +='    <div class="scoreboard_row_text" style="width:119px;">'
						_html +='        <div class="scoreboard_box">'
 						if((val[0].score>val[1].score)&&(val[0].score!=''&&val[1].score!=''))
 							_html +='           <p style="color:red;font-weight:bold !important;">'+val[0].team+'</p>'
						else
							_html +='           <p>'+val[0].team+'</p>'
						_html +='        </div>'
						_html +='    </div>'
						_html +='    <div class="scoreboard_row_text" style="width:150px;">'
						_html +='        <div class="scoreboard_box">'
						_html +='			<p>莫斯科</p><p><label style="color:#6495ED;">7月15日 周日</label> 23:00</p>'
						_html +='        </div>'
						_html +='    </div>'
						_html +='    <div class="scoreboard_row_text" style="width:119px;">'
						_html +='        <div class="scoreboard_box">'
						if(val[0].score<val[1].score&&(val[0].score!=''&&val[1].score!=''))
							_html +='           <p style="color:red;font-weight:bold !important;">'+val[1].team+'</p>'
						else
							_html +='           <p>'+val[1].team+'</p>'
						_html +='        </div>'
						_html +='    </div>'
						_html +='</div>'
						if(!((val[0].score=='0'||val[0].score=='')&&(val[1].score=='0'||val[1].score==''))){
							_html +='<div class="scoreboard_row" style="color:#000;line-height:40px;">'
							_html +='    <span class="scoreboard_row_text" style="width:119px;">'+val[0].score+'</span>'
							_html +='    <span class="scoreboard_row_text" style="width:150px;">总比分</span>'
							_html +='    <span class="scoreboard_row_text" style="width:119px;">'+val[1].score+'</span>'
	 						_html +='</div>'
						}
						if(!((val[0].process=='0'||val[0].process=='')&&(val[1].process=='0'||val[1].process==''))){
							_html +='<div class="scoreboard_row" style="color:#000;line-height:40px;">'
							_html +='    <span class="scoreboard_row_text" style="width:119px;">'+val[0].process+'</span>'
							_html +='    <span class="scoreboard_row_text" style="width:150px;">90分钟</span>'
							_html +='    <span class="scoreboard_row_text" style="width:119px;">'+val[1].process+'</span>'
							_html +='</div>'
 						}
 						if((!((val[0].penalty=='0'||val[0].penalty=='')&&(val[1].penalty=='0'||val[1].penalty=='')))||(!((val[0].overtime=='0'||val[0].overtime=='')&&(val[1].overtime=='0'||val[1].overtime=='')))){
							_html +='<div class="scoreboard_row" style="color:#000;line-height:40px;">'
							_html +='    <span class="scoreboard_row_text" style="width:119px;">'+val[0].overtime+'</span>'
							_html +='    <span class="scoreboard_row_text" style="width:150px;">加时</span>'
	 						_html +='    <span class="scoreboard_row_text" style="width:119px;">'+val[1].overtime+'</span>'
							_html +='</div>'
 						}
 						if(!((val[0].penalty=='0'||val[0].penalty=='')&&(val[1].penalty=='0'||val[1].penalty==''))){
							_html +='<div class="scoreboard_row" style="color:#000;line-height:40px;">'
							_html +='    <span class="scoreboard_row_text" style="width:119px;">'+val[0].penalty+'</span>'
							_html +='    <span class="scoreboard_row_text" style="width:150px;">点球</span>'
							_html +='    <span class="scoreboard_row_text" style="width:119px;">'+val[1].penalty+'</span>'
							_html +='</div>'
 						}
 						_html +='</li>'
 						_html_all += _html;
　　　				})
 					_html_all +='</ul>'
 					worldcup1.html(_html_all);
 				}
 			});
 		}
 	})();
 	
 	//正文观会员
 	(function(){
 		var _postmember = $('#post-member');
 		var bbs_site = getRootDomain();
 		if(_postmember.length>0){
 			$.ajax({ 
 				url: "/api/postmember.htm", 
 				type:'GET',
 				dataType: 'json', 
 				success: function(data){
 					if(data.code==0){
 	 					//观察聚焦
 				 		max = data.items.length;
 				 		var html ='';
			 	 		for(var i=0;i<max;i++){
			 	 			_title = data.items[i].title;
			 	 			if(data.items[i].title.length>29) _title = data.items[i].title.substr(0,29)+"...";
			 	 			html+='<div class="post-member-box" data-id="'+data.items[i].id+'"><img class="post-member-href" src="'+data.items[i].big_pic+'">';
			 	 			html+='<div class="post-member-title"><span class="post-member-href">'+_title+'</span>';
			 	 			html+='<a href="https://member.'+bbs_site+'/column/'+data.items[i].column_id.toLowerCase()+'" target="_blank">'+data.items[i].column+'</a></div>';
			 	 			html+='<span>'+data.items[i].created_at.split(" ")[0]+'</span>';
			 	 			html+='</div>';
			 	 		}
			 	 		html ='<h4 style="height:30px;line-height:30px;font-size:22px;"><img style="height:39px;position:relative;bottom:10px;" src="https://i.guancha.cn/vip-crown.gif?20160614"><a href="https://member.'+bbs_site+'" target="_blank" style="text-decoration:none;">观察员</a></h4>'+html;
			 	 		_postmember.html(html);
 					}
 				}
 			});
 			
 		 	$('body').on('click', '.post-member-href', function(event){
 		        var _user = mylib.getUserDataByCookie();
 		        _that = $(this);
 		        if(!_user){
 			        mylib.login(function() {
 			            window.location.reload(true);
 			        });//弹出登录框
 			        return;
 		        }else{
 		        	var wd = window.open();
 		        	$.get('/api/isvip.htm',{id:_user[0]},function(result){
 		        		result = JSON.parse(result);
 		        		if(result.code==0){
 		        			_mid = _that.parents('.post-member-box').eq(0).attr('data-id');
 		 		        	wd.location.href = 'http://member.'+getRootDomain()+'/post/view?id='+_mid;
 	 		       		}else{
 	 		       			wd.location.href = "https://member."+bbs_site;
 	 		       		}
 		        		return false;
 		        	})
 		        }
 		 	})
 		}
 	})();
 	
 	//正文右侧观会员
 	(function(){
 		var _memberright = $('.post-member-right');
 		var bbs_site = getRootDomain();
 		if(_memberright.length>0){
 			$.ajax({ 
 				url: "/api/member.htm", 
 				type:'GET',
 				dataType: 'json', 
 				success: function(data){
 					if(data.code==0){
 	 					//观察聚焦
 				 		max = data.items.length;
 				 		var html ='';
			 	 		for(var i=0;i<max;i++){
			 	 			_title = data.items[i].title;
			 	 			if(data.items[i].title.length>29) _title = data.items[i].title.substr(0,29)+"...";
			 	 			html+='<div class="member-right-box">';
			 	 			html+='<div class="member-right-column"><a href="https://member.'+bbs_site+'/column/'+data.items[i].column_id.toLowerCase()+'" target="_blank"><img src="'+data.items[i].icon+'"></a><a href="https://member.'+bbs_site+'/column/'+data.items[i].column_id.toLowerCase()+'" target="_blank">'+data.items[i].column+'</a></div>';
			 	 			html+='<a href="https://member.'+bbs_site+'/post/view?id='+data.items[i].id+'" target="_blank" onclick="return false"><img src="'+data.items[i].big_pic+'" alt="" width="100"></a>'
			 	 			html+='<div class="member-right-box-right">';
			 	 			html+='<a href="https://member.'+bbs_site+'/post/view?id='+data.items[i].id+'" target="_blank" onclick="return false" class="member-right-title">'+_title+'</a>';
			 	 			html+='<span>评论 '+data.items[i].comment_num+'</span>';
			 	 			html+='</div></div>';
			 	 		}
			 	 		html = '<div class="member-right-header"><a style="float:none" href="//member.guancha.cn" target="_blank"><span style="font-size:22px;color:#000">&nbsp;&nbsp;&nbsp;观察员 · 最新</span></a><img src="https://i.guancha.cn/vip-crown.gif?te"><a href="//member.guancha.cn" target="_blank">查看全部</a></div><div>'+html+'</div>';
			 	 		_memberright.html(html);
 					}
 				}
 			});
 			
 		 	$('body').on('click', '.member-right-box a', function(event){
 		 		var _user = mylib.getUserDataByCookie();
 		 		_that = $(this);
 		        if(!_user){
 			        mylib.login(function() {
 			            window.location.reload(true);
 			        });//弹出登录框
 			        return false;
 		        }else{
 		        	var wd = window.open();
 		        	$.get('/api/isvip.htm',{id:_user[0]},function(result){
 		        		result = JSON.parse(result);
 		        		if(result.code==0){
 		        			wd.location.href = _that.attr('href');
	 		       		}else{
	 		       			wd.location.href = "https://member."+bbs_site;
	 		       		}
 		        		return false;
 		        	})
 		        }
 		 	})
 		}
 	})();
 	
 	//正文推荐观会员 
 	(function(){
 		var _memberrecommend = $('#member-recommend');
 		var bbs_site = getRootDomain();
 		if(_memberrecommend.length>0){
 			$.ajax({ 
 				url: "/api/memberrecommend.htm", 
 				type:'GET',
 				dataType: 'json', 
 				success: function(data){
 					if(data.code==0){
 	 					//观察聚焦
 				 		max = data.items.length;
 				 		var _html ='';
			 	 		for(var i=0;i<max;i++){
			 	 			_title = data.items[i].title;
			 	 			if(data.items[i].title.length>29) _title = data.items[i].title.substr(0,29)+"...";
			 	 			_html+='<div class="member-right-box">';
			 	 			_html+='<div class="member-right-column"><a href="https://member.'+bbs_site+'/column/'+data.items[i].column_id.toLowerCase()+'" target="_blank"><img src="'+data.items[i].column_ava+'"></a><a href="https://member.'+bbs_site+'/column/'+data.items[i].column_id.toLowerCase()+'" target="_blank">'+data.items[i].column+'</a></div>';
			 	 			_html+='<a href="https://member.'+bbs_site+'/post/view?id='+data.items[i].id+'" onclick="return false" target="_blank"><img src="'+data.items[i].big_pic+'" alt="" width="100"></a>'
			 	 			_html+='<div class="member-right-box-right">';
			 	 			_html+='<a href="https://member.'+bbs_site+'/post/view?id='+data.items[i].id+'" onclick="return false" target="_blank" class="member-right-title">'+_title+'</a>';
			 	 			_html+='<span>评论 '+data.items[i].comment_num+'</span>';
			 	 			_html+='</div></div>';
			 	 		}
			 	 		_html = '<div class="member-right-header"><a style="float:none" href="//member.guancha.cn" target="_blank"><span style="font-size:22px;color:#000">&nbsp;&nbsp;&nbsp;观察员 · 推荐</span></a><img src="https://i.guancha.cn/vip-crown.gif?te"><a href="//member.guancha.cn" target="_blank">查看全部</a></div><div>'+_html+'</div>';
			 	 		_memberrecommend.html(_html);
 					}
 				}
 			});
 		}
 	})();
 	
 	//热点
 	(function(){
 		var _fastNews = $('#news-index-redian');
 		if(_fastNews.length>0){
 			$.ajax({ 
 				url: "/api/redian.htm", 
 				type:'GET',
 				dataType: 'json', 
 				success: function(data){
 					if(data.code==0){
 	 					//观察聚焦
 	 					var _html = getNewsFocusHtml(data.items);
 	 					$('#news-index-redian').html(_html);
 					}
 				}
 			});
 		}
 	})();
 	
 	//风闻最热
 	(function(){
 		var _fengwenNews = $('#post-fengwen-hot');
 		var bbs_site = getRootDomain();
 		if(_fengwenNews.length>0){
 			$.ajax({ 
 				url: "/api/fengwenhot.htm", 
 				type:'GET',
 				dataType: 'json', 
 				success: function(data){
 					if(data.code==0){
 	 					//观察聚焦
 				 		max = data.items.length;
 				 		var html ='';
			 	 		for(var i=0;i<max;i++){
			 	 			if(data.items[i].pic!=null&&data.items[i].pic!=''){
				 	 			question = data.items[i].pic.indexOf('?');
				 	 			if(question>-1){
				 	 				image = data.items[i].pic.substring(0,question);
				 	 			}else{
				 	 				image = data.items[i].pic
				 	 			}
			 	 			}else{
			 	 				image = '';
			 	 			}
			 	 			
                        	if(i==0) html+='<div class="fenwen24-box" style="border:0px;">'
                        	else html+='<div class="fenwen24-box">'
			 	 			html+='<a href="//user.'+bbs_site+'/main/content?id='+data.items[i].id+'&s=zwyess" target="_blank">'
			 	 			if(image!='') html+='<img src="'+image+'?imageMogr2/crop/!80x80" alt="">'
			 	 			else html+='<img src="https://i.guancha.cn/24fengwen_default.jpg?imageMogr2/crop/!80x80&210190418" alt="">'
			 	 			if(i==0) html+='<div class="fenwen24-sankaku" style="border-color:transparent #bf232a"><span>1</span></div>'
			 	 			else if(i==1) html+='<div class="fenwen24-sankaku" style="border-color:transparent #ea5a23"><span>2</span></div>'
			 	 			else if(i==2) html+='<div class="fenwen24-sankaku" style="border-color:transparent #f39834"><span>3</span></div>'
			 	 			else html+='<div class="fenwen24-sankaku"><span>'+(parseInt(i)+1)+'</span></div>'
                        	html+='</a>';
                        	html+='<div class="fenwen24-box-right">'
                        	html+='<a href="//user.'+bbs_site+'/main/content?id='+data.items[i].id+'&s=zwyess" target="_blank" class="fenwen24-title">'+data.items[i].title+'</a>'
                        	html+='<span>评论 '+data.items[i].comment_num+'&nbsp;&nbsp;&nbsp;赞 '+data.items[i].praise_num+'</span>'
                        	html+='</div></div>'
			 	 		}
 	
 	 					$('#post-fengwen').html(html);
 					}
 				}
 			});
 		}
 	})();
 	
 	//视频最新
 	(function(){
 		var _fengwenNews = $('#post-shipin-zuixin');
 		var bbs_site = getRootDomain();
 		if(_fengwenNews.length>0){
 			$.ajax({ 
 				url: "/api/shipin.htm", 
 				type:'GET',
 				dataType: 'json', 
 				success: function(data){
 					if(data.code==0){
 	 					//观察聚焦
 				 		max = data.items.length;
 				 		var html ='';
			 	 		for(var i=0;i<max;i++){
			 	 			if(i%2==0){
			 	 				html+='<div class="latest-video-box" style="padding-right:20px;">'
			 	 			}else{
			 	 				html+='<div class="latest-video-box">'
			 	 			}
			 	 			html+='<a href="'+data.items[i].HTTP_URL+'?s=zwyzxsp" target="_blank">'
			 	 			if(data.items[i].PREVIEW_M !=''){
			 	 				html+='<img src="'+data.items[i].PREVIEW_M+'" width="185px" height="134px">'
			 	 			}else{
			 	 				html+='<img src="https://i.guancha.cn/default.jpg" width="185px" height="134px">'
			 	 			}
	                	    html+='<span>'+data.items[i].TITLE+'</span>'
	                	    html+='</a></div>'
			 	 		}
 	
 	 					$('#post-shipin').html(html);
 					}
 				}
 			});
 		}
 	})();
 	
 	//正文页电商
 	(function(){
 		var _ecommerceBox = $('#ecommerce-post');
 		if(_ecommerceBox.length>0){
 			$.ajax({ 
 				url: "/api/ecommerce_post.htm", 
 				type:'GET',
 				dataType: 'json', 
 				success: function(data){
 					if(data.code==0){ 
 	 					//观察聚焦
 				 		max = data.items.length;
 				 		var html ='';
 				 		html+='<div class="ecommerce-post-slide">';
			 	 		for(var i=0;i<max;i++){
			 	 			if((i+1)%3==1) html+='<ul><li>';
			 	 			else html+='<li style="margin-left:13px;">'
			 	 			html+='<div class="ecommerce-post-box-img"><a href="'+data.items[i].link+'" target="_blank">';
			 	 			html+='<img src="'+data.items[i].img+'" alt="'+data.items[i].title+'"></a></div>';
			 	 			html+='<div class="ecommerce-post-box-info">';
			 	 			html+='<a href="'+data.items[i].link+'" target="_blank"><h4>'+data.items[i].title+'</h4></a>';
			 	 			html+='<div class="ecommerce-post-boxinbox"><span class="ecommerce-post-box-price"><i>￥</i>'+data.items[i].price+'</span><span class="ecommerce-post-box-orgprice">原价: '+data.items[i].org_price+'</span></div>';
			 	 			html+='<a class="ecommerce-post-buy" href="'+data.items[i].link+'" target="_blank">点击购买</a>';
			 	 			html+='</div></li>';
			 	 			if((i+1)%3==0||i+1==max) html+='</ul>';
			 	 		}
			 	 		html+='</div>';
			 	 		if(max>3){
			 	 			html+='<div class="ecommerce-post-jumper">';
			 	 			jumper = Math.ceil(max/3);
			 	 			for(j=0;j<jumper;j++){
			 	 				j==0?html+='<i class="active"></i>':html+='<i></i>';
			 	 			}
			 	 			html+='</div>';
			 	 		}
 	
			 	 		_ecommerceBox.html(html);
			 	 		
			 	 		var _ecommerceBox_timer = setInterval(function(){
			 	 			_ecommerceBox_index = $('.ecommerce-post-jumper').find('.active').index();
			 	 			(_ecommerceBox_index+1<$('.ecommerce-post-jumper i').length)?move=-((_ecommerceBox_index+1)*770):move=0;
			 	 			$('.ecommerce-post-slide').animate({left:move},260);
			 	 			$('.ecommerce-post-jumper i').removeClass('active');
			 	 			(_ecommerceBox_index+1<$('.ecommerce-post-jumper i').length)?_ecommerceBox_index++:_ecommerceBox_index=0;
			 	 			$('.ecommerce-post-jumper i').eq(_ecommerceBox_index).addClass('active');
		 	 			}, 5000);
			 	 		
			 	 		_ecommerceBox.mouseenter(function(){
							clearInterval(_ecommerceBox_timer);
						});
			 	 		_ecommerceBox.mouseleave(function(){
			 		        _ecommerceBox_timer = setInterval(function(){
				 	 			_ecommerceBox_index = $('.ecommerce-post-jumper').find('.active').index();
				 	 			(_ecommerceBox_index+1<$('.ecommerce-post-jumper i').length)?move=-((_ecommerceBox_index+1)*770):move=0;
				 	 			$('.ecommerce-post-slide').animate({left:move},260);
				 	 			$('.ecommerce-post-jumper i').removeClass('active');
				 	 			(_ecommerceBox_index+1<$('.ecommerce-post-jumper i').length)?_ecommerceBox_index++:_ecommerceBox_index=0;
				 	 			$('.ecommerce-post-jumper i').eq(_ecommerceBox_index).addClass('active');
			 	 			}, 5000);
						});
			 	 		
			 		    $(document).on('click','.ecommerce-post-jumper i',function(){
			 		        if(!$(this).hasClass('active')){
			 		            $('.ecommerce-post-jumper i').removeClass('active');
			 		            $(this).addClass('active');
			 		            move=-($('.ecommerce-post-jumper i').index(this)*770);
			 		            $('.ecommerce-post-slide').animate({left:move},260);
			 		        }
			 		    });
 					}
 				}
 			});
 		}
 	})();
 	

 	(function(){ 
 		var newsFocus = $('#news-focus');
 		var newsIndexfocus = $('#news-index-focus');
 		if(newsFocus.length>0||newsIndexfocus.length>0){
 			$.ajax({
 	 			url:'/api/gundong.htm',
 	 			type:'GET',
 	 			dataType:'json',
 	 			success:function(data){
 	 				if(data.code==0){
 	 					var _html = getNewsFocusHtml(data.items);
 	 					if(newsFocus.length>0) newsFocus.html(_html);
 	 					if(newsIndexfocus.length>0) newsIndexfocus.html(_html);
 	 				}
 	 			}
 	 		});
 		}
 	})();
 	
 	//获取观察聚焦的HTML
 	function getNewsFocusHtml(item){
 		var arr=new Array;
 		var num=item.length;
 		for(var i=0;i<num;i++){
 			arr[i]=i;
 		}
 		arr.sort(function(){ return 0.5 - Math.random(); }); 
 		
 		max = num;
 		var html ='';
 		if($('#news-focus-post').length>0){
 			max=8;
 			html+='<ul class="kuaixun-new-content">'
 	 		for(var i=0;i<max;i++){
 	 			html+='<li><a href="'+item[arr[i]].HTTP_URL+'?s=zwykx" title="'+item[arr[i]].TITLE+'" target="_blank">'+item[arr[i]].TITLE+'</a></li>';
 	 		}
 			html+='</ul>'
 		}else{
 	 		for(var i=0;i<max;i++){
 	 			html+='<div class="resemble-art-black c_hidden"><a target="_blank" href="'+item[arr[i]].HTTP_URL+'?s=syyldbkx">'+item[arr[i]].TITLE+'</a></div>';
 	 		}
 		}
 		return html;
 	}
	
	(function(){
		//更改背景
		var _cookie_key = 'guancha_bg';
		var arr,reg=new RegExp("(^| )"+_cookie_key+"=([^;]*)(;|$)");
		
		var __url = window.location.href;
	    var __url_referer = __url.match(/(\/\d\d\d\d_\d\d_\d\d_\d+_((\d+)|(\w|\d)))|(\/\d\d\d\d_\d\d_\d\d_\d+)/i);
	    var rt = 0 ;
	    if(__url_referer!=null) rt = __url_referer[0].split('_')[3];

		if(arr=document.cookie.match(reg)){
			//更改背景为经典色
			$('body').css('background-color','#fcfbf0');
			$('.module-news').css('background-color','#fcfbf0');
			$('.gc-comment').css('background-color','#fcfbf0');
			if(rt!=0) $('.nav').css('background-color','#fcfbf0');
		}
				
		$('.Share_button_bg,.changColer').click(function(){
			if(arr=document.cookie.match(reg)){
				$('body').css('background-color','');
				$('.module-news').css('background-color','#fff');
				$('.gc-comment').css('background-color','#fff');
				if(rt!=0) $('.nav').css('background-color','#fff');
				//移除cookie
				var exp = new Date();
				exp.setTime(exp.getTime() - 1);
				document.cookie= _cookie_key + '=1;expires='+exp.toGMTString()+';path=/';
			}else{				
				$('body').css('background-color','#fcfbf0');
				$('.module-news').css('background-color','#fcfbf0');
				$('.gc-comment').css('background-color','#fcfbf0');
				if(rt!=0) $('.nav').css('background-color','#fcfbf0');
				document.cookie= _cookie_key + '=1;path=/';
			}
		});
		
		$(".member_recruit_close").click(function(){
			$(".member_recruit_index").hide();
		})
	})();
	
	(function(){
		// 判断是否移动客户端
		var _cookie_key = 'guancha_iswap';
		var arr,reg=new RegExp("(^| )"+_cookie_key+"=([^;]*)(;|$)");
		var domain = location.host;
		var browser = {
			versions : function() {
				var u = navigator.userAgent, app = navigator.appVersion, iswap = true;
				if (arr=document.cookie.match(reg))
					iswap = false;
				else if(domain.indexOf('user.')>-1){
					iswap = false;
				}
				else {
					var url = window.location.href;
					if (url.indexOf("?web") > -1) {
						document.cookie= _cookie_key + '=1';
						iswap = false;
					}
				}
				return {
					mobile : !!u.match(/AppleWebKit.*Mobile.*/)	|| !!u.match(/AppleWebKit/), // 是否为移动终端
					android : u.indexOf('Android') > -1, // android终端或者uc浏览器
					iPhone : u.indexOf('iPhone') > -1, // 是否为iPhone
					iswap : iswap
				};
			}()
		}
		if ((browser.versions.android || browser.versions.iPhone)&& browser.versions.iswap) {
			var url = window.location.href;
			var array = url
					.match(/([^\/]+)\/([\d]{4})_([\d]{2})_([\d]{2})_(\d+)_(\w*).shtml$/);
			if (array != null && array.length >= 6)
				url = "http://m."+getRootDomain()+"/" + array[1] + "/" + array[2] + "_"+ array[3] + "_" + array[4] + "_" + array[5];
			else
				url = url.replace("www."+getRootDomain(), "m."+getRootDomain()).replace("/_\w\.shtml/g",	"").replace("index", "").replace("list_1", "").replace("_mc","");
			window.location.href = url;
		}
		
	})();
	
	(function(){
		//调整字体大小
		$('.ft-s').on('click',function(){
	 		$content=$(this).parent().parent().nextAll('.content');
	 		$content.css('fontSize','14px');
	 	});
	 	$('.ft-zc').on('click',function(){
	 		$content=$(this).parent().parent().nextAll('.content');
	 		$content.css('fontSize','16px');
	 	});
	 	$('.ft-b').on('click',function(){
	 		$content=$(this).parent().parent().nextAll('.content');
	 		$content.css('fontSize','18px');
	 	});
	})();

	//图片懒加载
	(function(){
		if($('.index-content').length>0){
			setTimeout(function(){$('img.lazy').lazyload({
		        failure_limit: 300
		    })}, 300);
		}
	})();
	
	//打赏
 	(function(){
 		var randstamp=new Date().getTime().toString()+Math.floor(Math.random()*10000);
 		var _tipbox = $('.tip-box-user ul');
 		var bbs_site = getRootDomain();
 		if(_tipbox.length>0){
 			$.ajax({ 
 				url: "/api/tipped.htm?"+randstamp, 
 				type:'GET',
 				dataType: 'json', 
 				success: function(data){
 					if(data.code==0){
 				 		max = data.items.length;
 				 		var html ='';
			 	 		for(var i=0;i<max;i++){
			 	 			html +='<li><a target="_blank" href="http://user.'+bbs_site+'/user/personal-homepage?uid='+data.items[i].id+'"><img src="'+data.items[i].user_photo+'"></a></li>';
			 	 		}
			 	 		_tipbox.html(html);
			 	 		$('.tip-box-count').html('已有<span id="tip-total">'+data.count+'</span>人赞赏支持<i></i>')
 					}
 				}
 			});
 		}
 	})();
 	
	$(".tip-box-shang").click(function(){
		var bbs_site = getRootDomain();
		if(!($('.tip-menu').length>0)){
			var _user = mylib.getUserDataByCookie();
		        _that = $(this);
		        if(!_user){
			        mylib.login(function() {
			            window.location.reload(true);
			        });//弹出登录框
			        return;
		        }else{
		        	$.post('/api/gettip.htm',{},function(re){
		        		tips = JSON.parse(re);
		        		if(tips.code!=0) return false;
			        	$.get('/api/isvip.htm',{id:_user[0]},function(result){
			        		result = JSON.parse(result);
			        		result.code==0?isvip=1:isvip=0;
			        		_html = "";
		        			_html += '<div class="tip-menu">';
		    				_html += '<div class="tip-mask"></div>';
							_html += '<div class="tip-menu-box">';
							_html += '<p>支持观察者网</p>';
							_html += '<div class="tip-menu-user">';
							_html += '<img class="tip-menu-avatar" src="'+$('.avatar img').attr('src')+'"/>';
							_html += '<span>'+decodeURIComponent(_user[1])+'</span>';
							if(isvip) _html += '<img class="tip-menu-member" src="https://user.guancha.cn/static/imgs/member-long.png?20190708"/>';
							_html += '</div>';
							max = tips.data.length;j = 0;
							_html += '<div class="tip-menu-price">';
							for(var i=0;i<max;i++){
								if(j==0) _html += '<ul>';
								j==1?center=' class="center"':center='';
								tips.data[i].amount=='其他金额'?_html+='<li amount="" product="-1" type="other"'+center+'>其他金额':_html+='<li amount="'+tips.data[i].amount+'" product="'+tips.data[i].id+'"  type="default"'+center+'>'+tips.data[i].amount+'元';
								_html+='</li>';
								if(j==2){
									_html += '</ul>';
									j=0;
								}else{
									if((parseInt(i)+1)==max) _html += '</ul>';
									j++;
								}
							}
							_html += '</div>';
							_html += '<div class="tip-menu-channel">';
							_html += '<div class="row"><img src="https://i.guancha.cn/weixin-icon.png"/><label>微信</label><a type="4" class="tip-menu-uncheck" href="javascript:;"></a></div>';
							_html += '<div class="row"><img src="https://i.guancha.cn/alipay-icon.png"/><label>支付宝</label><a type="1" class="tip-menu-uncheck" href="javascript:;"></a></div>';
							_html += '</div>';
							_html += '<div class="tip-menu-confirm">确认支付</div>';
							_html += '</div></div>';
							_html += '<form action="https://member.'+bbs_site+'/user/pay" id="formPay" method="post">';
							_html += '<input type="hidden" name="productId" value="">';
							_html += '<input type="hidden" name="productType" value="6">';
							_html += '<input type="hidden" name="productName" value="打赏观察者网">';
							_html += '<input type="hidden" name="productPrice" value="">';
							_html += '<input type="hidden" name="payChannel" value="">';
							_html += '<input type="hidden" name="payAmount" value="">';
							_html += '<input type="hidden" name="clientType" value="PC">';
							_html += '<input type="hidden" name="codeId" value="'+_DOC_ID+'">';
							_html += '<input type="hidden" name="codeType" value="1">';
							_html += '</form>';
							$('body').append(_html);
							$('.tip-menu-member').css('padding-left',parseInt(48)+10+parseInt($('.tip-menu-user span').css('width'))+'px');
			        	})
		        	})
		        }
		}else{
			$('.tip-menu').show();
		}
	})
	
	$(document).on('click', '.tip-mask', function(event) {
		$('.tip-menu').hide();
		$('.tip-detail').hide();
	})
	
	$(document).on('click', '.tip-menu-price li', function(event) {
		if($(this).attr('type')=='other'){
			$('.tip-menu-price li').removeClass('selected');
			amount = parseInt($(this).text());
			$(this).html('<input type="number" value="'+amount+'">元');
			$('.tip-menu-price input').focus();
		}else{
			$('.tip-menu-price li').removeClass('selected');
			$(this).addClass('selected');
			if($('.tip-menu-check').length>0){
				$('.tip-menu-confirm').addClass('active');
			}else{
				$('.tip-menu-confirm').removeClass('active');
			}
			
			$("input[name=productId]").val($(this).attr('product'))
			$("input[name=productPrice]").val($(this).attr('amount'))
			$("input[name=payAmount]").val($(this).attr('amount'))
		}
	})
	
	$(document).on('blur', '.tip-menu-price input', function(event) {
		if(!(/(^[1-9]\d*$)/.test($(this).val()))){
			if(parseInt($(this).val())!='NaN'&&parseInt($(this).val())!=0) $(this).val(parseInt($(this).val()));
			else $(this).val(1);
		}
		$(this).val()==''?amount=1:amount=$(this).val();
		$(this).closest('li').text(amount+'元').addClass('selected');
		if($('.tip-menu-check').length>0){
			$('.tip-menu-confirm').addClass('active');
		}else{
			$('.tip-menu-confirm').removeClass('active');
		}
		$("input[name=productId]").val(-1)
		$("input[name=productPrice]").val(amount)
		$("input[name=payAmount]").val(amount)
	})
	$(document).on('click', '.tip-menu-price input', function(event) {
		return false;
	})
	
	$(document).on('keydown', '.tip-menu-price input', function(event) {
		if(event.keyCode==13||event.keyCode==108) $(this).blur();
		if($(this).val().length>=6&&event.keyCode!=8&&event.keyCode!=46) return false;
		if(event.keyCode==109||event.keyCode==110||event.keyCode==189||event.keyCode==190||event.keyCode==229) return false;
	})
	
	$(document).on('click', '.tip-menu-channel a', function(event) {
		$('.tip-menu-channel a').removeClass('tip-menu-check');
		$(this).addClass('tip-menu-check');
		if($('.tip-menu-price .selected').length>0){
			$('.tip-menu-confirm').addClass('active');
		}else{
			$('.tip-menu-confirm').removeClass('active');
		}
		$("input[name=payChannel]").val($(this).attr('type'))
	})
	
	$('.tip-box-count').click(function(){
		var bbs_site = getRootDomain();
		if(!($('.tip-detail').length>0)){
			var _user = mylib.getUserDataByCookie();
	        _that = $(this);
	        if(!_user){
		        mylib.login(function() {
		            window.location.reload(true);
		        });//弹出登录框
		        return;
	        }else{
	        	var randstamp=new Date().getTime().toString()+Math.floor(Math.random()*10000);
				$.post('/api/tipdetail.htm?'+randstamp,{time:''},function(e){
		    		result = JSON.parse(e);
		    		if(result.code==0){
			    		_html = "";
						_html += '<div class="tip-detail">';
						_html += '<div class="tip-mask"></div>';
						_html += '<div class="tip-detail-box">'; 
						_html += '<div class="tip-detail-header">'+$('#tip-total').text()+'人赞赏了观察者网</div>';
						max = result.items.length;
						if(max>6) _html += '<ul style="overflow-y:scroll">';
						else _html += '<ul>';
						for(var i=0;i<max;i++){
							if(i==0) _html += '<li class="first" time="'+result.items[i].pay_time+'">';
							else _html += '<li time="'+result.items[i].pay_time+'">';
							_html += '<a target="_blank" href="http://user.'+bbs_site+'/user/personal-homepage?uid='+result.items[i].user_id+'"><img src="'+result.items[i].user_photo+'"></a>';
							_html += '<div class="tip-detail-user"><div>';
							_html += '<a target="_blank" href="http://user.'+bbs_site+'/user/personal-homepage?uid='+result.items[i].user_id+'"><span class="tip-detail-nick">'+result.items[i].user_nick+'</span></a><span class="tip-detail-shang">赞赏了</span><span class="tip-detail-time">'+result.items[i].time_show+'</span>';
							_html += '</div><div class="tip-detail-title"><i></i><a target="_blank" href="'+result.items[i].url+'">'+result.items[i].title+'</a></div></div></li>';
						}
						_html += '</ul>';
						if(result.count<=20) _html += '<div class="tip-detail-more"></div>';
						else _html += '<div class="tip-detail-more"><span class="tip-show-more">点击加载更多...</span></div>';
						_html += '</div></div>';
						$('body').append(_html);
		    		}else{
		    			return false;
		    		}
				})
	        }
		}else{
			$('.tip-detail').show();
		}
	})
	
	$(document).on('click', '.tip-show-more', function(event) {
		var bbs_site = getRootDomain();
		if($('.tip-detail-box').length>0){
			if($(".tip-detail-box").find('li').last().attr('time')!=undefined) time = $(".tip-detail-box").find('li').last().attr('time');
			else time = '';
			$.post('/api/tipdetail.htm',{time:time},function(e){
	    		result = JSON.parse(e);
	    		if(result.code==0){
					max = result.items.length;
					_html = ''
					for(var i=0;i<max;i++){
						_html += '<li time="'+result.items[i].pay_time+'">';
						_html += '<a target="_blank" href="http://user.'+bbs_site+'/user/personal-homepage?uid='+result.items[i].user_id+'"><img src="'+result.items[i].user_photo+'"></a>';
						_html += '<div class="tip-detail-user"><div>';
						_html += '<a target="_blank" href="http://user.'+bbs_site+'/user/personal-homepage?uid='+result.items[i].user_id+'"><span class="tip-detail-nick">'+result.items[i].user_nick+'</span></a><span class="tip-detail-shang">赞赏了</span><span class="tip-detail-time">'+result.items[i].time_show+'</span>';
						_html += '</div><div class="tip-detail-title"><i></i><a target="_blank" href="'+result.items[i].url+'">'+result.items[i].title+'</a></div></div></li>';
					}
					
					$(".tip-detail-box ul").append(_html);
					if(result.count<=max) $('.tip-detail-more').html('<span>已经到底咯~</span>');
	    		}else{
	    			return false;
	    		}
			})
		}
	})
	
	//分享
	$('.share-block a').click(function(){
		cmd = $(this).attr('data-cmd');
		goShare(cmd,share_options);
	})
	function goShare(cmd,options){
		var shareUrl = '';
	    switch(cmd){
	        case 'tsina':
	            shareUrl = 'http://service.weibo.com/share/share.php?';
	            shareUrl += 'url='+encodeURIComponent(options.url)+'&title='+encodeURIComponent(options.title)+'&pic='+encodeURIComponent(options.pic)+'&searchPic=false';
	        break;
	        case 'weixin':
	        	shareWeixin(options.url);
	        	return false;
	        break;
	        case 'sqq':
	        	shareUrl = 'https://connect.qq.com/widget/shareqq/index.html?';
	        	shareUrl += 'url='+encodeURIComponent(options.url)+'&title='+encodeURIComponent(options.title)+'&pics='+encodeURIComponent(options.pic)+'&summary='+encodeURIComponent(options.summary);
	    	break;
	        case 'qzone':
	            shareUrl = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?';
	            shareUrl += 'url='+encodeURIComponent(options.url)+'&title='+encodeURIComponent(options.title)+'&pics='+encodeURIComponent(options.pic)+'&summary='+encodeURIComponent(options.summary);
	        break;
	        default:
	        	break;
	    }
	    window.open(shareUrl);
	}
	function shareWeixin(url){
		//弹窗
		var str = '';
		str += '<div class="gcshare-win-weixin" style="width:280px;height:340px;padding:10px;">';
		str += '	<div class="bd_weixin_popup_head">';
		str += '		<span>分享到微信朋友圈</span>';
		str += '		<a href="javascript:;" class="gcshare-close">×</a>';
		str += '	</div>';
		str += '	<div class="gcshare-weixin-body" style="text-align:center;padding:15px 10px;">';
		str += '		<div id="gcshareQrcode"></div>';
		str += '	</div>';
		str += '	<div class="bd_weixin_popup_foot" style="font-size:12px;text-align:left;line-height:22px;color: #666;">';
		str += '		打开微信，点击底部的“发现”，<br>使用“扫一扫”功能即可打开网页，分享给微信好友，或分享至朋友圈。';
		str += '	</div>';
		str += '</div>';
		
		//是否加载二维码工具
		if($('#scQrcode').length == 0){
			$('head').append('<script id="scQrcode" src="//user.guancha.cn/static/js/jquery.qrcode.min.js"><\/script>');
		}
		
		if($('.gcshare-win-weixin').length==0){
			$('body').append(str);
		}
		
		$(document).on('click','.gcshare-close',function(){
			$('.gcshare-win-weixin').remove();
		});
		
		if(typeof($('#gcshareQrcode').qrcode) == 'undefined'){
			var timer1 = setInterval(function(){
				if(typeof($('#gcshareQrcode').qrcode) != 'undefined'){
					$('#gcshareQrcode').qrcode({
	    	    	    render: "canvas", 
	    	    	    width: 200,
	    	    	    height: 200,
	    	    	    text: url
	    	    	});
					window.clearTimeout(timer1);
				}
			},100);
		}else{
			$('#gcshareQrcode').qrcode({
	    	    render: "canvas", 
	    	    width: 200,
	    	    height: 200,
	    	    text: url
	    	});
		}
	}
 })(window, undefined);