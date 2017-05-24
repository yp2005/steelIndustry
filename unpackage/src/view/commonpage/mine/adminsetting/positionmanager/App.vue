<template>
	<div class="mui-scroll-wrapper positionmanager">
		<div class="mui-scroll">
			<div class="title">首页广告位</div>
			<div class="inputRow">
				<label>广告类型</label>
				<span>轮播图</span>
			</div>
			<div class="inputRow">
				<ul class="mui-table-view mui-grid-view">
					<template v-for="(index,advert) in homePage">
						<li class="mui-table-view-cell mui-col-xs-3">
							<img :src="advert.img">
							<div>
								<p class="div-p mui-ellipsis">{{advert.title}}</p>
							</div>
							<a href="javascript:void(0);" @tap="delAdvert(0,index)" class="mui-btn mui-btn-primary mui-btn-outlined"><span class="mui-icon mui-icon-trash"></span></a>
						</li>
					</template>
					<li class="mui-table-view-cell mui-col-xs-3">
						<div class="positionAddAdvertDiv" @tap="pickAdvert(0)">
							<a href="javascript:void(0)" class="positionAddAdvertDiv_add mui-icon mui-icon-plusempty">
							</a>
							<span>选择广告</span>
						</div>
					</li>
				</ul>
			</div>
			<div class="title">列表广告位</div>
			<div class="inputRow" @tap="selectListPageAdType()">
				<label>广告类型</label>
				<span>{{listPageAdTypeName}}</span>
			</div>
			<div v-if="appSetting.listPageAdType == 'alliance'" class="inputRow">
				<p>广告联盟代码</p>
				<div>
					<textarea id="textarea" v-model="alliance.content" placeholder="请输入广告联盟代码" @input="textAreaInput"></textarea>
				</div>
			</div>
			<div v-else class="inputRow">
				<ul class="mui-table-view mui-grid-view">
					<template v-for="(index,advert) in listPage">
						<li class="mui-table-view-cell mui-col-xs-3">
							<img :src="advert.img">
							<div>
								<p class="div-p mui-ellipsis">{{advert.title}}</p>
							</div>
							<a href="javascript:void(0);" @tap="delAdvert(1,index)" class="mui-btn mui-btn-primary mui-btn-outlined"><span class="mui-icon mui-icon-trash"></span></a>
						</li>
					</template>
					<li class="mui-table-view-cell mui-col-xs-3">
						<div class="positionAddAdvertDiv" @tap="pickAdvert(1)">
							<a href="javascript:void(0)" class="positionAddAdvertDiv_add mui-icon mui-icon-plusempty">
							</a>
							<span>选择广告</span>
						</div>
					</li>
				</ul>
			</div>

			<div class="title">详情广告位</div>
			<div class="inputRow" @tap="selectDetailPageAdType()">
				<label>广告类型</label>
				<span>{{detailPageAdTypeName}}</span>
			</div>
			<div v-if="appSetting.detailPageAdType == 'alliance'" class="inputRow">
				<p>广告联盟代码</p>
				<div>
					<textarea id="textarea" v-model="alliance.content" placeholder="请输入广告联盟代码" @input="textAreaInput"></textarea>
				</div>
			</div>
			<div v-else class="inputRow">
				<ul class="mui-table-view mui-grid-view">
					<template v-for="(index,advert) in detailPage">
						<li class="mui-table-view-cell mui-col-xs-3">
							<img :src="advert.img">
							<div>
								<p class="div-p mui-ellipsis">{{advert.title}}</p>
							</div>
							<a href="javascript:void(0);" @tap="delAdvert(2,index)" class="mui-btn mui-btn-primary mui-btn-outlined"><span class="mui-icon mui-icon-trash"></span></a>
						</li>
					</template>
					<li class="mui-table-view-cell mui-col-xs-3">
						<div class="positionAddAdvertDiv" @tap="pickAdvert(2)">
							<a href="javascript:void(0)" class="positionAddAdvertDiv_add mui-icon mui-icon-plusempty">
							</a>
							<span>选择广告</span>
						</div>
					</li>
				</ul>
			</div>
			<div class="bottomBtn">
				<a href="javascript:void(0)" @tap="sumbmit">保存修改</a>
			</div>
		</div>
	</div>
</template>

<script>
	import muiUtils from 'common/muiUtils';
	import log from 'common/logUtils';
	import api from 'api';
	import CONSTS from 'common/consts';
	import cacheUtils from 'common/cacheUtils';
	export default {
		data: function() {
			var appSetting = cacheUtils.localStorage(CONSTS.SYSTEM).getObject(CONSTS.APPSETTINGS);
			var pickerData = [{
				value: 'loopImg',
				text: '轮播图',
			}, {
				value: 'oneImg',
				text: '单个图片',
			}, {
				value: 'alliance',
				text: '广告联盟',
			}];
			var listPagePicker = new mui.PopPicker({
				layer: 1
			});
			listPagePicker.setData(pickerData);

			var detailPagePicker = new mui.PopPicker({
				layer: 1
			});
			detailPagePicker.setData(pickerData);
			return {
				appSetting: appSetting,
				homePage: [],
				listPage: [],
				detailPage: [],
				alliance: {
					content: ''
				},
				listPageAdTypeName: appSetting.listPageAdType == 'alliance' ? '广告联盟' : (appSetting.listPageAdType == 'loopImg' ? '轮播图' : '单个图片'),
				detailPageAdTypeName: appSetting.detailPageAdType == 'alliance' ? '广告联盟' : (appSetting.listPageAdType == 'loopImg' ? '轮播图' : '单个图片'),
				listPagePicker: listPagePicker,
				detailPagePicker: detailPagePicker
			};
		},
		created() {
			var that = this;
			muiUtils.muiAjax(api.APIS.adRelation.getAdInfo, {
				dataType: "json",
				type: "get",
				success: function(data) {
					if(data.erroCode === CONSTS.ERROR_CODE.SUCCESS) {
						for(var ad of data.result.homePage || []) {
							ad.img = data.result.imgServer + that.dealPicture(ad.img);
						}
						for(var ad of data.result.listPage || []) {
							ad.img = data.result.imgServer + that.dealPicture(ad.img);
						}
						for(var ad of data.result.detailPage || []) {
							ad.img = data.result.imgServer + that.dealPicture(ad.img);
						}
						that.homePage = data.result.homePage || [];
						that.listPage = data.result.listPage || [];
						that.detailPage = data.result.detailPage || [];
						that.alliance = data.result.alliance || {
							content: ''
						};
					} else {
						mui.toast(data.erroCode + '：' + data.erroMsg);
					}
				},
				error: function(xhr, type, errorThrown) {
					mui.toast('服务器或网络异常，请稍后重试。');
				}
			});
		},
		methods: {
			dealPicture(pic) {
				var fileName = pic.substring(pic.lastIndexOf('/') + 1, pic.length);
				var path = pic.substring(0, pic.lastIndexOf('/'));
				return path + '/small_' + fileName;
			},
			selectListPageAdType: function() {
				var that = this;
				this.listPagePicker.show(function(items) {
					that.listPageAdTypeName = items[0].text;
					that.appSetting.listPageAdType = items[0].value;
				});
			},
			selectDetailPageAdType: function() {
				var that = this;
				this.detailPagePicker.show(function(items) {
					that.detailPageAdTypeName = items[0].text;
					that.appSetting.detailPageAdType = items[0].value;
				});
			},
			pickAdvert: function(position) {
				muiUtils.openWindow('../../commonpage/positionmanager/selectad.html', '../../commonpage/positionmanager/selectad.html', {
					extras: {
						position: position
					}
				});
			},
			delAdvert: function(position, index) {
				switch(position) {
					case 0:
						this.homePage.splice(index, 1);
						break;
					case 1:
						this.listPage.splice(index, 1);
						break;
					case 2:
						this.detailPage.splice(index, 1);
						break;
				}
			},
			sumbmit() {
				/*if(!this.homePage || this.homePage.length === 0) {
					mui.toast("请设置首页广告！");
					return;
				}
				if(this.appSetting.listPageAdType != 'alliance' && (!this.listPage || this.listPage.length === 0)) {
					mui.toast("请设置列表页广告！");
					return;
				}
				if(this.appSetting.detailPageAdType != 'alliance' && (!this.detailPage || this.detailPage.length === 0)) {
					mui.toast("请设置详情页页广告！");
					return;
				}
				if((this.appSetting.listPageAdType == 'alliance' || this.appSetting.detailPageAdType == 'alliance') && !this.alliance.content) {
					mui.toast("请输入广告联盟代码！");
					return;
				}*/
				var data = {
					listPageAdType: this.appSetting.listPageAdType,
					detailPageAdType: this.appSetting.detailPageAdType
				};
				var hasAlliance = false;
				var homePage = [];
				for(var ad of this.homePage) {
					homePage.push(ad.id);
				}
				var listPage = [];
				if(this.appSetting.listPageAdType != 'alliance') {
					for(var ad of this.listPage) {
						listPage.push(ad.id);
					}
				} else {
					hasAlliance = true;
				}
				var detailPage = [];
				if(this.appSetting.detailPageAdType != 'alliance') {
					for(var ad of this.detailPage) {
						detailPage.push(ad.id);
					}
				} else {
					hasAlliance = true;
				}
				data.homePage = homePage;
				data.listPage = listPage;
				data.detailPage = detailPage;
				if(hasAlliance) {
					this.saveAlliance(data);
				} else {
					this.saveAppAdvertisement(data);
				}
			},
			saveAlliance(adData) {
				var that = this;
				that.alliance.title = '广告联盟';
				that.alliance.linkType = 'alliance';
				muiUtils.muiAjax(api.APIS.advertisement.advertisement, {
					dataType: "json",
					contentType: 'application/json',
					type: "post",
					data: JSON.stringify(that.alliance),
					success: function(data) {
						if(data.erroCode === CONSTS.ERROR_CODE.SUCCESS) {
							that.saveAppAdvertisement(adData);
						} else {
							mui.toast(data.erroCode + '：' + data.erroMsg);
						}
					},
					error: function(xhr, type, errorThrown) {
						mui.toast('服务器或网络异常，请稍后重试。');
					}
				});
			},
			saveAppAdvertisement(data) {
				var that = this;
				muiUtils.muiAjax(api.APIS.adRelation.saveAppAdvertisement, {
					data: JSON.stringify(data),
					contentType: 'application/json',
					dataType: "json",
					type: "post",
					success: function(data) {
						if(data.erroCode === CONSTS.ERROR_CODE.SUCCESS) {
							mui.toast('修改成功');
							cacheUtils.localStorage(CONSTS.SYSTEM).setObject(CONSTS.APPSETTINGS, that.appSetting);
							mui.back();
						} else {
							mui.toast(data.erroCode + '：' + data.erroMsg);
						}
					},
					error: function(xhr, type, errorThrown) {
						mui.toast('服务器或网络异常，请稍后重试。');
					}
				});
			}
		},
		ready: function() {
			var that = this;
			mui('.mui-scroll-wrapper.positionmanager').scroll({
				bounce: true,
				indicators: false, // 是否显示滚动条
				deceleration: mui.os.ios ? 0.003 : 0.0009
			});
			window.addEventListener('position_advertpick', function(e) {
				var position = e.detail.position;
				switch(position) {
					case 0:
						that.homePage = e.detail.adverts;
						break;
					case 1:
						that.listPage = e.detail.adverts;
						break;
					case 2:
						that.detailPage = e.detail.adverts;
						break;
				}
			});
		}
	};
</script>
<style>
	.positionmanager {
		position: absolute;
		top: 45px;
		bottom: 0;
		width: 100%;
	}
	
	.positionmanager textarea,
	.positionmanager label {
		font-size: 14px;
	}
	
	.positionmanager .inputRow {
		color: #333;
		line-height: 30px;
		padding: 10px;
		position: relative;
		background-color: #fff;
		overflow: hidden;
	}
	
	.positionmanager .inputRow:after {
		content: "";
		height: 1px;
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #d7d7d7;
		transform: scaleY(0.5);
	}
	
	.positionmanager .title {
		background-color: #ddd;
		padding: 5px;
		font-size: 15px;
		color: #222;
	}
	
	.positionmanager .inputRow label {
		width: 100px;
		float: left;
	}
	
	.positionmanager .inputRow>span {
		font-size: 15px;
	}
	
	.positionmanager textarea {
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
	}
	
	.bottomBtn a {
		line-height: 35px;
		text-align: center;
		font-size: 15px;
		width: 100%;
		color: #fff;
		background-color: #26c6da;
		border: solid 1px #26c6da;
		border-radius: 3px;
	}
	
	.mui-input-row .mui-btn {
		float: none;
		width: auto;
		margin: 10px;
	}
	
	.mui-icon-trash {
		font-size: 20px !important;
		background-color: red;
		border-radius: 50%;
		color: #ffffff;
	}
	
	.mui-table-view-cell a {
		border: 0;
		border-radius: 0;
	}
	
	.mui-table-view-cell img {
		height: 45px;
		width: 75px;
	}
	
	.mui-table-view-cell>.mui-btn {
		top: 14px;
		right: -12px;
	}
	
	.mui-table-view.mui-grid-view .mui-table-view-cell {
		padding-top: 10px !important;
		padding-left: 5px !important;
		padding-right: 5px !important;
		margin-right: 0;
	}
	
	.positionAddAdvertDiv {
		width: 75px;
		height: 75px;
		background-color: #f3f5f7;
		text-align: center;
		padding: 10px;
	}
	
	.positionAddAdvertDiv span {
		color: #999;
		font-size: 12px;
		margin: -10px 0px 0px 0px;
		display: inherit;
	}
	
	.positionAddAdvertDiv_add {
		font-size: 40px;
		height: 30px;
		color: #999;
	}
</style>