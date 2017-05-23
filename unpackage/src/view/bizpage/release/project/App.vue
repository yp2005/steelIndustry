<template>
	<div class="mui-content">
		<div class="mui-scroll-wrapper releaseProject">
			<div class="mui-scroll">
				<div class="title">公司信息</div>
				<div class="inputRow"><label>公司名称</label><input v-model="project.companyName" type="text" placeholder="请输入公司名称(必填)"></div>
				<div class="inputRow"><label>联系人</label><input v-model="project.contact" type="text" placeholder="请输入联系人(必填)"></div>
				<div class="inputRow"><label>联系电话</label><input v-model="project.mobileNumber" type="text" placeholder="请输入联系电话(必填)"></div>
				<div class="title">工程信息</div>
				<div class="inputRow"><label>工程名称</label><input v-model="project.projectName" type="text" placeholder="请输入工程名称(必填)"></div>
				<div class="inputRow" @tap="selectAddress">
					<label>工程地址</label>
					<p v-if="address" class="projectType">{{address.province + ' ' + address.city + ' ' + address.district + ' ' +address.street}}</p>
					<input type="text" v-else placeholder="请选择工程地址(必填)" readonly>
					<span class="jxddicon icon-jinru32"></span>
				</div>
				<div class="inputRow" @tap="selectDueTime">
					<label>到期时间</label>
					<input type="text" placeholder="请选择到期时间(必填)" v-model="dueTime" readonly>
					<span class="jxddicon icon-jinru32"></span>
				</div>
				<div class="inputRow textarea">
					<label>工程介绍</label>
					<textarea v-model="project.description" id="textarea" placeholder="请详细描述工程信息" @input="textAreaInput"></textarea>
				</div>
				<div class="inputRow">
					<p>您可以上传图片辅助说明，最多5张(选填)</p>
					<upload :is-cut="isCut" :pictures.sync="project.pictures" :imagecount="5"></upload>
				</div>
				<div class="bottomBtn">
					<a href="javascript:void(0)" @tap="submit(0)">保存草稿</a>
					<a href="javascript:void(0)" @tap="submit(2)">提交审核</a>
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
			var project = plus.webview.currentWebview().project;
			var address = undefined;
			var dueTime = undefined;
			if(project) {
				address = {};
				address.provinceid = project.provinceId;
				address.province = project.provinceName;
				address.cityid = project.cityId;
				address.city = project.cityName;
				address.districtid = project.countyId;
				address.district = project.countyName;
				address.street = project.street;
				address.lng = project.lng;
				address.lat = project.lat;
				dueTime = project.dueTime;
			}
			return {
				isCut: false,
				address: address,
				dueTime: dueTime,
				project: project || {pictures: []}
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
                    that.dueTime = date.getFullYear() + "-" + ((date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + "-" + (date.getDate() > 10 ? date.getDate() : ('0' + date.getDate()));
                }, function() {},{
                    minDate: minDate
                });
			},
			submit(state) {
				if(!this.project.companyName) {
					mui.toast('请输入公司名称');
					return;
				}
				if(!this.project.contact) {
					mui.toast('请输入联系人');
					return;
				}
				if(!this.project.mobileNumber) {
					mui.toast('请输入联系电话');
					return;
				}
				if(!/^1[3|4|5|7|8][0-9]{9}$/.test(this.project.mobileNumber)) {
					mui.toast('请输入正确的手机号码');
					return;
				}
				if(!this.project.projectName) {
					mui.toast('请输入工程名称');
					return;
				}
				if(!this.address) {
					mui.toast('请选择工程地址');
					return;
				}
				if(!this.dueTime) {
					mui.toast('请选择到期时间');
					return;
				}
				var data = this.project;
				data.state = state;
				delete data.stateValue;
				delete data.picture;
				var time = this.dueTime;
				if(time.indexOf('00:00:00') == -1) {
					time = time + ' 00:00:00';
				}
				time = time.replace(/-/g, ':').replace(' ', ':');
				time = time.split(':');
				data.dueTime = new Date(time[0], (time[1] - 1), time[2], time[3], time[4], time[5]).getTime();
				data.provinceId = this.address.provinceid;
				data.provinceName = this.address.province;
				data.cityId = this.address.cityid;
				data.cityName = this.address.city;
				data.countyId = this.address.districtid;
				data.countyName = this.address.district;
				data.street = this.address.street;
				data.lng = this.address.lng;
				data.lat = this.address.lat;
				for(var i = 0; i < data.pictures.length; i++) {
					if(data.pictures[i].indexOf('http') != -1) {
						data.pictures[i] = data.pictures[i].substring(data.pictures[i].indexOf(this.project.imgServer) + this.project.imgServer.length);
					}
				}
				muiUtils.muiAjax(api.APIS.project.saveProject, {
					data: JSON.stringify(data),
					contentType: 'application/json',
					dataType: "json",
					type: "post",
					success: function(data) {
						if(data.erroCode === CONSTS.ERROR_CODE.SUCCESS) {
							mui.toast('保存成功！');
							muiUtils.openWindow('../../commonpage/mine/myproject.html', '../../commonpage/mine/myproject.html', {
								isValidLogin: true,
								isClose: true
							});
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