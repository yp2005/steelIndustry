<template>
	<div class="mui-scroll-wrapper userDetail">
		<div class="mui-scroll">
			<div class="row avatar">
				<label>头像</label>
				<img :src="userInfo.avatar" />
			</div>
			<div class="row">
				<label>姓名</label>
				<span class="info-text">{{userInfo.userName || '--'}}</span>
			</div>
			<div class="row">
				<label>手机号码</label>
				<span class="info-text">{{userInfo.mobileNumber}}</span>
			</div>
			<div class="row">
				<label>性别</label>
				<span class="info-text">{{userInfo.sex || '--'}}</span>
			</div>
			<div class="row">
				<label>地址</label>
				<span class="info-text">{{userInfo.address || '--'}}</span>
			</div>
			<div class="row">
				<label>公司名称</label>
				<span class="info-text">{{userInfo.companyName || '--'}}</span>
			</div>
			<div class="row">
				<label>公司地址</label>
				<span class="info-text">{{userInfo.companyAddress || '--'}}</span>
			</div>
			<div class="row">
				<label>是否分享过app</label>
				<span class="info-text">{{userInfo.isShared == 1 ? '是' : '否'}}</span>
			</div>
			<div class="row">
				<label>是否实名认证</label>
				<span class="info-text">{{userInfo.realNameAuthentication == 1 ? '是' : '否'}}</span>
			</div>
			<div class="row">
				<label>是否企业认证</label>
				<span class="info-text">{{userInfo.enterpriseCertification == 1 ? '是' : '否'}}</span>
			</div>
			<div class="row">
				<label>用户状态</label>
				<span class="info-text">{{userInfo.state == 1 ? '正常' : '已封号'}}</span>
			</div>
			<div class="row">
				<label>论坛积分</label>
				<span class="info-text">{{userInfo.points}}</span>
			</div>
			<div class="row">
				<label>金币</label>
				<span class="info-text">{{userInfo.gold}}</span>
			</div>
			<div class="row">
				<label>创建时间</label>
				<span class="info-text">{{userInfo.createTime}}</span>
			</div>
			<div class="row">
				<label>更新时间</label>
				<span class="info-text">{{userInfo.updateTime}}</span>
			</div>
			<div class="row">
				<label>最后登录时间</label>
				<span class="info-text">{{userInfo.latestLoginTime}}</span>
			</div>
		</div>
	</div>
</template>

<script>
	import muiUtils from 'common/muiUtils';
	import log from 'common/logUtils';
	import api from 'api';
	import CONSTS from 'common/consts';
	export default {
		data: function() {
			return {
				userId: plus.webview.currentWebview().userId,
				userInfo: {}
			};
		},
		created() {
			var that = this;
			muiUtils.muiAjax(api.APIS.user.getUserById + '?id=' + that.userId, {
				contentType: 'application/json',
				type: "get",
				success: function(data) {
					if(data.erroCode === CONSTS.ERROR_CODE.SUCCESS) {
						data.result.avatar = data.result.avatar ? data.result.avatar : '1'
						that.userInfo = data.result;
					} else {
						mui.toast(data.erroCode + '：' + data.erroMsg);
					}
				},
				error: function(xhr, type, errorThrown) {
					mui.toast('服务器或网络异常，请稍后重试。');
				}
			});
		},
		methods: {},
		ready: function() {
			mui('.mui-scroll-wrapper.userDetail').scroll({
				bounce: true,
				indicators: false, // 是否显示滚动条
				deceleration: mui.os.ios ? 0.003 : 0.0009
			});
		}
	};
</script>
<style>
	.userDetail {
		position: absolute;
		top: 45px;
		bottom: 0;
		width: 100%;
	}
	
	.userDetail label {
		font-size: 14px;
	}
	
	.userDetail .row {
		color: #333;
		line-height: 30px;
		padding: 10px;
		position: relative;
		background-color: #fff;
		overflow: hidden;
	}
	
	.userDetail .row img {
		float: right;
		height: 80px;
		width: 80px;
		margin-right: 15px;
	}
	
	.userDetail .row:after {
		content: "";
		height: 1px;
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #d7d7d7;
		transform: scaleY(0.5);
	}
	
	.userDetail .row label {
		width: 110px;
		float: left;
		position: absolute;
	}
	
	.userDetail .row .info-text {
		padding-left: 110px;
	}
	
	.userDetail .row.avatar {
		line-height: 80px;
	}
</style>