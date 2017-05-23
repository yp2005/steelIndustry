<template>
	<div class="releasemanager">
		<p class="conditions">
			<a href="javascript: void(0)" class="{{filterType == 0 ? 'filterActive':''}}" @tap="getData(0, true)">师傅名片</a>
			<a href="javascript: void(0)" class="{{filterType == 1 ? 'filterActive':''}}" @tap="getData(1, true)">用工需求</a>
			<a href="javascript: void(0)" class="{{filterType == 2 ? 'filterActive':''}}" @tap="getData(2, true)">设备</a>
			<a href="javascript: void(0)" class="{{filterType == 3 ? 'filterActive':''}}" @tap="getData(3, true)">工程</a>
			<a href="javascript: void(0)" class="picker" @tap="selectState">{{state.text}}</a>
		</p>
		<div id="scroll" class="mui-scroll-wrapper">
			<div id="pullrefresh" class="mui-scroll">
				<template v-if="filterType == 0">
					<div class="oneMaster" v-for="master in masterList" @tap="gotoMasterDetail(master.userId)">
						<img :src="master.imgName" />
						<div class="masterInfo">
							<p class="mui-ellipsis">{{master.cardTitle}}</p>
							<p><span class="mui-ellipsis worktype">{{master.workerTypes}}</span><span class="mui-pull-right mui-ellipsis area">{{master.serviceArea}}</span></p>
							<p>
								<img v-show="master.realNameAuthentication == 1" src="../../../../../static/img/mine/shimingrenzheng.svg">
								<img v-else src="../../../../../static/img/mine/noshimingrenzheng.svg">
							</p>
							<p>
								<a href="javascript:void(0)" v-if="state.value != 1" @tap="shenhe($index, 1, 0, $event)">通过</a>
								<a class="butongguo" href="javascript:void(0)" v-if="state.value != 3" @tap="shenhe($index, 3, 0, $event)">不通过</a>
								<span class="mui-pull-right">...</span>
							</p>
						</div>
					</div>
					<p class="noData" v-show="!masterList || masterList.length === 0" class="noData">暂无数据</p>
				</template>
				<template v-if="filterType == 1">
					<div class="oneWork" v-for="work in workList" @tap="gotoWorkDetail(work.id)">
						<img :src="work.imgName" />
						<div class="workInfo">
							<p class="mui-ellipsis">{{work.demandTitle}}</p>
							<p>{{work.createTime}}<span class="mui-pull-right">{{work.address}}</span></p>
							<p>
								<img v-show="work.realNameAuthentication == 1" src="../../../../../static/img/mine/shimingrenzheng.svg">
								<img v-else src="../../../../../static/img/mine/noshimingrenzheng.svg">
								<img v-show="work.enterpriseCertification == 1" src="../../../../../static/img/mine/qiyerenzheng.svg">
								<img v-else src="../../../../../static/img/mine/noqiyerenzheng.svg">
							</p>
							<p>
								<a href="javascript:void(0)" v-if="state.value != 1" @tap="shenhe($index, 1, 1, $event)">通过</a>
								<a class="butongguo" href="javascript:void(0)" v-if="state.value != 3" @tap="shenhe($index, 3, 1, $event)">不通过</a>
								<span class="mui-pull-right">...</span>
							</p>
						</div>
					</div>
					<p class="noData" v-show="!workList || workList.length === 0" class="noData">暂无数据</p>
				</template>
				<template v-if="filterType == 2">
					<div class="oneDevice" v-for="device in deviceList" @tap="gotoDeviceDetail(device.id)">
						<img :src="device.imgName" />
						<div class="deviceInfo">
							<p class="mui-ellipsis">{{device.deviceName}}</p>
							<p>{{device.address}}</p>
							<p>
								<img v-show="device.realNameAuthentication == 1" src="../../../../../static/img/mine/shimingrenzheng.svg">
								<img v-else src="../../../../../static/img/mine/noshimingrenzheng.svg">
								<img v-show="device.enterpriseCertification == 1" src="../../../../../static/img/mine/qiyerenzheng.svg">
								<img v-else src="../../../../../static/img/mine/noqiyerenzheng.svg">
							</p>
							<p>
								<a href="javascript:void(0)" v-if="state.value != 1" @tap="shenhe($index, 1, 2, $event)">通过</a>
								<a class="butongguo" href="javascript:void(0)" v-if="state.value != 3" @tap="shenhe($index, 3, 2, $event)">不通过</a>
								<span class="mui-pull-right">...</span>
							</p>
						</div>
					</div>
					<p class="noData" v-show="!deviceList || deviceList.length === 0" class="noData">暂无数据</p>
				</template>
				<template v-if="filterType == 3">
					<div class="oneProject" v-for="project in projectList" @tap="gotoProjectDetail(project.id)">
						<img :src="project.imgName" />
						<div class="projectInfo">
							<p class="mui-ellipsis">{{project.projectName}}</p>
							<p>{{project.createTime}}<span class="mui-pull-right">{{project.address}}</span></p>
							<p>
								<img v-show="project.realNameAuthentication == 1" src="../../../../../static/img/mine/shimingrenzheng.svg">
								<img v-else src="../../../../../static/img/mine/noshimingrenzheng.svg">
								<img v-show="project.enterpriseCertification == 1" src="../../../../../static/img/mine/qiyerenzheng.svg">
								<img v-else src="../../../../../static/img/mine/noqiyerenzheng.svg">
							</p>
							<p>
								<a href="javascript:void(0)" v-if="state.value != 1" @tap="shenhe($index, 1, 3, $event)">通过</a>
								<a class="butongguo" href="javascript:void(0)" v-if="state.value != 3" @tap="shenhe($index, 3, 3, $event)">不通过</a>
								<span class="mui-pull-right">...</span>
							</p>
						</div>
					</div>
					<p class="noData" v-show="!projectList || projectList.length === 0" class="noData">暂无数据</p>
				</template>
			</div>
		</div>
	</div>
</template>

<script>
	import muiUtils from 'common/muiUtils';
	import log from 'common/logUtils';
	import api from 'api';
	import CONSTS from 'common/consts';
	import {
		cityData3Lev
	} from 'common/cityData';
	export default {
		data: function() {
			var statePicker = new mui.PopPicker({
				layer: 1
			});
			statePicker.setData([{
				value: 2,
				text: '待审核',
			}, {
				value: 3,
				text: '未通过',
			}, {
				value: 1,
				text: '已通过',
			}]);
			return {
				filterType: 0,
				masterList: [],
				workList: [],
				deviceList: [],
				projectList: [],
				pullrefresh: null,
				statePicker: statePicker,
				state: {
					value: 2,
					text: '待审核',
				}
			};
		},
		created: function() {
			this.getData(0, true);
		},
		methods: {
			selectState() {
				var that = this;
				this.statePicker.show(function(items) {
					that.state = {
						text: items[0].text,
						value: items[0].value
					}
				});
			},
			gotoMasterDetail(userId) {
				muiUtils.openWindow('../../bizpage/master/masterinfo.html', '../../bizpage/master/masterinfo.html', {
					extras: {
						userId: userId
					}
				});
			},
			gotoWorkDetail(id) {
				muiUtils.openWindow('../../bizpage/work/workinfo.html', '../../bizpage/work/workinfo.html', {
					extras: {
						workId: id
					}
				});
			},
			gotoDeviceDetail(id) {
				muiUtils.openWindow('../../bizpage/device/deviceinfo.html', '../../bizpage/device/deviceinfo.html', {
					extras: {
						deviceId: id
					}
				});
			},
			gotoProjectDetail(id) {
				muiUtils.openWindow('../../bizpage/project/projectinfo.html', '../../bizpage/project/projectinfo.html', {
					extras: {
						projectId: id
					}
				});
			},
			shenhe(index, state, type, e) {
				var that = this;
				var btnArray = ['取消', '确定'];
				mui.confirm(state == 1 ? '确认通过审核？' : '确认不通过审核？', '操作提示', btnArray, function(e) {
					if(e.index == 1) {
						var url = '';
						var dataList;
						switch(type) {
							case 0:
								url = api.APIS.masterCard.updateMasterCardState;
								dataList = that.masterList;
								break;
							case 1:
								url = api.APIS.employmentDemand.updateEmploymentDemandState;
								dataList = that.workList;
								break;
							case 2:
								url = api.APIS.device.updateDeviceState;
								dataList = that.deviceList;
								break;
							case 3:
								url = api.APIS.project.updateProjectState;
								dataList = that.projectList;
								break;
						}
						muiUtils.muiAjax(url, {
							dataType: "json",
							contentType: 'application/json',
							type: "post",
							data: JSON.stringify({
								id: dataList[index].id,
								state: state
							}),
							success: function(data) {
								if(data.erroCode === CONSTS.ERROR_CODE.SUCCESS) {
									mui.toast(state == 1 ? '已通过审核！' : '已不通过审核！');
									dataList.splice(index, 1);
								} else {
									mui.toast(data.erroCode + '：' + data.erroMsg);
								}
							},
							error: function(xhr, type, errorThrown) {
								mui.toast('服务器或网络异常，请稍后重试。');
							}
						});
					}
				});
				e.stopPropagation();
			},
			getData(type, loading) {
				var that = this;
				this.filterType = type;
				var url = '';
				switch(type) {
					case 0:
						url = api.APIS.masterCard.getMasterCardList;
						break;
					case 1:
						url = api.APIS.employmentDemand.getEmploymentDemandList;
						break;
					case 2:
						url = api.APIS.device.getDeviceList;
						break;
					case 3:
						url = api.APIS.project.getProjectList;
						break;
				}
				muiUtils.muiAjax(url, {
					dataType: "json",
					contentType: 'application/json',
					type: "post",
					data: JSON.stringify({
						rowStartNumber: 0,
						rowCount: 10,
						sortType: 0,
						state: that.state.value
					}),
					success: function(data) {
						if(data.erroCode === CONSTS.ERROR_CODE.SUCCESS) {
							switch(type) {
								case 0:
									for(var master of data.result.masterCardList || []) {
										master.imgName = master.imgName ? (data.result.imgServer + '/small_' + master.imgName) : '1';
									}
									that.masterList = data.result.masterCardList || [];
									break;
								case 1:
									for(var work of data.result.employmentDemandList || []) {
										work.imgName = work.imgName ? (data.result.imgServer + '/small_' + work.imgName) : '1';
									}
									that.workList = data.result.employmentDemandList || [];
									break;
								case 2:
									for(var device of data.result.deviceList || []) {
										device.imgName = device.imgName ? (data.result.imgServer + '/small_' + device.imgName) : '1';
									}
									that.deviceList = data.result.deviceList || [];
									break;
								case 3:
									for(var project of data.result.projectList || []) {
										project.imgName = project.imgName ? (data.result.imgServer + '/small_' + project.imgName) : '1';
									}
									that.projectList = data.result.projectList || [];
									break;
							}
						} else {
							mui.toast(data.erroCode + '：' + data.erroMsg);
						}
						that.pullrefresh.endPullDownToRefresh();
						that.pullrefresh.refresh(true);
					},
					error: function(xhr, type, errorThrown) {
						that.pullrefresh.endPullDownToRefresh();
						that.pullrefresh.refresh(true);
						mui.toast('服务器或网络异常，请稍后重试。')
					},
					loading: loading
				});
			},
			loadMore(type) {
				var that = this;
				var url = '';
				var rowStartNumber = 10;
				switch(type) {
					case 0:
						url = api.APIS.masterCard.getMasterCardList;
						rowStartNumber = that.masterList.length;
						break;
					case 1:
						url = api.APIS.employmentDemand.getEmploymentDemandList;
						rowStartNumber = that.workList.length;
						break;
					case 2:
						url = api.APIS.device.getDeviceList;
						rowStartNumber = that.deviceList.length;
						break;
					case 3:
						url = api.APIS.project.getProjectList;
						rowStartNumber = that.projectList.length;
						break;
				}
				muiUtils.muiAjax(url, {
					dataType: "json",
					contentType: 'application/json',
					type: "post",
					data: JSON.stringify({
						rowStartNumber: rowStartNumber,
						rowCount: 10,
						sortType: 0,
						state: that.state.value
					}),
					success: function(data) {
						if(data.erroCode === CONSTS.ERROR_CODE.SUCCESS) {
							switch(type) {
								case 0:
									if(!data.result.masterCardList || data.result.masterCardList.length === 0) {
										that.pullrefresh.endPullUpToRefresh(true);
										return;
									}
									for(var master of data.result.masterCardList || []) {
										master.imgName = master.imgName ? (data.result.imgServer + '/small_' + master.imgName) : '1';
									}
									that.masterList = that.masterList.concat(data.result.masterCardList);
									break;
								case 1:
									if(!data.result.employmentDemandList || data.result.employmentDemandList.length === 0) {
										that.pullrefresh.endPullUpToRefresh(true);
										return;
									}
									for(var work of data.result.employmentDemandList || []) {
										work.imgName = work.imgName ? (data.result.imgServer + '/small_' + work.imgName) : '1';
									}
									that.workList = that.workList.concat(data.result.employmentDemandList);
									break;
								case 2:
									if(!data.result.deviceList || data.result.deviceList.length === 0) {
										that.pullrefresh.endPullUpToRefresh(true);
										return;
									}
									for(var device of data.result.deviceList || []) {
										device.imgName = device.imgName ? (data.result.imgServer + '/small_' + device.imgName) : '1';
									}
									that.deviceList = that.deviceList.concat(data.result.deviceList);
									break;
								case 3:
									if(!data.result.projectList || data.result.projectList.length === 0) {
										that.pullrefresh.endPullUpToRefresh(true);
										return;
									}
									for(var project of data.result.projectList || []) {
										project.imgName = project.imgName ? (data.result.imgServer + '/small_' + project.imgName) : '1';
									}
									that.projectList = that.projectList.concat(data.result.projectList);
									break;
							}
						} else {
							mui.toast(data.erroCode + '：' + data.erroMsg);
						}
						that.pullrefresh.endPullUpToRefresh();
					},
					error: function(xhr, type, errorThrown) {
						that.pullrefresh.endPullUpToRefresh();
						mui.toast('服务器或网络异常，请稍后重试。')
					}
				});
			}
		},
		watch: {
			'state.value': function() {
				this.getData(this.filterType, true);
			}
		},
		ready: function() {
			var deceleration = mui.os.ios ? 0.003 : 0.0009;
			mui('.mui-scroll-wrapper').scroll({
				bounce: true,
				indicators: true, //是否显示滚动条
				deceleration: deceleration
			});
			var that = this;
			this.pullrefresh = mui('#pullrefresh').pullToRefresh({
				down: {
					auto: false,
					offset: 50,
					callback: function() {
						that.getData(that.filterType, false);
					}
				},
				up: {
					offset: 50,
					callback: function() {
						that.loadMore(that.filterType);
					}
				}
			});
		}
	};
</script>
<style>
	.releasemanager {
		position: absolute;
		top: 45px;
		bottom: 0;
		width: 100%;
	}
	
	.releasemanager .conditions {
		line-height: 25px;
		padding: 10px 0;
		text-align: center;
		background-color: #fff;
	}
	
	.releasemanager .conditions a {
		color: #000;
		width: 19%;
		position: relative;
	}
	
	.releasemanager .conditions a:nth-child(1),
	.releasemanager .conditions a:nth-child(2),
	.releasemanager .conditions a:nth-child(3),
	.releasemanager .conditions a:nth-child(4) {
		border-right: solid 1px #ddd;
	}
	
	.releasemanager .conditions a.picker:after {
		content: "";
		position: absolute;
		width: 4px;
		height: 4px;
		margin-left: 5px;
		top: 10px;
		box-sizing: border-box;
		border-top: 4px solid #aaa;
		border-right: 4px solid transparent;
		border-left: 4px solid transparent;
	}
	
	.filterActive {
		color: #26c6da !important;
	}
	
	p.noData {
		line-height: 250px;
		text-align: center;
		margin-bottom: 2px;
	}
	
	.oneMaster {
		padding: 10px;
		background-color: #fff;
		margin-bottom: 8px;
	}
	
	.oneMaster img {
		float: left;
		width: 106px;
		height: 106px;
	}
	
	.oneMaster .masterInfo {
		padding-left: 116px;
		min-height: 80px;
	}
	
	.oneMaster .masterInfo p {
		font-size: 13px;
	}
	
	.oneMaster .masterInfo p:nth-child(1) {
		color: #000;
		font-size: 14px;
	}
	
	.oneMaster .masterInfo p:nth-child(2) .worktype {
		width: 62px;
	}
	
	.oneMaster .masterInfo p:nth-child(2) .area {
		width: 120px;
		text-align: right;
	}
	
	.oneMaster .masterInfo p:nth-child(3) {
		overflow: hidden;
		padding: 5px 0;
	}
	
	.oneMaster .masterInfo p:nth-child(3) img {
		width: 19px;
		height: 19px;
		margin-right: 4px;
	}
	
	.oneMaster .masterInfo p:nth-child(4) a {
		color: #fff;
		background-color: #26c6da;
		line-height: 1;
		padding: 6px 8px;
		border-radius: 3px;
		margin: 5px 0;
	}
	
	.oneMaster .masterInfo p:nth-child(4) span {
		line-height: 1;
		margin-top: 4px;
		font-size: 19px;
		font-weight: 800;
		color: #777;
	}
	
	.oneDevice {
		padding: 10px;
		background-color: #fff;
		margin-bottom: 8px;
	}
	
	.oneDevice img {
		float: left;
		width: 106px;
		height: 106px;
	}
	
	.oneDevice .deviceInfo {
		padding-left: 116px;
		min-height: 80px;
	}
	
	.oneDevice .deviceInfo p {
		font-size: 13px;
	}
	
	.oneDevice .deviceInfo p:nth-child(1) {
		color: #000;
		font-size: 14px;
	}
	
	.oneDevice .deviceInfo p:nth-child(3) {
		overflow: hidden;
		padding: 5px 0;
	}
	
	.oneDevice .deviceInfo p:nth-child(3) img {
		width: 19px;
		height: 19px;
		margin-right: 4px;
	}
	
	.oneDevice .deviceInfo p:nth-child(4) a {
		color: #fff;
		background-color: #26c6da;
		line-height: 1;
		padding: 6px 8px;
		border-radius: 3px;
		margin: 5px 0;
	}
	
	.oneDevice .deviceInfo p:nth-child(4) span {
		line-height: 1;
		margin-top: 4px;
		font-size: 19px;
		font-weight: 800;
		color: #777;
	}
	
	.oneProject {
		padding: 10px;
		background-color: #fff;
		margin-bottom: 8px;
	}
	
	.oneProject img {
		float: left;
		width: 106px;
		height: 106px;
	}
	
	.oneProject .projectInfo {
		padding-left: 116px;
		min-height: 80px;
	}
	
	.oneProject .projectInfo p {
		font-size: 13px;
	}
	
	.oneProject .projectInfo p:nth-child(1) {
		color: #000;
		font-size: 14px;
	}
	
	.oneProject .projectInfo p:nth-child(3) {
		overflow: hidden;
		padding: 5px 0;
	}
	
	.oneProject .projectInfo p:nth-child(3) img {
		width: 19px;
		height: 19px;
		margin-right: 4px;
	}
	
	.oneProject .projectInfo p:nth-child(4) a {
		color: #fff;
		background-color: #26c6da;
		line-height: 1;
		padding: 6px 8px;
		border-radius: 3px;
		margin: 5px 0;
	}
	
	.oneProject .projectInfo p:nth-child(4) span {
		line-height: 1;
		margin-top: 4px;
		font-size: 19px;
		font-weight: 800;
		color: #777;
	}
	
	.oneWork {
		padding: 10px;
		background-color: #fff;
		margin-bottom: 8px;
	}
	
	.oneWork img {
		float: left;
		width: 106px;
		height: 106px;
	}
	
	.oneWork .workInfo {
		padding-left: 116px;
		min-height: 80px;
	}
	
	.oneWork .workInfo p {
		font-size: 13px;
	}
	
	.oneWork .workInfo p:nth-child(1) {
		color: #000;
		font-size: 14px;
	}
	
	.oneWork .workInfo p:nth-child(3) {
		overflow: hidden;
		padding: 5px 0;
	}
	
	.oneWork .workInfo p:nth-child(3) img {
		width: 19px;
		height: 19px;
		margin-right: 4px;
	}
	
	.oneWork .workInfo p:nth-child(4) a {
		color: #fff;
		background-color: #26c6da;
		line-height: 1;
		padding: 6px 8px;
		border-radius: 3px;
		margin: 5px 0;
	}
	
	.oneWork .workInfo p:nth-child(4) span {
		line-height: 1;
		margin-top: 4px;
		font-size: 19px;
		font-weight: 800;
		color: #777;
	}
	
	.mui-scroll-wrapper {
		top: 50px;
	}
	
	.oneMaster .masterInfo p:nth-child(4) a.butongguo,
	.oneProject .projectInfo p:nth-child(4) a.butongguo,
	.oneWork .workInfo p:nth-child(4) a.butongguo,
	.oneDevice .deviceInfo p:nth-child(4) a.butongguo {
		margin-left: 12px;
		color: red;
		border: solid 1px red;
		background-color: #fff;
	}
</style>