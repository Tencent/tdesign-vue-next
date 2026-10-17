import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { describe, expect, it, vi } from 'vitest';

import { CheckTag } from '@tdesign/components/tag';
import props from '@tdesign/components/tag/check-tag-props';

describe('CheckTag', () => {
  describe('props', () => {
    it(':checked[boolean]', () => {
      // default: false
      expect(mount(<CheckTag />).classes()).not.toContain('t-tag--checked');

      // true
      expect(mount(<CheckTag checked />).classes()).toContain('t-tag--checked');

      // false
      expect(mount(<CheckTag checked={false} />).classes()).not.toContain('t-tag--checked');
    });

    it(':defaultChecked[boolean]', () => {
      expect(mount(<CheckTag defaultChecked />).classes()).toContain('t-tag--checked');
    });

    it(':modelValue[boolean]', () => {
      expect(mount(<CheckTag modelValue />).classes()).toContain('t-tag--checked');
      expect(mount(<CheckTag modelValue={false} />).classes()).not.toContain('t-tag--checked');
    });

    it(':checkedProps[object]', () => {
      expect(mount(<CheckTag checked checkedProps={{ theme: 'success' }} />).classes()).toContain('t-tag--success');
    });

    it(':uncheckedProps[object]', () => {
      expect(mount(<CheckTag uncheckedProps={{ theme: 'warning' }} />).classes()).toContain('t-tag--warning');
    });

    it(':content[string/number/function]', () => {
      expect(mount(<CheckTag content="Check Content" />).text()).toContain('Check Content');

      expect(mount(<CheckTag content={123} />).text()).toContain('123');

      const wrapper = mount(<CheckTag content={() => <span class="custom-node">TNode</span>} />);
      expect(wrapper.find('.custom-node').exists()).toBe(true);
    });

    it(':default[string/function]', () => {
      expect(mount(<CheckTag default="Default Content" />).text()).toContain('Default Content');

      const wrapper = mount(<CheckTag default={() => <span class="custom-node">TNode</span>} />);
      expect(wrapper.find('.custom-node').exists()).toBe(true);
    });

    it(':disabled[boolean]', () => {
      // true
      expect(mount(<CheckTag disabled />).classes()).toContain('t-tag--disabled');

      // false
      expect(mount(<CheckTag disabled={false} />).classes()).not.toContain('t-tag--disabled');
    });

    it(':size[small/medium/large]', () => {
      const { validator } = props.size;
      expect(validator('small')).toBe(true);
      expect(validator('medium')).toBe(true);
      expect(validator('large')).toBe(true);
      // @ts-expect-error 校验非法枚举值
      expect(validator('mini')).toBe(false);
      // @ts-expect-error 空值不参与校验
      expect(validator('')).toBe(true);
      expect(validator(undefined)).toBe(true);

      expect(mount(<CheckTag size="small" />).classes()).toContain('t-size-s');
      expect(mount(<CheckTag size="medium" />).classes()).toContain('t-size-m');
      expect(mount(<CheckTag size="large" />).classes()).toContain('t-size-l');
    });

    it(':value[string/number]', async () => {
      const onChangeFn = vi.fn();
      const wrapper = mount(<CheckTag value="tag-1" onChange={onChangeFn} />);
      await wrapper.findComponent(CheckTag).trigger('click');

      expect(onChangeFn).toHaveBeenCalledTimes(1);
      expect(onChangeFn.mock.calls[0][1].value).toBe('tag-1');
    });
  });

  describe('slots', () => {
    it('default', () => {
      const wrapper = mount(<CheckTag>Default Slot</CheckTag>);
      expect(wrapper.text()).toBe('Default Slot');
    });

    it('content', () => {
      const wrapper = mount(<CheckTag v-slots={{ content: () => <span class="slot-content">Content</span> }} />);
      expect(wrapper.find('.slot-content').exists()).toBe(true);
    });
  });

  describe('events', () => {
    it('onChange', async () => {
      const fn = vi.fn();
      const wrapper = mount(<CheckTag onChange={fn} />);
      await wrapper.findComponent(CheckTag).trigger('click');

      expect(fn).toHaveBeenCalledTimes(1);
      expect(fn.mock.calls[0][0]).toBe(true);
    });

    it('onClick', async () => {
      const fn = vi.fn();
      const wrapper = mount(<CheckTag onClick={fn} />);
      await wrapper.findComponent(CheckTag).trigger('click');

      expect(fn).toHaveBeenCalledTimes(1);
      expect(fn.mock.calls[0][0].e.type).toBe('click');
    });

    it('onChange: should not be triggered when disabled', async () => {
      const fn = vi.fn();
      const wrapper = mount(<CheckTag disabled onChange={fn} />);
      await wrapper.findComponent(CheckTag).trigger('click');

      expect(fn).not.toHaveBeenCalled();
    });

    it('onClick: should not be triggered when disabled', async () => {
      const fn = vi.fn();
      const wrapper = mount(<CheckTag disabled onClick={fn} />);
      await wrapper.findComponent(CheckTag).trigger('click');

      expect(fn).not.toHaveBeenCalled();
    });
  });

  describe('keyboard events', () => {
    it('onChange: triggered by Enter key', async () => {
      const onChangeFn = vi.fn();
      const wrapper = mount(<CheckTag onChange={onChangeFn}>CheckTag</CheckTag>, { attachTo: document.body });
      const tag = wrapper.findComponent(CheckTag);

      await tag.trigger('focus');
      tag.element.dispatchEvent(new KeyboardEvent('keydown', { code: 'Enter', key: 'Enter' }));
      await nextTick();

      expect(onChangeFn).toHaveBeenCalledTimes(1);
      wrapper.unmount();
    });

    it('onChange: triggered by Space key', async () => {
      const onChangeFn = vi.fn();
      const wrapper = mount(<CheckTag onChange={onChangeFn} />, { attachTo: document.body });
      const tag = wrapper.findComponent(CheckTag);

      await tag.trigger('focus');
      tag.element.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space', key: ' ' }));
      await nextTick();

      expect(onChangeFn).toHaveBeenCalledTimes(1);
      wrapper.unmount();
    });

    it('onChange: triggered by key when code is empty', async () => {
      const onChangeFn = vi.fn();
      const wrapper = mount(<CheckTag onChange={onChangeFn} />, { attachTo: document.body });
      const tag = wrapper.findComponent(CheckTag);

      await tag.trigger('focus');
      tag.element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      await nextTick();

      expect(onChangeFn).toHaveBeenCalledTimes(1);
      wrapper.unmount();
    });

    it('onChange: should not be triggered by other keys', async () => {
      const onChangeFn = vi.fn();
      const wrapper = mount(<CheckTag onChange={onChangeFn} />, { attachTo: document.body });
      const tag = wrapper.findComponent(CheckTag);

      await tag.trigger('focus');
      tag.element.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyA', key: 'a' }));
      await nextTick();

      expect(onChangeFn).not.toHaveBeenCalled();
      wrapper.unmount();
    });

    it('onChange: should not be triggered after blur', async () => {
      const onChangeFn = vi.fn();
      const wrapper = mount(<CheckTag onChange={onChangeFn} />, { attachTo: document.body });
      const tag = wrapper.findComponent(CheckTag);

      await tag.trigger('focus');
      await tag.trigger('blur');
      tag.element.dispatchEvent(new KeyboardEvent('keydown', { code: 'Enter', key: 'Enter' }));
      await nextTick();

      expect(onChangeFn).not.toHaveBeenCalled();
      wrapper.unmount();
    });
  });
});
