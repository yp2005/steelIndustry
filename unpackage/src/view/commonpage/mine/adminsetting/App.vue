<template>
	<div class="mui-pages">
		<div class="mui-page mui-page-center">
			<div class="mui-page-content">
				<div class="mui-scroll-wrapper" data-scroll="2">
					<div id="pullrefresh" class="mui-scroll">
	                    <ul class="mui-table-view mui-table-view-chevron">
	                        <li class="mui-table-view-cell" @tap="open('../../commonpage/adminsetting/bbsmanager.html')">
	                            <a class="jxddicon icon-jinru32">论坛管理</a>
	                        </li>
	                        <li class="mui-table-view-cell" @tap="open('../../commonpage/adminsetting/usermanager.html')">
	                            <a class="jxddicon icon-jinru32">用户管理</a>
	                        </li>
	                        <li class="mui-table-view-cell" @tap="open('../../commonpage/adminsetting/releasemanager.html')">
	                            <a class="jxddicon icon-jinru32">发布信息审核</a>
	                        </li>
	                        <li class="mui-table-view-cell" @tap="open('../../commonpage/adminsetting/advertisingmanager.html')">
	                            <a class="jxddicon icon-jinru32">广告位管理</a>
	                        </li>
	                        <li class="mui-table-view-cell" @tap="open('../../commonpage/adminsetting/noticemanager.html')">
	                            <a class="jxddicon icon-jinru32">公告管理</a>
	                        </li>
	                        <li class="mui-table-view-cell" @tap="open('../../commonpage/adminsetting/appsetting.html')">
	                            <a class="jxddicon icon-jinru32">app设置</a>
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
//	var localStorage = cacheUtils.localStorage(CONSTS.PREFIX_LOGIN);
	var that = null;
	export default {
		data: function() {
			return {
				cache: 0.00,
				pullrefresh: null,
				userInfo: {
					name: '余鹏',
					avatar: require('static/img/mine/nohp.png'),
					mobile_number: '18710095921'
				},
                businesstype: '4',
                dataid: 'userhead',
                uploadtype: 'userhead',
                showimage: '../../static/img/mine/nohp.png',
                uploadUserHead: function(result) {
                    //console.log("uploadUserHead result:" + result);
                    var arr = result.split("/");
                    var avatar = null;
                    if(arr[arr.length - 1] == 'nohp.png') {
                        avatar = 'nohp.png';
                    } else {
                        avatar =  arr[arr.length - 1];
                    }
                    that.uploadAvatar(result, avatar);
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
			},
			gotoEditUserInfo: function(){
				muiUtils.openWindow('../../commonpage/usersetting/edituserinfo.html', 'commonpage_usersetting_edituserinfo', {
//					isValidLogin: true,
					extras: {
						id: 'id'
					}
				});
			},
			gotoEditCompany: function(){
				muiUtils.openWindow('../../commonpage/usersetting/editCompany.html', 'commonpage_usersetting_editCompany', {
//					isValidLogin: true,
					extras: {
						id: 'id'
					}
				});
			},
			gotoEditPhone: function(){
				muiUtils.openWindow('../../commonpage/usersetting/editPhone.html', 'commonpage_usersetting_editPhone', {
//					isValidLogin: true,
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
			},
			reflash() {
				console.log('reflash...');
				this.pullrefresh.endPullDownToRefresh();
				this.pullrefresh.refresh(true);
			}
		},
		ready: function() {
			that = this;
		},
        components: {
        }
	}
</script>
<style scoped>
	.cache {
		color: #999999;
		margin-right: 40px;
		font-size: 12px;
	}
	
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
	
	.userinfo_span2{
		padding-right: 20px;
		color: #666;
	}
	
</style>