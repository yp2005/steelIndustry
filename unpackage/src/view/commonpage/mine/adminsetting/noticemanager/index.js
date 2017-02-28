// 引入vue
import Vue from 'vue';
import VueRouter from 'vue-router';
import app from './App';
import vheader from 'component/mui/Header';
import muiUtils from 'common/muiUtils';

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
            },
            rightIconButton:{
            	display: true,
            	iconClass: 'mui-icon mui-icon-plusempty',
            	text: '',
            	onClick: function(_this){
					muiUtils.openWindow('../../commonpage/noticemanager/noticenew.html', 'commonpage_noticemanager_noticenew');
            	}
            }
        }
    },
    el: 'vheader'
});
//头部head end

mui.init({
    swipeBack: true
})

mui.plusReady(function() {
    router.start(app, '#app');
});