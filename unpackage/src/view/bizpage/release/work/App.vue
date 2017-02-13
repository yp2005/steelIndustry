<template>
	<div class="mui-content">
		<div class="mui-scroll-wrapper releaseWork">
			<div class="mui-scroll">
				<div class="title">公司信息</div>
				<div class="inputRow"><label>公司名称</label><input type="text" placeholder="请输入公司名称(必填)"></div>
				<div class="inputRow"><label>联系人</label><input type="text" placeholder="请输入联系人(必填)"></div>
				<div class="inputRow"><label>联系电话</label><input type="text" placeholder="请输入联系电话(必填)"></div>
				<div class="title">招聘信息</div>
				<div class="inputRow"><label>标题</label><input type="text" placeholder="请输入标题(必填)"></div>
				<div class="inputRow">
					<label>所需工种</label>
					<p v-if="workTypeDis" class="workType" @tap="selectWorkType">{{workTypeDis}}</p>
					<input type="text" v-else placeholder="请选择所需工种(必填)" v-model="workTypeDis" readonly @tap="selectWorkType">
					<span class="jxddicon icon-jinru32"></span>
				</div>
				<div class="inputRow">
					<label>工作地点</label>
					<p v-if="address" class="workType" @tap="selectAddress">{{address.province + ' ' + address.city + ' ' + address.district + ' ' +address.street}}</p>
					<input type="text" v-else placeholder="请选择工作地点(必填)" readonly @tap="selectAddress">
					<span class="jxddicon icon-jinru32"></span>
				</div>
				<div class="inputRow textarea">
					<label>工作介绍</label>
					<textarea id="textarea" placeholder="请详细描述工作情况，还可以说明一下待遇福利等" @input="textAreaInput"></textarea>
				</div>
				<div class="inputRow">
					<p>您可以上传图片辅助说明，最多5张(选填)</p>
					<upload :is-cut="isCut" :pictures.sync="pictures" :imagecount="5"></upload>
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
				pictures: [],
				isCut: false,
				workType: [{
					value: '1',
					text: '彩钢厂',
					children: [{
						value: '11',
						text: '车间管理',
					}, {
						value: '12',
						text: '主机操作',
					}, {
						value: '13',
						text: '副机操作',
					}, {
						value: '14',
						text: '切割操作',
					}, {
						value: '15',
						text: '剪板折弯',
					}, {
						value: '16',
						text: '单板操作',
					}, {
						value: '17',
						text: 'c-z型钢操作',
					}, {
						value: '18',
						text: '其他',
					}]
				}, {
					value: '2',
					text: '钢结构厂',
					children: [{
						value: '21',
						text: '数控切割',
					}, {
						value: '22',
						text: '数控转床',
					}, {
						value: '23',
						text: '阻焊',
					}, {
						value: '24',
						text: '二保焊',
					}, {
						value: '25',
						text: '铆工',
					}, {
						value: '26',
						text: '其他',
					}]
				}, {
					value: '3',
					text: '工程安装',
					children: [{
						value: '31',
						text: '焊工',
					}, {
						value: '32',
						text: '打板',
					}, {
						value: '33',
						text: '高空',
					}, {
						value: '34',
						text: '其他',
					}]
				}],
				workTypeSelected: [],
				workTypeDis: '',
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
			selectWorkType() {
				muiUtils.openWindow('../../commonpage/select/type.html', '../../commonpage/select/type.html', {
					extras: {
						title: '选择所需工种',
						typeData: this.workType,
						deep: 2,
						typeName: '工种',
						fromPage: '../../bizpage/release/work.html'
					}
				});
			},
			selectAddress() {
				muiUtils.openWindow('../../commonpage/map/selectaddress.html', '../../commonpage/map/selectaddress.html', {
					extras: {
						address: this.address,
						fromPage: '../../bizpage/release/work.html'
					}
				});
			}
		},
		ready: function() {
			mui('.mui-scroll-wrapper.releaseWork').scroll({
				bounce: true,
				indicators: false, // 是否显示滚动条
				deceleration: mui.os.ios ? 0.003 : 0.0009
			});
			var that = this;
			window.addEventListener('typeDataSelected', function(e) {
				var typeDataSelected = e.detail.typeDataSelected;
				that.workType = e.detail.typeData;
				that.workTypeSelected = typeDataSelected;
				that.workTypeDis = '';
				for(var wt of that.workTypeSelected) {
					if(that.workTypeDis === '') {
						that.workTypeDis += wt.text;
					} else {
						that.workTypeDis += ',' + wt.text;
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
	.releaseWork {
		position: absolute;
		top: 45px;
		bottom: 0;
		width: 100%;
	}
	
	.releaseWork input,
	.releaseWork textarea,
	.releaseWork label {
		font-size: 14px;
	}
	
	.releaseWork .inputRow {
		color: #333;
		line-height: 30px;
		padding: 10px;
		position: relative;
		background-color: #fff;
		overflow: hidden;
	}
	
	.releaseWork .inputRow> input[type=text] {
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
	
	.releaseWork .inputRow> .jxddicon.icon-jinru32 {
		position: absolute;
		right: 10px;
		top: 16px;
		line-height: 20px;
		font-size: 20px;
		color: #999;
	}
	
	.releaseWork .inputRow:after {
		content: "";
		height: 1px;
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #d7d7d7;
		transform: scaleY(0.5);
	}
	
	.releaseWork .title {
		background-color: #ddd;
		padding: 5px;
		font-size: 15px;
		color: #222;
	}
	
	.releaseWork .inputRow label {
		width: 70px;
		float: left;
	}
	
	.releaseWork .inputRow .area,
	.releaseWork .inputRow .area p:nth-child(2) span:nth-child(2),
	.releaseWork .inputRow .workType {
		padding-left: 70px;
	}
	
	.releaseWork .inputRow .area,
	.releaseWork .inputRow .workType {
		padding-right: 30px;
	}
	
	.releaseWork .inputRow .area p,
	.releaseWork .inputRow .workType {
		color: #333;
	}
	
	.releaseWork .inputRow .area p:nth-child(2) {
		line-height: 20px;
	}
	
	.releaseWork .inputRow .area p:nth-child(2) span {
		display: inherit;
	}
	
	.releaseWork .mui-numbox .mui-input-numbox {
		width: 36px !important;
		padding: 0 !important;
	}
	
	.releaseWork .inputRow.textarea {
		overflow: hidden;
	}
	
	.releaseWork .inputRow.textarea label,
	.releaseWork .inputRow.textarea textarea {
		float: left;
	}
	
	.releaseWork textarea {
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