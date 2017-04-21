<template>
	<div class="mui-scroll-wrapper myproject">
		<div class="mui-scroll">
			<div class="oneRow" v-for="project in projectList" @tap="gotoDetail(project)">
				<img :src="project.picture" />
				<div class="rowRight">
					<p class="mui-ellipsis">{{project.projectName}}</p>
					<p>{{project.companyName}}</p>
					<p>{{project.updateTime}}</p>
					<p>{{project.stateValue}}</p>
					<p>
						<a v-if="project.state === 0" @tap="updateState($event, project, 2)" href="javascript:void(0)">提交</a>
						<a v-if="project.state !== 2" @tap="edit($event, project)" href="javascript:void(0)">编辑</a>
						<a v-if="project.state === 1 || project.state === 2" @tap="updateState($event, project, 0)" href="javascript:void(0)" class="red">撤销</a>
						<a v-if="project.state === 0 || project.state === 3" @tap="delete($event, $index)" href="javascript:void(0)" class="red">删除</a>
					</p>
				</div>
			</div>
		</div>
		<p class="noProject" v-show="!projectList || projectList.length === 0">
			<a href="javascript:void(0)" @tap="releaseProject">发布工程</a>
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
				userInfo: cacheUtils.localStorage(CONSTS.USER_INFO).getObject(CONSTS.USER_INFO),
				projectList: plus.webview.currentWebview().projectList,
				picture: '1'
			};
		},
		created() {
			var that = this;
			if(!this.projectList) {
				muiUtils.muiAjax(api.APIS.project.getUserProject, {
					dataType: "json",
					type: "get",
					success: function(data) {
						if(data.erroCode === CONSTS.ERROR_CODE.SUCCESS) {
							that.projectList = data.result.projectList;
							if(!that.projectList) {
								return;
							}
							for(var project of that.projectList) {
								project.picture = project.pictures.length > 0 ? project.pictures[0] : '1';
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
						} else {
							mui.toast(data.erroCode + '：' + data.erroMsg);
						}
					},
					error: function(xhr, type, errorThrown) {
						mui.toast('服务器或网络异常，请稍后重试。')
					}
				});
			} else {
				for(var project of that.projectList) {
					project.picture = project.pictures.length > 0 ? project.pictures[0] : '1';
				}
			}
		},
		methods: {
			releaseProject() {
				muiUtils.openWindow('../../bizpage/release/project.html', '../../bizpage/release/project.html', {
					isClose: true
				});
			},
			gotoDetail: function(project) {
				muiUtils.openWindow('../../bizpage/project/projectinfo.html', '../../bizpage/project/projectinfo.html', {
					extras: {
						project: project
					}
				});
			},
			updateState(event, project, state) {
				var that = this;
				muiUtils.muiAjax(api.APIS.project.updateProjectState, {
					data: JSON.stringify({
						id: project.id,
						state: state
					}),
					contentType: 'application/json',
					dataType: "json",
					type: "post",
					success: function(data) {
						if(data.erroCode === CONSTS.ERROR_CODE.SUCCESS) {
							project.state = state;
							switch(state) {
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
							project = JSON.parse(JSON.stringify(project));
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
			edit(event, project) {
				muiUtils.openWindow('../../bizpage/release/project.html', '../../bizpage/release/project.html', {
					isValidLogin: true,
					isClose: true,
					extras: {
						project: project
					}
				});
				event.stopPropagation();
			},
			delete(event, index) {
				var btnArray = ['取消', '确定'];
				var that = this;
				mui.confirm('确认删除工程？', '操作提示', btnArray, function(e) {
					if(e.index == 1) {
						muiUtils.muiAjax(api.APIS.project.deleteProject + '?id=' + that.projectList[index].id, {
							dataType: "json",
							type: "delete",
							success: function(data) {
								if(data.erroCode === CONSTS.ERROR_CODE.SUCCESS) {
									that.projectList.splice(index, 1);
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
			mui('.mui-scroll-wrapper.myproject').scroll({
				bounce: true,
				indicators: false, // 是否显示滚动条
				deceleration: mui.os.ios ? 0.003 : 0.0009
			});
		}
	};
</script>
<style>
	.myproject {
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
		/*padding: 5px 0;*/
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
	
	.noProject {
		line-height: 30px;
		margin-top: -15px;
		position: absolute;
		top: 40%;
		left: 0;
		width: 100%;
		text-align: center;
	}
	
	.noProject a {
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