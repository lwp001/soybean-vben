/** 登录页面组件 i18 */
export const moduleMap: Record<string, string> = {
  'pwd-login': 'page.login.pwdLogin.title',
  'code-login': 'page.login.codeLogin.title',
  register: 'page.login.register.title',
  'reset-pwd': 'page.login.resetPwd.title',
  'bind-wechat': 'page.login.bindWeChat.title'
};

export interface Emits {
  (e: 'changeLoginCompent', value: string): void;
}

export interface ToLoginEmits {
  (e: 'toLogin'): void;
}
