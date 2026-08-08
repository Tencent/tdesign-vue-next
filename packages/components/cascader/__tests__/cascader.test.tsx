/* eslint-disable vue/one-component-per-file */
import { nextTick, ref } from 'vue';
import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Cascader } from '@tdesign/components/cascader';
import cascaderProps from '@tdesign/components/cascader/props';
import type { CascaderOption } from '@tdesign/components/cascader/types';
import { Checkbox } from '@tdesign/components/checkbox';
import { SelectInput } from '@tdesign/components/select-input';

const options: CascaderOption[] = [
  {
    label: 'Parent A',
    value: 'a',
    children: [
      { label: 'Child A1', value: 'a1' },
      { label: 'Child A2', value: 'a2' },
    ],
  },
  {
    label: 'Parent B',
    value: 'b',
    children: [{ label: 'Child B1', value: 'b1', disabled: true }],
  },
];

const keyedOptions: CascaderOption[] = [
  {
    name: 'Custom parent',
    id: 'custom',
    items: [{ name: 'Custom child', id: 'custom-child' }],
  },
];

describe('Cascader', () => {
  const wrappers: VueWrapper[] = [];

  const renderCascader = (
    props: Record<string, unknown> = {},
    slots: Record<string, (...args: unknown[]) => unknown> = {},
  ) => {
    const wrapper = mount(Cascader, {
      attachTo: document.body,
      props: { options, ...props },
      slots,
    });
    wrappers.push(wrapper);
    return wrapper;
  };

  const getSelectInput = (wrapper: VueWrapper) => wrapper.findComponent(SelectInput);

  const mountPanel = (wrapper: VueWrapper) => {
    const panel = getSelectInput(wrapper).vm.$slots.panel;
    const panelWrapper = mount({
      name: 'CascaderPanelHost',
      render: () => panel?.(),
    });
    wrappers.push(panelWrapper);
    return panelWrapper;
  };

  afterEach(() => {
    wrappers.splice(0).forEach((wrapper) => wrapper.unmount());
    document.querySelectorAll('.t-popup, .t-cascader__panel').forEach((element) => element.remove());
    vi.clearAllTimers();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  describe('props', () => {
    it('renders the single-select root', () => {
      const wrapper = renderCascader();

      expect(wrapper.classes()).toContain('t-cascader');
      expect(wrapper.classes()).toContain('t-cascader--single');
      expect(getSelectInput(wrapper).exists()).toBe(true);
    });

    it(':autofocus[boolean] is currently not forwarded to the input', () => {
      const wrapper = renderCascader({ autofocus: true });

      expect(wrapper.find('input').attributes('autofocus')).toBeUndefined();
    });

    it(':borderless[boolean]', () => {
      const wrapper = renderCascader({ borderless: true });

      expect(getSelectInput(wrapper).props('borderless')).toBe(true);
    });

    it(':checkProps[object]', async () => {
      const wrapper = renderCascader({ checkProps: { readonly: true }, multiple: true, popupVisible: true });
      const panel = mountPanel(wrapper);
      await nextTick();

      expect(panel.findComponent(Checkbox).props('readonly')).toBe(true);
    });

    it(':checkStrictly[boolean]', async () => {
      const onChange = vi.fn();
      const wrapper = renderCascader({ checkStrictly: true, onChange, popupVisible: true });
      const panel = mountPanel(wrapper);
      await nextTick();

      await panel.find('.t-cascader__item').trigger('click');
      await nextTick();
      expect(onChange).toHaveBeenCalledWith('a', expect.objectContaining({ source: 'check' }));
    });

    it(':clearable[boolean]', () => {
      const wrapper = renderCascader({ clearable: true });

      expect(getSelectInput(wrapper).props('clearable')).toBe(true);
    });

    it(':collapsedItems[function]', () => {
      const collapsedItems = vi.fn(() => <span class="function-collapsed">Collapsed</span>);
      const wrapper = renderCascader({ collapsedItems, minCollapsedNum: 1, multiple: true, value: ['a1', 'a2'] });

      expect(getSelectInput(wrapper).props('collapsedItems')).toBe(collapsedItems);
    });

    it(':collapsedItems[slot]', () => {
      const wrapper = renderCascader(
        { minCollapsedNum: 1, multiple: true, value: ['a1', 'a2'] },
        { collapsedItems: () => <span class="slot-collapsed">Collapsed slot</span> },
      );

      expect(getSelectInput(wrapper).vm.$slots.collapsedItems).toBeDefined();
    });

    it(':columnHeader[string/function] and :columnFooter[string/function] are currently not forwarded', async () => {
      const wrapper = renderCascader({
        columnFooter: () => <span class="function-footer">Footer</span>,
        columnHeader: 'Header',
        popupVisible: true,
      });
      const panel = mountPanel(wrapper);
      await nextTick();

      expect(panel.find('.function-footer').exists()).toBe(false);
      expect(panel.text()).not.toContain('Header');
    });

    it(':columnHeader[slot] and :columnFooter[slot]', async () => {
      const wrapper = renderCascader(
        { popupVisible: true, value: 'a1' },
        {
          columnFooter: ({ panelIndex }) => <span class="slot-footer">Footer {String(panelIndex)}</span>,
          columnHeader: ({ panelIndex }) => <span class="slot-header">Header {String(panelIndex)}</span>,
        },
      );
      const panel = mountPanel(wrapper);
      await nextTick();

      expect(panel.findAll('.slot-header')).toHaveLength(2);
      expect(panel.findAll('.slot-footer')).toHaveLength(2);
    });

    it(':disabled[boolean]', () => {
      const wrapper = renderCascader({ disabled: true });

      expect(getSelectInput(wrapper).props('disabled')).toBe(true);
      expect(wrapper.find('.t-is-disabled').exists()).toBe(true);
    });

    it(':empty[string]', async () => {
      const wrapper = renderCascader({ empty: 'Nothing here', options: [], popupVisible: true });
      const panel = mountPanel(wrapper);
      await nextTick();

      expect(panel.text()).toBe('Nothing here');
    });

    it(':empty[function]', async () => {
      const wrapper = renderCascader({
        empty: () => <span class="function-empty">Nothing</span>,
        options: [],
        popupVisible: true,
      });
      const panel = mountPanel(wrapper);
      await nextTick();

      expect(panel.find('.function-empty').exists()).toBe(true);
    });

    it(':empty[slot]', async () => {
      const wrapper = renderCascader(
        { options: [], popupVisible: true },
        { empty: () => <span class="slot-empty">Nothing</span> },
      );
      const panel = mountPanel(wrapper);
      await nextTick();

      expect(panel.find('.slot-empty').exists()).toBe(true);
    });

    it(':filter[function]', async () => {
      const filter = vi.fn((keyword: string, node) => String(node.label).includes(keyword));
      const wrapper = renderCascader({ filter, popupVisible: true });
      const panel = mountPanel(wrapper);
      await nextTick();
      const selectInput = getSelectInput(wrapper);

      selectInput.props('onInputChange')('A1', { e: new InputEvent('input'), trigger: 'input' });
      await nextTick();
      expect(filter).toHaveBeenCalled();
      expect(panel.findAll('.t-cascader__item')).toHaveLength(1);
    });

    it(':filterable[boolean]', () => {
      const wrapper = renderCascader({ filterable: true });

      expect(getSelectInput(wrapper).props('allowInput')).toBe(true);
    });

    it(':inputProps[object]', () => {
      const wrapper = renderCascader({ inputProps: { autocomplete: 'off', size: 'large' }, size: 'small' });

      expect(getSelectInput(wrapper).props('inputProps')).toEqual(
        expect.objectContaining({ autocomplete: 'off', size: 'large' }),
      );
    });

    it(':keys[object]', async () => {
      const wrapper = renderCascader({
        keys: { children: 'items', label: 'name', value: 'id' },
        options: keyedOptions,
        popupVisible: true,
      });
      const panel = mountPanel(wrapper);
      await nextTick();

      expect(panel.find('.t-cascader__item').text()).toContain('Custom parent');
      expect(getSelectInput(wrapper).props('keys')).toEqual({ children: 'items', label: 'name', value: 'id' });
    });

    it(':label[string]', () => {
      const wrapper = renderCascader({ label: 'Prefix' });

      expect(wrapper.text()).toContain('Prefix');
      expect(wrapper.find('.t-tag-input__prefix').exists()).toBe(true);
    });

    it(':label[function]', () => {
      const wrapper = renderCascader({ label: () => <span class="function-label">Prefix</span> });

      expect(wrapper.find('.function-label').exists()).toBe(true);
    });

    it(':label[slot]', () => {
      const wrapper = renderCascader({}, { label: () => <span class="slot-label">Prefix</span> });

      expect(wrapper.find('.slot-label').exists()).toBe(true);
    });

    it(':label[slot] is not wrapped in multiple mode', () => {
      const wrapper = renderCascader({ multiple: true }, { label: () => <span class="multiple-label">Prefix</span> });

      expect(wrapper.find('.multiple-label').exists()).toBe(true);
    });

    it(':lazy[boolean] and :load[function]', async () => {
      const load = vi.fn(async () => [{ label: 'Lazy child', value: 'lazy-child' }]);
      const wrapper = renderCascader({
        lazy: true,
        load,
        options: [{ label: 'Lazy parent', value: 'lazy', children: true }],
        popupVisible: true,
      });
      const panel = mountPanel(wrapper);
      await nextTick();

      await panel.find('.t-cascader__item').trigger('click');
      await nextTick();
      expect(load).toHaveBeenCalled();
    });

    it(':loading[boolean]', async () => {
      const wrapper = renderCascader({ loading: true, popupVisible: true });
      const panel = mountPanel(wrapper);
      await nextTick();

      expect(getSelectInput(wrapper).props('loading')).toBe(true);
      expect(panel.find('.t-cascader__panel').classes()).not.toContain('t-cascader--normal');
    });

    it(':loadingText[string/function/slot]', async () => {
      const stringWrapper = renderCascader({ loading: true, loadingText: 'Loading string', popupVisible: true });
      const stringPanel = mountPanel(stringWrapper);
      await nextTick();
      expect(stringPanel.text()).toContain('Loading string');

      const functionWrapper = renderCascader({
        loading: true,
        loadingText: () => <span class="function-loading">Loading</span>,
        popupVisible: true,
      });
      const functionPanel = mountPanel(functionWrapper);
      await nextTick();
      expect(functionPanel.find('.function-loading').exists()).toBe(true);

      const slotWrapper = renderCascader(
        { loading: true, popupVisible: true },
        { loadingText: () => <span class="slot-loading">Loading slot</span> },
      );
      const slotPanel = mountPanel(slotWrapper);
      await nextTick();
      expect(slotPanel.find('.slot-loading').exists()).toBe(true);
    });

    it(':max[number]', async () => {
      const wrapper = renderCascader({ max: 1, multiple: true, popupVisible: true, value: ['a1'] });
      const panel = mountPanel(wrapper);
      await nextTick();

      expect(panel.findAll('.t-checkbox').every((checkbox) => checkbox.classes().includes('t-is-disabled'))).toBe(true);
    });

    it(':minCollapsedNum[number]', () => {
      const wrapper = renderCascader({ minCollapsedNum: 1, multiple: true });

      expect(getSelectInput(wrapper).props('minCollapsedNum')).toBe(1);
    });

    it(':multiple[boolean]', async () => {
      const wrapper = renderCascader({ multiple: true });
      const panel = mountPanel(wrapper);

      expect(wrapper.classes()).toContain('t-cascader--multiple');
      expect(getSelectInput(wrapper).props('multiple')).toBe(true);
      await panel.find('.t-cascader__item').trigger('click');
      await nextTick();
      expect(panel.findAll('.t-cascader__menu')).toHaveLength(2);
    });

    it(':option[function]', async () => {
      const wrapper = renderCascader({
        option: (_h: unknown, { item }: { item: CascaderOption }) => (
          <span class="function-option">{String(item.label)}</span>
        ),
        popupVisible: true,
      });
      const panel = mountPanel(wrapper);
      await nextTick();

      expect(panel.findAll('.function-option')).toHaveLength(2);
    });

    it(':option[slot]', async () => {
      const wrapper = renderCascader(
        { popupVisible: true },
        { option: ({ item }) => <span class="slot-option">{String(item.label)}</span> },
      );
      const panel = mountPanel(wrapper);
      await nextTick();

      expect(panel.findAll('.slot-option')).toHaveLength(2);
    });

    it(':options[array]', async () => {
      const wrapper = renderCascader({ popupVisible: true });
      const panel = mountPanel(wrapper);
      await nextTick();

      expect(panel.findAll('.t-cascader__item')).toHaveLength(2);
    });

    it(':panelTopContent[string] and :panelBottomContent[string]', async () => {
      const wrapper = renderCascader({
        panelBottomContent: 'Panel bottom',
        panelTopContent: 'Panel top',
        popupVisible: true,
      });
      const panel = mountPanel(wrapper);
      await nextTick();

      expect(panel.text()).toContain('Panel top');
      expect(panel.text()).toContain('Panel bottom');
    });

    it(':panelTopContent[function] and :panelBottomContent[slot]', async () => {
      const wrapper = renderCascader(
        { panelTopContent: () => <span class="function-panel-top">Top</span>, popupVisible: true },
        { panelBottomContent: () => <span class="slot-panel-bottom">Bottom</span> },
      );
      const panel = mountPanel(wrapper);
      await nextTick();

      expect(panel.find('.function-panel-top').exists()).toBe(true);
      expect(panel.find('.slot-panel-bottom').exists()).toBe(true);
    });

    it(':placeholder[string]', async () => {
      const wrapper = renderCascader({ placeholder: 'Choose one' });
      expect(getSelectInput(wrapper).props('placeholder')).toBe('Choose one');

      const selected = renderCascader({ popupVisible: true, value: 'a1' });
      await nextTick();
      expect(getSelectInput(selected).props('placeholder')).toBe('Parent A / Child A1');
    });

    it(':popupProps[object]', async () => {
      const wrapper = renderCascader({
        popupProps: { overlayClassName: 'custom-overlay', overlayStyle: { width: '320px' } },
        popupVisible: true,
      });
      await nextTick();
      const popupProps = getSelectInput(wrapper).props('popupProps');

      expect(popupProps.overlayClassName).toEqual(['t-cascader__popup', 'custom-overlay']);
      expect(popupProps.overlayInnerStyle).toEqual({ width: 'auto' });
      expect(popupProps.overlayStyle).toEqual({ width: '320px' });
    });

    it(':popupProps[object] does not force panel width while loading or empty', () => {
      const loading = renderCascader({ loading: true });
      expect(getSelectInput(loading).props('popupProps').overlayInnerStyle).toBeUndefined();

      const empty = renderCascader({ options: [] });
      expect(getSelectInput(empty).props('popupProps').overlayInnerStyle).toBeUndefined();
    });

    it(':popupVisible[boolean]', async () => {
      const wrapper = renderCascader({ popupVisible: true });
      const panel = mountPanel(wrapper);
      await nextTick();

      expect(getSelectInput(wrapper).props('popupVisible')).toBe(true);
      expect(panel.find('.t-cascader__panel').exists()).toBe(true);
    });

    it(':defaultPopupVisible[boolean] is currently ineffective', () => {
      const wrapper = mount(Cascader, {
        attrs: { defaultPopupVisible: true },
        props: { options },
      });
      wrappers.push(wrapper);

      expect(getSelectInput(wrapper).props('popupVisible')).toBe(false);
    });

    it(':prefixIcon[function]', () => {
      const wrapper = renderCascader({ prefixIcon: () => <span class="prefix-icon">P</span> });

      expect(wrapper.find('.prefix-icon').exists()).toBe(true);
    });

    it(':prefixIcon[slot]', () => {
      const wrapper = renderCascader({}, { prefixIcon: () => <span class="slot-prefix-icon">P</span> });

      expect(wrapper.find('.slot-prefix-icon').exists()).toBe(true);
    });

    it(':readonly[boolean]', () => {
      const wrapper = renderCascader({ readonly: true });

      expect(getSelectInput(wrapper).props('readonly')).toBe(true);
    });

    it(':reserveKeyword[boolean]', () => {
      const wrapper = renderCascader({ reserveKeyword: false });

      expect(cascaderProps.reserveKeyword.default).toBe(true);
      expect(wrapper.props('reserveKeyword')).toBe(false);
    });

    it(':selectInputProps[object]', () => {
      const onPaste = vi.fn();
      const wrapper = renderCascader({ selectInputProps: { allowInput: false, onPaste } });
      const selectInput = getSelectInput(wrapper);

      expect(selectInput.props('onPaste')).toBe(onPaste);
      expect(selectInput.props('allowInput')).toBe(false);
    });

    it(':showAllLevels[boolean]', () => {
      const full = renderCascader({ showAllLevels: true, value: 'a1' });
      expect(getSelectInput(full).props('value')).toBe('Parent A / Child A1');

      const leaf = renderCascader({ showAllLevels: false, value: 'a1' });
      expect(getSelectInput(leaf).props('value')).toBe('Child A1');
    });

    it.each(['small', 'medium', 'large'] as const)(':size[string] supports %s', (size) => {
      const wrapper = renderCascader({ size });

      expect(getSelectInput(wrapper).props('inputProps')).toEqual(expect.objectContaining({ size }));
      expect(getSelectInput(wrapper).props('tagInputProps')).toEqual(expect.objectContaining({ size }));
    });

    it(':size[string] validates supported values', () => {
      expect(cascaderProps.size.validator(undefined)).toBe(true);
      expect(cascaderProps.size.validator('small')).toBe(true);
      // @ts-expect-error verify runtime validation
      expect(cascaderProps.size.validator('invalid')).toBe(false);
    });

    it.each(['default', 'success', 'warning', 'error'] as const)(':status[string] supports %s', (status) => {
      const wrapper = renderCascader({ status });

      expect(getSelectInput(wrapper).props('status')).toBe(status);
    });

    it(':status[string] validates supported values', () => {
      expect(cascaderProps.status.validator(undefined)).toBe(true);
      expect(cascaderProps.status.validator('warning')).toBe(true);
      // @ts-expect-error verify runtime validation
      expect(cascaderProps.status.validator('invalid')).toBe(false);
    });

    it(':suffix[string]', () => {
      const wrapper = renderCascader({ suffix: 'items' });

      expect(wrapper.text()).toContain('items');
    });

    it(':suffix[function]', () => {
      const wrapper = renderCascader({ suffix: () => <span class="function-suffix">items</span> });

      expect(wrapper.find('.function-suffix').exists()).toBe(true);
    });

    it(':suffix[slot]', () => {
      const wrapper = renderCascader({}, { suffix: () => <span class="slot-suffix">items</span> });

      expect(wrapper.find('.slot-suffix').exists()).toBe(true);
    });

    it(':suffixIcon[function]', () => {
      const wrapper = renderCascader({ suffixIcon: () => <span class="function-suffix-icon">S</span> });

      expect(wrapper.find('.function-suffix-icon').exists()).toBe(true);
      expect(wrapper.find('.t-fake-arrow').exists()).toBe(false);
    });

    it(':suffixIcon[slot]', () => {
      const wrapper = renderCascader({}, { suffixIcon: () => <span class="slot-suffix-icon">S</span> });

      expect(wrapper.find('.slot-suffix-icon').exists()).toBe(true);
    });

    it(':suffixIcon[default] renders the active fake arrow', async () => {
      const wrapper = renderCascader({ popupVisible: true });
      await nextTick();

      expect(wrapper.find('.t-fake-arrow').classes()).toContain('t-fake-arrow--active');
    });

    it(':tagInputProps[object]', () => {
      const wrapper = renderCascader({ tagInputProps: { autoWidth: true, size: 'large' }, size: 'small' });

      expect(getSelectInput(wrapper).props('tagInputProps')).toEqual(
        expect.objectContaining({ autoWidth: true, size: 'large' }),
      );
    });

    it(':tagProps[object]', () => {
      const wrapper = renderCascader({ tagProps: { closable: false, theme: 'primary' } });

      expect(getSelectInput(wrapper).props('tagProps')).toEqual(
        expect.objectContaining({ closable: false, theme: 'primary' }),
      );
    });

    it(':tips[string]', () => {
      const wrapper = renderCascader({ tips: 'Helpful tip' });

      expect(getSelectInput(wrapper).props('tips')).toBe('Helpful tip');
    });

    it(':tips[function]', () => {
      const wrapper = renderCascader({ tips: () => <span class="function-tips">Helpful</span> });

      expect(wrapper.find('.function-tips').exists()).toBe(true);
    });

    it(':tips[slot] is currently not forwarded', () => {
      const wrapper = renderCascader({}, { tips: () => <span class="slot-tips">Helpful</span> });

      expect(wrapper.find('.slot-tips').exists()).toBe(false);
    });

    it(':trigger[string] supports click and hover', () => {
      expect(cascaderProps.trigger.validator(undefined)).toBe(true);
      expect(cascaderProps.trigger.validator('click')).toBe(true);
      expect(cascaderProps.trigger.validator('hover')).toBe(true);
      // @ts-expect-error verify runtime validation
      expect(cascaderProps.trigger.validator('invalid')).toBe(false);
    });

    it(':value[string/number/array] and v-model', async () => {
      const wrapper = renderCascader({ modelValue: 'a1' });
      expect(getSelectInput(wrapper).props('value')).toBe('Parent A / Child A1');

      await wrapper.setProps({ modelValue: 0, options: [{ label: 'Zero', value: 0 }] });
      expect(getSelectInput(wrapper).props('value')).toBe('Zero');

      await wrapper.setProps({ modelValue: ['a1'], multiple: true, options });
      expect(getSelectInput(wrapper).props('value')).toEqual(['Parent A/Child A1']);
    });

    it(':defaultValue[string] controls uncontrolled initial state', () => {
      const wrapper = renderCascader({ defaultValue: 'a1' });

      expect(getSelectInput(wrapper).props('value')).toBe('Parent A / Child A1');
    });

    it(':valueDisplay[string]', () => {
      const wrapper = renderCascader({ value: 'a1', valueDisplay: 'Selected value' });

      expect(wrapper.text()).toContain('Selected value');
    });

    it(':valueDisplay[function]', async () => {
      const valueDisplay = vi.fn((h, params) => (
        <button class="function-value" onClick={() => params.onClose(0)}>
          {`${String(params.value)}:${params.selectedOptions.length}`}
        </button>
      ));
      const onRemove = vi.fn();
      const wrapper = renderCascader({ multiple: true, onRemove, value: ['a1'], valueDisplay });

      expect(wrapper.find('.function-value').text()).toBe('a1:1');
      await wrapper.find('.function-value').trigger('click');
      expect(onRemove).toHaveBeenCalledOnce();
    });

    it(':valueDisplay[slot]', () => {
      const wrapper = renderCascader(
        { value: 'a1' },
        { valueDisplay: ({ value }) => <span class="slot-value">{String(value)}</span> },
      );

      expect(wrapper.find('.slot-value').text()).toBe('a1');
    });

    it(':valueMode[string] validates supported values', () => {
      expect(cascaderProps.valueMode.validator(undefined)).toBe(true);
      expect(cascaderProps.valueMode.validator('onlyLeaf')).toBe(true);
      expect(cascaderProps.valueMode.validator('parentFirst')).toBe(true);
      expect(cascaderProps.valueMode.validator('all')).toBe(true);
      // @ts-expect-error verify runtime validation
      expect(cascaderProps.valueMode.validator('invalid')).toBe(false);
    });

    it(':valueType[string] supports full paths and validates values', () => {
      const wrapper = renderCascader({ value: ['a', 'a1'], valueType: 'full' });
      expect(getSelectInput(wrapper).props('value')).toBe('Parent A / Child A1');

      expect(cascaderProps.valueType.validator(undefined)).toBe(true);
      expect(cascaderProps.valueType.validator('single')).toBe(true);
      expect(cascaderProps.valueType.validator('full')).toBe(true);
      // @ts-expect-error verify runtime validation
      expect(cascaderProps.valueType.validator('invalid')).toBe(false);
    });
  });

  describe('events', () => {
    it('blur', () => {
      const onBlur = vi.fn();
      const wrapper = renderCascader({ onBlur, value: 'a1' });
      const event = new FocusEvent('blur');

      getSelectInput(wrapper).props('onBlur')('', { e: event, inputValue: 'query' });
      expect(onBlur).toHaveBeenCalledWith({ e: event, inputValue: 'query', value: 'a1' });

      getSelectInput(wrapper).props('onBlur')('', { e: event, inputValue: undefined as unknown as string });
      expect(onBlur).toHaveBeenLastCalledWith({ e: event, inputValue: '', value: 'a1' });
    });

    it('focus', () => {
      const onFocus = vi.fn();
      const wrapper = renderCascader({ onFocus, value: 'a1' });
      const event = new FocusEvent('focus');

      getSelectInput(wrapper).props('onFocus')('', { e: event, inputValue: '' });
      expect(onFocus).toHaveBeenCalledWith({ e: event, value: 'a1' });
    });

    it('popup-visible-change', async () => {
      const onPopupVisibleChange = vi.fn();
      const wrapper = renderCascader({ onPopupVisibleChange });

      getSelectInput(wrapper).props('onPopupVisibleChange')(true, { trigger: 'trigger-element-click' });
      await nextTick();
      expect(onPopupVisibleChange).toHaveBeenCalledWith(true, { trigger: 'trigger-element-click' });
    });

    it('popup-visible-change is ignored while disabled', () => {
      const onPopupVisibleChange = vi.fn();
      const wrapper = renderCascader({ disabled: true, onPopupVisibleChange });

      getSelectInput(wrapper).props('onPopupVisibleChange')(true, { trigger: 'trigger-element-click' });
      expect(onPopupVisibleChange).not.toHaveBeenCalled();
    });

    it('change', async () => {
      const onChange = vi.fn();
      const wrapper = renderCascader({ onChange, popupVisible: true });
      const panel = mountPanel(wrapper);
      await nextTick();

      await panel.findAll('.t-cascader__item')[0].trigger('click');
      await nextTick();
      await panel.findAll('.t-cascader__item')[2].trigger('click');
      await nextTick();
      expect(onChange).toHaveBeenCalledWith('a1', expect.objectContaining({ source: 'check' }));
    });

    it('change in multiple mode', async () => {
      const onChange = vi.fn();
      const wrapper = renderCascader({ multiple: true, onChange, popupVisible: true });
      const panel = mountPanel(wrapper);

      panel.findComponent(Checkbox).props('onChange')(true, { e: new Event('change') });
      await nextTick();
      expect(onChange).toHaveBeenCalledWith(expect.any(Array), expect.objectContaining({ source: 'check' }));
    });

    it('change does not emit for the current controlled value', async () => {
      const onChange = vi.fn();
      const wrapper = renderCascader({ modelValue: 'a1', onChange, popupVisible: true });
      const panel = mountPanel(wrapper);

      await panel.findAll('.t-cascader__item')[2].trigger('click');
      expect(onChange).not.toHaveBeenCalled();
    });

    it('remove ignores Enter tag changes and handles a removed tag', () => {
      const onRemove = vi.fn();
      const wrapper = renderCascader({ multiple: true, onRemove, value: ['a1'] });
      const onTagChange = getSelectInput(wrapper).props('onTagChange');

      onTagChange([], { index: 0, trigger: 'enter' });
      expect(onRemove).not.toHaveBeenCalled();
      onTagChange([], { index: 0, trigger: 'tag-remove' });
      expect(onRemove).toHaveBeenCalledOnce();
    });

    it('clear', () => {
      const onChange = vi.fn();
      const wrapper = renderCascader({ onChange, value: 'a1' });

      getSelectInput(wrapper).props('onClear')({ e: new MouseEvent('click') });
      expect(onChange).toHaveBeenCalledWith('', expect.objectContaining({ source: 'clear' }));
    });

    it('input-change only updates filterable input and forwards selectInputProps callbacks', async () => {
      const userInputChange = vi.fn();
      const plain = renderCascader({ selectInputProps: { onInputChange: userInputChange } });
      getSelectInput(plain).props('onInputChange')('ignored', { e: new InputEvent('input'), trigger: 'input' });
      await nextTick();
      expect(getSelectInput(plain).props('inputValue')).toBe('');
      expect(userInputChange).toHaveBeenCalled();

      const filterable = renderCascader({ filterable: true, popupVisible: true });
      getSelectInput(filterable).props('onInputChange')('query', { e: new InputEvent('input'), trigger: 'input' });
      await nextTick();
      expect(getSelectInput(filterable).props('inputValue')).toBe('query');
    });
  });

  describe('lifecycle', () => {
    it('normalizes an invalid controlled value shape', async () => {
      const onMultipleChange = vi.fn();
      renderCascader({ modelValue: 'invalid', multiple: true, onChange: onMultipleChange });
      await nextTick();

      expect(onMultipleChange).toHaveBeenCalledWith([], expect.objectContaining({ source: 'invalid-value' }));

      const onSingleChange = vi.fn();
      renderCascader({ modelValue: ['a', 'a1'], onChange: onSingleChange, showAllLevels: false, valueType: 'single' });
      await nextTick();
      expect(onSingleChange).toHaveBeenCalledWith('', expect.objectContaining({ source: 'invalid-value' }));
    });

    it('resets filter input whenever a filterable popup opens', async () => {
      const popupVisible = ref(true);
      const wrapper = mount({
        setup() {
          return () => <Cascader options={options} filterable popupVisible={popupVisible.value} />;
        },
      });
      wrappers.push(wrapper);
      const cascader = wrapper.findComponent(Cascader);
      const selectInput = cascader.findComponent(SelectInput);

      selectInput.props('onInputChange')('query', { e: new InputEvent('input'), trigger: 'input' });
      await nextTick();
      expect(selectInput.props('inputValue')).toBe('query');

      popupVisible.value = false;
      await nextTick();
      popupVisible.value = true;
      await nextTick();
      expect(cascader.findComponent(SelectInput).props('inputValue')).toBe('');
    });
  });
});
