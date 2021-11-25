import { mount } from '@vue/test-utils';
import Tree from '@/src/tree/index.ts';

describe('Tree:expand', () => {
  describe('props.expandAll', () => {
    it('expandAll is true', () => {
      const data = [
        {
          value: 't1',
          children: [
            {
              value: 't1.1',
            },
          ],
        },
        {
          value: 't2',
        },
      ];
      const wrapper = mount({
        render() {
          return <Tree data={data} expandAll></Tree>;
        },
      });
      expect(wrapper.find('[data-value="t1.1"]').exists()).toBe(true);
    });
  });
});
