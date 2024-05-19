import { mount } from '@vue/test-utils';
import { mockDelay } from '@test/utils';
import { afterEach } from 'vitest';
import {
  Table, BaseTable, PrimaryTable, EnhancedTable,
} from '@/src/table/index.ts';

// 4 类表格组件同时测试
const TABLES = [Table, BaseTable, PrimaryTable, EnhancedTable];

function getTableData(total) {
  return new Array(total).fill(null).map((item, index) => ({
    id: Math.random() + index + 100,
    instance: `JQTest${index + 1}`,
    status: index % 2,
    owner: 'jenny;peter',
    description: 'test',
  }));
}

const SIMPLE_COLUMNS = [
  { title: 'SerialNumber', colKey: 'serial-number' },
  { title: 'Status', colKey: 'status' },
  { title: 'Instance', colKey: 'instance' },
];

function getTableMount(TTable) {
  return mount({
    data() {
      return {
        data: getTableData(5),
        pagination: {
          current: 1,
          pageSize: 5,
          total: 102,
        },
      };
    },
    methods: {
      goToPrevPage() {
        this.pagination.current = Math.max(this.pagination.current - 1, 1);
      },
      goToNextPage() {
        const { current, total, pageSize } = this.pagination;
        this.pagination.current = Math.min(current + 1, Math.ceil(total / pageSize));
      },
      onPaginationChange(pageInfo) {
        this.pagination.current = pageInfo.current;
        this.pagination.pageSize = pageInfo.pageSize;
        this.data = getTableData(pageInfo.pageSize);
      },
    },
    render() {
      return (
        <div>
          <button class="prev-page" onClick={this.goToPrevPage}>
            PrevPage
          </button>
          <button class="next-page" onClick={this.goToNextPage}>
            NextPage
          </button>
          <TTable
            rowKey="id"
            data={this.data}
            columns={SIMPLE_COLUMNS}
            pagination={this.pagination}
            on={{
              'page-change': this.onPaginationChange,
            }}
          ></TTable>
        </div>
      );
    },
  });
}

TABLES.forEach((TTable) => {
  describe(TTable.name, () => {
    describe('serial-number', () => {
      afterEach(() => {
        document.querySelector('.t-popup')?.remove();
        document.querySelector('.t-table')?.remove();
      });

      it('controlled mode', async () => {
        const wrapper = getTableMount(TTable);

        const firstSerialNumberClass = '.t-table tbody tr td:first-child';
        expect(wrapper.find('.t-table__pagination').exists()).toBeTruthy();
        expect(wrapper.findAll('.t-table tbody tr').length).toBe(5);
        expect(wrapper.find(firstSerialNumberClass).element.innerHTML).toBe('1');

        await wrapper.find('.next-page').trigger('click');
        expect(wrapper.find(firstSerialNumberClass).element.innerHTML).toBe('6');

        await wrapper.find('.t-pagination__select .t-select-input > .t-input__wrap').trigger('click');
        document.querySelector('.t-select__list li.t-select-option:nth-child(2)').click();
        await mockDelay(60);
        expect(wrapper.findAll('.t-table tbody tr').length).toBe(10);

        await wrapper.find('.next-page').trigger('click');
        expect(wrapper.find(firstSerialNumberClass).element.innerHTML).toBe('21');
      });
    });
  });
});
