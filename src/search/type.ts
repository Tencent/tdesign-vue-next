import { TdInputProps } from '../input/type';
/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-12-12 19:17:30
 * */

export interface Suggestion {
  value: string;
  [key: string]: any;
}

export interface TdSearchProps extends TdInputProps {
  /**
   * 是否显示搜索图标
   * @default true
   */
  showIcon?: boolean;
  /**
   * 是否批量搜索
   * @default false
   */
  batch?: boolean;
  /**
   * 是否带历史记录
   * @default false
   */
  history?: false;
  /**
   * 搜索建议、联想选项
   */
  suggestions?: string[] | Suggestion[];
}
