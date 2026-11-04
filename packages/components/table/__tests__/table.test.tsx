import { mount } from '@vue/test-utils';
import { expect, vi } from 'vitest';
import { Table } from '@tdesign/components/table';

describe('Table', () => {
  const data = [
    { id: 1, name: 'tdesign-1' },
    { id: 2, name: 'tdesign-2' },
  ];

  const columns = [
    { colKey: 'id', title: 'id' },
    { colKey: 'name', title: 'name' },
  ];

  {
    const ASYNC_LOADING = '.t-table__async-loading';

    /**
     * asyncLoading 由 Table 提供，且属于 slot 类型的 props，
     * JSX 中直接透传会被识别为普通属性，因此统一通过 props 选项传入
     */
    function mountAsyncTable(props = {}, slots = {}) {
      return mount(Table, { props: { rowKey: 'id', data, columns, ...props }, slots });
    }

    describe('props', () => {
      describe(':asyncLoading[string/TNode]', () => {
        it("asyncLoading='load-more' renders load more text", () => {
          const wrapper = mountAsyncTable({ asyncLoading: 'load-more' });
          expect(wrapper.find(ASYNC_LOADING).exists()).toBe(true);
          expect(wrapper.find('.t-table__row--full').exists()).toBe(true);
        });

        it("asyncLoading='loading' renders loading text", () => {
          const wrapper = mountAsyncTable({ asyncLoading: 'loading' });
          expect(wrapper.find(ASYNC_LOADING).exists()).toBe(true);
          expect(wrapper.find(`${ASYNC_LOADING} .t-loading`).exists()).toBe(true);
        });

        it('asyncLoading is not rendered when the prop is empty', () => {
          const wrapper = mountAsyncTable();
          expect(wrapper.find(ASYNC_LOADING).exists()).toBe(false);
        });

        it('custom asyncLoading node works fine', () => {
          const wrapper = mountAsyncTable({ asyncLoading: () => <div class="custom-loading">custom loading</div> });
          expect(wrapper.find('.custom-loading').exists()).toBe(true);
          expect(wrapper.find(ASYNC_LOADING).exists()).toBe(true);
        });
      });
    });

    describe('events', () => {
      describe(':asyncLoading[string/TNode]', () => {
        it("events.onAsyncLoadingClick works fine with 'load-more'", async () => {
          const onAsyncLoadingClick = vi.fn();
          const wrapper = mountAsyncTable({ asyncLoading: 'load-more', onAsyncLoadingClick });
          await wrapper.find(ASYNC_LOADING).trigger('click');
          expect(onAsyncLoadingClick).toHaveBeenCalledTimes(1);
          expect(onAsyncLoadingClick.mock.calls[0][0]).toEqual({ status: 'load-more' });
        });

        it("events.onAsyncLoadingClick carries 'loading' status", async () => {
          const onAsyncLoadingClick = vi.fn();
          const wrapper = mountAsyncTable({ asyncLoading: 'loading', onAsyncLoadingClick });
          await wrapper.find(ASYNC_LOADING).trigger('click');
          expect(onAsyncLoadingClick.mock.calls[0][0]).toEqual({ status: 'loading' });
        });
      });
    });
  }

  {
    describe('props', () => {
      describe(':dragSort[string]', () => {
        it("dragSort='row' adds draggable class to rows", () => {
          const wrapper = mount(<Table rowKey="id" data={data} columns={columns} dragSort="row" />);
          expect(wrapper.find('.t-table--row-draggable').exists()).toBe(true);
        });

        it("dragSort='row-handler' renders drag handler column", () => {
          const dragColumns = [{ colKey: 'drag', title: 'sort', width: 46 }, ...columns];
          const wrapper = mount(<Table rowKey="id" data={data} columns={dragColumns} dragSort="row-handler" />);
          expect(wrapper.findAll('tbody .t-table__handle-draggable')).toHaveLength(2);
          // 拖拽排序的行会带上 data-id 属性
          expect(wrapper.find('tbody tr').attributes('data-id')).toBe('1');
        });

        it("dragSort='col' adds draggable class to table", () => {
          const wrapper = mount(<Table rowKey="id" data={data} columns={columns} dragSort="col" />);
          expect(wrapper.find('.t-table--col-draggable').exists()).toBe(true);
        });

        it("dragSort='row-handler-col' enables both row and col drag", () => {
          const dragColumns = [{ colKey: 'drag', title: 'sort', width: 46 }, ...columns];
          const wrapper = mount(<Table rowKey="id" data={data} columns={dragColumns} dragSort="row-handler-col" />);
          expect(wrapper.find('.t-table--col-draggable').exists()).toBe(true);
          expect(wrapper.findAll('tbody .t-table__handle-draggable')).toHaveLength(2);
        });

        it('dragSort is not enabled by default', () => {
          const wrapper = mount(<Table rowKey="id" data={data} columns={columns} />);
          expect(wrapper.find('.t-table--row-draggable').exists()).toBe(false);
          expect(wrapper.find('.t-table--col-draggable').exists()).toBe(false);
        });
      });
    });
  }

  {
    describe('props', () => {
      describe(':columnController[object]', () => {
        it('columnController renders a button above the table', () => {
          const wrapper = mount(
            <Table rowKey="id" data={data} columns={columns} columnController={{ fields: ['id', 'name'] }} />,
          );
          expect(wrapper.find('.t-table__top-content .t-button').exists()).toBe(true);
        });

        it('columnController is not rendered when the prop is empty', () => {
          const wrapper = mount(<Table rowKey="id" data={data} columns={columns} />);
          expect(wrapper.find('.t-table__top-content').exists()).toBe(false);
        });

        it('columnController could be placed at the bottom', () => {
          const wrapper = mount(
            <Table
              rowKey="id"
              data={data}
              columns={columns}
              columnController={{ fields: ['id', 'name'], placement: 'bottom-right' }}
            />,
          );
          expect(wrapper.find('.t-table__bottom-content').exists()).toBe(true);
        });

        it('displayColumns works fine', () => {
          const wrapper = mount(
            <Table
              rowKey="id"
              data={data}
              columns={columns}
              columnController={{ fields: ['id', 'name'] }}
              displayColumns={['id']}
            />,
          );
          expect(wrapper.findAll('thead th')).toHaveLength(1);
          expect(wrapper.find('thead th').text()).toBe('id');
        });

        it('defaultDisplayColumns works fine', () => {
          const wrapper = mount(
            <Table
              rowKey="id"
              data={data}
              columns={columns}
              columnController={{ fields: ['id', 'name'] }}
              defaultDisplayColumns={['name']}
            />,
          );
          expect(wrapper.findAll('thead th')).toHaveLength(1);
          expect(wrapper.find('thead th').text()).toBe('name');
        });

        it('columnController button text works fine', () => {
          const wrapper = mount(
            <Table rowKey="id" data={data} columns={columns} columnController={{ fields: ['id', 'name'] }} />,
          );
          expect(wrapper.find('.t-table__top-content .t-button').text()).toBeTruthy();
        });
      });
    });
  }

  {
    describe('props', () => {
      describe(':loading[boolean/TNode]', () => {
        it('loading works fine', () => {
          const wrapper = mount(<Table rowKey="id" data={data} columns={columns} loading />);
          expect(wrapper.find('.t-loading').exists()).toBe(true);
        });

        it('loadingProps works fine', () => {
          const wrapper = mount(
            <Table rowKey="id" data={data} columns={columns} loading loadingProps={{ text: 'loading data' }} />,
          );
          expect(wrapper.find('.t-loading__text').text()).toBe('loading data');
        });

        it('custom loading node works fine', () => {
          const wrapper = mount(Table, {
            props: { rowKey: 'id', data, columns, loading: true },
            slots: { loading: () => <div class="custom-table-loading">loading</div> },
          });
          expect(wrapper.find('.custom-table-loading').exists()).toBe(true);
        });
      });
    });
  }

  {
    describe('props', () => {
      describe(':empty[string/TNode]', () => {
        it('empty data renders default empty text', () => {
          const wrapper = mount(<Table rowKey="id" data={[]} columns={columns} />);
          expect(wrapper.find('.t-table__empty').exists()).toBe(true);
        });

        it('props.empty works fine as a string', () => {
          const wrapper = mount(<Table rowKey="id" data={[]} columns={columns} empty="no data" />);
          expect(wrapper.find('.t-table__empty').text()).toBe('no data');
        });

        it('slots.empty works fine', () => {
          const wrapper = mount(Table, {
            props: { rowKey: 'id', data: [], columns },
            slots: { empty: () => <div class="custom-empty">custom empty</div> },
          });
          expect(wrapper.find('.custom-empty').exists()).toBe(true);
        });

        it('empty is not rendered when data is not empty', () => {
          const wrapper = mount(<Table rowKey="id" data={data} columns={columns} />);
          expect(wrapper.find('.t-table__empty').exists()).toBe(false);
        });
      });
    });
  }

  {
    describe('props', () => {
      describe(':footerSummary[string/TNode]', () => {
        it('footData works fine', () => {
          const wrapper = mount(
            <Table rowKey="id" data={data} columns={columns} footData={[{ id: 'total', name: '2' }]} />,
          );
          expect(wrapper.find('tfoot').exists()).toBe(true);
          expect(wrapper.findAll('tfoot tr')).toHaveLength(1);
          expect(wrapper.find('tfoot td').text()).toBe('total');
        });

        it('footData is not rendered when the prop is empty', () => {
          const wrapper = mount(<Table rowKey="id" data={data} columns={columns} />);
          expect(wrapper.find('tfoot').exists()).toBe(false);
        });

        it('column.foot works fine', () => {
          const footColumns = [
            { colKey: 'id', title: 'id', foot: () => <span class="custom-foot">total</span> },
            { colKey: 'name', title: 'name' },
          ];
          const wrapper = mount(
            <Table rowKey="id" data={data} columns={footColumns} footData={[{ id: 'x', name: 'y' }]} />,
          );
          expect(wrapper.find('.custom-foot').exists()).toBe(true);
        });

        it('firstFullRow and lastFullRow work fine', () => {
          const wrapper = mount(Table, {
            props: { rowKey: 'id', data, columns },
            slots: {
              firstFullRow: () => <div class="first-full-row">first</div>,
              lastFullRow: () => <div class="last-full-row">last</div>,
            },
          });
          expect(wrapper.find('.first-full-row').exists()).toBe(true);
          expect(wrapper.find('.last-full-row').exists()).toBe(true);
        });
      });
    });
  }

  {
    const editableColumns = [
      { colKey: 'id', title: 'id' },
      { colKey: 'name', title: 'name', edit: { component: 'input' } },
    ];

    describe('props', () => {
      describe(':columns[array].edit[object]', () => {
        it('editable cell renders edit wrapper', () => {
          const wrapper = mount(<Table rowKey="id" data={data} columns={editableColumns} />);
          expect(wrapper.findAll('.t-table__cell--editable')).toHaveLength(2);
          // 默认展示只读内容和编辑图标
          expect(wrapper.find('.t-table__cell--editable').text()).toBe('tdesign-1');
          expect(wrapper.find('.t-table__cell--editable .t-icon-edit-1').exists()).toBe(true);
        });

        it('normal cell does not render edit wrapper', () => {
          const wrapper = mount(<Table rowKey="id" data={data} columns={columns} />);
          expect(wrapper.find('.t-table__cell--editable').exists()).toBe(false);
        });

        it('edit.showEditIcon={false} hides edit icon', () => {
          const noIconColumns = [
            { colKey: 'id', title: 'id' },
            { colKey: 'name', title: 'name', edit: { component: 'input', showEditIcon: false } },
          ];
          const wrapper = mount(<Table rowKey="id" data={data} columns={noIconColumns} />);
          expect(wrapper.find('.t-table__cell--editable .t-icon-edit-1').exists()).toBe(false);
        });

        it('editableRowKeys works fine', () => {
          const wrapper = mount(<Table rowKey="id" data={data} columns={editableColumns} editableRowKeys={[1]} />);
          const trList = wrapper.findAll('tbody tr');
          // 行编辑模式下，被编辑行直接渲染编辑组件，其他行保持只读态
          expect(trList[0].find('.t-table__cell-wrap input').exists()).toBe(true);
          expect(trList[0].find('.t-table__cell--editable').exists()).toBe(false);
          expect(trList[1].find('.t-table__cell--editable').exists()).toBe(true);
        });
      });
    });
  }
});
