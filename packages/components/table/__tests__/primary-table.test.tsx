import { defineComponent, markRaw, nextTick, ref } from 'vue';
import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import { expect, vi } from 'vitest';
import { BaseTable, PrimaryTable } from '@tdesign/components/table';
import Tooltip from '@tdesign/components/tooltip';
import type { PrimaryTableCol, TableRowData, SortType, TableSort } from '@tdesign/components/table/type';
import { sleep } from '@tdesign/internal-utils';

const PrimaryTableEditor = markRaw(
  defineComponent({
    name: 'PrimaryTableEditor',
    props: { value: null },
    emits: ['change'],
    setup(props, { emit }) {
      return () => (
        <input
          class="primary-table-editor"
          value={String(props.value ?? '')}
          onInput={(event) => emit('change', (event.target as HTMLInputElement).value)}
        />
      );
    },
  }),
);

describe('PrimaryTable', () => {
  {
    const data = [
      { id: 1, name: 'tdesign-1', status: 0, channel: 'email' },
      { id: 2, name: 'tdesign-2', status: 1, channel: 'paper' },
      { id: 3, name: 'tdesign-3', status: 2, channel: 'email' },
    ];

    const STATUS_OPTIONS = [
      { label: '待审核', value: 0 },
      { label: '已审核', value: 1 },
      { label: '已驳回', value: 2 },
    ];

    /**
     * jsdom 环境下 Popup 的 click 触发无法正常展开浮层，
     * 因此通过 filter.popupProps.visible 让浮层保持展开，专注验证筛选逻辑
     */
    function getFilterColumns(filter = {}, visible = false): PrimaryTableCol<TableRowData>[] {
      return [
        { colKey: 'id', title: 'id' },
        {
          colKey: 'status',
          title: '状态',
          filter: {
            type: 'single',
            list: STATUS_OPTIONS,
            ...(visible ? { popupProps: { visible: true } } : {}),
            ...filter,
          },
        },
      ];
    }

    const FILTER_ICON = '.t-table__filter-icon';

    const FILTER_RESULT = '.t-table__filter-result';

    const FILTER_POP = '.t-table__filter-pop';

    const BOTTOM_BUTTONS = '.t-table__filter--bottom-buttons .t-button';

    function mountFilterTable(props = {}) {
      return mount(<PrimaryTable rowKey="id" data={data} {...props} />, { attachTo: document.body });
    }

    /** 浮层渲染在 body 上，需要从 document 查询并断言为 HTMLElement 以便触发点击 */
    function queryPopupAll(selector: string) {
      return Array.from(document.querySelectorAll(selector)) as HTMLElement[];
    }

    afterEach(() => {
      document.querySelectorAll('.t-popup').forEach((node) => node.remove());
    });

    describe('props', () => {
      describe(':filterValue[object] / columns.filter[object]', () => {
        describe('column.filter', () => {
          it('filterable column renders filter icon', () => {
            const wrapper = mount(<PrimaryTable rowKey="id" data={data} columns={getFilterColumns()} />);
            const thList = wrapper.findAll('th');
            expect(thList[0].find(FILTER_ICON).exists()).toBe(false);
            expect(thList[1].find(FILTER_ICON).exists()).toBe(true);
            expect(thList[1].find('.t-table__cell--filterable').exists()).toBe(true);
          });

          it('empty filter object does not render filter icon', () => {
            const columns = [
              { colKey: 'id', title: 'id' },
              { colKey: 'status', title: '状态', filter: {} },
            ];
            const wrapper = mount(<PrimaryTable rowKey="id" data={data} columns={columns} />);
            expect(wrapper.find(FILTER_ICON).exists()).toBe(false);
          });

          it("filter.type='single' renders radio group", async () => {
            const wrapper = mountFilterTable({ columns: getFilterColumns({}, true) });
            await sleep(100);
            expect(document.querySelector(`${FILTER_POP} .t-radio-group`)).toBeTruthy();
            expect(document.querySelectorAll(`${FILTER_POP} .t-radio`)).toHaveLength(3);
            wrapper.unmount();
          });

          it("filter.type='multiple' renders checkbox group", async () => {
            const wrapper = mountFilterTable({ columns: getFilterColumns({ type: 'multiple' }, true) });
            await sleep(100);
            expect(document.querySelector(`${FILTER_POP} .t-checkbox-group`)).toBeTruthy();
            wrapper.unmount();
          });

          it("filter.type='input' renders input", async () => {
            const wrapper = mountFilterTable({ columns: getFilterColumns({ type: 'input', list: undefined }, true) });
            await sleep(100);
            expect(document.querySelector(`${FILTER_POP} .t-input`)).toBeTruthy();
            wrapper.unmount();
          });

          it('invalid filter.type prints error', async () => {
            const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
            const wrapper = mountFilterTable({ columns: getFilterColumns({ type: 'unknown' }, true) });
            await sleep(100);
            expect(spy).toHaveBeenCalled();
            spy.mockRestore();
            wrapper.unmount();
          });

          it('filter.showConfirmAndReset renders confirm and reset buttons', async () => {
            const wrapper = mountFilterTable({ columns: getFilterColumns({ showConfirmAndReset: true }, true) });
            await sleep(100);
            expect(document.querySelectorAll(BOTTOM_BUTTONS)).toHaveLength(2);
            wrapper.unmount();
          });

          it('filter.showConfirmAndReset={false} does not render buttons', async () => {
            const wrapper = mountFilterTable({ columns: getFilterColumns({}, true) });
            await sleep(100);
            expect(document.querySelectorAll(BOTTOM_BUTTONS)).toHaveLength(0);
            wrapper.unmount();
          });

          it('filter.props is passed to the filter component', async () => {
            const wrapper = mountFilterTable({
              columns: getFilterColumns({ type: 'multiple', props: { max: 1 } }, true),
            });
            await sleep(100);
            // max=1 时，选中一项后其余选项被禁用
            queryPopupAll(`${FILTER_POP} .t-checkbox input`)[0].click();
            await nextTick();
            const checkboxList = document.querySelectorAll(`${FILTER_POP} .t-checkbox`);
            expect(checkboxList[1].classList.contains('t-is-disabled')).toBe(true);
            wrapper.unmount();
          });

          it('filter.component works fine', async () => {
            const wrapper = mountFilterTable({
              columns: [
                { colKey: 'id', title: 'id' },
                {
                  colKey: 'status',
                  title: '状态',
                  filter: {
                    component: { setup: () => () => <div class="custom-filter-component">custom</div> },
                    popupProps: { visible: true },
                  },
                },
              ],
            });
            await sleep(100);
            expect(document.querySelector('.custom-filter-component')).toBeTruthy();
            wrapper.unmount();
          });
        });

        describe(':filterIcon[TNode]', () => {
          it('custom filter icon works fine', () => {
            const wrapper = mount(
              <PrimaryTable
                rowKey="id"
                data={data}
                columns={getFilterColumns()}
                filterIcon={() => <span class="custom-filter-icon">filter</span>}
              />,
            );
            expect(wrapper.find('.custom-filter-icon').exists()).toBe(true);
          });

          it('slots.filterIcon works fine', () => {
            const wrapper = mount(PrimaryTable, {
              props: { rowKey: 'id', data, columns: getFilterColumns() },
              slots: { filterIcon: () => <span class="slot-filter-icon">filter</span> },
            });
            expect(wrapper.find('.slot-filter-icon').exists()).toBe(true);
          });
        });

        describe('filter icon active state', () => {
          it('filter icon is active when filter value exists', () => {
            const wrapper = mount(
              <PrimaryTable rowKey="id" data={data} columns={getFilterColumns()} filterValue={{ status: 1 }} />,
            );
            expect(wrapper.find(FILTER_ICON).classes('t-is-focus')).toBe(true);
          });

          it('filter icon is active when filter value is an array', () => {
            const wrapper = mount(
              <PrimaryTable
                rowKey="id"
                data={data}
                columns={getFilterColumns({ type: 'multiple' })}
                filterValue={{ status: [1] }}
              />,
            );
            expect(wrapper.find(FILTER_ICON).classes('t-is-focus')).toBe(true);
          });

          it('filter icon is active when filter value is false', () => {
            const wrapper = mount(
              <PrimaryTable rowKey="id" data={data} columns={getFilterColumns()} filterValue={{ status: false }} />,
            );
            expect(wrapper.find(FILTER_ICON).classes('t-is-focus')).toBe(true);
          });

          it('filter icon is inactive when filter value is empty', () => {
            const wrapper = mount(
              <PrimaryTable rowKey="id" data={data} columns={getFilterColumns()} filterValue={{ status: '' }} />,
            );
            expect(wrapper.find(FILTER_ICON).classes('t-is-focus')).toBe(false);
          });

          it('filter icon is inactive when filter value is an empty array', () => {
            const wrapper = mount(
              <PrimaryTable
                rowKey="id"
                data={data}
                columns={getFilterColumns({ type: 'multiple' })}
                filterValue={{ status: [] }}
              />,
            );
            expect(wrapper.find(FILTER_ICON).classes('t-is-focus')).toBe(false);
          });
        });
      });
    });

    describe('events', () => {
      describe(':filterValue[object] / columns.filter[object]', () => {
        describe('events.onFilterChange', () => {
          it('change filter value emits onFilterChange', async () => {
            const onFilterChange = vi.fn();
            const wrapper = mountFilterTable({ columns: getFilterColumns({}, true), onFilterChange });
            await sleep(100);

            queryPopupAll(`${FILTER_POP} .t-radio`)[1].click();
            await nextTick();

            expect(onFilterChange).toHaveBeenCalledTimes(1);
            expect(onFilterChange.mock.calls[0][0]).toEqual({ status: 1 });
            expect(onFilterChange.mock.calls[0][1].trigger).toBe('filter-change');
            expect(onFilterChange.mock.calls[0][1].col.colKey).toBe('status');
            wrapper.unmount();
          });

          it('onChange should be triggered with filter trigger', async () => {
            const onChange = vi.fn();
            const wrapper = mountFilterTable({ columns: getFilterColumns({}, true), onChange });
            await sleep(100);

            queryPopupAll(`${FILTER_POP} .t-radio`)[0].click();
            await nextTick();

            expect(onChange).toHaveBeenCalledTimes(1);
            expect(onChange.mock.calls[0][0]).toEqual({ filter: { status: 0 } });
            expect(onChange.mock.calls[0][1].trigger).toBe('filter');
            wrapper.unmount();
          });

          it('showConfirmAndReset: onFilterChange is emitted only after confirm', async () => {
            const onFilterChange = vi.fn();
            const wrapper = mountFilterTable({
              columns: getFilterColumns({ showConfirmAndReset: true }, true),
              onFilterChange,
            });
            await sleep(100);

            queryPopupAll(`${FILTER_POP} .t-radio`)[1].click();
            await nextTick();
            expect(onFilterChange).not.toHaveBeenCalled();

            queryPopupAll(BOTTOM_BUTTONS)[1].click();
            await nextTick();
            expect(onFilterChange).toHaveBeenCalledTimes(1);
            expect(onFilterChange.mock.calls[0][0]).toEqual({ status: 1 });
            expect(onFilterChange.mock.calls[0][1].trigger).toBe('confirm');
            wrapper.unmount();
          });

          it('showConfirmAndReset: reset button restores empty value', async () => {
            const onFilterChange = vi.fn();
            const wrapper = mountFilterTable({
              columns: getFilterColumns({ showConfirmAndReset: true }, true),
              filterValue: { status: 1 },
              onFilterChange,
            });
            await sleep(100);

            queryPopupAll(BOTTOM_BUTTONS)[0].click();
            await nextTick();

            expect(onFilterChange).toHaveBeenCalledTimes(1);
            // single 类型的重置值为空字符串
            expect(onFilterChange.mock.calls[0][0]).toEqual({ status: '' });
            expect(onFilterChange.mock.calls[0][1].trigger).toBe('reset');
            wrapper.unmount();
          });

          it('showConfirmAndReset: multiple type reset value is an empty array', async () => {
            const onFilterChange = vi.fn();
            const wrapper = mountFilterTable({
              columns: getFilterColumns({ type: 'multiple', showConfirmAndReset: true }, true),
              filterValue: { status: [1] },
              onFilterChange,
            });
            await sleep(100);

            queryPopupAll(BOTTOM_BUTTONS)[0].click();
            await nextTick();
            expect(onFilterChange.mock.calls[0][0]).toEqual({ status: [] });
            wrapper.unmount();
          });

          it('showConfirmAndReset: filter.resetValue works fine', async () => {
            const onFilterChange = vi.fn();
            const wrapper = mountFilterTable({
              columns: getFilterColumns({ showConfirmAndReset: true, resetValue: 0 }, true),
              filterValue: { status: 1 },
              onFilterChange,
            });
            await sleep(100);

            queryPopupAll(BOTTOM_BUTTONS)[0].click();
            await nextTick();
            expect(onFilterChange.mock.calls[0][0]).toEqual({ status: 0 });
            wrapper.unmount();
          });

          it('defaultFilterValue works fine', () => {
            const wrapper = mount(
              <PrimaryTable rowKey="id" data={data} columns={getFilterColumns()} defaultFilterValue={{ status: 1 }} />,
            );
            expect(wrapper.find(FILTER_RESULT).text()).toContain('已审核');
          });
        });

        describe('filter result row', () => {
          it('filter result row is not rendered when filterValue is empty', () => {
            const wrapper = mount(<PrimaryTable rowKey="id" data={data} columns={getFilterColumns()} />);
            expect(wrapper.find(FILTER_RESULT).exists()).toBe(false);
          });

          it('filter result row is not rendered when filterValue is an empty string', () => {
            const wrapper = mount(
              <PrimaryTable rowKey="id" data={data} columns={getFilterColumns()} filterValue={{ status: '' }} />,
            );
            expect(wrapper.find(FILTER_RESULT).exists()).toBe(false);
          });

          it('filter result row shows option label', () => {
            const wrapper = mount(
              <PrimaryTable rowKey="id" data={data} columns={getFilterColumns()} filterValue={{ status: 1 }} />,
            );
            expect(wrapper.find(FILTER_RESULT).text()).toContain('已审核');
          });

          it('filter result row shows multiple option labels', () => {
            const wrapper = mount(
              <PrimaryTable
                rowKey="id"
                data={data}
                columns={getFilterColumns({ type: 'multiple' })}
                filterValue={{ status: [0, 1] }}
              />,
            );
            const text = wrapper.find(FILTER_RESULT).text();
            expect(text).toContain('待审核');
            expect(text).toContain('已审核');
          });

          it('filter result row shows data count', () => {
            const wrapper = mount(
              <PrimaryTable rowKey="id" data={data} columns={getFilterColumns()} filterValue={{ status: 1 }} />,
            );
            // 无分页时按数据长度展示，文案形如：搜索“状态：已审核”，找到 3 条结果
            expect(wrapper.find(FILTER_RESULT).text()).toContain('3 条');
          });

          it('filter result row shows pagination total', () => {
            const wrapper = mount(
              <PrimaryTable
                rowKey="id"
                data={data}
                columns={getFilterColumns()}
                filterValue={{ status: 1 }}
                pagination={{ current: 1, pageSize: 10, total: 66 }}
              />,
            );
            // 存在分页时优先展示分页总数
            expect(wrapper.find(FILTER_RESULT).text()).toContain('66 条');
          });

          it('filter result row shows filter.label instead of column title', () => {
            const wrapper = mount(
              <PrimaryTable
                rowKey="id"
                data={data}
                columns={getFilterColumns({ label: '审核状态' })}
                filterValue={{ status: 1 }}
              />,
            );
            expect(wrapper.find(FILTER_RESULT).text()).toContain('审核状态');
          });

          it('filter.label could be a function', () => {
            const wrapper = mount(
              <PrimaryTable
                rowKey="id"
                data={data}
                columns={getFilterColumns({ label: () => '审核状态' })}
                filterValue={{ status: 1 }}
              />,
            );
            expect(wrapper.find(FILTER_RESULT).text()).toContain('审核状态');
          });

          it('clear all filter value works fine', async () => {
            const onFilterChange = vi.fn();
            const wrapper = mount(
              <PrimaryTable
                rowKey="id"
                data={data}
                columns={getFilterColumns()}
                filterValue={{ status: 1 }}
                onFilterChange={onFilterChange}
              />,
            );
            await wrapper.find(`${FILTER_RESULT} .t-button`).trigger('click');
            expect(onFilterChange).toHaveBeenCalledTimes(1);
            expect(onFilterChange.mock.calls[0][1].trigger).toBe('clear');
            // 未配置 filter.resetValue 的列，清空后不保留任何筛选值
            expect(onFilterChange.mock.calls[0][0]).toEqual({});
          });

          it('clear all filter value respects filter.resetValue', async () => {
            const onFilterChange = vi.fn();
            const wrapper = mount(
              <PrimaryTable
                rowKey="id"
                data={data}
                columns={getFilterColumns({ resetValue: 0 })}
                filterValue={{ status: 1 }}
                onFilterChange={onFilterChange}
              />,
            );
            await wrapper.find(`${FILTER_RESULT} .t-button`).trigger('click');
            expect(onFilterChange.mock.calls[0][0]).toEqual({ status: 0 });
          });

          it('props.filterRow={null} hides filter result row', () => {
            const wrapper = mount(
              <PrimaryTable
                rowKey="id"
                data={data}
                columns={getFilterColumns()}
                filterValue={{ status: 1 }}
                filterRow={null}
              />,
            );
            expect(wrapper.find(FILTER_RESULT).exists()).toBe(false);
          });

          it('props.filterRow works fine as a function', () => {
            const wrapper = mount(
              <PrimaryTable
                rowKey="id"
                data={data}
                columns={getFilterColumns()}
                filterValue={{ status: 1 }}
                filterRow={() => <div class="custom-filter-row">custom filter row</div>}
              />,
            );
            expect(wrapper.find('.custom-filter-row').exists()).toBe(true);
            expect(wrapper.find(FILTER_RESULT).exists()).toBe(false);
          });

          it('slots.filterRow works fine', () => {
            const wrapper = mount(PrimaryTable, {
              props: { rowKey: 'id', data, columns: getFilterColumns(), filterValue: { status: 1 } },
              slots: { filterRow: () => <div class="slot-filter-row">slot filter row</div> },
            });
            expect(wrapper.find('.slot-filter-row').exists()).toBe(true);
          });

          it('filter value in multiple header works fine', () => {
            const columns = [
              {
                colKey: 'detail',
                title: 'detail',
                children: getFilterColumns(),
              },
            ];
            const wrapper = mount(
              <PrimaryTable rowKey="id" data={data} columns={columns} filterValue={{ status: 1 }} />,
            );
            expect(wrapper.find(FILTER_RESULT).text()).toContain('已审核');
          });
        });
      });
    });
  }

  {
    const data = [
      { id: 1, name: 'tdesign-1' },
      { id: 2, name: 'tdesign-2' },
      { id: 3, name: 'tdesign-3' },
    ];

    const columns = [
      { colKey: 'id', title: 'id' },
      { colKey: 'name', title: 'name' },
    ];

    const EXPAND_CELL = '.t-table__expandable-icon-cell';

    const EXPAND_BOX = '.t-table__expand-box';

    const EXPANDED_ROW = '.t-table__expanded-row';

    type RowData = typeof data[number];

    const expandedRow = ({ row }: { row: RowData }) => <div class="expanded-content">detail of {row.name}</div>;

    /**
     * expandedRow 属于 slot 类型的 props，
     * 在 JSX 中直接透传无法接收参数，因此统一通过 slots 传入
     */
    function mountExpandTable(props = {}, slots = {}) {
      return mount(PrimaryTable, {
        props: { rowKey: 'id', data, columns, ...props },
        slots: { expandedRow, ...slots },
      });
    }

    function getExpandBox(wrapper: ReturnType<typeof mountExpandTable>, rowIndex: number) {
      return wrapper.findAll(`tbody ${EXPAND_CELL} ${EXPAND_BOX}`)[rowIndex];
    }

    describe('props', () => {
      describe(':expandedRow[TNode] / expandedRowKeys[array]', () => {
        describe(':expandedRow[TNode]', () => {
          it('expandedRow renders expand icon column', () => {
            const wrapper = mountExpandTable();
            expect(wrapper.findAll(`tbody ${EXPAND_CELL}`)).toHaveLength(3);
            expect(wrapper.find(`thead ${EXPAND_CELL}`).exists()).toBe(true);
          });

          it('expandedRow is not rendered when the prop is empty', () => {
            const wrapper = mount(PrimaryTable, { props: { rowKey: 'id', data, columns } });
            expect(wrapper.find(EXPAND_CELL).exists()).toBe(false);
          });

          it('expanded row content is rendered when expandedRowKeys is not empty', () => {
            const wrapper = mountExpandTable({ expandedRowKeys: [1] });
            expect(wrapper.findAll(EXPANDED_ROW)).toHaveLength(1);
            expect(wrapper.find('.expanded-content').text()).toBe('detail of tdesign-1');
          });

          it('multiple expanded rows work fine', () => {
            const wrapper = mountExpandTable({ expandedRowKeys: [1, 3] });
            expect(wrapper.findAll(EXPANDED_ROW)).toHaveLength(2);
          });

          it('defaultExpandedRowKeys works fine', () => {
            const wrapper = mountExpandTable({ defaultExpandedRowKeys: [2] });
            expect(wrapper.findAll(EXPANDED_ROW)).toHaveLength(1);
            expect(wrapper.find('.expanded-content').text()).toBe('detail of tdesign-2');
          });

          it('expanded row is placed after the current row', () => {
            const wrapper = mountExpandTable({ expandedRowKeys: [2] });
            const trList = wrapper.findAll('tbody tr');
            // 第 1 列为展开图标列，因此数据列从下标 1 开始
            expect(trList[1].findAll('td')[2].text()).toBe('tdesign-2');
            expect(trList[2].classes(EXPANDED_ROW.slice(1))).toBe(true);
          });
        });

        describe(':expandIcon[TNode]', () => {
          it('expandIcon={false} does not render expand icon column', () => {
            const wrapper = mountExpandTable({ expandIcon: false });
            expect(wrapper.find(EXPAND_CELL).exists()).toBe(false);
          });

          it('slots.expandIcon works fine', () => {
            const wrapper = mountExpandTable({}, { expandIcon: () => <span class="slot-expand-icon">icon</span> });
            expect(wrapper.findAll('.slot-expand-icon')).toHaveLength(3);
          });
        });

        describe(':rowClassName[string/object/array/function]', () => {
          it('rowClassName works fine with expanded row', () => {
            const wrapper = mountExpandTable({ expandedRowKeys: [1], rowClassName: 'custom-row' });
            expect(wrapper.findAll('tbody tr.custom-row')).toHaveLength(3);
            // 展开行本身不会附加 rowClassName
            expect(wrapper.find(`${EXPANDED_ROW}.custom-row`).exists()).toBe(false);
          });

          it('rowClassName works fine as a function', () => {
            const wrapper = mountExpandTable({
              expandedRowKeys: [1],
              rowClassName: ({ row }: { row: RowData }) => `custom-row-${row.id}`,
            });
            expect(wrapper.find('tbody tr.custom-row-1').exists()).toBe(true);
            expect(wrapper.find('tbody tr.custom-row-2').exists()).toBe(true);
          });
        });

        describe('expanded icon status', () => {
          it('expanded row icon has expanded class', () => {
            const wrapper = mountExpandTable({ expandedRowKeys: [1] });
            expect(getExpandBox(wrapper, 0).classes('t-table__row--expanded')).toBe(true);
            expect(getExpandBox(wrapper, 1).classes('t-table__row--expanded')).toBe(false);
            expect(getExpandBox(wrapper, 1).classes('t-table__row--collapsed')).toBe(true);
          });

          it('expanded row has expanded class on the origin row', () => {
            const wrapper = mountExpandTable({ expandedRowKeys: [1] });
            const trList = wrapper.findAll('tbody tr');
            expect(trList[0].classes('t-table__row--expanded')).toBe(true);
            expect(trList[2].classes('t-table__row--folded')).toBe(true);
          });
        });

        describe('rowKey', () => {
          it('expandedRow works fine with rowKey of nested value', () => {
            const nestedData = [{ meta: { key: 'a' }, name: 'nested-a' }];
            const wrapper = mount(PrimaryTable, {
              props: {
                rowKey: 'meta.key',
                data: nestedData,
                columns: [{ colKey: 'name', title: 'name' }],
                expandedRowKeys: ['a'],
              },
              slots: { expandedRow },
            });
            expect(wrapper.findAll(EXPANDED_ROW)).toHaveLength(1);
          });
        });
      });
    });

    describe('events', () => {
      describe(':expandedRow[TNode] / expandedRowKeys[array]', () => {
        describe('events.onExpandChange', () => {
          it('click expand icon emits onExpandChange', async () => {
            const onExpandChange = vi.fn();
            const wrapper = mountExpandTable({ onExpandChange });
            await getExpandBox(wrapper, 0).trigger('click');

            expect(onExpandChange).toHaveBeenCalledTimes(1);
            expect(onExpandChange.mock.calls[0][0]).toEqual([1]);
            expect(onExpandChange.mock.calls[0][1].currentRowData).toEqual(data[0]);
            expect(onExpandChange.mock.calls[0][1].expandedRowData).toEqual([data[0]]);
          });

          it('click expanded icon again emits fold type', async () => {
            const onExpandChange = vi.fn();
            const wrapper = mountExpandTable({ expandedRowKeys: [1], onExpandChange });
            await getExpandBox(wrapper, 0).trigger('click');

            expect(onExpandChange.mock.calls[0][0]).toEqual([]);
            expect(onExpandChange.mock.calls[0][1].expandedRowData).toEqual([]);
          });

          it('expandedRowKeys works fine as a controlled prop', async () => {
            const expandedRowKeys = ref([]);
            const wrapper = mount(PrimaryTable, {
              props: {
                rowKey: 'id',
                data,
                columns,
                get expandedRowKeys() {
                  return expandedRowKeys.value;
                },
                onExpandChange: (val) => {
                  expandedRowKeys.value = val;
                },
              },
              slots: { expandedRow },
            });
            await getExpandBox(wrapper, 1).trigger('click');
            expect(expandedRowKeys.value).toEqual([2]);

            await wrapper.setProps({ expandedRowKeys: expandedRowKeys.value });
            await nextTick();
            expect(wrapper.findAll(EXPANDED_ROW)).toHaveLength(1);
          });
        });

        describe(':expandOnRowClick[boolean]', () => {
          it('click row expands the row', async () => {
            const onExpandChange = vi.fn();
            const wrapper = mountExpandTable({ expandOnRowClick: true, onExpandChange });
            await wrapper.findAll('tbody tr')[1].trigger('click');
            expect(onExpandChange).toHaveBeenCalledTimes(1);
            expect(onExpandChange.mock.calls[0][0]).toEqual([2]);
          });

          it('click row does not expand when expandOnRowClick is false', async () => {
            const onExpandChange = vi.fn();
            const wrapper = mountExpandTable({ onExpandChange });
            await wrapper.findAll('tbody tr')[1].trigger('click');
            expect(onExpandChange).not.toHaveBeenCalled();
          });

          it('click expand icon does not trigger onExpandChange twice', async () => {
            const onExpandChange = vi.fn();
            const wrapper = mountExpandTable({ expandOnRowClick: true, onExpandChange });
            await getExpandBox(wrapper, 0).trigger('click');
            expect(onExpandChange).toHaveBeenCalledTimes(1);
          });
        });
      });
    });
  }

  {
    const data = [
      { id: 1, name: 'tdesign-1' },
      { id: 2, name: 'tdesign-2' },
      { id: 3, name: 'tdesign-3' },
    ];

    function getColumns(selectColumn = {}): PrimaryTableCol<TableRowData>[] {
      return [
        { colKey: 'row-select', type: 'multiple', width: 50, ...selectColumn },
        { colKey: 'id', title: 'id' },
        { colKey: 'name', title: 'name' },
      ];
    }

    const CHECK_CELL = '.t-table__cell-check';

    const HEADER_CHECKBOX = 'thead .t-table__cell-check input[type="checkbox"]';

    function getRowCheckbox(wrapper: VueWrapper, rowIndex: number) {
      return wrapper.findAll(`tbody ${CHECK_CELL} input`)[rowIndex];
    }

    describe('props', () => {
      describe(':selectedRowKeys[array] / columns.type[string]', () => {
        describe('column.type', () => {
          it("type='multiple' renders checkbox", () => {
            const wrapper = mount(<PrimaryTable rowKey="id" data={data} columns={getColumns()} />);
            expect(wrapper.findAll(`tbody ${CHECK_CELL} .t-checkbox`)).toHaveLength(3);
            expect(wrapper.find(HEADER_CHECKBOX).exists()).toBe(true);
          });

          it("type='single' renders radio and no header checkbox", () => {
            const wrapper = mount(<PrimaryTable rowKey="id" data={data} columns={getColumns({ type: 'single' })} />);
            expect(wrapper.findAll(`tbody ${CHECK_CELL} .t-radio`)).toHaveLength(3);
            expect(wrapper.find(HEADER_CHECKBOX).exists()).toBe(false);
          });

          it('default width of select column is 64', () => {
            const wrapper = mount(
              <PrimaryTable rowKey="id" data={data} columns={[{ colKey: 'row-select', type: 'multiple' }]} />,
            );
            expect(wrapper.find('col').attributes('style')).toContain('64px');
          });
        });

        describe('selected row class name', () => {
          it('selected row has selected class', () => {
            const wrapper = mount(
              <PrimaryTable rowKey="id" data={data} columns={getColumns()} selectedRowKeys={[2]} />,
            );
            const trList = wrapper.findAll('tbody tr');
            expect(trList[0].classes('t-table__row--selected')).toBe(false);
            expect(trList[1].classes('t-table__row--selected')).toBe(true);
          });

          it('disabled row has disabled class', () => {
            const wrapper = mount(
              <PrimaryTable
                rowKey="id"
                data={data}
                columns={getColumns({ disabled: ({ rowIndex }: { rowIndex: number }) => rowIndex === 0 })}
              />,
            );
            const trList = wrapper.findAll('tbody tr');
            expect(trList[0].classes('t-table__row--disabled')).toBe(true);
            expect(trList[1].classes('t-table__row--disabled')).toBe(false);
          });
        });

        describe(':indeterminateSelectedRowKeys[array]', () => {
          it('row checkbox is indeterminate', () => {
            const wrapper = mount(
              <PrimaryTable rowKey="id" data={data} columns={getColumns()} indeterminateSelectedRowKeys={[2]} />,
            );
            const trList = wrapper.findAll('tbody tr');
            expect(trList[1].find('.t-checkbox').classes('t-is-indeterminate')).toBe(true);
            expect(trList[0].find('.t-checkbox').classes('t-is-indeterminate')).toBe(false);
          });
        });
      });
    });

    describe('events', () => {
      describe(':selectedRowKeys[array] / columns.type[string]', () => {
        describe('events.onSelectChange', () => {
          it('check one row works fine', async () => {
            const onSelectChange = vi.fn();
            const wrapper = mount(
              <PrimaryTable rowKey="id" data={data} columns={getColumns()} onSelectChange={onSelectChange} />,
            );
            await getRowCheckbox(wrapper, 1).setValue(true);

            expect(onSelectChange).toHaveBeenCalledTimes(1);
            expect(onSelectChange.mock.calls[0][0]).toEqual([2]);
            expect(onSelectChange.mock.calls[0][1].type).toBe('check');
            expect(onSelectChange.mock.calls[0][1].currentRowKey).toBe(2);
            expect(onSelectChange.mock.calls[0][1].currentRowData).toEqual(data[1]);
          });

          it('uncheck one row works fine', async () => {
            const onSelectChange = vi.fn();
            const wrapper = mount(
              <PrimaryTable
                rowKey="id"
                data={data}
                columns={getColumns()}
                selectedRowKeys={[1, 2]}
                onSelectChange={onSelectChange}
              />,
            );
            await getRowCheckbox(wrapper, 0).setValue(false);
            expect(onSelectChange.mock.calls[0][0]).toEqual([2]);
            expect(onSelectChange.mock.calls[0][1].type).toBe('uncheck');
          });

          it('select all works fine', async () => {
            const onSelectChange = vi.fn();
            const wrapper = mount(
              <PrimaryTable rowKey="id" data={data} columns={getColumns()} onSelectChange={onSelectChange} />,
            );
            await wrapper.find(HEADER_CHECKBOX).setValue(true);
            expect(onSelectChange.mock.calls[0][0]).toEqual([1, 2, 3]);
            expect(onSelectChange.mock.calls[0][1].currentRowKey).toBe('CHECK_ALL_BOX');
            expect(onSelectChange.mock.calls[0][1].type).toBe('check');
          });

          it('cancel select all works fine', async () => {
            const onSelectChange = vi.fn();
            const wrapper = mount(
              <PrimaryTable
                rowKey="id"
                data={data}
                columns={getColumns()}
                selectedRowKeys={[1, 2, 3]}
                onSelectChange={onSelectChange}
              />,
            );
            await wrapper.find(HEADER_CHECKBOX).setValue(false);
            expect(onSelectChange.mock.calls[0][0]).toEqual([]);
            expect(onSelectChange.mock.calls[0][1].type).toBe('uncheck');
          });

          it("type='single': check another row replaces the selected key", async () => {
            const onSelectChange = vi.fn();
            const wrapper = mount(
              <PrimaryTable
                rowKey="id"
                data={data}
                columns={getColumns({ type: 'single' })}
                selectedRowKeys={[1]}
                onSelectChange={onSelectChange}
              />,
            );
            // 单选场景下需点击 label 才能触发 change
            await wrapper.findAll(`tbody ${CHECK_CELL} .t-radio`)[2].trigger('click');
            expect(onSelectChange.mock.calls[0][0]).toEqual([3]);
          });

          it("type='single': click the selected row does not uncheck by default", async () => {
            const onSelectChange = vi.fn();
            const wrapper = mount(
              <PrimaryTable
                rowKey="id"
                data={data}
                columns={getColumns({ type: 'single' })}
                selectedRowKeys={[1]}
                selectOnRowClick
                onSelectChange={onSelectChange}
              />,
            );
            await wrapper.findAll('tbody tr')[0].trigger('click');
            expect(onSelectChange.mock.calls[0][0]).toEqual([1]);
          });

          it('rowSelectionAllowUncheck: single select allows uncheck', async () => {
            const onSelectChange = vi.fn();
            const wrapper = mount(
              <PrimaryTable
                rowKey="id"
                data={data}
                columns={getColumns({ type: 'single' })}
                selectedRowKeys={[1]}
                selectOnRowClick
                rowSelectionAllowUncheck
                onSelectChange={onSelectChange}
              />,
            );
            await wrapper.findAll('tbody tr')[0].trigger('click');
            expect(onSelectChange.mock.calls[0][0]).toEqual([]);
          });

          it('checkProps.allowUncheck: single select allows uncheck', async () => {
            const onSelectChange = vi.fn();
            const wrapper = mount(
              <PrimaryTable
                rowKey="id"
                data={data}
                columns={getColumns({ type: 'single', checkProps: { allowUncheck: true } })}
                selectedRowKeys={[1]}
                selectOnRowClick
                onSelectChange={onSelectChange}
              />,
            );
            await wrapper.findAll('tbody tr')[0].trigger('click');
            expect(onSelectChange.mock.calls[0][0]).toEqual([]);
          });

          it('defaultSelectedRowKeys works fine', () => {
            const wrapper = mount(
              <PrimaryTable rowKey="id" data={data} columns={getColumns()} defaultSelectedRowKeys={[1]} />,
            );
            expect(wrapper.findAll('tbody tr')[0].classes('t-table__row--selected')).toBe(true);
          });

          it('invalid rowSelectionType prints warning and does not select', async () => {
            const spy = vi.spyOn(console, 'warn').mockImplementation(() => {});
            const onSelectChange = vi.fn();
            const wrapper = mount(
              <PrimaryTable
                rowKey="id"
                data={data}
                columns={getColumns()}
                // 此处特意传入非法值以验证告警逻辑
                rowSelectionType={'unknown' as 'multiple'}
                selectOnRowClick
                onSelectChange={onSelectChange}
              />,
            );
            await wrapper.find('tbody tr').trigger('click');
            // rowSelectionType 优先级高于 column.type，非法值会中断选中逻辑
            expect(spy).toHaveBeenCalled();
            expect(onSelectChange).not.toHaveBeenCalled();
            spy.mockRestore();
          });
        });

        describe('column.disabled and column.checkProps', () => {
          it('column.disabled works fine as a function', () => {
            const wrapper = mount(
              <PrimaryTable
                rowKey="id"
                data={data}
                columns={getColumns({ disabled: ({ rowIndex }: { rowIndex: number }) => rowIndex === 0 })}
              />,
            );
            expect(getRowCheckbox(wrapper, 0).attributes('disabled')).toBeDefined();
            expect(getRowCheckbox(wrapper, 1).attributes('disabled')).toBeUndefined();
          });

          it('column.checkProps works fine as a function', () => {
            const wrapper = mount(
              <PrimaryTable
                rowKey="id"
                data={data}
                columns={getColumns({
                  checkProps: ({ rowIndex }: { rowIndex: number }) => ({ disabled: rowIndex === 1 }),
                })}
              />,
            );
            expect(getRowCheckbox(wrapper, 1).attributes('disabled')).toBeDefined();
          });

          it('disabled rows are excluded from select all', async () => {
            const onSelectChange = vi.fn();
            const wrapper = mount(
              <PrimaryTable
                rowKey="id"
                data={data}
                columns={getColumns({ disabled: ({ row }: { row: TableRowData }) => row.id === 1 })}
                onSelectChange={onSelectChange}
              />,
            );
            await wrapper.find(HEADER_CHECKBOX).setValue(true);
            expect(onSelectChange.mock.calls[0][0]).toEqual([2, 3]);
          });

          it('header checkbox is disabled when all rows are disabled', () => {
            const wrapper = mount(
              <PrimaryTable rowKey="id" data={data} columns={getColumns({ disabled: () => true })} />,
            );
            expect(wrapper.find(HEADER_CHECKBOX).attributes('disabled')).toBeDefined();
          });

          it('header checkbox is indeterminate when part of rows are selected', () => {
            const wrapper = mount(
              <PrimaryTable rowKey="id" data={data} columns={getColumns()} selectedRowKeys={[1]} />,
            );
            expect(wrapper.find('thead .t-checkbox').classes('t-is-indeterminate')).toBe(true);
          });

          it('header checkbox is checked when all rows are selected', () => {
            const wrapper = mount(
              <PrimaryTable rowKey="id" data={data} columns={getColumns()} selectedRowKeys={[1, 2, 3]} />,
            );
            expect(wrapper.find('thead .t-is-checked').exists()).toBe(true);
          });
        });

        describe(':selectOnRowClick[boolean]', () => {
          it('click row selects the row', async () => {
            const onSelectChange = vi.fn();
            const wrapper = mount(
              <PrimaryTable
                rowKey="id"
                data={data}
                columns={getColumns()}
                selectOnRowClick
                onSelectChange={onSelectChange}
              />,
            );
            await wrapper.findAll('tbody tr')[1].trigger('click');
            expect(onSelectChange.mock.calls[0][0]).toEqual([2]);
          });

          it('click disabled row does not select the row', async () => {
            const onSelectChange = vi.fn();
            const wrapper = mount(
              <PrimaryTable
                rowKey="id"
                data={data}
                columns={getColumns({ disabled: ({ rowIndex }: { rowIndex: number }) => rowIndex === 0 })}
                selectOnRowClick
                onSelectChange={onSelectChange}
              />,
            );
            await wrapper.findAll('tbody tr')[0].trigger('click');
            expect(onSelectChange).not.toHaveBeenCalled();
          });

          it('click checkbox does not trigger onRowClick twice', async () => {
            const onSelectChange = vi.fn();
            const wrapper = mount(
              <PrimaryTable
                rowKey="id"
                data={data}
                columns={getColumns()}
                selectOnRowClick
                onSelectChange={onSelectChange}
              />,
            );
            await getRowCheckbox(wrapper, 0).setValue(true);
            expect(onSelectChange).toHaveBeenCalledTimes(1);
          });
        });

        describe(':rowSelectionType[string]', () => {
          it("rowSelectionType='single' works fine", async () => {
            const onSelectChange = vi.fn();
            const wrapper = mount(
              <PrimaryTable
                rowKey="id"
                data={data}
                columns={[{ colKey: 'id', title: 'id' }]}
                rowSelectionType="single"
                selectOnRowClick
                selectedRowKeys={[1]}
                onSelectChange={onSelectChange}
              />,
            );
            await wrapper.findAll('tbody tr')[1].trigger('click');
            expect(onSelectChange.mock.calls[0][0]).toEqual([2]);
          });

          it("rowSelectionType='multiple' works fine", async () => {
            const onSelectChange = vi.fn();
            const wrapper = mount(
              <PrimaryTable
                rowKey="id"
                data={data}
                columns={[{ colKey: 'id', title: 'id' }]}
                rowSelectionType="multiple"
                selectOnRowClick
                selectedRowKeys={[1]}
                onSelectChange={onSelectChange}
              />,
            );
            await wrapper.findAll('tbody tr')[1].trigger('click');
            expect(onSelectChange.mock.calls[0][0]).toEqual([1, 2]);
          });
        });

        describe('controlled selectedRowKeys', () => {
          it('selectedRowKeys works fine as a controlled prop', async () => {
            const selectedRowKeys = ref([]);
            const wrapper = mount(() => (
              <PrimaryTable
                rowKey="id"
                data={data}
                columns={getColumns()}
                selectedRowKeys={selectedRowKeys.value}
                onSelectChange={(val) => {
                  selectedRowKeys.value = val;
                }}
              />
            ));
            await getRowCheckbox(wrapper, 0).setValue(true);
            await nextTick();
            expect(selectedRowKeys.value).toEqual([1]);
            expect(wrapper.findAll('tbody tr')[0].classes('t-table__row--selected')).toBe(true);

            await getRowCheckbox(wrapper, 0).setValue(false);
            await nextTick();
            expect(selectedRowKeys.value).toEqual([]);
            expect(wrapper.findAll('tbody tr')[0].classes('t-table__row--selected')).toBe(false);
          });
        });
      });
    });
  }

  {
    const data = [
      { id: 1, name: 'tdesign-1', status: 2, channel: 'email' },
      { id: 2, name: 'tdesign-2', status: 0, channel: 'paper' },
      { id: 3, name: 'tdesign-3', status: 1, channel: 'email' },
    ];

    function getSorterColumns(sortType?: SortType): PrimaryTableCol<TableRowData>[] {
      return [
        { colKey: 'id', title: 'id' },
        { colKey: 'name', title: 'name' },
        {
          colKey: 'status',
          title: 'status',
          sortType,
          sorter: (a: TableRowData, b: TableRowData) => a.status - b.status,
        },
      ];
    }

    const SORT_ICON_SELECTOR = '.t-table__cell--sort-trigger .t-table__sort-icon';

    describe('props', () => {
      describe(':sort[object/array] / columns.sorter[function]', () => {
        describe(':columns[array].sorter[function]', () => {
          it('sortable column renders sort icon', () => {
            const wrapper = mount(<PrimaryTable rowKey="id" data={data} columns={getSorterColumns()} />);
            const thList = wrapper.findAll('th');
            expect(thList[0].find('.t-table__cell--sort-trigger').exists()).toBe(false);
            expect(thList[2].find('.t-table__cell--sort-trigger').exists()).toBe(true);
          });

          it("sortType='all' renders both asc and desc icons", () => {
            const wrapper = mount(<PrimaryTable rowKey="id" data={data} columns={getSorterColumns('all')} />);
            expect(wrapper.findAll(SORT_ICON_SELECTOR)).toHaveLength(2);
            expect(wrapper.find('.t-table__double-icons').exists()).toBe(true);
          });

          it("sortType='asc' renders only one icon", () => {
            const wrapper = mount(<PrimaryTable rowKey="id" data={data} columns={getSorterColumns('asc')} />);
            expect(wrapper.findAll(SORT_ICON_SELECTOR)).toHaveLength(1);
            expect(wrapper.find('.t-table__double-icons').exists()).toBe(false);
          });
        });

        describe(':sortIcon[TNode]', () => {
          it('custom sort icon works fine', () => {
            const wrapper = mount(
              <PrimaryTable
                rowKey="id"
                data={data}
                columns={getSorterColumns('asc')}
                sortIcon={() => <span class="custom-sort-icon">sort</span>}
              />,
            );
            expect(wrapper.find('.custom-sort-icon').exists()).toBe(true);
          });

          it('slots.sortIcon works fine', () => {
            const wrapper = mount(PrimaryTable, {
              props: { rowKey: 'id', data, columns: getSorterColumns('asc') },
              slots: { sortIcon: () => <span class="slot-sort-icon">sort</span> },
            });
            expect(wrapper.find('.slot-sort-icon').exists()).toBe(true);
          });
        });
      });
    });

    describe('events', () => {
      describe(':sort[object/array] / columns.sorter[function]', () => {
        describe('events.onSortChange', () => {
          it('click asc icon emits sort info', async () => {
            const onSortChange = vi.fn();
            const wrapper = mount(
              <PrimaryTable rowKey="id" data={data} columns={getSorterColumns()} onSortChange={onSortChange} />,
            );
            await wrapper.findAll(SORT_ICON_SELECTOR)[0].trigger('click');
            expect(onSortChange).toHaveBeenCalledTimes(1);
            expect(onSortChange.mock.calls[0][0]).toEqual({ sortBy: 'status', descending: false });
          });

          it('click desc icon emits descending sort info', async () => {
            const onSortChange = vi.fn();
            const wrapper = mount(
              <PrimaryTable rowKey="id" data={data} columns={getSorterColumns()} onSortChange={onSortChange} />,
            );
            await wrapper.findAll(SORT_ICON_SELECTOR)[1].trigger('click');
            expect(onSortChange.mock.calls[0][0]).toEqual({ sortBy: 'status', descending: true });
          });

          it('click the same icon twice cancels sort', async () => {
            const sort = ref(undefined);
            const onSortChange = vi.fn((val) => {
              sort.value = val;
            });
            const wrapper = mount(() => (
              <PrimaryTable
                rowKey="id"
                data={data}
                columns={getSorterColumns()}
                sort={sort.value}
                onSortChange={onSortChange}
              />
            ));
            await wrapper.findAll(SORT_ICON_SELECTOR)[0].trigger('click');
            expect(sort.value).toEqual({ sortBy: 'status', descending: false });

            await wrapper.findAll(SORT_ICON_SELECTOR)[0].trigger('click');
            expect(sort.value).toBe(undefined);
          });

          it('onChange should be triggered with sorter trigger', async () => {
            const onChange = vi.fn();
            const wrapper = mount(
              <PrimaryTable rowKey="id" data={data} columns={getSorterColumns()} onChange={onChange} />,
            );
            await wrapper.findAll(SORT_ICON_SELECTOR)[0].trigger('click');
            expect(onChange).toHaveBeenCalledTimes(1);
            expect(onChange.mock.calls[0][0]).toEqual({ sorter: { sortBy: 'status', descending: false } });
            expect(onChange.mock.calls[0][1].trigger).toBe('sorter');
          });
        });

        describe(':defaultSort[object/array]', () => {
          it('local data should be sorted by defaultSort', async () => {
            const tableData = ref<TableRowData[]>([...data]);
            mount(() => (
              <PrimaryTable
                rowKey="id"
                data={tableData.value}
                columns={getSorterColumns()}
                defaultSort={{ sortBy: 'status', descending: false }}
                onDataChange={(val) => {
                  tableData.value = val;
                }}
              />
            ));
            await nextTick();
            expect(tableData.value.map((t: TableRowData) => t.id)).toEqual([2, 3, 1]);
          });

          it('descending sort works fine', async () => {
            const tableData = ref<TableRowData[]>([...data]);
            mount(() => (
              <PrimaryTable
                rowKey="id"
                data={tableData.value}
                columns={getSorterColumns()}
                defaultSort={{ sortBy: 'status', descending: true }}
                onDataChange={(val) => {
                  tableData.value = val;
                }}
              />
            ));
            await nextTick();
            expect(tableData.value.map((t: TableRowData) => t.id)).toEqual([1, 3, 2]);
          });

          it('onDataChange should be triggered when local data sorted', async () => {
            const onDataChange = vi.fn();
            const wrapper = mount(
              <PrimaryTable rowKey="id" data={data} columns={getSorterColumns()} onDataChange={onDataChange} />,
            );
            await wrapper.findAll(SORT_ICON_SELECTOR)[0].trigger('click');
            expect(onDataChange).toHaveBeenCalledTimes(1);
            expect(onDataChange.mock.calls[0][0].map((t: TableRowData) => t.id)).toEqual([2, 3, 1]);
            expect(onDataChange.mock.calls[0][1].trigger).toBe('sort');
          });

          it('cancel sort should restore original data', async () => {
            const sort = ref(undefined);
            const tableData = ref<TableRowData[]>([...data]);
            const wrapper = mount(() => (
              <PrimaryTable
                rowKey="id"
                data={tableData.value}
                columns={getSorterColumns()}
                sort={sort.value}
                onSortChange={(val) => {
                  sort.value = val;
                }}
                onDataChange={(val) => {
                  tableData.value = val;
                }}
              />
            ));
            await wrapper.findAll(SORT_ICON_SELECTOR)[0].trigger('click');
            expect(tableData.value.map((t: TableRowData) => t.id)).toEqual([2, 3, 1]);

            await wrapper.findAll(SORT_ICON_SELECTOR)[0].trigger('click');
            expect(tableData.value.map((t: TableRowData) => t.id)).toEqual([1, 2, 3]);
          });
        });

        describe(':multipleSort[boolean]', () => {
          it('multiple sort collects several sort fields', async () => {
            const columns = [
              { colKey: 'id', title: 'id', sorter: (a: TableRowData, b: TableRowData) => a.id - b.id },
              { colKey: 'status', title: 'status', sorter: (a: TableRowData, b: TableRowData) => a.status - b.status },
            ];
            const sort = ref<TableSort>([]);
            const wrapper = mount(() => (
              <PrimaryTable
                rowKey="id"
                data={data}
                columns={columns}
                multipleSort
                sort={sort.value}
                onSortChange={(val) => {
                  sort.value = val;
                }}
              />
            ));
            const icons = wrapper.findAll(SORT_ICON_SELECTOR);
            // 第一列升序
            await icons[0].trigger('click');
            // 第二列降序
            await icons[3].trigger('click');
            expect(sort.value).toEqual([
              { sortBy: 'id', descending: false },
              { sortBy: 'status', descending: true },
            ]);
          });

          it('multiple sort could remove one sort field', async () => {
            const columns = [
              { colKey: 'id', title: 'id', sorter: (a: TableRowData, b: TableRowData) => a.id - b.id },
              { colKey: 'status', title: 'status', sorter: (a: TableRowData, b: TableRowData) => a.status - b.status },
            ];
            const sort = ref<TableSort>([]);
            const wrapper = mount(() => (
              <PrimaryTable
                rowKey="id"
                data={data}
                columns={columns}
                multipleSort
                sort={sort.value}
                onSortChange={(val) => {
                  sort.value = val;
                }}
              />
            ));
            const icons = wrapper.findAll(SORT_ICON_SELECTOR);
            await icons[0].trigger('click');
            expect(sort.value).toHaveLength(1);

            await icons[0].trigger('click');
            expect(sort.value).toEqual([]);
          });

          it('multiple sort in multiple header works fine', async () => {
            const columns = [
              {
                colKey: 'detail',
                title: 'detail',
                children: [
                  {
                    colKey: 'status',
                    title: 'status',
                    sorter: (a: TableRowData, b: TableRowData) => a.status - b.status,
                  },
                ],
              },
            ];
            const onSortChange = vi.fn();
            const wrapper = mount(
              <PrimaryTable
                rowKey="id"
                data={data}
                columns={columns}
                onSortChange={onSortChange}
                onDataChange={() => {}}
              />,
            );
            await wrapper.findAll(SORT_ICON_SELECTOR)[0].trigger('click');
            expect(onSortChange).toHaveBeenCalledTimes(1);
          });
        });

        describe(':hideSortTips[boolean]', () => {
          // 展示提示时排序图标会被 Tooltip 包裹
          it('sort tips are rendered by default', () => {
            const wrapper = mount(<PrimaryTable rowKey="id" data={data} columns={getSorterColumns()} />);
            expect(wrapper.findAllComponents(Tooltip).length).toBeGreaterThan(0);
          });

          it('hideSortTips={true} does not wrap icon with tooltip', () => {
            const wrapper = mount(<PrimaryTable rowKey="id" data={data} columns={getSorterColumns()} hideSortTips />);
            expect(wrapper.findAllComponents(Tooltip)).toHaveLength(0);
            // 排序图标本身仍然渲染
            expect(wrapper.findAll(SORT_ICON_SELECTOR)).toHaveLength(2);
          });

          it('sort still works fine when hideSortTips={true}', async () => {
            const onSortChange = vi.fn();
            const wrapper = mount(
              <PrimaryTable
                rowKey="id"
                data={data}
                columns={getSorterColumns()}
                hideSortTips
                onSortChange={onSortChange}
              />,
            );
            await wrapper.findAll(SORT_ICON_SELECTOR)[0].trigger('click');
            expect(onSortChange.mock.calls[0][0]).toEqual({ sortBy: 'status', descending: false });
          });
        });
      });
    });
  }

  {
    const selectColumns: PrimaryTableCol<TableRowData>[] = [
      { colKey: 'row-select', type: 'multiple', width: 50 },
      { colKey: 'id', title: 'id' },
      { colKey: 'name', title: 'name' },
    ];

    function createTableData(total: number) {
      return Array.from({ length: total }, (_, index) => ({ id: index + 1, name: `row-${index + 1}` }));
    }

    function mountSelectTable(props = {}) {
      const onSelectChange = vi.fn();
      const wrapper = mount(PrimaryTable, {
        props: {
          rowKey: 'id',
          data: createTableData(12),
          columns: selectColumns,
          pagination: { current: 1, pageSize: 5, total: 12 },
          selectedRowKeys: [],
          onSelectChange,
          ...props,
        },
      });
      return { wrapper, onSelectChange };
    }

    async function selectAll(wrapper: VueWrapper, checked = true) {
      await wrapper.find('thead .t-table__cell-check input[type="checkbox"]').setValue(checked);
      await nextTick();
    }

    describe('events', () => {
      describe(':reserveSelectedRowOnPaginate[boolean]', () => {
        it('reserveSelectedRowOnPaginate={false}: select all only selects current page', async () => {
          const { wrapper, onSelectChange } = mountSelectTable({ reserveSelectedRowOnPaginate: false });
          await selectAll(wrapper);
          expect(onSelectChange.mock.calls[0][0]).toEqual([1, 2, 3, 4, 5]);
        });

        it('reserveSelectedRowOnPaginate={true}: select all selects rows across pages', async () => {
          const { wrapper, onSelectChange } = mountSelectTable({ reserveSelectedRowOnPaginate: true });
          await selectAll(wrapper);
          expect(onSelectChange.mock.calls[0][0]).toHaveLength(12);
        });

        it('reserveSelectedRowOnPaginate={false}: uncheck select all clears current page keys', async () => {
          const { wrapper, onSelectChange } = mountSelectTable({
            reserveSelectedRowOnPaginate: false,
            selectedRowKeys: [1, 2, 3, 4, 5],
          });
          await selectAll(wrapper, false);
          expect(onSelectChange.mock.calls[0][0]).toEqual([]);
        });

        it('reserveSelectedRowOnPaginate={false}: selected keys are cleared when paginating', async () => {
          const onSelectChange = vi.fn();
          const wrapper = mount(PrimaryTable, {
            props: {
              rowKey: 'id',
              data: createTableData(12),
              columns: selectColumns,
              pagination: { defaultCurrent: 1, defaultPageSize: 5, total: 12 },
              selectedRowKeys: [1, 2, 3, 4, 5],
              reserveSelectedRowOnPaginate: false,
              onSelectChange,
            },
          });
          await wrapper.find('.t-pagination__btn-next').trigger('click');
          await nextTick();
          expect(onSelectChange).toHaveBeenCalled();
          expect(onSelectChange.mock.calls.at(-1)[0]).toEqual([]);
        });

        it('reserveSelectedRowOnPaginate={true}: selected keys are kept when paginating', async () => {
          const onSelectChange = vi.fn();
          const wrapper = mount(PrimaryTable, {
            props: {
              rowKey: 'id',
              data: createTableData(12),
              columns: selectColumns,
              pagination: { defaultCurrent: 1, defaultPageSize: 5, total: 12 },
              selectedRowKeys: [1, 2, 3, 4, 5],
              reserveSelectedRowOnPaginate: true,
              onSelectChange,
            },
          });
          await wrapper.find('.t-pagination__btn-next').trigger('click');
          await nextTick();
          expect(onSelectChange).not.toHaveBeenCalled();
        });

        it('disableDataPage={true}: select all selects all passed data', async () => {
          const { wrapper, onSelectChange } = mountSelectTable({
            disableDataPage: true,
            reserveSelectedRowOnPaginate: false,
          });
          await selectAll(wrapper);
          expect(onSelectChange.mock.calls[0][0]).toHaveLength(12);
        });

        it('select all follows current page after data changes', async () => {
          const { wrapper, onSelectChange } = mountSelectTable({ reserveSelectedRowOnPaginate: false });
          await wrapper.setProps({
            data: Array.from({ length: 12 }, (_, index) => ({ id: index + 101, name: `new-row-${index + 1}` })),
          });
          await nextTick();

          expect(wrapper.findAll('tbody tr')).toHaveLength(5);
          expect(wrapper.find('tbody tr').text()).toContain('new-row-1');

          await selectAll(wrapper);
          expect(onSelectChange.mock.calls[0][0]).toEqual([101, 102, 103, 104, 105]);
        });
      });
    });
  }

  describe('props', () => {
    const data = [
      { id: 1, name: 'one', status: 2 },
      { id: 2, name: 'two', status: 1 },
    ];

    it(':showSortColumnBgColor[boolean]', () => {
      const columns: PrimaryTableCol<TableRowData>[] = [
        { colKey: 'name', title: 'Name', sorter: true, className: ['existing-class'] },
        { colKey: 'status', title: 'Status', sorter: true },
      ];
      const wrapper = mount(
        <PrimaryTable
          rowKey="id"
          data={data}
          columns={columns}
          sort={[
            { sortBy: 'name', descending: false },
            { sortBy: 'status', descending: true },
          ]}
          showSortColumnBgColor
          multipleSort
        />,
      );
      expect(
        wrapper
          .findAll('tbody td')
          .slice(0, 2)
          .every((cell) => cell.classes('t-table__sort-column')),
      ).toBe(true);
      expect(wrapper.find('tbody td').classes('existing-class')).toBe(true);
    });

    it(':editableCellState[function] renders readonly editable cells', () => {
      const columns = [{ colKey: 'name', title: 'Name', edit: { component: PrimaryTableEditor } }];
      const wrapper = mount(<PrimaryTable rowKey="id" data={data} columns={columns} editableCellState={() => false} />);
      expect(wrapper.find('.primary-table-editor').exists()).toBe(false);
      expect(wrapper.find('.t-table__cell--editable').exists()).toBe(false);
      expect(wrapper.find('tbody td').text()).toBe('one');
    });

    it(':topContent / bottomContent compose with the column controller in the documented order', () => {
      const columns = [{ colKey: 'name', title: 'Name' }];
      const top = mount(
        <PrimaryTable
          rowKey="id"
          data={data}
          columns={columns}
          topContent={() => <span class="props-top">props top</span>}
          columnController={{ fields: ['name'] }}
        />,
      );
      expect(top.find('.props-top').exists()).toBe(true);
      expect(top.find('.t-table__column-controller-trigger').exists()).toBe(true);

      const bottom = mount(
        <PrimaryTable
          rowKey="id"
          data={data}
          columns={columns}
          bottomContent={() => <span class="props-bottom">props bottom</span>}
          columnController={{ fields: ['name'], placement: 'bottom-right' }}
        />,
      );
      const bottomContent = bottom.find('.t-table__bottom-content');
      expect(bottomContent.find('.t-table__column-controller-trigger').exists()).toBe(true);
      expect(bottomContent.find('.props-bottom').exists()).toBe(true);
      expect(
        (bottomContent.element.firstElementChild as HTMLElement).querySelector('.t-table__column-controller-trigger'),
      ).toBeTruthy();
    });

    it(':firstFullRow / lastFullRow compose with filter and async-loading rows', () => {
      const columns: PrimaryTableCol<TableRowData>[] = [
        {
          colKey: 'status',
          title: 'Status',
          filter: { type: 'single', list: [{ label: 'Open', value: 1 }] },
        },
      ];
      const wrapper = mount(PrimaryTable, {
        props: {
          rowKey: 'id',
          data,
          columns,
          filterValue: { status: 1 },
          asyncLoading: 'load-more',
        },
        slots: {
          firstFullRow: () => <div class="props-first">first</div>,
          lastFullRow: () => <div class="props-last">last</div>,
        },
      });
      expect(wrapper.find('.props-first').exists()).toBe(true);
      expect(wrapper.find('.t-table__filter-result').exists()).toBe(true);
      expect(wrapper.find('.props-last').exists()).toBe(true);
      expect(wrapper.find('.t-table__async-loading').exists()).toBe(true);
    });
  });

  describe('events', () => {
    it('onActiveRowAction forwards BaseTable keyboard actions', () => {
      const onActiveRowAction = vi.fn();
      const wrapper = mount(
        <PrimaryTable
          rowKey="id"
          data={[{ id: 1, name: 'one' }]}
          columns={[{ colKey: 'name', title: 'Name' }]}
          onActiveRowAction={onActiveRowAction}
        />,
      );
      const context = {
        action: 'clear' as const,
        activeRowList: [] as Array<{ row: TableRowData; rowIndex: number }>,
      };
      wrapper.findComponent(BaseTable).props('onActiveRowAction')(context);

      expect(onActiveRowAction).toHaveBeenCalledWith(context);
    });

    it('onRowEdit receives cell changes and synchronizes the source row on subsequent edits', async () => {
      const data = [{ id: 1, name: 'one' }];
      const onRowEdit = vi.fn();
      const columns = [
        {
          colKey: 'name',
          title: 'Name',
          edit: { component: PrimaryTableEditor },
        },
      ];
      const wrapper = mount(
        <PrimaryTable rowKey="id" data={data} columns={columns} editableRowKeys={[1]} onRowEdit={onRowEdit} />,
      );
      await wrapper.find('.primary-table-editor').setValue('first edit');
      await nextTick();
      await wrapper.find('.primary-table-editor').setValue('second edit');
      await nextTick();

      expect(onRowEdit).toHaveBeenCalledTimes(2);
      expect(onRowEdit.mock.calls[1][0].value).toBe('second edit');
      expect(data[0].name).toBe('first edit');
    });

    it('delays a single row click and cancels it when a second click forms a double-click', async () => {
      vi.useFakeTimers();
      const onSelectChange = vi.fn();
      const wrapper = mount(
        <PrimaryTable
          rowKey="id"
          data={[{ id: 1, name: 'one' }]}
          columns={[
            { colKey: 'row-select', type: 'multiple' },
            { colKey: 'name', title: 'Name' },
          ]}
          selectOnRowClick
          onRowDblclick={vi.fn()}
          onSelectChange={onSelectChange}
        />,
      );
      const row = wrapper.find('tbody tr');
      await row.trigger('click');
      vi.advanceTimersByTime(249);
      expect(onSelectChange).not.toHaveBeenCalled();
      vi.advanceTimersByTime(1);
      expect(onSelectChange).toHaveBeenCalledTimes(1);

      onSelectChange.mockClear();
      await row.trigger('click');
      await row.trigger('click');
      vi.runAllTimers();
      expect(onSelectChange).not.toHaveBeenCalled();
      vi.useRealTimers();
    });
  });

  describe('instanceFunctions', () => {
    it('forwards BaseTable methods and clears editable validation state', async () => {
      const columns = [
        {
          colKey: 'name',
          title: 'Name',
          edit: { component: PrimaryTableEditor, rules: [{ required: true, message: 'required' }] },
        },
      ];
      const wrapper = mount(
        <PrimaryTable rowKey="id" data={[{ id: 1, name: '' }]} columns={columns} editableRowKeys={[1]} />,
      );
      const exposed = wrapper.vm.$.exposed;
      const baseTable = exposed.baseTableRef.value;
      const refreshTable = vi.spyOn(baseTable, 'refreshTable').mockImplementation(() => undefined);
      const scrollToElement = vi.spyOn(baseTable, 'scrollToElement').mockImplementation(() => undefined);
      const scrollColumnIntoView = vi.spyOn(baseTable, 'scrollColumnIntoView').mockImplementation(() => undefined);

      exposed.refreshTable();
      exposed.scrollToElement({ index: 0 });
      exposed.scrollColumnIntoView('name');
      expect(refreshTable).toHaveBeenCalledTimes(1);
      expect(scrollToElement).toHaveBeenCalledWith({ index: 0 });
      expect(scrollColumnIntoView).toHaveBeenCalledWith('name');

      const rowResult = await exposed.validateRowData(1);
      expect(rowResult.result[0].errorList[0].message).toBe('required');
      expect((await exposed.validateTableData()).result['1__name']).toBeTruthy();
      expect((await exposed.validateTableCellData()).result).toEqual({});
      expect(() => exposed.clearValidateData()).not.toThrow();
    });
  });
});
