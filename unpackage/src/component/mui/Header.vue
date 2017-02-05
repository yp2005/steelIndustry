<template>
	<div v-show="showHeader" id="headerDiv" class="mui-bar mui-bar-nav {{typeclass}}" style="height: {{headerHeight}};">
		<div>
			<a href="javascript:void(0)" style="display: {{hdstyleDef.back.display}}" class="mui-action-back mui-icon mui-icon-back mui-pull-left jxddicon icon-houtui44"></a>
			<span style="display: {{hdstyleDef.citySelect.display}}" class="citySelect" @tap="selectAddress">
            	<input type="button" value="{{address.county || address.city || address.province}}">
            	<span class="jxddicon icon-xialaxuanxiang"></span>
			<div class="ui-alert"></div>
			</span>
			<div style="display: {{hdstyleDef.headerTabbar.display}}" class="header-tabbar">
				<div class="goodsTitle">
					<a href="javascript:void(0)" v-for="item in headerTabbarData" @tap="setTabbarValue($index)" class="header-tabbar-item {{currentTabbarValue === item.value ? 'active' : ''}} {{$index===0?'left':'right'}}" value="{{item.value}}">
						{{item.text}}
					</a>
				</div>
			</div>
			<a style="display: {{hdstyleDef.searchTypeBut.display}}" href="#searchType" class="search-type mui-pull-left">
				{{searchTypes[currentSearchTypeIndex].name}}
			</a>
			<form class="mui-input-group formInput" action="#" onsubmit="return false;" @submit="search">
				<div style="display: {{hdstyleDef.searchBar.display==='none'?'none':'inline'}}" class="mui-input-row inputRow">
					<input type="search" class="mui-input-clear mui-input" maxlength="50" :placeholder="hdstyleDef.searchBar.placeholder" @focus="searchFocus" v-model="value">
					<span @tap="inputClear" class="mui-icon mui-icon-clear {{value===''||value===null?'mui-hidden':''}}"></span>
				</div>
			</form>
			<h1 style="display: {{hdstyleDef.title.display}}" class="mui-title">{{title}}</h1>
			<a href="javascript:void(0)" style="display: {{hdstyleDef.rightButton.display}}" @tap="hdstyleDef.rightButton.onClick(this)" class="mui-btn mui-btn-link mui-pull-right {{hdstyleDef.rightButton.text === '首页' ? 'jxddicon icon-shouye' : ''}} {{hdstyleDef.rightButton.text === '我的求购' ? 'jxddicon icon-wodeqiugou0' : ''}}">
				<i>{{hdstyleDef.rightButton.text}}</i>
			</a>
			<a href="javascript:void(0)" style="display: {{hdstyleDef.rightSearchBtn.display}}; margin-right: {{hdstyleDef.rightSearchBtn.marginright}};" @tap="searchFocus" class="right-search-btn"><span class="jxddicon icon-sousuo"></span></a>
			<div class="barcode" @tap="hdstyleDef.rightBarcodeBtn.onClick(this)" style="display: {{hdstyleDef.rightBarcodeBtn.display}};">
				<i class="jxddicon icon-saoyisao" style="color: {{hdstyleDef.rightBarcodeBtn.color || '#ffffff'}};"></i>
				<p class="rightBarcodeBtnC" style="color: {{hdstyleDef.rightBarcodeBtn.color || '#ffffff'}};">扫一扫</p>
			</div>
			<a style="display: {{hdstyleDef.rightMenu.display}}" href="#rightMenuOptions" class="rightMenu">
			</a>
		</div>
	</div>
	<div id="searchType" class="mui-popover" style="height: {{searchTypes ? searchTypes.length * 30 + 'px' : '60px'}};">
		<div class="mui-popover-arrow"></div>
		<div class="mui-scroll-wrapper">
			<div class="mui-scroll">
				<ul class="mui-table-view">
					<li v-for="type in searchTypes" class="mui-table-view-cell">
						<a href="javascript:void(0)" @tap="selectSearchType($index)" class="{{type.name === '商品' ? 'jxddicon icon-shangpin' : ''}} {{type.name === '店铺' ? 'jxddicon icon-dianpu' : ''}} {{type.name === '品牌' ? 'jxddicon icon-pinpai' : ''}} {{type.name === '合同号' ? 'contractSearchType' : ''}} {{type.name === '商品名' ? 'contractSearchType' : ''}}">{{type.name}}</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
	<div id="rightMenuOptions" class="mui-popover" style="height: {{menuOptions ? menuOptions.length * 30 + 'px' : '60px'}};">
		<div class="mui-popover-arrow"></div>
		<div class="mui-scroll-wrapper">
			<div class="mui-scroll">
				<ul class="mui-table-view">
					<li v-for="option in menuOptions" class="mui-table-view-cell">
						<a href="javascript:void(0)" @tap="menuOptionTap(option)" class="{{option.icon}}">{{option.name}}</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
	<div @tap="openNetWorkSettings" class="nonetwork" v-show="nonetwork"><img class="networkicon" src="./net.svg"></span><span>网络请求失败，请检查您的网络设置</span><span class="mui-icon mui-icon-arrowright networkicon2"></span></div>
</template>

<script>
	import CONSTS from 'common/consts';
	import muiUtils from 'common/muiUtils';
	import {
		cityData3Lev
	} from 'common/cityData';
	export default {
		data: function() {
			var cityPicker = new mui.PopPicker({
				layer: 3
			});
			for(var cityData of cityData3Lev) {
				for(var city of cityData.children) {
					city.children.unshift({
						value: -1,
						area_parent_id: city.value,
						text: '全' + city.text,
						area_sort: 0,
						area_deep: 3,
						description: null
					});
				}
				cityData.children.unshift({
					value: -1,
					area_parent_id: cityData.value,
					text: '全' + cityData.text,
					area_sort: 0,
					area_deep: 2,
					description: null
				});
			}
			cityPicker.setData(cityData3Lev);
			return {
				cityPicker: cityPicker,
				headerHeight: '45px',
				currentPage: null,
				currentSearchTypeIndex: 0,
				nonetwork: false
			};
		},
		props: {
			navIndex: Number, // 当前路由
			title: String, // 标题
			typeclass: { // 不同header调用的class,必需传
				type: String,
				default: 'base'
			},
			searchValue: { // 搜索值
				type: String,
				default: ''
			},
			value: { // 搜索框输入的值
				type: String,
				default: ''
			},
			address: {
				type: Object,
				default: {
					province: '北京',
					provinceid: 1,
					city: '北京市',
					cityid: 36,
					county: null,
					countyid: null
				}
			},
			hdstyleDef: { // 组件呈现样式默认定义
				type: Object,
				default: function() {
					return {
						back: {
							display: 'none'
						},
						citySelect: {
							display: 'none'
						},
						title: {
							display: 'none'
						},
						headerTabbar: {
							display: 'none'
						},
						searchTypeBut: { // 搜索类型点击下拉菜单部件，外部组件不需要传递此值，此部件只在搜索页使用
							display: 'none'
						},
						searchBar: {
							display: 'none',
							placeholder: '请输入商品名称的关键字',
							modelName: '', // 搜索历史在本地缓存中存放的key
							gotoPage: undefined, // 进入搜索页点击搜索如果不是返回当前页而是跳转到其他页面，设置跳转页面的url
							searchTypeBut: [{ // 搜索页是否显示搜索类型下拉菜单按钮，不显示不要设置这个值
								name: '商品',
								value: 'goods'
							}, {
								name: '店铺',
								value: 'store'
							}],
							hotSearch: false, // 搜索页是否显示热门搜索
							extras: {}
						},
						rightButton: {
							display: 'none',
							text: '编辑',
							onClick: function() {} // 右侧按钮点击事件处理方法
						},
						rightSearchBtn: {
							display: 'none',
							marginright: '0px',
							modelName: ''
						},
						rightBarcodeBtn: {
							display: 'none',
							color: '#ffffff',
							onClick: function() {}
						},
						rightMenu: {
							display: 'none'
						}
					};
				}
			},
			hdstyle: Object, // 接收组件样式的参数，覆盖默认样式
			inSearchPage: {
				type: Boolean,
				default: false
			},
			headerTabbarData: {
				type: Array,
				default: function() {
					return [{
						text: '商品',
						value: 'goods'
					}, {
						text: '详情',
						value: 'detail'
					}];
				}
			},
			currentTabbarValue: String,
			searchTypes: {
				type: Array,
				default: function() {
					return [{
						name: '商品',
						value: 'goods'
					}, {
						name: '店铺',
						value: 'store'
					}];
				}
			},
			menuOptions: {
				type: Array,
				default: function() {
					return [{
						name: '消息',
						url: 'message',
						icon: 'message'
					}, {
						name: '首页',
						url: 'home',
						icon: 'home'
					}, {
						name: '分享',
						url: 'share',
						icon: 'share'
					}, {
						name: '举报',
						url: 'report',
						icon: 'report'
					}];
				}
			},
			currentSearchType: String,
			showHeader: {
				type: Boolean,
				default: true
			}
		},
		methods: {
			/**
			 * @desc 搜索框点击搜索时的处理方法
			 */
			search: function() {
				mui('input[type=search]')[0].blur();
				if(this.inSearchPage) {
					this.searchValue = this.value;
					this.$parent.doSearch();
				}
			},
			searchFocus: function() {
				if(!this.inSearchPage) {
					if(plus) {
						if(!this.currentPage) {
							this.currentPage = plus.webview.currentWebview();
						}
						muiUtils.openWindow('../../commonpage/search/searchpage.html', 'commonpage_searchpage.html', {
							extras: {
								'modelName': this.hdstyleDef.searchBar.modelName === '' ? this.hdstyleDef.rightSearchBtn.modelName : this.hdstyleDef.searchBar.modelName,
								'searchValue': this.searchValue,
								'searchType': this.currentSearchType,
								'parentPage': this.currentPage.id,
								'gotoPage': this.hdstyleDef.searchBar.gotoPage,
								'fromSellerPage': this.hdstyleDef.searchBar.fromSellerPage,
								'searchTypeBut': this.hdstyleDef.searchBar.searchTypeBut,
								'hotSearch': this.hdstyleDef.searchBar.hotSearch,
								'placeholder': this.hdstyleDef.searchBar.placeholder,
								'extras': this.hdstyleDef.searchBar.extras
							}
						});
					}
					mui('input[type=search]')[0].blur();
				}
			},
			/**
			 * @desc 搜索框右侧小×点击时清楚输入内容
			 */
			inputClear: function() {
				this.value = '';
				if(!this.inSearchPage) {
					this.searchValue = this.value;
				}
			},
			setTabbarValue: function(index) {
				this.currentTabbarValue = this.headerTabbarData[index].value;
				this.$dispatch('tabbarvaluechange', this.currentTabbarValue);
			},
			selectSearchType: function(index) {
				this.currentSearchType = this.searchTypes[index].value;
				this.currentSearchTypeIndex = index;
				var searchType = document.getElementById('searchType');
				searchType.style.display = 'none';
				searchType.className = 'mui-popover';
				var backdrop = document.querySelector('.mui-backdrop');
				setTimeout(function() {
					backdrop.parentNode.removeChild(backdrop);
				}, 100);
			},
			menuOptionTap(option) {
				//跳转页面动作
				if(option.name === '首页') {
					muiUtils.openIndexWindow();
				}
				else {
					muiUtils.openWindow(option.url, option.url);
				}
				var searchType = document.getElementById('rightMenuOptions');
				searchType.style.display = 'none';
				searchType.className = 'mui-popover';
				var backdrop = document.querySelector('.mui-backdrop');
				setTimeout(function() {
					backdrop.parentNode.removeChild(backdrop);
				}, 100);
			},
			openNetWorkSettings: () => {
				if(mui.os.ios) {
					plus.runtime.launchApplication({
						action: 'prefs:root=MOBILE_DATA_SETTINGS_ID'
					}, function(e) {}); // WIFI
				} else {
					var main = plus.android.runtimeMainActivity();
					var Intent = plus.android.importClass('android.content.Intent');
					var mIntent = new Intent('android.settings.WIFI_SETTINGS');
					main.startActivity(mIntent);
				}
			},
			selectAddress: function() {
				var that = this;
				this.cityPicker.show(function(items) {
					that.address = {
						province: items[0].text,
						provinceid: items[0].value,
						city: items[1].value && items[1].value !== -1 ? items[1].text : undefined,
						cityid: items[1].value && items[1].value !== -1 ? items[1].value : undefined,
						county: items[2].value && items[2].value !== -1 ? items[2].text : undefined,
						countyid: items[2].value && items[2].value !== -1 ? items[2].value : undefined
					}
				});
			}
		},
		ready: function() {
			let that = this;
			mui.plusReady(() => {
				that.nonetwork = plus.networkinfo.getCurrentType() === 1;
			});
			if(this.inSearchPage) {
				if(this.currentSearchType !== undefined && this.currentSearchType !== null && this.currentSearchType !== '') {
					for(var i = 0; i < this.searchTypes.length; i++) {
						if(this.searchTypes[i].value === this.currentSearchType) {
							this.currentSearchTypeIndex = i;
						}
					}
				} else {
					this.currentSearchType = this.searchTypes[0].value;
				}
			}
			window.addEventListener('doSearch', function(event) {
				that.searchValue = event.detail.searchValue;
				that.value = event.detail.searchValue;
				that.currentSearchType = event.detail.searchType;
			});
			this.currentTabbarValue = this.headerTabbarData[0].value;
			document.addEventListener('netchange', () => {
				if(muiUtils.getNetworkType() === 1) {
					that.nonetwork = true;
				} else {
					that.nonetwork = false;
				}
			});
		},
		/**
		 * @desc 在实例创建后使用hdstyle传进来的header样式覆盖默认的样式，并且备份搜索框提示
		 */
		created: function() {
			mui.extend(this.hdstyleDef, this.hdstyle);
			this.value = this.searchValue;
		}
	};
</script>

<style scoped>
	.nonetwork {
		top: 45px;
		position: fixed;
		z-index: 1000;
		background: #000;
		color: #fff;
		opacity: 0.6;
		width: 100%;
		width: 100vw;
		line-height: 36px;
		line-height: 10vw;
		padding: 0 5px;
		padding: 0 2vw;
		font-size: 16px;
		font-size: 4.5vw;
	}
	
	.nonetwork .networkicon {
		margin-right: 10px;
		margin-right: 4vw;
		height: 16px;
		height: 5vw;
	}
	
	.nonetwork .networkicon2 {
		float: right;
		line-height: 36px;
		line-height: 10vw;
	}
	/*public   全公用  start*/
	
	.rightBarcodeBtnC {
		font-size: 6px;
		text-align: center;
		margin-top: 2px;
	}
	
	.mui-bar-nav .mui-input-group .inputRow {
		-webkit-border-radius: 6px;
		-moz-border-radius: 6px;
		border-radius: 6px;
		background: #f3f5f7;
		border: 1px solid #f3f5f7;
	}
	/*citySelect start*/
	
	.citySelect {
		line-height: 15px;
		position: absolute;
		top: 0;
		padding: 15px 0 9px 0;
		z-index: 3;
	}
	
	.citySelect input[type=button] {
		border: none;
		color: #fff;
		font-size: 15px;
		background: #333;
		line-height: 15px;
		padding-right: 1px;
		padding-top: 0;
	}
	
	.citySelect .jxddicon {
		font-size: 15px;
		height: 15px;
		line-height: 15px;
	}
	/*citySelect end*/
	/*rightMenu start*/
	
	.rightMenu {
		position: absolute;
		background: url(../../static/img/more.svg);
		background-size: 21px 28px;
		background-repeat: no-repeat;
		right: 0;
		min-width: 0 !important;
		padding-left: 35px;
		z-index: 3;
	}
	
	#rightMenuOptions {
		background-color: rgba(0, 0, 0, 0.4);
		left: inherit !important;
		right: 1px !important;
		top: 42px !important;
	}
	
	#rightMenuOptions .mui-table-view {
		background-color: rgba(0, 0, 0, 0.4);
	}
	
	#rightMenuOptions .mui-table-view-cell>a:not(.mui-btn) {
		color: #bbb;
	}
	
	#rightMenuOptions .jxddicon:before {
		color: #bbb;
	}
	
	#rightMenuOptions .mui-popover-arrow {
		left: 47px!important;
	}
	
	#rightMenuOptions .mui-popover-arrow:after {
		border-top: 4px solid rgba(0, 0, 0, 0.6);
		border-left: 4px solid rgba(0, 0, 0, 0.6);
	}
	
	#rightMenuOptions .message,
	#rightMenuOptions .home,
	#rightMenuOptions .share,
	#rightMenuOptions .report {
		background-size: 16px 16px;
	}
	
	#rightMenuOptions .home {
		background: url(../../static/img/home.svg) 10px 7px no-repeat;;
	}
	
	#rightMenuOptions .share {
		background: url(../../static/img/share.svg) 10px 7px no-repeat;;
	}
	
	#rightMenuOptions .report {
		background: url(../../static/img/report.svg) 10px 7px no-repeat;;
	}
	
	#rightMenuOptions .message {
		background: url(../../static/img/message.svg) 10px 7px no-repeat;;
	}
	/*rightMenu end*/
	
	.mui-bar-nav input[type=search] {
		background: transparent;
	}
	
	.mui-bar-nav {
		-webkit-box-shadow: 0 0 0 transparent;
		box-shadow: 0 0 0 transparent;
		height: 45px;
		line-height: 45px;
		padding: 0;
		color: #fff;
		background: #333;
	}
	
	.mui-bar-nav> div {
		padding-top: 8px;
		height: 45px;
		line-height: 45px;
		position: relative;
	}
	
	.time-selector {
		position: absolute;
		top: 45px;
		width: 100%;
		z-index: 32;
		background: #FFFFFF;
	}
	/*public   全公用   end*/
	/*search 所有搜索内型 start*/
	
	::-moz-placeholder {
		color: #999999;
		display: -webkit-box;
		overflow: hidden;
		white-space: normal !important;
		text-overflow: ellipsis;
		word-wrap: break-word;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}
	
	::-webkit-input-placeholder {
		color: #999999;
		display: -webkit-box;
		overflow: hidden;
		white-space: normal !important;
		text-overflow: ellipsis;
		word-wrap: break-word;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}
	
	:-ms-input-placeholder {
		color: #999999;
		display: -webkit-box;
		overflow: hidden;
		white-space: normal !important;
		text-overflow: ellipsis;
		word-wrap: break-word;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}
	
	.mui-icon-search:before,
	.inputRow:before {
		-webkit-transform: scale(.5);
		-ms-transform: scale(.5);
		-o-transform: scale(.5);
		transform: scale(.5);
		background: url(../../static/img/search.png);
		position: absolute;
		display: inline;
		z-index: 100;
		margin: 0;
		width: 32px;
		height: 32px;
		right: 50%;
		content: "";
		color: #fff;
	}
	
	.inputRow:before {
		top: -2px;
		left: 0;
	}
	
	.mui-icon-search:before {
		top: -23px;
		left: -12px;
	}
	
	.mui-input-group input[type=text],
	.mui-bar-nav input[type=search] {
		padding: 5px 0;
	}
	
	.mui-bar-nav form {
		position: absolute;
		left: 12px;
		right: 12px;
		width: auto;
		height: 28px;
		z-index: 2;
		background: none;
	}
	
	.mui-input-group .inputRow {
		background: #fff;
		padding: 0 24px 0 30px;
		position: static;
	}
	
	.buyHome.mui-bar-nav {
		background: #333;
	}
	
	.mui-bar-nav .inputRow,
	.mui-bar-nav input[type=search] {
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	
	.search-type {
		display: inline-block;
		background: #f3f5f7;
		height: 28px;
		line-height: 28px;
		font-size: 14px;
		color: #fff;
		width: 92px;
		left: 12px;
		z-index: 30;
		text-align: left;
		text-indent: 12px;
		position: relative;
	}
	
	.search-type:after {
		content: "";
		position: absolute;
		width: 4px;
		height: 4px;
		right: 8px;
		top: 12px;
		box-sizing: border-box;
		border-top: 4px solid #666;
		border-right: 4px solid transparent;
		border-left: 4px solid transparent;
		z-index: 2;
	}
	
	.mui-popover {
		position: fixed;
		width: 77px;
		height: 60px;
		left: 13px !important;
		top: 39px !important;
		-webkit-border-radius: 4px;
		-moz-border-radius: 4px;
		border-radius: 4px;
		-webkit-box-shadow: 0px 0px 7px #999999;
		-moz-box-shadow: 0px 0px 7px #999999;
		box-shadow: 0px 0px 7px #999999;
	}
	
	.mui-popover .mui-popover-arrow {
		top: -8px;
		left: 32px!important;
		width: 12px;
		height: 12px;
	}
	
	.mui-popover .mui-table-view {
		background-color: #ffffff;
	}
	
	.mui-popover .mui-popover-arrow:after {
		top: 4px;
		left: 3px;
		width: 0;
		height: 0;
		border-radius: 0;
		border-top: 4px solid #FFFFFF;
		border-right: 4px solid transparent;
		border-left: 4px solid #FFFFFF;
		border-bottom: 4px solid transparent;
		-webkit-transform: rotate(45deg);
		transform: rotate(45deg);
		background-color: transparent;
	}
	
	.mui-popover .mui-table-view-cell {
		padding: 0;
	}
	
	.mui-popover .mui-table-view-cell>a:not(.mui-btn),
	.mui-popover .mui-scroll-wrapper {
		margin: 0;
	}
	
	.mui-popover .mui-table-view-cell>a:not(.mui-btn) {
		text-align: left;
		font-size: 14px;
		text-indent: 33px;
		color: #666666;
		height: 30px;
		line-height: 30px;
	}
	
	.mui-popover .mui-table-view-cell:after {
		left: 0;
	}
	
	.buyHome .mui-input-group .inputRow,
	.sellHome .mui-input-group .inputRow {
		-webkit-border-radius: 4px;
		-moz-border-radius: 4px;
		border-radius: 4px;
	}
	/*The seller the buyer search 买家卖家首页*/
	
	.buyHome .mui-icon-home,
	.sellHome .mui-icon-home {
		-webkit-border-radius: 4px;
		-moz-border-radius: 4px;
		border-radius: 4px;
	}
	
	.buyHome .inputRow,
	.sellHome .inputRow {
		-webkit-border-radius: 6px;
		-moz-border-radius: 6px;
		border-radius: 6px;
	}
	
	.buyHome .mui-icon-home,
	.buyHome .mui-icon-home> span,
	.sellHome .mui-icon-home,
	.sellHome .mui-icon-home> span {
		height: 28px;
		line-height: 28px;
	}
	
	.buyHome .mui-icon-home,
	.sellHome .mui-icon-home {
		width: 76px;
		padding: 0;
		margin: 0;
		position: absolute;
		left: 12px;
		color: #FFFFFF;
		z-index: 10;
	}
	
	.buyHome .mui-icon-home:before,
	.sellHome .mui-icon-home:before {
		position: absolute;
		right: 4px;
		font-size: 19px;
		top: -1px;
	}
	
	.buyHome .mui-icon-home> span,
	.sellHome .mui-icon-home> span {
		font-size: 14px;
		color: #ffffff;
		text-align: left;
		text-indent: 6px;
		display: inline-block;
		position: absolute;
		height: auto;
		width: 100%;
		line-height: 1;
		padding: 5px 0;
		-webkit-border-radius: 14px;
		-moz-border-radius: 14px;
		border-radius: 14px;
	}
	
	.buyHome .formInput,
	.sellHome .formInput {
		left: 96px;
		right: 44px;
	}
	
	.insearchpage .mui-btn-link.mui-pull-right,
	.goodsShops .mui-btn-link.mui-pull-right,
	.goodsShops3 .mui-btn-link.mui-pull-right {
		height: 28px;
		line-height: 28px;
		margin: 0;
		border-radius: 0;
		border: none;
		width: 53px;
		text-align: center;
		color: #fff;
		font-size: 15px;
	}
	/*the buyer search 买家首页*/
	
	.buyHome .mui-scroll-wrapper {
		top: 45px;
	}
	
	.buyHome .mui-icon-home {
		background: #333;
		border: 2px solid #FFFFFF;
	}
	
	.buyHome .mui-icon-home:before {
		color: #FFFFFF;
	}
	
	.buyHome.mui-bar-nav {
		background: #333;
		border-bottom: none;
	}
	
	.buyHome.mui-bar-nav:after,
	.sellHome.mui-bar-nav:after {
		height: 0;
	}
	/*买家未登陆之前*/
	
	.buyHomeNoLogin.mui-bar-nav {
		background: #333;
		border-bottom: transparent;
	}
	
	.buyHomeNoLogin .formInput {
		right: 43px;
	}
	/*The seller search 卖家首页*/
	
	.sellHome .mui-icon-home {
		background: #419fdc;
		border: 2px solid #fff;
	}
	
	.sellHome.mui-bar-nav {
		background: #419fdc;
		border: 0;
	}
	
	.sellHome .inputRow:before {
		color: #fff;
	}
	
	.sellHome input::-moz-placeholder {
		color: #999999;
	}
	
	.sellHome input::-webkit-input-placeholder {
		color: #999999;
	}
	
	.sellHome input:-ms-input-placeholder {
		color: #999999;
	}
	
	input[type=search]::-webkit-input-placeholder {
		color: #cccccc;
		font-size: 14px;
		position: relative;
		top: 1px;
	}
	/*Recent search 最近搜索*/
	
	.insearchpage .formInput {
		left: 12px;
		right: 53px;
	}
	/*商品店铺 搜索类型下拉选择样式 Goods shops 合同是goodsShops3*/
	
	.goodsShops .formInput,
	.goodsShops3 .formInput {
		right: 53px;
	}
	
	.goodsShops .formInput {
		left: 71px;
	}
	
	.goodsShops3 .formInput {
		left: 86px;
	}
	
	.mui-bar-nav.goodsShops .mui-input-group .inputRow,
	.mui-bar-nav.goodsShops3 .mui-input-group .inputRow {
		-webkit-border-radius: 0 6px 6px 0px;
		-moz-border-radius: 0 6px 6px 0px;
		border-radius: 0 6px 6px 0px;
	}
	
	.goodsShops .search-type,
	.goodsShops3 .search-type {
		-webkit-border-radius: 6px 0 0 6px;
		-moz-border-radius: 6px 0 0 6px;
		-o-border-radius: 6px 0 0 6px;
		border-radius: 6px 0 0 6px;
	}
	
	.goodsShops .search-type {
		width: 60px;
	}
	
	.goodsShops3 .search-type {
		width: 74px;
	}
	
	.goodsShops .search-type:after,
	.goodsShops3 .search-type:after {
		right: 5px;
	}
	
	.goodsShops .right-search-btn .mui-icon-search {
		position: relative;
	}
	
	.goodsShops .inputRow:before,
	.goodsShops3 .inputRow:before {
		background: none;
		width: 0;
		height: 0;
	}
	
	.goodsShops .inputRow,
	.goodsShops3 .inputRow {
		padding-left: 3px;
	}
	/*I want to buy 我的求购*/
	
	.wantBuy .formInput {
		right: 66px;
		left: 48px;
	}
	
	.wantBuy .mui-btn-link.mui-pull-right {
		padding-right: 12px;
		font-size: 10px;
		color: #fff;
		line-height: 1;
		padding: 12px 12px 0 8px;
	}
	
	/*listPage*/
	.listPage .formInput {
		right: 48px;
		left: 48px;
	}
	
	/*Goods details 商品详情选项卡*/
	
	.goodsDetails .goodsTitle {
		border: 1px solid;
		width: 70%;
		margin: 0 auto;
		border-radius: 5px;
		overflow: hidden;
	}
	
	.goodsDetails.purchasedetail .goodsTitle {
		width: 85%;
	}
	
	.goodsDetails .goodsTitle> a:nth-child(1) {
		float: left;
	}
	
	.goodsDetails .goodsTitle> a:nth-child(2) {
		float: right;
	}
	
	.goodsDetails .formInput {
		left: 12px;
		right: 53px;
	}
	
	.goodsDetails .header-tabbar {
		position: absolute;
		height: 28px;
		left: 53px;
		right: 53px;
		text-align: center;
		line-height: 1;
		z-index: 100;
	}
	
	.goodsDetails .header-tabbar a {
		text-align: center;
		line-height: 28px;
		height: 28px;
		display: inline-block;
		width: 50%;
	}
	
	.goodsDetails .header-tabbar .active {
		background-color: #fff;
		color: #419fdc;
	}
	
	.goodsDetails.buyer .header-tabbar .active {
		color: #333;
	}
	
	.goodsDetails .header-tabbar .active.right {
		border-top-left-radius: 5px;
		border-bottom-left-radius: 5px;
	}
	
	.goodsDetails .header-tabbar .active.left {
		border-top-right-radius: 4px;
		border-bottom-right-radius: 4px;
	}
	/*Commodity search 商品搜索   -- 有返回和搜索*/
	
	.commodity .formInput {
		left: 48px;
		right: 12px;
	}
	
	.commodity .right-search-btn {
		right: 49px;
	}
	
	.commodity .mui-title {
		right: 98px !important;
	}
	/*search 所有搜索内型  end*/
	/*Return, ask middle, writing the text style on the right 返回，中间问字，右边文字    文本内型   start*/
	
	.right-search-btn {
		height: 28px;
		width: 44px;
		position: absolute;
		z-index: 100;
		right: 0;
		text-align: center;
		line-height: 23px;
	}
	
	.right-search-btn .mui-icon-search {
		padding: 0;
		display: inline-block;
		margin: 0;
		top: 2px;
	}
	
	.mui-action-back.mui-pull-left {
		padding: 0;
		text-align: left;
		font-size: 22px;
		text-indent: 8px;
		color: #fff;
		float: left;
	}
	
	.mui-action-back,
	.mui-action-back.mui-pull-left {
		margin: 0;
	}
	
	.mui-bar-nav a {
		min-width: 49px;
		border-radius: 0;
		-webkit-border-radius: 0;
		-moz-border-radius: 0;
		border: 0;
		color: #fff;
		font-size: 18px;
	}
	
	.mui-bar-nav a.search-type {
		color: #666;
		font-size: 14px;
	}
	
	.mui-btn-link.mui-pull-right {
		text-align: right !important;
		padding-right: 12px;
	}
	
	.mui-bar .mui-title {
		text-align: center;
		color: #fff;
		right: 49px;
		left: 49px;
		font-size: 18px;
	}
	
	.mui-bar-nav a,
	.mui-bar .mui-title {
		height: 28px;
		line-height: 28px;
	}
	/*login 文本样式*/
	
	.login .mui-action-back.mui-pull-left {
		text-indent: 13px;
	}
	
	.login .mui-btn-link.mui-pull-right {
		padding-right: 20px;
	}
	/*Return, ask middle, writing the text style on the right 返回，中间问字，右边文字  文本内型   end*/
	
	.barcode {
		height: 45px;
		position: absolute;
		right: 12px;
		top: 0;
		z-index: 20;
	}
	
	.barcode i {
		font-size: 20px;
		line-height: 20px;
		position: absolute;
		top: 8px;
		left: 2px;
		color: #fff;
	}
	
	.barcode p {
		line-height: 8px;
		font-size: 8px;
		position: relative;
		top: 28px;
		color: #fff;
	}
	
	.icon-shouye:before {
		content: "\e640";
		font-size: 22px;
		color: #fff;
		position: relative;
		top: 0px;
		right: -1px;
	}
	
	.icon-shouye i {
		display: none;
	}
	
	.icon-shouye {
		line-height: 28px !important;
		padding: 0 12px 0 0 !important;
	}
	
	.icon-wodeqiugou0:before {
		position: relative;
		top: -12px;
		left: 32px;
		font-size: 18px;
		width: 16px;
		height: 16px;
		color: #fff;
	}
	/*商品*/
	
	.icon-shangpin:before,
	.icon-dianpu:before,
	.icon-pinpai:before {
		position: absolute;
		left: -19px;
		color: #666666;
	}
	/*活动*/
	
	.icon-sousuo {
		color: #fff;
	}
	
	.contractSearchType {
		text-align: center !important;
		text-indent: 0 !important;
	}
	
	a:active {
		color: #ffffff !important;
	}
</style>