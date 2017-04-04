<template>
	<div class="mui-scroll-wrapper mine">
		<div class="mui-scroll">
			<div class="header">
				<div class="portraitImgWrap">
					<img class="head-portrait" src="{{userInfo.avatar || '../../static/img/mine/nohp.png'}}">
				</div>
				<p>
					<span>{{userInfo.userName || '姓名未填写'}}</span>
					<span>{{userInfo.mobileNumber}}</span>
					<!--<span class="gold">金币<img src="../../static/img/mine/gold.svg">: 5000 </span>-->
				</p>
				<p>积分: {{userInfo.points}}</p>
				<span class="jxddicon icon-shezhi44" @tap="open('../../commonpage/mine/adminsetting.html')"></span>
				<div class="authinfo">
					<img v-if="userInfo.realNameAuthentication === 1" src="../../static/img/mine/shimingrenzheng.svg">
					<img v-else src="../../static/img/mine/noshimingrenzheng.svg">
					<img v-if="userInfo.enterpriseCertification === 1" src="../../static/img/mine/qiyerenzheng.svg">
					<img v-else src="../../static/img/mine/noqiyerenzheng.svg">
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
				<li class="mui-table-view-cell" @tap="open('../../commonpage/mine/mycard.html')">
					<p>
						<img src="../../static/img/mine/mycard.svg" />
						<span>我的名片</span>
						<span class="jxddicon icon-jinru32"></span>
					</p>
				</li>
				<li class="mui-table-view-cell" @tap="open('../../commonpage/mine/mystore.html')">
					<p>
						<img src="../../static/img/mine/mystore.svg" />
						<span>我的店铺</span>
						<span class="jxddicon icon-jinru32"></span>
					</p>
				</li>
				<li class="mui-table-view-cell" @tap="open('../../commonpage/mine/mywork.html')">
					<p>
						<img src="../../static/img/mine/employmentdemand.svg" />
						<span>用工需求</span>
						<span class="jxddicon icon-jinru32"></span>
					</p>
				</li>
				<li class="mui-table-view-cell" @tap="open('../../commonpage/mine/myproject.html')">
					<p>
						<img src="../../static/img/mine/project.svg" />
						<span>我的工程</span>
						<span class="jxddicon icon-jinru32"></span>
					</p>
				</li>
				<li class="mui-table-view-cell">
					<p>
						<img src="../../static/img/mine/tiezi.svg" />
						<span>我的帖子</span>
						<span class="jxddicon icon-jinru32"></span>
					</p>
				</li>
				<li class="mui-table-view-cell">
					<p>
						<img src="../../static/img/mine/mymessage.svg" />
						<span>我的回复</span>
						<span class="jxddicon icon-jinru32"></span>
					</p>
				</li>
				<li class="mui-table-view-cell" @tap="open('../../commonpage/mine/myfavorite.html')">
					<p>
						<img src="../../static/img/mine/mycollection.svg" />
						<span>我的收藏</span>
						<span class="jxddicon icon-jinru32"></span>
					</p>
				</li>

				<li class="mui-table-view-cell" @tap="open('../../commonpage/mine/usersetting.html')">
					<p>
						<img src="../../static/img/mine/myinformation.svg" />
						<span>个人信息</span>
						<span class="jxddicon icon-jinru32"></span>
					</p>
				</li>
				<li class="mui-table-view-cell" @tap="open('../../commonpage/mine/authmanager.html')">
					<p>
						<img src="../../static/img/mine/authentication.svg" />
						<span>认证管理</span>
						<span class="jxddicon icon-jinru32"></span>
					</p>
				</li>
				<li class="mui-table-view-cell" @tap="showShareBar">
					<p>
						<img src="../../static/img/share/share.svg" />
						<span>分享</span>
						<i class="mui-ellipsis">一次分享即可免费联系所有发布信息的用户</i>
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
	import cacheUtils from 'common/cacheUtils';
	import CONSTS from 'common/consts';
	export default {
		data: function() {
			var userInfo = cacheUtils.localStorage(CONSTS.USER_INFO).getObject(CONSTS.USER_INFO);
			return {
				scroll: undefined,
				userInfo: userInfo,
				shares: {},
				showShare: false
			};
		},
		created: function() {

		},
		components: {

		},
		methods: {
			open(url) {
				muiUtils.openWindow(url, url, {
					isValidLogin: true,
					extras: {
						url: url
					}
				});
			},
			shareMessage(shareOb) {
				var msg = {
					title: '分享测试标题',
					content: "这是一条分享测试信息...",
					href: "http://www.baidu.com"
				};
				var that = this;
				if('weixin' == shareOb.id) {
					plus.nativeUI.actionSheet({ title: "分享到微信", cancel: "取消", buttons: [{ title: "分享到微信朋友圈" }, { title: "发送给微信好友" }] }, function(e) {
						if(e.index === 1) {
							msg.extra = { scene: "WXSceneTimeline" };
						} else if(e.index === 2) {
							msg.extra = { scene: "WXSceneSession" };
						}
						else {
							return;
						}
						shareOb.send(msg, function() {
							mui.toast("分享成功！");
						}, function(e) {
							mui.toast("分享失败!");
						});
					});
				} else {
					shareOb.send(msg, function() {
						mui.toast("分享成功！");
					}, function(e) {
						mui.toast("分享失败!");
					});
				}

			},
			showShareBar() {
				this.showShare = true;
			},
			shareAction(type) {
				this.showShare = false;
				var that = this;
				var shareOb;
				switch(type) {
					case 'weixin':
						shareOb = this.shares.sharewx;
						break;
					case 'qq':
						shareOb = this.shares.shareqq;
						break;
					case 'tencentweibo':
						shareOb = this.shares.sharetxwb;
						break;
					case 'sinaweibo':
						shareOb = this.shares.sharesnwb;
						break;
				}
				shareOb.authorize(function() {
					that.shareMessage(shareOb);
				}, function(e) {
					mui.toast("分享失败!");
				});
			},
			loadData() {
				this.userInfo = cacheUtils.localStorage(CONSTS.USER_INFO).getObject(CONSTS.USER_INFO);
			}
		},
		ready: function() {
			this.scroll = mui('.mui-scroll-wrapper.mine').scroll({
				bounce: true,
				indicators: false, // 是否显示滚动条
				deceleration: mui.os.ios ? 0.003 : 0.0009
			});
			var that = this;
			plus.share.getServices(function(s) {
				for(var i in s) {
					if('weixin' == s[i].id) {
						that.shares.sharewx = s[i];
					}
					if('qq' == s[i].id) {
						that.shares.shareqq = s[i];
					}
					if('tencentweibo' == s[i].id) {
						that.shares.sharetxwb = s[i];
					}
					if('sinaweibo' == s[i].id) {
						that.shares.sharesnwb = s[i];
					}
				}
			}, function(e) {
				mui.toast("获取分享服务列表失败！");
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
		min-width: 36px;
	}
	
	.mui-table-view .mui-table-view-cell p span:nth-of-type(2) {
		position: absolute;
		right: 0;
		top: 15px;
		line-height: 18px;
	}
	
	.mui-table-view .mui-table-view-cell p i {
		padding-left: 10px;
		padding-right: 18px;
		color: #999;
		font-size: 13px;
		line-height: 1;
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
	.mui-table-view.content-list .mui-table-view-cell:nth-child(7) {
		margin-bottom: 8px;
	}
	
	.mui-table-view.content-list .mui-table-view-cell:nth-child(7):after {
		left: 0px;
	}
	
	.mui-table-view.content-list .mui-table-view-cell:nth-child(8):before {
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