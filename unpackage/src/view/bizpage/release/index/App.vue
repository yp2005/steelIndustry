/** * @file 发布页主组件 * @Author yupeng * @private */

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
			<div class="project" @tap="open('../../bizpage/release/project.html')">
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
					<div class="worker" @tap="open('../../bizpage/release/work.html')">
						<div>
							<p><img src="../../../../static/img/release/worker.svg"></p>
							<p>发布用工需求</p>
							<p>海量师傅等你挑</p>
						</div>
					</div>
				</div>
				<div>
					<div class="store" @tap="open('../../bizpage/release/store.html')">
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
	import api from 'api';
	import CONSTS from 'common/consts';
	export default {
		methods: {
			close() {
				plus.webview.currentWebview().close('slide-out-bottom');
			},
			open(url) {
				var that = this;
				if(url === '../../bizpage/release/card.html') {
					muiUtils.muiAjax(api.APIS.masterCard.getMasterCard, {
						dataType: "json",
						type: "get",
						success: function(data) {
							if(data.erroCode === CONSTS.ERROR_CODE.SUCCESS) {
								if(data.result) {
									var masterCard = data.result;
									switch(masterCard.state) {
										case 0:
											masterCard.stateValue = '草稿';
											break;
										case 1:
											masterCard.stateValue = '通过审核';
											break;
										case 2:
											masterCard.stateValue = '审核中';
											break;
										case 3:
											masterCard.stateValue = '审核不通过';
											break;
									}
									muiUtils.openWindow('../../commonpage/mine/mycard.html', '../../commonpage/mine/mycard.html', {
										isValidLogin: true,
										isClose: true,
										extras: {
											masterCard: masterCard
										}
									});
								} else {
									muiUtils.openWindow(url, url, {
										isValidLogin: true,
										isClose: true
									});
								}
							} else {
								mui.toast(data.erroCode + '：' + data.erroMsg);
							}
						},
						error: function(xhr, type, errorThrown) {
							mui.toast('服务器或网络异常，请稍后重试。')
						}
					});
				} else if(url === '../../bizpage/release/store.html') {
					muiUtils.muiAjax(api.APIS.store.getStore, {
						dataType: "json",
						type: "get",
						success: function(data) {
							if(data.erroCode === CONSTS.ERROR_CODE.SUCCESS) {
								if(data.result) {
									var store = data.result;
									switch(store.state) {
										case 0:
											store.stateValue = '草稿';
											break;
										case 1:
											store.stateValue = '通过审核';
											break;
										case 2:
											store.stateValue = '审核中';
											break;
										case 3:
											store.stateValue = '审核不通过';
											break;
									}
									muiUtils.openWindow('../../commonpage/mine/mystore.html', '../../commonpage/mine/mystore.html', {
										isValidLogin: true,
										isClose: true,
										extras: {
											store: store
										}
									});
								} else {
									muiUtils.openWindow(url, url, {
										isValidLogin: true,
										isClose: true
									});
								}
							} else {
								mui.toast(data.erroCode + '：' + data.erroMsg);
							}
						},
						error: function(xhr, type, errorThrown) {
							mui.toast('服务器或网络异常，请稍后重试。');
						}
					});
				} else if(url === '../../bizpage/release/project.html') {
					muiUtils.muiAjax(api.APIS.project.getUserProject, {
						dataType: "json",
						type: "get",
						success: function(data) {
							if(data.erroCode === CONSTS.ERROR_CODE.SUCCESS) {
								if(data.result && data.result.projectList.length >= 10) {
									mui.toast('您最多发布十个工程信息！');
									var projectList = data.result.projectList;
									for(var project of projectList) {
										switch(project.state) {
											case 0:
												project.stateValue = '草稿';
												break;
											case 1:
												project.stateValue = '通过审核';
												break;
											case 2:
												project.stateValue = '审核中';
												break;
											case 3:
												project.stateValue = '审核不通过';
												break;
										}
									}
									muiUtils.openWindow('../../commonpage/mine/myproject.html', '../../commonpage/mine/myproject.html', {
										isValidLogin: true,
										isClose: true,
										extras: {
											projectList: projectList
										}
									});
								} else {
									muiUtils.openWindow(url, url, {
										isValidLogin: true,
										isClose: true
									});
								}
							} else {
								mui.toast(data.erroCode + '：' + data.erroMsg);
							}
						},
						error: function(xhr, type, errorThrown) {
							mui.toast('服务器或网络异常，请稍后重试。')
						}
					});
				} else if(url === '../../bizpage/release/work.html') {
					muiUtils.muiAjax(api.APIS.employmentDemand.getUserEmploymentDemand, {
						dataType: "json",
						type: "get",
						success: function(data) {
							if(data.erroCode === CONSTS.ERROR_CODE.SUCCESS) {
								if(data.result && data.result.employmentDemandList.length >= 10) {
									mui.toast('您最多发布十个用工需求！');
									var employmentDemandList = data.result.employmentDemandList;
									for(employmentDemand of employmentDemandList) {
										switch(employmentDemand.state) {
											case 0:
												employmentDemand.stateValue = '草稿';
												break;
											case 1:
												employmentDemand.stateValue = '通过审核';
												break;
											case 2:
												employmentDemand.stateValue = '审核中';
												break;
											case 3:
												employmentDemand.stateValue = '审核不通过';
												break;
										}
									}
									muiUtils.openWindow('../../commonpage/mine/mywork.html', '../../commonpage/mine/mywork.html', {
										isValidLogin: true,
										isClose: true,
										extras: {
											employmentDemandList: employmentDemandList
										}
									});
								} else {
									muiUtils.openWindow(url, url, {
										isValidLogin: true,
										isClose: true
									});
								}
							} else {
								mui.toast(data.erroCode + '：' + data.erroMsg);
							}
						},
						error: function(xhr, type, errorThrown) {
							mui.toast('服务器或网络异常，请稍后重试。')
						}
					});
				} else {
					muiUtils.openWindow(url, url, {
						isValidLogin: true,
						isClose: true
					});
				}
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
	
	.release>div {
		width: 50%;
		height: 100%;
	}
	
	.release>.mui-pull-left {
		padding: 0 8px 0 16px;
	}
	
	.release>.mui-pull-right {
		padding: 0 16px 0 8px;
	}
	
	.release>div div {
		float: left;
	}
	
	.top>div {
		height: 50%;
		width: 100%;
	}
	
	.top>div:nth-child(1) {
		padding-bottom: 8px;
	}
	
	.top>div:nth-child(2) {
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
	
	.release>p {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 50px;
		line-height: 50px;
		text-align: center;
		border-top: solid 1px #ccc;
	}
	
	.release>p span {
		color: #03a9f4;
		font-size: 40px;
		transform: rotate(45deg);
		width: 50px;
		font-weight: 800;
		font-family: monospace;
	}
</style>