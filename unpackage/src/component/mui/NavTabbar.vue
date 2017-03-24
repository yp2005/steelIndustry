<template>
	<nav class="nav-bar nav-bar-tab {{centerPlus ? 'centerPlusNav' : ''}}">
		<span class="centerPlusCircle1"></span>
		<span class="centerPlusCircle2"></span>
		<a v-if="centerPlus" class="nav-tab-item centerPlus" @tap="release">
			<span>+</span>
		</a>
		<a v-for="href in hrefes" @tap="switch($index)" class="nav-tab-item {{$index === index ? 'nav-active' : ''}} {{$index === 2 && centerPlus ? 'centerPlusAfter' : ''}}">
			<span class="jxddicon {{href.icon + ($index === index ? 'xuanzhong' : '')}}"></span>
			<span class="mui-tab-label ">{{href.text}}</span>
		</a>
	</nav>
</template>

<script>
	import muiUtils from 'common/muiUtils';
	import CONSTS from 'common/consts';
	import cacheUtils from 'common/cacheUtils';
	import pageUrl from 'api';
	export default {
		props: {
			hrefes: { // 导航的按钮相关信息，包括uri、按钮文字、图标
				type: Array,
				default: [{
					href: '/home',
					text: '首页',
					icon: 'icon-shouye'
				}, {
					href: '/community',
					text: '论坛',
					icon: 'icon-community'
				}, {
					href: '/calculator',
					text: '计算器',
					icon: 'icon-calculator'
				}, {
					href: '/mine',
					text: '我的',
					icon: 'icon-gerenzhongxin'
				}]
			},
			index: { // 导航当前切换的位置
				type: Number,
				default: 0
			},
			hdstyle: Object,
			showHeader: Boolean,
			typeclass: '',
			centerPlus: {
				type: Boolean,
				default: true
			},
			centerPlusAction: Function
		},
		ready: function() {
			var that = this;
			window.addEventListener('home_nav', function(event) {
				var index = event.detail.index;
				that.display({
					index: index,
					self: that
				});
			});
			window.addEventListener(CONSTS.LOGIN_OUT_EVENT, function() {
				that.display({
					index: 0,
					self: that
				});
			});
		},
		methods: {
			release() {
				muiUtils.openWindow('../../bizpage/release/index.html', '../../bizpage/release/index.html', {
					styles: {
						popGesture: 'none'

					},
					show: {
						aniShow: 'slide-in-bottom',
						autoShow: true,
						duration: 300
					},
					isValidLogin: true
				});
			},
			switch: function(index) {
				if(index === 3) {
					// 临时解决回首页登录成功之后，跳转不到首页的问题
					let id = 'main';
					let url = '../../buyer/index/main.html';
					cacheUtils.localStorage(CONSTS.PREFIX_LOGIN).setObject(CONSTS.LOGIN_FORWORD, {
						url: url,
						id: id
					});
					muiUtils.loginValid(this.display, {
						index: index,
						self: this
					});
				} else {
					this.display({
						index: index,
						self: this
					});
				}
			},
			display: function(option) { // 导航点击事件处理方法
				if(option.self.index === option.index) {
					return;
				}
				if(option.self.hrefes[option.index].text === '首页') {
					option.self.showHeader = true;
					option.self.hdstyle.citySelect.display = true;
					option.self.typeclass = 'base';
				}
				if(option.self.hrefes[option.index].text === '论坛') {
					option.self.showHeader = true;
					option.self.hdstyle.citySelect.display = 'none';
					option.self.typeclass = 'base';
				}
				if(option.self.hrefes[option.index].text === '计算器') {
					option.self.showHeader = true;
					option.self.hdstyle.citySelect.display = 'none';
					option.self.typeclass = 'base';
				}
				if(option.self.hrefes[option.index].text === '我的') {
					option.self.showHeader = false;
				}
				option.self.index = option.index;
			}

		}
	};
</script>

<style scoped>
	.nav-bar {
		position: fixed;
		z-index: 10;
		right: 0;
		left: 0;
		background-color: #f7f7f7;
		-webkit-backface-visibility: hidden;
	}
	
	.nav-bar-tab,
	.nav-bar-tab .nav-tab-item {
		background: #ffffff;
	}
	
	.nav-bar-tab {
		height: 50px;
		line-height: 1;
		-webkit-box-shadow: 0 0 0 transparent;
		box-shadow: 0 0 0 transparent;
		/*border-top: 1px solid #d7d7d7;*/
		bottom: 0;
		display: table;
		width: 100%;
		padding: 0;
		table-layout: fixed;
		border-bottom: 0;
	}
	
	.nav-bar-tab:before {
		content: '';
		height: 1px;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		background: #d7d7d7;
		-webkit-transform: scaley(.5);
		transform: scaley(.5);
	}
	
	.nav-bar-tab .nav-tab-item .jxddicon~.mui-tab-label {
		display: inline-block;
		overflow: initial;
		font-size: 11px;
		margin-top: 8px;
		text-overflow: ellipsis;
		font-weight: bold;
	}
	
	.nav-bar-tab span {
		font-size: 11px;
		color: #999999;
		line-height: 1;
		margin: 0;
		width: 100%;
		float: left;
	}
	
	.nav-bar-tab .nav-tab-item {
		display: inline-block;
		width: 25%;
		vertical-align: middle;
		height: 100%;
		text-align: center;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	
	.centerPlusNav.nav-bar-tab .nav-tab-item {
		width: 20%;
	}
	
	.nav-bar-tab .nav-tab-item.centerPlusAfter {
		margin-left: 20%;
	}
	
	.nav-bar-tab .nav-tab-item.centerPlus {
		position: absolute;
		left: 50%;
		top: -10px;
		height: 50px;
		width: 50px;
		margin-left: -25px;
		background-color: #ddd;
		border-radius: 25px;
		z-index: 2;
	}
	
	.nav-bar-tab .nav-tab-item.centerPlus span {
		color: #fff;
		background-color: #333;
		width: 40px;
		height: 40px;
		border-radius: 20px;
		margin-top: 5px;
		margin-left: 5px;
		font-size: 30px;
		text-align: center;
		padding-top: 4px;
	}
	
	.nav-bar-tab span.centerPlusCircle2 {
		position: absolute;
		left: 50%;
		top: -15px;
		height: 70px;
		width: 70px;
		margin-left: -35px;
		border-radius: 35px;
		border-top: solid 1px #d7d7d7;
		background-color: #fff;
	}
	
	.nav-bar-tab span.centerPlusCircle1 {
		position: absolute;
		left: 50%;
		top: 1px;
		height: 50px;
		width: 74px;
		margin-left: -37px;
		background-color: #fff;
		z-index: 1;
	}
	
	.nav-bar-tab .nav-tab-item .jxddicon {
		float: none;
		top: 7px;
		font-size: 26px;
		text-align: center;
		width: 26px;
		height: 26px;
		padding-top: 0;
		padding-bottom: 0;
		position: relative;
		z-index: 20;
	}
	
	.nav-active span {
		color: #333;
	}
	
	.icon-fenlei:before {
		content: "\e61d";
	}
	
	.icon-community {
		background: url(../../static/img/community.svg);
		background-size: 26px 26px;
		background-repeat: no-repeat;
	}
	
	.icon-communityxuanzhong {
		background: url(../../static/img/community-xuanzhong.svg);
		background-size: 26px 26px;
		background-repeat: no-repeat;
	}
	
	.icon-calculator {
		background: url(../../static/img/calculator.svg);
		width: 23px !important;
		background-size: 23px 26px;
		background-repeat: no-repeat;
	}
	
	.icon-calculatorxuanzhong {
		background: url(../../static/img/calculator-xuanzhong.svg);
		width: 22px !important;
		background-size: 22px 26px;
		background-repeat: no-repeat;
	}
</style>