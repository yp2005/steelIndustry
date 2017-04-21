<template>
	<div class="mui-scroll-wrapper notice">
		<div class="mui-scroll">
			<span class="titlespan">{{message.title}}</span>
			<p>{{message.content}}</p>
			<p class="time">{{message.createTime}}</p>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				message: plus.webview.currentWebview().message
			};
		},
		ready() {
			mui('.mui-scroll-wrapper').scroll({
				bounce: true,
				indicators: false, // 是否显示滚动条
				deceleration: mui.os.ios ? 0.003 : 0.0009
			});
		}
	}
</script>
<style scoped>
	.notice {
		position: absolute;
		top: 45px;
		bottom: 0;
		width: 100%;
		background-color: #fff;
	}
	
	p {
		text-indent: 2em;
		padding: 0px 10px;
		color: #555;
	}
	
	.titlespan {
		font-weight: bold;
		display: block;
		text-align: center;
		padding: 20px;
		color: #333;
	}
	
	.time {
		text-align: right;
		color: #444;
		padding: 20px;
	}
</style>