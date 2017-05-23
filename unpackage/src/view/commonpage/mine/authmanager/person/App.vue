<template>
	<div class="mui-content">
		<template v-if="authStep == 0">
			<div class="mui-scroll-wrapper authmanagerPerson">
				<div class="mui-scroll">
					<div class="inputRow center">
						<span class="statusFont1">提交信息</span>
						<span class="statusFont"> → 等待审核</span>
						<span class="statusFont"> → 认证成功</span>
					</div>
					<div class="inputRow"><label>姓名</label><input v-model="name" type="text" placeholder="请输入您的真实姓名"></div>
					<div class="inputRow"><label>身份证号</label><input v-model="cardId" type="text" placeholder="请输入您的身份证号"></div>
					<div class="inputRow">
						<p>请上传身份证正面(必填)</p>
						<upload :is-cut="isCut" :pictures.sync="pictures1" :imagecount="1" dataid="sfz_zhengmian"></upload>
						<img src="../../../../../static/img/mine/szfzhengmian.jpg" />
					</div>
					<div class="inputRow">
						<p>请上传身份证反面(必填)</p>
						<upload :is-cut="isCut" :pictures.sync="pictures2" :imagecount="1" dataid="sfz_fanmian"></upload>
						<img src="../../../../../static/img/mine/sfzfanmian.jpg" />
					</div>
					<div class="inputRow">
						<p>请上传1张本人手持身份证的照片(必填)</p>
						<upload :is-cut="isCut" :pictures.sync="pictures3" :imagecount="1" dataid="sfz_shouchi"></upload>
						<img src="../../../../../static/img/mine/shouchi.jpg" />
					</div>
					<div class="inputRow">
						<p>请上传1张本人正面照(必填)</p>
						<upload :is-cut="isCut" :pictures.sync="pictures4" :imagecount="1" dataid="benren_zhengmian"></upload>
						<img src="../../../../../static/img/mine/zhengmian.jpg" />
					</div>
					<div class="inputRow declare">
						<input v-model="agree" type="checkbox" /><span>我阅读并同意</span>
						<span class="statusFont1" @tap="declarationWindow(true)">《彩钢精英》个人师傅签约规则</span></div>
					<div class="bottomBtn">
						<a href="javascript:void(0)" @tap="stepNext(1)">提交审核</a>
					</div>
				</div>
			</div>
		</template>
		<template v-if="authStep == 1">
			<div class="backTitleBg">
				<div class="inputRow center">
					<span class="statusFont1">提交信息</span>
					<span class="statusFont1"> → 等待审核</span>
					<span class="statusFont"> → 认证成功</span>
				</div>
				<div>
					您的实名认证申请提交成功
				</div>
				<div>
					我们将在一个工作日内完成审核，请耐心等待
				</div>
			</div>
			<div class="bottomBackBtn">
				<a href="javascript:void(0)" @tap="goback">返回个人中心</a>
			</div>
		</template>
	</div>

	<div v-show="disStatement" class="declarationWindow mui-scroll-wrapper">
		<div class="mui-scroll">
			<h4>《彩钢精英》个人师傅认证规则</h4>
			<p>为了使用工单位能更好的了解您和以后的本系统的优先推荐请你进行实名认证。</p>
			<p>1.会员须按照彩钢精英认证要求，提供本人真实有效的信息，提供的信息包括但不限于：身份信息、有效联系方式、真实地址等证明身份真实性、有效性、一致性的信息;对于信息不全、无效或虚假的，将无法通过认证。</p>
			<p>2.为保障会员认证信息的持续真实有效，对已经通过彩钢精英认证的会员，彩钢精英将视情况通过定期或不定期复核的方式，验证认证信息的真实有效性。如在复核过程中发现会员提供的认证信息不全、无效或虚假的，彩钢精英将依据情形严重程度，采取限制发布任何信息、封闭账号等临时性的市场监管措施。</p>
			<p>彩钢精英认证的真实性、有效性、一致性指的是什么?</p>
			<p>真实性是指认证信息真实，不得提供做假的信息，包括但不限于个人证件(如身份证、护照等)、企业相关证件、上传的照片等均须真实且未经过PS等。</p>
			<p>有效性是指上传的证件须在相关机构备案且在有效期内，包括但不限于大陆个人身份证须是二代身份证且在有效期内，企业相关证件须在相关机构备案且在有效期内等。</p>
			<p>一致性是指提供的信息之间或信息与实际均须保持一致，包括但不限于证件对应主体须一致，提供的个人身份信息或企业信息须与实际经营主体一致等。</p>
		</div>
		<p class="bottom">
			<a href="javascript:void(0)" @tap="declarationWindow(false)">确定</a>
		</p>
	</div>
	<div v-show="disStatement" class="mask">
	</div>
</template>

<script>
	import muiUtils from 'common/muiUtils';
	import log from 'common/logUtils';
	import api from 'api';
	import CONSTS from 'common/consts';
	import upload from 'component/upload/UploadImage';
	import cacheUtils from 'common/cacheUtils';
	export default {
		data: function() {
			var data = plus.webview.currentWebview().data;
			var id = null;
			var name = '';
			var cardId = '';
			var pictures1 = [];
			var pictures2 = [];
			var pictures3 = [];
			var pictures4 = [];
			var imgServer = '';
			if(data) {
				id = data.id;
				name = data.realName;
				cardId = data.cardId;
				pictures1.push(data.imgServer + data.cardPictureObverse);
				pictures2.push(data.imgServer + data.cardPictureReverse);
				pictures3.push(data.imgServer + data.handCardPicture);
				pictures4.push(data.imgServer + data.fullFacePicture);
				imgServer = data.imgServer;
			}
			return {
				id: id,
				name: name,
				cardId: cardId,
				pictures1: pictures1, //身份证正面
				pictures2: pictures2, //身份证反面
				pictures3: pictures3, //手持身份证照片
				pictures4: pictures4, //本人正面照
				isCut: false,
				authStep: 0,
				disStatement: false,
				agree: false,
				imgServer: imgServer
			};
		},
		methods: {
			stepNext(step) {
				if(!this.name) {
					mui.toast('请输入您的真实姓名！');
					return;
				}
				if(!this.cardId) {
					mui.toast('请输入您的身份证号！');
					return;
				}
				if(this.pictures1.length == 0) {
					mui.toast('请上传身份证正面照！');
					return;
				}
				if(this.pictures2.length == 0) {
					mui.toast('请上传身份证反面照！');
					return;
				}
				if(this.pictures3.length == 0) {
					mui.toast('请上传手持身份证照片！');
					return;
				}
				if(this.pictures4.length == 0) {
					mui.toast('请上传本人正面照！');
					return;
				}
				if(!this.agree) {
					mui.toast('请阅读《彩钢精英》个人师傅认证规则，并同意！');
					return;
				}
				var that = this;
				var data = {
					realName: that.name,
					cardId: that.cardId,
					cardPictureObverse: that.pictures1[0],
					cardPictureReverse: that.pictures2[0],
					handCardPicture: that.pictures3[0],
					fullFacePicture: that.pictures4[0]
				};
				if(that.id) {
					data.id = that.id;
				}
				if(data.cardPictureObverse.indexOf('http') == 0) {
					data.cardPictureObverse = data.cardPictureObverse.substring(data.cardPictureObverse.indexOf(this.imgServer) + this.imgServer.length);
				}
				if(data.cardPictureReverse.indexOf('http') == 0) {
					data.cardPictureReverse = data.cardPictureReverse.substring(data.cardPictureReverse.indexOf(this.imgServer) + this.imgServer.length);
				}
				if(data.handCardPicture.indexOf('http') == 0) {
					data.handCardPicture = data.handCardPicture.substring(data.handCardPicture.indexOf(this.imgServer) + this.imgServer.length);
				}
				if(data.fullFacePicture.indexOf('http') == 0) {
					data.fullFacePicture = data.fullFacePicture.substring(data.fullFacePicture.indexOf(this.imgServer) + this.imgServer.length);
				}
				muiUtils.muiAjax(api.APIS.realNameAuthentication.saveRealNameAuthentication, {
					data: JSON.stringify(data),
					contentType: 'application/json',
					dataType: "json",
					type: "post",
					success: function(data) {
						if(data.erroCode === CONSTS.ERROR_CODE.SUCCESS) {
							that.authStep = step;
							var userInfo = cacheUtils.localStorage(CONSTS.PREFIX_LOGIN).getObject(CONSTS.USER_INFO);
							userInfo.realNameAuthentication = 2;
							cacheUtils.localStorage(CONSTS.PREFIX_LOGIN).setObject(CONSTS.USER_INFO, userInfo);
							mui.fire(plus.webview.getWebviewById('main'), 'updateUserInfo');
							mui.fire(plus.webview.getWebviewById('../../commonpage/mine/authmanager.html'), 'updateUserInfo');
						} else {
							mui.toast(data.erroCode + '：' + data.erroMsg);
						}
					},
					error: function(xhr, type, errorThrown) {
						mui.toast('服务器或网络异常，请稍后重试。');
					}
				});

			},
			declarationWindow(isshow) {
				this.disStatement = isshow;
			},
			goback() {
				mui.back();
			}
		},
		ready: function() {
			mui('.mui-scroll-wrapper.authmanagerPerson').scroll({
				bounce: true,
				indicators: false, // 是否显示滚动条
				deceleration: mui.os.ios ? 0.003 : 0.0009
			});
			mui('.mui-scroll-wrapper.declarationWindow').scroll({
				bounce: true,
				indicators: false, // 是否显示滚动条
				deceleration: mui.os.ios ? 0.003 : 0.0009
			});
		},
		components: {
			upload
		}
	};
</script>
<style>
	.authmanagerPerson {
		position: absolute;
		top: 45px;
		bottom: 0;
		width: 100%;
	}
	
	.authmanagerPerson input,
	.authmanagerPerson textarea,
	.authmanagerPerson label {
		font-size: 14px;
	}
	
	.authmanagerPerson .inputRow {
		color: #333;
		line-height: 30px;
		padding: 10px;
		position: relative;
		background-color: #fff;
		overflow: hidden;
	}
	
	.authmanagerPerson .inputRow>input[type=text] {
		line-height: normal;
		width: inherit;
		height: inherit;
		margin: 0;
		padding: 1px 0px;
		border: none;
		position: absolute;
		top: 15px;
		left: 80px;
		right: 40px;
	}
	
	.authmanagerPerson .inputRow:after {
		content: "";
		height: 1px;
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #d7d7d7;
		transform: scaleY(0.5);
	}
	
	.authmanagerPerson .inputRow label {
		width: 70px;
		float: left;
	}
	
	.bottomBtn {
		padding: 15px 10%;
		background-color: #fff;
		text-align: center;
	}
	
	.bottomBtn a {
		line-height: 35px;
		text-align: center;
		font-size: 15px;
		width: 45%;
		color: #fff;
		background-color: #26c6da;
		border: solid 1px #26c6da;
		border-radius: 3px;
	}
	
	.backTitleBg {
		position: fixed;
		top: 45px;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: #ddd;
		text-align: center;
	}
	
	.backTitleBg>div:nth-child(1) {
		line-height: 50px;
		background-color: #fff;
	}
	
	.backTitleBg>div:nth-child(2) {
		margin-top: 100px;
		color: #21A30D;
		font-size: 22px;
	}
	
	.backTitleBg>div:nth-child(3) {
		margin-top: 20px;
		color: #666;
	}
	
	.bottomBackBtn {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		line-height: 40px;
		text-align: center;
		background-color: #fff;
		z-index: 1;
	}
	
	.bottomBackBtn a {
		width: 100%;
		color: #26c6da;
	}
	
	.statusFont {
		color: #666;
	}
	
	.statusFont1 {
		color: #26c6da;
	}
	
	.mask {
		position: fixed;
		width: 100%;
		height: 100%;
		background-color: #000000;
		opacity: 0.6;
		z-index: 11;
	}
	
	.declarationWindow {
		position: fixed;
		top: 10%;
		bottom: 10%;
		left: 5%;
		right: 5%;
		z-index: 12;
		opacity: 1;
		background-color: #ffffff;
		border: solid 1px #d7d7d7;
		width: 90%;
	}
	
	.declarationWindow h4 {
		font-size: 15px;
		color: #222222;
		text-align: center;
		line-height: 35px;
		font-weight: 600;
	}
	
	.declarationWindow p {
		text-indent: 28px;
		font-size: 14px;
		color: #666666;
		margin-bottom: 10px;
		line-height: 25px;
	}
	
	.declarationWindow p.bottom {
		text-indent: 0;
		position: absolute;
		left: 0;
		bottom: 10px;
		text-align: center;
		width: 100%;
		z-index: 1;
	}
	
	.declarationWindow p a {
		font-size: 14px;
		line-height: 26px;
		padding: 0 10px;
		border: solid 1px #26c6da;
		border-radius: 5px;
		color: #26c6da;
		background-color: #fff;
	}
	
	.authmanagerPerson .inputRow.declare {
		font-size: 14px;
		padding-left: 29px;
	}
	
	.declare input[type=checkbox] {
		position: absolute;
		top: 19px;
		left: 12px;
	}
	
	.inputRow>img {
		position: absolute;
		height: 80px;
		top: 47px;
		right: 45px;
	}
	
	.center {
		text-align: center;
	}
	
	.declarationWindow .mui-scroll {
		padding: 15px 12px 50px 12px;
	}
</style>