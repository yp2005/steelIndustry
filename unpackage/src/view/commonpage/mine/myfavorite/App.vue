<template>
	<div class="myfavorite">
		<p class="conditions">
			<a href="javascript: void(0)" class="{{filterType == 0 ? 'filterActive':''}}" @tap="favoriteFilter(0, masterLoaded)">师傅名片</a>
			<a href="javascript: void(0)" class="{{filterType == 1 ? 'filterActive':''}}" @tap="favoriteFilter(1, workLoaded)">用工需求</a>
			<a href="javascript: void(0)" class="{{filterType == 2 ? 'filterActive':''}}" @tap="favoriteFilter(2, deviceLoaded)">设备</a>
			<a href="javascript: void(0)" class="{{filterType == 3 ? 'filterActive':''}}" @tap="favoriteFilter(3, projectLoaded)">工程</a>
		</p>
		<div id="scroll" class="mui-scroll-wrapper">
			<div class="mui-scroll">
				<template v-if="filterType == 0">
					<div class="oneMaster" v-for="master in masterList" @tap="gotoMasterDetail(master.userId)">
						<img :src="master.imgName" />
						<div class="masterInfo">
							<p class="mui-ellipsis">{{master.cardTitle}}</p>
							<p><span class="mui-ellipsis worktype">{{master.workerTypes}}</span><span class="mui-pull-right mui-ellipsis area">{{master.serviceArea}}</span></p>
							<p>
								<img v-show="master.realNameAuthentication == 1" src="../../../../static/img/mine/shimingrenzheng.svg">
								<img v-else src="../../../../static/img/mine/noshimingrenzheng.svg">
							</p>
							<p>
								<a href="javascript:void(0)">立即联系</a>
								<a class="shoucang" href="javascript:void(0)" @tap="shoucang('card', master, $event)">{{master.collected ? '取消收藏' : '收藏'}}</a>
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
								<img v-show="work.realNameAuthentication == 1" src="../../../../static/img/mine/shimingrenzheng.svg">
								<img v-else src="../../../../static/img/mine/noshimingrenzheng.svg">
								<img v-show="work.enterpriseCertification == 1" src="../../../../static/img/mine/qiyerenzheng.svg">
								<img v-else src="../../../../static/img/mine/noqiyerenzheng.svg">
							</p>
							<p>
								<a href="javascript:void(0)">立即预约</a>
								<a class="shoucang" href="javascript:void(0)" @tap="shoucang('work', work, $event)">{{work.collected ? '取消收藏' : '收藏'}}</a>
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
								<img v-show="device.realNameAuthentication == 1" src="../../../../static/img/mine/shimingrenzheng.svg">
								<img v-else src="../../../../static/img/mine/noshimingrenzheng.svg">
								<img v-show="device.enterpriseCertification == 1" src="../../../../static/img/mine/qiyerenzheng.svg">
								<img v-else src="../../../../static/img/mine/noqiyerenzheng.svg">
							</p>
							<p>
								<a href="javascript:void(0)">订购设备</a>
								<a class="shoucang" href="javascript:void(0)" @tap="shoucang('device', device, $event)">{{device.collected ? '取消收藏' : '收藏'}}</a>
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
								<img v-show="project.realNameAuthentication == 1" src="../../../../static/img/mine/shimingrenzheng.svg">
								<img v-else src="../../../../static/img/mine/noshimingrenzheng.svg">
								<img v-show="project.enterpriseCertification == 1" src="../../../../static/img/mine/qiyerenzheng.svg">
								<img v-else src="../../../../static/img/mine/noqiyerenzheng.svg">
							</p>
							<p>
								<a href="javascript:void(0)">立即联系</a>
								<a class="shoucang" href="javascript:void(0)" @tap="shoucang('project', project, $event)">{{project.collected ? '取消收藏' : '收藏'}}</a>
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
			return {
				filterType: 0,
				masterList: [],
				masterLoaded: false,
				workList: [],
				workLoaded: false,
				deviceList: [],
				deviceLoaded: false,
				projectList: [],
				projectLoaded: false
			};
		},
		created: function() {
			this.favoriteFilter(0, false);
		},
		methods: {
			shoucang(type, item, e) {
				var that = this;
				var url = item.collected ? api.APIS.collection.deleteCollection : api.APIS.collection.addCollection;
				muiUtils.muiAjax(url, {
					data: {
						type: type,
						collectId: item.id
					},
					dataType: "json",
					type: "post",
					success: function(data) {
						if(data.erroCode === CONSTS.ERROR_CODE.SUCCESS) {
							mui.toast(item.collected ? '已取消收藏' : '收藏成功！');
							item.collected = !item.collected;
						} else {
							mui.toast(data.erroCode + '：' + data.erroMsg);
						}
					},
					error: function(xhr, type, errorThrown) {
						mui.toast('服务器或网络异常，请稍后重试。')
					}
				});
				e.stopPropagation();
			},
			gotoMasterDetail(userId) {
				muiUtils.openWindow('../../bizpage/master/masterinfo.html', '../../bizpage/master/masterinfo.html', {
					extras: {
						userId: userId
					}
				});
			},
			gotoWorkDetail(id) {
				muiUtils.openWindow('../../bizpage/work/workinfo.html', '../../bizpage/work/workinfo.html',  {
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
			favoriteFilter(type, loaded) {
				var that = this;
				this.filterType = type;
				if(loaded) {
					return;
				}
				var url = '';
				switch(type) {
					case 0:
						url = api.APIS.collection.getMasterCards;
						break;
					case 1:
						url = api.APIS.collection.getEmploymentDemands;
						break;
					case 2:
						url = api.APIS.collection.getDevices;
						break;
					case 3:
						url = api.APIS.collection.getProjects;
						break;
				}
				muiUtils.muiAjax(url, {
					dataType: "json",
					type: "get",
					success: function(data) {
						if(data.erroCode === CONSTS.ERROR_CODE.SUCCESS) {
							switch(type) {
								case 0:
									for(var master of data.result.masterCardList || []) {
										master.imgName = master.imgName ? (data.result.imgServer + '/small_' + master.imgName) : '1';
										master.collected = true;
									}
									that.masterList = data.result.masterCardList;
									that.masterLoaded = true;
									break;
								case 1:
									for(var work of data.result.workList || []) {
										work.imgName = work.imgName ? (data.result.imgServer + '/small_' + work.imgName) : '1';
										work.collected = true;
									}
									that.workList = data.result.workList;
									that.workLoaded = true;
									break;
								case 2:
									for(var device of data.result.deviceList || []) {
										device.imgName = device.imgName ? (data.result.imgServer + '/small_' + device.imgName) : '1';
										device.collected = true;
									}
									that.deviceList = data.result.deviceList;
									that.deviceLoaded = true;
									break;
								case 3:
									for(var project of data.result.projectList || []) {
										project.imgName = project.imgName ? (data.result.imgServer + '/small_' + project.imgName) : '1';
										project.collected = true;
									}
									that.projectList = data.result.projectList;
									that.projectLoaded = true;
									break;
							}
						} else {
							mui.toast(data.erroCode + '：' + data.erroMsg);
						}
					},
					error: function(xhr, type, errorThrown) {
						mui.toast('服务器或网络异常，请稍后重试。')
					}
				});
			},
		},
		ready: function() {
			var deceleration = mui.os.ios ? 0.003 : 0.0009;
			mui('.mui-scroll-wrapper').scroll({
				bounce: true,
				indicators: true,
				deceleration: deceleration
			});
		}
	};
</script>
<style>
	.myfavorite {
		position: absolute;
		top: 45px;
		bottom: 0;
		width: 100%;
	}
	
	.myfavorite .conditions {
		line-height: 25px;
		padding: 10px 0;
		text-align: center;
		background-color: #fff;
	}
	
	.myfavorite .conditions a {
		color: #000;
		width: 23%;
		position: relative;
	}
	
	.myfavorite .conditions a:nth-child(1),
	.myfavorite .conditions a:nth-child(2),
	.myfavorite .conditions a:nth-child(3) {
		border-right: solid 1px #ddd;
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
	
	.shoucang {
		margin-left: 12px !important;
	}
</style>