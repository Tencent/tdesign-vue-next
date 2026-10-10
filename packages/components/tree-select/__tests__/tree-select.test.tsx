import { defineComponent, nextTick, ref } from 'vue';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';

import { Form } from '@tdesign/components';
import FakeArrow from '@tdesign/components/common-components/fake-arrow';
import { type TreeNodeModel } from '@tdesign/components/tree';
import TreeSelect, { type TreeSelectProps } from '@tdesign/components/tree-select';
import treeSelectProps from '@tdesign/components/tree-select/props';
import {
  aliasData,
  createNode,
  createTreeSelectTestHarness,
  data,
  getSelectInput,
  getSelectInputHandler,
  getTree,
  getTreeHandler,
} from './mount';

const { cleanup, renderOpenTreeSelect, renderTreeSelect, trackWrapper } = createTreeSelectTestHarness();

afterEach(() => {
  cleanup();
  document.body.innerHTML = '';
  vi.restoreAllMocks();
});

describe('TreeSelect', () => {
  describe('props', () => {
    it(':autoWidth[boolean]', () => {
      const wrapper = renderTreeSelect({ autoWidth: true });
      expect(getSelectInput(wrapper).props('autoWidth')).toBe(true);
    });

    it(':borderless[boolean]', () => {
      const wrapper = renderTreeSelect({ borderless: true });
      expect(getSelectInput(wrapper).props('borderless')).toBe(true);
    });

    it(':clearable[boolean]', () => {
      const wrapper = renderTreeSelect({ clearable: true });
      expect(getSelectInput(wrapper).props('clearable')).toBe(true);
    });

    it(':collapsedItems[function]', async () => {
      const collapsedItems = () => <span class="collapsed-function">more</span>;
      const wrapper = renderTreeSelect({
        collapsedItems,
        minCollapsedNum: 1,
        multiple: true,
        value: ['guangzhou', 'shenzhen'],
      });
      await nextTick();

      expect(getSelectInput(wrapper).props('collapsedItems')).toBe(collapsedItems);
      expect(wrapper.find('.collapsed-function').exists()).toBe(true);
    });

    it(':collapsedItems[slot]', async () => {
      const wrapper = renderTreeSelect(
        { minCollapsedNum: 1, multiple: true, value: ['guangzhou', 'shenzhen'] },
        { collapsedItems: () => <span class="collapsed-slot">more slot</span> },
      );
      await nextTick();

      expect(getSelectInput(wrapper).vm.$slots.collapsedItems).toBeTypeOf('function');
      expect(wrapper.find('.collapsed-slot').exists()).toBe(true);
    });

    it(':data[array]', async () => {
      const wrapper = await renderOpenTreeSelect();
      expect(getTree(wrapper).props('data')).toEqual(data);
    });

    it(':disabled[boolean]', () => {
      const wrapper = renderTreeSelect({ disabled: true });
      expect(getSelectInput(wrapper).props('disabled')).toBe(true);
    });

    it(':disabled[Form]', () => {
      const wrapper = mount(
        <Form disabled>
          <TreeSelect data={data} />
        </Form>,
        { attachTo: document.body },
      );
      trackWrapper(wrapper);

      const treeSelect = wrapper.findComponent(TreeSelect);
      expect(getSelectInput(treeSelect).props('disabled')).toBe(true);
    });

    it(':empty[string]', async () => {
      await renderOpenTreeSelect({ data: [], empty: 'No records' });
      expect(document.body.textContent).toContain('No records');
    });

    it(':empty[function]', async () => {
      await renderOpenTreeSelect({
        data: [],
        empty: () => <span class="empty-function">No records function</span>,
      });
      expect(document.querySelector('.empty-function')?.textContent).toBe('No records function');
    });

    it(':empty[slot]', async () => {
      await renderOpenTreeSelect({ data: [] }, { empty: () => <span class="empty-slot">No records slot</span> });
      expect(document.querySelector('.empty-slot')?.textContent).toBe('No records slot');
    });

    it(':filter[function]', async () => {
      const filter = vi.fn((words: string, option: TreeNodeModel) => option.data.value === words);
      const wrapper = await renderOpenTreeSelect({
        filter: filter as TreeSelectProps['filter'],
        inputValue: 'shenzhen',
      });
      const treeFilter = getTree(wrapper).props('filter') as (node: TreeNodeModel) => boolean;
      const node = createNode();

      expect(treeFilter(node)).toBe(true);
      // Current implementation passes TreeNodeModel rather than the documented option data.
      expect(filter).toHaveBeenCalledWith('shenzhen', node);
    });

    it(':filter[function returning non-boolean]', async () => {
      const filter = vi.fn(() => Promise.resolve(false)) as unknown as TreeSelectProps['filter'];
      const wrapper = await renderOpenTreeSelect({ filter, inputValue: '深圳' });
      const treeFilter = getTree(wrapper).props('filter') as (node: TreeNodeModel) => boolean;

      expect(treeFilter(createNode())).toBe(true);
    });

    it(':filterable[boolean]', () => {
      const wrapper = renderTreeSelect({ filterable: true });
      expect(getSelectInput(wrapper).props('allowInput')).toBe(true);
    });

    it(':filterable[false]', () => {
      const wrapper = renderTreeSelect({ filterable: false });
      expect(getSelectInput(wrapper).props('allowInput')).toBe(false);
    });

    it(':inputProps[object]', () => {
      const wrapper = renderTreeSelect({
        size: 'small',
        inputProps: { readonly: true, size: 'large' },
      });
      expect(getSelectInput(wrapper).props('inputProps')).toMatchObject({ readonly: true, size: 'large' });
    });

    it(':inputValue[string]', () => {
      const wrapper = renderTreeSelect({ inputValue: '深圳', popupVisible: true });
      expect(getSelectInput(wrapper).props('inputValue')).toBe('深圳');
    });

    it(':inputValue[string] hides while popup is closed', () => {
      const wrapper = renderTreeSelect({ inputValue: '深圳', popupVisible: false });
      expect(getSelectInput(wrapper).props('inputValue')).toBe('');
    });

    it(':defaultInputValue[string]', () => {
      const wrapper = renderTreeSelect({ defaultInputValue: '广州', popupVisible: true });
      expect(getSelectInput(wrapper).props('inputValue')).toBe('广州');
    });

    it(':keys[object]', async () => {
      const keys = { label: 'name', value: 'id', children: 'list' };
      const wrapper = renderTreeSelect({ data: aliasData, keys, value: 'shenzhen' });
      await nextTick();

      expect(getSelectInput(wrapper).props('value')).toMatchObject({ label: '深圳市', value: 'shenzhen' });
    });

    it(':loading[boolean]', async () => {
      const wrapper = await renderOpenTreeSelect({ loading: true });
      expect(getSelectInput(wrapper).props('loading')).toBe(true);
      expect((getTree(wrapper).element as HTMLElement).style.display).toBe('none');
      expect(document.querySelector('.t-select-loading-tips')).not.toBeNull();
    });

    it(':loading[boolean] is hidden when disabled', async () => {
      await renderOpenTreeSelect({ disabled: true, loading: true });
      expect((document.querySelector('.t-select-loading-tips') as HTMLElement).style.display).toBe('none');
    });

    it(':loadingText[string]', async () => {
      await renderOpenTreeSelect({ loading: true, loadingText: 'Loading tree' });
      expect(document.querySelector('.t-select-loading-tips')?.textContent).toContain('Loading tree');
    });

    it(':loadingText[function]', async () => {
      await renderOpenTreeSelect({
        loading: true,
        loadingText: () => <span class="loading-function">Loading function</span>,
      });
      expect(document.querySelector('.loading-function')?.textContent).toBe('Loading function');
    });

    it(':loadingText[slot]', async () => {
      await renderOpenTreeSelect(
        { loading: true },
        { loadingText: () => <span class="loading-slot">Loading slot</span> },
      );
      expect(document.querySelector('.loading-slot')?.textContent).toBe('Loading slot');
    });

    it(':max[number]', async () => {
      const wrapper = await renderOpenTreeSelect({ max: 2, multiple: true, value: ['guangzhou', 'shenzhen'] });
      expect(getTree(wrapper).props('disabled')).toBe(true);
    });

    it(':max[number] below limit', async () => {
      const wrapper = await renderOpenTreeSelect({ max: 3, multiple: true, value: ['guangzhou', 'shenzhen'] });
      expect(getTree(wrapper).props('disabled')).toBe(false);
    });

    it(':max[0]', async () => {
      const wrapper = await renderOpenTreeSelect({ max: 0, multiple: true, value: ['guangzhou', 'shenzhen'] });
      expect(getTree(wrapper).props('disabled')).toBe(false);
    });

    it(':minCollapsedNum[number]', () => {
      const wrapper = renderTreeSelect({ minCollapsedNum: 2 });
      expect(getSelectInput(wrapper).props('minCollapsedNum')).toBe(2);
    });

    it(':multiple[boolean]', async () => {
      const wrapper = await renderOpenTreeSelect({ multiple: true });
      expect(getSelectInput(wrapper).props('multiple')).toBe(true);
      expect(getTree(wrapper).props()).toMatchObject({ activable: false, activeMultiple: true, checkable: true });
    });

    it(':panelBottomContent[string]', async () => {
      await renderOpenTreeSelect({ panelBottomContent: 'Panel bottom' });
      expect(document.body.textContent).toContain('Panel bottom');
    });

    it(':panelBottomContent[function]', async () => {
      await renderOpenTreeSelect({ panelBottomContent: () => <footer class="panel-bottom-function">Bottom</footer> });
      expect(document.querySelector('.panel-bottom-function')?.textContent).toBe('Bottom');
    });

    it(':panelBottomContent[slot]', async () => {
      await renderOpenTreeSelect({}, { panelBottomContent: () => <footer class="panel-bottom-slot">Bottom</footer> });
      expect(document.querySelector('.panel-bottom-slot')?.textContent).toBe('Bottom');
    });

    it(':panelTopContent[string]', async () => {
      await renderOpenTreeSelect({ panelTopContent: 'Panel top' });
      expect(document.body.textContent).toContain('Panel top');
    });

    it(':panelTopContent[function]', async () => {
      await renderOpenTreeSelect({ panelTopContent: () => <header class="panel-top-function">Top</header> });
      expect(document.querySelector('.panel-top-function')?.textContent).toBe('Top');
    });

    it(':panelTopContent[slot]', async () => {
      await renderOpenTreeSelect({}, { panelTopContent: () => <header class="panel-top-slot">Top</header> });
      expect(document.querySelector('.panel-top-slot')?.textContent).toBe('Top');
    });

    it(':placeholder[string]', () => {
      const wrapper = renderTreeSelect({ placeholder: 'Select a city' });
      expect(getSelectInput(wrapper).props('placeholder')).toBe('Select a city');
    });

    it(':placeholder[string] uses selected label while open', async () => {
      const wrapper = renderTreeSelect({ placeholder: 'Select a city', popupVisible: true, value: 'shenzhen' });
      await nextTick();
      expect(getSelectInput(wrapper).props('placeholder')).toBe('深圳市');
    });

    it(':placeholder[global default]', () => {
      const wrapper = renderTreeSelect();
      expect(getSelectInput(wrapper).props('placeholder')).toBeTruthy();
    });

    it(':popupProps[object]', () => {
      const wrapper = renderTreeSelect({ popupProps: { destroyOnClose: true, overlayClassName: 'custom-overlay' } });
      expect(getSelectInput(wrapper).props('popupProps')).toMatchObject({
        destroyOnClose: true,
        overlayClassName: 'custom-overlay',
      });
    });

    it(':popupProps[object] includes default classes', () => {
      const wrapper = renderTreeSelect();
      expect(getSelectInput(wrapper).props('popupProps')).toMatchObject({
        overlayClassName: ['t-select__dropdown', 'narrow-scrollbar'],
      });
    });

    it(':popupVisible[boolean]', () => {
      const wrapper = renderTreeSelect({ popupVisible: true });
      expect(getSelectInput(wrapper).props('popupVisible')).toBe(true);
    });

    it(':prefixIcon[function]', () => {
      const wrapper = renderTreeSelect({ prefixIcon: () => <span class="prefix-function">P</span> });
      expect(wrapper.find('.prefix-function').text()).toBe('P');
    });

    it(':prefixIcon[slot]', () => {
      const wrapper = renderTreeSelect({}, { prefixIcon: () => <span class="prefix-slot">P</span> });
      expect(wrapper.find('.prefix-slot').text()).toBe('P');
    });

    it(':readonly[boolean]', () => {
      const wrapper = renderTreeSelect({ readonly: true });
      expect(getSelectInput(wrapper).props('readonly')).toBe(true);
    });

    it(':selectInputProps[object]', () => {
      const wrapper = renderTreeSelect({
        filterable: true,
        placeholder: 'TreeSelect placeholder',
        selectInputProps: { allowInput: false, placeholder: 'SelectInput placeholder' },
      });
      expect(getSelectInput(wrapper).props()).toMatchObject({
        allowInput: false,
        placeholder: 'SelectInput placeholder',
      });
    });

    it.each([
      ['small', 's'],
      ['medium', 'm'],
      ['large', 'l'],
    ] as const)(':size[%s]', async (size, innerSize) => {
      const wrapper = await renderOpenTreeSelect({ size });
      expect(getSelectInput(wrapper).props('inputProps')).toMatchObject({ size });
      expect(document.querySelector(`.t-select__dropdown-inner--size-${innerSize}`)).not.toBeNull();
    });

    it(':size[validator]', () => {
      expect(treeSelectProps.size.validator(undefined)).toBe(true);
      expect(treeSelectProps.size.validator(null)).toBe(true);
      expect(treeSelectProps.size.validator('small')).toBe(true);
      // @ts-expect-error testing runtime validation
      expect(treeSelectProps.size.validator('invalid')).toBe(false);
    });

    it(':suffix[string]', () => {
      const wrapper = renderTreeSelect({ suffix: 'Suffix' });
      expect(wrapper.text()).toContain('Suffix');
    });

    it(':suffix[function]', () => {
      const wrapper = renderTreeSelect({ suffix: () => <span class="suffix-function">S</span> });
      expect(wrapper.find('.suffix-function').text()).toBe('S');
    });

    it(':suffix[slot]', () => {
      const wrapper = renderTreeSelect({}, { suffix: () => <span class="suffix-slot">S</span> });
      expect(wrapper.find('.suffix-slot').text()).toBe('S');
    });

    it(':suffixIcon[function]', () => {
      const wrapper = renderTreeSelect({ suffixIcon: () => <span class="suffix-icon-function">I</span> });
      expect(wrapper.find('.suffix-icon-function').text()).toBe('I');
      expect(wrapper.findComponent(FakeArrow).exists()).toBe(false);
    });

    it(':suffixIcon[slot]', () => {
      const wrapper = renderTreeSelect({}, { suffixIcon: () => <span class="suffix-icon-slot">I</span> });
      expect(wrapper.find('.suffix-icon-slot').text()).toBe('I');
      expect(wrapper.findComponent(FakeArrow).exists()).toBe(false);
    });

    it(':suffixIcon[default]', () => {
      const wrapper = renderTreeSelect({ disabled: true, popupVisible: true });
      const arrow = wrapper.findComponent(FakeArrow);
      expect(arrow.props('isActive')).toBe(true);
      expect(arrow.props('overlayClassName')).toMatchObject({
        't-fake-arrow--disable': true,
        't-fake-arrow--highlight': true,
      });
    });

    it(':tagProps[object]', () => {
      const wrapper = renderTreeSelect({ tagProps: { maxWidth: 120, theme: 'primary' } });
      expect(getSelectInput(wrapper).props('tagProps')).toMatchObject({ maxWidth: 120, theme: 'primary' });
    });

    it(':tagProps[default maxWidth]', () => {
      const wrapper = renderTreeSelect();
      expect(getSelectInput(wrapper).props('tagProps')).toMatchObject({ maxWidth: 300 });
    });

    it(':treeProps[object]', async () => {
      const wrapper = await renderOpenTreeSelect({
        treeProps: { expandOnClickNode: true, hover: false, line: true },
      });
      expect(getTree(wrapper).props()).toMatchObject({ expandOnClickNode: true, hover: false, line: true });
    });

    it(':treeProps.keys[object]', async () => {
      const keys = { label: 'name', value: 'id', children: 'list' };
      const wrapper = renderTreeSelect({ data: aliasData, treeProps: { keys }, value: 'shenzhen' });
      await nextTick();
      expect(getSelectInput(wrapper).props('value')).toMatchObject({ label: '深圳市', value: 'shenzhen' });
    });

    it(':treeProps.keys[partial object]', async () => {
      const wrapper = renderTreeSelect({
        data: [{ name: '深圳市', value: 'shenzhen' }],
        treeProps: { keys: { label: 'name' } },
        value: 'shenzhen',
      });
      await nextTick();
      expect(getSelectInput(wrapper).props('value')).toMatchObject({ label: '深圳市', value: 'shenzhen' });
    });

    it(':value[string]', async () => {
      const wrapper = renderTreeSelect({ value: 'shenzhen' });
      await nextTick();
      expect(getSelectInput(wrapper).props('value')).toMatchObject({ label: '深圳市', value: 'shenzhen' });
    });

    it(':value[number]', async () => {
      const wrapper = renderTreeSelect({ data: [{ label: 'Zero', value: 0 }], value: 0 });
      await nextTick();
      expect(getSelectInput(wrapper).props('value')).toMatchObject({ label: 'Zero', value: 0 });
    });

    it(':value[array]', async () => {
      const wrapper = renderTreeSelect({ multiple: true, value: ['guangzhou', 'shenzhen'] });
      await nextTick();
      expect(getSelectInput(wrapper).props('value')).toEqual([
        expect.objectContaining({ value: 'guangzhou' }),
        expect.objectContaining({ value: 'shenzhen' }),
      ]);
    });

    it(':modelValue[string]', async () => {
      const wrapper = renderTreeSelect({ modelValue: 'guangzhou' });
      await nextTick();
      expect(getSelectInput(wrapper).props('value')).toMatchObject({ label: '广州市', value: 'guangzhou' });
    });

    it(':defaultValue[string]', async () => {
      const wrapper = renderTreeSelect({ defaultValue: 'guangzhou' });
      await nextTick();
      expect(getSelectInput(wrapper).props('value')).toMatchObject({ label: '广州市', value: 'guangzhou' });
    });

    it(':defaultValue[string] initializes an explicitly empty controlled value', async () => {
      const onChange = vi.fn();
      renderTreeSelect({ defaultValue: 'guangzhou', onChange, value: '' });
      await nextTick();
      expect(onChange).toHaveBeenCalledWith('guangzhou', expect.objectContaining({ trigger: 'uncheck' }));
    });

    it(':valueType[object] single value', async () => {
      const wrapper = renderTreeSelect({ value: { label: '深圳市', value: 'shenzhen' }, valueType: 'object' });
      await nextTick();
      expect(getSelectInput(wrapper).props('value')).toMatchObject({ label: '深圳市', value: 'shenzhen' });
    });

    it(':valueType[object] multiple value', async () => {
      const wrapper = await renderOpenTreeSelect({
        multiple: true,
        value: [
          { label: '广州市', value: 'guangzhou' },
          { label: '深圳市', value: 'shenzhen' },
        ],
        valueType: 'object',
      });
      expect(getTree(wrapper).props('value')).toEqual(['guangzhou', 'shenzhen']);
    });

    it(':valueType[object] ignores a non-array value in multiple mode', async () => {
      const wrapper = await renderOpenTreeSelect({
        multiple: true,
        value: { label: '深圳市', value: 'shenzhen' },
        valueType: 'object',
      });
      expect(getTree(wrapper).props('value')).toEqual([]);
      expect(getSelectInput(wrapper).props('value')).toEqual([]);
    });

    it(':valueDisplay[function]', async () => {
      const wrapper = renderTreeSelect({
        value: 'shenzhen',
        valueDisplay: () => <span class="value-display-function">Custom value</span>,
      });
      await nextTick();
      expect(wrapper.find('.value-display-function').text()).toBe('Custom value');
    });

    it(':valueDisplay[slot]', async () => {
      const wrapper = renderTreeSelect(
        { value: 'shenzhen' },
        { valueDisplay: () => <span class="value-display-slot">Custom slot value</span> },
      );
      await nextTick();
      expect(wrapper.find('.value-display-slot').text()).toBe('Custom slot value');
    });

    it(':valueDisplay[function] closes a multiple value', async () => {
      const onChange = vi.fn();
      const onRemove = vi.fn();
      const value = ['guangzhou', 'shenzhen'];
      let closeValue: ((index: number) => void) | undefined;
      const valueDisplay = vi.fn((_h: unknown, context: { onClose: (index: number) => void }) => {
        closeValue = context.onClose;
        return <span class="multiple-value-display">Custom values</span>;
      }) as unknown as TreeSelectProps['valueDisplay'];
      const wrapper = renderTreeSelect({ multiple: true, onChange, onRemove, value, valueDisplay });
      await nextTick();

      closeValue?.(1);

      expect(wrapper.find('.multiple-value-display').text()).toBe('Custom values');
      expect(value).toEqual(['guangzhou']);
      // Current implementation reports the pre-removal value list instead of the removed item.
      expect(onRemove).toHaveBeenCalledWith({ data: null, e: undefined, value: ['guangzhou', 'shenzhen'] });
      expect(onChange).toHaveBeenCalledWith(value, expect.objectContaining({ index: 1, trigger: 'tag-remove' }));
    });

    it(':data[default]', () => {
      expect(treeSelectProps.data.default()).toEqual([]);
    });

    it(':valueType[validator]', () => {
      expect(treeSelectProps.valueType.validator(undefined)).toBe(true);
      expect(treeSelectProps.valueType.validator(null)).toBe(true);
      expect(treeSelectProps.valueType.validator('object')).toBe(true);
      // @ts-expect-error testing runtime validation
      expect(treeSelectProps.valueType.validator('invalid')).toBe(false);
    });
  });

  describe('events', () => {
    it(':onBlur[function]', () => {
      const onBlur = vi.fn();
      const wrapper = renderTreeSelect({ onBlur, value: 'shenzhen' });
      const e = new FocusEvent('blur');
      getSelectInputHandler(wrapper, 'onBlur')('', { e });
      expect(onBlur).toHaveBeenCalledWith({ value: 'shenzhen', e });
    });

    it(':onFocus[function]', () => {
      const onFocus = vi.fn();
      const wrapper = renderTreeSelect({ onFocus, value: 'shenzhen' });
      const e = new FocusEvent('focus');
      getSelectInputHandler(wrapper, 'onFocus')('', { e });
      expect(onFocus).toHaveBeenCalledWith({ value: 'shenzhen', e });
    });

    it(':onClear[function] single value', () => {
      const onChange = vi.fn();
      const onClear = vi.fn();
      const wrapper = renderTreeSelect({ clearable: true, onChange, onClear, value: 'shenzhen' });
      const e = new MouseEvent('click');

      getSelectInputHandler(wrapper, 'onClear')({ e });

      expect(onClear).toHaveBeenCalledWith({ e });
      expect(onChange).toHaveBeenCalledWith(
        '',
        expect.objectContaining({ data: null, e, node: null, trigger: 'clear' }),
      );
      expect(wrapper.emitted('update:value')?.[0]).toEqual(['']);
    });

    it(':onClear[function] multiple value', () => {
      const onChange = vi.fn();
      const wrapper = renderTreeSelect({ multiple: true, onChange, value: ['shenzhen'] });
      getSelectInputHandler(wrapper, 'onClear')({ e: new MouseEvent('click') });
      expect(onChange).toHaveBeenCalledWith([], expect.objectContaining({ trigger: 'clear' }));
    });

    it(':onInputChange[function] while open', () => {
      const onInputChange = vi.fn();
      const onSearch = vi.fn();
      const wrapper = renderTreeSelect({ inputValue: '', onInputChange, onSearch, popupVisible: true });

      getSelectInputHandler(wrapper, 'onInputChange')('深圳');

      expect(onInputChange).toHaveBeenCalledWith('深圳');
      expect(onSearch).toHaveBeenCalledWith('深圳');
      expect(wrapper.emitted('update:inputValue')?.[0]).toEqual(['深圳']);
    });

    it(':onInputChange[function] while closed', () => {
      const onInputChange = vi.fn();
      const onSearch = vi.fn();
      const wrapper = renderTreeSelect({ onInputChange, onSearch, popupVisible: false });

      getSelectInputHandler(wrapper, 'onInputChange')('深圳');

      expect(onInputChange).not.toHaveBeenCalled();
      expect(onSearch).toHaveBeenCalledWith('深圳');
    });

    it(':onPopupVisibleChange[function]', () => {
      const onPopupVisibleChange = vi.fn();
      const wrapper = renderTreeSelect({ onPopupVisibleChange, popupVisible: false });
      const context = { trigger: 'document-click' as const };

      getSelectInputHandler(wrapper, 'onPopupVisibleChange')(true, context);

      expect(onPopupVisibleChange).toHaveBeenCalledWith(true, context);
      expect(wrapper.emitted('update:popupVisible')?.[0]).toEqual([true]);
    });

    it(':onPopupVisibleChange[function] clears input when opened by trigger click', () => {
      const onInputChange = vi.fn();
      const wrapper = renderTreeSelect({ inputValue: 'old', onInputChange, popupVisible: false });

      getSelectInputHandler(wrapper, 'onPopupVisibleChange')(true, { trigger: 'trigger-element-click' });

      expect(onInputChange).toHaveBeenCalledWith('');
      expect(wrapper.emitted('update:inputValue')?.[0]).toEqual(['']);
    });

    it(':onRemove[function] by tag-remove', () => {
      const onChange = vi.fn();
      const onRemove = vi.fn();
      const value = ['guangzhou', 'shenzhen'];
      const wrapper = renderTreeSelect({ multiple: true, onChange, onRemove, value });
      const e = new MouseEvent('click');

      getSelectInputHandler(wrapper, 'onTagChange')('shenzhen', { e, index: 1, trigger: 'tag-remove' });

      // Current implementation mutates the controlled array and reports null data.
      expect(value).toEqual(['guangzhou']);
      expect(onRemove).toHaveBeenCalledWith({ data: null, e, value: 'shenzhen' });
      expect(onChange).toHaveBeenCalledWith(value, expect.objectContaining({ index: 1, trigger: 'tag-remove' }));
    });

    it(':onRemove[function] by backspace', () => {
      const onChange = vi.fn();
      const value = ['guangzhou', 'shenzhen'];
      const wrapper = renderTreeSelect({ multiple: true, onChange, value });

      getSelectInputHandler(wrapper, 'onTagChange')('shenzhen', { index: 1, trigger: 'backspace' });

      expect(value).toEqual(['guangzhou']);
      expect(onChange).toHaveBeenCalledWith(value, expect.objectContaining({ index: 1, trigger: 'backspace' }));
    });

    it(':onChange[function] from check', async () => {
      const onChange = vi.fn();
      const wrapper = await renderOpenTreeSelect({ multiple: true, onChange, value: [] });
      const node = createNode({ checked: true });
      const e = new MouseEvent('click');

      getTreeHandler(wrapper, 'onChange')(['shenzhen'], { e, node });

      expect(onChange).toHaveBeenCalledWith(
        ['shenzhen'],
        expect.objectContaining({ data: node.data, e, index: 1, node, trigger: 'check' }),
      );
    });

    it(':onChange[function] from uncheck', async () => {
      const onChange = vi.fn();
      const wrapper = await renderOpenTreeSelect({ multiple: true, onChange, value: ['shenzhen'] });
      const node = createNode({ checked: false });

      getTreeHandler(wrapper, 'onChange')([], { node });

      expect(onChange).toHaveBeenCalledWith([], expect.objectContaining({ trigger: 'uncheck' }));
    });

    it(':onChange[function] maps checked values to objects', async () => {
      const onChange = vi.fn();
      const wrapper = await renderOpenTreeSelect({ multiple: true, onChange, value: [], valueType: 'object' });

      getTreeHandler(wrapper, 'onChange')(['guangzhou', 'shenzhen'], { node: createNode() });

      expect(onChange).toHaveBeenCalledWith(
        [
          expect.objectContaining({ label: '广州市', value: 'guangzhou' }),
          expect.objectContaining({ label: '深圳市', value: 'shenzhen' }),
        ],
        expect.objectContaining({ trigger: 'check' }),
      );
    });

    it(':onChange[function] from active', async () => {
      const onChange = vi.fn();
      const onPopupVisibleChange = vi.fn();
      const wrapper = await renderOpenTreeSelect({ onChange, onPopupVisibleChange, value: '' });
      const node = createNode({ actived: true });

      getTreeHandler(wrapper, 'onActive')(['shenzhen'], { node });

      expect(onChange).toHaveBeenCalledWith('shenzhen', expect.objectContaining({ index: 1, trigger: 'check' }));
      expect(onPopupVisibleChange).toHaveBeenCalledWith(false, { node });
    });

    it(':onChange[function] from empty active value', async () => {
      const onChange = vi.fn();
      const wrapper = await renderOpenTreeSelect({ onChange, value: 'shenzhen' });

      getTreeHandler(wrapper, 'onActive')([], { node: createNode({ data: { label: 'Other', value: 'other' } }) });

      expect(onChange).toHaveBeenCalledWith('', expect.objectContaining({ trigger: 'check' }));
    });

    it(':onChange[function] from active object value', async () => {
      const onChange = vi.fn();
      const wrapper = await renderOpenTreeSelect({ onChange, value: null, valueType: 'object' });

      getTreeHandler(wrapper, 'onActive')(['shenzhen'], { node: createNode() });

      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({ label: '深圳市', value: 'shenzhen' }),
        expect.objectContaining({ trigger: 'check' }),
      );
    });

    it(':onChange[function] from empty active object value', async () => {
      const onChange = vi.fn();
      const wrapper = await renderOpenTreeSelect({ onChange, value: null, valueType: 'object' });

      getTreeHandler(wrapper, 'onActive')([], { node: createNode({ data: { label: 'Other', value: 'other' } }) });

      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({ label: '', value: '' }),
        expect.objectContaining({ trigger: 'check' }),
      );
    });

    it(':onChange[function] ignores active events in multiple mode', async () => {
      const onChange = vi.fn();
      const wrapper = await renderOpenTreeSelect({ multiple: true, onChange, value: [] });
      getTreeHandler(wrapper, 'onActive')(['shenzhen'], { node: createNode() });
      expect(onChange).not.toHaveBeenCalled();
    });

    it(':onChange[function] ignores inactive nodes', async () => {
      const onChange = vi.fn();
      const wrapper = await renderOpenTreeSelect({ onChange, value: '' });
      getTreeHandler(wrapper, 'onActive')([], { node: createNode({ actived: false }) });
      expect(onChange).not.toHaveBeenCalled();
    });

    it(':onChange[function] ignores selecting the same node', async () => {
      const onChange = vi.fn();
      const wrapper = await renderOpenTreeSelect({ onChange, value: 'shenzhen' });
      getTreeHandler(wrapper, 'onActive')(['shenzhen'], { node: createNode() });
      expect(onChange).not.toHaveBeenCalled();
    });

    it(':treeProps.onChange[function] is forwarded after internal change', async () => {
      const calls: string[] = [];
      const onChange = vi.fn(() => calls.push('tree-select'));
      const treeOnChange = vi.fn(() => calls.push('tree'));
      const wrapper = await renderOpenTreeSelect({ multiple: true, onChange, treeProps: { onChange: treeOnChange } });

      getTreeHandler(wrapper, 'onChange')(['shenzhen'], { node: createNode() });

      expect(calls).toEqual(['tree-select', 'tree']);
    });

    it(':selectInputProps.onClear[function] is forwarded after internal clear', () => {
      const calls: string[] = [];
      const onClear = vi.fn(() => calls.push('tree-select'));
      const selectInputOnClear = vi.fn(() => calls.push('select-input'));
      const wrapper = renderTreeSelect({
        onClear,
        selectInputProps: { onClear: selectInputOnClear },
        value: 'shenzhen',
      });

      getSelectInputHandler(wrapper, 'onClear')({ e: new MouseEvent('click') });

      expect(calls).toEqual(['tree-select', 'select-input']);
    });

    it(':treeProps.onExpand[function]', async () => {
      const onExpand = vi.fn();
      const wrapper = await renderOpenTreeSelect({ treeProps: { onExpand } });

      getTreeHandler(wrapper, 'onExpand')(['guangdong']);
      await nextTick();

      expect(onExpand).toHaveBeenCalledWith(['guangdong']);
      expect(getTree(wrapper).props('expanded')).toEqual(['guangdong']);
    });

    it(':treeProps.onLoad[function]', async () => {
      const onLoad = vi.fn();
      const wrapper = await renderOpenTreeSelect({ treeProps: { onLoad }, value: 'shenzhen' });

      getTreeHandler(wrapper, 'onLoad')({});

      expect(onLoad).toHaveBeenCalledWith({});
      expect(getSelectInput(wrapper).props('value')).toMatchObject({ value: 'shenzhen' });
    });
  });

  describe('instanceFunctions', () => {
    it(':treeRef', async () => {
      const wrapper = await renderOpenTreeSelect();
      expect(wrapper.vm.treeRef.$el).toBe(getTree(wrapper).element);
      expect(wrapper.vm.treeRef.getItem('shenzhen').data).toMatchObject({ label: '深圳市', value: 'shenzhen' });
    });
  });

  describe('lifecycle', () => {
    it('expands selected node parents on mount', async () => {
      const wrapper = await renderOpenTreeSelect({ value: 'shenzhen' });
      expect(getTree(wrapper).props('expanded')).toEqual(['guangdong']);
    });

    it('expands unique parents for multiple selected nodes on mount', async () => {
      const wrapper = await renderOpenTreeSelect({ multiple: true, value: ['guangzhou', 'shenzhen', 'nanjing'] });
      expect(getTree(wrapper).props('expanded')).toEqual(['guangdong', 'jiangsu']);
    });

    it('does not infer parents from an array in single mode', async () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const wrapper = await renderOpenTreeSelect({ multiple: false, value: ['shenzhen'] });
      expect(getTree(wrapper).props('expanded')).toEqual([]);
      // The current single-mode path forwards an array to Input and Vue reports invalid props.
      expect(warn).toHaveBeenCalled();
    });

    it('does not infer parents from a scalar in multiple mode', async () => {
      const wrapper = await renderOpenTreeSelect({ multiple: true, value: 'shenzhen' });
      expect(getTree(wrapper).props('expanded')).toEqual([]);
    });

    it('updates selected node information when value changes', async () => {
      const wrapper = renderTreeSelect({ value: 'shenzhen' });
      await wrapper.setProps({ value: 'nanjing' });
      await nextTick();

      expect(getSelectInput(wrapper).props('value')).toMatchObject({ label: '南京市', value: 'nanjing' });
    });

    it('clears selected node information when value becomes empty', async () => {
      const wrapper = renderTreeSelect({ value: 'shenzhen' });
      await wrapper.setProps({ value: '' });
      await nextTick();
      expect(getSelectInput(wrapper).props('value')).toBe('');
    });

    it('updates multiple selected node information when value changes', async () => {
      const wrapper = renderTreeSelect({ multiple: true, value: ['shenzhen'] });
      await wrapper.setProps({ value: ['nanjing'] });
      await nextTick();
      expect(getSelectInput(wrapper).props('value')).toEqual([expect.objectContaining({ value: 'nanjing' })]);
    });

    it('handles a non-array multiple value', async () => {
      const wrapper = renderTreeSelect({ multiple: true, value: ['shenzhen'] });
      await wrapper.setProps({ value: 'shenzhen' });
      await nextTick();
      expect(getSelectInput(wrapper).props('value')).toEqual([]);
    });

    it('rerenders Tree when data changes', async () => {
      const wrapper = await renderOpenTreeSelect({ value: 'shenzhen' });
      const firstTree = getTree(wrapper).element;

      await wrapper.setProps({ data: [{ label: '杭州市', value: 'hangzhou' }] });
      await nextTick();

      expect(getTree(wrapper).element).not.toBe(firstTree);
      // Current implementation resolves the value against the stale Tree ref before rerendering.
      expect(getSelectInput(wrapper).props('value')).toMatchObject({ label: '深圳市', value: 'shenzhen' });
    });

    it('uses Tree instance data after it mounts', async () => {
      const wrapper = await renderOpenTreeSelect({ value: 'shenzhen' });
      getTreeHandler(wrapper, 'onLoad')();
      await nextTick();
      expect(getSelectInput(wrapper).props('value')).toMatchObject({ label: '深圳市', value: 'shenzhen' });
    });

    it('removes teleported panel on unmount', async () => {
      const wrapper = await renderOpenTreeSelect();
      expect(document.querySelector('.t-tree')).not.toBeNull();
      wrapper.unmount();
      expect(document.querySelector('.t-tree')).toBeNull();
    });
  });

  describe('scenarios', () => {
    describe('removing multiple selections', () => {
      const settle = async () => {
        await nextTick();
        await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
        await nextTick();
      };

      const renderControlled = async (
        options: TreeSelectProps = {},
        initialValue: Array<string | number | Record<string, unknown>> = [],
      ) => {
        const selected = ref(initialValue);
        const visible = ref(options.popupVisible ?? true);
        const onChange = vi.fn();
        const onRemove = vi.fn();
        const treeOnChange = vi.fn();
        const wrapper = trackWrapper(
          mount(
            defineComponent({
              setup: () => () =>
                (
                  <TreeSelect
                    data={[data[0], { ...data[1], disabled: true }]}
                    multiple
                    {...options}
                    v-model={selected.value}
                    popupVisible={visible.value}
                    treeProps={{ valueMode: 'all', expandAll: true, onChange: treeOnChange, ...options.treeProps }}
                    onChange={onChange}
                    onRemove={onRemove}
                  />
                ),
            }),
            { attachTo: document.body },
          ),
        );
        await settle();
        const treeSelect = wrapper.findComponent(TreeSelect);
        const check = async (value: string, checked = true) => {
          await getTree(treeSelect).get(`[data-value="${value}"] input[type="checkbox"]`).setValue(checked);
          await settle();
        };
        const close = async (index: number) => {
          await wrapper.findAll('.t-tag')[index].get('.t-tag__icon-close').trigger('click');
          await settle();
        };
        return { wrapper, treeSelect, selected, visible, onChange, onRemove, treeOnChange, check, close };
      };

      // Issue: https://github.com/Tencent/tdesign-vue-next/issues/6753
      it('keeps all-mode tags and checkbox states in sync after removing a child', async () => {
        const ctx = await renderControlled();
        await ctx.check('guangdong');
        expect(ctx.selected.value).toEqual(['guangdong', 'guangzhou', 'shenzhen']);
        ctx.onChange.mockClear();
        ctx.treeOnChange.mockClear();
        const updatesBefore = ctx.treeSelect.emitted('update:modelValue')?.length ?? 0;

        await ctx.close(2);

        expect(ctx.selected.value).toEqual(['guangzhou']);
        expect(ctx.wrapper.findAll('.t-tag').map((tag) => tag.text())).toEqual(['广州市']);
        expect(ctx.onRemove).toHaveBeenCalledOnce();
        expect(ctx.onRemove).toHaveBeenCalledWith({
          value: ['广东省', '广州市'],
          data: null,
          e: expect.any(MouseEvent),
        });
        expect(ctx.onChange).toHaveBeenCalledExactlyOnceWith(['guangzhou'], {
          node: null,
          data: null,
          trigger: 'tag-remove',
          index: 2,
          e: ctx.onRemove.mock.calls[0][0].e,
        });
        expect(ctx.onRemove.mock.invocationCallOrder[0]).toBeLessThan(ctx.onChange.mock.invocationCallOrder[0]);
        expect(ctx.treeOnChange).not.toHaveBeenCalled();
        expect(ctx.treeSelect.emitted('update:modelValue')).toHaveLength(updatesBefore + 1);

        ctx.visible.value = false;
        await settle();
        ctx.visible.value = true;
        await settle();
        const tree = getTree(ctx.treeSelect);
        expect(tree.get('[data-value="guangdong"] .t-checkbox').classes()).toContain('t-is-indeterminate');
        expect(tree.get('[data-value="shenzhen"] .t-checkbox').classes()).not.toContain('t-is-checked');
        expect(tree.get('[data-value="guangzhou"] .t-checkbox').classes()).toContain('t-is-checked');
      });

      // Issue: https://github.com/Tencent/tdesign-vue-next/issues/6753
      it('removes descendants with an all-mode parent tag, retaining unrelated selections', async () => {
        const ctx = await renderControlled({}, ['nanjing']);
        await ctx.check('guangdong');
        const parentIndex = ctx.wrapper.findAll('.t-tag').findIndex((tag) => tag.text() === '广东省');
        await ctx.close(parentIndex);
        expect(ctx.selected.value).toEqual(['nanjing']);
      });

      // Issue: https://github.com/Tencent/tdesign-vue-next/issues/6753
      it('removes related initial values before the panel opens and after reaching max', async () => {
        const ctx = await renderControlled({ popupVisible: false, max: 3 }, [
          'guangdong',
          'guangzhou',
          'shenzhen',
          'unknown',
        ]);
        expect(getTree(ctx.treeSelect).exists()).toBe(false);
        await ctx.close(2);
        expect(ctx.selected.value).toEqual(['guangzhou', 'unknown']);
      });

      // Issue: https://github.com/Tencent/tdesign-vue-next/issues/6753
      it('keeps strict-mode selections independent', async () => {
        const ctx = await renderControlled({ treeProps: { checkStrictly: true } });
        await ctx.check('guangdong');
        await ctx.check('guangzhou');
        await ctx.check('shenzhen');
        await ctx.close(2);
        expect(ctx.selected.value).toEqual(['guangdong', 'guangzhou']);
      });

      // Issue: https://github.com/Tencent/tdesign-vue-next/issues/6753
      it.each(['onlyLeaf', 'parentFirst'] as const)('preserves %s removal behavior', async (valueMode) => {
        const ctx = await renderControlled({ treeProps: { valueMode } });
        await ctx.check('guangdong');
        await ctx.close(valueMode === 'onlyLeaf' ? 1 : 0);
        expect(ctx.selected.value).toEqual(valueMode === 'onlyLeaf' ? ['guangzhou'] : []);
      });

      // Issue: https://github.com/Tencent/tdesign-vue-next/issues/6753
      it('uses node identity with object values, custom keys and duplicate labels', async () => {
        const options = [
          {
            id: 0,
            name: 'same',
            list: [
              { id: 1, name: 'same' },
              { id: 2, name: 'same' },
            ],
          },
        ];
        const kept = { value: 1, label: 'same', extra: 'preserved' };
        const ctx = await renderControlled(
          {
            data: options,
            keys: { value: 'id', label: 'name', children: 'list' },
            valueType: 'object',
            popupVisible: false,
          },
          [{ value: 0, label: 'same' }, kept, { value: 2, label: 'same' }],
        );
        const keptReference = (ctx.selected.value as object[])[1];
        await ctx.close(2);
        expect(ctx.selected.value).toEqual([kept]);
        expect((ctx.selected.value as object[])[0]).toBe(keptReference);
      });

      // Issue: https://github.com/Tencent/tdesign-vue-next/issues/6753
      it('normalizes all-mode selections when Backspace removes the last tag', async () => {
        const ctx = await renderControlled({ filterable: true });
        await ctx.check('guangdong');
        ctx.onChange.mockClear();
        await ctx.wrapper.get('input.t-input__inner').trigger('keydown', { key: 'Backspace', code: 'Backspace' });
        await settle();
        expect(ctx.selected.value).toEqual(['guangzhou']);
        expect(ctx.onChange).toHaveBeenCalledExactlyOnceWith(
          ['guangzhou'],
          expect.objectContaining({
            trigger: 'backspace',
            index: 2,
            e: expect.any(KeyboardEvent),
          }),
        );
      });

      // Issue: https://github.com/Tencent/tdesign-vue-next/issues/6753
      it.each([false, true])(
        'retains descendants below a non-checkable node when popupVisible=%s',
        async (popupVisible) => {
          const ctx = await renderControlled(
            {
              popupVisible,
              data: [
                {
                  value: 'p',
                  label: 'parent',
                  children: [
                    { value: 'b', label: 'branch', checkable: false, children: [{ value: 'x', label: 'child' }] },
                    { value: 'y', label: 'sibling' },
                  ],
                },
              ],
            },
            ['p', 'x', 'y'],
          );
          await ctx.close(0);
          expect(ctx.selected.value).toEqual(['x']);
        },
      );

      // Issue: https://github.com/Tencent/tdesign-vue-next/issues/6753
      it.each([false, true])('uses current checkability after setItem overrides it to %s', async (checkable) => {
        const ctx = await renderControlled(
          {
            data: [
              {
                value: 'p',
                label: 'parent',
                children: [
                  { value: 'b', label: 'branch', checkable: !checkable, children: [{ value: 'x', label: 'child' }] },
                  { value: 'y', label: 'sibling' },
                ],
              },
            ],
          },
          ['p', 'x', 'y'],
        );
        getTree(ctx.treeSelect).vm.setItem('b', { checkable });
        await settle();
        await ctx.close(0);
        expect(ctx.selected.value).toEqual(checkable ? [] : ['x']);
      });

      // Issue: https://github.com/Tencent/tdesign-vue-next/issues/6753
      it('uses the same linked removal for custom valueDisplay', async () => {
        const ctx = await renderControlled(
          {
            valueDisplay: (_h, { onClose }) => (
              <button class="custom-remove" onClick={() => (onClose as (index: number) => void)(2)}>
                remove
              </button>
            ),
          },
          ['guangdong', 'guangzhou', 'shenzhen'],
        );
        await ctx.wrapper.get('.custom-remove').trigger('click');
        await settle();
        expect(ctx.selected.value).toEqual(['guangzhou']);
        expect(ctx.onRemove).toHaveBeenCalledExactlyOnceWith({
          value: ['guangdong', 'guangzhou', 'shenzhen'],
          data: null,
          e: undefined,
        });
      });
    });
  });
});
