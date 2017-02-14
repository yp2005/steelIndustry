<template>
	<nonetworkmask :disnonetworkmask.sync="disnonetworkmask" :top="45" :bottom="0"></nonetworkmask>
	<div class="deviceList">
		<div id="scroll" class="mui-scroll-wrapper">
			<div id="pullrefresh" class="mui-scroll">
				<div class="oneStore" @tap="gotoDetail('id')">
					<img src="http://img1.imgtn.bdimg.com/it/u=1945716465,2733267266&fm=23&gp=0.jpg" />
					<div class="storeInfo">
						<p class="mui-ellipsis">名片名称</p>
						<p>哈哈</p>
						<p>2017-01-01</p>
						<p>不知道说啥</p>
						<p>
							<a href="javascript:void(0)">提交</a>
							<a href="javascript:void(0)">编辑</a>
							<a href="javascript:void(0)" style="color:red;border-color: red;">撤销</a>
							<a href="javascript:void(0)" style="color:red;border-color: red;">删除</a>
						</p>
					</div>
				</div>
				</a>
			</div>
		</div>
	</div>
</template>

<script>
	import nonetworkmask from 'component/mask/NoNetWorkMask';
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
				disnonetworkmask: false,
				pullrefresh: null
			};
		},
		methods: {
			gotoDetail: function(id) {
				muiUtils.openWindow('deviceinfo.html', {
                    extras: {
                        'id': id
                    }
               });
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
						that.getData();
					}
				},
				up: {
					offset: 50,
					callback: function() {
						that.loadMore();
					}
				}
			});
		},
		components: {
			nonetworkmask
		}
	};
</script>
<style>
	.deviceList {
		position: absolute;
		top: 0px;
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
		width: 32%;
		position: relative;
	}
	
	.deviceList .conditions a:nth-child(1),
	.deviceList .conditions a:nth-child(2) {
		border-right: solid 1px #ddd;
	}
	
	.deviceList .conditions a:after {
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
	
	.deviceList .advertisement {
		width: 100%;
		height: 120px;
		margin-bottom: 8px;
	}
	
	.oneStore {
		padding: 10px;
		background-color: #fff;
		margin-bottom: 8px;
	}
	
	.oneStore img {
		float: left;
		width: 106px;
		height: 106px;
	}
	
	.oneStore .storeInfo {
		padding-left: 116px;
		min-height: 80px;
	}
	
	.oneStore .storeInfo p {
		font-size: 13px;
	}
	
	.oneStore .storeInfo p:nth-child(1) {
		color: #000;
		font-size: 14px;
	}
	
	.oneStore .storeInfo p:nth-child(3) {
		overflow: hidden;
		/*padding: 5px 0;*/
	}
	
	.oneStore .storeInfo p:nth-child(3) img {
		width: 19px;
		height: 19px;
		margin-right: 4px;
	}
	
	.oneStore .storeInfo p:nth-child(5) a {
		color: #26c6da;
		line-height: 1;
		padding: 5px 8px;
		border-radius: 3px;
		margin: 5px 0;
		border: 1px solid #26c6da;
	}
	
	.oneStore .storeInfo p:nth-child(5) span {
		line-height: 1;
		margin-top: 4px;
		font-size: 19px;
		font-weight: 800;
		color: #777;
	}
</style>