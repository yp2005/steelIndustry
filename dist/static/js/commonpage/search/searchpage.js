webpackJsonp([3,0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _vue = __webpack_require__(5);

	var _vue2 = _interopRequireDefault(_vue);

	var _vueRouter = __webpack_require__(6);

	var _vueRouter2 = _interopRequireDefault(_vueRouter);

	var _App = __webpack_require__(135);

	var _App2 = _interopRequireDefault(_App);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_vue2.default.use(_vueRouter2.default);
	var router = new _vueRouter2.default();

	mui.init({
	    swipeBack: true
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

/***/ 4:
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(1))(180);

/***/ },

/***/ 5:
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(3))(231);

/***/ },

/***/ 6:
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(3))(233);

/***/ },

/***/ 7:
/***/ function(module, exports) {

	module.exports = vendorVue_library;

/***/ },

/***/ 12:
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(1))(171);

/***/ },

/***/ 13:
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(7))(205);

/***/ },

/***/ 19:
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(1))(181);

/***/ },

/***/ 31:
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(1))(175);

/***/ },

/***/ 32:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _stringify = __webpack_require__(138);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _SimpleList = __webpack_require__(120);

	var _SimpleList2 = _interopRequireDefault(_SimpleList);

	var _consts = __webpack_require__(4);

	var _consts2 = _interopRequireDefault(_consts);

	var _cacheUtils = __webpack_require__(31);

	var _cacheUtils2 = _interopRequireDefault(_cacheUtils);

	var _muiUtils = __webpack_require__(2);

	var _muiUtils2 = _interopRequireDefault(_muiUtils);

	var _api = __webpack_require__(19);

	var _api2 = _interopRequireDefault(_api);

	var _logUtils = __webpack_require__(12);

	var _logUtils2 = _interopRequireDefault(_logUtils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    data: function data() {
	        return {
	            hotSeachData: []
	        };
	    },
	    props: {
	        historySearchDatas: Array,
	        modelName: String,
	        hotSearch: Boolean
	    },
	    methods: {
	        clear: function clear() {
	            var btnArray = ['取消', '确定'];
	            var that = this;
	            mui.confirm('确认清空历史搜索吗？', '操作提示', btnArray, function (e) {
	                if (e.index == 1) {
	                    that.historySearchDatas = [];
	                }
	            });
	        },
	        doSearch: function doSearch(data) {
	            this.$dispatch('itemtap', data);
	        }
	    },
	    watch: {
	        historySearchDatas: function historySearchDatas() {
	            if (this.modelName) {
	                _cacheUtils2.default.localStorage(this.modelName).set(_consts2.default.SEARCH_HISTORY_KEY, (0, _stringify2.default)(this.historySearchDatas));
	            }
	        }
	    },
	    created: function created() {
	        if (this.hotSearch) {
	            var that = this;
	            var params = {};
	            _muiUtils2.default.muiAjax(_api2.default.GOODS_API.goods_hot_search, {
	                data: (0, _stringify2.default)(params),
	                contentType: 'application/json',
	                dataType: "json",
	                type: "post",
	                success: function success(data) {
	                    if (data.header.code === _consts2.default.ERROR_CODE.SUCCESS) {
	                        that.hotSeachData = data.hot_search;
	                    } else {
	                        mui.toast(data.header.msg);
	                    }
	                },
	                error: function error(xhr, type, errorThrown) {
	                    that.hotSearch = false;
	                    _logUtils2.default.info(type + ' ' + errorThrown, 'SearchPage.vue created');
	                },
	                loading: false
	            });
	        }
	    },
	    ready: function ready() {
	        var deceleration = mui.os.ios ? 0.003 : 0.0009;
	        mui('.mui-scroll-wrapper').scroll({
	            bounce: false,
	            indicators: false,
	            deceleration: deceleration
	        });
	    },
	    components: {
	        simpleList: _SimpleList2.default
	    }
	};

/***/ },

/***/ 33:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = {
		props: {
			listitem: Array
		},
		methods: {
			itemDelete: function itemDelete(index) {
				this.listitem.splice(index, 1);
			},
			itemTap: function itemTap(item) {
				this.$dispatch('itemtap', item);
			}
		},
		ready: function ready() {}
	};

/***/ },

/***/ 48:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _Header = __webpack_require__(13);

	var _Header2 = _interopRequireDefault(_Header);

	var _SearchPage = __webpack_require__(119);

	var _SearchPage2 = _interopRequireDefault(_SearchPage);

	var _muiUtils = __webpack_require__(2);

	var _muiUtils2 = _interopRequireDefault(_muiUtils);

	var _cacheUtils = __webpack_require__(31);

	var _cacheUtils2 = _interopRequireDefault(_cacheUtils);

	var _arrayUtils = __webpack_require__(136);

	var _arrayUtils2 = _interopRequireDefault(_arrayUtils);

	var _consts = __webpack_require__(4);

	var _consts2 = _interopRequireDefault(_consts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    data: function data() {
	        var historySearchDatas = _cacheUtils2.default.localStorage(plus.webview.currentWebview().modelName).get(_consts2.default.SEARCH_HISTORY_KEY);
	        var modelName = plus.webview.currentWebview().modelName;
	        var typeclass = modelName && (modelName === 'home' || modelName === 'buyer_activity') ? 'goodsShops' : 'insearchpage';
	        typeclass = modelName && modelName === 'contract' ? 'goodsShops3' : typeclass;
	        typeclass = modelName && modelName === 'sellergoodsmanage' ? 'goodsShops' : typeclass;
	        return {
	            typeclass: typeclass,
	            hdstyle: {
	                searchBar: {
	                    display: true,
	                    placeholder: plus.webview.currentWebview().placeholder ? plus.webview.currentWebview().placeholder : '请输入关键字'
	                },
	                searchTypeBut: {
	                    display: plus.webview.currentWebview().searchTypeBut ? true : 'none'
	                },
	                rightButton: {
	                    display: true,
	                    text: '取消',
	                    onClick: function onClick() {
	                        plus.webview.currentWebview().close();
	                    }
	                }
	            },
	            historySearchDatas: historySearchDatas ? JSON.parse(historySearchDatas) : [],
	            modelName: plus.webview.currentWebview().modelName,
	            inSearchPage: true,
	            searchValue: plus.webview.currentWebview().searchValue,
	            parentPage: plus.webview.currentWebview().parentPage,
	            gotoPage: plus.webview.currentWebview().gotoPage,
	            fromSellerPage: plus.webview.currentWebview().fromSellerPage,
	            searchTypes: plus.webview.currentWebview().searchTypeBut,
	            hotSearch: plus.webview.currentWebview().hotSearch,
	            searchType: plus.webview.currentWebview().searchType,
	            extras: plus.webview.currentWebview().extras
	        };
	    },
	    methods: {
	        blurSearch: function blurSearch() {
	            mui('input[type=search]')[0].blur();
	        },
	        doSearch: function doSearch() {
	            this.searchValue = this.searchValue.replace(/^\s*$/, '');
	            if (this.searchValue !== '' && this.searchValue != null) {
	                var index = _arrayUtils2.default.arrayIndex(this.historySearchDatas, this.searchValue);
	                if (index !== -1) {
	                    this.historySearchDatas.splice(index, 1);
	                }
	                if (this.historySearchDatas.length >= 15) {
	                    this.historySearchDatas.pop();
	                }
	                this.historySearchDatas.unshift(this.searchValue);
	            } else {
	                mui.toast('请输入搜索关键字!');
	                return;
	            }

	            if (this.gotoPage) {
	                var id = this.gotoPage === '../../commonpage/buyinghall/index.html' ? 'seller_commonpage_buyinghall_index.html' : this.gotoPage;
	                id = this.gotoPage === '../../buyer/homesearch/index.html' ? 'buyer_homesearch_index.html' : id;
	                if (id === 'buyer_homesearch_index.html' && this.extras && this.extras.store_id) {
	                    id += '_' + this.extras.store_id + '_' + plus.webview.all().length;
	                }
	                _muiUtils2.default.openWindow(this.gotoPage, id, {
	                    extras: {
	                        'searchValue': this.searchValue,
	                        'searchType': this.searchType,
	                        'fromSellerPage': this.fromSellerPage,
	                        'extras': this.extras
	                    },
	                    isClose: true
	                });
	            } else {
	                mui.fire(plus.webview.getWebviewById(this.parentPage), 'doSearch', {
	                    searchValue: this.searchValue,
	                    searchType: this.searchType
	                });
	                plus.webview.currentWebview().close();
	            }
	        },

	        historyDataSearch: function historyDataSearch(item) {
	            this.searchValue = item;
	            this.doSearch();
	        }
	    },
	    ready: function ready() {
	        var nativeWebview = plus.webview.currentWebview().nativeInstanceObject();
	        if (mui.os.android) {
	            var main = plus.android.runtimeMainActivity();
	            var Context = plus.android.importClass('android.content.Context');
	            var InputMethodManager = plus.android.importClass('android.view.inputmethod.InputMethodManager');
	            var imm = main.getSystemService(Context.INPUT_METHOD_SERVICE);
	            plus.android.importClass(nativeWebview);
	            nativeWebview.requestFocus();
	            imm.toggleSoftInput(0, InputMethodManager.SHOW_FORCED);
	            setTimeout(function () {
	                mui('input[type=search]')[0].focus();
	            }, 50);
	        } else {
	            nativeWebview.plusCallMethod({
	                'setKeyboardDisplayRequiresUserAction': false
	            });
	            setTimeout(function () {
	                mui('input[type=search]')[0].focus();
	            }, 200);
	        }
	    },
	    components: {
	        vheader: _Header2.default,
	        searchPage: _SearchPage2.default
	    }
	};

/***/ },

/***/ 57:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 63:
57,

/***/ 64:
57,

/***/ 98:
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjdFNjNBQjBGNjI4ODExRTY4QjFDQTlGNjQ2NEUwNzdEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjdFNjNBQjEwNjI4ODExRTY4QjFDQTlGNjQ2NEUwNzdEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6N0U2M0FCMEQ2Mjg4MTFFNjhCMUNBOUY2NDY0RTA3N0QiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6N0U2M0FCMEU2Mjg4MTFFNjhCMUNBOUY2NDY0RTA3N0QiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5YIUnYAAABHklEQVR42qyVQYrCMBSGMw8HvE+vMSsPoehWF3UhwzBgK+hCBMUbzGq2s/AK7WEGXAizmT+SSKxp+pLng5/QkHxf+0LoS1VVX0qpATJHNiqysix7mKvreohhi5zIwF+RNZIrYQE+xnBE+sgbmTe3VUgkBr53pj7JtEUs8cBXaN87mYdSImmBX/eTM5kk8cCXFq6r11hfOnB3LFv4Tfgc8Lu15NnE/ZJOeJuAI2HBfS3itOuXC+8ShCQseKhFoXbd4IHDjxLoOqfebo5AH+7OM8+6J8SAF422TFwJLlqeKvDBdc8PMRKKhNtiSygBHiWhRDhbQgK4/WUGJSSBd0gKK5hK4AFJDskHPQMekCy04Bv5Q2YSeEMyQi7Iz78AAwDkDYEQeSBC0wAAAABJRU5ErkJggg=="

/***/ },

/***/ 110:
/***/ function(module, exports) {

	module.exports = "\r\n\r\n<vheader :hdstyle=\"hdstyle\" :in-search-page=\"inSearchPage\" :search-value.sync=\"searchValue\" :current-search-type.sync=\"searchType\" :search-types=\"searchTypes\" :typeclass=\"typeclass\">\r\n</vheader>\r\n<div class=\"mui-content\">\r\n    <search-page :history-search-datas.sync=\"historySearchDatas\" :hot-search=\"hotSearch\" :model-name=\"modelName\" @touchstart=\"blurSearch\" @itemtap=\"historyDataSearch\"></search-page>\r\n</div>\r\n\r\n";

/***/ },

/***/ 116:
/***/ function(module, exports) {

	module.exports = "\n\n\n\n\n\n\n\n\n\n\n\n\n\n<div class=\"search-page mui-scroll-wrapper\" _v-73225013=\"\">\n    <div class=\"mui-scroll\" _v-73225013=\"\">\n        <template v-if=\"hotSearch\">\n            <div class=\"hot-opb\" _v-73225013=\"\">\n                热门搜索\n            </div>\n            <div class=\"hot-search\" _v-73225013=\"\">\n                <a href=\"javascript:void(0);\" v-for=\"data in hotSeachData\" @tap=\"doSearch(data)\" _v-73225013=\"\">{{data}}</a>\n            </div>\n        </template>\n\n        <div class=\"history-opb\" _v-73225013=\"\">\n            最近搜索\n        </div>\n        <div class=\"history\" _v-73225013=\"\">\n            <simple-list :listitem.sync=\"historySearchDatas\" @itemtap=\"doSearch\" _v-73225013=\"\"></simple-list>\n        </div>\n        <div class=\"clears\" _v-73225013=\"\">\n            <a v-if=\"historySearchDatas.length > 0\" href=\"javascript:void(0);\" @tap=\"clear\" _v-73225013=\"\">清空最近搜索</a>\n        </div>\n    </div>\n</div>\n";

/***/ },

/***/ 117:
/***/ function(module, exports, __webpack_require__) {

	module.exports = "\n\n\n\n\n\n\n\n\n\n\n\n\n<!--下拉刷新容器 -->\n<ul id=\"OA_task_1\" class=\"mui-table-view searchLists\" _v-758b6922=\"\">\n\t<li v-for=\"(index, item) in listitem\" class=\"mui-table-view-cell\" _v-758b6922=\"\">\n\t\t<div class=\"mui-slider-right mui-disabled\" _v-758b6922=\"\">\n\t\t\t<a @tap=\"itemDelete(index)\" class=\"mui-btn\" _v-758b6922=\"\">\n\t\t\t\t<img  onerror=\'this.src=\"../../static/img/placehold.png\"\' src=\"" + __webpack_require__(98) + "\" _v-758b6922=\"\">\n\t\t\t</a>\n\t\t</div>\n\t\t<div @tap=\"itemTap(item)\" class=\"mui-slider-handle\" _v-758b6922=\"\">\n\t\t\t{{*item}}\n\t\t</div>\n\t</li>\n</ul>\n";

/***/ },

/***/ 119:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(63)
	__vue_script__ = __webpack_require__(32)
	if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
	  console.warn("[vue-loader] src\\component\\SearchPage.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(116)
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


/***/ },

/***/ 120:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(64)
	__vue_script__ = __webpack_require__(33)
	if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
	  console.warn("[vue-loader] src\\component\\list\\SimpleList.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(117)
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


/***/ },

/***/ 135:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(57)
	__vue_script__ = __webpack_require__(48)
	if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
	  console.warn("[vue-loader] src\\view\\commonpage\\search\\searchpage\\App.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(110)
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


/***/ },

/***/ 136:
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(1))(204);

/***/ },

/***/ 138:
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(1))(49);

/***/ }

});