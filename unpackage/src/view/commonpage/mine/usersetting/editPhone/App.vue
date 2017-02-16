<template>
	<nonetworkmask :disnonetworkmask.sync="disnonetworkmask" :top="45" :bottom="0"></nonetworkmask>
	<div class="mui-content">
		<div class="input-row it">
			<label>现有手机号：{{oldphone}}</label>
		</div>
		<div class="input-row it">
			<label>手机号(将作为登录账户)</label>
			<input class="input-clear mui-input tel-input" maxlength="11" placeholder="请输入手机号" v-model="phone">
		</div>
		<div class="input-row it">
			<label>图形验证码</label>
			<input class="mui-input-clear mui-input" maxlength="4" placeholder="图形验证码" v-model="imgCode">
			<img class="img-code" :src="imgCodeUrl" />
		</div>
		<div class="input-row it">
			<label>手机验证码</label>
			<input class="mui-input-clear mui-input" maxlength="4" placeholder="手机验证码" v-model="telCode">
			<a class="tel-code" @tap="sendCode">免费发送</a>
		</div>
		<a @tap="login" class="login-btn">验证并修改</a>
	</div>
</template>

<script>
	import nonetworkmask from 'component/mask/NoNetWorkMask';
	import muiUtils from 'common/muiUtils';
	import log from 'common/logUtils';
	import CONSTS from 'common/consts';
	import cacheUtils from 'common/cacheUtils';

	export default {
		data: function() {
			return {
				phone: '13344445555',
				oldphone: ''
			}
		},
		created: function() {},
		methods: {
			gotoProtocol: function() {
				let url = '../../commonpage/login/protocol.html';
				muiUtils.openWindow(url, url, {
					isClose: false
				});
			},
			login: function() {
				let userInfo = {
					hasStore: true
				}
				cacheUtils.localStorage(CONSTS.USER_INFO).setObject(CONSTS.USER_INFO, userInfo);
				muiUtils.openPreWindow();
			}
		},
		ready: function() {
			this.oldphone = this.phone;
		},
		components: {
			nonetworkmask
		}
	};
</script>
<style scoped>
	.mui-content {
		font-size: 16px;
	}
	
	.mui-content a {
		color: #fff;
	}
	
	.input-row.it {
		padding: 5px;
	}
	
	.input-row.it label {
		padding-bottom: 10px;
		width: 100%;
	}
	
	.input-row.it input {
		border: 1px solid #BDB9B9;
		border-radius: 5px;
		padding: 10px 5px;
		width: 40%;
	}
	
	.input-row.it .tel-input {
		width: 95%;
	}
	
	.input-row.it label {
		padding-bottom: 10px;
		width: 100%;
	}
	
	.input-row.it .img-code {
		width: 40%;
		height: 40px;
		float: right;
		margin-right: 2%;
		border-radius: 5px;
	}
	
	.input-row.it .tel-code {
		color: #fff;
		background-color: #FF6225;
		width: 40%;
		height: 40px;
		border-radius: 5px;
		line-height: 40px;
		text-align: center;
		float: right;
		margin-right: 2%;
	}
	
	.login-btn {
		color: #fff;
		background-color: rgb(38, 198, 218);
		margin: 10px;
		width: 95%;
		height: 50px;
		border-radius: 3px;
		text-align: center;
		line-height: 50px;
		font-size: 20px;
	}
	
	#agree-checkbox:before {
		font-size: 18px;
	}
	
	#agree-checkbox:checked:before {
		color: rgb(38, 198, 218);
	}
	
	#agree-checkbox {
		left: 5px;
		top: 0px;
	}
	
	.go-protocol {
		color: rgb(38, 198, 218);
	}
	
	.mui-checkbox.mui-left .agree-proc {
		padding-left: 25px;
		padding-bottom: 10px;
		width: 125px;
		padding-right: 0;
	}
</style>