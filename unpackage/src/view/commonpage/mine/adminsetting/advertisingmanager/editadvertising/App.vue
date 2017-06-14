<template>
	<div class="mui-content">
		<div class="mui-scroll-wrapper editadvertising">
			<div class="mui-scroll">
				<div class="inputRow"><label>广告标题</label><input type="text" v-model="title" placeholder="请输入广告标题"></div>
				<div class="inputRow">
					<p>请上传广告图片</p>
					<p>推荐尺寸：首页720 * 300，详情页和列表页720 * 240</p>
					<upload :is-cut="isCut" :pictures.sync="pictures" :imagecount="1"></upload>
				</div>
				<div class="inputRow">
					<label>链接类型</label>
					<input readonly type="text" v-model="linkType.text" @tap="selectLinkType" placeholder="请选择链接类型">
				</div>
				<div v-show="linkType.value == 'outerLink'" class="inputRow">
					<p>链接地址</p>
					<div>
						<textarea id="textarea" v-model="advertUrl" placeholder="请输入链接地址" @input="textAreaInput"></textarea>
					</div>
				</div>
				<div v-show="linkType.value == 'innerLink'" class="inputRow">
					<div>
						<div v-if="advertDevice" class="oneDevice" @tap="gotoDetail(advertDevice.id)">
							<img :src="advertDevice.imgName" />
							<div class="deviceInfo">
								<p class="mui-ellipsis">{{advertDevice.deviceName}}</p>
								<p>{{advertDevice.address || ((advertDevice.provinceName || '') + ' ' + (advertDevice.cityName || '') + ' ' + (advertDevice.countyName || '') + ' ' + (advertDevice.street || ''))}}</p>
								<p>
									<img v-show="advertDevice.realNameAuthentication == 1" src="../../../../../../static/img/mine/shimingrenzheng.svg">
									<img v-else src="../../../../../../static/img/mine/noshimingrenzheng.svg">
									<img v-show="advertDevice.enterpriseCertification == 1" src="../../../../../../static/img/mine/qiyerenzheng.svg">
									<img v-else src="../../../../../../static/img/mine/noqiyerenzheng.svg">
								</p>
								<p>
									<a href="javascript:void(0)" @tap="selectDevice($event)">重新选择</a><span class="mui-pull-right">...</span></p>
							</div>
						</div>
						<div v-else class="advertising_devicepick" @tap="selectDevice">
							<a href="javascript:void(0)">请选择设备</a>
						</div>
					</div>
				</div>
				<div class="bottomBtn">
					<a style="width:100%;" href="javascript:void(0)" @tap="submit()">保存</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import muiUtils from 'common/muiUtils';
	import api from 'api';
	import CONSTS from 'common/consts';
	import upload from 'component/upload/UploadImage';
	export default {
		data: function() {
			var linkTypePicker = new mui.PopPicker({
				layer: 1
			});
			linkTypePicker.setData([{
				value: 'innerLink',
				text: '内部链接',
			}, {
				value: 'outerLink',
				text: '外部链接',
			}]);
			var ad = plus.webview.currentWebview().ad;
			var id = undefined;
			var deviceId = undefined;
			var title = '';
			var pictures = [];
			var linkType = {
				value: 'innerLink',
				text: '内部链接',
			};
			var advertUrl = '';
			if(ad) {
				id = ad.id;
				deviceId = ad.deviceId;
				title = ad.title;
				pictures.push(ad.img);
				if(ad.linkType == 'outerLink') {
					linkType = {
						value: 'outerLink',
						text: '外部链接',
					};
					advertUrl = ad.url;
				}
			}
			return {
				imgServer: plus.webview.currentWebview().imgServer || '',
				linkTypePicker: linkTypePicker,
				id: id,
				deviceId: deviceId,
				title: title,
				pictures: pictures,
				isCut: false,
				linkType: linkType,
				advertUrl: advertUrl,
				advertDevice: null,
				fromPage: plus.webview.currentWebview().fromPage
			};
		},
		created() {
			var that = this;
			if(this.id && this.linkType.value == 'innerLink') {
				muiUtils.muiAjax(api.APIS.device.getDeviceById + '?id=' + that.deviceId, {
					dataType: "json",
					type: "get",
					success: function(data) {
						if(data.erroCode === CONSTS.ERROR_CODE.SUCCESS) {
							that.advertDevice = data.result;
							if(!that.advertDevice) {
								mui.toast('设备不存在，可能已被用户删除，请从新选择！');
							}
							else {
								that.advertDevice.imgName = that.advertDevice.pictures && that.advertDevice.pictures.length > 0 ? (that.dealPicture(that.advertDevice.pictures[0])) : '1';
							}
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
		methods: {
			dealPicture(pic) {
				var fileName = pic.substring(pic.lastIndexOf('/') + 1, pic.length);
				var path = pic.substring(0, pic.lastIndexOf('/'));
				return path + '/small_' + fileName;
			},
			selectLinkType() {
				var that = this;
				this.linkTypePicker.show(function(items) {
					that.linkType = items[0];
				});
			},
			selectDevice(e) {
				muiUtils.openWindow('../../bizpage/device/list.html', '../../bizpage/device/list.html', {
					extras: {
						selectDevice: true
					}
				});
				e && e.stopPropagation();
			},
			gotoDetail: function(id) {
				muiUtils.openWindow('../../bizpage/device/deviceinfo.html', '../../bizpage/device/deviceinfo.html', {
					extras: {
						deviceId: id
					}
				});
			},
			textAreaInput() {
				var textarea = document.getElementById('textarea');
				textarea.style.height = '80px';
				var scrollHeight = textarea.scrollHeight;
				if(scrollHeight > 80) {
					textarea.style.height = scrollHeight + 'px';
				}
			},
			submit() {
				if(!this.title) {
					mui.toast('请输入广告标题！');
					return;
				}
				if(!this.pictures || this.pictures.length == 0) {
					mui.toast('请上传广告图片！');
					return;
				}
				if(this.linkType.value == 'innerLink' && !this.advertDevice) {
					mui.toast('请选择设备！');
					return;
				}
				if(this.linkType.value == 'outerLink' && !this.advertUrl) {
					mui.toast('请输入链接地址！');
					return;
				}
				var data = {
					title: this.title,
					linkType: this.linkType.value,
					img: this.pictures[0]
				};
				if(data.img.indexOf('http') == 0) {
					data.img = data.img.substring(data.img.indexOf(this.imgServer) + this.imgServer.length);
				}
				if(this.linkType.value == 'innerLink') {
					data.deviceId = this.advertDevice.id;
				}
				if(this.linkType.value == 'outerLink') {
					data.url = this.advertUrl;
				}
				if(this.id) {
					data.id = this.id;
				}
				var that = this;
				muiUtils.muiAjax(api.APIS.advertisement.advertisement, {
					dataType: "json",
					contentType: 'application/json',
					type: "post",
					data: JSON.stringify(data),
					success: function(data) {
						if(data.erroCode === CONSTS.ERROR_CODE.SUCCESS) {
							mui.toast('保存成功！');
							var fromPage = plus.webview.getWebviewById(that.fromPage);
							mui.fire(fromPage, 'getData');
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
			mui('.mui-scroll-wrapper.editadvertising').scroll({
				bounce: true,
				indicators: false, // 是否显示滚动条
				deceleration: mui.os.ios ? 0.003 : 0.0009
			});
			var that = this;
			window.addEventListener('advertising_devicepick', function(e) {
				that.advertDevice = e.detail.device;
			});
		},
		components: {
			upload
		}
	};
</script>
<style>
	.editadvertising {
		position: absolute;
		top: 45px;
		bottom: 0;
		width: 100%;
	}
	
	.editadvertising input,
	.editadvertising textarea,
	.editadvertising label {
		font-size: 14px;
	}
	
	.editadvertising .inputRow {
		color: #333;
		line-height: 30px;
		padding: 10px;
		position: relative;
		background-color: #fff;
		overflow: hidden;
	}
	
	.editadvertising .inputRow:after {
		content: "";
		height: 1px;
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #d7d7d7;
		transform: scaleY(0.5);
	}
	
	.editadvertising .inputRow label {
		width: 70px;
		float: left;
	}
	
	.editadvertising .inputRow.textarea {
		overflow: hidden;
	}
	
	.editadvertising .inputRow.textarea label,
	.editadvertising .inputRow.textarea textarea {
		float: left;
	}
	
	.editadvertising textarea {
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
		/*background-color: #fff;*/
	}
	
	.bottomBtn a {
		line-height: 35px;
		text-align: center;
		font-size: 15px;
		width: 45%;
	}
	
	.bottomBtn a {
		color: #fff;
		background-color: #26c6da;
		border: solid 1px #26c6da;
		border-radius: 3px;
	}
	
	.oneDevice {
		background-color: #fff;
	}
	
	.oneDevice img {
		float: left;
		width: 106px;
		height: 106px;
	}
	
	.oneDevice .deviceInfo {
		padding-left: 116px;
		min-height: 80px;
		line-height: 21px;
	}
	
	.oneDevice .deviceInfo p {
		font-size: 13px;
	}
	
	.oneDevice .deviceInfo p:nth-child(1) {
		color: #000;
		font-size: 14px;
	}
	
	.oneDevice .deviceInfo p:nth-child(3) {
		overflow: hidden;
		padding: 5px 0;
	}
	
	.oneDevice .deviceInfo p:nth-child(3) img {
		width: 19px;
		height: 19px;
		margin-right: 4px;
	}
	
	.oneDevice .deviceInfo p:nth-child(4) a {
		color: #26c6da;
		line-height: 1;
		padding: 5px 8px;
		border-radius: 3px;
		margin: 5px 0;
		border: 1px solid #26c6da;
	}
	
	.oneDevice .deviceInfo p:nth-child(4) span {
		line-height: 1;
		margin-top: 4px;
		font-size: 19px;
		font-weight: 800;
		color: #777;
	}
	
	.advertising_devicepick {
		border: 1px solid #ccc;
		text-align: center;
	}
	
	.advertising_devicepick a {
		margin: 10px;
		font-size: 20px;
	}
	
	.editadvertising .inputRow>input[type=text] {
		line-height: normal;
		width: inherit;
		height: inherit;
		margin: 0;
		padding: 1px 0px;
		border: none;
		position: absolute;
		top: 15px;
		left: 80px;
		right: 40px;
	}
</style>