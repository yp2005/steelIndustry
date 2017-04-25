<template>
	<div class="mui-scroll-wrapper noticemanager">
		<div class="mui-scroll">
			<ul class="mui-table-view mui-table-view-striped mui-table-view-condensed">
				<li v-for="notice in noticeList" class="mui-table-view-cell" @tap="gotoEdit(notice)">
					<div class="mui-slider-right mui-disabled">
						<a class="mui-btn mui-btn-red" @tap="delete($index, $event)">删除</a>
					</div>
					<div class="mui-slider-handle mui-table">
						<div class="mui-table-cell mui-col-xs-10">
							<h4 class="mui-ellipsis">{{notice.title}}</h4>
							<h5>{{notice.createTime}}</h5>
							<p class="mui-h6 mui-ellipsis">{{notice.content}}</p>
						</div>
					</div>
				</li>
			</ul>
			<p v-show="!noticeList || noticeList.length === 0" class="noData">暂无公告</p>
		</div>
	</div>
</template>

<script>
	import muiUtils from 'common/muiUtils';
	import api from 'api';
	import CONSTS from 'common/consts';
	export default {
		data: function() {
			return {
				noticeList: []
			};
		},
		created() {
			this.getData();
		},
		methods: {
			gotoEdit(notice) {
				muiUtils.openWindow('../../commonpage/noticemanager/noticenew.html', '../../commonpage/noticemanager/noticenew.html', {
					extras: {
						notice: notice
					}
				});
			},
			getData() {
				var that = this;
				muiUtils.muiAjax(api.APIS.systemNotice.getSystemNoticeList, {
					dataType: "json",
					type: "get",
					success: function(data) {
						if(data.erroCode === CONSTS.ERROR_CODE.SUCCESS) {
							that.noticeList = data.result;
						} else {
							mui.toast(data.erroCode + '：' + data.erroMsg);
						}
					},
					error: function(xhr, type, errorThrown) {
						mui.toast('服务器或网络异常，请稍后重试。')
					}
				});
			},
			delete(index, e) {
				var that = this;
				muiUtils.muiAjax(api.APIS.systemNotice.deleteSystemNotice + '?id=' + that.noticeList[index].id, {
					dataType: "json",
					type: "delete",
					success: function(data) {
						if(data.erroCode === CONSTS.ERROR_CODE.SUCCESS) {
							that.noticeList.splice(index, 1);
						} else {
							mui.toast(data.erroCode + '：' + data.erroMsg);
						}
					},
					error: function(xhr, type, errorThrown) {
						mui.toast('服务器或网络异常，请稍后重试。')
					}
				});
				e.stopPropagation();
			}
		},
		ready: function() {
			var that = this;
			var deceleration = mui.os.ios ? 0.003 : 0.0009;
			mui('.mui-scroll-wrapper').scroll({
				bounce: true,
				indicators: false,
				deceleration: deceleration
			});
			window.addEventListener('noticenew', function() {
				that.getData();
			});
		}
	};
</script>
<style>
	.noticemanager {
		position: absolute;
		top: 45px;
		bottom: 0;
		width: 100%;
	}
	
	.mui-table h4,
	.mui-table h5,
	.mui-table .mui-h5,
	.mui-table .mui-h6,
	.mui-table p {
		margin-top: 0;
	}
	
	.mui-table h4 {
		line-height: 21px;
		font-weight: 500;
		font-size: 16px;
	}
	
	.mui-table h5 {
		line-height: 23px;
	}
	
	.mui-table p {
		font-size: 13px;
	}
	
	.mui-table .oa-icon {
		position: absolute;
		right: 0;
		bottom: 0;
	}
	
	.mui-table .oa-icon-star-filled {
		color: #f14e41;
	}
	
	.noData {
		line-height: 250px;
		text-align: center;
	}
</style>