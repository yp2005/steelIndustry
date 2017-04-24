'use strict';
/*!
 * propperties.js v1.0.0
 * 动态配置项
 *
 * Author: liaoxm
 * Date: 2016-06-16
 *
 */

/**
 * 日志相关配置
 */
exports.logprops = {
  // 日志开关，0是开启日志，1是关闭日志输出
    'logonoff': 0,
  // 日志级别，0:'log',1:'debug',2:'info',3:'error',4:'warn'
    'loglevel': 2
};

/**
 * url相关配置
 */
exports.urlprops = {
  // 缓存位置时的黑名单，页面id，登录页面之类的
    'webview.id.blacklist': [
        'account_login_password',
        'protocol'
    ],
  // 预加载页面id,这些页面需要处理showevent事件
    'webview.preload.whiltlist': [
        'main'
    ]
};

/**
 * UI相关的配置参数
 * @type {Object}
 */
exports.UIprops = {
  // 新开的页面数据最大值
    open_page_num: 10
};
