import { SetupContext, computed, h } from 'vue';
import { isString } from 'lodash-es';
import { isFunction } from 'lodash-es';
import { BaseTableCol, PrimaryTableCol, TableRowData, TdBaseTableProps } from '../type';
import { getThRowspanAndColspan, getThList } from './useMultiHeader';
import useClassName from './useClassName';
import { TNodeReturnValue } from '../../common';
import { BaseTableColumns } from '../types';
import TEllipsis from '../components/ellipsis';

// 渲染表头的通用方法
export function renderTitle(slots: SetupContext['slots'], col: BaseTableColumns[0], index: number) {
  const params = { col, colIndex: index };
  if (isFunction(col.title)) {
    return col.title(h, params);
  }
  if (isString(col.title) && slots[col.title]) {
    return slots[col.title](params);
  }
  if (isFunction(col.render)) {
    return (
      col.render(h, {
        ...params,
        type: 'title',
        row: {},
        rowIndex: -1,
      }) || col.title
    );
  }
  return col.title;
}

export default function useTableHeader(props: TdBaseTableProps) {
  const { tableSortClasses, tableFilterClasses } = useClassName();
  // 一次性获取 colspan 和 rowspan 可以避免其他数据更新导致的重复计算
  const spansAndLeafNodes = computed(() => getThRowspanAndColspan(props.columns));
  // 表头二维数据
  const thList = computed(() => getThList(props.columns));
  const isMultipleHeader = computed(() => thList.value.length > 1);

  const renderTitleWidthIcon = (
    [title, sortIcon, filterIcon]: TNodeReturnValue[],
    col: PrimaryTableCol<TableRowData>,
    colIndex: number,
    ellipsisTitle: BaseTableCol['ellipsisTitle'],
    attach: HTMLElement,
    extra?: {
      classPrefix: string;
      ellipsisOverlayClassName: string;
    },
  ) => {
    const classes = {
      [tableSortClasses.sortable]: sortIcon,
      [tableFilterClasses.filterable]: filterIcon,
    };
    const content = isFunction(ellipsisTitle) ? ellipsisTitle(h, { col, colIndex }) : undefined;
    const isEllipsis = ellipsisTitle !== undefined ? Boolean(ellipsisTitle) : Boolean(col.ellipsis);
    return (
      <div class={classes}>
        <div class={tableSortClasses.title}>
          {isEllipsis ? (
            <TEllipsis
              placement="bottom"
              attach={props.attach || (attach ? () => attach : undefined)}
              tooltipContent={content && (() => content)}
              tooltipProps={typeof ellipsisTitle === 'object' ? ellipsisTitle : undefined}
              classPrefix={extra?.classPrefix}
              overlayClassName={extra?.ellipsisOverlayClassName}
            >
              {title}
            </TEllipsis>
          ) : (
            <div>{title}</div>
          )}
          {Boolean(sortIcon || filterIcon) && (
            <div class={tableFilterClasses.iconWrap}>
              {sortIcon}
              {filterIcon}
            </div>
          )}
        </div>
      </div>
    );
  };

  return {
    thList,
    isMultipleHeader,
    spansAndLeafNodes,
    renderTitleWidthIcon,
  };
}
