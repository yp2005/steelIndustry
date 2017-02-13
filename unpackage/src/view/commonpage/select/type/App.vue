<template>
	<div class="selectType">
		<div class="mui-scroll-wrapper left">
			<div class="mui-scroll">
				<div v-for="type in typeData">
					<a href="javascript:void(0)" @tap="typeChange($index)" class="{{$index === curIndex ? 'active' : ''}}">{{type.text}}</a>
					<span v-show="type.selectedNum > 0">{{type.selectedNum}}</span>
				</div>
			</div>
		</div>
		<div class="mui-scroll-wrapper right">
			<div class="mui-scroll">
				<template v-if="deep === 2">
					<div v-for="type2 in typeData[curIndex].children" class="{{$index%2 === 0 ? 'leftDiv' : 'rightDiv'}}">
						<a class="{{type2.selected ? 'active' : ''}}" href="javascript:void(0)" @tap="select(typeData[curIndex], type2)">{{type2.text}}</a>
					</div>
				</template>
				<template v-if="deep === 3">
					<div class="deep3" v-for="type2 in typeData[curIndex].children">
						<p>{{type2.text}}</p>
						<div v-for="type3 in type2.children" class="{{$index%2 === 0 ? 'leftDiv' : 'rightDiv'}}">
							<a class="{{type3.selected ? 'active' : ''}}" href="javascript:void(0)" @tap="select(typeData[curIndex], type3)">{{type3.text}}</a>
						</div>
					</div>
				</template>
			</div>
		</div>
		<div class="bottom">
			<div class="bleft">
				<p>已选{{selectedNum}}项</p>
				<p v-if="typeName !== '区域'">您最多可选择5项</p>
			</div>
			<div class="bright">
				<a href="javascript:void(0)" @tap="selectFinish">选好了</a>
			</div>
		</div>
	</div>

</template>

<script>
	export default {
		data: function() {
			var typeData = plus.webview.currentWebview().typeData || [];
			var deep = plus.webview.currentWebview().deep || 2;
			var selectedNum = 0;
			var typeDataSelected = [];
			var curIndex = 0;
			for(var i = 0; i < typeData.length; i++) {
				var type = typeData[i];
				type.selectedNum = type.selectedNum || 0;
				for(var type2 of type.children) {
					if(deep === 2) {
						type2.selected = type2.selected || false;
						if(type2.selected) {
							selectedNum++;
							typeDataSelected.push(type2);
						}
					} else if(deep === 3) {
						for(var type3 of type2.children) {
							type3.selected = type3.selected || false;
							if(type3.selected) {
								selectedNum++;
								typeDataSelected.push(type3);
								if(plus.webview.currentWebview().typeName === '区域') {
									curIndex = i;
								}
							}
						}
					}
				}
			}
			return {
				typeData: typeData,
				typeName: plus.webview.currentWebview().typeName || '类目',
				curIndex: curIndex,
				deep: deep,
				selectedNum: selectedNum,
				fromPage: plus.webview.currentWebview().fromPage,
				typeDataSelected: typeDataSelected,
				selectNumLim: plus.webview.currentWebview().selectNumLim || 5
			};
		},
		created: function() {

		},
		methods: {
			typeChange(index) {
				if(this.typeName === '区域' && this.typeData[this.curIndex].selectedNum > 0) {
					mui.toast('您不能选择跨省份的区域！');
					return;
				}
				if(this.typeName === '设备类型' && this.typeData[this.curIndex].selectedNum > 0) {
					mui.toast('您不能选择跨大类的设备类型！');
					return;
				}
				this.curIndex = index;
			},
			select(type1, type2) {
				if(!type2.selected && this.typeName !== '区域' && this.selectedNum >= this.selectNumLim) {
					mui.toast('您最多可选择' + this.selectNumLim + '个' + this.typeName + '！');
					return;
				}
				if(!type2.selected && this.typeName === '区域' && this.typeDataSelected.length > 0 && type2.area_parent_id !== this.typeDataSelected[0].area_parent_id) {
					mui.toast('您不能选择跨城市的区域！');
					return;
				}
				type2.selected ? type1.selectedNum-- : type1.selectedNum++;
				type2.selected ? this.selectedNum-- : this.selectedNum++;
				type2.selected = !type2.selected;
				if(type2.selected) {
					this.typeDataSelected.push(type2);
				}
				else {
					for(var i = 0; i < this.typeDataSelected.length; i++) {
						if(type2.value === this.typeDataSelected[i].value) {
							this.typeDataSelected.splice(i, 1);
							break;
						}
					}
				}
			},
			selectFinish() {
				if(this.selectedNum <= 0) {
					mui.toast('请选择至少一个' + this.typeName + '！');
					return;
				}
				mui.back();
			}
		},
		ready: function() {
			var that = this;
			mui.back = function() {
				var city;
				if(that.typeName === '区域' && that.typeDataSelected.length > 0) {
					city = {
						province: that.typeData[that.curIndex].text,
						provinceid: that.typeData[that.curIndex].value
					};
					for(var type2 of that.typeData[that.curIndex].children) {
						if(type2.value === that.typeDataSelected[0].area_parent_id) {
							city.city = type2.text;
							city.cityid = type2.value;
							break;
						}
					}
				}
				that.fromPage && mui.fire(plus.webview.getWebviewById(that.fromPage), 'typeDataSelected', {
					typeDataSelected: that.typeDataSelected,
					typeName: that.typeName,
					typeData: that.typeData,
					city: city
				});
				plus.webview.currentWebview().close();
			};
			var deceleration = mui.os.ios ? 0.003 : 0.0009;
			mui('.mui-scroll-wrapper').scroll({
				bounce: true,
				indicators: false, //是否显示滚动条
				deceleration: deceleration
			});
		},
		components: {

		}
	};
</script>
<style>
	.selectType {
		position: absolute;
		top: 45px;
		bottom: 0;
		width: 100%;
	}
	
	.left {
		position: absolute;
		left: 0;
		top: 0;
		bottom: 50px;
		width: 30%;
	}
	
	.left:after {
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		width: 1px;
		background-color: #d7d7d7;
		transform: scaleX(0.5);
		z-index: 1;
	}
	
	.right {
		position: absolute;
		left: 30%;
		top: 0;
		bottom: 50px;
		width: 70%;
		background-color: #fff;
	}
	
	.bottom {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		height: 49px;
		background-color: #fff;
	}
	
	.bottom:before {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		height: 1px;
		background-color: #d7d7d7;
		transform: scaleY(0.5);
	}
	
	.left a {
		color: #333;
		background-color: #eee;
		width: 100%;
		height: 40px;
		line-height: 40px;
		position: relative;
		text-align: center;
		font-size: 15px;
	}
	
	.left a:after {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		height: 1px;
		background-color: #d7d7d7;
		transform: scaleY(0.5);
	}
	
	.left a.active {
		background-color: #fff;
	}
	
	.left div {
		position: relative;
	}
	
	.left div span {
		position: absolute;
		right: 2px;
		top: 2px;
		font-size: 10px;
		line-height: 1;
		padding: 1px 4px;
		border-radius: 7px;
		background-color: red;
		color: #fff;
	}
	
	.right div.leftDiv {
		float: left;
		width: 50%;
		padding: 14px 7px 7px 14px;
	}
	
	.right div.rightDiv {
		float: left;
		width: 50%;
		padding: 14px 14px 7px 7px;
	}
	
	.right div a {
		width: 100%;
		line-height: 30px;
		font-size: 13px;
		background-color: #fff;
		border: solid 1px #d7d7d7;
		border-radius: 3px;
		text-align: center;
		color: #333;
	}
	
	.right div a.active {
		border: solid 1px #26c6da;
	}
	
	.right .deep3 {
		clear: both;
		margin-bottom: 8px;
		overflow: hidden;
	}
	
	.right .deep3 p {
		color: #333;
		padding-left: 10px;
		line-height: 30px;
		background-color: #ddd;
	}
	
	.bottom .bleft {
		width: 75%%;
		padding-left: 10px;
		float: left;
	}
	
	.bottom .bleft p:nth-child(1) {
		color: #26c6da;
		font-size: 13px;
		line-height: 1;
		padding: 10px 0 7px 0;
	}
	
	.bottom .bleft p:nth-child(2) {
		color: #999;
		font-size: 14px;
		line-height: 1;
	}
	
	.bottom .bright {
		width: 25%%;
		float: left;
	}
	
	.bottom .bright a {
		line-height: 49px;
		width: 100%;
		color: #fff;
		background-color: #26c6da;
		text-align: center;
		font-size: 15px;
	}
</style>