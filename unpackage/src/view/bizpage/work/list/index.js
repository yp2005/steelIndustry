// 引入vue
import muiUtils from 'common/muiUtils';
import Vue from 'vue';
import VueRouter from 'vue-router';
import app from './App';
import vheader from 'component/mui/Header';
import CONSTS from 'common/consts'
Vue.use(VueRouter);
var router = new VueRouter();

//头部head start
var HeaderVue = Vue.extend(vheader);
var header = new HeaderVue({
	propsData: {
		typeclass: 'listPage',
		hdstyle: {
			back: {
				display: true
			},
			searchBar: {
				display: true,
				placeholder: '请输入关键字搜索',
				modelName: CONSTS.WORK_LIST,
			},
			rightMenu: {
				display: true
			}
		},
		searchValue: '',
		value: '',
		menuOptions: [{
			name: '消息',
			url: 'message',
			icon: 'message'
		}, {
			name: '首页',
			url: 'home',
			icon: 'home'
		}]
	},
	el: 'vheader',
	watch: {
		searchValue: function() {
			router.app.searchValue = this.searchValue;
		}
	}
});
//头部head end
mui.init({
	swipeBack: true
});
mui.plusReady(function() {
	var searchValue = plus.webview.currentWebview().searchValue ? plus.webview.currentWebview().searchValue : '';
	if(searchValue) {
		header.searchValue = searchValue;
		header.value = searchValue;
	}
	router.start(app, '#app');
});