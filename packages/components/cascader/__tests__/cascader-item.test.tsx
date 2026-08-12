import { h } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { ChevronRightIcon } from 'tdesign-icons-vue-next';
import TreeStore from '@tdesign/common-js/tree/tree-store';
import { Checkbox } from '@tdesign/components/checkbox';
import { Loading } from '@tdesign/components/loading';
import CascaderItem from '@tdesign/components/cascader/components/Item';
import type { CascaderContextType } from '@tdesign/components/cascader/types';

const createStore = () => {
  const store = new TreeStore({
    checkable: true,
    expandMutex: true,
    expandParent: true,
    keys: {},
  });
  store.append([
    {
      label: 'Parent',
      value: 'parent',
      children: [
        { label: 'Child child', value: 'child' },
        { label: 'Disabled', value: 'disabled', disabled: true },
      ],
    },
  ]);
  store.refreshNodes();
  return store;
};

const createContext = (store: TreeStore, overrides: Partial<CascaderContextType> = {}) =>
  ({
    checkProps: undefined,
    checkStrictly: false,
    clearable: false,
    disabled: false,
    filterable: false,
    inputVal: '',
    isParentFilterable: false,
    lazy: true,
    max: 0,
    minCollapsedNum: 0,
    multiple: false,
    reserveKeyword: true,
    setExpand: vi.fn(),
    setInputVal: vi.fn(),
    setTreeNodes: vi.fn(),
    setValue: vi.fn(),
    setVisible: vi.fn(),
    showAllLevels: true,
    size: 'medium',
    treeNodes: store.getNodes(),
    treeStore: store,
    value: '',
    valueMode: 'onlyLeaf',
    valueType: 'single',
    visible: true,
    ...overrides,
  } as CascaderContextType);

describe('CascaderItem', () => {
  describe('props', () => {
    it(':node[default] creates an empty object', () => {
      const component = CascaderItem as unknown as { props: { node: { default: () => object } } };

      expect(component.props.node.default()).toEqual({});
    });

    it(':node[object] renders a single leaf label and title', () => {
      const store = createStore();
      const node = store.getNode('child');
      const wrapper = mount(CascaderItem, { props: { node, cascaderContext: createContext(store) } });

      expect(wrapper.text()).toBe('Child child');
      expect(wrapper.find('[role="label"]').attributes('title')).toBe('Child child');
      expect(wrapper.classes()).toContain('t-cascader__item--leaf');
      wrapper.unmount();
    });

    it(':node[object] highlights every matching filter segment and uses the full path title', () => {
      const store = createStore();
      const node = store.getNode('child');
      const wrapper = mount(CascaderItem, {
        props: { node, cascaderContext: createContext(store, { inputVal: 'Child' }) },
      });

      expect(wrapper.findAll('.t-cascader__item-label--filter')).toHaveLength(1);
      expect(wrapper.find('.t-cascader__item-label--filter').text()).toBe('Child');
      expect(wrapper.find('[role="label"]').attributes('title')).toBe('Parent/Child child');
      wrapper.unmount();
    });

    it(':node[object] omits the title for a non-string label', () => {
      const store = createStore();
      const node = store.getNode('child');
      node.label = h('span', 'VNode label') as unknown as string;
      const wrapper = mount(CascaderItem, { props: { node, cascaderContext: createContext(store) } });

      expect(wrapper.find('[role="label"]').attributes('title')).toBeUndefined();
      wrapper.unmount();
    });

    it(':optionChild[VNode]', () => {
      const store = createStore();
      const wrapper = mount(CascaderItem, {
        props: {
          cascaderContext: createContext(store),
          node: store.getNode('child'),
          optionChild: h('strong', { class: 'custom-option' }, 'Custom option') as never,
        },
      });

      expect(wrapper.find('.custom-option').text()).toBe('Custom option');
      expect(wrapper.find('[role="label"]').exists()).toBe(false);
      wrapper.unmount();
    });

    it(':cascaderContext[object] renders a configured checkbox in multiple mode', async () => {
      const store = createStore();
      const node = store.getNode('child');
      node.checked = true;
      node.indeterminate = true;
      const onChange = vi.fn();
      const wrapper = mount(CascaderItem, {
        props: {
          cascaderContext: createContext(store, {
            checkProps: { readonly: true },
            inputVal: 'Child',
            max: 2,
            multiple: true,
            value: ['child'],
          }),
          node,
          onChange,
        },
      });
      const checkbox = wrapper.findComponent(Checkbox);

      expect(checkbox.props('checked')).toBe(true);
      expect(checkbox.props('indeterminate')).toBe(true);
      expect(checkbox.props('name')).toBe('child');
      expect(checkbox.props('readonly')).toBe(true);
      expect(checkbox.props('title')).toBe('Parent/Child child');
      expect(wrapper.find('.t-cascader__item-label--filter').exists()).toBe(true);
      checkbox.props('onChange')(false, { e: new Event('change') });
      expect(onChange).toHaveBeenCalledOnce();
      wrapper.unmount();
    });

    it(':node[object] supports an empty checkbox label', () => {
      const store = createStore();
      const node = store.getNode('child');
      node.label = undefined as unknown as string;
      const wrapper = mount(CascaderItem, {
        props: {
          cascaderContext: createContext(store, { multiple: true, value: [] }),
          node,
        },
      });

      expect(wrapper.findComponent(Checkbox).text()).toBe('');
      wrapper.unmount();
    });

    it(':cascaderContext[object] disables checkboxes for disabled nodes and max selection', () => {
      const store = createStore();
      const disabledWrapper = mount(CascaderItem, {
        props: {
          cascaderContext: createContext(store, { multiple: true, value: [] }),
          node: store.getNode('disabled'),
        },
      });
      expect(disabledWrapper.findComponent(Checkbox).props('disabled')).toBe(true);
      disabledWrapper.unmount();

      const limitedWrapper = mount(CascaderItem, {
        props: {
          cascaderContext: createContext(store, { max: 1, multiple: true, value: ['disabled'] }),
          node: store.getNode('child'),
        },
      });
      expect(limitedWrapper.findComponent(Checkbox).props('disabled')).toBe(true);
      limitedWrapper.unmount();
    });

    it(':cascaderContext[object] stops label-trigger selection on expandable parents', () => {
      const store = createStore();
      const wrapper = mount(CascaderItem, {
        props: {
          cascaderContext: createContext(store, { isParentFilterable: false, multiple: true, value: [] }),
          node: store.getNode('parent'),
        },
      });

      expect(wrapper.findComponent(Checkbox).props('stopLabelTrigger')).toBe(true);
      wrapper.unmount();
    });

    it(':node[object] renders expand and loading icons for a parent', async () => {
      const store = createStore();
      const node = store.getNode('parent');
      const wrapper = mount(CascaderItem, { props: { node, cascaderContext: createContext(store) } });

      expect(wrapper.findComponent(ChevronRightIcon).exists()).toBe(true);
      wrapper.unmount();

      node.loading = true;
      const loadingWrapper = mount(CascaderItem, { props: { node, cascaderContext: createContext(store) } });
      expect(loadingWrapper.findComponent(Loading).exists()).toBe(true);
      loadingWrapper.unmount();
    });

    it(':cascaderContext[object] hides the parent icon while parent filtering is enabled', () => {
      const store = createStore();
      const wrapper = mount(CascaderItem, {
        props: {
          cascaderContext: createContext(store, { isParentFilterable: true }),
          node: store.getNode('parent'),
        },
      });

      expect(wrapper.findComponent(ChevronRightIcon).exists()).toBe(false);
      expect(wrapper.classes()).toContain('t-cascader__item--leaf');
      wrapper.unmount();
    });
  });

  describe('events', () => {
    it('click and mouseenter', async () => {
      const store = createStore();
      const onClick = vi.fn();
      const onMouseenter = vi.fn();
      const wrapper = mount(CascaderItem, {
        props: { cascaderContext: createContext(store), node: store.getNode('child'), onClick, onMouseenter },
      });

      await wrapper.trigger('click');
      await wrapper.trigger('mouseenter');
      expect(onClick).toHaveBeenCalledOnce();
      expect(onMouseenter).toHaveBeenCalledOnce();
      wrapper.unmount();
    });
  });
});
