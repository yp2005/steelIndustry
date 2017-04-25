<template>
	<div class="mui-scroll-wrapper enterpriseauth">
		<div class="mui-scroll">
			<div class="title"></div>
			<div class="inputRow">
				<label>法人姓名</label>
				<span class="info-text">{{legalPersonName}}</span>
			</div>
			<div class="inputRow">
				<label>企业全称</label>
				<span class="info-text">{{companyName}}</span>
			</div>
			<div class="title"></div>
			<div class="inputRow">
				<p>营业执照照片</p>
				<img :src="license" class="enterpriseAuthImg">
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
				legalPersonName: '',
				companyName: '',
				license: ''
			};
		},
		created() {
			var that = this;
			muiUtils.muiAjax(api.APIS.enterpriseCertification.getEnterpriseCertificationByUserId + '?userId=' + that.userId, {
				contentType: 'application/json',
				type: "get",
				success: function(data) {
					if(data.erroCode === CONSTS.ERROR_CODE.SUCCESS) {
						that.legalPersonName = data.result.legalPersonName;
						that.companyName = data.result.companyName;
						that.license = data.result.imgServer + data.result.license;
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
				muiUtils.muiAjax(api.APIS.enterpriseCertification.updateEnterpriseCertificationState, {
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
		},
		ready: function() {
			mui('.mui-scroll-wrapper.enterpriseauth').scroll({
				bounce: true,
				indicators: false, // 是否显示滚动条
				deceleration: mui.os.ios ? 0.003 : 0.0009
			});
		}
	};
</script>
<style>
	.enterpriseauth {
		position: absolute;
		top: 45px;
		bottom: 0;
		width: 100%;
	}
	
	.enterpriseauth label {
		font-size: 14px;
	}
	
	.enterpriseauth .inputRow {
		color: #333;
		line-height: 30px;
		padding: 10px;
		position: relative;
		background-color: #fff;
		overflow: hidden;
	}
	
	.enterpriseauth .inputRow:after {
		content: "";
		height: 1px;
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #d7d7d7;
		transform: scaleY(0.5);
	}
	
	.enterpriseauth .title {
		background-color: #f3f5f7;
		padding: 5px;
		font-size: 15px;
		color: #222;
	}
	
	.enterpriseauth .inputRow label {
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
	
	.enterpriseAuthImg {
		width: 100%;
	}
</style>