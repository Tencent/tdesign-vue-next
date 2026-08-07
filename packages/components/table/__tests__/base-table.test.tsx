import { nextTick, ref } from 'vue';
import { mount } from '@vue/test-utils';
import { expect, vi } from 'vitest';
import { BaseTable } from '@tdesign/components/table';
import type { PrimaryTableCol, TableRowData, TableRowspanAndColspanFunc } from '@tdesign/components/table/type';
import { getTableData, SIMPLE_COLUMNS, getNormalTableMount, getEmptyDataTableMount } from './mount';
import log from '@tdesign/common-js/log/index';

describe('BaseTable', () => {
  {
    const data = getTableData();

    describe('props', () => {
      function mountTable(props = {}, slots = {}) {
        return mount(BaseTable, {
          props: { rowKey: 'index', data, columns: SIMPLE_COLUMNS, ...props },
          slots,
        });
      }

      describe(':bordered[boolean]', () => {
        it('bordered is false by default', () => {
          expect(mountTable().find('.t-table--bordered').exists()).toBe(false);
        });

        it('bordered={true} works fine', () => {
          expect(mountTable({ bordered: true }).find('.t-table--bordered').exists()).toBe(true);
        });

        it('bordered={false} works fine', () => {
          expect(mountTable({ bordered: false }).find('.t-table--bordered').exists()).toBe(false);
        });
      });

      describe(':hover[boolean]', () => {
        it('hover is false by default', () => {
          expect(mountTable().classes('t-table--hoverable')).toBe(false);
        });

        it('hover={true} works fine', () => {
          expect(mountTable({ hover: true }).classes('t-table--hoverable')).toBe(true);
        });
      });

      describe(':stripe[boolean]', () => {
        it('stripe is false by default', () => {
          expect(mountTable().classes('t-table--striped')).toBe(false);
        });

        it('stripe={true} works fine', () => {
          expect(mountTable({ stripe: true }).classes('t-table--striped')).toBe(true);
        });
      });

      describe(':resizable[boolean]', () => {
        it('resizable is false by default', () => {
          expect(mountTable().classes('t-table--column-resizable')).toBe(false);
        });

        it('resizable={true} works fine', () => {
          expect(mountTable({ resizable: true }).classes('t-table--column-resizable')).toBe(true);
        });
      });

      describe(':size[string]', () => {
        it("size='small' works fine", () => {
          expect(mountTable({ size: 'small' }).classes('t-size-s')).toBe(true);
        });

        it("size='medium' does not need extra class", () => {
          expect(mountTable({ size: 'medium' }).classes('t-size-m')).toBe(false);
        });

        it("size='large' works fine", () => {
          expect(mountTable({ size: 'large' }).classes('t-size-l')).toBe(true);
        });
      });

      describe(':verticalAlign[string]', () => {
        it("verticalAlign='top' works fine", () => {
          expect(mountTable({ verticalAlign: 'top' }).classes('t-vertical-align-top')).toBe(true);
        });

        it("verticalAlign='middle' does not need extra class", () => {
          expect(mountTable({ verticalAlign: 'middle' }).classes('t-vertical-align-middle')).toBe(false);
        });

        it("verticalAlign='bottom' works fine", () => {
          expect(mountTable({ verticalAlign: 'bottom' }).classes('t-vertical-align-bottom')).toBe(true);
        });
      });

      describe(':tableLayout[string]', () => {
        it("tableLayout='auto' works fine", () => {
          expect(mountTable({ tableLayout: 'auto' }).find('table.t-table--layout-auto').exists()).toBe(true);
        });

        it("tableLayout='fixed' is used by default", () => {
          expect(mountTable().find('table.t-table--layout-fixed').exists()).toBe(true);
        });
      });

      describe(':showHeader[boolean]', () => {
        it('showHeader is true by default', () => {
          expect(mountTable().find('thead').exists()).toBe(true);
        });

        it('showHeader={false} works fine', () => {
          expect(mountTable({ showHeader: false }).find('thead').exists()).toBe(false);
        });
      });

      describe(':rowAttributes[object/array/function]', () => {
        it('rowAttributes could be an object', () => {
          const wrapper = mountTable({ rowAttributes: { 'data-level': 'level-1' } });
          expect(wrapper.find('tbody tr').attributes('data-level')).toBe('level-1');
        });

        it('rowAttributes could be an Array<object>', () => {
          const wrapper = mountTable({
            rowAttributes: [{ 'data-level': 'level-1' }, { 'data-name': 'tdesign' }],
          });
          const tr = wrapper.find('tbody tr');
          expect(tr.attributes('data-level')).toBe('level-1');
          expect(tr.attributes('data-name')).toBe('tdesign');
        });

        it('rowAttributes could be a function', () => {
          const wrapper = mountTable({
            rowAttributes: () => [{ 'data-level': 'level-1' }, { 'data-name': 'tdesign' }],
          });
          const tr = wrapper.find('tbody tr');
          expect(tr.attributes('data-level')).toBe('level-1');
          expect(tr.attributes('data-name')).toBe('tdesign');
        });

        it('rowAttributes could be an Array<Function>', () => {
          const wrapper = mountTable({
            rowAttributes: [() => [{ 'data-level': 'level-1' }, { 'data-name': 'tdesign' }]],
          });
          const tr = wrapper.find('tbody tr');
          expect(tr.attributes('data-level')).toBe('level-1');
          expect(tr.attributes('data-name')).toBe('tdesign');
        });
      });

      describe(':rowClassName[string/object/array/function]', () => {
        it('rowClassName could be a string', () => {
          expect(mountTable({ rowClassName: 'tdesign-class' }).find('tbody tr').classes('tdesign-class')).toBe(true);
        });

        it('rowClassName could be an object', () => {
          const wrapper = mountTable({
            rowClassName: { 'tdesign-class': true, 'tdesign-class-next': false },
          });
          const tr = wrapper.find('tbody tr');
          expect(tr.classes('tdesign-class')).toBe(true);
          expect(tr.classes('tdesign-class-next')).toBe(false);
        });

        it('rowClassName could be an array', () => {
          const wrapper = mountTable({
            rowClassName: ['tdesign-class-default', { 'tdesign-class': true, 'tdesign-class-next': false }],
          });
          const tr = wrapper.find('tbody tr');
          expect(tr.classes('tdesign-class-default')).toBe(true);
          expect(tr.classes('tdesign-class')).toBe(true);
          expect(tr.classes('tdesign-class-next')).toBe(false);
        });

        it('rowClassName could be a function', () => {
          const wrapper = mountTable({
            rowClassName: ({ row }: { row: TableRowData }) => `row-class-${row.index}`,
          });
          expect(wrapper.find('tbody tr').classes('row-class-1')).toBe(true);
        });
      });

      describe(':empty[string/TNode]', () => {
        it('empty text is 暂无数据 by default', () => {
          const wrapper = mountTable({ data: [] });
          expect(wrapper.find('.t-table__empty').text()).toBe('暂无数据');
        });

        it('empty could be a string', () => {
          const wrapper = mountTable({ data: [], empty: 'Empty Data' });
          expect(wrapper.find('.t-table__empty').text()).toBe('Empty Data');
        });

        it('empty works fine as a function', () => {
          const wrapper = mountTable({ data: [], empty: () => <div class="custom-node">empty node</div> });
          expect(wrapper.find('.t-table__empty .custom-node').exists()).toBe(true);
        });

        it('slots.empty works fine', () => {
          const wrapper = mountTable({ data: [] }, { empty: () => <div class="custom-node">empty node</div> });
          expect(wrapper.find('.t-table__empty .custom-node').exists()).toBe(true);
        });
      });

      describe(':firstFullRow[string/TNode]', () => {
        it('firstFullRow could be a string', () => {
          const wrapper = mountTable({ firstFullRow: 'This is a full row at first.' });
          expect(wrapper.find('.t-table__row--full').exists()).toBe(true);
        });

        it('firstFullRow works fine as a function', () => {
          const wrapper = mountTable({ firstFullRow: () => <span class="custom-node">first</span> });
          expect(wrapper.find('.t-table__first-full-row').exists()).toBe(true);
          expect(wrapper.find('.custom-node').exists()).toBe(true);
        });

        it('slots.firstFullRow works fine', () => {
          const wrapper = mountTable({}, { firstFullRow: () => <span class="custom-node">first</span> });
          expect(wrapper.find('.t-table__first-full-row').exists()).toBe(true);
          expect(wrapper.find('.custom-node').exists()).toBe(true);
        });

        // 插槽同时支持中划线写法
        it('slots[first-full-row] works fine', () => {
          const wrapper = mountTable({}, { 'first-full-row': () => <span class="custom-node">first</span> });
          expect(wrapper.find('.t-table__first-full-row').exists()).toBe(true);
          expect(wrapper.find('.custom-node').exists()).toBe(true);
        });
      });

      describe(':lastFullRow[string/TNode]', () => {
        it('lastFullRow could be a string', () => {
          const wrapper = mountTable({ lastFullRow: 'This is a full row at last.' });
          expect(wrapper.find('.t-table__row--full').exists()).toBe(true);
        });

        it('lastFullRow works fine as a function', () => {
          const wrapper = mountTable({ lastFullRow: () => <span class="custom-node">last</span> });
          expect(wrapper.find('.t-table__last-full-row').exists()).toBe(true);
          expect(wrapper.find('.custom-node').exists()).toBe(true);
        });

        it('slots.lastFullRow works fine', () => {
          const wrapper = mountTable({}, { lastFullRow: () => <span class="custom-node">last</span> });
          expect(wrapper.find('.t-table__last-full-row').exists()).toBe(true);
        });

        it('slots[last-full-row] works fine', () => {
          const wrapper = mountTable({}, { 'last-full-row': () => <span class="custom-node">last</span> });
          expect(wrapper.find('.t-table__last-full-row').exists()).toBe(true);
        });
      });

      describe(':topContent[string/TNode]', () => {
        it('topContent could be a string', () => {
          const wrapper = mountTable({ topContent: 'This is top content' });
          expect(wrapper.find('.t-table__top-content').text()).toBe('This is top content');
        });

        it('topContent works fine as a function', () => {
          const wrapper = mountTable({ topContent: () => <span class="custom-node">top</span> });
          expect(wrapper.find('.t-table__top-content .custom-node').exists()).toBe(true);
        });

        it('slots.topContent works fine', () => {
          const wrapper = mountTable({}, { topContent: () => <span class="custom-node">top</span> });
          expect(wrapper.find('.t-table__top-content .custom-node').exists()).toBe(true);
        });

        it('slots[top-content] works fine', () => {
          const wrapper = mountTable({}, { 'top-content': () => <span class="custom-node">top</span> });
          expect(wrapper.find('.t-table__top-content .custom-node').exists()).toBe(true);
        });
      });

      describe(':bottomContent[string/TNode]', () => {
        it('bottomContent works fine as a function', () => {
          const wrapper = mountTable({ bottomContent: () => <span class="custom-node">bottom</span> });
          expect(wrapper.find('.t-table__bottom-content .custom-node').exists()).toBe(true);
        });

        it('slots.bottomContent works fine', () => {
          const wrapper = mountTable({}, { bottomContent: () => <span class="custom-node">bottom</span> });
          expect(wrapper.find('.t-table__bottom-content .custom-node').exists()).toBe(true);
        });

        it('slots[bottom-content] works fine', () => {
          const wrapper = mountTable({}, { 'bottom-content': () => <span class="custom-node">bottom</span> });
          expect(wrapper.find('.t-table__bottom-content .custom-node').exists()).toBe(true);
        });
      });

      describe(':loading[boolean/TNode]', () => {
        it('loading is not rendered by default', () => {
          expect(mountTable().find('.t-loading').exists()).toBe(false);
        });

        it('loading={true} renders loading indicator only', () => {
          const wrapper = mountTable({ loading: true });
          expect(wrapper.find('.t-icon-loading').exists()).toBe(true);
          expect(wrapper.find('.t-loading__text').exists()).toBe(false);
        });

        it('loading works fine as a function', () => {
          const wrapper = mountTable({ loading: () => 'function loading' });
          expect(wrapper.find('.t-loading__text').text()).toBe('function loading');
        });

        it('loadingProps.indicator={false} hides loading icon', () => {
          const wrapper = mountTable({ loading: () => 'function loading', loadingProps: { indicator: false } });
          expect(wrapper.find('.t-icon-loading').exists()).toBe(false);
          expect(wrapper.find('.t-loading__text').text()).toBe('function loading');
        });

        it('slots.loading works fine', () => {
          const wrapper = mountTable({ loading: true }, { loading: () => <span class="custom-node">slots</span> });
          expect(wrapper.find('.t-loading .custom-node').exists()).toBe(true);
        });
      });

      describe(':filterIcon[TNode]', () => {
        const filterColumns = SIMPLE_COLUMNS.map((item) => ({
          ...item,
          filter: { type: 'single', list: [{ label: 'one', value: 1 }] },
        }));

        it('filterIcon works fine as a function', () => {
          const wrapper = mountTable({ columns: filterColumns, filterIcon: () => '筛' });
          // BaseTable 不支持筛选功能
          if (BaseTable.name === 'TBaseTable') {
            expect(wrapper.find('.t-table__filter-icon').exists()).toBe(false);
          } else {
            expect(wrapper.find('.t-table__filter-icon').text()).toBe('筛');
          }
        });

        it('slots.filterIcon works fine', () => {
          const wrapper = mountTable(
            { columns: filterColumns },
            { filterIcon: (params: { col: PrimaryTableCol<TableRowData> }) => `筛${params.col.colKey}` },
          );
          if (BaseTable.name === 'TBaseTable') {
            expect(wrapper.find('.t-table__filter-icon').exists()).toBe(false);
          } else {
            const iconList = wrapper.findAll('.t-table__filter-icon');
            SIMPLE_COLUMNS.forEach((col, index) => {
              expect(iconList[index].text()).toBe(`筛${col.colKey}`);
            });
          }
        });
      });
    });
  }

  {
    describe('props', () => {
      describe(':footData[array] / footerSummary[TNode] / cellEmptyContent[TNode]', () => {
        it('props.footData renders tfoot', () => {
          const wrapper = getNormalTableMount();
          expect(wrapper.find('tfoot.t-table__footer').exists()).toBe(true);
          expect(wrapper.findAll('tfoot > tr')).toHaveLength(2);
        });

        it('props.footerSummary works fine', () => {
          const wrapper = getNormalTableMount({ footerSummary: () => <span class="custom-node">summary</span> });
          expect(wrapper.find('.custom-node').exists()).toBe(true);
          expect(wrapper.find('.t-table__row-full-element').exists()).toBe(true);
          expect(wrapper.find('td[colspan="3"]').exists()).toBe(true);
        });

        it('slots.footerSummary works fine', () => {
          const wrapper = getNormalTableMount({
            'v-slots': { footerSummary: () => <span class="custom-node">summary</span> },
          });
          expect(wrapper.find('.custom-node').exists()).toBe(true);
          expect(wrapper.find('.t-table__row-full-element').exists()).toBe(true);
        });

        it('slots[footer-summary] works fine', () => {
          const wrapper = getNormalTableMount({
            'v-slots': { 'footer-summary': () => <span class="custom-node">summary</span> },
          });
          expect(wrapper.find('.custom-node').exists()).toBe(true);
        });

        it('props.cellEmptyContent works fine', () => {
          const wrapper = getNormalTableMount({ cellEmptyContent: () => <span class="custom-node">empty cell</span> });
          expect(wrapper.find('.custom-node').exists()).toBe(true);
        });

        it('slots.cellEmptyContent works fine', () => {
          const wrapper = getNormalTableMount({
            'v-slots': { cellEmptyContent: () => <span class="custom-node">empty cell</span> },
          });
          expect(wrapper.find('.custom-node').exists()).toBe(true);
        });

        it('slots[cell-empty-content] works fine', () => {
          const wrapper = getNormalTableMount({
            'v-slots': { 'cell-empty-content': () => <span class="custom-node">empty cell</span> },
          });
          expect(wrapper.find('.custom-node').exists()).toBe(true);
        });

        it('props.empty works fine with empty data', () => {
          const wrapper = getEmptyDataTableMount({ empty: () => <span class="custom-node">empty</span> });
          expect(wrapper.find('.custom-node').exists()).toBe(true);
        });

        it('props.fixedRows works fine', () => {
          const wrapper = getNormalTableMount({ fixedRows: [3, 1] });
          expect(wrapper.findAll('.t-table__row--fixed-top')).toHaveLength(3);
          expect(wrapper.findAll('.t-table__row--fixed-bottom')).toHaveLength(1);
        });
      });
    });
  }

  {
    const data = getTableData();

    describe('props', () => {
      describe(':columns[array]', () => {
        function mountTable(columns: PrimaryTableCol<TableRowData>[], props = {}) {
          return mount(BaseTable, { props: { rowKey: 'index', data, columns, ...props } });
        }

        describe('align[string]', () => {
          it('align works fine', () => {
            const tdList = mountTable([
              { title: 'Index', colKey: 'index', align: 'center' },
              { title: 'Applicant', colKey: 'applicant', align: 'left' },
              { title: 'Channel', colKey: 'channel' },
              { title: 'Matters', colKey: 'matters', align: 'right' },
            ])
              .find('tbody tr')
              .findAll('td');

            expect(tdList[0].classes('t-align-center')).toBe(true);
            // 左对齐为默认值，不需要额外类名
            expect(tdList[1].classes('t-align-left')).toBe(false);
            expect(tdList[2].classes('t-align-left')).toBe(false);
            expect(tdList[3].classes('t-align-right')).toBe(true);
          });

          it('align works fine on th', () => {
            const thList = mountTable([
              { title: 'Index', colKey: 'index', align: 'center' },
              { title: 'Applicant', colKey: 'applicant', align: 'right' },
            ]).findAll('thead th');

            expect(thList[0].classes('t-align-center')).toBe(true);
            expect(thList[1].classes('t-align-right')).toBe(true);
          });
        });

        describe('attrs[object/function]', () => {
          it('attrs works fine as an object', () => {
            const tdList = mountTable([
              { title: 'Index', colKey: 'index' },
              { title: 'Applicant', colKey: 'applicant', attrs: { 'col-key': 'applicant' } },
            ])
              .find('tbody tr')
              .findAll('td');
            expect(tdList[1].attributes('col-key')).toBe('applicant');
          });

          it('attrs works fine as a function', () => {
            const tdList = mountTable([
              { title: 'Index', colKey: 'index', attrs: () => ({ 'data-type': 'index' }) },
              { title: 'Applicant', colKey: 'applicant' },
            ])
              .find('tbody tr')
              .findAll('td');
            expect(tdList[0].attributes('data-type')).toBe('index');
          });
        });

        describe('className[string/object/array/function]', () => {
          it('className supports string / array / object / function', () => {
            const tdList = mountTable([
              { title: 'Index', colKey: 'index', className: () => ['tdesign-class'] },
              { title: 'Applicant', colKey: 'applicant', className: 'tdesign-class' },
              { title: 'Channel', colKey: 'channel', className: [{ 'tdesign-class': true }] },
              {
                title: 'Matters',
                colKey: 'matters',
                className: { 'tdesign-class': true, 'tdesign-class1': false },
              },
            ])
              .find('tbody tr')
              .findAll('td');

            tdList.forEach((td) => expect(td.classes('tdesign-class')).toBe(true));
            expect(tdList[3].classes('tdesign-class1')).toBe(false);
          });
        });

        describe('thClassName[string/object/array/function]', () => {
          it('thClassName supports string / array / object / function', () => {
            const thList = mountTable([
              { title: 'Index', colKey: 'index', thClassName: () => ['th-class'] },
              { title: 'Applicant', colKey: 'applicant', thClassName: 'th-class' },
              { title: 'Channel', colKey: 'channel', thClassName: [{ 'th-class': true }] },
              { title: 'Matters', colKey: 'matters', thClassName: { 'th-class': true, 'th-class1': false } },
            ]).findAll('thead th');

            thList.forEach((th) => expect(th.classes('th-class')).toBe(true));
            expect(thList[3].classes('th-class1')).toBe(false);
          });
        });

        describe('width/minWidth[string/number]', () => {
          it('column.width works fine', () => {
            const colList = mountTable([
              { title: 'Index', colKey: 'index', width: 100 },
              { title: 'Applicant', colKey: 'applicant' },
            ]).findAll('col');
            expect(colList[0].attributes('style')).toContain('100px');
          });

          it('column.minWidth works fine', () => {
            const colList = mountTable([
              { title: 'Index', colKey: 'index', minWidth: 120 },
              { title: 'Applicant', colKey: 'applicant' },
            ]).findAll('col');
            expect(colList[0].attributes('style')).toContain('120px');
          });
        });

        describe('title/cell[TNode]', () => {
          it('column.title works fine as a function', () => {
            const wrapper = mountTable([{ colKey: 'index', title: () => <span class="custom-title">Index</span> }]);
            expect(wrapper.find('thead .custom-title').exists()).toBe(true);
          });

          it('column.cell works fine as a function', () => {
            const wrapper = mountTable([
              // cell 的函数签名为 (h, params)
              {
                colKey: 'index',
                title: 'Index',
                cell: (h, { row }: { row: TableRowData }) => <span class="custom-cell">{row.index}</span>,
              },
            ]);
            expect(wrapper.find('tbody .custom-cell').text()).toBe('1');
          });

          it('column.ellipsis works fine', () => {
            const wrapper = mountTable([{ colKey: 'index', title: 'Index', ellipsis: true }]);
            expect(wrapper.find('tbody .t-table__ellipsis').exists()).toBe(true);
          });

          it('column.ellipsisTitle works fine', () => {
            const wrapper = mountTable([{ colKey: 'index', title: 'Index', ellipsisTitle: true }]);
            expect(wrapper.find('thead .t-table__ellipsis').exists()).toBe(true);
          });
        });

        describe('fixed[string]', () => {
          // jsdom 下表格宽度无溢出，单元格不会附加 fixed 类名，此处校验表格级类名
          it("fixed='left' enables column fixed mode", () => {
            const wrapper = mountTable([
              { title: 'Index', colKey: 'index', fixed: 'left', width: 100 },
              { title: 'Applicant', colKey: 'applicant', width: 100 },
            ]);
            expect(wrapper.find('.t-table--column-fixed').exists()).toBe(true);
          });

          it("fixed='right' enables column fixed mode", () => {
            const wrapper = mountTable([
              { title: 'Index', colKey: 'index', width: 100 },
              { title: 'Applicant', colKey: 'applicant', fixed: 'right', width: 100 },
            ]);
            expect(wrapper.find('.t-table--column-fixed').exists()).toBe(true);
          });

          it('column fixed mode is disabled without fixed column', () => {
            const wrapper = mountTable([
              { title: 'Index', colKey: 'index', width: 100 },
              { title: 'Applicant', colKey: 'applicant', width: 100 },
            ]);
            expect(wrapper.find('.t-table--column-fixed').exists()).toBe(false);
          });
        });

        describe('children[array]', () => {
          it('multiple level header works fine', () => {
            const wrapper = mountTable([
              { title: 'Index', colKey: 'index' },
              {
                title: 'Detail',
                colKey: 'detail',
                children: [
                  { title: 'Applicant', colKey: 'applicant' },
                  { title: 'Channel', colKey: 'channel' },
                ],
              },
            ]);
            const trList = wrapper.findAll('thead tr');
            expect(trList).toHaveLength(2);
            // 父级表头跨 2 列
            expect(trList[0].findAll('th')[1].attributes('colspan')).toBe('2');
            expect(trList[1].findAll('th')).toHaveLength(2);
          });
        });
      });
    });
  }

  {
    const data = getTableData();

    // 行级事件名与对应的 DOM 事件
    const ROW_EVENTS = [
      ['onRowClick', 'click'],
      ['onRowDblclick', 'dblclick'],
      ['onRowMouseup', 'mouseup'],
      ['onRowMousedown', 'mousedown'],
      ['onRowMouseenter', 'mouseenter'],
      ['onRowMouseleave', 'mouseleave'],
      ['onRowMouseover', 'mouseover'],
    ];

    describe('events', () => {
      function mountTable(props = {}) {
        return mount(BaseTable, { props: { rowKey: 'index', data, columns: SIMPLE_COLUMNS, ...props } });
      }

      ROW_EVENTS.forEach(([eventName, domEvent]) => {
        it(`events.${eventName} works fine`, async () => {
          const fn = vi.fn();
          const wrapper = mountTable({ [eventName]: fn });
          await wrapper.find('tbody tr').trigger(domEvent);

          expect(fn).toHaveBeenCalledTimes(1);
          const ctx = fn.mock.calls[0][0];
          expect(ctx.row).toEqual(data[0]);
          expect(ctx.index).toBe(0);
          expect(ctx.e).toBeTruthy();
        });
      });

      it('events.onCellClick works fine', async () => {
        const fn = vi.fn();
        const wrapper = mountTable({ onCellClick: fn });
        await wrapper.find('tbody td').trigger('click');

        expect(fn).toHaveBeenCalledTimes(1);
        const ctx = fn.mock.calls[0][0];
        expect(ctx.row).toEqual(data[0]);
        expect(ctx.rowIndex).toBe(0);
        expect(ctx.colIndex).toBe(0);
        expect(ctx.col.colKey).toBe('index');
      });

      it('events.onScroll works fine', async () => {
        const fn = vi.fn();
        const wrapper = mountTable({ onScroll: fn, maxHeight: 100 });
        await wrapper.find('.t-table__content').trigger('scroll');
        expect(fn).toHaveBeenCalledTimes(1);
      });

      it('row click on different rows carries correct index', async () => {
        const fn = vi.fn();
        const wrapper = mountTable({ onRowClick: fn });
        await wrapper.findAll('tbody tr')[2].trigger('click');
        expect(fn.mock.calls[0][0].index).toBe(2);
        expect(fn.mock.calls[0][0].row).toEqual(data[2]);
      });
    });
  }

  {
    function createTableData(total: number) {
      return Array.from({ length: total }, (_, index) => ({
        id: index + 1,
        index: index + 1,
        name: `row-${index + 1}`,
      }));
    }

    const columns = [
      { colKey: 'index', title: 'index' },
      { colKey: 'name', title: 'name' },
    ];

    function mountPaginationTable(props = {}) {
      return mount(BaseTable, {
        props: {
          rowKey: 'index',
          data: createTableData(12),
          columns,
          pagination: { current: 1, pageSize: 5, total: 12 },
          ...props,
        },
      });
    }

    describe('props', () => {
      describe(':pagination[object]', () => {
        it('pagination renders and only current page data is displayed', () => {
          const wrapper = mountPaginationTable();
          expect(wrapper.find('.t-pagination').exists()).toBe(true);
          expect(wrapper.findAll('tbody tr')).toHaveLength(5);
          expect(wrapper.find('tbody tr').text()).toContain('row-1');
        });

        it('pagination is not rendered when the prop is empty', () => {
          const wrapper = mount(BaseTable, {
            props: { rowKey: 'index', data: createTableData(12), columns },
          });
          expect(wrapper.find('.t-pagination').exists()).toBe(false);
          expect(wrapper.findAll('tbody tr')).toHaveLength(12);
        });

        it('disableDataPage={true} displays all data', () => {
          const wrapper = mountPaginationTable({ disableDataPage: true });
          expect(wrapper.findAll('tbody tr')).toHaveLength(12);
        });

        it('uncontrolled pagination works fine', () => {
          const wrapper = mountPaginationTable({
            pagination: { defaultCurrent: 2, defaultPageSize: 5, total: 12 },
          });
          expect(wrapper.find('tbody tr').text()).toContain('row-6');
        });
      });
    });

    describe('events', () => {
      describe(':pagination[object]', () => {
        it('events.onPageChange works fine', async () => {
          const onPageChange = vi.fn();
          const wrapper = mountPaginationTable({ onPageChange });
          await wrapper.find('.t-pagination__btn-next').trigger('click');

          expect(onPageChange).toHaveBeenCalledTimes(1);
          expect(onPageChange.mock.calls[0][0]).toMatchObject({ current: 2, pageSize: 5, previous: 1 });
          expect(onPageChange.mock.calls[0][1].map((item: TableRowData) => item.index)).toEqual([6, 7, 8, 9, 10]);
        });

        it('scroll position resets when switching pages', async () => {
          const onPageChange = vi.fn();
          const wrapper = mountPaginationTable({
            pagination: { current: 1, pageSize: 2, total: 50 },
            maxHeight: 200,
            onPageChange,
          });
          const scrollElement = wrapper.find('.t-table__content').element;
          // jsdom 环境下 scrollHeight/clientHeight 默认为 0，需要 mock
          Object.defineProperty(scrollElement, 'scrollHeight', { value: 100, configurable: true });
          Object.defineProperty(scrollElement, 'clientHeight', { value: 50, configurable: true });

          scrollElement.scrollTop = 100;
          expect(scrollElement.scrollTop).toBe(100);

          await wrapper.find('.t-pagination__btn-next').trigger('click');
          expect(onPageChange).toHaveBeenCalledTimes(1);
          expect(scrollElement.scrollTop).toBe(0);
        });
      });
    });
  }

  {
    const data = [
      { id: 1, name: 'tdesign-1', type: 'a' },
      { id: 2, name: 'tdesign-2', type: 'a' },
      { id: 3, name: 'tdesign-3', type: 'b' },
    ];
    const columns = [
      { colKey: 'id', title: 'id' },
      { colKey: 'name', title: 'name' },
      { colKey: 'type', title: 'type' },
    ];

    describe('props', () => {
      describe(':rowspanAndColspan[function]', () => {
        it('rowspan works fine', () => {
          const rowspanAndColspan = ({ colIndex, rowIndex }: { colIndex: number; rowIndex: number }) => {
            if (colIndex === 2 && rowIndex === 0) return { rowspan: 2 };
          };
          const wrapper = mount(
            <BaseTable rowKey="id" data={data} columns={columns} rowspanAndColspan={rowspanAndColspan} />,
          );
          const trList = wrapper.findAll('tbody tr');
          expect(trList[0].findAll('td')[2].attributes('rowspan')).toBe('2');
          // 被合并的单元格不再渲染
          expect(trList[1].findAll('td')).toHaveLength(2);
        });

        it('colspan works fine', () => {
          const rowspanAndColspan = ({ colIndex, rowIndex }: { colIndex: number; rowIndex: number }) => {
            if (colIndex === 0 && rowIndex === 0) return { colspan: 2 };
          };
          const wrapper = mount(
            <BaseTable rowKey="id" data={data} columns={columns} rowspanAndColspan={rowspanAndColspan} />,
          );
          const trList = wrapper.findAll('tbody tr');
          expect(trList[0].findAll('td')[0].attributes('colspan')).toBe('2');
          expect(trList[0].findAll('td')).toHaveLength(2);
          expect(trList[1].findAll('td')).toHaveLength(3);
        });

        it('rowspan and colspan work together', () => {
          const rowspanAndColspan = ({ colIndex, rowIndex }: { colIndex: number; rowIndex: number }) => {
            if (colIndex === 0 && rowIndex === 0) return { rowspan: 2, colspan: 2 };
          };
          const wrapper = mount(
            <BaseTable rowKey="id" data={data} columns={columns} rowspanAndColspan={rowspanAndColspan} />,
          );
          const firstCell = wrapper.findAll('tbody tr')[0].findAll('td')[0];
          expect(firstCell.attributes('rowspan')).toBe('2');
          expect(firstCell.attributes('colspan')).toBe('2');
          expect(wrapper.findAll('tbody tr')[1].findAll('td')).toHaveLength(1);
        });

        it('rowspanAndColspan returns nothing works fine', () => {
          const rowspanAndColspan: TableRowspanAndColspanFunc<TableRowData> = () => undefined;
          const wrapper = mount(
            <BaseTable rowKey="id" data={data} columns={columns} rowspanAndColspan={rowspanAndColspan} />,
          );
          expect(wrapper.findAll('tbody tr')[0].findAll('td')).toHaveLength(3);
        });

        it('rowspanAndColspan updates when data changes', async () => {
          const tableData = ref([...data]);
          const rowspanAndColspan = ({ colIndex, rowIndex }: { colIndex: number; rowIndex: number }) => {
            if (colIndex === 2 && rowIndex === 0) return { rowspan: 2 };
          };
          const wrapper = mount(() => (
            <BaseTable rowKey="id" data={tableData.value} columns={columns} rowspanAndColspan={rowspanAndColspan} />
          ));
          expect(wrapper.findAll('tbody tr')[1].findAll('td')).toHaveLength(2);

          tableData.value = [data[0]];
          await nextTick();
          expect(wrapper.findAll('tbody tr')).toHaveLength(1);
        });
      });
    });
  }

  {
    const data = [
      { id: 1, name: 'tdesign-1', type: 'a' },
      { id: 2, name: 'tdesign-2', type: 'a' },
      { id: 3, name: 'tdesign-3', type: 'b' },
    ];
    const columns = [
      { colKey: 'id', title: 'id' },
      { colKey: 'name', title: 'name' },
      { colKey: 'type', title: 'type' },
    ];
    const ACTIVE_ROW = '.t-table__row--active';

    describe('props', () => {
      describe(':activeRowKeys[array] / activeRowType[string]', () => {
        it('active row has active class name', () => {
          const wrapper = mount(
            <BaseTable rowKey="id" data={data} columns={columns} activeRowType="single" activeRowKeys={[2]} />,
          );
          const trList = wrapper.findAll('tbody tr');
          expect(trList[1].classes('t-table__row--active')).toBe(true);
          expect(trList[0].classes('t-table__row--active')).toBe(false);
        });

        it('defaultActiveRowKeys works fine', () => {
          const wrapper = mount(
            <BaseTable rowKey="id" data={data} columns={columns} activeRowType="single" defaultActiveRowKeys={[3]} />,
          );
          expect(wrapper.findAll('tbody tr')[2].classes('t-table__row--active')).toBe(true);
        });
      });
    });

    describe('events', () => {
      describe(':activeRowKeys[array] / activeRowType[string]', () => {
        it("activeRowType='single' highlights one row on click", async () => {
          const onActiveChange = vi.fn();
          const wrapper = mount(
            <BaseTable
              rowKey="id"
              data={data}
              columns={columns}
              activeRowType="single"
              onActiveChange={onActiveChange}
            />,
          );
          await wrapper.findAll('tbody tr')[1].trigger('click');
          expect(onActiveChange).toHaveBeenCalledTimes(1);
          expect(onActiveChange.mock.calls[0][0]).toEqual([2]);
          expect(onActiveChange.mock.calls[0][1].type).toBe('active');
        });

        it("activeRowType='single' cancels highlight when clicking the active row", async () => {
          const onActiveChange = vi.fn();
          const wrapper = mount(
            <BaseTable
              rowKey="id"
              data={data}
              columns={columns}
              activeRowType="single"
              activeRowKeys={[2]}
              onActiveChange={onActiveChange}
            />,
          );
          await wrapper.findAll('tbody tr')[1].trigger('click');
          expect(onActiveChange.mock.calls[0][0]).toEqual([]);
          expect(onActiveChange.mock.calls[0][1].type).toBe('inactive');
        });

        it("activeRowType='multiple' highlights several rows", async () => {
          const activeRowKeys = ref([]);
          const wrapper = mount(() => (
            <BaseTable
              rowKey="id"
              data={data}
              columns={columns}
              activeRowType="multiple"
              activeRowKeys={activeRowKeys.value}
              onActiveChange={(val) => {
                activeRowKeys.value = val;
              }}
            />
          ));
          await wrapper.findAll('tbody tr')[0].trigger('click');
          await wrapper.findAll('tbody tr')[2].trigger('click');
          expect(activeRowKeys.value).toEqual([1, 3]);
        });

        it("activeRowType='multiple' cancels one row highlight", async () => {
          const onActiveChange = vi.fn();
          const wrapper = mount(
            <BaseTable
              rowKey="id"
              data={data}
              columns={columns}
              activeRowType="multiple"
              activeRowKeys={[1, 3]}
              onActiveChange={onActiveChange}
            />,
          );
          await wrapper.findAll('tbody tr')[0].trigger('click');
          expect(onActiveChange.mock.calls[0][0]).toEqual([3]);
          expect(onActiveChange.mock.calls[0][1].type).toBe('inactive');
        });

        it('row is not highlighted when activeRowType is empty', async () => {
          const onActiveChange = vi.fn();
          const wrapper = mount(
            <BaseTable rowKey="id" data={data} columns={columns} onActiveChange={onActiveChange} />,
          );
          await wrapper.findAll('tbody tr')[0].trigger('click');
          expect(onActiveChange).not.toHaveBeenCalled();
          expect(wrapper.find(ACTIVE_ROW).exists()).toBe(false);
        });

        it('disableSpaceInactiveRow keeps the row active', async () => {
          const onActiveChange = vi.fn();
          const wrapper = mount(
            <BaseTable
              rowKey="id"
              data={data}
              columns={columns}
              activeRowType="single"
              activeRowKeys={[2]}
              disableSpaceInactiveRow
              onActiveChange={onActiveChange}
            />,
          );
          await wrapper.findAll('tbody tr')[1].trigger('click');
          expect(onActiveChange).not.toHaveBeenCalled();
        });

        describe('keyboard events', () => {
          // 键盘监听在表格获得焦点后才会绑定
          async function mountAndFocus(props = {}) {
            const wrapper = mount(<BaseTable rowKey="id" data={data} columns={columns} {...props} />, {
              attachTo: document.body,
            });
            await wrapper.find('.t-table').trigger('focus');
            return wrapper;
          }

          it('arrow down highlights the next row', async () => {
            const onActiveChange = vi.fn();
            const wrapper = await mountAndFocus({ activeRowType: 'single', onActiveChange });
            await wrapper.find('.t-table').trigger('keydown', { code: 'ArrowDown' });
            expect(onActiveChange.mock.calls[0][0]).toEqual([1]);
            wrapper.unmount();
          });

          it('arrow up works fine', async () => {
            const onActiveChange = vi.fn();
            const wrapper = await mountAndFocus({ activeRowType: 'single', onActiveChange });
            await wrapper.find('.t-table').trigger('keydown', { code: 'ArrowDown' });
            await wrapper.find('.t-table').trigger('keydown', { code: 'ArrowDown' });
            await wrapper.find('.t-table').trigger('keydown', { code: 'ArrowUp' });
            expect(onActiveChange.mock.calls.at(-1)[0]).toEqual([1]);
            wrapper.unmount();
          });

          it('escape clears all active rows', async () => {
            const onActiveChange = vi.fn();
            const onActiveRowAction = vi.fn();
            const wrapper = await mountAndFocus({
              activeRowType: 'multiple',
              activeRowKeys: [1, 2],
              onActiveChange,
              onActiveRowAction,
            });
            await wrapper.find('.t-table').trigger('keydown', { code: 'Escape' });
            expect(onActiveChange.mock.calls[0][0]).toEqual([]);
            expect(onActiveRowAction.mock.calls[0][0].action).toBe('clear');
            wrapper.unmount();
          });

          it('select all works fine with multiple type', async () => {
            const onActiveChange = vi.fn();
            const onActiveRowAction = vi.fn();
            const wrapper = await mountAndFocus({ activeRowType: 'multiple', onActiveChange, onActiveRowAction });
            await wrapper.find('.t-table').trigger('keydown', { code: 'KeyA', ctrlKey: true });
            expect(onActiveChange.mock.calls[0][0]).toEqual([1, 2, 3]);
            expect(onActiveRowAction.mock.calls[0][0].action).toBe('select-all');
            wrapper.unmount();
          });

          it('space triggers active or inactive', async () => {
            const onActiveChange = vi.fn();
            const wrapper = await mountAndFocus({ activeRowType: 'single', onActiveChange });
            await wrapper.find('.t-table').trigger('keydown', { code: 'ArrowDown' });
            await wrapper.find('.t-table').trigger('keydown', { code: 'Space' });
            expect(onActiveChange).toHaveBeenCalled();
            wrapper.unmount();
          });

          it('disableSpaceInactiveRow emits space-one-selection action', async () => {
            const onActiveRowAction = vi.fn();
            const wrapper = await mountAndFocus({
              activeRowType: 'single',
              activeRowKeys: [1],
              disableSpaceInactiveRow: true,
              onActiveRowAction,
            });
            await wrapper.find('.t-table').trigger('keydown', { code: 'Space' });
            expect(onActiveRowAction.mock.calls[0][0].action).toBe('space-one-selection');
            wrapper.unmount();
          });

          it('keyboard listener is removed after blur', async () => {
            const onActiveChange = vi.fn();
            const wrapper = await mountAndFocus({ activeRowType: 'single', onActiveChange });
            await wrapper.find('.t-table').trigger('blur');
            await wrapper.find('.t-table').trigger('keydown', { code: 'ArrowDown' });
            expect(onActiveChange).not.toHaveBeenCalled();
            wrapper.unmount();
          });
        });
      });
    });
  }

  describe('instanceFunctions', () => {
    const data = getTableData();

    it('scrollColumnIntoView scrolls past fixed columns and supports the scrollLeft fallback', () => {
      const wrapper = mount(BaseTable, {
        props: { rowKey: 'index', data, columns: SIMPLE_COLUMNS },
        attachTo: document.body,
      });
      const content = wrapper.find('.t-table__content').element as HTMLElement;
      const thList = wrapper.findAll('thead th');
      const target = thList[2].element as HTMLElement;
      const fixed = thList[0].element as HTMLElement;
      fixed.classList.add('t-table__cell--fixed-left');
      vi.spyOn(content, 'getBoundingClientRect').mockReturnValue({ left: 50 } as DOMRect);
      vi.spyOn(target, 'getBoundingClientRect').mockReturnValue({ left: 300 } as DOMRect);
      vi.spyOn(fixed, 'getBoundingClientRect').mockReturnValue({ width: 80 } as DOMRect);
      const scrollTo = vi.fn();
      Object.defineProperty(content, 'scrollTo', { value: scrollTo, configurable: true });

      wrapper.vm.$.exposed.scrollColumnIntoView(SIMPLE_COLUMNS[2].colKey);
      expect(scrollTo).toHaveBeenCalledWith({ left: 170, behavior: 'smooth' });

      Object.defineProperty(content, 'scrollTo', { value: undefined, configurable: true });
      wrapper.vm.$.exposed.scrollColumnIntoView(SIMPLE_COLUMNS[2].colKey);
      expect(content.scrollLeft).toBe(170);
      wrapper.unmount();
    });

    it('scrollToElement supports index, key, offset and invalid parameters', () => {
      const error = vi.spyOn(log, 'error').mockImplementation(() => undefined);
      const wrapper = mount(BaseTable, {
        props: { rowKey: 'index', data, columns: SIMPLE_COLUMNS },
        attachTo: document.body,
      });
      const content = wrapper.find('.t-table__content').element as HTMLElement;
      const rows = wrapper.findAll('tbody tr');
      Object.defineProperty(rows[1].element, 'offsetTop', { value: 120, configurable: true });
      Object.defineProperty(rows[2].element, 'offsetTop', { value: 200, configurable: true });
      content.scrollTop = 20;
      const scrollBy = vi.fn();
      Object.defineProperty(content, 'scrollBy', { value: scrollBy, configurable: true });

      wrapper.vm.$.exposed.scrollToElement({ index: 1, top: 10, behavior: 'smooth' });
      expect(scrollBy).toHaveBeenLastCalledWith({ top: 90, behavior: 'smooth' });
      wrapper.vm.$.exposed.scrollToElement({ key: data[2].index });
      expect(scrollBy).toHaveBeenLastCalledWith({ top: 180, behavior: 'auto' });

      wrapper.vm.$.exposed.scrollToElement({});
      wrapper.vm.$.exposed.scrollToElement({ key: 'missing' });
      expect(error).toHaveBeenCalledTimes(2);
      expect(() => wrapper.vm.$.exposed.refreshTable()).not.toThrow();
      wrapper.unmount();
    });
  });

  describe('affixed layout', () => {
    const data = getTableData();

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it(':headerAffixedTop / footerAffixedBottom / horizontalScrollAffixedBottom / paginationAffixedBottom', async () => {
      vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(
        () =>
          ({
            x: 0,
            y: 0,
            top: 0,
            bottom: 240,
            left: 0,
            right: 400,
            width: 400,
            height: 240,
            toJSON: () => ({}),
          } as DOMRect),
      );
      vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(400);
      vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(300);
      const warn = vi.spyOn(log, 'warn').mockImplementation(() => undefined);
      const wrapper = mount(BaseTable, {
        props: {
          rowKey: 'index',
          data,
          columns: SIMPLE_COLUMNS,
          footData: [data[0]],
          footerSummary: 'summary',
          height: 200,
          bordered: true,
          resizable: true,
          tableLayout: 'auto',
          headerAffixedTop: true,
          footerAffixedBottom: true,
          horizontalScrollAffixedBottom: true,
          paginationAffixedBottom: true,
          pagination: { current: 1, pageSize: 2, total: data.length },
        },
        attachTo: document.body,
      });
      await nextTick();
      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(warn).toHaveBeenCalled();
      expect(wrapper.find('.t-table__affixed-header-elm').exists()).toBe(true);
      expect(wrapper.find('.t-table__affixed-footer-elm').exists()).toBe(true);
      expect(wrapper.find('.t-table__scrollbar--obvious').exists()).toBe(true);
      expect(wrapper.findAllComponents({ name: 'TAffix' }).length).toBeGreaterThanOrEqual(3);
      wrapper.findAllComponents({ name: 'TAffix' }).forEach((affix) => affix.props('onFixedChange')?.());
      await nextTick();
      wrapper.unmount();
    });
  });
});
