// @ts-nocheck
import { defineComponent, ref, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { PrimaryTable } from '@tdesign/components/table';

const createTableData = (total: number) =>
  Array.from({ length: total }, (_, index) => ({ id: index + 1, name: `row-${index + 1}` }));

const SELECT_COLUMNS = [
  { colKey: 'row-select', type: 'multiple', width: 50 },
  { colKey: 'id', title: 'id' },
  { colKey: 'name', title: 'name' },
];

function mountTable() {
  const data = ref(createTableData(6));
  const selectedRowKeys = ref<(string | number)[]>([]);
  const pagination = ref({ current: 1, pageSize: 2, total: 6 });
  const changes: any[] = [];

  const TableDemo = defineComponent({
    setup() {
      return () => (
        <PrimaryTable
          rowKey="id"
          data={data.value}
          columns={SELECT_COLUMNS}
          pagination={pagination.value}
          selectedRowKeys={selectedRowKeys.value}
          reserveSelectedRowOnPaginate={false}
          onUpdate:selectedRowKeys={(value) => {
            selectedRowKeys.value = value;
          }}
          onSelectChange={(keys, ctx) => {
            changes.push({ keys: [...keys], rowData: (ctx.selectedRowData || []).map((r) => r?.id) });
          }}
        />
      );
    },
  });

  return { wrapper: mount(TableDemo), data, selectedRowKeys, pagination, changes };
}

const headerCheckbox = (wrapper) => wrapper.find('.t-table__cell-check input[type="checkbox"]');

async function clickHeader(wrapper) {
  await headerCheckbox(wrapper).setValue(true);
  await nextTick();
}

async function clickHeaderOff(wrapper) {
  await headerCheckbox(wrapper).setValue(false);
  await nextTick();
}

describe('Table cross-page select-all then uncheck current page (issue #6726)', () => {
  it('selectedRowData stays in sync with selectedRowKeys after unchecking current page', async () => {
    const { wrapper, selectedRowKeys, pagination, changes } = mountTable();
    await nextTick();

    // 第一页选中第一行
    const firstRowCheckbox = wrapper.find('tbody .t-table__cell-check input[type="checkbox"]');
    await firstRowCheckbox.setValue(true);
    await nextTick();
    // eslint-disable-next-line no-console
    console.log('STEP1:', JSON.stringify(changes.at(-1)));

    // 翻到第二页
    pagination.value = { current: 2, pageSize: 2, total: 6 };
    await nextTick();
    await nextTick();

    // 第二页全选
    await clickHeader(wrapper);
    // eslint-disable-next-line no-console
    console.log('STEP2:', JSON.stringify(changes.at(-1)));

    // 再点一次：取消当前页全选
    await clickHeaderOff(wrapper);
    // eslint-disable-next-line no-console
    console.log('STEP3:', JSON.stringify(changes.at(-1)));
    const last = changes.at(-1);

    // 第 1 页选中的 id=1 应保留在 keys 里
    expect(last.keys).toEqual([1]);
    // selectedRowData 不能是空数组
    expect(last.rowData).toEqual([1]);
    expect(selectedRowKeys.value).toEqual([1]);
  });
});
