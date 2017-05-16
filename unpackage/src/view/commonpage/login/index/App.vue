
<template>
	<div class="mui-content">
		<div class="mui-scroll-wrapper login">
			<div class="mui-scroll">
				<div class="input-row it">
					<label>手机号(将作为登录账户)</label>
					<input type="number" class="input-clear mui-input tel-input" maxlength="11" placeholder="请输入手机号" v-model="phone">
				</div>
				<div class="input-row it">
					<label>图形验证码</label>
					<input type="text" class="mui-input-clear mui-input" maxlength="4" placeholder="图形验证码" v-model="imgCode">
					<img class="img-code" :src="imgCodeUrl" @tap="refresh" />
				</div>
				<div class="input-row it">
					<label>手机验证码</label>
					<input type="text" class="mui-input-clear mui-input" maxlength="4" placeholder="手机验证码" v-model="telCode">
					<a class="tel-code {{waitting ? 'disabled' : ''}}" @tap="sendCode">{{waitting ? ('重新发送(' + waittingNum + ')') : '免费发送'}}</a>
				</div>
				<div class="input-row">
					<div class="mui-checkbox mui-left">
						<input id="agree-checkbox" v-model="agreeMe" type="checkbox">
						<label class="agree-proc" for="agree-checkbox">我阅读并同意</label><i class="go-protocol" @tap="gotoProtocol">彩钢精英许可与服务协议</i>
					</div>
				</div>
				<a @tap="login" class="login-btn">立即登录</a>
			</div>
		</div>
	</div>
</template>

<script>
	import muiUtils from 'common/muiUtils';
	import log from 'common/logUtils';
	import CONSTS from 'common/consts';
	import cacheUtils from 'common/cacheUtils';
	import pageUrl from 'api';
	import utils from 'common/utils';
	export default {
		data: function() {
			var instanceId = cacheUtils.localStorage(CONSTS.PREFIX_LOGIN).get(CONSTS.APP_INSTANCE_ID);
			if(instanceId === undefined || instanceId == null || instanceId === '' || instanceId === 'null') {
				instanceId = utils.uuidV4();
				cacheUtils.localStorage(CONSTS.PREFIX_LOGIN).set(CONSTS.APP_INSTANCE_ID, instanceId);
			}
			return {
				instanceId: instanceId,
				imgCodeUrl: pageUrl.APIS.user.getImage + '?instanceId=' + instanceId,
				refreshNum: 0,
				phone: '',
				imgCode: '',
				telCode: '',
				agreeMe: false,
				waitting: false,
				waittingNum: 0
			};
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
				if(!this.phone) {
					mui.toast('请输入手机号码');
					return;
				}
				if(!/^1[3|4|5|7|8][0-9]{9}$/.test(this.phone)) {
					mui.toast('请输入正确的手机号码');
					return;
				}
				if(!this.imgCode) {
					mui.toast('请输入图形验证码');
					return;
				}
				if(!this.telCode) {
					mui.toast('请输入手机验证码');
					return;
				}
				if(!this.agreeMe) {
					mui.toast('请阅读彩钢精英许可与服务协议并勾选同意');
					return;
				}
				var data = {
					mobileNumber: parseInt(this.phone),
					validateCode: this.imgCode,
					mobilePhoneValidateCode: this.telCode
				};
				muiUtils.muiAjax(pageUrl.APIS.user.login, {
					data: JSON.stringify(data),
					contentType: 'application/json',
					dataType: "json",
					type: "post",
					success: function(data) {
						if(data.erroCode === CONSTS.ERROR_CODE.SUCCESS) {
							mui.toast('登录成功');
							cacheUtils.localStorage(CONSTS.PREFIX_LOGIN).setObject(CONSTS.USER_INFO, data.result);
							cacheUtils.localStorage(CONSTS.PREFIX_LOGIN).set(CONSTS.LOGIN_ACCESS_TOKEN, data.result.accessToken);
							muiUtils.openPreWindow();
						} else {
							mui.toast(data.erroCode + '：' + data.erroMsg);
						}
					},
					error: function(xhr, type, errorThrown) {
						mui.toast('服务器或网络异常，请稍后重试。')
					}
				});
			},
			refresh() {
				this.refreshNum++;
				this.imgCodeUrl = pageUrl.APIS.user.getImage + '?instanceId=' + this.instanceId + '&refreshNum=' + this.refreshNum;
			},
			waitNumDeal() {
				var that = this;
				setTimeout(function() {
					that.waittingNum--;
					if(that.waittingNum > 0) {
						that.waitNumDeal();
					}
					else {
						that.waitting = false;
					}
				}, 1000);
			},
			sendCode() {
				if(this.waitting) {
					return;
				}
				var that = this;
				if(!this.phone) {
					mui.toast('请输入手机号码');
					return;
				}
				if(!/^1[3|4|5|7|8][0-9]{9}$/.test(this.phone)) {
					mui.toast('请输入正确的手机号码');
					return;
				}
				muiUtils.muiAjax(pageUrl.APIS.user.sendCode + '?mobileNumber=' + this.phone, {
					dataType: "json",
					type: "post",
					success: function(data) {
						if(data.erroCode === CONSTS.ERROR_CODE.SUCCESS) {
							mui.toast('已发送');
							that.waitting = true;
							that.waittingNum = 60;
							that.waitNumDeal();
						} else {
							mui.toast(data.erroCode + '：' + data.erroMsg);
						}
					},
					error: function(xhr, type, errorThrown) {
						mui.toast('服务器或网络异常，请稍后重试。')
					}
				});
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
	
	.mui-scroll {
		padding: 10px;
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
		padding: 0 5px;
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
	
	.input-row.it .tel-code.disabled {
		background-color: #ccc;
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
		top: -1px;
	}
	
	.go-protocol {
		color: rgb(38, 198, 218);
	}
	
	.mui-checkbox.mui-left .agree-proc {
		padding-left: 30px;
		padding-bottom: 10px;
		width: 130px;
		padding-right: 0;
	}
</style>