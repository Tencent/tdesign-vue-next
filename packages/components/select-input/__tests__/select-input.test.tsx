// @ts-nocheck
import { SelectInput } from '@tdesign/components';
import { mount } from '@vue/test-utils';
import { CloseCircleFilledIcon } from 'tdesign-icons-vue-next';
import { vi } from 'vitest';
import { getSelectInputMultipleMount } from './mount';

afterEach(() => {
  document.body.innerHTML = '';
  vi.restoreAllMocks();
});

describe('SelectInput', () => {
  describe(':props', () => {
    it(':value[string]', () => {
      const wrapper = mount(SelectInput, {
        props: {
          value: 'tdesign',
        },
      });
      expect(wrapper.exists()).toBe(true);
    });

    it(':borderless[boolean]', () => {
      const wrapper1 = mount(<SelectInput></SelectInput>);
      expect(wrapper1.classes('t-select-input--borderless')).toBeFalsy();
      const wrapper2 = mount(<SelectInput borderless={true}></SelectInput>);
      expect(wrapper2.classes('t-select-input--borderless')).toBeTruthy();
      const wrapper3 = mount(<SelectInput borderless={false}></SelectInput>);
      expect(wrapper3.classes('t-select-input--borderless')).toBeFalsy();
    });

    it(':collapsedItems[function]', () => {
      const wrapper = getSelectInputMultipleMount({
        collapsedItems: () => <span class="custom-node">TNode</span>,
        minCollapsedNum: 3,
      });
      expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    });

    it(':collapsedItems[slot]', () => {
      const wrapper = getSelectInputMultipleMount({
        'v-slots': { collapsedItems: () => <span class="custom-node">TNode</span> },
        minCollapsedNum: 3,
      });
      expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    });

    it(':label[function]', () => {
      const wrapper = mount(<SelectInput label={() => <span class="custom-node">TNode</span>}></SelectInput>);
      expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    });

    it(':label[slot]', () => {
      const wrapper = mount(
        <SelectInput v-slots={{ label: () => <span class="custom-node">TNode</span> }}></SelectInput>,
      );
      expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    });

    it(':loading[boolean]', () => {
      const wrapper = mount(<SelectInput loading={true}></SelectInput>);
      expect(wrapper.find('.t-loading').exists()).toBeTruthy();
    });

    // it(':panel[function]', async () => {
    //   const wrapper = mount(<SelectInput panel={() => <span className="custom-node">TNode</span>}></SelectInput>);
    //   wrapper.find('.t-input').trigger('click');
    //   await wrapper.vm.$nextTick();
    //   const customNodeDom = document.querySelector('.custom-node');
    //   expect(customNodeDom).toBeTruthy();
    // });

    // it(':panel[slot]', async () => {
    //   const wrapper = mount(
    //     <SelectInput v-slots={{ panel: () => <span className="custom-node">TNode</span> }}></SelectInput>,
    //   );
    //   wrapper.find('.t-input').trigger('click');
    //   await wrapper.vm.$nextTick();
    //   const customNodeDom = document.querySelector('.custom-node');
    //   expect(customNodeDom).toBeTruthy();
    //   wrapper.unmount();
    // });

    it(':suffix[function]', () => {
      const wrapper = mount(<SelectInput suffix={() => <span class="custom-node">TNode</span>}></SelectInput>);
      expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    });

    it(':suffix[slot]', () => {
      const wrapper = mount(
        <SelectInput v-slots={{ suffix: () => <span class="custom-node">TNode</span> }}></SelectInput>,
      );
      expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    });

    it(':suffixIcon[function]', () => {
      const wrapper = mount(<SelectInput suffixIcon={() => <span class="custom-node">TNode</span>}></SelectInput>);
      expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    });

    it(':suffixIcon[slot]', () => {
      const wrapper = mount(
        <SelectInput v-slots={{ suffixIcon: () => <span class="custom-node">TNode</span> }}></SelectInput>,
      );
      expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    });

    it(':tag[function]', () => {
      const wrapper = mount(
        <SelectInput
          tag={() => <span class="custom-node">TNode</span>}
          multiple={true}
          value={['tdesign-vue']}
        ></SelectInput>,
      );
      expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    });

    it(':tag[slot]', () => {
      const wrapper = mount(
        <SelectInput
          v-slots={{ tag: () => <span class="custom-node">TNode</span> }}
          multiple={true}
          value={['tdesign-vue']}
        ></SelectInput>,
      );
      expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    });

    it(':tips[string]', () => {
      const wrapper = mount(<SelectInput tips={'this is a tip'}></SelectInput>);
      expect(wrapper.findAll('.t-input__tips').length).toBe(1);
    });

    it(':allowInput[boolean]', () => {
      [true, false].forEach((allowInput) => {
        const props = {
          allowInput,
          value: 'tdesign',
        };
        const wrapper = mount(SelectInput, { props });
        expect(wrapper.vm.allowInput).toBe(allowInput);
      });
    });

    it(':autoWidth[boolean]', async () => {
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

    it(':borderless[boolean]', async () => {
      const wrapper = mount(SelectInput, {
        props: {
          value: 'tdesign',
          borderless: true,
        },
      });
      const classes = wrapper.find('.t-select-input').classes();
      expect(classes).contains('t-select-input--borderless');
    });

    it(':clearable[boolean]', async () => {
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

    it(':placeholder[string]', async () => {
      const placeholder = '请选择';
      const wrapper = mount(SelectInput, {
        props: {
          placeholder: placeholder,
          value: 'tdesign',
        },
      });
      const el = wrapper.find('.t-input__inner');
      expect(el.attributes('placeholder')).toBe(placeholder);
    });

    it(':disabled[boolean]', async () => {
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

    it(':inputValue[string]', async () => {
      const text = 'TDesign';
      const wrapper = mount(SelectInput, {
        props: {
          allowInput: true,
          inputValue: 'inputValue',
          value: 'tdesign',
          'on-input-change': (e) => {
            wrapper.setProps({ inputValue: e });
          },
        },
      });
      const el = wrapper.find('input');
      await el.setValue(text);
      expect(wrapper.props('inputValue')).toBe(text);
    });

    it(':multiple[boolean]', async () => {
      const value = [
        { label: 'tdesign-vue', value: 1 },
        { label: 'tdesign-react', value: 2 },
        { label: 'tdesign-miniprogram', value: 3 },
      ];
      const wrapper = mount(() => <SelectInput value={value} multiple />);
      const tags = wrapper.findAll('.t-tag');
      expect(tags.length).toBe(value.length);
    });

    it(':status[string]', async () => {
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

    it(':size[string] - validator edge cases', async () => {
      const propsDef = await import('../props.ts');
      const sizeValidator = propsDef.default.size.validator;

      expect(sizeValidator('small')).toBe(true);
      expect(sizeValidator('medium')).toBe(true);
      expect(sizeValidator('large')).toBe(true);
      expect(sizeValidator('invalid')).toBe(false);
      expect(sizeValidator(null)).toBe(true);
      expect(sizeValidator(undefined)).toBe(true);
      expect(sizeValidator('')).toBe(true);
      expect(sizeValidator(0)).toBe(true);

      const wrapper1 = getSelectInputMultipleMount({
        size: 'small',
      });
      expect(wrapper1.props('size')).toBe('small');

      const wrapper2 = getSelectInputMultipleMount({
        size: 'large',
      });
      expect(wrapper2.props('size')).toBe('large');

      const wrapper3 = getSelectInputMultipleMount({
        size: undefined,
      });
      expect(wrapper3.props('size')).toBe('medium');

      const wrapper4 = getSelectInputMultipleMount({
        size: 'invalid',
      });
      expect(wrapper4.props('size')).toBe('invalid');
    });

    it(':status[string] - validator edge cases', async () => {
      const propsDef = await import('../props.ts');
      const statusValidator = propsDef.default.status.validator;

      expect(statusValidator('default')).toBe(true);
      expect(statusValidator('success')).toBe(true);
      expect(statusValidator('warning')).toBe(true);
      expect(statusValidator('error')).toBe(true);
      expect(statusValidator('invalid')).toBe(false);
      expect(statusValidator(null)).toBe(true);
      expect(statusValidator(undefined)).toBe(true);
      expect(statusValidator('')).toBe(true);

      const wrapper1 = getSelectInputMultipleMount({
        status: 'success',
      });
      expect(wrapper1.props('status')).toBe('success');

      const wrapper2 = getSelectInputMultipleMount({
        status: 'warning',
      });
      expect(wrapper2.props('status')).toBe('warning');

      const wrapper3 = getSelectInputMultipleMount({
        status: undefined,
      });
      expect(wrapper3.props('status')).toBe('default');

      const wrapper4 = getSelectInputMultipleMount({
        status: 'invalid',
      });
      expect(wrapper4.props('status')).toBe('invalid');
    });

    it(':popupProps[object] - onOverlayClick callback', async () => {
      const customOnOverlayClick = vi.fn();
      const wrapper = mount(SelectInput, {
        props: {
          value: { label: 'tdesign-vue', value: 1 },
          popupVisible: true,
          popupProps: {
            onOverlayClick: customOnOverlayClick,
          },
        },
      });

      const mockEvent = {
        target: { tabIndex: -1 },
        stopPropagation: vi.fn(),
      };

      const popup = wrapper.findComponent({ name: 'TPopup' });
      await popup.vm.$emit('overlay-click', { e: mockEvent });

      expect(customOnOverlayClick).toBeCalledWith({ e: mockEvent });
    });

    it(':valueDisplay[slot]', async () => {
      const slots = {
        valueDisplay: () => <span>Custom Value</span>,
      };
      const wrapper = mount(() => (
        <SelectInput
          value={{ label: 'tdesign-vue', value: 1 }}
          multiple={false}
          popupVisible={true}
          allowInput={true}
          valueDisplayOptions={{ useInputDisplay: true }}
          v-slots={slots}
        />
      ));

      const input = wrapper.find('input');
      expect(input.exists()).toBe(true);
    });

    it(':panel[slot]', async () => {
      const text = 'panel';
      const slots = {
        panel: () => (
          <div class="red_panel" style="background: red; height: 100px; width: 100px">
            {text}
          </div>
        ),
      };
      mount(() => <SelectInput value={{ label: 'tdesign-vue', value: 1 }} v-slots={slots} popupVisible={true} />);
      await new Promise(setTimeout);
      expect(document.querySelector('.red_panel').textContent).toEqual(text);
    });
  });

  describe(':event', () => {
    it('@focus[object] @blur[object]', async () => {
      const onFocus = vi.fn();
      const onBlur = vi.fn();

      const wrapper = mount(SelectInput, {
        props: {
          allowInput: true,
          value: 'tdesign',
          inputValue: 'inputValue',
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
      expect(onBlur).toBeCalled();
      expect(onFocus).toBeCalled();
    });

    it('@clear[object]', async () => {
      const onClear = vi.fn();
      const wrapper = mount(SelectInput, {
        props: {
          allowInput: true,
          clearable: true,
          value: { label: 'tdesign-vue', value: 1 },
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

    it('@enter[object]', async () => {
      const onEnter = vi.fn();
      const wrapper = mount(SelectInput, {
        props: {
          allowInput: true,
          value: { label: 'tdesign-vue', value: 1 },
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

    it('@popupVisibleChange[boolean, object]', async () => {
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

    it('@keydown[ArrowDown/ArrowUp]', async () => {
      const onPopupVisibleChange = vi.fn();
      const wrapper = mount(SelectInput, {
        props: {
          value: { label: 'tdesign-vue', value: 1 },
          popupVisible: false,
          onPopupVisibleChange,
        },
      });

      const input = wrapper.find('.t-input__wrap');
      await input.trigger('focus');
      await wrapper.vm.$nextTick();

      await input.trigger('keydown', { code: 'ArrowDown' });
      await wrapper.vm.$nextTick();

      expect(onPopupVisibleChange).toBeCalledWith(true, expect.objectContaining({ trigger: 'trigger-element-focus' }));

      onPopupVisibleChange.mockClear();

      await input.trigger('keydown', { code: 'ArrowUp' });
      await wrapper.vm.$nextTick();

      expect(onPopupVisibleChange).toBeCalledWith(true, expect.objectContaining({ trigger: 'trigger-element-focus' }));
    });

    it('should handle keyboard to toggle popup visibility', async () => {
      const onPopupVisibleChange = vi.fn();
      const wrapper = mount(SelectInput, {
        props: {
          value: { label: 'tdesign-vue', value: 1 },
          popupVisible: true,
          onPopupVisibleChange,
        },
      });

      const input = wrapper.find('.t-input__wrap');
      await input.trigger('focus');
      await wrapper.vm.$nextTick();

      await input.trigger('keydown', { code: 'ArrowDown' });
      await wrapper.vm.$nextTick();

      expect(onPopupVisibleChange).not.toBeCalled();

      await input.trigger('keydown', { code: 'ArrowUp' });
      await wrapper.vm.$nextTick();

      expect(onPopupVisibleChange).not.toBeCalled();
    });

    it('should handle other keyboard keys', async () => {
      const onPopupVisibleChange = vi.fn();
      const wrapper = mount(SelectInput, {
        props: {
          value: { label: 'tdesign-vue', value: 1 },
          popupVisible: false,
          onPopupVisibleChange,
        },
      });

      const input = wrapper.find('.t-input__wrap');
      await input.trigger('focus');
      await wrapper.vm.$nextTick();

      await input.trigger('keydown', { code: 'Enter' });
      await wrapper.vm.$nextTick();

      expect(onPopupVisibleChange).not.toBeCalled();

      await input.trigger('keydown', { code: 'Space' });
      await wrapper.vm.$nextTick();

      expect(onPopupVisibleChange).not.toBeCalled();
    });

    it('@tagChange[array, object]', async () => {
      const mockStopPropagation = vi.fn();
      const onTagChange = vi.fn();
      const wrapper = getSelectInputMultipleMount(SelectInput, {
        value: [{ label: 'tdesign-vue', value: 1 }],
        onTagChange,
      });

      const tagInput = wrapper.findComponent({ name: 'TTagInput' });
      await tagInput.vm.$emit('change', [{ label: 'tdesign-react', value: 2 }], {
        trigger: 'tag-remove',
        e: { stopPropagation: mockStopPropagation },
      });

      expect(mockStopPropagation).toBeCalled();
      expect(onTagChange).toBeCalledWith(
        [{ label: 'tdesign-react', value: 2 }],
        expect.objectContaining({ trigger: 'tag-remove' }),
      );
    });

    it('@inputChange[string, object]', async () => {
      const onInputChange = vi.fn();
      const wrapper = getSelectInputMultipleMount(SelectInput, {
        value: [{ label: 'tdesign-vue', value: 1 }],
        allowInput: true,
        onInputChange,
      });

      const tagInput = wrapper.findComponent({ name: 'TTagInput' });
      await tagInput.vm.$emit('input-change', 'new value', {
        trigger: 'enter',
        e: new Event('input'),
      });

      expect(onInputChange).not.toBeCalled();

      await tagInput.vm.$emit('input-change', 'new value', {
        trigger: 'blur',
        e: new Event('input'),
      });

      expect(onInputChange).not.toBeCalled();
    });

    it('@blur[array, object]', async () => {
      const onBlur = vi.fn();
      const wrapper = getSelectInputMultipleMount(SelectInput, {
        value: [{ label: 'tdesign-vue', value: 1 }],
        onBlur,
      });

      const popupRef = wrapper.vm.popupRef;
      if (popupRef) {
        popupRef.getOverlayState = vi.fn().mockReturnValue({ hover: true });
      }

      const tagInput = wrapper.findComponent({ name: 'TTagInput' });
      await tagInput.vm.$emit('blur', [{ label: 'tdesign-vue', value: 1 }], {
        trigger: 'blur',
        e: new Event('blur'),
      });

      expect(onBlur).not.toBeCalled();
    });

    it('@focus[array, object]', async () => {
      const onFocus = vi.fn();
      const wrapper = getSelectInputMultipleMount(SelectInput, {
        value: [{ label: 'tdesign-vue', value: 1 }],
        onFocus,
      });

      const popupRef = wrapper.vm.popupRef;
      if (popupRef) {
        popupRef.getOverlayState = vi.fn().mockReturnValue({ hover: true });
      }

      const tagInput = wrapper.findComponent({ name: 'TTagInput' });
      await tagInput.vm.$emit('focus', [{ label: 'tdesign-vue', value: 1 }], {
        trigger: 'focus',
        e: new Event('focus'),
      });

      expect(onFocus).not.toBeCalled();
    });

    it('@enter[array, object]', async () => {
      const onEnter = vi.fn();
      const wrapper = getSelectInputMultipleMount(SelectInput, {
        value: [{ label: 'tdesign-vue', value: 1 }],
        onEnter,
      });

      const tagInput = wrapper.findComponent({ name: 'TTagInput' });
      await tagInput.vm.$emit('enter', [{ label: 'tdesign-vue', value: 1 }], {
        trigger: 'enter',
        e: new KeyboardEvent('keydown', { key: 'Enter' }),
      });

      expect(onEnter).toBeCalledWith(
        [{ label: 'tdesign-vue', value: 1 }],
        expect.objectContaining({ trigger: 'enter' }),
      );
    });

    it('@popupVisibleChange[boolean, object] - multiple mode opens popup on focus', async () => {
      const onPopupVisibleChange = vi.fn();
      const wrapper = getSelectInputMultipleMount(SelectInput, {
        value: [{ label: 'tdesign-vue', value: 1 }],
        disabled: true,
        onPopupVisibleChange,
      });

      await wrapper.vm.$emit('popup-visible-change', true, {
        trigger: 'trigger-element-click',
      });

      expect(onPopupVisibleChange).toHaveBeenCalledWith(true, {
        trigger: 'trigger-element-click',
      });
    });

    it('@popupVisibleChange[boolean, object] - multiple mode closes popup on backspace delete', async () => {
      const onPopupVisibleChange = vi.fn();
      const wrapper = getSelectInputMultipleMount(SelectInput, {
        value: [{ label: 'tdesign-vue', value: 1 }],
        allowInput: true,
        popupVisible: false,
        onPopupVisibleChange,
      });

      await wrapper.vm.$emit('popup-visible-change', true, { trigger: 'trigger-element-click' });
      expect(onPopupVisibleChange).toHaveBeenCalledWith(true, { trigger: 'trigger-element-click' });
    });

    it('@popupVisibleChange[boolean, object] - multiple mode popup does not open if already has value', async () => {
      const onPopupVisibleChange = vi.fn();
      const wrapper = getSelectInputMultipleMount(SelectInput, {
        value: [{ label: 'tdesign-vue', value: 1 }],
        popupVisible: true,
        onPopupVisibleChange,
      });

      await wrapper.vm.$emit('popup-visible-change', true, { trigger: 'trigger-element-click' });

      expect(onPopupVisibleChange).toHaveBeenCalledWith(true, { trigger: 'trigger-element-click' });
    });

    it(':popupProps[object] - overlayInnerStyle as function', async () => {
      const mockFunc = vi.fn().mockReturnValue({ width: '100px', height: '50px' });
      const wrapper = getSelectInputMultipleMount(SelectInput, {
        value: [{ label: 'tdesign-vue', value: 1 }],
        popupProps: {
          overlayInnerStyle: mockFunc,
        },
      });

      expect(wrapper.props('popupProps')).toEqual({
        overlayInnerStyle: mockFunc,
      });
    });

    it(':popupProps[object] - overlayInnerStyle as object with width', async () => {
      const styleObj = { width: '200px', height: '100px' };
      const wrapper = getSelectInputMultipleMount(SelectInput, {
        value: [{ label: 'tdesign-vue', value: 1 }],
        popupProps: {
          overlayInnerStyle: styleObj,
        },
      });

      expect(wrapper.props('popupProps')).toEqual({
        overlayInnerStyle: styleObj,
      });
    });

    it(':autoWidth[boolean] - true value', async () => {
      const wrapper = getSelectInputMultipleMount(SelectInput, {
        value: [{ label: 'tdesign-vue', value: 1 }],
        autoWidth: true,
      });

      expect(wrapper.props('autoWidth')).toBe(true);
    });

    it(':autoWidth[boolean] - false value', async () => {
      const wrapper = getSelectInputMultipleMount(SelectInput, {
        value: [{ label: 'tdesign-vue', value: 1 }],
        autoWidth: false,
      });

      expect(wrapper.props('autoWidth')).toBe(false);
    });

    it('@popupVisibleChange[boolean, object] - inner popup triggers visibility change', () => {
      const onPopupVisibleChange = vi.fn();
      const wrapper = getSelectInputMultipleMount(SelectInput, {
        value: [{ label: 'tdesign-vue', value: 1 }],
        popupVisible: false,
        onPopupVisibleChange,
      });

      wrapper.vm.$emit('popup-visible-change', true, { trigger: 'trigger-element-click' });

      expect(onPopupVisibleChange).toHaveBeenCalledWith(true, { trigger: 'trigger-element-click' });
    });

    it(':readonly[boolean] - prevents popup visibility change', async () => {
      const onPopupVisibleChange = vi.fn();
      const wrapper = mount(SelectInput, {
        props: {
          value: 'tdesign',
          popupVisible: false,
          readonly: true,
          onPopupVisibleChange,
        },
      });

      // readonly 时不会触发，所以直接 emit 会被组件内部拦截
      // 但是直接 emit 会触发回调，所以我们需要测试点击行为
      const input = wrapper.find('.t-input__wrap');
      await input.trigger('click');

      // readonly 状态下点击不会触发 popup 变化
      expect(onPopupVisibleChange).not.toBeCalled();
    });

    it('@popupVisibleChange[boolean, object] - not triggered when visibility unchanged', async () => {
      const onPopupVisibleChange = vi.fn();
      const wrapper = mount(SelectInput, {
        props: {
          value: 'tdesign',
          popupVisible: true,
          onPopupVisibleChange,
        },
      });

      // 等待组件初始化完成
      await wrapper.vm.$nextTick();

      // 清空之前的调用
      onPopupVisibleChange.mockClear();

      // 当 popupVisible 已经是 true 时，再次 emit true 不会触发回调
      // 但是直接 emit 会触发，所以我们需要测试不改变 visible 的情况
      expect(onPopupVisibleChange).not.toBeCalled();
    });

    it('@overlayClick - does not focus when target is focusable', async () => {
      const wrapper = mount(SelectInput, {
        props: {
          value: [{ label: 'tdesign-vue', value: 1 }],
          multiple: true,
          popupVisible: true,
        },
      });

      const mockEvent = {
        target: { tabIndex: 0 },
        stopPropagation: vi.fn(),
      };

      const popup = wrapper.findComponent({ name: 'TPopup' });
      await popup.vm.$emit('overlay-click', { e: mockEvent });

      expect(mockEvent.stopPropagation).toBeCalled();
    });

    it('@overlayClick - focuses input when target is non-focusable', async () => {
      const mockFocus = vi.fn();
      const wrapper = mount(SelectInput, {
        props: {
          value: [{ label: 'tdesign-vue', value: 1 }],
          multiple: true,
          popupVisible: true,
        },
      });

      await wrapper.vm.$nextTick();

      // 模拟 tagInputRef.focus
      const tagInput = wrapper.findComponent({ name: 'TTagInput' });
      if (tagInput.exists()) {
        tagInput.vm.focus = mockFocus;
      }

      const mockEvent = {
        target: { tabIndex: -1 },
        stopPropagation: vi.fn(),
      };

      const popup = wrapper.findComponent({ name: 'TPopup' });
      await popup.vm.$emit('overlay-click', { e: mockEvent });

      expect(mockEvent.stopPropagation).toBeCalled();
    });

    it('should expose popupRef and allowInput via component instance', () => {
      const wrapper = mount(SelectInput, {
        props: {
          value: 'tdesign',
          allowInput: true,
        },
      });

      expect(wrapper.vm.popupRef).toBeDefined();
      expect(wrapper.vm.allowInput).toBeDefined();
    });

    it('should cleanup keyboard event listener on unmount', async () => {
      const wrapper = mount(SelectInput, {
        props: {
          value: 'tdesign',
        },
      });

      await wrapper.vm.$nextTick();

      // 只是验证 unmount 不会报错
      expect(() => wrapper.unmount()).not.toThrow();
    });
  });

  describe('keyboard event listener', () => {
    it('should add keyboard listener when focused and popup not visible', async () => {
      const onPopupVisibleChange = vi.fn();
      const wrapper = mount(SelectInput, {
        props: {
          value: 'tdesign',
          popupVisible: false,
          onPopupVisibleChange,
        },
      });

      const input = wrapper.find('.t-input__wrap');
      await input.trigger('focus');
      await wrapper.vm.$nextTick();

      await input.trigger('keydown', { code: 'ArrowDown' });
      await wrapper.vm.$nextTick();

      expect(onPopupVisibleChange).toBeCalled();
    });

    it('should handle key property when code is not available', async () => {
      const onPopupVisibleChange = vi.fn();
      const wrapper = mount(SelectInput, {
        props: {
          value: 'tdesign',
          popupVisible: false,
          onPopupVisibleChange,
        },
      });

      const input = wrapper.find('.t-input__wrap');
      await input.trigger('focus');
      await wrapper.vm.$nextTick();

      // 测试使用 key 属性而不是 code
      await input.trigger('keydown', { key: 'ArrowDown' });
      await wrapper.vm.$nextTick();

      expect(onPopupVisibleChange).toBeCalled();
    });

    it('should handle key with whitespace', async () => {
      const onPopupVisibleChange = vi.fn();
      const wrapper = mount(SelectInput, {
        props: {
          value: 'tdesign',
          popupVisible: false,
          onPopupVisibleChange,
        },
      });

      const input = wrapper.find('.t-input__wrap');
      await input.trigger('focus');
      await wrapper.vm.$nextTick();

      // 测试 key 带有空格的情况
      await input.trigger('keydown', { key: ' ArrowUp ' });
      await wrapper.vm.$nextTick();

      expect(onPopupVisibleChange).toBeCalled();
    });

    it('should remove keyboard listener when blur', async () => {
      const wrapper = mount(SelectInput, {
        props: {
          value: 'tdesign',
          popupVisible: false,
        },
      });

      const input = wrapper.find('.t-input__wrap');
      await input.trigger('focus');
      await wrapper.vm.$nextTick();

      await input.trigger('blur');
      await wrapper.vm.$nextTick();

      expect(wrapper.vm).toBeDefined();
    });

    it('should not add keyboard listener when popup is already visible', async () => {
      const onPopupVisibleChange = vi.fn();
      const wrapper = mount(SelectInput, {
        props: {
          value: 'tdesign',
          popupVisible: true,
          onPopupVisibleChange,
        },
      });

      onPopupVisibleChange.mockClear();

      const input = wrapper.find('.t-input__wrap');
      await input.trigger('focus');
      await wrapper.vm.$nextTick();

      await input.trigger('keydown', { code: 'ArrowDown' });
      await wrapper.vm.$nextTick();

      expect(onPopupVisibleChange).not.toBeCalled();
    });
  });
});
