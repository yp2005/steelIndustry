/** * @file 用户登录 * @Author lxm * @private */

<template>
	<nonetworkmask :disnonetworkmask.sync="disnonetworkmask" :top="45" :bottom="0"></nonetworkmask>
	<div class="mui-scroll-wrapper protocol">
		<div class="mui-scroll">
			<div class="mui-content">

				<h4>免责条款</h4>
				<p>欢迎使用包工头！任何使用包工头的用户均应仔细阅读本协议，用户使用包工头的行为，包括进入包工头主页及各层页面将被视为对本协议全部内容的认可包工头所有刊登内容，以及所提供的信息资料，目的是为了更好地服务我们的访问者，本网站不保证所有信息、文本、图形、链接以及其它项目的绝对准确性和完整性，仅供访问者参照使用。故使用包工头之前，您理解并认可包工头提供的信息资料，包括所有信息、文本、图形、链接等内容均由用户自主、免费发布，并由用户承担全部责任。 </p>
				<p>包工头不担保网络服务一定能满足用户的要求，也不担保网络服务不会中断，对网络服务的及时性、安全性、准确性也都不敢做担保。对于因不可抗力或包工头不能控制的原因造成的网络服务中断或其他缺陷，包工头不承担任何责任，但将尽力减少因此而给用户造成的损失和影响。 </p>
				<p>包工头严格保障用户隐私权，对上网用户的个人信息保密，未经上网用户同意不得向他人泄露，但法律另有规定的除外。用户自愿注册个人信息及服务师傅自愿入驻平台，用户在注册时或服务师傅在入驻时提供的所有信息，都是基于自愿，用户有权在任何时候拒绝提供这些信息。注册个人信息的用户及入驻平台的服务师傅同意包工头对这些信息进行善意利用。用户明确同意其使用包工头网络服务所存在的风险将完全由其资金承担。任何单位或个人认为通过包工头的内容可能涉嫌侵犯其合法权益，应该及时向包工头书面反馈，并提供身份证明、权属证明及详细侵权情况证明，包工头在收到上述法律文件后，将会尽快删除被控侵权内容。 </p>
				<p>包工头所有内容并不反映任何包工头之意见及观点。 </p>
				<p>包工头适用于中华人民共和国法律法规规定的其他有关免责规定。 </p>
				<h4>用户协议 </h4>
				<p>1、包工头的服务内容 </p>
				<p>包工头定位于提供有关于师傅找活找工作，商家和用户找师傅的免费信息服务，通过为个人用户、入住平台的服务师傅和商家提供资源丰富、交互性强的及时有效对等的信息平台来帮助用户解决关于师傅找活难，用户找师傅难的问题。 </p>
				<p>2、协议生效条件 </p>
				<p>包工头的各项服务的所有权和运作权归包工头所有。包工头提供的服务将完全按照其发布的章程、服务条款和操作规则严格执行。用户完全完成注册程序或服务师傅自主提交入驻申请，此协议即时生效，您随之成为包工头的注册用户及平台服务师傅。 </p>
				<p>3、注册/入驻义务 </p>
				<p>包工头通过国际互联网为用户提供网络服务。同时，用户必须： </p>
				<p>（1）自行配备上网的所需设备，包括个人电脑、调制解调器或其他必备上网装置。 </p>
				<p>（2）自行负担个人上网所支付的与此服务有关的电话费用、网络费用。 </p>
				<p>（3）为了能使用本服务，您同意以下事项： </p>
				<p>（a）依本服务注册表和入驻申请表的提示提供您本人真实、正确、最新及完整的资料。 </p>
				<p>（b）维持更新您个人用户信息，确保其真实、正确、最新及完整。如果您提供任何错误、不实、过时或不完整的资料，并为包工头所确知，或者包工头有合理的理由怀疑前述资料为错误、不实、过时或不完整，包工头有权暂停或终止您的账号，并拒绝您于现在和未来使用包工头全部或部分的服务。 </p>
				<p>（c）用户必须统一接受包工头通过电子邮件或其他方式向用户发送广告或其他相关商业信息。 </p>
				<p>4、隐私制度 </p>
				<p>尊重用户个人隐私是包工头的一项基本政策。所以，作为对用户注册资料及师傅入驻信息分析的补充，包工头不会再未经合法用户授权时公开、编辑或透露其注册资料及保存在包工头中的非公开内容。除非有法律许可要求或包工头在诚信的基础上认为透露这些信息在以下情况是必要的： </p>
				<p>（1）遵守有关法律规定，遵从包工头合法服务程序 </p>
				<p>（2）保持维护包工头的商标所有权 </p>
				<p>（3）在紧急情况下竭力维护用户个人和社会大众的隐私安全 </p>
				<p>（4）符合其他相关的要求 </p>
			</div>
		</div>
	</div>
	<a @tap="goback" class="login-btn">我已阅读，继续登录</a>
</template>

<script>
	import nonetworkmask from 'component/mask/NoNetWorkMask';

	export default {
		data: function() {
			return {
				phone: ''
			}
		},
		created: function() {},
		methods: {
			goback: function() {
				var ws = plus.webview.currentWebview();
				if(history.length == 1) {
					ws.close();
				} else {
					ws.back();
					ws.back();
				}
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
	.protocol {
		position: absolute;
		top: 45px;
		bottom: 50px;
		width: 100%;
	}
	
	.mui-content {
		font-size: 16px;
		padding: 10px;
	}
	
	.login-btn {
		background-color: #fff;
		color: rgb(38, 198, 218);
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		margin-bottom: 0;
		border: none;
		padding: 0;
		height: 50px;
		line-height: 50px;
		box-shadow: none;
		border-radius: 0;
		text-align: center;
		z-index: 2;
	}
</style>