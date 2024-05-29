import type { PropType, SetupContext } from '@td/adapter-vue';
import {
  computed,
  defineComponent,
  nextTick,
  onMounted,
  ref,
  toRefs,
  watch,
} from '@td/adapter-vue';
import { get, isFunction, pick } from 'lodash-es';
import log from '@td/common/js/log';
import { getIEVersion } from '@td/common/js/utils/helper';
import type { ComponentScrollToElementParams, Styles } from '@td/types';
import type { BaseTableCol, TableRowData } from '@td/intel/table/type';
import props from '@td/intel/table/base-table-props';
import { useConfig, useElementLazyRender, useTNodeJSX, useVirtualScroll } from '@td/adapter-hooks';
import { Affix, Loading } from '@td/component';
import type { TdLoadingProps as LoadingProps } from '@td/intel/loading/type';
import useTableHeader from './hooks/useTableHeader';
import useColumnResize from './hooks/useColumnResize';
import useFixed from './hooks/useFixed';
import usePagination from './hooks/usePagination';
import useAffix from './hooks/useAffix';
import TBody, { extendTableProps } from './tbody';
import type { BaseTableProps } from './interface';
import useStyle, { formatCSSUnit } from './hooks/useStyle';
import useClassName from './hooks/useClassName';
import { ROW_LISTENERS } from './tr';
import THead from './thead';
import TFoot from './tfoot';
import { getAffixProps } from './utils';

export const BASE_TABLE_EVENTS = ['page-change', 'cell-click', 'scroll', 'scrollX', 'scrollY', 'column-resize-change'];
export const BASE_TABLE_ALL_EVENTS = ROW_LISTENERS.map(t => `row-${t}`).concat(BASE_TABLE_EVENTS);

export interface TableListeners {
  [key: string]: Function;
}

export default defineComponent({
  name: 'TBaseTable',

  props: {
    ...props,
    renderExpandedRow: Function as PropType<BaseTableProps['renderExpandedRow']>,
    onLeafColumnsChange: Function as PropType<BaseTableProps['onLeafColumnsChange']>,
    thDraggable: Boolean,
  },

  setup(props: BaseTableProps, context: SetupContext) {
    const { lazyLoad } = toRefs(props);
    const tableRef = ref<HTMLDivElement>();
    const tableElmRef = ref<HTMLTableElement>();
    const tableBodyRef = ref<HTMLTableElement>();
    const bottomContentRef = ref<HTMLDivElement>();
    const tableFootHeight = ref(0);

    const {
      classPrefix,
      virtualScrollClasses,
      tableLayoutClasses,
      tableBaseClass,
      tableColFixedClasses,
    } = useClassName();
    // 表格基础样式类
    const {
      tableClasses,
      sizeClassNames,
      tableContentStyles,
      tableElementStyles,
    } = useStyle(props);
    const { global } = useConfig('table', props.locale);
    const { isMultipleHeader, spansAndLeafNodes, thList } = useTableHeader(props);
    const finalColumns = computed(() => spansAndLeafNodes.value?.leafColumns || props.columns);
    const isIE = computed(() => getIEVersion() <= 11);
    const tableSize = computed(() => props.size ?? global.value.size);

    // 吸附相关ref 用来做视图resize后重新定位
    const paginationAffixRef = ref();
    const horizontalScrollAffixRef = ref();
    const headerTopAffixRef = ref();
    const footerBottomAffixRef = ref();

    // 固定表头和固定列逻辑
    const {
      scrollbarWidth,
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
      updateAffixHeaderOrFooter,
      setTableContentRef,
    } = useAffix(props);

    const { showElement } = useElementLazyRender(tableRef, lazyLoad);

    const {
      dataSource,
      innerPagination,
      isPaginateData,
      renderPagination,
    } = usePagination(props, context);

    const onInnerResizeChange: BaseTableProps['onColumnResizeChange'] = (p) => {
      props.onColumnResizeChange?.(p);
      context.emit('column-resize-change', p);
    };

    // 列宽拖拽逻辑
    const columnResizeParams = useColumnResize({
      isWidthOverflow,
      tableContentRef,
      showColumnShadow,
      getThWidthList,
      updateThWidthList,
      setTableElmWidth,
      updateTableAfterColumnResize,
      onColumnResizeChange: onInnerResizeChange,
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
      },
    ]);

    const tableElmClasses = computed(() => [[tableLayoutClasses[props.tableLayout]]]);

    const showRightDivider = computed(
      () => props.bordered
      && isFixedHeader.value
      && ((isMultipleHeader.value && isWidthOverflow.value) || !isMultipleHeader.value),
    );

    const dividerBottom = computed(() => {
      if (!props.bordered) {
        return 0;
      }
      const bottomRect = bottomContentRef.value?.getBoundingClientRect();
      const paginationRect = paginationRef.value?.getBoundingClientRect();
      return (bottomRect?.height || 0) + (paginationRect?.height || 0);
    });

    const columnResizable = computed(() => props.allowResizeColumnWidth ?? props.resizable);

    watch(tableElmRef, () => {
      setUseFixedTableElmRef(tableElmRef.value);
    });

    watch(
      () => [props.data, dataSource, isPaginateData],
      () => {
        setData(isPaginateData.value ? dataSource.value : props.data);
      },
    );

    watch(
      spansAndLeafNodes,
      () => {
        props.onLeafColumnsChange?.(spansAndLeafNodes.value.leafColumns);
        // Vue3 do not need next line
        context.emit('LeafColumnsChange', spansAndLeafNodes.value.leafColumns);
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

    // Vue3 do not need getListener
    const getListener = () => {
      const listener: TableListeners = {};
      BASE_TABLE_ALL_EVENTS.forEach((key) => {
        listener[key] = (...args: any) => {
          context.emit(key, ...args);
        };
      });
      return listener;
    };

    // 虚拟滚动相关数据
    const virtualScrollParams = computed(() => ({
      data: props.data,
      scroll: props.scroll,
    }));
    const virtualConfig = useVirtualScroll(tableContentRef, virtualScrollParams);

    let lastScrollY = 0;
    const onInnerVirtualScroll = (e: WheelEvent) => {
      const target = (e.target || e.srcElement) as HTMLElement;
      const top = target.scrollTop;
      // 排除横向滚动出发的纵向虚拟滚动计算
      if (lastScrollY !== top) {
        virtualConfig.isVirtualScroll.value && virtualConfig.handleScroll();
      } else {
        lastScrollY = 0;
        updateColumnFixedShadow(target);
      }
      lastScrollY = top;
      emitScrollEvent(e);
    };

    // used for top margin
    const getTFootHeight = () => {
      if (!tableElmRef.value) {
        return;
      }
      tableFootHeight.value = tableElmRef.value.querySelector('tfoot')?.getBoundingClientRect().height;
    };

    // 对外暴露方法，修改时需谨慎（expose）
    const scrollColumnIntoView = (colKey: string) => {
      if (!tableContentRef.value) {
        return;
      }
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

    watch(tableElmRef, getTFootHeight);

    watch(tableRef, (tableRef) => {
      addTableResizeObserver(tableRef);
    });

    onMounted(() => {
      getTFootHeight();
      setTableContentRef(tableContentRef.value);
      addTableResizeObserver(tableRef.value);
    });

    const tableData = computed(() => (isPaginateData.value ? dataSource.value : props.data));

    const scrollToElement = (params: ComponentScrollToElementParams) => {
      let { index } = params;
      if (!index && index !== 0) {
        if (!params.key) {
          log.error('Table', 'scrollToElement: one of `index` or `key` must exist.');
          return;
        }
        index = tableData.value?.findIndex(item => get(item, props.rowKey) === params.key);
        if (index < 0) {
          log.error('Table', `${params.key} does not exist in data, check \`rowKey\` or \`data\` please.`);
        }
      }
      virtualConfig.scrollToElement({ ...params, index });
    };

    watch(
      [showElement],
      ([showElement]) => {
        context.emit('show-element-change', showElement);
      },
      { immediate: true },
    );

    return {
      virtualConfig,
      scrollToElement,
      columnResizable,
      thList,
      classPrefix,
      innerPagination,
      global,
      tableSize,
      tableFootHeight,
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
      virtualScrollClasses,
      tableLayoutClasses,
      tableElmClasses,
      dividerBottom,
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
      paginationRef,
      bottomContentRef,
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
      showElement,
      getListener,
      renderPagination,
      onFixedChange,
      onHorizontalScroll,
      updateAffixHeaderOrFooter,
      refreshTable,
      onInnerVirtualScroll,
      scrollColumnIntoView,
      paginationAffixRef,
      horizontalScrollAffixRef,
      headerTopAffixRef,
      footerBottomAffixRef,
      isIE,
    };
  },

  methods: {
    renderColGroup(columns: BaseTableCol<TableRowData>[], isAffixHeader = true) {
      return (
        <colgroup>
          {columns.map((col) => {
            const style: Styles = {
              width: formatCSSUnit(
                (isAffixHeader || this.columnResizable ? this.thWidthList[col.colKey] : undefined) || col.width,
              ),
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
    },

    getHeadProps(isAffixHeader = true) {
      const headProps = {
        isFixedHeader: this.isFixedHeader,
        showColumnShadow: this.showColumnShadow,
        thDraggable: this.thDraggable,
        rowAndColFixedPosition: this.rowAndColFixedPosition,
        isMultipleHeader: this.isMultipleHeader,
        bordered: this.bordered,
        maxHeight: this.maxHeight,
        height: this.height,
        spansAndLeafNodes: this.spansAndLeafNodes,
        thList: this.thList,
        thWidthList: isAffixHeader || this.columnResizable ? this.thWidthList : {},
        resizable: this.resizable,
        columnResizeParams: this.columnResizeParams,
        classPrefix: this.classPrefix,
        ellipsisOverlayClassName: this.tableSize !== 'medium' ? this.sizeClassNames[this.tableSize] : '',
        attach: this.attach,
      };
      return headProps;
    },

    /**
     * Affixed Header
     */
    renderFixedHeader(columns: BaseTableCol<TableRowData>[]) {
      if (!this.showHeader) {
        return null;
      }
      const isVirtual = this.virtualConfig.isVirtualScroll.value;
      const barWidth = this.isWidthOverflow ? this.scrollbarWidth : 0;
      // IE 浏览器需要遮挡 header 吸顶滚动条，要减去 getBoundingClientRect.height 的滚动条高度 4 像素
      const IEHeaderWrap = this.isIE ? 4 : 0;
      const affixHeaderHeight = (this.affixHeaderRef?.getBoundingClientRect().height || 0) - IEHeaderWrap;
      // 滚动条判断修正之后，IE浏览器也需要减去横向滚动条的宽度
      const affixHeaderWrapHeight = affixHeaderHeight - barWidth;
      // 两类场景：1. 虚拟滚动，永久显示表头，直到表头消失在可视区域； 2. 表头吸顶，根据滚动情况判断是否显示吸顶表头
      const headerOpacity = this.headerAffixedTop ? Number(this.showAffixHeader) : 1;
      const affixHeaderWrapHeightStyle = {
        width: `${this.tableWidth}px`,
        height: `${affixHeaderWrapHeight}px`,
        opacity: headerOpacity,
      };
      const colgroup = this.renderColGroup(columns, true);
      // 多级表头左边线缺失，IE不需要
      const affixedLeftBorder = this.bordered && !this.isIE ? 1 : 0;

      const affixedHeader = Boolean((this.headerAffixedTop || isVirtual) && this.tableWidth) && (
        <div
          ref="affixHeaderRef"
          style={{ width: `${this.tableWidth - affixedLeftBorder}px`, opacity: headerOpacity }}
          class={['scrollbar', { [this.tableBaseClass.affixedHeaderElm]: this.headerAffixedTop || isVirtual }]}
        >
          <table class={this.tableElmClasses} style={{ ...this.tableElementStyles, width: `${this.tableElmWidth}px` }}>
            {colgroup}
            <THead scopedSlots={this.$scopedSlots} props={this.getHeadProps(true)} />
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

      return affixHeaderWithWrap;
    },

    /**
     * Affixed Footer
     */
    renderAffixedFooter(columns: BaseTableCol<TableRowData>[]) {
      const barWidth = this.isWidthOverflow ? this.scrollbarWidth : 0;
      // 多级表头左边线缺失, IE不需要
      const affixedLeftBorder = this.bordered && !this.isIE ? 1 : 0;
      let marginScrollbarWidth = barWidth;
      if (this.bordered) {
        marginScrollbarWidth += 1;
      }
      const isVirtual = this.virtualConfig.isVirtualScroll.value;
      // Hack: Affix 组件，marginTop 临时使用 负 margin 定位位置
      const affixedFooter = Boolean(this.footerAffixedBottom && this.footData?.length && this.tableWidth) && (
        <Affix
          class={this.tableBaseClass.affixedFooterWrap}
          onFixedChange={this.onFixedChange}
          offsetBottom={marginScrollbarWidth || 0}
          props={getAffixProps(this.footerAffixedBottom, this.footerAffixProps)}
          style={{ marginTop: `${-1 * (this.tableFootHeight + marginScrollbarWidth)}px` }}
          ref="footerBottomAffixRef"
        >
          <div
            ref="affixFooterRef"
            style={{ width: `${this.tableWidth - affixedLeftBorder}px`, opacity: Number(this.showAffixFooter) }}
            class={['scrollbar', { [this.tableBaseClass.affixedFooterElm]: this.footerAffixedBottom || isVirtual }]}
          >
            <table
              class={this.tableElmClasses}
              style={{ ...this.tableElementStyles, width: `${this.tableElmWidth}px` }}
            >
              {this.renderColGroup(columns, true)}
              <TFoot
                rowKey={this.rowKey}
                scopedSlots={this.$scopedSlots}
                isFixedHeader={this.isFixedHeader}
                rowAndColFixedPosition={this.rowAndColFixedPosition}
                footData={this.footData}
                columns={columns}
                rowAttributes={this.rowAttributes}
                rowClassName={this.rowClassName}
                thWidthList={this.thWidthList}
                footerSummary={this.footerSummary}
                rowspanAndColspanInFooter={this.rowspanAndColspanInFooter}
              >
              </TFoot>
            </table>
          </div>
        </Affix>
      );

      return affixedFooter;
    },

    renderAffixedHeader(columns: BaseTableCol<TableRowData>[]) {
      if (!props.showHeader) {
        return null;
      }
      return (
        !!(this.virtualConfig.isVirtualScroll.value || this.headerAffixedTop)
        && (this.headerAffixedTop
          ? (
            <Affix
              offsetTop={0}
              props={getAffixProps(this.headerAffixedTop, this.headerAffixProps)}
              onFixedChange={this.onFixedChange}
              ref="headerTopAffixRef"
            >
              {this.renderFixedHeader(columns)}
            </Affix>
            )
          : (
              this.isFixedHeader && this.renderFixedHeader(columns)
            ))
      );
    },
  },

  render(h) {
    if (!this.showElement) {
      return <div ref="tableRef"></div>;
    }
    const { rowAndColFixedPosition } = this;
    const data = this.isPaginateData ? this.dataSource : this.data;
    const columns = this.spansAndLeafNodes?.leafColumns || this.columns;
    if (this.allowResizeColumnWidth) {
      log.warn('Table', 'allowResizeColumnWidth is going to be deprecated, please use resizable instead.');
    }

    if (this.columnResizable && this.tableLayout === 'auto') {
      log.warn(
        'Table',
        'table-layout can not be `auto`, cause you are using column resizable, set `table-layout: fixed` please.',
      );
    }

    const translate = `translate(0, ${this.virtualConfig.scrollHeight.value}px)`;
    const virtualStyle = {
      'transform': translate,
      '-ms-transform': translate,
      '-moz-transform': translate,
      '-webkit-transform': translate,
    };
    const tableBodyProps = {
      rowAndColFixedPosition,
      showColumnShadow: this.showColumnShadow,
      thDraggable: this.thDraggable,
      data: this.virtualConfig.isVirtualScroll.value ? this.virtualConfig.visibleData.value : data,
      virtualConfig: this.virtualConfig,
      columns,
      tableElm: this.tableRef,
      tableContentElm: this.tableContentRef,
      tableWidth: this.tableWidth,
      isWidthOverflow: this.isWidthOverflow,
      scroll: this.scroll,
      cellEmptyContent: this.cellEmptyContent,
      classPrefix: this.classPrefix,
      handleRowMounted: this.virtualConfig.handleRowMounted,
      renderExpandedRow: this.renderExpandedRow,
      ...pick(this.$props, extendTableProps),
      // 内部使用分页信息必须取 innerPagination
      pagination: this.innerPagination,
      attach: this.attach,
    };
    // Vue3 do not need getListener
    const tBodyListener = this.getListener();
    const tableContent = (
      <div
        ref="tableContentRef"
        class={this.tableBaseClass.content}
        style={this.tableContentStyles}
        // @ts-expect-error
        on={{ scroll: this.onInnerVirtualScroll }}
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
          {this.renderColGroup(columns, false)}
          {this.showHeader && <THead scopedSlots={this.$scopedSlots} props={this.getHeadProps(false)} />}
          <TBody ref="tableBodyRef" scopedSlots={this.$scopedSlots} props={tableBodyProps} on={tBodyListener} />
          <TFoot
            rowKey={this.rowKey}
            scopedSlots={this.$scopedSlots}
            isFixedHeader={this.isFixedHeader}
            rowAndColFixedPosition={rowAndColFixedPosition}
            footData={this.footData}
            columns={columns}
            rowAttributes={this.rowAttributes}
            rowClassName={this.rowClassName}
            footerSummary={this.footerSummary}
            rowspanAndColspanInFooter={this.rowspanAndColspanInFooter}
          >
          </TFoot>
        </table>
      </div>
    );

    const getCustomLoadingText = isFunction(this.loading) ? this.loading : this.$scopedSlots.loading;
    const loadingContent = this.loading !== undefined && (
      <Loading
        loading={!!this.loading}
        text={getCustomLoadingText}
        attach={this.tableRef ? () => this.tableRef : undefined}
        showOverlay
        props={{ size: 'small', ...(this.loadingProps as Partial<LoadingProps>) }}
      >
      </Loading>
    );

    const renderTNodeJSX = useTNodeJSX();

    const topContent = renderTNodeJSX('topContent');
    const bottomContent = renderTNodeJSX('bottomContent');
    const paginationContent = this.innerPagination
      ? (
        <div
          ref="paginationRef"
          class={this.tableBaseClass.paginationWrap}
          style={{ opacity: Number(this.showAffixPagination) }}
        >
          {this.renderPagination(h)}
        </div>
        )
      : null;
    const bottom = !!bottomContent && (
      <div ref="bottomContentRef" class={this.tableBaseClass.bottomContent}>
        {bottomContent}
      </div>
    );

    return (
      <div ref="tableRef" class={this.dynamicBaseTableClasses} style="position: relative">
        {!!topContent && <div class={this.tableBaseClass.topContent}>{topContent}</div>}

        {this.renderAffixedHeader(columns)}

        {tableContent}

        {this.renderAffixedFooter(columns)}

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
          >
          </div>
        )}

        {/* 吸底的滚动条 */}
        {this.horizontalScrollAffixedBottom && (
          <Affix
            offsetBottom={0}
            props={getAffixProps(this.horizontalScrollAffixedBottom)}
            style={
              this.showAffixFooter
                ? { marginTop: `-${this.scrollbarWidth * 2}px` }
                : { float: 'right', visibility: 'hidden' }
            }
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
        )}

        {/* 吸底的分页器 */}
        {this.paginationAffixedBottom
          ? (
            <Affix offsetBottom={0} props={getAffixProps(this.paginationAffixedBottom)} ref="paginationAffixRef">
              {paginationContent}
            </Affix>
            )
          : (
              paginationContent
            )}

        {/* 调整列宽时的指示线。由于层级需要比较高，因而放在根节点，避免被吸顶表头覆盖。非必要情况，请勿调整辅助线位置 */}
        <div ref="resizeLineRef" class={this.tableBaseClass.resizeLine} style={this.resizeLineStyle}></div>
      </div>
    );
  },
});
