import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { AppIcon, CloseCircleFilledIcon, CloseIcon } from 'tdesign-icons-vue-next';
import { nextTick, ref } from '@td/adapter-vue';
import TagInput from 'tdesign-vue-next';

describe('tagInput', () => {
  describe(':props', () => {
    it(':value', () => {
      const tags = ref(['Vue', 'React']);
      const wrapper = mount(() => <TagInput v-model={tags.value} />);
      const tagList = wrapper.findAll('.t-tag');
      expect(tagList.length).toBe(2);
    });

    it(':defaultValue', () => {
      const tags = ref(['Vue', 'React']);
      const wrapper = mount(() => <TagInput defaultValue={tags.value} />);
      const tagList = wrapper.findAll('.t-tag');
      expect(tagList.length).toBe(2);
    });

    it(':autoWidth', () => {
      const wrapper = mount(() => <TagInput autoWidth />);
      expect(wrapper.classes()).toContain('t-input--auto-width');
    });

    it(':clearable', async () => {
      const tags = ref(['Vue', 'React']);
      const wrapper = mount(() => <TagInput v-model={tags.value} clearable />);
      const input = wrapper.find('.t-input');
      input.trigger('mouseenter');
      await nextTick();
      const closeIcon = wrapper.findComponent(CloseCircleFilledIcon);
      expect(closeIcon.exists()).toBeTruthy();
    });

    it(':disabled', () => {
      const wrapper = mount(() => <TagInput disabled />);
      const input = wrapper.find('.t-input');
      expect(input.classes()).toContain('t-is-disabled');
    });

    it(':dragSort', () => {
      const tags = ref(['Vue', 'React']);
      const wrapper = mount(() => <TagInput v-model={tags.value} dragSort />);
      const tagList = wrapper.findAll('.t-tag');
      expect(tagList[0].element.getAttribute('draggable')).toBeTruthy();
      expect(tagList[1].element.getAttribute('draggable')).toBeTruthy();
    });

    it(':excessTagsDisplayType', () => {
      const tags = ref(['Vue', 'React', 'Vue', 'React', 'Vue', 'React', 'Vue', 'React']);
      const wrapper = mount(() => <TagInput v-model={tags.value} />);
      const wrap = wrapper.find('.t-input__wrap');
      expect(wrap.classes()).toContain('t-tag-input--break-line');
    });

    it(':inputProps', () => {
      const wrapper = mount(() => <TagInput inputProps={{ label: 'label' }} />);
      const label = wrapper.find('.t-input__prefix');
      expect(label.exists()).toBeTruthy();
      expect(label.text()).toBe('label');
    });

    it(':inputValue', () => {
      const wrapper = mount(() => <TagInput inputValue="123" />);
      const input = wrapper.find('.t-input__inner');
      expect(input.exists()).toBeTruthy();
      expect(input.element.value).toBe('123');
    });

    it(':defaultInputValue', () => {
      const wrapper = mount(() => <TagInput defaultInputValue="123" />);
      const input = wrapper.find('.t-input__inner');
      expect(input.exists()).toBeTruthy();
      expect(input.element.value).toBe('123');
    });

    it(':label', () => {
      const wrapper = mount(() => <TagInput label="label" />);
      const label = wrapper.find('.t-input__prefix');
      expect(label.exists()).toBeTruthy();
      expect(label.text()).toBe('label');
    });

    it(':placeholder', () => {
      const wrapper = mount(() => <TagInput placeholder="请输入" />);
      const input = wrapper.find('.t-input__inner');
      expect(input.element.getAttribute('placeholder')).toBe('请输入');
    });

    it(':readonly', () => {
      const value = ref('123');
      const wrapper = mount(() => <TagInput readonly inputValue={value.value} />);
      const input = wrapper.find('.t-input__inner');
      value.value = '123123';
      expect(input.element.value).toBe('123');
    });

    it(':size', () => {
      const sizeList = ['small', 'large'];
      sizeList.forEach((size) => {
        const wrapper = mount(() => <TagInput size={size} />);
        const input = wrapper.find('.t-input');
        expect(input.classes()).toContain(`t-size-${size.slice(0, 1)}`);
      });
    });

    it(':status', () => {
      const statusList = ['success', 'warning', 'error'];
      statusList.forEach((status) => {
        const wrapper = mount(() => <TagInput status={status} />);
        const input = wrapper.find('.t-input');
        expect(input.classes()).toContain(`t-is-${status}`);
      });
    });

    it(':suffix', () => {
      const wrapper = mount(() => <TagInput suffix="suffix" />);
      const suffix = wrapper.find('.t-input__suffix');
      expect(suffix.exists()).toBeTruthy();
      expect(suffix.text()).toBe('suffix');
    });

    it(':suffixIcon', () => {
      const slots = {
        suffixIcon: () => <AppIcon />,
      };
      const wrapper = mount(() => <TagInput v-slots={slots} />);
      const suffix = wrapper.find('.t-input__suffix');
      expect(suffix.exists()).toBeTruthy();
      expect(suffix.findComponent(AppIcon)).toBeTruthy();
    });

    it(':prefixIcon', () => {
      const slots = {
        prefixIcon: () => <AppIcon />,
      };
      const wrapper = mount(() => <TagInput v-slots={slots} />);
      const prefix = wrapper.find('.t-input__prefix');
      expect(prefix.exists()).toBeTruthy();
      expect(prefix.findComponent(AppIcon)).toBeTruthy();
    });

    it(':tips', () => {
      const wrapper = mount(() => <TagInput tips="tips" />);
      const tips = wrapper.find('.t-input__tips');
      expect(tips.exists()).toBeTruthy();
      expect(tips.text()).toBe('tips');
    });

    it(':tagProps', () => {
      const wrapper = mount(() => <TagInput tagProps={{ theme: 'success' }} />);
      const tags = wrapper.findAll('.t-tag');
      tags.forEach((tag) => {
        expect(tag.classes()).toContain('t-is--success');
      });
    });

    it(':minCollapsedNum', async () => {
      const tags = ref(['Vue', 'React']);
      const wrapper = mount(() => <TagInput v-model={tags.value} minCollapsedNum={1} />);
      const tagList = wrapper.findAll('.t-tag');
      expect(tagList.length).toBe(2);
      expect(tagList[0].text()).toBe('Vue');
      expect(tagList[1].text()).toBe('+1');
    });
  });

  describe(':events', () => {
    it(':onBlur', async () => {
      const fn = vi.fn();
      const wrapper = mount(() => <TagInput onBlur={fn} />);
      const input = wrapper.find('.t-input input');
      await input.trigger('blur');
      expect(fn).toBeCalled();
    });

    it(':onFocus', async () => {
      const fn = vi.fn();
      const wrapper = mount(() => <TagInput onFocus={fn} />);
      const input = wrapper.find('.t-input input');
      await input.trigger('focus');
      expect(fn).toBeCalled();
    });

    it(':onClear', async () => {
      const fn = vi.fn();
      const tags = ref(['Vue', 'React']);
      const wrapper = mount(() => <TagInput v-model={tags.value} clearable onClear={fn} />);
      const input = wrapper.find('.t-input');
      input.trigger('mouseenter');
      await nextTick();
      const closeIcon = wrapper.findComponent(CloseCircleFilledIcon);
      await closeIcon.trigger('click');
      expect(fn).toBeCalled();
      expect(tags.value).toEqual([]);
    });

    it(':onMouseenter', async () => {
      const fn = vi.fn();
      const wrapper = mount(() => <TagInput onMouseenter={fn} />);
      const input = wrapper.find('.t-input');
      await input.trigger('mouseenter');
      await nextTick();
      expect(fn).toBeCalled();
    });

    it(':onMouseleave', async () => {
      const fn = vi.fn();
      const wrapper = mount(() => <TagInput onMouseleave={fn} />);
      const input = wrapper.find('.t-input');
      await input.trigger('mouseleave');
      await nextTick();
      expect(fn).toBeCalled();
    });

    it(':onPaste', async () => {
      const fn = vi.fn();
      const wrapper = mount(() => <TagInput onPaste={fn} />);
      const input = wrapper.find('.t-input input');
      await input.trigger('paste');
      await nextTick();
      expect(fn).toBeCalled();
    });

    it(':onRemove', async () => {
      const fn = vi.fn();
      const tags = ref(['Vue', 'React']);
      const wrapper = mount(() => <TagInput v-model={tags.value} onRemove={fn} />);
      const tagList = wrapper.findAll('.t-tag');
      const closeBtn = tagList[1].findComponent(CloseIcon);
      await closeBtn.trigger('click');
      await nextTick();
      expect(fn).toBeCalled();
    });

    it(':onChange', async () => {
      const fn = vi.fn();
      const tags = ref(['Vue', 'React']);
      const wrapper = mount(() => <TagInput v-model={tags.value} onChange={fn} />);
      const tagList = wrapper.findAll('.t-tag');
      const closeBtn = tagList[1].findComponent(CloseIcon);
      await closeBtn.trigger('click');
      await nextTick();
      expect(fn).toBeCalled();
    });

    it(':onInputChange', async () => {
      const tags = ref(['Vue', 'React']);
      const data = ref('');
      const value = ref('');
      const handleChange = (val) => {
        value.value = val;
      };
      await nextTick();
      const wrapper = mount(() => (
        <TagInput v-model={tags.value} inputValue={data.value} onInputChange={handleChange} />
      ));
      const el = wrapper.find('.t-input__wrap input').element;
      const simulateEvent = (text, event) => {
        el.value = text;
        el.dispatchEvent(new Event(event));
      };
      simulateEvent('2', 'input');
      await nextTick();
      expect(value.value).toBe('2');
    });
  });
});
