'use strict';

/* API_ROOT */
const API_ROOT = 'http://192.168.2.66';
const USER = '/user';
const SETTING = '/settings';
const COLLECTION = '/collection';
const STORE = '/store';
const PROJECT = '/project';
const MASTER = '/masterCard';
const EMPLOYMENTDEMAND = '/employmentDemand';
const COMMON = '/common';
const REALNAMEAUTHENTICATION = '/realNameAuthentication';
const ENTERPRISECERTIFICATION = '/enterpriseCertification';
const SYSTEMNOTICE = '/systemNotice';
const ADVERTISEMENT = '/advertisement';
const ADRELATION= '/adRelation';
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
		getUserById: API_ROOT + USER + '/getUserById',
		updateLatestLoginTime: API_ROOT + USER + '/updateLatestLoginTime',
		updateUserState: API_ROOT + USER + '/updateUserState',
		sendCode: API_ROOT + USER + '/sendCode',
		sendCodeForUpdate: API_ROOT + USER + '/sendCodeForUpdate',
		updateShareState: API_ROOT + USER + '/updateShareState',
		updateUserAvatar: API_ROOT + USER + '/updateUserAvatar',
		updateMobileNumber: API_ROOT + USER + '/updateMobileNumber',
		updateUserInfo: API_ROOT + USER + '/updateUserInfo',
		updateCompanyInfo: API_ROOT + USER + '/updateCompanyInfo',
		getUserList: API_ROOT + USER + '/getUserList'
	},
	
	settings: {
		getSettings:　API_ROOT + SETTING + '/getSettings',
		updateSettings:　API_ROOT + SETTING + '/updateSettings'
	},
	
	collection: {
		getMasterCards:　API_ROOT + COLLECTION + '/getMasterCards',
		getEmploymentDemands:　API_ROOT + COLLECTION + '/getEmploymentDemands',
		getProjects:　API_ROOT + COLLECTION + '/getProjects',
		getStores:　API_ROOT + COLLECTION + '/getStores',
		deleteCollection:　API_ROOT + COLLECTION + '/deleteCollection',
		addCollection:　API_ROOT + COLLECTION + '/addCollection'
	},
	
	store: {
		getStore: API_ROOT + STORE + '/getStore',
		getStoreByUserId: API_ROOT + STORE + '/getStoreByUserId',
		getStoreList: API_ROOT + STORE + '/getStoreList',
		saveStore: API_ROOT + STORE + '/saveStore',
		updateStoreCt: API_ROOT + STORE + '/updateStoreCt',
		updateStoreState: API_ROOT + STORE + '/updateStoreState',
		deleteStore: API_ROOT + STORE + '/deleteStore',
	},
	
	project: {
		getUserProject: API_ROOT + PROJECT + '/getUserProject',
		getProjectById: API_ROOT + PROJECT + '/getProjectById',
		getProjectList: API_ROOT + PROJECT + '/getProjectList',
		saveProject: API_ROOT + PROJECT + '/saveProject',
		updateProjectCt: API_ROOT + PROJECT + '/updateProjectCt',
		updateProjectState: API_ROOT + PROJECT + '/updateProjectState',
		deleteProject: API_ROOT + PROJECT + '/deleteProject'
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
	
	employmentDemand: {
		getUserEmploymentDemand: API_ROOT + EMPLOYMENTDEMAND + '/getUserEmploymentDemand',
		getEmploymentDemandById: API_ROOT + EMPLOYMENTDEMAND + '/getEmploymentDemandById',
		getEmploymentDemandList: API_ROOT + EMPLOYMENTDEMAND + '/getEmploymentDemandList',
		saveEmploymentDemand: API_ROOT + EMPLOYMENTDEMAND + '/saveEmploymentDemand',
		updateEmploymentDemandCt: API_ROOT + EMPLOYMENTDEMAND + '/updateEmploymentDemandCt',
		updateEmploymentDemandState: API_ROOT + EMPLOYMENTDEMAND + '/updateEmploymentDemandState',
		deleteEmploymentDemand: API_ROOT + EMPLOYMENTDEMAND + '/deleteEmploymentDemand',
	},
	
	common: {
		uploadImage: API_ROOT + COMMON + '/uploadImage',
		appupdate: API_ROOT + COMMON + '/appUpdate',
		homeData: API_ROOT + COMMON + '/homeData'
	},
	
	realNameAuthentication: {
		saveRealNameAuthentication: API_ROOT + REALNAMEAUTHENTICATION + '/saveRealNameAuthentication',
		updateRealNameAuthenticationState: API_ROOT + REALNAMEAUTHENTICATION + '/updateRealNameAuthenticationState',
		getRealNameAuthentication: API_ROOT + REALNAMEAUTHENTICATION + '/getRealNameAuthentication',
		getRealNameAuthenticationByUserId: API_ROOT + REALNAMEAUTHENTICATION + '/getRealNameAuthenticationByUserId',
		getRealNameAuthenticationList: API_ROOT + REALNAMEAUTHENTICATION + '/getRealNameAuthenticationList'
	},
	
	enterpriseCertification: {
		saveEnterpriseCertification: API_ROOT + ENTERPRISECERTIFICATION + '/saveEnterpriseCertification',
		updateEnterpriseCertificationState: API_ROOT + ENTERPRISECERTIFICATION + '/updateEnterpriseCertificationState',
		getEnterpriseCertification: API_ROOT + ENTERPRISECERTIFICATION + '/getEnterpriseCertification',
		getEnterpriseCertificationByUserId: API_ROOT + ENTERPRISECERTIFICATION + '/getEnterpriseCertificationByUserId',
		getEnterpriseCertificationList: API_ROOT + ENTERPRISECERTIFICATION + '/getEnterpriseCertificationList'
	},
	
	systemNotice: {
		getSystemNotice: API_ROOT + SYSTEMNOTICE + '/getSystemNotice',
		saveSystemNotice: API_ROOT + SYSTEMNOTICE + '/saveSystemNotice',
		getSystemNoticeList: API_ROOT + SYSTEMNOTICE + '/getSystemNoticeList',
		deleteSystemNotice: API_ROOT + SYSTEMNOTICE + '/deleteSystemNotice'
	},
	
	advertisement: {
		advertisement: API_ROOT + ADVERTISEMENT,
		getPositionAds: API_ROOT + ADVERTISEMENT + '/getPositionAds',
		updateAllianceAd: API_ROOT + ADVERTISEMENT + '/updateAllianceAd',
		getAdList: API_ROOT + ADVERTISEMENT + '/list'
	},
	
	adRelation: {
		adRelation: API_ROOT + ADRELATION,
		getAdInfo: API_ROOT + ADRELATION + '/getAdInfo',
		saveAppAdvertisement: API_ROOT + ADRELATION + '/saveAppAdvertisement',
	}
};

const PAGE_URL = {
	// 首页
	index: {
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
