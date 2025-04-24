/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TNode } from '../common';

export interface TdBreadcrumbProps {
  /**
   * 自定义折叠时省略号的内容
   */
  ellipsis?: string | TNode<{ items: Array<TdBreadcrumbItemProps>; separator: TdBreadcrumbProps['separator'] }>;
  /**
   * 超过面包屑最大显示数量时，省略号后显示几项。`maxItems > 0`时有效
   */
  itemsAfterCollapse?: number;
  /**
   * 超过面包屑最大显示数量时，省略号前显示几项。`maxItems > 0`时有效
   */
  itemsBeforeCollapse?: number;
  /**
   * 单项最大宽度，超出后会以省略号形式呈现
   */
  maxItemWidth?: string;
  /**
   * 显示的面包屑的最大数量，超出该值后中间的面包屑内容将会显示为省略号。值`<= 0`代表不限制
   */
  maxItems?: number;
  /**
   * 面包屑项，功能同 BreadcrumbItem
   */
  options?: Array<TdBreadcrumbItemProps>;
  /**
   * 自定义分隔符
   */
  separator?: string | TNode;
  /**
   * 组件风格
   * @default light
   */
  theme?: 'light';
}

export interface TdBreadcrumbItemProps {
  /**
   * 子元素
   */
  content?: string | TNode;
  /**
   * 子元素，同 content
   */
  default?: string | TNode;
  /**
   * 是否禁用当前项点击
   */
  disabled?: boolean;
  /**
   * 跳转链接
   * @default ''
   */
  href?: string;
  /**
   * 面板屑项内的前置图标
   */
  icon?: TNode;
  /**
   * 最大宽度，超出后会以省略号形式呈现。优先级高于 Breadcrumb 中的 maxItemWidth
   */
  maxWidth?: string;
  /**
   * 路由跳转是否采用覆盖的方式（覆盖后将没有浏览器历史记录）
   * @default false
   */
  replace?: boolean;
  /**
   * 路由对象。如果项目存在 Router，则默认使用 Router
   */
  router?: any;
  /**
   * 链接或路由跳转方式
   * @default _self
   */
  target?: '_blank' | '_self' | '_parent' | '_top';
  /**
   * 路由跳转目标，当且仅当 Router 存在时，该 API 有效
   */
  to?: string | Route;
  /**
   * 点击时触发
   */
  onClick?: (e: MouseEvent) => void;
}

export interface Route {
  path?: string;
  name?: string;
  hash?: string;
  query?: RouteData;
  params?: RouteData;
}

export type RouteData = { [key: string]: string | string[] };
