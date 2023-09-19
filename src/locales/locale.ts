import type { Schema } from '@/router/routes/schema';
import zhCN from './lang/zh-CN';
import en from './lang/en';

const locales: Record<I18nType.LangType, Schema> = {
  'zh-CN': zhCN,
  en
};

export default locales;
