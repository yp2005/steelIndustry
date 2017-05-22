<template>
	<div class="usermanager">
		<p class="conditions">
			<a href="javascript: void(0)" @tap="selectState">{{state.text}}</a>
			<a href="javascript: void(0)" @tap="selectSortType">{{sortType.text}}</a>
		</p>
		<p class="userStatistics">
			<span>用户量：</span><span class="userNumSpan">{{userNum}}</span>
			<span>周活跃：</span><span class="userNumSpan">{{activeNum}}</span>
		</p>
		<div class="mui-scroll-wrapper">
			<div id="pullrefresh" class="mui-scroll">
				<div class="oneUser" v-for="user in userList" @tap="open('../../commonpage/usermanager/userDetail.html', user.id, $event)">
					<img :src="user.avatar" />
					<div class="userInfo">
						<p class="mui-ellipsis">{{user.userName || user.mobileNumber}}</p>
						<p>最后登录时间：{{user.latestLoginTime}}</p>
						<p>
							<img v-show="user.realNameAuthentication == 1" src="../../../../../static/img/mine/shimingrenzheng.svg">
							<img v-else src="../../../../../static/img/mine/noshimingrenzheng.svg">
							<img v-show="user.enterpriseCertification == 1" src="../../../../../static/img/mine/qiyerenzheng.svg">
							<img v-else src="../../../../../static/img/mine/noqiyerenzheng.svg">
						</p>
						<p>
							<a href="javascript:void(0)" v-if="user.realNameAuthentication == 2" @tap="open('../../commonpage/usermanager/personauth.html', user.id, $event)">实名审核</a>
							<a href="javascript:void(0)" v-if="user.enterpriseCertification == 2" @tap="open('../../commonpage/usermanager/enterpriseauth.html', user.id, $event)">企业审核</a>
							<a href="javascript:void(0)" v-if="user.state == 1" class="fenghao" @tap="fenghao($index, 0, $event)">封号</a>
							<a href="javascript:void(0)" v-if="user.state == 0" class="fenghao" @tap="fenghao($index, 1, $event)">解封</a>
						</p>
					</div>
				</div>
				<p v-show="!userList || userList.length === 0" class="noData">暂无数据</p>
			</div>
		</div>
	</div>
</template>

<script>
	import muiUtils from 'common/muiUtils';
	import api from 'api';
	import CONSTS from 'common/consts';
	export default {
		data: function() {
			var statePicker = new mui.PopPicker({
				layer: 1
			});
			statePicker.setData([{
				value: 0,
				text: '全部',
			}, {
				value: 1,
				text: '待实名审核用户',
			}, {
				value: 2,
				text: '待企业审核用户',
			}]);
			var sortTypePicker = new mui.PopPicker({
				layer: 1
			});
			sortTypePicker.setData([{
				value: 0,
				text: '按最后登录时间排序',
			}, {
				value: 1,
				text: '按注册时间排序',
			}, {
				value: 2,
				text: '按更新时间排序',
			}]);
			return {
				userList: [],
				userNum: 0,
				activeNum: 0,
				pullrefresh: null,
				statePicker: statePicker,
				sortTypePicker: sortTypePicker,
				state: {
					value: 0,
					text: '全部'
				},
				sortType: {
					value: 1,
					text: '按最后登录时间排序',
				},
				searchValue: ''
			};
		},
		created() {
			this.getData(true);
		},
		methods: {
			fenghao(index, state, e) {
				var that = this;
				var btnArray = ['取消', '确定'];
				mui.confirm(state == 1 ? '确认解封？' : '确认封号？', '操作提示', btnArray, function(e) {
					if(e.index == 1) {
						muiUtils.muiAjax(api.APIS.user.updateUserState, {
							data: JSON.stringify({
								id: that.userList[index].id,
								state: state
							}),
							contentType: 'application/json',
							dataType: "json",
							type: "post",
							success: function(data) {
								if(data.erroCode === CONSTS.ERROR_CODE.SUCCESS) {
									mui.toast(state == 1 ? '已解封成功！' : '已封号成功！');
									that.userList[index].state = state;
									that.userList.$set(index, JSON.parse(JSON.stringify(that.userList[index])))
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
				e.stopPropagation();
			},
			open(url, userId, e) {
				muiUtils.openWindow(url, url, {
					extras: {
						userId: userId
					},
					isValidLogin: true
				});
				e.stopPropagation();
			},
			selectState() {
				var that = this;
				this.statePicker.show(function(items) {
					that.state = items[0];
				});
			},
			selectSortType() {
				var that = this;
				this.sortTypePicker.show(function(items) {
					that.sortType = items[0];
				});
			},
			getData(loading) {
				var data = {
					rowStartNumber: 0,
					rowCount: 10,
					keyword: this.searchValue,
					sortType: this.sortType.value
				};
				if(this.state.value > 0) {
					if(this.state.value == 1) {
						data.realNameAuthentication = 2;
					} else if(this.state.value == 2) {
						data.enterpriseCertification = 2;
					}
				}
				var that = this;
				muiUtils.muiAjax(api.APIS.user.getUserList, {
					dataType: "json",
					contentType: 'application/json',
					type: "post",
					data: JSON.stringify(data),
					success: function(data) {
						if(data.erroCode === CONSTS.ERROR_CODE.SUCCESS) {
							if(data.result.userList && data.result.userList.length > 0) {
								for(var user of data.result.userList) {
									if(user.avatar) {
										user.avatar = data.result.imgServer + user.avatar;
									} else {
										user.avatar = '1';
									}
								}
							}
							that.userList = data.result.userList;
							that.userNum = data.result.userNumber;
							that.activeNum = data.result.activeUserNumber;
						} else {
							mui.toast(data.erroCode + '：' + data.erroMsg);
						}
						that.pullrefresh.endPullDownToRefresh();
						that.pullrefresh.refresh(true);
					},
					error: function(xhr, type, errorThrown) {
						that.pullrefresh.endPullDownToRefresh();
						that.pullrefresh.refresh(true);
						mui.toast('服务器或网络异常，请稍后重试。');
					},
					loading: loading
				});
			},
			loadMore() {
				var data = {
					rowStartNumber: this.userList.length,
					rowCount: 10,
					keyword: this.searchValue,
					sortType: this.sortType.value
				};
				if(this.state.value > 0) {
					if(this.state.value == 1) {
						data.realNameAuthentication = 2;
					} else if(this.state.value == 2) {
						data.enterpriseCertification = 2;
					}
				}
				var that = this;
				muiUtils.muiAjax(api.APIS.user.getUserList, {
					dataType: "json",
					contentType: 'application/json',
					type: "post",
					data: JSON.stringify(data),
					success: function(data) {
						if(data.erroCode === CONSTS.ERROR_CODE.SUCCESS) {
							if(!data.result.userList || data.result.userList.length === 0) {
								that.pullrefresh.endPullUpToRefresh(true);
								return;
							}
							for(var user of data.result.userList) {
								if(user.avatar) {
									user.avatar = data.result.imgServer + user.avatar;
								} else {
									user.avatar = '1';
								}
							}
							that.userList = that.userList.concat(data.result.userList);
							that.userNum = data.result.userNumber;
							that.activeNum = data.result.activeUserNumber;
						} else {
							mui.toast(data.erroCode + '：' + data.erroMsg);
						}
						that.pullrefresh.endPullUpToRefresh();
					},
					error: function(xhr, type, errorThrown) {
						that.pullrefresh.endPullUpToRefresh();
						mui.toast('服务器或网络异常，请稍后重试。')
					},
					loading: false
				});
			}
		},
		watch: {
			searchValue: function() {
				this.getData(true);
			},
			'state.value': function() {
				this.getData(true);
			},
			'sortType.value': function() {
				this.getData(true);
			},
		},
		ready: function() {
			var deceleration = mui.os.ios ? 0.003 : 0.0009;
			mui('.mui-scroll-wrapper').scroll({
				bounce: true,
				indicators: true, //是否显示滚动条
				deceleration: deceleration
			});
			var that = this;
			this.pullrefresh = mui('#pullrefresh').pullToRefresh({
				down: {
					auto: false,
					offset: 50,
					callback: function() {
						that.getData(false);
					}
				},
				up: {
					offset: 50,
					callback: function() {
						that.loadMore();
					}
				}
			});
			window.addEventListener('updateUserInfo', function() {
				that.getData(true);
			});
		}
	};
</script>
<style>
	.usermanager {
		position: absolute;
		top: 45px;
		bottom: 0;
		width: 100%;
	}
	
	.usermanager .mui-scroll-wrapper {
		top: 90px;
	}
	
	.usermanager .conditions {
		line-height: 25px;
		padding: 10px 0;
		text-align: center;
	}
	
	.usermanager .conditions a {
		color: #000;
		width: 48%;
		position: relative;
	}
	
	.usermanager .conditions a:nth-child(1) {
		border-right: solid 1px #ddd;
	}
	
	.usermanager .conditions a:after {
		content: "";
		position: absolute;
		width: 4px;
		height: 4px;
		margin-left: 5px;
		top: 10px;
		box-sizing: border-box;
		border-top: 4px solid #aaa;
		border-right: 4px solid transparent;
		border-left: 4px solid transparent;
	}
	
	.usermanager .userStatistics {
		line-height: 25px;
		padding: 10px 0 10px 30px;
		background-color: #fff;
	}
	
	.usermanager .userStatistics span {
		color: #000;
	}
	
	.usermanager .userStatistics span.userNumSpan {
		color: #26c6da;
		margin-right: 20px;
	}
	
	.noData {
		line-height: 250px;
		text-align: center;
	}
	
	.oneUser {
		padding: 10px;
		background-color: #fff;
		margin-bottom: 8px;
	}
	
	.oneUser img {
		float: left;
		width: 106px;
		height: 106px;
	}
	
	.oneUser .userInfo {
		padding-left: 116px;
		min-height: 80px;
	}
	
	.oneUser .userInfo p {
		font-size: 13px;
	}
	
	.oneUser .userInfo p:nth-child(1) {
		color: #000;
		font-size: 14px;
	}
	
	.oneUser .userInfo p:nth-child(3) {
		overflow: hidden;
		padding: 5px 0;
	}
	
	.oneUser .userInfo p:nth-child(3) img {
		width: 19px;
		height: 19px;
		margin-right: 4px;
	}
	
	.oneUser .userInfo p:nth-child(4) a {
		color: #fff;
		background-color: #26c6da;
		line-height: 1;
		padding: 5px 8px;
		border-radius: 3px;
		margin: 5px 0;
		margin-right: 5px;
	}
	
	.oneUser .userInfo p:nth-child(4) a.fenghao {
		color: red;
		background-color: #fff;
		border: solid 1px red;
	}
	
	.oneUser .userInfo p:nth-child(4) span {
		line-height: 1;
		margin-top: 4px;
		font-size: 19px;
		font-weight: 800;
		color: #777;
	}
	
	.mui-poppicker {
		top: 90px;
		bottom: auto;
		transform: translateY(-390px);
	}
</style>