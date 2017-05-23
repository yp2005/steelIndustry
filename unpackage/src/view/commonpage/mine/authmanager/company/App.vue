<template>
	<div class="mui-content">
		<template v-if="authStep == 0">
			<div class="mui-scroll-wrapper authmanagerCompany">
				<div class="mui-scroll">
					<div class="inputRow center">
						<span class="statusFont1">提交信息</span>
						<span class="statusFont"> → 等待审核</span>
						<span class="statusFont"> → 认证成功</span>
					</div>
					<div class="inputRow"><label>法人姓名</label><input v-model="enterpriseInfo.legalPersonName" type="text" placeholder="请输入法人姓名"></div>
					<div class="inputRow"><label>企业全称</label><input v-model="enterpriseInfo.companyName" type="text" placeholder="请输入企业全称"></div>
					<div class="inputRow">
						<p>请上传企业营业执照</p>
						<upload :is-cut="isCut" :pictures.sync="enterpriseInfo.license" :imagecount="1"></upload>
						<img src="../../../../../static/img/mine/license.jpg" />
					</div>
					<div class="inputRow declare">
						<input v-model="agree" type="checkbox" /><span>我阅读并同意</span>
						<span class="statusFont1" @tap="declarationWindow(true)">《彩钢精英》企业服务商入驻认证规则</span></div>
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
					您的企业认证申请提交成功
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
			<h4>《彩钢精英》企业认证规则</h4>
			<p>为增加企业在本系统中诚信度和用工企业的真实性，请进行企业认证，在已认证的企业会有明显标志，认证后的企业将更有说服力的实现你的产品销售及用工优选权。</p>
			<p>1．会员须按照彩钢精英认证要求，提供企业真实有效的信息，提供的信息包括但不限于：营业执照、有效联系方式、真实地址等证明企业真实性、有效性、一致性的信息;对于信息不全、无效或虚假的，将无法通过认证。</p>
			<p>2．为保障会员认证信息的持续真实有效，对已经通过彩钢精英认证的企业会员，彩钢精英将视情况通过定期或不定期复核的方式，验证认证信息的真实有效性。如在复核过程中发现企业提供的认证信息不全、无效或虚假的，彩钢精英将依据情形严重程度，采取限制发布任何信息、封闭账号等临时性的市场监管措施。</p>
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
			var enterpriseInfo;
			var id;
			var imgServer = '';
			if(data) {
				id = data.id;
				enterpriseInfo = {
					legalPersonName: data.legalPersonName,
					companyName: data.companyName,
					license: []
				};
				enterpriseInfo.license.push(data.imgServer + data.license);
				imgServer = data.imgServer;
			}
			return {
				enterpriseInfo: enterpriseInfo || {
					legalPersonName: '',
					companyName: '',
					license: []
				},
				imgServer: imgServer,
				isCut: false,
				authStep: 0,
				disStatement: false,
				agree: false,
				id: id
			};
		},
		methods: {
			stepNext(step) {
				var that = this;
				if(!that.enterpriseInfo.legalPersonName) {
					mui.toast('请输入法人姓名！');
					return;
				}
				if(!that.enterpriseInfo.companyName) {
					mui.toast('请输入企业全称！');
					return;
				}
				if(that.enterpriseInfo.license.length === 0) {
					mui.toast('请上传企业营业执照！');
					return;
				}
				if(!that.agree) {
					mui.toast('请阅读《彩钢精英》企业服务商入驻认证规则，并同意！');
					return;
				}
				var data = {
					legalPersonName: that.enterpriseInfo.legalPersonName,
					companyName: that.enterpriseInfo.companyName,
					license: that.enterpriseInfo.license[0]
				}
				if(that.id) {
					data.id = that.id;
				}
				if(data.license.indexOf('http') == 0) {
					data.license = data.license.substring(data.license.indexOf(this.imgServer) + this.imgServer.length);
				}
				muiUtils.muiAjax(api.APIS.enterpriseCertification.saveEnterpriseCertification, {
					data: JSON.stringify(data),
					contentType: 'application/json',
					dataType: "json",
					type: "post",
					success: function(data) {
						if(data.erroCode === CONSTS.ERROR_CODE.SUCCESS) {
							that.authStep = step;
							var userInfo = cacheUtils.localStorage(CONSTS.PREFIX_LOGIN).getObject(CONSTS.USER_INFO);
							userInfo.enterpriseCertification = 2;
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
			mui('.mui-scroll-wrapper.authmanagerCompany').scroll({
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
	.authmanagerCompany {
		position: absolute;
		top: 45px;
		bottom: 0;
		width: 100%;
	}
	
	.authmanagerCompany input,
	.authmanagerCompany textarea,
	.authmanagerCompany label {
		font-size: 14px;
	}
	
	.authmanagerCompany .inputRow {
		color: #333;
		line-height: 30px;
		padding: 10px;
		position: relative;
		background-color: #fff;
		overflow: hidden;
	}
	
	.authmanagerCompany .inputRow:after {
		content: "";
		height: 1px;
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #d7d7d7;
		transform: scaleY(0.5);
	}
	
	.authmanagerCompany .inputRow label {
		width: 70px;
		float: left;
	}
	
	.authmanagerCompany .inputRow>input[type=text] {
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
	
	.authmanagerCompany .inputRow.declare {
		font-size: 14px;
		padding-left: 29px;
	}
	
	.declare input[type=checkbox] {
		position: absolute;
		top: 19px;
		left: 12px;
	}
	
	.bottomBackBtn a {
		width: 100%;
		color: #26c6da;
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