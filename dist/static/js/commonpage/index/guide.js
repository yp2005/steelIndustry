webpackJsonp([11,0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _vue = __webpack_require__(5);

	var _vue2 = _interopRequireDefault(_vue);

	var _app = __webpack_require__(133);

	var _app2 = _interopRequireDefault(_app);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	mui.init();
	mui.plusReady(function () {
	    new _vue2.default({
	        el: '#app',
	        components: {
	            app: _app2.default
	        }
	    });
	});

	mui.back = function () {};

/***/ },

/***/ 3:
/***/ function(module, exports) {

	module.exports = vendors_library;

/***/ },

/***/ 5:
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(3))(231);

/***/ },

/***/ 46:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    methods: {
	        start: function start() {
	            plus.storage.setItem('launchFlag', 'true');
	            mui.openWindow({
	                url: '../../buyer/index/main.html',
	                id: 'main',
	                show: {
	                    aniShow: 'none'
	                },
	                waiting: {
	                    autoShow: false }
	            });
	            plus.navigator.setFullscreen(false);
	            setTimeout(function () {
	                plus.webview.currentWebview().close('none');
	                if (plus.webview.getWebviewById('HBuilder')) {
	                    plus.webview.getWebviewById('HBuilder').close('none');
	                }
	            }, 300);
	        }
	    },
	    ready: function ready() {
	        plus.navigator.setFullscreen(true);
	        mui('.mui-slider').slider();

	        var h = plus.screen.resolutionHeight + 2;
	        var w = plus.screen.resolutionWidth + 2;

	        var imgs = document.querySelectorAll('.guide-img');
	        for (var i = 0, len = imgs.length; i < len; i++) {
	            imgs[i].style.width = w + 'px';
	            imgs[i].style.height = h + 'px';
	        }
	        setTimeout(function () {
	            plus.navigator.closeSplashscreen();
	        }, 100);
	    }
	};

/***/ },

/***/ 56:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 99:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "../static/img/guide-1.jpg";

/***/ },

/***/ 100:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "../static/img/guide-2.jpg";

/***/ },

/***/ 101:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "../static/img/guide-3.jpg";

/***/ },

/***/ 108:
/***/ function(module, exports, __webpack_require__) {

	module.exports = "\n\n<div class=\"mui-content\">\n    <div class=\"mui-slider mui-fullscreen\">\n        <div class=\"mui-slider-group\">\n            <div class=\"mui-slider-item\">\n                <a href=\"javascript:;\">\n                    <img  onerror=\'this.src=\"../../static/img/placehold.png\"\' class=\"guide-img\" src=\"" + __webpack_require__(99) + "\">\r\n                </a>\n            </div>\n            <div class=\"mui-slider-item\">\n                <a href=\"javascript:;\">\n                    <img  onerror=\'this.src=\"../../static/img/placehold.png\"\' class=\"guide-img\" src=\"" + __webpack_require__(100) + "\">\r\n                </a>\n            </div>\n            <div class=\"mui-slider-item\">\n                <a href=\"javascript:;\">\n                    <img  onerror=\'this.src=\"../../static/img/placehold.png\"\' @tap=\"start\" class=\"guide-img\" src=\"" + __webpack_require__(101) + "\">\r\n                    <!-- <button class=\"mui-btn mui-btn-blue mui-btn-outlined\" type=\"button\" id=\"start\">开始体验</button> -->\r\n                </a>\n            </div>\r\n        </div>\n    </div>\n</div>\n\n";

/***/ },

/***/ 133:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(56)
	__vue_script__ = __webpack_require__(46)
	if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
	  console.warn("[vue-loader] src\\view\\commonpage\\index\\guide\\app.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(108)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})


/***/ }

});