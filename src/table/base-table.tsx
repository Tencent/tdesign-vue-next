import { computed, defineComponent, SetupContext, toRefs, ref, provide, nextTick, PropType } from 'vue';
import pick from 'lodash/pick';
import props from './base-table-props';
import useTableHeader from './hooks/useTableHeader';
import useFixed from './hooks/useFixed';
import usePagination from './hooks/usePagination';
import useVirtualScroll from '../hooks/useVirtualScroll';
import Loading from '../loading';
import TBody, { extendTableProps } from './tbody';
import { BaseTableProps } from './interface';
import { useTNodeJSX } from '../hooks/tnode';
import useStyle, { formatCSSUnit } from './hooks/useStyle';
import useClassName from './hooks/useClassName';
import { useConfig } from '../hooks/useConfig';
import { Affix } from '../affix';
import { ROW_LISTENERS } from './tr';
import useCommonClassName from '../hooks/useCommonClassName';
import THead from './thead';
import TFoot from './tfoot';

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
  },

  setup(props: BaseTableProps, context: SetupContext) {
    const renderTNode = useTNodeJSX();
    const tableRef = ref<HTMLDivElement>();
    const tableElmRef = ref<HTMLTableElement>();
    const { virtualScrollClasses, tableLayoutClasses, tableBaseClass, tableColFixedClasses } = useClassName();
    const { statusClassNames } = useCommonClassName();
    // 表格基础样式类
    const { tableClasses, tableContentStyles, tableElementStyles } = useStyle(props);
    const { global } = useConfig('table');
    // 固定表头和固定列逻辑
    const {
      affixHeaderRef,
      scrollbarWidth,
      virtualScrollHeaderPos,
      tableWidth,
      tableContentRef,
      isFixedHeader,
      isWidthOverflow,
      isFixedColumn,
      thWidthList,
      showColumnShadow,
      showAffixHeader,
      rowAndColFixedPosition,
      refreshTable,
      onTableContentScroll,
      updateHeaderScroll,
    } = useFixed(props, context);
    const { isMultipleHeader, spansAndLeafNodes, thList } = useTableHeader(props);
    const { dataSource, isPaginateData, renderPagination } = usePagination(props);

    const dynamicBaseTableClasses = computed(() => [
      tableClasses.value,
      {
        [tableBaseClass.headerFixed]: isFixedHeader.value,
        [tableBaseClass.columnFixed]: isFixedColumn.value,
        [tableBaseClass.widthOverflow]: isWidthOverflow.value,
        [tableBaseClass.multipleHeader]: isMultipleHeader.value,
        [tableColFixedClasses.leftShadow]: showColumnShadow.left,
        [tableColFixedClasses.rightShadow]: showColumnShadow.right,
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

    const onFixedChange = () => {
      nextTick(() => {
        updateHeaderScroll();
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

    let lastScrollY = -1;
    const onInnerScroll =
      type === 'virtual'
        ? (e: WheelEvent) => {
            onTableContentScroll(e);
            const target = (e.target || e.srcElement) as HTMLElement;
            const top = target.scrollTop;
            // 排除横向滚动出发的纵向虚拟滚动计算
            if (Math.abs(lastScrollY - top) > 5) {
              handleVirtualScroll();
              lastScrollY = top;
            } else {
              lastScrollY = -1;
            }
          }
        : onTableContentScroll;

    return {
      thList,
      isVirtual,
      global,
      virtualScrollHeaderPos,
      tableWidth,
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
      showAffixHeader,
      statusClassNames,
      scrollbarWidth,
      isMultipleHeader,
      showRightDivider,
      refreshTable,
      onTableContentScroll,
      renderPagination,
      renderTNode,
      handleRowMounted,
      onFixedChange,
      updateHeaderScroll,
      onInnerScroll,
    };
  },

  render() {
    const { rowAndColFixedPosition } = this;
    const data = this.isPaginateData ? this.dataSource : this.data;

    const defaultColWidth = this.tableLayout === 'fixed' && this.isWidthOverflow ? '100px' : undefined;
    const colgroup = (
      <colgroup>
        {(this.spansAndLeafNodes?.leafColumns || this.columns).map((col) => (
          <col key={col.colKey} style={{ width: formatCSSUnit(col.width) || defaultColWidth }}></col>
        ))}
      </colgroup>
    );

    const affixedHeader = Boolean((this.headerAffixedTop || this.isVirtual) && this.tableWidth) && (
      <div
        ref="affixHeaderRef"
        style={{ width: `${this.tableWidth}px`, opacity: Number(this.showAffixHeader) }}
        class={{ [this.tableBaseClass.affixedHeaderElm]: this.headerAffixedTop || this.isVirtual }}
      >
        <table class={this.tableElmClasses} style={{ ...this.tableElementStyles, width: `${this.tableWidth}px` }}>
          {colgroup}
          <THead
            v-slots={this.$slots}
            isFixedHeader={this.isFixedHeader}
            rowAndColFixedPosition={this.rowAndColFixedPosition}
            isMultipleHeader={this.isMultipleHeader}
            bordered={this.bordered}
            spansAndLeafNodes={this.spansAndLeafNodes}
            thList={this.thList}
            thWidthList={this.thWidthList}
          />
        </table>
      </div>
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
        onScroll={this.onInnerScroll}
      >
        {this.isVirtual && <div class={this.virtualScrollClasses.cursor} style={virtualStyle} />}

        <table ref="tableElmRef" class={this.tableElmClasses} style={this.tableElementStyles}>
          {colgroup}
          <THead
            v-slots={this.$slots}
            isFixedHeader={this.isFixedHeader}
            rowAndColFixedPosition={this.rowAndColFixedPosition}
            isMultipleHeader={this.isMultipleHeader}
            bordered={this.bordered}
            spansAndLeafNodes={this.spansAndLeafNodes}
            thList={this.thList}
          />
          <TBody v-slots={this.$slots} {...tableBodyProps} />
          <TFoot
            v-slots={this.$slots}
            rowKey={this.rowKey}
            isFixedHeader={this.isFixedHeader}
            rowAndColFixedPosition={rowAndColFixedPosition}
            footData={this.footData}
            columns={this.columns}
            rowAttributes={this.rowAttributes}
            rowClassName={this.rowClassName}
          ></TFoot>
        </table>
      </div>
    );

    const customLoadingText = this.renderTNode('loading');
    const loadingContent = this.loading ? (
      <Loading
        loading={!!(this.loading || customLoadingText)}
        text={customLoadingText ? () => customLoadingText : undefined}
        showOverlay
        {...this.loadingProps}
      >
        {tableContent}
      </Loading>
    ) : (
      tableContent
    );

    const topContent = this.renderTNode('topContent');
    const bottomContent = this.renderTNode('bottomContent');

    return (
      <div ref="tableRef" class={this.dynamicBaseTableClasses} style="position: relative">
        {!!topContent && <div class={this.tableBaseClass.topContent}>{topContent}</div>}

        {!!(this.isVirtual || this.headerAffixedTop) &&
          (this.headerAffixedTop ? (
            <Affix offsetTop={0} {...this.headerAffixProps} onFixedChange={this.onFixedChange}>
              {affixedHeader}
            </Affix>
          ) : (
            this.isFixedHeader && affixedHeader
          ))}

        {loadingContent}

        {this.showRightDivider && (
          <div
            class={this.tableBaseClass.scrollbarDivider}
            style={{ right: `${this.scrollbarWidth}px`, height: `${this.tableContentRef?.offsetHeight}px` }}
          ></div>
        )}

        {!!bottomContent && <div class={this.tableBaseClass.bottomContent}>{bottomContent}</div>}
        {this.renderPagination()}
      </div>
    );
  },
});
