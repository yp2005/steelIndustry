<template>
	<div class="mui-scroll-wrapper home" >
		<div class="mui-scroll">
			<imageslider :images="imageDatas" :item-tap="bannerTap"></imageslider>
			<ul class="mui-table-view mui-grid-view">
				<li class="mui-table-view-cell mui-media mui-col-xs-6">
					<a href="javascript:void(0)" class="device-a">
						<span class="device"></span>
						<div class="mui-media-body">找设备</div>
					</a>
				</li>
				<li class="mui-table-view-cell mui-media mui-col-xs-6">
					<a href="javascript:void(0);" class="project-a">
						<span class="project"></span>
						<div class="mui-media-body">找工程</div>
					</a>
				</li>
				<li class="mui-table-view-cell mui-media mui-col-xs-6">
					<a href="javascript:void(0)" class="master-a">
						<span class="master"></span>
						<div class="mui-media-body">找师傅</div>
					</a>
				</li>
				<li class="mui-table-view-cell mui-media mui-col-xs-6">
					<a href="javascript:void(0);" class="work-a">
						<span class="work"></span>
						<div class="mui-media-body">找工作</div>
					</a>
				</li>
			</ul>
			<div class="systemMessage">
				<span>钢行业头条！</span>
				<div>
					<p class="mui-ellipsis-2" v-for="message in messages">{{message.text}}</p>
				</div>
			</div>
			<ul class="mui-table-view mui-grid-view advertisement">
				<li class="mui-table-view-cell mui-media mui-col-xs-4">
					广告位
				</li>
				<li class="mui-table-view-cell mui-media mui-col-xs-4">
					广告位
				</li>
				<li class="mui-table-view-cell mui-media mui-col-xs-4">
					广告位
				</li>
			</ul>
			
			<ul class="mui-table-view mui-grid-view advertisement">
				<li class="mui-table-view-cell mui-media mui-col-xs-6">
					广告位
				</li>
				<li class="mui-table-view-cell mui-media mui-col-xs-6">
					广告位
				</li>
				<li class="mui-table-view-cell mui-media mui-col-xs-6">
					广告位
				</li>
				<li class="mui-table-view-cell mui-media mui-col-xs-6">
					广告位
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import imageslider from 'component/slider/ImageSlider';
	import muiUtils from 'common/muiUtils';
	export default {
		data: function() {
			return {
				imageDatas: [{
					banner_img_url: 'http://img3.imgtn.bdimg.com/it/u=3731927300,2399949167&fm=23&gp=0.jpg',
					banner_url: 'http://www.baidu.com',
					banner_name: '1',
					banner_order: 1
				}, {
					banner_img_url: 'http://img0.imgtn.bdimg.com/it/u=611384384,769476748&fm=23&gp=0.jpg',
					banner_url: 'http://www.baidu.com',
					banner_name: '2',
					banner_order: 2
				}],
				messages: [{
					text: '这是第一条测试用的公告这是第一条测试用的公告这是第一条测试用的公告这是第一条测试用的公告这是第一条测试用的公告这是第一条测试用的公告'
				}, {
					text: '这是第二条测试用的公告这是第二条测试用的公告这是第二条测试用的公告这是第二条测试用的公告这是第二条测试用的公告这是第二条测试用的公告'
				}, {
					text: '这是第三条测试用的公告这是第三条测试用的公告这是第三条测试用的公告这是第三条测试用的公告这是第三条测试用的公告这是第三条测试用的公告'
				}, {
					text: '这是第四条测试用的公告这是第四条测试用的公告这是第四条测试用的公告这是第四条测试用的公告这是第四条测试用的公告这是第四条测试用的公告'
				}, {
					text: '这是第五条测试用的公告这是第五条测试用的公告这是第五条测试用的公告这是第五条测试用的公告这是第五条测试用的公告这是第五条测试用的公告'
				}, {
					text: '这是第一条测试用的公告这是第一条测试用的公告这是第一条测试用的公告这是第一条测试用的公告这是第一条测试用的公告这是第一条测试用的公告'
				}]
			}
		},
		filters: {

		},
		created: function() {

		},
		components: {
			imageslider
		},
		methods: {
			bannerTap(item) {
				muiUtils.openWindow(item.banner_url);
			}
		},
		ready: function() {
			if(plus.webview.getWebviewById('HBuilder')) {
				plus.webview.getWebviewById('HBuilder').close('none');
			}
			setTimeout(function() {
				var launchFlag = plus.storage.getItem('launchFlag');
				if(launchFlag) {
					plus.navigator.closeSplashscreen();
					// plus.webview.currentWebview().show('none');
				}
			}, 10);
			mui('.mui-scroll-wrapper.home').scroll({
				bounce: true,
				indicators: false, // 是否显示滚动条
				deceleration: mui.os.ios ? 0.003 : 0.0009
			});
		}
	};
</script>

<style scoped>
	.home {
		position: absolute;
		top: 45px;
		bottom: 50px;
		width: 100%;
	}
	
	.device,
	.project,
	.master,
	.work {
		background-size: 30px 30px;
		height: 50px;
		width: 50px;
	}
	
	.device {
		background: url(../../static/img/device.svg) 10px 10px no-repeat;
	}
	
	.project {
		background: url(../../static/img/project.svg) 10px 10px no-repeat;
	}
	
	.master {
		background: url(../../static/img/master.svg) 10px 10px no-repeat;
	}
	
	.work {
		background: url(../../static/img/work.svg) 10px 10px no-repeat;
	}
	
	.mui-table-view-cell>a:not(.mui-btn) {
		background-color: #767a92;
		border-radius: 10px;
		padding: 5px 0 15px 0;
	}
	
	.mui-table-view-cell>a:not(.mui-btn).device-a {
		margin: 10px 5px 5px 10px;
	}
	
	.mui-table-view-cell>a:not(.mui-btn).project-a {
		margin: 10px 10px 5px 5px;
	}
	
	.mui-table-view-cell>a:not(.mui-btn).master-a {
		margin: 5px 5px 10px 10px;
	}
	
	.mui-table-view-cell>a:not(.mui-btn).work-a {
		margin: 5px 10px 10px 5px;
	}
	
	.mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body {
		color: #fff;
		margin-top: 0;
	}
	
	.mui-table-view.mui-grid-view {
		padding: 0;
		margin: 0;
	}
	
	.mui-table-view.mui-grid-view .mui-table-view-cell {
		padding: 0;
		margin: 0;
	}
	
	.systemMessage {
		height: 62px;
		overflow: hidden;
		margin-top: 8px;
		background-color: #fff;
		padding: 10px;
	}
	
	.systemMessage p {
		height: 42px;
		line-height: 21px;
		margin-bottom: 10px;
	}
	.systemMessage span {
		font-size: 18px;
		color: #000;
		font-style: italic;
		border-right: 1px solid #ccc;
		width: 70px;
		font-weight: 800;
		padding-right: 10px;
		float: left;
	}
	
	.systemMessage div {
		animation: lunbo 10s 1s infinite;
		position: relative;
		padding-left: 85px;
	}
	
	@keyframes lunbo{
		0% {
			top: 0;
		}
		10% {
			top: -52px;
		}
		20% {
			top: -52px;
		}
		30% {
			top: -104px;
		}
		40% {
			top: -104px;
		}
		50% {
			top: -156px;
		}
		60% {
			top: -156px;
		}
		70% {
			top: -208px;
		}
		80% {
			top: -208px;
		}
		90% {
			top: -260px;
		}
		100% {
			top: -260px;
		}
	}
	
	.advertisement li {
		height: 50px;
	}
</style>