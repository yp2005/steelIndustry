/**
 * @file 底部菜单组件
 * @Author zhongzhian
 * 组件使用：
 *  引入：import navbtn from 'component/NavBtnBar';
 *  标签示例：<navbtn :buttons="buttons"></navbtn>
 *  参数：
 *  @param {Array} buttons 配置需要的按钮以及展现方式和tap事件
		[{
			text: '首页',		
			icon: 'mui-icon-home',
			disabled: false,
			btntap: function() {
				console.log('tap:首页');
			}
		}, {
			text: '消息',
			icon: 'mui-icon-email',
			disabled: false,
			msgnum: 9,
			btntap: function() {
				console.log('tap:消息');
			}
		}, {
			text: '黄色',
			disabled: false,
			btnclass: 'mui-btn-warning',
			btntap: function() {
				console.log('tap:黄色');
			}
		}]
	参考下面的props属性
 * @public
 */

<template>
	<div class="mui-bar nav-btn-bar">
		<a v-for="btn in buttons" @tap="tapAction(btn)" class="mui-tab-item mui-active {{btn.disabled ? 'icon_disabled' : ''}} {{btn.icon ? 'nav-btn-bar-a-span' : 'nav-btn-bar-a-btn'}}" style="{{btn.isedit ? 'width:60% !important;' : ''}}">
			<template v-if="btn.icon">
				<span class="mui-icon jxddiconfont {{btn.icon}}{{btn.xuanzhong ? btn.xuanzhong : ''}} {{btn.xuanzhong ? 'icon_xuanzhong' : ''}}"><span v-if="btn.msgnum" class="mui-badge">{{btn.msgnum}}</span></span>
				<span class="mui-tab-label {{btn.xuanzhong ? 'icon_xuanzhong' : ''}}">{{btn.text}}</span>
			</template>
			<template v-if="!btn.icon">
				<span v-if = "btn.isedit">已选择<lebel class="nav-lebel-num">{{btn.text}}</lebel>条</span>
				<button v-else type="button" class="mui-btn {{btn.btnclass ? btn.btnclass : ''}} {{btn.disabled ? 'btn_disabled' : ''}} mui-btn-block nav-btn-bar-btn">
					{{btn.text}}
				</button>
				<!-- <a v-else class="{{btn.btnclass ? btn.btnclass : ''}} {{btn.disabled ? 'btn_disabled' : ''}}" href="javascript:void(0);">{{btn.text}}</a> -->
			</template>
		</a>
	</div>
</template>

<script>
	export default {
		props: {
			buttons: { //导航的按钮相关信息，包括uri、按钮文字、图标
				type: Array,
				default: [{
					text: '首页',					//按钮显示文字，必传
					icon: 'mui-icon-home',		//按钮icon，可选：如果不传就是单纯的按钮
					xuanzhong: '',
					disabled: false,			//按钮disabled
					btntap: function() {		//tap事件，必传
						console.log('tap:首页');
					}
				}, {
					text: '消息',
					icon: 'mui-icon-email',
					disabled: false,			//按钮disabled
					msgnum: 9,					//只有传了icon这个参数才生效，icon上的显示数字
					btntap: function() {
						console.log('tap:消息');
					}
				}, {
					text: '黄色',
					disabled: false,			//按钮disabled
					// btnclass: 'fixOneLabelBf04e30',//不传icon时，可以指定按钮样式，默认为黄色
					btnclass: 'nav-btn-red ',
					btntap: function() {
						console.log('tap:黄色');
					}
				}]
			}
		},
		methods: {
			tapAction:function(btn){
				if(!btn.disabled){
					btn.btntap(this);
				}
			}
		}
	};
</script>
<style scoped>

	.btn_disabled{
		background-color: #c0c0c0 !important;
		color:#fff !important;
		border:1px solid #fff !important;
	}
	
	.icon_disabled{
		color:#c0c0c0 !important;
	}
	
	.icon_xuanzhong{
        color:#f04e30 !important;
	}
	
	.nav-btn-bar {
		bottom: 0;
		display: table;
		width: 100%;
		height: 50px;
		padding: 0;
		table-layout: fixed;
		border-top: 0;
		border-bottom: 0;
		-webkit-touch-callout: none;
	}
	
	.nav-btn-bar .mui-tab-item {
		display: table-cell;
		overflow: hidden;
		width: 1%;
		height: 50px;
		text-align: center;
		vertical-align: middle;
		white-space: nowrap;
		text-overflow: ellipsis;
		color: #929292;
	}
	
	.nav-btn-bar .mui-tab-item.mui-active {
		color: #999;
	}
	
	.nav-btn-bar .mui-tab-item .mui-icon {
		top: 3px;
		width: 24px;
		height: 24px;
		padding-top: 0;
		padding-bottom: 0;
	}
	
	.nav-btn-bar .mui-tab-item .mui-icon ~ .mui-tab-label {
		font-size: 11px;
		display: block;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	.nav-btn-bar .mui-tab-item .mui-icon:active {
		background: none;
	}
	
	.nav-btn-bar-btn {
		height: 50px;
		top: 0px !important;
		border-radius: 0;
		border-top-left-radius: 0;
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
		border-bottom-left-radius: 0;
	}
	
	.nav-btn-bar-a-span {
		width: 60px !important;
	}
	
	.nav-btn-bar-a-btn {
		width: auto !important;
	}
	
	.nav-btn-red{
        color: #fff;
        background-color: #f04e30;
	}
	
	.nav-btn-blue{
        color: #fff;
        background-color: #26c6da;
	}
	
	.nav-lebel-num{
		color:#f04e30;
	}
	button{
		border: 0;
	}
	.icon-fenlei:before,.icon-fenleixuanzhong:before{
		font-size: 24px;
	}
</style>