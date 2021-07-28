import { defineComponent, VNode, ref, inject } from 'vue';
import { prefix } from '../../config';
import { flatColumns } from '../util/props-util';
import baseTableProps from '../../../types/base-table/props';
import { DataType, BaseTableCol, RowEventContext } from '../../../types/base-table/TdBaseTableProps';
import TableBody from './table-body';
import TableHeader from './table-header';
import Loading from './loading-content';
import TableColGroup from './col-group';
import Pagination from '../../pagination';
import { getScrollDirection, SCROLL_DIRECTION } from '../util/common';
import { PageInfo } from '../../../types/pagination/TdPaginationProps';
import throttle from 'lodash/throttle';
import { renderTNodeJSX } from '../../utils/render-tnode';
import { EventNameWithUpperCase } from '../util/interface';


export default defineComponent({
  name: `${prefix}-base-table`,
  props: {
    ...baseTableProps,
  },
  setup(props, context) {
    const scrollBarWidth = ref(0);
    // 用于兼容处理 Pagination 的非受控属性（非受控属性仅有 change 事件变化，无 props 变化，因此只需监听事件）
    const defaultCurrent = ref(0);
    // 用于兼容处理 Pagination 的非受控属性
    const defaultPageSize = ref(0);
    const renderRow = inject('renderRow');
    return {
      slots: context.slots,
      scrollBarWidth,
      defaultCurrent,
      defaultPageSize,
      renderRow,
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
    tableHeight(): number {
      const { height } = this;
      if (typeof height === 'string') {
        return parseInt(height, 10);
      }
      return height || 0;
    },
    // 是否固定表头
    fixedHeader(): boolean {
      return this.tableHeight > 0;
    },
    // common class
    commonClass(): Array<string> {
      const { bordered, stripe, hover, size, verticalAlign, hasFixedColumns, fixedHeader } = this;
      const commonClass: Array<string> = ['t-table'];
      if (bordered) {
        commonClass.push('t-table--bordered');
      }
      if (stripe) {
        commonClass.push('t-table--striped');
      }
      if (hover) {
        commonClass.push('t-table--hoverable');
      }
      // table size
      switch (size) {
        case 'small':
          commonClass.push('t-size-s');
          break;
        case 'large':
          commonClass.push('t-size-l');
          break;
        default:
      }
      // table verticalAlign
      switch (verticalAlign) {
        case 'top':
          commonClass.push('t-table-valign__top');
          break;
        case 'bottom':
          commonClass.push('t-table-valign__bottom');
          break;
        default:
      }
      // fixed table
      if (hasFixedColumns) {
        commonClass.push('t-table__cell--fixed t-table--has-fixed');
      }
      if (fixedHeader) {
        commonClass.push('t-table__header--fixed');
      }
      return commonClass;
    },
  },
  mounted() {
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
  },
  methods: {
    emitEvent(eventName: string, params: any) {
      const events = this[eventName] || this.$attrs[eventName];
      if (typeof events === 'function') {
        events(...params);
      } else if (Array.isArray(events)) {
        events.forEach((event) => {
          event(...params);
        });
      }
    },
    renderHeader(): VNode {
      const { columns, flattedColumns, slots, bordered } = this;
      return <TableHeader
              columns={columns}
              columnsProps={flattedColumns}
              bordered={bordered}
            >{slots}</TableHeader>;
    },
    renderBody(): VNode {
      const {
        slots,
      } = this;
      const rowEvents = {};
      EventNameWithUpperCase.forEach((eventName) => {
        rowEvents[eventName] = (params: RowEventContext<any>) => {
          this.emitEvent(eventName, params);
        };
      });
      const props = {
        rowKey: this.rowKey,
        data: this.dataSource,
        provider: this.provider,
        columns: this.flattedColumns,
        rowClassName: this.rowClassName,
        current: this.current,
        rowspanAndColspan: this.rowspanAndColspan,
      };
      return (
        <TableBody { ...props } {...rowEvents}>{slots}</TableBody>
      );
    },
    renderEmptyTable(): VNode {
      const useLocale = !this.empty && !this.slots.empty;
      return (
        <div class="t-table--empty">
          {useLocale ? this.empty || '暂无数据' : renderTNodeJSX(this, 'empty')}
        </div>
      );
    },
    renderPagination(): VNode {
      const defaultPagination = this.pagination;
      const onChange = (current: number, pageInfo: PageInfo) => {
        this.emitEvent(
          'onChange',
          [{ pagination: { current, ...pageInfo } },
            {
              trigget: 'sorter',
              currentData: this.dataSource,
            }],
        );
        this.defaultCurrent = current;
        defaultPagination.onChange?.(pageInfo);
      };
      const onCurrentChange = (current: number, pageInfo: PageInfo) => {
        this.emitEvent('onPageChange', [pageInfo, this.dataSource]);
        this.defaultCurrent = current;
        defaultPagination.onCurrentChange?.(current, pageInfo);
      };
      const onPageSizeChange = (pageSize: number, pageInfo: PageInfo) => {
        this.emitEvent('onPageChange', [pageInfo, this.dataSource]);
        this.defaultPageSize = pageSize;
        defaultPagination.onPageSizeChange?.(pageSize, pageInfo);
      };
      return (
        <div class="t-table-pagination">
          <Pagination
           {...defaultPagination}
           onCurrentChange={onCurrentChange}
           onChange={onChange}
           onPageSizeChange={onPageSizeChange}
          />
        </div>
      );
    },
    renderTableWithFixedHeader(): Array<VNode> {
      const fixedTable: Array<VNode> = [];
      const {
        columns,
        tableLayout,
        scrollBarWidth,
        hasFixedColumns,
      } = this;
      // handle scroll
      const handleScroll = throttle((e: Event) => {
        const { target } = e;
        const { scrollLeft } = target as HTMLElement;
        (this.$refs.scrollHeader as HTMLElement).scrollLeft = scrollLeft;
        this.handleScroll(e as WheelEvent);
      }, 10);
      //  fixed table header
      fixedTable.push(<div class="t-table__header" style={{ paddingRight: `${scrollBarWidth}px` }} ref="scrollHeader">
          <table style={{ tableLayout }}>
            <TableColGroup columns={columns} />
            {this.renderHeader()}
          </table>
        </div>);
      const containerStyle = {
        height: isNaN(Number(this.height)) ? this.height : `${Number(this.height)}px`,
        maxHeight: isNaN(Number(this.maxHeight)) ? this.maxHeight : `${Number(this.maxHeight)}px`,
        width: hasFixedColumns ? '100%' : undefined,
      };
      // fixed table body
      fixedTable.push(<div
          class="t-table__body"
          style={containerStyle}
          // {...asyncLoadingProps}
          ref="scrollBody"
          onScroll={handleScroll}
        >
          <table style={{ tableLayout }}>
            <TableColGroup columns={columns} />
            {this.renderBody()}
            {this.renderFooter()}
          </table>
        </div>);
      return fixedTable;
    },
    renderLoadingContent(): VNode {
      return renderTNodeJSX(this, 'loading', <Loading />);
    },
    renderFooter() {
      const { flattedColumns: {
        length: colspan,
      }, isEmpty } = this;
      let footerContent: VNode;
      if (isEmpty) {
        footerContent = this.renderEmptyTable();
      } else {
        footerContent = renderTNodeJSX(this, 'footer');
      }
      return footerContent ? <tfoot>
                <tr>
                  <td colspan={colspan}>
                    {footerContent}
                  </td>
                </tr>
              </tfoot> : null;
    },
    handleScroll(e: WheelEvent) {
      const { scrollLeft, scrollTop } = e.target as HTMLElement;
      const direction = getScrollDirection(scrollLeft, scrollTop);
      if (direction !== SCROLL_DIRECTION.UNKNOWN) {
        const scrollListenerName = direction === SCROLL_DIRECTION.X ? 'onScrollX' : 'onScrollY';
        this.emitEvent(scrollListenerName, {
          e,
        });
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
    if (isLoading) {
      body.push(this.renderLoadingContent());
    } else {
      // 渲染带有固定列的表格或者固定表头的表格
      if (fixedHeader) {
        fixedTableContent = this.renderTableWithFixedHeader();
      } else {
        // table body
        tableContent.push(this.renderBody());
        tableContent.push(this.renderFooter());
      }
      // 渲染分页
      if (hasPagination) {
        body.push(this.renderPagination());
      }
    }
    const handleScroll = throttle(this.handleScroll, 100);
    return (
      <div class={commonClass}>
        <div class="t-table-content" style="overflow: auto;" onScroll={handleScroll}>
          {fixedTableContent ? fixedTableContent : <table style={{ tableLayout }}>{tableContent}</table>}
        </div>
        {body}
      </div>
    );
  },
});
