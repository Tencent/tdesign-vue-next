/* eslint-disable vue/one-component-per-file */
import { defineComponent, h, nextTick, ref, watch } from 'vue';
import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';
import TreeStore from '@tdesign/common-js/tree/tree-store';
import CascaderSubPanel from '@tdesign/components/cascader/components/Panel';
import type { CascaderContextType, CascaderOption, FilterValue, TreeNode } from '@tdesign/components/cascader/types';

const options: CascaderOption[] = [
  {
    label: 'Alpha',
    value: 'alpha',
    children: [
      { label: 'Alpha One', value: 'alpha-1' },
      { label: 'Alpha Two', value: 'alpha-2' },
    ],
  },
  {
    label: 'Beta',
    value: 'beta',
    children: [{ label: 'Beta One', value: 'beta-1' }],
  },
];

const createStore = (data: CascaderOption[] = options) => {
  const store = new TreeStore({
    checkable: true,
    expandMutex: true,
    expandParent: true,
    keys: {},
  });
  store.append(data);
  store.refreshNodes();
  return store;
};

const getVisibleNodes = (store: TreeStore) => store.getNodes().filter((node: TreeNode) => node.visible);

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
    treeNodes: getVisibleNodes(store),
    treeStore: store,
    value: '',
    valueMode: 'onlyLeaf',
    valueType: 'single',
    visible: true,
    ...overrides,
  } as CascaderContextType);

const FilterControl = defineComponent({
  name: 'FilterControl',
  props: {
    onFilter: { type: Function, required: true },
  },
  setup(props) {
    const value = ref('');
    watch(value, (filter) => props.onFilter(filter));
    return () => (
      <input
        class="column-filter"
        value={value.value}
        onInput={(event) => {
          value.value = (event.target as HTMLInputElement).value;
        }}
      />
    );
  },
});

describe('CascaderSubPanel', () => {
  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  describe('props', () => {
    it(':cascaderContext[object] renders the current tree panels', () => {
      const store = createStore();
      const wrapper = mount(CascaderSubPanel, { props: { cascaderContext: createContext(store) } });

      expect(wrapper.classes()).toContain('t-cascader--normal');
      expect(wrapper.findAll('.t-cascader__menu')).toHaveLength(1);
      expect(wrapper.findAll('.t-cascader__item')).toHaveLength(2);
      wrapper.unmount();
    });

    it(':loading[boolean]', () => {
      const store = createStore();
      const wrapper = mount(CascaderSubPanel, {
        props: { cascaderContext: createContext(store), loading: true },
      });

      expect(wrapper.classes()).not.toContain('t-cascader--normal');
      expect(wrapper.find('.t-cascader__panel--empty').text()).not.toBe('');
      wrapper.unmount();
    });

    it(':loadingText[string]', () => {
      const store = createStore();
      const wrapper = mount(CascaderSubPanel, {
        props: { cascaderContext: createContext(store), loading: true, loadingText: 'Loading options' },
      });

      expect(wrapper.text()).toBe('Loading options');
      wrapper.unmount();
    });

    it(':loadingText[function]', () => {
      const store = createStore();
      const wrapper = mount(CascaderSubPanel, {
        props: {
          cascaderContext: createContext(store),
          loading: true,
          loadingText: () => <span class="function-loading">Loading function</span>,
        },
      });

      expect(wrapper.find('.function-loading').text()).toBe('Loading function');
      wrapper.unmount();
    });

    it(':loadingText[slot]', () => {
      const store = createStore();
      const wrapper = mount(CascaderSubPanel, {
        props: { cascaderContext: createContext(store), loading: true },
        slots: { loadingText: () => <span class="slot-loading">Loading slot</span> },
      });

      expect(wrapper.find('.slot-loading').text()).toBe('Loading slot');
      wrapper.unmount();
    });

    it(':empty[string]', () => {
      const store = createStore([]);
      const wrapper = mount(CascaderSubPanel, {
        props: { cascaderContext: createContext(store), empty: 'No options' },
      });

      expect(wrapper.text()).toBe('No options');
      wrapper.unmount();
    });

    it(':empty[function]', () => {
      const store = createStore([]);
      const wrapper = mount(CascaderSubPanel, {
        props: { cascaderContext: createContext(store), empty: () => <span class="function-empty">Empty</span> },
      });

      expect(wrapper.find('.function-empty').exists()).toBe(true);
      wrapper.unmount();
    });

    it(':empty[slot]', () => {
      const store = createStore([]);
      const wrapper = mount(CascaderSubPanel, {
        props: { cascaderContext: createContext(store) },
        slots: { empty: () => <span class="slot-empty">Empty slot</span> },
      });

      expect(wrapper.find('.slot-empty').exists()).toBe(true);
      wrapper.unmount();
    });

    it(':option[function]', async () => {
      const store = createStore();
      const onChange = vi.fn();
      const onExpand = vi.fn();
      const wrapper = mount(CascaderSubPanel, {
        props: {
          cascaderContext: createContext(store),
          option: (h, { item, onChange: change, onExpand: expand }) => (
            <button
              class="function-option"
              onClick={() => {
                change();
                expand();
                onChange();
                onExpand();
              }}
            >
              {String(item.label)}
            </button>
          ),
        },
      });

      expect(wrapper.findAll('.function-option')).toHaveLength(2);
      await wrapper.find('.function-option').trigger('click');
      expect(onChange).toHaveBeenCalledOnce();
      expect(onExpand).toHaveBeenCalledOnce();
      wrapper.unmount();
    });

    it(':option[slot]', () => {
      const store = createStore();
      const wrapper = mount(CascaderSubPanel, {
        props: { cascaderContext: createContext(store) },
        slots: {
          option: ({ item }: { item: CascaderOption }) => <span class="slot-option">{String(item.label)}</span>,
        },
      });

      expect(wrapper.findAll('.slot-option')).toHaveLength(2);
      wrapper.unmount();
    });

    it(':option[option.content]', () => {
      const store = createStore([
        {
          label: 'Content option',
          value: 'content',
          content: () => h('span', { class: 'data-content' }, 'Data content'),
        },
      ]);
      const wrapper = mount(CascaderSubPanel, { props: { cascaderContext: createContext(store) } });

      expect(wrapper.find('.data-content').text()).toBe('Data content');
      wrapper.unmount();
    });

    it(':columnHeader[slot] and :columnFooter[slot] receive panel context', () => {
      const store = createStore();
      const wrapper = mount(CascaderSubPanel, {
        props: { cascaderContext: createContext(store) },
        slots: {
          columnHeader: ({ panelIndex, options, filteredOptions }) => (
            <div class="column-header">{`${panelIndex}:${options.length}:${filteredOptions.length}`}</div>
          ),
          columnFooter: ({ panelIndex, options, filteredOptions }) => (
            <div class="column-footer">{`${panelIndex}:${options.length}:${filteredOptions.length}`}</div>
          ),
        },
      });

      expect(wrapper.find('.column-header').text()).toBe('0:2:2');
      expect(wrapper.find('.column-footer').text()).toBe('0:2:2');
      wrapper.unmount();
    });

    it(':columnHeader[slot] filters a panel by string and resets on whitespace', async () => {
      const store = createStore();
      const wrapper = mount(CascaderSubPanel, {
        props: { cascaderContext: createContext(store) },
        slots: {
          columnHeader: ({ onFilter }: { onFilter: (filter: FilterValue) => void }) => (
            <FilterControl onFilter={onFilter} />
          ),
        },
      });
      const input = wrapper.find('.column-filter');

      await input.setValue('alpha');
      expect(wrapper.findAll('.t-cascader__item')).toHaveLength(1);
      await input.setValue('   ');
      expect(wrapper.findAll('.t-cascader__item')).toHaveLength(2);
      wrapper.unmount();
    });

    it(':columnFooter[slot] filters a panel with a function', async () => {
      const store = createStore();
      let onFilter: (filter: FilterValue) => void = () => undefined;
      const wrapper = mount(CascaderSubPanel, {
        props: { cascaderContext: createContext(store) },
        slots: {
          columnFooter: (params: { onFilter: (filter: FilterValue) => void }) => {
            onFilter = params.onFilter;
            return <span class="function-filter-control" />;
          },
        },
      });

      onFilter((option, panelIndex) => option.value === 'beta' && panelIndex === 0);
      await nextTick();
      expect(wrapper.findAll('.t-cascader__item')).toHaveLength(1);
      expect(wrapper.text()).toContain('Beta');
      wrapper.unmount();
    });

    it(':cascaderContext[object] renders a flat filtered list with inert column filtering', async () => {
      const store = createStore();
      let onFilter: (filter: FilterValue) => void = () => undefined;
      const context = createContext(store, { inputVal: 'Alpha', treeNodes: [store.getNode('alpha-1')] });
      const wrapper = mount(CascaderSubPanel, {
        props: { cascaderContext: context },
        slots: {
          columnHeader: (params: { onFilter: (filter: FilterValue) => void }) => {
            onFilter = params.onFilter;
            return <span class="flat-header" />;
          },
        },
      });

      expect(wrapper.find('.t-cascader__menu--filter').exists()).toBe(true);
      expect(wrapper.findAll('.t-cascader__item')).toHaveLength(1);
      onFilter('nothing');
      await nextTick();
      expect(wrapper.findAll('.t-cascader__item')).toHaveLength(1);
      wrapper.unmount();
    });

    it(':trigger[click] expands a second panel', async () => {
      const store = createStore();
      const context = createContext(store);
      const wrapper = mount(CascaderSubPanel, { props: { cascaderContext: context, trigger: 'click' } });

      await wrapper.findAll('.t-cascader__item')[0].trigger('click');
      context.treeNodes = getVisibleNodes(store);
      await wrapper.setProps({ cascaderContext: { ...context } });
      expect(wrapper.findAll('.t-cascader__menu')).toHaveLength(2);
      wrapper.unmount();
    });

    it(':trigger[hover] expands on mouseenter but not click', async () => {
      const store = createStore();
      const context = createContext(store);
      const wrapper = mount(CascaderSubPanel, { props: { cascaderContext: context, trigger: 'hover' } });

      await wrapper.findAll('.t-cascader__item')[0].trigger('click');
      expect(store.getExpanded()).toEqual([]);
      await wrapper.findAll('.t-cascader__item')[0].trigger('mouseenter');
      expect(store.getExpanded()).toContain('alpha');
      wrapper.unmount();
    });

    it('active column filters limit deeper panels and expansion restores the next level', async () => {
      const store = createStore();
      store.replaceExpanded(['alpha']);
      store.refreshNodes();
      const context = createContext(store, { treeNodes: getVisibleNodes(store) });
      const filters: Array<(filter: FilterValue) => void> = [];
      const wrapper = mount(CascaderSubPanel, {
        props: { cascaderContext: context, trigger: 'click' },
        slots: {
          columnHeader: ({ panelIndex, onFilter }) => {
            filters[panelIndex] = onFilter;
            return <span class="cascade-filter" />;
          },
        },
      });

      expect(wrapper.findAll('.t-cascader__menu')).toHaveLength(2);
      filters[0]('missing');
      await nextTick();
      expect(wrapper.findAll('.t-cascader__menu')).toHaveLength(1);

      filters[0]('alpha');
      await nextTick();
      await wrapper.find('.t-cascader__item').trigger('click');
      await nextTick();
      expect(wrapper.findAll('.t-cascader__menu').length).toBeGreaterThanOrEqual(1);
      wrapper.unmount();
    });
  });

  describe('lifecycle', () => {
    it('cleans cached column callbacks when panels disappear and on unmount', async () => {
      const store = createStore();
      store.replaceExpanded(['alpha']);
      store.refreshNodes();
      const context = createContext(store, { treeNodes: getVisibleNodes(store) });
      const filters: Array<(filter: FilterValue) => void> = [];
      const wrapper = mount(CascaderSubPanel, {
        props: { cascaderContext: context },
        slots: {
          columnHeader: ({ panelIndex, onFilter }) => {
            filters[panelIndex] = onFilter;
            return <span class="header" />;
          },
        },
      });
      expect(wrapper.findAll('.header')).toHaveLength(2);

      context.treeNodes = context.treeNodes.filter((node) => node.level === 0);
      await wrapper.setProps({ cascaderContext: { ...context } });
      await nextTick();
      expect(wrapper.findAll('.header')).toHaveLength(1);
      expect(() => filters[1]('stale filter')).not.toThrow();
      expect(() => wrapper.unmount()).not.toThrow();
    });
  });
});
