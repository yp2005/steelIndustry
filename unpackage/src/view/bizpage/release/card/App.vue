/**
 * @file 发布名片主组件 
 * @Author yupeng 
 * @private
 */

<template>
	<div class="mui-content">
		<div class="mui-scroll-wrapper releaseCard" >
			<div class="mui-scroll">
				<div class="title">基本信息</div>
				<div class="inputRow"><label>联系人</label><input placeholder="请输入姓名(必填)"></div>
				<div class="inputRow"><label>联系方式</label><input placeholder="请输入您的联系方式(必填)"></div>
				<div class="inputRow"><label>联系地址</label><input placeholder="请选择联系地址(必填)"></div>
				<div class="inputRow">
					<label>工龄</label>
					<div class="mui-numbox" data-numbox-min='0' data-numbox-max='50'>
						<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
						<input class="mui-input-numbox" type="number">
						<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
					</div>
				</div>
				<div class="title">求职信息</div>
				<div class="inputRow"><label>标题</label><input placeholder="姓名加工种(必填)"></div>
				<div class="inputRow"><label>工种</label><input placeholder="请选择工种(必填)"></div>
				<div class="inputRow"><label>服务区域</label><input placeholder="请选择服务区域(必填)"></div>
				<div class="inputRow textarea">
					<label>自我介绍</label>
					<textarea id="textarea" placeholder="介绍你的工作技能、工作经验等" @input="textAreaInput"></textarea>
				</div>
				<div class="inputRow">
					<p>您可以上传图片辅助说明，最多五张(选填)</p>
					<upload :pictures.sync="pictures"></upload>
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
	import upload from 'component/upload/UploadImage';
	export default {
		data: function() {
			return {
				pictures: []
			};
		},
		created: function() {

		},
		methods: {
			textAreaInput() {
				var textarea = document.getElementById('textarea');
                textarea.style.height = '80px';
                var scrollHeight = textarea.scrollHeight;
                if(scrollHeight > 80) {
                    textarea.style.height = scrollHeight + 'px'; 
                }
			}
		},
		ready: function() {
			mui('.mui-scroll-wrapper.releaseCard').scroll({
				bounce: true,
				indicators: false, // 是否显示滚动条
				deceleration: mui.os.ios ? 0.003 : 0.0009
			});
			mui('.mui-numbox').numbox();
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
	}
	
	.releaseCard .inputRow:after {
		content: "";
		height: 1px;
		position: absolute;
		left: -1000px;
		right: -1000px;
		bottom: 0;
		background-color: #d7d7d7;
		transform: scale(0.5);
	}
	
	.releaseCard .inputRow {
		background-color: #fff;
	}
	
	.releaseCard .title {
		background-color: #ddd;
		padding: 5px;
		font-size: 15px;
		color: #222;
	}
	
	.releaseCard .inputRow label {
	 	width: 70px;
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
</style>