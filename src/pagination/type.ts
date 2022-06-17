/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TNode } from '../common';

export interface TdPaginationProps {
  /**
   * 当前页
   * @default 1
   */
  current?: number;
  /**
   * 当前页，非受控属性
   * @default 1
   */
  defaultCurrent?: number;
  /**
   * 当前页
   * @default 1
   */
  modelValue?: number;
  /**
   * 是否禁用分页组件
   * @default false
   */
  disabled?: boolean;
  /**
   * 折叠时最多显示页码按钮数
   * @default 5
   */
  foldedMaxPageBtn?: number;
  /**
   * 最多显示页码按钮数
   * @default 10
   */
  maxPageBtn?: number;
  /**
   * 页码数量超出时，前后省略模式, `mid`表示中间省略, `both-ends` 表示两端省略
   * @default mid
   */
  pageEllipsisMode?: 'mid' | 'both-ends';
  /**
   * 分页总页数
   * @default 10
   */
  pageSize?: number;
  /**
   * 分页总页数，非受控属性
   * @default 10
   */
  defaultPageSize?: number;
  /**
   * 分页大小控制器，值为 [] 则不显示
   * @default () => [5, 10, 20, 50]
   */
  pageSizeOptions?: Array<number | { label: string; value: number }>;
  /**
   * 是否显示跳转首页尾页页码控制器
   * @default false
   */
  showFirstAndLastPageBtn?: boolean;
  /**
   * 是否显示跳转页码控制器
   * @default false
   */
  showJumper?: boolean;
  /**
   * 是否显示页码控制器
   * @default true
   */
  showPageNumber?: boolean;
  /**
   * 是否显示分页数量控制器
   * @default true
   */
  showPageSize?: boolean;
  /**
   * 是否显示跳转前后页页码控制器
   * @default true
   */
  showPreviousAndNextBtn?: boolean;
  /**
   * 分页组件尺寸
   * @default medium
   */
  size?: 'small' | 'medium';
  /**
   * 分页组件风格
   * @default default
   */
  theme?: 'default' | 'simple';
  /**
   * 数据总条数
   * @default 0
   */
  total?: number;
  /**
   * 用于自定义总条数呈现内容。默认显示总条数，值为 false 则不显示
   * @default true
   */
  totalContent?: boolean | TNode;
  /**
   * 当前页或分页大小发生变化时触发
   */
  onChange?: (pageInfo: PageInfo) => void;
  /**
   * 当前页发生变化时触发
   */
  onCurrentChange?: (current: number, pageInfo: PageInfo) => void;
  /**
   * 分页大小发生变化时触发
   */
  onPageSizeChange?: (pageSize: number, pageInfo: PageInfo) => void;
}

export interface PageInfo {
  current: number;
  previous: number;
  pageSize: number;
}
