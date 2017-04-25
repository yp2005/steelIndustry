<template>
	<div class="mui-pages">
		<div class="mui-page mui-page-center">
			<div class="mui-page-content">
				<div class="mui-scroll-wrapper" data-scroll="2">
					<div class="mui-scroll" style="transform: translate3d(0px, 0px, 0px) translateZ(0px);">
						<ul class="mui-table-view mui-table-view-auth">
							<li class="mui-table-view-cell mui-media">
								<a href="javascript:void(0);" @tap="open('../../commonpage/authmanager/person.html', userInfo.realNameAuthentication, realNameInfo)">
									<img v-if="userInfo.realNameAuthentication == 1" class="mui-media-object mui-pull-left" :src="shimingpicpath">
									<img v-else class="mui-media-object mui-pull-left" :src="noshimingpicpath">
									<div class="mui-media-body">
										实名认证
										<span v-if="userInfo.realNameAuthentication == 0" class="auth-renzheng-span">立即认证</span>
										<span v-if="userInfo.realNameAuthentication == 1" class="auth-renzheng-span">已认证</span>
										<span v-if="userInfo.realNameAuthentication == 2" class="auth-renzheng-span">认证审核中</span>
										<span v-if="userInfo.realNameAuthentication == 3" class="auth-renzheng-span">认证审核未通过</span>
										<p class='mui-ellipsis'>实名认证可提高帐号的安全性和信任级别</p>
									</div>
								</a>
							</li>
						</ul>
						<ul class="mui-table-view mui-table-view-auth">
							<li class="mui-table-view-cell mui-media">
								<a href="javascript:void(0);" @tap="open('../../commonpage/authmanager/company.html', userInfo.enterpriseCertification, enterpriseInfo)">
									<img v-if="userInfo.enterpriseCertification == 1" class="mui-media-object mui-pull-left" :src="qiyepicpath">
									<img v-else class="mui-media-object mui-pull-left" :src="noqiyepicpath">
									<div class="mui-media-body">
										企业认证
										<span v-if="userInfo.enterpriseCertification == 0" class="auth-renzheng-span">立即认证</span>
										<span v-if="userInfo.enterpriseCertification == 1" class="auth-renzheng-span">已认证</span>
										<span v-if="userInfo.enterpriseCertification == 2" class="auth-renzheng-span">认证审核中</span>
										<span v-if="userInfo.enterpriseCertification == 3" class="auth-renzheng-span">认证审核未通过</span>
										<p class='mui-ellipsis'>企业认证可提高帐号的安全性和信任级别</p>
									</div>
								</a>
							</li>
						</ul>
						<ul class="mui-table-view mui-table-view-auth">
							<li class="mui-table-view-cell mui-media">
								<a href="javascript:void(0);">
									<img class="mui-media-object mui-pull-left" :src="haochupicpath">
									<div class="mui-media-body">
										认证的好处
										<p class='mui-ellipsis'>防范恶意假冒，认证提升接单率</p>
									</div>
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
</template>

<script>
	import cacheUtils from 'common/cacheUtils';
	import muiUtils from 'common/muiUtils';
	import CONSTS from 'common/consts';
	import api from 'api';
	export default {
		data: function() {
			return {
				shimingpicpath: require('static/img/mine/shimingrenzheng.svg'),
				qiyepicpath: require('static/img/mine/qiyerenzheng.svg'),
				noshimingpicpath: require('static/img/mine/noshimingrenzheng.svg'),
				noqiyepicpath: require('static/img/mine/noqiyerenzheng.svg'),
				haochupicpath: require('static/img/mine/help.svg'),
				userInfo: cacheUtils.localStorage(CONSTS.PREFIX_LOGIN).getObject(CONSTS.USER_INFO),
				realNameInfo: undefined,
				enterpriseInfo: undefined
			}
		},
		created: function() {
			var that = this;
			muiUtils.muiAjax(api.APIS.user.getUser, {
				contentType: 'application/json',
				type: "get",
				success: function(data) {
					if(data.erroCode === CONSTS.ERROR_CODE.SUCCESS) {
						cacheUtils.localStorage(CONSTS.PREFIX_LOGIN).setObject(CONSTS.USER_INFO, data.result);
						that.userInfo = cacheUtils.localStorage(CONSTS.PREFIX_LOGIN).getObject(CONSTS.USER_INFO);
					}
				},
				error: function(xhr, type, errorThrown) {}
			});
			muiUtils.muiAjax(api.APIS.realNameAuthentication.getRealNameAuthentication, {
				contentType: 'application/json',
				type: "get",
				success: function(data) {
					if(data.erroCode === CONSTS.ERROR_CODE.SUCCESS) {
						that.realNameInfo = data.result;
					}
				},
				error: function(xhr, type, errorThrown) {}
			});
			muiUtils.muiAjax(api.APIS.enterpriseCertification.getEnterpriseCertification, {
				contentType: 'application/json',
				type: "get",
				success: function(data) {
					if(data.erroCode === CONSTS.ERROR_CODE.SUCCESS) {
						that.enterpriseInfo = data.result;
					}
				},
				error: function(xhr, type, errorThrown) {}
			});
		},
		methods: {
			open(url, state, data) {
				if(state == 1 || state == 2) {
					mui.toast('审核中和已通过审核的信息不可更改！')
					return;
				}
				muiUtils.openWindow(url, url, {
					isValidLogin: true,
					extras: {
						data: data
					}
				});
			},
			loadData() {
				this.userInfo = cacheUtils.localStorage(CONSTS.PREFIX_LOGIN).getObject(CONSTS.USER_INFO);
			}
		},
		ready: function() {
			var that = this;
			window.addEventListener('updateUserInfo', function() {
				that.loadData();
			});
		}
	}
</script>
<style scoped>
	.cache {
		color: #999999;
		margin-right: 40px;
		font-size: 12px;
	}
	
	.mui-table-view-auth {
		margin-bottom: 11px;
	}
	
	.auth-renzheng-div {
		position: absolute;
	}
	
	.auth-renzheng-span {
		float: right;
	}
	
	.mui-table-view-auth:last-child {
		margin-bottom: 0;
	}
	
	.mui-table-view-auth:first-child {
		margin-top: 45px;
	}
	
	.mui-table-view.first-ul:before {
		height: 0;
	}
	
	.mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body {
		font-size: 15px;
	}
	
	.mui-media-body p {
		margin-top: 8px;
	}
	
	.mui-table-view-cell>a:not(.mui-btn) {
		font-size: 14px;
		color: #222222;
		text-align: left;
		padding: 13px 15px;
	}
	
	.icon-jinru32:before {
		content: "\e629";
		position: absolute;
		right: 14px;
		color: #999;
	}
	
	.mui-table-view:before,
	.mui-table-view:after {
		z-index: 100;
	}
	
	.jxddicon {
		font-family: inherit !important;
	}
	
	.jxddicon:before {
		font-family: jxddMuiicons;
	}
</style>