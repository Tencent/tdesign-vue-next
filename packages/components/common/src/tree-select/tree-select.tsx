import { computed, defineComponent, onMounted, ref, toRefs, watch } from '@td/adapter-vue';
import { isArray, isBoolean, isEmpty, isFunction, isNil } from 'lodash-es';

import type { TdTreeSelectProps, TreeSelectValue, TreeSelectValueChangeTrigger } from '@td/intel/tree-select/type';
import props from '@td/intel/tree-select/props';

// hooks
import { useConfig, usePrefixClass } from '@td/adapter-hooks';
import { useTNodeDefault, useTNodeJSX } from '@td/adapter-hooks';
import { useVModel } from '@td/adapter-hooks';
import { useDefaultValue } from '@td/adapter-hooks';
import { useFormDisabled } from '../form/hooks';
import type { TreeOptionData } from '@td/shared/interface';
import type { PopupVisibleChangeContext } from '../popup';
import SelectInput from '../select-input';
import type { TdSelectInputProps } from '../select-input';
import Tree from '../tree';
import type { TreeNodeModel, TreeNodeValue, TreeProps } from '../tree';
import FakeArrow from '../common-components/fake-arrow';
import type { INodeOptions } from './interface';

export default defineComponent({
  name: 'TTreeSelect',
  props,
  setup(props: TdTreeSelectProps, { slots }) {
    const renderTNodeJSX = useTNodeJSX();
    const renderDefaultTNode = useTNodeDefault();
    const classPrefix = usePrefixClass();
    const { globalConfig } = useConfig('treeSelect');
    const formDisabled = useFormDisabled();

    // ref
    const treeRef = ref(null);

    // data
    const actived = ref([]);
    const expanded = ref([]);
    const nodeInfo = ref(null);
    const treeKey = ref(0);

    // model
    const { value, modelValue, popupVisible, inputValue } = toRefs(props);
    const [treeSelectValue, setTreeSelectValue] = useVModel(value, modelValue, props.defaultValue, props.onChange);
    const [innerVisible, setInnerVisible] = useDefaultValue(
      popupVisible,
      false,
      props.onPopupVisibleChange,
      'popupVisible',
    );
    const [innerInputValue, setInnerInputValue] = useDefaultValue(
      inputValue,
      props.defaultInputValue,
      props.onInputChange,
      'inputValue',
    );

    // watch
    watch(treeSelectValue, async () => {
      await changeNodeInfo();
      if (!props.multiple) {
        actived.value = nodeInfo.value ? [nodeInfo.value.value] : [];
      }
    });
    watch(
      () => props.data,
      async () => {
        await changeNodeInfo();
        treeRerender();
      },
      {
        deep: true,
      },
    );

    // computed
    /** filterByText keep pace with innerInputValue */
    const filterByText = computed(() => {
      const value = innerInputValue.value || '';
      if (value === '') {
        return null;
      }
      return (node: TreeNodeModel<TreeOptionData>) => {
        if (isFunction(props.filter)) {
          const filter: boolean | Promise<boolean> = props.filter(String(value), node);
          if (isBoolean(filter)) {
            return filter;
          }
        }
        return node.data[realLabel.value].includes(value);
      };
    });
    const tDisabled = computed(() => {
      return formDisabled.value || props.disabled;
    });

    const inputPlaceholder = computed(
      () => (innerVisible.value && nodeInfo.value?.label) || props.placeholder || globalConfig.value.placeholder,
    );

    const popupClass = computed(() => {
      return [`${classPrefix.value}-select__dropdown`, 'narrow-scrollbar'];
    });

    const dropdownInnerSize = computed(() => {
      return {
        small: 's',
        medium: 'm',
        large: 'l',
      }[props.size];
    });

    const isObjectValue = computed(() => props.valueType === 'object');

    const checked = computed((): Array<TreeNodeValue> => {
      if (props.multiple) {
        if (isObjectValue.value) {
          return isArray(treeSelectValue.value)
            ? (treeSelectValue.value as Array<TreeSelectValue>).map(item => (item as INodeOptions).value)
            : [];
        }
        return isArray(treeSelectValue.value)
          ? (treeSelectValue.value as Array<TreeSelectValue>).map(item => item as TreeNodeValue)
          : [];
      }
      return [];
    });

    const multiLimitDisabled = computed(() => {
      return (
        props.multiple
        && !!props.max
        && isArray(treeSelectValue.value)
        && props.max <= (treeSelectValue.value as Array<TreeSelectValue>).length
      );
    });

    const realLabel = computed(() => {
      if (!isEmpty(props.treeProps) && !isEmpty((props.treeProps as TreeProps).keys)) {
        return (props.treeProps as TreeProps).keys.label || 'label';
      }
      return props.keys?.label || 'label';
    });

    const realValue = computed(() => {
      if (!isEmpty(props.treeProps) && !isEmpty((props.treeProps as TreeProps).keys)) {
        return (props.treeProps as TreeProps).keys.value || 'value';
      }
      return props.keys?.value || 'value';
    });

    const realChildren = computed(() => {
      if (!isEmpty(props.treeProps) && !isEmpty((props.treeProps as TreeProps).keys)) {
        return (props.treeProps as TreeProps).keys.children || 'children';
      }
      return props.keys?.children || 'children';
    });

    // timelifes
    onMounted(async () => {
      if (!treeSelectValue.value && props.defaultValue) {
        await change(props.defaultValue, null, 'uncheck');
      }
      if (isObjectValue.value) {
        actived.value = isArray(treeSelectValue.value)
          ? (treeSelectValue.value as Array<TreeSelectValue>).map(item => (item as INodeOptions).value)
          : [(treeSelectValue.value as INodeOptions).value];
      } else {
        (actived.value as TreeSelectValue) = isArray(treeSelectValue.value)
          ? treeSelectValue.value
          : [treeSelectValue.value];
      }
      changeNodeInfo();
    });

    // methods

    const change = (
      valueParam: TreeSelectValue,
      node: TreeNodeModel<TreeOptionData>,
      trigger: TreeSelectValueChangeTrigger,
    ) => {
      setTreeSelectValue(valueParam, { node, trigger });
      changeNodeInfo();
    };

    const clear = (content: { e: MouseEvent }) => {
      const defaultValue: TreeSelectValue = props.multiple ? [] : '';
      actived.value = [];
      change(defaultValue, null, 'clear');
      props.onClear?.({ e: content.e });
    };

    const treeNodeChange = (
      valueParam: Array<TreeNodeValue>,
      context: { node: TreeNodeModel<TreeOptionData>; e?: MouseEvent },
    ) => {
      let current: TreeSelectValue = valueParam;
      if (isObjectValue.value) {
        current = valueParam.map(nodeValue => getTreeNode(props.data, nodeValue));
      }
      change(current, context.node, 'check');
    };

    const treeNodeActive = (
      valueParam: Array<TreeNodeValue>,
      context: { node: TreeNodeModel<TreeOptionData>; e?: MouseEvent },
    ) => {
      if (!props.multiple) {
        setInnerVisible(false, context);
      }
      // 多选模式屏蔽 Active 事件
      if (props.multiple) {
        return;
      }
      // 单选模式重复选择不清空
      if (treeSelectValue.value === context.node.data[realValue.value]) {
        return;
      }
      let current: TreeSelectValue = valueParam;
      if (isObjectValue.value) {
        const nodeValue = isEmpty(valueParam) ? '' : valueParam[0];
        current = getTreeNode(props.data, nodeValue);
      } else {
        current = isEmpty(valueParam) ? '' : valueParam[0];
      }
      change(current, context.node, 'check');
      actived.value = valueParam;
    };

    const treeNodeExpand = (valueParam: Array<TreeNodeValue>) => {
      expanded.value = valueParam;
    };

    const treeNodeLoad = () => {
      changeNodeInfo();
    };

    const inputChange = (value: string): boolean => {
      // 未打开状态不处理输入框输入
      if (!innerVisible.value) {
        props.onSearch?.(String(value));
        return;
      }
      setInnerInputValue(value);
      props.onSearch?.(String(value));
    };

    const tagChange: TdSelectInputProps['onTagChange'] = (value, context) => {
      const { trigger, index } = context;
      if (['tag-remove', 'backspace'].includes(trigger)) {
        isArray(treeSelectValue.value) && (treeSelectValue.value as Array<TreeSelectValue>).splice(index, 1);
      }
      props.onRemove?.({ value, data: null, e: context && (context.e as MouseEvent) });
      change(treeSelectValue.value, null, trigger as 'tag-remove' | 'backspace');
    };

    const handlePopupVisibleChange = (visible: boolean, context: PopupVisibleChangeContext) => {
      setInnerVisible(visible, context);
      // 在通过点击选择器打开弹窗时 清空此前的输入内容 避免在关闭时就清空引起的闪烁问题
      if (visible && context.trigger === 'trigger-element-click') {
        setInnerInputValue('');
      }
    };
    const changeNodeInfo = async () => {
      await treeSelectValue.value;

      if (!props.multiple) {
        if (treeSelectValue.value || treeSelectValue.value === 0) {
          nodeInfo.value = getSingleNodeInfo();
        } else {
          nodeInfo.value = '';
        }
      } else if (props.multiple) {
        if (isArray(treeSelectValue.value)) {
          nodeInfo.value = getMultipleNodeInfo();
        } else {
          nodeInfo.value = [];
        }
      } else {
        nodeInfo.value = null;
      }
    };

    const getSingleNodeInfo = () => {
      const nodeValue = isObjectValue.value ? (treeSelectValue.value as INodeOptions).value : treeSelectValue.value;
      if (treeRef.value && (props.treeProps as TreeProps)?.load) {
        if (!isEmpty(props.data)) {
          const node = treeRef.value.getItem(nodeValue);
          if (node) {
            return { label: node.data[realLabel.value], value: node.data[realValue.value] };
          }
        }
        return { label: nodeValue, value: nodeValue };
      }
      const node = getTreeNode(props.data, nodeValue);
      if (!node) {
        return { label: nodeValue, value: nodeValue };
      }
      return node;
    };

    const getMultipleNodeInfo = () => {
      return (treeSelectValue.value as Array<TreeSelectValue>).map((value) => {
        const nodeValue = isObjectValue.value ? (value as INodeOptions).value : value;
        if (treeRef.value && (props.treeProps as TreeProps)?.load) {
          if (!isEmpty(props.data)) {
            const node = treeRef.value.getItem(nodeValue);
            if (node) {
              return { label: node.data[realLabel.value], value: node.data[realValue.value] };
            }
          }
          return { label: nodeValue, value: nodeValue };
        }
        const node = getTreeNode(props.data, nodeValue);
        if (!node) {
          return { label: nodeValue, value: nodeValue };
        }
        return node;
      });
    };
    const getTreeNode = (data: Array<TreeOptionData>, targetValue: TreeSelectValue): TreeSelectValue | null => {
      for (let i = 0, len = data.length; i < len; i++) {
        if (data[i][realValue.value] === targetValue) {
          return { label: data[i][realLabel.value], value: data[i][realValue.value] };
        }
        if (data[i]?.[realChildren.value]) {
          const result = getTreeNode(data[i]?.[realChildren.value], targetValue);
          if (!isNil(result)) {
            return result;
          }
        }
      }
      return null;
    };

    const treeRerender = () => {
      treeKey.value += 1;
    };

    const renderTree = () => (
      <Tree
        ref={treeRef}
        v-show={!props.loading}
        key={treeKey.value}
        value={[...checked.value]}
        hover
        keys={props.keys}
        data={props.data}
        activable={!props.multiple}
        checkable={props.multiple}
        disabled={tDisabled.value || multiLimitDisabled.value}
        size={props.size}
        filter={filterByText.value}
        icon={!filterByText.value}
        actived={actived.value}
        expanded={expanded.value}
        activeMultiple={props.multiple}
        onChange={treeNodeChange}
        onActive={treeNodeActive}
        onExpand={treeNodeExpand}
        onLoad={treeNodeLoad}
        expandOnClickNode
        v-slots={{
          empty: () =>
            renderDefaultTNode('empty', {
              defaultNode: <div class={`${classPrefix.value}-select__empty`}>{globalConfig.value.empty}</div>,
            }),
        }}
        {...(props.treeProps as TdTreeSelectProps['treeProps'])}
      />
    );

    const renderSuffixIcon = () => (
      <FakeArrow
        isActive={innerVisible.value}
        disabled={props.disabled}
        overlayClassName={{
          [`${classPrefix.value}-fake-arrow--highlight`]: innerVisible.value,
          [`${classPrefix.value}-fake-arrow--disable`]: props.disabled,
        }}
      />
    );

    return () => (
      <SelectInput
        class={`${classPrefix.value}-tree-select`}
        value={nodeInfo.value}
        inputValue={innerVisible.value ? innerInputValue.value : ''}
        popupVisible={innerVisible.value}
        disabled={tDisabled.value}
        multiple={props.multiple}
        loading={props.loading}
        clearable={props.clearable}
        autoWidth={props.autoWidth}
        borderless={props.borderless}
        readonly={props.readonly}
        placeholder={inputPlaceholder.value}
        allowInput={props.filterable || isFunction(props.filter)}
        minCollapsedNum={props.minCollapsedNum}
        collapsed-items={props.collapsedItems}
        popupProps={{
          overlayClassName: popupClass.value,
          ...(props.popupProps as TdTreeSelectProps['popupProps']),
        }}
        inputProps={{
          size: props.size,
          ...(props.inputProps as TdTreeSelectProps['inputProps']),
        }}
        tagInputProps={{
          size: props.size,
        }}
        tagProps={{
          maxWidth: 300,
          ...(props.tagProps as TdTreeSelectProps['tagProps']),
        }}
        label={() => renderTNodeJSX('prefixIcon')}
        suffix={props.suffix}
        suffixIcon={() => {
          if (props.suffixIcon || slots.suffixIcon) {
            return renderTNodeJSX('suffixIcon');
          }

          return renderSuffixIcon();
        }}
        onClear={clear}
        onBlur={(_: any, context) => {
          props.onBlur?.({ value: treeSelectValue.value, e: context.e as FocusEvent });
        }}
        onFocus={(_: any, context: { e: FocusEvent }) => {
          props.onFocus?.({ value: treeSelectValue.value, e: context.e });
        }}
        valueDisplay={() =>
          renderTNodeJSX('valueDisplay', {
            params: props.multiple
              ? {
                  value: nodeInfo.value,
                  onClose: (index: number) => {
                    const value = nodeInfo.value.map((node: TreeOptionData) => node.value);
                    tagChange(value, {
                      trigger: 'tag-remove',
                      index,
                      item: value[index],
                    });
                  },
                }
              : {
                  value: nodeInfo.value || { [realLabel.value]: '', [realValue.value]: undefined },
                },
          })}
        v-slots={{
          suffix: slots.suffix,
          panel: () => (
            <div
              class={[
                `${classPrefix.value}-select__dropdown-inner`,
                `${classPrefix.value}-select__dropdown-inner--size-${dropdownInnerSize.value}`,
              ]}
            >
              {renderTNodeJSX('panelTopContent')}
              <p
                v-show={props.loading && !tDisabled.value}
                class={[`${classPrefix.value}-select-loading-tips`, `${classPrefix.value}-select__right-icon-polyfill`]}
              >
                {renderDefaultTNode('loadingText', {
                  defaultNode: <div class={`${classPrefix.value}-select__empty`}>{globalConfig.value.loadingText}</div>,
                })}
              </p>
              {renderTree()}
              {renderTNodeJSX('panelBottomContent')}
            </div>
          ),
          collapsedItems: slots.collapsedItems,
        }}
        onInputChange={inputChange}
        onTagChange={tagChange}
        onPopupVisibleChange={handlePopupVisibleChange}
        {...(props.selectInputProps as TdTreeSelectProps['selectInputProps'])}
      />
    );
  },
});
