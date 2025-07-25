// @ts-nocheck
import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import { AutoComplete } from '@tdesign/components';
import { getNormalAutoCompleteMount, getOptionSlotAutoCompleteMount } from './mount';
import { simulateKeydownEvent } from '@tdesign/internal-tests/utils';

describe('AutoComplete Component', () => {
  it(`props.autofocus is equal to false`, () => {
    const wrapper = mount(<AutoComplete autofocus={false}></AutoComplete>);
    const domWrapper = wrapper.find('input');
    expect(domWrapper.attributes('autofocus')).toBeUndefined();
  });
  it(`props.autofocus is equal to true`, () => {
    const wrapper = mount(<AutoComplete autofocus={true}></AutoComplete>);
    const domWrapper = wrapper.find('input');
    expect(domWrapper.attributes('autofocus')).toBeDefined();
  });

  it('props.clearable: show clear icon on mouse enter', async () => {
    const wrapper = getNormalAutoCompleteMount({ value: 'Default Keyword', clearable: true });
    wrapper.find('.t-input').trigger('mouseenter');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.t-input__suffix-clear').exists()).toBeTruthy();
  });
  it('props.clearable: expect trigger clear and change events after clear icon has been clicked', async () => {
    const onClearFn1 = vi.fn();
    const onChangeFn1 = vi.fn();
    const wrapper = getNormalAutoCompleteMount(
      { value: 'Default Keyword', clearable: true },
      { onClear: onClearFn1, onChange: onChangeFn1 },
    );
    wrapper.find('.t-input').trigger('mouseenter');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.t-input__suffix-clear').exists()).toBeTruthy();
    wrapper.find('.t-input__suffix-clear').trigger('click');
    await wrapper.vm.$nextTick();
    expect(onClearFn1).toHaveBeenCalled(1);
    expect(onClearFn1.mock.calls[0][0].e.stopPropagation).toBeTruthy();
    expect(onClearFn1.mock.calls[0][0].e.type).toBe('click');
    expect(onChangeFn1).toHaveBeenCalled(1);
    expect(onChangeFn1.mock.calls[0][0]).toBe('');
    expect(onChangeFn1.mock.calls[0][1].e.stopPropagation).toBeTruthy();
    expect(onChangeFn1.mock.calls[0][1].e.type).toBe('click');
  });

  it('props.default works fine', () => {
    const wrapper = mount(<AutoComplete default={() => <span class="custom-node">TNode</span>}></AutoComplete>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('slots.default works fine', () => {
    const wrapper = mount(
      <AutoComplete v-slots={{ default: () => <span class="custom-node">TNode</span> }}></AutoComplete>,
    );
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('props.disabled works fine', () => {
    // disabled default value is
    const wrapper1 = mount(<AutoComplete></AutoComplete>).find('.t-input');
    expect(wrapper1.classes('t-is-disabled')).toBeFalsy();
    // disabled = true
    const wrapper2 = mount(<AutoComplete disabled={true}></AutoComplete>).find('.t-input');
    expect(wrapper2.classes('t-is-disabled')).toBeTruthy();
    // disabled = false
    const wrapper3 = mount(<AutoComplete disabled={false}></AutoComplete>).find('.t-input');
    expect(wrapper3.classes('t-is-disabled')).toBeFalsy();
  });

  it('props.filter works fine', async () => {
    const wrapper = getNormalAutoCompleteMount({
      filter: (filterWords, option) => option.text.includes('Second'),
    });
    wrapper.find('input').trigger('focus');
    await wrapper.vm.$nextTick();
    const tSelectOptionDom = document.querySelectorAll('.t-select-option');
    expect(tSelectOptionDom.length).toBe(1);
    // remove nodes from document to avoid influencing following test cases
    tSelectOptionDom.forEach((node) => node.remove());
    document.querySelectorAll('.t-popup').forEach((node) => node.remove());
  });

  it('props.filterable works fine', async () => {
    const wrapper = getNormalAutoCompleteMount({ value: 'First', filterable: true });
    wrapper.find('input').trigger('focus');
    await wrapper.vm.$nextTick();
    const tSelectOptionDom = document.querySelectorAll('.t-select-option');
    expect(tSelectOptionDom.length).toBe(1);
    // remove nodes from document to avoid influencing following test cases
    tSelectOptionDom.forEach((node) => node.remove());
    document.querySelectorAll('.t-popup').forEach((node) => node.remove());
  });

  it('props.highlightKeyword works fine', async () => {
    const wrapper = getNormalAutoCompleteMount({ value: 'Second', highlightKeyword: true });
    wrapper.find('input').trigger('focus');
    await wrapper.vm.$nextTick();
    const tSelectOptionDom = document.querySelectorAll('.t-select-option');
    expect(tSelectOptionDom.length).toBe(1);
    // remove nodes from document to avoid influencing following test cases
    tSelectOptionDom.forEach((node) => node.remove());
    document.querySelectorAll('.t-popup').forEach((node) => node.remove());
  });

  it('props.options: option.label could be defined to any element', async () => {
    const wrapper = getNormalAutoCompleteMount(AutoComplete);
    wrapper.find('input').trigger('focus');
    await wrapper.vm.$nextTick();
    const customNodeDom = document.querySelector('.custom-node');
    expect(customNodeDom).toBeDefined();
    // remove node in document to avoid influencing following test cases
    customNodeDom.remove();
    document.querySelectorAll('.t-select-option').forEach((node) => node.remove());
  });
  it('props.options: 5 options should exist', async () => {
    const wrapper = getNormalAutoCompleteMount(AutoComplete);
    wrapper.find('input').trigger('focus');
    await wrapper.vm.$nextTick();
    const tSelectOptionDom = document.querySelectorAll('.t-select-option');
    expect(tSelectOptionDom.length).toBe(5);
    // remove nodes from document to avoid influencing following test cases
    tSelectOptionDom.forEach((node) => node.remove());
  });
  it('props.options: expect empty options with no panel', async () => {
    const wrapper = mount(<AutoComplete popupProps={{ overlayClassName: 'empty-options-class-name' }}></AutoComplete>);
    wrapper.find('input').trigger('focus');
    await wrapper.vm.$nextTick();
    const emptyOptionsClassNameTAutocompletePanelDom = document.querySelectorAll(
      '.empty-options-class-name .t-autocomplete__panel',
    );
    expect(emptyOptionsClassNameTAutocompletePanelDom.length).toBe(0);
    // remove nodes from document to avoid influencing following test cases
    emptyOptionsClassNameTAutocompletePanelDom.forEach((node) => node.remove());
  });
  it('props.options: define one option', async () => {
    const wrapper = getOptionSlotAutoCompleteMount({
      popupProps: { overlayClassName: 'option-slot-class-name' },
    });
    wrapper.find('input').trigger('focus');
    await wrapper.vm.$nextTick();
    const optionSlotClassNameCustomSlotOptionDom = document.querySelector(
      '.option-slot-class-name .custom-slot-option',
    );
    expect(optionSlotClassNameCustomSlotOptionDom.textContent).toBe('First Keyword');
    // remove nodes from document to avoid influencing following test cases
    optionSlotClassNameCustomSlotOptionDom.remove();
    document.querySelectorAll('.t-select-option').forEach((node) => node.remove());
  });

  it('props.panelBottomContent works fine', async () => {
    const wrapper = mount(
      <AutoComplete panelBottomContent={() => <span class="custom-node">TNode</span>}></AutoComplete>,
    );
    wrapper.find('input').trigger('focus');
    await wrapper.vm.$nextTick();
    const customNodeDom = document.querySelector('.custom-node');
    expect(customNodeDom).toBeDefined();
    // remove node in document to avoid influencing following test cases
    customNodeDom.remove();
    const tPopupDom = document.querySelector('.t-popup');
    expect(tPopupDom).toBeDefined();
    // remove node in document to avoid influencing following test cases
    tPopupDom.remove();
  });

  it('slots.panelBottomContent works fine', async () => {
    const wrapper = mount(
      <AutoComplete v-slots={{ panelBottomContent: () => <span class="custom-node">TNode</span> }}></AutoComplete>,
    );
    wrapper.find('input').trigger('focus');
    await wrapper.vm.$nextTick();
    const customNodeDom = document.querySelector('.custom-node');
    expect(customNodeDom).toBeDefined();
    // remove node in document to avoid influencing following test cases
    customNodeDom.remove();
    const tPopupDom = document.querySelector('.t-popup');
    expect(tPopupDom).toBeDefined();
    // remove node in document to avoid influencing following test cases
    tPopupDom.remove();
  });
  it('slots.panel-bottom-content works fine', async () => {
    const wrapper = mount(
      <AutoComplete v-slots={{ 'panel-bottom-content': () => <span class="custom-node">TNode</span> }}></AutoComplete>,
    );
    wrapper.find('input').trigger('focus');
    await wrapper.vm.$nextTick();
    const customNodeDom = document.querySelector('.custom-node');
    expect(customNodeDom).toBeDefined();
    // remove node in document to avoid influencing following test cases
    customNodeDom.remove();
    const tPopupDom = document.querySelector('.t-popup');
    expect(tPopupDom).toBeDefined();
    // remove node in document to avoid influencing following test cases
    tPopupDom.remove();
  });

  it('props.panelTopContent works fine', async () => {
    const wrapper = mount(<AutoComplete panelTopContent={() => <span class="custom-node">TNode</span>}></AutoComplete>);
    wrapper.find('input').trigger('focus');
    await wrapper.vm.$nextTick();
    const customNodeDom = document.querySelector('.custom-node');
    expect(customNodeDom).toBeDefined();
    // remove node in document to avoid influencing following test cases
    customNodeDom.remove();
    const tPopupDom = document.querySelector('.t-popup');
    expect(tPopupDom).toBeDefined();
    // remove node in document to avoid influencing following test cases
    tPopupDom.remove();
  });

  it('slots.panelTopContent works fine', async () => {
    const wrapper = mount(
      <AutoComplete v-slots={{ panelTopContent: () => <span class="custom-node">TNode</span> }}></AutoComplete>,
    );
    wrapper.find('input').trigger('focus');
    await wrapper.vm.$nextTick();
    const customNodeDom = document.querySelector('.custom-node');
    expect(customNodeDom).toBeDefined();
    // remove node in document to avoid influencing following test cases
    customNodeDom.remove();
    const tPopupDom = document.querySelector('.t-popup');
    expect(tPopupDom).toBeDefined();
    // remove node in document to avoid influencing following test cases
    tPopupDom.remove();
  });
  it('slots.panel-top-content works fine', async () => {
    const wrapper = mount(
      <AutoComplete v-slots={{ 'panel-top-content': () => <span class="custom-node">TNode</span> }}></AutoComplete>,
    );
    wrapper.find('input').trigger('focus');
    await wrapper.vm.$nextTick();
    const customNodeDom = document.querySelector('.custom-node');
    expect(customNodeDom).toBeDefined();
    // remove node in document to avoid influencing following test cases
    customNodeDom.remove();
    const tPopupDom = document.querySelector('.t-popup');
    expect(tPopupDom).toBeDefined();
    // remove node in document to avoid influencing following test cases
    tPopupDom.remove();
  });

  it(`props.placeholder is equal to 'type keyword to search'`, () => {
    const wrapper = mount(<AutoComplete placeholder="type keyword to search"></AutoComplete>);
    const domWrapper = wrapper.find('input');
    expect(domWrapper.attributes('placeholder')).toBe('type keyword to search');
  });

  it('props.popupProps works fine', async () => {
    const wrapper = getNormalAutoCompleteMount({ popupProps: { overlayClassName: 'custom-class-name' } });
    wrapper.find('input').trigger('focus');
    await wrapper.vm.$nextTick();
    const customClassNameDom = document.querySelector('.custom-class-name');
    expect(customClassNameDom).toBeDefined();
    // remove node in document to avoid influencing following test cases
    customClassNameDom.remove();
  });
  it('props.popupProps works fine', async () => {
    const wrapper = getNormalAutoCompleteMount({
      popupProps: { overlayInnerClassName: 'custom-class-name' },
    });
    wrapper.find('input').trigger('focus');
    await wrapper.vm.$nextTick();
    const customClassNameDom = document.querySelector('.custom-class-name');
    expect(customClassNameDom).toBeDefined();
    // remove node in document to avoid influencing following test cases
    customClassNameDom.remove();
  });

  it('props.readonly works fine', () => {
    // readonly default value is
    const wrapper1 = getNormalAutoCompleteMount(AutoComplete).find('.t-input');
    expect(wrapper1.classes('t-is-readonly')).toBeFalsy();
    // readonly = true
    const wrapper2 = getNormalAutoCompleteMount({ readonly: true }).find('.t-input');
    expect(wrapper2.classes('t-is-readonly')).toBeTruthy();
    // readonly = false
    const wrapper3 = getNormalAutoCompleteMount({ readonly: false }).find('.t-input');
    expect(wrapper3.classes('t-is-readonly')).toBeFalsy();
  });

  const sizeClassNameList = ['t-size-s', { 't-size-m': false }, 't-size-l'];
  ['small', 'medium', 'large'].forEach((item, index) => {
    it(`props.size is equal to ${item}`, () => {
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
    it(`props.status is equal to ${item}`, () => {
      const wrapper = getNormalAutoCompleteMount({ status: item }).find('.t-input');
      if (typeof statusClassNameList[index] === 'string') {
        expect(wrapper.classes(statusClassNameList[index])).toBeTruthy();
      } else if (typeof statusClassNameList[index] === 'object') {
        const classNameKey = Object.keys(statusClassNameList[index])[0];
        expect(wrapper.classes(classNameKey)).toBeFalsy();
      }
    });
  });

  it('props.tips is equal this is a tip', () => {
    const wrapper = mount(<AutoComplete tips="this is a tip"></AutoComplete>);
    expect(wrapper.find('.t-input__tips').exists()).toBeTruthy();
  });

  it('props.triggerElement works fine', () => {
    const wrapper = mount(<AutoComplete triggerElement={() => <span class="custom-node">TNode</span>}></AutoComplete>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('slots.triggerElement works fine', () => {
    const wrapper = mount(
      <AutoComplete v-slots={{ triggerElement: () => <span class="custom-node">TNode</span> }}></AutoComplete>,
    );
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });
  it('slots.trigger-element works fine', () => {
    const wrapper = mount(
      <AutoComplete v-slots={{ 'trigger-element': () => <span class="custom-node">TNode</span> }}></AutoComplete>,
    );
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it(`props.value is equal to 'DefaultKeyword'`, () => {
    const wrapper = mount(<AutoComplete value="DefaultKeyword"></AutoComplete>);
    const domWrapper = wrapper.find('input');
    expect(domWrapper.element.value).toBe('DefaultKeyword');
  });

  it('events.blur works fine', async () => {
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

  it('events.compositionend works fine', async () => {
    const onCompositionendFn = vi.fn();
    const wrapper = mount(<AutoComplete onCompositionend={onCompositionendFn}></AutoComplete>);
    wrapper.find('input').trigger('compositionend');
    await wrapper.vm.$nextTick();
    expect(onCompositionendFn).toHaveBeenCalled(1);
    expect(onCompositionendFn.mock.calls[0][0].e.type).toBe('compositionend');
  });

  it('events.compositionstart works fine', async () => {
    const onCompositionstartFn = vi.fn();
    const wrapper = mount(<AutoComplete onCompositionstart={onCompositionstartFn}></AutoComplete>);
    wrapper.find('input').trigger('compositionstart');
    await wrapper.vm.$nextTick();
    expect(onCompositionstartFn).toHaveBeenCalled(1);
    expect(onCompositionstartFn.mock.calls[0][0].e.type).toBe('compositionstart');
  });

  it('events.enter works fine', async () => {
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

  it('events.focus works fine', async () => {
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
    const wrapper = getNormalAutoCompleteMount(
      { popupProps: { overlayClassName: 'select-event-class-name' } },
      { onSelect: onSelectFn1 },
    );
    wrapper.find('input').trigger('focus');
    await wrapper.vm.$nextTick();
    document.querySelector('.select-event-class-name .t-select-option').click();
    await wrapper.vm.$nextTick();
    document.querySelectorAll('.t-select-option').forEach((node) => node.remove());
    expect(onSelectFn1).toHaveBeenCalled(1);
    expect(onSelectFn1.mock.calls[0][0]).toBe('FirstKeyword');
    expect(onSelectFn1.mock.calls[0][1].e.type).toBe('click');
  });

  it('events.select: keyboard operations: ArrowDown & ArrowUp & Enter', async () => {
    const onSelectFn6 = vi.fn();
    const wrapper = getNormalAutoCompleteMount({}, { onSelect: onSelectFn6 });
    wrapper.find('input').trigger('focus');
    await wrapper.vm.$nextTick();
    simulateKeydownEvent(document, 'ArrowDown');
    await wrapper.vm.$nextTick();
    const domWrapper1 = document.querySelector('.t-select-option:first-child');
    expect(domWrapper1.classList.contains('t-select-option--hover')).toBeTruthy();
    simulateKeydownEvent(document, 'ArrowDown');
    await wrapper.vm.$nextTick();
    const domWrapper2 = document.querySelector('.t-select-option:nth-child(2)');
    expect(domWrapper2.classList.contains('t-select-option--hover')).toBeTruthy();
    simulateKeydownEvent(document, 'ArrowUp');
    await wrapper.vm.$nextTick();
    const domWrapper3 = document.querySelector('.t-select-option:first-child');
    expect(domWrapper3.classList.contains('t-select-option--hover')).toBeTruthy();
    simulateKeydownEvent(document, 'ArrowUp');
    await wrapper.vm.$nextTick();
    const domWrapper4 = document.querySelector('.t-select-option:nth-child(5)');
    expect(domWrapper4.classList.contains('t-select-option--hover')).toBeTruthy();
    simulateKeydownEvent(document, 'ArrowDown');
    await wrapper.vm.$nextTick();
    const domWrapper5 = document.querySelector('.t-select-option:first-child');
    expect(domWrapper5.classList.contains('t-select-option--hover')).toBeTruthy();
    simulateKeydownEvent(document, 'Enter');
    await wrapper.vm.$nextTick();
    document.querySelectorAll('.t-select-option').forEach((node) => node.remove());
    expect(onSelectFn6).toHaveBeenCalled(1);
    expect(onSelectFn6.mock.calls[0][0]).toBe('FirstKeyword');
    expect(onSelectFn6.mock.calls[0][1].e.type).toBe('keydown');
  });
});
