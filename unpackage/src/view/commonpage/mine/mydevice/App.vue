<template>
	<div class="mui-scroll-wrapper mydevice">
		<div class="mui-scroll">
			<div class="oneRow" v-for="device in deviceList" @tap="gotoDetail(device)">
				<img :src="device.picture" />
				<div class="rowRight">
					<p class="mui-ellipsis">{{device.deviceName}}</p>
					<p>{{device.deviceType}}</p>
					<p>{{device.updateTime}}</p>
					<p>{{device.stateValue}}</p>
					<p>
						<a v-if="device.state === 0" @tap="updateState($event, $index, 2)" href="javascript:void(0)">提交</a>
						<a v-if="device.state !== 2" @tap="edit($event, device)" href="javascript:void(0)">编辑</a>
						<a v-if="device.state === 1 || device.state === 2" @tap="updateState($event, $index, 0)" href="javascript:void(0)" class="red">撤销</a>
						<a v-if="device.state === 0 || device.state === 3" @tap="delete($event, $index)" href="javascript:void(0)" class="red">删除</a>
					</p>
				</div>
			</div>
		</div>
		<p class="noDevice" v-show="!deviceList || deviceList.length === 0">
			<a href="javascript:void(0)" @tap="releaseDevice">发布设备</a>
		</p>
	</div>
</template>
<script>
	import muiUtils from 'common/muiUtils';
	import api from 'api';
	import CONSTS from 'common/consts';
	import cacheUtils from 'common/cacheUtils';
	export default {
		data: function() {
			return {
				userInfo: cacheUtils.localStorage(CONSTS.PREFIX_LOGIN).getObject(CONSTS.USER_INFO),
				deviceList: plus.webview.currentWebview().deviceList,
				picture: '1'
			};
		},
		created() {
			var that = this;
			if(!this.deviceList) {
				muiUtils.muiAjax(api.APIS.device.getUserDevice, {
					dataType: "json",
					type: "get",
					success: function(data) {
						if(data.erroCode === CONSTS.ERROR_CODE.SUCCESS) {
							that.deviceList = data.result.deviceList;
							if(!that.deviceList) {
								return;
							}
							for(var device of that.deviceList) {
								device.picture = device.pictures.length > 0 ? that.dealPicture(device.pictures[0]) : '1';
								switch(device.state) {
									case 0:
										device.stateValue = '草稿';
										break;
									case 1:
										device.stateValue = '通过审核';
										break;
									case 2:
										device.stateValue = '审核中';
										break;
									case 3:
										device.stateValue = '审核不通过';
										break;
								}
								if(device.deviceTypes && device.deviceTypes.length) {
									device.deviceType = device.deviceTypes[0].typeName;
								}
							}
						} else {
							mui.toast(data.erroCode + '：' + data.erroMsg);
						}
					},
					error: function(xhr, type, errorThrown) {
						mui.toast('服务器或网络异常，请稍后重试。')
					}
				});
			} else {
				for(var device of that.deviceList) {
					device.picture = device.pictures.length > 0 ? that.dealPicture(device.pictures[0]) : '1';
					if(device.deviceTypes && device.deviceTypes.length) {
						device.deviceType = device.deviceTypes[0].typeName;
					}
				}
			}
		},
		methods: {
			dealPicture(pic) {
				var fileName = pic.substring(pic.lastIndexOf('/') + 1, pic.length);
				var path = pic.substring(0, pic.lastIndexOf('/'));
				return path + '/small_' + fileName;
			},
			releaseDevice() {
				muiUtils.openWindow('../../bizpage/release/device.html', '../../bizpage/release/device.html', {
					isClose: true
				});
			},
			gotoDetail: function(device) {
				muiUtils.openWindow('../../bizpage/device/deviceinfo.html', '../../bizpage/device/deviceinfo.html', {
					extras: {
						device: device
					}
				});
			},
			updateState(event, index, state) {
				var device = this.deviceList[index];
				var that = this;
				muiUtils.muiAjax(api.APIS.device.updateDeviceState, {
					data: JSON.stringify({
						id: device.id,
						state: state
					}),
					contentType: 'application/json',
					dataType: "json",
					type: "post",
					success: function(data) {
						if(data.erroCode === CONSTS.ERROR_CODE.SUCCESS) {
							device.state = state;
							switch(state) {
								case 0:
									device.stateValue = '草稿';
									break;
								case 1:
									device.stateValue = '通过审核';
									break;
								case 2:
									device.stateValue = '审核中';
									break;
								case 3:
									device.stateValue = '审核不通过';
									break;
							}
							that.deviceList.splice(index, 1);
							that.$nextTick(function() {
								that.deviceList.splice(index, 0, device);
							});
						} else {
							mui.toast(data.erroCode + '：' + data.erroMsg);
						}
					},
					error: function(xhr, type, errorThrown) {
						mui.toast('服务器或网络异常，请稍后重试。');
					}
				});
				event.stopPropagation();
			},
			edit(event, device) {
				muiUtils.openWindow('../../bizpage/release/device.html', '../../bizpage/release/device.html', {
					isValidLogin: true,
					isClose: true,
					extras: {
						device: device
					}
				});
				event.stopPropagation();
			},
			delete(event, index) {
				var btnArray = ['取消', '确定'];
				var that = this;
				mui.confirm('确认删除设备？', '操作提示', btnArray, function(e) {
					if(e.index == 1) {
						muiUtils.muiAjax(api.APIS.device.deleteDevice + '?id=' + that.deviceList[index].id, {
							dataType: "json",
							type: "delete",
							success: function(data) {
								if(data.erroCode === CONSTS.ERROR_CODE.SUCCESS) {
									that.deviceList.splice(index, 1);
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
				event.stopPropagation();
			}
		},
		ready() {
			mui('.mui-scroll-wrapper.mydevice').scroll({
				bounce: true,
				indicators: false, // 是否显示滚动条
				deceleration: mui.os.ios ? 0.003 : 0.0009
			});
		}
	};
</script>
<style>
	.mydevice {
		position: absolute;
		top: 45px;
		bottom: 0;
		width: 100%;
	}
	
	.oneRow {
		padding: 10px;
		background-color: #fff;
		margin-bottom: 8px;
	}
	
	.oneRow img {
		float: left;
		width: 106px;
		height: 106px;
	}
	
	.oneRow .rowRight {
		padding-left: 116px;
		min-height: 80px;
	}
	
	.oneRow .rowRight p {
		font-size: 13px;
	}
	
	.oneRow .rowRight p:nth-child(1) {
		color: #000;
		font-size: 14px;
	}
	
	.oneRow .rowRight p:nth-child(3) {
		overflow: hidden;
		/*padding: 5px 0;*/
	}
	
	.oneRow .rowRight p:nth-child(3) img {
		width: 19px;
		height: 19px;
		margin-right: 4px;
	}
	
	.oneRow .rowRight p:nth-child(4) {
		color: green;
	}
	
	.oneRow .rowRight p:nth-child(5) a {
		color: #26c6da;
		line-height: 1;
		padding: 5px 8px;
		border-radius: 3px;
		margin: 5px 5px 5px 0;
		border: 1px solid #26c6da;
	}
	
	.oneRow .rowRight p:nth-child(5) span {
		line-height: 1;
		margin-top: 4px;
		font-size: 19px;
		font-weight: 800;
		color: #777;
	}
	
	.noDevice {
		line-height: 30px;
		margin-top: -15px;
		position: absolute;
		top: 40%;
		left: 0;
		width: 100%;
		text-align: center;
	}
	
	.noDevice a {
		padding: 0 15px;
		color: #26c6da;
		border: solid 1px #26c6da;
		border-radius: 3px;
	}
	
	.oneRow .rowRight p:nth-child(5) a.red {
		color: red;
		border-color: red;
	}
</style>