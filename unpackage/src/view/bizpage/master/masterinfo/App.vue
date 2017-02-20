/** * @file 店铺详情 * @Author lxm * @private */

<template>
	<nonetworkmask :disnonetworkmask.sync="disnonetworkmask" :top="45" :bottom="0"></nonetworkmask>
	<div class="mui-scroll-wrapper deviceInfo" style="bottom: {{isStoreManage ? '50px' : '0'}}">
		<div class="mui-scroll">
			<div class="context">
				<ul class="mui-table-view mui-table-view-chevron shifu">
					<li class="mui-table-view-cell">
						<div>
							<img class="mui-media-object mui-pull-left head-img" id="head-img" src="">
							<div class="mui-media-body">
								<p><i class="master-name">{{master.name}}</i><i class="master-age">工龄{{master.age}}年</i>编号：{{master.code}}</p>
								<p class='mui-ellipsis'>
									<span class="jxddicon icon-weizhi2"></span>
									<span>实名认证</span>
								</p>
							</div>
						</div>
					</li>
					<li class="mui-table-view-cell">
						<div class="yuyue">
							<p class="counts">{{master.yuyue}}</p>
							<p>预约人数</p>
						</div>
						<div class="views">
							<p class="counts">{{master.views}}</p>
							<p>浏览量</p>
						</div>
					</li>
					<li class="mui-table-view-cell btn">
						<p>
							<span @tap="callTel(master.telphone)" class="tel-btn"><span class="mui-icon mui-icon-phone icon-span"></span>电话咨询</span>
						</p>
						<!--<p>
							<span class="yuyue-btn"><span class="jxddicon icon-yijianfankui icon-span"></span>立即预约</span>
						</p>-->
					</li>
				</ul>
				<ul class="mui-table-view">
					<li class="mui-table-view-cell">
						<p class="jieshao">
							<span>{{master.name}} <i>{{master.type}}</i></span>
							<span @tap="shoucang" class="jxddicon icon-shoucang1"></span>
						</p>
					</li>
					<li class="mui-table-view-cell">
						<label>服务范围</label>
						<span class="info-text">{{master.serviceArea}}</span>
					</li>
					<li class="mui-table-view-cell">
						<label>安装项目</label>
						<span class="info-text">{{master.project}}</span>
					</li>
					<li class="mui-table-view-cell">
						<label>现居地址</label>
						<span @tap="positioning" class="address info-text">{{master.address.province + ' ' + master.address.city + ' ' + master.address.district + ' ' + master.address.street}}</span>
						<span @tap="positioning" class="jxddicon icon-weizhi2 address-dingwei"></span>
					</li>
				</ul>
				<ul class="mui-table-view shifu">
					<li class="mui-table-view-cell">
						<label>师傅介绍</label>
					</li>
					<li class="mui-table-view-cell">
						<span>{{master.introduction}}</span>
					</li>
					<li class="mui-table-view-cell master-images">
						<template v-for="item in master.masterimgs">
							<img :src="item.url">
						</template>
					</li>
					<li class="mui-table-view-cell store-title">
						<p>
							<span class="tishi">温馨提示（联系时请说明是在“XXX”上看到的）</span>
						</p>
					</li>
				</ul>
			</div>

		</div>
	</div>
</template>

<script>
	import nonetworkmask from 'component/mask/NoNetWorkMask';
	import muiUtils from 'common/muiUtils';
	import log from 'common/logUtils';
	import CONSTS from 'common/consts';
	import cacheUtils from 'common/cacheUtils';

	export default {
		data: function() {
			// 0 分享，非0未分享
			let isShared = cacheUtils.localStorage(CONSTS.IS_SHARED).get(CONSTS.IS_SHARED);
			return {
				master: {},
				isShared: isShared
			}
		},
		created: function() {
			//ajax请求数据，这里的数据是模拟数据，后台查询的数据需要进行处理
			this.master = {
				name: '江海流',
				age: 30,
				code: 1200,
				telphone: '13885788345',
				views: 30,
				yuyue: 9,
				type: '油漆涂料施工',
				serviceArea: '市辖区、思明区、沧海区、湖里区、集美区、同安区、翔安区',
				project: '装修队',
				address: {
					province: '北京',
					city: '北京市',
					district: '海淀区',
					street: '阜石路甲69号'
				},
				introduction: '团队服务，质量保障，价格低廉，一条龙服务。',
				masterimgs: [{
						url: 'http://img.168bgt.com/upload/2016/05/22/20160522172528_408.jpg'
					},
					{
						url: 'http://img.168bgt.com/upload/2016/05/22/20160522172528_408.jpg'
					},
					{
						url: 'http://img.168bgt.com/upload/2016/05/22/20160522172528_408.jpg'
					}
				]
			}
		},
		methods: {
			positioning: function() {
				muiUtils.openWindow('../../commonpage/map/selectaddress.html', '../../commonpage/map/selectaddress.html', {
					extras: {
						address: this.master.address,
						isPositioning: true,
						fromPage: '../../bizpage/device/deviceinfo.html'
					}
				});
			},
			callTel: function(number) {
				if(isShared == 0) {
					plus.device.dial(number, false);
				} else {
					let self = this;
					mui.alert('分享app即可获取联系电话！', '分享', '分享', function() {
						mui.toast('分享成功！');
						self.isShared = 0;
						console.log('CONSTS.IS_SHARED:' + CONSTS.IS_SHARED);
						cacheUtils.localStorage(CONSTS.IS_SHARED).set(CONSTS.IS_SHARED, self.isShared);
						//入库
						//@tudo
					});
				}

			},
			shoucang: function() {
				mui.toast('收藏成功！');
			}
		},
		watch: {

		},
		ready: function() {
			var deceleration = mui.os.ios ? 0.003 : 0.0009;
			mui('.mui-scroll-wrapper').scroll({
				bounce: true,
				indicators: false, //是否显示滚动条
				deceleration: deceleration
			});
		},
		components: {
			nonetworkmask
		}
	};
</script>
<style scoped>
	.deviceInfo {
		position: absolute;
		top: 45px;
		bottom: 0;
		width: 100%;
		font-size: 16px;
	}
	
	#head-img {
		border-radius: 50%;
	}
	
	.mui-media {
		height: 82px;
	}
	
	.mui-table-view .mui-media-object {
		line-height: 62px;
		max-width: 62px;
		height: 62px;
	}
	
	.mui-table-view .mui-media-body {
		overflow: hidden;
		padding-top: 15px;
	}
	
	.mui-table-view-cell {
		margin-bottom: 10px;
	}
	
	.mui-table-view-cell label {
		font-size: 16px;
		color: #8f8f94;
		float: left;
	}
	
	.master-name {
		color: #000;
	}
	
	.master-age {
		margin: 0 10px;
	}
	
	.mui-ellipsis {
		font-size: 12px;
		margin-top: 3px;
	}
	
	.mui-ellipsis .jxddicon {
		color: rgb(38, 198, 218);
	}
	
	.shifu .mui-table-view-cell:after {
		height: 0;
	}
	
	.mui-table-view-chevron .mui-table-view-cell {
		padding-right: 0;
	}
	
	.yuyue {
		width: 50%;
		float: left;
		text-align: center;
	}
	
	.views {
		width: 50%;
		float: right;
		border-left: 1px solid #D7D7D7;
		text-align: center;
	}
	
	.counts {
		color: #000;
	}
	
	.mui-table-view-cell .tel-btn {
		background-color: rgb(255, 98, 48);
		color: #fff;
		/*float: left;*/
		width: 40%;
		margin-right: 20px;
		padding: 10px 15px;
		border-radius: 5px;
		position: relative;
	}
	
	.mui-table-view-cell .yuyue-btn {
		background-color: rgb(38, 198, 218);
		color: #fff;
		float: right;
		width: 40%;
		margin-right: 20px;
		padding: 10px 15px;
		border-radius: 5px;
		position: relative;
	}
	
	.icon-span {
		position: absolute;
		top: 10px;
		left: -10px;
		padding: 0 0 20px 20px;
		color: #fff;
		font-size: 26px;
	}
	
	.btn {
		text-align: center;
	}
	
	.master-images img {
		padding: 10px;
		width: 100%;
	}
	
	.jieshao {
		font-size: 17px;
		color: #000;
	}
	
	.jieshao i {
		margin-left: 10px;
	}
	
	.icon-shoucang1 {
		font-size: 25px;
		color: #E41A1A;
		float: right;
	}
	
	.info-text {
		width: 75%;
		float: left;
		margin-left: 10px;
	}
	
	.tishi {
		color: #f82f48;
	}
	
	.jxddicon.address-dingwei {
		position: absolute;
		top: 12px;
		right: 10px;
		padding: 0 0 20px 20px;
		color: #0D80CC;
		font-size: 26px;
	}
</style>