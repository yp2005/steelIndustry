<template>
	<div class="mycard">
		<div class="oneStore" @tap="gotoDetail">
			<img src="{{masterCard.pictures.length > 0 ? masterCard.pictures[0] : (userInfo.avatar || '1')}}" />
			<div class="storeInfo">
				<p class="mui-ellipsis">{{masterCard.cardTitle}}</p>
				<p>{{masterCard.workerTypes[0].typeName + '...'}}</p>
				<p>{{masterCard.updateTime}}</p>
				<p>{[masterCard.stateValue]}</p>
				<p>
					<a v-if="!submitFlag" @tap="cardSubmit($event)" href="javascript:void(0)">提交</a>
					<a @tap="gotoEdit('id')" href="javascript:void(0)">编辑</a>
					<a v-if="submitFlag" @tap="cardCancel('id',$event)" href="javascript:void(0)" style="color:red;border-color: red;">撤销</a>
					<a v-if="!submitFlag" @tap="cardDelete('id',$event)" href="javascript:void(0)" style="color:red;border-color: red;">删除</a>
				</p>
			</div>
		</div>
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
				masterCard: {},
				submitFlag: false,
				disnonetworkmask: false,
				pullrefresh: null
			};
		},
		created() {
			muiUtils.muiAjax(api.APIS.masterCard.getMasterCard, {
				dataType: "json",
				type: "get",
				success: function(data) {
					if(data.erroCode === CONSTS.ERROR_CODE.SUCCESS) {
						this.masterCard = data.result;
						switch(this.masterCard.state) {
							case 0 :
								this.masterCard.stateValue = '草稿';
								break;
							case 1 :
								this.masterCard.stateValue = '通过审核';
								break;
							case 2 :
								this.masterCard.stateValue = '审核中';
								break;
							case 3 :
								this.masterCard.stateValue = '审核不通过';
								break;
						}
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
			gotoDetail: function(id) {
				muiUtils.openWindow('../../bizpage/master/masterinfo.html', '../../bizpage/master/masterinfo.html', {
					extras: {
						'id': id
					}
				});
			},
			gotoEdit: function(id) {
				muiUtils.openWindow('../../bizpage/release/card.html', '../../bizpage/release/card.html', {
					extras: {
						'id': id
					}
				});
			},
			cardSubmit: function(event) {
				mui.toast("提交成功！");
				event.stopPropagation();
			},
			cardCancel: function(id, event) {
				mui.toast("撤销成功！");
				event.stopPropagation();
			},
			cardDelete: function(id, event) {
				mui.toast("删除成功！");
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
	
	.oneStore {
		padding: 10px;
		background-color: #fff;
		margin-bottom: 8px;
	}
	
	.oneStore img {
		float: left;
		width: 106px;
		height: 106px;
	}
	
	.oneStore .storeInfo {
		padding-left: 116px;
		min-height: 80px;
	}
	
	.oneStore .storeInfo p {
		font-size: 13px;
	}
	
	.oneStore .storeInfo p:nth-child(1) {
		color: #000;
		font-size: 14px;
	}
	
	.oneStore .storeInfo p:nth-child(3) {
		overflow: hidden;
		/*padding: 5px 0;*/
	}
	
	.oneStore .storeInfo p:nth-child(3) img {
		width: 19px;
		height: 19px;
		margin-right: 4px;
	}
	
	.oneStore .storeInfo p:nth-child(5) a {
		color: #26c6da;
		line-height: 1;
		padding: 5px 8px;
		border-radius: 3px;
		margin: 5px 0;
		border: 1px solid #26c6da;
	}
	
	.oneStore .storeInfo p:nth-child(5) span {
		line-height: 1;
		margin-top: 4px;
		font-size: 19px;
		font-weight: 800;
		color: #777;
	}
</style>