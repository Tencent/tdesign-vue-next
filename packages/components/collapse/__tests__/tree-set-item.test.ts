import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { expect } from 'vitest';
import Tree from '@tdesign/components/tree';

const delay = (ms = 10) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

describe('Tree', () => {
  describe('instance methods', () => {
    describe('setItem', () => {
      it('does not mutate the options object passed by the caller', async () => {
        const data = [
          { value: 't1', label: 't1' },
          { value: 't2', label: 't2' },
        ];
        const wrapper = mount(Tree, { props: { data } });
        await nextTick();
        const tree = wrapper.vm as any;

        const options = { expanded: true };
        tree.setItem('t1', options);
        await delay();
        expect(tree.getItem('t1').expanded).toBe(true);

        tree.setItem('t2', options);
        await delay();
        expect(tree.getItem('t2').expanded).toBe(true);
        expect(options).toEqual({ expanded: true });
      });

      it('keeps the caller object intact for a checked state', async () => {
        const data = [{ value: 't1', label: 't1' }];
        const wrapper = mount(Tree, { props: { data, checkable: true } });
        await nextTick();
        const tree = wrapper.vm as any;

        const options = { checked: true };
        tree.setItem('t1', options);
        await delay();
        expect(tree.getItem('t1').checked).toBe(true);
        expect(options).toEqual({ checked: true });
      });
    });
  });
});
