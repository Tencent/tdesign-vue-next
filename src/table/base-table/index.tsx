import { defineComponent, VNode, ref, toRefs, provide } from 'vue';
import throttle from 'lodash/throttle';
import mixins from '../../utils/mixins';
import getConfigReceiverMixins, { TableConfig } from '../../config-provider/config-receiver';
import { prefix } from '../../config';
import { flatColumns } from '../util/props-util';
import baseTableProps from '../base-table-props';
import { ClassName } from '../../common';
import { DataType, BaseTableCol, TdBaseTableProps, RowEventContext } from '../type';
import TableBody from './table-body';
import TableHeader from './table-header';
import TableColGroup from './col-group';
import Pagination from '../../pagination';
import TLoading from '../../loading';
import { debounce, getScrollDirection, ScrollDirection } from '../util/common';
import { PageInfo } from '../../pagination/type';
import { renderTNodeJSX } from '../../utils/render-tnode';
import { EVENT_NAME_WITH_KEBAB } from '../util/interface';
import { emitEvent } from '../../utils/event';
import { getPropsApiByEvent } from '../../utils/helper';
import { SIZE_CLASSNAMES } from '../../utils/classnames';
import useVirtualScroll from '../../hooks/virtualScroll';

type PageChangeContext = Parameters<TdBaseTableProps['onPageChange']>;

export default defineComponent({
  ...mixins(getConfigReceiverMixins<TableConfig>('table')),
  name: 'TBaseTable',
  components: {
    TableBody,
    TableHeader,
    TableColGroup,
    Pagination,
  },
  props: {
    ...baseTableProps,
    onRowDragover: Function,
    onRowDragstart: Function,
    provider: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  emits: ['page-change', 'scroll-x', 'scroll-y', ...EVENT_NAME_WITH_KEBAB],
  setup(props: any) {
    const scrollBody = ref(null);
    provide('scrollBody', scrollBody);
    const { type, rowHeight, bufferSize = 20, isFixedRowHeight = false } = props.scroll || {};
    const { data } = toRefs<any>(props);
    const {
      trs = null,
      scrollHeight = null,
      visibleData = null,
      translateY = null,
      handleScroll = null,
      handleRowMounted = null,
    } = type === 'virtual'
      ? useVirtualScroll({
          container: scrollBody,
          data,
          fixedHeight: isFixedRowHeight,
          lineHeight: rowHeight,
          bufferSize,
        })
      : {};
    return {
      scrollType: type,
      rowHeight,
      trs,
      bufferSize,
      scrollBody,
      scrollHeight,
      visibleData,
      translateY,
      handleRowMounted,
      handleVirtualScroll: handleScroll,
    };
  },
  data() {
    return {
      scrollableToLeft: false,
      scrollableToRight: false,
      scrollBarWidth: 0,
      // 用于兼容处理 Pagination 的非受控属性（非受控属性仅有 change 事件变化，无 props 变化，因此只需监听事件）
      defaultCurrent: 0,
      // 用于兼容处理 Pagination 的非受控属性
      defaultPageSize: 0,
      useFixedHeader: false,
    };
  },
  computed: {
    // this.defaultCurrent 属于分页组件抛出的事件参数，非受控的情况也会有该事件触发
    // this.pagination.defaultCurrent 为表格组件传入的非受控属性
    current(): number {
      return this.pagination?.current || this.defaultCurrent || this.pagination?.defaultCurrent;
    },
    pageSize(): number {
      return this.pagination?.pageSize || this.defaultPageSize || this.pagination?.defaultPageSize;
    },
    dataSource(): Array<DataType> {
      if (!this.hasPagination) return this.data.slice(0);
      const { current, pageSize } = this;
      if (this.data.length > pageSize) {
        return this.data.slice((current - 1) * pageSize, current * pageSize);
      }
      return this.data;
    },
    flattedColumns(): Array<BaseTableCol> {
      return flatColumns(this.columns);
    },
    isEmpty(): boolean {
      return (!this.dataSource || this.dataSource.length === 0) && !this.loading;
    },
    hasFixedColumns(): boolean {
      const { columns } = this;
      return columns.some((item: BaseTableCol) => item.fixed === 'right' || item.fixed === 'left');
    },
    hasPagination(): boolean {
      return !!this.pagination;
    },
    isLoading(): boolean {
      return !!this.loading;
    },
    tableHeight(): number | string {
      const { height, maxHeight, useFixedHeader, isEmpty } = this;
      if (isEmpty) {
        return 'auto';
      }
      if (height !== 'auto' && height) {
        return height;
      }
      if (maxHeight && useFixedHeader) {
        return maxHeight;
      }
      return 'auto';
    },
    // 是否固定表头
    fixedHeader(): boolean {
      const { tableHeight } = this;
      return tableHeight !== 'auto';
    },
    // common class
    commonClass(): ClassName {
      const classes = [
        `${prefix}-table`,
        {
          [SIZE_CLASSNAMES.small]: this.size === 'small',
          [SIZE_CLASSNAMES.large]: this.size === 'large',
          [`${prefix}-table--bordered`]: this.bordered,
          [`${prefix}-table--striped`]: this.stripe,
          [`${prefix}-table--hoverable`]: this.hover,
          [`${prefix}-table__row--draggable`]: this.provider.sortOnRowDraggable,
          [`${prefix}-table-table--align-top`]: this.verticalAlign === 'top',
          [`${prefix}-table-table--align-bottom`]: this.verticalAlign === 'bottom',
          [`${prefix}-table__cell--fixed`]: this.hasFixedColumns,
          [`${prefix}-table--has-fixed`]: this.hasFixedColumns,
          [`${prefix}-table__header--fixed`]: this.fixedHeader,
        },
      ];
      return classes;
    },
    usePadding(): boolean {
      return this.fixedHeader || this.scrollableToRight || this.scrollableToLeft;
    },
  },
  mounted() {
    if (this.hasFixedColumns) {
      // 首次检查滚动条状态；设置settimeout 是为了等待父组件渲染完
      setTimeout(() => {
        this.checkScrollableToLeftOrRight();
      }, 0);
      this.addWindowResizeEventListener();
    }
    const scrollDiv = document.createElement('div');
    scrollDiv.style.cssText = `
      width: 99px;
      height: 99px;
      overflow: scroll;
      position: absolute;
      top: -9999px;`;
    scrollDiv.classList.add('scrollbar');
    document.body.appendChild(scrollDiv);
    this.scrollBarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);
    this.checkMaxHeight();
  },
  unmounted() {
    window.removeEventListener('resize', debounce(this.checkScrollableToLeftOrRight));
  },
  updated() {
    this.checkMaxHeight();
  },
  methods: {
    // 检查是否还可以向左或者向右滚动
    checkScrollableToLeftOrRight() {
      const scrollContainer = this.$refs[this.fixedHeader ? 'scrollBody' : 'tableContent'] as HTMLElement;
      if (!scrollContainer) return;
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
      this.scrollableToLeft = scrollLeft > 0;
      this.scrollableToRight = scrollLeft + clientWidth < scrollWidth;
    },
    // 窗口大小变化时横向滚动条可能出现或消失，故检查滚动条状态;
    addWindowResizeEventListener() {
      window.addEventListener('resize', debounce(this.checkScrollableToLeftOrRight));
    },
    renderHeader(): VNode {
      const { columns, $slots, bordered } = this;
      return <TableHeader columns={columns} bordered={bordered} v-slots={$slots} />;
    },
    renderBody(): VNode {
      const { $slots } = this;
      const rowEvents = {};
      EVENT_NAME_WITH_KEBAB.concat(['row-dragstart', 'row-dragover']).forEach((eventName) => {
        rowEvents[getPropsApiByEvent(eventName)] = (params: RowEventContext<any>) => {
          emitEvent(this, eventName, params);
        };
      });
      const props = {
        rowKey: this.rowKey,
        data: this.scrollType === 'virtual' ? this.visibleData : this.dataSource,
        provider: this.provider,
        columns: this.flattedColumns,
        rowClassName: this.rowClassName,
        current: this.current,
        rowspanAndColspan: this.rowspanAndColspan,
        firstFullRow: this.firstFullRow,
        lastFullRow: this.lastFullRow,
        scrollType: this.scrollType,
        rowHeight: this.rowHeight,
        trs: this.trs,
        bufferSize: this.bufferSize,
        handleRowMounted: this.handleRowMounted,
      };
      return (
        <TableBody {...props} {...rowEvents}>
          {$slots}
        </TableBody>
      );
    },
    renderEmptyTable(): VNode {
      const useLocale = !this.empty && !this.$slots.empty;
      const { height } = this;
      const wrapperStyle: { height?: string | number } = {};
      if (height !== 'auto') {
        wrapperStyle.height = isNaN(Number(height)) ? height : `${height}px`;
      }
      return (
        <div style={wrapperStyle} class={`${prefix}-table__empty`}>
          {useLocale ? this.global.empty : renderTNodeJSX(this, 'empty')}
        </div>
      );
    },
    renderPagination(): VNode {
      const paginationProps = this.pagination;
      return (
        <div class={`${prefix}-table__pagination`}>
          <Pagination
            {...paginationProps}
            {...{
              onChange: (pageInfo: PageInfo) => {
                paginationProps.onChange && paginationProps.onChange(pageInfo);
              },
              onCurrentChange: (current: number, pageInfo: PageInfo) => {
                emitEvent<PageChangeContext>(this, 'page-change', pageInfo, this.dataSource);
                this.defaultCurrent = current;
                paginationProps.onCurrentChange && paginationProps.onCurrentChange(current, pageInfo);
              },
              onPageSizeChange: (pageSize: number, pageInfo: PageInfo) => {
                emitEvent<PageChangeContext>(this, 'page-change', pageInfo, this.dataSource);
                this.defaultPageSize = pageSize;
                paginationProps.onPageSizeChange && paginationProps.onPageSizeChange(pageSize, pageInfo);
              },
            }}
          />
        </div>
      );
    },
    renderTableWithFixedHeader(): Array<VNode> {
      const fixedTable: Array<VNode> = [];
      const {
        columns,
        provider: { asyncLoadingProps },
        tableLayout,
        scrollBarWidth,
        hasFixedColumns,
        tableHeight,
        usePadding,
      } = this;
      // handle scroll
      const handleScroll = throttle((e: Event) => {
        const { target } = e;
        const { scrollLeft } = target as HTMLElement;
        (this.$refs.scrollHeader as HTMLElement).scrollLeft = scrollLeft;
        this.handleScroll(e as WheelEvent);
        this.scrollType === 'virtual' && this.handleVirtualScroll();
      }, 10);
      //  fixed table header
      const paddingRight = `${scrollBarWidth}px`;
      const headerContainerStyle = columns.length > 1 && usePadding ? { paddingRight } : {};
      fixedTable.push(
        <div class={`${prefix}-table__header`} style={headerContainerStyle} ref="scrollHeader">
          <table style={{ tableLayout }}>
            <TableColGroup columns={columns} />
            {this.renderHeader()}
          </table>
        </div>,
      );
      const containerStyle = {
        height: isNaN(Number(tableHeight)) ? tableHeight : `${Number(tableHeight)}px`,
        width: hasFixedColumns ? '100%' : undefined,
        position: 'relative',
        overscrollBehavior: 'none',
      };
      const isVirtual = this.scrollType === 'virtual';
      fixedTable.push(
        <div
          class={`${prefix}-table__body`}
          style={containerStyle}
          {...asyncLoadingProps}
          ref="scrollBody"
          onScroll={handleScroll}
        >
          {isVirtual && (
            <div
              style={{
                position: 'absolute',
                width: '1px',
                height: '1px',
                transition: 'transform .2s',
                transform: `translate(0, ${this.scrollHeight}px)`,
              }}
            />
          )}
          <table ref="table" style={{ tableLayout, transform: isVirtual && `translate(0, ${this.translateY}px)` }}>
            <TableColGroup columns={columns} />
            {this.renderBody()}
            {this.renderFooter()}
          </table>
        </div>,
      );
      return fixedTable;
    },
    renderLoadingContent(): VNode {
      return renderTNodeJSX(this, 'loading', <div />);
    },
    renderFooter() {
      const {
        flattedColumns: { length: colspan },
      } = this;
      const footerContent: VNode = renderTNodeJSX(this, 'footer');
      return footerContent ? (
        <tfoot>
          <tr>
            <td colspan={colspan}>{footerContent}</td>
          </tr>
        </tfoot>
      ) : null;
    },
    handleScroll(e: WheelEvent) {
      this.checkScrollableToLeftOrRight();
      const { scrollLeft, scrollTop } = e.target as HTMLElement;
      const direction = getScrollDirection(scrollLeft, scrollTop);
      if (direction !== ScrollDirection.UNKNOWN) {
        const scrollListenerName = direction === ScrollDirection.X ? 'scroll-x' : 'scroll-y';
        emitEvent(this, scrollListenerName, {
          e,
        });
      }
    },
    checkMaxHeight() {
      const { maxHeight } = this;
      if (maxHeight && (this.$refs.tableContent as HTMLElement).clientHeight > maxHeight) {
        this.useFixedHeader = true;
      }
    },
  },
  render() {
    const {
      hasPagination,
      commonClass,
      fixedHeader,
      columns,
      tableLayout,
      isLoading,
      isEmpty,
      useFixedHeader,
      hasFixedColumns,
    } = this;
    const body: Array<VNode> = [];
    // colgroup
    const tableColGroup = <TableColGroup columns={columns} />;
    // header
    const tableHeader = this.renderHeader();
    // table content
    const tableContent: Array<VNode> = [tableColGroup, tableHeader];
    // fixed table
    let fixedTableContent: Array<VNode>;
    // loading
    if (fixedHeader || useFixedHeader) {
      fixedTableContent = this.renderTableWithFixedHeader();
    } else {
      // table body
      tableContent.push(this.renderBody());
      tableContent.push(this.renderFooter());
    }
    if (isEmpty) {
      body.push(this.renderEmptyTable());
    }
    // 渲染分页
    if (hasPagination) {
      body.push(this.renderPagination());
    }
    const handleScroll = throttle(this.handleScroll, 100);
    const tableContentClass = [
      `${prefix}-table__content`,
      {
        [`${prefix}-table__content--scrollable-to-right`]: this.scrollableToRight,
        [`${prefix}-table__content--scrollable-to-left`]: this.scrollableToLeft,
      },
    ];
    let width;
    const { tableContent: tableContentEl, table: tableEl } = this.$refs as Record<string, HTMLElement>;
    if (!hasFixedColumns && tableContentEl?.clientWidth < tableEl?.clientWidth) {
      width = `${tableEl.clientWidth}px`;
    }
    return (
      <div class={commonClass} style={{ width }}>
        <TLoading loading={isLoading} showOverlay text={this.renderLoadingContent}>
          <div ref="tableContent" class={tableContentClass} onScroll={handleScroll}>
            {fixedTableContent || (
              <table ref="table" style={{ tableLayout }}>
                {tableContent}
              </table>
            )}
          </div>
          {body}
        </TLoading>
      </div>
    );
  },
});
