<template>
	<div class="mui-content">
		<div class="mui-scroll-wrapper releaseStore">
			<div class="mui-scroll">
				<div class="title">基本信息</div>
				<div class="inputRow"><label>店铺名称</label><input type="text" placeholder="请输入店铺名称(必填)"></div>
				<div class="inputRow">
					<label>设备类型</label>
					<p v-if="storeTypeDis" class="storeType" @tap="selectStoreType">{{storeTypeDis}}</p>
					<input type="text" v-else placeholder="请选择设备类型(必填)" v-model="storeTypeDis" readonly @tap="selectStoreType">
					<span class="jxddicon icon-jinru32"></span>
				</div>
				<div class="inputRow textarea">
					<label>店铺介绍</label>
					<textarea id="textarea" placeholder="详细描述您的店铺信息" @input="textAreaInput"></textarea>
				</div>
				<div class="title">联系方式</div>
				<div class="inputRow"><label>商家电话</label><input type="text" placeholder="请输入商家电话(必填)"></div>
				<div class="inputRow"><label>负责人</label><input type="text" placeholder="请输入负责人(必填)"></div>
				<div class="inputRow">
					<label>商家地址</label>
					<p v-if="address" class="storeType" @tap="selectAddress">{{address.province + ' ' + address.city + ' ' + address.district + ' ' +address.street}}</p>
					<input type="text" v-else placeholder="请选择商家地址(必填)" readonly @tap="selectAddress">
					<span class="jxddicon icon-jinru32"></span>
				</div>
				<div class="title">图片详情</div>
				<div class="inputRow">
					<p>请上传店招一张(必填)</p>
					<upload :is-cut="isCut" :pictures.sync="shopSignPictures" :imagecount="1" dataid="shopSignPicture"></upload>
				</div>
				<div class="inputRow">
					<p>请上传营业执照一张(选填)</p>
					<upload :is-cut="isCut" :pictures.sync="licensePictures" :imagecount="1" dataid="licensePicture"></upload>
				</div>
				<div class="inputRow">
					<p>请上传店内环境，最多3张(选填)</p>
					<upload :is-cut="isCut" :pictures.sync="environmentPictures" :imagecount="3" dataid="environmentPicture"></upload>
				</div>
				<div class="inputRow">
					<p>请上传产品图片，最多15张(选填)</p>
					<upload :is-cut="isCut" :pictures.sync="productPictures" :imagecount="15" dataid="productPicture"></upload>
				</div>
				<div class="bottomBtn">
					<a href="javascript:void(0)">保存草稿</a>
					<a href="javascript:void(0)">提交审核</a>
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
			return {
				shopSignPictures: [],
				licensePictures: [],
				environmentPictures: [],
				productPictures: [],
				isCut: false,
				storeType: [{
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
				}],
				storeTypeSelected: [],
				storeTypeDis: '',
				address: undefined
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
	
	.releaseStore .inputRow> input[type=text] {
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
	
	.releaseStore .inputRow> .jxddicon.icon-jinru32 {
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