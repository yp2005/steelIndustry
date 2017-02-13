<template>
	<div class="mui-scroll-wrapper calculator">
		<div class="mui-scroll">
			<ul id="list" class="mui-table-view mui-table-view-chevron">
				<li class="mui-table-view-cell">
					<a class="mui-navigate-right" href="javascript:void(0)" @tap="steelPlateActive = true">
						钢板
					</a>
				</li>
				<li class="mui-table-view-cell">
					<a class="mui-navigate-right" href="javascript:void(0)" @tap="steelPipeActive = true">
						钢管
					</a>
				</li>
				<li class="mui-table-view-cell">
					<a class="mui-navigate-right" href="javascript:void(0)" @tap="roundSteelActive = true">
						圆钢
					</a>
				</li>
				<li class="mui-table-view-cell">
					<a class="mui-navigate-right" href="javascript:void(0)" @tap="squareSteelActive = true">
						方钢
					</a>
				</li>
				<li class="mui-table-view-cell">
					<a class="mui-navigate-right" href="javascript:void(0)" @tap="flatSteelActive = true">
						扁钢
					</a>
				</li>
				<li class="mui-table-view-cell">
					<a class="mui-navigate-right" href="javascript:void(0)" @tap="sixAngleSteelActive = true">
						六角钢
					</a>
				</li>
				<li class="mui-table-view-cell">
					<a class="mui-navigate-right" href="javascript:void(0)" @tap="screwThreadSteelActive = true">
						螺纹钢
					</a>
				</li>
				<li class="mui-table-view-cell">
					<a class="mui-navigate-right" href="javascript:void(0)" @tap="sidePassActive = true">
						方通
					</a>
				</li>
				<li class="mui-table-view-cell">
					<a class="mui-navigate-right" href="javascript:void(0)" @tap="flatPassActive = true">
						扁通
					</a>
				</li>
				<li class="mui-table-view-cell">
					<a class="mui-navigate-right" href="javascript:void(0)" @tap="equalSideAngleSteelActive = true">
						等边角钢
					</a>
				</li>
				<li class="mui-table-view-cell">
					<a class="mui-navigate-right" href="javascript:void(0)" @tap="notEqualSideAngleSteelActive = true">
						不等边角钢
					</a>
				</li>
			</ul>
			<div class="oneCalculator {{steelPlateActive ? 'active' : ''}}">
				<a href="javascript:void(0)" @tap="steelPlateActive = false" class="jxddicon icon-houtui44">返回</a>
				<img src="../../static/img/calculator/gangban.jpg" />
				<div class="calculateArea">
					<p>钢板重量计算</p>
					<p><span>长度：</span><input type="text" v-model="steelPlateLength"><span>m</span></p>
					<p><span>宽度：</span><input type="text" v-model="steelPlateWidth"><span>m</span></p>
					<p><span>厚度：</span><input type="text" v-model="steelPlateThickness"><span>mm</span></p>
					<p><span>重量：</span><input type="text" value="{{steelPlateWeight | weight}} " readonly><span>kg</span></p>
				</div>
			</div>
			<div class="oneCalculator {{steelPipeActive ? 'active' : ''}}">
				<a href="javascript:void(0)" @tap="steelPipeActive = false" class="jxddicon icon-houtui44">返回</a>
				<img src="../../static/img/calculator/gangguan.jpg" />
				<div class="calculateArea">
					<p>钢管重量计算</p>
					<p><span>长度：</span><input type="text" v-model="steelPipeLength"><span>m</span></p>
					<p><span>外径：</span><input type="text" v-model="steelPipeDiameter"><span>mm</span></p>
					<p><span>壁厚：</span><input type="text" v-model="steelPipeThickness"><span>mm</span></p>
					<p><span>重量：</span><input type="text" value="{{steelPipeWeight | weight}} " readonly><span>kg</span></p>
				</div>
			</div>
			<div class="oneCalculator {{roundSteelActive ? 'active' : ''}}">
				<a href="javascript:void(0)" @tap="roundSteelActive = false" class="jxddicon icon-houtui44">返回</a>
				<img src="../../static/img/calculator/yuangang.jpg" />
				<div class="calculateArea">
					<p>圆钢重量计算</p>
					<p><span>长度：</span><input type="text" v-model="roundSteelLength"><span>m</span></p>
					<p><span>直径：</span><input type="text" v-model="roundSteelDiameter"><span>mm</span></p>
					<p><span>重量：</span><input type="text" value="{{roundSteelWeight | weight}} " readonly><span>kg</span></p>
				</div>
			</div>
			<div class="oneCalculator {{squareSteelActive ? 'active' : ''}}">
				<a href="javascript:void(0)" @tap="squareSteelActive = false" class="jxddicon icon-houtui44">返回</a>
				<img src="../../static/img/calculator/fanggang.jpg" />
				<div class="calculateArea">
					<p>方钢重量计算</p>
					<p><span>长度：</span><input type="text" v-model="squareSteelLength"><span>m</span></p>
					<p><span>边宽：</span><input type="text" v-model="squareSteelWidth"><span>mm</span></p>
					<p><span>重量：</span><input type="text" value="{{squareSteelWeight | weight}} " readonly><span>kg</span></p>
				</div>
			</div>
			<div class="oneCalculator {{flatSteelActive ? 'active' : ''}}">
				<a href="javascript:void(0)" @tap="flatSteelActive = false" class="jxddicon icon-houtui44">返回</a>
				<img src="../../static/img/calculator/biangang.jpg" />
				<div class="calculateArea">
					<p>扁钢重量计算</p>
					<p><span>长度：</span><input type="text" v-model="flatSteelLength"><span>m</span></p>
					<p><span>边宽：</span><input type="text" v-model="flatSteelWidth"><span>mm</span></p>
					<p><span>厚度：</span><input type="text" v-model="flatSteelThickness"><span>mm</span></p>
					<p><span>重量：</span><input type="text" value="{{flatSteelWeight | weight}} " readonly><span>kg</span></p>
				</div>
			</div>
			<div class="oneCalculator {{sixAngleSteelActive ? 'active' : ''}}">
				<a href="javascript:void(0)" @tap="sixAngleSteelActive = false" class="jxddicon icon-houtui44">返回</a>
				<img src="../../static/img/calculator/liujiaogang.jpg" />
				<div class="calculateArea">
					<p>六角钢重量计算</p>
					<p><span>长度：</span><input type="text" v-model="sixAngleSteelLength"><span>m</span></p>
					<p><span>对边直径：</span><input type="text" v-model="sixAngleSteelDiameter"><span>mm</span></p>
					<p><span>重量：</span><input type="text" value="{{sixAngleSteelWeight | weight}} " readonly><span>kg</span></p>
				</div>
			</div>
			<div class="oneCalculator {{screwThreadSteelActive ? 'active' : ''}}">
				<a href="javascript:void(0)" @tap="screwThreadSteelActive = false" class="jxddicon icon-houtui44">返回</a>
				<img src="../../static/img/calculator/luowengang.jpg" />
				<div class="calculateArea">
					<p>螺纹钢重量计算</p>
					<p><span>长度：</span><input type="text" v-model="screwThreadSteelLength"><span>m</span></p>
					<p><span>直径：</span><input type="text" v-model="screwThreadSteelDiameter"><span>mm</span></p>
					<p><span>重量：</span><input type="text" value="{{screwThreadSteelWeight | weight}} " readonly><span>kg</span></p>
				</div>
			</div>
			<div class="oneCalculator {{sidePassActive ? 'active' : ''}}">
				<a href="javascript:void(0)" @tap="sidePassActive = false" class="jxddicon icon-houtui44">返回</a>
				<img src="../../static/img/calculator/fangtong.jpg" />
				<div class="calculateArea">
					<p>方通重量计算</p>
					<p><span>长度：</span><input type="text" v-model="sidePassLength"><span>m</span></p>
					<p><span>边宽：</span><input type="text" v-model="sidePassWidth"><span>mm</span></p>
					<p><span>厚度：</span><input type="text" v-model="sidePassThickness"><span>mm</span></p>
					<p><span>重量：</span><input type="text" value="{{sidePassWeight | weight}} " readonly><span>kg</span></p>
				</div>
			</div>
			<div class="oneCalculator {{flatPassActive ? 'active' : ''}}">
				<a href="javascript:void(0)" @tap="flatPassActive = false" class="jxddicon icon-houtui44">返回</a>
				<img src="../../static/img/calculator/biantong.jpg" />
				<div class="calculateArea">
					<p>扁通重量计算</p>
					<p><span>长度：</span><input type="text" v-model="flatPassLength"><span>m</span></p>
					<p><span>边长：</span><input type="text" v-model="flatPassSideLength"><span>mm</span></p>
					<p><span>边宽：</span><input type="text" v-model="flatPassSideWidth"><span>mm</span></p>
					<p><span>厚度：</span><input type="text" v-model="flatPassThickness"><span>mm</span></p>
					<p><span>重量：</span><input type="text" value="{{flatPassWeight | weight}} " readonly><span>kg</span></p>
				</div>
			</div>
			<div class="oneCalculator {{equalSideAngleSteelActive ? 'active' : ''}}">
				<a href="javascript:void(0)" @tap="equalSideAngleSteelActive = false" class="jxddicon icon-houtui44">返回</a>
				<img src="../../static/img/calculator/dengbianjiaogang.jpg" />
				<div class="calculateArea">
					<p>等边角钢重量计算</p>
					<p><span>长度：</span><input type="text" v-model="equalSideAngleSteelLength"><span>m</span></p>
					<p><span>边宽：</span><input type="text" v-model="equalSideAngleSteelWidth"><span>mm</span></p>
					<p><span>厚度：</span><input type="text" v-model="equalSideAngleSteelThickness"><span>mm</span></p>
					<p><span>重量：</span><input type="text" value="{{equalSideAngleSteelWeight | weight}} " readonly><span>kg</span></p>
				</div>
			</div>
			<div class="oneCalculator {{notEqualSideAngleSteelActive ? 'active' : ''}}">
			<a href="javascript:void(0)" @tap="notEqualSideAngleSteelActive = false" class="jxddicon icon-houtui44">返回</a>
				<img src="../../static/img/calculator/budengbianjiaogang.jpg" />
				<div class="calculateArea">
					<p>不等边角钢重量计算</p>
					<p><span>长度：</span><input type="text" v-model="notEqualSideAngleSteelLength"><span>m</span></p>
					<p><span>边宽1：</span><input type="text" v-model="notEqualSideAngleSteelWidth1"><span>mm</span></p>
					<p><span>边宽2：</span><input type="text" v-model="notEqualSideAngleSteelWidth2"><span>mm</span></p>
					<p><span>厚度：</span><input type="text" v-model="notEqualSideAngleSteelThickness"><span>mm</span></p>
					<p><span>重量：</span><input type="text" value="{{notEqualSideAngleSteelWeight | weight}} " readonly><span>kg</span></p>
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
				steelPlateActive: false,
				steelPlateLength: undefined,
				steelPlateWidth: undefined,
				steelPlateThickness: undefined,
				steelPlateWeight: 0,
				steelPipeActive: false,
				steelPipeLength: undefined,
				steelPipeDiameter: undefined,
				steelPipeThickness: undefined,
				steelPipeWeight: 0,
				roundSteelActive: false,
				roundSteelLength: undefined,
				roundSteelDiameter: undefined,
				roundSteelWeight: 0,
				squareSteelActive: false,
				squareSteelLength: undefined,
				squareSteelWidth: undefined,
				squareSteelWeight: 0,
				flatSteelActive: false,
				flatSteelLength: undefined,
				flatSteelWidth: undefined,
				flatSteelThickness: undefined,
				flatSteelWeight: 0,
				sixAngleSteelActive: false,
				sixAngleSteelLength: undefined,
				sixAngleSteelDiameter: undefined,
				sixAngleSteelWeight: 0,
				screwThreadSteelActive: false,
				screwThreadSteelLength: undefined,
				screwThreadSteelDiameter: undefined,
				screwThreadSteelWeight: 0,
				sidePassActive: false,
				sidePassLength: undefined,
				sidePassWidth: undefined,
				sidePassThickness: undefined,
				sidePassWeight: 0,
				flatPassActive: false,
				flatPassLength: undefined,
				flatPassSideLength: undefined,
				flatPassSideWidth: undefined,
				flatPassThickness: undefined,
				flatPassWeight: 0,
				equalSideAngleSteelActive: false,
				equalSideAngleSteelLength: undefined,
				equalSideAngleSteelWidth: undefined,
				equalSideAngleSteelThickness: undefined,
				equalSideAngleSteelWeight: 0,
				notEqualSideAngleSteelActive: false,
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
				return(this.steelPipeDiameter - this.steelPipeThickness) * this.steelPipeThickness * this.steelPipeLength * 2466 / 100000;
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
				return(this.flatPassSideLength + this.flatPassSideWidth) * 2 * this.flatPassThickness * this.flatPassLength * 785 / 100000;
			},
			equalSideAngleSteelWeight() {
				return this.equalSideAngleSteelLength * this.equalSideAngleSteelWidth * this.equalSideAngleSteelThickness * 15 / 1000;
			},
			notEqualSideAngleSteelWeight() {
				return(this.notEqualSideAngleSteelWidth1 + this.notEqualSideAngleSteelWidth2) * this.notEqualSideAngleSteelLength * this.notEqualSideAngleSteelThickness * 76 / 10000;
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
		color: #003a92;
	}
	
	.mui-scroll {
		min-height: 100%;
	}
	
	.oneCalculator {
		padding: 60px 10px 0 25px;
		background-color: #fff;
		transition: transform 500ms;
		opacity: 0;
		transform: scale(0);
		position: absolute;
		width: 100%;
		top: 0;
		bottom: 0;
	}
	
	.oneCalculator > a {
		position: absolute;
		top: 0;
		left: 10px;
		color: #444;
		font-size: 15px;
		line-height: 50px;
	}
	
	.oneCalculator.active {
		opacity: 1;
		transform: scale(1);
		z-index: 99;
	}
	
	.oneCalculator img {
		width: 40px;
		height: 40px;
		float: left;
	}
	
	
	.oneCalculator .calculateArea p {
		line-height: 50px;
		color: #666;
		padding-left: 50px;
	}
	
	.oneCalculator .calculateArea p:nth-child(1) {
		line-height: 35px;
		border-bottom: solid 1px #D7D7D7;
		color: #333;
		font-size: 15px;
		padding-bottom: 15px;
	}
	
	.oneCalculator input[type=text] {
		width: 120px;
		font-size: 14px;
		margin-right: 7px;
		height: auto;
		line-height: normal;
		border: none;
		margin-bottom: 0;
		padding: 0;
	}
</style>