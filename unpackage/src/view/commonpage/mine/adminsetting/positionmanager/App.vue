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
					<div>
						<div v-if="shouyeAdverts.length>0" class="oneStore">
							guanggao
						</div>
						<div v-else class="advertising_storepick" @tap="pickAdvert(0)">
	                        <a href="javascript:void(0)">请选择广告</a>
	                    </div>
					</div>
				</div>
					
					
					
					
				<div class="title"></div>
				<div class="inputRow"><label>主题帖积分</label><input type="text" v-model="bddate" placeholder="请输入主题帖积分"></div>
				<div class="inputRow"><label>回帖积分</label><input type="text" v-model="gender.text" placeholder="请输入回帖积分"></div>
				<div class="inputRow">
					<label>首页广告位</label>
					<p class="workType">{{shouyetypestr}}</p>
				</div><div class="inputRow">
					<label>列表页广告位</label>
					<p v-if="liebiaotype" class="workType" @tap="selectAddress()">{{liebiaotypestr}}</p>
					<input type="text" v-else placeholder="请选择广告类型" readonly @tap="selectAddress()">
				</div><div class="inputRow">
					<label>详情页广告位</label>
					<p v-if="xiangqingtype" class="workType" @tap="selectAddress2()">{{xiangqingtypestr}}</p>
					<input type="text" v-else placeholder="请选择广告类型" readonly @tap="selectAddress2()">
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
			advertisingPicker.setData(pickerData);
			
			return {
				shouyeAdverts:[],
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
		created: function() {

		},
		methods: {
			selectAddress: function() {
				var that = this;
				this.liebiaoPicker.show(function(items) {
					that.liebiaotypestr = items[0].text;
					that.liebiaotype = items[0].value;
				});
			},
			selectAddress2: function() {
				var that = this;
				this.xiangqingPicker.show(function(items) {
					that.xiangqingtypestr = items[0].text;
					that.xiangqingtype = items[0].value;
				});
			},
			pickAdvert: function(_page){
				muiUtils.openWindow('../../commonpage/positionmanager/advert.html', 'commonpage_positionmanager_advert',{
					extras: {
						page: _page
					}
				});
			},
			saveInfo() {
				mui.toast("保存成功");
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
			window.addEventListener('position_advertpick', function(e) {
				var page = e.detail.page;
				that.shouyeAdverts = e.detail.adverts;
				console.log(JSON.stringify(that.shouyeAdverts));
			});
		},
		components: {
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
</style>