<template>
	<div class="mystore">
		<div class="oneRow" v-if="store" @tap="gotoDetail">
			<img :src="picture" />
			<div class="rowRight">
				<p class="mui-ellipsis">{{store.storeName}}</p>
				<p>{{store.deviceTypes[0].typeName + '...'}}</p>
				<p>{{store.updateTime}}</p>
				<p>{{store.stateValue}}</p>
				<p>
					<a v-if="store.state === 0" @tap="updateState($event, 2)" href="javascript:void(0)">提交</a>
					<a v-if="store.state !== 2" @tap="edit($event)" href="javascript:void(0)">编辑</a>
					<a v-if="store.state === 1 || store.state === 2" @tap="updateState($event, 0)" href="javascript:void(0)" class="red">撤销</a>
					<a v-if="store.state === 0 || store.state === 3" @tap="delete($event)" href="javascript:void(0)" class="red">删除</a>
				</p>
			</div>
		</div>
		<p class="noStore" v-else>
			<a href="javascript:void(0)" @tap="releaseStore">发布店铺</a>
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
				store: plus.webview.currentWebview().store,
				picture: '1'
			};
		},
		created() {
			var that = this;
			if(!this.store) {
				muiUtils.muiAjax(api.APIS.store.getStore, {
					dataType: "json",
					type: "get",
					success: function(data) {
						if(data.erroCode === CONSTS.ERROR_CODE.SUCCESS) {
							that.store = data.result;
							if(!that.store) {
								return;
							}
							that.picture = that.store.imgServer + that.store.shopSignPictures;
							switch(that.store.state) {
								case 0:
									that.store.stateValue = '草稿';
									break;
								case 1:
									that.store.stateValue = '通过审核';
									break;
								case 2:
									that.store.stateValue = '审核中';
									break;
								case 3:
									that.store.stateValue = '审核不通过';
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
			}
			else {
				that.picture = that.store.imgServer + that.store.shopSignPictures;
			}
		},
		methods: {
			releaseStore() {
				muiUtils.openWindow('../../bizpage/release/store.html', '../../bizpage/release/store.html', {
					isClose: true
				});
			},
			gotoDetail: function() {
				muiUtils.openWindow('../../bizpage/device/deviceinfo.html', '../../bizpage/device/deviceinfo.html', {
					extras: {
						store: this.store
					}
				});
			},
			updateState(event, state) {
				var that = this;
				muiUtils.muiAjax(api.APIS.store.updateStoreState, {
					data: JSON.stringify({
						id: this.store.id,
						state: state
					}),
					contentType: 'application/json',
					dataType: "json",
					type: "post",
					success: function(data) {
						if(data.erroCode === CONSTS.ERROR_CODE.SUCCESS) {
							that.store.state = state;
							switch(state) {
								case 0:
									that.store.stateValue = '草稿';
									break;
								case 1:
									that.store.stateValue = '通过审核';
									break;
								case 2:
									that.store.stateValue = '审核中';
									break;
								case 3:
									that.store.stateValue = '审核不通过';
									break;
							}
							that.store = JSON.parse(JSON.stringify(that.store));
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
			edit(event) {
				muiUtils.openWindow('../../bizpage/release/store.html', '../../bizpage/release/store.html', {
					isValidLogin: true,
					isClose: true,
					extras: {
						store: this.store
					}
				});
				event.stopPropagation();
			},
			delete(event) {
				var btnArray = ['取消', '确定'];
				var that = this;
				mui.confirm('确认删除店铺？', '操作提示', btnArray, function(e) {
					if(e.index == 1) {
						muiUtils.muiAjax(api.APIS.store.deleteStore + '?id=' + that.store.id, {
							dataType: "json",
							type: "delete",
							success: function(data) {
								if(data.erroCode === CONSTS.ERROR_CODE.SUCCESS) {
									that.store = undefined;
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
			},
		}
	};
</script>
<style>
	.mystore {
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
	
	.noStore {
		line-height: 30px;
		margin-top: -15px;
		position: absolute;
		top: 40%;
		left: 0;
		width: 100%;
		text-align: center;
	}
	
	.noStore a {
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