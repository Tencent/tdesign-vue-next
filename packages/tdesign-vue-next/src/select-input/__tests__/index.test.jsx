import { mount } from '@vue/test-utils';
import { CloseCircleFilledIcon } from 'tdesign-icons-vue-next';
import { expect, it, vi } from 'vitest';
import { SelectInput } from 'tdesign-vue-next';

describe('selectInput', () => {
  describe(':props', () => {
    it('', () => {
      const wrapper = mount(SelectInput, {
        props: {
          value: 'tdesign',
        },
      });
      expect(wrapper.exists()).toBe(true);
    });
    it('allowInput', () => {
      [true, false].forEach((allowInput) => {
        const props = {
          allowInput,
          value: 'tdesign',
        };
        const wrapper = mount(SelectInput, { props });
        expect(wrapper.vm.allowInput).toBe(allowInput);
      });
    });
    it('autoWidth', async () => {
      const wrapper = mount(SelectInput, {
        props: {
          value: 'tdesign',
          autoWidth: true,
        },
      });
      const el = wrapper.find('.t-input__wrap');
      const classes = el.classes();
      expect(classes).contains('t-input--auto-width');
    });
    it('borderless', async () => {
      const wrapper = mount(SelectInput, {
        props: {
          value: 'tdesign',
          borderless: true,
        },
      });
      const classes = wrapper.find('.t-select-input').classes();
      expect(classes).contains('t-select-input--borderless');
    });
    it('clearable', async () => {
      const wrapper = mount(SelectInput, {
        props: {
          inputValue: 'tdesign',
          allowInput: true,
          clearable: true,
          value: 'tdesign',
        },
      });
      const el = wrapper.find('.t-input');
      await el.trigger('mouseenter');
      expect(wrapper.find('.t-input__clear').exists()).toBeTruthy();
    });
    it('placeholder', async () => {
      const placeholder = '请选择';
      const wrapper = mount(SelectInput, {
        props: {
          placeholder,
          value: 'tdesign',
        },
      });
      const el = wrapper.find('.t-input__inner');
      expect(el.attributes('placeholder')).toBe(placeholder);
    });
    it('disabled', async () => {
      const disabled = true;
      const wrapper = mount(SelectInput, {
        props: {
          value: 'tdesign',
          disabled,
        },
      });
      const el = wrapper.find('.t-is-disabled');
      expect(el.classes()).contains('t-is-disabled');
    });
    it('inputValue', async () => {
      const text = 'TDesign';
      const wrapper = mount(SelectInput, {
        props: {
          'allowInput': true,
          'inputValue': 'inputValue',
          'value': 'tdesign',
          'on-input-change': (e) => {
            wrapper.setProps({ inputValue: e });
          },
        },
      });
      const el = wrapper.find('input');
      await el.setValue(text);
      expect(wrapper.props('inputValue')).toBe(text);
    });
    it('multiple', async () => {
      const value = [
        { label: 'tdesign-vue', value: 1 },
        { label: 'tdesign-react', value: 2 },
        { label: 'tdesign-miniprogram', value: 3 },
      ];
      const wrapper = mount(() => <SelectInput value={value} multiple />);
      const tags = wrapper.findAll('.t-tag');
      expect(tags.length).toBe(value.length);
    });
    it('status', async () => {
      const statusList = [
        { status: 'default', tips: '这是普通状态的文本提示' },
        { status: 'success', tips: '校验通过的文本提示' },
        { status: 'warning', tips: '校验不通过的文本提示' },
        { status: 'error', tips: '校验存在严重问题的文本提示' },
      ];
      statusList.forEach((item) => {
        const wrapper = mount(() => {
          return <SelectInput value="tdesginer" {...item} />;
        });
        const tips = wrapper.find('.t-input__tips');
        expect(tips.classes()).contains(`t-tips`);
        expect(tips.classes()).contains(`t-is-${item.status}`);
      });
    });
  });

  describe(':event', () => {
    it('onFocus onBlur', async () => {
      const onFocus = vi.fn();
      const onBlur = vi.fn();

      const wrapper = mount(SelectInput, {
        props: {
          'allowInput': true,
          'value': 'tdesign',
          'inputValue': 'inputValue',
          'on-input-change': (e) => {
            wrapper.setProps({ inputValue: e });
          },
          'on-focus': onFocus,
          'on-blur': onBlur,
        },
      });
      const el = wrapper.find('.t-input__inner');
      await el.trigger('focus');
      await el.trigger('blur');
      //   await el.setValue(text);
      expect(onBlur).toBeCalled();
      expect(onFocus).toBeCalled();
    });
    it('onClear', async () => {
      const onClear = vi.fn();
      const wrapper = mount(SelectInput, {
        props: {
          'allowInput': true,
          'clearable': true,
          'value': { label: 'tdesign-vue', value: 1 },
          'on-clear': onClear,
        },
      });
      const input = wrapper.find('.t-input');
      await input.trigger('mouseenter');
      await wrapper.vm.$nextTick();
      const closeIcon = wrapper.findComponent(CloseCircleFilledIcon);
      await closeIcon.trigger('click');
      await wrapper.vm.$nextTick();
      expect(onClear).toBeCalled();
    });
    it('onEnter', async () => {
      const onEnter = vi.fn();
      const wrapper = mount(SelectInput, {
        props: {
          'allowInput': true,
          'value': { label: 'tdesign-vue', value: 1 },
          'on-enter': onEnter,
        },
      });
      const input = wrapper.find('.t-input__inner');
      await input.setValue('tdesign-vue-next');
      await wrapper.vm.$nextTick();
      await input.trigger('keydown.enter');
      await wrapper.vm.$nextTick();
      expect(onEnter).toBeCalled();
    });
    it('on-popup-visible-change', async () => {
      const onChange = vi.fn();
      const slots = {
        panel: () => (
          <div class="red_panel" style="background: red; height: 100px; width: 100px">
            panel
          </div>
        ),
      };
      const wrapper = mount(() => (
        <SelectInput value={{ label: 'tdesign-vue', value: 1 }} v-slots={slots} on-popup-visible-change={onChange} />
      ));
      const input = wrapper.find('.t-input__wrap');
      await input.trigger('mouseenter');
      await input.trigger('click');
      await new Promise(setTimeout);
      expect(onChange).toBeCalled();
    });
  });

  describe(':slot', () => {
    it('panel', async () => {
      const text = 'panel';
      const slots = {
        panel: () => (
          <div class="red_panel" style="background: red; height: 100px; width: 100px">
            {text}
          </div>
        ),
      };
      const wrapper = mount(() => (
        <SelectInput value={{ label: 'tdesign-vue', value: 1 }} v-slots={slots} popupVisible={true} />
      ));
      await new Promise(setTimeout);
      expect(document.querySelector('.red_panel').textContent).toEqual(text);
    });
  });
});
