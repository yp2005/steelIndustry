<template>
	<div class="mui-scroll-wrapper">
		<div class="mui-scroll">
			<ul class="mui-table-view mui-table-view-chevron">
				<li class="mui-table-view-cell">
					<a id="head" class="jxddicon icon-jinru32">
						<span class="avatar">头像</span>
						<span class="mui-pull-right head userinfo_span2">
	                                	<upload :callback="uploadUserHead" :showimage="showimage" :uploadtype="uploadtype"></upload>
	                                </span>
					</a>
				</li>
				<li class="mui-table-view-cell">
					<a class="jxddicon icon-jinru32">登录账号<span class="mui-pull-right userinfo_span2" @tap="open('../../commonpage/usersetting/editPhone.html')">{{userInfo.mobileNumber}}</span></a>
				</li>
				<li class="mui-table-view-cell">
					<a class="jxddicon icon-jinru32">联系人<span class="mui-pull-right userinfo_span2" @tap="open('../../commonpage/usersetting/edituserinfo.html')">{{userInfo.userName || '请设置'}}</span></a>
				</li>
				<li class="mui-table-view-cell">
					<a class="jxddicon icon-jinru32">生日<span class="mui-pull-right userinfo_span2" @tap="open('../../commonpage/usersetting/edituserinfo.html')">{{userInfo.birthday || '请设置'}}</span></a>
				</li>
				<li class="mui-table-view-cell">
					<a class="jxddicon icon-jinru32">性别<span class="mui-pull-right userinfo_span2" @tap="open('../../commonpage/usersetting/edituserinfo.html')">{{userInfo.sex || '请设置'}}</span></a>
				</li>
				<!--<li class="mui-table-view-cell">
	                            <a>开通vip<span class="mui-pull-right userinfo_span2">诚邀加入VIP会员，享受新特权</span></a>
	                        </li>-->
				<li class="mui-table-view-cell">
					<a class="jxddicon icon-jinru32">地址<span class="mui-pull-right userinfo_span2 mui-ellipsis" @tap="open('../../commonpage/usersetting/edituserinfo.html')">{{userInfo.address || '请设置'}}</span></a>
				</li>
			</ul>
			<ul class="mui-table-view  mui-table-view-chevron">
				<li class="mui-table-view-cell">
					<a class="jxddicon icon-jinru32">公司名称<span class="mui-pull-right userinfo_span2" @tap="open('../../commonpage/usersetting/editCompany.html')">{{userInfo.companyName || '请设置'}}</span></a>
				</li>
				<li class="mui-table-view-cell">
					<a class="jxddicon icon-jinru32">公司地址<span class="mui-pull-right userinfo_span2 mui-ellipsis" @tap="open('../../commonpage/usersetting/editCompany.html')">{{userInfo.companyAddress || '请设置'}}</span></a>
				</li>
			</ul>
		</div>
		<a class="fixOneLabelBf04e30" href="javascript:void(0);" @tap="signout">退出登录</a>
</template>

<script>
	import cacheUtils from 'common/cacheUtils';
	import muiUtils from 'common/muiUtils';
	import upload from 'component/upload/UploadImage';
	import CONSTS from 'common/consts';
	import api from 'api';
	export default {
		data: function() {
			var userInfo = cacheUtils.localStorage(CONSTS.PREFIX_LOGIN).getObject(CONSTS.USER_INFO);
			return {
				userInfo: userInfo,
				uploadtype: 'userhead',
				showimage: userInfo.avatar || '../../static/img/mine/nohp.png',
				uploadUserHead: function(result) {
					muiUtils.muiAjax(api.APIS.user.updateUserAvatar, {
						data: {
							avatar: result,
						},
						dataType: "json",
						type: "post",
						success: function(data) {
							if(data.erroCode === CONSTS.ERROR_CODE.SUCCESS) {
								mui.toast('上传成功！');
								var userInfo = cacheUtils.localStorage(CONSTS.PREFIX_LOGIN).getObject(CONSTS.USER_INFO);
								userInfo.avatar = data.result;
								cacheUtils.localStorage(CONSTS.PREFIX_LOGIN).setObject(CONSTS.USER_INFO, userInfo);
								mui.fire(plus.webview.getWebviewById('main'), 'updateUserInfo');
							} else {
								mui.toast(data.erroCode + '：' + data.erroMsg);
							}
						},
						error: function(xhr, type, errorThrown) {
							mui.toast('服务器或网络异常，请稍后重试。')
						}
					});
				}
			}
		},
		methods: {
			open(url) {
				muiUtils.openWindow(url, url, {
					isValidLogin: true
				});
			},
			signout: function() {
				var btnArray = ['取消', '确定'];
				mui.confirm('你确认退出登录吗？', '退出登录', btnArray, function(e) {
					if(e.index == 1) {
						window.localStorage.clear();
						muiUtils.openIndexWindow();
						mui.toast("退出成功！");
					}
				})
			},
			loadData() {
				this.userInfo = cacheUtils.localStorage(CONSTS.PREFIX_LOGIN).getObject(CONSTS.USER_INFO);
			}
		},
		ready: function() {
			var that = this;
			var deceleration = mui.os.ios ? 0.003 : 0.0009;
			mui('.mui-scroll-wrapper').scroll({
				bounce: true,
				indicators: true,
				deceleration: deceleration
			});
			window.addEventListener('updateUserInfo', function() {
				that.loadData();
			});
		},
		components: {
			upload
		}
	}
</script>
<style scoped>
	.mui-table-view-chevron {
		margin-bottom: 11px;
	}
	
	.mui-table-view-chevron:last-child {
		margin-bottom: 0;
	}
	
	.mui-table-view-chevron:first-child {
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
	
	.userinfo_span2 {
		padding-right: 20px;
		color: #666;
	}
	
	.userinfo_span2.mui-ellipsis {
		position: absolute;
		left: 80px;
		right: 15px;
		text-align: right;
	}
	
	.fixOneLabelBf04e30 {
		background-color: #FFF;
		color: #26c6da;
		z-index: -1;
	}
	
	#head {
		line-height: 75px;
	}
	
	.mui-scroll-wrapper {
		padding-bottom: 49px;
	}
</style>