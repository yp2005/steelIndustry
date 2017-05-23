<template>
	<div id="scroll" class="mui-scroll-wrapper adList">
		<div id="pullrefresh" class="mui-scroll">
			<div class="oneAd" v-for="ad in adList" @tap="select($index)">
				<img :src="ad.img" />
				<div class="adInfo">
					<p class="mui-ellipsis">{{ad.title}}</p>
					<p>{{ad.linkType == 'innerLink' ? '内部链接' : (ad.linkType == 'outerLink' ? '外部链接' : '广告联盟')}}</p>
					<p>
						<a href="javascript:void(0)" @tap="edit($index, $event)">编辑</a>
					</p>
				</div>
				<span v-show="ad.selected" class="mui-icon mui-icon-checkmarkempty"></span>
			</div>
			<p v-show="!adList || adList.length === 0" class="noData">暂无数据</p>
		</div>
	</div>
	<div class="bottomBtn">
		<span>已选广告：{{selectedNum}}个</span>
		<a href="javascript:void(0)" class="{{selectedNum > 0 ? 'active' : ''}}" @tap="save">确定</a>
	</div>
</template>

<script>
	import muiUtils from 'common/muiUtils';
	import log from 'common/logUtils';
	import api from 'api';
	import CONSTS from 'common/consts';
	export default {
		data: function() {
			return {
				pullrefresh: null,
				adList: [],
				adListBak: [],
				selectedNum: 0,
				position: plus.webview.currentWebview().position,
				imgServer: ''
			};
		},
		created: function() {
			this.getData(true);
		},
		methods: {
			save() {
				var adverts = [];
				for(var ad of this.adList) {
					if(ad.selected) {
						adverts.push(ad);
					}
				}
				mui.fire(plus.webview.getWebviewById('../../commonpage/adminsetting/positionmanager.html'), 'position_advertpick', {
					position: this.position,
					adverts: adverts
				});
				mui.back();
			},
			select(index) {
				this.adList[index].selected = !this.adList[index].selected
				if(this.adList[index].selected) {
					this.selectedNum++;
				} else {
					this.selectedNum--;
				}
			},
			edit(index, e) {
				var ad = this.adListBak[index];
				muiUtils.openWindow('../../commonpage/advertisingmanager/editadvertising.html', '../../commonpage/advertisingmanager/editadvertising.html', {
					extras: {
						ad: ad,
						fromPage: '../../commonpage/positionmanager/selectad.html',
						imgServer: this.imgServer
					}
				});
				e.stopPropagation();
			},
			getData(loading) {
				var that = this;
				muiUtils.muiAjax(api.APIS.advertisement.getAdList, {
					dataType: "json",
					contentType: 'application/json',
					type: "post",
					data: JSON.stringify({
						rowStartNumber: 0,
						rowCount: 10
					}),
					success: function(data) {
						if(data.erroCode === CONSTS.ERROR_CODE.SUCCESS) {
							that.imgServer = data.result.imgServer;
							var adList = data.result.adList || [];
							that.adListBak = JSON.parse(JSON.stringify(adList));
							for(var ad of that.adListBak ) {
								ad.img = ad.img ? (data.result.imgServer + ad.img) : '1';
							}
							for(var ad of adList) {
								ad.img = ad.img ? (data.result.imgServer + '/small_' + ad.img) : '1';
								ad.selected = false;
							}
							that.adList = adList;
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
			loadMore() {
				var that = this;
				muiUtils.muiAjax(api.APIS.advertisement.getAdList, {
					dataType: "json",
					contentType: 'application/json',
					type: "post",
					data: JSON.stringify({
						rowStartNumber: this.adList.length,
						rowCount: 10
					}),
					success: function(data) {
						if(data.erroCode === CONSTS.ERROR_CODE.SUCCESS) {
							if(!data.result.adList || data.result.adList.length === 0) {
								that.pullrefresh.endPullUpToRefresh(true);
								return;
							}
							var adList = data.result.adList || [];
							var adListBak = JSON.parse(JSON.stringify(adList));
							for(var ad of adListBak) {
								ad.img = ad.img ? (data.result.imgServer + ad.img) : '1';
								ad.selected = false;
							}
							that.adListBak = that.adListBak.concat(adListBak);
							for(var ad of adList) {
								ad.img = ad.img ? (data.result.imgServer + '/small_' + ad.img) : '1';
								ad.selected = false;
							}
							that.adList = that.adList.concat(adList);
						} else {
							mui.toast(data.erroCode + '：' + data.erroMsg);
						}
						that.pullrefresh.endPullUpToRefresh();
					},
					error: function(xhr, type, errorThrown) {
						that.pullrefresh.endPullUpToRefresh();
						mui.toast('服务器或网络异常，请稍后重试。')
					},
					loading: false
				});
			},
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
						that.getData(false);
					}
				},
				up: {
					offset: 50,
					callback: function() {
						that.loadMore();
					}
				}
			});
			window.addEventListener('getData', function(e) {
				that.getData(true);
			});
		}
	};
</script>
<style>
	.adList {
		position: absolute;
		top: 45px;
		bottom: 50px;
		width: 100%;
	}
	
	.adList .conditions {
		line-height: 25px;
		padding: 10px 0;
		text-align: center;
	}
	
	.adList .conditions a {
		color: #000;
		width: 32%;
		position: relative;
	}
	
	.adList .conditions a:nth-child(1),
	.adList .conditions a:nth-child(2) {
		border-right: solid 1px #ddd;
	}
	
	.adList .conditions a:after {
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
	
	.adList .advertisement {
		width: 100%;
		height: 120px;
		margin-bottom: 8px;
	}
	
	.oneAd {
		padding: 10px;
		background-color: #fff;
		margin-bottom: 8px;
		position: relative;
	}
	
	.oneAd img {
		float: left;
		width: 80px;
		height: 80px;
	}
	
	.oneAd .mui-icon-checkmarkempty {
		color: #26c6da;
		font-weight: 600;
		position: absolute;
		top: 22px;
		right: 15px;
		font-size: 80px;
		z-index: 1;
	}
	
	.oneAd .adInfo {
		padding-left: 90px;
		min-height: 80px;
	}
	
	.oneAd .adInfo p {
		font-size: 13px;
	}
	
	.oneAd .adInfo p:nth-child(1) {
		color: #000;
		font-size: 14px;
	}
	
	.oneAd .adInfo p:nth-child(3) a {
		color: #fff;
		background-color: #26c6da;
		line-height: 1;
		padding: 5px 8px;
		border-radius: 3px;
		margin: 5px 0;
	}
	
	.oneAd .adInfo p:nth-child(3) a:nth-child(2) {
		color: red;
		background-color: #fff;
		border: solid 1px red;
		margin-left: 12px;
	}
	
	.oneAd .adInfo p:nth-child(3) span {
		line-height: 1;
		margin-top: 4px;
		font-size: 19px;
		font-weight: 800;
		color: #777;
	}
	
	.mui-poppicker {
		top: 90px;
		bottom: auto;
		transform: translateY(-390px);
	}
	
	.noData {
		line-height: 250px;
		text-align: center;
	}
	
	.bottomBtn {
		position: fixed;
		bottom: 0;
		height: 50px;
		width: 100%;
		background-color: #fff;
	}
	
	.bottomBtn span {
		line-height: 40px;
		padding-left: 15px;
		color: #26c6da;
	}
	
	.bottomBtn a {
		line-height: 50px;
		color: #fff;
		background-color: #ccc;
		padding: 0 30px;
		float: right;
	}
	
	.bottomBtn a.active {
		background-color: #26c6da;
	}
</style>