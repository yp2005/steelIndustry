<template>
	<div class="mui-scroll-wrapper deviceInfo">
		<div class="mui-scroll">
			<div>
				<imageslider sliderid="store-slider" :images="storeImageDatas"></imageslider>
			</div>
			<div class="shop-data-box">
				<ul class="shop-data-list  am-list">
					<li class="mui-table-view-cell">
						<p class="storeName">{{store.storeName}}</p>
					</li>
					<li class="mui-table-view-cell">
						<p @tap="shoucang">
							<span>{{store.deviceTypesDis}}</span>
							<span v-show="store.isCollected == 1" class="jxddicon icon-shoucangxuanzhong"></span>
							<span v-else class="jxddicon icon-shoucang1"></span>
						</p>
					</li>
					<li class="mui-table-view-cell">
						<p @tap="positioning">
							<span class="jxddicon icon-weizhi2"></span>
							<span class="text-context">{{(address.province || '') + ' ' + (address.city || '') + ' ' + (address.district || '') + ' ' + (address.street || '')}}</span>
							<span class="jxddicon icon-jinru32"></span>
						</p>
					</li>
					<li class="mui-table-view-cell telphone" @tap="callTel">
						<p>
							<span class="mui-icon mui-icon-phone"></span>
							<span class="text-context" v-show="isShared === 1 && shareSwitch === 1">{{store.mobileNumber}}</span>
							<span class="text-context" v-else>电话咨询</span>
							<span class="jxddicon icon-jinru32"></span>
						</p>
					</li>
				</ul>
				<div class="description">
					<p>店铺介绍<span class="mui-pull-right">浏览量：{{store.browseVolume}}</span></p>
					<p>{{store.description}}</p>
				</div>
				<div class="aboveWords">
					<p class="goods" @tap="allGoods">
						<span class="bendian">本店商品</span>
						<span class="mui-pull-right">查看全部<span class="mui-icon mui-icon-forward"></span></span>
					</p>
					<ul class="mui-table-view mui-grid-view columns4 goods-list">
						<template v-for="img in productPictures">
							<li @tap="itemtap" class="mui-table-view-cell mui-media mui-col-xs-6">
								<a class="{{$index%2==0?'one':''}}">
									<img class="mui-media-object" :src="img">
								</a>
							</li>
						</template>
					</ul>
				</div>
				<div class="bottomInfo">
					<p class="goods">
						<span class="tishi">温馨提示（联系时请说明是在“彩钢精英”上看到的）</span>
					</p>
					<p class="fabu">
						<a @tap="open">我要发布店铺<i id="box"></i></a>
					</p>
				</div>
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
	import api from 'api';
	import CONSTS from 'common/consts';
	import cacheUtils from 'common/cacheUtils';
	import imageslider from 'component/slider/ImageSlider';
	export default {
		data: function() {
			var shareSwitch = cacheUtils.localStorage(CONSTS.SYSTEM).getObject(CONSTS.APPSETTINGS).shareSwitch;
			var userInfo = cacheUtils.localStorage(CONSTS.PREFIX_LOGIN).getObject(CONSTS.USER_INFO) || {};
			var store = plus.webview.currentWebview().store;
			return {
				showShare: false,
				isShared: userInfo.isShared || 0,
				userInfo: userInfo,
				shareSwitch: shareSwitch,
				shares: {},
				store: store,
				storeImageDatas: [],
				address: {},
				userId: plus.webview.currentWebview().userId,
				appVersionInfo: cacheUtils.localStorage(CONSTS.SYSTEM).getObject(CONSTS.APPVERSIONINFO),
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
			if(this.store) {
				this.dealData();
			} else {
				muiUtils.muiAjax(api.APIS.store.getStoreByUserId + '?userId=' + that.userId, {
					dataType: "json",
					type: "get",
					success: function(data) {
						if(data.erroCode === CONSTS.ERROR_CODE.SUCCESS) {
							that.store = data.result;
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
			dealData() {
				var imgs = [this.store.imgServer + this.store.shopSignPictures].concat(this.store.environmentPictures.concat(this.store.productPictures));
				if(this.store.productPictures.length > 4) {
					this.productPictures = this.store.productPictures.slice(0, 4);
				}
				var imageDatas = [];
				for(var i = 0; i < imgs.length; i++) {
					imageDatas.push({
						"banner_img_url": imgs[i],
						"gc_id_1": i,
						"banner_order": i
					});
				}
				this.storeImageDatas = imageDatas;
				this.store.deviceTypesDis = '';
				for(var dt of this.store.deviceTypes) {
					if(!this.store.deviceTypesDis) {
						this.store.deviceTypesDis = dt.typeName;
					} else {
						this.store.deviceTypesDis += '、' + dt.typeName;
					}
				}
				var address = {};
				address.provinceid = this.store.provinceId;
				address.province = this.store.provinceName;
				address.cityid = this.store.cityId;
				address.city = this.store.cityName;
				address.districtid = this.store.countyId;
				address.district = this.store.countyName;
				address.street = this.store.street;
				address.lng = this.store.lng;
				address.lat = this.store.lat;
				this.address = address;
			},
			open: function() {
				cacheUtils.localStorage(CONSTS.PREFIX_LOGIN).setObject(CONSTS.LOGIN_FORWORD, {
					id: '../../bizpage/device/deviceinfo.html',
					url: '../../bizpage/device/deviceinfo.html'
				});
				//判断是否登录，没登录需要打开登录页面，登录了查看是否已经发布店铺，发布了就打开店铺，显示店铺管理页面，没法发就跳转发布店铺页面
				muiUtils.loginValid(this.forwordPublishPage);
			},
			forwordPublishPage: function() {
				muiUtils.muiAjax(api.APIS.store.getStore, {
					dataType: "json",
					type: "get",
					success: function(data) {
						if(data.erroCode === CONSTS.ERROR_CODE.SUCCESS) {
							if(data.result) {
								var store = data.result;
								switch(store.state) {
									case 0:
										store.stateValue = '草稿';
										break;
									case 1:
										store.stateValue = '通过审核';
										break;
									case 2:
										store.stateValue = '审核中';
										break;
									case 3:
										store.stateValue = '审核不通过';
										break;
								}
								muiUtils.openWindow('../../commonpage/mine/mystore.html', '../../commonpage/mine/mystore.html', {
									isValidLogin: true,
									isClose: true,
									extras: {
										store: store
									}
								});
							} else {
								muiUtils.openWindow('../../bizpage/release/store.html', '../../bizpage/release/store.html', {
									isValidLogin: true,
									isClose: true
								});
							}
						} else {
							mui.toast(data.erroCode + '：' + data.erroMsg);
						}
					},
					error: function(xhr, type, errorThrown) {
						mui.toast('服务器或网络异常，请稍后重试。');
					}
				});
			},
			shoucang() {
				cacheUtils.localStorage(CONSTS.PREFIX_LOGIN).setObject(CONSTS.LOGIN_FORWORD, {
					id: '../../bizpage/device/deviceinfo.html',
					url: '../../bizpage/device/deviceinfo.html'
				});
				muiUtils.loginValid(this.doShoucang);
			},
			doShoucang() {
				if(this.userInfo.id === this.store.userId) {
					mui.toast('这是您自己的店铺！');
					return;
				}
				var that = this;
				var url = this.store.isCollected == 1 ? api.APIS.collection.deleteCollection : api.APIS.collection.addCollection;
				muiUtils.muiAjax(url, {
					data: {
						type: 'store',
						collectId: this.store.id
					},
					dataType: "json",
					type: "post",
					success: function(data) {
						if(data.erroCode === CONSTS.ERROR_CODE.SUCCESS) {
							mui.toast(that.store.isCollected == 1 ? '已取消收藏' : '收藏成功！');
							that.store.isCollected = that.store.isCollected == 1 ? 0 : 1;
						} else {
							mui.toast(data.erroCode + '：' + data.erroMsg);
						}
					},
					error: function(xhr, type, errorThrown) {
						mui.toast('服务器或网络异常，请稍后重试。')
					}
				});
			},
			positioning: function() {
				muiUtils.openWindow('../../commonpage/map/selectaddress.html', '../../commonpage/map/selectaddress.html', {
					extras: {
						address: this.address,
						isPositioning: true
					}
				});
			},
			callTel: function() {
				cacheUtils.localStorage(CONSTS.PREFIX_LOGIN).setObject(CONSTS.LOGIN_FORWORD, {
					id: '../../bizpage/device/deviceinfo.html',
					url: '../../bizpage/device/deviceinfo.html'
				});
				muiUtils.loginValid(this.doCall);
			},
			doCall() {
				var that = this;
				this.userInfo = cacheUtils.localStorage(CONSTS.PREFIX_LOGIN).getObject(CONSTS.USER_INFO);
				this.isShared = this.userInfo.isShared;
				if(this.userInfo.id === this.store.userId) {
					mui.toast('这是您自己的店铺！');
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
					plus.device.dial(this.store.mobileNumber, false);
					muiUtils.muiAjax(api.APIS.store.updateStoreCt + '?id=' + that.store.id, {
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
					content: "《彩钢精英》助你招工、找工作、找设备、找工程，行业交流，急你所需！",
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
			allGoods: function(item) {
				muiUtils.openWindow('../../bizpage/device/allGoods.html', {
					extras: {
						'imageDatas': this.store.productPictures
					}
				});
			},
			storeManage: function() {
				let url = '../../bizpage/device/editstore.html';
				muiUtils.openWindow(url, {
					extras: {
						id: this.store.id,
						status: this.store.status
					}
				});
			},
			//			gotoStorePage: function() {
			//				let url = '';
			//				let id = '';
			//				let params = {};
			//				if(this.store.status === -1) { // 店铺预览
			//					url = '../../bizpage/device/storemanage.html';
			//					id = 'storemanage_preview';
			//					params = {
			//						isPreview: true,
			//						isStoreManage: true,
			//						isClose: true,
			//						createNew: true,
			//						id: this.store.id,
			//						status: this.store.status
			//					}
			//				} else { // 店铺管理
			//					url = '../../bizpage/device/editstore.html';
			//					params = {
			//						id: this.store.id,
			//						status: this.store.status
			//					}
			//				}
			//
			//				muiUtils.openWindow(url, id || url, {
			//					extras: params
			//				});
			//			}
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
	.deviceInfo {
		position: absolute;
		top: 45px;
		bottom: 0;
		width: 100%;
	}
	
	.mui-slider {
		height: 256px;
		background-color: #fff;
		margin-bottom: 7px;
	}
	
	.mui-slider .mui-slider-group .mui-slider-item img {
		height: 256px;
	}
	
	.text-context {
		padding: 0 20px;
	}
	
	.mui-table-view-cell:after {
		left: 5px;
	}
	
	.jxddicon {
		position: absolute;
		top: 10px;
		right: 13px;
		padding: 0 0 20px 20px;
		color: #C9C9C9;
		font-size: 24px;
	}
	
	.icon-shoucang1,
	.icon-shoucangxuanzhong {
		color: #FA4747;
	}
	
	.icon-weizhi2 {
		position: absolute;
		top: 12px;
		left: -10px;
		padding: 0 0 20px 20px;
		color: #0D80CC;
		font-size: 26px;
	}
	
	.mui-icon-phone {
		position: absolute;
		top: 10px;
		left: -10px;
		padding: 0 0 20px 20px;
		color: #0D80CC;
		font-size: 24px;
	}
	
	.store-title:after .mui-table-view-cell.telphone:after {
		height: 1px;
	}
	
	.jieshao-title:after {
		font-size: 16px;
	}
	
	.jieshao-title {
		padding-top: 11px;
	}
	
	.jieshao:after {
		height: 20px;
		left: 0;
		background-color: #ddd;
	}
	
	.jieshao p {
		color: #000;
		padding-bottom: 15px;
	}
	
	.jieshao-title p {
		margin-left: 15px;
	}
	
	.jieshao-title span {
		float: right;
		padding-right: 15px;
	}
	
	.goods .bendian {
		color: #222;
	}
	
	.aboveWords {
		padding: 10px;
		background-color: #fff;
		margin-bottom: 7px;
	}
	
	.goods-list a {
		padding-bottom: 5px !important;
		padding-right: 1px !important;
	}
	
	.goods-list .one {
		padding-right: 5px !important;
	}
	
	.tishi {
		color: #f82f48;
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
	
	.list-ad-two {
		background-color: #f3f5f7;
		height: 120px;
	}
	
	.list-ad-two img {
		width: 100%;
		height: 120px;
	}
	
	.store-manage-btn {
		background-color: #fff;
		color: rgb(38, 198, 218);
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		margin-bottom: 0;
		border: none;
		padding: 0;
		height: 50px;
		line-height: 50px;
		box-shadow: none;
		border-radius: 0;
		text-align: center;
		z-index: 2;
	}
	
	.error-div {
		text-align: center;
		margin-top: 40vh;
	}
	
	.error-div p {
		margin-bottom: 10px;
		font-size: 18px;
	}
	
	.error-div a {
		color: #fff;
		background-color: rgb(38, 198, 218);
		border-radius: 3px;
		text-align: center;
		margin: 0 auto;
		padding: 5px 15px;
		font-size: 16px;
		width: 100px;
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
		background-color: #fff;
		margin-bottom: 7px;
		padding: 15px;
	}
	
	.description p {
		white-space: pre-wrap;
	}
	
	.description p:first-child {
		line-height: 21px;
		margin-bottom: 10px;
		color: #222;
	}
	
	.description p:nth-child(2) {
		color: #666;
	}
	
	.list-ad-two .mui-slider {
		height: 120px;
	}
	
	.list-ad-two .mui-slider .mui-slider-group .mui-slider-item img {
		height: 120px;
	}
	
	.storeName {
		color: #222;
		font-size: 15px;
	}
	
	.shop-data-list,
	.bottomInfo {
		background-color: #fff;
		margin-bottom: 7px;
	}
	
	.bottomInfo {
		padding: 15px;
	}
	
	.bottomInfo p:first-child {
		padding-bottom: 10px;
	}
</style>