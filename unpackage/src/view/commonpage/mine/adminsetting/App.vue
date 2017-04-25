<template>
	<div class="mui-scroll-wrapper">
		<div class="mui-scroll">
			<ul class="mui-table-view mui-table-view-chevron">
				<li class="mui-table-view-cell">
					<a class="jxddicon icon-jinru32">论坛管理</a>
				</li>
				<li class="mui-table-view-cell" @tap="open('../../commonpage/adminsetting/usermanager.html')">
					<a class="jxddicon icon-jinru32">用户管理</a>
				</li>
				<li class="mui-table-view-cell" @tap="open('../../commonpage/adminsetting/releasemanager.html')">
					<a class="jxddicon icon-jinru32">发布信息审核</a>
				</li>
				<li class="mui-table-view-cell" @tap="open('../../commonpage/adminsetting/advertisingmanager.html')">
					<a class="jxddicon icon-jinru32">广告管理</a>
				</li>
				<li class="mui-table-view-cell" @tap="open('../../commonpage/adminsetting/positionmanager.html')">
					<a class="jxddicon icon-jinru32">广告位管理</a>
				</li>
				<li class="mui-table-view-cell" @tap="open('../../commonpage/adminsetting/noticemanager.html')">
					<a class="jxddicon icon-jinru32">公告管理</a>
				</li>
				<li class="mui-table-view-cell" @tap="open('../../commonpage/adminsetting/appsetting.html')">
					<a class="jxddicon icon-jinru32">app设置</a>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import cacheUtils from 'common/cacheUtils';
	import muiUtils from 'common/muiUtils';
	import CONSTS from 'common/consts';
	import api from 'api';
	import utils from 'common/utils';
	var that = null;
	export default {
		data: function() {
			
		},
		methods: {
			open(url) {
				muiUtils.openWindow(url, url, {
					isValidLogin: true
				});
			},
		},
		ready() {
			mui('.mui-scroll-wrapper.appsetting').scroll({
				bounce: true,
				indicators: false, // 是否显示滚动条
				deceleration: mui.os.ios ? 0.003 : 0.0009
			});
		}
	}
</script>
<style>
	.mui-table-view-chevron {
		margin-bottom: 11px;
	}
	
	.mui-table-view-chevron:last-child {
		margin-bottom: 0;
	}
	
	.mui-table-view-chevron:first-child {
		margin-top: 45px;
	}
	
	.mui-table-view-cell>a:not(.mui-btn) {
		font-size: 15px;
		color: #222222;
		text-align: left;
		padding: 13px 15px;
	}
	
	.icon-jinru32:before {
		content: "\e629";
		position: absolute;
		right: 14px;
		color: #999;
	}
	
	.mui-table-view:before,
	.mui-table-view:after {
		z-index: 100;
	}
	
	.jxddicon {
		font-family: inherit !important;
	}
	
	.jxddicon:before {
		font-family: jxddMuiicons;
	}
</style>