<template>
	<div class="mui-scroll-wrapper mine" >
		<div class="mui-scroll">
			个人中心
		</div>
	</div>
</template>

<script>
	import muiUtils from 'common/muiUtils';
	export default {
		data: function() {
			return {
				scroll: undefined
			};
		},
		created: function() {

		},
		components: {
			
		},
		methods: {
			
		},
		ready: function() {
			this.scroll = mui('.mui-scroll-wrapper.mine').scroll({
				bounce: true,
				indicators: false, // 是否显示滚动条
				deceleration: mui.os.ios ? 0.003 : 0.0009
			});
		}
	};
</script>

<style scoped>
	.mine {
		position: absolute;
		top: 0;
		bottom: 50px;
		width: 100%;
	}
</style>