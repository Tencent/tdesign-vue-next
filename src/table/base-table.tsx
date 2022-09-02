import {
  computed,
  defineComponent,
  SetupContext,
  toRefs,
  ref,
  provide,
  nextTick,
  PropType,
  watch,
  onMounted,
} from 'vue';
import pick from 'lodash/pick';
import props from './base-table-props';
import useTableHeader from './hooks/useTableHeader';
import useColumnResize from './hooks/useColumnResize';
import useFixed from './hooks/useFixed';
import usePagination from './hooks/usePagination';
import useVirtualScroll from '../hooks/useVirtualScroll';
import useAffix from './hooks/useAffix';
import Loading from '../loading';
import TBody, { extendTableProps } from './tbody';
import { BaseTableProps } from './interface';
import { useTNodeJSX } from '../hooks/tnode';
import useStyle, { formatCSSUnit } from './hooks/useStyle';
import useClassName from './hooks/useClassName';
import { useConfig } from '../hooks/useConfig';
import { Affix } from '../affix';
import { ROW_LISTENERS } from './tr';
import THead from './thead';
import TFoot from './tfoot';
import { getAffixProps } from './utils';
import { Styles } from '../common';
import log from '../_common/js/log';

export const BASE_TABLE_EVENTS = ['page-change', 'cell-click', 'scroll', 'scrollX', 'scrollY'];
export const BASE_TABLE_ALL_EVENTS = ROW_LISTENERS.map((t) => `row-${t}`).concat(BASE_TABLE_EVENTS);

export interface TableListeners {
  [key: string]: Function;
}

export default defineComponent({
  name: 'TBaseTable',

  props: {
    ...props,
    /**
     * 渲染展开行，非公开属性，请勿在业务中使用
     */
    renderExpandedRow: Function as PropType<BaseTableProps['renderExpandedRow']>,
    onLeafColumnsChange: Function as PropType<BaseTableProps['onLeafColumnsChange']>,
  },

  setup(props: BaseTableProps, context: SetupContext) {
    const renderTNode = useTNodeJSX();
    const tableRef = ref<HTMLDivElement>();
    const tableElmRef = ref<HTMLTableElement>();
    const tableBodyRef = ref<HTMLTableElement>();
    const tableFootHeight = ref(0);
    const { virtualScrollClasses, tableLayoutClasses, tableBaseClass, tableColFixedClasses } = useClassName();
    // 表格基础样式类
    const { tableClasses, tableContentStyles, tableElementStyles } = useStyle(props);
    const { globalConfig } = useConfig('table');
    const { isMultipleHeader, spansAndLeafNodes, thList } = useTableHeader(props);
    const finalColumns = computed(() => spansAndLeafNodes.value?.leafColumns || props.columns);

    // 固定表头和固定列逻辑
    const {
      scrollbarWidth,
      virtualScrollHeaderPos,
      tableWidth,
      tableElmWidth,
      tableContentRef,
      isFixedHeader,
      isWidthOverflow,
      isFixedColumn,
      thWidthList,
      showColumnShadow,
      rowAndColFixedPosition,
      setData,
      refreshTable,
      emitScrollEvent,
      setUseFixedTableElmRef,
      updateColumnFixedShadow,
      getThWidthList,
      updateThWidthList,
      setRecalculateColWidthFuncRef,
      addTableResizeObserver,
    } = useFixed(props, context, finalColumns);

    // 1. 表头吸顶；2. 表尾吸底；3. 底部滚动条吸底；4. 分页器吸底
    const {
      affixHeaderRef,
      affixFooterRef,
      horizontalScrollbarRef,
      paginationRef,
      showAffixHeader,
      showAffixFooter,
      showAffixPagination,
      onHorizontalScroll,
      setTableContentRef,
      updateAffixHeaderOrFooter,
    } = useAffix(props);

    const { dataSource, isPaginateData, renderPagination } = usePagination(props);

    // 列宽拖拽逻辑
    const columnResizeParams = useColumnResize(tableContentRef, refreshTable, getThWidthList, updateThWidthList);
    const { resizeLineRef, resizeLineStyle, recalculateColWidth } = columnResizeParams;
    setRecalculateColWidthFuncRef(recalculateColWidth);

    const dynamicBaseTableClasses = computed(() => [
      tableClasses.value,
      {
        [tableBaseClass.headerFixed]: isFixedHeader.value,
        [tableBaseClass.columnFixed]: isFixedColumn.value,
        [tableBaseClass.widthOverflow]: isWidthOverflow.value,
        [tableBaseClass.multipleHeader]: isMultipleHeader.value,
        [tableColFixedClasses.leftShadow]: showColumnShadow.left,
        [tableColFixedClasses.rightShadow]: showColumnShadow.right,
        [tableBaseClass.columnResizableTable]: props.resizable,
      },
    ]);

    const tableElmClasses = computed(() => [
      [tableLayoutClasses[props.tableLayout]],
      { [tableBaseClass.fullHeight]: props.height },
    ]);

    const isVirtual = computed(() => type === 'virtual' && props.data?.length > (props.scroll?.threshold || 100));

    const showRightDivider = computed(
      () =>
        props.bordered &&
        isFixedHeader.value &&
        ((isMultipleHeader.value && isWidthOverflow.value) || !isMultipleHeader.value),
    );

    watch(tableElmRef, () => {
      setUseFixedTableElmRef(tableElmRef.value);
    });

    watch(
      () => [props.data, dataSource],
      () => {
        setData(isPaginateData.value ? dataSource.value : props.data);
      },
    );

    watch(
      spansAndLeafNodes,
      () => {
        props.onLeafColumnsChange?.(spansAndLeafNodes.value.leafColumns);
      },
      { immediate: true },
    );

    const onFixedChange = () => {
      nextTick(() => {
        onHorizontalScroll();
        updateAffixHeaderOrFooter();
      });
    };

    const { type, rowHeight, bufferSize = 20, isFixedRowHeight = false } = props.scroll || {};
    const { data } = toRefs<any>(props);
    const {
      trs = null,
      scrollHeight = null,
      visibleData = null,
      translateY = null,
      handleScroll: handleVirtualScroll = null,
      handleRowMounted = null,
    } = type === 'virtual'
      ? useVirtualScroll({
          container: tableContentRef,
          data,
          fixedHeight: isFixedRowHeight,
          lineHeight: rowHeight,
          bufferSize,
          threshold: props.scroll?.threshold,
        })
      : {};
    provide('tableContentRef', tableContentRef);
    provide('rowHeightRef', ref(rowHeight));

    let lastScrollY = 0;
    const onInnerVirtualScroll = (e: WheelEvent) => {
      const target = (e.target || e.srcElement) as HTMLElement;
      const top = target.scrollTop;
      // 排除横向滚动出发的纵向虚拟滚动计算
      if (lastScrollY !== top) {
        isVirtual.value && handleVirtualScroll();
      } else {
        lastScrollY = 0;
        updateColumnFixedShadow(target);
      }
      lastScrollY = top;
      emitScrollEvent(e);
    };

    // used for top margin
    const getTFootHeight = () => {
      if (!tableElmRef.value) return;
      tableFootHeight.value = tableElmRef.value.querySelector('tfoot')?.getBoundingClientRect().height;
    };

    watch(tableContentRef, () => {
      setTableContentRef(tableContentRef.value);
    });

    watch(tableElmRef, getTFootHeight);

    watch(tableRef, () => {
      addTableResizeObserver(tableRef.value);
    });

    onMounted(() => {
      getTFootHeight();
      setTableContentRef(tableContentRef.value);
      addTableResizeObserver(tableRef.value);
    });

    return {
      thList,
      isVirtual,
      globalConfig,
      tableFootHeight,
      virtualScrollHeaderPos,
      tableWidth,
      tableElmWidth,
      tableRef,
      tableElmRef,
      tableBaseClass,
      spansAndLeafNodes,
      dynamicBaseTableClasses,
      tableContentStyles,
      tableElementStyles,
      virtualScrollClasses,
      tableLayoutClasses,
      tableElmClasses,
      tableContentRef,
      isFixedHeader,
      isWidthOverflow,
      isFixedColumn,
      rowAndColFixedPosition,
      showColumnShadow,
      thWidthList,
      isPaginateData,
      dataSource,
      scrollType: type,
      rowHeight,
      trs,
      bufferSize,
      scrollHeight,
      visibleData,
      translateY,
      affixHeaderRef,
      affixFooterRef,
      paginationRef,
      showAffixHeader,
      showAffixFooter,
      scrollbarWidth,
      isMultipleHeader,
      showRightDivider,
      resizeLineRef,
      resizeLineStyle,
      columnResizeParams,
      horizontalScrollbarRef,
      tableBodyRef,
      showAffixPagination,
      renderPagination,
      renderTNode,
      handleRowMounted,
      onFixedChange,
      onHorizontalScroll,
      updateAffixHeaderOrFooter,
      refreshTable,
      onInnerVirtualScroll,
    };
  },

  render() {
    const { rowAndColFixedPosition } = this;
    const data = this.isPaginateData ? this.dataSource : this.data;
    const columns = this.spansAndLeafNodes?.leafColumns || this.columns;

    const columnResizable = this.allowResizeColumnWidth === undefined ? this.resizable : this.allowResizeColumnWidth;
    if (columnResizable && this.tableLayout === 'auto') {
      log.warn('Table', 'table-layout can not be `auto` for resizable column table, set `table-layout: fixed` please.');
    }
    const defaultColWidth = this.tableLayout === 'fixed' && this.isWidthOverflow ? '100px' : undefined;

    /**
     * Affixed Header
     */
    // onlyVirtualScrollBordered 用于浏览器兼容性处理，只有 chrome 需要调整 bordered，FireFox 和 Safari 不需要
    const onlyVirtualScrollBordered =
      !!(this.isVirtual && !this.headerAffixedTop && this.bordered) && /Chrome/.test(navigator?.userAgent);
    const borderWidth = this.bordered && onlyVirtualScrollBordered ? 1 : 0;
    const affixHeaderWrapHeight =
      (this.affixHeaderRef?.getBoundingClientRect().height || 0) - this.scrollbarWidth - borderWidth;
    // 两类场景：1. 虚拟滚动，永久显示表头，直到表头消失在可视区域； 2. 表头吸顶，根据滚动情况判断是否显示吸顶表头
    const headerOpacity = props.headerAffixedTop ? Number(this.showAffixHeader) : 1;
    const affixHeaderWrapHeightStyle = {
      width: `${this.tableWidth}px`,
      height: `${affixHeaderWrapHeight}px`,
      opacity: headerOpacity,
      marginTop: onlyVirtualScrollBordered ? `${borderWidth}px` : 0,
    };
    // 多级表头左边线缺失
    const affixedLeftBorder = this.bordered ? 1 : 0;
    const affixedHeader = Boolean((this.headerAffixedTop || this.isVirtual) && this.tableWidth) && (
      <div
        ref="affixHeaderRef"
        style={{
          width: `${this.tableWidth - affixedLeftBorder}px`,
          opacity: Number(this.showAffixHeader),
        }}
        class={['scrollbar', { [this.tableBaseClass.affixedHeaderElm]: this.headerAffixedTop || this.isVirtual }]}
      >
        <table class={this.tableElmClasses} style={{ ...this.tableElementStyles, width: `${this.tableElmWidth}px` }}>
          {/* 此处和 Vue2 不同，Vue3 里面必须每一处单独写 <colgroup> */}
          <colgroup>
            {columns.map((col) => {
              const style: Styles = {
                width: formatCSSUnit(this.thWidthList[col.colKey] || col.width) || defaultColWidth,
              };
              if (col.minWidth) {
                style.minWidth = formatCSSUnit(col.minWidth);
              }
              return <col key={col.colKey} style={style}></col>;
            })}
          </colgroup>
          <THead
            v-slots={this.$slots}
            isFixedHeader={this.isFixedHeader}
            rowAndColFixedPosition={this.rowAndColFixedPosition}
            isMultipleHeader={this.isMultipleHeader}
            bordered={this.bordered}
            spansAndLeafNodes={this.spansAndLeafNodes}
            thList={this.thList}
            thWidthList={this.thWidthList}
            resizable={this.resizable}
            columnResizeParams={this.columnResizeParams}
          />
        </table>
      </div>
    );

    // 添加这一层，是为了隐藏表头的横向滚动条。如果以后不需要照顾 IE 10 以下的项目，则可直接移除这一层
    // 彼时，可更为使用 CSS 样式中的 .hideScrollbar()
    const affixHeaderWithWrap = (
      <div class={this.tableBaseClass.affixedHeaderWrap} style={affixHeaderWrapHeightStyle}>
        {affixedHeader}
      </div>
    );

    /**
     * Affixed Footer
     */
    let marginScrollbarWidth = this.isWidthOverflow ? this.scrollbarWidth : 0;
    if (this.bordered) {
      marginScrollbarWidth += 1;
    }
    // Hack: Affix 组件，marginTop 临时使用 负 margin 定位位置
    const affixedFooter = Boolean(this.footerAffixedBottom && this.footData?.length && this.tableWidth) && (
      <Affix
        class={this.tableBaseClass.affixedFooterWrap}
        onFixedChange={this.onFixedChange}
        offsetBottom={marginScrollbarWidth || 0}
        {...getAffixProps(this.footerAffixedBottom)}
        style={{ marginTop: `${-1 * (this.tableFootHeight + marginScrollbarWidth)}px` }}
      >
        <div
          ref="affixFooterRef"
          style={{ width: `${this.tableWidth - affixedLeftBorder}px`, opacity: Number(this.showAffixFooter) }}
          class={['scrollbar', { [this.tableBaseClass.affixedFooterElm]: this.footerAffixedBottom || this.isVirtual }]}
        >
          <table class={this.tableElmClasses} style={{ ...this.tableElementStyles, width: `${this.tableElmWidth}px` }}>
            {/* 此处和 Vue2 不同，Vue3 里面必须每一处单独写 <colgroup> */}
            <colgroup>
              {columns.map((col) => {
                const style: Styles = {
                  width: formatCSSUnit(this.thWidthList[col.colKey] || col.width) || defaultColWidth,
                };
                if (col.minWidth) {
                  style.minWidth = formatCSSUnit(col.minWidth);
                }
                return <col key={col.colKey} style={style}></col>;
              })}
            </colgroup>
            <TFoot
              rowKey={this.rowKey}
              v-slots={this.$slots}
              isFixedHeader={this.isFixedHeader}
              rowAndColFixedPosition={rowAndColFixedPosition}
              footData={this.footData}
              columns={columns}
              rowAttributes={this.rowAttributes}
              rowClassName={this.rowClassName}
              thWidthList={this.thWidthList}
              footerSummary={this.footerSummary}
              rowspanAndColspanInFooter={this.rowspanAndColspanInFooter}
            ></TFoot>
          </table>
        </div>
      </Affix>
    );

    const translate = `translate(0, ${this.scrollHeight}px)`;
    const virtualStyle = {
      transform: translate,
      '-ms-transform': translate,
      '-moz-transform': translate,
      '-webkit-transform': translate,
    };
    const tableBodyProps = {
      rowAndColFixedPosition,
      showColumnShadow: this.showColumnShadow,
      data: this.isVirtual ? this.visibleData : data,
      columns: this.spansAndLeafNodes.leafColumns,
      tableElm: this.tableRef,
      tableWidth: this.tableWidth,
      isWidthOverflow: this.isWidthOverflow,
      // 虚拟滚动相关属性
      isVirtual: this.isVirtual,
      translateY: this.translateY,
      scrollType: this.scrollType,
      rowHeight: this.rowHeight,
      trs: this.trs,
      bufferSize: this.bufferSize,
      scroll: this.scroll,
      cellEmptyContent: this.cellEmptyContent,
      tableContentElm: this.tableContentRef,
      handleRowMounted: this.handleRowMounted,
      renderExpandedRow: this.renderExpandedRow,
      ...pick(this.$props, extendTableProps),
    };
    const tableContent = (
      <div
        ref="tableContentRef"
        class={this.tableBaseClass.content}
        style={this.tableContentStyles}
        onScroll={this.onInnerVirtualScroll}
      >
        {this.isVirtual && <div class={this.virtualScrollClasses.cursor} style={virtualStyle} />}

        <table ref="tableElmRef" class={this.tableElmClasses} style={this.tableElementStyles}>
          <colgroup>
            {columns.map((col) => {
              const style: Styles = {
                width: formatCSSUnit(this.thWidthList[col.colKey] || col.width) || defaultColWidth,
              };
              if (col.minWidth) {
                style.minWidth = formatCSSUnit(col.minWidth);
              }
              return <col key={col.colKey} style={style}></col>;
            })}
          </colgroup>
          <THead
            v-slots={this.$slots}
            isFixedHeader={this.isFixedHeader}
            rowAndColFixedPosition={this.rowAndColFixedPosition}
            isMultipleHeader={this.isMultipleHeader}
            bordered={this.bordered}
            spansAndLeafNodes={this.spansAndLeafNodes}
            thList={this.thList}
            thWidthList={this.thWidthList}
            resizable={this.resizable}
            columnResizeParams={this.columnResizeParams}
          />
          <TBody v-slots={this.$slots} {...tableBodyProps} />
          <TFoot
            v-slots={this.$slots}
            rowKey={this.rowKey}
            isFixedHeader={this.isFixedHeader}
            rowAndColFixedPosition={rowAndColFixedPosition}
            footData={this.footData}
            columns={columns}
            rowAttributes={this.rowAttributes}
            rowClassName={this.rowClassName}
            footerSummary={this.footerSummary}
            rowspanAndColspanInFooter={this.rowspanAndColspanInFooter}
          ></TFoot>
        </table>
      </div>
    );

    const customLoadingText = this.renderTNode('loading');
    const loadingContent = this.loading !== undefined && (
      <Loading
        loading={!!this.loading}
        text={customLoadingText ? () => customLoadingText : undefined}
        attach={this.tableRef ? () => this.tableRef : undefined}
        showOverlay
        size="small"
        {...(this.loadingProps as BaseTableProps['loadingProps'])}
      ></Loading>
    );

    const topContent = this.renderTNode('topContent');
    const bottomContent = this.renderTNode('bottomContent');
    const pagination = (
      <div
        ref="paginationRef"
        class={this.tableBaseClass.paginationWrap}
        style={{ opacity: Number(this.showAffixPagination) }}
      >
        {this.renderPagination()}
      </div>
    );
    const bottom = !!bottomContent && <div class={this.tableBaseClass.bottomContent}>{bottomContent}</div>;

    return (
      <div ref="tableRef" class={this.dynamicBaseTableClasses} style="position: relative">
        {!!topContent && <div class={this.tableBaseClass.topContent}>{topContent}</div>}

        {!!(this.isVirtual || this.headerAffixedTop) &&
          (this.headerAffixedTop ? (
            <Affix offsetTop={0} {...getAffixProps(this.headerAffixedTop)} onFixedChange={this.onFixedChange}>
              {affixHeaderWithWrap}
            </Affix>
          ) : (
            this.isFixedHeader && affixHeaderWithWrap
          ))}

        {tableContent}

        {affixedFooter}

        {loadingContent}

        {/* 右侧滚动条分隔线 */}
        {this.showRightDivider && (
          <div
            class={this.tableBaseClass.scrollbarDivider}
            style={{
              right: `${this.scrollbarWidth}px`,
              height: `${this.tableContentRef?.getBoundingClientRect().height}px`,
            }}
          ></div>
        )}

        {bottom}

        {/* 吸底的滚动条 */}
        {this.horizontalScrollAffixedBottom && (
          <Affix
            offsetBottom={0}
            {...getAffixProps(this.horizontalScrollAffixedBottom)}
            style={{ marginTop: `-${this.scrollbarWidth * 2}px` }}
          >
            <div
              ref="horizontalScrollbarRef"
              class={['scrollbar', this.tableBaseClass.obviousScrollbar]}
              style={{
                width: `${this.tableWidth}px`,
                overflow: 'auto',
                opacity: Number(this.showAffixFooter),
              }}
            >
              <div style={{ width: `${this.tableElmWidth}px`, height: '5px' }}></div>
            </div>
          </Affix>
        )}

        {/* 吸底的分页器 */}
        {this.paginationAffixedBottom ? (
          <Affix offsetBottom={0} {...getAffixProps(this.paginationAffixedBottom)}>
            {pagination}
          </Affix>
        ) : (
          pagination
        )}

        {/* 调整列宽时的指示线。由于层级需要比较高，因而放在根节点，避免被吸顶表头覆盖。非必要情况，请勿调整辅助线位置 */}
        <div ref="resizeLineRef" class={this.tableBaseClass.resizeLine} style={this.resizeLineStyle}></div>
      </div>
    );
  },
});
