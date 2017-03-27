'use strict';

/* API_ROOT */
const API_ROOT = 'http://192.168.2.66';
const USER = '/user';
const STORE = '/store';
const SETTING = '/settings';
const PROJECT = '/project';
const MASTER = '/masterCard';
const COMMON = '/common';

/**
 * api的版本，鉴于api的版本可能会出现不统一的情况，所以还是在url里面进行拼接
 */
/* eslint-disable no-unused-vars */
//const API_VERSION = 'v10';

const COMMON_API = {
//	test_api: API_ROOT + '/test/1'

	test_api: '../../static/data/homelist.json'
};
const APIS = {
	user: {
		getImage: API_ROOT + USER + '/getImage',
		login: API_ROOT + USER + '/login',
		getUser: API_ROOT + USER + '/getUser',
		updateLatestLoginTime: API_ROOT + USER + '/updateLatestLoginTime',
		updateUserState: API_ROOT + USER + '/updateUserState',
		sendCode: API_ROOT + USER + '/sendCode'
	},
	
	store: {
		getStore: API_ROOT + STORE + '/getStore',
		getStoreByUserId: API_ROOT + STORE + '/getStoreByUserId',
		getStoreList: API_ROOT + STORE + '/getStoreList',
		saveStore: API_ROOT + STORE + '/saveStore',
		updateStoreCt: API_ROOT + STORE + '/updateStoreCt'
	},
	
	settings: {
		getSettings:　API_ROOT + SETTING + '/getSettings',
		updateSettings:　API_ROOT + SETTING + '/updateSettings'
	},
	
	project: {
		getUserProject: API_ROOT + PROJECT + '/getUserProject',
		getProjectById: API_ROOT + PROJECT + '/getProjectById',
		getProjectList: API_ROOT + PROJECT + '/getProjectList',
		saveProject: API_ROOT + PROJECT + '/saveProject',
		updateProjectCt: API_ROOT + PROJECT + '/updateProjectCt'
	},
	
	masterCard: {
		getMasterCard: API_ROOT + MASTER + '/getMasterCard',
		getMasterCardByUserId: API_ROOT + MASTER + '/getMasterCardByUserId',
		getMasterCardList: API_ROOT + MASTER + '/getMasterCardList',
		saveMasterCard: API_ROOT + MASTER + '/saveMasterCard',
		updateMasterCardCt: API_ROOT + MASTER + '/updateMasterCardCt',
		updateMasterCardWorkState: API_ROOT + MASTER + '/updateMasterCardWorkState',
		updateMasterCardState: API_ROOT + MASTER + '/updateMasterCardState',
		deleteMasterCard: API_ROOT + MASTER + '/deleteMasterCard'
	},
	
	common: {
		uploadImage: API_ROOT + COMMON + '/uploadImage',
		appupdate: API_ROOT + COMMON + '/appUpdate'
	}
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
	APIS,
	PAGE_URL
};
