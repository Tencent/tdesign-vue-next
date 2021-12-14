/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-12-12 19:17:30
 * */

import { TNode } from '../common';

export interface TdBreadcrumbProps {
  /**
   * 单项最大宽度，超出后会以省略号形式呈现
   */
  maxItemWidth?: string;
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
  content?: string | number | TNode;
  /**
   * 子元素，同 content
   */
  default?: string | number | TNode;
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
   * 最大宽度，超出后会以省略号形式呈现。优先级高于 Breadcrum 中的 maxItemWidth
   */
  maxWidth?: string;
  /**
   * 路由跳转是否采用覆盖的方式（覆盖后将没有浏览器历史记录）
   * @default false
   */
  replace?: boolean;
  /**
   * 路由对象。如果项目存在 Router，则默认使用 Router。
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
  to?: Route;
}

export interface Route {
  path?: string;
  name?: string;
  hash?: string;
  query?: RouteData;
  params?: RouteData;
}

export type RouteData = { [key: string]: string | string[] };
