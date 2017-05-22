<template>
	<div class="mui-scroll-wrapper home">
		<div id="pullrefresh" class="mui-scroll">
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
				<div class="lunbo{{messages.length - 1}}">
					<p class="mui-ellipsis-2" v-for="message in messages" @tap="messageDetail(message)">{{message.title + ' ' + message.content}}</p>
				</div>
			</div>

			<p class="title">设备推荐</p>
			<div class="oneStore" v-for="store in storeList" @tap="gotoStoreDetail(store.userId)">
				<img :src="store.shopSignPictures" />
				<div class="storeInfo">
					<p class="mui-ellipsis">{{store.storeName}}</p>
					<p>{{store.address}}</p>
					<p>
						<img v-show="store.realNameAuthentication == 1" src="../../static/img/mine/shimingrenzheng.svg">
						<img v-else src="../../static/img/mine/noshimingrenzheng.svg">
						<img v-show="store.enterpriseCertification == 1" src="../../static/img/mine/qiyerenzheng.svg">
						<img v-else src="../../static/img/mine/noqiyerenzheng.svg">
					</p>
					<p>
						<a href="javascript:void(0)">进入店铺</a><span class="mui-pull-right">...</span></p>
				</div>
			</div>
			<p class="noData" v-show="!storeList || storeList.length === 0" class="noData">暂无数据</p>
			<p class="title">热门岗位</p>
			<div class="oneWork" v-for="work in workList" @tap="gotoWorkDetail(work.id)">
				<img :src="work.imgName" />
				<div class="workStore">
					<p class="mui-ellipsis">{{work.demandTitle}}</p>
					<p>{{work.createTime}}<span class="mui-pull-right">{{work.address}}</span></p>
					<p>
						<img v-show="work.realNameAuthentication == 1" src="../../static/img/mine/shimingrenzheng.svg">
						<img v-else src="../../static/img/mine/noshimingrenzheng.svg">
						<img v-show="work.enterpriseCertification == 1" src="../../static/img/mine/qiyerenzheng.svg">
						<img v-else src="../../static/img/mine/noqiyerenzheng.svg">
					</p>
					<p>
						<a href="javascript:void(0)">立即预约</a><span class="mui-pull-right">...</span></p>
				</div>
			</div>
			<p class="noData" v-show="!workList || workList.length === 0" class="noData">暂无数据</p>
		</div>
	</div>
</template>

<script>
	import imageslider from 'component/slider/ImageSlider';
	import muiUtils from 'common/muiUtils';
	import api from 'api';
	import cacheUtils from 'common/cacheUtils';
	import CONSTS from 'common/consts';
	export default {
		data: function() {
			return {
				scroll: undefined,
				imageDatasDefault: [{
					banner_img_url: require('static/img/homeBanner.jpg'),
					banner_url: '',
					banner_name: '1',
					banner_order: 1
				}],
				imageDatas: [],
				messages: [{
					title: '暂无公告',
					content: ''
				}],
				homeData: {},
				storeList: [],
				workList: []
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
			messageDetail(message) {
				muiUtils.openWindow('../../commonpage/noticemanager/noticedetail.html', '../../commonpage/noticemanager/noticedetail.html', {
					extras: {
						message: message
					}
				});
			},
			bannerTap(item) {
				if(item.linkType == 'innerLink') {
					this.gotoStoreDetail(item.banner_url);
				} else if(item.linkType == 'outerLink') {
					plus.runtime.openURL(item.banner_url);
				}
			},
			gotoStoreDetail(userId) {
				muiUtils.openWindow('../../bizpage/device/deviceinfo.html', '../../bizpage/device/deviceinfo.html', {
					extras: {
						userId: userId
					}
				});
			},
			gotoWorkDetail(id) {
				muiUtils.openWindow('../../bizpage/work/workinfo.html', '../../bizpage/work/workinfo.html', {
					extras: {
						workId: id
					}
				});
			},
			open(url) {
				muiUtils.openWindow(url, url, {
					extras: {
						address: this.address
					}
				});
			},
			getAppSettings() {
				muiUtils.muiAjax(api.APIS.settings.getSettings, {
					contentType: 'application/json',
					type: "get",
					success: function(data) {
						if(data.erroCode === CONSTS.ERROR_CODE.SUCCESS) {
							cacheUtils.localStorage(CONSTS.SYSTEM).setObject(CONSTS.APPSETTINGS, data.result);
						}
					},
					error: function(xhr, type, errorThrown) {}
				});
				muiUtils.muiAjax(api.APIS.user.updateLatestLoginTime, {
					data: '{}',
					contentType: 'application/json',
					dataType: "json",
					type: "post",
					success: function(data) {},
					error: function(xhr, type, errorThrown) {}
				});
			},
			checkAppUpdate() {
				muiUtils.muiAjax(api.APIS.common.appupdate, {
					contentType: 'application/json',
					type: "get",
					success: function(data) {
						if(data.erroCode === CONSTS.ERROR_CODE.SUCCESS) {
							if(CONSTS.APPVERSION < data.result.appVersion.appVersion) {
								var btnArray = ['暂不', '更新'];
								mui.confirm('APP本地版本：' + CONSTS.APPVERSION + '，最新版本：' + data.result.appVersion.appVersion + '，是否更新？', '版本更新', btnArray, function(e) {
									if(e.index == 1) {
										if(mui.os.ios) {
											plus.runtime.openURL(data.result.iOS.url);
										} else {
											plus.runtime.openURL(data.result.Android.url);
										}
									}
								});
							} else {
								cacheUtils.localStorage(CONSTS.SYSTEM).setObject(CONSTS.APPVERSIONINFO, data.result);
							}
						}
					},
					error: function(xhr, type, errorThrown) {}
				});
			},
			getData(loading) {
				var that = this;
				muiUtils.muiAjax(api.APIS.common.homeData, {
					contentType: 'application/json',
					type: "get",
					success: function(data) {
						if(data.erroCode === CONSTS.ERROR_CODE.SUCCESS) {
							that.homeData = data.result;
							if(that.homeData.advertisement && that.homeData.advertisement.length > 0) {
								var imageDatas = [];
								for(var ad of that.homeData.advertisement) {
									if(ad.linkType === 'innerLink') {
										imageDatas.push({
											banner_img_url: data.result.imgServer + ad.img,
											banner_url: ad.storeId,
											banner_name: ad.title,
											banner_order: ad.id,
											linkType: 'innerLink'
										});
									} else {
										imageDatas.push({
											banner_img_url: data.result.imgServer + ad.img,
											banner_url: ad.url,
											banner_name: ad.title,
											banner_order: ad.id,
											linkType: 'outerLink'
										});
									}
								}
								that.imageDatas = imageDatas;
							} else {
								that.imageDatas = that.imageDatasDefault;
							}
							if(that.homeData.systemNotice && that.homeData.systemNotice.length > 0) {
								var messages = that.homeData.systemNotice;
								if(messages.length > 1) {
									var endMsg = JSON.parse(JSON.stringify(messages[0]));
									messages.push(endMsg);
								}
								that.messages = messages;
							} else {
								that.messages = [{
									title: '暂无公告',
									content: ''
								}];
							}
							if(that.homeData.hotStore && that.homeData.hotStore.length > 0) {
								for(var store of that.homeData.hotStore) {
									store.shopSignPictures = data.result.imgServer + 'small_' + store.shopSignPictures;
								}
								that.storeList = that.homeData.hotStore;
							}
							else {
								that.storeList = [];
							}
							if(that.homeData.hotWork && that.homeData.hotWork.length > 0) {
								for(var work of that.homeData.hotWork) {
									work.imgName = work.imgName ? (data.result.imgServer + 'small_' + work.imgName) : '1';
								}
								that.workList = that.homeData.hotWork;
							}
							else {
								that.workList = [];
							}
						} else {
							mui.toast(data.erroCode + '：' + data.erroMsg);
						}
						that.pullrefresh.endPullDownToRefresh();
						that.pullrefresh.refresh(true);
					},
					error: function(xhr, type, errorThrown) {
						that.pullrefresh.endPullDownToRefresh();
						that.pullrefresh.refresh(true);
						mui.toast('服务器或网络异常，请稍后重试。')
					},
					loading: loading
				});
			}
		},
		ready: function() {
			var that = this;
			if(plus.webview.getWebviewById(plus.runtime.appid)) {
				plus.webview.getWebviewById(plus.runtime.appid).close('none');
			}
			setTimeout(function() {
				var launchFlag = plus.storage.getItem('launchFlag');
				if(launchFlag) {
					plus.navigator.closeSplashscreen();
					plus.webview.currentWebview().show('none');
				}
			}, 10);
			this.scroll = mui('.mui-scroll-wrapper.home').scroll({
				bounce: true,
				indicators: false, // 是否显示滚动条
				deceleration: mui.os.ios ? 0.003 : 0.0009
			});
			that.checkAppUpdate();
			that.getAppSettings();
			document.addEventListener("resume", function() {
				that.getAppSettings();
			});
			this.pullrefresh = mui('#pullrefresh').pullToRefresh({
				down: {
					auto: false,
					offset: 50,
					callback: function() {
						that.getData(false);
					}
				},
				up: {
					callback: false
				}
			});
			that.getData(true);
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
		position: relative;
		padding-left: 85px;
	}
	
	.systemMessage div.lunbo2 {
		animation: lunbo2 4s 1s infinite;
	}
	
	.systemMessage div.lunbo3 {
		animation: lunbo3 6s 1s infinite;
	}
	
	.systemMessage div.lunbo4 {
		animation: lunbo4 8s 1s infinite;
	}
	
	.systemMessage div.lunbo5 {
		animation: lunbo5 10s 1s infinite;
	}
	
	@keyframes lunbo2 {
		0% {
			top: 0;
		}
		25% {
			top: -52px;
		}
		50% {
			top: -52px;
		}
		75% {
			top: -104px;
		}
		100% {
			top: -104px;
		}
	}
	
	@keyframes lunbo3 {
		0% {
			top: 0;
		}
		16% {
			top: -52px;
		}
		33% {
			top: -52px;
		}
		50% {
			top: -104px;
		}
		66% {
			top: -104px;
		}
		83% {
			top: -156px;
		}
		100% {
			top: -156px;
		}
	}
	
	@keyframes lunbo4 {
		0% {
			top: 0;
		}
		12% {
			top: -52px;
		}
		25% {
			top: -52px;
		}
		37% {
			top: -104px;
		}
		50% {
			top: -104px;
		}
		62% {
			top: -156px;
		}
		75% {
			top: -156px;
		}
		87% {
			top: -208px;
		}
		100% {
			top: -208px;
		}
	}
	
	@keyframes lunbo5 {
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
	
	p.noData {
		line-height: 124px;
		text-align: center;
		margin-bottom: 2px;
		background-color: #fff;
	}
</style>