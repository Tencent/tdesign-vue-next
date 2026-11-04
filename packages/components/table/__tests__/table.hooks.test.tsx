/* eslint-disable vue/one-component-per-file */
import { computed, defineComponent, h, nextTick, reactive, ref } from 'vue';
import { flushPromises, mount } from '@vue/test-utils';
import { expect, vi } from 'vitest';
import type { BaseTableProps, PrimaryTableProps } from '@tdesign/components/table/types';
import type {
  BaseTableCol,
  BaseTableRenderParams,
  PrimaryTableCol,
  PrimaryTableRowEditContext,
  TableRowData,
  TdBaseTableProps,
} from '@tdesign/components/table/type';
import {
  getNodeDepth,
  getChildrenNodeWidth,
  getThRowspanAndColspan,
  getThList,
} from '@tdesign/components/table/hooks/useMultiHeader';
import { getCellKey, getRowKeyFromCell } from '@tdesign/components/table/hooks/useRowspanAndColspan';
import { getColumnKeys } from '@tdesign/components/table/hooks/useColumnController';
import {
  getChildrenData,
  removeChildrenKeys,
  getRowDataByKeys,
  childrenMap,
} from '@tdesign/components/table/hooks/useTreeSelect';
import useHoverKeyboardEvent from '@tdesign/components/table/hooks/useHoverKeyboardEvent';
import useLazyLoad from '@tdesign/components/table/hooks/useLazyLoad';
import useAffix from '@tdesign/components/table/hooks/useAffix';
import useRowEdit from '@tdesign/components/table/hooks/useEditableRow';
import useTableHeader, { renderTitle } from '@tdesign/components/table/hooks/useTableHeader';
import Ellipsis from '@tdesign/components/table/components/ellipsis';
import useColumnResize from '@tdesign/components/table/hooks/useColumnResize';
import useColumnController from '@tdesign/components/table/hooks/useColumnController';
import { DialogPlugin } from '@tdesign/components/dialog/plugin';
import useDragSort from '@tdesign/components/table/hooks/useDragSort';
import Sortable from 'sortablejs';
import log from '@tdesign/common-js/log/index';

describe('TableHooks', () => {
  describe('Table multiple header utils', () => {
    const columns = [
      { colKey: 'index' },
      {
        colKey: 'detail',
        children: [{ colKey: 'email' }, { colKey: 'address', children: [{ colKey: 'city' }, { colKey: 'street' }] }],
      },
    ];

    describe('getNodeDepth', () => {
      it('single level header depth is 1', () => {
        const depthMap = new Map();
        expect(getNodeDepth([{ colKey: 'index' }], depthMap)).toBe(1);
      });

      it('multiple header depth works fine', () => {
        const depthMap = new Map();
        expect(getNodeDepth(columns, depthMap)).toBe(3);
        expect(depthMap.get(columns[0])).toBe(1);
        expect(depthMap.get(columns[1].children[0])).toBe(2);
        expect(depthMap.get(columns[1].children[1].children[0])).toBe(3);
      });
    });

    describe('getChildrenNodeWidth', () => {
      it('leaf node width is 0', () => {
        expect(getChildrenNodeWidth({ colKey: 'index' })).toBe(0);
      });

      it('count all leaf nodes', () => {
        expect(getChildrenNodeWidth(columns[1])).toBe(3);
      });

      it('undefined node works fine', () => {
        expect(getChildrenNodeWidth(undefined)).toBe(0);
      });
    });

    describe('getThRowspanAndColspan', () => {
      it('rowspan and colspan works fine', () => {
        const { rowspanAndColspanMap, leafColumns } = getThRowspanAndColspan(columns);
        // 单列，跨越全部层级
        expect(rowspanAndColspanMap.get(columns[0])).toEqual({ rowspan: 3 });
        // 父级列，跨越全部叶子结点
        expect(rowspanAndColspanMap.get(columns[1])).toEqual({ colspan: 3 });
        // 第二层叶子结点，跨越剩余层级
        expect(rowspanAndColspanMap.get(columns[1].children[0])).toEqual({ rowspan: 2 });
        // 最后一层叶子结点，不存在 rowspan/colspan
        expect(rowspanAndColspanMap.get(columns[1].children[1].children[0])).toEqual({});
        expect(leafColumns.map((t) => t.colKey)).toEqual(['index', 'email', 'city', 'street']);
      });
    });

    describe('getThList', () => {
      it('single level header', () => {
        const list = getThList([{ colKey: 'index' }]);
        expect(list).toHaveLength(1);
        expect(list[0].map((t) => t.colKey)).toEqual(['index']);
      });

      it('multiple header renders 2d data', () => {
        const list = getThList(columns);
        expect(list).toHaveLength(3);
        expect(list[0].map((t) => t.colKey)).toEqual(['index', 'detail']);
        expect(list[1].map((t) => t.colKey)).toEqual(['email', 'address']);
        expect(list[2].map((t) => t.colKey)).toEqual(['city', 'street']);
      });
    });
  });

  describe('Table cell key utils', () => {
    describe('getCellKey', () => {
      it('row value exists', () => {
        expect(getCellKey({ id: 'row1' }, 'id', 'name', 0)).toBe('row1_name');
      });

      it('colKey is empty, fallback to colIndex', () => {
        expect(getCellKey({ id: 'row1' }, 'id', '', 2)).toBe('row1_2');
      });

      it('row value does not exist, fallback to rowIndex', () => {
        expect(getCellKey({ name: 'tdesign' }, 'id', 'name', 0, 3)).toBe('__row_3___name');
      });

      it('row value and rowIndex are both empty', () => {
        const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
        expect(getCellKey({}, 'id', 'name', 0)).toBe('__row_undefined___name');
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
      });
    });

    describe('getRowKeyFromCell', () => {
      it('get row key from cell key', () => {
        expect(getRowKeyFromCell('row1_name')).toBe('row1');
        expect(getRowKeyFromCell('1_name')).toBe('1');
      });
    });
  });

  describe('Table column controller utils', () => {
    describe('getColumnKeys', () => {
      it('collect leaf column keys', () => {
        const columns = [
          { colKey: 'index' },
          { colKey: 'detail', children: [{ colKey: 'email' }, { colKey: 'phone' }] },
          // 无 colKey 的列不参与列配置
          { title: 'operation' },
        ];
        expect([...getColumnKeys(columns)]).toEqual(['index', 'email', 'phone']);
      });

      it('duplicated column keys should be unique', () => {
        const columns = [{ colKey: 'index' }, { colKey: 'index' }];
        expect([...getColumnKeys(columns)]).toEqual(['index']);
      });
    });
  });

  describe('Table tree select utils', () => {
    const keys = { rowKey: 'id', childrenKey: 'children' };

    function createTreeDataMap(disabledKeys: (string | number)[] = []) {
      const map = new Map();
      [1, 2, 3, 4, 5].forEach((id) => {
        map.set(id, { row: { id }, disabled: disabledKeys.includes(id) });
      });
      return map;
    }

    const treeData = {
      id: 1,
      children: [{ id: 2, children: [{ id: 4 }, { id: 5 }] }, { id: 3 }],
    };

    beforeEach(() => {
      childrenMap.clear();
    });

    describe('getChildrenData', () => {
      it('leaf node has no children', () => {
        const result = getChildrenData(createTreeDataMap(), { id: 5 }, keys);
        expect(result.allChildren).toEqual([]);
        expect(result.allChildrenKeys).toEqual([]);
        expect(result.leafNodeKeys).toEqual([]);
      });

      it('get all children and leaf node keys', () => {
        const result = getChildrenData(createTreeDataMap(), treeData, keys);
        expect(result.allChildrenKeys).toEqual([2, 3, 4, 5]);
        expect(result.leafNodeKeys).toEqual([3, 4, 5]);
      });

      it('disabled children should be excluded', () => {
        const result = getChildrenData(createTreeDataMap([3]), treeData, keys);
        expect(result.allChildrenKeys).toEqual([2, 4, 5]);
        expect(result.leafNodeKeys).toEqual([4, 5]);
      });

      it('children data should be read from cache', () => {
        const cached = {
          allChildren: [] as TableRowData[],
          allChildrenKeys: ['cached'],
          leafNodeKeys: [] as string[],
        };
        childrenMap.set(treeData, cached);
        expect(getChildrenData(createTreeDataMap(), treeData, keys)).toBe(cached);
      });
    });

    describe('removeChildrenKeys', () => {
      it('remove keys works fine', () => {
        const result = removeChildrenKeys({ selectedRowKeys: [1, 2, 3, 4], removeKeys: [2, 4] });
        expect(result.keys).toEqual([1, 3]);
      });

      it('nothing to remove', () => {
        const result = removeChildrenKeys({ selectedRowKeys: [1, 2], removeKeys: [] });
        expect(result.keys).toEqual([1, 2]);
      });
    });

    describe('getRowDataByKeys', () => {
      it('get row state by keys', () => {
        const treeDataMap = createTreeDataMap();
        const result = getRowDataByKeys({ treeDataMap, selectedRowKeys: [1, 2] });
        expect(result).toEqual([treeDataMap.get(1), treeDataMap.get(2)]);
      });
    });
  });

  describe('useHoverKeyboardEvent', () => {
    function createKeyboardHook(overrides = {}) {
      const onActiveRowAction = vi.fn();
      const props = reactive({
        rowKey: 'id',
        data: [
          { id: 1, name: 'one' },
          { id: 2, name: 'two' },
        ],
        hover: false,
        activeRowType: undefined,
        keyboardRowHover: true,
        disableSpaceInactiveRow: false,
        onActiveRowAction,
        ...overrides,
      }) as unknown as BaseTableProps;
      const table = document.createElement('div');
      const hook = useHoverKeyboardEvent(props, ref(table));
      return { props, table, hook, onActiveRowAction };
    }

    it('needKeyboardRowHover follows activeRowType, hover and keyboardRowHover', () => {
      const { props, hook } = createKeyboardHook();
      expect(hook.needKeyboardRowHover.value).toBe(true);

      props.activeRowType = 'single';
      expect(hook.needKeyboardRowHover.value).toBe(false);
      props.activeRowType = 'multiple';
      expect(hook.needKeyboardRowHover.value).toBe(true);
      props.activeRowType = undefined;
      props.keyboardRowHover = false;
      expect(hook.needKeyboardRowHover.value).toBe(false);
      props.hover = true;
      expect(hook.needKeyboardRowHover.value).toBe(true);
    });

    it('handles arrows, space, clear, select-all and horizontal navigation', () => {
      const { table, hook, onActiveRowAction } = createKeyboardHook();
      hook.addRowHoverKeyboardListener();

      const dispatch = (code: string, init: KeyboardEventInit = {}) => {
        const event = new KeyboardEvent('keydown', { code, bubbles: true, cancelable: true, ...init });
        table.dispatchEvent(event);
        return event;
      };

      expect(dispatch('ArrowDown').defaultPrevented).toBe(true);
      expect(hook.hoverRow.value).toBe(1);
      dispatch('ArrowDown');
      expect(hook.hoverRow.value).toBe(2);
      dispatch('ArrowUp');
      expect(hook.hoverRow.value).toBe(1);

      dispatch('Space');
      expect(hook.hoverRow.value).toBeUndefined();
      expect(onActiveRowAction).toHaveBeenLastCalledWith({
        action: 'space-one-selection',
        activeRowList: [{ row: { id: 1, name: 'one' }, rowIndex: 0 }],
      });

      dispatch('Escape');
      expect(onActiveRowAction).toHaveBeenLastCalledWith({ action: 'clear', activeRowList: [] });
      dispatch('KeyA');
      expect(onActiveRowAction).toHaveBeenLastCalledWith({ action: 'select-all', activeRowList: [] });
      dispatch('KeyC');
      expect(onActiveRowAction).toHaveBeenLastCalledWith({ action: 'clear', activeRowList: [] });

      dispatch('ArrowLeft');
      expect(hook.tableRefTabIndex.value).toBeUndefined();
      dispatch('ArrowRight');
      expect(hook.tableRefTabIndex.value).toBeUndefined();
      dispatch('Enter');
      expect(hook.tableRefTabIndex.value).toBe(0);

      hook.clearHoverRow();
      expect(hook.hoverRow.value).toBeUndefined();
      const calls = onActiveRowAction.mock.calls.length;
      hook.removeRowHoverKeyboardListener();
      dispatch('Escape');
      expect(onActiveRowAction).toHaveBeenCalledTimes(calls);
    });

    it('keeps the hover row when disableSpaceInactiveRow is enabled', () => {
      const { table, hook } = createKeyboardHook({ disableSpaceInactiveRow: true, activeRowType: 'multiple' });
      hook.addRowHoverKeyboardListener();
      table.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown' }));
      table.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space' }));
      expect(hook.hoverRow.value).toBe(1);
      hook.removeRowHoverKeyboardListener();
    });
  });

  describe('useLazyLoad', () => {
    afterEach(() => {
      vi.useRealTimers();
      vi.unstubAllGlobals();
      vi.restoreAllMocks();
    });

    function stubIntersectionObserver() {
      let callback: IntersectionObserverCallback;
      let options: IntersectionObserverInit;
      let instance: IntersectionObserverStub;
      const observe = vi.fn();
      const unobserve = vi.fn();

      class IntersectionObserverStub {
        root: Element | Document | null = null;

        rootMargin = '';

        thresholds: readonly number[] = [];

        disconnect = vi.fn();

        observe = observe;

        unobserve = unobserve;

        takeRecords = (): IntersectionObserverEntry[] => [];

        constructor(nextCallback: IntersectionObserverCallback, nextOptions: IntersectionObserverInit) {
          callback = nextCallback;
          options = nextOptions;
          instance = this;
        }
      }

      vi.stubGlobal('IntersectionObserver', IntersectionObserverStub);
      return {
        get callback() {
          return callback;
        },
        get options() {
          return options;
        },
        get instance() {
          return instance;
        },
        observe,
        unobserve,
      };
    }

    function mountLazyHook(params: { type: 'lazy' | 'virtual'; rowHeight?: number; bufferSize?: number }) {
      const Harness = defineComponent({
        setup(_, { expose }) {
          const containerRef = ref<HTMLElement>();
          const childRef = ref<HTMLTableRowElement>();
          const hook = useLazyLoad(containerRef, childRef, params);
          expose(hook);
          return () =>
            h('div', { ref: containerRef }, [h('table', [h('tbody', [h('tr', { ref: childRef }, [h('td', 'row')])])])]);
        },
      });
      const wrapper = mount(Harness);
      return { wrapper, hook: wrapper.vm.$.exposed as ReturnType<typeof useLazyLoad> };
    }

    it('observes lazy rows with normalized height and initializes once', async () => {
      const observer = stubIntersectionObserver();
      const requestAnimationFrame = vi
        .spyOn(window, 'requestAnimationFrame')
        .mockImplementation((callback: FrameRequestCallback) => {
          callback(0);
          return 1;
        });
      const { hook } = mountLazyHook({ type: 'lazy', rowHeight: 20, bufferSize: 2 });
      await nextTick();
      await flushPromises();

      expect(observer.options.rootMargin).toBe('0px 0px 480px 0px');
      expect(observer.observe).toHaveBeenCalledTimes(1);
      expect(hook.tRowHeight.value).toBe(48);
      expect(hook.hasLazyLoadHolder.value).toBe(true);

      const entry = { isIntersecting: true } as IntersectionObserverEntry;
      observer.callback([entry], observer.instance as unknown as IntersectionObserver);
      observer.callback([entry], observer.instance as unknown as IntersectionObserver);
      expect(hook.hasLazyLoadHolder.value).toBe(false);
      expect(observer.unobserve).toHaveBeenCalledTimes(2);
      expect(requestAnimationFrame).toHaveBeenCalledTimes(1);
    });

    it('does not observe virtual rows and accepts a larger row height', async () => {
      const observer = stubIntersectionObserver();
      const { hook } = mountLazyHook({ type: 'virtual', rowHeight: 60, bufferSize: 20 });
      await nextTick();
      expect(observer.observe).not.toHaveBeenCalled();
      expect(hook.tRowHeight.value).toBe(60);
      expect(hook.hasLazyLoadHolder.value).toBe(false);
    });

    it('uses the timer fallback when requestAnimationFrame is unavailable', async () => {
      vi.useFakeTimers();
      vi.stubGlobal('requestAnimationFrame', undefined);
      vi.stubGlobal('IntersectionObserver', undefined);
      const { hook } = mountLazyHook({ type: 'lazy' });
      await nextTick();
      await flushPromises();

      expect(hook.hasLazyLoadHolder.value).toBe(true);
      vi.advanceTimersByTime(17);
      await nextTick();
      expect(hook.hasLazyLoadHolder.value).toBe(false);
    });
  });

  describe('useTableHeader', () => {
    it('renderTitle supports function, slot, render fallback and plain values', () => {
      const functionTitle = vi.fn((_createElement: typeof h, _params: { colIndex: number }) => 'function title');
      expect(renderTitle({}, { colKey: 'name', title: functionTitle }, 1)).toBe('function title');
      expect(functionTitle.mock.calls[0][1]).toMatchObject({ colIndex: 1 });

      const slot = vi.fn((_params: { colIndex: number }) => [h('span', 'slot title')]);
      renderTitle({ titleSlot: slot }, { colKey: 'name', title: 'titleSlot' }, 2);
      expect(slot.mock.calls[0][0]).toMatchObject({ colIndex: 2 });

      const render = vi.fn((_createElement: typeof h, _params: BaseTableRenderParams<TableRowData>) => 'render title');
      expect(renderTitle({}, { colKey: 'name', title: 'fallback', render }, 3)).toBe('render title');
      expect(render.mock.calls[0][1]).toMatchObject({ type: 'title', row: {}, rowIndex: -1 });
      expect(renderTitle({}, { colKey: 'name', title: 'fallback', render: () => null }, 0)).toBe('fallback');
      expect(renderTitle({}, { colKey: 'name', title: 'plain' }, 0)).toBe('plain');
    });

    it('computes header levels and renders title icons without ellipsis', () => {
      const props = reactive({
        columns: [{ colKey: 'group', children: [{ colKey: 'name' }, { colKey: 'status' }] }],
      }) as TdBaseTableProps;
      const hook = useTableHeader(props);
      expect(hook.isMultipleHeader.value).toBe(true);
      expect(hook.thList.value).toHaveLength(2);
      expect(hook.spansAndLeafNodes.value.leafColumns).toHaveLength(2);

      const Harness = defineComponent({
        setup() {
          return () =>
            hook.renderTitleWidthIcon(
              ['Name', h('i', { class: 'sort' }), h('i', { class: 'filter' })],
              { colKey: 'name' },
              0,
              false,
              null,
            );
        },
      });
      const wrapper = mount(Harness);
      expect(wrapper.find('.sort').exists()).toBe(true);
      expect(wrapper.find('.filter').exists()).toBe(true);
      expect(wrapper.find('.t-table__cell--sortable').exists()).toBe(true);
      expect(wrapper.find('.t-table__cell--filterable').exists()).toBe(true);
    });

    it('renders ellipsis content from function and object configurations', () => {
      const props = { rowKey: 'id', columns: [] } as TdBaseTableProps;
      const hook = useTableHeader(props);
      const content = vi.fn(() => 'tooltip content');
      const attach = document.createElement('div');
      const Harness = defineComponent({
        setup() {
          return () =>
            h('div', [
              hook.renderTitleWidthIcon(['Function', null, null], { colKey: 'name' }, 0, content, null),
              hook.renderTitleWidthIcon(
                ['Object', null, null],
                { colKey: 'status' },
                1,
                { content, props: { placement: 'top' } },
                attach,
                { classPrefix: 'custom', ellipsisOverlayClassName: 'overlay' },
              ),
            ]);
        },
      });
      const wrapper = mount(Harness);
      expect(wrapper.find('.t-table__ellipsis').exists()).toBe(true);
      expect(wrapper.find('.custom-table__ellipsis').exists()).toBe(true);
      const ellipses = wrapper.findAllComponents(Ellipsis);
      const attachProp = ellipses[1].props('attach');
      const firstTooltipContent = ellipses[0].props('tooltipContent');
      const secondTooltipContent = ellipses[1].props('tooltipContent');
      expect((attachProp as () => HTMLElement)()).toBe(attach);
      expect((firstTooltipContent as () => string)()).toBe('tooltip content');
      expect((secondTooltipContent as () => string)()).toBe('tooltip content');
      expect(content).toHaveBeenCalled();
    });
  });

  describe('useAffix', () => {
    function createRect(top: number, height: number, left = 0, width = 300): DOMRect {
      return {
        x: left,
        y: top,
        top,
        bottom: top + height,
        left,
        right: left + width,
        width,
        height,
        toJSON: () => ({}),
      };
    }

    function mountAffixHook(overrides = {}) {
      const props = reactive({
        rowKey: 'id',
        data: [{ id: 1 }, { id: 2 }],
        columns: [{ colKey: 'id' }],
        headerAffixedTop: true,
        footerAffixedBottom: true,
        horizontalScrollAffixedBottom: false,
        paginationAffixedBottom: true,
        scroll: undefined,
        ...overrides,
      }) as TdBaseTableProps;
      const Harness = defineComponent({
        setup(_, { expose }) {
          const hook = useAffix(props);
          expose(hook);
          return () => h('div');
        },
      });
      const wrapper = mount(Harness);
      return { props, wrapper, hook: wrapper.vm.$.exposed as ReturnType<typeof useAffix> };
    }

    function setupAffixElements(hook: ReturnType<typeof useAffix>) {
      const content = document.createElement('div');
      const table = document.createElement('table');
      const thead = document.createElement('thead');
      table.appendChild(thead);
      content.appendChild(table);
      const header = document.createElement('div');
      const footer = document.createElement('div');
      const scrollbar = document.createElement('div');
      const pagination = document.createElement('div');
      vi.spyOn(content, 'getBoundingClientRect').mockReturnValue(createRect(-10, 300));
      vi.spyOn(thead, 'getBoundingClientRect').mockReturnValue(createRect(-10, 40));
      vi.spyOn(header, 'getBoundingClientRect').mockReturnValue(createRect(0, 40));
      vi.spyOn(footer, 'getBoundingClientRect').mockReturnValue(createRect(220, 30));
      vi.spyOn(scrollbar, 'getBoundingClientRect').mockReturnValue(createRect(220, 15));
      vi.spyOn(pagination, 'getBoundingClientRect').mockReturnValue(createRect(250, 40));
      hook.affixHeaderRef.value = header;
      hook.affixFooterRef.value = footer;
      hook.horizontalScrollbarRef.value = scrollbar;
      hook.paginationRef.value = pagination;
      hook.setTableContentRef(content);
      return { content, header, footer, scrollbar, pagination, thead };
    }

    afterEach(() => {
      vi.useRealTimers();
      vi.restoreAllMocks();
    });

    it('synchronizes horizontal scroll positions across affixed elements', async () => {
      vi.useFakeTimers();
      const { hook, wrapper } = mountAffixHook({ horizontalScrollAffixedBottom: true });
      const { content, header, footer, scrollbar } = setupAffixElements(hook);
      await nextTick();

      content.scrollLeft = 40;
      hook.onHorizontalScroll(content);
      expect(header.scrollLeft).toBe(40);
      expect(footer.scrollLeft).toBe(40);
      expect(scrollbar.scrollLeft).toBe(40);

      header.scrollLeft = 75;
      hook.onHorizontalScroll(header);
      expect(content.scrollLeft).toBe(75);
      expect(footer.scrollLeft).toBe(75);
      hook.onHorizontalScroll(header);

      content.scrollLeft = 90;
      hook.onHorizontalScroll();
      expect(header.scrollLeft).toBe(90);
      wrapper.unmount();
    });

    it('updates header, footer, scrollbar and pagination visibility', async () => {
      vi.useFakeTimers();
      const { props, hook, wrapper } = mountAffixHook({ headerAffixedTop: { offsetTop: 10 } });
      const { content, scrollbar, pagination, thead } = setupAffixElements(hook);
      await nextTick();

      hook.updateAffixHeaderOrFooter();
      expect(hook.showAffixHeader.value).toBe(true);
      expect(hook.showAffixFooter.value).toBe(true);
      expect(hook.showAffixPagination.value).toBe(true);

      vi.mocked(content.getBoundingClientRect).mockReturnValue(createRect(-400, 300));
      hook.updateAffixHeaderOrFooter();
      expect(hook.showAffixHeader.value).toBe(false);

      props.footerAffixedBottom = false;
      props.horizontalScrollAffixedBottom = true;
      vi.mocked(content.getBoundingClientRect).mockReturnValue(createRect(-10, 300));
      vi.mocked(scrollbar.getBoundingClientRect).mockReturnValue(createRect(20, 30));
      vi.mocked(pagination.getBoundingClientRect).mockReturnValue(createRect(20, 30));
      hook.updateAffixHeaderOrFooter();
      expect(hook.showAffixFooter.value).toBe(false);
      expect(hook.showAffixPagination.value).toBe(false);

      props.scroll = { type: 'virtual', threshold: 1 };
      props.headerAffixedTop = false;
      vi.mocked(content.getBoundingClientRect).mockReturnValue(createRect(-50, 300));
      vi.mocked(thead.getBoundingClientRect).mockReturnValue(createRect(-50, 40));
      hook.updateAffixHeaderOrFooter();
      expect(hook.showAffixHeader.value).toBe(false);
      wrapper.unmount();
      expect(hook.affixHeaderRef.value).toBeNull();
    });

    it('registers mouse, scroll and touch listeners and removes them on unmount', async () => {
      vi.useFakeTimers();
      const { hook, wrapper } = mountAffixHook({ horizontalScrollAffixedBottom: true });
      const { content, header, footer, scrollbar } = setupAffixElements(hook);
      await nextTick();
      vi.runOnlyPendingTimers();

      header.dispatchEvent(new MouseEvent('mouseenter'));
      header.scrollLeft = 25;
      header.dispatchEvent(new Event('scroll'));
      expect(content.scrollLeft).toBe(25);
      header.dispatchEvent(new MouseEvent('mouseleave'));

      footer.dispatchEvent(new MouseEvent('mouseenter'));
      footer.scrollLeft = 35;
      footer.dispatchEvent(new Event('scroll'));
      expect(content.scrollLeft).toBe(35);
      footer.dispatchEvent(new MouseEvent('mouseleave'));

      scrollbar.dispatchEvent(new MouseEvent('mouseenter'));
      scrollbar.scrollLeft = 45;
      scrollbar.dispatchEvent(new Event('scroll'));
      expect(content.scrollLeft).toBe(45);
      scrollbar.dispatchEvent(new MouseEvent('mouseleave'));

      content.dispatchEvent(new Event('touchstart', { bubbles: true, composed: true }));
      content.scrollLeft = 55;
      content.dispatchEvent(new Event('scroll'));
      expect(header.scrollLeft).toBe(55);
      vi.advanceTimersByTime(200);

      content.dispatchEvent(new MouseEvent('mouseenter'));
      window.dispatchEvent(new MouseEvent('mousedown'));
      content.dispatchEvent(new MouseEvent('mouseleave'));
      window.dispatchEvent(new MouseEvent('mouseup'));
      document.dispatchEvent(new Event('scroll'));

      wrapper.unmount();
      expect(() => content.dispatchEvent(new Event('scroll'))).not.toThrow();
    });
  });

  describe('useColumnResize', () => {
    function mountColumnResizeHook(options: { overflow?: boolean; rightShadow?: boolean } = {}) {
      const parent = document.createElement('div');
      const content = document.createElement('div');
      const table = document.createElement('table');
      const tr = document.createElement('tr');
      const thList = ['a', 'b', 'c'].map((key, index) => {
        const th = document.createElement('th');
        th.dataset.colkey = key;
        vi.spyOn(th, 'getBoundingClientRect').mockReturnValue(createResizeRect(index * 100, 100));
        tr.appendChild(th);
        return th;
      });
      table.appendChild(tr);
      content.appendChild(table);
      parent.appendChild(content);
      vi.spyOn(content, 'getBoundingClientRect').mockReturnValue(createResizeRect(0, 300, 200));
      vi.spyOn(parent, 'getBoundingClientRect').mockReturnValue(createResizeRect(0, 300, 250));

      const getThWidthList = vi.fn(() => ({ a: 100, b: 100, c: 100 }));
      const updateThWidthList = vi.fn();
      const setTableElmWidth = vi.fn();
      const updateTableAfterColumnResize = vi.fn();
      const onColumnResizeChange = vi.fn();
      const params = {
        isWidthOverflow: ref(Boolean(options.overflow)),
        tableContentRef: ref(content),
        showColumnShadow: reactive({ left: false, right: Boolean(options.rightShadow) }),
        getThWidthList,
        updateThWidthList,
        setTableElmWidth,
        updateTableAfterColumnResize,
        onColumnResizeChange,
      };
      const Harness = defineComponent({
        setup(_, { expose }) {
          const hook = useColumnResize(params);
          expose(hook);
          return () => h('div');
        },
      });
      const wrapper = mount(Harness);
      const hook = wrapper.vm.$.exposed as ReturnType<typeof useColumnResize>;
      const resizeLine = document.createElement('div');
      hook.resizeLineRef.value = resizeLine;
      return {
        wrapper,
        hook,
        thList,
        getThWidthList,
        updateThWidthList,
        setTableElmWidth,
        updateTableAfterColumnResize,
        onColumnResizeChange,
      };
    }

    function createResizeRect(left: number, width: number, bottom = 40): DOMRect {
      return {
        x: left,
        y: 0,
        top: 0,
        bottom,
        left,
        right: left + width,
        width,
        height: bottom,
        toJSON: () => ({}),
      };
    }

    function dispatchDocumentMouse(type: 'mousemove' | 'mouseup', x = 0) {
      const event = new MouseEvent(type);
      Object.defineProperty(event, 'x', { value: x });
      document.dispatchEvent(event);
    }

    afterEach(() => {
      document.onselectstart = null;
      document.ondragstart = null;
      vi.restoreAllMocks();
    });

    it('resizes a column and its next resizable sibling', () => {
      const { hook, thList, updateThWidthList, setTableElmWidth, updateTableAfterColumnResize, onColumnResizeChange } =
        mountColumnResizeHook();
      const columns: BaseTableCol<TableRowData>[] = [
        { colKey: 'a', minWidth: 80 },
        { colKey: 'b', resize: { minWidth: 80, maxWidth: 200 } },
        { colKey: 'c' },
      ];
      hook.setEffectColMap(columns, null);

      hook.onColumnMouseover({ target: thList[0], pageX: 98 } as unknown as MouseEvent, columns[0]);
      expect(thList[0].style.cursor).toBe('col-resize');
      hook.onColumnMousedown({ x: 100 } as MouseEvent, columns[0], 0);
      expect(hook.resizeLineStyle.display).toBe('block');
      expect(document.onselectstart?.(new Event('selectstart'))).toBe(false);

      dispatchDocumentMouse('mousemove', 120);
      expect(hook.resizeLineStyle.left).toBe('120px');
      dispatchDocumentMouse('mouseup');

      expect(updateThWidthList).toHaveBeenCalledWith({ a: 120, b: 80, c: 100 });
      expect(setTableElmWidth).toHaveBeenCalledWith(300);
      expect(updateTableAfterColumnResize).toHaveBeenCalledTimes(1);
      expect(onColumnResizeChange).toHaveBeenCalledWith({ columnsWidth: { a: 120, b: 80, c: 100 } });
      expect(hook.resizeLineStyle.display).toBe('none');
    });

    it('supports the left edge, disabled siblings, overflow and min/max clamping', () => {
      const { hook, thList, updateThWidthList } = mountColumnResizeHook({ overflow: true });
      const columns: BaseTableCol<TableRowData>[] = [
        { colKey: 'a', resizable: false },
        { colKey: 'b', minWidth: '90', resize: { minWidth: 80, maxWidth: 130 } },
        { colKey: 'c' },
      ];
      hook.setEffectColMap(columns, null);

      hook.onColumnMouseover({ target: thList[1], pageX: 101 } as unknown as MouseEvent, columns[1]);
      expect(thList[1].style.cursor).toBe('col-resize');
      hook.onColumnMousedown({ x: 100 } as MouseEvent, columns[1], 1);
      dispatchDocumentMouse('mousemove', 1000);
      expect(hook.resizeLineStyle.left).toBe('600px');
      dispatchDocumentMouse('mouseup');
      expect(updateThWidthList).toHaveBeenCalled();

      hook.onColumnMouseover({ target: thList[2], pageX: 250 } as unknown as MouseEvent, columns[2]);
      expect(thList[2].style.cursor).toBe('');
    });

    it('handles an active right-fixed column and ignores non-leaf or non-resizable targets', () => {
      const { hook, thList, updateThWidthList } = mountColumnResizeHook({ rightShadow: true });
      const columns: BaseTableCol<TableRowData>[] = [
        { colKey: 'a' },
        { colKey: 'b', resizable: false },
        { colKey: 'c', fixed: 'right' },
      ];
      hook.setEffectColMap(columns, null);

      const unknown = document.createElement('th');
      unknown.dataset.colkey = 'unknown';
      hook.onColumnMouseover({ target: unknown, pageX: 0 } as unknown as MouseEvent, columns[0]);

      hook.onColumnMouseover({ target: thList[2], pageX: 201 } as unknown as MouseEvent, columns[2]);
      expect(thList[2].style.cursor).toBe('col-resize');
      hook.onColumnMousedown({ x: 200 } as MouseEvent, columns[2], 2);
      dispatchDocumentMouse('mousemove', 180);
      dispatchDocumentMouse('mouseup');
      expect(updateThWidthList).toHaveBeenCalled();

      hook.onColumnMouseover({ target: thList[1], pageX: 198 } as unknown as MouseEvent, columns[1]);
      expect(thList[1].style.cursor).toBe('');
      hook.onColumnMousedown({ x: 200 } as MouseEvent, columns[1], 1);
    });
  });

  describe('useColumnController', () => {
    function mountColumnControllerHook(overrides = {}) {
      const onDisplayColumnsChange = vi.fn();
      const onColumnChange = vi.fn();
      const onColumnControllerVisibleChange = vi.fn();
      const props = reactive({
        columns: [
          { colKey: 'id', title: 'ID' },
          {
            colKey: 'detail',
            title: 'Detail',
            children: [
              { colKey: 'name', title: 'Name' },
              { colKey: 'status', title: () => 'Status' },
            ],
          },
        ],
        columnController: { fields: ['id', 'name', 'status'] },
        displayColumns: undefined,
        defaultDisplayColumns: ['id', 'name'],
        columnControllerVisible: undefined,
        onDisplayColumnsChange,
        onColumnChange,
        onColumnControllerVisibleChange,
        ...overrides,
      }) as unknown as PrimaryTableProps;
      const Harness = defineComponent({
        setup(_, context) {
          const hook = useColumnController(props, context);
          context.expose(hook);
          return () => hook.renderColumnController();
        },
      });
      const wrapper = mount(Harness);
      return {
        props,
        wrapper,
        hook: wrapper.vm.$.exposed as ReturnType<typeof useColumnController>,
        onDisplayColumnsChange,
        onColumnChange,
        onColumnControllerVisibleChange,
      };
    }

    afterEach(() => {
      vi.restoreAllMocks();
      document.body.innerHTML = '';
    });

    it('opens the dialog, renders grouped options and confirms display columns', async () => {
      let dialogOptions: Record<string, unknown>;
      const dialog = { show: vi.fn(), hide: vi.fn() };
      const topContent = vi.fn(() => h('div', { class: 'controller-top' }, 'top'));
      const bottomContent = vi.fn(() => h('div', { class: 'controller-bottom' }, 'bottom'));
      const { wrapper, hook, onDisplayColumnsChange, onColumnChange } = mountColumnControllerHook({
        columnController: {
          fields: ['id', 'name'],
          displayType: 'fixed-width',
          groupColumns: [
            { label: 'Basic', value: 'basic', columns: ['id'] },
            { label: 'Detail', value: 'detail', columns: ['name', 'status'] },
          ],
          columnControllerTopContent: topContent,
          columnControllerBottomContent: bottomContent,
          checkboxProps: { theme: 'button' },
          buttonProps: { disabled: false },
          dialogProps: { width: 700 },
        },
      });
      const confirm = vi.spyOn(DialogPlugin, 'confirm').mockImplementation((options) => {
        dialogOptions = options as unknown as Record<string, unknown>;
        return dialog as never;
      });

      await wrapper.find('button').trigger('click');
      expect(confirm).toHaveBeenCalledTimes(1);
      expect(dialogOptions.width).toBe(700);
      const Body = defineComponent({
        setup() {
          return () => (dialogOptions.body as () => ReturnType<typeof h>)();
        },
      });
      const bodyWrapper = mount(Body);
      expect(bodyWrapper.find('.t-table__column-controller--fixed').exists()).toBe(true);
      expect(bodyWrapper.find('.controller-top').exists()).toBe(true);
      expect(bodyWrapper.find('.controller-bottom').exists()).toBe(true);
      expect(bodyWrapper.findAll('.t-table__column-controller-item')).toHaveLength(2);

      const group = bodyWrapper.findAllComponents({ name: 'ColumnCheckboxGroup' })[1];
      group.props('onChange')(['id', 'name', 'status'], {
        type: 'check',
        current: 'status',
        e: new Event('change'),
      });
      expect(onColumnChange).toHaveBeenCalled();
      expect(onColumnChange.mock.calls[0][0]).toMatchObject({ type: 'check' });

      (dialogOptions.onConfirm as () => void)();
      expect(onDisplayColumnsChange).toHaveBeenCalledWith(hook.columnCheckboxKeys.value);
      expect(dialog.hide).toHaveBeenCalledTimes(1);

      hook.columnCheckboxKeys.value = ['status'];
      (dialogOptions.onClose as () => void)();
      expect(hook.columnCheckboxKeys.value).toEqual(hook.tDisplayColumns.value);
      expect(dialog.hide).toHaveBeenCalledTimes(2);
    });

    it('reacts to controlled visibility and emits confirm/cancel updates', async () => {
      let dialogOptions: Record<string, unknown>;
      const dialog = { show: vi.fn(), hide: vi.fn() };
      const { props, wrapper, onColumnControllerVisibleChange } = mountColumnControllerHook({
        columnControllerVisible: false,
      });
      const confirm = vi.spyOn(DialogPlugin, 'confirm').mockImplementation((options) => {
        dialogOptions = options as unknown as Record<string, unknown>;
        return dialog as never;
      });
      expect(confirm).not.toHaveBeenCalled();

      props.columnControllerVisible = true;
      await nextTick();
      expect(confirm).toHaveBeenCalledTimes(1);
      props.columnControllerVisible = false;
      await nextTick();
      expect(dialog.hide).toHaveBeenCalledTimes(1);
      props.columnControllerVisible = true;
      await nextTick();
      expect(dialog.show).toHaveBeenCalledTimes(1);

      (dialogOptions.onConfirm as () => void)();
      expect(onColumnControllerVisibleChange).toHaveBeenCalledWith(false, { trigger: 'confirm' });
      expect(wrapper.emitted('update:columnControllerVisible').at(-1)).toEqual([false]);
      (dialogOptions.onClose as () => void)();
      expect(onColumnControllerVisibleChange).toHaveBeenLastCalledWith(false, { trigger: 'cancel' });
    });

    it('updates checkbox keys from controlled displayColumns and can hide the trigger', async () => {
      const { props, wrapper, hook } = mountColumnControllerHook({
        columnController: { fields: ['id'], hideTriggerButton: true },
        displayColumns: ['id'],
      });
      expect(wrapper.html()).toBe('');
      props.displayColumns = ['name'];
      await nextTick();
      expect(hook.columnCheckboxKeys.value).toEqual(['name']);
    });
  });

  describe('useDragSort', () => {
    function createDragTable(options: { multiHeader?: boolean; withFullRow?: boolean } = {}) {
      const root = document.createElement('div');
      const table = document.createElement('table');
      const thead = document.createElement('thead');
      const headerRows = options.multiHeader ? 2 : 1;
      for (let rowIndex = 0; rowIndex < headerRows; rowIndex++) {
        const tr = document.createElement('tr');
        ['id', 'name', 'status'].forEach((key) => {
          const th = document.createElement('th');
          th.dataset.colkey = key;
          const inner = document.createElement('div');
          inner.className = 't-table__th-cell-inner';
          th.appendChild(inner);
          tr.appendChild(th);
        });
        thead.appendChild(tr);
      }
      const tbody = document.createElement('tbody');
      if (options.withFullRow) {
        const full = document.createElement('tr');
        full.className = 't-table__row--full';
        tbody.appendChild(full);
      }
      ['3', '4'].forEach((id) => {
        const tr = document.createElement('tr');
        tr.dataset.id = id;
        tbody.appendChild(tr);
      });
      table.append(thead, tbody);
      root.appendChild(table);
      return { root, thead, tbody };
    }

    function mountDragSortHook(overrides = {}, showElement = true) {
      const onDragSort = vi.fn();
      const props = reactive({
        rowKey: 'id',
        data: [
          { id: 1, name: 'one' },
          { id: 2, name: 'two' },
          { id: 3, name: 'three' },
          { id: 4, name: 'four' },
        ],
        columns: [
          { colKey: 'id', title: 'ID' },
          { colKey: 'name', title: 'Name' },
          { colKey: 'status', title: 'Status' },
        ],
        dragSort: 'row',
        sortOnRowDraggable: false,
        disableDataPage: false,
        pagination: { current: 2, pageSize: 2 },
        onDragSort,
        ...overrides,
      }) as unknown as PrimaryTableProps;
      const visibility = ref(showElement);
      const Harness = defineComponent({
        setup(_, context) {
          const hook = useDragSort(
            props,
            context,
            computed(() => ({ showElement: visibility.value })),
          );
          context.expose(hook);
          return () => h('div');
        },
      });
      const wrapper = mount(Harness);
      return {
        props,
        visibility,
        wrapper,
        hook: wrapper.vm.$.exposed as ReturnType<typeof useDragSort>,
        onDragSort,
      };
    }

    function getSortable(element: HTMLElement) {
      return Sortable.get(element) as Sortable & {
        options: {
          handle?: string;
          onEnd: (event: Record<string, unknown>) => void;
          onMove?: (event: Record<string, unknown>) => boolean;
        };
      };
    }

    afterEach(() => {
      vi.useRealTimers();
      vi.restoreAllMocks();
      document.body.innerHTML = '';
    });

    it('restores controlled row DOM order and emits paginated row indexes', async () => {
      vi.useFakeTimers();
      const { hook, onDragSort } = mountDragSortHook({ firstFullRow: () => 'summary' });
      const { root, tbody } = createDragTable({ withFullRow: true });
      hook.setDragSortPrimaryTableRef({ $el: root, $refs: {} });
      await nextTick();
      vi.advanceTimersByTime(60);

      const sortable = getSortable(tbody);
      expect(sortable).toBeTruthy();
      const fullRow = tbody.children[0] as HTMLElement;
      expect(sortable.options.onMove({ related: fullRow })).toBe(false);
      expect(sortable.options.onMove({ related: tbody.children[1] })).toBe(true);

      const item = tbody.children[1] as HTMLElement;
      tbody.appendChild(item);
      sortable.options.onEnd({ oldIndex: 1, newIndex: 2, item, from: tbody, target: tbody });
      expect([...tbody.children].map((node) => (node as HTMLElement).dataset.id || 'full')).toEqual(['full', '3', '4']);
      expect(onDragSort).toHaveBeenCalledTimes(1);
      expect(onDragSort.mock.calls[0][0]).toMatchObject({
        currentIndex: 2,
        targetIndex: 3,
        current: { id: 3, name: 'three' },
        target: { id: 4, name: 'four' },
        sort: 'row',
      });
      expect(onDragSort.mock.calls[0][0].currentData).toEqual(onDragSort.mock.calls[0][0].newData);

      sortable.options.onEnd({ oldIndex: 1, newIndex: 1, item, from: tbody, target: tbody });
      expect(onDragSort).toHaveBeenCalledTimes(1);
    });

    it('uses a row handle and supports deprecated sortOnRowDraggable', async () => {
      vi.useFakeTimers();
      const error = vi.spyOn(log, 'error').mockImplementation(() => undefined);
      const { props, hook } = mountDragSortHook({
        dragSort: 'row-handler',
        sortOnRowDraggable: true,
        columns: [{ colKey: 'drag' }, { colKey: 'id' }],
      });
      const { root, tbody } = createDragTable();
      hook.setDragSortColumns([{ colKey: 'drag' }, { colKey: 'id' }]);
      hook.setDragSortPrimaryTableRef({ $el: root, $refs: {} });
      await nextTick();
      vi.advanceTimersByTime(60);

      expect(error).toHaveBeenCalled();
      expect(hook.isRowHandlerDraggable.value).toBe(true);
      expect(hook.isRowDraggable.value).toBe(true);
      expect(getSortable(tbody).options.handle).toBeNull();

      props.sortOnRowDraggable = false;
      hook.setDragSortColumns([{ colKey: 'drag' }, { colKey: 'id' }, { colKey: 'name' }]);
      await nextTick();
      vi.advanceTimersByTime(60);
      expect(getSortable(tbody).options.handle).toBe('.t-table__handle-draggable');
    });

    it('emits one-level and multi-level column drag changes', async () => {
      vi.useFakeTimers();
      const { hook, onDragSort } = mountDragSortHook({ dragSort: 'col', pagination: undefined });
      const { root, thead } = createDragTable();
      hook.setDragSortPrimaryTableRef({ $el: root, $refs: { affixHeaderRef: root.cloneNode(true) } });
      await nextTick();
      vi.advanceTimersByTime(60);
      vi.runOnlyPendingTimers();

      const header = thead.children[0] as HTMLElement;
      const sortable = getSortable(header);
      const item = header.children[0] as HTMLElement;
      header.appendChild(item);
      sortable.options.onEnd({ oldIndex: 0, newIndex: 2, item, from: header, target: header });
      expect([...header.children].map((node) => (node as HTMLElement).dataset.colkey)).toEqual([
        'id',
        'name',
        'status',
      ]);
      expect(onDragSort.mock.calls[0][0]).toMatchObject({ currentIndex: 0, targetIndex: 2, sort: 'col' });

      const multi = createDragTable({ multiHeader: true });
      hook.setDragSortPrimaryTableRef({ $el: multi.root, $refs: {} });
      await nextTick();
      vi.advanceTimersByTime(60);
      expect(getSortable(multi.thead.children[0] as HTMLElement)).toBeTruthy();
      expect(getSortable(multi.thead.children[1] as HTMLElement)).toBeTruthy();
    });

    it('skips registration until the element is visible and logs missing column keys', async () => {
      vi.useFakeTimers();
      const error = vi.spyOn(log, 'error').mockImplementation(() => undefined);
      const { hook, visibility } = mountDragSortHook({ dragSort: 'col' }, false);
      const { root, thead } = createDragTable();
      hook.setDragSortPrimaryTableRef({ $el: root, $refs: {} });
      await nextTick();
      vi.advanceTimersByTime(60);
      expect(Sortable.get(thead.children[0] as HTMLElement)).toBeUndefined();

      visibility.value = true;
      await nextTick();
      vi.advanceTimersByTime(60);
      const header = thead.children[0] as HTMLElement;
      const sortable = getSortable(header);
      const item = header.children[0] as HTMLElement;
      item.dataset.colkey = 'missing';
      header.appendChild(item);
      // 当前源码记录错误后仍继续读取空列的 colKey，因此会抛错。
      expect(() => sortable.options.onEnd({ oldIndex: 0, newIndex: 2, item, from: header, target: header })).toThrow();
      expect(error).toHaveBeenCalled();
    });
  });

  describe('useEditableRow', () => {
    function mountRowEditHook(overrides = {}) {
      const props = reactive({
        rowKey: 'id',
        data: [
          { id: 1, name: 'one' },
          { id: 2, name: '' },
        ],
        columns: [{ colKey: 'name', edit: { component: 'input' } }],
        editableRowKeys: [1, 2],
        ...overrides,
      }) as unknown as PrimaryTableProps;
      const Harness = defineComponent({
        setup(_, { expose }) {
          const hook = useRowEdit(props);
          expose(hook);
          return () => h('div');
        },
      });
      const wrapper = mount(Harness);
      return { props, wrapper, hook: wrapper.vm.$.exposed as ReturnType<typeof useRowEdit> };
    }

    it('collects row rules and validates one row', async () => {
      const onRowValidate = vi.fn();
      const { hook } = mountRowEditHook({ onRowValidate });
      const col: PrimaryTableCol<TableRowData> = {
        colKey: 'name',
        edit: { component: 'input', rules: [{ required: true, message: 'required' }] },
      };
      const context: PrimaryTableRowEditContext<TableRowData> = {
        row: { id: 2, name: '' },
        rowIndex: 1,
        col,
        colIndex: 0,
        value: '',
        editedRow: { id: 2, name: '' },
      };
      hook.onRuleChange(context);
      hook.onRuleChange(context);

      const result = await hook.validateRowData(2);
      expect(result.trigger).toBe('parent');
      expect(result.result[0].errorList[0].message).toBe('required');
      expect(onRowValidate).toHaveBeenCalledWith(result);
      expect(hook.errorListMap.value['2__name'][0].message).toBe('required');

      hook.clearValidateRowData();
      expect(hook.errorListMap.value).toEqual({});
    });

    it('validates mounted editing cells and ignores deleted rows', async () => {
      const onValidate = vi.fn();
      const { hook } = mountRowEditHook({ onValidate });
      const context = {
        row: { id: 1, name: 'one' },
        rowIndex: 0,
        col: { colKey: 'name', edit: { component: 'input' } },
        colIndex: 0,
        value: 'one',
        editedRow: { id: 1, name: 'one' },
        isEdit: true,
        validateEdit: vi.fn().mockResolvedValue([{ result: false, message: 'cell error' }]),
      };
      hook.onPrimaryTableCellEditChange(context);
      hook.onPrimaryTableCellEditChange({ ...context, row: { id: 99, name: 'deleted' }, rowIndex: 1 });

      const result = await hook.validateTableData();
      expect(result.result['1_name'][0].message).toBe('cell error');
      expect(result.result['99_name']).toBeUndefined();
      expect(onValidate).toHaveBeenCalledWith(result);

      hook.onPrimaryTableCellEditChange({ ...context, isEdit: false });
    });

    it('validates keepEditMode columns for every data row', async () => {
      const columns: PrimaryTableCol<TableRowData>[] = [
        {
          colKey: 'name',
          edit: { component: 'input', keepEditMode: true, rules: () => [{ required: true, message: 'required' }] },
          children: [],
        },
      ];
      const { hook } = mountRowEditHook({ columns });
      hook.onUpdateEditedCell(1, { id: 1, name: 'one' }, { name: '' });
      const result = await hook.validateTableCellData();

      expect(Object.keys(result.result)).toEqual(['1_name', '2_name']);
      expect(hook.errorListMap.value['1__name'][0].message).toBe('required');
    });

    it('updates edited rows, manages cell instances and clears exited edit rows', async () => {
      const clearValidateCellData = vi.fn();
      const { props, hook } = mountRowEditHook();
      const row = { id: 1, name: 'one', nested: { value: 1 } };
      const col = { colKey: 'nested.value', edit: { component: 'input' } };
      hook.onUpdateEditedCell(1, row, { name: 'next', 'nested.value': 2 });
      expect(hook.getEditRowData({ row, col, rowIndex: 0, colIndex: 0 }).nested.value).toBe(2);

      hook.onCellInstanceChange('1_name', { clearValidateCellData });
      hook.clearAllEditableCellData();
      expect(clearValidateCellData).toHaveBeenCalledTimes(1);
      hook.onCellInstanceChange('1_name', null);
      hook.clearAllEditableCellData();
      expect(clearValidateCellData).toHaveBeenCalledTimes(1);

      props.editableRowKeys = [2];
      await nextTick();
      expect(hook.editedFormData.value[1]).toBeUndefined();
      expect(hook.getEditRowData({ row, col, rowIndex: 0, colIndex: 0 })).toBe(row);
    });
  });
});
