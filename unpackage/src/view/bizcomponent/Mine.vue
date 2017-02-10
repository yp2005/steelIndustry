<template>
	<div class="mui-scroll-wrapper mine">
		<div class="mui-scroll">
			<div class="header">
				<div class="portraitImgWrap">
					<img class="head-portrait" :src="userInfo.avatar">
				</div>
				<p>
					<span>{{userInfo.name || '姓名未填写'}}</span>
					<span>{{userInfo.mobile_number}}</span>
					<!--<span class="gold">金币<img src="../../static/img/mine/gold.svg">: 5000 </span>-->
				</p>
				<p>积分: 5000</p>
				<span class="jxddicon icon-shezhi44" @tap="open('../../commonpage/mine/usersetting.html')"></span>
				<div class="authinfo">
					<img src="../../static/img/mine/shimingrenzheng.svg">
					<img src="../../static/img/mine/noshimingrenzheng.svg">
					<img src="../../static/img/mine/qiyerenzheng.svg">
					<img src="../../static/img/mine/noqiyerenzheng.svg">
				</div>
			</div>
			<ul class="mui-table-view content-list">
				<!--<li class="mui-table-view-cell">
					<p>
						<img src="../../static/img/mine/myinformation.svg" />
						<span>个人信息</span>
						<span class="jxddicon icon-jinru32"></span>
					</p>
				</li>-->
				<li class="mui-table-view-cell">
					<p>
						<img src="../../static/img/mine/mycard.svg" />
						<span>我的名片</span>
						<span class="jxddicon icon-jinru32"></span>
					</p>
				</li>
				<li class="mui-table-view-cell">
					<p>
						<img src="../../static/img/mine/mycard.svg" />
						<span>采购订单</span>
						<span class="jxddicon icon-jinru32"></span>
					</p>
				</li>
				<li class="mui-table-view-cell">
					<p>
						<img src="../../static/img/mine/mystore.svg" />
						<span>我的店铺</span>
						<span class="jxddicon icon-jinru32"></span>
					</p>
				</li>
				<li class="mui-table-view-cell">
					<p>
						<img src="../../static/img/mine/employmentdemand.svg" />
						<span>用工需求</span>
						<span class="jxddicon icon-jinru32"></span>
					</p>
				</li>
				<li class="mui-table-view-cell">
					<p>
						<img src="../../static/img/mine/project.svg" />
						<span>我的帖子</span>
						<span class="jxddicon icon-jinru32"></span>
					</p>
				</li>
				<li class="mui-table-view-cell">
					<p>
						<img src="../../static/img/mine/project.svg" />
						<span>我的回复</span>
						<span class="jxddicon icon-jinru32"></span>
					</p>
				</li>
				
				<li class="mui-table-view-cell">
					<p>
						<img src="../../static/img/mine/authentication.svg" />
						<span>个人信息</span>
						<span class="jxddicon icon-jinru32"></span>
					</p>
				</li>
				<li class="mui-table-view-cell">
					<p>
						<img src="../../static/img/mine/authentication.svg" />
						<span>认证管理</span>
						<span class="jxddicon icon-jinru32"></span>
					</p>
				</li>
				<li class="mui-table-view-cell">
					<p>
						<img src="../../static/img/mine/mymessage.svg" />
						<span>保证金管理</span>
						<span class="jxddicon icon-jinru32"></span>
					</p>
				</li>
				<li class="mui-table-view-cell">
					<p>
						<img src="../../static/img/mine/mycollection.svg" />
						<span>我的收藏</span>
						<span class="jxddicon icon-jinru32"></span>
					</p>
				</li>

				<!--<li class="mui-table-view-cell">
					<p>
						<img src="../../static/img/mine/gold.svg" />
						<span>赚金币</span>
						<span class="jxddicon icon-jinru32"></span>
					</p>
				</li>-->

			</ul>
		</div>
	</div>
</template>

<script>
	import muiUtils from 'common/muiUtils';
	export default {
		data: function() {
			return {
				scroll: undefined,
				userInfo: {
					name: '余鹏',
					avatar: require('static/img/mine/nohp.png'),
					mobile_number: '18710095921'
				}
			};
		},
		created: function() {

		},
		components: {

		},
		methods: {
			open(url) {
				muiUtils.openWindow(url, url, {
//					isValidLogin: true,
					extras: {
						url: url
					}
				});
			}
		},
		ready: function() {
			this.scroll = mui('.mui-scroll-wrapper.mine').scroll({
				bounce: true,
				indicators: false, // 是否显示滚动条
				deceleration: mui.os.ios ? 0.003 : 0.0009
			});
		}
	};
</script>

<style scoped>
	.mine {
		position: absolute;
		top: 0;
		bottom: 50px;
		width: 100%;
	}
	
	.header {
		padding: 10px 13px 20px 13px;
		width: 100%;
		height: 175px;
		background-color: #767a92;
		position: relative;
	}
	
	.header p {
		font-size: 14px;
		color: #ffffff;
		text-align: center;
		margin: 0;
		line-height: 1;
	}
	
	.header p:nth-child(1) {
		margin-top: 25px;
	}
	
	.header p:nth-child(1) span:nth-child(1) {
		padding-right: 15px;
	}
	
	.header p:nth-child(2) {
		margin-top: 10px;
	}
	
	/*.header .gold {
		color: #fcb814;
		position: absolute;
		font-size: 13px;
		margin-left: 15px;
	}
	
	.header .gold img {
		height: 15px;
		width: 15px;
	}*/
	
	.header p:nth-child(3) {
		margin-top: 5px;
		font-size: 13px;
		color: #fe7;
	}
	
	.header .jxddicon {
		position: absolute;
		top: 10px;
		right: 13px;
		padding: 0 0 20px 20px;
		color: #ffffff;
		font-size: 24px;
	}
	
	.header .authinfo {
		position: absolute;
		top: 10px;
		left: 13px;
	}
	
	.header .authinfo img {
		width: 19px;
		height: 19px;
		margin-right: 4px;
	}
	
	.icon-jinru32 {
		color: #999999;
		font-size: 18px;
	}
	
	.mui-table-view .mui-table-view-cell p {
		font-size: 14px;
		color: #222;
		height: 46px;
		position: relative;
		display: flex;
		align-items: center;
	}
	
	.mui-table-view .mui-table-view-cell p img {
		width: 22px;
		height: 22px;
		float: left;
	}
	
	.mui-table-view .mui-table-view-cell p span:nth-of-type(1) {
		line-height: 14px;
		font-family: 'Hiragino Sans GB', 苹果丽黑 !important;
		padding-left: 8px;
	}
	
	.mui-table-view .mui-table-view-cell p span:nth-of-type(2) {
		position: absolute;
		right: 0;
		top: 15px;
		line-height: 18px;
	}
	
	.mui-table-view.content-list:before {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		height: 1px;
		background: #d7d7d7;
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
	}
	
	.mui-table-view.content-list {
		background-color: #f3f5f7;
		margin-top: 8px;
	}
	
	.mui-table-view.content-list .mui-table-view-cell {
		padding: 0 12px;
		background-color: #ffffff;
	}
	
	.mui-table-view.content-list,
	.mui-table-view.content-list .mui-table-view-cell:nth-child(6) {
		margin-bottom: 8px;
	}
	
	.mui-table-view.content-list .mui-table-view-cell:nth-child(6):after {
		left: 0px;
	}
	
	.mui-table-view.content-list .mui-table-view-cell:nth-child(7):before {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		height: 1px;
		background: #d7d7d7;
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
	}
	
	.mui-table-view:before {
		height: 0;
	}
	
	.mui-table-view-cell:after,
	.mui-table-view:after {
		background-color: #D7D7D7;
	}
	
	.mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body {
		font-size: 14px;
	}
	
	.portraitImgWrap,
	.portraitImgWrap img {
		-webkit-border-radius: 50%;
		-moz-border-radius: 50%;
		border-radius: 50%;
	}
	
	.portraitImgWrap {
		margin: 25px auto 0 auto;
		width: 79px;
		height: 79px;
		background: rgba(255, 255, 255, 0.2);
		-webkit-box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.35);
		box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.35);
		position: relative;
	}
	
	.portraitImgWrap img {
		width: 75px;
		height: 75px;
		position: absolute;
		top: 2px;
		left: 2px;
		border: none;
	}
</style>