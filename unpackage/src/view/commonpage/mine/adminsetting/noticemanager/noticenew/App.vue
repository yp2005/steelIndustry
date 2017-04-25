<template>
	<div class="mui-scroll-wrapper noticenew">
		<div class="mui-scroll">
			<div class="title">公告信息</div>
			<div class="inputRow"><label>标题</label><input type="text" v-model="notice.title" placeholder="请输入公告标题(必填)"></div>
			<div class="inputRow textarea">
				<label>详细地址</label>
				<textarea id="textarea" placeholder="请输入公告内容(必填)" v-model="notice.content" @input="textAreaInput"></textarea>
			</div>
			<div class="bottomBtn">
				<a href="javascript:void(0)" @tap="releaseNotice">发布</a>
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
				notice: plus.webview.currentWebview().notice || {
					title: '',
					content: ''
				}
			};
		},
		methods: {
			textAreaInput() {
				var textarea = document.getElementById('textarea');
				textarea.style.height = '280px';
				var scrollHeight = textarea.scrollHeight;
				if(scrollHeight > 280) {
					textarea.style.height = scrollHeight + 'px';
				}
			},
			releaseNotice() {
				if(!this.notice.title) {
					mui.toast('请输入公告标题！');
					return;
				}
				if(!this.notice.content) {
					mui.toast('请输入公告内容！');
					return;
				}
				var that = this;
				muiUtils.muiAjax(api.APIS.systemNotice.saveSystemNotice, {
					data: JSON.stringify(that.notice),
					contentType: 'application/json',
					dataType: "json",
					type: "post",
					success: function(data) {
						if(data.erroCode === CONSTS.ERROR_CODE.SUCCESS) {
							mui.toast('保存成功！');
							mui.fire(plus.webview.getWebviewById('../../commonpage/adminsetting/noticemanager.html'), 'noticenew');
							mui.back();
						} else {
							mui.toast(data.erroCode + '：' + data.erroMsg);
						}
					},
					error: function(xhr, type, errorThrown) {
						mui.toast('服务器或网络异常，请稍后重试。')
					}
				});
			}
		},
		ready: function() {
			mui('.mui-scroll-wrapper.noticenew').scroll({
				bounce: true,
				indicators: false, // 是否显示滚动条
				deceleration: mui.os.ios ? 0.003 : 0.0009
			});
		},
	};
</script>
<style>
	.noticenew {
		position: absolute;
		top: 45px;
		bottom: 0;
		width: 100%;
	}
	
	.noticenew input,
	.noticenew textarea,
	.noticenew label {
		font-size: 14px;
	}
	
	.noticenew .inputRow {
		color: #333;
		line-height: 30px;
		padding: 10px;
		position: relative;
		background-color: #fff;
		overflow: hidden;
	}
	
	.noticenew .inputRow>input[type=text] {
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
	
	.noticenew .inputRow>.jxddicon.icon-jinru32 {
		position: absolute;
		right: 10px;
		top: 16px;
		line-height: 20px;
		font-size: 20px;
		color: #999;
	}
	
	.noticenew .inputRow:after {
		content: "";
		height: 1px;
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #d7d7d7;
		transform: scaleY(0.5);
	}
	
	.noticenew .title {
		background-color: #ddd;
		padding: 5px;
		font-size: 15px;
		color: #222;
	}
	
	.noticenew .inputRow label {
		width: 70px;
		float: left;
	}
	
	.noticenew .inputRow.textarea {
		overflow: hidden;
	}
	
	.noticenew .inputRow.textarea label,
	.noticenew .inputRow.textarea textarea {
		float: left;
	}
	
	.noticenew textarea {
		font-size: 14px;
		color: #666666;
		border: 0;
		padding: 5px 0;
		min-height: 280px;
		margin-bottom: 0;
		width: 200px;
	}
	
	.bottomBtn {
		padding: 15px 10%;
	}
	
	.bottomBtn a {
		line-height: 35px;
		text-align: center;
		font-size: 15px;
		width: 100%;
		color: #fff;
		background-color: #26c6da;
		border: solid 1px #26c6da;
		border-radius: 3px;
	}
</style>