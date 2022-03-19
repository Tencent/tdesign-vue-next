import { usePrefixClass } from '../../config-provider/useConfig';

export default function useClassName() {
  const classPrefix = usePrefixClass();
  const prefix = classPrefix.value;
  const classNames = {
    tableBaseClass: {
      table: `${prefix}-table`,
      body: `${prefix}-table__body`,
      content: `${prefix}-table__content`,
      topContent: `${prefix}-table__top-content`,
      tdLastRow: `${prefix}-table__td-last-row`,
      thCellInner: `${prefix}-table__th-cell-inner`,
      bordered: `${prefix}-table--bordered`,
      striped: `${prefix}-table--striped`,
      hover: `${prefix}-table--hoverable`,
      empty: `${prefix}-table__empty`,
      emptyRow: `${prefix}-table__empty-row`,
      headerFixed: `${prefix}-table--header-fixed`,
      columnFixed: `${prefix}-table--column-fixed`,
      widthOverflow: `${prefix}-table--width-overflow`,
      multipleHeader: `${prefix}-table--multiple-header`,
      affixedHeader: `${prefix}-table--affixed-header`,
      affixedHeaderElm: `${prefix}-table__affixed-header-elm`,
      // 边框模式，固定表头，横向滚动时，右侧添加边线，分隔滚动条
      scrollbarDivider: `${prefix}-table__scroll-bar-divider`,
    },

    tdAlignClasses: {
      left: `${prefix}-align-left`,
      right: `${prefix}-align-right`,
      center: `${prefix}-align-center`,
    },

    tableHeaderClasses: {
      header: `${prefix}-table__header`,
      thBordered: `${prefix}-table__header-th--bordered`,
      fixed: `${prefix}-table__header--fixed`,
      multipleHeader: `${prefix}-table__header--multiple`,
    },

    tableFooterClasses: {
      footer: `${prefix}-table__footer`,
      fixed: `${prefix}-table__footer--fixed`,
    },

    tableAlignClasses: {
      top: `${prefix}-vertical-align-top`,
      middle: `${prefix}-vertical-align-middle`,
      bottom: `${prefix}-vertical-align-bottom`,
    },

    tableRowFixedClasses: {
      top: `${prefix}-table__row--fixed-top`,
      bottom: `${prefix}-table__row--fixed-bottom`,
      firstBottom: `${prefix}-table__row--fixed-bottom-first`,
      withoutBorderBottom: `${prefix}-table__row--without-border-bottom`,
    },

    tableColFixedClasses: {
      left: `${prefix}-table__cell--fixed-left`,
      right: `${prefix}-table__cell--fixed-right`,
      lastLeft: `${prefix}-table__cell--fixed-left-last`,
      firstRight: `${prefix}-table__cell--fixed-right-first`,
      leftShadow: `${prefix}-table__content--scrollable-to-left`,
      rightShadow: `${prefix}-table__content--scrollable-to-right`,
    },

    tableLayoutClasses: {
      auto: `${prefix}-table--layout-auto`,
      fixed: `${prefix}-table--layout-fixed`,
    },

    tdEllipsisClass: `${prefix}-table-td--ellipsis`,

    // 行通栏，一列铺满整行
    tableFullRowClasses: {
      base: `${prefix}-table__row--full`,
      innerFullRow: `${prefix}-table__row-full-inner`,
      innerFullElement: `${prefix}-table__row-full-element`,
      firstFullRow: `${prefix}-table__first-full-row`,
      lastFullRow: `${prefix}-table__last-full-row`,
    },

    // 展开/收起行，全部类名
    tableExpandClasses: {
      iconBox: `${prefix}-table__expand-box`,
      iconCell: `${prefix}-table__expandable-icon-cell`,
      row: `${prefix}-table__expanded-row`,
      rowInner: `${prefix}-table__expanded-row-inner`,
      expanded: `${prefix}-table__row--expanded`,
      collapsed: `${prefix}-table__row--collapsed`,
    },

    // 排序功能，全部类名
    tableSortClasses: {
      sortable: `${prefix}-table__cell--sortable`,
      title: `${prefix}-table__cell--title`,
      trigger: `${prefix}-table__cell--sort-trigger`,
      doubleIcon: `${prefix}-table__double-icons`,
      sortIcon: `${prefix}-table__sort-icon`,
      iconDirection: {
        asc: `${prefix}-table-sort-asc`,
        desc: `${prefix}-table-sort-desc`,
      },
      iconActive: `${prefix}-table__sort-icon--active`,
      iconDefault: `${prefix}-icon-sort--default`,
    },

    // 行选中功能，全部类名
    tableSelectedClasses: {
      selected: `${prefix}-table__row--selected`,
      disabled: `${prefix}-table__row--disabled`,
    },

    // 过滤功能，全部类名
    tableFilterClasses: {
      filterable: `${prefix}-table__cell--filterable`,
      popup: `${prefix}-table__filter-pop`,
      icon: `${prefix}-table__filter-icon`,
      popupContent: `${prefix}-table__filter-pop-content`,
      result: `${prefix}-table__filter-result`,
      inner: `${prefix}-table__row-filter-inner`,
      bottomButtons: `${prefix}-table__filter--bottom-buttons`,
      contentInner: `${prefix}-table__filter-pop-content-inner`,
      iconWrap: `${prefix}-table__filter-icon-wrap`,
    },

    // 通用类名
    asyncLoadingClass: `${prefix}-table__async-loading`,
    isFocusClass: `${prefix}-is-focus`,
    isLoadingClass: `${prefix}-is-loading`,
    isLoadMoreClass: `${prefix}-is-load-more`,

    // 树形结构类名
    tableTreeClasses: {
      col: `${prefix}-table__tree-col`,
      icon: `${prefix}-table__tree-op-icon`,
    },

    virtualScrollClasses: {
      cursor: `${prefix}-table__virtual-scroll-cursor`,
      header: `${prefix}-table__virtual-scroll-header`,
    },

    positiveRoate90: `${prefix}-positive-rotate-90`,
    negativeRoate180: `${prefix}-negative-rotate-180`,
  };

  return classNames;
}
