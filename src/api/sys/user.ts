import { defHttp } from '@/utils/http/axios';
import { LoginParams, LoginResultModel, GetUserInfoModel } from './model/userModel';

import { ErrorMessageMode } from '@/interface';

enum Api {
  Login = '/login',
  Logout = '/logout',
  GetUserInfo = '/getUserInfo',
  GetPermCode = '/getPermCode'
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  // return defHttp.post<LoginResultModel>(
  //   {
  //     url: Api.Login,
  //     params
  //   },
  //   {
  //     errorMessageMode: mode
  //   }
  // );

  return {
    userId: '1',
    username: 'vben',
    realName: 'Vben Admin',
    avatar: 'https://q1.qlogo.cn/g?b=qq&nk=190848757&s=640',
    desc: 'manager',
    password: '123456',
    token: 'fakeToken1',
    homePath: '/dashboard/analysis',
    roles: [
      {
        roleName: 'Super Admin',
        value: 'super'
      }
    ]
  };
  // {
  //   code: 0,
  //   result:
  //   message: 'ok',
  //   type: 'success'
  // };
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  // return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo }, { errorMessageMode: 'none' });
  return {
    userId: '1',
    username: 'vben',
    realName: 'Vben Admin',
    avatar: 'https://q1.qlogo.cn/g?b=qq&nk=190848757&s=640',
    desc: 'manager',
    password: '123456',
    token: 'fakeToken1',
    homePath: '/dashboard/analysis',
    roles: [
      {
        roleName: 'Super Admin',
        value: 'super'
      }
    ]
  };
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode });
}

export function doLogout() {
  return defHttp.get({ url: Api.Logout });
}
