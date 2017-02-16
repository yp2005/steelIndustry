<template>
	<div class="mui-content">
		<div class="mui-scroll-wrapper releaseProject">
			<div class="mui-scroll">
				<div class="title">公司信息</div>
				<div class="inputRow"><label>公司名称</label><input type="text" placeholder="请输入公司名称(必填)"></div>
				<div class="inputRow"><label>联系人</label><input type="text" placeholder="请输入联系人(必填)"></div>
				<div class="inputRow"><label>联系电话</label><input type="text" placeholder="请输入联系电话(必填)"></div>
				<div class="title">工程信息</div>
				<div class="inputRow"><label>工程名称</label><input type="text" placeholder="请输入工程名称(必填)"></div>
				<div class="inputRow">
					<label>工程地址</label>
					<p v-if="address" class="projectType" @tap="selectAddress">{{address.province + ' ' + address.city + ' ' + address.district + ' ' +address.street}}</p>
					<input type="text" v-else placeholder="请选择工程地址(必填)" readonly @tap="selectAddress">
					<span class="jxddicon icon-jinru32"></span>
				</div>
				<div class="inputRow">
					<label>到期时间</label>
					<input type="text" placeholder="请选择到期时间(必填)" v-model="dueTime" readonly @tap="selectDueTime">
					<span class="jxddicon icon-jinru32"></span>
				</div>
				<div class="inputRow textarea">
					<label>工程介绍</label>
					<textarea id="textarea" placeholder="请详细描述工程信息" @input="textAreaInput"></textarea>
				</div>
				<div class="inputRow">
					<p>您可以上传图片辅助说明，最多5张(选填)</p>
					<upload :is-cut="isCut" :pictures.sync="pictures" :imagecount="5"></upload>
				</div>
				<div class="bottomBtn">
					<a href="javascript:void(0)">保存草稿</a>
					<a href="javascript:void(0)">提交审核</a>
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
				pictures: [],
				isCut: false,
				address: undefined,
				dueTime: undefined
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
			},
			selectAddress() {
				muiUtils.openWindow('../../commonpage/map/selectaddress.html', '../../commonpage/map/selectaddress.html', {
					extras: {
						address: this.address,
						fromPage: '../../bizpage/release/project.html'
					}
				});
			},
			selectDueTime() {
                var that = this;
                var minDate = new Date();
                minDate.setDate(minDate.getDate() + 1);
                plus.nativeUI.pickDate(function(e) {
                    var date = e.date;
                    if(date < minDate) {
                        date = minDate;
                    }
                    that.dueTime = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
                }, function() {
                    //that.$validation.effectiveDate.touched = true;
                },{
                    minDate: minDate
                });
			}
		},
		ready: function() {
			mui('.mui-scroll-wrapper.releaseProject').scroll({
				bounce: true,
				indicators: false, // 是否显示滚动条
				deceleration: mui.os.ios ? 0.003 : 0.0009
			});
			var that = this;
			window.addEventListener('addressSelected', function(e) {
				that.address = e.detail.address;
			})
		},
		components: {
			upload
		}
	};
</script>
<style>
	.releaseProject {
		position: absolute;
		top: 45px;
		bottom: 0;
		width: 100%;
	}
	
	.releaseProject input,
	.releaseProject textarea,
	.releaseProject label {
		font-size: 14px;
	}
	
	.releaseProject .inputRow {
		color: #333;
		line-height: 30px;
		padding: 10px;
		position: relative;
		background-color: #fff;
		overflow: hidden;
	}
	
	.releaseProject .inputRow> input[type=text] {
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
	
	.releaseProject .inputRow> .jxddicon.icon-jinru32 {
		position: absolute;
		right: 10px;
		top: 16px;
		line-height: 20px;
		font-size: 20px;
		color: #999;
	}
	
	.releaseProject .inputRow:after {
		content: "";
		height: 1px;
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #d7d7d7;
		transform: scaleY(0.5);
	}
	
	.releaseProject .title {
		background-color: #ddd;
		padding: 5px;
		font-size: 15px;
		color: #222;
	}
	
	.releaseProject .inputRow label {
		width: 70px;
		float: left;
	}
	
	.releaseProject .inputRow .area,
	.releaseProject .inputRow .area p:nth-child(2) span:nth-child(2),
	.releaseProject .inputRow .projectType {
		padding-left: 70px;
	}
	
	.releaseProject .inputRow .area,
	.releaseProject .inputRow .projectType {
		padding-right: 30px;
	}
	
	.releaseProject .inputRow .area p,
	.releaseProject .inputRow .projectType {
		color: #333;
	}
	
	.releaseProject .inputRow .area p:nth-child(2) {
		line-height: 20px;
	}
	
	.releaseProject .inputRow .area p:nth-child(2) span {
		display: inherit;
	}
	
	.releaseProject .mui-numbox .mui-input-numbox {
		width: 36px !important;
		padding: 0 !important;
	}
	
	.releaseProject .inputRow.textarea {
		overflow: hidden;
	}
	
	.releaseProject .inputRow.textarea label,
	.releaseProject .inputRow.textarea textarea {
		float: left;
	}
	
	.releaseProject textarea {
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
		background-color: #fff;
	}
	
	.bottomBtn a {
		line-height: 35px;
		text-align: center;
		font-size: 15px;
		width: 45%;
	}
	
	.bottomBtn a:nth-child(1) {
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
	}
</style>