<template>
	<nonetworkmask :disnonetworkmask.sync="disnonetworkmask" :top="45" :bottom="0"></nonetworkmask>
	<div class="mui-scroll-wrapper deviceInfo">
		<div class="mui-scroll">
			<!--<div class="error-div" v-if="isStoreManage && !isPreview && store.status!=0">
				<p>{{store.message}}</p>
				<a @tap="gotoStorePage">{{store.statusBtn}}</a>
			</div>-->
			<div v-else class="context">
				<!--轮播图-->
				<div>
					<slider :images="imageDatas"></slider>
				</div>
				<!--文字说明 -->
				<div class="shop-data-box">
					<h4 class="mui-table-view-cell">{{store.storeName}}</h4>
					<ul class="shop-data-list  am-list">
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
					<div>
						<li class="jieshao-title">
							<p>门店介绍<span class="readTimes">浏览量：{{store.browseVolume}}</span></p>
						</li>
						<li class="mui-table-view-cell jieshao">
							<p class="description">{{store.description}}</p>
						</li>
					</div>
					<li class="mui-table-view-cell store-title">
						<p class="goods">
							<span class="bendian">本店商品</span>
							<span class="getAll" @tap="itemtap">查看全部</span>
							<span class="mui-icon mui-icon-forward"></span>
						</p>
					</li>
					<div class="aboveWords">
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
					<div class="store-info">
						<li class="mui-table-view-cell store-title">
							<p class="goods">
								<span class="tishi">温馨提示（联系时请说明是在“彩钢精英”上看到的）</span>
							</p>
						</li>
						<li class="mui-table-view-cell">
							<p class="fabu">
								<a @tap="open">我要发布店铺<i id="box"></i></a>
							</p>
						</li>
						<!--
                        	作者：18710095921@163.com
                        	时间：2017-04-15
                        	描述：下面是广告
                        	TODO
                        -->
						<div class="list-ad-two">
							<a href="javascript:void(0)"><img src="http://img.168bgt.com/upload/2016/07/24/20160724145643_62.jpg"></a>
						</div>
					</div>
				</div>
			</div>

		</div>
	</div>
	<div class="share" v-show="showShare">
		<span @tap="shareAction('weixin')"><img src="../../../../static/img/share/wx.png" /></span>
		<span @tap="shareAction('qq')"><img src="../../../../static/img/share/qq.png" /></span>
		<span @tap="shareAction('tencentweibo')"><img src="../../../../static/img/share/txwb.png" /></span>
		<span @tap="shareAction('sinaweibo')"><img src="../../../../static/img/share/snwb.png" /></span>
	</div>
	<div class="shareMask" v-show="showShare" @tap="showShare = false"></div>
</template>

<script>
	import nonetworkmask from 'component/mask/NoNetWorkMask';
	import muiUtils from 'common/muiUtils';
	import log from 'common/logUtils';
	import slider from 'component/slider/ImageSlider';
	import api from 'api';
	import CONSTS from 'common/consts';
	import cacheUtils from 'common/cacheUtils';

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
				imageDatas: [],
				address: {},
				userId: plus.webview.currentWebview().userId,
				appVersionInfo: cacheUtils.localStorage(CONSTS.SYSTEM).getObject(CONSTS.APPVERSIONINFO)
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
		},
		methods: {
			dealData() {
				var imgs = this.store.environmentPictures.concat(this.store.productPictures);
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
				this.imageDatas = imageDatas;
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
			itemtap: function(item) {
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
			nonetworkmask,
			slider
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
		float: left;
		color: #000;
	}
	
	.goods .getAll {
		float: right;
		padding-right: 5px;
	}
	
	.goods .mui-icon {
		right: 0px;
		top: 10px;
		position: absolute;
	}
	
	.aboveWords {
		padding: 10px;
	}
	
	.aboveWords:after {
		position: absolute;
		right: 0;
		left: 0;
		height: 20px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
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
		background-color: #c8c7cc;
		padding: 10px 0;
	}
	
	.list-ad-two img {
		width: 100%;
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
		width: 24%;
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
</style>