<template>
	<div class="mui-scroll-wrapper personauth">
		<div class="mui-scroll">
			<div class="title"></div>
			<div class="inputRow">
				<label>姓名</label>
				<span class="info-text">{{name}}</span>
			</div>
			<div class="inputRow">
				<label>身份证号</label>
				<span class="info-text">{{cardId}}</span>
			</div>
			<div class="title"></div>
			<div class="inputRow">
				<p>身份证正面</p>
				<img :src="pictures1" class="personAuthImg">
			</div>
			<div class="title"></div>
			<div class="inputRow">
				<p>身份证反面</p>
				<img :src="pictures2" class="personAuthImg">
			</div>
			<div class="title"></div>
			<div class="inputRow">
				<p>本人手持身份证的照片</p>
				<img :src="pictures3" class="personAuthImg">
			</div>
			<div class="bottomBtn">
				<a href="javascript:void(0)" @tap="shenhe(1)">审核通过</a>
				<a href="javascript:void(0)" @tap="shenhe(3)">审核不通过</a>
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
				name: '',
				cardId: '',
				pictures1: '', //身份证正面
				pictures2: '', //身份证反面
				pictures3: '' //手持身份证照片
			};
		},
		created() {
			var that = this;
			muiUtils.muiAjax(api.APIS.realNameAuthentication.getRealNameAuthenticationByUserId + '?userId=' + that.userId, {
				contentType: 'application/json',
				type: "get",
				success: function(data) {
					if(data.erroCode === CONSTS.ERROR_CODE.SUCCESS) {
						that.name = data.result.realName;
						that.cardId = data.result.cardId;
						that.pictures1 = data.result.imgServer + data.result.cardPictureObverse;
						that.pictures2 = data.result.imgServer + data.result.cardPictureReverse;
						that.pictures3 = data.result.imgServer + data.result.handCardPicture;
					} else {
						mui.toast(data.erroCode + '：' + data.erroMsg);
					}
				},
				error: function(xhr, type, errorThrown) {
					mui.toast('服务器或网络异常，请稍后重试。');
				}
			});
		},
		methods: {
			shenhe(state) {
				var that = this;
				var btnArray = ['取消', '确定'];
				mui.confirm(state == 1 ? '确认通过审核？' : '确认拒绝审核通过？', '操作提示', btnArray, function(e) {
					if(e.index == 1) {
						muiUtils.muiAjax(api.APIS.realNameAuthentication.updateRealNameAuthenticationState, {
							data: JSON.stringify({
								userId: that.userId,
								state: state,
							}),
							contentType: 'application/json',
							dataType: "json",
							type: "post",
							success: function(data) {
								if(data.erroCode === CONSTS.ERROR_CODE.SUCCESS) {
									mui.toast(state == 1 ? '已审核通过！' : '已拒绝审核通过！');
									mui.fire(plus.webview.getWebviewById('../../commonpage/adminsetting/usermanager.html'), 'updateUserInfo');
									mui.back();
								} else {
									mui.toast(data.erroCode + '：' + data.erroMsg);
								}
							},
							error: function(xhr, type, errorThrown) {
								mui.toast('服务器或网络异常，请稍后重试。');
							}
						});
					}
				});
			}
		},
		ready: function() {
			mui('.mui-scroll-wrapper.personauth').scroll({
				bounce: true,
				indicators: false, // 是否显示滚动条
				deceleration: mui.os.ios ? 0.003 : 0.0009
			});
		}
	};
</script>
<style>
	.personauth {
		position: absolute;
		top: 45px;
		bottom: 0;
		width: 100%;
	}
	
	.personauth label {
		font-size: 14px;
	}
	
	.personauth .inputRow {
		color: #333;
		line-height: 30px;
		padding: 10px;
		position: relative;
		background-color: #fff;
		overflow: hidden;
	}
	
	.personauth .inputRow:after {
		content: "";
		height: 1px;
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #d7d7d7;
		transform: scaleY(0.5);
	}
	
	.personauth .title {
		background-color: #f3f5f7;
		padding: 5px;
		font-size: 15px;
		color: #222;
	}
	
	.personauth .inputRow label {
		width: 70px;
		float: left;
	}
	
	.bottomBtn {
		padding: 15px 10%;
	}
	
	.bottomBtn a {
		line-height: 35px;
		text-align: center;
		font-size: 15px;
		width: 45%;
	}
	
	.bottomBtn a:nth-child(1) {
		margin-right: 3%;
		color: #fff;
		background-color: #26c6da;
		border: solid 1px #26c6da;
		border-radius: 3px;
	}
	
	.bottomBtn a:nth-child(2) {
		margin-left: 3%;
		color: #333;
		background-color: #fff;
		border: solid 1px #d7d7d7;
		border-radius: 3px;
	}
	
	.backTitleBg {
		position: fixed;
		top: 45px;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: #ddd;
		text-align: center;
	}
	
	.bottomBackBtn {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		line-height: 40px;
		text-align: center;
		background-color: #fff;
		z-index: 1;
	}
	
	.personAuthImg {
		width: 100%;
	}
</style>