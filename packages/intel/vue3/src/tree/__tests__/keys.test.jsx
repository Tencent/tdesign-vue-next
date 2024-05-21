import { mount } from '@vue/test-utils';
import Tree from 'tdesign-vue-next'

describe('Tree:keys', () => {
  vi.useRealTimers();
  describe(':props.keys', () => {
    it('可指定树结构监听分配的属性', async () => {
      const data = [
        {
          id: 't1',
          name: 'node.t1',
          subnodes: [
            {
              id: 't1.1',
              name: 'node.t1.1',
            },
            {
              id: 't1.2',
              name: 'node.t1.2',
            },
          ],
        },
      ];

      const keys = {
        value: 'id',
        label: 'name',
        children: 'subnodes',
      };

      const wrapper = mount({
        data() {
          return {};
        },
        render() {
          return <Tree transition={false} keys={keys} data={data} expandAll></Tree>;
        },
      });

      const t1 = wrapper.find('[data-value="t1"]');
      const t1d1 = wrapper.find('[data-value="t1.1"]');
      const t1d2 = wrapper.find('[data-value="t1.2"]');

      expect(t1.exists()).toBe(true);
      expect(t1d1.exists()).toBe(true);
      expect(t1d2.exists()).toBe(true);

      expect(t1.text()).toBe('node.t1');
      expect(t1d1.text()).toBe('node.t1.1');
      expect(t1d2.text()).toBe('node.t1.2');
    });
  });
});
