<template>
	<div class="mui-scroll-wrapper home">
		<imageslider :images="imageDatas" :item-tap="bannerTap"></imageslider>
	</div>
</template>

<script>
	import imageslider from 'component/slider/ImageSlider';
	import muiUtils from 'common/muiUtils';
	export default {
		data: function() {
			return {
				imageDatas: [{
					banner_img_url: 'http://img3.imgtn.bdimg.com/it/u=3731927300,2399949167&fm=23&gp=0.jpg',
					banner_url: 'http://www.baidu.com',
					banner_name: '1',
					banner_order: 1
				}, {
					banner_img_url: 'http://img0.imgtn.bdimg.com/it/u=611384384,769476748&fm=23&gp=0.jpg',
					banner_url: 'http://www.baidu.com',
					banner_name: '2',
					banner_order: 2
				}]
			}
		},
		filters: {

		},
		created: function() {

		},
		components: {
			imageslider
		},
		methods: {
			bannerTap(item) {
				muiUtils.openWindow(item.banner_url);
			}
		},
		ready: function() {
			if(plus.webview.getWebviewById('HBuilder')) {
				plus.webview.getWebviewById('HBuilder').close('none');
			}
			setTimeout(function() {
				var launchFlag = plus.storage.getItem('launchFlag');
				if(launchFlag) {
					plus.navigator.closeSplashscreen();
					// plus.webview.currentWebview().show('none');
				}
			}, 10);
		}
	};
</script>

<style scoped>
	.home {
		position: absolute;
		top: 45px;
		bottom: 50px;
		width: 100%;
	}
</style>