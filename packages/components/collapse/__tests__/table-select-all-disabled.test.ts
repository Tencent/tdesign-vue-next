import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { expect } from 'vitest';
import { Table } from '@tdesign/components/table';

describe('Table', () => {
  describe('select all', () => {
    it('keeps preselected disabled rows when the table is uncontrolled', async () => {
      const data = [
        { id: 1, name: 'a' },
        { id: 2, name: 'b' },
        { id: 3, name: 'c' },
      ];
      const columns = [
        {
          colKey: 'row-select',
          type: 'multiple' as const,
          disabled: ({ row }: any) => row.id === 2,
        },
        { colKey: 'name', title: 'name' },
      ];
      const wrapper = mount(Table, {
        props: {
          rowKey: 'id',
          data,
          columns,
          defaultSelectedRowKeys: [2],
        },
      });
      await nextTick();
      await wrapper.find('thead input[type="checkbox"]').setValue(true);
      await nextTick();
      const checked = wrapper
        .findAll('tbody input[type="checkbox"]')
        .map((n) => (n.element as HTMLInputElement).checked);
      expect(checked).toEqual([true, true, true]);
    });

    it('reports the disabled row in the emitted keys', async () => {
      const data = [
        { id: 1, name: 'a' },
        { id: 2, name: 'b' },
        { id: 3, name: 'c' },
      ];
      const columns = [
        {
          colKey: 'row-select',
          type: 'multiple' as const,
          disabled: ({ row }: any) => row.id === 2,
        },
        { colKey: 'name', title: 'name' },
      ];
      let captured: any[] = [];
      const wrapper = mount(Table, {
        props: {
          rowKey: 'id',
          data,
          columns,
          defaultSelectedRowKeys: [2],
          onSelectChange: (keys: any[]) => {
            captured = keys;
          },
        },
      });
      await nextTick();
      await wrapper.find('thead input[type="checkbox"]').setValue(true);
      await nextTick();
      expect(captured).toEqual([2, 1, 3]);
    });
  });
});
