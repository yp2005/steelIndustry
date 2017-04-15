<template>
	<nonetworkmask :disnonetworkmask.sync="disnonetworkmask" :top="45" :bottom="0"></nonetworkmask>
	<div class="mui-scroll-wrapper projectInfo">
		<div class="mui-scroll">
			<div class="context">
				<ul class="mui-table-view mui-table-view-chevron">
					<li class="mui-table-view-cell">
						<p class="jieshao">
							<span class="title">{{projectInfo.provinceName}}</span>
							<span @tap="shoucang" class="jxddicon icon-shoucang1"></span>
						</p>
					</li>
					<li class="mui-table-view-cell">
						<label>发布时间</label>
						<span class="info-text">{{projectInfo.updateTime}}</span>
					</li>
					<li class="mui-table-view-cell">
						<label>到期时间</label>
						<span class="info-text">{{projectInfo.dueTime}}</span>
					</li>
					<!--<li class="mui-table-view-cell">
						<label>招工范围</label>
						<span class="info-text">{{projectInfo.type}}</span>
					</li>-->
					<li class="mui-table-view-cell">
						<label>干活地点</label>
						<span @tap="positioning" class="address info-text">{{address.province + ' ' + address.city + ' ' + address.district + ' ' + address.street}}</span>
						<span @tap="positioning" class="jxddicon icon-weizhi2 address-dingwei"></span>
					</li>
				</ul>
				<ul class="mui-table-view mui-table-view-chevron shifu">
					<li class="mui-table-view-cell">
						<img class="mui-media-object mui-pull-left head-img" id="head-img" :src="picture">
						<p class="master-name">{{projectInfo.contact}}</p>
						<div class="yuyue">
							<p class="counts">{{projectInfo.callTimes}}</p>
							<p>咨询人次</p>
						</div>
						<div class="views">
							<p class="counts">{{projectInfo.browseVolume}}</p>
							<p>浏览量</p>
						</div>
					</li>
					<li class="mui-table-view-cell btn">
						<p>
							<span @tap="callTel(projectInfo.mobileNumber)" class="tel-btn"><span class="mui-icon mui-icon-phone icon-span"></span>电话咨询</span>
						</p>
						<!--<p>
							<span class="yuyue-btn"><span class="jxddicon icon-yijianfankui icon-span"></span>立即预约</span>
						</p>-->
					</li>
				</ul>
				<ul class="mui-table-view shifu">
					<li class="mui-table-view-cell">
						<label>工程介绍</label>
					</li>
					<li class="mui-table-view-cell">
						<span>{{projectInfo.description}}</span>
					</li>
					<li class="mui-table-view-cell master-images">
						<template v-for="img in projectInfo.pictures">
							<img :src="img">
						</template>
					</li>
					<li class="mui-table-view-cell store-title">
						<p>
							<span class="tishi">温馨提示（联系时请说明是在“彩钢精英”上看到的）</span>
						</p>
					</li>
					<li class="mui-table-view-cell">
						<p class="fabu">
							<a @tap="publishprojectInfo">我要发布工程<i id="box"></i></a>
						</p>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import nonetworkmask from 'component/mask/NoNetWorkMask';
	import muiUtils from 'common/muiUtils';
	import log from 'common/logUtils';
	import CONSTS from 'common/consts';
	import cacheUtils from 'common/cacheUtils';

	export default {
		data: function() {
			var userInfo = cacheUtils.localStorage(CONSTS.SYSTEM).getObject(CONSTS.APPSETTINGS).shareSwitch;
			var isShared = cacheUtils.localStorage(CONSTS.USER_INFO).getObject(CONSTS.USER_INFO).isShared;
			var projectInfo = plus.webview.currentWebview().project;
			return {
				projectInfo: projectInfo,
				isShared: isShared,
				address: {},
				picture: ''
			}
		},
		created: function() {
			if(this.projectInfo) {
				this.picture = this.projectInfo.pictures.length > 0 ? this.projectInfo.pictures[0] : (this.userInfo.avatar || '1');
				var address = {};
				address.provinceid = this.projectInfo.provinceId;
				address.province = this.projectInfo.provinceName;
				address.cityid = this.projectInfo.cityId;
				address.city = this.projectInfo.cityName;
				address.districtid = this.projectInfo.countyId;
				address.district = this.projectInfo.countyName;
				address.street = this.projectInfo.street;
				address.lng = this.projectInfo.lng;
				address.lat = this.projectInfo.lat;
				this.address = address;
			} else {
				// TODO ajax请求数据
			}
		},
		methods: {
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
				if(isShared == 0) {
					plus.device.dial(number, false);
				} else {
					let self = this;
					mui.alert('分享app即可获取联系电话！', '分享', '分享', function() {
						mui.toast('分享成功！');
						self.isShared = 0;
						console.log('CONSTS.IS_SHARED:' + CONSTS.IS_SHARED);
						cacheUtils.localStorage(CONSTS.IS_SHARED).set(CONSTS.IS_SHARED, self.isShared);
						//入库
						//@tudo
					});
				}
			},
			shoucang: function() {
				mui.toast('收藏成功！');
			},
			publishprojectInfo: function() {
				let url = '../../bizpage/release/work.html';
				muiUtils.openWindow(url, url);
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
			nonetworkmask
		}
	};
</script>
<style scoped>
	.projectInfo {
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
		margin-bottom: 10px;
	}
	
	.mui-table-view-cell label {
		font-size: 16px;
		color: #8f8f94;
		float: left;
	}
	
	.master-name {
		color: #000;
		margin-bottom: 20px;
		font-size: 17px;
		padding-left: 90px;
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
	
	.mui-table-view-cell .tel-btn {
		background-color: #26c6da;
		color: #fff;
		float: right;
		margin: 15px 50px 5px 0;
		padding: 7px 25px;
		border-radius: 5px;
		position: relative;
		text-indent: 22px;
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
	
	.icon-span {
		position: absolute;
		top: 7px;
		left: -4px;
		color: #fff;
	}
	
	.btn {
		text-align: center;
		margin-top: -20px;
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
	
	.icon-shoucang1 {
		font-size: 25px;
		color: #E41A1A;
		position: absolute;
		top: 40%;
		right: 15px;
	}
	
	.info-text {
		width: 75%;
		float: left;
		margin-left: 10px;
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
</style>