import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { describe, expect, it, vi } from 'vitest';

import { CheckTag, CheckTagGroup } from '@tdesign/components/tag';
import type { CheckTagGroupOption } from '@tdesign/components/tag';

const CHECK_TAG_GROUP = '.t-check-tag-group';
const CHECKED = 't-tag--checked';

describe('CheckTagGroup', () => {
  describe('props', () => {
    it(':options[array]', () => {
      const options = [
        { label: 'Option 1', value: 1 },
        { label: 'Option 2', value: 2 },
        { label: 'Option 3', value: 3 },
      ];
      const wrapper = mount(<CheckTagGroup options={options} />);
      expect(wrapper.find(CHECK_TAG_GROUP).exists()).toBe(true);
      expect(wrapper.findAllComponents(CheckTag)).toHaveLength(3);

      // 支持禁用与自定义尺寸
      const options2 = [
        { label: 'Enabled', value: 1, disabled: false },
        { label: 'Disabled', value: 2, disabled: true },
      ];
      const tags2 = mount(<CheckTagGroup options={options2} />).findAllComponents(CheckTag);
      expect(tags2[0].classes()).not.toContain('t-tag--disabled');
      expect(tags2[1].classes()).toContain('t-tag--disabled');

      const options3: CheckTagGroupOption[] = [
        { label: 'Small', value: 1, size: 'small' },
        { label: 'Large', value: 2, size: 'large' },
      ];
      const tags3 = mount(<CheckTagGroup options={options3} />).findAllComponents(CheckTag);
      expect(tags3[0].classes()).toContain('t-size-s');
      expect(tags3[1].classes()).toContain('t-size-l');

      // label / content / default 为函数时渲染自定义节点，缺省时展示 value
      const options4: CheckTagGroupOption[] = [
        { label: () => <span class="fn-label">Fn Label</span>, value: 4 },
        { label: undefined, content: () => <span class="fn-content">Fn Content</span>, value: 5 },
        { label: undefined, default: () => <span class="fn-default">Fn Default</span>, value: 6 },
        { label: undefined, value: 7 },
      ];
      const wrapper4 = mount(<CheckTagGroup options={options4} />);
      expect(wrapper4.find('.fn-label').exists()).toBe(true);
      expect(wrapper4.find('.fn-content').exists()).toBe(true);
      expect(wrapper4.find('.fn-default').exists()).toBe(true);
      expect(wrapper4.text()).toContain('7');

      // content / default 非函数时回退展示 value
      const options5: CheckTagGroupOption[] = [
        { label: undefined, content: 'plain content', value: 8 },
        { label: undefined, default: 'plain default', value: 9 },
      ];
      const wrapper5 = mount(<CheckTagGroup options={options5} />);
      expect(wrapper5.text()).toContain('8');
      expect(wrapper5.text()).toContain('9');
    });

    it(':options[undefined]', () => {
      const wrapper = mount(<CheckTagGroup />);
      expect(wrapper.find(CHECK_TAG_GROUP).exists()).toBe(true);
      expect(wrapper.findAllComponents(CheckTag)).toHaveLength(0);
    });

    it(':value[array]', () => {
      const options = [
        { label: 'Option 1', value: 1 },
        { label: 'Option 2', value: 2 },
      ];
      const tags = mount(<CheckTagGroup options={options} value={[1]} />).findAllComponents(CheckTag);
      expect(tags[0].classes()).toContain(CHECKED);
      expect(tags[1].classes()).not.toContain(CHECKED);
    });

    it(':defaultValue[array]', () => {
      const options = [
        { label: 'Option 1', value: 1 },
        { label: 'Option 2', value: 2 },
      ];
      const tags = mount(<CheckTagGroup options={options} defaultValue={[1]} />).findAllComponents(CheckTag);
      expect(tags[0].classes()).toContain(CHECKED);
      expect(tags[1].classes()).not.toContain(CHECKED);
    });

    it(':modelValue[array]', () => {
      const options = [
        { label: 'Option 1', value: 1 },
        { label: 'Option 2', value: 2 },
      ];
      const tags = mount(<CheckTagGroup options={options} modelValue={[1]} />).findAllComponents(CheckTag);
      expect(tags[0].classes()).toContain(CHECKED);
      expect(tags[1].classes()).not.toContain(CHECKED);
    });

    it(':multiple[boolean]', async () => {
      const options = [
        { label: 'Option 1', value: 1 },
        { label: 'Option 2', value: 2 },
      ];

      // multiple: true 支持同时选中多个
      const onChangeFn = vi.fn();
      const wrapper = mount(<CheckTagGroup options={options} multiple onChange={onChangeFn} />);
      const tags = wrapper.findAllComponents(CheckTag);

      await tags[0].trigger('click');
      expect(onChangeFn).toHaveBeenLastCalledWith([1], expect.anything());

      await tags[1].trigger('click');
      expect(onChangeFn).toHaveBeenLastCalledWith([1, 2], expect.anything());

      await tags[0].trigger('click');
      expect(onChangeFn).toHaveBeenLastCalledWith([2], expect.anything());
      expect(onChangeFn).toHaveBeenCalledTimes(3);

      // multiple: false 仅支持单选
      const onChangeFn2 = vi.fn();
      const wrapper2 = mount(<CheckTagGroup options={options} multiple={false} onChange={onChangeFn2} />);
      const tags2 = wrapper2.findAllComponents(CheckTag);

      await tags2[0].trigger('click');
      expect(onChangeFn2).toHaveBeenLastCalledWith([1], expect.anything());

      await tags2[1].trigger('click');
      expect(onChangeFn2).toHaveBeenLastCalledWith([2], expect.anything());

      await tags2[1].trigger('click');
      expect(onChangeFn2).toHaveBeenLastCalledWith([], expect.anything());
      expect(onChangeFn2).toHaveBeenCalledTimes(3);
    });

    it(':checkedProps[object]', async () => {
      const wrapper = mount(
        <CheckTagGroup options={[{ label: 'Option', value: 1 }]} checkedProps={{ theme: 'success' }} />,
      );
      const tag = wrapper.findComponent(CheckTag);
      expect(tag.classes()).not.toContain('t-tag--success');

      await tag.trigger('click');
      expect(tag.classes()).toContain('t-tag--success');
    });

    it(':uncheckedProps[object]', () => {
      const wrapper = mount(
        <CheckTagGroup options={[{ label: 'Option', value: 1 }]} uncheckedProps={{ theme: 'warning' }} />,
      );
      expect(wrapper.findComponent(CheckTag).classes()).toContain('t-tag--warning');
    });
  });

  describe('slots', () => {
    it('option', () => {
      const wrapper = mount({
        render() {
          return (
            <CheckTagGroup
              options={[{ label: 'Option', value: 1 }]}
              v-slots={{ option: () => <span class="custom-option">Custom</span> }}
            />
          );
        },
      });
      expect(wrapper.find('.custom-option').exists()).toBe(true);
    });

    it('label', () => {
      const wrapper = mount({
        render() {
          return (
            <CheckTagGroup
              options={[{ label: 'Option', value: 1 }]}
              v-slots={{ label: () => <span class="custom-label">Custom Label</span> }}
            />
          );
        },
      });
      expect(wrapper.find('.custom-label').exists()).toBe(true);
    });

    it('option: takes precedence over label', () => {
      const wrapper = mount({
        render() {
          return (
            <CheckTagGroup
              options={[{ label: 'Option', value: 1 }]}
              v-slots={{
                option: () => <span class="custom-option">Custom</span>,
                label: () => <span class="custom-label">Custom Label</span>,
              }}
            />
          );
        },
      });
      expect(wrapper.find('.custom-option').exists()).toBe(true);
      expect(wrapper.find('.custom-label').exists()).toBe(false);
    });
  });

  describe('events', () => {
    it('onChange', async () => {
      const options = [
        { label: 'Option 1', value: 1 },
        { label: 'Option 2', value: 2 },
      ];
      const onChangeFn = vi.fn();
      const wrapper = mount(<CheckTagGroup options={options} onChange={onChangeFn} />);

      await wrapper.findAllComponents(CheckTag)[0].trigger('click');

      expect(onChangeFn).toHaveBeenCalledTimes(1);
      expect(onChangeFn.mock.calls[0][0]).toEqual([1]);
      expect(onChangeFn.mock.calls[0][1].e).toBeDefined();
      expect(onChangeFn.mock.calls[0][1].value).toBe(1);
    });

    it('onChange: context type is check', async () => {
      const onChangeFn = vi.fn();
      const wrapper = mount(<CheckTagGroup options={[{ label: 'Option', value: 1 }]} onChange={onChangeFn} />);

      await wrapper.findComponent(CheckTag).trigger('click');

      expect(onChangeFn.mock.calls[0][1].type).toBe('check');
    });

    it('onChange: context type is uncheck', async () => {
      const onChangeFn = vi.fn();
      const wrapper = mount(
        <CheckTagGroup options={[{ label: 'Option', value: 1 }]} value={[1]} onChange={onChangeFn} />,
      );

      await wrapper.findComponent(CheckTag).trigger('click');
      await nextTick();

      expect(onChangeFn.mock.calls[0][1].type).toBe('uncheck');
    });
  });
});
