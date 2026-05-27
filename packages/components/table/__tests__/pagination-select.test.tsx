// @ts-nocheck
import { defineComponent, ref, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { PrimaryTable } from '@tdesign/components/table';
import { getLocalPaginationPageData } from '../utils';

function createTableData(total: number) {
  return Array.from({ length: total }, (_, index) => ({
    id: index + 1,
    name: `row-${index + 1}`,
  }));
}

const SELECT_COLUMNS = [
  { colKey: 'row-select', type: 'multiple', width: 50 },
  { colKey: 'id', title: 'id' },
  { colKey: 'name', title: 'name' },
];

function mountSelectTable(reserveSelectedRowOnPaginate: boolean) {
  const data = ref(createTableData(12));
  const selectedRowKeys = ref<(string | number)[]>([]);
  const pagination = ref({ current: 1, pageSize: 5, total: 12 });

  const TableDemo = defineComponent({
    setup() {
      return () => (
        <PrimaryTable
          rowKey="id"
          data={data.value}
          columns={SELECT_COLUMNS}
          pagination={pagination.value}
          selectedRowKeys={selectedRowKeys.value}
          onUpdate:selectedRowKeys={(value) => {
            selectedRowKeys.value = value;
          }}
          reserveSelectedRowOnPaginate={reserveSelectedRowOnPaginate}
        />
      );
    },
  });

  const wrapper = mount(TableDemo);

  return { wrapper, data, selectedRowKeys, pagination };
}

function mountSelectTableByProps(props: Record<string, unknown>) {
  const selectedRowKeys = ref<(string | number)[]>([]);
  const wrapper = mount(
    <PrimaryTable
      rowKey="id"
      columns={SELECT_COLUMNS}
      selectedRowKeys={selectedRowKeys.value}
      onUpdate:selectedRowKeys={(value) => {
        selectedRowKeys.value = value;
      }}
      {...props}
    />,
  );
  return { wrapper, selectedRowKeys };
}

async function setHeaderSelectAll(wrapper: ReturnType<typeof mount>, checked: boolean) {
  const headerCheckboxInput = wrapper.find('.t-table__cell-check input[type="checkbox"]');
  await headerCheckboxInput.setValue(checked);
  await nextTick();
}

describe('getLocalPaginationPageData', () => {
  const data = createTableData(12);

  it('local pagination works fine', () => {
    const result = getLocalPaginationPageData(data, { current: 2, pageSize: 5 });
    expect(result.map((item) => item.id)).toEqual([6, 7, 8, 9, 10]);
  });

  it('data length less than or equal pageSize works fine', () => {
    const shortData = createTableData(3);
    const result = getLocalPaginationPageData(shortData, { current: 1, pageSize: 5 });
    expect(result).toHaveLength(3);
  });

  it('disableDataPage is true works fine', () => {
    const pageData = createTableData(5);
    const result = getLocalPaginationPageData(pageData, { current: 1, pageSize: 5 }, true);
    expect(result).toHaveLength(5);
  });

  it('pagination is undefined works fine', () => {
    const result = getLocalPaginationPageData(data, undefined, false);
    expect(result).toHaveLength(12);
  });
});

describe('reserveSelectedRowOnPaginate', () => {
  it('reserveSelectedRowOnPaginate={false}: header select all only selects current page rows', async () => {
    const { wrapper, selectedRowKeys } = mountSelectTable(false);
    await setHeaderSelectAll(wrapper, true);

    expect(selectedRowKeys.value).toHaveLength(5);
    expect(selectedRowKeys.value).toEqual([1, 2, 3, 4, 5]);
  });

  it('reserveSelectedRowOnPaginate={true}: header select all selects all rows across pages', async () => {
    const { wrapper, selectedRowKeys } = mountSelectTable(true);
    await setHeaderSelectAll(wrapper, true);

    expect(selectedRowKeys.value).toHaveLength(12);
    expect(selectedRowKeys.value).toEqual(createTableData(12).map((item) => item.id));
  });

  it('reserveSelectedRowOnPaginate={false}: after data changes header select all still selects current page only', async () => {
    const { wrapper, data, selectedRowKeys, pagination } = mountSelectTable(false);

    data.value = createTableData(6);
    pagination.value = { current: 1, pageSize: 5, total: 6 };
    await nextTick();

    await setHeaderSelectAll(wrapper, true);

    expect(selectedRowKeys.value).toHaveLength(5);
    expect(selectedRowKeys.value).toEqual([1, 2, 3, 4, 5]);
  });

  it('reserveSelectedRowOnPaginate={false}: after data reference changes with same length, display and select all stay on current page', async () => {
    const { wrapper, data, selectedRowKeys } = mountSelectTable(false);

    data.value = Array.from({ length: 12 }, (_, index) => ({
      id: index + 101,
      name: `new-row-${index + 1}`,
    }));
    await nextTick();

    expect(wrapper.findAll('tbody tr')).toHaveLength(5);
    expect(wrapper.find('tbody tr').text()).toContain('new-row-1');

    await setHeaderSelectAll(wrapper, true);

    expect(selectedRowKeys.value).toHaveLength(5);
    expect(selectedRowKeys.value).toEqual([101, 102, 103, 104, 105]);
  });

  it('reserveSelectedRowOnPaginate={false}: after in-place push, header select all still follows current page', async () => {
    const { wrapper, data, selectedRowKeys, pagination } = mountSelectTable(false);

    data.value.push({ id: 13, name: 'row-13' });
    pagination.value = { ...pagination.value, total: 13 };
    await nextTick();

    await setHeaderSelectAll(wrapper, true);

    expect(selectedRowKeys.value).toHaveLength(5);
    expect(selectedRowKeys.value).toEqual([1, 2, 3, 4, 5]);
  });

  it('reserveSelectedRowOnPaginate={true}: after data changes header select all selects all filtered rows', async () => {
    const { wrapper, data, selectedRowKeys, pagination } = mountSelectTable(true);

    data.value = createTableData(6);
    pagination.value = { current: 1, pageSize: 5, total: 6 };
    await nextTick();

    await setHeaderSelectAll(wrapper, true);

    expect(selectedRowKeys.value).toHaveLength(6);
    expect(selectedRowKeys.value).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it('reserveSelectedRowOnPaginate={false}: selected keys should be cleared when paginating', async () => {
    const { wrapper, selectedRowKeys } = mountSelectTable(false);
    await setHeaderSelectAll(wrapper, true);
    expect(selectedRowKeys.value).toHaveLength(5);

    const nextButton = wrapper.find('.t-pagination__btn-next');
    await nextButton.trigger('click');
    await nextTick();

    expect(selectedRowKeys.value).toHaveLength(0);
  });

  it('reserveSelectedRowOnPaginate={true}: selected keys should be kept when paginating', async () => {
    const { wrapper, selectedRowKeys } = mountSelectTable(true);
    await setHeaderSelectAll(wrapper, true);
    expect(selectedRowKeys.value).toHaveLength(12);

    const nextButton = wrapper.find('.t-pagination__btn-next');
    await nextButton.trigger('click');
    await nextTick();

    expect(selectedRowKeys.value).toHaveLength(12);
  });

  it('reserveSelectedRowOnPaginate={false}: uncheck header select all should clear current-page keys', async () => {
    const { wrapper, selectedRowKeys } = mountSelectTable(false);
    await setHeaderSelectAll(wrapper, true);
    expect(selectedRowKeys.value).toEqual([1, 2, 3, 4, 5]);

    await setHeaderSelectAll(wrapper, false);
    expect(selectedRowKeys.value).toEqual([]);
  });

  it('reserveSelectedRowOnPaginate={false}: disableDataPage=true should select all passed data', async () => {
    const { wrapper, selectedRowKeys } = mountSelectTableByProps({
      data: createTableData(12),
      pagination: { current: 1, pageSize: 5, total: 12 },
      disableDataPage: true,
      reserveSelectedRowOnPaginate: false,
    });

    await setHeaderSelectAll(wrapper, true);
    expect(selectedRowKeys.value).toEqual(createTableData(12).map((item) => item.id));
  });

  it('reserveSelectedRowOnPaginate={false}: uncontrolled pagination should still select current page only', async () => {
    const { wrapper, selectedRowKeys } = mountSelectTableByProps({
      data: createTableData(12),
      pagination: { defaultCurrent: 1, defaultPageSize: 5, total: 12 },
      reserveSelectedRowOnPaginate: false,
    });

    await setHeaderSelectAll(wrapper, true);
    expect(selectedRowKeys.value).toEqual([1, 2, 3, 4, 5]);
  });
});
