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
		title: '用户登录',
        hdstyle: {
            back: {
                display: true
            },
            title: {
                display: true
            }
        }
	},
	el: 'vheader'
});
//头部head end
mui.init({
	swipeBack: true
});
mui.plusReady(function() {
	router.start(app, '#app');
});