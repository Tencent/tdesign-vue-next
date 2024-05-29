import type { CreateElement, SetupContext } from '@td/adapter-vue';
import { computed } from '@td/adapter-vue';
import { isFunction, isString } from 'lodash-es';
import type { TNodeReturnValue } from '@td/types';
import log from '@td/common/js/log';
import type {
  BaseTableCol,
  PrimaryTableCol,
  TableRowData,
  TdBaseTableProps,
} from '@td/intel/table/type';
import type { BaseTableColumns } from '../interface';
import TEllipsis from '../ellipsis';
import { getThList, getThRowspanAndColspan } from './useMultiHeader';
import useClassName from './useClassName';

// 渲染表头的通用方法
export function renderTitle(h: CreateElement, slots: SetupContext['slots'], col: BaseTableColumns[0], index: number) {
  const params = { col, colIndex: index };
  if (isFunction(col.title)) {
    return col.title(h, params);
  }
  if (isString(col.title) && slots[col.title]) {
    if (col.colKey === col.title) {
      log.error(
        'Table',
        [
          `both colKey '${col.colKey}' and title have the same slot name`,
          'please set a different slot name for col and title.',
        ].join(', '),
      );
    }
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
    h: CreateElement,
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
          {isEllipsis
            ? (
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
              )
            : (
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
