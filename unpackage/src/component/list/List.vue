<template>
	<!--下拉刷新容器 -->
	<ul class="mui-table-view mui-table-view-chevron">
		<li @tap="itemtap(item)" v-for="(index, item) in listitem" class="mui-table-view-cell mui-media comlist_li_padding" >
			<div v-if="showdelete" class="mui-slider-right mui-disabled">
				<a @tap="itemDelete(index)" class="mui-btn mui-btn-red">删除</a>
			</div>
			<div v-if="item.disabled === false" class="mypurchase-tip">我的发布</div>
			<div class="mui-slider-handle">
				<div class="comlist_alldelete_left {{showall ? 'comlist_alldelete' : ''}}">
					<div class="mui-checkbox">
						<input name="checkbox" style="line-height:100px;" v-model="item['isselect']" type="checkbox" >
					</div>
				</div>
				<div class="comlistAllDelete {{showall ? 'comlist_alldelete' : ''}}">
					<!-- lazyload -->
					<div class="oneStore">
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
							<p><a href="javascript:void(0)">进入店铺</a><span class="mui-pull-right">...</span></p>
						</div>
					</div>
				</div>
			</div>
		</li>
	</ul>
</template>

<script>
	export default {
		data: function(){
			return {
				shimingpicpath: require('static/img/mine/shimingrenzheng.svg'),
				noshimingpicpath: require('static/img/mine/noshimingrenzheng.svg'),
				qiyepicpath: require('static/img/mine/qiyerenzheng.svg'),
				noqiyepicpath: require('static/img/mine/noqiyerenzheng.svg'),
			}
		},
		props: {
			showall:{
				type: Boolean,
				default:false
			},
			showdelete:{
				type: Boolean,
				default:false
			},
			listitem: Array
		},
		events:{
			alldelete: function(){
				this.$dispatch('before_alldelete');
				this.deleteAll();
				this.$dispatch('after_alldelete');
			}
		},
		methods: {
			itemDelete: function(index){
				var that = this;
				this.$dispatch('comlist_itemdelete',index);
			},
			itemtap: function(item) {
				if(!item.disabled){
					this.$dispatch('comlist_itemtap', item);
				}else{
                    mui.alert('您好，该条求购信息非您本人发布，您没有操作权限。如您有供应商账号，可在卖家版求购大厅查看求购详情。', '没有权限', function() {
//                      mui.back();
                    });
				}
			},
			deleteAll: function() {
				for(var i = (this.listitem.length - 1);i >= 0;i--){
					if(this.listitem[i].isselect){
						this.listitem.splice(i,1);
					}
				}
			}
		},
		ready: function(){
			
		}
	}
</script>

<style scoped>
	.comlist_alldelete_left{
		position:absolute;
		top:0;
		display:flex;
	}
	.comlist_alldelete{
		transform: translate(58px, 0px);
	}
	.comlist_font_main {
		color: #222222;
		font-size: 14px;
		line-height: 16px;
	}
	
	.mui-content>.mui-table-view:first-child {
		margin-top: 0;
	}
	
	.comlist_font_sub {
		font-size: 13px;
		color: #666666;
        line-height: 18px;
	}
	
	.comlist_p_price {
		color: #666666;
	}
	
	.comlist_img_main {
		height: 88px;
		width: 88px;
		max-width: 88px;
		line-height: 88px;
		/*background-image: url(../../static/img/logo.png);
		background-repeat: no-repeat;
		background-size: cover;*/
	}
	
	.comlist_span_lastdate {
		float: left;
		display: inline;
	}
	
	.comlist_span_viewed {
		float: left;
		display: inline;
	}
	
	.comlist_li_padding {
		padding-right: 15px !important;
	}
	
	.comlist_a_margin {
		margin-right: -15px !important;
	}
	.mui-table-view-cell:after {
		background-color: #dbdbdb;
		left: 0;
	}
	.comlist_div_second{
		clear:both;
	}
	
	.comlist_div_second p{
		margin-left:100px;
	}
	
	.price {
		/*font-size: 12;*/
		color: rgb(238, 13, 13);
		float: left;
	}
	
	.dot {
		font-size: 12px;
	}
	
	.mypurchase-tip{
		position:absolute;
		top: 16px;
		left: 0px;
		height: 22px;
		width: 74px;
		line-height: 23px;
		border-bottom-right-radius: 15px;
		border-top-right-radius: 15px;
		background-color: #ff9173;
		font-size: 13px;
		color: #fff;
		z-index: 10;
		padding-left: 6px;
	}
	.item-disabled{
		background-color: #666;
	}
	.teamContent {
		position: absolute;
		top: 37px;
	}
	.comlistAllDelete {
		position: relative;
	}
	.mui-table-view-cell {
		padding: 16px 12px;
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
		color: #fff;
		background-color: #26c6da;
		line-height: 1;
		padding: 5px 8px;
		border-radius: 3px;
		margin: 5px 0;
	}
	
	.oneStore .storeInfo p:nth-child(4) span {
		line-height: 1;
		margin-top: 4px;
		font-size: 19px;
		font-weight: 800;
		color: #777;
	}
</style>