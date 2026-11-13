import { nextTick, ref } from 'vue';
import { mount } from '@vue/test-utils';
import { expect } from 'vitest';
import { PrimaryTable } from '@tdesign/components/table';

describe('PrimaryTable selectOnRowClick', () => {
  it('does not select a disabled row when the select column uses a custom colKey', async () => {
    const keys = ref([]);
    const data = [
      { id: 1, name: 'a' },
      { id: 2, name: 'b' },
    ];
    const columns = [
      {
        colKey: 'custom-select',
        type: 'multiple' as const,
        width: 64,
        disabled: ({ row }: any) => row.id === 1,
      },
      { colKey: 'name', title: 'name' },
    ];
    const wrapper = mount(PrimaryTable, {
      props: {
        data,
        columns,
        rowKey: 'id',
        selectOnRowClick: true,
        selectedRowKeys: keys.value,
        'onUpdate:selectedRowKeys': (v: any[]) => {
          keys.value = v;
        },
      },
    });
    await nextTick();
    await wrapper.findAll('tbody tr')[0].trigger('click');
    await nextTick();
    expect(keys.value).toEqual([]);
  });

  it('still selects an enabled row with the default row-select colKey', async () => {
    const keys = ref([]);
    const data = [
      { id: 1, name: 'a' },
      { id: 2, name: 'b' },
    ];
    const columns = [
      { colKey: 'row-select', type: 'multiple' as const, width: 64 },
      { colKey: 'name', title: 'name' },
    ];
    const wrapper = mount(PrimaryTable, {
      props: {
        data,
        columns,
        rowKey: 'id',
        selectOnRowClick: true,
        selectedRowKeys: keys.value,
        'onUpdate:selectedRowKeys': (v: any[]) => {
          keys.value = v;
        },
      },
    });
    await nextTick();
    await wrapper.findAll('tbody tr')[0].trigger('click');
    await nextTick();
    expect(keys.value).toEqual([1]);
  });
});
