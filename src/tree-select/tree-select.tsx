import { defineComponent, ref, reactive, computed, watch, onMounted, toRefs } from 'vue';
import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';
import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';
import isBoolean from 'lodash/isBoolean';
import isObject from 'lodash/isObject';
import isFunction from 'lodash/isFunction';
import isNil from 'lodash/isNil';

import { CloseCircleFilledIcon } from 'tdesign-icons-vue-next';
import FakeArrow from '../common-components/fake-arrow';
import Tree, { TreeProps, TreeNodeModel, TreeNodeValue } from '../tree';
import Popup, { PopupProps } from '../popup';
import Input, { InputValue } from '../input';
import Loading from '../loading';
import Tag from '../tag';

import { RemoveOptions, NodeOptions } from './interface';
import { TreeSelectValueType } from './type';
import { TreeOptionData } from '../common';
import props from './props';

// hooks
import { usePrefixClass, useCommonClassName, useConfig } from '../config-provider';
import { useFormDisabled } from '../form/hooks';
import { useTNodeJSX } from '../hooks/tnode';
import useVModel from '../hooks/useVModel';

export default defineComponent({
  name: 'TTreeSelect',
  props,
  setup(props, { slots }) {
    const renderTNodeJSX = useTNodeJSX();
    const classPrefix = usePrefixClass();
    const { STATUS, SIZE } = useCommonClassName();
    const { global } = useConfig('treeSelect');

    // ref
    const tree = ref(null);
    const input = ref(null);
    const popup = ref(null);

    // data
    const formDisabled = useFormDisabled();
    const visible = ref(false);
    const isHover = ref(false);
    const focusing = ref(false);
    const defaultProps: PopupProps = reactive({
      trigger: 'click',
      placement: 'bottom-left',
      overlayClassName: '',
      overlayStyle: (trigger) => ({
        width: `${trigger.offsetWidth}px`,
      }),
    });
    const filterText = ref('');
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
    const classes = computed(() => {
      return [
        `${classPrefix.value}-select`,
        `${classPrefix.value}-select-polyfill`,
        {
          [STATUS.value.disabled]: tDisabled.value,
          [STATUS.value.active]: visible.value,
          [SIZE.value[props.size]]: props.size,
          [`${classPrefix.value}-has-prefix`]: prefixIconSlot.value,
          [`${classPrefix.value}-select-selected`]: selectedSingle.value || !isEmpty(selectedMultiple.value),
        },
      ];
    });
    const popupClass = computed(() => {
      return `${popupObject.value.overlayClassName} ${classPrefix.value}-select__dropdown narrow-scrollbar`;
    });
    const isObjectValue = computed(() => {
      return props.valueType === 'object';
    });
    const checked = computed((): Array<TreeNodeValue> => {
      if (props.multiple) {
        if (isObjectValue.value) {
          return isArray(treeSelectValue.value) ? treeSelectValue.value.map((item) => (item as NodeOptions).value) : [];
        }
        return isArray(treeSelectValue.value) ? treeSelectValue.value.map((item) => item as TreeNodeValue) : [];
      }
      return [];
    });
    const showArrow = computed(() => {
      return (
        !props.clearable ||
        !isHover.value ||
        tDisabled.value ||
        (!props.multiple && !treeSelectValue.value && treeSelectValue.value !== 0) ||
        (props.multiple && isArray(treeSelectValue.value) && isEmpty(treeSelectValue.value))
      );
    });
    const showLoading = computed(() => {
      return props.loading && !tDisabled.value;
    });
    const showClose = computed(() => {
      return (
        props.clearable &&
        isHover.value &&
        !tDisabled.value &&
        ((!props.multiple && (!!treeSelectValue.value || treeSelectValue.value === 0)) ||
          (props.multiple && !isEmpty(treeSelectValue.value)))
      );
    });
    const showPlaceholder = computed(() => {
      return (
        !showFilter.value &&
        ((isString(treeSelectValue.value) && treeSelectValue.value === '' && !selectedSingle.value) ||
          (isArray(treeSelectValue.value) && isEmpty(treeSelectValue.value)) ||
          isNil(treeSelectValue.value))
      );
    });
    const showFilter = computed(() => {
      if (tDisabled.value) {
        return false;
      }
      if (!props.multiple && selectedSingle.value && (props.filterable || isFunction(props.filter))) {
        return visible.value;
      }
      return props.filterable || isFunction(props.filter);
    });
    const showTree = computed(() => {
      return !props.loading;
    });
    const popupObject = computed(() => {
      return props.popupProps ? { ...defaultProps, ...(props.popupProps as PopupProps) } : defaultProps;
    });
    const selectedSingle = computed(() => {
      if (
        !props.multiple &&
        (isString(treeSelectValue.value) || isNumber(treeSelectValue.value) || isObject(treeSelectValue.value))
      ) {
        if (nodeInfo.value) {
          return nodeInfo.value.label;
        }
        return `${treeSelectValue.value}`;
      }
      return '';
    });
    const selectedMultiple = computed(() => {
      if (props.multiple && isArray(treeSelectValue.value) && !isEmpty(treeSelectValue.value)) {
        return treeSelectValue.value;
      }
      return [];
    });
    const multiLimitDisabled = computed(() => {
      return (
        props.multiple && !!props.max && isArray(treeSelectValue.value) && props.max <= treeSelectValue.value.length
      );
    });
    const filterPlaceholder = computed(() => {
      if (props.multiple && isArray(treeSelectValue.value) && !isEmpty(treeSelectValue.value)) {
        return '';
      }
      if (!props.multiple && selectedSingle.value) {
        return selectedSingle.value;
      }
      return props.placeholder;
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
    const tagList = computed(() => {
      if (nodeInfo.value && isArray(nodeInfo.value)) {
        return nodeInfo.value.map((node: NodeOptions) => node.label);
      }
      return isObjectValue.value ? [] : selectedMultiple.value;
    });

    // timelifes
    onMounted(async () => {
      if (!treeSelectValue.value && props.defaultValue) {
        await change(props.defaultValue, null);
      }
      if (isObjectValue.value) {
        actived.value = isArray(treeSelectValue.value)
          ? treeSelectValue.value.map((item) => (item as NodeOptions).value)
          : [(treeSelectValue.value as NodeOptions).value];
      } else {
        actived.value = isArray(treeSelectValue.value) ? treeSelectValue.value : [treeSelectValue.value];
      }
      changeNodeInfo();
    });

    // methods
    const popupVisibleChange = async (state: boolean) => {
      await (visible.value = state);
      if (showFilter.value && visible.value) {
        const searchInput = input.value as HTMLElement;
        searchInput?.focus();
        focusing.value = true;
      }
    };
    const removeTag = (index: number, data: TreeOptionData, e?: MouseEvent) => {
      if (tDisabled.value) {
        return;
      }
      remove({ value: treeSelectValue.value[index], data, e });
      isArray(treeSelectValue.value) && treeSelectValue.value.splice(index, 1);
      change(treeSelectValue.value, null);
    };
    const change = (valueParam: TreeSelectValueType, node: TreeNodeModel<TreeOptionData>) => {
      setTreeSelectValue(valueParam, { node });
      changeNodeInfo();
      props.onChange?.(valueParam, { node });
    };
    const clear = (e: MouseEvent) => {
      e.stopPropagation();
      const defaultValue: TreeSelectValueType = props.multiple ? [] : '';
      change(defaultValue, null);
      actived.value = [];
      filterText.value = '';
      props.onClear?.({ e });
    };
    const focus = (e: FocusEvent) => {
      focusing.value = true;
      props.onFocus?.({ value: treeSelectValue.value, e });
    };
    const blur = (e: FocusEvent) => {
      focusing.value = false;
      filterText.value = '';
      props.onBlur?.({ value: treeSelectValue.value, e });
    };
    const remove = (options: RemoveOptions<TreeOptionData>) => {
      props.onRemove?.(options);
    };
    const search = (filterWordsParam: string) => {
      props.onSearch?.(filterWordsParam);
    };
    const treeNodeChange = (
      valueParam: Array<TreeNodeValue>,
      context: { node: TreeNodeModel<TreeOptionData>; e: MouseEvent },
    ) => {
      let current: TreeSelectValueType = valueParam;
      if (isObjectValue.value) {
        current = valueParam.map((nodeValue) => getTreeNode(props.data, nodeValue));
      }
      change(current, context.node);
    };
    const treeNodeActive = (
      valueParam: Array<TreeNodeValue>,
      context: { node: TreeNodeModel<TreeOptionData>; e: MouseEvent },
    ) => {
      // 多选模式屏蔽 Active 事件
      if (props.multiple) {
        return;
      }
      let current: TreeSelectValueType = valueParam;
      if (isObjectValue.value) {
        const nodeValue = isEmpty(valueParam) ? '' : valueParam[0];
        current = getTreeNode(props.data, nodeValue);
      } else {
        current = isEmpty(valueParam) ? '' : valueParam[0];
      }
      change(current, context.node);
      actived.value = valueParam;
      visible.value = false;
    };
    const treeNodeExpand = (valueParam: Array<TreeNodeValue>) => {
      expanded.value = valueParam;
      filterByText.value = null;
    };
    const onInputChange = () => {
      filterByText.value = (node: TreeNodeModel<TreeOptionData>) => {
        if (isFunction(props.filter)) {
          const filter: boolean | Promise<boolean> = props.filter(filterText.value, node);
          if (isBoolean(filter)) {
            return filter;
          }
        }
        return node.data[realLabel.value].indexOf(filterText.value) >= 0;
      };
      search(filterText.value);
    };
    const changeNodeInfo = async () => {
      await treeSelectValue.value;

      if (!props.multiple && treeSelectValue.value) {
        changeSingleNodeInfo();
      } else if (props.multiple && isArray(treeSelectValue.value)) {
        changeMultipleNodeInfo();
      } else {
        nodeInfo.value = null;
      }
    };
    const changeSingleNodeInfo = () => {
      const nodeValue = isObjectValue.value ? (treeSelectValue.value as NodeOptions).value : treeSelectValue.value;
      if (tree.value && (props.treeProps as TreeProps)?.load) {
        if (!isEmpty(props.data)) {
          const node = tree.value.getItem(nodeValue);
          if (!node) return;
          nodeInfo.value = { label: node.data[realLabel.value], value: node.data[realValue.value] };
        } else {
          nodeInfo.value = { label: nodeValue, value: nodeValue };
        }
      } else {
        const node = getTreeNode(props.data, nodeValue);
        if (!node) {
          nodeInfo.value = { label: nodeValue, value: nodeValue };
        } else {
          nodeInfo.value = node;
        }
      }
    };
    const changeMultipleNodeInfo = () => {
      nodeInfo.value = (treeSelectValue.value as Array<TreeSelectValueType>).map((value) => {
        const nodeValue = isObjectValue.value ? (value as NodeOptions).value : value;
        if (tree.value && (props.treeProps as TreeProps)?.load) {
          if (!isEmpty(props.data)) {
            const node = tree.value.getItem(nodeValue);
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
    const getTreeNode = (data: Array<TreeOptionData>, targetValue: TreeSelectValueType): TreeSelectValueType | null => {
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

    // dom
    const iconStyle = { 'font-size': props.size };
    const treeSlots = {
      empty: () => <>{emptySlot.value}</>,
    };
    const popupSlots = {
      content: () => (
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
    };
    const treeItem = () => (
      <Tree
        ref={tree}
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
        actived={actived.value}
        expanded={expanded.value}
        activeMultiple={props.multiple}
        onChange={treeNodeChange}
        onActive={treeNodeActive}
        onExpand={treeNodeExpand}
        expandOnClickNode
        v-slots={treeSlots}
        {...props.treeProps}
      />
    );
    const searchInput = () => (
      <Input
        ref={input}
        v-show={showFilter.value}
        v-model={filterText.value}
        class={`${classPrefix.value}-select__input`}
        size={props.size}
        disabled={tDisabled.value}
        placeholder={filterPlaceholder.value}
        onInput={onInputChange}
        onBlur={(value: InputValue, context: { e: FocusEvent }) => blur(context.e)}
        onFocus={(value: InputValue, context: { e: FocusEvent }) => focus(context.e)}
      />
    );
    const tagItem = () =>
      !isEmpty(tagList.value) && (props.valueDisplay || slots.valueDisplay)
        ? renderTNodeJSX('valueDisplay', {
            params: {
              value: nodeInfo.value,
              onClose: (index: number) => removeTag(index, null),
            },
          })
        : tagList.value.map((label: string, index: number) => (
            <Tag
              v-show={props.minCollapsedNum <= 0 || index < props.minCollapsedNum}
              key={index}
              size={props.size}
              closable={!tDisabled.value}
              disabled={tDisabled.value}
              maxWidth={300}
              title={label}
              onClose={(context: { e: MouseEvent }) => removeTag(index, null, context.e)}
            >
              {label}
            </Tag>
          ));
    const selectedSingleItem = () =>
      props.valueDisplay || slots.valueDisplay ? (
        renderTNodeJSX('valueDisplay', {
          params: { value: nodeInfo.value || { [realLabel.value]: '', [realValue.value]: '' } },
        })
      ) : (
        <span title={selectedSingle.value} class={`${classPrefix.value}-select__single`}>
          {selectedSingle.value}
        </span>
      );
    const collapsedItem = () =>
      (props.collapsedItems || slots.collapsedItems) &&
      props.minCollapsedNum > 0 &&
      tagList.value.length > props.minCollapsedNum ? (
        renderTNodeJSX('collapsedItems', {
          params: {
            count: tagList.value.length - props.minCollapsedNum,
            value: selectedMultiple.value,
            collapsedSelectedItems: selectedMultiple.value.slice(props.minCollapsedNum),
          },
        })
      ) : (
        <Tag v-show={props.minCollapsedNum > 0 && tagList.value.length > props.minCollapsedNum} size={props.size}>
          {`+${tagList.value.length - props.minCollapsedNum}`}
        </Tag>
      );
    return () => (
      <div ref="treeSelect" class={`${classPrefix.value}-select__wrap`}>
        <Popup
          ref={popup}
          class={`${classPrefix.value}-select__popup-reference`}
          visible={visible.value}
          disabled={tDisabled.value}
          placement={popupObject.value.placement}
          trigger={popupObject.value.trigger}
          overlayStyle={popupObject.value.overlayStyle}
          overlayClassName={popupClass.value}
          onVisibleChange={popupVisibleChange}
          expandAnimation={true}
          v-slots={popupSlots}
        >
          <div
            class={classes.value}
            onmouseenter={() => (isHover.value = true)}
            onmouseleave={() => (isHover.value = false)}
          >
            {prefixIconSlot.value && (
              <span class={`${classPrefix.value}-select__left-icon`}>{prefixIconSlot.value[0]}</span>
            )}
            <span v-show={showPlaceholder.value} class={`${classPrefix.value}-select__placeholder`}>
              {props.placeholder || global.value.placeholder}
            </span>
            {tagItem()}
            {collapsedItem()}
            {!props.multiple && !showPlaceholder.value && !showFilter.value && selectedSingleItem()}
            {searchInput()}
            {showArrow.value && !showLoading.value && (
              <FakeArrow
                overlayClassName={`${classPrefix.value}-select__right-icon ${classPrefix.value}-select__right-icon-polyfill`}
                overlayStyle={iconStyle}
                isActive={visible.value && !tDisabled.value}
              />
            )}
            <CloseCircleFilledIcon
              v-show={showClose.value && !showLoading.value}
              class={`${classPrefix.value}-select__right-icon ${classPrefix.value}-select__right-icon-polyfill ${classPrefix.value}-select__active-icon`}
              size={props.size}
              onClick={({ e }) => clear(e)}
            />
            <Loading
              v-show={showLoading.value}
              class={`${classPrefix.value}-select__loading-tips ${classPrefix.value}-select__right-icon-polyfill`}
              size="small"
            />
          </div>
        </Popup>
      </div>
    );
  },
});
