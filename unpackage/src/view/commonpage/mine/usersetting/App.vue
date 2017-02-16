<template>
	<div class="mui-pages">
		<div class="mui-page mui-page-center">
			<div class="mui-page-content">
				<div class="mui-scroll-wrapper" data-scroll="2">
					<div class="mui-scroll" style="transform: translate3d(0px, 0px, 0px) translateZ(0px);">
	                    <ul class="mui-table-view mui-table-view-chevron">
	                        <li class="mui-table-view-cell">
	                            <a id="head" class="jxddicon icon-jinru32" style="line-height: 75px;"><span class="avatar">头像</span>
	                                <span class="mui-pull-right head userinfo_span2">
	                                	<upload class="upload" :callback="uploadUserHead" :business-type="businesstype"
                                        :showimage="showimage" :dataid="dataid" :uploadtype="uploadtype"></upload>
	                                	<!--<img class="head-img mui-action-preview" :src="userInfo.avatar" @error="loadDefaultImg">-->
	                                </span>
	                            </a>
	                        </li>
	                        <li class="mui-table-view-cell">
	                            <a class="jxddicon icon-jinru32">登录账号<span class="mui-pull-right userinfo_span2" @tap="gotoEditPhone">{{userInfo.mobile_number || '请输入'}}</span></a>
	                        </li>
	                        <li class="mui-table-view-cell">
	                            <a class="jxddicon icon-jinru32">联系人<span class="mui-pull-right userinfo_span2" @tap="gotoEditUserInfo">{{userInfo.name || '请输入'}}</span></a>
	                        </li>
	                        <li class="mui-table-view-cell">
	                            <a class="jxddicon icon-jinru32">生日<span class="mui-pull-right userinfo_span2" @tap="gotoEditUserInfo">{{membername || '请输入'}}</span></a>
	                        </li>
	                        <li class="mui-table-view-cell">
	                            <a class="jxddicon icon-jinru32">性别<span class="mui-pull-right userinfo_span2" @tap="gotoEditUserInfo">{{membername || '请输入'}}</span></a>
	                        </li>
	                        <li class="mui-table-view-cell">
	                            <a>开通vip<span class="mui-pull-right userinfo_span2">诚邀加入VIP会员，享受新特权</span></a>
	                        </li>
	                        <li class="mui-table-view-cell">
	                            <a class="jxddicon icon-jinru32">地址<span class="mui-pull-right userinfo_span2" @tap="gotoEditUserInfo">{{membername || '请输入'}}</span></a>
	                        </li>
	                    </ul>
	                    <ul class="mui-table-view  mui-table-view-chevron">
	                        <li class="mui-table-view-cell">
	                            <a class="jxddicon icon-jinru32">公司名称<span class="mui-pull-right userinfo_span2" @tap="gotoEditCompany">{{membername || '请输入'}}</span></a>
	                        </li>
	                        <li class="mui-table-view-cell">
	                            <a class="jxddicon icon-jinru32">公司地址<span class="mui-pull-right userinfo_span2" @tap="gotoEditCompany">{{membername || '请输入'}}</span></a>
	                        </li>
	                    </ul>
					</div>
					<div class="mui-scrollbar mui-scrollbar-vertical">
						<div class="mui-scrollbar-indicator" style="transition-duration: 0ms; display: none; height: 617px; transform: translate3d(0px, 0px, 0px) translateZ(0px);"></div>
					</div>
				</div>
			</div>
		</div>
		<a class="fixOneLabelBf04e30" style="background-color: #FFF;color:#26c6da;" href="javascript:void(0);" @tap="signout">退出登录</a>
</template>

<script>
	import cacheUtils from 'common/cacheUtils';
	import muiUtils from 'common/muiUtils';
	import CONSTS from 'common/consts';
	import api from 'api';
	import utils from 'common/utils';
    import upload from 'component/upload/UploadImage';
	import {
		getFileSize
	} from 'common/image-utils';
//	var localStorage = cacheUtils.localStorage(CONSTS.PREFIX_LOGIN);
	var that = null;
	export default {
		data: function() {
			return {
				cache: 0.00,
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
			loadDefaultImg: function() {
				this.userInfo.avatar = require('static/img/mine/nohp.png');
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
			}
		},
		ready: function() {
			that = this;
			this.showimage = this.userInfo.avatar;
		},
        components: {
            upload
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