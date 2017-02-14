<template>
	<nonetworkmask :disnonetworkmask.sync="disnonetworkmask" :top="45" :bottom="0"></nonetworkmask>
	<div class="deviceList">
		<p class="conditions">
			<a href="javascript: void(0)" class="haha {{filterType == 0 ? 'filterActive':''" @tap="favoriteFilter(0)">师傅名片</a>
			<a href="javascript: void(0)" class="haha {{filterType == 1 ? 'filterActive':''" @tap="favoriteFilter(1)">用工需求</a>
			<a href="javascript: void(0)" class="haha {{filterType == 2 ? 'filterActive':''" @tap="favoriteFilter(2)">店铺</a>
			<a href="javascript: void(0)" class="haha {{filterType == 3 ? 'filterActive':''" @tap="favoriteFilter(3)">订单</a>
		</p>
		<listctrl :noresultmsg="noresultmsg" :childlist="childlist" @getlistdata="getdata" @comlist_itemtap="itemtap" :toptipheight="45"></listctrl>
	</div>
</template>

<script>
	import nonetworkmask from 'component/mask/NoNetWorkMask';
	import muiUtils from 'common/muiUtils';
	import log from 'common/logUtils';
	import listctrl from 'src/component/list/ListCtrl';
	import list from 'src/component/list/List';
	import api from 'api';
	import CONSTS from 'common/consts';
	import {
		cityData3Lev
	} from 'common/cityData';
	export default {
		data: function() {
			return {
				childlist: list,
				filterType:0,
				disnonetworkmask: false,
				pullrefresh: null
			};
		},
		created: function() {

		},
		methods: {
			favoriteFilter(type) {
				this.filterType = type;
			},
			getdata: function(pager, callback) {
				var that = this;
				var params = {
					page_index: pager.row_start_number,
					page_size: pager.row_count
				};
				muiUtils.muiAjax(api.COMMON_API.test_api, {
					type: "post",
					data: params,
					contentType: 'application/json',
					dataType: "json",
					success: function(data) {
//						callback(data.result_data);
						if(data.header.code === CONSTS.ERROR_CODE.SUCCESS) {
							callback(data);
						} else {
							mui.toast(data.msg);
							callback(null);
						}
					},
					error: function(xhr, type, errorThrown) {
						mui.toast("数据请求失败！");
						callback(null);
					},
					loading: false
				});
			},
			itemtap: function(item) {
				muiUtils.openWindow('../../bizpage/device/deviceinfo.html', 'bizpage_device_deviceinfo', {
					extras: {
						url: '../../bizpage/device/deviceinfo.html'
					}
				});
			}
		},
		ready: function() {
			var that = this;
			var deceleration = mui.os.ios ? 0.003 : 0.0009;
			mui('.mui-scroll-wrapper').scroll({
				bounce: true,
				indicators: true, //是否显示滚动条
				deceleration: deceleration
			});
		},
		components: {
			nonetworkmask,
			listctrl
		}
	};
</script>
<style>
	.deviceList {
		position: absolute;
		top: 45px;
		bottom: 0;
		width: 100%;
	}
	
	.deviceList .mui-scroll-wrapper {
		top: 45px;
	}
	
	.deviceList .conditions {
		line-height: 25px;
		padding: 10px 0;
		text-align: center;
	}
	
	.deviceList .conditions a {
		color: #000;
		width: 23%;
		position: relative;
	}
	
	.deviceList .conditions a:nth-child(1) ,
	.deviceList .conditions a:nth-child(2) ,
	.deviceList .conditions a:nth-child(3) {
		border-right: solid 1px #ddd;
	}
	
	/*.deviceList .conditions a:after {
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
	}*/
	
	.deviceList .advertisement {
		width: 100%;
		height: 120px;
		margin-bottom: 8px;
	}
	
	.filterActive{
		color:#26c6da;
	}
</style>