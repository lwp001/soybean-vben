import { transformRecordToOption } from '@/utils/common';
import type { MenuType } from '@/service/models/index';

export const enableStatusRecord: Record<Api.Common.EnableStatus, App.I18n.I18nKey> = {
  '1': 'page.manage.common.status.enable',
  '2': 'page.manage.common.status.disable'
};

export const enableStatusOptions = transformRecordToOption(enableStatusRecord);

// export const userGenderRecord: Record<Api.SystemManage.UserGender, App.I18n.I18nKey> = {
//   '1': 'page.manage.user.gender.male',
//   '2': 'page.manage.user.gender.female'
// };

// export const userGenderOptions = transformRecordToOption(userGenderRecord);

export const menuTypeRecord: Record<MenuType, App.I18n.I18nKey> = {
  M: 'page.manage.menu.type.directory',
  C: 'page.manage.menu.type.menu',
  F: 'page.manage.menu.type.function'
};

export const menuTypeOptions = transformRecordToOption(menuTypeRecord);
