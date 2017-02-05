'use strict';

/* API_ROOT */
const API_ROOT = 'http://localhost';

/**
 * api的版本，鉴于api的版本可能会出现不统一的情况，所以还是在url里面进行拼接
 */
/* eslint-disable no-unused-vars */
//const API_VERSION = 'v10';

const COMMON_API = {
	test_api: API_ROOT + 'test/1'
};


const PAGE_URL = {
  // 首页
    index: {
    // 默认的主webview容器ID，当前必须写HBuilder
        id: 'main',
        url: '../../buyer/index/main.html'
    },
  // 无网络连接页面
    error_connect: {
        id: 'loginIndex',
        url: '../../commonpage/error/error_connect.html'
    },
  // 服务协议界面
    protocol: {
        id: 'protocol',
        url: '../../commonpage/login/protocol.html'
    },
  // 登录入口页(用户名登录)
    login_index: {
        id: 'account_login_password',
        url: '../../commonpage/login/index.html'
    },
  // 登录入口页(手机号登录)
    phone_login_index: {
        id: 'account_login_msg',
        url: '../../commonpage/login/phoneLogin.html'
    },
  // 注册
    account_register: {
        id: 'account_register',
        url: '../../commonpage/login/reg.html'
    },
  // 设置用户名,密码界面
    set_login: {
        id: 'account_set_login',
        url: '../../commonpage/login/setlogin.html'
    },
  // 忘记密码页面
    forgot_password: {
        id: 'account_forgot_password',
        url: '../../commonpage/login/forgotPassword.html'
    },
  // 设置新密码
    reset_password: {
        id: 'account_reset_password',
        url: '../../commonpage/login/setPassword.html'
    },
  // 修改密码
    modify_password: {
        id: 'buyer_mine_usersetting_edituserdata_modifypassword',
        url: '../../buyer/edituserdata/modifypassword.html'
    },
  // 修改绑定手机号
    modify_bindingphone: {
        id: 'buyer_mine_usersetting_edituserdata_modifybindingphone',
        url: '../../buyer/edituserdata/modifybindingphone.html'
    }
};

export default {
	COMMON_API,
	PAGE_URL
};