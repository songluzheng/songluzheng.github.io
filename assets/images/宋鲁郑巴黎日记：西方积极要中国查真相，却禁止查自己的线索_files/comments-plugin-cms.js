(function(){
	//获取根域名
    function getRootDomain(){
        var temp = document.domain.split(".");
        return temp[temp.length - 2] + '.' + temp[temp.length - 1];

    };
    function getUrl(key){
        //return  'http://'+ key +'.'+ getRootDomain();
    	return  '//'+ key +'.'+ getRootDomain();
    }
    
    var commentUrl = getUrl('user');
    
	var cssDepend = {	//
		'comments' : commentUrl +'/static/css/new-comments.css?20200817',		//
		'login' : commentUrl +'/static/css/login.css?20191213',		//包含登录框 和评论样式
		'sinaEmotion' : commentUrl +'/static/plugins/sinaEmotion/jquery.sinaEmotion.css?20171216',	//表情样式
		'umeditor' : commentUrl +'/static/um/themes/comment/css/umeditor.css?20171216',	//百度编辑器样式
		'userNav' : commentUrl +'/static/css/usernav.css?202006030',
		'iconFont' : commentUrl +'/static/font/iconfont.css?20171216',
	}
	var jsDepend = {
		//'layer' : commentUrl + '/static/plugins/layer/layer.js?20171216',
		'mylib' : commentUrl +'/dist/js/common.js?20200817',	
		'sinaEmotion' : commentUrl +'/static/plugins/sinaEmotion/jquery.sinaEmotion.js?20171216',	//表情js文件
		'um' : {	//百度编辑器js文件
			'template' : commentUrl +'/static/um/third-party/template.min.js?20171216',
			'comment_config' : commentUrl +'/static/um/comment.config.js?20200319',
			'umeditor' : commentUrl +'/static/um/umeditor.js?201807181649',
			'lang' : commentUrl +'/static/um/lang/zh-cn/zh-cn.js?20171216',
		},
		'comments' : commentUrl +'/static/js/comments-new.js?20200817',	//评论插件主文件
		'TCaptcha' : 'https://ssl.captcha.qq.com/TCaptcha.js?20191213',			//腾讯图形验证码
	}
	
    /**
     * 加载css文件
     * @param href
     */
    function loadCss(href){
    	var link = document.createElement("link");
        link.rel = "stylesheet";
        link.href= href;
        document.head.appendChild(link);
    }
    /**
     * 加载js文件
     * @param src
     * 
     */
    function loadJs(src){
    	 var script= document.createElement("script");
         script.type = "text/javascript";
         script.src= src;
         document.body.appendChild(script);
         return script;
    }
	
	//引入评论插件依赖的css文件
    loadCss(cssDepend.iconFont);
    loadCss(cssDepend.userNav);
	loadCss(cssDepend.comments);
	loadCss(cssDepend.login);
	loadCss(cssDepend.sinaEmotion);
	loadCss(cssDepend.umeditor);

	
	//引入评论插件依赖的js文件
	
	var mylibJs = loadJs(jsDepend.mylib);
	mylibJs.onload = function(){
		loadJs(jsDepend.sinaEmotion);
		var templateScriptJs = loadJs(jsDepend.um.template);
		templateScriptJs.onload = function(){
			loadJs(jsDepend.um.comment_config);
			umeditorJs = loadJs(jsDepend.um.umeditor);
			umeditorJs.onload = function(){
				loadJs(jsDepend.um.lang);
				loadJs(jsDepend.comments);
	        }
		}
	}
	
	loadJs(jsDepend.TCaptcha);
})();


