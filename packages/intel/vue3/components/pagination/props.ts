/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 */

import type { PropType } from 'vue';
import type { TdPaginationProps } from './type';

export default {
  /** 当前页 */
  current: {
    type: Number,
    default: undefined,
  },
  modelValue: {
    type: Number,
    default: undefined,
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
  /** 页码数量超出时，前后省略模式, `mid`表示中间省略, `both-ends` 表示两端省略 */
  pageEllipsisMode: {
    type: String as PropType<TdPaginationProps['pageEllipsisMode']>,
    default: 'mid' as TdPaginationProps['pageEllipsisMode'],
    validator(val: TdPaginationProps['pageEllipsisMode']): boolean {
      if (!val) {
        return true;
      }
      return ['mid', 'both-ends'].includes(val);
    },
  },
  /** 每一页的数据量 */
  pageSize: {
    type: Number,
    default: undefined,
  },
  /** 每一页的数据量，非受控属性 */
  defaultPageSize: {
    type: Number,
    default: 10,
  },
  /** 分页大小控制器，值为 [] 则不显示 */
  pageSizeOptions: {
    type: Array as PropType<TdPaginationProps['pageSizeOptions']>,
    default: (): TdPaginationProps['pageSizeOptions'] => [5, 10, 20, 50],
  },
  /** 透传全部属性到 Select 组件，也可使用 `selectProps.popupProps` 透传全部 Popup 组件 */
  selectProps: {
    type: Object as PropType<TdPaginationProps['selectProps']>,
  },
  /** 是否显示跳转首页尾页页码控制器 */
  showFirstAndLastPageBtn: Boolean,
  /** 是否显示跳转页码控制器 */
  showJumper: Boolean,
  /** 是否显示页码控制器 */
  showPageNumber: {
    type: Boolean,
    default: true,
  },
  /** 是否显示分页数量控制器 */
  showPageSize: {
    type: Boolean,
    default: true,
  },
  /** 是否显示跳转前后页页码控制器 */
  showPreviousAndNextBtn: {
    type: Boolean,
    default: true,
  },
  /** 分页组件尺寸 */
  size: {
    type: String as PropType<TdPaginationProps['size']>,
    default: 'medium' as TdPaginationProps['size'],
    validator(val: TdPaginationProps['size']): boolean {
      if (!val) {
        return true;
      }
      return ['small', 'medium'].includes(val);
    },
  },
  /** 分页组件风格 */
  theme: {
    type: String as PropType<TdPaginationProps['theme']>,
    default: 'default' as TdPaginationProps['theme'],
    validator(val: TdPaginationProps['theme']): boolean {
      if (!val) {
        return true;
      }
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
