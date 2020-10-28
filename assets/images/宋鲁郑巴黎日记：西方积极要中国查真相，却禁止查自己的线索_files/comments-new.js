//评论
(function(mylib){
	var URL = mylib.getUrl('user');//接口域名
	var API_CMT_LIST = URL + '/comment/cmt-list',//评论列表
		API_HOT_CMT_LIST = URL + '/comment/hot-cmt-list'; //热门评论列表
		API_MEMBER_CMT_LIST = URL + '/comment/member-cmt-list'; //会员评论列表
		API_RECOMMEND_CMT_LIST = URL + '/comment/recommend-cmt-list'; //推荐评论列表
		API_CMT_ALLFLOOR = URL + '/comment/all-floor',//全部楼层
		API_CMT_PRAISE = URL + '/comment/praise'; //赞
		API_CMT_COLLECTION = URL + '/comment/collection'; //收藏
		API_CMT_TOP = URL + '/comment/top'; //将评论置顶
		API_CMT_CANCEL_TOP = URL + '/comment/cancel-top'; //取消评论置顶
		API_CMT_TREAD = URL + '/comment/tread';
		API_CMS_REPORT = URL + '/comment/report-comment';//举报
	    API_CMT_POST = URL + '/comment/post';//提交评论
		API_CMT_GET_COMMENT_PAGE = URL + '/comment/get-comment-page';	//获取评论所在页码
		API_CMT_RECOMMEND = URL + '/comment/recommend';	//推荐评论
		API_TO_POST = URL + '/comment/to-post';	//到推荐评论生成的文章
	var cmt = {
			isPc:true,//是否PC端
			enable: true,//是否允许评论
			codeId:0,
			codeType:0,
			pageCount: 1,//页码
			hotPageCount : 1,
			memberCommentPageCount : 1,
			replyEdit:false,//回复编辑器
			isTread:1,//是否允许踩
			user:{},//当前用户信息
			authorId:0,
			canComment : 1, //状态1下面才能发表评论
			picAllow : true, //评论允许发图
			//初始化评论
			init:function(){
				cmt.isPc = !mylib.detectmob();
				cmt.loadCmt(true,1,1);
	            //初始化事件
	            cmt.initEvent();
	            cmt.zoomImg();
	            cmt.fold();
	            cmt.fixComment();
			},
			//加载热门评论
			loadHot:function(pageNo){
				//评论框容器
	        	var container = $('#comments-container');
	            if (container.length == 0) return;
	            
	            //请求参数
	            cmt.codeId = container.data('id');
	            cmt.codeType = container.data('type');
	            if(cmt.codeType == 2){
	            	cmt.authorId = container.data('authorid');
	            }
	            var host =  window.location.host;
				host = host.split('.');
	            
	            //请求评论数据
	            cmt.get(API_HOT_CMT_LIST+(isLogin==false?'.json':''),{codeId:cmt.codeId,codeType:cmt.codeType,pageNo:pageNo,ff:host[0]},function(res){
	            	
	            	if(res.code != 0)  return;//数据请求出错
	            	
	            	if(res.status==3) return;//关闭评论
	            	
	            	cmt.isTread = res.tread;//是否允许踩
	            	
            		cmt.hotPageCount = Math.ceil(res.count/10);
	            	//用户信息
	            	cmt.user={id:res.user.id,pic:res.user.pic};
	            	
	            	
	            	var strAll = cmt.cmtList(res.items, 'hot');	//拼接数据
	            	$('.list-hot-body-all').empty().html(strAll);
	            	
	            	cmt.pagination(pageNo, cmt.hotPageCount, $('#comments-container .pagination-hot'));//加载热门评论分页
	            	
	            });
			},
			//加载会员评论
			loadMemberComment:function(pageNo){
				//评论框容器
	        	var container = $('#comments-container');
	            if (container.length == 0) return;
	            
	            //请求参数
	            cmt.codeId = container.data('id');
	            cmt.codeType = container.data('type');
	            if(cmt.codeType == 2){
	            	cmt.authorId = container.data('authorid');
	            }
	            var host =  window.location.host;
				host = host.split('.');
	            
	            //请求评论数据
	            cmt.get(API_MEMBER_CMT_LIST+(isLogin==false?'.json':''),{codeId:cmt.codeId,codeType:cmt.codeType,pageNo:pageNo,ff:host[0]},function(res){
	            	
	            	if(res.code != 0)  return;//数据请求出错
	            	
	            	if(res.status==3) return;//关闭评论
	            	
	            	cmt.isTread = res.tread;//是否允许踩
	            	
            		cmt.memberCommentPageCount = Math.ceil(res.count/3);
	            	//用户信息
	            	cmt.user={id:res.user.id,pic:res.user.pic};
	            	
	            	
	            	var strAll = cmt.cmtList(res.items);	//拼接数据
	            	$('.list-member-body-all').empty().html(strAll);
	            	
	            	cmt.pagination(pageNo, cmt.memberCommentPageCount, $('#comments-container .pagination-member'));//加载热门评论分页
	            	
	            });
			},
			//加载推荐评论
			loadRecommendComment:function(pageNo){
				//评论框容器
	        	var container = $('#comments-container');
	            if (container.length == 0) return;
	            
	            //请求参数
	            cmt.codeId = container.data('id');
	            cmt.codeType = container.data('type');
	            if(cmt.codeType == 2){
	            	cmt.authorId = container.data('authorid');
	            }
	            var host =  window.location.host;
				host = host.split('.');
	            
	            //请求评论数据
	            cmt.get(API_RECOMMEND_CMT_LIST+(isLogin==false?'.json':''),{codeId:cmt.codeId,codeType:cmt.codeType,pageNo:pageNo,ff:host[0]},function(res){
	            	
	            	if(res.code != 0)  return;//数据请求出错
	            	
	            	if(res.status==3) return;//关闭评论
	            	
	            	cmt.isTread = res.tread;//是否允许踩
	            	
            		cmt.recommendCommentPageCount = Math.ceil(res.count/10);
	            	//用户信息
	            	cmt.user={id:res.user.id,pic:res.user.pic};
	            	
	            	
	            	var strAll = cmt.cmtList(res.items);	//拼接数据
	            	$('.list-recommend-body-all').empty().html(strAll);
	            	
	            	cmt.pagination(pageNo, cmt.recommendCommentPageCount, $('#comments-container .pagination-recommend'));//加载推荐评论分页
	            	
	            });
			},
			//加载评论
			loadCmt:function(isFirst,pageNo,order){
				//评论框容器
	        	var container = $('#comments-container');
	            if (container.length == 0) return;
	            
	            //请求参数
	            cmt.codeId = container.data('id');
	            cmt.codeType = container.data('type');
	            if(cmt.codeType == 2){
	            	cmt.authorId = container.data('authorid');
	            }
	            var host =  window.location.host;
				host = host.split('.');
	            
	            //请求评论数据
	            cmt.get(API_CMT_LIST+(isLogin==false?'.json':''),{codeId:cmt.codeId,codeType:cmt.codeType,pageNo:pageNo,order:order,ff:host[0]},function(res){
	            	
	            	if(res.code != 0)  return;//数据请求出错
	            	
	            	if(res.status==3) return;//关闭评论
	            	
	            	cmt.isTread = res.tread;//是否允许踩
	            	cmt.picAllow = res.pic_allow;	//评论是否允许发图
            		cmt.pageCount =Math.ceil(res.count/20);
	            	
	            	//用户信息
	            	cmt.user={id:res.user.id,pic:res.user.pic};
	            	
	            	if(isFirst){
	            		
	            		cmt.hotList(res.hots, res.all_hot_count, res.count);		//热门评论
		            	//cmt.memberCommentList(res.member_comment, res.all_member_comment_count);		//会员评论
		            	cmt.recommendCommentList(res.recommend_comment, res.all_recommend_comment_count);		//推荐评论
		            	//如果返回状态为2 或者是m站
		            	
		            	if(res.status == 2) {
		            		cmt.enable = false;
		            	}else{
		            		if(false == mylib.detectmob()){
		            			//评论框
			            		if(cmt.enable){
			            		    _temp_ = document.domain.split(".");
			            		    _hostName_ = _temp_[0];
			            		    /* 我要评论上方广告
			            		    if(_hostName_ == 'www'){
			            		    	if(_AD_SWITCH=="1") container.append('<iframe src="https://www.guancha.cn/other/adcmt.shtml" width="790px;" style="position:relative;top:40px;right:5px;"></iframe>');
			            		    }
			            		    */
				            		container.append('<h3 class="tab-control-header">我要评论</h3>');
				            		var cmtTopPic = 'https://i.guancha.cn/static/imgs/default_user_pic.png?imageMogr2/thumbnail/38x38';
				            		var navAvatar = $('.user-nav').find('.avatar').find('img');
				            		if(navAvatar.length > 0){
										cmtTopPic = navAvatar.prop('src');
				            		}
				            		//container.append('<div class="cmt-top-pic"><img src="'+cmt.user.pic+'" /></div>');
				            		container.append('<div class="cmt-top-pic"><img src="'+ cmtTopPic +'" /></div>');
				            		cmt.createEditor(container,'mainUE',true,0);
			            		}
			            		
			            		//描述
			            		var str = '';
			            		str += '<div class="cmt-desc">';
			            		str += '	<a class="zhidu" target="_blank" href="//www.guancha.cn/broken-news/2017_03_28_400912.shtml">观察者网用户管理制度</a>';
			            		str += '	<a class="go-center" href="//user.guancha.cn" target="_blank">逛社区</a>';
			            		str += '	<a class="go-post" target="_blank"  href="//user.guancha.cn/post/index">有料？来写文章</a>';
			            		str += '</div>';
			            		str += '<div class="clear"></div>';
			            		container.append(str);
		            		}
		            		
		            	}
		            	
		            	//评论数
		                $('.other-box>.comment>#count2').text(res.count);
		            	
		            	var strAll = cmt.allList(res.items,res.count,res.all_hot_count);
	            		container.append(strAll);
	            		$('.cmt-open-app').click(function(){
							cmt.mobileAppInstall().open();
							return false;
						});
	            		container.append('<div class="pagination pagination-normal clearfix"></div>');
	            	}else{
	            		//全部评论
	            		var strAll = cmt.cmtList(res.items, 'all');
	            		$('.list-body-all').empty().html(strAll);
	            	}
	            	
	            	cmt.pagination(pageNo, cmt.pageCount, $('#comments-container .pagination-normal'));//加载普通评论分页
	                _user = mylib.getUserDataByCookie();
	                _temp_ = document.domain.split(".");
					_hostName_ = _temp_[0];
					API_IS_VIP = '';
					if(_hostName_ == 'www') API_IS_VIP = mylib.getUrl('www')+'/api/isvip.htm';	//是否会员
					else if(_hostName_ == 'm') API_IS_VIP = mylib.getUrl('m')+'/other/isvip.shtml';
					if(API_IS_VIP!=''){
		                cmt.get(API_IS_VIP,{id:_user[0]},function(res){
		                	console.log(res);
		                	if(res.code==0){
		                    	$(".baidu-commercial").hide();
		                    	$(".baidu-commercial-wap").hide();
		                    }
		                })
					}
	            });
			},
			//全部评论
			allList:function(datas,count, hotCount){
				if(datas.length==0) return;
				if(true == mylib.detectmob()){
					if(hotCount > 0){
						return;
					}else{
						datas = datas.slice(0,5);
					}
				}
				var str = '';
				str += '<h3 class="tab-control-header clearfix" data-area="2">全部评论 <span>'+count+'</span>条';
				str += '	<div class="tab-control list-order">';
				str += '		<span data-order="2" class="hot">最热</span>';
				str += '		<span data-order="3" class="old">最早</span>'; 
				str += '		<span data-order="1" class="active new">最新</span>';
				str += '	</div>';
				str += '</h3>';
				var strList = cmt.cmtList(datas ,'all');
				str += '<div class="comment-list"><ul class="list-body list-body-all">'+strList+'</ul></div>';
			    var _temp = document.domain.split(".");
			    var _hostName = _temp[0];
			    //如果是m站
				if(hotCount == 0 &&true == mylib.detectmob()){		
					str += '<div class="cmt-open-app">';
					str += 		'<a href="#">打开观察者网APP，查看更多精彩评论 </a>';
					str += '</div>';
				}
				
			    return str;
				container.append(str);
			},
			//热门评论
			hotList:function(datas, hotCount, count){
				if(datas.length==0) return;
				//如果是m站 从datas里面截取5条数据
				if(true == mylib.detectmob()){
					datas = datas.slice(0,5);
				}
				var container = $('#comments-container');
				var hotCommentNums = hotCount;
				if(true == mylib.detectmob()){
					hotCommentNums = hotCount > 30 ? 30 : hotCount;
				}
				var str = '<h3 class="tab-control-header" data-area="1">热门评论 <span>'+hotCommentNums+'</span>条' + ( (true == mylib.detectmob()) ? ' /全部评论 <span>'+count+'</span>条' : '' ) +'</h3>';

				//
				var strList = cmt.cmtList(datas, 'hot');
				str += '<div class="comment-list"><ul class="list-body list-hot-body-all">'+strList+'</ul></div>';
				//如果是m站
				if(true == mylib.detectmob()){		
					str += '<div class="cmt-open-app">';
					str += 		'<a href="#">打开观察者网APP，查看更多精彩评论 </a>';
					str += '</div>';
					_temp_ = document.domain.split(".");
					_hostName_ = _temp_[0];
					if(_hostName_ == 'm'){
						str += '<div class="baidu-commercial-wap">';
						str += '<iframe style="width:100%;height:140px;border:0px;" src="//m.'+_temp_[_temp_.length-2]+'.'+_temp_[_temp_.length-1]+'/ad1.html"></iframe>';
						str += '</div>';
					}else if(_hostName_ == 'user'){
						str += '<div class="baidu-commercial-wap">';
						str += '<iframe style="width:100%;height:250px;border:0px;" src="//m.'+_temp_[_temp_.length-2]+'.'+_temp_[_temp_.length-1]+'/ad3.html"></iframe>';
						str += '</div>';
					}
				}
				container.append(str);
				$('.cmt-open-app').click(function(){
					cmt.mobileAppInstall().open();
					return false;
				});
				//如果不是m站 加入分页符
				if(false == mylib.detectmob()){
					//加入分页
					container.append('<div class="pagination pagination-hot clearfix"></div>');	//热门评论分页区
					cmt.hotPageCount = Math.ceil(hotCount / 10);	//热门评论页数
	           		cmt.pagination(1, cmt.hotPageCount, $('#comments-container .pagination-hot'));//加载热门评论分页
	           	}
			},
			memberCommentList:function(datas, allMemeberCommentCount){		//会员评论
				if(datas.length==0 || cmt.codeType == 3) return;
				//如果是m站 从datas里面截取5条数据
				var container = $('#comments-container');
				var str = '<h3 class="tab-control-header member-header" data-area="1">观察员评论 <img src="https://user.guancha.cn/static/imgs/member-long.png?20190708"><span>'+allMemeberCommentCount+'</span>条</h3>';

				var strList = cmt.cmtList(datas, 'member');
				str += '<div class="comment-list"><ul class="list-body list-member-body-all">'+strList+'</ul></div>';
				
				container.append(str);
				//如果不是m站 加入分页符
				if(false == mylib.detectmob()){
					//加入分页
					container.append('<div class="pagination pagination-member clearfix"></div>');	//会员评论分页区
					cmt.memberCommentPageCount = Math.ceil(allMemeberCommentCount / 3);	//会员评论页数
	           		cmt.pagination(1, cmt.memberCommentPageCount, $('#comments-container .pagination-member'));//加载会员评论分页
	           	}else{
	           		_temp_ = document.domain.split(".");
					_hostName_ = _temp_[0];
	           		if(_hostName_ == 'm'){
	           			adstr = '<div class="baidu-commercial-wap">';
						adstr += '<iframe style="width:100%;height:170px;border:0px;" src="//m.'+_temp_[_temp_.length-2]+'.'+_temp_[_temp_.length-1]+'/ad2.html"></iframe>';
						adstr += '</div>';
						container.append(adstr);
					}else if(_hostName_ == 'user'){
						adstr = '<div class="baidu-commercial-wap">';
						adstr += '<iframe style="width:100%;height:130px;border:0px;" src="//m.'+_temp_[_temp_.length-2]+'.'+_temp_[_temp_.length-1]+'/ad4.html"></iframe>';
						adstr += '</div>';
						container.append(adstr);
					}
	           	}
			},
			recommendCommentList:function(datas, allRecommendCommentCount){		//推荐评论
				if(datas.length==0) return;
				//如果是m站 从datas里面截取5条数据
				var container = $('#comments-container');
				var str = '<h3 class="tab-control-header member-header" data-area="1">推荐评论 <span>'+allRecommendCommentCount+'</span>条</h3>';

				var strList = cmt.cmtList(datas, 'recommend');
				str += '<div class="comment-list"><ul class="list-body list-recommend-body-all">'+strList+'</ul></div>';
				
				container.append(str);
				//如果不是m站 加入分页符
				if(false == mylib.detectmob()){
					//加入分页
					container.append('<div class="pagination pagination-recommend clearfix"></div>');	//推荐评论分页区
					cmt.recommendCommentPageCount = Math.ceil(allRecommendCommentCount / 10);	//推荐评论页数
	           		cmt.pagination(1, cmt.recommendCommentPageCount, $('#comments-container .pagination-recommend'));//加载推荐评论分页
	           	}else{
	           		_temp_ = document.domain.split(".");
					_hostName_ = _temp_[0];
	           		if(_hostName_ == 'm'){
	           			adstr = '<div class="baidu-commercial-wap">';
						adstr += '<iframe style="width:100%;height:170px;border:0px;" src="//m.'+_temp_[_temp_.length-2]+'.'+_temp_[_temp_.length-1]+'/ad2.html"></iframe>';
						adstr += '</div>';
						container.append(adstr);
					}else if(_hostName_ == 'user'){
						adstr = '<div class="baidu-commercial-wap">';
						adstr += '<iframe style="width:100%;height:130px;border:0px;" src="//m.'+_temp_[_temp_.length-2]+'.'+_temp_[_temp_.length-1]+'/ad4.html"></iframe>';
						adstr += '</div>';
						container.append(adstr);
					}
	           	}
			},
			/**
			 * 评论列表
			 * box  接收列表的容器，
			 * datas 数据
			 */
			cmtList:function(datas, area){
				var str = '';
				$.each(datas,function(){
					str += cmt.listItem(this, area);
				});
				
				return str;
			},
			//评论列表的一个项
			listItem:function(data, area){
				var str = '';

				str += '<li data-id="'+data.id+'" data-root="'+data.root_id+'" class="comment-item cmt-item">';//list
				str += cmt.userItem(data,true, area);
				
				//父评论
				if(data.parent.length!=0){
					str += cmt.parentItem(data.parent[0]);
				}
				if((data.praise_num ==0 && data.tread_num >=100) || (data.praise_num > 0 &&data.tread_num >=100 && data.tread_num / data.praise_num >=4) || data.fold == 1){
					str += '	<div class="comment-txt"><span style="display:none">'+data.content+'</span><span class="unfold">此条评论已被折叠，点击查看</span></div>';//评论内容
				}else{
					str += '	<div class="comment-txt">'+data.content+'</div>';//评论内容
				}
				str += cmt.itemFooter(data);//操作
				str += '</li>';//END-list
				return str;
			},
			//评论项
			userItem:function(data,is_show_all_btn, area){
				var str = '';
				
				str += '	<div class="clearfix">';//用户信息
				str += '		<div class="user-box clearfix">';
				str += '			<div class="user-avatar popup-user" data-uid="'+data.user_id+'" data-fromweibo="'+data.from_weibo+'">';
				str += '				<img src="'+data.user_photo+'"></div>';//头像
				if(data.from_weibo == true){
					str += '			<span class="user-nick">'+data.user_nick+'</span>';//昵称
				}else{
					str += '			<a href="'+cmt.getUserUrl(data.user_id)+'" target="_blank" class="user-nick">'+data.user_nick+'</a>';//昵称
					if(typeof data.user_level_logo != 'undefined' && data.user_level_logo != ''){
						str += '			<span class="user-level"><img src="'+ data.user_level_logo +'"></span>';//昵称
					}
					if(typeof data.is_member != 'undefined' && data.is_member == true){
						str += '			<span class="member-logo"><img src="https://user.guancha.cn/static/imgs/member-long.png?20190708"></span>';//昵称
					}
					
				}
				
				if(cmt.isPc){
					str += '		<span class="signature">'+data.user_description+'</span>';//签名
				}

				if(data.user_id == cmt.authorId){
					str += '		<span class="author">作者</span>';
				}
				if(data.from_weibo == true){
					str += '		<span class="weibo">微博用户</span>';
				}
				
				str += '		</div>';
				
				if(cmt.codeType == 2 && typeof area !='undefined' && area == 'all'){//只有风闻的全部评论区才出现置顶
						
					//所有情况下都能看到已置顶按钮 但是只有作者本人能看到置顶按钮
					if(typeof data.has_top != 'undefined' && data.has_top == true){
						str += '		<span class="has-top" data-id="'+data.id+'">置顶</span>';//已置顶
					}else{
						if(isLogin){
							var user = mylib.getUserDataByCookie();	
							var loginUid = user[0];
							if(loginUid == cmt.authorId){
								str += '		<span class="top" data-id="'+data.id+'">置顶</span>';//置顶按钮
							}
						}
					}
				}
				
				//全部楼层
				if(is_show_all_btn && data.parent.length!=0 && data.parent[0]['parent_id']!=0){
					str += '	<span class="all-floor">全部楼层</span>';//全部楼层
				}
				
				//谁推荐的
				if(typeof data['recommend_num'] != 'undefined' && data['recommend_num'] > 0){
					str += '	<span class="who-recommend" data-id="'+data.id+'"></span>';
				}
				
				str += '	</div>';//END用户信息
				return str;
			},
			//父评论项
			parentItem:function(data){
				var str = '';
				str += '<div data-id="'+data.id+'" class="comment-box cmt-item clearfix">';//box
				str += '<div class="cmt-item-main">';
				str += '	<span class="quote">';
				if(data.from_weibo == true){
					str += '		<a href="javascript:void(0)" >'+data.user_nick+'</a>';

				}else{
					str += '		<a href="'+cmt.getUserUrl(data.user_id)+'" target="_blank">'+data.user_nick+'</a>';
					if(typeof data.is_member != 'undefined' && data.is_member == true){
						str += '			<span class="member-logo"><img src="https://user.guancha.cn/static/imgs/member-long.png?20190708"></span>';//昵称
					}
				}
				//if(cmt.isPc){
					if(data.user_id == cmt.authorId){
						str += '		<span class="author">作者</span>';
					}
				//}
				if(data.from_weibo == true){
					str += '		<span class="weibo">微博用户</span>';
				}
				str += '	</span>';//昵称
				
				var content = '';
				if((data.praise_num ==0 && data.tread_num >=100) || (data.praise_num > 0 &&data.tread_num >=100 && data.tread_num / data.praise_num >=4) || data.fold == 1){
					content = '<span style="display:none">'+data.content+'</span><span class="unfold">此条评论已被折叠，点击查看</span>';//评论内容
				}else{
					content = data.content; 	//评论内容
				}
				str += '	<div class="comment-txt '+(data.status!=2 ? 'del':'')+'">'+ content +'</div>';//评论内容
				str += cmt.itemFooter(data);//操作
				str += '</div>';
				str += '</div>';//end box
				return str;
			},
			//评论列表项的操作
			itemFooter:function(data){
				var id = data.id;
				var str = '';
				str += '<div class="list-footer clearfix">';//box
				str += ' 	<span class="time"> '+data.created_at+'</span>';//时间
				if(data.status==2){
	                str += '	<div class="operations">';//操作
	                if(data.reply_count > 0){
	                	str += '		<a href="'+URL+'/main/child-comments?id='+ id +'" target="_blank">查看回复 '+ data.reply_count +'</a>';//回复数
	                }
					
					str += '		<a href="javascript:;" class="accusation" data-id="'+id+'" data-action="accusation_comment">举报</a>';//举报
	                if(data.code_type != 3){		//会员文章暂时屏蔽分享
	                	str += '		<div class="shared-comment" style="display:inline-block;"><a href="javascript:;" data-id="'+id+'">分享</a><div class="shared-items"><div class="shared-tips"><a href="javascript:;" class="shared-sina" data-cmd="tsina"><span></span>新浪微博</a><a href="javascript:;" class="shared-weixin" data-cmd="weixin"><span></span>微信</a><a href="javascript:;" class="shared-qzone" data-cmd="qzone"><span></span>QQ空间</a><i class="arrows"></i></div></div></div>';//分享
	              	}
	                str += '		<a href="javascript:;" class="comment" data-id="'+id+'">回复</a>';//回复
	                
	                if(cmt.isTread==1){		//可以踩 则显示踩按钮
	                	str += '		<a href="javascript:;" data-id="'+id+'" class="tread '+(data.has_tread?'active':'')+' ">踩<span>'+data.tread_num+'</span></a>';//踩
	                }
	                str += '		<a href="javascript:;" data-id="'+id+'" class="praise  '+(data.has_praise?'active':'')+'">赞<span>'+data.praise_num+'</span></a>';//赞
	                str += '		<a href="javascript:;" data-id="'+id+'" class="recommend"><i></i></a>';	//推荐
	                str += '		<a href="javascript:;" data-id="'+id+'" class="collection  '+(data.has_collection?'active':'')+'">收藏</a>';//收藏
	                str += '	</div>';//END 操作
				}
                str += '</div>';//end box
                
                return str;
			},
			//全部楼层
			allFrool:function(datas){
				var str = '';
				//从第二个开始
				for(var i=datas.length-1;i>0;i--){
					var tmp = cmt.parentItem(datas[i]);
					
					if(str == ''){
						str = tmp;
					}else{
						var idnex = tmp.indexOf('>')+1;
						var fix = tmp.substring(0,idnex);
						str = fix+str+tmp.substring(idnex);
					}
				}
				
				//加上第一条
				var strUser = cmt.userItem(datas[0]);
				strUser += str;
				strUser += '	<div class="comment-txt">'+datas[0].content+'</div>';//评论内容
				strUser += cmt.itemFooter(datas[0]);//操作
				str = strUser;
				return str;
			},
			//获取用户的用户中地址
			getUserUrl:function(id){
				return URL+'/user/personal-homepage?uid='+id;
			},
			//初始化事件
			initEvent:function(){
				//全部楼层
				$('#comments-container').on('click','.all-floor',function(){
					var obj = $(this).closest('.comment-item');
					var data = {id:obj.data('id'),root_id:obj.data('root'),ff:cmt.isPc?'www':'m'};
					cmt.get(API_CMT_ALLFLOOR+(isLogin==false?'.json':''),data,function(res){
						if(res.code!=0 || res.items.length==0) return;
						var str = cmt.allFrool(res.items);
						obj.html(str);
						obj.find('.cmt-item').addClass('border-bottom-fff');
					});
				});
				
				//回复
				$('#comments-container').on('click','.comment',function(){
					if(!cmt.enable){
						mylib.msg('此篇文章被禁止评论');
						return;
					}
					if(true == mylib.detectmob()){
						//弹出提示框
						var str = '';
						str += '<div class="to-app-comment">';
						str += '<p>快打开观察者APP</p>';
						str += '<p>与观友们展开热评互动吧！</p>';
						str += '<div><button>点击进入</button></div>';
						str += '</div>';
						
						mylib.openPopup(str);
						$('.to-app-comment').find('button').click(function(){
							cmt.mobileAppInstall().open();
							return false;
						});
						return false;
					}
					cmt.isLogin();
					var self = $(this);
					var cmtBox = self.closest('.cmt-item');
					//本条评论下是否有回复编辑器
					var has = cmtBox.children('.replybox').length>0;
					//删除其他回复框
					if(cmt.replyEdit!=false){
						cmt.replyEdit.destroy();
						cmt.replyEdit = false;
						$('#reply').remove();
					}
					if(!has){
						cmt.createEditor(cmtBox,'reply',false,cmtBox.data('id'));
					}
				});
				
				//赞
				$('#comments-container').on('click','.praise',function(){
					cmt.isLogin();
					var self = $(this);
					var cmtId = self.data('id');
	                var from = self.closest('.gc-comment').attr('data-from');
					var data = {id:cmtId,from:from};
					cmt.post(API_CMT_PRAISE,data,function(res){
						var num = self.children('span').text();//当前点击数
						num = parseInt(num);
						
						if(res.code == 0){
							var obj = $('.praise[data-id="'+cmtId+'"]');
							if(self.hasClass('active')){
								num = num -1;
								num = num >=0 ? num : 0;
								obj.children('span').text(num);
								obj.removeClass('active');
							}else{
								num = num + 1;
								obj.children('span').text(num);
								obj.addClass('active');
							}
						}
					});
				});
				
				//踩
				$('#comments-container').on('click','.tread',function(){
					cmt.isLogin();
					var self = $(this);
					var cmtId = self.data('id');
	                var from = self.closest('.gc-comment').attr('data-from');
					var data = {id:cmtId};
					cmt.post(API_CMT_TREAD,data,function(res){
						var num = self.children('span').text();//当前点击数
						num = parseInt(num);
						
						if(res.code == 0){
							var obj = $('.tread[data-id="'+cmtId+'"]');
							if(self.hasClass('active')){
								num = num -1;
								num = num >=0 ? num : 0;
								obj.children('span').text(num);
								obj.removeClass('active');
							}else{
								num = num + 1;
								obj.children('span').text(num);
								obj.addClass('active');
							}
						}
					});
				});
				
				//收藏
				$('#comments-container').on('click','.collection',function(){
					cmt.isLogin();
					var self = $(this);
					var cmtId = self.data('id');
					var data = {id:cmtId};
					var that = this;
					cmt.post(API_CMT_COLLECTION,data,function(res){
						if(res.code == 0){
							var obj = $('.collection[data-id="'+cmtId+'"]');
							if(self.hasClass('active')){
								obj.removeClass('active');
							}else{
								obj.addClass('active');
							}
						}else if(res.code == 2){
							var memberUrl = 'https://member'+ document.domain.substring(document.domain.indexOf('.')) +'/column/guanchayuanquanyi';
							var content = '<img src="https://user.guancha.cn/static/imgs/member-long.png?20190708"> 观察员特权，<a href="'+memberUrl+'" target="_blank">点此了解<a>'
							mylib.myTip($(that), content);
						}
					});
				});

				//将评论置顶
				$('#comments-container').on('click','.top',function(){
					cmt.isLogin();
					var self = $(this);
					var cmtId = self.data('id');
					var data = {id:cmtId, code_id:cmt.codeId,code_type:cmt.codeType};
					var that = this;
					cmt.post(API_CMT_TOP,data,function(res){
						if(res.code == 0){
							$(that).removeClass('top').addClass('has-top');

						}else if(res.code == 2){
							var memberUrl = 'https://member'+ document.domain.substring(document.domain.indexOf('.')) +'/column/guanchayuanquanyi';
							var content = '<img src="https://user.guancha.cn/static/imgs/member-long.png?20190708"> 观察员特权，<a href="'+ memberUrl +'" target="_blank">点此了解<a>'
							mylib.myTip($(that), content);
						}else if(res.code == 1){
							mylib.msg('置顶失败，原因：' + res.msg);
						}
					});
					return false
				});
				//取消置顶
				$('#comments-container').on('click','.has-top',function(){
					window.clearTimeout(tipIndex);
					cmt.isLogin();
					var self = $(this);
					var cmtId = self.data('id');
					var data = {id:cmtId, code_id:cmt.codeId,code_type:cmt.codeType};
					var that = this;
					mylib.myTip(that, '<span style="cursor:pointer">取消置顶</span>', function(){
						cmt.post(API_CMT_CANCEL_TOP,data,function(res){
							if(res.code == 0){
								mylib.msg('取消成功');
								$(that).removeClass('has-top').addClass('top');
							}else if(res.code == 1){
								mylib.msg('取消置顶失败，原因：' + res.msg);
							}else if(res.code == 2){
								var memberUrl = 'https://member'+ document.domain.substring(document.domain.indexOf('.')) +'/column/guanchayuanquanyi';
								var content = '<img src="https://user.guancha.cn/static/imgs/member-long.png?20190708"> 观察员特权，<a href="'+ memberUrl +'" target="_blank">点此了解<a>'
								mylib.myTip($(that), content);
							}
						});
					});
					
					
					
					return false
				});
				var tipIndex;
				$('#comments-container').on('mouseover','.has-top',function(){
					var that = this;
					var memberUrl = 'https://member'+ document.domain.substring(document.domain.indexOf('.')) +'/user/member';
					var content = '该评论已被作者置顶，<a href="'+ memberUrl +'" target="_blank">点击了解详情<a>';
					tipIndex = setTimeout(function(){
						mylib.myTip($(that), content);
					},500);
					
					
					return false
				});
				$('#comments-container').on('mouseout','.has-top',function(){
					window.clearTimeout(tipIndex);
				});
				//举报cmt.accusationTips();
				$('body').on('click','.accusation',function(){
					// if(isLogin == false){
					// 	cmt.isLogin();
					// 	return;
					// }
					
					var self = $(this);
					cmt.accusationTips(self,function(){
						var val = $('input[type="radio"][name="accusation_type"]:checked').val();
						if(val == 'undefined' || val == undefined){
							alert('请选择举报理由');
							return;
						}

						var type = self.data('action');
						var id = self.data('id');
						
						var datas = {accusationObj:type,accusationObjId:id,accusationType:val};
						cmt.post(API_CMS_REPORT,datas,function(res){
							if(res.code == 203){
	                            isLogin = false;
	                            mylib.checkLogin();
	                            return;
	                        }else if(res.code == 0){
	                            if (res.data.action == 'set' ) {
	                                setTimeout(function(){
	                                    mylib.msg('举报成功');
	                                }, 200);
	                            }
	                        }else if(res.code==1){
	                            if(res.data.action == 'hasAccusation'){
	                               setTimeout(function(){
	                                    mylib.msg('该内容已被举报');
	                                }, 200);
	                            }else{
	                                setTimeout(function(){
	                                    mylib.msg('举报失败');
	                                }, 200);
	                            }
	                        }
							
							$('.acc-tips-close').remove();
							$('.acc-tips-box').remove();
							
						});
						
					});
					return false;
				});

				//推荐评论
				$('#comments-container').on('click','.recommend',function(){
					if(isLogin == false){
						mylib.checkLogin();
						return false;

					}
					//弹出提示框
					
					var str = '';
					str += '<div class="recommend-comment">';
					str += '<div><input type="text" class="title" placeholder="在这里给推荐的评论想个标题，建议提炼原文干货（可选填）"></div>';
					str += '<p><button class="submit">提交</button></p>';
					str += '</div>';
					$('.recommend-comment').remove();
					if($('this').closest('li').find('.recommend-comment').length <= 0){
						$(this).closest('.cmt-item ').append(str);
					}
					

					var self = $(this);
					var cmtId = self.data('id');
					$('.recommend-comment').find('.submit').click(function(){
						var title = $('.recommend-comment').find('.title').val();
						
						if( title.length >0 && title.length <5){
							mylib.msg('标题最少5个字');
							return false;
						}

						if( title.length > 40){
							mylib.msg('标题最多40个字');
							return false;
						}
						var data = {id:cmtId, title : title};
						
						cmt.post(API_CMT_RECOMMEND,data,function(res){
							if(res.code == 0){
								var content = '<p>小编收到您的推荐啦~感谢分享</p><p>（今日剩余推荐次数<span style="color:#ea1f1b;"> ' + res['data']['remain_recommend_nums'] + ' </span>次）</p>';
								mylib.msg(content,3);
								
							}else if(res.code == 1){
								mylib.msg(res.msg,3);

							}
							//$('.recommend-comment').remove();
						});
						
					});
					
				});
				$('#comments-container').on('click','.recommend i',function(){
					var offset = $(this).offset();
					var css = {
						top : offset.top - 130,
						left : offset.left - 15,
					}
					var content = '<div style="max-width:400px">嗨，这是观察者网新上线的“推荐”功能。您推荐的评论有可能在“推荐评论”专区优先展示，并在风闻社区生成主帖，与更多观点碰撞。一旦推荐成功，我们会通过私信告知，注意查收哟。</div>';
					mylib.myTip($(this), content, '', css);
					return false;
				});

				//谁推荐的 who-recommend
				$('#comments-container').on('click','.who-recommend',function(){
					
					var self = $(this);
					var cmtId = self.data('id');
					window.open(API_TO_POST + '?comment_id=' + cmtId,'_blank');
				});

				//排序
				$('#comments-container').on('click','.list-order>span',function(){
					var order = 1;
					var self = $(this);
					
					//已经是当前状态
					if(self.hasClass('active')){
						return;
					}
					
					//移除所有状态
					$('.list-order>span').each(function(){
						if($(this).hasClass('active')) $(this).removeClass('active');
					});
					
					self.addClass('active');
					
					order = self.data('order');
					
					cmt.loadCmt(false,1,order);
					
				});
				
				//普通评论分页
				$('#comments-container').off('click','.pagination-normal a').on('click','.pagination-normal a',function(){
					var index = 1;
					var self = $(this);
					var current = parseInt(self.closest('.pagination').find('.active').text());
					if(self.hasClass('prev')){
						index = current>1 ? current-1 : 1;
					}else if(self.hasClass('next')){
						index = current < cmt.pageCount ? current+1 :cmt.pageCount;
					}else{
						index = parseInt(self.text());
					}
					
					var order = $('.list-order>span.active').data('order');
					cmt.loadCmt(false,index,order);
					
					var top = $('.list-body-all').offset().top;
					$('html,body').scrollTop(top-35);
				});
				//热门评论分页
				$('#comments-container').off('click','.pagination-hot a').on('click','.pagination-hot a',function(){
					var index = 1;
					var self = $(this);
					var current = parseInt(self.closest('.pagination').find('.active').text());
					if(self.hasClass('prev')){
						index = current>1 ? current-1 : 1;
					}else if(self.hasClass('next')){
						index = current < cmt.hotPageCount ? current+1 :cmt.hotPageCount;
					}else{
						index = parseInt(self.text());
					}
					
					var order = $('.list-order>span.active').data('order');
					cmt.loadHot(index);
					
					var top = $('.list-hot-body-all').offset().top;
					$('html,body').scrollTop(top-35);
				});
				//会员评论分页
				$('#comments-container').off('click','.pagination-member a').on('click','.pagination-member a',function(){
					var index = 1;
					var self = $(this);
					var current = parseInt(self.closest('.pagination').find('.active').text());
					if(self.hasClass('prev')){
						index = current>1 ? current-1 : 1;
					}else if(self.hasClass('next')){
						index = current < cmt.memberCommentPageCount ? current+1 :cmt.memberCommentPageCount;
					}else{
						index = parseInt(self.text());
					}
					
					var order = $('.list-order>span.active').data('order');
					cmt.loadMemberComment(index);
					
					var top = $('.list-member-body-all').offset().top;
					$('html,body').scrollTop(top-35);
				});
				//推荐评论分页
				$('#comments-container').off('click','.pagination-recommend a').on('click','.pagination-recommend a',function(){
					var index = 1;
					var self = $(this);
					var current = parseInt(self.closest('.pagination').find('.active').text());
					if(self.hasClass('prev')){
						index = current>1 ? current-1 : 1;
					}else if(self.hasClass('next')){
						index = current < cmt.recommendCommentPageCount ? current+1 :cmt.recommendCommentPageCount;
					}else{
						index = parseInt(self.text());
					}
					
					var order = $('.list-order>span.active').data('order');
					cmt.loadRecommendComment(index);
					
					var top = $('.list-recommend-body-all').offset().top;
					$('html,body').scrollTop(top-35);
				});
				//敏感评论或者踩过多的评论被折叠后展开
				$('#comments-container').on('click','.unfold',function(){
					var content = $(this).prev('span').html();
					$(this).closest('.comment-txt').html(content);
				});

				//太长的评论的展开
				$('#comments-container').on('click','.openit',function(){
		 			var commentTxt = $(this).prev('.comment-txt');
		 			commentTxt.removeAttr('style');
					commentTxt.next('.openit').remove();
		 		});

				$('#comments-container').on('click','.member-logo',function(){
					var memberUrl = 'https://member'+ document.domain.substring(document.domain.indexOf('.')) +'/column/guanchayuanquanyi';
					var content = '<img src="https://user.guancha.cn/static/imgs/member-long.png?20190708"> 观察员特权，<a href="'+ memberUrl +'" target="_blank">点此了解<a>';
			        mylib.myTip($(this), content);
			        return false;
				});
			},
			//是否登录
			isLogin:function(){
				if (isLogin == false) {
					if(cmt.isPc){
						mylib.login(function() {
							window.location.reload(true);
						});
					}else{
						if(cmt.codeType == 2){
							mylib.login(function() {
								window.location.reload(true);
							});
						}else{
							location.href = '/login.html'
						}
						
					}
                    return;
                }
			},
			//POST
			post:function(url,data,fn){
				$.ajax({
					url: url,
	            	type: 'post',
	            	dataType: 'json',
	            	xhrFields: {withCredentials: true},
	            	data: data,
	            	success : function(res){
	            		fn(res);
	            	},
				});
			},
			get:function(url,data,fn){
				$.ajax({
					url: url,
	            	type: 'get',
	            	dataType: 'json',
	            	xhrFields: {withCredentials: true},
	            	data: data,
	            	success : function(res){
	            		fn(res);
	            	},
				});
			},
			//分页
			pagination:function(pageNo, pageCount, pgContainer){
				var pnNum = 2;//前后页数

				//共有多少页
				var pageCount = typeof pageCount == 'undefined' ? cmt.pageCount : pageCount;
				var container = typeof pgContainer == 'undefined' ? $('#comments-container .pagination-normal') : pgContainer;
				if(container.length == 0) return;
				//不足一页
				if(pageCount<=1) return;
				
				var str = '';
				str += '<ul class="clearfix">';
				//上一页
				if(pageNo==1){
					str += '<li><span class="disable">上一页</span></li>';
				}else{
					str += '<li><a href="javascript:;" class="prev">上一页</a></li>';
				}
				
				if(pageNo>=pnNum+2 && pageNo!=1 && pageNo!=pnNum){
					str +='<li><a href="javascript:;">1</a></li>';
					str += '<li><span>...</span></li>';
				}
				
				var start = (pageNo - pnNum) <= 1 ? 1 : (pageNo - pnNum);
                var end = (pageNo + pnNum) >= pageCount ? pageCount : (pageNo + pnNum);
                
                for (; start <= end; start++) {
                    if (start <= pageCount && start >= 1) {
                        if (start != pageNo) {
                            str += '<li><a href="javascript:;" data-page="' + start + '">' + start + '</a></li>';
                        } else {
                        	str += '<li><span class="active">'+start+'</span></li>';//当前页
                        }
                    }
                }
                
                if (pageNo + pnNum < pageCount && pageNo >= 1 && pageCount > pnNum) {
                    str += '<li><span>...</span></li>';
                    str += '<li><a href="javascript:;" data-page="' + pageCount + '">' + pageCount + '</a></li>';
                }
				
				//下一页
				if(pageNo==pageCount){
					str += '<li><span class="disable">下一页</span></li>';
				}else{
					str += '<li><a href="javascript:;" class="next">下一页</a></li>';
				}
				
				str += '</ul>';
				if(true == mylib.detectmob()){
					str = '';
				}
				container.empty().html(str);
				cmt.fold();		//对超出600高的评论进行折叠
				//$('#comments-container .pagination').empty().html(str);
			},
			//举报
			accusationTips:function(obj,fn){
				
				//定位
				var height = obj.outerWidth();
				var top = obj.offset().top+height+10;
				var width = obj.outerWidth(true);
				var left = obj.offset().left+(width/2)-22;
				
				if(!cmt.isPc){
				}
				
				var str = '<div class="acc-tips-close"></div>';
				if(cmt.isPc){
					str += '<div class="acc-tips-box" style="top:'+top+'px;left:'+left+'px;">';
				}else{
					str += '<div class="acc-tips-box" style="top:50%;margin-top:-116px;position:fixed;left:10%;width:80%;">';
				}
				
				//body
				str += '	<div class="acc-tips-body">';
				str += '	<ul>';
				str += '	<li><input name="accusation_type" type="radio" value="1" id="accusation1"><label for="accusation1">违反法律法规</label></li>';
				str += '	<li><input name="accusation_type" type="radio" value="2" id="accusation2"><label for="accusation2">垃圾信息、广告</label></li>';
				str += '	<li><input name="accusation_type" type="radio" value="3" id="accusation3"><label for="accusation3">色情、淫秽信息</label></li>';
				str += '	<li><input name="accusation_type" type="radio" value="4" id="accusation4"><label for="accusation4">人身攻击</label></li>';
				str += '	<li><input name="accusation_type" type="radio" value="5" id="accusation5"><label for="accusation4">谣言、不实信息</label></li>';
				str += '	<li><input name="accusation_type" type="radio" value="6" id="accusation6"><label for="accusation4">冒充，冒用信息</label></li>';
				str += '	<li><input name="accusation_type" type="radio" value="8" id="accusation8"><label for="accusation4">破坏社区秩序</label></li>';
				str += '	<li><input name="accusation_type" type="radio" value="7" id="accusation7"><label for="accusation4">其他</label></li>';
				str += '	<li><input name="accusation_type" type="radio" value="9" id="accusation9"><label for="accusation4">涉未成年人有害信息</label></li>';
				str += '	</ul>';
				str += '	<div class="clear"></div>';
				str += '	<p><a target="_blank" href="//www.guancha.cn/broken-news/2017_03_28_400912_3.shtml">观察者网举报制度规范</a></p>';
				str += '	</div>';
				//footer
				str += '	<div class="arr-tips-footer">';
				str += '	<a href="javascript:;" class="ok">确定</a>';
				str += '	<a href="javascript:;" class="cancel">取消</a>';
				str += '	</div>';
				if(cmt.isPc){
					str += '	<div class="arrows"></div>';
				}
				str += '</div>';
				
				$('body').append(str);
				
				//关闭
				$('.acc-tips-close,.arr-tips-footer>.cancel').click(function(){
					close();
				});
				
				//确定
				$('.arr-tips-footer>.ok').click(function(){
					fn();
				});
				
				//关闭
				function close(){
					$('.acc-tips-close').remove();
					$('.acc-tips-box').remove();
				}
				
			},
			/**
	         * 创建编辑器
	         * container 容器ID
	         * editorId 编辑器ID
	         * isMain 是否主回复框
	         * config{allow,codeId,type,parentid}
	         */
	        createEditor: function(container, editorId,isMain,pid) {
	            //创建容器
	            this.box = $('<div></div>');
	            if (isMain == true){
	            	this.box.addClass('comment-component');
	            }
	            else {
	                this.box.addClass('comment-component replybox');
	            }

	            //创建编辑器容器
	            this.editor = $('<script type="text/plain" style="width:100%;"></script>');
	            this.editor.attr('id', editorId);
	            this.box.append(this.editor); //添加到容器

	            //创建底部工具按钮
	            this.footer = $('<div></div>');
	            this.footer.addClass('comment-footer');
	            this.face = $('<a href="javascript:;" class="face" ><span></span>表情</a>'); //表情
	            this.bold = $('<a href="javascript:;" class="bold"><span></span>加粗</a>'); //加粗
	            this.simpleupload = $('');
	            if(cmt.codeType == 2 && cmt.picAllow == true){		//风闻下显示图片上传按钮
	            	this.simpleupload = $('<a href="javascript:;" class="simpleupload"><span></span>图片</a>'); //添加图片
	            }
	            this.btn = $('<a href="javascript:;" class="btn-publish" data-parant-id="0">发表</a>'); //发表
	            this.footer.append(this.face).append(this.bold).append(this.simpleupload).append(this.btn);
	            this.box.append(this.footer); //添加到容器

	            //添加到显示容易
	            container.append(this.box);
				//跳转到社区
	            var temp = document.domain.split(".");
	            var hostName = temp[0];
	            if(hostName == 'www' && $('.u-center').length==0){
	                var user_link = $('<a target="_blank" style="float:left;margin-left: 50px;" href="//www.guancha.cn/broken-news/2017_03_28_400912_3.shtml">观察者网举报制度规范</a><a style="float:right" class="u-center" href="'+URL+'" target="_blank">都到这里了，为什么不逛逛风闻呢？</a>');
				    user_link.css('color','#989898');
				    var div = $('<div style="margin-top:20px;height:19px;"></div>');
				    div.append(user_link);
				    $('.comment-main-box').after(div);
	            }
	            //初始化编辑器
	   //          UM.Editor.prototype.placeholder = function (justPlainText) {
				// 	var _editor = this;
				// 	_editor.addListener("focus", function () {
				// 		var localHtml = _editor.getPlainTxt();
				// 		if ($.trim(localHtml) === $.trim(justPlainText)) {
				// 			_editor.setContent(" ");
				// 		}
				// 	});
				// 	_editor.addListener("blur", function () {
				// 		var localHtml = _editor.getContent();
				// 		if (!localHtml) {
				// 			_editor.setContent(justPlainText);
				// 		}
				// 	});
				// 	_editor.ready(function () {
				// 		_editor.fireEvent("blur");
				// 	});
				// };
	            var ue;
	            if (isMain == false) {
	            	cmt.replyEdit = ue = UM.getEditor(editorId);
	            } else {
	            	ue = UM.getEditor(editorId);
	            }
	            
	            //添加获取焦点事件
	            ue.addListener( 'contentChange', function( editor ) {
	                if(!isLogin){
	                	mylib.login(function() {
	                        window.location.reload(true);
	                    });
	                }
	            });
	            //文本框获取焦点时清空默认显示的内容
	       		// ue.addListener("focus", function(){
	         //    	ue.setContent('');
	        	// });
	        	// ue.placeholder("Please enter some text...");
	            //表情
	            this.face.click(function(event) {
	                $(this).sinaEmotion(function() {
	                    return ue;
	                });
	                event.stopPropagation();
	            });
	            //加粗
	            this.bold.click(function() {
	                ue.execCommand('bold');
	                return false;
	            });
	            //添加图片
	            if(this.simpleupload.length > 0){
	            	this.simpleupload.click(function() {
	            		if(isLogin == false){
							cmt.isLogin();
							return false;
						}
	                	ue.execCommand('onesimpleupload');
	                	return false;
	            	});
	            }
	            
	            //发表
	            this.btn.click(function() {

	            	var thatBtn = $(this);
	            	if(cmt.canComment == 0){
	                	thatBtn.css({'background-color' : '#ccc'});
	                	return false;
	                }
	                ue.focus();		//设置焦点
	                if (!ue.hasContents()) {
	                	mylib.msg('请输入内容');
	                    return false;
	                }
	                //检测图片数
	                var content = ue.getContent();
	                var imgs = $(content).find('img');
	                //检测外链图片
					var link = '//i.guancha.cn';
	                var isLinkExists = false;
		            imgs.each(function(index, el) {
		                imgSrc = el.src;
		                // console.log(imgSrc);
		                if(imgSrc.indexOf(link) == -1){
		                	isLinkExists = true;
		                	return false;
		                }
		            });
		            if(isLinkExists){
		            	mylib.msg('暂不允许使用外链图片，请先下载到本地再上传');
		               	return false;
		            }
	                
	                
	                if(cmt.codeType == 2){
						if (imgs.length > 3) {
		                	mylib.msg('评论中暂时只允许存在三张图片');
		                    return false;
		                }
		                
		                if(cmt.picAllow == false && imgs.length > 0){
	                		mylib.msg('此篇文章评论禁止包含图片');
		                	return false;
		            	}
	                }else{
						if (imgs.length > 0) {
		                	mylib.msg('暂时只支持风闻社区评论中带图片');
		                    return false;
		                }
	                }
	                
	                //将图片之前的br删掉
	                $(content).find('img').prev('br').remove();
	                var area = $(this).closest('.comment-list').prev('.tab-control-header').data('area');
	                var datas = {
	                		code_id:cmt.codeId,
	                		code_type:cmt.codeType,
	                		parent_id:pid,
	                		content:content,
	                		access_device:cmt.isPc?1:2,
	                		from:$('#comments-container').data('from'),
	                		comment_area : area
	                };
	                
	                $.ajax({
	                	url:API_CMT_POST,
	                	type: 'post',
	                	dataType: 'json',
	                	data:datas,
	                	xhrFields:{withCredentials: true},
	                	success:function(res){
	                		cmt.canComment = 1;
	                		thatBtn.css({'background-color': 'rgb(206, 61, 58)'});
	                		if (res.code == 203) {
		                      	isLogin = false;
	                        	mylib.checkLogin();
	                       		return;
	                    	}
		                    if (res.code == 1) {
		                    	if(res.msg=='海外用户未通过实名认证'){
	                                mylib.myConfirm('根据相关法律法规,境外手机号需要经过实名认证才可以发表评论','再等等','去认证', function(){
	                                    window.location.href = 'https://user'+ document.domain.substring(document.domain.indexOf('.')) +'/user/user-setting?click=identify';
	                                });
	                                $('.confirm-module').width('346px');
	                                $('.confirm-module').find('.info').css('font-size', '18px');
	                                $('.confirm-module').find('button').css('width', '170px');
	                                return;
	                            }
		                    	if(isMain == true){
		                    		var str = (res.msg != '') ?' 评论失败，原因：' + res.msg : '评论失败';
		                    		mylib.msg(str);
		                    	}else{
		                    		var str = (res.msg != '') ?' 回复失败，原因：' + res.msg : '回复失败';
		                    		mylib.msg(str);
		                    	}
		                    	return;
		                    }
		                    ue.setContent('');
		                    //清除评论框
		                    if(isMain==false){
		                    	mylib.msg('回复成功');
		                    	ue.destroy();
		    	                $('#'+editorId).remove();
		    	                cmt.replyEdit = false;
		                    }
		                    $('.list-body-all').prepend(cmt.listItem(res.data));
		                    cmt.fold();
	                	},
	                	error : function(){
	                		cmt.canComment = 1;
	                		thatBtn.css({'background-color': 'rgb(206, 61, 58)'});
	                		mylib.msg('评论失败');
	                	}
	                });
	                cmt.canComment = 0;
	                thatBtn.css({'background-color' : '#ccc'});	//设置成灰色
	                //config.content = ue.getContent();
	                
	                //config.parentId = 0; //设置父ID为0
	                return false;
	            });
	        },
	        /**
	         * 定位评论
	         */
	        fixComment : function(){
	        	if(window.location.href.indexOf('fixcomment') > -1){
	        		var commentId = mylib.getQueryString('fixcomment');
	        		cmt.get(API_CMT_GET_COMMENT_PAGE, {codeId:cmt.codeId,codeType:cmt.codeType,commentId : commentId},function(res){
	            		if(res.code == 0){
	            			var pageNo = res.page;
	            			var order = $('.list-order>span.active').data('order');
							cmt.loadCmt(false,pageNo,order);
	            			window.setTimeout(function(){
	            				var li = $('.comment-list').find('li[data-id='+ commentId +']');
	            				li.children('.comment-txt').css({'background-color' : 'rgba(255,244,92, 0.42)'});
	            				var top = li.offset().top -200;
	            				$(window).scrollTop(top);
	            			},500);
	            		}
	            	
	            	});
	        	}
	        	
	        },
	        /**
	         * 获取图像的原始地址
	         */
	        getOriginalUrl : function(url){
 				if (url.indexOf("?") != -1) {
		            return url.split('?')[0];
		        }else{
		            return url;
		        }   
	        },
	        /**
	         * 放大图像
	         */
	        zoomImg : function(){
				
		        var newImg = null;
		        var _mask = null;
		        var oldPosLeft;
		        var oldPosTop;
		        var oldWidth;
		        var oldHeight;

		 		$('#comments-container').on('mouseover','.comment-txt img',function(){
		            var originalUrl = cmt.getOriginalUrl($(this).attr("src"));
		            newImg = $('<img/>');
		            var that = this;
		        	newImg.attr("src", originalUrl).load(function() {
		                realWidth = this.width;
		                realHeight = this.height;
		                if(realWidth >= 600 || realHeight >=600){
		                    $(that).css('cursor', 'zoom-in');
		                }
		            });
			    }).on('click','.comment-txt img',function(){
		            //放到到中心
		            //记录坐标
		           
		            var offset = $(this).offset();
		            oldPosTop = offset.top;
		            oldPosLeft = offset.left;
		            oldWidth = $(this).width();
		            oldHeight = $(this).height();
		            newImg = $('<img/>');
		            var originalUrl = cmt.getOriginalUrl($(this).attr("src"));
		           
		            newImg.attr("src", originalUrl).load(function() {
		                realWidth = this.width;
		                realHeight = this.height;
		                if(realWidth > 1024){
		                    realHeight = realHeight * 1024 / realWidth;
		                    realWidth = 1024;
		                }
		                if(realWidth >= 600 || realHeight >=600){
		                    _mask = $('<div class="window_mask"></div>');
		                    _mask.css('display', 'none').appendTo('body').fadeIn();
		                    $('body').append(newImg);
		                    newImg.css({
		                        'position' : 'absolute',
		                        'z-index' : 10001,
		                        'width' : oldWidth,
		                        'height' : oldHeight,
		                        'left' : oldPosLeft,
		                        'top' : oldPosTop,

		                    });
		                    
		                    var left =(window.innerWidth - realWidth) / 2 + 'px';
		                    var dis = window.innerHeight- realHeight;
		                    var top;
		                    if(dis > 0){
		 						top = (window.innerHeight- realHeight) /2  + $(window).scrollTop() + "px";	//短图
		                    }else{
		                    	top = $(window).scrollTop() + "px";
		                    }
		                   

		                    newImg.animate({height:realHeight, width:realWidth, left:left,top:top});
		                    newImg.mouseover(function(){
		                        $(this).css('cursor', 'zoom-out');
		                    });

		                }
		            });
		            return false;
		        });
		        //点击空白处关闭弹出层
		        $(document).click(function(event) {
		            if(newImg){
		                newImg.animate({height:oldHeight, width:oldWidth, left:oldPosLeft,top:oldPosTop}, function(){
		                    newImg.remove();
		                    newImg = null;
		                });
		            }
		            if(_mask){
		                _mask.fadeOut(function(){
		                    _mask.remove();
		                    _mask = null;
		                });
		                
		            }
		        });
	        },
	        /**
			 * 评论超过600高的话进行折叠
	         */
	        fold : function(){
	        	setTimeout(function(){
					var ct = $('.gc-comment').find('.comment-txt');
					var realHeight;
					ct.each(function(){
						realHeight = $(this).outerHeight();
						if(realHeight >600){
							$(this).data('realheight', realHeight);
	        				$(this).css({height : '600'});
	        				if($(this).next('span').length == 0){
	        					$(this).after($('<span class="openit">展开</span>'));
	        				}
	        			}	
					});
				},500);
	        },
	        mobileAppInstall : function(){
        		var ua = navigator.userAgent,
				        loadIframe,
				        win = window;
				var scheme = encodeURIComponent('guanchazhe://guanchazhe/post?id='+cmt.codeId+'&type=' + cmt.codeType);
				function getIntentIframe(){
				    if(!loadIframe){
				        var iframe = document.createElement("iframe");
				        iframe.style.cssText = "display:none;width:0px;height:0px;";
				        document.body.appendChild(iframe);
				        loadIframe = iframe;
				    }
				    return loadIframe;
				}

				function getChromeIntent(url){
				// 根据自己的产品修改吧
				    return  "intent://www.guancha.cn/#Intent;scheme="+url+";package=cn.guancha.app;end";
				}
				var appInstall = {
				    isChrome:ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/),
				    isAndroid:ua.match(/(Android);?[\s\/]+([\d.]+)?/),
				    isWeixin: ua.toLowerCase().match(/MicroMessenger/i),
				    timeout:500,
				    /**
				     * 尝试跳转appurl,如果跳转失败，进入h5url
				     * @param {Object} appurl 应用地址
				     * @param {Object} h5url  http地址
				     */
				    open:function(){
				        var t = Date.now();
				        appurl = 'guanchazhe://guanchazhe/post?id='+cmt.codeId +'&type='+cmt.codeType;
				        if(appInstall.isWeixin) h5url = 'https://a.app.qq.com/o/simple.jsp?pkgname=cn.guancha.app&ios_scheme='+scheme+'&android_schema='+scheme;
					    else h5url = 'https://m.guancha.cn/downloadApp.html';
				        appInstall.openApp(appurl);
				        setTimeout(function(){
				            if(Date.now() - t < appInstall.timeout+100){
				                h5url && appInstall.openH5(h5url);
				            }
				        },appInstall.timeout)
				    },
				    openApp:function(appurl){
				    	if(/Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)) win.location.href = appurl;
				        if(appInstall.isChrome){
				            win.location.href = appurl;
				        }else{
				            getIntentIframe().src = appurl;
				        }
				    },
				    openH5:function(h5url){
				        win.location.href = h5url;
				    }
				}

				return appInstall;
			}
	};
	
	cmt.init();
})(mylib);