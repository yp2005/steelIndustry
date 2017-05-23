<template>
	<div class="mui-content">
		<div class="mui-scroll-wrapper releaseWork">
			<div class="mui-scroll">
				<div class="title">公司信息</div>
				<div class="inputRow"><label>公司名称</label><input v-model="workInfo.companyName" type="text" placeholder="请输入公司名称(必填)"></div>
				<div class="inputRow"><label>联系人</label><input v-model="workInfo.contact" type="text" placeholder="请输入联系人(必填)"></div>
				<div class="inputRow"><label>联系电话</label><input v-model="workInfo.mobileNumber" type="text" placeholder="请输入联系电话(必填)"></div>
				<div class="title">招聘信息</div>
				<div class="inputRow"><label>标题</label><input v-model="workInfo.demandTitle" type="text" placeholder="请输入标题(必填)"></div>
				<div class="inputRow" @tap="selectWorkType">
					<label>所需工种</label>
					<p v-if="workTypeDis" class="workType">{{workTypeDis}}</p>
					<input type="text" v-else placeholder="请选择所需工种(必填)" v-model="workTypeDis" readonly>
					<span class="jxddicon icon-jinru32"></span>
				</div>
				<div class="inputRow" @tap="selectAddress">
					<label>工作地点</label>
					<p v-if="address" class="workType">{{address.province + ' ' + address.city + ' ' + address.district + ' ' +address.street}}</p>
					<input type="text" v-else placeholder="请选择工作地点(必填)" readonly>
					<span class="jxddicon icon-jinru32"></span>
				</div>
				<div class="inputRow" @tap="selectDueTime">
					<label>到期时间</label>
					<input type="text" placeholder="请选择到期时间(必填)" v-model="dueTime" readonly>
					<span class="jxddicon icon-jinru32"></span>
				</div>
				<div class="inputRow textarea">
					<label>工作介绍</label>
					<textarea v-model="workInfo.description" id="textarea" placeholder="请详细描述工作情况，还可以说明一下待遇福利等" @input="textAreaInput"></textarea>
				</div>
				<div class="inputRow">
					<p>您可以上传图片辅助说明，最多5张(选填)</p>
					<upload :is-cut="isCut" :pictures.sync="workInfo.pictures" :imagecount="5"></upload>
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
			var workInfo = plus.webview.currentWebview().employmentDemand;
			var workType = [{
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
			}];
			var workTypeSelected = [];
			var workTypeDis = '';
			var address = undefined;
			var dueTime = undefined;
			if(workInfo) {
				for(var wt of workInfo.workerTypes) {
					workTypeSelected.push({
						value: wt.id + '',
						text: wt.typeName
					});
					if(workTypeDis === '') {
						workTypeDis += wt.typeName;
					} else {
						workTypeDis += ',' + wt.typeName;
					}
				}
				for(var wt of workType) {
					wt.selectedNum = 0;
					for(var wt2 of wt.children) {
						wt2.selected = false;
						for(var wts of workTypeSelected) {
							if(wts.value === wt2.value) {
								wt2.selected = true;
								wt.selectedNum++;
								break;
							}
						}
					}
				}
				address = {};
				address.provinceid = workInfo.provinceId;
				address.province = workInfo.provinceName;
				address.cityid = workInfo.cityId;
				address.city = workInfo.cityName;
				address.districtid = workInfo.countyId;
				address.district = workInfo.countyName;
				address.street = workInfo.street;
				address.lng = workInfo.lng;
				address.lat = workInfo.lat;
				dueTime = workInfo.dueTime;
			}
			return {
				workInfo: workInfo || {
					pictures: []
				},
				isCut: false,
				workType: workType,
				workTypeSelected: workTypeSelected,
				workTypeDis: workTypeDis,
				address: address,
				dueTime: dueTime
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
			},
			selectDueTime() {
				var that = this;
				var minDate = new Date();
				minDate.setDate(minDate.getDate() + 1);
				plus.nativeUI.pickDate(function(e) {
					var date = e.date;
					if(date < minDate) {
						date = minDate;
					}
					that.dueTime = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
				}, function() {
					//that.$validation.effectiveDate.touched = true;
				}, {
					minDate: minDate
				});
			},
			submit(state) {
				if(!this.workInfo.companyName) {
					mui.toast('请输入公司名称');
					return;
				}
				if(!this.workInfo.contact) {
					mui.toast('请输入联系人');
					return;
				}
				if(!this.workInfo.mobileNumber) {
					mui.toast('请输入联系电话');
					return;
				}
				if(!/^1[3|4|5|7|8][0-9]{9}$/.test(this.workInfo.mobileNumber)) {
					mui.toast('请输入正确的手机号码');
					return;
				}
				if(!this.workInfo.demandTitle) {
					mui.toast('请输入标题');
					return;
				}
				if(!this.workTypeSelected || this.workTypeSelected.length === 0) {
					mui.toast('请选择所需工种');
					return;
				}
				if(!this.address) {
					mui.toast('请选择工作地点');
					return;
				}
				if(!this.dueTime) {
					mui.toast('请选择到期时间');
					return;
				}
				var data = this.workInfo;
				data.state = state;
				delete data.stateValue;
				delete data.picture;
				var time = this.dueTime;
				if(time.indexOf('00:00:00') == -1) {
					time = time + ' 00:00:00';
				}
				time = time.replace(/-/g, ':').replace(' ', ':');
				time = time.split(':');
				data.dueTime = new Date(time[0], (time[1] - 1), time[2], time[3], time[4], time[5]).getTime();
				data.provinceId = this.address.provinceid;
				data.provinceName = this.address.province;
				data.cityId = this.address.cityid;
				data.cityName = this.address.city;
				data.countyId = this.address.districtid;
				data.countyName = this.address.district;
				data.street = this.address.street;
				data.lng = this.address.lng;
				data.lat = this.address.lat;
				data.workerTypes = [];
				for(var workType of this.workTypeSelected) {
					data.workerTypes.push({
						id: workType.value,
						typeName: workType.text
					});
				}
				for(var i = 0; i < data.pictures.length; i++) {
					if(data.pictures[i].indexOf('http') != -1) {
						data.pictures[i] = data.pictures[i].substring(data.pictures[i].indexOf(this.workInfo.imgServer) + this.workInfo.imgServer.length);
					}
				}
				muiUtils.muiAjax(api.APIS.employmentDemand.saveEmploymentDemand, {
					data: JSON.stringify(data),
					contentType: 'application/json',
					dataType: "json",
					type: "post",
					success: function(data) {
						if(data.erroCode === CONSTS.ERROR_CODE.SUCCESS) {
							mui.toast('保存成功！');
							muiUtils.openWindow('../../commonpage/mine/mywork.html', '../../commonpage/mine/mywork.html', {
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
	
	.releaseWork .inputRow>input[type=text] {
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
	
	.releaseWork .inputRow>.jxddicon.icon-jinru32 {
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