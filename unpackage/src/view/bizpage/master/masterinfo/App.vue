<template>
	<div class="mui-scroll-wrapper masterinfo">
		<div class="mui-scroll">
			<div class="context">
				<ul class="mui-table-view mui-table-view-chevron shifu">
					<li class="mui-table-view-cell">
						<div>
							<img class="mui-media-object mui-pull-left head-img" id="head-img" :src="picture">
							<div class="mui-media-body">
								<p><i class="master-name">{{master.contact}}</i><i class="master-age">工龄{{master.workingYears}}年</i></p>
								<p class='realNameAuthentication'>
									<img v-if="master.realNameAuthentication === 1" src="../../../../static/img/mine/shimingrenzheng.svg">
									<img v-else src="../../../../static/img/mine/noshimingrenzheng.svg">
								</p>
							</div>
						</div>
					</li>
					<li class="mui-table-view-cell">
						<div class="yuyue">
							<p class="counts">{{master.callTimes}}</p>
							<p>咨询次数</p>
						</div>
						<div class="views">
							<p class="counts">{{master.browseVolume}}</p>
							<p>浏览量</p>
						</div>
						<span class="mui-icon mui-icon-phone" @tap="callTel"></span>
					</li>
				</ul>
				<span class="point"></span>
				<p class="pointTip">点此电话联系</p>
				<ul class="mui-table-view">
					<li class="mui-table-view-cell">
						<p class="jieshao">
							<span>{{master.contact}}</span>
							<span>{{master.workerTypesDis}}</span>
							<span @tap="shoucang" v-show="master.isCollected == 1" class="jxddicon icon-shoucangxuanzhong"></span>
							<span @tap="shoucang" v-else class="jxddicon icon-shoucang1"></span>
						</p>
					</li>
					<li class="mui-table-view-cell">
						<label>服务范围</label>
						<span class="info-text">{{master.serviceAreaDis}}</span>
					</li>
					<!--<li class="mui-table-view-cell">
						<label>安装项目</label>
						<span class="info-text">{{master.project}}</span>
					</li>-->
					<li class="mui-table-view-cell">
						<label>联系地址</label>
						<span @tap="positioning" class="address info-text">{{(address.province || '') + ' ' + (address.city || '') + ' ' + (address.district || '') + ' ' + (address.street || '')}}</span>
						<span @tap="positioning" class="jxddicon icon-weizhi2 address-dingwei"></span>
					</li>
				</ul>
				<ul class="mui-table-view shifu">
					<li class="mui-table-view-cell">
						<label>师傅介绍</label>
					</li>
					<li class="mui-table-view-cell">
						<span class="description">{{master.description}}</span>
					</li>
					<li class="mui-table-view-cell master-images">
						<template v-for="picture in master.pictures">
							<img :src="picture">
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
			var masterCard = plus.webview.currentWebview().masterCard;
			return {
				showShare: false,
				isShared: userInfo.isShared || 0,
				userInfo: userInfo,
				shareSwitch: shareSwitch,
				shares: {},
				picture: '1',
				master: masterCard,
				address: {},
				userId: plus.webview.currentWebview().userId,
				appVersionInfo: cacheUtils.localStorage(CONSTS.SYSTEM).getObject(CONSTS.APPVERSIONINFO),
				adType: 'oneImg',
				imageDatas: [{
					banner_img_url: require('static/img/listPageBanner.jpg'),
				}],
				allianceCode: '',
				indicatorDisplay: false
			};
		},
		created: function() {
			var that = this;
			if(this.master) {
				this.picture = this.master.pictures.length > 0 ? this.master.pictures[0] : (this.userInfo.avatar || '1');
				this.dealData();
			} else {
				muiUtils.muiAjax(api.APIS.masterCard.getMasterCardByUserId + '?userId=' + that.userId, {
					dataType: "json",
					type: "get",
					success: function(data) {
						if(data.erroCode === CONSTS.ERROR_CODE.SUCCESS) {
							that.master = data.result;
							that.picture = that.master.pictures.length > 0 ? that.master.pictures[0] : '1';
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
				this.master.workerTypesDis = '';
				this.master.serviceAreaDis = '';
				for(var wt of this.master.workerTypes) {
					if(!this.master.workerTypesDis) {
						this.master.workerTypesDis = wt.typeName;
					} else {
						this.master.workerTypesDis += '、' + wt.typeName;
					}
				}
				for(var sa of this.master.serviceArea) {
					if(!this.master.serviceAreaDis) {
						this.master.serviceAreaDis = sa.areaNname;
					} else {
						this.master.serviceAreaDis += '、' + sa.areaNname;
					}
				}
				var address = {};
				address.provinceid = this.master.provinceId;
				address.province = this.master.provinceName;
				address.cityid = this.master.cityId;
				address.city = this.master.cityName;
				address.districtid = this.master.countyId;
				address.district = this.master.countyName;
				address.street = this.master.street;
				address.lng = this.master.lng;
				address.lat = this.master.lat;
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
					id: '../../bizpage/master/masterinfo.html',
					url: '../../bizpage/master/masterinfo.html'
				});
				muiUtils.loginValid(this.doCall);
			},
			doCall() {
				var that = this;
				this.userInfo = cacheUtils.localStorage(CONSTS.PREFIX_LOGIN).getObject(CONSTS.USER_INFO);
				this.isShared = this.userInfo.isShared;
				if(this.userInfo.id === this.master.userId) {
					mui.toast('这是您自己的名片！');
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
					plus.device.dial(this.master.mobileNumber, false);
					muiUtils.muiAjax(api.APIS.masterCard.updateMasterCardCt + '?id=' + that.master.id, {
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
					id: '../../bizpage/master/masterinfo.html',
					url: '../../bizpage/master/masterinfo.html'
				});
				muiUtils.loginValid(this.doShoucang);
			},
			doShoucang() {
				if(this.userInfo.id === this.master.userId) {
					mui.toast('这是您自己的名片！');
					return;
				}
				var that = this;
				var url = this.master.isCollected == 1 ? api.APIS.collection.deleteCollection : api.APIS.collection.addCollection;
				muiUtils.muiAjax(url, {
					data: {
						type: 'card',
						collectId: this.master.id
					},
					dataType: "json",
					type: "post",
					success: function(data) {
						if(data.erroCode === CONSTS.ERROR_CODE.SUCCESS) {
							mui.toast(that.master.isCollected == 1 ? '已取消收藏' : '收藏成功！');
							that.master.isCollected = that.master.isCollected == 1 ? 0 : 1;
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
	.masterinfo {
		position: absolute;
		top: 45px;
		bottom: 0;
		width: 100%;
		font-size: 16px;
	}
	
	#head-img {
		border-radius: 50%;
		margin-right: 20px;
	}
	
	.mui-media {
		height: 82px;
	}
	
	.mui-table-view .mui-media-object {
		line-height: 62px;
		max-width: 62px;
		height: 62px;
		width: 62px;
	}
	
	.mui-table-view .mui-media-body {
		overflow: hidden;
		padding-top: 7px;
	}
	
	.mui-table-view {
		margin-bottom: 7px;
	}
	
	.mui-table-view-cell label {
		font-size: 16px;
		color: #8f8f94;
		float: left;
	}
	
	.master-name {
		color: #000;
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
	
	.mui-table-view-chevron .mui-table-view-cell:first-child {
		padding-bottom: 0;
	}
	
	.yuyue {
		width: 35%;
		float: left;
		text-align: center;
	}
	
	.views {
		width: 35%;
		float: left;
		border-left: 1px solid #D7D7D7;
		text-align: center;
	}
	
	.counts {
		color: #000;
	}
	
	.mui-table-view-cell .mui-icon-phone {
		position: absolute;
		bottom: 11px;
		right: 0;
		line-height: 42px;
		padding: 0 25px;
		background-color: #26d0ca;
		color: #fff;
		font-size: 33px
	}
	
	.master-images img {
		padding: 10px;
		width: 100%;
	}
	
	.jieshao {
		font-size: 17px;
		color: #000;
		padding-right: 35px;
		padding-left: 80px;
	}
	
	.jieshao span:first-child {
		position: absolute;
		left: 13px;
		top: 13px;
		line-height: 1;
		max-width: 70px;
	}
	
	.icon-shoucang1,
	.icon-shoucangxuanzhong {
		font-size: 25px;
		color: #E41A1A;
		position: absolute;
		right: 11px;
		top: 13px;
	}
	
	.info-text {
		width: 75%;
		float: left;
		margin-left: 10px;
		padding-right: 10px;
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
	
	.realNameAuthentication img {
		width: 19px;
		height: 19px;
		margin-top: 7px;
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
		position: fixed;
		line-height: 1;
		top: 80px;
		right: 30px;
		z-index: 999;
	}
	
	.pointTip {
		position: fixed;
		line-height: 1;
		top: 51px;
		right: 5px;
		z-index: 999;
		color: #ffffff;
		background-color: #f86934;
		padding: 3px 5px;
		border-radius: 8px;
	}
	
	.point:after {
		content: "";
		box-sizing: border-box;
		border-top: 8px solid #f86934;
		border-right: 5px solid transparent;
		border-left: 5px solid transparent;
	}
</style>