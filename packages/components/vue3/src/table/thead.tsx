import type { CSSProperties, PropType, Ref, SetupContext } from '@td/adapter-vue';
import { computed, defineComponent, h, ref } from '@td/adapter-vue';
import { isFunction } from 'lodash-es';
import type { BaseTableCol, TableRowData, TdBaseTableProps } from '@td/components/table/type';
import type { AttachNode } from '@td/types';
import { getColumnFixedStyles } from './hooks/useFixed';
import useClassName from './hooks/useClassName';
import { renderTitle } from './hooks/useTableHeader';
import TEllipsis from './ellipsis';
import { formatClassNames } from './utils';
import type { BaseTableColumns, RowAndColFixedPosition, ThRowspanAndColspan } from './interface';

export interface TheadProps {
  classPrefix: string;
  ellipsisOverlayClassName: string;
  // 是否固定表头
  isFixedHeader: boolean;
  maxHeight?: TdBaseTableProps['maxHeight'];
  height?: TdBaseTableProps['height'];
  // 固定列 left/right 具体值
  rowAndColFixedPosition: RowAndColFixedPosition;
  // 虚拟滚动单独渲染表头；表头吸顶单独渲染表头
  thWidthList?: { [colKey: string]: number };
  bordered?: boolean;
  isMultipleHeader?: boolean;
  thDraggable?: boolean;
  spansAndLeafNodes?: {
    rowspanAndColspanMap: ThRowspanAndColspan;
    leafColumns: BaseTableCol<TableRowData>[];
  };
  thList: BaseTableCol<TableRowData>[][];
  columnResizeParams: {
    resizeLineRef: Ref<HTMLDivElement>;
    resizeLineStyle: CSSProperties;
    onColumnMouseover: (e: MouseEvent, col: BaseTableCol<TableRowData>) => void;
    onColumnMousedown: (e: MouseEvent, col: BaseTableCol<TableRowData>, index: number) => void;
  };
  resizable?: boolean;
  attach?: AttachNode;
  showColumnShadow?: { left: boolean; right: boolean };
}

export default defineComponent({
  name: 'THead',

  props: {
    classPrefix: String,
    ellipsisOverlayClassName: String,
    isFixedHeader: Boolean,
    thDraggable: Boolean,
    maxHeight: [String, Number] as PropType<TheadProps['maxHeight']>,
    height: [String, Number] as PropType<TheadProps['height']>,
    rowAndColFixedPosition: Map as PropType<TheadProps['rowAndColFixedPosition']>,
    thWidthList: Object as PropType<TheadProps['thWidthList']>,
    bordered: Boolean,
    isMultipleHeader: Boolean,
    resizable: Boolean,
    attach: [String, Function] as PropType<TheadProps['attach']>,
    spansAndLeafNodes: Object as PropType<TheadProps['spansAndLeafNodes']>,
    thList: Array as PropType<TheadProps['thList']>,
    columnResizeParams: Object as PropType<TheadProps['columnResizeParams']>,
    showColumnShadow: Object as PropType<TheadProps['showColumnShadow']>,
  },

  setup(props: TheadProps, { slots }: SetupContext) {
    const theadRef = ref<HTMLHeadElement>();
    const classnames = useClassName();
    const { tableHeaderClasses, tableBaseClass } = classnames;
    const theadClasses = computed(() => [
      tableHeaderClasses.header,
      {
        [tableHeaderClasses.fixed]: Boolean(props.maxHeight || props.height),
        [tableBaseClass.bordered]: props.bordered && props.isMultipleHeader,
        [tableHeaderClasses.multipleHeader]: props.isMultipleHeader,
      },
    ]);

    // 单行表格合并
    const colspanSkipMap = computed(() => {
      const map: { [key: string]: boolean } = {};
      const list = props.thList[0];
      for (let i = 0, len = list.length; i < len; i++) {
        const item = list[i];
        if (item.colspan > 1) {
          for (let j = i + 1; j < i + item.colspan; j++) {
            if (list[j]) {
              map[list[j].colKey] = true;
            }
          }
        }
      }
      return map;
    });

    const getTableNode = (thead: HTMLElement) => {
      let parent = thead;
      while (parent) {
        parent = parent.parentNode as HTMLElement;
        if (parent?.classList?.contains(`${props.classPrefix}-table`)) {
          break;
        }
      }
      return parent;
    };

    return {
      ...classnames,
      colspanSkipMap,
      theadClasses,
      theadRef,
      slots,
      getTableNode,
    };
  },

  render() {
    const renderThNodeList = (
      rowAndColFixedPosition: RowAndColFixedPosition,
      thWidthList: TheadProps['thWidthList'],
    ) => {
      // thBorderMap: rowspan 会影响 tr > th 是否为第一列表头，从而影响边框
      const thBorderMap = new Map<any, boolean>();
      const thRowspanAndColspan = this.spansAndLeafNodes.rowspanAndColspanMap;
      return this.thList.map((row, rowIndex) => {
        const thRow = row.map((col: BaseTableColumns[0], index: number) => {
          // 因合并单行表头，跳过
          if (this.colspanSkipMap[col.colKey]) {
            return null;
          }
          const rowspanAndColspan = thRowspanAndColspan.get(col);
          if (index === 0 && rowspanAndColspan.rowspan > 1) {
            for (let j = rowIndex + 1; j < rowIndex + rowspanAndColspan.rowspan; j++) {
              thBorderMap.set(this.thList[j][0], true);
            }
          }
          const thStyles = getColumnFixedStyles(col, index, rowAndColFixedPosition, this.tableColFixedClasses);
          const colParams = {
            col,
            colIndex: index,
            row: {},
            rowIndex: -1,
          };
          const customClasses = formatClassNames(col.className, { ...colParams, type: 'th' });
          const isLeftFixedActive = this.showColumnShadow.left && col.fixed === 'left';
          const isRightFixedActive = this.showColumnShadow.right && col.fixed === 'right';
          const canDragSort = this.thDraggable && !(isLeftFixedActive || isRightFixedActive);
          const thClasses = [
            thStyles.classes,
            customClasses,
            col.thClassName,
            {
              // 受 rowspan 影响，部分 tr > th:first-child 需要补足左边框
              [this.tableHeaderClasses.thBordered]: thBorderMap.get(col),
              [`${this.classPrefix}-table__th-${col.colKey}`]: col.colKey,
              [this.tdAlignClasses[col.align]]: col.align && col.align !== 'left',
              // 允许拖拽的列类名
              [this.tableDraggableClasses.dragSortTh]: canDragSort,
            },
          ];
          const withoutChildren = !col.children?.length;
          const width = withoutChildren && thWidthList?.[col.colKey] ? `${thWidthList?.[col.colKey]}px` : undefined;
          const styles = { ...(thStyles.style || {}), width };
          const innerTh = renderTitle(this.slots, col, index);
          const resizeColumnListener
            = this.resizable || !canDragSort
              ? {
                  onMousedown: (e: MouseEvent) => {
                    if (this.resizable) {
                      this.columnResizeParams?.onColumnMousedown?.(e, col, index);
                    }
                    if (!canDragSort) {
                      const timer = setTimeout(() => {
                        const thList = this.theadRef.querySelectorAll('th');
                        thList[index]?.removeAttribute('draggable');
                        clearTimeout(timer);
                      }, 10);
                    }
                  },
                  onMousemove: (e: MouseEvent) => {
                    this.resizable && this.columnResizeParams?.onColumnMouseover?.(e, col);
                  },
                }
              : {};
          const content = isFunction(col.ellipsisTitle) ? col.ellipsisTitle(h, { col, colIndex: index }) : undefined;
          const isEllipsis = col.ellipsisTitle !== undefined ? Boolean(col.ellipsisTitle) : Boolean(col.ellipsis);
          const attrs = (isFunction(col.attrs) ? col.attrs({ ...colParams, type: 'th' }) : col.attrs) || {};
          if (col.colspan > 1) {
            attrs.colspan = col.colspan;
          }
          return (
            <th
              key={col.colKey}
              data-colkey={col.colKey}
              class={thClasses}
              style={styles}
              {...attrs}
              {...rowspanAndColspan}
              {...resizeColumnListener}
            >
              <div class={this.tableBaseClass.thCellInner}>
                {isEllipsis
                  ? (
                    <TEllipsis
                      placement="bottom"
                      attach={this.attach || (this.theadRef ? () => this.getTableNode(this.theadRef) : undefined)}
                      tooltipContent={content && (() => content)}
                      tooltipProps={typeof col.ellipsisTitle === 'object' ? col.ellipsisTitle : undefined}
                      overlayClassName={this.ellipsisOverlayClassName}
                      classPrefix={this.classPrefix}
                    >
                      {innerTh}
                    </TEllipsis>
                    )
                  : (
                      innerTh
                    )}
              </div>
            </th>
          );
        });
        return <tr key={rowIndex}>{thRow}</tr>;
      });
    };

    return (
      <thead ref="theadRef" class={this.theadClasses}>
        {renderThNodeList(this.rowAndColFixedPosition, this.thWidthList)}
      </thead>
    );
  },
});
