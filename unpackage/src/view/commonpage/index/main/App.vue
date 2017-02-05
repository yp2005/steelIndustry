<template>
	<home v-show="index === 0" :address="address" v-ref:home></home>
	<community v-show="index === 1" v-ref:community></community>
	<calculator v-show="index === 2" v-ref:calculator></calculator>
	<mine v-show="index === 3" v-ref:mine></mine>
</template>
<script>
	import home from '../../../bizcomponent/Home';
	import community from '../../../bizcomponent/Community';
	import calculator from '../../../bizcomponent/Calculator';
	import mine from '../../../bizcomponent/Mine';
	export default {
		data() {
				return {
					index: 0,
					address: {
						province: '北京',
						provinceid: 1,
						city: '北京市',
						cityid: 36,
						county: null,
						countyid: null
					}
				};
			},
			watch: {
				index() {
				    if(this.index === 0) {
				        this.$refs.home.scroll.scrollTo(0, 0, 0);
				    }
				    else if(this.index === 1) {
				    	this.$refs.community.scroll.scrollTo(0, 0, 0);
				    }
				    else if(this.index === 2) {
				    	this.$refs.calculator.scroll.scrollTo(0, 0, 0);
				    }
				    else if(this.index === 3) {
				    	this.$refs.mine.scroll.scrollTo(0, 0, 0);
				    }
				}
			},
			components: {
				home,
				community,
				calculator,
				mine
			}
	}
</script>