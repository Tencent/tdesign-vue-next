import { computed, defineComponent, SetupContext, ref, nextTick, PropType, watch, onMounted, toRefs } from 'vue';
import { pick } from 'lodash-es';
import { get } from 'lodash-es';
import props from '@td/intel/table/base-table-props';
import useTableHeader from './hooks/useTableHeader';
import useColumnResize from './hooks/useColumnResize';
import useFixed from './hooks/useFixed';
import usePagination from './hooks/usePagination';
import useVirtualScrollNew from '../hooks/useVirtualScrollNew';
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
import { Styles, ComponentScrollToElementParams } from '../common';
import { getIEVersion } from '../_common/js/utils/helper';
import { BaseTableInstanceFunctions } from '@td/intel/table/type';
import log from '../_common/js/log';
import { useRowHighlight } from './hooks/useRowHighlight';
import useHoverKeyboardEvent from './hooks/useHoverKeyboardEvent';
import useElementLazyRender from '../hooks/useElementLazyRender';
import { isFunction } from 'lodash-es';

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
    thDraggable: Boolean,
  },

  emits: ['show-element-change'],

  setup(props: BaseTableProps, context: SetupContext) {
    const { lazyLoad } = toRefs(props);
    const renderTNode = useTNodeJSX();
    const tableRef = ref<HTMLDivElement>();
    const tableElmRef = ref<HTMLTableElement>();
    const tableBodyRef = ref<HTMLTableElement>();
    const bottomContentRef = ref<HTMLDivElement>();
    const tableFootHeight = ref(0);
    const { classPrefix, virtualScrollClasses, tableLayoutClasses, tableBaseClass, tableColFixedClasses } =
      useClassName();
    // 表格基础样式类
    const { tableClasses, sizeClassNames, tableContentStyles, tableElementStyles } = useStyle(props);
    const { globalConfig } = useConfig('table', props.locale);
    const { isMultipleHeader, spansAndLeafNodes, thList } = useTableHeader(props);
    const finalColumns = computed(() => spansAndLeafNodes.value?.leafColumns || props.columns);
    const tableSize = computed(() => props.size ?? globalConfig.value.size);

    const { showElement } = useElementLazyRender(tableRef, lazyLoad);

    // 吸附相关ref 用来做视图resize后重新定位
    const paginationAffixRef = ref();
    const horizontalScrollAffixRef = ref();
    const headerTopAffixRef = ref();
    const footerBottomAffixRef = ref();

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
      setTableElmWidth,
      emitScrollEvent,
      setUseFixedTableElmRef,
      updateColumnFixedShadow,
      getThWidthList,
      updateThWidthList,
      addTableResizeObserver,
      updateTableAfterColumnResize,
    } = useFixed(props, context, finalColumns, {
      paginationAffixRef,
      horizontalScrollAffixRef,
      headerTopAffixRef,
      footerBottomAffixRef,
    });

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

    const { dataSource, innerPagination, isPaginateData, renderPagination } = usePagination(props, context);

    // 列宽拖拽逻辑
    const columnResizeParams = useColumnResize({
      isWidthOverflow,
      tableContentRef,
      showColumnShadow,
      getThWidthList,
      updateThWidthList,
      setTableElmWidth,
      updateTableAfterColumnResize,
      onColumnResizeChange: props.onColumnResizeChange,
    });
    const { resizeLineRef, resizeLineStyle, setEffectColMap } = columnResizeParams;

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
        [`${classPrefix}-table__row--active-${props.activeRowType}`]: props.activeRowType,
      },
    ]);

    const tableElmClasses = computed(() => [[tableLayoutClasses[props.tableLayout]]]);

    const showRightDivider = computed(
      () =>
        props.bordered &&
        isFixedHeader.value &&
        ((isMultipleHeader.value && isWidthOverflow.value) || !isMultipleHeader.value),
    );

    const dividerBottom = computed(() => {
      if (!props.bordered) return 0;
      const bottomRect = bottomContentRef.value?.getBoundingClientRect();
      const paginationRect = paginationRef.value?.getBoundingClientRect();
      return (bottomRect?.height || 0) + (paginationRect?.height || 0);
    });

    // 行高亮
    const { tActiveRow, onHighlightRow, addHighlightKeyboardListener, removeHighlightKeyboardListener } =
      useRowHighlight(props, tableRef);

    const {
      hoverRow,
      needKeyboardRowHover,
      clearHoverRow,
      addRowHoverKeyboardListener,
      removeRowHoverKeyboardListener,
    } = useHoverKeyboardEvent(props, tableRef);

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
        setEffectColMap(spansAndLeafNodes.value.leafColumns, null);
      },
      { immediate: true },
    );

    const onFixedChange = () => {
      nextTick(() => {
        onHorizontalScroll();
        updateAffixHeaderOrFooter();
      });
    };

    // 虚拟滚动相关数据
    const virtualScrollParams = computed(() => ({
      data: props.data,
      scroll: props.scroll,
    }));
    const virtualConfig = useVirtualScrollNew(tableContentRef, virtualScrollParams);

    let lastScrollY = -1;
    const onInnerVirtualScroll = (e: WheelEvent) => {
      const target = (e.target || e.srcElement) as HTMLElement;
      const top = target.scrollTop;
      // 排除横向滚动触发的纵向虚拟滚动计算
      if (lastScrollY !== top) {
        virtualConfig.isVirtualScroll.value && virtualConfig.handleScroll();
      } else {
        lastScrollY = -1;
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

    // 对外暴露方法，修改时需谨慎（expose）
    const scrollColumnIntoView: BaseTableInstanceFunctions['scrollColumnIntoView'] = (colKey: string) => {
      if (!tableContentRef.value) return;
      const thDom = tableContentRef.value.querySelector(`th[data-colkey="${colKey}"]`);
      const fixedThDom = tableContentRef.value.querySelectorAll('th.t-table__cell--fixed-left');
      let totalWidth = 0;
      for (let i = 0, len = fixedThDom.length; i < len; i++) {
        totalWidth += fixedThDom[i].getBoundingClientRect().width;
      }
      const domRect = thDom.getBoundingClientRect();
      const contentRect = tableContentRef.value.getBoundingClientRect();
      const distance = domRect.left - contentRect.left - totalWidth;
      tableContentRef.value.scrollTo({ left: distance, behavior: 'smooth' });
    };

    watch(tableContentRef, () => {
      setTableContentRef(tableContentRef.value);
    });

    // 应该有多种情况下需要更新 foot 高度
    // 原方案只监听 tableElmRef，但是可能有异步渲染的情况，footer 的渲染晚于 dom 引用的产生
    // 加入 timeout，避免渲染延迟导致的高度获取失败
    watch(
      () => [tableElmRef.value, props.footData, props.footerSummary, props.columns],
      () => {
        const timer = setTimeout(() => {
          getTFootHeight();
          clearTimeout(timer);
        }, 0);
      },
    );

    watch(tableRef, (tableRef) => {
      addTableResizeObserver(tableRef);
    });

    onMounted(() => {
      getTFootHeight();
      setTableContentRef(tableContentRef.value);
      addTableResizeObserver(tableRef.value);
    });

    const onTableFocus = () => {
      props.activeRowType && addHighlightKeyboardListener();
      needKeyboardRowHover.value && addRowHoverKeyboardListener();
    };

    const onTableBlur = () => {
      props.activeRowType && removeHighlightKeyboardListener();
      needKeyboardRowHover.value && removeRowHoverKeyboardListener();
    };

    const onInnerRowClick: BaseTableProps['onRowClick'] = (ctx) => {
      props.onRowClick?.(ctx);
      props.activeRowType && onHighlightRow(ctx);
      needKeyboardRowHover.value && clearHoverRow();
    };

    watch(
      [showElement],
      ([showElement]) => {
        context.emit('show-element-change', showElement);
      },
      { immediate: true },
    );

    const tableData = computed(() => (isPaginateData.value ? dataSource.value : props.data));

    const scrollToElement = (params: ComponentScrollToElementParams) => {
      let { index } = params;
      if (!index && index !== 0) {
        if (!params.key) {
          log.error('Table', 'scrollToElement: one of `index` or `key` must exist.');
          return;
        }
        index = tableData.value?.findIndex((item) => get(item, props.rowKey) === params.key);
        if (index < 0) {
          log.error('Table', `${params.key} does not exist in data, check \`rowKey\` or \`data\` please.`);
        }
      }
      virtualConfig.scrollToElement({ ...params, index: index - 1 });
    };

    return {
      thList,
      classPrefix,
      innerPagination,
      globalConfig,
      tableFootHeight,
      virtualScrollHeaderPos,
      tableSize,
      tableWidth,
      tableElmWidth,
      tableRef,
      tableElmRef,
      sizeClassNames,
      tableBaseClass,
      spansAndLeafNodes,
      dynamicBaseTableClasses,
      tableContentStyles,
      tableElementStyles,
      dividerBottom,
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
      affixHeaderRef,
      affixFooterRef,
      bottomContentRef,
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
      virtualConfig,
      showAffixPagination,
      tActiveRow,
      hoverRow,
      showElement,
      scrollToElement,
      renderPagination,
      renderTNode,
      onFixedChange,
      onHorizontalScroll,
      updateAffixHeaderOrFooter,
      onInnerVirtualScroll,
      refreshTable,
      scrollColumnIntoView,
      onTableFocus,
      onTableBlur,
      onInnerRowClick,
      paginationAffixRef,
      horizontalScrollAffixRef,
      headerTopAffixRef,
      footerBottomAffixRef,
    };
  },

  render() {
    if (!this.showElement) {
      return <div ref="tableRef"></div>;
    }

    const { rowAndColFixedPosition, tableLayout } = this;
    const data = this.isPaginateData ? this.dataSource : this.data;
    const columns = this.spansAndLeafNodes?.leafColumns || this.columns;

    const columnResizable = this.allowResizeColumnWidth ?? this.resizable;
    if (columnResizable && tableLayout === 'auto') {
      log.warn(
        'Table',
        'table-layout can not be `auto`, cause you are using column resizable, set `table-layout: fixed` please.',
      );
    }

    const defaultColWidth = tableLayout === 'fixed' && this.isWidthOverflow ? '100px' : undefined;

    const renderColGroup = (isAffixHeader = true) => (
      <colgroup>
        {columns.map((col) => {
          const style: Styles = {
            width:
              formatCSSUnit(
                (isAffixHeader || columnResizable ? this.thWidthList[col.colKey] : undefined) || col.width,
              ) || defaultColWidth,
          };
          if (col.minWidth) {
            style.minWidth = formatCSSUnit(col.minWidth);
          }
          // 没有设置任何宽度的场景下，需要保留表格正常显示的最小宽度，否则会出现因宽度过小的抖动问题
          if (!style.width && !col.minWidth && this.tableLayout === 'fixed') {
            style.minWidth = '80px';
          }
          return <col key={col.colKey} style={style}></col>;
        })}
      </colgroup>
    );

    const renderAffixedHeader = () => {
      if (this.showHeader === false) return null;
      return (
        !!(this.virtualConfig.isVirtualScroll.value || this.headerAffixedTop) &&
        (this.headerAffixedTop ? (
          <Affix
            offsetTop={0}
            {...getAffixProps(this.headerAffixedTop)}
            onFixedChange={this.onFixedChange}
            ref="headerTopAffixRef"
          >
            {affixHeaderWithWrap}
          </Affix>
        ) : (
          this.isFixedHeader && affixHeaderWithWrap
        ))
      );
    };

    const renderAffixedHorizontalScrollbar = () => (
      <Affix
        offsetBottom={0}
        {...getAffixProps(this.horizontalScrollAffixedBottom)}
        style={{ marginTop: `-${this.scrollbarWidth * 2}px` }}
        horizontalScrollAffixedBottom
        ref="horizontalScrollAffixRef"
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
    );

    const headProps = {
      isFixedHeader: this.isFixedHeader,
      rowAndColFixedPosition: this.rowAndColFixedPosition,
      isMultipleHeader: this.isMultipleHeader,
      bordered: this.bordered,
      maxHeight: this.maxHeight,
      height: this.height,
      spansAndLeafNodes: this.spansAndLeafNodes,
      thList: this.thList,
      thWidthList: this.thWidthList,
      resizable: this.resizable,
      columnResizeParams: this.columnResizeParams,
      classPrefix: this.classPrefix,
      ellipsisOverlayClassName: this.tableSize !== 'medium' ? this.sizeClassNames[this.tableSize] : '',
      attach: this.attach,
      showColumnShadow: this.showColumnShadow,
      thDraggable: this.thDraggable,
    };

    /**
     * Affixed Header
     */
    // IE 浏览器需要遮挡 header 吸顶滚动条，要减去 getBoundingClientRect.height 的滚动条高度 4 像素
    const IEHeaderWrap = getIEVersion() <= 11 ? 4 : 0;
    const barWidth = this.isWidthOverflow ? this.scrollbarWidth : 0;
    const affixHeaderHeight = ref((this.affixHeaderRef?.getBoundingClientRect().height || 0) - IEHeaderWrap);
    // 等待表头渲染完成后再更新高度，有可能列变动带来多级表头的高度变化，错误高度会导致滚动条显示
    const timer = setTimeout(() => {
      affixHeaderHeight.value = (this.affixHeaderRef?.getBoundingClientRect().height || 0) - IEHeaderWrap;
      clearTimeout(timer);
    }, 0);
    const affixHeaderWrapHeight = computed(() => affixHeaderHeight.value - barWidth);
    // 两类场景：1. 虚拟滚动，永久显示表头，直到表头消失在可视区域； 2. 表头吸顶，根据滚动情况判断是否显示吸顶表头
    const headerOpacity = props.headerAffixedTop ? Number(this.showAffixHeader) : 1;
    const affixHeaderWrapHeightStyle = computed(() => {
      return {
        width: `${this.tableWidth}px`,
        height: `${affixHeaderWrapHeight.value}px`,
        opacity: headerOpacity,
      };
    });
    // 多级表头左边线缺失
    const affixedLeftBorder = this.bordered ? 1 : 0;
    const affixedHeader = Boolean(
      (this.headerAffixedTop || this.virtualConfig.isVirtualScroll.value) && this.tableWidth,
    ) && (
      <div
        ref="affixHeaderRef"
        style={{
          width: `${this.tableWidth - affixedLeftBorder}px`,
          opacity: Number(this.showAffixHeader),
        }}
        class={[
          'scrollbar',
          {
            [this.tableBaseClass.affixedHeaderElm]: this.headerAffixedTop || this.virtualConfig.isVirtualScroll.value,
          },
        ]}
      >
        <table class={this.tableElmClasses} style={{ ...this.tableElementStyles, width: `${this.tableElmWidth}px` }}>
          {renderColGroup(true)}
          <THead v-slots={this.$slots} {...headProps} />
        </table>
      </div>
    );

    // 添加这一层，是为了隐藏表头的横向滚动条。如果以后不需要照顾 IE 10 以下的项目，则可直接移除这一层
    // 彼时，可更为使用 CSS 样式中的 .hideScrollbar()
    const affixHeaderWithWrap = (
      <div class={this.tableBaseClass.affixedHeaderWrap} style={affixHeaderWrapHeightStyle.value}>
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
    const showFooter = Boolean(this.virtualConfig.isVirtualScroll.value || this.footerAffixedBottom);
    const hasFooter = this.footData?.length || this.footerSummary || this.$slots['footerSummary'];
    const affixedFooter = Boolean(showFooter && hasFooter && this.tableWidth) && (
      <Affix
        class={this.tableBaseClass.affixedFooterWrap}
        onFixedChange={this.onFixedChange}
        offsetBottom={marginScrollbarWidth || 0}
        {...getAffixProps(this.footerAffixedBottom)}
        style={{ marginTop: `${-1 * ((this.tableFootHeight ?? 0) + marginScrollbarWidth)}px` }}
        ref="footerBottomAffixRef"
      >
        <div
          ref="affixFooterRef"
          style={{ width: `${this.tableWidth - affixedLeftBorder}px`, opacity: Number(this.showAffixFooter) }}
          class={[
            'scrollbar',
            {
              [this.tableBaseClass.affixedFooterElm]:
                this.footerAffixedBottom || this.virtualConfig.isVirtualScroll.value,
            },
          ]}
        >
          <table class={this.tableElmClasses} style={{ ...this.tableElementStyles, width: `${this.tableElmWidth}px` }}>
            {/* 此处和 Vue2 不同，Vue3 里面必须每一处单独写 <colgroup> */}
            {renderColGroup(true)}
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

    // 通过 translate 撑开虚拟滚动的高度，应该是内容高度加上表头和表尾的高度
    const translate = `translate(0, ${
      this.virtualConfig.scrollHeight.value + (this.tableFootHeight ?? 0) + (affixHeaderHeight.value ?? 0)
    }px)`;
    const virtualStyle = {
      transform: translate,
      '-ms-transform': translate,
      '-moz-transform': translate,
      '-webkit-transform': translate,
    };
    const { virtualConfig } = this;
    const tableBodyProps = {
      classPrefix: this.classPrefix,
      ellipsisOverlayClassName: this.tableSize !== 'medium' ? this.sizeClassNames[this.tableSize] : '',
      rowAndColFixedPosition,
      showColumnShadow: this.showColumnShadow,
      data: virtualConfig.isVirtualScroll.value ? virtualConfig.visibleData.value : data,
      virtualConfig: this.virtualConfig,
      columns: this.spansAndLeafNodes.leafColumns,
      tableElm: this.tableRef,
      tableWidth: this.tableWidth,
      isWidthOverflow: this.isWidthOverflow,
      scroll: this.scroll,
      cellEmptyContent: this.cellEmptyContent,
      tableContentElm: this.tableContentRef,
      handleRowMounted: this.virtualConfig.handleRowMounted,
      renderExpandedRow: this.renderExpandedRow,
      ...pick(this.$props, extendTableProps),
      // 内部使用分页信息必须取 innerPagination
      pagination: this.innerPagination,
      attach: this.attach,
      hoverRow: this.hoverRow,
      activeRow: this.tActiveRow,
      onRowClick: this.onInnerRowClick,
    };
    const tableContent = (
      <div
        ref="tableContentRef"
        class={this.tableBaseClass.content}
        style={this.tableContentStyles}
        onScroll={this.onInnerVirtualScroll}
      >
        {this.virtualConfig.isVirtualScroll.value && (
          <div class={this.virtualScrollClasses.cursor} style={virtualStyle} />
        )}

        <table
          ref="tableElmRef"
          class={this.tableElmClasses}
          style={{
            ...this.tableElementStyles,
            width:
              this.resizable && this.isWidthOverflow && this.tableElmWidth
                ? `${this.tableElmWidth}px`
                : this.tableElementStyles.width,
          }}
        >
          {renderColGroup(false)}
          {this.showHeader && (
            <THead v-slots={this.$slots} {...{ ...headProps, thWidthList: columnResizable ? this.thWidthList : {} }} />
          )}
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
            virtualScroll={this.virtualConfig.isVirtualScroll.value}
          ></TFoot>
        </table>
      </div>
    );

    const getCustomLoadingText = isFunction(this.loading) ? this.loading : this.$slots.loading;
    const loadingContent = this.loading !== undefined && (
      <Loading
        loading={!!this.loading}
        text={getCustomLoadingText}
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

    const bottom = !!bottomContent && (
      <div ref="bottomContentRef" class={this.tableBaseClass.bottomContent}>
        {bottomContent}
      </div>
    );

    return (
      <div
        ref="tableRef"
        tabindex="0"
        class={this.dynamicBaseTableClasses}
        onFocus={this.onTableFocus}
        onBlur={this.onTableBlur}
      >
        {!!topContent && <div class={this.tableBaseClass.topContent}>{topContent}</div>}

        {renderAffixedHeader()}

        {tableContent}

        {affixedFooter}

        {loadingContent}

        {bottom}

        {/* 右侧滚动条分隔线 */}
        {this.showRightDivider && (
          <div
            class={this.tableBaseClass.scrollbarDivider}
            style={{
              right: `${this.scrollbarWidth}px`,
              bottom: this.dividerBottom ? `${this.dividerBottom}px` : undefined,
              height: `${this.tableContentRef?.getBoundingClientRect().height}px`,
            }}
          ></div>
        )}

        {/* 吸底的滚动条 */}
        {this.horizontalScrollAffixedBottom && renderAffixedHorizontalScrollbar()}

        {/* 吸底的分页器 */}
        {this.paginationAffixedBottom ? (
          <Affix offsetBottom={0} {...getAffixProps(this.paginationAffixedBottom)} ref="paginationAffixRef">
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
