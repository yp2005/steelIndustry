<template>
	<div class="mui-content">
		<div class="mui-scroll-wrapper edituserinfo">
			<div class="mui-scroll">
				<div class="title">个人信息</div>
				<div class="inputRow"><label>联系人</label><input type="text" v-model="name" placeholder="请输入姓名"></div>
				<div class="inputRow"><label>生日</label><input type="text" v-model="bddate" @tap="selectDate" placeholder="请选择生日日期"></div>
				<div class="inputRow"><label>性别</label><input type="text" v-model="gender.text" @tap="selectGender" placeholder="请选择性别"></div>
				<div class="inputRow">
					<label>联系地址</label>
					<p v-if="address" class="workType" @tap="selectAddress">{{address.province + ' ' + (address.city || '') + ' ' + (address.county || '')}}</p>
					<input type="text" v-else placeholder="请选择联系地址" readonly @tap="selectAddress">
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
			var genderPicker = new mui.PopPicker({
				layer: 1
			});
			genderPicker.setData([{
				value: 0,
				text: '男',
			}, {
				value: 1,
				text: '女',
			}]);
			var userInfo = cacheUtils.localStorage(CONSTS.PREFIX_LOGIN).getObject(CONSTS.USER_INFO);
			var address = null;
			var addressDetail = '';
			if(userInfo.address) {
				var add = userInfo.address.split(' ');
				address = {
					province: add[0],
					city: add[1],
					county: add[2]
				};
				var addStr = add[0] + ' ' + add[1] + ' ' + add[2] + ' ';
				addressDetail = userInfo.address.substring(addStr.length);
			}
			var sex = {
				value: 0,
				text: '男',
			};
			if(userInfo.sex == '女') {
				sex = {
					value: 1,
					text: '女',
				};
			}
			return {
				cityPicker: cityPicker,
				genderPicker: genderPicker,
				address: address,
				name: userInfo.userName || '',
				bddate: userInfo.birthday || '',
				gender: sex,
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
			selectDate: function() {
				var that = this;
				plus.nativeUI.pickDate(function(e) {
					that.bddate = e.date.getFullYear() + "-" + (e.date.getMonth() + 1) + "-" + e.date.getDate();
				});
			},
			selectGender: function() {
				var that = this;
				this.genderPicker.show(function(items) {
					that.gender = items[0];
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
					mui.toast('请输入姓名！');
					return;
				}
				if(!that.bddate) {
					mui.toast('请选择生日日期');
					return;
				}
				if(!that.address) {
					mui.toast('请选择联系地址！');
					return;
				}
				if(!that.addressDetail) {
					mui.toast('请输入详细地址！');
					return;
				}
				muiUtils.muiAjax(api.APIS.user.updateUserInfo, {
					data: JSON.stringify({
						userName: that.name,
						sex: that.gender.text,
						birthday: that.bddate,
						address: that.address.province + ' ' + that.address.city + ' ' + that.address.county + ' ' + that.addressDetail
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
			mui('.mui-scroll-wrapper.edituserinfo').scroll({
				bounce: true,
				indicators: false, // 是否显示滚动条
				deceleration: mui.os.ios ? 0.003 : 0.0009
			});
		}
	};
</script>
<style>
	.edituserinfo {
		position: absolute;
		top: 45px;
		bottom: 0;
		width: 100%;
	}
	
	.mui-scroll {
		min-height: 100%;
		background-color: #fff;
	}
	
	.edituserinfo input,
	.edituserinfo textarea,
	.edituserinfo label {
		font-size: 14px;
	}
	
	.edituserinfo .inputRow {
		color: #333;
		line-height: 30px;
		padding: 10px;
		position: relative;
		background-color: #fff;
		overflow: hidden;
	}
	
	.edituserinfo .inputRow>input[type=text] {
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
	
	.edituserinfo .inputRow>.jxddicon.icon-jinru32 {
		position: absolute;
		right: 10px;
		top: 16px;
		line-height: 20px;
		font-size: 20px;
		color: #999;
	}
	
	.edituserinfo .inputRow:after {
		content: "";
		height: 1px;
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #d7d7d7;
		transform: scaleY(0.5);
	}
	
	.edituserinfo .title {
		background-color: #ddd;
		padding: 5px;
		font-size: 15px;
		color: #222;
	}
	
	.edituserinfo .inputRow label {
		width: 70px;
		float: left;
	}
	
	.edituserinfo .inputRow.textarea {
		overflow: hidden;
	}
	
	.edituserinfo .inputRow.textarea label,
	.edituserinfo .inputRow.textarea textarea {
		float: left;
	}
	
	.edituserinfo textarea {
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