<template>
	<div class="mui-scroll-wrapper calculator">
		<div class="mui-scroll">
			<div class="oneCalculator">
				<img src="../../static/img/calculator/gangban.jpg" />
				<div class="calculateArea">
					<p>钢板重量计算</p>
					<p><span>长度：</span><input v-model="steelPlateLength"><span>m</span></p>
					<p><span>宽度：</span><input v-model="steelPlateWidth"><span>m</span></p>
					<p><span>厚度：</span><input v-model="steelPlateThickness"><span>mm</span></p>
					<p><span>重量：</span><input value="{{steelPlateWeight | weight}} " readonly><span>kg</span></p>
				</div>
			</div>
			<div class="oneCalculator">
				<img src="../../static/img/calculator/gangguan.jpg" />
				<div class="calculateArea">
					<p>钢管重量计算</p>
					<p><span>长度：</span><input v-model="steelPipeLength"><span>m</span></p>
					<p><span>外径：</span><input v-model="steelPipeDiameter"><span>mm</span></p>
					<p><span>壁厚：</span><input v-model="steelPipeThickness"><span>mm</span></p>
					<p><span>重量：</span><input value="{{steelPipeWeight | weight}} " readonly><span>kg</span></p>
				</div>
			</div>
			<div class="oneCalculator">
				<img src="../../static/img/calculator/yuangang.jpg" />
				<div class="calculateArea">
					<p>圆钢重量计算</p>
					<p><span>长度：</span><input v-model="roundSteelLength"><span>m</span></p>
					<p><span>直径：</span><input v-model="roundSteelDiameter"><span>mm</span></p>
					<p><span>重量：</span><input value="{{roundSteelWeight | weight}} " readonly><span>kg</span></p>
				</div>
			</div>
			<div class="oneCalculator">
				<img src="../../static/img/calculator/fanggang.jpg" />
				<div class="calculateArea">
					<p>方钢重量计算</p>
					<p><span>长度：</span><input v-model="squareSteelLength"><span>m</span></p>
					<p><span>边宽：</span><input v-model="squareSteelWidth"><span>mm</span></p>
					<p><span>重量：</span><input value="{{squareSteelWeight | weight}} " readonly><span>kg</span></p>
				</div>
			</div>
			<div class="oneCalculator">
				<img src="../../static/img/calculator/biangang.jpg" />
				<div class="calculateArea">
					<p>扁钢重量计算</p>
					<p><span>长度：</span><input v-model="flatSteelLength"><span>m</span></p>
					<p><span>边宽：</span><input v-model="flatSteelWidth"><span>mm</span></p>
					<p><span>厚度：</span><input v-model="flatSteelThickness"><span>mm</span></p>
					<p><span>重量：</span><input value="{{flatSteelWeight | weight}} " readonly><span>kg</span></p>
				</div>
			</div>
			<div class="oneCalculator">
				<img src="../../static/img/calculator/liujiaogang.jpg" />
				<div class="calculateArea">
					<p>六角钢重量计算</p>
					<p><span>长度：</span><input v-model="sixAngleSteelLength"><span>m</span></p>
					<p><span>对边直径：</span><input v-model="sixAngleSteelDiameter"><span>mm</span></p>
					<p><span>重量：</span><input value="{{sixAngleSteelWeight | weight}} " readonly><span>kg</span></p>
				</div>
			</div>
			<div class="oneCalculator">
				<img src="../../static/img/calculator/luowengang.jpg" />
				<div class="calculateArea">
					<p>螺纹钢重量计算</p>
					<p><span>长度：</span><input v-model="screwThreadSteelLength"><span>m</span></p>
					<p><span>直径：</span><input v-model="screwThreadSteelDiameter"><span>mm</span></p>
					<p><span>重量：</span><input value="{{screwThreadSteelWeight | weight}} " readonly><span>kg</span></p>
				</div>
			</div>
			<div class="oneCalculator">
				<img src="../../static/img/calculator/fangtong.jpg" />
				<div class="calculateArea">
					<p>方通重量计算</p>
					<p><span>长度：</span><input v-model="sidePassLength"><span>m</span></p>
					<p><span>边宽：</span><input v-model="sidePassWidth"><span>mm</span></p>
					<p><span>厚度：</span><input v-model="sidePassThickness"><span>mm</span></p>
					<p><span>重量：</span><input value="{{sidePassWeight | weight}} " readonly><span>kg</span></p>
				</div>
			</div>
			<div class="oneCalculator">
				<img src="../../static/img/calculator/biantong.jpg" />
				<div class="calculateArea">
					<p>扁通重量计算</p>
					<p><span>长度：</span><input v-model="flatPassLength"><span>m</span></p>
					<p><span>边长：</span><input v-model="flatPassSideLength"><span>mm</span></p>
					<p><span>边宽：</span><input v-model="flatPassSideWidth"><span>mm</span></p>
					<p><span>厚度：</span><input v-model="flatPassThickness"><span>mm</span></p>
					<p><span>重量：</span><input value="{{flatPassWeight | weight}} " readonly><span>kg</span></p>
				</div>
			</div>
			<div class="oneCalculator">
				<img src="../../static/img/calculator/dengbianjiaogang.jpg" />
				<div class="calculateArea">
					<p>等边角钢重量计算</p>
					<p><span>长度：</span><input v-model="equalSideAngleSteelLength"><span>m</span></p>
					<p><span>边宽：</span><input v-model="equalSideAngleSteelWidth"><span>mm</span></p>
					<p><span>厚度：</span><input v-model="equalSideAngleSteelThickness"><span>mm</span></p>
					<p><span>重量：</span><input value="{{equalSideAngleSteelWeight | weight}} " readonly><span>kg</span></p>
				</div>
			</div>
			<div class="oneCalculator">
				<img src="../../static/img/calculator/budengbianjiaogang.jpg" />
				<div class="calculateArea">
					<p>不等边角钢重量计算</p>
					<p><span>长度：</span><input v-model="notEqualSideAngleSteelLength"><span>m</span></p>
					<p><span>边宽1：</span><input v-model="notEqualSideAngleSteelWidth1"><span>mm</span></p>
					<p><span>边宽2：</span><input v-model="notEqualSideAngleSteelWidth2"><span>mm</span></p>
					<p><span>厚度：</span><input v-model="notEqualSideAngleSteelThickness"><span>mm</span></p>
					<p><span>重量：</span><input value="{{notEqualSideAngleSteelWeight | weight}} " readonly><span>kg</span></p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import muiUtils from 'common/muiUtils';
	export default {
		data: function() {
			return {
				scroll: undefined,
				steelPlateLength: undefined,
				steelPlateWidth: undefined,
				steelPlateThickness: undefined,
				steelPlateWeight: 0,
				steelPipeLength: undefined,
				steelPipeDiameter: undefined,
				steelPipeThickness: undefined,
				steelPipeWeight: 0,
				roundSteelLength: undefined,
				roundSteelDiameter: undefined,
				roundSteelWeight: 0,
				squareSteelLength: undefined,
				squareSteelWidth: undefined,
				squareSteelWeight: 0,
				flatSteelLength: undefined,
				flatSteelWidth: undefined,
				flatSteelThickness: undefined,
				flatSteelWeight: 0,
				sixAngleSteelLength: undefined,
				sixAngleSteelDiameter: undefined,
				sixAngleSteelWeight: 0,
				screwThreadSteelLength: undefined,
				screwThreadSteelDiameter: undefined,
				screwThreadSteelWeight: 0,
				sidePassLength: undefined,
				sidePassWidth: undefined,
				sidePassThickness: undefined,
				sidePassWeight: 0,
				flatPassLength: undefined,
				flatPassSideLength: undefined,
				flatPassSideWidth: undefined,
				flatPassThickness: undefined,
				flatPassWeight: 0,
				equalSideAngleSteelLength: undefined,
				equalSideAngleSteelWidth: undefined,
				equalSideAngleSteelThickness: undefined,
				equalSideAngleSteelWeight: 0,
				notEqualSideAngleSteelLength: undefined,
				notEqualSideAngleSteelWidth1: undefined,
				notEqualSideAngleSteelWidth2: undefined,
				notEqualSideAngleSteelThickness: undefined,
				notEqualSideAngleSteelWeight: 0
			};
		},
		computed: {
			steelPlateWeight() {
				return 785 * this.steelPlateLength * this.steelPlateWidth * this.steelPlateThickness / 100;
			},
			steelPipeWeight() {
				return (this.steelPipeDiameter - this.steelPipeThickness) * this.steelPipeThickness * this.steelPipeLength * 2466 / 100000;
			},
			roundSteelWeight() {
				return this.roundSteelDiameter * this.roundSteelDiameter * this.roundSteelLength * 617 / 100000;
			},
			squareSteelWeight() {
				return this.squareSteelWidth * this.squareSteelWidth * this.squareSteelLength * 785 / 100000;
			},
			flatSteelWeight() {
				return this.flatSteelLength * this.flatSteelWidth * this.flatSteelThickness * 785 / 100000;
			},
			sixAngleSteelWeight() {
				return this.sixAngleSteelDiameter * this.sixAngleSteelDiameter * this.sixAngleSteelLength * 68 / 100000;
			},
			screwThreadSteelWeight() {
				return this.screwThreadSteelDiameter * this.screwThreadSteelDiameter * this.screwThreadSteelLength * 617 / 100000;
			},
			sidePassWeight() {
				return this.sidePassLength * this.sidePassWidth * this.sidePassThickness * 4 * 785 / 100000;
			},
			flatPassWeight() {
				return (this.flatPassSideLength + this.flatPassSideWidth) * 2 * this.flatPassThickness * this.flatPassLength * 785 / 100000;
			},
			equalSideAngleSteelWeight() {
				return this.equalSideAngleSteelLength * this.equalSideAngleSteelWidth * this.equalSideAngleSteelThickness * 15 / 1000;
			},
			notEqualSideAngleSteelWeight() {
				return (this.notEqualSideAngleSteelWidth1 + this.notEqualSideAngleSteelWidth2) * this.notEqualSideAngleSteelLength * this.notEqualSideAngleSteelThickness * 76 / 10000;
			}
		},
		filters: {
			weight(val) {
				if(val.toString().indexOf('.') != -1 && val.toString().split('.')[1].length > 4) {
					val = val.toFixed(4);
				}
				return val || 0;
			}
		},
		methods: {

		},
		ready: function() {
			this.scroll = mui('.mui-scroll-wrapper.calculator').scroll({
				bounce: true,
				indicators: false, // 是否显示滚动条
				deceleration: mui.os.ios ? 0.003 : 0.0009
			});
		}
	};
</script>

<style scoped>
	.calculator {
		position: absolute;
		top: 45px;
		bottom: 50px;
		width: 100%;
	}
	
	.oneCalculator {
		padding: 10px;
		background-color: #fff;
		margin: 8px 0;
	}
	
	.oneCalculator img {
		width: 40px;
		height: 40px;
		float: left;
	}
	
	.oneCalculator .calculateArea {
		padding-left: 50px;
	}
	
	.oneCalculator .calculateArea p {
		line-height: 30px;
		color: #666;
	}
	
	.oneCalculator .calculateArea p:nth-child(1) {
		line-height: 1;
		border-bottom: solid 1px #D7D7D7;
		color: #333;
		font-size: 15px;
		padding-bottom: 10px;
	}
	
	.oneCalculator input {
		width: 120px;
		font-size: 14px;
		margin-right: 7px;
	}
	
</style>