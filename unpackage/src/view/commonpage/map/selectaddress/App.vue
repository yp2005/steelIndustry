<template>
	<div class="mapTop">
		<p><span>城市</span><span @tap="selectAddress">{{address ? address.province + ' ' + address.city + ' ' + address.district : '请选择'}}</span><span class="jxddicon icon-weizhi2xianxing mui-pull-right" @tap="userLocation">我的位置</span></p>
		<p>
			<span>详细地址</span>
			<input v-if="!isPositioning" type="text" v-model="address.street" id="street" @input="streetChange">
			<span v-else type="text" id="street">{{address.street}}</span>
			<a class="mui-pull-right" href="javascript:void(0)" @tap="back">确定</a>
		</p>
	</div>
	<div id="map">

	</div>
</template>

<script>
	import {
		cityData3Lev
	} from 'common/cityData';
	export default {
		data: function() {
			var cityPicker = new mui.PopPicker({
				layer: 3
			});
			cityPicker.setData(cityData3Lev);
			return {
				cityPicker: cityPicker,
				map: null,
				marker: null,
				cityData: cityData3Lev,
				address: plus.webview.currentWebview().address,
				// 是否是定位，定位则不能编辑地址
				isPositioning: plus.webview.currentWebview().isPositioning,
				fromPage: plus.webview.currentWebview().fromPage
			};
		},
		created: function() {

		},
		methods: {
			userLocation() {
				var that = this;
				var wt = plus.nativeUI.showWaiting('正在定位...');
				plus.geolocation.getCurrentPosition(function(position) {
					wt.close();
					var point = new plus.maps.Point(position.coords.longitude, position.coords.latitude);
					that.map.centerAndZoom(point, 15);
					that.marker.setPoint(point);
					var address = {};
					address.lng = position.coords.longitude;
					address.lat = position.coords.latitude;
					for(var data of that.cityData) {
						if(position.address.province.indexOf(data.text) != -1) {
							address.province = data.text;
							address.provinceid = data.value;
							for(var city of data.children) {
								if(city.text === position.address.city) {
									address.city = city.text;
									address.cityid = city.value;
									for(var district of city.children) {
										if(district.text === position.address.district) {
											address.district = district.text;
											address.districtid = district.value;
											break;
										}
									}
									break;
								}
							}
							break;
						}
					}
					address.street = position.address.street;
					that.address = address;
				}, function(e) {
					wt.close();
					mui.toast('获取地址失败，请重试！');
					that.back();
				}, {
					provider: 'baidu'
				});
			},
			createMarker() {
				var that = this;
				if(this.address) {
					var point = new plus.maps.Point(this.address.lng, this.address.lat);
					that.marker = new plus.maps.Marker(point);
					this.map.centerAndZoom(point, 15);
				}
				else {
					this.marker = new plus.maps.Marker(this.map.getCenter());
				}
				this.marker.setIcon('');
				this.marker.setLabel('');
				var bubble = new plus.maps.Bubble('');
				this.marker.setBubble(bubble);
				this.map.addOverlay(this.marker);
			},
			selectAddress: function() {
				var that = this;
				this.cityPicker.show(function(items) {
					that.address = {
						province: items[0].text,
						provinceid: items[0].value,
						city: items[1].text,
						cityid: items[1].value,
						district: items[2].text,
						districtid: items[2].value,
						street: ''
					}
					plus.maps.Map.geocode(that.address.province + that.address.city + that.address.district, {
						city: that.address.city
					}, function(event) {
						that.map.setCenter(event.coord);
						that.marker.setPoint(event.coord);
					}, function(e) {});
				});
			},
			analysisAddress(addressDetail, point) {
				var address = {};
				address.lng = point.getLng();
				address.lat = point.getLat();
				for(var province of this.cityData) {
					if(addressDetail.indexOf(province.text) != -1) {
						address.province = province.text;
						address.provinceid = province.value;
						for(var city of province.children) {
							if(addressDetail.indexOf(city.text) != -1) {
								address.city = city.text;
								address.cityid = city.value;
								for(var district of city.children) {
									if(addressDetail.indexOf(district.text) != -1) {
										address.district = district.text;
										address.districtid = district.value;
										address.street = addressDetail.substring(addressDetail.indexOf(district.text) + district.text.length);
										break;
									}
								}
								break;
							}
						}
						break;
					}
				}
				this.address = address;
			},
			streetChange() {
				var street = document.getElementById('street').value;
				var that = this;
				plus.maps.Map.geocode(that.address.province + that.address.city + that.address.district + street, {
					city: that.address.city
				}, function(event) {
					that.map.setCenter(event.coord);
					that.marker.setPoint(event.coord);
					that.address.lng = event.coord.getLng();
					that.address.lat = event.coord.getLat();
				}, function(e) {});
			},
			back() {
				mui.back();
			}
		},
		ready: function() {
			var that = this;
			this.map = new plus.maps.Map('map');
			this.map.showZoomControls(true);
			this.map.showUserLocation(false);
			this.createMarker();
			!this.address && this.userLocation();
			/*this.map.onstatuschanged = function() {
				that.map.getCurrentCenter(function(state, point) {
					if(0 == state) {
						that.marker.setPoint(point);
						plus.maps.Map.reverseGeocode(point, {}, function(event) {
							var addressDetail = event.address;
							that.analysisAddress(addressDetail);
						}, function(e) {});
					}
				});
			}*/
			this.map.onclick = function(point) {
				that.marker.setPoint(point);
				plus.maps.Map.reverseGeocode(point, {}, function(event) {
					var addressDetail = event.address;
					that.analysisAddress(addressDetail, point);
				}, function(e) {});
			}
			mui.back = function() {
				that.fromPage && mui.fire(plus.webview.getWebviewById(that.fromPage), 'addressSelected', {
					address: that.address
				});
				plus.webview.currentWebview().close();
			}
		},
		components: {

		}
	};
</script>
<style>
	.mapTop {
		position: absolute;
		top: 45px;
		width: 100%;
		height: 90px;
		background-color: #fff;
	}
	
	#map {
		position: absolute;
		top: 135px;
		bottom: 0;
		width: 100%;
	}
	
	.mapTop p {
		padding-left: 10px;
		line-height: 45px;
		color: #333;
	}
	
	.mapTop p:nth-child(1) {
		border-bottom: solid 1px #d7d7d7;
	}
	
	.mapTop p span:nth-child(1) {
		width: 70px;
	}
	
	.mapTop p span:nth-child(3) {
		margin-right: 10px;
		color: #03a9f4;
	}
	
	.mapTop p input {
		border: solid 1px #d7d7d7;
		padding: 5px;
		border-radius: 3px;
		position: absolute;
		width: auto;
		left: 80px;
		right: 90px;
		top: 52px;
		font-size: 14px;
		color: #333;
		height: inherit;
		line-height: normal;
		margin: 0;
	}
	
	.mapTop p a {
		border: solid 1px #03a9f4;
		padding: 5px;
		border-radius: 3px;
		font-size: 14px;
		color: #03a9f4;
		margin-right: 10px;
		line-height: 1;
		margin-top: 9px;
	}
	
	.mui-poppicker {
		bottom: inherit;
		transform: translateY(3000px);
	}
	
	.mui-poppicker-body {
		height: 90px;
	}
</style>