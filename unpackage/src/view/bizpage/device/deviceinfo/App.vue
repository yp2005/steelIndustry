/** * @file 店铺详情 * @Author lxm * @private */

<template>
	<nonetworkmask :disnonetworkmask.sync="disnonetworkmask" :top="45" :bottom="0"></nonetworkmask>
	<div class="deviceInfo">
		<!--轮播图-->
		<div>
			<slider :images="imageDatas"></slider>
		</div>
		<!--文字说明 -->
		<div class="shop-data-box">
			<h4>TEP官方旗舰店</h4>
			<ul class="shop-data-list  am-list">
				<li>
					<a class="am-text-truncate"><i class="shop-data-left am-icon-map-marker"></i>厦门市同安区<i class="am-icon-angle-right"></i></a>
				</li>
				<li>
					<a href="tel:18106088602" class="am-text-truncate"><i class="shop-data-left am-icon-phone"></i>18106088602<i class="am-icon-angle-right"></i></a>
				</li>
			</ul>
			<div class="text">
				<h4>门店介绍<span class="readTimes">浏览量：3199</span></h4>
				<p>TEP官方旗舰店主营开关电器、墙壁开关、开关面板、开关插座、插座、灯饰开关、照明、灯饰等产品，供家装资讯、产品采购、技术服务、方案设计及装修一条龙服务，为客户提供家装的整体解决方案。</p>
			</div>
			<ul class="shop-data-list-a  am-list">
				<li>
					<a href="http://www.168bgt.com/s/2045&amp;mi=1" class="am-text-truncate">本店产品<span>查看更多<i class="am-icon-caret-right"></i></span></a>
				</li>
			</ul>
			<div class="list-ad-two">
				<a href="http://8du.in/1p1M0Q"><img src="http://img.168bgt.com/upload/2016/07/24/20160724145643_62.jpg" alt="厦门"></a>
			</div>
		</div>

	</div>
</template>

<script>
	import nonetworkmask from 'component/mask/NoNetWorkMask';
	import muiUtils from 'common/muiUtils';
	import log from 'common/logUtils';
	import slider from 'component/slider/ImageSlider';

	export default {
		data: function() {
			return {
				// banner
				imageDatas: []
			}
		},
		created: function() {
			//ajax请求数据
			this.imageDatas = [{
				"banner_img_url": "http://img.168bgt.com/upload/2016/05/22/20160522172528_408.jpg",
				"gc_id_1": 20000,
				"banner_order": 0
			}, {
				"banner_img_url": "http://img.168bgt.com/upload/2016/05/22/20160522172535_67.jpg",
				"gc_id_1": 20001,
				"banner_order": 1
			}, {
				"banner_img_url": "http://img.168bgt.com/upload/2016/05/22/20160522172541_27.jpg",
				"gc_id_1": 20002,
				"banner_order": 2
			}, {
				"banner_img_url": "http://img.168bgt.com/upload/2016/05/22/20160522172548_203.jpg",
				"gc_id_1": 20003,
				"banner_order": 3
			}, {
				"banner_img_url": "http://img.168bgt.com/upload/2016/05/22/20160522172429_179.jpg",
				"gc_id_1": 20004,
				"banner_order": 4
			}];
		},
		methods: {

		},
		watch: {

		},
		ready: function() {

		},
		components: {
			nonetworkmask,
			slider
		}
	};
</script>
<style scoped>
	.deviceInfo {
		position: absolute;
		top: 45px;
		bottom: 0;
		width: 100%;
	}
	.mui-slider {
		height: 256px;
	}
	
	.mui-slider .mui-slider-group .mui-slider-item img {
		height: 256px;
	}
</style>