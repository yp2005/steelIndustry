<template>
	<div class="mui-scroll-wrapper community">
		<div class="mui-scroll">
			<ul class="mui-table-view mui-table-view-chevron">
				<li class="mui-table-view-cell mui-media">
					<a class="mui-navigate-right">
						<img class="mui-media-object mui-pull-left" src="../../static/img/device.jpg">
						<div class="mui-media-body">
							设备
						</div>
					</a>
				</li>
				<li class="mui-table-view-cell mui-media">
					<a class="mui-navigate-right">
						<img class="mui-media-object mui-pull-left" src="../../static/img/gangjiegou.jpg">
						<div class="mui-media-body">
							钢结构
						</div>
					</a>
				</li>
				<li class="mui-table-view-cell mui-media">
					<a class="mui-navigate-right">
						<img class="mui-media-object mui-pull-left" src="../../static/img/coloursteel.jpg">
						<div class="mui-media-body">
							彩钢
						</div>
					</a>
				</li>
				<li class="mui-table-view-cell mui-media">
					<a class="mui-navigate-right">
						<img class="mui-media-object mui-pull-left" src="../../static/img/install.jpg">
						<div class="mui-media-body">
							安装
						</div>
					</a>
				</li>
			</ul>
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
		methods: {

		},
		ready: function() {
			this.scroll = mui('.mui-scroll-wrapper.community').scroll({
				bounce: true,
				indicators: false, // 是否显示滚动条
				deceleration: mui.os.ios ? 0.003 : 0.0009
			});
		}
	};
</script>

<style scoped>
	.community {
		position: absolute;
		top: 45px;
		bottom: 50px;
		width: 100%;
	}
	
	.mui-table-view {
		background-color: #767a92;
	}
	
	.mui-table-view:after,
	.mui-table-view:before,
	.mui-table-view-cell:after,
	.mui-table-view-cell:before {
		background: #333;
	}
	
	.mui-table-view .mui-media-body {
		color: #fff;
		line-height: 42px;
		height: 42px;
	}
	
	.mui-navigate-right:after {
		color: #fff;
	}
</style>