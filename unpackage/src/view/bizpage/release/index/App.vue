/**
 * @file 发布页主组件 
 * @Author yupeng 
 * @private
 */

<template>
	<div class="release">
		<div class="mui-pull-left">
			<div class="mingpian" @tap="open('../../bizpage/release/card.html')">
				<div>
					<p><img src="../../../../static/img/release/mingpian.svg"></p>
					<p>发布师傅名片</p>
					<p>秀你自己</p>
				</div>
			</div>
			<div class="project">
				<div>
					<p><img src="../../../../static/img/release/project.svg"></p>
					<p>发布工程信息</p>
					<p>找人干工程</p>
				</div>
			</div>
		</div>
		
		<div class="mui-pull-right">
			<div class="top">
				<div>
					<div class="worker">
						<div>
							<p><img src="../../../../static/img/release/worker.svg"></p>
							<p>发布用工需求</p>
							<p>海量师傅等你挑</p>
						</div>
					</div>
				</div>
				<div>
					<div class="store">
						<div>
							<p><img src="../../../../static/img/release/store.svg"></p>
							<p>发布设备店铺</p>
							<p>好设备不愁卖</p>
						</div>
					</div>
				</div>
			</div>
			<div class="more">
				<div>
					<p>更多功能</p>
					<p>敬请期待...</p>
				</div>
			</div>
		</div>
		<p><span @tap="close">+</span></p>
	</div>
</template>

<script>
	import muiUtils from 'common/muiUtils';
	export default {
		methods: {
			close() {
				plus.webview.currentWebview().close('slide-out-bottom');
			},
			open(url) {
				muiUtils.openWindow(url, url, {
					isClose: true
				});
			}
		}
	};
</script>

<style>
	.release {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 100%;
		padding: 15% 0;
	}
	
	.release > div {
		width: 50%;
		height: 100%;
	}
	
	.release > .mui-pull-left {
		padding: 0 8px 0 16px;
	}
	
	.release > .mui-pull-right {
		padding: 0 16px 0 8px;
	}
	
	.release > div div {
		float: left;
	}
	
	.top > div {
		height: 50%;
		width: 100%;
	}
	
	.top > div:nth-child(1) {
		padding-bottom: 8px;
	}
	
	.top > div:nth-child(2) {
		padding-top: 8px;
	}
	
	.mingpian,
	.project,
	.worker,
	.store,
	.more {
		border-radius: 10px;
		position: relative;
	}
	
	.mingpian div,
	.project div,
	.worker div,
	.store div,
	.more div {
		width: 100%;
		position: absolute;
		top: 50%;
		margin-top: -43px;
	}
	
	.mingpian div {
		margin-top: -53px;
	}
	
	.more div {
		margin-top: -21px;
	}
	
	.mingpian div p,
	.project div p,
	.worker div p,
	.store div p,
	.more div p {
		text-align: center;
		color: #fff;
	}
	
	.more div p {
		font-size: 16px;
		line-height: 18px;
		color: #333;
	}
	
	.more div p:nth-child(2) {
		padding-left: 13px;
	}
	
	.mingpian div p:nth-child(2),
	.project div p:nth-child(2),
	.worker div p:nth-child(2),
	.store div p:nth-child(2) {
		font-size: 18px;
		line-height: 27px;
		padding-top: 5px;
	}
	
	.mingpian div p:nth-child(3),
	.project div p:nth-child(3),
	.worker div p:nth-child(3),
	.store div p:nth-child(3) {
		font-size: 13px;
		line-height: 1;
	}
	
	.project div img,
	.worker div img,
	.store div img,
	.more div img {
		width: 40px;
		height: 40px;
	}
	
	.mingpian div img {
		width: 60px;
		height: 60px;
	}
	
	.top,
	.mingpian {
		width: 100%;
		height: 60%;
		margin-bottom: 16px;
	}
	
	.mingpian {
		background-color: #05a7f8;
	}
	
	.project {
		height: 30%;
		width: 100%;
		background-color: #18c0d5;
	}
	
	.more {
		height: 30%;
		width: 100%;
		background-color: #ccc;
	}
	
	.worker {
		width: 100%;
		height: 100%;
		background-color: #21cf90;
	}
	
	.store {
		width: 100%;
		height: 100%;
		background-color: #6490ff;
	}
	
	.release > p {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 50px;
		line-height: 50px;
		text-align: center;
		border-top: solid 1px #ccc;
	}
	
	.release > p span {
		color: #03a9f4;
		font-size: 40px;
		transform: rotate(45deg);
		width: 50px;
		font-weight: 800;
		font-family: monospace;
	}
</style>