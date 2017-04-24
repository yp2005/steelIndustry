<template>
	<nonetworkmask :disnonetworkmask.sync="disnonetworkmask" :top="45" :bottom="0"></nonetworkmask>
	<div class="mui-scroll-wrapper projectInfo">
		<div class="mui-scroll">
			<div class="context">
				<ul class="mui-table-view mui-table-view-chevron">
					<li class="mui-table-view-cell">
						<p class="jieshao">
							<span class="title">{{projectInfo.projectName}}</span>
							<span @tap="shoucang" v-show="projectInfo.isCollected == 1" class="jxddicon icon-shoucangxuanzhong"></span>
							<span @tap="shoucang" v-else class="jxddicon icon-shoucang1"></span>
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
						<span @tap="positioning" class="address info-text">{{(address.province || '') + ' ' + (address.city || '') + ' ' + (address.district || '') + ' ' + (address.street || '')}}</span>
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
							<span @tap="callTel" class="tel-btn"><span class="mui-icon mui-icon-phone icon-span"></span>电话咨询</span>
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
						<span class="description">{{projectInfo.description}}</span>
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
					<!--<li class="mui-table-view-cell">
						<p class="fabu">
							<a @tap="publishprojectInfo">我要发布工程<i id="box"></i></a>
						</p>
					</li>-->
				</ul>
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
	import api from 'api';
	import CONSTS from 'common/consts';
	import cacheUtils from 'common/cacheUtils';

	export default {
		data: function() {
			var shareSwitch = cacheUtils.localStorage(CONSTS.SYSTEM).getObject(CONSTS.APPSETTINGS).shareSwitch;
			var userInfo = cacheUtils.localStorage(CONSTS.PREFIX_LOGIN).getObject(CONSTS.USER_INFO) || {};
			var projectInfo = plus.webview.currentWebview().project;
			return {
				showShare: false,
				isShared: userInfo.isShared || 0,
				userInfo: userInfo,
				shareSwitch: shareSwitch,
				shares: {},
				projectInfo: projectInfo,
				address: {},
				picture: '',
				appVersionInfo: cacheUtils.localStorage(CONSTS.SYSTEM).getObject(CONSTS.APPVERSIONINFO),
				id: plus.webview.currentWebview().projectId
			}
		},
		created: function() {
			if(this.projectInfo) {
				this.picture = this.projectInfo.pictures.length > 0 ? this.projectInfo.pictures[0] : (this.userInfo.avatar || '1');
				this.dealData();
			} else {
				var that = this;
				muiUtils.muiAjax(api.APIS.project.getProjectById + '?id=' + that.id, {
					dataType: "json",
					type: "get",
					success: function(data) {
						if(data.erroCode === CONSTS.ERROR_CODE.SUCCESS) {
							that.projectInfo = data.result;
							that.picture = that.projectInfo.pictures.length > 0 ? that.projectInfo.pictures[0] : '1';
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
					id: '../../bizpage/project/projectinfo.html',
					url: '../../bizpage/project/projectinfo.html'
				});
				muiUtils.loginValid(this.doCall);
			},
			doCall() {
				var that = this;
				this.userInfo = cacheUtils.localStorage(CONSTS.PREFIX_LOGIN).getObject(CONSTS.USER_INFO);
				this.isShared = this.userInfo.isShared;
				if(this.userInfo.id === this.projectInfo.userId) {
					mui.toast('这是您自己发布的工程！');
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
					plus.device.dial(this.projectInfo.mobileNumber, false);
					muiUtils.muiAjax(api.APIS.project.updateProjectCt + '?id=' + that.projectInfo.id, {
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
					id: '../../bizpage/project/projectinfo.html',
					url: '../../bizpage/project/projectinfo.html'
				});
				muiUtils.loginValid(this.doShoucang);
			},
			doShoucang() {
				if(this.userInfo.id === this.projectInfo.userId) {
					mui.toast('这是您自己发布的工程！');
					return;
				}
				var that = this;
				var url = this.projectInfo.isCollected == 1 ? api.APIS.collection.deleteCollection : api.APIS.collection.addCollection;
				muiUtils.muiAjax(url, {
					data: {
						type: 'project',
						collectId: this.projectInfo.id
					},
					dataType: "json",
					type: "post",
					success: function(data) {
						if(data.erroCode === CONSTS.ERROR_CODE.SUCCESS) {
							mui.toast(that.projectInfo.isCollected == 1 ? '已取消收藏' : '收藏成功！');
							that.projectInfo.isCollected = that.projectInfo.isCollected == 1 ? 0 : 1;
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
	
	.icon-shoucang1,
	.icon-shoucangxuanzhong {
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