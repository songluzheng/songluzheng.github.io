 /*
 * @ guanchazhe
 * @ © yinglianmingzhi
 * @ 2016-08-22
 */

var Base = (function(){
	/**
	* [getByClass 用class获取dom对象]
	* @param  {[object]} oParent [父级元素]
	* @param  {[string]} sClass  [需要获取的class名]
	* @return {[array]}         [获取的dom对象集合]
	*/
	function _getByClass(oParent, sClass) {
		var aEle = oParent.getElementsByTagName('*');
		var aResult = [];
		var re = new RegExp('\\b' + sClass + '\\b', 'i');
		var i = 0;
		for (i = 0; i < aEle.length; i++) {
			if (re.test(aEle[i].className)) {
				aResult.push(aEle[i]);
			}
		}
		return aResult;
	}

	/**
	 * [modal 模态框]
	 * 适用于移动端
	 * @param  {[object]} 	options 				[参数配置]
	 * @param  {[string]} 	options.content 		[提示文字内容]
	 * @param  {[number]} 	options.type 			[一个或者两个按钮]
	 * @param  {[boolean]} 	options.mask 			[是否显示蒙层]
	 * @param  {[string]} 	options.ok 				[确定按钮文字]
	 * @param  {[string]} 	options.cancel 			[取消按钮文字]
	 * @param  {[function]} options.init 			[打开摸态框时运行的方法]
	 * @param  {[function]} options.callback 		[点击确定时执行的方法]
	 * @param  {[function]} options.cancelCallback 	[点击取消时执行的方法]
	 * @param  {[function]} options.login 			[点击登录时执行的方法]
	 * @param  {[function]} options.logregister 	[点击注册时执行的方法]
	 */
	function _modal(options){

		var settings = {
			content : '',
			title : '用户登录',
			type : 1,
			mask : true,
			ok: '确定',
			cancel: '取消',
			init : null,
			callback : null,
			cancelCallback: null,
			login: null,
			logregister: null,
			logbind:null
		};

		for( i in settings) {
			if(options[i] != undefined) {
				settings[i] = options[i]
			}
		};
		var _modalId = 'modal-'+ +new Date(),
			_maskDom = settings.mask ? '<div class="c-modal-mask"></div>' : '',
			cancelDom = settings.type == 1 ? '' : '<div class="c-modal-btn-box">'+ '<button class="confirm">'+ settings.ok +'</button>'+ '<button class="cancel">'+ settings.cancel +'</button>'+ '</div>'
			_modal = document.createElement('div');

		var modalTemplate = _maskDom +
							'<div class="c-modal">'+
								'<div class="c-modal-title"><h3>'+ settings.title +'</h3><a href="javascript:;" class="c-modal-close"></a></div>'+
								'<div class="c-modal-container">'+ settings.content +'</div>'+cancelDom
							'</div>';

		_modal.id = _modalId;
		_modal.className = 'c-modal-container';
		_modal.innerHTML = modalTemplate;

		document.getElementsByTagName('body')[0].appendChild(_modal);

		if(typeof(settings.init) === "function"){
			settings.init(_modal);
		}

		if (settings.type != 1) {
			_modal.querySelector('.confirm').onclick = function(){
				if(settings.callback == null) {
					_close();
					return false;
				};

				if(typeof(settings.callback) === "function"){
					var call = settings.callback();
				};

				if(call) {
					_close();
				};
			};
		}
		

		if(_modal.querySelector('.cancel')) {
			_modal.querySelector('.cancel').onclick = function(){
				if(settings.callback == null) {
					_close();
					return false;
				};

				if(typeof(settings.callback) === "function"){
					var call = settings.callback();
				};

				if(call) {
					_close();
				};
			};
		}

		if(_modal.querySelector('.c-modal-close')) {
			_modal.querySelector('.c-modal-close').onclick = function(){
				if(settings.cancelCallback == null) {
					_close();
					return false;
				};

				if(typeof(settings.cancelCallback) === "function"){
					var call = settings.cancelCallback();
				};

				if(call) {
					_close();
				};
			};
		}

		if(_modal.querySelector('.log-in')) {
			_modal.querySelector('.log-in').onclick = function(){
				if(settings.login == null) {
					_close();
					return false;
				};

				if(typeof(settings.login) === "function"){
					var call = settings.login();
				};

				if(call) {
					_close();
				};
			};
		}

		if(_modal.querySelector('.log-register')) {
			_modal.querySelector('.log-register').onclick = function(){
				if(settings.logregister == null) {
					_close();
					return false;
				};

				if(typeof(settings.logregister) === "function"){
					var call = settings.logregister(_modal);
				};

				if(call) {
					_close();
				};
			};
		}

		if(_modal.querySelector('.log-register')) {
			_modal.querySelector('.log-register').onclick = function(){
				if(settings.logregister == null) {
					_close();
					return false;
				};

				if(typeof(settings.logregister) === "function"){
					var call = settings.logregister();
				};

				if(call) {
					_close();
				};
			};
		}
		
		if(_modal.querySelector('.log-bind')) {
			_modal.querySelector('.log-bind').onclick = function(){
				if(settings.logbind == null) {
					_close();
					return false;
				};

				if(typeof(settings.logbind) === "function"){
					var call = settings.logbind(_modal);
				};

				if(call) {
					_close();
				};
			};
		}

		if(_modal.querySelector('.log-bind')) {
			_modal.querySelector('.log-bind').onclick = function(){
				if(settings.logbind == null) {
					_close();
					return false;
				};

				if(typeof(settings.logbind) === "function"){
					var call = settings.logbind();
				};

				if(call) {
					_close();
				};
			};
		}

		function _close() {
			_modal.parentNode.removeChild(_modal);
		};

	};

	return {
		getByClass : _getByClass,
		modal : _modal
	}
})()