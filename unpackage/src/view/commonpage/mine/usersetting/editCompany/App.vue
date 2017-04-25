<template>
	<div class="mui-content">
		<div class="mui-scroll-wrapper editCompany">
			<div class="mui-scroll">
				<div class="title">公司信息</div>
				<div class="inputRow"><label>公司名称</label><input type="text" v-model="name" placeholder="请输入公司名称"></div>
				<div class="inputRow">
					<label>公司地址</label>
					<p v-if="address" class="workType" @tap="selectAddress">{{address.province + ' ' + (address.city || '') + ' ' + (address.county || '')}}</p>
					<input type="text" v-else placeholder="请选择公司地址" readonly @tap="selectAddress">
				</div>
				<div class="inputRow textarea">
					<label>详细地址</label>
					<textarea id="textarea" placeholder="请输入详细地址" @input="textAreaInput" v-model="addressDetail"></textarea>
				</div>
				<div class="bottomBtn">
					<a href="javascript:void(0)" @tap="saveInfo">保存修改</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import muiUtils from 'common/muiUtils';
	import log from 'common/logUtils';
	import api from 'api';
	import CONSTS from 'common/consts';
	import cacheUtils from 'common/cacheUtils';
	import {
		cityData3Lev
	} from 'common/cityData';
	export default {
		data: function() {
			var cityPicker = new mui.PopPicker({
				layer: 3
			});
			cityPicker.setData(cityData3Lev);
			var userInfo = cacheUtils.localStorage(CONSTS.PREFIX_LOGIN).getObject(CONSTS.USER_INFO);
			var address = null;
			var addressDetail = '';
			if(userInfo.companyAddress) {
				var add = userInfo.companyAddress.split(' ');
				address = {
					province: add[0],
					city: add[1],
					county: add[2]
				};
				var addStr = add[0] + ' ' + add[1] + ' ' + add[2] + ' ';
				addressDetail = userInfo.companyAddress.substring(addStr.length);
			}
			return {
				cityPicker: cityPicker,
				address: address,
				name: userInfo.companyName || '',
				addressDetail: addressDetail
			};
		},
		methods: {
			selectAddress: function() {
				var that = this;
				this.cityPicker.show(function(items) {
					that.address = {
						province: items[0].text,
						provinceid: items[0].value,
						city: items[1].value && items[1].value !== -1 ? items[1].text : undefined,
						cityid: items[1].value && items[1].value !== -1 ? items[1].value : undefined,
						county: items[2].value && items[2].value !== -1 ? items[2].text : undefined,
						countyid: items[2].value && items[2].value !== -1 ? items[2].value : undefined
					}
				});
			},
			textAreaInput() {
				var textarea = document.getElementById('textarea');
				textarea.style.height = '80px';
				var scrollHeight = textarea.scrollHeight;
				if(scrollHeight > 80) {
					textarea.style.height = scrollHeight + 'px';
				}
			},
			saveInfo() {
				var that = this;
				if(!that.name) {
					mui.toast('请输入公司名称！');
					return;
				}
				if(!that.address) {
					mui.toast('请选择公司地址！');
					return;
				}
				if(!that.addressDetail) {
					mui.toast('请输入详细地址！');
					return;
				}
				muiUtils.muiAjax(api.APIS.user.updateCompanyInfo, {
					data: JSON.stringify({
						companyName: that.name,
						companyAddress: that.address.province + ' ' + that.address.city + ' ' + that.address.county + ' ' + that.addressDetail
					}),
					contentType: 'application/json',
					dataType: "json",
					type: "post",
					success: function(data) {
						if(data.erroCode === CONSTS.ERROR_CODE.SUCCESS) {
							mui.toast('修改成功');
							cacheUtils.localStorage(CONSTS.PREFIX_LOGIN).setObject(CONSTS.USER_INFO, data.result);
							cacheUtils.localStorage(CONSTS.PREFIX_LOGIN).set(CONSTS.LOGIN_ACCESS_TOKEN, data.result.accessToken);
							mui.fire(plus.webview.getWebviewById('main'), 'updateUserInfo');
							mui.fire(plus.webview.getWebviewById('../../commonpage/mine/usersetting.html'), 'updateUserInfo');
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
			mui('.mui-scroll-wrapper.editCompany').scroll({
				bounce: true,
				indicators: false, // 是否显示滚动条
				deceleration: mui.os.ios ? 0.003 : 0.0009
			});
			mui('.mui-numbox').numbox();
		}
	};
</script>
<style>
	.editCompany {
		position: absolute;
		top: 45px;
		bottom: 0;
		width: 100%;
	}
	
	.mui-scroll {
		min-height: 100%;
		background-color: #fff;
	}
	
	.editCompany input,
	.editCompany textarea,
	.editCompany label {
		font-size: 14px;
	}
	
	.editCompany .inputRow {
		color: #333;
		line-height: 30px;
		padding: 10px;
		position: relative;
		background-color: #fff;
		overflow: hidden;
	}
	
	.editCompany .inputRow>input[type=text] {
		line-height: normal;
		width: inherit;
		height: inherit;
		margin: 0;
		padding: 1px 0px;
		border: none;
		position: absolute;
		top: 15px;
		left: 80px;
		right: 40px;
	}
	
	.editCompany .inputRow>.jxddicon.icon-jinru32 {
		position: absolute;
		right: 10px;
		top: 16px;
		line-height: 20px;
		font-size: 20px;
		color: #999;
	}
	
	.editCompany .inputRow:after {
		content: "";
		height: 1px;
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #d7d7d7;
		transform: scaleY(0.5);
	}
	
	.editCompany .title {
		background-color: #ddd;
		padding: 5px;
		font-size: 15px;
		color: #222;
	}
	
	.editCompany .inputRow label {
		width: 70px;
		float: left;
	}
	
	.editCompany .mui-numbox .mui-input-numbox {
		width: 36px !important;
		padding: 0 !important;
	}
	
	.editCompany .inputRow.textarea {
		overflow: hidden;
	}
	
	.editCompany .inputRow.textarea label,
	.editCompany .inputRow.textarea textarea {
		float: left;
	}
	
	.editCompany textarea {
		font-size: 14px;
		color: #666666;
		border: 0;
		padding: 5px 0;
		min-height: 80px;
		margin-bottom: 0;
		width: 200px;
	}
	
	.bottomBtn {
		padding: 15px 10%;
		background-color: #fff;
		position: fixed;
		width: 100%;
		bottom: 0;
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
</style>