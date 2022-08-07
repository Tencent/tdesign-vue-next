/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdBaseTableProps } from '../table/type';
import { PropType } from 'vue';

export default {
  /** 已废弃。是否允许调整列宽。请更为使用 `resizable` */
  allowResizeColumnWidth: {
    type: Boolean,
    default: undefined,
  },
  /** 是否显示表格边框 */
  bordered: Boolean,
  /** 表格底部内容，可以用于自定义列设置等 */
  bottomContent: {
    type: [String, Function] as PropType<TdBaseTableProps['bottomContent']>,
  },
  /** 列配置，泛型 T 指表格数据类型 */
  columns: {
    type: Array as PropType<TdBaseTableProps['columns']>,
    default: (): TdBaseTableProps['columns'] => [],
  },
  /** 数据源，泛型 T 指表格数据类型 */
  data: {
    type: Array as PropType<TdBaseTableProps['data']>,
    default: (): TdBaseTableProps['data'] => [],
  },
  /** 是否禁用本地数据分页。当 `data` 数据长度超过分页大小时，会自动进行本地数据分页。如果 `disableDataPage` 设置为 true，则无论何时，都不会进行本地数据分页 */
  disableDataPage: Boolean,
  /** 空表格呈现样式，支持全局配置 `GlobalConfigProvider` */
  empty: {
    type: [String, Function] as PropType<TdBaseTableProps['empty']>,
    default: '',
  },
  /** 首行内容 */
  firstFullRow: {
    type: [String, Function] as PropType<TdBaseTableProps['firstFullRow']>,
  },
  /** 固定行（冻结行），示例：[M, N]，表示冻结表头 M 行和表尾 N 行。M 和 N 值为 0 时，表示不冻结行 */
  fixedRows: {
    type: Array as PropType<TdBaseTableProps['fixedRows']>,
  },
  /** 表尾数据源，泛型 T 指表格数据类型 */
  footData: {
    type: Array as PropType<TdBaseTableProps['footData']>,
    default: (): TdBaseTableProps['footData'] => [],
  },
  /** 已废弃。请更为使用 `footerAffixedBottom`。表尾吸底基于 Affix 组件开发，透传全部 Affix 组件属性。 */
  footerAffixProps: {
    type: Object as PropType<TdBaseTableProps['footerAffixProps']>,
  },
  /** 表尾吸底。使用此向功能，需要非常注意表格是相对于哪一个父元素进行滚动。值为 `true`，则表示相对于整个窗口吸底。如果表格滚动的父元素不是整个窗口，请通过 `footerAffixedBottom.container` 调整固钉的吸顶范围。基于 Affix 组件开发，透传全部 Affix 组件属性 */
  footerAffixedBottom: {
    type: [Boolean, Object] as PropType<TdBaseTableProps['footerAffixedBottom']>,
    default: false,
  },
  /** 表尾总结行 */
  footerSummary: {
    type: [String, Function] as PropType<TdBaseTableProps['footerSummary']>,
  },
  /** 已废弃。请更为使用 `headerAffixedTop`。表头吸顶基于 Affix 组件开发，透传全部 Affix 组件属性 */
  headerAffixProps: {
    type: Object as PropType<TdBaseTableProps['headerAffixProps']>,
  },
  /** 表头吸顶。使用该功能，需要非常注意表格是相对于哪一个父元素进行滚动。值为 `true`，表示相对于整个窗口吸顶。如果表格滚动的父元素不是整个窗口，请通过 `headerAffixedTop.container` 调整吸顶的位置。基于 Affix 组件开发，透传全部 Affix 组件属性。 */
  headerAffixedTop: {
    type: [Boolean, Object] as PropType<TdBaseTableProps['headerAffixedTop']>,
    default: false,
  },
  /** 表格高度，超出后会出现滚动条。示例：100,  '30%',  '300'。值为数字类型，会自动加上单位 px。如果不是绝对固定表格高度，建议使用 `maxHeight` */
  height: {
    type: [String, Number] as PropType<TdBaseTableProps['height']>,
  },
  /** 滚动条吸底。基于 Affix 组件开发，透传全部 Affix 组件属性 */
  horizontalScrollAffixedBottom: {
    type: [Boolean, Object] as PropType<TdBaseTableProps['horizontalScrollAffixedBottom']>,
  },
  /** 是否显示鼠标悬浮状态 */
  hover: Boolean,
  /** 尾行内容 */
  lastFullRow: {
    type: [String, Function] as PropType<TdBaseTableProps['lastFullRow']>,
  },
  /** 加载中状态。值为 `true` 会显示默认加载中样式，可以通过 Function 和 插槽 自定义加载状态呈现内容和样式。值为 `false` 则会取消加载状态 */
  loading: {
    type: [Boolean, Function] as PropType<TdBaseTableProps['loading']>,
    default: undefined,
  },
  /** 透传加载组件全部属性 */
  loadingProps: {
    type: Object as PropType<TdBaseTableProps['loadingProps']>,
  },
  /** 表格最大高度，超出后会出现滚动条。示例：100, '30%', '300'。值为数字类型，会自动加上单位 px */
  maxHeight: {
    type: [String, Number] as PropType<TdBaseTableProps['maxHeight']>,
  },
  /** 分页配置，值为空则不显示。具体 API 参考分页组件。当 `data` 数据长度超过分页大小时，会自动对本地数据 `data` 进行排序，如果不希望对于 `data` 进行排序，可以设置 `disableDataPage = true` */
  pagination: {
    type: Object as PropType<TdBaseTableProps['pagination']>,
  },
  /** 分页吸底。基于 Affix 组件开发，透传全部 Affix 组件属性 */
  paginationAffixedBottom: {
    type: [Boolean, Object] as PropType<TdBaseTableProps['paginationAffixedBottom']>,
  },
  /** 是否允许调整列宽。如果想要配置宽度可调整的最小值和最大值，请使用 `column.resize`，示例：`columns: [{ resize: { minWidth: 120, maxWidth: 300 } }]` */
  resizable: Boolean,
  /** HTML 标签 `tr` 的属性。类型为 Function 时，参数说明：`params.row` 表示行数据；`params.rowIndex` 表示行下标；`params.type=body` 表示属性作用于 `tbody` 中的元素；`params.type=foot` 表示属性作用于 `tfoot` 中的元素。<br />示例一：{ draggable: true }，<br />示例二：[{ draggable: true }, { title: '超出省略显示' }]。<br /> 示例三：() => [{ draggable: true }] */
  rowAttributes: {
    type: [Object, Array, Function] as PropType<TdBaseTableProps['rowAttributes']>,
  },
  /** 行类名，泛型 T 指表格数据类型。`params.row` 表示行数据；`params.rowIndex` 表示行下标；`params.type=body`  表示类名作用于 `tbody` 中的元素；`params.type=body` 表示类名作用于 `tfoot` 中的元素 */
  rowClassName: {
    type: [String, Object, Array, Function] as PropType<TdBaseTableProps['rowClassName']>,
  },
  /** 使用 rowKey 唯一标识一行数据 */
  rowKey: {
    type: String,
    default: 'id',
    required: true,
  },
  /** 用于自定义合并单元格，泛型 T 指表格数据类型。示例：`({ row, col, rowIndex, colIndex }) => { rowspan: 2, colspan: 3 }` */
  rowspanAndColspan: {
    type: Function as PropType<TdBaseTableProps['rowspanAndColspan']>,
  },
  /** 用于自定义表尾的合并单元格，泛型 T 指表格数据类型。示例：`({ row, col, rowIndex, colIndex }) => { rowspan: 2, colspan: 3 }` */
  rowspanAndColspanInFooter: {
    type: Function as PropType<TdBaseTableProps['rowspanAndColspanInFooter']>,
  },
  /** 懒加载和虚拟滚动。为保证组件收益最大化，当数据量小于阈值 `scroll.threshold` 时，无论虚拟滚动的配置是否存在，组件内部都不会开启虚拟滚动，`scroll.threshold` 默认为 `100` */
  scroll: {
    type: Object as PropType<TdBaseTableProps['scroll']>,
  },
  /** 表格尺寸 */
  size: {
    type: String as PropType<TdBaseTableProps['size']>,
    default: 'medium' as TdBaseTableProps['size'],
    validator(val: TdBaseTableProps['size']): boolean {
      if (!val) return true;
      return ['small', 'medium', 'large'].includes(val);
    },
  },
  /** 是否显示斑马纹 */
  stripe: Boolean,
  /** 表格内容的总宽度，注意不是表格可见宽度。主要应用于 `table-layout: auto` 模式下的固定列显示。`tableContentWidth` 内容宽度的值必须大于表格可见宽度 */
  tableContentWidth: {
    type: String,
    default: '',
  },
  /** 表格布局方式 */
  tableLayout: {
    type: String as PropType<TdBaseTableProps['tableLayout']>,
    default: 'fixed' as TdBaseTableProps['tableLayout'],
    validator(val: TdBaseTableProps['tableLayout']): boolean {
      if (!val) return true;
      return ['auto', 'fixed'].includes(val);
    },
  },
  /** 表格顶部内容，可以用于自定义列设置、顶部查询条件等 */
  topContent: {
    type: [String, Function] as PropType<TdBaseTableProps['topContent']>,
  },
  /** 行内容上下方向对齐 */
  verticalAlign: {
    type: String as PropType<TdBaseTableProps['verticalAlign']>,
    default: 'middle' as TdBaseTableProps['verticalAlign'],
    validator(val: TdBaseTableProps['verticalAlign']): boolean {
      if (!val) return true;
      return ['top', 'middle', 'bottom'].includes(val);
    },
  },
  /** 单元格点击时触发 */
  onCellClick: Function as PropType<TdBaseTableProps['onCellClick']>,
  /** 分页发生变化时触发。参数 newDataSource 表示分页后的数据。本地数据进行分页时，newDataSource 和源数据 data 会不一样。泛型 T 指表格数据类型 */
  onPageChange: Function as PropType<TdBaseTableProps['onPageChange']>,
  /** 行点击时触发，泛型 T 指表格数据类型 */
  onRowClick: Function as PropType<TdBaseTableProps['onRowClick']>,
  /** 行双击时触发，泛型 T 指表格数据类型 */
  onRowDblclick: Function as PropType<TdBaseTableProps['onRowDblclick']>,
  /** 鼠标在表格行按下时触发，泛型 T 指表格数据类型 */
  onRowMousedown: Function as PropType<TdBaseTableProps['onRowMousedown']>,
  /** 鼠标在表格行进入时触发，泛型 T 指表格数据类型 */
  onRowMouseenter: Function as PropType<TdBaseTableProps['onRowMouseenter']>,
  /** 鼠标在表格行离开时触发，泛型 T 指表格数据类型 */
  onRowMouseleave: Function as PropType<TdBaseTableProps['onRowMouseleave']>,
  /** 鼠标悬浮到行时触发，泛型 T 指表格数据类型 */
  onRowMouseover: Function as PropType<TdBaseTableProps['onRowMouseover']>,
  /** 鼠标在表格行按下又弹起时触发，泛型 T 指表格数据类型 */
  onRowMouseup: Function as PropType<TdBaseTableProps['onRowMouseup']>,
  /** 表格内容滚动时触发 */
  onScroll: Function as PropType<TdBaseTableProps['onScroll']>,
  /** 已废弃。表格内容横向滚动时触发。请更为使用 `onScroll` 事件 */
  onScrollX: Function as PropType<TdBaseTableProps['onScrollX']>,
  /** 已废弃。表格内容纵向滚动时触发。当内容超出高度(height)或最大高度(max-height)时，会出现纵向滚动条。请更为使用 `onScroll` 事件 */
  onScrollY: Function as PropType<TdBaseTableProps['onScrollY']>,
};
