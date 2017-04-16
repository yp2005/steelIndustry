// 引入vue
import Vue from 'vue';
import VueRouter from 'vue-router';
import app from './App';
import vheader from 'component/mui/Header';
Vue.use(VueRouter);
var router = new VueRouter();

//头部head start
var HeaderVue = Vue.extend(vheader);
var header = new HeaderVue({
	propsData: {
		hdstyle: {
			back: {
				display: true
			},
			title: {
                display: true
            }
		},
		title: '选择地址'
	},
	el: 'vheader'
});
//头部head end
mui.init({
	swipeBack: true
});
mui.plusReady(function() {
	router.start(app, '#app');
	header.title = plus.webview.currentWebview().isPositioning ? '地址详情' : '选择地址';
});