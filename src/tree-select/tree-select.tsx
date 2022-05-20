import { defineComponent, ref, reactive, computed, watch, onMounted, toRefs } from 'vue';
import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';
import isBoolean from 'lodash/isBoolean';
import isFunction from 'lodash/isFunction';
import isNil from 'lodash/isNil';

import Tree, { TreeProps, TreeNodeModel, TreeNodeValue } from '../tree';
import SelectInput from '../select-input';
import { TagInputChangeContext } from '../tag-input';
import { PopupProps } from '../popup';
import { InputValue } from '../input';
import FakeArrow from '../common-components/fake-arrow';

import { IRemoveOptions, INodeOptions, ISelectInputSlot } from './interface';
import { TreeSelectValue, TdTreeSelectProps } from './type';
import { TreeOptionData } from '../common';
import props from './props';

// hooks
import { usePrefixClass, useConfig } from '../hooks/useConfig';
import { useFormDisabled } from '../form/hooks';
import { useTNodeJSX } from '../hooks/tnode';
import useVModel from '../hooks/useVModel';

export default defineComponent({
  name: 'TTreeSelect',
  props,
  setup(props, { slots }) {
    const renderTNodeJSX = useTNodeJSX();
    const classPrefix = usePrefixClass();
    const { global } = useConfig('treeSelect');

    // ref
    const treeRef = ref(null);
    const selectInputRef = ref(null);

    // data
    const formDisabled = useFormDisabled();
    const visible = ref(false);
    const isHover = ref(false);
    const defaultProps: PopupProps = reactive({
      trigger: 'click',
      placement: 'bottom-left',
      overlayClassName: '',
      overlayStyle: (trigger) => ({
        width: `${trigger.offsetWidth}px`,
      }),
    });
    const filterByText = ref(null);
    const actived = ref([]);
    const expanded = ref([]);
    const nodeInfo = ref(null);
    const treeKey = ref(0);

    // model
    const { value, modelValue } = toRefs(props);
    const [treeSelectValue, setTreeSelectValue] = useVModel(value, modelValue, props.defaultValue, props.onChange);

    // watch
    watch(
      () => treeSelectValue.value,
      async () => {
        await changeNodeInfo();
        if (!props.multiple) {
          actived.value = nodeInfo.value ? [nodeInfo.value.value] : [];
        }
      },
    );
    watch(
      () => props.data,
      async () => {
        await changeNodeInfo();
        treeRerender();
      },
    );

    // computed
    const tDisabled = computed(() => {
      return formDisabled.value || props.disabled;
    });
    const inputPlaceholder = computed(() => props.placeholder || global.value.placeholder);

    const popupClass = computed(() => {
      return `${popupObject.value.overlayClassName} ${classPrefix.value}-select__dropdown-inner ${classPrefix.value}-select__dropdown narrow-scrollbar`;
    });
    const isObjectValue = computed(() => {
      return props.valueType === 'object';
    });
    const checked = computed((): Array<TreeNodeValue> => {
      if (props.multiple) {
        if (isObjectValue.value) {
          return isArray(treeSelectValue.value)
            ? (treeSelectValue.value as Array<TreeSelectValue>).map((item) => (item as INodeOptions).value)
            : [];
        }
        return isArray(treeSelectValue.value)
          ? (treeSelectValue.value as Array<TreeSelectValue>).map((item) => item as TreeNodeValue)
          : [];
      }
      return [];
    });
    const showLoading = computed(() => {
      return props.loading && !tDisabled.value;
    });
    const showFilter = computed(() => {
      return props.filterable || isFunction(props.filter);
    });
    const showTree = computed(() => {
      return !props.loading;
    });
    const popupObject = computed(() => {
      return props.popupProps ? { ...defaultProps, ...(props.popupProps as PopupProps) } : defaultProps;
    });
    const selectedMultiple = computed(() => {
      if (props.multiple && isArray(treeSelectValue.value) && !isEmpty(treeSelectValue.value)) {
        return treeSelectValue.value;
      }
      return [];
    });
    const multiLimitDisabled = computed(() => {
      return (
        props.multiple &&
        !!props.max &&
        isArray(treeSelectValue.value) &&
        props.max <= (treeSelectValue.value as Array<TreeSelectValue>).length
      );
    });
    const loadingTextSlot = computed(() => {
      const useLocale = !props.loadingText && !slots.loadingText;
      return useLocale ? (
        <div class={`${classPrefix.value}-select__empty`}>{global.value.loadingText}</div>
      ) : (
        renderTNodeJSX('loadingText')
      );
    });
    const emptySlot = computed(() => {
      const useLocale = !props.empty && !slots.empty;
      return useLocale ? (
        <div class={`${classPrefix.value}-select__empty`}>{global.value.empty}</div>
      ) : (
        renderTNodeJSX('empty')
      );
    });
    const prefixIconSlot = computed(() => {
      return renderTNodeJSX('prefixIcon');
    });
    const collapsedItemsSlots = computed(() => {
      if (!props.multiple) {
        return null;
      }
      const notUseLocale =
        props.collapsedItems ||
        slots.collapsedItems ||
        props.minCollapsedNum <= 0 ||
        selectedMultiple.value.length <= props.minCollapsedNum;
      return notUseLocale
        ? renderTNodeJSX('collapsedItems', {
            params: {
              count: selectedMultiple.value.length - props.minCollapsedNum,
              value: selectedMultiple.value,
              collapsedSelectedItems: selectedMultiple.value.slice(props.minCollapsedNum),
            },
          })
        : null;
    });
    const valueDisplaySlot = computed(() => {
      const notUseLocale = props.valueDisplay || slots.valueDisplay;
      const notUseSingleLocale = !props.multiple && treeSelectValue.value !== '' && notUseLocale;
      const notUseMultipleLocale = props.multiple && !isEmpty(treeSelectValue.value) && notUseLocale;
      if (notUseSingleLocale) {
        return renderTNodeJSX('valueDisplay', {
          params: {
            value: nodeInfo.value || { [realLabel.value]: '', [realValue.value]: undefined },
          },
        });
      }
      if (notUseMultipleLocale) {
        return renderTNodeJSX('valueDisplay', {
          params: {
            value: nodeInfo.value,
            onClose: (value: string | number, context: TagInputChangeContext) => {
              tagChange(value, context);
            },
          },
        });
      }
      return null;
    });
    const realLabel = computed(() => {
      if (!isEmpty(props.treeProps) && !isEmpty((props.treeProps as TreeProps).keys)) {
        return (props.treeProps as TreeProps).keys.label || 'label';
      }
      return 'label';
    });
    const realValue = computed(() => {
      if (!isEmpty(props.treeProps) && !isEmpty((props.treeProps as TreeProps).keys)) {
        return (props.treeProps as TreeProps).keys.value || 'value';
      }
      return 'value';
    });

    // timelifes
    onMounted(async () => {
      if (!treeSelectValue.value && props.defaultValue) {
        await change(props.defaultValue, null);
      }
      if (isObjectValue.value) {
        actived.value = isArray(treeSelectValue.value)
          ? (treeSelectValue.value as Array<TreeSelectValue>).map((item) => (item as INodeOptions).value)
          : [(treeSelectValue.value as INodeOptions).value];
      } else {
        (actived.value as TreeSelectValue) = isArray(treeSelectValue.value)
          ? treeSelectValue.value
          : [treeSelectValue.value];
      }
      changeNodeInfo();
    });

    // methods
    const popupVisibleChange = (state: boolean) => {
      visible.value = state;
    };
    const change = (valueParam: TreeSelectValue, node: TreeNodeModel<TreeOptionData>) => {
      setTreeSelectValue(valueParam, { node });
      changeNodeInfo();
      props.onChange?.(valueParam, { node });
    };
    const clear = (content: { e: MouseEvent }) => {
      const defaultValue: TreeSelectValue = props.multiple ? [] : '';
      actived.value = [];
      change(defaultValue, null);
      props.onClear?.({ e: content.e });
    };
    const focus = (value: InputValue, context: { e: FocusEvent }) => {
      props.onFocus?.({ value, e: context.e });
    };
    const blur = (value: InputValue, context: { e: FocusEvent }) => {
      props.onBlur?.({ value, e: context.e });
    };
    const remove = (options: IRemoveOptions<TreeOptionData>) => {
      props.onRemove?.(options);
    };
    const search = (filterWordsParam: string) => {
      props.onSearch?.(filterWordsParam);
    };
    const treeNodeChange = (
      valueParam: Array<TreeNodeValue>,
      context: { node: TreeNodeModel<TreeOptionData>; e: MouseEvent },
    ) => {
      let current: TreeSelectValue = valueParam;
      if (isObjectValue.value) {
        current = valueParam.map((nodeValue) => getTreeNode(props.data, nodeValue));
      }
      change(current, context.node);
    };
    const treeNodeActive = (
      valueParam: Array<TreeNodeValue>,
      context: { node: TreeNodeModel<TreeOptionData>; e: MouseEvent },
    ) => {
      visible.value = false;
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
      change(current, context.node);
      actived.value = valueParam;
    };
    const treeNodeExpand = (valueParam: Array<TreeNodeValue>) => {
      expanded.value = valueParam;
    };
    const inputChange = (value: InputValue): boolean => {
      if (!value) {
        filterByText.value = null;
        return null;
      }
      filterByText.value = (node: TreeNodeModel<TreeOptionData>) => {
        if (isFunction(props.filter)) {
          const filter: boolean | Promise<boolean> = props.filter(String(value), node);
          if (isBoolean(filter)) {
            return filter;
          }
        }
        return node.data[realLabel.value].indexOf(value) >= 0;
      };
      search(String(value));
    };
    const tagChange = (value: string | number, context: TagInputChangeContext) => {
      const { trigger, index } = context;
      if (['tag-remove', 'backspace'].includes(trigger)) {
        isArray(treeSelectValue.value) && (treeSelectValue.value as Array<TreeSelectValue>).splice(index, 1);
      }
      remove({ value, data: null, e: context && (context.e as MouseEvent) });
      change(treeSelectValue.value, null);
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
          if (!node) return;
          return { label: node.data[realLabel.value], value: node.data[realValue.value] };
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
            if (!node) return;
            return { label: node.data[realLabel.value], value: node.data[realValue.value] };
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
        if (data[i]?.children) {
          const result = getTreeNode(data[i]?.children, targetValue);
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

    // dom or slots
    const treeSlots = {
      empty: () => <span>{emptySlot.value}</span>,
    };
    const treeItem = () => (
      <Tree
        ref={treeRef}
        v-show={showTree.value}
        key={treeKey.value}
        value={[...checked.value]}
        hover
        data={props.data}
        activable={!props.multiple}
        checkable={props.multiple}
        disabled={tDisabled.value || multiLimitDisabled.value}
        empty={props.empty}
        size={props.size}
        filter={filterByText.value}
        icon={!filterByText.value}
        actived={actived.value}
        expanded={expanded.value}
        activeMultiple={props.multiple}
        onChange={treeNodeChange}
        onActive={treeNodeActive}
        onExpand={treeNodeExpand}
        expandOnClickNode
        v-slots={treeSlots}
        {...(props.treeProps as TdTreeSelectProps['treeProps'])}
      />
    );
    const SelectInputSlots: ISelectInputSlot = {
      panel: () => (
        <div>
          <p
            v-show={showLoading.value}
            class={`${classPrefix.value}-select-loading-tips ${classPrefix.value}-select__right-icon-polyfill`}
          >
            {loadingTextSlot.value}
          </p>
          {treeItem()}
        </div>
      ),
      suffixIcon: () => (
        <FakeArrow
          isActive={visible.value}
          disabled={props.disabled}
          overlayClassName={{
            [`${classPrefix.value}-fake-arrow--highlight`]: visible.value,
            [`${classPrefix.value}-fake-arrow--disable`]: props.disabled,
          }}
        />
      ),
    };
    if (prefixIconSlot.value) {
      SelectInputSlots.prefixIcon = () => <>{prefixIconSlot.value}</>;
    }
    if (collapsedItemsSlots.value) {
      SelectInputSlots.collapsedItems = () => <>{collapsedItemsSlots.value}</>;
    }
    if (valueDisplaySlot.value) {
      SelectInputSlots.valueDisplay = () => <>{valueDisplaySlot.value}</>;
    }

    // 透传 props
    const popupProps = {
      placement: popupObject.value.placement,
      trigger: popupObject.value.trigger,
      overlayStyle: popupObject.value.overlayStyle,
      overlayClassName: popupClass.value,
      expandAnimation: true,
    };
    const inputProps = {
      size: props.size,
    };
    const tagInputProps = {
      inputProps: {
        size: props.size,
        onClear: clear,
      },
    };
    const tagProps = {
      size: props.size,
      closable: true,
      maxWidth: 300,
    };

    return () => (
      <SelectInput
        class={`${classPrefix.value}-tree-select`}
        ref={selectInputRef}
        v-slots={SelectInputSlots}
        value={nodeInfo.value}
        multiple={props.multiple}
        loading={props.loading}
        disabled={tDisabled.value}
        clearable={props.clearable}
        placeholder={inputPlaceholder.value}
        allowInput={showFilter.value}
        popupVisible={visible.value}
        minCollapsedNum={props.minCollapsedNum}
        tagProps={tagProps}
        popupProps={popupProps}
        inputProps={inputProps}
        tagInputProps={tagInputProps}
        onClear={clear}
        onBlur={blur}
        onFocus={focus}
        onInputChange={inputChange}
        onTagChange={tagChange}
        onPopupVisibleChange={popupVisibleChange}
        onMouseenter={() => (isHover.value = true)}
        onMouseleave={() => (isHover.value = false)}
      />
    );
  },
});
