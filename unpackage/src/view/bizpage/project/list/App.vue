<template>
	<div class="projectList">
		<p class="conditions">
			<a href="javascript: void(0)" @tap="selectAddress">{{address.county || address.city || address.province}}</a>
			<a href="javascript: void(0)" @tap="selectSortType">{{sortType.text}}</a>
		</p>
		<div id="scroll" class="mui-scroll-wrapper">
			<div id="pullrefresh" class="mui-scroll">
				<div class="advertisement">
					<img v-if="adType == 'oneImg'" :src="imageDatas[0].banner_img_url" @tap="bannerTap(imageDatas[0])">
					<imageslider v-if="adType == 'loopImg'" :images="imageDatas" :item-tap="bannerTap" :indicator-display="indicatorDisplay"></imageslider>
					<template v-if="adType == 'alliance'">{{{allianceCode}}}</template>
				</div>
				<div class="oneProject" v-for="project in projectList" @tap="gotoDetail(project.id)">
					<img :src="project.imgName" />
					<div class="projectInfo">
						<p class="mui-ellipsis">{{project.projectName}}</p>
						<p>{{project.createTime}}<span class="mui-pull-right mui-ellipsis address">{{project.address}}</span></p>
						<p>
							<img v-show="project.realNameAuthentication == 1" src="../../../../static/img/mine/shimingrenzheng.svg">
							<img v-else src="../../../../static/img/mine/noshimingrenzheng.svg">
							<img v-show="project.enterpriseCertification == 1" src="../../../../static/img/mine/qiyerenzheng.svg">
							<img v-else src="../../../../static/img/mine/noqiyerenzheng.svg">
							<span class="mui-pull-right">距离：{{project.distance}}KM</span>
						</p>
						<p>
							<a href="javascript:void(0)">立即联系</a><span class="mui-pull-right">...</span></p>
					</div>
				</div>
				<p v-show="!projectList || projectList.length === 0" class="noData">暂无数据</p>
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
				for(var city of cityData.children) {;
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
				sortType: {
					value: 0,
					text: '默认排序',
				},
				pullrefresh: null,
				projectList: [],
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
			gotoDetail: function(id) {
				muiUtils.openWindow('../../bizpage/project/projectinfo.html', '../../bizpage/project/projectinfo.html', {
					extras: {
						projectId: id
					}
				});
			},
			getData(loading) {
				var that = this;
				muiUtils.muiAjax(api.APIS.project.getProjectList, {
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
						lng: this.lng,
						lat: this.lat,
						sortType: this.sortType.value
					}),
					success: function(data) {
						if(data.erroCode === CONSTS.ERROR_CODE.SUCCESS) {
							var projectList = data.result.projectList || [];
							for(var project of projectList) {
								project.imgName = project.imgName ? (data.result.imgServer + that.dealPicture(project.imgName)) : '1';
							}
							that.projectList = projectList;
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
				muiUtils.muiAjax(api.APIS.project.getProjectList, {
					dataType: "json",
					contentType: 'application/json',
					type: "post",
					data: JSON.stringify({
						rowStartNumber: this.projectList.length,
						rowCount: 10,
						keyword: this.searchValue,
						provinceId: this.address.provinceid,
						cityId: this.address.cityid,
						countyId: this.address.countyid,
						lng: this.lng,
						lat: this.lat,
						sortType: this.sortType.value
					}),
					success: function(data) {
						if(data.erroCode === CONSTS.ERROR_CODE.SUCCESS) {
							if(!data.result.projectList || data.result.projectList.length === 0) {
								that.pullrefresh.endPullUpToRefresh(true);
								return;
							}
							for(var project of data.result.projectList || []) {
								project.imgName = project.imgName ? (data.result.imgServer + that.dealPicture(project.imgName)) : '1';
							}
							that.projectList = that.projectList.concat(data.result.projectList || []);
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
	.projectList {
		position: absolute;
		top: 45px;
		bottom: 0;
		width: 100%;
	}
	
	.projectList .mui-scroll-wrapper {
		top: 45px;
	}
	
	.projectList .conditions {
		line-height: 25px;
		padding: 10px 0;
		text-align: center;
	}
	
	.projectList .conditions a {
		color: #000;
		width: 48%;
		position: relative;
	}
	
	.projectList .conditions a:nth-child(1) {
		border-right: solid 1px #ddd;
	}
	
	.projectList .conditions a:after {
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
	
	.projectList .advertisement {
		width: 100%;
		height: 120px;
		margin-bottom: 8px;
	}
	
	.projectList .advertisement img {
		width: 100%;
		height: 120px;
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
		padding: 5px 8px;
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
	
	.mui-poppicker {
		top: 90px;
		bottom: auto;
		transform: translateY(-390px);
	}
	
	.noData {
		line-height: 250px;
		text-align: center;
	}
	
	.mui-slider {
		height: 120px;
	}
	
	.address {
		max-width: 100px;
	}
</style>