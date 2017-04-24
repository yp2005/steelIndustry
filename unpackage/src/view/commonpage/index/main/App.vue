<template>
	<home v-show="index === 0" :address="address" v-ref:home></home>
	<community v-show="index === 1" v-ref:community></community>
	<calculator v-show="index === 2" v-ref:calculator></calculator>
	<mine v-show="index === 3" v-ref:mine></mine>
	<div class="share" v-show="$refs.mine.showShare">
		<span @tap="$refs.mine.shareAction('weixin')"><img src="../../../../static/img/share/wx.png" /></span>
		<span @tap="$refs.mine.shareAction('qq')"><img src="../../../../static/img/share/qq.png" /></span>
		<span @tap="$refs.mine.shareAction('tencentweibo')"><img src="../../../../static/img/share/txwb.png" /></span>
		<span @tap="$refs.mine.shareAction('sinaweibo')"><img src="../../../../static/img/share/snwb.png" /></span>
	</div>
	<div class="shareMask" v-show="$refs.mine.showShare" @tap="$refs.mine.showShare = false"></div>
</template>
<script>
	import home from '../../../bizcomponent/Home';
	import community from '../../../bizcomponent/Community';
	import calculator from '../../../bizcomponent/Calculator';
	import mine from '../../../bizcomponent/Mine';
	export default {
		data() {
			return {
				index: 0,
				address: {
					province: '北京',
					provinceid: 1,
					city: '北京市',
					cityid: 36,
					county: null,
					countyid: null
				}
			};
		},
		watch: {
			index() {
				if(this.index === 0) {
					this.$refs.home.scroll.scrollTo(0, 0, 0);
				} else if(this.index === 1) {
					this.$refs.community.scroll.scrollTo(0, 0, 0);
				} else if(this.index === 2) {
					this.$refs.calculator.scroll.scrollTo(0, 0, 0);
				} else if(this.index === 3) {
					this.$refs.mine.scroll.scrollTo(0, 0, 0);
					this.$refs.mine.loadData(true);
				}
			}
		},
		components: {
			home,
			community,
			calculator,
			mine
		}
	}
</script>
<style>
	.share {
		position: absolute;
		bottom: 0;
		width: 100%;
		background-color: #fff;
		height: 80px;
		z-index: 100;
		padding: 0 10px;
	}
	
	.share span {
		position: relative;
		width: 24%;
		height: 100%;
	}
	
	.share img {
		width: 60px;
		height: 60px;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-left: -30px;
		margin-top: -30px;
	}
	
	.shareMask {
		position: fixed;
		top: 0;
		bottom: 0;
		width: 100%;
		background-color: #000;
		opacity: 0.4;
		z-index: 99;
	}
</style>