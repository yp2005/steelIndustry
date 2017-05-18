<template>
	<div class="mui-scroll-wrapper mywork">
		<div class="mui-scroll">
			<div class="oneRow" v-for="employmentDemand in employmentDemandList" @tap="gotoDetail(employmentDemand)">
				<img :src="employmentDemand.picture" />
				<div class="rowRight">
					<p class="mui-ellipsis">{{employmentDemand.demandTitle}}</p>
					<p>{{employmentDemand.workerTypes[0].typeName + '...'}}</p>
					<p>{{employmentDemand.updateTime}}</p>
					<p>{{employmentDemand.stateValue}}</p>
					<p>
						<a v-if="employmentDemand.state === 0" @tap="updateState($event, $index, 2)" href="javascript:void(0)">提交</a>
						<a v-if="employmentDemand.state !== 2" @tap="edit($event, employmentDemand)" href="javascript:void(0)">编辑</a>
						<a v-if="employmentDemand.state === 1 || employmentDemand.state === 2" @tap="updateState($event, $index, 0)" href="javascript:void(0)" class="red">撤销</a>
						<a v-if="employmentDemand.state === 0 || employmentDemand.state === 3" @tap="delete($event, $index)" href="javascript:void(0)" class="red">删除</a>
					</p>
				</div>
			</div>
		</div>
		<p class="noWork" v-show="!employmentDemandList || employmentDemandList.length === 0">
			<a href="javascript:void(0)" @tap="releaseEmploymentDemand">发布用工需求</a>
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
				employmentDemandList: plus.webview.currentWebview().employmentDemandList,
				picture: '1'
			};
		},
		created() {
			var that = this;
			if(!this.employmentDemandList) {
				muiUtils.muiAjax(api.APIS.employmentDemand.getUserEmploymentDemand, {
					dataType: "json",
					type: "get",
					success: function(data) {
						if(data.erroCode === CONSTS.ERROR_CODE.SUCCESS) {
							that.employmentDemandList = data.result.employmentDemandList;
							if(!that.employmentDemandList) {
								return;
							}
							for(var employmentDemand of that.employmentDemandList) {
								employmentDemand.picture = employmentDemand.pictures.length > 0 ? that.dealPicture(employmentDemand.pictures[0]) : '1';
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
						} else {
							mui.toast(data.erroCode + '：' + data.erroMsg);
						}
					},
					error: function(xhr, type, errorThrown) {
						mui.toast('服务器或网络异常，请稍后重试。')
					}
				});
			} else {
				for(var employmentDemand of that.employmentDemandList) {
					employmentDemand.picture = employmentDemand.pictures.length > 0 ? that.dealPicture(employmentDemand.pictures[0]) : '1';
				}
			}
		},
		methods: {
			dealPicture(pic) {
				var fileName = pic.substring(pic.lastIndexOf('/') + 1, pic.length);
				var path = pic.substring(0, pic.lastIndexOf('/'));
				return path + '/small_' + fileName;
			},
			releaseEmploymentDemand() {
				muiUtils.openWindow('../../bizpage/release/work.html', '../../bizpage/release/work.html', {
					isClose: true
				});
			},
			gotoDetail: function(employmentDemand) {
				muiUtils.openWindow('../../bizpage/work/workinfo.html', '../../bizpage/work/workinfo.html', {
					extras: {
						employmentDemand: employmentDemand
					}
				});
			},
			updateState(event, index, state) {
				var employmentDemand = this.employmentDemandList[index];
				var that = this;
				muiUtils.muiAjax(api.APIS.employmentDemand.updateEmploymentDemandState, {
					data: JSON.stringify({
						id: employmentDemand.id,
						state: state
					}),
					contentType: 'application/json',
					dataType: "json",
					type: "post",
					success: function(data) {
						if(data.erroCode === CONSTS.ERROR_CODE.SUCCESS) {
							employmentDemand.state = state;
							switch(state) {
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
							that.employmentDemandList.splice(index, 1);
							that.$nextTick(function() {
								that.employmentDemandList.splice(index, 0, employmentDemand);
							});
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
			edit(event, employmentDemand) {
				muiUtils.openWindow('../../bizpage/release/work.html', '../../bizpage/release/work.html', {
					isValidLogin: true,
					isClose: true,
					extras: {
						employmentDemand: employmentDemand
					}
				});
				event.stopPropagation();
			},
			delete(event, index) {
				var btnArray = ['取消', '确定'];
				var that = this;
				mui.confirm('确认删除店铺？', '操作提示', btnArray, function(e) {
					if(e.index == 1) {
						muiUtils.muiAjax(api.APIS.employmentDemand.deleteEmploymentDemand + '?id=' + that.employmentDemandList[index].id, {
							dataType: "json",
							type: "delete",
							success: function(data) {
								if(data.erroCode === CONSTS.ERROR_CODE.SUCCESS) {
									that.employmentDemandList.splice(index, 1);
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
			}
		},
		ready() {
			mui('.mui-scroll-wrapper.mywork').scroll({
				bounce: true,
				indicators: false, // 是否显示滚动条
				deceleration: mui.os.ios ? 0.003 : 0.0009
			});
		}
	};
</script>
<style>
	.mywork {
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
	
	.noWork {
		line-height: 30px;
		margin-top: -15px;
		position: absolute;
		top: 40%;
		left: 0;
		width: 100%;
		text-align: center;
	}
	
	.noWork a {
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