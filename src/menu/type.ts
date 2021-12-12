/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-12-12 19:17:30
 * */

import { TNode } from '../common';

export interface TdMenuProps {
  /**
   * 是否收起菜单
   * @default false
   */
  collapsed?: boolean;
  /**
   * 展开的子菜单集合
   */
  expanded?: Array<MenuValue>;
  /**
   * 展开的子菜单集合，非受控属性
   */
  defaultExpanded?: Array<MenuValue>;
  /**
   * 同级别互斥展开
   * @default false
   */
  expandMutex?: boolean;
  /**
   * 二级菜单展开方式，平铺展开和浮层展开
   * @default normal
   */
  expandType?: 'normal' | 'popup';
  /**
   * 站点 LOGO
   */
  logo?: TNode;
  /**
   * 导航操作区域
   */
  operations?: TNode;
  /**
   * 菜单风格
   * @default light
   */
  theme?: 'light' | 'dark';
  /**
   * 激活菜单项
   */
  value?: MenuValue;
  /**
   * 激活菜单项，非受控属性
   */
  defaultValue?: MenuValue;
  /**
   * 菜单宽度。值类型为数组时，分别表示菜单展开和折叠的宽度。[ 展开时的宽度, 折叠时的宽度 ]，示例：['200px', '80px']
   * @default '232px'
   */
  width?: string | number | Array<string | number>;
  /**
   * 激活菜单项发生变化时触发
   */
  onChange?: (value: MenuValue) => void;
  /**
   * 侧边栏导航展开/收起发生变化时触发
   */
  onCollapsed?: (options: { collapsed: boolean; e?: MouseEvent }) => void;
  /**
   * 展开的菜单项发生变化时触发
   */
  onExpand?: (value: Array<MenuValue>) => void;
};

export interface TdHeadMenuProps {
  /**
   * 展开的子菜单集合
   */
  expanded?: Array<MenuValue>;
  /**
   * 展开的子菜单集合，非受控属性
   */
  defaultExpanded?: Array<MenuValue>;
  /**
   * 二级菜单展开方式，平铺展开和浮层展开
   * @default normal
   */
  expandType?: 'normal' | 'popup';
  /**
   * 站点 LOGO
   */
  logo?: TNode;
  /**
   * 导航操作区域
   */
  operations?: TNode;
  /**
   * null
   * @default light
   */
  theme?: 'light' | 'dark';
  /**
   * 激活菜单项
   */
  value?: MenuValue;
  /**
   * 激活菜单项，非受控属性
   */
  defaultValue?: MenuValue;
  /**
   * 激活菜单项发生变化时触发
   */
  onChange?: (value: MenuValue) => void;
  /**
   * 展开的菜单项发生变化时触发
   */
  onExpand?: (value: Array<MenuValue>) => void;
};

export interface TdSubmenuProps {
  /**
   * 菜单项内容
   */
  content?: string | TNode;
  /**
   * 菜单项内容，同 content
   */
  default?: string | TNode;
  /**
   * 是否禁用菜单项展开/收起/跳转等功能
   */
  disabled?: boolean;
  /**
   * 菜单项图标
   */
  icon?: TNode;
  /**
   * 二级菜单内容
   */
  title?: string | TNode;
  /**
   * 菜单项唯一标识
   */
  value?: MenuValue;
};

export interface TdMenuItemProps {
  /**
   * 菜单项内容
   */
  content?: string | TNode;
  /**
   * 菜单项内容，同 content
   */
  default?: string | TNode;
  /**
   * 是否禁用菜单项展开/收起/跳转等功能
   */
  disabled?: boolean;
  /**
   * 跳转链接
   * @default ''
   */
  href?: string;
  /**
   * 图标
   */
  icon?: TNode;
  /**
   * 路由跳转是否采用覆盖的方式（覆盖后将没有浏览器历史记录）
   * @default false
   */
  replace?: boolean;
  /**
   * 路由对象。如果项目存在 Router，则默认使用 Router。
   */
  router?: Record<string, any>;
  /**
   * 链接或路由跳转方式
   */
  target?: '_blank' | '_self' | '_parent' | '_top';
  /**
   * 路由跳转目标，当且仅当 Router 存在时，该 API 有效
   */
  to?: MenuRoute;
  /**
   * 菜单项唯一标识
   */
  value?: MenuValue;
  /**
   * 点击时触发
   */
  onClick?: (context: { e: MouseEvent }) => void;
};

export interface TdMenuGroupProps {
  /**
   * 菜单组标题
   */
  title?: string | TNode;
};

export type MenuValue = string | number;

export interface MenuRoute { path?: string; name?: string; hash?: string; query?: MenuQueryData; params?: MenuQueryData };

export type MenuQueryData = { [key: string]: string | string[] };
