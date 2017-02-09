webpackJsonp([10,0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _vue = __webpack_require__(5);

	var _vue2 = _interopRequireDefault(_vue);

	var _vueRouter = __webpack_require__(6);

	var _vueRouter2 = _interopRequireDefault(_vueRouter);

	var _App = __webpack_require__(131);

	var _App2 = _interopRequireDefault(_App);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_vue2.default.use(_vueRouter2.default);
	var router = new _vueRouter2.default();

	mui.init({
	    swipeBack: false
	});

	mui.plusReady(function () {
	    router.start(_App2.default, '#app');
	});

/***/ },

/***/ 1:
/***/ function(module, exports) {

	module.exports = vendorUtils_library;

/***/ },

/***/ 2:
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(1))(144);

/***/ },

/***/ 3:
/***/ function(module, exports) {

	module.exports = vendors_library;

/***/ },

/***/ 5:
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(3))(231);

/***/ },

/***/ 6:
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(3))(233);

/***/ },

/***/ 44:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _muiUtils = __webpack_require__(2);

	var _muiUtils2 = _interopRequireDefault(_muiUtils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    data: function data() {
	        return {
	            color: plus.webview.currentWebview().fromSeller ? '#419fdc' : '#f04e30',
	            scan: undefined,
	            flash: false
	        };
	    },

	    methods: {
	        initScan: function initScan() {
	            this.scan && this.scan.close();
	            this.scan = new plus.barcode.Barcode('bcid', [plus.barcode.QR, plus.barcode.EAN8, plus.barcode.EAN13, plus.barcode.AZTEC, plus.barcode.DATAMATRIX, plus.barcode.UPCA, plus.barcode.UPCE, plus.barcode.CODABAR, plus.barcode.CODE39, plus.barcode.CODE93, plus.barcode.CODE128, plus.barcode.ITF, plus.barcode.MAXICODE, plus.barcode.PDF417, plus.barcode.RSS14, plus.barcode.RSSEXPANDED], {
	                frameColor: this.color,
	                scanbarColor: this.color
	            });
	            this.scan.onmarked = this.onmarked;
	            this.scan.start();
	        },
	        reset: function reset() {
	            this.scan.cancel();
	            this.scan.start();
	        },
	        onmarked: function onmarked(type, result, file) {
	            result = result.replace(/\n/g, '');
	            var that = this;
	            var reg = /^https?:\/\/(\S+)\.jinxiudadi\.com\/(\S+?)(\d+)/i;

	            if (reg.exec(result) != null) {
	                if (RegExp.$1 === 'detail' && RegExp.$2 === 'detail/') {
	                    that.setFullscreen();
	                    _muiUtils2.default.openWindow('../../buyer/supplier/product.html', 'buyer_supplier_product.html', {
	                        extras: {
	                            'goods_common_id': RegExp.$3,
	                            'fromSeller': plus.webview.currentWebview().fromSeller
	                        },
	                        createNew: true,
	                        isClose: true
	                    });
	                } else if (RegExp.$1 === 'store' && RegExp.$2 === 'store/home/') {
	                    that.setFullscreen();
	                    _muiUtils2.default.openWindow('../../buyer/store/index.html', 'buyer_store_index.html', {
	                        extras: {
	                            'store_id': RegExp.$3,
	                            'fromSeller': plus.webview.currentWebview().fromSeller
	                        },
	                        createNew: true,
	                        isClose: true
	                    });
	                }
	            } else if (result.indexOf('jinxiudadi\.com') !== -1) {
	                that.setFullscreen();
	                _muiUtils2.default.openWindow(result, result, {
	                    extras: {
	                        'fromSeller': plus.webview.currentWebview().fromSeller
	                    },
	                    isClose: true
	                });
	            } else if (result.indexOf('http:') === 0 || result.indexOf('https:') === 0) {
	                mui.confirm(result + '\n这是一个外站链接，是否打开？', '扫码提示', ['否', '是'], function (e) {
	                    if (e.index === 1) {
	                        plus.runtime.openURL(result);
	                    }
	                    setTimeout(that.reset, 100);
	                });
	            } else {
	                plus.nativeUI.alert(result + '\n暂未处理此类条码.');
	                setTimeout(that.reset, 200);
	            }
	        },
	        scanPicture: function scanPicture() {
	            var that = this;
	            plus.gallery.pick(function (path) {
	                plus.barcode.scan(path, that.onmarked, function (error) {
	                    plus.nativeUI.alert("无法识别此图片");
	                    setTimeout(that.reset, 200);
	                });
	            }, that.reset);
	        },
	        back: function back() {
	            this.setFullscreen();
	            var ani = mui.os.ios ? 'slide-out-bottom' : 'pop-out';
	            setTimeout(function () {
	                plus.webview.currentWebview().close(ani);
	            }, 10);
	        },
	        flashSwitch: function flashSwitch() {
	            this.flash = !this.flash;
	            this.scan.setFlash(this.flash);
	        },
	        setFullscreen: function setFullscreen() {
	            if (mui.os.ios) {
	                plus.navigator.setFullscreen(false);
	            }
	        }
	    },
	    ready: function ready() {
	        this.initScan();
	        if (mui.os.ios) {
	            plus.navigator.setStatusBarBackground(this.color);
	            plus.navigator.setStatusBarStyle('UIStatusBarStyleBlackOpaque');
	        }
	    }
	};

/***/ },

/***/ 54:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 80:
/***/ function(module, exports) {

	module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48IVtDREFUQVsNCkBmb250LWZhY2UgeyBmb250LWZhbWlseTogaWZvbnQ7IHNyYzogdXJsKCIvL2F0LmFsaWNkbi5jb20vdC9mb250XzE0NDIzNzM4OTZfNDc1NDQ1NS5lb3Q/I2llZml4IikgZm9ybWF0KCJlbWJlZGRlZC1vcGVudHlwZSIpLCB1cmwoIi8vYXQuYWxpY2RuLmNvbS90L2ZvbnRfMTQ0MjM3Mzg5Nl80NzU0NDU1LndvZmYiKSBmb3JtYXQoIndvZmYiKSwgdXJsKCIvL2F0LmFsaWNkbi5jb20vdC9mb250XzE0NDIzNzM4OTZfNDc1NDQ1NS50dGYiKSBmb3JtYXQoInRydWV0eXBlIiksIHVybCgiLy9hdC5hbGljZG4uY29tL3QvZm9udF8xNDQyMzczODk2XzQ3NTQ0NTUuc3ZnI2lmb250IikgZm9ybWF0KCJzdmciKTsgfQ0KDQpdXT48L3N0eWxlPjwvZGVmcz48ZyBjbGFzcz0idHJhbnNmb3JtLWdyb3VwIj48ZyB0cmFuc2Zvcm09InNjYWxlKDAuMTk1MzEyNSwgMC4xOTUzMTI1KSI+PHBhdGggZD0iTTY0MCA0MDUuMDM0NjY3IDY0MCA0NTIuMTM4NjY3IDM3MC4zMDQgMjEzLjMzMzMzMyA3MjQuMjY2NjY3IDIxMy4zMzMzMzNDNzI0Ljk0OTMzMyAyMjAuMzUyIDcyNS4zMzMzMzMgMjI3LjQ1NiA3MjUuMzMzMzMzIDIzNC42NjY2NjcgNzI1LjMzMzMzMyAzMDQuMzg0IDY5MS43MzMzMzMgMzY2LjEwMTMzMyA2NDAgNDA1LjAzNDY2N1pNMjk4LjY2NjY2NyAxNDkuOTA5MzMzIDI5OC42NjY2NjcgMTA2LjY2NjY2NyA3MjUuMzMzMzMzIDEwNi42NjY2NjcgNzI1LjMzMzMzMyAxNzAuNjY2NjY3IDMyMi4xMTIgMTcwLjY2NjY2NyAyOTguNjY2NjY3IDE0OS45MDkzMzNaTTg1Ny4xOTQ2NjcgODQxLjM0NCA2NDAgNjQ5LjAwMjY2NyA2NDAgODk2IDM4NCA4OTYgMzg0IDQyMi4zMzYgMTEzLjEwOTMzMyAxODIuNDY0IDE2OS43OTIgMTE4LjY1NiA5MTMuODc3MzMzIDc3Ny41NTczMzMgODU3LjE5NDY2NyA4NDEuMzQ0WiIgZmlsbD0iI2ZmZmZmZiI+PC9wYXRoPjwvZz48L2c+PC9zdmc+"

/***/ },

/***/ 81:
/***/ function(module, exports) {

	module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48IVtDREFUQVsNCkBmb250LWZhY2UgeyBmb250LWZhbWlseTogaWZvbnQ7IHNyYzogdXJsKCIvL2F0LmFsaWNkbi5jb20vdC9mb250XzE0NDIzNzM4OTZfNDc1NDQ1NS5lb3Q/I2llZml4IikgZm9ybWF0KCJlbWJlZGRlZC1vcGVudHlwZSIpLCB1cmwoIi8vYXQuYWxpY2RuLmNvbS90L2ZvbnRfMTQ0MjM3Mzg5Nl80NzU0NDU1LndvZmYiKSBmb3JtYXQoIndvZmYiKSwgdXJsKCIvL2F0LmFsaWNkbi5jb20vdC9mb250XzE0NDIzNzM4OTZfNDc1NDQ1NS50dGYiKSBmb3JtYXQoInRydWV0eXBlIiksIHVybCgiLy9hdC5hbGljZG4uY29tL3QvZm9udF8xNDQyMzczODk2XzQ3NTQ0NTUuc3ZnI2lmb250IikgZm9ybWF0KCJzdmciKTsgfQ0KDQpdXT48L3N0eWxlPjwvZGVmcz48ZyBjbGFzcz0idHJhbnNmb3JtLWdyb3VwIj48ZyB0cmFuc2Zvcm09InNjYWxlKDAuMTk1MzEyNSwgMC4xOTUzMTI1KSI+PHBhdGggZD0iTTI5OC42NjY2NjcgMTgxLjMzMzMzMyAyOTguNjY2NjY3IDExNy4zMzMzMzMgNzI1LjMzMzMzMyAxMTcuMzMzMzMzIDcyNS4zMzMzMzMgMTgxLjMzMzMzMyAyOTguNjY2NjY3IDE4MS4zMzMzMzNaTTcyNC4yNDUzMzMgMjM0LjY2NjY2N0M3MjQuOTQ5MzMzIDI0MS42ODUzMzMgNzI1LjMzMzMzMyAyNDguNzg5MzMzIDcyNS4zMzMzMzMgMjU2IDcyNS4zMzMzMzMgMzI1LjcxNzMzMyA2OTEuNzMzMzMzIDM4Ny40MzQ2NjcgNjQwIDQyNi4zNjhMNjQwIDkxNy4zMzMzMzMgMzg0IDkxNy4zMzMzMzMgMzg0IDQyNi4zNjhDMzMyLjI2NjY2NyAzODcuNDM0NjY3IDI5OC42NjY2NjcgMzI1LjcxNzMzMyAyOTguNjY2NjY3IDI1NiAyOTguNjY2NjY3IDI0OC43ODkzMzMgMjk5LjA1MDY2NyAyNDEuNjg1MzMzIDI5OS43MzMzMzMgMjM0LjY2NjY2N0w3MjQuMjQ1MzMzIDIzNC42NjY2NjdaTTUxMiA1NzZDNTM1LjU3MzMzMyA1NzYgNTU0LjY2NjY2NyA1NTYuOTA2NjY3IDU1NC42NjY2NjcgNTMzLjMzMzMzMyA1NTQuNjY2NjY3IDUwOS43NiA1MzUuNTczMzMzIDQ5MC42NjY2NjcgNTEyIDQ5MC42NjY2NjcgNDg4LjQyNjY2NyA0OTAuNjY2NjY3IDQ2OS4zMzMzMzMgNTA5Ljc2IDQ2OS4zMzMzMzMgNTMzLjMzMzMzMyA0NjkuMzMzMzMzIDU1Ni45MDY2NjcgNDg4LjQyNjY2NyA1NzYgNTEyIDU3NloiIGZpbGw9IiNmZmZmZmYiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg=="

/***/ },

/***/ 107:
/***/ function(module, exports, __webpack_require__) {

	module.exports = "\n\n\n\n\n\n\n<div id=\"bcid\">\n    <div class=\"barcode-content\"></div>\n    <p class=\"tip\">...载入中...</p>\n</div>\n<footer>\n    <div class=\"fbt\" style=\"background-color: {{color}};\" @tap=\"back\">取　 消</div>\n    <div class=\"fbt\" style=\"background-color: {{color}};\" @tap=\"scanPicture\">从相册选择</div>\n    <div class=\"fbt more\" style=\"background-color: {{color}};\" @tap=\"flashSwitch()\">\n        <a href=\"javascript:void(0)\" class=\"flash\">\n            <img  onerror=\'this.src=\"../../static/img/placehold.png\"\' v-show=\"flash\"  src=\"" + __webpack_require__(81) + "\">\n            <img  onerror=\'this.src=\"../../static/img/placehold.png\"\' v-else src=\"" + __webpack_require__(80) + "\">\n        </a>\n    </div>\n</footer>\n";

/***/ },

/***/ 131:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(54)
	__vue_script__ = __webpack_require__(44)
	if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
	  console.warn("[vue-loader] src\\view\\commonpage\\barcodescan\\index\\App.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(107)
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