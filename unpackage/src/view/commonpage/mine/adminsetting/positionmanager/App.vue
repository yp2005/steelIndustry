<template>
	<div class="mui-content">
		<div class="mui-scroll-wrapper releaseCard">
			<div class="mui-scroll">
				
				<div class="title">首页广告位</div>
				<div class="inputRow">
					<label>广告类型</label>
					<p class="workType">{{shouyetypestr}}</p>
				</div>
				<div v-show="shouyetype == 'alliance'" class="inputRow">
					<p>广告联盟</p>
					<div>
						<textarea id="textarea" v-model="advertUrl" placeholder="请输入地址" @input="textAreaInput"></textarea>
					</div>
				</div>
				<div v-show="shouyetype != 'alliance'" class="inputRow">
					<ul class="mui-table-view mui-grid-view">
						<template v-for="(index,advert) in shouyeAdverts">
							<li class="mui-table-view-cell mui-col-xs-3">
								<img :src="advert.image_url" @tap="gotoAdvert(advert)">
								<div>
									<p class="div-p mui-ellipsis">{{advert.title}}</p>
								</div>
								<a href="javascript:void(0);" @tap="delAdvert(0,index)" class="mui-btn mui-btn-primary mui-btn-outlined"><span class="mui-icon mui-icon-trash"></span></a>
							</li>
						</template>
						<li class="mui-table-view-cell mui-col-xs-3">
							<div class="positionAddAdvertDiv" @tap="pickAdvert(0,shouyetype)">
								<a href="javascript:void(0)" style="font-size: 40px;height: 30px;color: #999;" class="positionAddAdvertDiv_add mui-icon mui-icon-plusempty">
								</a>
								<span>选择广告</span>
							</div>
						</li>
					</ul>
				</div>
				
				<div class="title">列表广告位</div>
				<div class="inputRow">
					<label>广告类型</label>
					<p class="workType">{{liebiaotypestr}}</p>
				</div>
				<div v-show="liebiaotype == 'alliance'" class="inputRow">
					<p>广告联盟</p>
					<div>
						<textarea id="textarea" v-model="advertUrl" placeholder="请输入地址" @input="textAreaInput"></textarea>
					</div>
				</div>
				<div v-show="liebiaotype != 'alliance'" class="inputRow">
					<ul class="mui-table-view mui-grid-view">
						<template v-for="(index,advert) in liebiaoAdverts">
							<li class="mui-table-view-cell mui-col-xs-3">
								<img :src="advert.image_url" @tap="gotoAdvert(advert)">
								<div>
									<p class="div-p mui-ellipsis">{{advert.title}}</p>
								</div>
								<a href="javascript:void(0);" @tap="delAdvert(1,index)" class="mui-btn mui-btn-primary mui-btn-outlined"><span class="mui-icon mui-icon-trash"></span></a>
							</li>
						</template>
						<li class="mui-table-view-cell mui-col-xs-3">
							<div class="positionAddAdvertDiv" @tap="pickAdvert(1,liebiaotype)">
								<a href="javascript:void(0)" style="font-size: 40px;height: 30px;color: #999;" class="positionAddAdvertDiv_add mui-icon mui-icon-plusempty">
								</a>
								<span>选择广告</span>
							</div>
						</li>
					</ul>
				</div>
				
				<div class="title">详情广告位</div>
				<div class="inputRow">
					<label>广告类型</label>
					<p class="workType">{{xiangqingtypestr}}</p>
				</div>
				<div v-show="xiangqingtype == 'alliance'" class="inputRow">
					<p>广告联盟</p>
					<div>
						<textarea id="textarea" v-model="advertUrl" placeholder="请输入地址" @input="textAreaInput"></textarea>
					</div>
				</div>
				<div v-show="xiangqingtype != 'alliance'" class="inputRow">
					<ul class="mui-table-view mui-grid-view">
						<template v-for="(index,advert) in xiangqingAdverts">
							<li class="mui-table-view-cell mui-col-xs-3">
								<img :src="advert.image_url" @tap="gotoAdvert(advert)">
								<div>
									<p class="div-p mui-ellipsis">{{advert.title}}</p>
								</div>
								<a href="javascript:void(0);" @tap="delAdvert(2,index)" class="mui-btn mui-btn-primary mui-btn-outlined"><span class="mui-icon mui-icon-trash"></span></a>
							</li>
						</template>
						<li class="mui-table-view-cell mui-col-xs-3">
							<div class="positionAddAdvertDiv" @tap="pickAdvert(2,xiangqingtype)">
								<a href="javascript:void(0)" style="font-size: 40px;height: 30px;color: #999;" class="positionAddAdvertDiv_add mui-icon mui-icon-plusempty">
								</a>
								<span>选择广告</span>
							</div>
						</li>
					</ul>
				</div>
				
				<div class="bottomBtn">
					<a href="javascript:void(0)" @tap="saveInfo">保存修改</a>
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
	export default {
		data: function() {
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
			var advertisingPicker = new mui.PopPicker({
				layer: 1
			});
			advertisingPicker.setData(pickerData);
			
			var advertisingPicker2 = new mui.PopPicker({
				layer: 1
			});
			advertisingPicker2.setData(pickerData);
			
			return {
				positionEmpty: require('static/img/upload_empty.jpg'),
				shouyeAdverts:[],
				liebiaoAdverts:[],
				xiangqingAdverts:[],
				liebiaoPicker: advertisingPicker,
				xiangqingPicker: advertisingPicker2,
				islianxi: false,
				isdianpu: true,
				isgongcheng: true,
				ismingpian: true,
				isyonggong: true,
				shouyetype:'loopImg',
				liebiaotype:'loopImg',
				xiangqingtype:'loopImg',
				shouyetypestr:'轮播图',
				liebiaotypestr:'轮播图',
				xiangqingtypestr:'轮播图',
				name: '',
				bddate: ''
			};
		},
		methods: {
			selectAddress: function() {
				var that = this;
				this.liebiaoPicker.show(function(items) {
					that.liebiaotypestr = items[0].text;
					that.liebiaotype = items[0].value;
					if(items[0].value == 'oneImg'){
						if(that.liebiaoAdverts.length>0){
							var firstitem = that.liebiaoAdverts[0];
							that.liebiaoAdverts = [firstitem];
						}
					}
				});
			},
			selectAddress2: function() {
				var that = this;
				this.xiangqingPicker.show(function(items) {
					that.xiangqingtypestr = items[0].text;
					that.xiangqingtype = items[0].value;
					if(items[0].value == 'oneImg'){
						if(that.xiangqingAdverts.length>0){
							var firstitem = that.xiangqingAdverts[0];
							that.xiangqingAdverts = [firstitem];
						}
					}
				});
			},
			pickAdvert: function(_page,type){
				muiUtils.openWindow('../../commonpage/positionmanager/advert.html', 'commonpage_positionmanager_advert',{
					extras: {
						page: _page,
						type:type
					}
				});
			},
			delAdvert: function(_page,index){
				switch(_page){
					case 0:
						this.shouyeAdverts.splice(index, 1);
						break;
					case 1:
						this.liebiaoAdverts.splice(index, 1);
						break;
					case 2:
						this.xiangqingAdverts.splice(index, 1);
						break;
				}
			},
			gotoAdvert: function(advert){
				muiUtils.openWindow('../../commonpage/advertisingmanager/editadvertising.html', 'commonpage_advertisingmanager_editadvertising', {
					extras: {
						id: 'id'
					}
				});
			},
			saveInfo() {
				mui.toast("保存成功");
				mui.back();
			}
		},
		ready: function() {
			var that = this;
			mui('.mui-scroll-wrapper.releaseCard').scroll({
				bounce: true,
				indicators: false, // 是否显示滚动条
				deceleration: mui.os.ios ? 0.003 : 0.0009
			});
			mui('.mui-numbox').numbox();
			window.addEventListener('position_advertpick', function(e) {
				var page = e.detail.page;
				switch(page){
					case 0:
						that.shouyeAdverts = e.detail.adverts;
						break;
					case 1:
						that.liebiaoAdverts = e.detail.adverts;
						break;
					case 2:
						that.xiangqingAdverts = e.detail.adverts;
						break;
				}
			});
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
	
	.releaseCard .inputRow > input[type=text] {
		line-height: normal;
		width: inherit;
		height: inherit;
		margin: 0;
		padding: 1px 0px;
		border: none;
		position: absolute;
		top: 15px;
		left: 120px;
		right: 40px;
	}
	
	.releaseCard .inputRow > .jxddicon.icon-jinru32 {
		position: absolute;
		right: 10px;
		top: 16px;
		line-height: 20px;
		font-size: 20px;
		color: #999;
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
		width: 100px;
		float: left;
	}
	
	.releaseCard .inputRow .area,
	.releaseCard .inputRow .area p:nth-child(2) span:nth-child(2),
	.releaseCard .inputRow .workType {
		padding-left: 110px;
	}
	
	.releaseCard .inputRow .area,
	.releaseCard .inputRow .workType {
		padding-right: 30px;
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
		width: 100%;
		color: #fff;
		background-color: #26c6da;
		border: solid 1px #26c6da;
		border-radius: 3px;
	}
	
	.userSwitchSpan{
		color: #222;
		font-size:14px;
	}
	
	
	.advertising_storepick{
		border: 1px solid #ccc;
		text-align: center;
	}
	.advertising_storepick a{
		margin:10px;
		font-size: 20px;
	}
	
	/****************************/
	
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
		max-width: 100%;
		max-height: 76px;
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
	
	/****************************/
	
	.positionAddAdvertDiv{
		width: 75px;
		height: 75px;
		background-color: #f3f5f7;
		text-align: center;
		padding: 10px;
	}
	.positionAddAdvertDiv span{
		color: #999;
		font-size: 12px;
		margin: -10px 0px 0px 0px;
		display: inherit;
		/*color: #999;
		width: 50px;
		line-height: 20px;
		margin-top: 5px;*/
	}
	.positionAddAdvertDiv_add{
		font-size: 25px;
	}
</style>