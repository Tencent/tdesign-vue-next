// @ts-nocheck
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { TagInput } from '@tdesign/components/tag-input';

describe('TagInput api consistency', () => {
  it('renders the tips slot (issue #6907 item 1)', () => {
    const wrapper = mount({
      render() {
        return <TagInput defaultValue={['a']}>{{ tips: () => <span class="custom-tips">custom tips</span> }}</TagInput>;
      },
    });

    expect(wrapper.find('.custom-tips').exists()).toBeTruthy();
    wrapper.unmount();
  });

  it('passes newTags to onDragSort (issue #6907 item 2)', async () => {
    const calls = [];
    const wrapper = mount(TagInput, {
      props: {
        defaultValue: ['a', 'b', 'c'],
        dragSort: true,
        onDragSort: (ctx) => calls.push(ctx),
      },
    });

    await nextTick();

    const tags = wrapper.findAll('.t-tag');
    expect(tags.length).toBe(3);

    const makeDragEvent = (type: string, props: Record<string, any> = {}) => {
      const e = new Event(type, { bubbles: true, cancelable: true });
      Object.entries(props).forEach(([k, v]) => Object.defineProperty(e, k, { value: v }));
      return e;
    };

    // happy-dom 不做布局，getBoundingClientRect 全为 0，会让拖拽的 overlap 判断直接 return
    const stubRect = (el: Element, x: number, width: number) => {
      el.getBoundingClientRect = () =>
        ({ x, y: 0, left: x, top: 0, width, height: 20, right: x + width, bottom: 20, toJSON: () => ({}) } as DOMRect);
    };

    const current = tags[0].element;
    stubRect(current, 0, 40);
    current.dispatchEvent(makeDragEvent('dragstart', { clientX: 10 }));

    const target = tags[2].element;
    stubRect(target, 80, 40);
    target.dispatchEvent(makeDragEvent('dragover', { clientX: 95 }));

    await nextTick();

    expect(calls.length).toBeGreaterThan(0);
    const ctx = calls[calls.length - 1];
    expect(ctx).toHaveProperty('newTags');
    expect(Array.isArray(ctx.newTags)).toBe(true);

    wrapper.unmount();
  });
  it('builds newTags from the current tags, not the initial value (issue #6907 item 2)', async () => {
    const calls = [];
    const wrapper = mount(TagInput, {
      props: {
        defaultValue: ['a', 'b'],
        dragSort: true,
        onDragSort: (ctx) => calls.push(ctx),
      },
    });

    await nextTick();

    // 先删掉 'a'，标签集合变成 ['b']
    await wrapper.findAll('.t-tag')[0].find('.t-icon-close').trigger('click');
    await nextTick();
    expect(wrapper.findAll('.t-tag').length).toBe(1);
    expect(wrapper.find('.t-tag').text()).toBe('b');

    const stubRect = (el: Element, x: number, width: number) => {
      el.getBoundingClientRect = () =>
        ({ x, y: 0, left: x, top: 0, width, height: 20, right: x + width, bottom: 20, toJSON: () => ({}) } as DOMRect);
    };
    const makeDragEvent = (type: string, props: Record<string, any> = {}) => {
      const e = new Event(type, { bubbles: true, cancelable: true });
      Object.entries(props).forEach(([k, v]) => Object.defineProperty(e, k, { value: v }));
      return e;
    };

    // 再加一个 tag，当前集合变成 ['b', 'x']
    const input = wrapper.find('input');
    await input.setValue('x');
    await input.trigger('keydown', { key: 'Enter', code: 'Enter', keyCode: 13 });
    await nextTick();
    expect(wrapper.findAll('.t-tag').length).toBe(2);

    const tags = wrapper.findAll('.t-tag');
    stubRect(tags[0].element, 0, 40);
    stubRect(tags[1].element, 80, 40);
    tags[0].element.dispatchEvent(makeDragEvent('dragstart', { clientX: 10 }));
    tags[1].element.dispatchEvent(makeDragEvent('dragover', { clientX: 95 }));
    await nextTick();

    const ctx = calls[calls.length - 1];
    // 基于当前 ['b', 'x'] 排序，而不是初始的 ['a', 'b']
    expect(ctx.newTags).toEqual(['x', 'b']);

    wrapper.unmount();
  });
});
