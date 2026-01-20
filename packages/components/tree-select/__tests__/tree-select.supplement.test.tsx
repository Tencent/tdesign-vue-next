/* eslint-disable vue/one-component-per-file, vue/require-prop-types */
// @ts-nocheck
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, getCurrentInstance, h, nextTick } from 'vue';

/**
 * Supplement tests:
 * - Keep `tree-select.test.tsx` (snapshots/regression) intact
 * - Mock dependencies (`Tree` / `SelectInput`) to make hard-to-trigger branches deterministic
 */

const options = [
  {
    label: '广东省',
    value: 'guangdong',
    children: [
      { label: '广州市', value: 'guangzhou' },
      { label: '深圳市', value: 'shenzhen' },
    ],
  },
  {
    label: '江苏省',
    value: 'jiangsu',
    children: [
      { label: '南京市', value: 'nanjing' },
      { label: '苏州市', value: 'suzhou' },
    ],
  },
];

let latestSelectInputProps: any = null;
let latestTreeProps: any = null;
let latestTreeVNodeKey: any = null;
let treeGetItemImpl: ((value: any) => any) | null = null;

vi.mock('@tdesign/common-js/tree-select/utils', () => {
  return {
    findParentValues: vi.fn(() => ['guangdong']),
  };
});

vi.mock('../../common-components/fake-arrow', () => {
  return {
    default: defineComponent({
      name: 'FakeArrow',
      props: ['isActive', 'disabled', 'overlayClassName'],
      setup(props) {
        return () =>
          h('i', {
            class: ['fake-arrow-mock', props.isActive ? 'is-active' : '', props.disabled ? 'is-disabled' : ''],
          });
      },
    }),
  };
});

vi.mock('../../tree', () => {
  return {
    default: defineComponent({
      name: 'Tree',
      props: [
        'data',
        'value',
        'expanded',
        'actived',
        'filter',
        'disabled',
        'onChange',
        'onActive',
        'onExpand',
        'onLoad',
      ],
      setup(props, { slots, expose }) {
        latestTreeProps = props;
        const inst = getCurrentInstance();
        latestTreeVNodeKey = inst?.vnode?.key;

        const getItem = (value: any) => (treeGetItemImpl ? treeGetItemImpl(value) : undefined);
        expose({ getItem });

        return () =>
          h('div', { class: 'tree-mock' }, [
            // 主动调用 empty slot，覆盖 tree-select.tsx 中 renderTree() 的默认 empty 渲染分支
            slots.empty?.(),
          ]);
      },
    }),
  };
});

vi.mock('../../select-input', () => {
  return {
    default: defineComponent({
      name: 'SelectInput',
      inheritAttrs: false,
      props: [
        'value',
        'inputValue',
        'popupVisible',
        'disabled',
        'multiple',
        'loading',
        'clearable',
        'autoWidth',
        'borderless',
        'readonly',
        'placeholder',
        'allowInput',
        'minCollapsedNum',
        'collapsedItems',
        'popupProps',
        'inputProps',
        'tagInputProps',
        'tagProps',
        'label',
        'suffix',
        'suffixIcon',
        'valueDisplay',
        // forwarded events
        'onInputChange',
        'onTagChange',
        'onPopupVisibleChange',
        'onClear',
        'onBlur',
        'onFocus',
      ],
      setup(props, { slots }) {
        latestSelectInputProps = props;
        return () =>
          h('div', { class: 'select-input-mock' }, [
            h('div', { class: 'si-inputValue' }, String(props.inputValue ?? '')),
            h('div', { class: 'si-popupVisible' }, String(!!props.popupVisible)),
            h('div', { class: 'si-allowInput' }, String(!!props.allowInput)),
            h('div', { class: 'si-label' }, [props.label?.()]),
            h('div', { class: 'si-suffixIcon' }, [props.suffixIcon?.()]),
            h('div', { class: 'si-valueDisplay' }, [props.valueDisplay?.()]),
            h('div', { class: 'si-panel' }, [slots.panel?.()]),
          ]);
      },
    }),
  };
});

// 为了保证以上相对路径 mock 生效，这里直接引入源码实现（而不是 @tdesign/components 入口）
import TreeSelect from '../tree-select';
import treeSelectProps from '../props';

describe('TreeSelect (supplement)', () => {
  beforeEach(() => {
    latestSelectInputProps = null;
    latestTreeProps = null;
    latestTreeVNodeKey = null;
    treeGetItemImpl = null;
  });

  it('clears input when popup opens via trigger click', async () => {
    const wrapper = mount(TreeSelect, {
      props: {
        data: options,
        filterable: true,
        defaultInputValue: 'abc',
      },
    });
    expect(wrapper.find('.si-inputValue').text()).toBe('');

    latestSelectInputProps.onPopupVisibleChange(true, { trigger: 'trigger-element-click' });
    await nextTick();
    expect(wrapper.find('.si-popupVisible').text()).toBe('true');
    expect(wrapper.find('.si-inputValue').text()).toBe('');
  });

  it('can hit changeNodeInfo fallback branch (defensive)', async () => {
    const wrapper = mount(TreeSelect, { props: { data: options } });

    // Force an inconsistent props.multiple read to hit the defensive fallback branch.
    let hit = 0;
    const internal = (wrapper.vm as any).$;
    Object.defineProperty(internal.props, 'multiple', {
      configurable: true,
      get() {
        hit += 1;
        return hit === 1;
      },
    });

    latestTreeProps.onLoad?.(); // treeNodeLoad -> changeNodeInfo
    await nextTick();
    expect(latestSelectInputProps.value).toBe(null);
  });

  it('getNodeItem: prefer treeRef.getItem, fallback to recursion, fallback to raw value', async () => {
    treeGetItemImpl = (value) => {
      if (value === 'shenzhen') return { data: { label: '深圳市', value: 'shenzhen' } };
      return undefined;
    };

    const wrapper = mount(TreeSelect, {
      props: {
        data: options,
        value: 'shenzhen',
      },
    });
    await nextTick();
    expect(latestSelectInputProps.value?.label).toBe('深圳市');

    // getItem miss -> recursion
    treeGetItemImpl = () => undefined;
    await wrapper.setProps({ value: 'nanjing' });
    await nextTick();
    expect(latestSelectInputProps.value?.label).toBe('南京市');

    // recursion miss -> raw value fallback
    await wrapper.setProps({ value: 'not-exists' });
    await nextTick();
    expect(latestSelectInputProps.value).toEqual({ label: 'not-exists', value: 'not-exists' });
  });

  it('rerenders Tree when data changes', async () => {
    const wrapper = mount(TreeSelect, { props: { data: options } });
    const oldKey = latestTreeVNodeKey;
    await wrapper.setProps({ data: [...options, { label: '浙江省', value: 'zhejiang', children: [] }] });
    await nextTick();
    expect(latestTreeVNodeKey).not.toBe(oldKey);
  });

  it('renders default empty content for Tree', async () => {
    const wrapper = mount(TreeSelect, { props: { data: [] } });
    await nextTick();
    expect(wrapper.find('.t-select__empty').exists()).toBe(true);
  });

  it('uses custom suffixIcon when provided', async () => {
    const wrapper = mount(TreeSelect, {
      props: {
        data: options,
        suffixIcon: () => <i class="my-suffix-icon">custom</i>,
      },
    });
    await nextTick();
    expect(wrapper.find('.my-suffix-icon').exists()).toBe(true);
    expect(wrapper.find('.fake-arrow-mock').exists()).toBe(false);
  });

  it('multiple: valueDisplay onClose triggers tag change', async () => {
    const onRemove = vi.fn();
    const onChange = vi.fn();
    const wrapper = mount(TreeSelect, {
      props: {
        data: options,
        multiple: true,
        value: ['shenzhen', 'guangzhou'],
        onRemove,
        onChange,
      },
      slots: {
        valueDisplay: (params: any) => (
          <button class="vd-close" onClick={() => params.onClose(0)}>
            close
          </button>
        ),
      },
    });
    await nextTick();
    await wrapper.find('.vd-close').trigger('click');
    expect(onRemove).toBeCalledTimes(1);
    expect(onChange).toBeCalledTimes(1);
    expect(onChange.mock.calls[0][1]?.trigger).toBe('tag-remove');
  });

  it('single: active selects new node and ignores repeat selection', async () => {
    treeGetItemImpl = (value) => {
      const map: any = {
        guangzhou: { label: '广州市', value: 'guangzhou' },
        shenzhen: { label: '深圳市', value: 'shenzhen' },
      };
      return map[value] ? { data: map[value] } : undefined;
    };

    const onChange = vi.fn();
    mount(TreeSelect, {
      props: {
        data: options,
        defaultValue: 'guangzhou',
        onChange,
      },
    });

    // trigger active (single)
    latestTreeProps.onActive?.(['shenzhen'], {
      node: { actived: true, data: { label: '深圳市', value: 'shenzhen' } },
    });
    await nextTick();
    expect(onChange).toBeCalled();

    // repeat same selection should not trigger onChange again
    const calls = onChange.mock.calls.length;
    latestTreeProps.onActive?.(['shenzhen'], {
      node: { actived: true, data: { label: '深圳市', value: 'shenzhen' } },
    });
    await nextTick();
    expect(onChange.mock.calls.length).toBe(calls);
    expect(latestSelectInputProps.value?.label).toBe('深圳市');
  });

  it('single(object): active builds object value via getNodeItem', async () => {
    treeGetItemImpl = (value) => {
      const map: any = {
        guangzhou: { label: '广州市', value: 'guangzhou' },
        shenzhen: { label: '深圳市', value: 'shenzhen' },
      };
      return map[value] ? { data: map[value] } : undefined;
    };

    const onChange = vi.fn();
    mount(TreeSelect, {
      props: {
        data: options,
        valueType: 'object',
        defaultValue: { label: '广州市', value: 'guangzhou' },
        onChange,
      },
    });

    latestTreeProps.onActive?.(['shenzhen'], {
      node: { actived: true, data: { label: '深圳市', value: 'shenzhen' } },
    });
    await nextTick();

    expect(onChange).toBeCalled();
    expect(latestSelectInputProps.value?.label).toBe('深圳市');
  });

  it('expand updates expanded values', async () => {
    mount(TreeSelect, { props: { data: options } });
    latestTreeProps.onExpand?.(['guangdong']);
    await nextTick();
    expect(latestTreeProps.expanded).toEqual(['guangdong']);
  });

  it('inputChange updates inputValue only when popup is visible', async () => {
    const onSearch = vi.fn();
    const wrapper = mount(TreeSelect, {
      props: {
        data: options,
        filterable: true,
        onSearch,
      },
    });

    // only when popup is open
    latestSelectInputProps.onPopupVisibleChange(true, { trigger: 'trigger-element-click' });
    await nextTick();
    latestSelectInputProps.onInputChange('sz');
    await nextTick();

    expect(onSearch).toBeCalled();
    expect(wrapper.find('.si-inputValue').text()).toBe('sz');
  });

  it('multiple: change updates selection from raw value array', async () => {
    const onChange = vi.fn();
    mount(TreeSelect, {
      props: {
        data: options,
        multiple: true,
        defaultValue: [],
        onChange,
      },
    });

    latestTreeProps.onChange?.(['shenzhen', 'guangzhou'], {
      node: { data: { label: '深圳市', value: 'shenzhen' } },
    });
    await nextTick();

    expect(onChange).toBeCalled();
    // multiple -> SelectInput value is nodeInfo[]
    expect(Array.isArray(latestSelectInputProps.value)).toBe(true);
  });

  it('multiple(object): change maps values to node objects', async () => {
    treeGetItemImpl = (value) => {
      const map: any = {
        guangzhou: { label: '广州市', value: 'guangzhou' },
        shenzhen: { label: '深圳市', value: 'shenzhen' },
      };
      return map[value] ? { data: map[value] } : undefined;
    };

    const onChange = vi.fn();
    mount(TreeSelect, {
      props: {
        data: options,
        multiple: true,
        valueType: 'object',
        defaultValue: [],
        onChange,
      },
    });

    latestTreeProps.onChange?.(['shenzhen', 'guangzhou'], {
      node: { data: { label: '深圳市', value: 'shenzhen' } },
    });
    await nextTick();

    expect(onChange).toBeCalled();
    expect(latestSelectInputProps.value?.[0]?.value).toBeDefined();
  });

  it('single: active is ignored when node.actived is false', async () => {
    const onChange = vi.fn();
    mount(TreeSelect, {
      props: {
        data: options,
        defaultValue: 'guangzhou',
        onChange,
      },
    });

    latestTreeProps.onActive?.(['shenzhen'], {
      node: { actived: false, data: { label: '深圳市', value: 'shenzhen' } },
    });
    await nextTick();

    expect(onChange).not.toBeCalled();
  });

  it('mount: when value is empty but defaultValue exists, triggers change(defaultValue)', async () => {
    const onChange = vi.fn();
    mount(TreeSelect, {
      props: {
        data: options,
        value: '',
        defaultValue: 'shenzhen',
        onChange,
      },
    });
    await nextTick();
    expect(onChange).toBeCalled();
    expect(onChange.mock.calls[0][1]?.trigger).toBe('uncheck');
  });

  it('clear(): resets value and calls onClear', async () => {
    const onClear = vi.fn();
    const onChange = vi.fn();
    mount(TreeSelect, {
      props: {
        data: options,
        clearable: true,
        value: 'shenzhen',
        onClear,
        onChange,
      },
    });

    latestSelectInputProps.onClear?.({ e: new MouseEvent('click') });
    await nextTick();

    expect(onClear).toBeCalled();
    expect(onChange).toBeCalled();
    expect(onChange.mock.calls[0][1]?.trigger).toBe('clear');
  });

  it('filterByText: default substring match when filter returns non-boolean', async () => {
    mount(TreeSelect, {
      props: {
        data: options,
        filterable: true,
      },
    });

    latestSelectInputProps.onPopupVisibleChange(true, { trigger: 'trigger-element-click' });
    await nextTick();
    latestSelectInputProps.onInputChange('深');
    await nextTick();

    expect(typeof latestTreeProps.filter).toBe('function');
    expect(latestTreeProps.filter({ data: { label: '深圳市' } })).toBe(true);
    expect(latestTreeProps.filter({ data: { label: '广州市' } })).toBe(false);
  });

  it('filterByText: async filter (Promise) falls back to substring match', async () => {
    mount(TreeSelect, {
      props: {
        data: options,
        filterable: true,
        filter: () => Promise.resolve(true),
      },
    });

    latestSelectInputProps.onPopupVisibleChange(true, { trigger: 'trigger-element-click' });
    await nextTick();
    latestSelectInputProps.onInputChange('深');
    await nextTick();

    expect(latestTreeProps.filter({ data: { label: '深圳市' } })).toBe(true);
  });

  it('filterByText: boolean filter result is used directly', async () => {
    mount(TreeSelect, {
      props: {
        data: options,
        filterable: true,
        filter: () => true,
      },
    });

    latestSelectInputProps.onPopupVisibleChange(true, { trigger: 'trigger-element-click' });
    await nextTick();
    latestSelectInputProps.onInputChange('不存在');
    await nextTick();

    // Even if label doesn't match, boolean filter result is used directly.
    expect(latestTreeProps.filter({ data: { label: '广州市' } })).toBe(true);
  });

  it('multiLimitDisabled: disables Tree when max reached', async () => {
    mount(TreeSelect, {
      props: {
        data: options,
        multiple: true,
        max: 1,
        defaultValue: ['shenzhen'],
      },
    });
    await nextTick();
    expect(latestTreeProps.disabled).toBe(true);
  });

  it('realChildren uses treeProps.keys.children for recursion', async () => {
    const customData = [
      {
        label: '江苏省',
        value: 'jiangsu',
        sons: [{ label: '南京市', value: 'nanjing' }],
      },
    ];

    treeGetItemImpl = () => undefined; // 强制走 getTreeNode 递归
    mount(TreeSelect, {
      props: {
        data: customData,
        treeProps: { keys: { children: 'sons' } },
        value: 'nanjing',
      },
    });
    await nextTick();
    expect(latestSelectInputProps.value?.label).toBe('南京市');
  });

  it('single: actived becomes [] when value cleared', async () => {
    treeGetItemImpl = (value) => (value ? { data: { label: String(value), value } } : undefined);
    const wrapper = mount(TreeSelect, {
      props: {
        data: options,
        value: 'shenzhen',
      },
    });
    await nextTick();
    expect(Array.isArray(latestTreeProps.actived)).toBe(true);

    // clear value -> nodeInfo falsy -> actived becomes []
    await wrapper.setProps({ value: '' });
    await nextTick();
    expect(latestTreeProps.actived).toEqual([]);
  });

  it('multiple(object): checked becomes [] when value is not array', async () => {
    mount(TreeSelect, {
      props: {
        data: options,
        multiple: true,
        valueType: 'object',
        // non-array in multiple mode (defensive)
        defaultValue: { label: '深圳市', value: 'shenzhen' },
      },
    });
    await nextTick();
    expect(latestTreeProps.value).toEqual([]);
  });

  it('keys: uses props.keys when treeProps.keys not provided', async () => {
    treeGetItemImpl = () => undefined;
    mount(TreeSelect, {
      props: {
        data: [
          {
            name: '江苏省',
            pinyin: 'jiangsu',
            sons: [{ name: '南京市', pinyin: 'nanjing' }],
          },
        ],
        keys: { label: 'name', value: 'pinyin', children: 'sons' },
        value: 'nanjing',
      },
    });
    await nextTick();
    expect(latestSelectInputProps.value?.label).toBe('南京市');
  });

  it('keys: treeProps.keys.children falls back to "children" when missing', async () => {
    treeGetItemImpl = () => undefined;
    mount(TreeSelect, {
      props: {
        data: options,
        treeProps: { keys: { label: 'label', value: 'value' } }, // 没有 children
        value: 'nanjing',
      },
    });
    await nextTick();
    expect(latestSelectInputProps.value?.label).toBe('南京市');
  });

  it('clear(): uses [] in multiple mode', async () => {
    const onClear = vi.fn();
    const onChange = vi.fn();
    mount(TreeSelect, {
      props: {
        data: options,
        multiple: true,
        clearable: true,
        value: ['shenzhen'],
        onClear,
        onChange,
      },
    });
    latestSelectInputProps.onClear?.({ e: new MouseEvent('click') });
    await nextTick();
    expect(onClear).toBeCalled();
    expect(onChange).toBeCalled();
    expect(onChange.mock.calls[0][0]).toEqual([]); // clear 后的 value
    expect(onChange.mock.calls[0][1]?.trigger).toBe('clear');
  });

  it('single: active uses "" when valueParam is empty (value/object)', async () => {
    const onChangeValue = vi.fn();
    mount(TreeSelect, {
      props: {
        data: options,
        defaultValue: 'guangzhou',
        onChange: onChangeValue,
      },
    });
    latestTreeProps.onActive?.([], { node: { actived: true, data: { label: '任意', value: 'any' } } });
    await nextTick();
    expect(onChangeValue).toBeCalled();
    expect(onChangeValue.mock.calls[0][0]).toBe('');

    // object mode: empty valueParam -> default object fallback
    const onChangeObj = vi.fn();
    mount(TreeSelect, {
      props: {
        data: options,
        valueType: 'object',
        defaultValue: { label: '广州市', value: 'guangzhou' },
        onChange: onChangeObj,
      },
    });
    latestTreeProps.onActive?.([], { node: { actived: true, data: { label: '任意', value: 'any' } } });
    await nextTick();
    expect(onChangeObj).toBeCalled();
    expect(onChangeObj.mock.calls[0][0]).toEqual({ label: '', value: '' });
  });

  it('props validators: empty value returns true (and invalid values return false)', () => {
    expect(treeSelectProps.size.validator()).toBe(true);
    expect(treeSelectProps.size.validator('mini')).toBe(false);
    expect(treeSelectProps.size.validator('small')).toBe(true);

    expect(treeSelectProps.valueType.validator()).toBe(true);
    expect(treeSelectProps.valueType.validator('bad')).toBe(false);
    expect(treeSelectProps.valueType.validator('object')).toBe(true);
  });
});
