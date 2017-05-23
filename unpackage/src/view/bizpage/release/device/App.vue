<template>
	<div class="mui-content">
		<div class="mui-scroll-wrapper releaseDevice">
			<div class="mui-scroll">
				<div class="title">基本信息</div>
				<div class="inputRow"><label>设备名称</label><input v-model="deviceInfo.deviceName" type="text" placeholder="请输入设备名称(必填)"></div>
				<div class="inputRow" @tap="selectDeviceType">
					<label>设备类型</label>
					<p v-if="deviceTypeDis" class="deviceType">{{deviceTypeDis}}</p>
					<input type="text" v-else placeholder="请选择设备类型(必填)" v-model="deviceTypeDis" readonly>
					<span class="jxddicon icon-jinru32"></span>
				</div>
				<div class="inputRow textarea">
					<label>设备介绍</label>
					<textarea v-model="deviceInfo.description" id="textarea" placeholder="详细描述您的设备信息" @input="textAreaInput"></textarea>
				</div>
				<div class="title">联系方式</div>
				<div class="inputRow"><label>厂商名称</label><input v-model="deviceInfo.companyName" type="text" placeholder="请输入厂商名称(必填)"></div>
				<div class="inputRow"><label>厂商电话</label><input v-model="deviceInfo.mobileNumber" type="text" placeholder="请输入厂商电话(必填)"></div>
				<div class="inputRow"><label>负责人</label><input v-model="deviceInfo.contact" type="text" placeholder="请输入负责人(必填)"></div>
				<div class="inputRow" @tap="selectAddress">
					<label>厂商地址</label>
					<p v-if="address" class="deviceType">{{address.province + ' ' + address.city + ' ' + address.district + ' ' +address.street}}</p>
					<input type="text" v-else placeholder="请选择厂家地址(必填)" readonly>
					<span class="jxddicon icon-jinru32"></span>
				</div>
				<div class="title">图片详情</div>
				<div class="inputRow">
					<p>请上传图片辅助说明，最多5张(选填)</p>
					<upload :is-cut="isCut" :pictures.sync="deviceInfo.pictures" :imagecount="5" dataid="pictures"></upload>
				</div>
				<div class="bottomBtn">
					<a href="javascript:void(0)" @tap="submit(0)">保存草稿</a>
					<a href="javascript:void(0)" @tap="submit(2)">提交审核</a>
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
	import upload from 'component/upload/UploadImage';
	export default {
		data: function() {
			var deviceInfo = plus.webview.currentWebview().device;
			var deviceType = [{
				value: '1',
				text: '全新',
				children: [{
					value: '11',
					text: '彩钢流水线',
				}, {
					value: '12',
					text: '单板机',
				}, {
					value: '13',
					text: '剪板机',
				}, {
					value: '14',
					text: '折弯机',
				}, {
					value: '15',
					text: '数控切割机',
				}, {
					value: '16',
					text: '阻焊机',
				}, {
					value: '17',
					text: '抛丸机',
				}, {
					value: '18',
					text: '二保焊机',
				}, {
					value: '19',
					text: '其他',
				}]
			}, {
				value: '2',
				text: '二手',
				children: [{
					value: '21',
					text: '彩钢流水线',
				}, {
					value: '22',
					text: '单板机',
				}, {
					value: '23',
					text: '剪板机',
				}, {
					value: '24',
					text: '折弯机',
				}, {
					value: '25',
					text: '数控切割机',
				}, {
					value: '26',
					text: '阻焊机',
				}, {
					value: '27',
					text: '抛丸机',
				}, {
					value: '28',
					text: '二保焊机',
				}, {
					value: '29',
					text: '其他',
				}]
			}];
			var typePicker = new mui.PopPicker({
				layer: 2
			});
			typePicker.setData(deviceType);
			var deviceTypeSelected = [];
			var deviceTypeDis = '';
			var address = undefined;
			if(deviceInfo) {
				for(var dt of deviceInfo.deviceTypes) {
					deviceTypeSelected.push({
						value: dt.id + '',
						text: dt.typeName
					});
					if(deviceTypeDis === '') {
						deviceTypeDis += dt.typeName;
					} else {
						deviceTypeDis += ',' + dt.typeName;
					}
				}
				for(var st of deviceType) {
					st.selectedNum = 0;
					for(var st2 of st.children) {
						st2.selected = false;
						for(var sts of deviceTypeSelected) {
							if(sts.value === st2.value) {
								st2.selected = true;
								st.selectedNum++;
								break;
							}
						}
					}
				}
				address = {};
				address.provinceid = deviceInfo.provinceId;
				address.province = deviceInfo.provinceName;
				address.cityid = deviceInfo.cityId;
				address.city = deviceInfo.cityName;
				address.districtid = deviceInfo.countyId;
				address.district = deviceInfo.countyName;
				address.street = deviceInfo.street;
				address.lng = deviceInfo.lng;
				address.lat = deviceInfo.lat;
			}
			return {
				deviceInfo: deviceInfo || 　{
					pictures: [],
				},
				isCut: false,
				deviceType: deviceType,
				deviceTypeSelected: deviceTypeSelected,
				deviceTypeDis: deviceTypeDis,
				address: address,
				typePicker: typePicker
			};
		},
		methods: {
			textAreaInput() {
				var textarea = document.getElementById('textarea');
				textarea.style.height = '80px';
				var scrollHeight = textarea.scrollHeight;
				if(scrollHeight > 80) {
					textarea.style.height = scrollHeight + 'px';
				}
			},
			selectDeviceType() {
				var that = this;
				this.typePicker.show(function(items) {
					that.deviceTypeSelected = [items[1]];
					that.deviceTypeDis = items[0].text + ' - ' + items[1].text;
				});
			},
			selectAddress() {
				muiUtils.openWindow('../../commonpage/map/selectaddress.html', '../../commonpage/map/selectaddress.html', {
					extras: {
						address: this.address,
						fromPage: '../../bizpage/release/device.html'
					}
				});
			},
			submit(state) {
				if(!this.deviceInfo.deviceName) {
					mui.toast('请输入姓名');
					return;
				}
				if(!this.deviceTypeSelected || this.deviceTypeSelected.length === 0) {
					mui.toast('请选择设备类型');
					return;
				}
				if(!this.deviceInfo.companyName) {
					mui.toast('请输入厂商名称');
					return;
				}
				if(!this.deviceInfo.mobileNumber) {
					mui.toast('请输入厂商电话');
					return;
				}
				if(!/^1[3|4|5|7|8][0-9]{9}$/.test(this.deviceInfo.mobileNumber)) {
					mui.toast('请输入正确的手机号码');
					return;
				}
				if(!this.deviceInfo.contact) {
					mui.toast('请输入负责人');
					return;
				}
				if(!this.address) {
					mui.toast('请选择厂商地址');
					return;
				}
				var data = JSON.parse(JSON.stringify(this.deviceInfo));
				data.state = state;
				delete data.stateValue;
				delete data.imgServer;
				delete data.deviceType;
				delete data.picture;
				data.provinceId = this.address.provinceid;
				data.provinceName = this.address.province;
				data.cityId = this.address.cityid;
				data.cityName = this.address.city;
				data.countyId = this.address.districtid;
				data.countyName = this.address.district;
				data.street = this.address.street;
				data.lng = this.address.lng;
				data.lat = this.address.lat;
				data.deviceTypes = [];
				for(var deviceType of this.deviceTypeSelected) {
					data.deviceTypes.push({
						id: deviceType.value,
						typeName: deviceType.text
					});
				}
				for(var i = 0; i < data.pictures.length; i++) {
					if(data.pictures[i].indexOf('http') != -1) {
						data.pictures[i] = data.pictures[i].substring(data.pictures[i].indexOf(this.deviceInfo.imgServer) + this.deviceInfo.imgServer.length);
					}
				}
				muiUtils.muiAjax(api.APIS.device.saveDevice, {
					data: JSON.stringify(data),
					contentType: 'application/json',
					dataType: "json",
					type: "post",
					success: function(data) {
						if(data.erroCode === CONSTS.ERROR_CODE.SUCCESS) {
							mui.toast('保存成功！');
							muiUtils.openWindow('../../commonpage/mine/mydevice.html', '../../commonpage/mine/mydevice.html', {
								isValidLogin: true,
								isClose: true
							});
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
			mui('.mui-scroll-wrapper.releaseDevice').scroll({
				bounce: true,
				indicators: false, // 是否显示滚动条
				deceleration: mui.os.ios ? 0.003 : 0.0009
			});
			var that = this;
			window.addEventListener('addressSelected', function(e) {
				that.address = e.detail.address;
			})
		},
		components: {
			upload
		}
	};
</script>
<style>
	.releaseDevice {
		position: absolute;
		top: 45px;
		bottom: 0;
		width: 100%;
	}
	
	.releaseDevice input,
	.releaseDevice textarea,
	.releaseDevice label {
		font-size: 14px;
	}
	
	.releaseDevice .inputRow {
		color: #333;
		line-height: 30px;
		padding: 10px;
		position: relative;
		background-color: #fff;
		overflow: hidden;
	}
	
	.releaseDevice .inputRow>input[type=text] {
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
	
	.releaseDevice .inputRow>.jxddicon.icon-jinru32 {
		position: absolute;
		right: 10px;
		top: 16px;
		line-height: 20px;
		font-size: 20px;
		color: #999;
	}
	
	.releaseDevice .inputRow:after {
		content: "";
		height: 1px;
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #d7d7d7;
		transform: scaleY(0.5);
	}
	
	.releaseDevice .title {
		background-color: #ddd;
		padding: 5px;
		font-size: 15px;
		color: #222;
	}
	
	.releaseDevice .inputRow label {
		width: 70px;
		float: left;
	}
	
	.releaseDevice .inputRow .area,
	.releaseDevice .inputRow .area p:nth-child(2) span:nth-child(2),
	.releaseDevice .inputRow .deviceType {
		padding-left: 70px;
	}
	
	.releaseDevice .inputRow .area,
	.releaseDevice .inputRow .deviceType {
		padding-right: 30px;
	}
	
	.releaseDevice .inputRow .area p,
	.releaseDevice .inputRow .deviceType {
		color: #333;
	}
	
	.releaseDevice .inputRow .area p:nth-child(2) {
		line-height: 20px;
	}
	
	.releaseDevice .inputRow .area p:nth-child(2) span {
		display: inherit;
	}
	
	.releaseDevice .mui-numbox .mui-input-numbox {
		width: 36px !important;
		padding: 0 !important;
	}
	
	.releaseDevice .inputRow.textarea {
		overflow: hidden;
	}
	
	.releaseDevice .inputRow.textarea label,
	.releaseDevice .inputRow.textarea textarea {
		float: left;
	}
	
	.releaseDevice textarea {
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
	}
	
	.bottomBtn a {
		line-height: 35px;
		text-align: center;
		font-size: 15px;
		width: 45%;
	}
	
	.bottomBtn a:nth-child(1) {
		margin-right: 3%;
		color: #333;
		background-color: #fff;
		border: solid 1px #d7d7d7;
		border-radius: 3px;
	}
	
	.bottomBtn a:nth-child(2) {
		margin-left: 3%;
		color: #fff;
		background-color: #26c6da;
		border: solid 1px #26c6da;
		border-radius: 3px;
	}
</style>