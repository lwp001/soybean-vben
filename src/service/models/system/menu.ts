/**
 * menu type
 *
 * - "M": directory
 * - "C": menu
 * - "F": function
 */
type MenuType = 'M' | 'C' | 'F';

type Menu = Api.Common.CommonRecord<{
  /** menu name */
  name: string;
  /** menu type */
  menuType: MenuType;
  /** route name */
  routeName: string;
  /** component = route path */
  component?: string;
  redirect?: string;
  /**
   * i18n key
   *
   * it is for internationalization
   */
  i18nKey?: App.I18n.I18nKey;
  /** iconify icon name or local icon name */
  icon?: string;

  /** menu order */
  order: number;
  /** whether to cache the route */
  keepAlive?: boolean;
  /** outer link */
  href?: string;
  /** whether to hide the route in the menu */
  hideInMenu?: boolean;

  /** By default, the same route path will use one tab, if set to true, it will use multiple tabs */
  multiTab?: boolean;
  /** children menu */
  children?: Menu[];
}>;

export type { Menu, MenuType };
