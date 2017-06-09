/** * @file 名片列表主组件 * @Author yupeng * @private */

<template>
	<div class="masterList">
		<p class="conditions">
			<a href="javascript: void(0)" @tap="selectAddress">{{address.county || address.city || address.province}}</a>
			<a href="javascript: void(0)" @tap="selectType">{{type.child.text || type.text}}</a>
			<a href="javascript: void(0)" @tap="selectSortType">{{sortType.text}}</a>
		</p>
		<div id="scroll" class="mui-scroll-wrapper">
			<div id="pullrefresh" class="mui-scroll">
				<div class="advertisement">
					<img v-if="adType == 'oneImg'" :src="imageDatas[0].banner_img_url" @tap="bannerTap(imageDatas[0])">
					<imageslider v-if="adType == 'loopImg'" :images="imageDatas" :item-tap="bannerTap" :indicator-display="indicatorDisplay"></imageslider>
					<template v-if="adType == 'alliance'">{{{allianceCode}}}</template>
				</div>
				<div class="oneMaster" v-for="master in masterList" @tap="gotoDetail(master.userId)">
					<img :src="master.imgName" />
					<div class="masterInfo">
						<p class="mui-ellipsis">{{master.cardTitle}}</p>
						<p><span class="mui-ellipsis worktype">{{master.workerTypes}}</span><span class="mui-pull-right mui-ellipsis area">{{master.serviceArea || '全国'}}</span></p>
						<p>
							<img v-show="master.realNameAuthentication == 1" src="../../../../static/img/mine/shimingrenzheng.svg">
							<img v-else src="../../../../static/img/mine/noshimingrenzheng.svg">
						</p>
						<p>
							<a href="javascript:void(0)">立即联系</a><span class="mui-pull-right">...</span></p>
					</div>
				</div>
				<p v-show="!masterList || masterList.length === 0" class="noData">暂无数据</p>
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
	import imageslider from 'component/slider/ImageSlider';
	export default {
		data: function() {
			var cityPicker = new mui.PopPicker({
				layer: 3
			});
			for(var cityData of cityData3Lev) {
				for(var city of cityData.children) {
					city.children.unshift({
						value: -1,
						area_parent_id: city.value,
						text: '全' + city.text,
						area_sort: 0,
						area_deep: 3,
						description: null
					});
				}
				cityData.children.unshift({
					value: -1,
					area_parent_id: cityData.value,
					text: '全' + cityData.text,
					area_sort: 0,
					area_deep: 2,
					description: null
				});
			}
			cityData3Lev.unshift({
				value: -1,
				area_parent_id: 0,
				text: '全国',
				area_sort: 0,
				area_deep: 1,
				description: null
			});
			cityPicker.setData(cityData3Lev);

			var typePicker = new mui.PopPicker({
				layer: 2
			});
			var typeData = [{
				value: '0',
				text: '不限',
			}, {
				value: '1',
				text: '彩钢厂',
				children: [{
					value: '10',
					text: '不限',
				}, {
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
					value: '20',
					text: '不限',
				}, {
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
					value: '30',
					text: '不限',
				}, {
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
			typePicker.setData(typeData);
			var sortTypePicker = new mui.PopPicker({
				layer: 1
			});
			sortTypePicker.setData([{
				value: 0,
				text: '默认排序',
			}, {
				value: 1,
				text: '时间',
			}, {
				value: 2,
				text: '距离',
			}]);
			return {
				cityPicker: cityPicker,
				typePicker: typePicker,
				typeData: typeData,
				sortTypePicker: sortTypePicker,
				searchValue: plus.webview.currentWebview().searchValue || '',
				address: plus.webview.currentWebview().address || {
					province: '全国',
					provinceid: -1,
					city: null,
					cityid: null,
					county: null,
					countyid: null
				},
				type: {
					value: '0',
					text: '工种',
					child: {}
				},
				sortType: {
					value: 0,
					text: '默认排序',
				},
				pullrefresh: null,
				masterList: [],
				lng: undefined,
				lat: undefined,
				adType: 'oneImg',
				imageDatas: [{
					banner_img_url: require('static/img/listPageBanner.jpg'),
				}],
				allianceCode: '',
				indicatorDisplay: false
			};
		},
		created: function() {
			var that = this;
			plus.geolocation.getCurrentPosition(function(position) {
				that.lng = position.coords.longitude || 1;
				that.lat = position.coords.latitude || 1;
				that.getData(true);
			}, function(e) {
				that.lng = 1;
				that.lat = 1;
				that.getData(true);
			}, {
				provider: 'baidu',
				timeout: 8000
			});
			muiUtils.muiAjax(api.APIS.advertisement.getPositionAds + '?position=listPage', {
				dataType: "json",
				type: "get",
				success: function(data) {
					if(data.erroCode === CONSTS.ERROR_CODE.SUCCESS) {
						if(data.result.adType == 'alliance') {
							if(data.result.adData) {
								that.adType = 'alliance';
								that.allianceCode = data.result.adData;
							}
						} else if(data.result.adType == 'loopImg') {
							if(data.result.adData && data.result.adData.length > 0) {
								var imageDatas = [];
								for(var ad of data.result.adData) {
									if(ad.linkType === 'innerLink') {
										imageDatas.push({
											banner_img_url: data.result.imgServer + ad.img,
											banner_url: ad.deviceId,
											banner_name: ad.title,
											banner_order: ad.id,
											linkType: 'innerLink'
										});
									} else {
										imageDatas.push({
											banner_img_url: data.result.imgServer + ad.img,
											banner_url: ad.url,
											banner_name: ad.title,
											banner_order: ad.id,
											linkType: 'outerLink'
										});
									}
								}
								that.adType = 'loopImg';
								that.imageDatas = imageDatas;
							}
						} else if(data.result.adType == 'oneImg') {
							if(data.result.adData) {
								var imageDatas = [];
								var ad = data.result.adData;
								if(ad.linkType === 'innerLink') {
									imageDatas.push({
										banner_img_url: data.result.imgServer + ad.img,
										banner_url: ad.deviceId,
										banner_name: ad.title,
										banner_order: ad.id,
										linkType: 'innerLink'
									});
								} else {
									imageDatas.push({
										banner_img_url: data.result.imgServer + ad.img,
										banner_url: ad.url,
										banner_name: ad.title,
										banner_order: ad.id,
										linkType: 'outerLink'
									});
								}
								that.adType = 'oneImg';
								that.imageDatas = imageDatas;
							}
						}
					}
				},
				error: function(xhr, type, errorThrown) {},
				loading: false
			});
		},
		methods: {
			dealPicture(pic) {
				var fileName = pic.substring(pic.lastIndexOf('/') + 1, pic.length);
				var path = pic.substring(0, pic.lastIndexOf('/'));
				return path + '/small_' + fileName;
			},
			bannerTap(item) {
				if(item.linkType == 'innerLink') {
					this.gotoDeviceDetail(item.banner_url);
				} else if(item.linkType == 'outerLink') {
					plus.runtime.openURL(item.banner_url);
				}
			},
			gotoDeviceDetail(id) {
				muiUtils.openWindow('../../bizpage/device/deviceinfo.html', '../../bizpage/device/deviceinfo.html', {
					extras: {
						deviceId: id
					}
				});
			},
			gotoDetail: function(userId) {
				muiUtils.openWindow('../../bizpage/master/masterinfo.html', '../../bizpage/master/masterinfo.html', {
					extras: {
						userId: userId
					}
				});
			},
			getData(loading) {
				var typeIds = [];
				if(this.type.value > 0) {
					if(this.type.child.value) {
						typeIds.push(this.type.child.value);
					} else {
						for(var type of this.typeData) {
							if(type.value == this.type.value) {
								for(var type2 of type.children) {
									typeIds.push(type2.value);
								}
								break;
							}
						}
					}
				}
				var that = this;
				muiUtils.muiAjax(api.APIS.masterCard.getMasterCardList, {
					dataType: "json",
					contentType: 'application/json',
					type: "post",
					data: JSON.stringify({
						rowStartNumber: 0,
						rowCount: 10,
						keyword: this.searchValue,
						provinceId: this.address.provinceid,
						cityId: this.address.cityid,
						countyId: this.address.countyid,
						typeIds: typeIds,
						lng: this.lng,
						lat: this.lat,
						sortType: this.sortType.value
					}),
					success: function(data) {
						if(data.erroCode === CONSTS.ERROR_CODE.SUCCESS) {
							var masterList = data.result.masterCardList || [];
							for(var master of masterList) {
								master.imgName = master.imgName ? (data.result.imgServer + that.dealPicture(master.imgName)) : '1';
							}
							that.masterList = masterList;
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
				var typeIds = [];
				if(this.type.value > 0) {
					if(this.type.child.value) {
						typeIds.push(this.type.child.value);
					} else {
						for(var type of this.typeData) {
							if(type.value == this.type.value) {
								for(var type2 of type.children) {
									typeIds.push(type2.value);
								}
								break;
							}
						}
					}
				}
				var that = this;
				muiUtils.muiAjax(api.APIS.masterCard.getMasterCardList, {
					dataType: "json",
					contentType: 'application/json',
					type: "post",
					data: JSON.stringify({
						rowStartNumber: this.masterList.length,
						rowCount: 10,
						keyword: this.searchValue,
						provinceId: this.address.provinceid,
						cityId: this.address.cityid,
						countyId: this.address.countyid,
						typeIds: typeIds,
						lng: this.lng,
						lat: this.lat,
						sortType: this.sortType.value
					}),
					success: function(data) {
						if(data.erroCode === CONSTS.ERROR_CODE.SUCCESS) {
							if(!data.result.masterCardList || data.result.masterCardList.length === 0) {
								that.pullrefresh.endPullUpToRefresh(true);
								return;
							}
							for(var master of data.result.masterCardList || []) {
								master.imgName = master.imgName ? (data.result.imgServer + that.dealPicture(master.imgName)) : '1';
							}
							that.masterList = that.masterList.concat(data.result.masterCardList || []);
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
			selectAddress: function() {
				var that = this;
				this.cityPicker.show(function(items) {
					that.address = {
						province: items[0].text,
						provinceid: items[0].value,
						city: items[1].value && items[1].value !== -1 ? items[1].text : undefined,
						cityid: items[1].value && items[1].value !== -1 ? items[1].value : undefined,
						county: items[2].value && items[2].value !== -1 ? items[2].text : undefined,
						countyid: items[2].value && items[2].value !== -1 ? items[2].value : undefined
					}
				});
			},
			selectType: function() {
				var that = this;
				this.typePicker.show(function(items) {
					that.type = {
						text: items[0].text === '不限' ? '工种' : items[0].text,
						value: items[0].value,
						child: items[1] ? {
							text: items[1].text && items[1].text !== '不限' ? items[1].text : undefined,
							value: items[1].text && items[1].text !== '不限' ? items[1].value : undefined,
						} : {}
					}

				});
			},
			selectSortType: function() {
				var that = this;
				this.sortTypePicker.show(function(items) {
					that.sortType = {
						text: items[0].text,
						value: items[0].value
					}

				});
			}
		},
		watch: {
			searchValue: function() {
				this.getData(true);
			},
			'type.value': function() {
				this.getData(true);
			},
			'sortType.value': function() {
				this.getData(true);
			},
			'address.provinceid': function() {
				this.getData(true);
			},
			'address.cityid': function() {
				this.getData(true);
			},
			'address.countyid': function() {
				this.getData(true);
			}
		},
		components: {
			imageslider
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
		}
	};
</script>
<style>
	.masterList {
		position: absolute;
		top: 45px;
		bottom: 0;
		width: 100%;
	}
	
	.masterList .mui-scroll-wrapper {
		top: 45px;
	}
	
	.masterList .conditions {
		line-height: 25px;
		padding: 10px 0;
		text-align: center;
	}
	
	.masterList .conditions a {
		color: #000;
		width: 32%;
		position: relative;
	}
	
	.masterList .conditions a:nth-child(1),
	.masterList .conditions a:nth-child(2) {
		border-right: solid 1px #ddd;
	}
	
	.masterList .conditions a:after {
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
	
	.masterList .advertisement {
		width: 100%;
		height: 120px;
		margin-bottom: 8px;
	}
	
	.masterList .advertisement img {
		width: 100%;
		height: 120px;
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
		padding: 5px 8px;
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
	
	.noData {
		line-height: 250px;
		text-align: center;
	}
	
	.mui-poppicker {
		top: 90px;
		bottom: auto;
		transform: translateY(-390px);
	}
	
	.mui-slider {
		height: 120px;
	}
</style>