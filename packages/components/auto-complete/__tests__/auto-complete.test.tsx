// @ts-nocheck
import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import { AutoComplete } from '@tdesign/components';
import { getNormalAutoCompleteMount, getOptionSlotAutoCompleteMount } from './mount';
import { simulateKeydownEvent } from '@tdesign/internal-tests/utils';

describe('AutoComplete Component', () => {
  it(':autofocus[boolean]', () => {
    [false, true].forEach((autofocusValue) => {
      const wrapper = mount(<AutoComplete autofocus={autofocusValue}></AutoComplete>);
      const domWrapper = wrapper.find('input');
      if (autofocusValue) {
        expect(domWrapper.attributes('autofocus')).toBeDefined();
      } else {
        expect(domWrapper.attributes('autofocus')).toBeUndefined();
      }
    });
  });

  it(':clearable[boolean]', async () => {
    const onClearFn = vi.fn();
    const onChangeFn = vi.fn();
    const wrapper = getNormalAutoCompleteMount(
      { value: 'Default Keyword', clearable: true },
      { onClear: onClearFn, onChange: onChangeFn },
    );
    wrapper.find('.t-input').trigger('mouseenter');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.t-input__suffix-clear').exists()).toBeTruthy();
    wrapper.find('.t-input__suffix-clear').trigger('click');
    await wrapper.vm.$nextTick();
    expect(onClearFn).toHaveBeenCalled(1);
    expect(onClearFn.mock.calls[0][0].e.stopPropagation).toBeTruthy();
    expect(onClearFn.mock.calls[0][0].e.type).toBe('click');
    expect(onChangeFn).toHaveBeenCalled(1);
    expect(onChangeFn.mock.calls[0][0]).toBe('');
    expect(onChangeFn.mock.calls[0][1].e.stopPropagation).toBeTruthy();
    expect(onChangeFn.mock.calls[0][1].e.type).toBe('click');
  });

  it(':default[slot]', () => {
    [
      () => <AutoComplete default={() => <span class="custom-node">TNode</span>}></AutoComplete>,
      () => <AutoComplete v-slots={{ default: () => <span class="custom-node">TNode</span> }}></AutoComplete>,
    ].forEach((component) => {
      const wrapper = mount(component());
      expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    });
  });

  it(':disabled[boolean]', () => {
    [undefined, true, false].forEach((disabledValue) => {
      const wrapper = mount(<AutoComplete disabled={disabledValue}></AutoComplete>).find('.t-input');
      if (disabledValue === true) {
        expect(wrapper.classes('t-is-disabled')).toBeTruthy();
      } else {
        expect(wrapper.classes('t-is-disabled')).toBeFalsy();
      }
    });
  });

  it(':filter[function]', async () => {
    const wrapper = getNormalAutoCompleteMount({
      filter: (filterWords, option) => option.text.includes('Second'),
    });
    wrapper.find('input').trigger('focus');
    await wrapper.vm.$nextTick();
    const tSelectOptionDom = document.querySelectorAll('.t-select-option');
    expect(tSelectOptionDom.length).toBe(1);
    tSelectOptionDom.forEach((node) => node.remove());
    document.querySelectorAll('.t-popup').forEach((node) => node.remove());
  });

  it(':filterable[boolean]', async () => {
    const wrapper = getNormalAutoCompleteMount({ value: 'First', filterable: true });
    wrapper.find('input').trigger('focus');
    await wrapper.vm.$nextTick();
    const tSelectOptionDom = document.querySelectorAll('.t-select-option');
    expect(tSelectOptionDom.length).toBe(1);
    tSelectOptionDom.forEach((node) => node.remove());
    document.querySelectorAll('.t-popup').forEach((node) => node.remove());
  });

  it(':highlightKeyword[boolean]', async () => {
    const wrapper = getNormalAutoCompleteMount({ value: 'Second', highlightKeyword: true });
    wrapper.find('input').trigger('focus');
    await wrapper.vm.$nextTick();
    const tSelectOptionDom = document.querySelectorAll('.t-select-option');
    expect(tSelectOptionDom.length).toBe(1);
    tSelectOptionDom.forEach((node) => node.remove());
    document.querySelectorAll('.t-popup').forEach((node) => node.remove());
  });

  it(':options[array] - option.label could be defined to any element', async () => {
    const wrapper = getNormalAutoCompleteMount(AutoComplete);
    wrapper.find('input').trigger('focus');
    await wrapper.vm.$nextTick();
    const customNodeDom = document.querySelector('.custom-node');
    expect(customNodeDom).toBeDefined();
    customNodeDom.remove();
    document.querySelectorAll('.t-select-option').forEach((node) => node.remove());
  });
  it(':options[array] - 5 options should exist', async () => {
    const wrapper = getNormalAutoCompleteMount(AutoComplete);
    wrapper.find('input').trigger('focus');
    await wrapper.vm.$nextTick();
    const tSelectOptionDom = document.querySelectorAll('.t-select-option');
    expect(tSelectOptionDom.length).toBe(5);
    tSelectOptionDom.forEach((node) => node.remove());
  });
  it(':options[array] - expect empty options with no panel', async () => {
    const wrapper = mount(<AutoComplete popupProps={{ overlayClassName: 'empty-options-class-name' }}></AutoComplete>);
    wrapper.find('input').trigger('focus');
    await wrapper.vm.$nextTick();
    const emptyOptionsClassNameTAutocompletePanelDom = document.querySelectorAll(
      '.empty-options-class-name .t-autocomplete__panel',
    );
    expect(emptyOptionsClassNameTAutocompletePanelDom.length).toBe(0);
    emptyOptionsClassNameTAutocompletePanelDom.forEach((node) => node.remove());
  });
  it(':options[array] - define one option', async () => {
    const wrapper = getOptionSlotAutoCompleteMount({
      popupProps: { overlayClassName: 'option-slot-class-name' },
    });
    wrapper.find('input').trigger('focus');
    await wrapper.vm.$nextTick();
    const optionSlotClassNameCustomSlotOptionDom = document.querySelector(
      '.option-slot-class-name .custom-slot-option',
    );
    expect(optionSlotClassNameCustomSlotOptionDom.textContent).toBe('First Keyword');
    optionSlotClassNameCustomSlotOptionDom.remove();
    document.querySelectorAll('.t-select-option').forEach((node) => node.remove());
  });

  it(':panelBottomContent[function]', async () => {
    const component1 = () => (
      <AutoComplete panelBottomContent={() => <span class="custom-node">TNode</span>}></AutoComplete>
    );
    const component2 = () => (
      <AutoComplete v-slots={{ panelBottomContent: () => <span class="custom-node">TNode</span> }}></AutoComplete>
    );
    const component3 = () => (
      <AutoComplete v-slots={{ 'panel-bottom-content': () => <span class="custom-node">TNode</span> }}></AutoComplete>
    );
    const components = [component1, component2, component3];
    for (const component of components) {
      const wrapper = mount(component());
      wrapper.find('input').trigger('focus');
      await wrapper.vm.$nextTick();
      const customNodeDom = document.querySelector('.custom-node');
      expect(customNodeDom).toBeDefined();
      customNodeDom.remove();
      const tPopupDom = document.querySelector('.t-popup');
      expect(tPopupDom).toBeDefined();
      tPopupDom.remove();
    }
  });

  it(':panelTopContent[function]', async () => {
    const component1 = () => (
      <AutoComplete panelTopContent={() => <span class="custom-node">TNode</span>}></AutoComplete>
    );
    const component2 = () => (
      <AutoComplete v-slots={{ panelTopContent: () => <span class="custom-node">TNode</span> }}></AutoComplete>
    );
    const component3 = () => (
      <AutoComplete v-slots={{ 'panel-top-content': () => <span class="custom-node">TNode</span> }}></AutoComplete>
    );
    const components = [component1, component2, component3];
    for (const component of components) {
      const wrapper = mount(component());
      wrapper.find('input').trigger('focus');
      await wrapper.vm.$nextTick();
      const customNodeDom = document.querySelector('.custom-node');
      expect(customNodeDom).toBeDefined();
      customNodeDom.remove();
      const tPopupDom = document.querySelector('.t-popup');
      expect(tPopupDom).toBeDefined();
      tPopupDom.remove();
    }
  });

  it(':placeholder[string]', () => {
    const wrapper = mount(<AutoComplete placeholder="type keyword to search"></AutoComplete>);
    const domWrapper = wrapper.find('input');
    expect(domWrapper.attributes('placeholder')).toBe('type keyword to search');
  });

  it(':popupProps[object]', async () => {
    const popupPropsList = [{ overlayClassName: 'custom-class-name' }, { overlayInnerClassName: 'custom-class-name' }];
    for (const popupProps of popupPropsList) {
      const wrapper = getNormalAutoCompleteMount({ popupProps });
      wrapper.find('input').trigger('focus');
      await wrapper.vm.$nextTick();
      const customClassNameDom = document.querySelector('.custom-class-name');
      expect(customClassNameDom).toBeDefined();
      customClassNameDom.remove();
    }
  });

  it(':readonly[boolean]', () => {
    [undefined, true, false].forEach((readonlyValue) => {
      const props = readonlyValue !== undefined ? { readonly: readonlyValue } : {};
      const wrapper = getNormalAutoCompleteMount(props).find('.t-input');
      if (readonlyValue === true) {
        expect(wrapper.classes('t-is-readonly')).toBeTruthy();
      } else {
        expect(wrapper.classes('t-is-readonly')).toBeFalsy();
      }
    });
  });

  const sizeClassNameList = ['t-size-s', { 't-size-m': false }, 't-size-l'];
  ['small', 'medium', 'large'].forEach((item, index) => {
    it(`:size[string]`, () => {
      const wrapper = getNormalAutoCompleteMount({ size: item }).find('.t-input');
      if (typeof sizeClassNameList[index] === 'string') {
        expect(wrapper.classes(sizeClassNameList[index])).toBeTruthy();
      } else if (typeof sizeClassNameList[index] === 'object') {
        const classNameKey = Object.keys(sizeClassNameList[index])[0];
        expect(wrapper.classes(classNameKey)).toBeFalsy();
      }
    });
  });

  const statusClassNameList = [{ 't-is-default': false }, 't-is-success', 't-is-warning', 't-is-error'];
  ['default', 'success', 'warning', 'error'].forEach((item, index) => {
    it(`:status[string]`, () => {
      const wrapper = getNormalAutoCompleteMount({ status: item }).find('.t-input');
      if (typeof statusClassNameList[index] === 'string') {
        expect(wrapper.classes(statusClassNameList[index])).toBeTruthy();
      } else if (typeof statusClassNameList[index] === 'object') {
        const classNameKey = Object.keys(statusClassNameList[index])[0];
        expect(wrapper.classes(classNameKey)).toBeFalsy();
      }
    });
  });

  it(':tips[string]', () => {
    const wrapper = mount(<AutoComplete tips="this is a tip"></AutoComplete>);
    expect(wrapper.find('.t-input__tips').exists()).toBeTruthy();
  });

  it(':triggerElement[function]', () => {
    const component1 = () => (
      <AutoComplete triggerElement={() => <span class="custom-node">TNode</span>}></AutoComplete>
    );
    const component2 = () => (
      <AutoComplete v-slots={{ triggerElement: () => <span class="custom-node">TNode</span> }}></AutoComplete>
    );
    const component3 = () => (
      <AutoComplete v-slots={{ 'trigger-element': () => <span class="custom-node">TNode</span> }}></AutoComplete>
    );
    const components = [component1, component2, component3];
    components.forEach((component) => {
      const wrapper = mount(component());
      expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    });
  });

  it(':value[string]', () => {
    const wrapper = mount(<AutoComplete value="DefaultKeyword"></AutoComplete>);
    const domWrapper = wrapper.find('input');
    expect(domWrapper.element.value).toBe('DefaultKeyword');
  });

  it('@blur', async () => {
    const onFocusFn = vi.fn();
    const onBlurFn1 = vi.fn();
    const wrapper = getNormalAutoCompleteMount({}, { onFocus: onFocusFn, onBlur: onBlurFn1 });
    wrapper.find('input').trigger('focus');
    await wrapper.vm.$nextTick();
    expect(onFocusFn).toHaveBeenCalled(1);
    expect(onFocusFn.mock.calls[0][0].e.type).toBe('focus');
    wrapper.find('input').trigger('blur');
    await wrapper.vm.$nextTick();
    expect(onBlurFn1).toHaveBeenCalled(1);
    expect(onBlurFn1.mock.calls[0][0].e.type).toBe('blur');
  });

  it('@compositionstart and @compositionend', async () => {
    const onCompositionstartFn = vi.fn();
    const onCompositionendFn = vi.fn();
    const wrapper = mount(
      <AutoComplete onCompositionstart={onCompositionstartFn} onCompositionend={onCompositionendFn}></AutoComplete>,
    );
    wrapper.find('input').trigger('compositionstart');
    await wrapper.vm.$nextTick();
    expect(onCompositionstartFn).toHaveBeenCalled(1);
    expect(onCompositionstartFn.mock.calls[0][0].e.type).toBe('compositionstart');
    wrapper.find('input').trigger('compositionend');
    await wrapper.vm.$nextTick();
    expect(onCompositionendFn).toHaveBeenCalled(1);
    expect(onCompositionendFn.mock.calls[0][0].e.type).toBe('compositionend');
  });

  it('@enter', async () => {
    const onEnterFn1 = vi.fn();
    const wrapper = getNormalAutoCompleteMount({}, { onEnter: onEnterFn1 });
    wrapper.find('input').trigger('focus');
    await wrapper.vm.$nextTick();
    wrapper.find('input').trigger('keydown.enter');
    await wrapper.vm.$nextTick();
    expect(onEnterFn1).toHaveBeenCalled(1);
    expect(onEnterFn1.mock.calls[0][0].e.type).toBe('keydown');
    expect(/Enter/i.test(onEnterFn1.mock.calls[0][0].e.key)).toBeTruthy();
  });

  it('@focus', async () => {
    const onFocusFn = vi.fn();
    const wrapper = getNormalAutoCompleteMount({}, { onFocus: onFocusFn });
    wrapper.find('input').trigger('focus');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.t-is-focused').exists()).toBeTruthy();
    expect(onFocusFn).toHaveBeenCalled(1);
    expect(onFocusFn.mock.calls[0][0].e.type).toBe('focus');
  });

  it('events.select works fine', async () => {
    const onSelectFn1 = vi.fn();
    const wrapper1 = getNormalAutoCompleteMount(
      { popupProps: { overlayClassName: 'select-event-class-name' } },
      { onSelect: onSelectFn1 },
    );
    wrapper1.find('input').trigger('focus');
    await wrapper1.vm.$nextTick();
    document.querySelector('.select-event-class-name .t-select-option').click();
    await wrapper1.vm.$nextTick();
    document.querySelectorAll('.t-select-option').forEach((node) => node.remove());
    expect(onSelectFn1).toHaveBeenCalled(1);
    expect(onSelectFn1.mock.calls[0][0]).toBe('FirstKeyword');
    expect(onSelectFn1.mock.calls[0][1].e.type).toBe('click');

    const onSelectFn6 = vi.fn();
    const wrapper2 = getNormalAutoCompleteMount({}, { onSelect: onSelectFn6 });
    wrapper2.find('input').trigger('focus');
    await wrapper2.vm.$nextTick();
    simulateKeydownEvent(document, 'ArrowDown');
    await wrapper2.vm.$nextTick();
    const domWrapper1 = document.querySelector('.t-select-option:first-child');
    expect(domWrapper1.classList.contains('t-select-option--hover')).toBeTruthy();
    simulateKeydownEvent(document, 'ArrowDown');
    await wrapper2.vm.$nextTick();
    const domWrapper2 = document.querySelector('.t-select-option:nth-child(2)');
    expect(domWrapper2.classList.contains('t-select-option--hover')).toBeTruthy();
    simulateKeydownEvent(document, 'ArrowUp');
    await wrapper2.vm.$nextTick();
    const domWrapper3 = document.querySelector('.t-select-option:first-child');
    expect(domWrapper3.classList.contains('t-select-option--hover')).toBeTruthy();
    simulateKeydownEvent(document, 'ArrowUp');
    await wrapper2.vm.$nextTick();
    const domWrapper4 = document.querySelector('.t-select-option:nth-child(5)');
    expect(domWrapper4.classList.contains('t-select-option--hover')).toBeTruthy();
    simulateKeydownEvent(document, 'ArrowDown');
    await wrapper2.vm.$nextTick();
    const domWrapper5 = document.querySelector('.t-select-option:first-child');
    expect(domWrapper5.classList.contains('t-select-option--hover')).toBeTruthy();
    simulateKeydownEvent(document, 'Enter');
    await wrapper2.vm.$nextTick();
    document.querySelectorAll('.t-select-option').forEach((node) => node.remove());
    expect(onSelectFn6).toHaveBeenCalled(1);
    expect(onSelectFn6.mock.calls[0][0]).toBe('FirstKeyword');
    expect(onSelectFn6.mock.calls[0][1].e.type).toBe('keydown');
  });

  it(':inputProps[object]', async () => {
    const onChangeFn = vi.fn();
    const wrapper = mount(<AutoComplete inputProps={{ maxlength: 5 }} onChange={onChangeFn} />);
    await wrapper.vm.$nextTick();

    const input = wrapper.find('input');
    await input.setValue('123');
    expect(onChangeFn.mock.calls[0][0]).toBe('123');
    await input.setValue('123456');
    expect(onChangeFn.mock.calls[1][0]).toBe('12345');
  });

  it(':borderless[boolean]', () => {
    const wrapper = mount(<AutoComplete borderless={true} />);
    expect(wrapper.find('.t-input--borderless').exists()).toBeTruthy();
  });

  it(':empty[slot]', async () => {
    const wrapper = mount(
      <AutoComplete
        options={[]}
        empty={() => <span class="custom-empty">No Data</span>}
        popupProps={{ overlayClassName: 'empty-test-class' }}
      />,
    );
    wrapper.find('input').trigger('focus');
    await wrapper.vm.$nextTick();
    expect(document.querySelector('.empty-test-class .custom-empty')).toBeDefined();
    document.querySelectorAll('.t-popup').forEach((node) => node.remove());
  });

  it('@clear when value is empty', async () => {
    const onClearFn = vi.fn();
    const wrapper = mount(<AutoComplete clearable={true} value="" onClear={onClearFn} />);
    wrapper.find('.t-input').trigger('mouseenter');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.t-input__suffix-clear').exists()).toBeFalsy();
  });

  it('@change', async () => {
    const onChangeFn = vi.fn();
    const wrapper = mount(<AutoComplete onChange={onChangeFn} />);
    const input = wrapper.find('input');
    input.element.value = 'abc';
    input.trigger('input');
    await wrapper.vm.$nextTick();
    expect(onChangeFn).toHaveBeenCalled();
    expect(onChangeFn.mock.calls[0][0]).toBe('abc');
    await input.setValue('123456');
    expect(onChangeFn).toHaveBeenCalled();
    expect(onChangeFn.mock.calls[1][0]).toBe('123456');
  });

  it(':defaultValue[string]', () => {
    const wrapper = mount(<AutoComplete defaultValue="default-keyword" />);
    const input = wrapper.find('input');
    expect(input.element.value).toBe('default-keyword');
  });

  it(':v-model/modelValue', async () => {
    const wrapper = mount({
      components: { AutoComplete },
      data() {
        return { val: 'init' };
      },
      template: `<AutoComplete v-model="val" />`,
    });
    const input = wrapper.find('input');
    expect(input.element.value).toBe('init');
    input.element.value = 'changed';
    input.trigger('input');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.val).toBe('changed');
  });
});
