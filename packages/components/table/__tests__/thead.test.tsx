import { nextTick, ref } from 'vue';
import { mount } from '@vue/test-utils';
import { expect, vi } from 'vitest';
import THead from '@tdesign/components/table/components/thead';
import type { TheadProps } from '@tdesign/components/table/components/thead';
import Ellipsis from '@tdesign/components/table/components/ellipsis';
import type { BaseTableCol, TableRowData } from '@tdesign/components/table/type';

describe('THead', () => {
  function createSpans(thList: BaseTableCol<TableRowData>[][]) {
    return new Map(thList.flat().map((col) => [col, { rowspan: 1, colspan: 1 }]));
  }

  function mountHead(overrides: Partial<TheadProps> = {}) {
    const thList = overrides.thList || [[{ colKey: 'name', title: 'Name' }]];
    const onColumnMouseover = vi.fn();
    const onColumnMousedown = vi.fn();
    const props: TheadProps = {
      classPrefix: 't',
      ellipsisOverlayClassName: 'table-overlay',
      isFixedHeader: false,
      rowAndColFixedPosition: new Map(),
      thList,
      spansAndLeafNodes: {
        rowspanAndColspanMap: createSpans(thList),
        leafColumns: thList.at(-1),
      },
      columnResizeParams: {
        resizeLineRef: ref(document.createElement('div')),
        resizeLineStyle: {},
        onColumnMouseover,
        onColumnMousedown,
      },
      showColumnShadow: { left: false, right: false },
      ...overrides,
    };
    return {
      wrapper: mount(THead, { props }),
      onColumnMouseover,
      onColumnMousedown,
    };
  }

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('props', () => {
    it(':isFixedHeader / bordered / isMultipleHeader[boolean]', () => {
      const columns: BaseTableCol<TableRowData>[] = [
        {
          colKey: 'left',
          title: 'Left',
          fixed: 'left',
          align: 'center',
          className: 'column-class',
          thClassName: () => 'header-class',
          attrs: ({ type }) => ({ 'data-cell-type': type }),
        },
        { colKey: 'right', title: 'Right', fixed: 'right' },
      ];
      const positions = new Map([
        ['left', { left: 12, lastLeftFixedCol: true }],
        ['right', { right: 8, firstRightFixedCol: true }],
      ]);
      const { wrapper } = mountHead({
        thList: [columns],
        rowAndColFixedPosition: positions,
        thWidthList: { left: 120, right: 90 },
        isFixedHeader: true,
        bordered: true,
        isMultipleHeader: true,
        thDraggable: true,
        showColumnShadow: { left: true, right: true },
      });

      expect(wrapper.classes()).toEqual(
        expect.arrayContaining(['t-table__header--fixed', 't-table--bordered', 't-table__header--multiple']),
      );
      const headers = wrapper.findAll('th');
      expect(headers[0].classes()).toEqual(
        expect.arrayContaining([
          'column-class',
          'header-class',
          't-align-center',
          't-table__cell--fixed-left',
          't-table__cell--fixed-left-last',
        ]),
      );
      expect(headers[0].attributes('data-cell-type')).toBe('th');
      expect(headers[0].attributes('style')).toContain('left: 12px');
      expect(headers[0].attributes('style')).toContain('width: 120px');
      expect(headers[1].classes()).toEqual(
        expect.arrayContaining(['t-table__cell--fixed-right', 't-table__cell--fixed-right-first']),
      );
      expect(headers[1].attributes('style')).toContain('right: 8px');
      expect(headers[1].classes()).not.toContain('t-table__th--drag-sort');
    });

    it(':thList[array] handles nested headers, row spans and colspan skipping', () => {
      const childOne: BaseTableCol<TableRowData> = { colKey: 'one', title: 'One', colspan: 2 };
      const childTwo: BaseTableCol<TableRowData> = { colKey: 'two', title: 'Two' };
      const group: BaseTableCol<TableRowData> = {
        colKey: 'group',
        title: 'Group',
        children: [childOne, childTwo],
      };
      const thList = [[group], [childOne, childTwo]];
      const rowspanAndColspanMap = createSpans(thList);
      rowspanAndColspanMap.set(group, { rowspan: 2, colspan: 1 });
      rowspanAndColspanMap.set(childOne, { rowspan: 1, colspan: 2 });
      const { wrapper } = mountHead({
        thList,
        isMultipleHeader: true,
        bordered: true,
        spansAndLeafNodes: { rowspanAndColspanMap, leafColumns: [childOne, childTwo] },
      });

      expect(wrapper.findAll('tr')).toHaveLength(2);
      expect(wrapper.findAll('tr')[1].findAll('th')).toHaveLength(1);
      const childHeader = wrapper.findAll('tr')[1].find('th');
      expect(childHeader.attributes('colspan')).toBe('2');
      expect(childHeader.classes()).toContain('t-table__header-th--bordered');
    });

    it(':ellipsisTitle[boolean/function/object] renders content and resolves the table attach node', async () => {
      const functionContent = vi.fn((_h, { colIndex }) => `function-${colIndex}`);
      const objectContent = vi.fn((_h, { colIndex }) => `object-${colIndex}`);
      const columns: BaseTableCol<TableRowData>[] = [
        { colKey: 'function', title: 'Function', ellipsisTitle: functionContent },
        {
          colKey: 'object',
          title: 'Object',
          ellipsisTitle: { content: objectContent, props: { theme: 'light' } },
        },
        { colKey: 'tooltip', title: 'Tooltip', ellipsisTitle: { placement: 'top' } },
        { colKey: 'ellipsis', title: 'Ellipsis', ellipsis: true },
      ];
      const { wrapper } = mountHead({ thList: [columns] });
      const table = wrapper.element.parentElement;
      table.classList.add('t-table');
      await wrapper.setProps({ isFixedHeader: true });
      await nextTick();

      const ellipses = wrapper.findAllComponents(Ellipsis);
      expect(ellipses).toHaveLength(4);
      const attach = ellipses[0].props('attach') as () => HTMLElement;
      const firstTooltipContent = ellipses[0].props('tooltipContent') as () => string;
      const secondTooltipContent = ellipses[1].props('tooltipContent') as () => string;
      expect(attach()).toBe(table);
      expect(firstTooltipContent()).toBe('function-0');
      expect(secondTooltipContent()).toBe('object-1');
      expect(ellipses[1].props('tooltipProps')).toMatchObject({ theme: 'light' });
      expect(ellipses[2].props('tooltipProps')).toMatchObject({ placement: 'top' });
      expect(functionContent).toHaveBeenCalled();
      expect(objectContent).toHaveBeenCalled();
    });
  });

  describe('events', () => {
    it('mousemove and mousedown delegate resizing and disable dragging for a shadowed fixed column', async () => {
      vi.useFakeTimers();
      const columns: BaseTableCol<TableRowData>[] = [
        { colKey: 'normal', title: 'Normal' },
        { colKey: 'fixed', title: 'Fixed', fixed: 'left' },
      ];
      const { wrapper, onColumnMouseover, onColumnMousedown } = mountHead({
        thList: [columns],
        resizable: true,
        thDraggable: true,
        showColumnShadow: { left: true, right: false },
      });
      const headers = wrapper.findAll('th');
      headers[0].element.setAttribute('draggable', 'true');
      headers[1].element.setAttribute('draggable', 'true');

      await headers[0].trigger('mousemove');
      await headers[0].trigger('mousedown');
      await headers[1].trigger('mousedown');
      expect(onColumnMouseover).toHaveBeenCalledWith(expect.any(MouseEvent), columns[0]);
      expect(onColumnMousedown).toHaveBeenNthCalledWith(1, expect.any(MouseEvent), columns[0], 0);
      expect(onColumnMousedown).toHaveBeenNthCalledWith(2, expect.any(MouseEvent), columns[1], 1);

      vi.advanceTimersByTime(11);
      expect(headers[0].attributes('draggable')).toBe('true');
      expect(headers[1].attributes('draggable')).toBeUndefined();
    });
  });
});
