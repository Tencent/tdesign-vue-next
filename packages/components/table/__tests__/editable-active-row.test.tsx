import { mount } from '@vue/test-utils';
import { Input, PrimaryTable } from '@tdesign/components';

describe('PrimaryTable', () => {
  describe('scenarios', () => {
    // Issue: https://github.com/Tencent/tdesign-vue-next/issues/6926
    it('highlights the row when a keepEditMode input is clicked', async () => {
      const wrapper = mount(
        <PrimaryTable
          rowKey="id"
          data={[{ id: 1, name: 'Alice' }]}
          activeRowType="single"
          editableRowKeys={[1]}
          columns={[
            {
              colKey: 'name',
              title: 'Name',
              edit: {
                component: Input,
                keepEditMode: true,
                showEditIcon: false,
              },
            },
          ]}
        />,
      );

      const input = wrapper.find('input');
      expect(input.exists()).toBe(true);

      await input.trigger('click');

      expect(wrapper.find('tbody tr').classes()).toContain('t-table__row--active');
    });

    it('keeps stopping propagation for regular editable cells', async () => {
      const wrapper = mount(
        <PrimaryTable
          rowKey="id"
          data={[{ id: 1, name: 'Alice' }]}
          activeRowType="single"
          editableRowKeys={[1]}
          columns={[{ colKey: 'name', title: 'Name', edit: { component: Input } }]}
        />,
      );

      await wrapper.find('input').trigger('click');

      expect(wrapper.find('tbody tr').classes()).not.toContain('t-table__row--active');
    });
  });
});
