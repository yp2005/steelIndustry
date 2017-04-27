<template>
	<div class="mui-content">
		<div class="mui-scroll-wrapper appsetting">
			<div class="mui-scroll">
				<div class="title"></div>
				<ul class="mui-table-view">
					<li class="mui-table-view-cell">
						<span class="userSwitchSpan">分享获取联系方式</span>
						<div class="mui-switch {{appSetting.shareSwitch == 1 ? 'mui-active' : ''}}">
							<div class="mui-switch-handle" @tap="changeSwitch(0)"></div>
						</div>
					</li>
					<li class="mui-table-view-cell">
						<span class="userSwitchSpan">店铺审核</span>
						<div class="mui-switch {{appSetting.isCheckStore == 1 ? 'mui-active' : ''}}">
							<div class="mui-switch-handle" @tap="changeSwitch(1)"></div>
						</div>
					</li>
					<li class="mui-table-view-cell">
						<span class="userSwitchSpan">工程审核</span>
						<div class="mui-switch {{appSetting.isCheckProject == 1 ? 'mui-active' : ''}}">
							<div class="mui-switch-handle" @tap="changeSwitch(2)"></div>
						</div>
					</li>
					<li class="mui-table-view-cell">
						<span class="userSwitchSpan">名片审核</span>
						<div class="mui-switch {{appSetting.isCheckCard == 1 ? 'mui-active' : ''}}">
							<div class="mui-switch-handle" @tap="changeSwitch(3)"></div>
						</div>
					</li>
					<li class="mui-table-view-cell">
						<span class="userSwitchSpan">用工需求审核</span>
						<div class="mui-switch {{appSetting.isCheckWork == 1 ? 'mui-active' : ''}}">
							<div class="mui-switch-handle" @tap="changeSwitch(4)"></div>
						</div>
					</li>
				</ul>
				<div class="title"></div>
				<div class="inputRow"><label>主题帖积分</label><input type="text" v-model="appSetting.mainPostPoints" placeholder="请输入发布主题帖积分"></div>
				<div class="inputRow"><label>回帖积分</label><input type="text" v-model="appSetting.replyingPoints" placeholder="请输入回帖积分"></div>
				<div class="bottomBtn">
					<a href="javascript:void(0)" @tap="submit">保存修改</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import muiUtils from 'common/muiUtils';
	import api from 'api';
	import CONSTS from 'common/consts';
	import cacheUtils from 'common/cacheUtils';
	export default {
		data: function() {
			var appSetting = cacheUtils.localStorage(CONSTS.SYSTEM).getObject(CONSTS.APPSETTINGS);
			return {
				appSetting: appSetting
			};
		},
		methods: {
			changeSwitch: function(_switch) {
				switch(_switch) {
					case 0:
						this.appSetting.shareSwitch = this.appSetting.shareSwitch == 0 ? 1 : 0;
						break;
					case 1:
						this.appSetting.isCheckStore = this.appSetting.isCheckStore == 0 ? 1 : 0;
						break;
					case 2:
						this.appSetting.isCheckProject = this.appSetting.isCheckProject == 0 ? 1 : 0;
						break;
					case 3:
						this.appSetting.isCheckCard = this.appSetting.isCheckCard == 0 ? 1 : 0;
						break;
					case 4:
						this.appSetting.isCheckWork = this.appSetting.isCheckWork == 0 ? 1 : 0;
						break;
				}
			},
			checkInt(val) {
				return /^\d+$/.test(val) && parseInt(val) > 0;
			},
			submit() {
				if(!this.checkInt(this.appSetting.mainPostPoints)) {
					mui.toast('主题帖积分须为大于0的整数！');
					return;
				}
				if(!this.checkInt(this.appSetting.replyingPoints)) {
					mui.toast('回帖积分须为大于0的整数！');
					return;
				}
				var that = this;
				muiUtils.muiAjax(api.APIS.settings.updateSettings, {
					data: JSON.stringify(that.appSetting),
					contentType: 'application/json',
					dataType: "json",
					type: "post",
					success: function(data) {
						if(data.erroCode === CONSTS.ERROR_CODE.SUCCESS) {
							mui.toast('保存成功！');
							cacheUtils.localStorage(CONSTS.SYSTEM).setObject(CONSTS.APPSETTINGS, that.appSetting);
							mui.back();
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
		ready: function() {
			mui('.mui-scroll-wrapper.appsetting').scroll({
				bounce: true,
				indicators: false, // 是否显示滚动条
				deceleration: mui.os.ios ? 0.003 : 0.0009
			});
		}
	};
</script>
<style>
	.appsetting {
		position: absolute;
		top: 45px;
		bottom: 0;
		width: 100%;
	}
	
	.appsetting input,
	.appsetting label {
		font-size: 14px;
	}
	
	.appsetting .inputRow {
		color: #333;
		line-height: 30px;
		padding: 10px;
		position: relative;
		background-color: #fff;
		overflow: hidden;
	}
	
	.appsetting .inputRow>input[type=text] {
		line-height: normal;
		width: inherit;
		height: inherit;
		margin: 0;
		padding: 1px 0px;
		border: none;
		position: absolute;
		top: 15px;
		left: 120px;
		right: 40px;
	}
	
	.appsetting .inputRow>.jxddicon.icon-jinru32 {
		position: absolute;
		right: 10px;
		top: 16px;
		line-height: 20px;
		font-size: 20px;
		color: #999;
	}
	
	.appsetting .inputRow:after {
		content: "";
		height: 1px;
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #d7d7d7;
		transform: scaleY(0.5);
	}
	
	.appsetting .title {
		background-color: #f3f5f7;
		padding: 5px;
		font-size: 15px;
		color: #222;
	}
	
	.appsetting .inputRow label {
		width: 100px;
		float: left;
	}
	
	.bottomBtn {
		padding: 15px 10%;
	}
	
	.bottomBtn a {
		line-height: 35px;
		text-align: center;
		font-size: 15px;
		width: 100%;
		color: #fff;
		background-color: #26c6da;
		border: solid 1px #26c6da;
		border-radius: 3px;
	}
	
	.userSwitchSpan {
		color: #222;
		font-size: 14px;
	}
</style>