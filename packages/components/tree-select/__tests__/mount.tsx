import { nextTick, type VNode } from 'vue';
import { mount, type VueWrapper } from '@vue/test-utils';

import SelectInput from '@tdesign/components/select-input';
import Tree, { type TreeNodeModel } from '@tdesign/components/tree';
import TreeSelect, { type TreeSelectProps } from '@tdesign/components/tree-select';

export const data = [
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

export const aliasData = [
  {
    name: '广东省',
    id: 'guangdong',
    list: [
      { name: '广州市', id: 'guangzhou' },
      { name: '深圳市', id: 'shenzhen' },
    ],
  },
];

type TestSlots = Record<string, (...args: unknown[]) => VNode>;

const waitForPopupRender = async () => {
  await nextTick();
  // Popup positioning is scheduled in requestAnimationFrame after Vue updates the trigger.
  await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
  await nextTick();
};

export const createTreeSelectTestHarness = () => {
  const mountedWrappers = new Set<VueWrapper>();

  const trackWrapper = <T extends VueWrapper>(wrapper: T) => {
    mountedWrappers.add(wrapper);
    return wrapper;
  };

  const renderTreeSelect = (props: TreeSelectProps = {}, slots: TestSlots = {}) =>
    trackWrapper(
      mount(TreeSelect, {
        attachTo: document.body,
        props: {
          data,
          ...props,
        },
        slots,
      }),
    );

  const renderOpenTreeSelect = async (props: TreeSelectProps = {}, slots: TestSlots = {}) => {
    const wrapper = renderTreeSelect({ popupVisible: true, ...props }, slots);
    await waitForPopupRender();
    return wrapper;
  };

  const cleanup = () => {
    mountedWrappers.forEach((wrapper) => wrapper.unmount());
    mountedWrappers.clear();
  };

  return { cleanup, renderOpenTreeSelect, renderTreeSelect, trackWrapper };
};

export const getSelectInput = (wrapper: VueWrapper) => wrapper.findComponent(SelectInput);

export const getTree = (wrapper: VueWrapper) => wrapper.findComponent(Tree);

export const getSelectInputHandler = (wrapper: VueWrapper, name: string) =>
  (getSelectInput(wrapper).props() as Record<string, unknown>)[name] as (...args: unknown[]) => unknown;

export const getTreeHandler = (wrapper: VueWrapper, name: string) =>
  (getTree(wrapper).props() as Record<string, unknown>)[name] as (...args: unknown[]) => unknown;

export const createNode = (
  overrides: Partial<{
    actived: boolean;
    checked: boolean;
    data: Record<string, unknown>;
    getIndex: () => number;
  }> = {},
) =>
  ({
    actived: true,
    checked: true,
    data: { label: '深圳市', value: 'shenzhen' },
    getIndex: () => 1,
    ...overrides,
  } as unknown as TreeNodeModel);
