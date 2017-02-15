/** * @file 店铺管理 * @Author lxm * @private */

<template>
	<nonetworkmask :disnonetworkmask.sync="disnonetworkmask" :top="45" :bottom="0"></nonetworkmask>
	<div class="mui-scroll-wrapper deviceInfo">
		<div class="mui-scroll">
			<template v-for="item in imageDatas">
				<img :src="item.banner_img_url">
			</template>
		</div>
</template>

<script>
	import nonetworkmask from 'component/mask/NoNetWorkMask';

	export default {
		data: function() {
			return {
				imageDatas: []
			}
		},
		created: function() {
			this.imageDatas = plus.webview.currentWebview().imageDatas;
		},
		methods: {
			
		},
		watch: {

		},
		ready: function() {
			var deceleration = mui.os.ios ? 0.003 : 0.0009;
			mui('.mui-scroll-wrapper').scroll({
				bounce: true,
				indicators: false, //是否显示滚动条
				deceleration: deceleration
			});
		},
		components: {
			nonetworkmask
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
	.deviceInfo img {
		padding:10px;
		width:100%;
	}
</style>