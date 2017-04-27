<!-- 没用到这个页面 -->
<template>
	<nonetworkmask :disnonetworkmask.sync="disnonetworkmask" :top="45" :bottom="0"></nonetworkmask>
	<div class="mui-scroll-wrapper deviceInfo">
		<div class="mui-scroll">
			<ul class="mui-table-view">
				<li class="mui-table-view-cell">
					<span class="store-title">{{storeInfo.name}}</span>
				</li>
				<li class="mui-table-view-cell">
					<p class="store-status">{{storeInfo.statusZH}}</p>
				</li>
				<li v-if="storeInfo.status ==0" class="mui-table-view-cell">
					<p>通过时间：{{storeInfo.checktime}}</p>
				</li>
				<li v-if="storeInfo.status ==0" class="mui-table-view-cell">
					<p>温馨提示：{{storeInfo.message}}</p>
				</li>
				<li v-if="storeInfo.status ==1" class="mui-table-view-cell">
					<p>驳回时间：{{storeInfo.checktime}}</p>
				</li>
				<li v-if="storeInfo.status ==1" class="mui-table-view-cell">
					<p>驳回理由：{{storeInfo.message}}</p>
				</li>
				<li v-if="storeInfo.status ==-1" class="mui-table-view-cell">
					<p>关闭时间：{{storeInfo.checktime}}</p>
				</li>
				<li class="mui-table-view-cell">
					<a class="store-view" @tap="storeView">{{storeInfo.status==1?'预览店铺':'查看店铺'}}</a>
				</li>
			</ul>
			<ul class="mui-table-view">
				<li class="mui-table-view-cell">
					<span class="store-title">编辑店铺信息</span>
				</li>
				<li class="mui-table-view-cell">
					<p>店铺信息修改后，需通过审核才能显示在前台</p>
				</li>
				<li class="mui-table-view-cell">
					<a class="store-view" @tap="storeEdit">编辑店铺</a>
				</li>
			</ul>
			<ul v-if="storeInfo.status ==0 ||storeInfo.status ==-1" class="mui-table-view">
				<li class="mui-table-view-cell">
					<span class="store-title">{{storeInfo.status ==0 ?'关闭店铺':'开启店铺'}}</span>
				</li>
				<li class="mui-table-view-cell">
					<p>关闭店铺后，店铺将不在前台显示，用户将搜索不到您的店铺</p>
				</li>
				<li class="mui-table-view-cell">
					<a class="store-view" @tap="storeClose">{{storeInfo.status ==0 ?'关闭店铺':'开启店铺'}}</a>
				</li>
			</ul>
			<!--<ul v-if="storeInfo.status ==0"  class="mui-table-view">
				<li class="mui-table-view-cell">
					<span class="store-title">刷新店铺</span>
				</li>
				<li class="mui-table-view-cell">
					<p>刷新店铺后，店铺将提升至列表前面，普通用户一天仅能刷新3次，VIP用户每天可以刷新103次<i class="add-vip" @tap="addVip">加入VIP?</i></p>
				</li>
				<li class="mui-table-view-cell">
					<a class="store-view" @tap="storeRefresh">刷新店铺</a>
				</li>
			</ul>-->
		</div>
	</div>
</template>

<script>
	import nonetworkmask from 'component/mask/NoNetWorkMask';
	import muiUtils from 'common/muiUtils';
	import log from 'common/logUtils';

	export default {
		data: function() {
			return {
				id: plus.webview.currentWebview().id,
				storeInfo: {
					name: '大雨瓷砖',
					statusZH: '审核通过',
					// 0：通过，1：未通过，-1店铺关闭
					status: plus.webview.currentWebview().status,
					checktime: '2017-02-15 16:48:50',
					message: '您的店铺通过了审核哦'
				}
			}
		},
		created: function() {
			// ajax请求获取storeinfo数据
			this.storeInfo.statusZH = this.getStatusZH(this.storeInfo.status);
		},
		methods: {
			getStatusZH: function(status) {
				let zh = '';
				switch(status) {
					case -1:
						zh = '店铺关闭';
						break;
					case 0:
						zh = '审核通过';
						break;
					case 1:
						zh = '审核未通过';
						break;
					default:
						zh = '审核通过';
				}
				return zh;
			},
			storeView: function() {
				//预览和查看没区别
				let url = '../../bizpage/device/storemanage.html';
				let id = 'storemanage_preview_123';
				let params = {
					isPreview: true,
					isStoreManage: true,
					isClose: true,
					createNew: true,
					id: this.id,
					status: this.storeInfo.status
				}
				console.log('paramsparamsparams:' + JSON.stringify(params));
				muiUtils.openWindow(url, id, {
					extras: params
				});
			},
			storeEdit: function() {
				let url = '../../bizpage/release/store.html';
				muiUtils.openWindow(url, url);
			},
			storeClose: function() {
				this.storeInfo.status = this.storeInfo.status === 0?-1:0;
				this.storeInfo.statusZH = this.getStatusZH(this.storeInfo.status);
			},
			storeRefresh: function() {
				
			},
			addVip: function() {
				
			}
		},
		watch: {

		},
		ready: function() {
			var deceleration = mui.os.ios ? 0.003 : 0.0009;
			mui('.mui-scroll-wrapper').scroll({
				bounce: true,
				indicators: false, //是否显示滚动条
				deceleration: deceleration
			});
		},
		components: {
			nonetworkmask
		}
	};
</script>
<style scoped>
	.deviceInfo {
		position: absolute;
		top: 45px;
		bottom: 0;
		width: 100%;
		font-size: 16px;
	}
	
	.mui-table-view {
		margin-top: 20px;
		margin-bottom: 20px;
	}
	
	.mui-table-view-cell {
		padding: 5px 15px 0 15px;
	}
	
	.mui-table-view-cell:after {
		height: 0;
	}
	
	.store-title {
		font-size: 18px;
		margin-top: 5px;
	}
	
	.mui-table-view-cell .store-view {
		color: #fff;
		background-color: rgb(38, 198, 218);
		border-radius: 3px;
		float: right;
		text-align: center;
		margin: 0;
		padding: 5px 15px;
		font-size: 16px;
		margin-bottom: 10px;
	}
	
	.store-status {
		color: rgb(38, 198, 218);
	}
	
	.add-vip {
		color: rgb(38, 198, 218);
	}
</style>