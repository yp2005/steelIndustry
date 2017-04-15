<template>
	<nonetworkmask :disnonetworkmask.sync="disnonetworkmask" :top="45" :bottom="0"></nonetworkmask>
	<div class="mui-scroll-wrapper deviceInfo" style="bottom: {{isStoreManage ? '50px' : '0'}}">
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
								<span class="jxddicon icon-shoucang1"></span>
							</p>
						</li>
						<li class="mui-table-view-cell">
							<p @tap="positioning">
								<span class="jxddicon icon-weizhi2"></span>
								<span class="text-context">{{store.provinceName + ' ' + store.cityName + ' ' + store.countyName + ' ' +store.street}}</span>
								<span class="jxddicon icon-jinru32"></span>
							</p>
						</li>
						<li class="mui-table-view-cell telphone">
							<p>
								<span class="mui-icon mui-icon-phone"></span>
								<span class="text-context" v-show="isShared === 1" @tap="callTel(store.mobileNumber)">{{store.mobileNumber}}</span>
								<span class="text-context" v-else @tap="toShare">电话咨询</span>
								<span class="jxddicon icon-jinru32"></span>
							</p>
						</li>
					</ul>
					<div>
						<li class="jieshao-title">
							<p>门店介绍<span class="readTimes">浏览量：{{store.browseVolume}}</span></p>
						</li>
						<li class="mui-table-view-cell jieshao">
							<p>{{store.description}}</p>
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
							<template v-for="img in store.productPictures">
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
                        -->
						<div class="list-ad-two">
							<a href="http://8du.in/1p1M0Q"><img src="http://img.168bgt.com/upload/2016/07/24/20160724145643_62.jpg"></a>
						</div>
					</div>
				</div>
			</div>

		</div>
	</div>
</template>

<script>
	import nonetworkmask from 'component/mask/NoNetWorkMask';
	import muiUtils from 'common/muiUtils';
	import log from 'common/logUtils';
	import slider from 'component/slider/ImageSlider';
	import CONSTS from 'common/consts';
	import cacheUtils from 'common/cacheUtils';

	export default {
		data: function() {
			var userInfo = cacheUtils.localStorage(CONSTS.SYSTEM).getObject(CONSTS.APPSETTINGS).shareSwitch;
			var isShared = cacheUtils.localStorage(CONSTS.USER_INFO).getObject(CONSTS.USER_INFO).isShared;
			var store = plus.webview.currentWebview().store;
			return {
				isShared: isShared,
				store: store,
				imageDatas: [],
				address: {}
			}
		},
		created: function() {
			if(this.store) {
				var imgs = this.store.environmentPictures.concat(this.store.productPictures);
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
			} else {
				// TODO ajax请求数据
			}
		},
		methods: {
			open: function() {
				cacheUtils.localStorage(CONSTS.PREFIX_LOGIN).setObject(CONSTS.LOGIN_FORWORD, {
					id: '../../bizpage/device/deviceinfo.html',
					url: '../../bizpage/device/deviceinfo.html'
				});
				//判断是否登录，没登录需要打开登录页面，登录了查看是否已经发布店铺，发布了就打开店铺，显示店铺管理页面，没法发就跳转发布店铺页面
				muiUtils.loginValid(this.forwordPublishPage);
			},
			forwordPublishPage: function() {
				let url = '../../bizpage/release/store.html';
				let params = {};
				let userInfo = cacheUtils.localStorage(CONSTS.USER_INFO).getObject(CONSTS.USER_INFO);
				if(userInfo && userInfo.hasStore) {
					//已经开店了，直接进入店铺管理
					url = '../../bizpage/device/storemanage.html';
					params = {
						isStoreManage: true,
						id: this.store.id,
						status: this.store.status
					};
				}
				muiUtils.openWindow(url, url, {
					extras: params
				});
			},
			shoucang: function() {
				mui.toast('收藏成功！');
			},
			positioning: function() {
				muiUtils.openWindow('../../commonpage/map/selectaddress.html', '../../commonpage/map/selectaddress.html', {
					extras: {
						address: this.address,
						isPositioning: true,
						fromPage: '../../bizpage/device/deviceinfo.html'
					}
				});
			},
			callTel: function(number) {
				plus.device.dial(number, false);
			},
			toShare: function() {
				let self = this;
				mui.alert('分享app即可获取联系电话！', '分享', '分享', function() {
					mui.toast('分享成功！');
					self.isShared = 0;
					console.log('CONSTS.IS_SHARED:' + CONSTS.IS_SHARED);
					cacheUtils.localStorage(CONSTS.IS_SHARED).set(CONSTS.IS_SHARED, self.isShared);
					//入库
					//@tudo
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
			gotoStorePage: function() {
				let url = '';
				let id = '';
				let params = {};
				if(this.store.status === -1) { // 店铺预览
					url = '../../bizpage/device/storemanage.html';
					id = 'storemanage_preview';
					params = {
						isPreview: true,
						isStoreManage: true,
						isClose: true,
						createNew: true,
						id: this.store.id,
						status: this.store.status
					}
				} else { // 店铺管理
					url = '../../bizpage/device/editstore.html';
					params = {
						id: this.store.id,
						status: this.store.status
					}
				}

				muiUtils.openWindow(url, id || url, {
					extras: params
				});
			}
		},
		watch: {

		},
		ready: function() {
			var deceleration = mui.os.ios ? 0.003 : 0.0009;
			mui('.mui-scroll-wrapper').scroll({
				bounce: true,
				indicators: false, //是否显示滚动条
				deceleration: deceleration
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
		margin-left: 20px;
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
	
	.icon-shoucang1 {
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
</style>