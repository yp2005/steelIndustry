<template>
	<div class="mui-content">
		<template v-if="authStep == 0">
			<div class="mui-scroll-wrapper releaseCard">
				<div class="mui-scroll">
					<div class="title"></div>
					<div class="inputRow" style="text-align: center;">
						<span class="statusFont1">提交信息</span>
						<span class="statusFont"> → 等待审核</span>
						<span class="statusFont"> → 认证成功</span>
					</div>
					<div class="title"></div>
					<div class="inputRow"><label>姓名</label><input type="text" placeholder="请输入您的真实姓名"></div>
					<div class="inputRow"><label>身份证号</label><input type="text" placeholder="请输入您的身份证号"></div>
					<div class="title"></div>
					<div class="inputRow">
						<p>请上传身份证正面(必填)</p>
						<upload :is-cut="isCut" :pictures.sync="pictures" :imagecount="1" :dataid="sfz_zhengmian"></upload>
					</div>
					<div class="title"></div>
					<div class="inputRow">
						<p>请上传身份证反面(必填)</p>
						<upload :is-cut="isCut" :pictures.sync="pictures" :imagecount="1" :dataid="sfz_fanmian"></upload>
					</div>
					<div class="title"></div>
					<div class="inputRow">
						<p>请上传1张本人手持身份证的照片(必填)</p>
						<upload :is-cut="isCut" :pictures.sync="pictures" :imagecount="1" :dataid="sfz_shouchi"></upload>
					</div>
					<div class="title"></div>
					<div class="inputRow">
						<p>请上传1张本人正面照(必填)</p>
						<upload :is-cut="isCut" :pictures.sync="pictures" :imagecount="1" :dataid="benren_zhengmian"></upload>
					</div>
					<div class="title"></div>
					<div class="inputRow" style="font-size: 14px;">
						<input style="margin:0px 5px;" type="checkbox" /><span>我阅读并同意</span>
						<span class="statusFont1" @tap="declarationWindow(true)">《包工头个人师傅签约规则》</span></div>
					<div class="bottomBtn">
						<a style="width:100%;" href="javascript:void(0)" @tap="stepNext(1)">提交审核</a>
					</div>
				</div>
			</div>
		</template>
		<template v-if="authStep == 1">
			<div class="title backTitleBg releaseCard">
				<div class="title"></div>
				<div class="inputRow" style="text-align: center;">
					<span class="statusFont1">提交信息</span>
					<span class="statusFont1"> → 等待审核</span>
					<span class="statusFont"> → 认证成功</span>
				</div>
				<div style="margin-top:100px;color:#21A30D;font-size:22px;">
					您的实名认证申请提交成功
				</div>
				<div style="margin-top:20px;color:#666;">
					我们将在一个工作日内完成审核，请耐心等待
				</div>
			</div>
			<div class="bottomBackBtn">
				<a style="width:100%;color: #26c6da;" href="javascript:void(0)" @tap="goback">返回个人中心</a>
			</div>
		</template>
	</div>
    <div v-show="disStatement" class="declarationWindow">
        <h4>包工头个人师傅签约规则</h4>
        <p>内容</p>
        <p>内容</p>
        <p><a href="javascript:void(0)" @tap="declarationWindow(false)">确定</a></p>
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
	import {
		cityData3Lev
	} from 'common/cityData';
	export default {
		data: function() {
			return {
				pictures: [],
				isCut: false,
				authStep: 0,
				disStatement: false
			};
		},
		created: function() {

		},
		methods: {
			stepNext(step) {
				this.authStep = step;
			},
			declarationWindow(isshow) {
				this.disStatement = isshow;
			},
			goback() {
				mui.back();
			}
		},
		ready: function() {
			mui('.mui-scroll-wrapper.releaseCard').scroll({
				bounce: true,
				indicators: false, // 是否显示滚动条
				deceleration: mui.os.ios ? 0.003 : 0.0009
			});
			mui('.mui-numbox').numbox();
			var that = this;
		},
		components: {
			upload
		}
	};
</script>
<style>
	.releaseCard {
		position: absolute;
		top: 45px;
		bottom: 0;
		width: 100%;
	}
	
	.releaseCard input,
	.releaseCard textarea,
	.releaseCard label {
		font-size: 14px;
	}
	
	.releaseCard .inputRow {
		color: #333;
		line-height: 30px;
		padding: 10px;
		position: relative;
		background-color: #fff;
		overflow: hidden;
	}
	
	.releaseCard .inputRow:after {
		content: "";
		height: 1px;
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #d7d7d7;
		transform: scaleY(0.5);
	}
	
	.releaseCard .title {
		background-color: #ddd;
		padding: 5px;
		font-size: 15px;
		color: #222;
	}
	
	.releaseCard .inputRow label {
		width: 70px;
		float: left;
	}
	
	.releaseCard .inputRow .area,
	.releaseCard .inputRow .area p:nth-child(2) span:nth-child(2),
	.releaseCard .inputRow .workType {
		padding-left: 70px;
	}
	
	.releaseCard .inputRow .area p,
	.releaseCard .inputRow .workType {
		color: #333;
	}
	
	.releaseCard .inputRow .area p:nth-child(2) {
		line-height: 20px;
	}
	
	.releaseCard .inputRow .area p:nth-child(2) span {
		display: inherit;
	}
	
	.releaseCard .mui-numbox .mui-input-numbox {
		width: 36px !important;
		padding: 0 !important;
	}
	
	.releaseCard .inputRow.textarea {
		overflow: hidden;
	}
	
	.releaseCard .inputRow.textarea label,
	.releaseCard .inputRow.textarea textarea {
		float: left;
	}
	
	.releaseCard textarea {
		font-size: 14px;
		color: #666666;
		border: 0;
		padding: 5px 0;
		min-height: 80px;
		margin-bottom: 0;
		width: 200px;
	}
	
	.bottomBtn {
		padding: 15px 10%;
		/*background-color: #fff;*/
	}
	
	.bottomBtn a {
		line-height: 35px;
		text-align: center;
		font-size: 15px;
		width: 45%;
	}
	
	.bottomBtn a:nth-child(1) {
		color: #fff;
		background-color: #26c6da;
		border: solid 1px #26c6da;
		border-radius: 3px;
	}
	/*.bottomBtn a:nth-child(1) {
		margin-right: 3%;
		color: #333;
		background-color: #fff;
		border: solid 1px #d7d7d7;
		border-radius: 3px;
	}
	
	.bottomBtn a:nth-child(2) {
		margin-left: 3%;
		color: #fff;
		background-color: #26c6da;
		border: solid 1px #26c6da;
		border-radius: 3px;
	}*/
	
	.backTitleBg {
		position: fixed;
		top: 45px;
		bottom: 0;
		left: 0;
		right: 0;
		/*padding: 50px 0px;*/
		background-color: #ddd;
		text-align: center;
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
	
	.statusFont{
		color:#666;
	}
	
	.statusFont1{
		color:#26c6da;
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
        padding: 15px 12px;
        z-index: 12;
        opacity: 1;
        background-color: #ffffff;
        border: solid 1px #d7d7d7;
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
    
    .declarationWindow p:last-of-type {
        text-indent: 0;
        position: absolute;
        left: 0;
        bottom: 15px;
        text-align: center;
        width: 100%;
    }
    
    .declarationWindow p a {
        font-size: 14px;
        line-height: 26px;
        padding: 0 10px;
        border: solid 1px #26c6da;
        border-radius: 5px;
        color: #26c6da;
    }
</style>