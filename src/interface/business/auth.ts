/** 登录token */
export interface LoginToken {
  /** token */
  token: string;
  /** 刷新token(用户token到期后换取新的token) */
  refreshToken: string;
}

export interface UserInfo {
  /** 用户id */
  userId: string | number;
  /** 用户名 */
  username: string;
  realName: string;
  avatar: string;
  desc?: string;
  homePath?: string;
}
