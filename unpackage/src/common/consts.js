'use strict';
/*!
 * consts.js v1.0.0
 * 常量列表js，主要是用来存一些常量，避免大家都各自在各个地方定义常量，便于统一管理<br>
 * 缓存的前缀和key需要注意，不能重复，所以，缓存的前缀，大家尽量按照模块名称来取，保证前缀不重复，例如登录的相关信息，前缀都用login
 * key也都在这里统一定义，这样就可以很明确的知道那些名字已经被占用了，已经存在了。
 * Author: liaoxm
 * Date: 2016-06-21
 * 使用方法：
 *        import CONSTS from 'common/consts.js'
 *        CONSTS.PREFIX_LOGIN
 */

/** **************缓存相关start*************************/
// 登录成功,用户相关信息
// 用户信息
const USER_INFO = 'user_info';

// loing前缀
const PREFIX_LOGIN = 'login';

// forword登录成功后跳转页面
const LOGIN_FORWORD = 'forword';

// app实例id标识
const APP_INSTANCE_ID = 'instance_id';

// 账户的token标识
const LOGIN_ACCESS_TOKEN = 'access_token';

const ERROR_CODE = {
	SUCCESS: 2000, // 成功
	FAIL: 3000,
	NOTLOGIN: 4000,
	NOPERMISSON: 5000,
	REMOTELOGIN: 6000,//其他设备端登录了该账户，被迫下线
	ILLEGALACCESS: 7000,//非法访问
	TIMEEXCEPTION: 8000//本地时间异常，请校准本地时间
};

const DEVICE_LIST = 'device_list';

const PROJECT_LIST = 'project_list';

const MASTER_LIST = 'master_list';

const WORK_LIST = 'work_list';

const SEARCH_HISTORY_KEY = 'searchhistory';

const IS_SHARED = 'is_shared';

export default {
	USER_INFO,
	APP_INSTANCE_ID,
	LOGIN_ACCESS_TOKEN,
	ERROR_CODE,
	DEVICE_LIST,
	PROJECT_LIST,
	MASTER_LIST,
	WORK_LIST,
	SEARCH_HISTORY_KEY,
	PREFIX_LOGIN,
	LOGIN_FORWORD,
	IS_SHARED
};

export {
	USER_INFO,
	APP_INSTANCE_ID,
	LOGIN_ACCESS_TOKEN,
	ERROR_CODE,
	DEVICE_LIST,
	PROJECT_LIST,
	MASTER_LIST,
	WORK_LIST,
	SEARCH_HISTORY_KEY,
	PREFIX_LOGIN,
	LOGIN_FORWORD,
	IS_SHARED
};