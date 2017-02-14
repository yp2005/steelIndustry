<template>
	<div class="mui-pages">
		<div class="mui-page mui-page-center">
			<div class="mui-page-content">
				<div class="mui-scroll-wrapper" data-scroll="2">
					<div class="mui-scroll" style="transform: translate3d(0px, 0px, 0px) translateZ(0px);">
						<ul class="mui-table-view mui-table-view-auth">
							<li class="mui-table-view-cell mui-media">
								<a href="javascript:void(0);" @tap="open('../../commonpage/authmanager/person.html')">
									<img class="mui-media-object mui-pull-left" :src="shimingpicpath">
									<div class="mui-media-body">
										实名认证
										<span class="auth-renzheng-span">立即认证</span>
										<p class='mui-ellipsis'>实名认证可提高帐号的安全性和信任级别</p>
									</div>
									<!--<div class="auth-renzheng-div">立即认证</div>-->
								</a>
							</li>
						</ul>
						<ul class="mui-table-view mui-table-view-auth">
							<li class="mui-table-view-cell mui-media">
								<a href="javascript:void(0);" @tap="open('../../commonpage/authmanager/company.html')">
									<img class="mui-media-object mui-pull-left" :src="qiyepicpath">
									<div class="mui-media-body">
										企业认证
										<span class="auth-renzheng-span">立即认证</span>
										<p class='mui-ellipsis'>企业认证可提高帐号的安全性和信任级别</p>
									</div>
									<!--<div class="auth-renzheng-div">立即认证</div>-->
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
	import utils from 'common/utils';
	import {
		getFileSize
	} from 'common/image-utils';
//	var localStorage = cacheUtils.localStorage(CONSTS.PREFIX_LOGIN);
	var that = null;
	export default {
		data: function() {
			return {
				shimingpicpath: require('static/img/mine/noshimingrenzheng.svg'),
				qiyepicpath: require('static/img/mine/noqiyerenzheng.svg'),
				haochupicpath: require('static/img/mine/gold.svg'),
				userInfo: {
					name: '余鹏',
					avatar: require('static/img/mine/nohp.png'),
					mobile_number: '18710095921'
				}
			}
		},
		methods: {
			open(url) {
				muiUtils.openWindow(url, url, {
//					isValidLogin: true,
					extras: {
						url: url
					}
				});
			}
		},
		ready: function() {
			that = this;
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
	
	.auth-renzheng-div{
		position:absolute;
	}
	.auth-renzheng-span{
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
	
	.mui-table-view-cell>a:not(.mui-btn) {
		font-size: 15px;
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