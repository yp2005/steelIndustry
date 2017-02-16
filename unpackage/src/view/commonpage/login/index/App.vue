/** * @file 用户登录 * @Author lxm * @private */

<template>
	<nonetworkmask :disnonetworkmask.sync="disnonetworkmask" :top="45" :bottom="0"></nonetworkmask>
	<div class="mui-content">
		<div class="mui-scroll-wrapper login">
			<div class="mui-scroll">
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
				<div class="input-row">
					<div class="mui-checkbox mui-left">
						<input id="agree-checkbox" v-model="agree-me" type="checkbox">
						<label class="agree-proc" for="agree-checkbox">我阅读并同意</label><i class="go-protocol" @tap="gotoProtocol">《XXX用户协议》</i>
					</div>
				</div>
				<a @tap="login" class="login-btn">立即登录</a>
			</div>
		</div>
	</div>
</template>

<script>
	import nonetworkmask from 'component/mask/NoNetWorkMask';
	import muiUtils from 'common/muiUtils';
	import log from 'common/logUtils';
	import CONSTS from 'common/consts';
	import cacheUtils from 'common/cacheUtils';
	import pageUrl from 'api';

	export default {
		data: function() {
			return {
				phone: ''
			}
		},
		created: function() {},
		methods: {
			gotoProtocol: function() {
				let page = pageUrl.PAGE_URL.protocol;
				muiUtils.openWindow(page.url, page.id, {
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
		watch: {

		},
		ready: function() {
			var deceleration = mui.os.ios ? 0.003 : 0.0009;
			mui('.mui-scroll-wrapper').scroll({
				bounce: true,
				indicators: false, //是否显示滚动条
				deceleration: deceleration
			});
		},
		components: {
			nonetworkmask
		}
	};
</script>
<style scoped>
	.login {
		position: absolute;
		top: 45px;
		bottom: 50px;
		width: 100%;
	}
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