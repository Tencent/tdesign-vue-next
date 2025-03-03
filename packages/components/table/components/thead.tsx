import { defineComponent, computed, PropType, ref, Ref, h, CSSProperties } from 'vue';
import { isFunction } from 'lodash-es';
import { getColumnFixedStyles } from '../hooks/useFixed';
import useClassName from '../hooks/useClassName';
import { BaseTableCol, TableRowData, TdBaseTableProps } from '../type';
import { renderTitle } from '../hooks/useTableHeader';
import TEllipsis from './ellipsis';
import { formatClassNames } from '../utils';
import { RowAndColFixedPosition, BaseTableColumns, ThRowspanAndColspan } from '../types';
import { AttachNode } from '../../common';

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
  resizable?: Boolean;
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
  setup(props, { slots }) {
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

      const processColumns = (columns: BaseTableColumns) => {
        for (let i = 0, len = columns.length; i < len; i++) {
          const item = columns[i];
          if (item.colspan > 1) {
            for (let j = i + 1; j < i + item.colspan; j++) {
              if (columns[j]) {
                map[columns[j].colKey] = true;
              }
            }
          }
          // 如果有子列，递归处理
          if (item.children) {
            processColumns(item.children);
          }
        }
      };

      const list = props.thList[0];
      processColumns(list);

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

    return () => {
      const renderThNodeList = (
        rowAndColFixedPosition: RowAndColFixedPosition,
        thWidthList: TheadProps['thWidthList'],
      ) => {
        // thBorderMap: rowspan 会影响 tr > th 是否为第一列表头，从而影响边框
        const thBorderMap = new Map<any, boolean>();
        const thRowspanAndColspan = props.spansAndLeafNodes.rowspanAndColspanMap;
        return props.thList.map((row, rowIndex) => {
          const thRow = row.map((col: BaseTableColumns[0], index: number) => {
            // 因合并单行表头，跳过
            if (colspanSkipMap.value[col.colKey]) return null;
            const rowspanAndColspan = thRowspanAndColspan.get(col);
            if (index === 0 && rowspanAndColspan.rowspan > 1) {
              for (let j = rowIndex + 1; j < rowIndex + rowspanAndColspan.rowspan; j++) {
                thBorderMap.set(props.thList[j][0], true);
              }
            }
            const thStyles = getColumnFixedStyles(
              col,
              index,
              props.rowAndColFixedPosition,
              classnames.tableColFixedClasses,
            );
            const colParams = {
              col,
              colIndex: index,
              row: {},
              rowIndex: -1,
            };
            const customClasses = formatClassNames(col.className, { ...colParams, type: 'th' });
            const thCustomClasses = formatClassNames(col.thClassName, { ...colParams, type: 'th' });
            const isLeftFixedActive = props.showColumnShadow.left && col.fixed === 'left';
            const isRightFixedActive = props.showColumnShadow.right && col.fixed === 'right';
            const canDragSort = props.thDraggable && !(isLeftFixedActive || isRightFixedActive);
            const thClasses = [
              thStyles.classes,
              customClasses,
              thCustomClasses,
              {
                // 受 rowspan 影响，部分 tr > th:first-child 需要补足左边框
                [tableHeaderClasses.thBordered]: thBorderMap.get(col),
                [`${props.classPrefix}-table__th-${col.colKey}`]: col.colKey,
                [classnames.tdAlignClasses[col.align]]: col.align && col.align !== 'left',
                // 允许拖拽的列类名
                [classnames.tableDraggableClasses.dragSortTh]: canDragSort,
              },
            ];
            const withoutChildren = !col.children?.length;
            const width = withoutChildren && thWidthList?.[col.colKey] ? `${thWidthList?.[col.colKey]}px` : undefined;
            const styles = { ...(thStyles.style || {}), width };
            const innerTh = renderTitle(slots, col, index);
            const resizeColumnListener =
              props.resizable || !canDragSort
                ? {
                    onMousedown: (e: MouseEvent) => {
                      if (props.resizable) {
                        props.columnResizeParams?.onColumnMousedown?.(e, col, index);
                      }
                      if (!canDragSort) {
                        const timer = setTimeout(() => {
                          const thList = theadRef.value.querySelectorAll('th');
                          thList[index]?.removeAttribute('draggable');
                          clearTimeout(timer);
                        }, 10);
                      }
                    },
                    onMousemove: (e: MouseEvent) => {
                      props.resizable && props.columnResizeParams?.onColumnMouseover?.(e, col);
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
                <div class={tableBaseClass.thCellInner}>
                  {isEllipsis ? (
                    <TEllipsis
                      placement="bottom"
                      attach={props.attach || (theadRef.value ? () => getTableNode(theadRef.value) : undefined)}
                      tooltipContent={content && (() => content)}
                      tooltipProps={typeof col.ellipsisTitle === 'object' ? col.ellipsisTitle : undefined}
                      overlayClassName={props.ellipsisOverlayClassName}
                      classPrefix={props.classPrefix}
                    >
                      {innerTh}
                    </TEllipsis>
                  ) : (
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
        <thead ref={theadRef} class={theadClasses.value}>
          {renderThNodeList(props.rowAndColFixedPosition, props.thWidthList)}
        </thead>
      );
    };
  },
});
