<template>
	<div class="mui-content">
			<div class="mui-scroll-wrapper releaseCard">
				<div class="mui-scroll">
					<ul class="mui-table-view mui-table-view-chevron">
						<li class="mui-table-view-cell">
							<label>姓名</label>
							<span class="info-text">{{name}}</span>
						</li>
						<li class="mui-table-view-cell">
							<label>身份证号</label>
							<span class="info-text">{{shenfenzheng}}</span>
						</li>
					</ul>
					<div class="title"></div>
					<div class="inputRow">
						<p>身份证正面</p>
						<img :src="imgurl1">
					</div>
					<div class="title"></div>
					<div class="inputRow">
						<p>身份证反面</p>
						<img :src="imgurl2">
					</div>
					<div class="title"></div>
					<div class="inputRow">
						<p>本人手持身份证的照片</p>
						<img :src="imgurl3">
					</div>
					<div class="title"></div>
					<div class="inputRow">
						<p>本人正面照</p>
						<img :src="imgurl4">
					</div>
					<div class="bottomBtn">
						<a href="javascript:void(0)" @tap="authAgree()">审核通过</a>
						<a href="javascript:void(0)" @tap="authNotAgree()">审核不通过</a>
					</div>
				</div>
			</div>
	</div>
</template>

<script>
	import muiUtils from 'common/muiUtils';
	import log from 'common/logUtils';
	import api from 'api';
	import CONSTS from 'common/consts';
	export default {
		data: function() {
			return {
				pictures: [],
				name:'余鹏',
				shenfenzheng:'1111111111',
				imgurl1: 'http://img.168bgt.com/upload/2016/05/22/20160522172528_408.jpg',
				imgurl2: 'http://img.168bgt.com/upload/2016/05/22/20160522172528_408.jpg',
				imgurl3: 'http://img.168bgt.com/upload/2016/05/22/20160522172528_408.jpg',
				imgurl4: 'http://img.168bgt.com/upload/2016/05/22/20160522172528_408.jpg'
			};
		},
		methods: {
			goback() {
				mui.back();
			},
			authAgree(){
				this.goback();
			},
			authNotAgree(){
				this.goback();
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
	
	/*.bottomBtn a:nth-child(1) {
		color: #fff;
		background-color: #26c6da;
		border: solid 1px #26c6da;
		border-radius: 3px;
	}*/
	
	.bottomBtn a:nth-child(1) {
		margin-right: 3%;
		color: #fff;
		background-color: #26c6da;
		border: solid 1px #26c6da;
		border-radius: 3px;
	}
	.bottomBtn a:nth-child(2) {
		margin-left: 3%;
		color: #333;
		background-color: #fff;
		border: solid 1px #d7d7d7;
		border-radius: 3px;
	}
	
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