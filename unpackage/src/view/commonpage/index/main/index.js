// 引入vue
import Vue from 'vue';
import VueRouter from 'vue-router';
import app from './app';
import vheader from 'component/mui/Header.vue';
import vnav from 'component/mui/NavTabbar.vue';
import {
	cityData3Lev
} from 'common/cityData';

Vue.use(VueRouter);
let router = new VueRouter();

//mui生命周期管理
mui.init({
	swipeBack: false
});

// head 和 foot所用参数
let hdstyle = {
	citySelect: {
		display: true
	},
	title: {
		display: true
	}
};
let hrefes = [{
	href: '/home',
	text: '首页',
	icon: 'icon-shouye'
}, {
	href: '/community',
	text: '论坛',
	icon: 'icon-community'
}, {
	href: '/calculator',
	text: '计算器',
	icon: 'icon-calculator'
}, {
	href: '/mine',
	text: '我的',
	icon: 'icon-gerenzhongxin'
}];
let typeclass = 'base';
let index = 0;
let showHeader = true;
// 头部head start
let HeaderVue = Vue.extend(vheader);
let header = new HeaderVue({
	propsData: {
		hdstyle: hdstyle,
		typeclass: typeclass,
		title: hrefes[index].text,
		showHeader: showHeader,
		address: {
			province: '北京',
			provinceid: 1,
			city: '北京市',
			cityid: 36,
			county: null,
			countyid: null
		}
	},
	watch: {
		'address.provinceid': function() {
			router.app.address = this.address;
		},
		'address.cityid': function() {
			router.app.address = this.address;
		},
		'address.countyid': function() {
			router.app.address = this.address;
		},
	},
	el: 'vheader'
});
// 头部head end

// 尾部foot start
let FootVue = Vue.extend(vnav);
/*eslint-disable no-unused-vars */
let footer = new FootVue({
	propsData: {
		hdstyle: hdstyle,
		hrefes: hrefes,
		typeclass: typeclass,
		showHeader: showHeader,
		index: index
	},
	el: 'vnav',
	watch: {
		index: function() {
			header.hdstyle = this.hdstyle;
			header.title = hrefes[this.index].text;
			header.typeclass = this.typeclass;
			header.showHeader = this.showHeader;
			header.navIndex = this.index;
			router.app.index = this.index;
		}
	}
});
// 尾部 end

// 两次点击返回
let first = null;
mui.back = function() {
	// 首次按键
	if(!first) {
		first = new Date().getTime();
		mui.toast('再按一次退出');
		setTimeout(function() {
			first = null;
		}, 1000);
	} else {
		if(new Date().getTime() - first < 1000) {
			plus.runtime.quit();
		}
	}
};

mui.plusReady(function() {
	router.start(app, '#app');
	plus.geolocation.getCurrentPosition(function(position) {
		if(!position.address || position.address == {}) {
			return;
		}
		var address = {};
		address.lng = position.coords.longitude;
		address.lat = position.coords.latitude;
		for(var data of cityData3Lev) {
			if(position.address.province && position.address.province.indexOf(data.text) === 0) {
				address.province = data.text;
				address.provinceid = data.value;
				for(var city of data.children) {
					if(city.text === position.address.city) {
						address.city = city.text;
						address.cityid = city.value;
						for(var district of city.children) {
							if(district.text === position.address.district) {
								address.county = district.text;
								address.countyid = district.value;
								break;
							}
						}
						break;
					}
				}
				break;
			}
		}
		address.street = position.address.street || '';
		header.address = address;
	}, function(e) {}, {
		provider: 'baidu'
	});
});