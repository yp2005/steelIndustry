<template>
	<div class="mycard">
		<div class="oneRow" v-if="masterCard" @tap="gotoDetail">
			<img :src="picture" />
			<div class="rowRight">
				<p class="mui-ellipsis">{{masterCard.cardTitle}}</p>
				<p>{{masterCard.workerTypes[0].typeName + '...'}}</p>
				<p>{{masterCard.updateTime}}</p>
				<p>{{masterCard.stateValue}}</p>
				<p>
					<a v-if="masterCard.state === 0" @tap="updateState($event, 2)" href="javascript:void(0)">提交</a>
					<a v-if="masterCard.state !== 2" @tap="edit($event)" href="javascript:void(0)">编辑</a>
					<a v-if="masterCard.state === 1 || masterCard.state === 2" @tap="updateState($event, 0)" href="javascript:void(0)" class="red">撤销</a>
					<a v-if="masterCard.state === 0 || masterCard.state === 3" @tap="delete($event)" href="javascript:void(0)" class="red">删除</a>
					<a v-if="masterCard.state === 1 && masterCard.isWorking === 1" @tap="updateIsWorking($event, 0)" href="javascript:void(0)">已工作</a>
					<a v-if="masterCard.state === 1 && masterCard.isWorking === 0" @tap="updateIsWorking($event, 1)" href="javascript:void(0)">待业</a>
				</p>
			</div>
		</div>
		<p class="noMasterCard" v-else>
			<a href="javascript:void(0)" @tap="releaseCard">发布名片</a>
		</p>
	</div>
</template>

<script>
	import muiUtils from 'common/muiUtils';
	import api from 'api';
	import CONSTS from 'common/consts';
	import cacheUtils from 'common/cacheUtils';
	export default {
		data: function() {
			return {
				userInfo: cacheUtils.localStorage(CONSTS.PREFIX_LOGIN).getObject(CONSTS.USER_INFO),
				masterCard: plus.webview.currentWebview().masterCard,
				picture: '1'
			};
		},
		created() {
			var that = this;
			if(this.masterCard) {
				this.picture = this.masterCard.pictures.length > 0 ? this.masterCard.pictures[0] : (this.userInfo.avatar || '1');
				return;
			}
			muiUtils.muiAjax(api.APIS.masterCard.getMasterCard, {
				dataType: "json",
				type: "get",
				success: function(data) {
					if(data.erroCode === CONSTS.ERROR_CODE.SUCCESS) {
						that.masterCard = data.result;
						if(!that.masterCard) {
							return;
						}
						switch(that.masterCard.state) {
							case 0:
								that.masterCard.stateValue = '草稿';
								break;
							case 1:
								that.masterCard.stateValue = '通过审核';
								break;
							case 2:
								that.masterCard.stateValue = '审核中';
								break;
							case 3:
								that.masterCard.stateValue = '审核不通过';
								break;
						}
						that.picture = that.masterCard.pictures.length > 0 ? that.masterCard.pictures[0] : (that.userInfo.avatar || '1');
					} else {
						mui.toast(data.erroCode + '：' + data.erroMsg);
					}
				},
				error: function(xhr, type, errorThrown) {
					mui.toast('服务器或网络异常，请稍后重试。')
				}
			});
		},
		methods: {
			releaseCard() {
				muiUtils.openWindow('../../bizpage/release/card.html', '../../bizpage/release/card.html', {
					isClose: true
				});
			},
			gotoDetail: function() {
				muiUtils.openWindow('../../bizpage/master/masterinfo.html', '../../bizpage/master/masterinfo.html', {
					extras: {
						masterCard: this.masterCard
					}
				});
			},
			updateState(event, state) {
				var that = this;
				muiUtils.muiAjax(api.APIS.masterCard.updateMasterCardState, {
					data: JSON.stringify({
						id: this.masterCard.id,
						state: state
					}),
					contentType: 'application/json',
					dataType: "json",
					type: "post",
					success: function(data) {
						if(data.erroCode === CONSTS.ERROR_CODE.SUCCESS) {
							that.masterCard.state = state;
							switch(state) {
								case 0:
									that.masterCard.stateValue = '草稿';
									break;
								case 1:
									that.masterCard.stateValue = '通过审核';
									break;
								case 2:
									that.masterCard.stateValue = '审核中';
									break;
								case 3:
									that.masterCard.stateValue = '审核不通过';
									break;
							}
							that.masterCard = JSON.parse(JSON.stringify(that.masterCard));
						} else {
							mui.toast(data.erroCode + '：' + data.erroMsg);
						}
					},
					error: function(xhr, type, errorThrown) {
						mui.toast('服务器或网络异常，请稍后重试。');
					}
				});
				event.stopPropagation();
			},
			edit(event) {
				muiUtils.openWindow('../../bizpage/release/card.html', '../../bizpage/release/card.html', {
					isValidLogin: true,
					isClose: true,
					extras: {
						masterCard: this.masterCard
					}
				});
				event.stopPropagation();
			},
			delete(event) {
				var btnArray = ['取消', '确定'];
				var that = this;
				mui.confirm('确认删除名片？', '操作提示', btnArray, function(e) {
					if(e.index == 1) {
						muiUtils.muiAjax(api.APIS.masterCard.deleteMasterCard + '?id=' + that.masterCard.id, {
							dataType: "json",
							type: "delete",
							success: function(data) {
								if(data.erroCode === CONSTS.ERROR_CODE.SUCCESS) {
									that.masterCard = undefined;
								} else {
									mui.toast(data.erroCode + '：' + data.erroMsg);
								}
							},
							error: function(xhr, type, errorThrown) {
								mui.toast('服务器或网络异常，请稍后重试。');
							}
						});
					}
				});
				event.stopPropagation();
			},
			updateIsWorking(event, state) {
				var that = this;
				muiUtils.muiAjax(api.APIS.masterCard.updateMasterCardWorkState + '?isWorking=' + state, {
					dataType: "json",
					type: "post",
					success: function(data) {
						if(data.erroCode === CONSTS.ERROR_CODE.SUCCESS) {
							that.masterCard.isWorking = state;
							if(state === 1) {
								mui.toast('您已工作不会再显示您的名片信息');
							} else {
								mui.toast('您待业中，系统将正常显示您的名片');
							}
						} else {
							mui.toast(data.erroCode + '：' + data.erroMsg);
						}
					},
					error: function(xhr, type, errorThrown) {
						mui.toast('服务器或网络异常，请稍后重试。');
					}
				});
				event.stopPropagation();
			}
		}
	};
</script>
<style>
	.mycard {
		position: absolute;
		top: 45px;
		bottom: 0;
		width: 100%;
	}
	
	.oneRow {
		padding: 10px;
		background-color: #fff;
		margin-bottom: 8px;
	}
	
	.oneRow img {
		float: left;
		width: 106px;
		height: 106px;
	}
	
	.oneRow .rowRight {
		padding-left: 116px;
		min-height: 80px;
	}
	
	.oneRow .rowRight p {
		font-size: 13px;
	}
	
	.oneRow .rowRight p:nth-child(1) {
		color: #000;
		font-size: 14px;
	}
	
	.oneRow .rowRight p:nth-child(3) {
		overflow: hidden;
	}
	
	.oneRow .rowRight p:nth-child(4) {
		color: green;
	}
	
	.oneRow .rowRight p:nth-child(3) img {
		width: 19px;
		height: 19px;
		margin-right: 4px;
	}
	
	.oneRow .rowRight p:nth-child(5) a {
		color: #26c6da;
		line-height: 1;
		padding: 5px 8px;
		border-radius: 3px;
		margin: 5px 5px 5px 0;
		border: 1px solid #26c6da;
	}
	
	.oneRow .rowRight p:nth-child(5) span {
		line-height: 1;
		margin-top: 4px;
		font-size: 19px;
		font-weight: 800;
		color: #777;
	}
	
	.noMasterCard {
		line-height: 30px;
		margin-top: -15px;
		position: absolute;
		top: 40%;
		left: 0;
		width: 100%;
		text-align: center;
	}
	
	.noMasterCard a {
		padding: 0 15px;
		color: #26c6da;
		border: solid 1px #26c6da;
		border-radius: 3px;
	}
	
	.oneRow .rowRight p:nth-child(5) a.red {
		color: red;
		border-color: red;
	}
</style>