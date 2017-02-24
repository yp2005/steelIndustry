<template>
	<nonetworkmask :disnonetworkmask.sync="disnonetworkmask" :top="45" :bottom="0"></nonetworkmask>
	<div class="deviceList">
		<listctrl :noresultmsg="noresultmsg" :listitem.sync="listitem" :showall="showall" :childlist="childlist" @getlistdata="getdata" @comlist_itemtap="itemtap" :toptipheight="45" :showdelete="showdelete"></listctrl>
	</div>
	<navbtn :buttons="specbuttons"></navbtn>
	<!--<a class="fixOneLabelBf04e30" style="background-color: #26c6da;color:#FFF;" href="javascript:void(0);" @tap="signout">退出登录</a>-->
</template>

<script>
	import nonetworkmask from 'component/mask/NoNetWorkMask';
	import muiUtils from 'common/muiUtils';
	import log from 'common/logUtils';
	import navbtn from 'component/NavBtnBar';
	import listctrl from 'src/component/list/ListCtrl';
	import list from './List';
	import api from 'api';
	import CONSTS from 'common/consts';
	import {
		cityData3Lev
	} from 'common/cityData';
	export default {
		watch: {
			listitem:{
				handler: function (val, oldVal) {
					let selectNum = 0;
					for(var i =0;i< this.listitem.length;i++){
						if(this.listitem[i].isselect){
							selectNum++;
						}
					}
					this.specbuttons[0].text = selectNum+'';
					this.specbuttons[1].disabled = !(selectNum>0);
				},
		  		deep: true
			}
		},
		data: function() {
			return {
				listitem:[],
				childlist: list,
				filterType: 0,
				disnonetworkmask: false,
				showdelete: false,
				showall: true,
				pullrefresh: null,
				specbuttons: [{
					text: '0',
					isedit: true
				}, {
					text: '确定',
					btnclass: 'nav-btn-blue',
					disabled: true,
					btntap: function(_this) {
						var sel = _this.$parent;
						sel.submitAdvert();
					}
				}]
			};
		},
		methods: {
			getdata: function(pager, callback) {
				var that = this;
				var params = {
					page_index: pager.row_start_number,
					page_size: pager.row_count
				};
				muiUtils.muiAjax(api.COMMON_API.test_api, {
					type: "post",
					data: params,
					contentType: 'application/json',
					dataType: "json",
					success: function(data) {
						data.result_data.items = data.result_data.items.map(item => {
							item.isselect = false;
							return item;
						})
						if(data.error_code === CONSTS.ERROR_CODE.SUCCESS) {
							callback(data.result_data);
						} else {
							mui.toast(data.error_message);
							callback(null);
						}
					},
					error: function(xhr, type, errorThrown) {
						mui.toast("数据请求失败！");
						callback(null);
					},
					loading: false
				});
			},
			itemtap: function(item) {
//				let gotoPage = plus.webview.getWebviewById('commonpage_advertisingmanager_editadvertising');
//				mui.fire(gotoPage, 'advertising_storepick', {store:item});
//				mui.back();
			},
			submitAdvert: function(){
				let gotoPage = plus.webview.getWebviewById('../../commonpage/adminsetting/positionmanager.html');
				mui.fire(gotoPage, 'position_advertpick', {page:0,adverts:this.listitem});
				mui.back();
			}
		},
		ready: function() {
			var that = this;
			var deceleration = mui.os.ios ? 0.003 : 0.0009;
			mui('.mui-scroll-wrapper').scroll({
				bounce: true,
				indicators: true, //是否显示滚动条
				deceleration: deceleration
			});
		},
		components: {
			nonetworkmask,
			listctrl,
			navbtn
		}
	};
</script>
<style>
	.deviceList {
		position: absolute;
		top: 45px;
		bottom: 50px;
		width: 100%;
	}
	
	.deviceList .mui-scroll-wrapper {
		/*top: 45px;*/
	}
	
	.deviceList .conditions {
		line-height: 25px;
		padding: 10px 0;
		text-align: center;
	}
	
	.deviceList .conditions a {
		color: #000;
		width: 23%;
		position: relative;
	}
	
	.deviceList .conditions a:nth-child(1) ,
	.deviceList .conditions a:nth-child(2) ,
	.deviceList .conditions a:nth-child(3) {
		border-right: solid 1px #ddd;
	}
	
	/*.deviceList .conditions a:after {
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
	}*/
	
	.deviceList .advertisement {
		width: 100%;
		height: 120px;
		margin-bottom: 8px;
	}
	
	.filterActive{
		color:#26c6da !important;
	}
</style>