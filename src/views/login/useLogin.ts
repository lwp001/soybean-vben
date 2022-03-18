import type { FormItemRule } from 'naive-ui';

import { ref, computed, unref, Ref } from 'vue';

export enum LoginStateEnum {
  LOGIN,
  REGISTER,
  RESET_PASSWORD,
  MOBILE,
  QR_CODE
}

const currentState = ref(LoginStateEnum.LOGIN);

export function useLoginState() {
  function setLoginState(state: LoginStateEnum) {
    currentState.value = state;
  }

  const getLoginState = computed(() => currentState.value);

  function handleBackLogin() {
    setLoginState(LoginStateEnum.LOGIN);
  }

  return { setLoginState, getLoginState, handleBackLogin };
}

export function useFormRules(formData?: Recordable) {
  const getAccountFormRule = computed(() => createRule('请输入账号'));
  const getPasswordFormRule = computed(() => createRule('请输入密码'));
  const getSmsFormRule = computed(() => createRule('请输入验证码'));
  const getMobileFormRule = computed(() => createRule('请输入手机号码'));

  /** 获取确认密码的表单规则 */
  const getConfirmPwdRule = (pwd: Ref<string>) => {
    const confirmPwdRule: FormItemRule[] = [
      { required: true, message: '请输入确认密码' },
      {
        validator: (rule, value) => {
          if (!isBlankString(value) && value !== pwd.value) {
            return Promise.reject(rule.message);
          }
          return Promise.resolve();
        },
        message: '两次输入密码不一致',
        trigger: 'input'
      }
    ];
    return confirmPwdRule;
  };

  const getFormRules = computed((): { [k: string]: FormItemRule | FormItemRule[] } => {
    const accountFormRule = unref(getAccountFormRule);
    const passwordFormRule = unref(getPasswordFormRule);
    const smsFormRule = unref(getSmsFormRule);
    const mobileFormRule = unref(getMobileFormRule);

    const mobileRule = {
      sms: smsFormRule,
      mobile: mobileFormRule
    };
    switch (unref(currentState)) {
      // register form rules
      case LoginStateEnum.REGISTER:
        return {
          account: accountFormRule,
          password: passwordFormRule,
          confirmPassword: getConfirmPwdRule(formData?.password),
          policy: [
            {
              validator: (rule, value) => {
                return !value ? Promise.reject(rule.message) : Promise.resolve();
              },
              message: '勾选后才能注册',
              trigger: 'change'
            }
          ],
          ...mobileRule
        };

      // reset password form rules
      case LoginStateEnum.RESET_PASSWORD:
        return {
          account: accountFormRule,
          ...mobileRule
        };

      // mobile form rules
      case LoginStateEnum.MOBILE:
        return mobileRule;

      // login form rules
      default:
        return {
          account: accountFormRule,
          password: passwordFormRule
        };
    }
  });
  return { getFormRules };
}

function createRule(message: string) {
  return [
    {
      required: true,
      message,
      trigger: 'change'
    }
  ];
}

/** 是否为空字符串 */
function isBlankString(str: string) {
  return str.trim() === '';
}
