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
					<a class="jxddicon icon-jinru32">登录账号<span class="mui-pull-right userinfo_span2" @tap="gotoEditPhone">{{userInfo.mobileNumber}}</span></a>
				</li>
				<li class="mui-table-view-cell">
					<a class="jxddicon icon-jinru32">联系人<span class="mui-pull-right userinfo_span2" @tap="gotoEditUserInfo">{{userInfo.userName || '请设置'}}</span></a>
				</li>
				<li class="mui-table-view-cell">
					<a class="jxddicon icon-jinru32">生日<span class="mui-pull-right userinfo_span2" @tap="gotoEditUserInfo">{{userInfo.birthday || '请设置'}}</span></a>
				</li>
				<li class="mui-table-view-cell">
					<a class="jxddicon icon-jinru32">性别<span class="mui-pull-right userinfo_span2" @tap="gotoEditUserInfo">{{userInfo.sex || '请设置'}}</span></a>
				</li>
				<!--<li class="mui-table-view-cell">
	                            <a>开通vip<span class="mui-pull-right userinfo_span2">诚邀加入VIP会员，享受新特权</span></a>
	                        </li>-->
				<li class="mui-table-view-cell">
					<a class="jxddicon icon-jinru32">地址<span class="mui-pull-right userinfo_span2" @tap="gotoEditUserInfo">{{userInfo.address || '请设置'}}</span></a>
				</li>
			</ul>
			<ul class="mui-table-view  mui-table-view-chevron">
				<li class="mui-table-view-cell">
					<a class="jxddicon icon-jinru32">公司名称<span class="mui-pull-right userinfo_span2" @tap="gotoEditCompany">{{userInfo.companyName || '请设置'}}</span></a>
				</li>
				<li class="mui-table-view-cell">
					<a class="jxddicon icon-jinru32">公司地址<span class="mui-pull-right userinfo_span2" @tap="gotoEditCompany">{{userInfo.companyAddress || '请设置'}}</span></a>
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
			var userInfo = cacheUtils.localStorage(CONSTS.USER_INFO).getObject(CONSTS.USER_INFO);
			return {
				userInfo: cacheUtils.localStorage(CONSTS.USER_INFO).getObject(CONSTS.USER_INFO),
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
								var userInfo = cacheUtils.localStorage(CONSTS.USER_INFO).getObject(CONSTS.USER_INFO);
								userInfo.avatar = data.result;
								cacheUtils.localStorage(CONSTS.USER_INFO).setObject(CONSTS.USER_INFO, userInfo);
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
			loadDefaultImg: function() {
				this.userInfo.avatar = require('static/img/mine/nohp.png');
			},
			gotoEditUserInfo: function() {
				muiUtils.openWindow('../../commonpage/usersetting/edituserinfo.html', 'commonpage_usersetting_edituserinfo', {
					isValidLogin: true,
					extras: {
						id: 'id'
					}
				});
			},
			gotoEditCompany: function() {
				muiUtils.openWindow('../../commonpage/usersetting/editCompany.html', 'commonpage_usersetting_editCompany', {
					isValidLogin: true,
					extras: {
						id: 'id'
					}
				});
			},
			gotoEditPhone: function() {
				muiUtils.openWindow('../../commonpage/usersetting/editPhone.html', 'commonpage_usersetting_editPhone', {
					isValidLogin: true,
					extras: {
						id: 'id'
					}
				});
			},
			uploadAvatar: function(result, avatar) {
				mui.toast('修改头像成功');
			},
			signout: function() {
				var btnArray = ['取消', '确定'];
				mui.confirm('你确认退出登录吗？', '退出登录', btnArray, function(e) {
					if(e.index == 1) {
						//						localStorage.clear();
						//						muiUtils.openPreWindow();
						mui.toast("退出成功");
					} else {}
				})
			}
		},
		ready: function() {
			var deceleration = mui.os.ios ? 0.003 : 0.0009;
			mui('.mui-scroll-wrapper').scroll({
				bounce: true,
				indicators: true,
				deceleration: deceleration
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