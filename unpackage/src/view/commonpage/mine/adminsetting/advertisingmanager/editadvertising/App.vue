<template>
	<div class="mui-content">
		<div class="mui-scroll-wrapper releaseCard">
			<div class="mui-scroll">
				<div class="title"></div>
				<div class="inputRow"><label>广告名称</label><input type="text" v-model="name" placeholder="请输入广告名称(必填)"></div>
				<div class="title"></div>
				<div class="inputRow">
					<p>请上传广告图片(必填)</p>
					<upload :is-cut="isCut" :pictures.sync="pictures" :imagecount="1" :dataid="gg_guanggao"></upload>
				</div>
				<div class="title"></div>
				<div class="mui-card1">
					<form class="mui-input-group">
						<div class="mui-input-row mui-radio mui-left">
							<label>链接到地址</label>
							<input type="text" name="radio1" type="radio" @tap="linkToUrl = !linkToUrl" :checked="linkToUrl" >
						</div>
						<div class="mui-input-row mui-radio mui-left">
							<label>链接到店铺</label>
							<input type="text" name="radio1" type="radio" @tap="linkToUrl = !linkToUrl" :checked="!linkToUrl" >
						</div>
					</form>
				</div>
				<div v-show="linkToUrl" class="inputRow">
					<p>请输入地址</p>
					<div>
						<textarea id="textarea" v-model="advertUrl" placeholder="请输入地址" @input="textAreaInput"></textarea>
					</div>
				</div>
				<div v-show="!linkToUrl" class="inputRow">
					<div>
						<div v-if="advertStore" class="oneStore">
							<img src="http://img1.imgtn.bdimg.com/it/u=1945716465,2733267266&fm=23&gp=0.jpg" />
							<div class="storeInfo">
								<p class="mui-ellipsis">店铺名称店铺名称店铺名称店铺名称店铺名称店铺名称</p>
								<p>北京 北京市 海淀区</p>
								<p>
									<img v-if="item.shiming" :src="shimingpicpath">
									<img v-else :src="noshimingpicpath">
									<img v-if="item.qiye" :src="qiyepicpath">
									<img v-else :src="noqiyepicpath">
									<span class="mui-pull-right">距离：9999KM</span>
								</p>
								<p>
									<a href="javascript:void(0)" @tap="gotoStore">进入店铺</a>
									<a href="javascript:void(0)" @tap="pickStore">重新选择</a>
									<span class="mui-pull-right">...</span>
								</p>
							</div>
						</div>
						<div v-else class="advertising_storepick" @tap="pickStore">
	                        <a href="javascript:void(0)">请选择店铺</a>
	                    </div>
					</div>
				</div>
				<div class="bottomBtn">
					<a style="width:100%;" href="javascript:void(0)" @tap="save()">保存</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import muiUtils from 'common/muiUtils';
	import log from 'common/logUtils';
	import api from 'api';
	import CONSTS from 'common/consts';
	import upload from 'component/upload/UploadImage';
	import {
		cityData3Lev
	} from 'common/cityData';
	export default {
		data: function() {
			return {
				
				shimingpicpath: require('static/img/mine/shimingrenzheng.svg'),
				noshimingpicpath: require('static/img/mine/noshimingrenzheng.svg'),
				qiyepicpath: require('static/img/mine/qiyerenzheng.svg'),
				noqiyepicpath: require('static/img/mine/noqiyerenzheng.svg'),
				
				name: '',
				pictures: [],
				isCut: false,
				linkToUrl: true,
				advertUrl: '',
				advertStore:null
			};
		},
		created: function() {

		},
		methods: {
			pickStore() {
				muiUtils.openWindow('../../commonpage/advertisingmanager/store.html', 'commonpage_advertisingmanager_store');
			},
			gotoStore: function() {
				muiUtils.openWindow('../../bizpage/device/deviceinfo.html', 'bizpage_device_deviceinfo', {
					extras: {
						store: this.advertStore
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
			save() {
				this.goback();
			},
			goback() {
				mui.back();
			}
		},
		ready: function() {
			mui('.mui-scroll-wrapper.releaseCard').scroll({
				bounce: true,
				indicators: false, // 是否显示滚动条
				deceleration: mui.os.ios ? 0.003 : 0.0009
			});
			mui('.mui-numbox').numbox();
			var that = this;
			//
			window.addEventListener('advertising_storepick', function(e) {
				that.advertStore = e.detail.store;
			});
		},
		components: {
			upload
		}
	};
</script>
<style>
	.releaseCard {
		position: absolute;
		top: 45px;
		bottom: 0;
		width: 100%;
	}
	
	.releaseCard input,
	.releaseCard textarea,
	.releaseCard label {
		font-size: 14px;
	}
	
	.releaseCard .inputRow {
		color: #333;
		line-height: 30px;
		padding: 10px;
		position: relative;
		background-color: #fff;
		overflow: hidden;
	}
	
	.releaseCard .inputRow:after {
		content: "";
		height: 1px;
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #d7d7d7;
		transform: scaleY(0.5);
	}
	
	.releaseCard .title {
		background-color: #ddd;
		padding: 5px;
		font-size: 15px;
		color: #222;
	}
	
	.releaseCard .inputRow label {
		width: 70px;
		float: left;
	}
	
	.releaseCard .inputRow .area,
	.releaseCard .inputRow .area p:nth-child(2) span:nth-child(2),
	.releaseCard .inputRow .workType {
		padding-left: 70px;
	}
	
	.releaseCard .inputRow .area p,
	.releaseCard .inputRow .workType {
		color: #333;
	}
	
	.releaseCard .inputRow .area p:nth-child(2) {
		line-height: 20px;
	}
	
	.releaseCard .inputRow .area p:nth-child(2) span {
		display: inherit;
	}
	
	.releaseCard .mui-numbox .mui-input-numbox {
		width: 36px !important;
		padding: 0 !important;
	}
	
	.releaseCard .inputRow.textarea {
		overflow: hidden;
	}
	
	.releaseCard .inputRow.textarea label,
	.releaseCard .inputRow.textarea textarea {
		float: left;
	}
	
	.releaseCard textarea {
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
	
	.bottomBtn a:nth-child(1) {
		color: #fff;
		background-color: #26c6da;
		border: solid 1px #26c6da;
		border-radius: 3px;
	}
	/*.bottomBtn a:nth-child(1) {
		margin-right: 3%;
		color: #333;
		background-color: #fff;
		border: solid 1px #d7d7d7;
		border-radius: 3px;
	}
	
	.bottomBtn a:nth-child(2) {
		margin-left: 3%;
		color: #fff;
		background-color: #26c6da;
		border: solid 1px #26c6da;
		border-radius: 3px;
	}*/
	
	.backTitleBg {
		position: fixed;
		top: 45px;
		bottom: 0;
		left: 0;
		right: 0;
		/*padding: 50px 0px;*/
		background-color: #ddd;
		text-align: center;
	}
	
	.bottomBackBtn {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		line-height: 40px;
		text-align: center;
		background-color: #fff;
		z-index: 1;
	}
	
	.statusFont{
		color:#666;
	}
	
	.statusFont1{
		color:#26c6da;
	}
	
    .mask {
        position: fixed;
        width: 100%;
        height: 100%;
        background-color: #000000;
        opacity: 0.6;
        z-index: 11;
    }
    
    .declarationWindow {
        position: fixed;
        top: 10%;
        bottom: 10%;
        left: 5%;
        right: 5%;
        padding: 15px 12px;
        z-index: 12;
        opacity: 1;
        background-color: #ffffff;
        border: solid 1px #d7d7d7;
    }
    
    .declarationWindow h4 {
        font-size: 15px;
        color: #222222;
        text-align: center;
        line-height: 35px;
        font-weight: 600;
    }
    
    .declarationWindow p {
        text-indent: 28px;
        font-size: 14px;
        color: #666666;
        margin-bottom: 10px;
        line-height: 25px;
    }
    
    .declarationWindow p:last-of-type {
        text-indent: 0;
        position: absolute;
        left: 0;
        bottom: 15px;
        text-align: center;
        width: 100%;
    }
    
    .declarationWindow p a {
        font-size: 14px;
        line-height: 26px;
        padding: 0 10px;
        border: solid 1px #26c6da;
        border-radius: 5px;
        color: #26c6da;
    }
	/*new*/
	
	.oneStore {
		background-color: #fff;
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
		padding: 5px 0;
	}
	
	.oneStore .storeInfo p:nth-child(3) img {
		width: 19px;
		height: 19px;
		margin-right: 4px;
	}
	
	.oneStore .storeInfo p:nth-child(4) a {
		color: #26c6da;
		line-height: 1;
		padding: 5px 8px;
		border-radius: 3px;
		margin: 5px 0;
		border: 1px solid #26c6da;
	}
	
	.oneStore .storeInfo p:nth-child(4) span {
		line-height: 1;
		margin-top: 4px;
		font-size: 19px;
		font-weight: 800;
		color: #777;
	}
	.advertising_storepick{
		border: 1px solid #ccc;
		text-align: center;
	}
	.advertising_storepick a{
		margin:10px;
		font-size: 20px;
	}
</style>