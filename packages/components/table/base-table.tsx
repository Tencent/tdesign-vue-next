import { computed, defineComponent, SetupContext, ref, nextTick, PropType, watch, onMounted, toRefs } from 'vue';
import { pick, get, isFunction, throttle } from 'lodash-es';
import props from './base-table-props';
import useTableHeader from './hooks/useTableHeader';
import useColumnResize from './hooks/useColumnResize';
import useFixed from './hooks/useFixed';
import usePagination from './hooks/usePagination';
import useVirtualScrollNew from '../hooks/useVirtualScrollNew';
import useAffix from './hooks/useAffix';
import Loading from '../loading';
import TBody, { extendTableProps } from './components/tbody';
import { BaseTableProps } from './types';
import { useTNodeJSX } from '../hooks/tnode';
import useStyle, { formatCSSUnit } from './hooks/useStyle';
import useClassName from './hooks/useClassName';
import { useConfig } from '../hooks/useConfig';
import { Affix } from '../affix';
import { ROW_LISTENERS } from './components/tr';
import THead from './components/thead';
import TFoot from './components/tfoot';
import { getAffixProps } from './utils';
import { Styles, ComponentScrollToElementParams } from '../common';
import { getIEVersion } from '@tdesign/common-js/utils/helper';
import { BaseTableInstanceFunctions } from './type';
import log from '@tdesign/common-js/log/index';
import { useRowHighlight } from './hooks/useRowHighlight';
import useHoverKeyboardEvent from './hooks/useHoverKeyboardEvent';
import useElementLazyRender from '../hooks/useElementLazyRender';

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
    const tableBodyRef = ref<InstanceType<typeof TBody>>();
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
      tableRefTabIndex,
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

    const syncThWidthList = throttle(() => {
      updateThWidthList(getThWidthList('calculate'));
    });

    // 虚拟滚动相关数据
    const virtualScrollParams = computed(() => ({
      data: props.data,
      // 传递 fixedRows 的配置
      scroll: { ...props.scroll, fixedRows: props.fixedRows },
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
      if (props.tableLayout === 'auto') {
        syncThWidthList();
      }
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
      // auto 布局下，初始化表头列宽，避免 affix 表头列宽不对齐
      if (props.tableLayout === 'auto') {
        syncThWidthList();
      }
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
      if (virtualConfig.isVirtualScroll.value) {
        virtualConfig.scrollToElement({ ...params, index: index + 1 });
      } else {
        // 执行普通的滚动
        // 获取 tbody
        const el = tableBodyRef.value?.$el as HTMLElement | undefined;
        const row = el?.children?.[index] as HTMLElement;
        if (row) {
          const { offsetTop } = row;
          const scrollTop = tableContentRef.value.scrollTop;
          const scrollHeight = offsetTop - scrollTop - (params.top ?? 0);
          // 实现偏移量的支持
          tableContentRef.value.scrollBy({ top: scrollHeight, behavior: params.behavior ?? 'auto' });
        }
      }
    };

    return () => {
      if (!showElement.value) {
        return <div ref={tableRef}></div>;
      }

      const data = isPaginateData.value ? dataSource.value : props.data;
      const columns = spansAndLeafNodes?.value.leafColumns || props.columns;

      const columnResizable = props.allowResizeColumnWidth ?? props.resizable;
      if (columnResizable && props.tableLayout === 'auto') {
        log.warn(
          'Table',
          'table-layout can not be `auto`, cause you are using column resizable, set `table-layout: fixed` please.',
        );
      }

      const defaultColWidth = props.tableLayout === 'fixed' && isWidthOverflow.value ? '100px' : undefined;

      const renderColGroup = (isAffixHeader = true) => (
        <colgroup>
          {columns.map((col) => {
            const style: Styles = {
              width:
                formatCSSUnit(
                  (isAffixHeader || columnResizable ? thWidthList.value[col.colKey] : undefined) || col.width,
                ) || defaultColWidth,
            };
            if (col.minWidth) {
              style.minWidth = formatCSSUnit(col.minWidth);
            }
            // 没有设置任何宽度的场景下，需要保留表格正常显示的最小宽度，否则会出现因宽度过小的抖动问题
            if (!style.width && !col.minWidth && props.tableLayout === 'fixed') {
              style.minWidth = '80px';
            }
            return <col key={col.colKey} style={style}></col>;
          })}
        </colgroup>
      );

      const renderAffixedHeader = () => {
        if (props.showHeader === false) return null;
        return (
          !!(virtualConfig.isVirtualScroll.value || props.headerAffixedTop) &&
          (props.headerAffixedTop ? (
            <Affix
              offsetTop={0}
              {...getAffixProps(props.headerAffixedTop)}
              onFixedChange={onFixedChange}
              ref={headerTopAffixRef}
            >
              {affixHeaderWithWrap}
            </Affix>
          ) : (
            isFixedHeader.value && affixHeaderWithWrap
          ))
        );
      };

      const renderAffixedHorizontalScrollbar = () => (
        <Affix
          offsetBottom={0}
          {...getAffixProps(props.horizontalScrollAffixedBottom)}
          style={{ marginTop: `-${scrollbarWidth.value * 2}px` }}
          horizontalScrollAffixedBottom
          ref={horizontalScrollAffixRef}
        >
          <div
            ref={horizontalScrollbarRef}
            class={['scrollbar', tableBaseClass.obviousScrollbar]}
            style={{
              width: `${tableWidth.value}px`,
              overflow: 'auto',
              opacity: Number(showAffixFooter.value),
            }}
          >
            <div style={{ width: `${tableElmWidth.value}px`, height: '5px' }}></div>
          </div>
        </Affix>
      );

      const headProps = {
        isFixedHeader: isFixedHeader.value,
        rowAndColFixedPosition: rowAndColFixedPosition.value,
        isMultipleHeader: isMultipleHeader.value,
        bordered: props.bordered,
        maxHeight: props.maxHeight,
        height: props.height,
        spansAndLeafNodes: spansAndLeafNodes.value,
        thList: thList.value,
        thWidthList: thWidthList.value,
        resizable: props.resizable,
        columnResizeParams,
        classPrefix: classPrefix,
        ellipsisOverlayClassName: tableSize.value !== 'medium' ? sizeClassNames[tableSize.value] : '',
        attach: props.attach,
        showColumnShadow: showColumnShadow,
        thDraggable: props.thDraggable,
      };

      /**
       * Affixed Header
       */
      // IE 浏览器需要遮挡 header 吸顶滚动条，要减去 getBoundingClientRect.height 的滚动条高度 4 像素
      const IEHeaderWrap = getIEVersion() <= 11 ? 4 : 0;
      const barWidth = isWidthOverflow.value ? scrollbarWidth.value : 0;
      const affixHeaderHeight = ref((affixHeaderRef.value?.getBoundingClientRect().height || 0) - IEHeaderWrap);
      // 等待表头渲染完成后再更新高度，有可能列变动带来多级表头的高度变化，错误高度会导致滚动条显示
      const timer = setTimeout(() => {
        affixHeaderHeight.value = (affixHeaderRef.value?.getBoundingClientRect().height || 0) - IEHeaderWrap;
        clearTimeout(timer);
      }, 0);
      const affixHeaderWrapHeight = computed(() => affixHeaderHeight.value - barWidth);
      // 两类场景：1. 虚拟滚动，永久显示表头，直到表头消失在可视区域； 2. 表头吸顶，根据滚动情况判断是否显示吸顶表头
      const headerOpacity = props.headerAffixedTop ? Number(showAffixHeader.value) : 1;
      const affixHeaderWrapHeightStyle = computed(() => {
        return {
          width: `${tableWidth.value}px`,
          height: `${affixHeaderWrapHeight.value}px`,
          opacity: headerOpacity,
        };
      });
      // 多级表头左边线缺失
      const affixedLeftBorder = props.bordered ? 1 : 0;
      const affixedHeader = Boolean(
        (props.headerAffixedTop || virtualConfig.isVirtualScroll.value) && tableWidth.value,
      ) && (
        <div
          ref={affixHeaderRef}
          style={{
            width: `${tableWidth.value - affixedLeftBorder}px`,
            opacity: Number(showAffixHeader.value),
          }}
          class={[
            'scrollbar',
            {
              [tableBaseClass.affixedHeaderElm]: props.headerAffixedTop || virtualConfig.isVirtualScroll.value,
            },
          ]}
        >
          <table
            class={tableElmClasses.value}
            style={{ ...tableElementStyles.value, width: `${tableElmWidth.value}px` }}
          >
            {renderColGroup(true)}
            <THead v-slots={context.slots} {...headProps} />
          </table>
        </div>
      );

      // 添加这一层，是为了隐藏表头的横向滚动条。如果以后不需要照顾 IE 10 以下的项目，则可直接移除这一层
      // 彼时，可更为使用 CSS 样式中的 .hideScrollbar()
      const affixHeaderWithWrap = (
        <div class={tableBaseClass.affixedHeaderWrap} style={affixHeaderWrapHeightStyle.value}>
          {affixedHeader}
        </div>
      );

      /**
       * Affixed Footer
       */
      let marginScrollbarWidth = isWidthOverflow.value ? scrollbarWidth.value : 0;
      if (props.bordered) {
        marginScrollbarWidth += 1;
      }
      // Hack: Affix 组件，marginTop 临时使用 负 margin 定位位置
      const showFooter = Boolean(virtualConfig.isVirtualScroll.value || props.footerAffixedBottom);
      const hasFooter = props.footData?.length || props.footerSummary || context.slots['footerSummary'];
      const affixedFooter = Boolean(showFooter && hasFooter && tableWidth.value) && (
        <Affix
          class={tableBaseClass.affixedFooterWrap}
          onFixedChange={onFixedChange}
          offsetBottom={marginScrollbarWidth || 0}
          {...getAffixProps(props.footerAffixedBottom)}
          style={{ marginTop: `${-1 * ((tableFootHeight.value ?? 0) + marginScrollbarWidth)}px` }}
          ref={footerBottomAffixRef}
        >
          <div
            ref={affixFooterRef}
            style={{ width: `${tableWidth.value - affixedLeftBorder}px`, opacity: Number(showAffixFooter.value) }}
            class={[
              'scrollbar',
              {
                [tableBaseClass.affixedFooterElm]: props.footerAffixedBottom || virtualConfig.isVirtualScroll.value,
              },
            ]}
          >
            <table
              class={tableElmClasses.value}
              style={{ ...tableElementStyles.value, width: `${tableElmWidth.value}px` }}
            >
              {/* 此处和 Vue2 不同，Vue3 里面必须每一处单独写 <colgroup> */}
              {renderColGroup(true)}
              <TFoot
                rowKey={props.rowKey}
                v-slots={context.slots}
                isFixedHeader={isFixedHeader.value}
                rowAndColFixedPosition={rowAndColFixedPosition.value}
                footData={props.footData}
                columns={spansAndLeafNodes.value.leafColumns}
                rowAttributes={props.rowAttributes}
                rowClassName={props.rowClassName}
                thWidthList={thWidthList.value}
                footerSummary={props.footerSummary}
                rowspanAndColspanInFooter={props.rowspanAndColspanInFooter}
              ></TFoot>
            </table>
          </div>
        </Affix>
      );

      // 通过 translate 撑开虚拟滚动的高度，应该是内容高度加上表头和表尾的高度
      const translate = `translate(0, ${
        virtualConfig.scrollHeight.value + (tableFootHeight.value ?? 0) + (affixHeaderHeight.value ?? 0)
      }px)`;
      const virtualStyle = {
        transform: translate,
        '-ms-transform': translate,
        '-moz-transform': translate,
        '-webkit-transform': translate,
      };
      const tableBodyProps = {
        classPrefix,
        ellipsisOverlayClassName: tableSize.value !== 'medium' ? sizeClassNames[tableSize.value] : '',
        rowAndColFixedPosition: rowAndColFixedPosition.value,
        showColumnShadow,
        data: data,
        virtualConfig,
        columns: spansAndLeafNodes.value.leafColumns,
        tableElm: tableRef.value,
        tableWidth: tableWidth.value,
        isWidthOverflow: isWidthOverflow.value,
        scroll: props.scroll,
        cellEmptyContent: props.cellEmptyContent,
        tableContentElm: tableContentRef.value,
        handleRowMounted: virtualConfig.handleRowMounted,
        renderExpandedRow: props.renderExpandedRow,
        ...pick(props, extendTableProps),
        // 内部使用分页信息必须取 innerPagination
        pagination: innerPagination.value,
        attach: props.attach,
        hoverRow: hoverRow.value,
        activeRow: tActiveRow.value,
        onRowClick: onInnerRowClick,
      };
      const tableContent = (
        <div
          ref={tableContentRef}
          class={tableBaseClass.content}
          style={tableContentStyles.value}
          onScroll={onInnerVirtualScroll}
        >
          {virtualConfig.isVirtualScroll.value && <div class={virtualScrollClasses.cursor} style={virtualStyle} />}

          <table
            ref={tableElmRef}
            class={tableElmClasses.value}
            style={{
              ...tableElementStyles.value,
              width:
                props.resizable && isWidthOverflow.value && tableElmWidth.value
                  ? `${tableElmWidth.value}px`
                  : tableElementStyles.value.width,
            }}
          >
            {renderColGroup(false)}
            {props.showHeader && (
              <THead
                v-slots={context.slots}
                {...{ ...headProps, thWidthList: columnResizable ? thWidthList.value : {} }}
              />
            )}
            <TBody v-slots={context.slots} ref={tableBodyRef} {...tableBodyProps} />
            <TFoot
              v-slots={context.slots}
              rowKey={props.rowKey}
              isFixedHeader={isFixedHeader.value}
              rowAndColFixedPosition={rowAndColFixedPosition.value}
              footData={props.footData}
              columns={spansAndLeafNodes.value.leafColumns}
              rowAttributes={props.rowAttributes}
              rowClassName={props.rowClassName}
              footerSummary={props.footerSummary}
              rowspanAndColspanInFooter={props.rowspanAndColspanInFooter}
              virtualScroll={virtualConfig.isVirtualScroll.value}
            ></TFoot>
          </table>
        </div>
      );

      const getCustomLoadingText = isFunction(props.loading) ? props.loading : context.slots.loading;
      const loadingContent = props.loading !== undefined && (
        <Loading
          loading={!!props.loading}
          text={getCustomLoadingText}
          attach={tableRef.value ? () => tableRef.value : undefined}
          showOverlay
          size="small"
          {...props.loadingProps}
        ></Loading>
      );

      const topContent = renderTNode('topContent');
      const bottomContent = renderTNode('bottomContent');
      const pagination = (
        <div
          ref={paginationRef}
          class={tableBaseClass.paginationWrap}
          style={{ opacity: Number(showAffixPagination.value) }}
        >
          {renderPagination()}
        </div>
      );

      const bottom = !!bottomContent && (
        <div ref={bottomContentRef} class={tableBaseClass.bottomContent}>
          {bottomContent}
        </div>
      );

      return (
        <div
          ref={tableRef}
          tabindex={tableRefTabIndex.value}
          class={dynamicBaseTableClasses.value}
          onFocus={onTableFocus}
          onBlur={onTableBlur}
        >
          {!!topContent && <div class={tableBaseClass.topContent}>{topContent}</div>}

          {renderAffixedHeader()}

          {tableContent}

          {affixedFooter}

          {loadingContent}

          {bottom}

          {/* 右侧滚动条分隔线 */}
          {showRightDivider.value && (
            <div
              class={tableBaseClass.scrollbarDivider}
              style={{
                right: `${scrollbarWidth.value}px`,
                bottom: dividerBottom.value ? `${dividerBottom.value}px` : undefined,
                height: `${tableContentRef.value?.getBoundingClientRect().height}px`,
              }}
            ></div>
          )}

          {/* 吸底的滚动条 */}
          {props.horizontalScrollAffixedBottom && renderAffixedHorizontalScrollbar()}

          {/* 吸底的分页器 */}
          {props.paginationAffixedBottom ? (
            <Affix offsetBottom={0} {...getAffixProps(props.paginationAffixedBottom)} ref={paginationAffixRef}>
              {pagination}
            </Affix>
          ) : (
            pagination
          )}

          {/* 调整列宽时的指示线。由于层级需要比较高，因而放在根节点，避免被吸顶表头覆盖。非必要情况，请勿调整辅助线位置 */}
          <div ref={resizeLineRef} class={tableBaseClass.resizeLine} style={resizeLineStyle}></div>
        </div>
      );
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
      tableRefTabIndex,
    };
  },

  // render() {
  //   if (!showElement) {
  //     return <div ref="tableRef"></div>;
  //   }

  //   const { rowAndColFixedPosition, tableLayout } = this;
  //   const data = isPaginateData ? dataSource : data;
  //   const columns = spansAndLeafNodes?.leafColumns || columns;

  //   const columnResizable = allowResizeColumnWidth ?? resizable;
  //   if (columnResizable && tableLayout === 'auto') {
  //     log.warn(
  //       'Table',
  //       'table-layout can not be `auto`, cause you are using column resizable, set `table-layout: fixed` please.',
  //     );
  //   }

  //   const defaultColWidth = tableLayout === 'fixed' && isWidthOverflow ? '100px' : undefined;

  //   const renderColGroup = (isAffixHeader = true) => (
  //     <colgroup>
  //       {columns.map((col) => {
  //         const style: Styles = {
  //           width:
  //             formatCSSUnit(
  //               (isAffixHeader || columnResizable ? thWidthList[col.colKey] : undefined) || col.width,
  //             ) || defaultColWidth,
  //         };
  //         if (col.minWidth) {
  //           style.minWidth = formatCSSUnit(col.minWidth);
  //         }
  //         // 没有设置任何宽度的场景下，需要保留表格正常显示的最小宽度，否则会出现因宽度过小的抖动问题
  //         if (!style.width && !col.minWidth && tableLayout === 'fixed') {
  //           style.minWidth = '80px';
  //         }
  //         return <col key={col.colKey} style={style}></col>;
  //       })}
  //     </colgroup>
  //   );

  //   const renderAffixedHeader = () => {
  //     if (showHeader === false) return null;
  //     return (
  //       !!(virtualConfig.isVirtualScroll.value || headerAffixedTop) &&
  //       (headerAffixedTop ? (
  //         <Affix
  //           offsetTop={0}
  //           {...getAffixProps(headerAffixedTop)}
  //           onFixedChange={onFixedChange}
  //           ref="headerTopAffixRef"
  //         >
  //           {affixHeaderWithWrap}
  //         </Affix>
  //       ) : (
  //         isFixedHeader && affixHeaderWithWrap
  //       ))
  //     );
  //   };

  //   const renderAffixedHorizontalScrollbar = () => (
  //     <Affix
  //       offsetBottom={0}
  //       {...getAffixProps(horizontalScrollAffixedBottom)}
  //       style={{ marginTop: `-${scrollbarWidth * 2}px` }}
  //       horizontalScrollAffixedBottom
  //       ref="horizontalScrollAffixRef"
  //     >
  //       <div
  //         ref="horizontalScrollbarRef"
  //         class={['scrollbar', tableBaseClass.obviousScrollbar]}
  //         style={{
  //           width: `${tableWidth}px`,
  //           overflow: 'auto',
  //           opacity: Number(showAffixFooter),
  //         }}
  //       >
  //         <div style={{ width: `${tableElmWidth}px`, height: '5px' }}></div>
  //       </div>
  //     </Affix>
  //   );

  //   const headProps = {
  //     isFixedHeader: isFixedHeader,
  //     rowAndColFixedPosition: rowAndColFixedPosition,
  //     isMultipleHeader: isMultipleHeader,
  //     bordered: bordered,
  //     maxHeight: maxHeight,
  //     height: height,
  //     spansAndLeafNodes: spansAndLeafNodes,
  //     thList: thList,
  //     thWidthList: thWidthList,
  //     resizable: resizable,
  //     columnResizeParams: columnResizeParams,
  //     classPrefix: classPrefix,
  //     ellipsisOverlayClassName: tableSize !== 'medium' ? sizeClassNames[tableSize] : '',
  //     attach: attach,
  //     showColumnShadow: showColumnShadow,
  //     thDraggable: thDraggable,
  //   };

  //   /**
  //    * Affixed Header
  //    */
  //   // IE 浏览器需要遮挡 header 吸顶滚动条，要减去 getBoundingClientRect.height 的滚动条高度 4 像素
  //   const IEHeaderWrap = getIEVersion() <= 11 ? 4 : 0;
  //   const barWidth = isWidthOverflow ? scrollbarWidth : 0;
  //   const affixHeaderHeight = ref((affixHeaderRef?.getBoundingClientRect().height || 0) - IEHeaderWrap);
  //   // 等待表头渲染完成后再更新高度，有可能列变动带来多级表头的高度变化，错误高度会导致滚动条显示
  //   const timer = setTimeout(() => {
  //     affixHeaderHeight.value = (affixHeaderRef?.getBoundingClientRect().height || 0) - IEHeaderWrap;
  //     clearTimeout(timer);
  //   }, 0);
  //   const affixHeaderWrapHeight = computed(() => affixHeaderHeight.value - barWidth);
  //   // 两类场景：1. 虚拟滚动，永久显示表头，直到表头消失在可视区域； 2. 表头吸顶，根据滚动情况判断是否显示吸顶表头
  //   const headerOpacity = props.headerAffixedTop ? Number(showAffixHeader) : 1;
  //   const affixHeaderWrapHeightStyle = computed(() => {
  //     return {
  //       width: `${tableWidth}px`,
  //       height: `${affixHeaderWrapHeight.value}px`,
  //       opacity: headerOpacity,
  //     };
  //   });
  //   // 多级表头左边线缺失
  //   const affixedLeftBorder = bordered ? 1 : 0;
  //   const affixedHeader = Boolean(
  //     (headerAffixedTop || virtualConfig.isVirtualScroll.value) && tableWidth,
  //   ) && (
  //     <div
  //       ref="affixHeaderRef"
  //       style={{
  //         width: `${tableWidth - affixedLeftBorder}px`,
  //         opacity: Number(showAffixHeader),
  //       }}
  //       class={[
  //         'scrollbar',
  //         {
  //           [tableBaseClass.affixedHeaderElm]: headerAffixedTop || virtualConfig.isVirtualScroll.value,
  //         },
  //       ]}
  //     >
  //       <table class={tableElmClasses} style={{ ...tableElementStyles, width: `${tableElmWidth}px` }}>
  //         {renderColGroup(true)}
  //         <THead v-slots={$slots} {...headProps} />
  //       </table>
  //     </div>
  //   );

  //   // 添加这一层，是为了隐藏表头的横向滚动条。如果以后不需要照顾 IE 10 以下的项目，则可直接移除这一层
  //   // 彼时，可更为使用 CSS 样式中的 .hideScrollbar()
  //   const affixHeaderWithWrap = (
  //     <div class={tableBaseClass.affixedHeaderWrap} style={affixHeaderWrapHeightStyle.value}>
  //       {affixedHeader}
  //     </div>
  //   );

  //   /**
  //    * Affixed Footer
  //    */
  //   let marginScrollbarWidth = isWidthOverflow ? scrollbarWidth : 0;
  //   if (bordered) {
  //     marginScrollbarWidth += 1;
  //   }
  //   // Hack: Affix 组件，marginTop 临时使用 负 margin 定位位置
  //   const showFooter = Boolean(virtualConfig.isVirtualScroll.value || footerAffixedBottom);
  //   const hasFooter = footData?.length || footerSummary || $slots['footerSummary'];
  //   const affixedFooter = Boolean(showFooter && hasFooter && tableWidth) && (
  //     <Affix
  //       class={tableBaseClass.affixedFooterWrap}
  //       onFixedChange={onFixedChange}
  //       offsetBottom={marginScrollbarWidth || 0}
  //       {...getAffixProps(footerAffixedBottom)}
  //       style={{ marginTop: `${-1 * ((tableFootHeight ?? 0) + marginScrollbarWidth)}px` }}
  //       ref="footerBottomAffixRef"
  //     >
  //       <div
  //         ref="affixFooterRef"
  //         style={{ width: `${tableWidth - affixedLeftBorder}px`, opacity: Number(showAffixFooter) }}
  //         class={[
  //           'scrollbar',
  //           {
  //             [tableBaseClass.affixedFooterElm]:
  //               footerAffixedBottom || virtualConfig.isVirtualScroll.value,
  //           },
  //         ]}
  //       >
  //         <table class={tableElmClasses} style={{ ...tableElementStyles, width: `${tableElmWidth}px` }}>
  //           {/* 此处和 Vue2 不同，Vue3 里面必须每一处单独写 <colgroup> */}
  //           {renderColGroup(true)}
  //           <TFoot
  //             rowKey={rowKey}
  //             v-slots={$slots}
  //             isFixedHeader={isFixedHeader}
  //             rowAndColFixedPosition={rowAndColFixedPosition}
  //             footData={footData}
  //             columns={columns}
  //             rowAttributes={rowAttributes}
  //             rowClassName={rowClassName}
  //             thWidthList={thWidthList}
  //             footerSummary={footerSummary}
  //             rowspanAndColspanInFooter={rowspanAndColspanInFooter}
  //           ></TFoot>
  //         </table>
  //       </div>
  //     </Affix>
  //   );

  //   // 通过 translate 撑开虚拟滚动的高度，应该是内容高度加上表头和表尾的高度
  //   const translate = `translate(0, ${
  //     virtualConfig.scrollHeight.value + (tableFootHeight ?? 0) + (affixHeaderHeight.value ?? 0)
  //   }px)`;
  //   const virtualStyle = {
  //     transform: translate,
  //     '-ms-transform': translate,
  //     '-moz-transform': translate,
  //     '-webkit-transform': translate,
  //   };
  //   const tableBodyProps = {
  //     classPrefix: classPrefix,
  //     ellipsisOverlayClassName: tableSize !== 'medium' ? sizeClassNames[tableSize] : '',
  //     rowAndColFixedPosition,
  //     showColumnShadow: showColumnShadow,
  //     data: data,
  //     virtualConfig: virtualConfig,
  //     columns: spansAndLeafNodes.leafColumns,
  //     tableElm: tableRef,
  //     tableWidth: tableWidth,
  //     isWidthOverflow: isWidthOverflow,
  //     scroll: scroll,
  //     cellEmptyContent: cellEmptyContent,
  //     tableContentElm: tableContentRef,
  //     handleRowMounted: virtualConfig.handleRowMounted,
  //     renderExpandedRow: renderExpandedRow,
  //     ...pick($props, extendTableProps),
  //     // 内部使用分页信息必须取 innerPagination
  //     pagination: innerPagination,
  //     attach: attach,
  //     hoverRow: hoverRow,
  //     activeRow: tActiveRow,
  //     onRowClick: onInnerRowClick,
  //   };
  //   const tableContent = (
  //     <div
  //       ref="tableContentRef"
  //       class={tableBaseClass.content}
  //       style={tableContentStyles}
  //       onScroll={onInnerVirtualScroll}
  //     >
  //       {virtualConfig.isVirtualScroll.value && (
  //         <div class={virtualScrollClasses.cursor} style={virtualStyle} />
  //       )}

  //       <table
  //         ref="tableElmRef"
  //         class={tableElmClasses}
  //         style={{
  //           ...tableElementStyles,
  //           width:
  //             resizable && isWidthOverflow && tableElmWidth
  //               ? `${tableElmWidth}px`
  //               : tableElementStyles.width,
  //         }}
  //       >
  //         {renderColGroup(false)}
  //         {showHeader && (
  //           <THead v-slots={$slots} {...{ ...headProps, thWidthList: columnResizable ? thWidthList : {} }} />
  //         )}
  //         <TBody v-slots={$slots} ref="tableBodyRef" {...tableBodyProps} />
  //         <TFoot
  //           v-slots={$slots}
  //           rowKey={rowKey}
  //           isFixedHeader={isFixedHeader}
  //           rowAndColFixedPosition={rowAndColFixedPosition}
  //           footData={footData}
  //           columns={columns}
  //           rowAttributes={rowAttributes}
  //           rowClassName={rowClassName}
  //           footerSummary={footerSummary}
  //           rowspanAndColspanInFooter={rowspanAndColspanInFooter}
  //           virtualScroll={virtualConfig.isVirtualScroll.value}
  //         ></TFoot>
  //       </table>
  //     </div>
  //   );

  //   const getCustomLoadingText = isFunction(loading) ? loading : $slots.loading;
  //   const loadingContent = loading !== undefined && (
  //     <Loading
  //       loading={!!loading}
  //       text={getCustomLoadingText}
  //       attach={tableRef ? () => tableRef : undefined}
  //       showOverlay
  //       size="small"
  //       {...(loadingProps as BaseTableProps['loadingProps'])}
  //     ></Loading>
  //   );

  //   const topContent = renderTNode('topContent');
  //   const bottomContent = renderTNode('bottomContent');
  //   const pagination = (
  //     <div
  //       ref="paginationRef"
  //       class={tableBaseClass.paginationWrap}
  //       style={{ opacity: Number(showAffixPagination) }}
  //     >
  //       {renderPagination()}
  //     </div>
  //   );

  //   const bottom = !!bottomContent && (
  //     <div ref="bottomContentRef" class={tableBaseClass.bottomContent}>
  //       {bottomContent}
  //     </div>
  //   );

  //   return (
  //     <div
  //       ref="tableRef"
  //       tabindex={tableRefTabIndex}
  //       class={dynamicBaseTableClasses}
  //       onFocus={onTableFocus}
  //       onBlur={onTableBlur}
  //     >
  //       {!!topContent && <div class={tableBaseClass.topContent}>{topContent}</div>}

  //       {renderAffixedHeader()}

  //       {tableContent}

  //       {affixedFooter}

  //       {loadingContent}

  //       {bottom}

  //       {/* 右侧滚动条分隔线 */}
  //       {showRightDivider && (
  //         <div
  //           class={tableBaseClass.scrollbarDivider}
  //           style={{
  //             right: `${scrollbarWidth}px`,
  //             bottom: dividerBottom ? `${dividerBottom}px` : undefined,
  //             height: `${tableContentRef?.getBoundingClientRect().height}px`,
  //           }}
  //         ></div>
  //       )}

  //       {/* 吸底的滚动条 */}
  //       {horizontalScrollAffixedBottom && renderAffixedHorizontalScrollbar()}

  //       {/* 吸底的分页器 */}
  //       {paginationAffixedBottom ? (
  //         <Affix offsetBottom={0} {...getAffixProps(paginationAffixedBottom)} ref="paginationAffixRef">
  //           {pagination}
  //         </Affix>
  //       ) : (
  //         pagination
  //       )}

  //       {/* 调整列宽时的指示线。由于层级需要比较高，因而放在根节点，避免被吸顶表头覆盖。非必要情况，请勿调整辅助线位置 */}
  //       <div ref="resizeLineRef" class={tableBaseClass.resizeLine} style={resizeLineStyle}></div>
  //     </div>
  //   );
  // },
});
