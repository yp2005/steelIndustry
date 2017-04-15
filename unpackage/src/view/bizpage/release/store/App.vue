<template>
	<div class="mui-content">
		<div class="mui-scroll-wrapper releaseStore">
			<div class="mui-scroll">
				<div class="title">基本信息</div>
				<div class="inputRow"><label>店铺名称</label><input v-model="storeInfo.storeName" type="text" placeholder="请输入店铺名称(必填)"></div>
				<div class="inputRow">
					<label>设备类型</label>
					<p v-if="storeTypeDis" class="storeType" @tap="selectStoreType">{{storeTypeDis}}</p>
					<input type="text" v-else placeholder="请选择设备类型(必填)" v-model="storeTypeDis" readonly @tap="selectStoreType">
					<span class="jxddicon icon-jinru32"></span>
				</div>
				<div class="inputRow textarea">
					<label>店铺介绍</label>
					<textarea v-model="storeInfo.description" id="textarea" placeholder="详细描述您的店铺信息" @input="textAreaInput"></textarea>
				</div>
				<div class="title">联系方式</div>
				<div class="inputRow"><label>商家电话</label><input v-model="storeInfo.mobileNumber" type="text" placeholder="请输入商家电话(必填)"></div>
				<div class="inputRow"><label>负责人</label><input v-model="storeInfo.contact" type="text" placeholder="请输入负责人(必填)"></div>
				<div class="inputRow">
					<label>商家地址</label>
					<p v-if="address" class="storeType" @tap="selectAddress">{{address.province + ' ' + address.city + ' ' + address.district + ' ' +address.street}}</p>
					<input type="text" v-else placeholder="请选择商家地址(必填)" readonly @tap="selectAddress">
					<span class="jxddicon icon-jinru32"></span>
				</div>
				<div class="title">图片详情</div>
				<div class="inputRow">
					<p>请上传店招一张(必填)</p>
					<upload :is-cut="isCut" :pictures.sync="storeInfo.shopSignPictures" :imagecount="1" dataid="shopSignPicture"></upload>
				</div>
				<div class="inputRow">
					<p>请上传营业执照一张(选填)</p>
					<upload :is-cut="isCut" :pictures.sync="storeInfo.licensePictures" :imagecount="1" dataid="licensePicture"></upload>
				</div>
				<div class="inputRow">
					<p>请上传店内环境，最多3张(选填)</p>
					<upload :is-cut="isCut" :pictures.sync="storeInfo.environmentPictures" :imagecount="3" dataid="environmentPicture"></upload>
				</div>
				<div class="inputRow">
					<p>请上传产品图片，最多15张(选填)</p>
					<upload :is-cut="isCut" :pictures.sync="storeInfo.productPictures" :imagecount="15" dataid="productPicture"></upload>
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
			var storeInfo = plus.webview.currentWebview().store;
			var storeType = [{
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
			var storeTypeSelected = [];
			var storeTypeDis = '';
			var address = undefined;
			if(storeInfo) {
				for(var dt of storeInfo.deviceTypes) {
					storeTypeSelected.push({
						value: dt.id + '',
						text: dt.typeName
					});
					if(storeTypeDis === '') {
						storeTypeDis += dt.typeName;
					} else {
						storeTypeDis += ',' + dt.typeName;
					}
				}
				for(var st of storeType) {
					st.selectedNum = 0;
					for(var st2 of st.children) {
						st2.selected = false;
						for(var sts of storeTypeSelected) {
							if(sts.value === st2.value) {
								st2.selected = true;
								st.selectedNum++;
								break;
							}
						}
					}
				}
				storeInfo.shopSignPictures = [storeInfo.imgServer + storeInfo.shopSignPictures];
				storeInfo.licensePictures = [storeInfo.imgServer + storeInfo.licensePictures];
				address = {};
				address.provinceid = storeInfo.provinceId;
				address.province = storeInfo.provinceName;
				address.cityid = storeInfo.cityId;
				address.city = storeInfo.cityName;
				address.districtid = storeInfo.countyId;
				address.district = storeInfo.countyName;
				address.street = storeInfo.street;
				address.lng = storeInfo.lng;
				address.lat = storeInfo.lat;
			}
			return {
				storeInfo: storeInfo ||　{
					shopSignPictures: [],
					licensePictures: [],
					environmentPictures: [],
					productPictures: [],
				},
				isCut: false,
				storeType: storeType,
				storeTypeSelected: storeTypeSelected,
				storeTypeDis: storeTypeDis,
				address: address
			};
		},
		created: function() {

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
			selectStoreType() {
				muiUtils.openWindow('../../commonpage/select/type.html', '../../commonpage/select/type.html', {
					extras: {
						title: '选择设备类型',
						typeData: this.storeType,
						deep: 2,
						typeName: '设备类型',
						fromPage: '../../bizpage/release/store.html'
					}
				});
			},
			selectAddress() {
				muiUtils.openWindow('../../commonpage/map/selectaddress.html', '../../commonpage/map/selectaddress.html', {
					extras: {
						address: this.address,
						fromPage: '../../bizpage/release/store.html'
					}
				});
			},
			submit(state) {
				if(!this.storeInfo.storeName) {
					mui.toast('请输入姓名');
					return;
				}
				if(!this.storeTypeSelected || this.storeTypeSelected.length === 0) {
					mui.toast('请选择设备类型');
					return;
				}
				if(!this.storeInfo.mobileNumber) {
					mui.toast('请输入商家电话');
					return;
				}
				if(!/^1[3|4|5|7|8][0-9]{9}$/.test(this.storeInfo.mobileNumber)) {
					mui.toast('请输入正确的手机号码');
					return;
				}
				if(!this.storeInfo.contact) {
					mui.toast('请输入负责人');
					return;
				}
				if(!this.address) {
					mui.toast('请选择商家地址');
					return;
				}
				if(!this.storeInfo.shopSignPictures || this.storeInfo.shopSignPictures.length === 0) {
					mui.toast('请上传店招');
					return;
				}
				var data = JSON.parse(JSON.stringify(this.storeInfo));
				data.state = state;
				delete data.stateValue;
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
				for(var storeType of this.storeTypeSelected) {
					data.deviceTypes.push({
						id: storeType.value,
						typeName: storeType.text
					});
				}
				for(var i = 0; i < data.shopSignPictures.length; i++) {
					if(data.shopSignPictures[i].indexOf('http') != -1) {
						data.shopSignPictures[i] = data.shopSignPictures[i].substring(data.shopSignPictures[i].lastIndexOf('/') + 1);
					}
				}
				for(var i = 0; i < data.licensePictures.length; i++) {
					if(data.licensePictures[i].indexOf('http') != -1) {
						data.licensePictures[i] = data.licensePictures[i].substring(data.licensePictures[i].lastIndexOf('/') + 1);
					}
				}
				for(var i = 0; i < data.environmentPictures.length; i++) {
					if(data.environmentPictures[i].indexOf('http') != -1) {
						data.environmentPictures[i] = data.environmentPictures[i].substring(data.environmentPictures[i].lastIndexOf('/') + 1);
					}
				}
				for(var i = 0; i < data.productPictures.length; i++) {
					if(data.productPictures[i].indexOf('http') != -1) {
						data.productPictures[i] = data.productPictures[i].substring(data.productPictures[i].lastIndexOf('/') + 1);
					}
				}
				data.shopSignPictures = data.shopSignPictures[0];
				data.licensePictures = data.licensePictures.length > 0 ? data.licensePictures[0] : null;
				muiUtils.muiAjax(api.APIS.store.saveStore, {
					data: JSON.stringify(data),
					contentType: 'application/json',
					dataType: "json",
					type: "post",
					success: function(data) {
						if(data.erroCode === CONSTS.ERROR_CODE.SUCCESS) {
							mui.toast('保存成功！');
							muiUtils.openWindow('../../commonpage/mine/mystore.html', '../../commonpage/mine/mystore.html', {
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
			mui('.mui-scroll-wrapper.releaseStore').scroll({
				bounce: true,
				indicators: false, // 是否显示滚动条
				deceleration: mui.os.ios ? 0.003 : 0.0009
			});
			var that = this;
			window.addEventListener('typeDataSelected', function(e) {
				var typeDataSelected = e.detail.typeDataSelected;
				that.storeType = e.detail.typeData;
				that.storeTypeSelected = typeDataSelected;
				that.storeTypeDis = '';
				for(var wt of that.storeTypeSelected) {
					if(that.storeTypeDis === '') {
						that.storeTypeDis += wt.text;
					} else {
						that.storeTypeDis += ',' + wt.text;
					}
				}
			});
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
	.releaseStore {
		position: absolute;
		top: 45px;
		bottom: 0;
		width: 100%;
	}
	
	.releaseStore input,
	.releaseStore textarea,
	.releaseStore label {
		font-size: 14px;
	}
	
	.releaseStore .inputRow {
		color: #333;
		line-height: 30px;
		padding: 10px;
		position: relative;
		background-color: #fff;
		overflow: hidden;
	}
	
	.releaseStore .inputRow>input[type=text] {
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
	
	.releaseStore .inputRow>.jxddicon.icon-jinru32 {
		position: absolute;
		right: 10px;
		top: 16px;
		line-height: 20px;
		font-size: 20px;
		color: #999;
	}
	
	.releaseStore .inputRow:after {
		content: "";
		height: 1px;
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #d7d7d7;
		transform: scaleY(0.5);
	}
	
	.releaseStore .title {
		background-color: #ddd;
		padding: 5px;
		font-size: 15px;
		color: #222;
	}
	
	.releaseStore .inputRow label {
		width: 70px;
		float: left;
	}
	
	.releaseStore .inputRow .area,
	.releaseStore .inputRow .area p:nth-child(2) span:nth-child(2),
	.releaseStore .inputRow .storeType {
		padding-left: 70px;
	}
	
	.releaseStore .inputRow .area,
	.releaseStore .inputRow .storeType {
		padding-right: 30px;
	}
	
	.releaseStore .inputRow .area p,
	.releaseStore .inputRow .storeType {
		color: #333;
	}
	
	.releaseStore .inputRow .area p:nth-child(2) {
		line-height: 20px;
	}
	
	.releaseStore .inputRow .area p:nth-child(2) span {
		display: inherit;
	}
	
	.releaseStore .mui-numbox .mui-input-numbox {
		width: 36px !important;
		padding: 0 !important;
	}
	
	.releaseStore .inputRow.textarea {
		overflow: hidden;
	}
	
	.releaseStore .inputRow.textarea label,
	.releaseStore .inputRow.textarea textarea {
		float: left;
	}
	
	.releaseStore textarea {
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