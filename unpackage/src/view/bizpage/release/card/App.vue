<template>
	<div class="mui-content">
		<div class="mui-scroll-wrapper releaseCard">
			<div class="mui-scroll">
				<div class="title">基本信息</div>
				<div class="inputRow"><label>联系人</label><input v-model="masterCard.contact" type="text" placeholder="请输入姓名(必填)"></div>
				<div class="inputRow"><label>联系方式</label><input v-model="masterCard.mobileNumber" type="text" placeholder="请输入您的联系方式(必填)"></div>
				<div class="inputRow">
					<label>联系地址</label>
					<p v-if="address" class="workType" @tap="selectAddress">{{address.province + ' ' + address.city + ' ' + address.district + ' ' +address.street}}</p>
					<input type="text" v-else placeholder="请选择联系地址(必填)" readonly @tap="selectAddress">
					<span class="jxddicon icon-jinru32"></span>
				</div>
				<div class="inputRow">
					<label>工龄</label>
					<div class="mui-numbox" data-numbox-min='0' data-numbox-max='50'>
						<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
						<input v-model="masterCard.workingYears" class="mui-input-numbox" type="number">
						<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
					</div>
				</div>
				<div class="title">求职信息</div>
				<div class="inputRow"><label>标题</label><input v-model="masterCard.cardTitle" type="text" placeholder="姓名加工种(必填)"></div>
				<div class="inputRow">
					<label>工种</label>
					<p v-if="workTypeDis" class="workType" @tap="selectWorkType">{{workTypeDis}}</p>
					<input type="text" v-else placeholder="请选择工种(必填)" v-model="workTypeDis" readonly @tap="selectWorkType">
					<span class="jxddicon icon-jinru32"></span>
				</div>
				<div class="inputRow">
					<label>服务区域</label>
					<div class="area" v-if="city" @tap="selectArea">
						<p>服务城市：{{city.province + ' ' + city.city}}</p>
						<p><span class="mui-pull-left">服务区域：</span><span>{{cityDataDis}}</span></p>
					</div>
					<input type="text" v-else v-model="cityDataDis" readonly placeholder="请选择服务区域(必填)" @tap="selectArea">
					<span class="jxddicon icon-jinru32"></span>
				</div>
				<div class="inputRow textarea">
					<label>自我介绍</label>
					<textarea id="textarea" v-model="masterCard.description" placeholder="介绍你的工作技能、工作经验等" @input="textAreaInput"></textarea>
				</div>
				<div class="inputRow">
					<p>您可以上传图片辅助说明，最多五张(选填)</p>
					<upload :is-cut="isCut" :pictures.sync="masterCard.pictures" :imagecount="5" dataid="cardPicture"></upload>
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
	import CONSTS from 'common/consts';
	import upload from 'component/upload/UploadImage';
	import api from 'api';
	import {
		cityData3Lev
	} from 'common/cityData';
	export default {
		data: function() {
			var masterCard = plus.webview.currentWebview().masterCard;
			var workTypeSelected = [];
			var workTypeDis = '';
			var cityDataSelected = [];
			var cityDataDis = '';
			var city = undefined;
			var address = undefined;
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
			var cityData = cityData3Lev;
			if(masterCard) {
				for(var wt of masterCard.workerTypes) {
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
				for(var wktp of workType) {
					wktp.selectedNum = 0;
					for(var wktp2 of wktp.children) {
						wktp2.selected = false;
						for(var wts of workTypeSelected) {
							if(wts.value === wktp2.value) {
								wktp2.selected = true;
								wktp.selectedNum++;
								break;
							}
						}
					}
				}
				for(var sa of masterCard.serviceArea) {
					cityDataSelected.push({
						value: sa.areaId,
						text: sa.areaNname
					});
					if(cityDataDis === '') {
						cityDataDis += sa.areaNname;
					} else {
						cityDataDis += ',' + sa.areaNname;
					}
					if(!city) {
						city = {
							province: sa.parentAreaPageUse.parentAreaPageUse.areaNname,
							city: sa.parentAreaPageUse.areaNname
						};
					}
				}
				for(var cd of cityData) {
					cd.selectedNum = 0;
					for(var cd2 of cd.children) {
						for(var cd3 of cd2.children) {
							cd3.selected = false;
							for(var cds of cityDataSelected) {
								if(cds.value === cd3.value) {
									console.log()
									cd3.selected = true;
									cd.selectedNum++;
									break;
								}
							}
						}
					}
				}
				address = {};
				address.provinceid = masterCard.provinceId;
				address.province = masterCard.provinceName;
				address.cityid = masterCard.cityId;
				address.city = masterCard.cityName;
				address.districtid = masterCard.countyId;
				address.district = masterCard.countyName;
				address.street = masterCard.street;
				address.lng = masterCard.lng;
				address.lat = masterCard.lat;
			} else {
				masterCard = {
					contact: '',
					mobileNumber: '',
					workingYears: undefined,
					cardTitle: '',
					description: '',
					pictures: []
				};
			}
			return {
				masterCard: masterCard,
				isCut: false,
				workType: workType,
				workTypeSelected: workTypeSelected,
				workTypeDis: workTypeDis,
				cityData: cityData,
				cityDataSelected: cityDataSelected,
				cityDataDis: cityDataDis,
				city: city,
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
			selectWorkType() {
				muiUtils.openWindow('../../commonpage/select/type.html', '../../commonpage/select/type.html', {
					extras: {
						title: '选择工种',
						typeData: this.workType,
						deep: 2,
						typeName: '工种',
						fromPage: '../../bizpage/release/card.html'
					}
				});
			},
			selectArea() {
				muiUtils.openWindow('../../commonpage/select/type.html', '../../commonpage/select/type.html', {
					extras: {
						title: '选择服务区域',
						typeData: this.cityData,
						deep: 3,
						typeName: '区域',
						fromPage: '../../bizpage/release/card.html'
					}
				});
			},
			selectAddress() {
				muiUtils.openWindow('../../commonpage/map/selectaddress.html', '../../commonpage/map/selectaddress.html', {
					extras: {
						address: this.address,
						fromPage: '../../bizpage/release/card.html'
					}
				});
			},
			submit(state) {
				if(!this.masterCard.contact) {
					mui.toast('请输入姓名');
					return;
				}
				if(!this.masterCard.mobileNumber) {
					mui.toast('请输入联系方式');
					return;
				}
				if(!/^1[3|4|5|7|8][0-9]{9}$/.test(this.masterCard.mobileNumber)) {
					mui.toast('请输入正确的手机号码');
					return;
				}
				if(!this.address) {
					mui.toast('请选择联系地址');
					return;
				}
				if(!this.masterCard.workingYears) {
					mui.toast('请填写工龄');
					return;
				}
				if(!this.masterCard.cardTitle) {
					mui.toast('请填写标题');
					return;
				}
				if(!this.workTypeSelected || this.workTypeSelected.length === 0) {
					mui.toast('请选择工种');
					return;
				}
				if(!this.cityDataSelected || this.cityDataSelected.length === 0) {
					mui.toast('请选择服务区域');
					return;
				}
				var data = this.masterCard;
				data.state = state;
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
				data.serviceArea = [];
				delete data.stateValue;
				for(var workType of this.workTypeSelected) {
					data.workerTypes.push({
						id: workType.value,
						typeName: workType.text
					});
				}
				for(var area of this.cityDataSelected) {
					data.serviceArea.push({
						areaId: area.value,
						areaNname: area.text
					});
				}
				for(var i = 0; i < data.pictures.length; i++) {
					if(data.pictures[i].indexOf('http') != -1) {
						data.pictures[i] = data.pictures[i].substring(data.pictures[i].lastIndexOf('/') + 1);
					}
				}
				muiUtils.muiAjax(api.APIS.masterCard.saveMasterCard, {
					data: JSON.stringify(data),
					contentType: 'application/json',
					dataType: "json",
					type: "post",
					success: function(data) {
						if(data.erroCode === CONSTS.ERROR_CODE.SUCCESS) {
							mui.toast('保存成功！');
							muiUtils.openWindow('../../commonpage/mine/mycard.html', '../../commonpage/mine/mycard.html', {
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
			mui('.mui-scroll-wrapper.releaseCard').scroll({
				bounce: true,
				indicators: false, // 是否显示滚动条
				deceleration: mui.os.ios ? 0.003 : 0.0009
			});
			mui('.mui-numbox').numbox();
			var that = this;
			window.addEventListener('typeDataSelected', function(e) {
				var typeDataSelected = e.detail.typeDataSelected;
				if(e.detail.typeName === '工种') {
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
				} else {
					that.cityData = e.detail.typeData;
					that.city = e.detail.city;
					that.cityDataSelected = typeDataSelected;
					that.cityDataDis = '';
					that.city = e.detail.city;
					for(var cd of that.cityDataSelected) {
						if(that.cityDataDis === '') {
							that.cityDataDis += cd.text;
						} else {
							that.cityDataDis += ',' + cd.text;
						}
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
	.releaseCard {
		position: absolute;
		top: 45px;
		bottom: 0;
		width: 100%;
	}
	
	.releaseCard input,
	.releaseCard textarea,
	.releaseCard label {
		font-size: 14px;
	}
	
	.releaseCard .inputRow {
		color: #333;
		line-height: 30px;
		padding: 10px;
		position: relative;
		background-color: #fff;
		overflow: hidden;
	}
	
	.releaseCard .inputRow>input[type=text] {
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
	
	.releaseCard .inputRow>.jxddicon.icon-jinru32 {
		position: absolute;
		right: 10px;
		top: 16px;
		line-height: 20px;
		font-size: 20px;
		color: #999;
	}
	
	.releaseCard .inputRow:after {
		content: "";
		height: 1px;
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #d7d7d7;
		transform: scaleY(0.5);
	}
	
	.releaseCard .title {
		background-color: #ddd;
		padding: 5px;
		font-size: 15px;
		color: #222;
	}
	
	.releaseCard .inputRow label {
		width: 70px;
		float: left;
	}
	
	.releaseCard .inputRow .area,
	.releaseCard .inputRow .area p:nth-child(2) span:nth-child(2),
	.releaseCard .inputRow .workType {
		padding-left: 70px;
	}
	
	.releaseCard .inputRow .area,
	.releaseCard .inputRow .workType {
		padding-right: 30px;
	}
	
	.releaseCard .inputRow .area p,
	.releaseCard .inputRow .workType {
		color: #333;
	}
	
	.releaseCard .inputRow .area p:nth-child(2) {
		line-height: 20px;
	}
	
	.releaseCard .inputRow .area p:nth-child(2) span {
		display: inherit;
	}
	
	.releaseCard .mui-numbox .mui-input-numbox {
		width: 36px !important;
		padding: 0 !important;
	}
	
	.releaseCard .inputRow.textarea {
		overflow: hidden;
	}
	
	.releaseCard .inputRow.textarea label,
	.releaseCard .inputRow.textarea textarea {
		float: left;
	}
	
	.releaseCard textarea {
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