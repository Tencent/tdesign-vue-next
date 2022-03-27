import { defineComponent, VNode, computed, toRefs } from 'vue';
import pick from 'lodash/pick';
import TransferList from './components/transfer-list';
import TransferOperations from './components/transfer-operations';
import {
  TransferListType,
  TransferItemOption,
  CheckedOptions,
  TransferValue,
  EmptyType,
  TransferListOptionBase,
  TargetParams,
  SearchEvent,
  SearchOption,
  TdTransferProps,
} from './interface';

import {
  getTransferListOption,
  emitEvent,
  getDataValues,
  getTransferData,
  filterTransferData,
  TRANSFER_NAME,
} from './utils';
import { PageInfo, TdPaginationProps } from '../pagination/type';
import mixins from '../utils/mixins';
import getConfigReceiverMixins from '../config-provider/config-receiver';
import props from './props';
import { TNode } from '../common';
import useVModel from '../hooks/useVModel';
import useDefaultValue from '../hooks/useDefaultValue';

// hooks
import { useFormDisabled } from '../form/hooks';
import { usePrefixClass, useConfig } from '../config-provider';

const SOURCE = 'source';
const TARGET = 'target';

export default defineComponent({
  ...mixins(getConfigReceiverMixins('transfer')),
  name: TRANSFER_NAME,
  components: {
    TransferList,
    TransferOperations,
  },
  props: {
    ...props,
  },
  emits: [
    'checkChange',
    'change',
    'scroll',
    'search',
    'page-change',
    'update:checked',
    'checked-change',
    'update:value',
  ],
  setup(props, { emit, slots }) {
    const disabled = useFormDisabled();
    const classPrefix = usePrefixClass();
    const { t, global } = useConfig('transfer');

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
      return filterTransferData(transferData.value, props.value, false, isTreeMode.value);
    });
    const targetList = computed(() => {
      return filterTransferData(transferData.value, props.value, true, isTreeMode.value);
    });
    // 被选中的value
    const checkedValue = computed(() => {
      return {
        [SOURCE]: getDataValues(sourceList.value, props.checked, { isTreeMode: isTreeMode.value }),
        [TARGET]: getDataValues(targetList.value, props.checked, { isTreeMode: isTreeMode.value }),
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
      return getTransferListOption<SearchOption>(props.search);
    });
    const checkAllOption = computed(() => {
      return getTransferListOption<boolean>(props.showCheckAll);
    });
    const disabledOption = computed(() => {
      return getTransferListOption<boolean>(disabled.value);
    });
    const titleOption = computed(() => {
      return getTransferListOption<string | TNode>(props.title);
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
      // 支持v-model:checked
      emit('update:checked', checked);
      emit('checked-change', event);
    };

    const transferTo = (toDirection: TransferListType) => {
      const oldTargetValue: Array<TransferValue> = JSON.parse(JSON.stringify(props.value));
      let newTargetValue: Array<TransferValue>;
      const _checkedValue = toDirection === TARGET ? checkedValue.value[SOURCE] : checkedValue.value[TARGET];
      // target->source
      if (toDirection === SOURCE) {
        newTargetValue = oldTargetValue.filter((v) => !_checkedValue.includes(v));
      } else if (props.targetSort === 'original') {
        // 按照原始顺序
        newTargetValue = getDataValues(transferData.value, oldTargetValue.concat(_checkedValue), {
          isTreeMode: isTreeMode.value,
        });
      } else if (props.targetSort === 'unshift') {
        newTargetValue = _checkedValue.concat(oldTargetValue);
      } else {
        newTargetValue = oldTargetValue.concat(_checkedValue);
      }

      // 清空checked。与toDirection相反
      handleCheckedChange([], toDirection === SOURCE ? TARGET : SOURCE);

      const params: TargetParams = {
        type: toDirection,
        movedValue: _checkedValue,
      };
      emit('change', newTargetValue, params);
    };

    // 点击移到右边按钮触发的函数
    const transferToRight = () => {
      transferTo(TARGET);
    };
    // 点击移到左边按钮触发的函数
    const transferToLeft = () => {
      transferTo(SOURCE);
    };
    const filterMethod = (
      transferList: Array<TransferItemOption>,
      targetValueList: Array<TransferValue>,
      needMatch: boolean,
    ): Array<TransferItemOption> => {
      return transferList.filter((item) => {
        const isMatch = targetValueList.includes(item.value);
        return needMatch ? isMatch : !isMatch;
      });
    };
    const handleScroll = (e: Event, listType: TransferListType) => {
      const target = e.target as HTMLElement;
      const bottomDistance = target.scrollHeight - target.scrollTop - target.clientHeight;
      const event: { e: Event; bottomDistance: number; type: TransferListType } = {
        e,
        bottomDistance,
        type: listType,
      };
      emit('scroll', event);
      // emitEvent<Parameters<TdTransferProps['onScroll']>>(this, 'scroll', event);
    };
    const handleSearch = (e: SearchEvent) => {
      emit('search', e);
      // emitEvent<Parameters<TdTransferProps['onSearch']>>(this, 'search', e);
    };
    const handlePageChange = (pageInfo: PageInfo, listType: TransferListType) => {
      emit('page-change', pageInfo, { type: listType });
      // emitEvent<Parameters<TdTransferProps['onPageChange']>>(this, 'page-change', pageInfo, { type: listType });
    };
    const renderTransferList = (listType: TransferListType) => {
      const scopedSlots = pick(slots, ['title', 'empty', 'footer', 'operation', 'transferItem', 'default', 'tree']);
      return (
        <transfer-list
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
        </transfer-list>
      );
    };

    return () => {
      return (
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
          <transfer-operations
            left-disabled={
              disabledOption.value[TARGET] || leftButtonDisabled.value || checkedValue.value[TARGET].length === 0
            }
            right-disabled={
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
    };
  },
});
