<template>
	<div class="mui-scroll-wrapper workInfo">
		<div class="mui-scroll">
			<div class="context">
				<ul class="mui-table-view mui-table-view-chevron">
					<li class="mui-table-view-cell">
						<p class="jieshao">
							<span class="title">{{workInfo.demandTitle}}</span>
							<span @tap="shoucang" v-show="workInfo.isCollected == 1" class="jxddicon icon-shoucangxuanzhong"></span>
							<span @tap="shoucang" v-else class="jxddicon icon-shoucang1"></span>
						</p>
					</li>
					<li class="mui-table-view-cell">
						<label>发布时间</label>
						<span class="info-text">{{workInfo.updateTime}}</span>
					</li>
					<li class="mui-table-view-cell">
						<label>到期时间</label>
						<span class="info-text">{{workInfo.dueTime}}</span>
					</li>
					<li class="mui-table-view-cell">
						<label>招工范围</label>
						<span class="info-text">{{workInfo.workerTypesDis}}</span>
					</li>
					<li class="mui-table-view-cell">
						<label>公司名称</label>
						<span class="info-text">{{workInfo.companyName}}</span>
					</li>
					<li class="mui-table-view-cell">
						<label>干活地点</label>
						<span @tap="positioning" class="address info-text">{{(address.province || '') + ' ' + (address.city || '') + ' ' + (address.district || '') + ' ' + (address.street || '')}}</span>
						<span @tap="positioning" class="jxddicon icon-weizhi2 address-dingwei"></span>
					</li>
				</ul>
				<ul class="mui-table-view mui-table-view-chevron shifu">
					<li class="mui-table-view-cell">
						<img class="mui-media-object mui-pull-left head-img" id="head-img" :src="picture">
						<p class="master-name">{{workInfo.contact}}</p>
						<div class="yuyue">
							<p class="counts">{{workInfo.callTimes}}</p>
							<p>咨询人次</p>
						</div>
						<div class="views">
							<p class="counts">{{workInfo.browseVolume}}</p>
							<p>浏览量</p>
						</div>
						<span class="mui-icon mui-icon-phone" @tap="callTel" ></span>
						<span class="point"></span>
						<p class="pointTip">点此电话联系</p>
					</li>
				</ul>
				<ul class="mui-table-view shifu">
					<li class="mui-table-view-cell">
						<label>工作介绍</label>
					</li>
					<li class="mui-table-view-cell">
						<span class="description">{{workInfo.description}}</span>
					</li>
					<li class="mui-table-view-cell master-images">
						<template v-for="img in workInfo.pictures">
							<img :src="img">
						</template>
					</li>
					<li class="mui-table-view-cell">
						<p>
							<span class="tishi">温馨提示（联系时请说明是在“彩钢精英”上看到的）</span>
						</p>
					</li>
				</ul>
				<div class="list-ad-two">
					<img v-if="adType == 'oneImg'" :src="imageDatas[0].banner_img_url" @tap="bannerTap(imageDatas[0])">
					<imageslider v-if="adType == 'loopImg'" sliderid="ad-slider" :images="imageDatas" :item-tap="bannerTap" :indicator-display="indicatorDisplay"></imageslider>
					<template v-if="adType == 'alliance'">{{{allianceCode}}}</template>
				</div>
			</div>
		</div>
	</div>
	<div class="share" v-show="showShare">
		<span @tap="shareAction('weixin')"><img src="../../../../static/img/share/wx.png" /></span>
		<span @tap="shareAction('qq')"><img src="../../../../static/img/share/qq.png" /></span>
		<!--<span @tap="shareAction('tencentweibo')"><img src="../../../../static/img/share/txwb.png" /></span>
		<span @tap="shareAction('sinaweibo')"><img src="../../../../static/img/share/snwb.png" /></span>-->
	</div>
	<div class="shareMask" v-show="showShare" @tap="showShare = false"></div>
</template>

<script>
	import muiUtils from 'common/muiUtils';
	import log from 'common/logUtils';
	import api from 'api';
	import CONSTS from 'common/consts';
	import cacheUtils from 'common/cacheUtils';
	import imageslider from 'component/slider/ImageSlider';
	export default {
		data: function() {
			var shareSwitch = cacheUtils.localStorage(CONSTS.SYSTEM).getObject(CONSTS.APPSETTINGS).shareSwitch;
			var userInfo = cacheUtils.localStorage(CONSTS.PREFIX_LOGIN).getObject(CONSTS.USER_INFO) || {};
			var workInfo = plus.webview.currentWebview().employmentDemand;
			return {
				showShare: false,
				isShared: userInfo.isShared || 0,
				userInfo: userInfo,
				shareSwitch: shareSwitch,
				shares: {},
				workInfo: workInfo,
				address: {},
				picture: '',
				appVersionInfo: cacheUtils.localStorage(CONSTS.SYSTEM).getObject(CONSTS.APPVERSIONINFO),
				id: plus.webview.currentWebview().workId,
				adType: 'oneImg',
				imageDatas: [{
					banner_img_url: require('static/img/listPageBanner.jpg'),
				}],
				allianceCode: '',
				indicatorDisplay: false
			}
		},
		created: function() {
			var that = this;
			if(this.workInfo) {
				this.picture = this.workInfo.pictures.length > 0 ? this.workInfo.pictures[0] : (this.userInfo.avatar || '1');
				this.dealData();
			} else {
				muiUtils.muiAjax(api.APIS.employmentDemand.getEmploymentDemandById + '?id=' + that.id, {
					dataType: "json",
					type: "get",
					success: function(data) {
						if(data.erroCode === CONSTS.ERROR_CODE.SUCCESS) {
							that.workInfo = data.result;
							that.picture = that.workInfo.pictures.length > 0 ? that.workInfo.pictures[0] : '1';
							that.dealData();
						} else {
							mui.toast(data.erroCode + '：' + data.erroMsg);
						}
					},
					error: function(xhr, type, errorThrown) {
						mui.toast('服务器或网络异常，请稍后重试。');
					}
				});
			}
			muiUtils.muiAjax(api.APIS.advertisement.getPositionAds + '?position=detailPage', {
				dataType: "json",
				type: "get",
				success: function(data) {
					if(data.erroCode === CONSTS.ERROR_CODE.SUCCESS) {
						if(data.result.adType == 'alliance') {
							if(data.result.adData) {
								that.adType = 'alliance';
								that.allianceCode = data.result.adData;
							}
						} else if(data.result.adType == 'loopImg') {
							if(data.result.adData && data.result.adData.length > 0) {
								var imageDatas = [];
								for(var ad of data.result.adData) {
									if(ad.linkType === 'innerLink') {
										imageDatas.push({
											banner_img_url: data.result.imgServer + ad.img,
											banner_url: ad.deviceId,
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
								that.adType = 'loopImg';
								that.imageDatas = imageDatas;
							}
						} else if(data.result.adType == 'oneImg') {
							if(data.result.adData) {
								var imageDatas = [];
								var ad = data.result.adData;
								if(ad.linkType === 'innerLink') {
									imageDatas.push({
										banner_img_url: data.result.imgServer + ad.img,
										banner_url: ad.deviceId,
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
								that.adType = 'oneImg';
								that.imageDatas = imageDatas;
							}
						}
					}
				},
				error: function(xhr, type, errorThrown) {},
				loading: false
			});
		},
		methods: {
			bannerTap(item) {
				if(item.linkType == 'innerLink') {
					this.gotoDeviceDetail(item.banner_url);
				} else if(item.linkType == 'outerLink') {
					plus.runtime.openURL(item.banner_url);
				}
			},
			gotoDeviceDetail(id) {
				muiUtils.openWindow('../../bizpage/device/deviceinfo.html', '../../bizpage/device/deviceinfo.html', {
					extras: {
						deviceId: id
					}
				});
			},
			dealData() {
				this.workInfo.workerTypesDis = '';
				for(var wt of this.workInfo.workerTypes) {
					if(!this.workInfo.workerTypesDis) {
						this.workInfo.workerTypesDis = wt.typeName;
					} else {
						this.workInfo.workerTypesDis += '、' + wt.typeName;
					}
				}
				var address = {};
				address.provinceid = this.workInfo.provinceId;
				address.province = this.workInfo.provinceName;
				address.cityid = this.workInfo.cityId;
				address.city = this.workInfo.cityName;
				address.districtid = this.workInfo.countyId;
				address.district = this.workInfo.countyName;
				address.street = this.workInfo.street;
				address.lng = this.workInfo.lng;
				address.lat = this.workInfo.lat;
				this.address = address;
			},
			positioning: function() {
				muiUtils.openWindow('../../commonpage/map/selectaddress.html', '../../commonpage/map/selectaddress.html', {
					extras: {
						address: this.address,
						isPositioning: true
					}
				});
			},
			callTel: function(number) {
				cacheUtils.localStorage(CONSTS.PREFIX_LOGIN).setObject(CONSTS.LOGIN_FORWORD, {
					id: '../../bizpage/work/workinfo.html',
					url: '../../bizpage/work/workinfo.html'
				});
				muiUtils.loginValid(this.doCall);
			},
			doCall() {
				var that = this;
				this.userInfo = cacheUtils.localStorage(CONSTS.PREFIX_LOGIN).getObject(CONSTS.USER_INFO);
				this.isShared = this.userInfo.isShared;
				if(this.userInfo.id === this.workInfo.userId) {
					mui.toast('这是您自己的发布的用工需求！');
					return;
				}
				if(this.shareSwitch === 1 && this.isShared !== 1) {
					var btnArray = ['取消', '分享'];
					mui.confirm('一次分享即可免费联系，是否一键分享应用？', '提示', btnArray, function(e) {
						if(e.index == 1) {
							that.showShare = true;
						}
					});
				} else {
					plus.device.dial(this.workInfo.mobileNumber, false);
					muiUtils.muiAjax(api.APIS.employmentDemand.updateEmploymentDemandCt + '?id=' + that.workInfo.id, {
						dataType: "json",
						type: "post",
						success: function(data) {},
						error: function(xhr, type, errorThrown) {}
					});
				}
			},
			shareMessage: function(shareOb) {
				var url = mui.os.ios ? this.appVersionInfo.iOS.url : this.appVersionInfo.Android.url;
				var msg = {
					title: '彩钢精英',
					content: "《彩钢精英》助你招工、找工作、找设备、找工程，行业交流，急你所需！\n" + url,
					href: url
				};
				var that = this;
				if('weixin' == shareOb.id) {
					plus.nativeUI.actionSheet({ title: "分享到微信", cancel: "取消", buttons: [{ title: "分享到微信朋友圈" }, { title: "发送给微信好友" }] }, function(e) {
						if(e.index === 1) {
							msg.extra = { scene: "WXSceneTimeline" };
						} else if(e.index === 2) {
							msg.extra = { scene: "WXSceneSession" };
						} else {
							return;
						}
						shareOb.send(msg, function() {
							mui.toast("分享成功！");
							that.shareSuccess();
						}, function(e) {
							mui.toast("分享失败!");
						});
					});
				} else {
					shareOb.send(msg, function() {
						mui.toast("分享成功！");
						that.shareSuccess();
					}, function(e) {
						mui.toast("分享失败!");
					});
				}
			},
			shareAction(type) {
				this.showShare = false;
				var that = this;
				var shareOb;
				switch(type) {
					case 'weixin':
						shareOb = this.shares.sharewx;
						break;
					case 'qq':
						shareOb = this.shares.shareqq;
						break;
					case 'tencentweibo':
						shareOb = this.shares.sharetxwb;
						break;
					case 'sinaweibo':
						shareOb = this.shares.sharesnwb;
						break;
				}
				shareOb.authorize(function() {
					that.shareMessage(shareOb);
				}, function(e) {
					mui.toast("分享失败!");
				});
			},
			shareSuccess() {
				var that = this;
				muiUtils.muiAjax(api.APIS.user.updateShareState, {
					data: JSON.stringify({
						shareState: 1
					}),
					contentType: 'application/json',
					dataType: "json",
					type: "post",
					success: function(data) {
						if(data.erroCode === CONSTS.ERROR_CODE.SUCCESS) {
							that.isShared = 1;
							that.userInfo.isShared = 1;
							cacheUtils.localStorage(CONSTS.PREFIX_LOGIN).setObject(CONSTS.USER_INFO, that.userInfo);
						} else {
							mui.toast(data.erroCode + '：' + data.erroMsg);
						}
					},
					error: function(xhr, type, errorThrown) {
						mui.toast('服务器或网络异常，请稍后重试。')
					}
				});
			},
			shoucang() {
				cacheUtils.localStorage(CONSTS.PREFIX_LOGIN).setObject(CONSTS.LOGIN_FORWORD, {
					id: '../../bizpage/work/workinfo.html',
					url: '../../bizpage/work/workinfo.html'
				});
				muiUtils.loginValid(this.doShoucang);
			},
			doShoucang() {
				if(this.userInfo.id === this.workInfo.userId) {
					mui.toast('这是您自己的发布的用工需求！');
					return;
				}
				var that = this;
				var url = this.workInfo.isCollected == 1 ? api.APIS.collection.deleteCollection : api.APIS.collection.addCollection;
				muiUtils.muiAjax(url, {
					data: {
						type: 'work',
						collectId: this.workInfo.id
					},
					dataType: "json",
					type: "post",
					success: function(data) {
						if(data.erroCode === CONSTS.ERROR_CODE.SUCCESS) {
							mui.toast(that.workInfo.isCollected == 1 ? '已取消收藏' : '收藏成功！');
							that.workInfo.isCollected = that.workInfo.isCollected == 1 ? 0 : 1;
						} else {
							mui.toast(data.erroCode + '：' + data.erroMsg);
						}
					},
					error: function(xhr, type, errorThrown) {
						mui.toast('服务器或网络异常，请稍后重试。')
					}
				});
			}
		},
		ready: function() {
			var deceleration = mui.os.ios ? 0.003 : 0.0009;
			mui('.mui-scroll-wrapper').scroll({
				bounce: true,
				indicators: false, //是否显示滚动条
				deceleration: deceleration
			});
			var that = this;
			plus.share.getServices(function(s) {
				for(var i in s) {
					if('weixin' == s[i].id) {
						that.shares.sharewx = s[i];
					}
					if('qq' == s[i].id) {
						that.shares.shareqq = s[i];
					}
					if('tencentweibo' == s[i].id) {
						that.shares.sharetxwb = s[i];
					}
					if('sinaweibo' == s[i].id) {
						that.shares.sharesnwb = s[i];
					}
				}
			}, function(e) {
				mui.toast("获取分享服务列表失败！");
			});
		},
		components: {
			imageslider
		}
	};
</script>
<style scoped>
	.workInfo {
		position: absolute;
		top: 45px;
		bottom: 0;
		width: 100%;
		font-size: 16px;
	}
	
	#head-img {
		border-radius: 50%;
	}
	
	.mui-media {
		height: 82px;
	}
	
	.mui-table-view .mui-media-object {
		line-height: 62px;
		max-width: 62px;
		width: 62px;
		height: 62px;
	}
	
	.mui-table-view .mui-media-body {
		overflow: hidden;
		padding-top: 15px;
	}
	
	.mui-table-view {
		margin-bottom: 7px;
	}
	
	.mui-table-view-cell label {
		font-size: 16px;
		color: #8f8f94;
		float: left;
	}
	
	.mui-table-view-cell p.master-name {
		color: #222;
		margin-bottom: 10px;
		font-size: 16px;
		padding-left: 95px;
	}
	
	.master-age {
		margin: 0 10px;
	}
	
	.mui-ellipsis {
		font-size: 12px;
		margin-top: 3px;
	}
	
	.mui-ellipsis .jxddicon {
		color: rgb(38, 198, 218);
	}
	
	.shifu .mui-table-view-cell:after {
		height: 0;
	}
	
	.mui-table-view-chevron .mui-table-view-cell {
		padding-right: 0;
	}
	
	.yuyue {
		width: 30%;
		float: left;
		text-align: center;
	}
	
	.views {
		width: 30%;
		float: left;
		border-left: 1px solid #D7D7D7;
		text-align: center;
	}
	
	.counts {
		color: #000;
	}
	
	.mui-table-view-cell .mui-icon-phone {
		position: absolute;
		top: 2px;
		right: 0;
		line-height: 90px;
		padding: 0 18px;
		background-color: #26d0ca;
		color: #fff;
		font-size: 35px;
	}
	
	.mui-table-view-cell .yuyue-btn {
		background-color: rgb(38, 198, 218);
		color: #fff;
		float: right;
		width: 40%;
		margin-right: 20px;
		padding: 10px 15px;
		border-radius: 5px;
		position: relative;
	}
	
	.master-images img {
		padding: 10px;
		width: 100%;
	}
	
	.jieshao {
		font-size: 17px;
		color: #000;
	}
	
	.title {
		padding-right: 30px;
	}
	
	.icon-shoucang1,
	.icon-shoucangxuanzhong {
		font-size: 25px;
		color: #E41A1A;
		position: absolute;
		top: 12px;
		right: 15px;
	}
	
	.info-text {
		width: 75%;
		float: left;
		margin-left: 10px;
		padding-right: 20px;
	}
	
	.tishi {
		color: #f82f48;
	}
	
	.jxddicon.address-dingwei {
		position: absolute;
		top: 12px;
		right: 10px;
		padding: 0 0 20px 20px;
		color: #0D80CC;
		font-size: 26px;
	}
	
	.fabu {
		background-color: #26c6da;
		padding: 10px;
		border-radius: 5px;
	}
	
	.fabu a {
		color: #fff;
		text-align: center;
		display: block;
		position: relative;
		font-size: 16px;
	}
	
	#box {
		border: 6px solid #26c6da;
		border-left-color: #fff;
		width: 0;
		height: 0;
		position: absolute;
		top: 5px;
		margin-left: 5px;
	}
	
	.share {
		position: absolute;
		bottom: 0;
		width: 100%;
		background-color: #fff;
		height: 80px;
		z-index: 100;
		padding: 0 10px;
	}
	
	.share span {
		position: relative;
		width: 48%;
		height: 100%;
	}
	
	.share img {
		width: 60px;
		height: 60px;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-left: -30px;
		margin-top: -30px;
	}
	
	.shareMask {
		position: fixed;
		top: 0;
		bottom: 0;
		width: 100%;
		background-color: #000;
		opacity: 0.4;
		z-index: 99;
	}
	
	.description {
		white-space: pre-wrap;
	}
	
	.list-ad-two {
		background-color: #f3f5f7;
		height: 120px;
	}
	
	.list-ad-two img {
		width: 100%;
		height: 120px;
	}
	
	.list-ad-two .mui-slider {
		height: 120px;
	}
	
	.list-ad-two .mui-slider .mui-slider-group .mui-slider-item img {
		height: 120px;
	}
	
	.point {
		position: absolute;
		line-height: 1;
		top: 20px;
		right: 62px;
		z-index: 999;
		-webkit-transform: rotate(110deg);
	}
	
	.pointTip {
		position: absolute;
		line-height: 1;
		top: 8px;
		right: 81px;
		z-index: 999;
		color: #ffffff;
		background-color: #f86934;
		padding: 3px 5px;
		border-radius: 8px;
	}
	
	.point:after {
		content: "";
		box-sizing: border-box;
		border-bottom: 8px solid #f86934;
		border-right: 5px solid transparent;
		border-left: 5px solid transparent;
	}
</style>