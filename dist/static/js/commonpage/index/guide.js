webpackJsonp([6,0],{0:function(e,i,t){"use strict";function s(e){return e&&e.__esModule?e:{default:e}}var u=t(4),n=s(u),o=t(104),r=s(o);mui.init(),mui.plusReady(function(){new n.default({el:"#app",components:{app:r.default}})}),mui.back=function(){}},2:function(e,i){e.exports=vendors_library},4:function(e,i,t){e.exports=t(2)(231)},25:function(e,i){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default={methods:{start:function(){plus.storage.setItem("launchFlag","true"),mui.openWindow({url:"../../buyer/index/main.html",id:"main",show:{aniShow:"none"},waiting:{autoShow:!1}}),plus.navigator.setFullscreen(!1),setTimeout(function(){plus.webview.currentWebview().close("none"),plus.webview.getWebviewById("HBuilder")&&plus.webview.getWebviewById("HBuilder").close("none")},300)}},ready:function(){plus.navigator.setFullscreen(!0),mui(".mui-slider").slider();for(var e=plus.screen.resolutionHeight+2,i=plus.screen.resolutionWidth+2,t=document.querySelectorAll(".guide-img"),s=0,u=t.length;s<u;s++)t[s].style.width=i+"px",t[s].style.height=e+"px";setTimeout(function(){plus.navigator.closeSplashscreen()},100)}}},31:function(e,i){},76:function(e,i,t){e.exports=t.p+"../static/img/guide-1.jpg"},77:function(e,i,t){e.exports=t.p+"../static/img/guide-2.jpg"},78:function(e,i,t){e.exports=t.p+"../static/img/guide-3.jpg"},81:function(e,i,t){e.exports=' <div class=mui-content> <div class="mui-slider mui-fullscreen"> <div class=mui-slider-group> <div class=mui-slider-item> <a href=javascript:;> <img  onerror=\'this.src=\"../../static/img/placehold.png\"\' class=guide-img src='+t(76)+"> </a> </div> <div class=mui-slider-item> <a href=javascript:;> <img  onerror=\'this.src=\"../../static/img/placehold.png\"\' class=guide-img src="+t(77)+"> </a> </div> <div class=mui-slider-item> <a href=javascript:;> <img  onerror=\'this.src=\"../../static/img/placehold.png\"\' @tap=start class=guide-img src="+t(78)+"> </a> </div> </div> </div> </div> "},104:function(e,i,t){var s,u,n={};t(31),s=t(25),u=t(81),e.exports=s||{},e.exports.__esModule&&(e.exports=e.exports.default);var o="function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports;u&&(o.template=u),o.computed||(o.computed={}),Object.keys(n).forEach(function(e){var i=n[e];o.computed[e]=function(){return i}})}});