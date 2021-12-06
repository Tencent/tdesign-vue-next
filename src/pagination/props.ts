/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-12-05 14:42:17
 * */

import { TdPaginationProps } from './type';
import { PropType } from 'vue';

export default {
  /** 当前页 */
  current: {
    type: Number,
    default: 1,
  },
  /** 当前页，非受控属性 */
  defaultCurrent: {
    type: Number,
    default: 1,
  },
  /** 是否禁用分页组件 */
  disabled: Boolean,
  /** 折叠时最多显示页码按钮数 */
  foldedMaxPageBtn: {
    type: Number,
    default: 5,
  },
  /** 最多显示页码按钮数 */
  maxPageBtn: {
    type: Number,
    default: 10,
  },
  /** 分页总页数 */
  pageSize: {
    type: Number,
    default: 10,
  },
  /** 分页总页数，非受控属性 */
  defaultPageSize: {
    type: Number,
    default: 10,
  },
  /** 分页大小控制器，值为 [] 则不显示 */
  pageSizeOptions: {
    type: Array as PropType<TdPaginationProps['pageSizeOptions']>,
    default: () => [5, 10, 20, 50],
  },
  /** 是否显示跳转页码控制器 */
  showJumper: Boolean,
  /** 分页组件尺寸 */
  size: {
    type: String as PropType<TdPaginationProps['size']>,
    default: 'medium' as TdPaginationProps['size'],
    validator(val: TdPaginationProps['size']): boolean {
      return ['small', 'medium'].includes(val);
    },
  },
  /** 分页组件风格 */
  theme: {
    type: String as PropType<TdPaginationProps['theme']>,
    default: 'default' as TdPaginationProps['theme'],
    validator(val: TdPaginationProps['theme']): boolean {
      return ['default', 'simple'].includes(val);
    },
  },
  /** 数据总条数 */
  total: {
    type: Number,
    default: 0,
  },
  /** 用于自定义总条数呈现内容。默认显示总条数，值为 false 则不显示 */
  totalContent: {
    type: [Boolean, Function] as PropType<TdPaginationProps['totalContent']>,
    default: true,
  },
  /** 当前页或分页大小发生变化时触发 */
  onChange: Function as PropType<TdPaginationProps['onChange']>,
  /** 当前页发生变化时触发 */
  onCurrentChange: Function as PropType<TdPaginationProps['onCurrentChange']>,
  /** 分页大小发生变化时触发 */
  onPageSizeChange: Function as PropType<TdPaginationProps['onPageSizeChange']>,
};
