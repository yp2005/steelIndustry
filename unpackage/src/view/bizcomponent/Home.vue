<template>
	<div class="mui-scroll-wrapper home" >
		<div class="mui-scroll">
			<imageslider :images="imageDatas" :item-tap="bannerTap"></imageslider>
			<ul class="mui-table-view mui-grid-view">
				<li class="mui-table-view-cell mui-media mui-col-xs-6">
					<a href="javascript:void(0)" class="device-a" @tap="open('../../bizpage/device/list.html')">
						<img class="device" src="../../static/img/device.svg">
						<div class="mui-media-body">找设备</div>
					</a>
				</li>
				<li class="mui-table-view-cell mui-media mui-col-xs-6">
					<a href="javascript:void(0);" class="project-a" @tap="open('../../bizpage/project/list.html')">
						<img class="project" src="../../static/img/project.svg">
						<div class="mui-media-body">找工程</div>
					</a>
				</li>
				<li class="mui-table-view-cell mui-media mui-col-xs-6">
					<a href="javascript:void(0)" class="master-a" @tap="open('../../bizpage/master/list.html')">
						<img class="master" src="../../static/img/master.svg">
						<div class="mui-media-body">找师傅</div>
					</a>
				</li>
				<li class="mui-table-view-cell mui-media mui-col-xs-6">
					<a href="javascript:void(0);" class="work-a" @tap="open('../../bizpage/work/list.html')">
						<img class="work" src="../../static/img/work.svg">
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
			
			<p class="title">设备推荐</p>
			<div class="oneStore">
				<img src="http://img1.imgtn.bdimg.com/it/u=1945716465,2733267266&fm=23&gp=0.jpg" />
				<div class="storeInfo">
					<p class="mui-ellipsis">店铺名称店铺名称店铺名称店铺名称店铺名称店铺名称</p>
					<p>北京 北京市 海淀区</p>
					<p>
						<img src="../../static/img/mine/shimingrenzheng.svg">
						<img src="../../static/img/mine/noshimingrenzheng.svg">
						<img src="../../static/img/mine/qiyerenzheng.svg">
						<img src="../../static/img/mine/noqiyerenzheng.svg">
						<span class="mui-pull-right">距离：9999KM</span>
					</p>
					<p><a href="javascript:void(0)">进入店铺</a><span class="mui-pull-right">...</span></p>
				</div>
			</div>
			<div class="oneStore">
				<img src="http://img1.imgtn.bdimg.com/it/u=1945716465,2733267266&fm=23&gp=0.jpg" />
				<div class="storeInfo">
					<p class="mui-ellipsis">店铺名称店铺名称店铺名称店铺名称店铺名称店铺名称</p>
					<p>北京 北京市 海淀区</p>
					<p>
						<img src="../../static/img/mine/shimingrenzheng.svg">
						<img src="../../static/img/mine/noshimingrenzheng.svg">
						<img src="../../static/img/mine/qiyerenzheng.svg">
						<img src="../../static/img/mine/noqiyerenzheng.svg">
						<span class="mui-pull-right">距离：9999KM</span>
					</p>
					<p><a href="javascript:void(0)">进入店铺</a><span class="mui-pull-right">...</span></p>
				</div>
			</div>
			<div class="oneStore">
				<img src="http://img1.imgtn.bdimg.com/it/u=1945716465,2733267266&fm=23&gp=0.jpg" />
				<div class="storeInfo">
					<p class="mui-ellipsis">店铺名称店铺名称店铺名称店铺名称店铺名称店铺名称</p>
					<p>北京 北京市 海淀区</p>
					<p>
						<img src="../../static/img/mine/shimingrenzheng.svg">
						<img src="../../static/img/mine/noshimingrenzheng.svg">
						<img src="../../static/img/mine/qiyerenzheng.svg">
						<img src="../../static/img/mine/noqiyerenzheng.svg">
						<span class="mui-pull-right">距离：9999KM</span>
					</p>
					<p><a href="javascript:void(0)">进入店铺</a><span class="mui-pull-right">...</span></p>
				</div>
			</div>
			<div class="oneStore">
				<img src="http://img1.imgtn.bdimg.com/it/u=1945716465,2733267266&fm=23&gp=0.jpg" />
				<div class="storeInfo">
					<p class="mui-ellipsis">店铺名称店铺名称店铺名称店铺名称店铺名称店铺名称</p>
					<p>北京 北京市 海淀区</p>
					<p>
						<img src="../../static/img/mine/shimingrenzheng.svg">
						<img src="../../static/img/mine/noshimingrenzheng.svg">
						<img src="../../static/img/mine/qiyerenzheng.svg">
						<img src="../../static/img/mine/noqiyerenzheng.svg">
						<span class="mui-pull-right">距离：9999KM</span>
					</p>
					<p><a href="javascript:void(0)">进入店铺</a><span class="mui-pull-right">...</span></p>
				</div>
			</div>
			
			<p class="title">热门岗位</p>
			<div class="oneWork">
				<img src="http://img1.imgtn.bdimg.com/it/u=1945716465,2733267266&fm=23&gp=0.jpg" />
				<div class="workStore">
					<p class="mui-ellipsis">用工需求标题用工需求标题用工需求标题用工需求标题用工需求标题</p>
					<p>2016-01-10<span class="mui-pull-right">北京 北京市 海淀区</span></p>
					<p>
						<img src="../../static/img/mine/shimingrenzheng.svg">
						<img src="../../static/img/mine/noshimingrenzheng.svg">
						<img src="../../static/img/mine/qiyerenzheng.svg">
						<img src="../../static/img/mine/noqiyerenzheng.svg">
						<span class="mui-pull-right">距离：9999KM</span>
					</p>
					<p><a href="javascript:void(0)">立即预约</a><span class="mui-pull-right">...</span></p>
				</div>
			</div>
			<div class="oneWork">
				<img src="http://img1.imgtn.bdimg.com/it/u=1945716465,2733267266&fm=23&gp=0.jpg" />
				<div class="workStore">
					<p class="mui-ellipsis">用工需求标题用工需求标题用工需求标题用工需求标题用工需求标题</p>
					<p>2016-01-10<span class="mui-pull-right">北京 北京市 海淀区</span></p>
					<p>
						<img src="../../static/img/mine/shimingrenzheng.svg">
						<img src="../../static/img/mine/noshimingrenzheng.svg">
						<img src="../../static/img/mine/qiyerenzheng.svg">
						<img src="../../static/img/mine/noqiyerenzheng.svg">
						<span class="mui-pull-right">距离：9999KM</span>
					</p>
					<p><a href="javascript:void(0)">立即预约</a><span class="mui-pull-right">...</span></p>
				</div>
			</div>
			<div class="oneWork">
				<img src="http://img1.imgtn.bdimg.com/it/u=1945716465,2733267266&fm=23&gp=0.jpg" />
				<div class="workStore">
					<p class="mui-ellipsis">用工需求标题用工需求标题用工需求标题用工需求标题用工需求标题</p>
					<p>2016-01-10<span class="mui-pull-right">北京 北京市 海淀区</span></p>
					<p>
						<img src="../../static/img/mine/shimingrenzheng.svg">
						<img src="../../static/img/mine/noshimingrenzheng.svg">
						<img src="../../static/img/mine/qiyerenzheng.svg">
						<img src="../../static/img/mine/noqiyerenzheng.svg">
						<span class="mui-pull-right">距离：9999KM</span>
					</p>
					<p><a href="javascript:void(0)">立即预约</a><span class="mui-pull-right">...</span></p>
				</div>
			</div>
			<div class="oneWork">
				<img src="http://img1.imgtn.bdimg.com/it/u=1945716465,2733267266&fm=23&gp=0.jpg" />
				<div class="workStore">
					<p class="mui-ellipsis">用工需求标题用工需求标题用工需求标题用工需求标题用工需求标题</p>
					<p>2016-01-10<span class="mui-pull-right">北京 北京市 海淀区</span></p>
					<p>
						<img src="../../static/img/mine/shimingrenzheng.svg">
						<img src="../../static/img/mine/noshimingrenzheng.svg">
						<img src="../../static/img/mine/qiyerenzheng.svg">
						<img src="../../static/img/mine/noqiyerenzheng.svg">
						<span class="mui-pull-right">距离：9999KM</span>
					</p>
					<p><a href="javascript:void(0)">立即预约</a><span class="mui-pull-right">...</span></p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import imageslider from 'component/slider/ImageSlider';
	import muiUtils from 'common/muiUtils';
	export default {
		data: function() {
			return {
				scroll: undefined,
				imageDatas: [{
					banner_img_url: 'http://img2.imgtn.bdimg.com/it/u=1942697624,2080778166&fm=23&gp=0.jpg',
					banner_url: 'http://www.baidu.com',
					banner_name: '1',
					banner_order: 1
				}, {
					banner_img_url: 'http://img2.imgtn.bdimg.com/it/u=2114919032,3638938282&fm=23&gp=0.jpg',
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
			};
		},
		props: {
			address: Object
		},
		created: function() {

		},
		components: {
			imageslider
		},
		methods: {
			bannerTap(item) {
				//muiUtils.openWindow(item.banner_url);
			},
			open(url) {
				muiUtils.openWindow(url, url, {
					extras: {
						address: this.address
					}
				});
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
			this.scroll = mui('.mui-scroll-wrapper.home').scroll({
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
		height: 60px;
		width: 60px;
		padding: 12px;
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
	
	.mui-table-view.mui-grid-view.advertisement {
		margin-top: 8px;
		margin-bottom: 8px;
	}
	
	.advertisement li {
		height: 50px;
		padding: 6px 12px !important;
	}
	
	.advertisement li img {
		width: 100%;
		height: 100%;
	}
	
	.oneStore {
		padding: 10px;
		background-color: #fff;
		margin-bottom: 2px;
	}
	
	.oneStore img {
		float: left;
		width: 106px;
		height: 106px;
	}
	
	.oneStore .storeInfo {
		padding-left: 116px;
		min-height: 80px;
	}
	
	.oneStore .storeInfo p {
		font-size: 13px;
	}
	
	.oneStore .storeInfo p:nth-child(1) {
		color: #000;
		font-size: 14px;
	}
	
	.oneStore .storeInfo p:nth-child(3) {
		overflow: hidden;
		padding: 5px 0;
	}
	
	.oneStore .storeInfo p:nth-child(3) img {
		width: 19px;
		height: 19px;
		margin-right: 4px;
	}
	
	.oneStore .storeInfo p:nth-child(4) a {
		color: #fff;
		background-color: #26c6da;
		line-height: 1;
		padding: 5px 8px;
		border-radius: 3px;
		margin: 5px 0;
	}
	
	.oneStore .storeInfo p:nth-child(4) span {
		line-height: 1;
		margin-top: 4px;
		font-size: 19px;
		font-weight: 800;
		color: #777;
	}
	
	.oneWork {
		padding: 10px;
		background-color: #fff;
		margin-bottom: 2px;
	}
	
	.oneWork img {
		float: left;
		width: 106px;
		height: 106px;
	}
	
	.oneWork .workStore {
		padding-left: 116px;
		min-height: 80px;
	}
	
	.oneWork .workStore p {
		font-size: 13px;
	}
	
	.oneWork .workStore p:nth-child(1) {
		color: #000;
		font-size: 14px;
	}
	
	.oneWork .workStore p:nth-child(3) {
		overflow: hidden;
		padding: 5px 0;
	}
	
	.oneWork .workStore p:nth-child(3) img {
		width: 19px;
		height: 19px;
		margin-right: 4px;
	}
	
	.oneWork .workStore p:nth-child(4) a {
		color: #fff;
		background-color: #26c6da;
		line-height: 1;
		padding: 5px 8px;
		border-radius: 3px;
		margin: 5px 0;
	}
	
	.oneWork .workStore p:nth-child(4) span {
		line-height: 1;
		margin-top: 4px;
		font-size: 19px;
		font-weight: 800;
		color: #777;
	}
	
	p.title {
		color: #005D9B;
		line-height: 30px;
		margin-top: 8px;
		margin-bottom: 2px;
		padding-left: 10px;
		background-color: #fff;
		font-size: 15px;
	}
	
	.mui-slider {
		height: 150px;
	}
	
	.mui-slider .mui-slider-group .mui-slider-item img {
		height: 150px;
	}
</style>