import { defineComponent, computed, toRefs, ref } from 'vue';
import pick from 'lodash/pick';
import TransferList from './components/transfer-list';
import TransferOperations from './components/transfer-operations';
import { TransferListType, CheckedOptions, TransferValue, EmptyType, TargetParams, SearchEvent } from './interface';

import { getTransferListOption, getDataValues, getTransferData, filterTransferData, TRANSFER_NAME } from './utils';
import { PageInfo, TdPaginationProps } from '../pagination/type';
import props from './props';
import { TNode } from '../common';
import useVModel from '../hooks/useVModel';
import useDefaultValue from '../hooks/useDefaultValue';

// hooks
import { useFormDisabled } from '../form/hooks';
import { useConfig, usePrefixClass } from '../hooks/useConfig';

const SOURCE = 'source';
const TARGET = 'target';

export default defineComponent({
  name: TRANSFER_NAME,
  props: { ...props },

  setup(props, { slots }) {
    const disabled = useFormDisabled();
    const classPrefix = usePrefixClass();
    const { t, global } = useConfig('transfer');
    const { value, modelValue, checked } = toRefs(props);
    const [innerValue, setInnerValue] = useVModel(value, modelValue, props.defaultValue, props.onChange);
    const [innerChecked] = useDefaultValue(checked, props.defaultChecked, props.onCheckedChange, 'checked');
    const valueList = ref(innerValue.value || []);

    const isTreeMode = computed(() => {
      const treeSlot = slots.tree;
      return typeof treeSlot === 'function';
    });

    const leftButtonDisabled = computed(() => props.direction === 'right');
    const rightButtonDisabled = computed(() => props.direction === 'left');
    // props 传入的 data 格式化后的数据
    const transferData = computed(() => {
      return getTransferData(props.data, props.keys, isTreeMode.value);
    });
    const sourceList = computed(() => {
      return filterTransferData(transferData.value, valueList.value as TransferValue[], false, isTreeMode.value);
    });
    const targetList = computed(() => {
      return filterTransferData(transferData.value, valueList.value as TransferValue[], true, isTreeMode.value);
    });
    // 被选中的value
    const checkedValue = computed(() => {
      return {
        [SOURCE]: getDataValues(sourceList.value, innerChecked.value, { isTreeMode: isTreeMode.value }),
        [TARGET]: getDataValues(targetList.value, innerChecked.value, { isTreeMode: isTreeMode.value }),
      };
    });
    const hasFooter = computed(() => {
      return !!slots.footer || !!props.footer;
    });
    const showPagination = computed(() => {
      // 翻页在自定义列表无效
      return !!props.pagination && !slots.content;
    });
    const showSearch = computed(() => {
      // 翻页在自定义列表无效
      return !!props.search;
    });
    const footerOption = computed(() => {
      const footer = props.footer || '';
      return getTransferListOption<string | Function>(footer);
    });
    const emptyOption = computed(() => {
      return getTransferListOption<EmptyType>(props.empty);
    });
    const searchOption = computed(() => {
      return getTransferListOption<boolean>(props.search);
    });
    const checkAllOption = computed(() => {
      return getTransferListOption<boolean>(props.showCheckAll);
    });
    const disabledOption = computed(() => {
      return getTransferListOption<boolean>(disabled.value);
    });
    const titleOption = computed(() => {
      return getTransferListOption<string | TNode<{ type: TransferListType }>>(props.title);
    });
    const paginationOption = computed(() => {
      return getTransferListOption<TdPaginationProps>(props.pagination);
    });

    const handleCheckedChange = (val: Array<TransferValue>, listType: TransferListType) => {
      const sourceChecked = listType === SOURCE ? val : checkedValue.value[SOURCE];
      const targetChecked = listType === TARGET ? val : checkedValue.value[TARGET];
      const checked = [...sourceChecked, ...targetChecked];
      const event: CheckedOptions = {
        checked,
        sourceChecked,
        targetChecked,
        type: listType,
      };
      // TODO onCheckedChange 参数有点不合理
      innerChecked.value = checked;
      props.onCheckedChange?.(event);
    };

    const transferTo = (toDirection: TransferListType) => {
      const oldTargetValue: Array<TransferValue> = JSON.parse(JSON.stringify(valueList.value));
      let newTargetValue: Array<TransferValue>;
      const selfCheckedValue = toDirection === TARGET ? checkedValue.value[SOURCE] : checkedValue.value[TARGET];
      // target->source
      if (toDirection === SOURCE) {
        newTargetValue = oldTargetValue.filter((v) => !selfCheckedValue.includes(v));
      } else if (props.targetSort === 'original') {
        // 按照原始顺序
        newTargetValue = getDataValues(transferData.value, oldTargetValue.concat(selfCheckedValue), {
          isTreeMode: isTreeMode.value,
        });
      } else if (props.targetSort === 'unshift') {
        newTargetValue = selfCheckedValue.concat(oldTargetValue);
      } else {
        newTargetValue = oldTargetValue.concat(selfCheckedValue);
      }

      // 清空checked。与toDirection相反
      handleCheckedChange([], toDirection === SOURCE ? TARGET : SOURCE);

      const params: TargetParams = {
        type: toDirection,
        movedValue: selfCheckedValue,
      };
      valueList.value = newTargetValue;
      setInnerValue(newTargetValue, params);
    };

    // 点击移到右边按钮触发的函数
    const transferToRight = () => {
      transferTo(TARGET);
    };
    // 点击移到左边按钮触发的函数
    const transferToLeft = () => {
      transferTo(SOURCE);
    };

    const handleScroll = (e: Event, listType: TransferListType) => {
      const target = e.target as HTMLElement;
      const bottomDistance = target.scrollHeight - target.scrollTop - target.clientHeight;
      const event: { e: Event; bottomDistance: number; type: TransferListType } = {
        e,
        bottomDistance,
        type: listType,
      };
      props.onScroll?.(event);
    };
    const handleSearch = (e: SearchEvent) => {
      props.onSearch?.(e);
    };
    const handlePageChange = (pageInfo: PageInfo, listType: TransferListType) => {
      props.onPageChange?.(pageInfo, { type: listType });
    };
    const renderTransferList = (listType: TransferListType) => {
      const scopedSlots = pick(slots, ['title', 'empty', 'footer', 'operation', 'transferItem', 'default', 'tree']);
      return (
        <TransferList
          checkboxProps={props.checkboxProps}
          transferItem={props.transferItem}
          list-type={listType}
          title={titleOption.value[listType]}
          data-source={listType === SOURCE ? sourceList.value : targetList.value}
          checked-value={checkedValue.value[listType]}
          disabled={disabledOption.value[listType]}
          search={searchOption.value[listType]}
          pagination={paginationOption.value[listType]}
          check-all={checkAllOption.value[listType]}
          footer={footerOption.value[listType]}
          empty={emptyOption.value[listType]}
          onCheckedChange={($event: any) => handleCheckedChange($event, listType)}
          onScroll={($event: any) => handleScroll($event, listType)}
          onSearch={handleSearch}
          onPageChange={($event: any) => handlePageChange($event, listType)}
          t={t}
          global={global.value}
          isTreeMode={isTreeMode.value}
        >
          {scopedSlots}
        </TransferList>
      );
    };

    return () => (
      <div
        class={[
          `${classPrefix.value}-transfer`,
          showSearch.value ? `${classPrefix.value}-transfer__search` : '',
          hasFooter.value ? `${classPrefix.value}-transfer__footer` : '',
          showPagination.value ? `${classPrefix.value}-transfer__pagination` : '',
          isTreeMode.value ? `${classPrefix.value}-transfer--with-tree` : '',
        ]}
      >
        {renderTransferList(SOURCE)}
        <TransferOperations
          leftDisabled={
            disabledOption.value[TARGET] || leftButtonDisabled.value || checkedValue.value[TARGET].length === 0
          }
          rightDisabled={
            disabledOption.value[SOURCE] || rightButtonDisabled.value || checkedValue.value[SOURCE].length === 0
          }
          operation={props.operation}
          onMoveToRight={transferToRight}
          onMoveToLeft={transferToLeft}
          v-slots={{ operation: slots.operation }}
        />
        {renderTransferList(TARGET)}
      </div>
    );
  },
});
