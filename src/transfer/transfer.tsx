import {
  defineComponent, VNode,
} from 'vue';
import pick from 'lodash/pick';
import { prefix } from '../config';
import TransferList from './components/transfer-list';
import TransferOperations from './components/transfer-operations';
import {
  DataOption,
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
import { PageInfo, TdPaginationProps } from '../pagination/type';
import mixins from '../utils/mixins';
import getLocalReceiverMixins from '../locale/local-receiver';
import props from './props';
import { getTransferListOption } from './utils';
import { TNode } from '../common';

const name = `${prefix}-transfer`;
const SOURCE = 'source';
const TARGET = 'target';

type DataType = {
  name: string;
  SOURCE: TransferListType;
  TARGET: TransferListType;
}

export default defineComponent({
  ...mixins(getLocalReceiverMixins('transfer')),
  name,
  components: {
    TransferList,
    TransferOperations,
  },
  props,
  emits: ['checkChange', 'change', 'scroll', 'search', 'page-change', 'update:checked', 'checked-change'],
  data(): DataType {
    return {
      name,
      SOURCE,
      TARGET,
    };
  },
  computed: {
    leftButtonDisabled(): boolean {
      return this.direction === 'right';
    },
    rightButtonDisabled(): boolean {
      return this.direction === 'left';
    },
    // props 传入的 data 格式化后的数据
    transferData(): Array<TransferItemOption> {
      return this.getTransferData(this.data);
    },
    sourceList(): Array<TransferItemOption> {
      return this.filterMethod(this.transferData, this.value, false);
    },
    targetList(): Array<TransferItemOption> {
      const list: Array<TransferItemOption> = [];
      // 按照 targetValue 顺序，找到原数据
      this.value.forEach((value) => {
        const item = this.transferData.find((item) => item.value === value);
        if (item === null) {
          throw `target value "${value}" was not found not from data ${JSON.stringify(this.data)}`;
        }
        list.push(item);
      });
      return list;
    },
    // 被选中的value
    checkedValue(): TransferListOptionBase<TransferValue[]> {
      return {
        [SOURCE]: this.sourceList.filter((data) => this.checked.includes(data.value)).map((data) => data.value),
        [TARGET]: this.targetList.filter((data) => this.checked.includes(data.value)).map((data) => data.value),
      };
    },
    hasFooter(): boolean {
      return !!this.$slots.footer || !!this.footer;
    },
    showPagination(): boolean {
      // 翻页在自定义列表无效
      return !!this.pagination && !this.$slots.content;
    },
    showSearch(): boolean {
      // 翻页在自定义列表无效
      return !!this.search;
    },
    footerOption(): TransferListOptionBase<string | Function> {
      const footer = this.footer || '';
      return getTransferListOption<string | Function>(footer);
    },
    emptyOption(): TransferListOptionBase<EmptyType> {
      return getTransferListOption<EmptyType>(this.empty);
    },
    searchOption(): TransferListOptionBase<SearchOption> {
      return getTransferListOption<SearchOption>(this.search);
    },
    checkAllOption(): TransferListOptionBase<boolean> {
      return getTransferListOption<boolean>(this.showCheckAll);
    },
    disabledOption(): TransferListOptionBase<boolean> {
      return getTransferListOption<boolean>(this.disabled);
    },
    titleOption(): TransferListOptionBase<string | TNode> {
      return getTransferListOption<string | TNode>(this.title);
    },
    paginationOption(): TransferListOptionBase<TdPaginationProps> {
      return getTransferListOption<TdPaginationProps>(this.pagination);
    },
  },
  methods: {
    getTransferData(data: Array<DataOption>): Array<TransferItemOption> {
      const list: Array<TransferItemOption> = data.map((transferDataItem, index): TransferItemOption => {
        const labelKey = this.keys?.label || 'label';
        const valueKey = this.keys?.value || 'value';
        if (transferDataItem[labelKey] === undefined) {
          throw `${labelKey} is not in DataOption ${JSON.stringify(transferDataItem)}`;
        }
        if (transferDataItem[valueKey] === undefined) {
          throw `${valueKey} is not in DataOption ${JSON.stringify(transferDataItem)}`;
        }
        return ({
          label: transferDataItem[labelKey] as string,
          value: transferDataItem[valueKey],
          key: `key__value_${transferDataItem[valueKey]}_index_${index}`,
          disabled: transferDataItem.disabled ?? false,
          data: transferDataItem,
        });
      });
      return list;
    },
    transferTo(toDirection: TransferListType) {
      const oldTargetValue: Array<TransferValue> = JSON.parse(JSON.stringify(this.value));
      let newTargetValue: Array<TransferValue>;
      const checkedValue = toDirection === TARGET ? this.checkedValue[SOURCE] : this.checkedValue[TARGET];
      // target->source
      if (toDirection === SOURCE) {
        newTargetValue = oldTargetValue.filter((v) => !checkedValue.includes(v));
      } else if (this.targetSort === 'original') {
        // 按照原始顺序
        newTargetValue = this.transferData.filter((item) => oldTargetValue.includes(item.value) || checkedValue.includes(item.value))
          .map((item) => item.value);
      } else if (this.targetSort === 'unshift') {
        newTargetValue = checkedValue.concat(oldTargetValue);
      } else {
        newTargetValue = oldTargetValue.concat(checkedValue);
      }

      // 清空checked。与toDirection相反
      this.handleCheckedChange([], toDirection === SOURCE ? TARGET : SOURCE);

      const params: TargetParams = {
        type: toDirection, movedValue: checkedValue,
      };
      this.$emit('change', newTargetValue, params);
    },
    // 点击移到右边按钮触发的函数
    transferToRight() {
      this.transferTo(TARGET);
    },
    // 点击移到左边按钮触发的函数
    transferToLeft() {
      this.transferTo(SOURCE);
    },
    handleCheckedChange(val: Array<TransferValue>, listType: TransferListType) {
      const sourceChecked = listType === SOURCE ? val : this.checkedValue[SOURCE];
      const targetChecked = listType === TARGET ? val : this.checkedValue[TARGET];
      const checked = [...sourceChecked, ...targetChecked];
      const event: CheckedOptions = {
        checked,
        sourceChecked,
        targetChecked,
        type: listType,
      };
      // 支持checked.sync
      this.$emit('update:checked', checked);
      this.checkedValue[listType] = val;
      this.$emit('checked-change', event);
    },
    filterMethod(transferList: Array<TransferItemOption>, targetValueList: Array<TransferValue>, needMatch: boolean): Array<TransferItemOption> {
      return transferList.filter((item) => {
        const isMatch = targetValueList.indexOf(item.value) > -1;
        return needMatch ? isMatch : !isMatch;
      });
    },
    handleScroll(e: Event, listType: TransferListType) {
      const target = e.target as HTMLElement;
      const bottomDistance = target.scrollHeight - target.scrollTop - target.clientHeight;
      const event: { e: Event; bottomDistance: number; type: TransferListType } = {
        e,
        bottomDistance,
        type: listType,
      };
      this.$emit('scroll', event);
    },
    handleSearch(e: SearchEvent) {
      this.$emit('search', event);
    },
    handlePageChange(pageInfo: PageInfo, listType: TransferListType) {
      this.$emit('page-change', pageInfo, { type: listType });
    },
    renderTransferList(listType: TransferListType) {
      const scopedSlots = pick(this.$slots, ['title', 'empty', 'footer', 'operation', 'transferItem']);
      return (
        <transfer-list
          checkboxProps={this.checkboxProps}
          transferItem={this.transferItem}
          list-type={listType}
          title={this.titleOption[listType]}
          data-source={listType === SOURCE ? this.sourceList : this.targetList}
          checked-value={this.checkedValue[listType]}
          disabled={this.disabledOption[listType]}
          search={this.searchOption[listType]}
          pagination={this.paginationOption[listType]}
          check-all={this.checkAllOption[listType]}
          footer={this.footerOption[listType]}
          empty={this.emptyOption[listType]}
          onCheckedChange={($event: any) => this.handleCheckedChange($event, listType)}
          onScroll={($event: any) => this.handleScroll($event, listType)}
          onSearch={this.handleSearch}
          onPageChange={($event: any) => this.handlePageChange($event, listType)}
          scopedSlots={scopedSlots}
          t={this.t}
          locale={this.locale}
        ></transfer-list>
      );
    },
  },
  render(): VNode {
    return (
      <div
        class={[
          't-transfer',
          this.showSearch ? 't-transfer-search' : '',
          this.hasFooter ? 't-transfer-footer' : '',
          this.showPagination ? 't-transfer-pagination' : '',
        ]}
      >
        {this.renderTransferList(SOURCE)}
        <transfer-operations
          left-disabled={this.disabledOption[TARGET] || this.leftButtonDisabled || this.checkedValue[TARGET].length === 0}
          right-disabled={this.disabledOption[SOURCE] || this.rightButtonDisabled || this.checkedValue[SOURCE].length === 0}
          operation={this.operation}
          onMoveToRight={this.transferToRight}
          onMoveToLeft={this.transferToLeft}
          scopedSlots={{ operation: this.$slots.operation }}
        />
        {this.renderTransferList(TARGET)}
      </div>
    );
  },
});
