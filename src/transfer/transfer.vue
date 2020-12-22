<template>
  <div
    :class="[
      't-transfer',
      showSearch ? 't-transfer-search' : '',
      hasFooter ? 't-transfer-footer' : '',
      showPagination ? 't-transfer-pagination' : '',
    ]"
  >
    <transfer-list
      v-bind="$props"
      :direction="SOURCE"
      :title="getTitle(SOURCE)"
      :data-source="sourceList"
      :checked-value="sourceCheckedKeys"
      :disabled="leftListDisabled"
      :search="getSearchProp(SOURCE)"
      :pagination="getPaginationObj(SOURCE)"
      :check-all="getCheckAll(SOURCE)"
      @checkedChange="handleSourceCheckedChange"
      @scroll="scroll"
    >
    </transfer-list>
    <transfer-operations
      :left-disabled="leftListDisabled || leftButtonDisabled || sourceCheckedKeys.length === 0"
      :right-disabled="rightListDisabled || rightButtonDisabled || targetCheckedKeys.length === 0"
      :operations="operations"
      @moveToRight="transferToRight"
      @moveToLeft="transferToLeft"
    />
    <transfer-list
      v-bind="$props"
      :direction="TARGET"
      :data-source="targetList"
      :checked-value="targetCheckedKeys"
      :disabled="rightListDisabled"
      :title="getTitle(TARGET)"
      :search="getSearchProp(TARGET)"
      :pagination="getPaginationObj(TARGET)"
      :check-all="getCheckAll(TARGET)"
      @checkedChange="handleTargetCheckedChange"
      @scroll="scroll"
    >
    </transfer-list>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { prefix } from '../config';
// import { TransferItems } from './type/transfer';
import TransferList from './transfer-list';
import TransferOperations from './components/transfer-operations';
import { TransferItem, TransferItemKey, TransferDirection, SearchProps } from './type/transfer';
import { CommonProps } from './interface';
import cloneDeep from 'lodash/cloneDeep';

const name = `${prefix}-transfer`;
const searchObj: SearchProps = { placeholder: '请输入搜索内容', clearable: true };
const SOURCE = 'source';
const TARGET = 'target';
export default Vue.extend({
  name,
  components: {
    TransferList,
    TransferOperations,
  },
  model: {
    prop: 'targetValue',
    event: 'change',
  },

  props: {
    ...CommonProps,
  },

  data() {
    return {
      name,
      SOURCE,
      TARGET,
      curCheckedValue: [],
      sourceCheckedKeys: [], // 源数据被选中的key
      targetCheckedKeys: [], // 目标数据被选中的key,
    };
  },
  computed: {
    leftButtonDisabled(): boolean {
      return this.directions === 'right';
    },
    rightButtonDisabled(): boolean {
      return this.directions === 'left';
    },
    leftListDisabled(): boolean {
      return this.getDisabledValue(0);
    },
    rightListDisabled(): boolean {
      return this.getDisabledValue(1);
    },
    sourceList(): Array<TransferItem> {
      return this.filterMethod(this.data, this.targetValue, false);
    },
    targetList(): Array<TransferItem> {
      if (this.targetOrder === 'original') {
        return this.filterMethod(this.data, this.targetValue, true);
      }
      const arr: Array<TransferItem> = [];
      this.targetValue.forEach((key: string | number | symbol) => {
        const val = this.data[key] as TransferItem;
        if (val) {
          arr.push(val);
        }
      });
      return arr;
    },
    hasFooter(): boolean {
      return !!this.$scopedSlots.footer || !!this.footer;
    },
    showPagination(): boolean {
      // 翻页在自定义列表无效
      return !!this.pagination && !this.$scopedSlots.content;
    },
    showSearch(): boolean {
      // 翻页在自定义列表无效
      return !!this.search;
    },
  },
  watch: {
    checkedValue(val: Array<TransferItemKey>): void {
      this.curCheckedValue = cloneDeep(val);
    },
  },
  created() {
    this.curCheckedValue = this.checkedValue;
    this.setRowKey();
  },
  mounted() {
    this.setCheckedKeys();
  },
  methods: {
    transferTo(toDirection: TransferDirection) {
      let targetValue: Array<TransferItemKey> = JSON.parse(JSON.stringify(this.targetValue));
      let sourceCheckedKeys = 'sourceCheckedKeys';
      if (toDirection === SOURCE) {
        sourceCheckedKeys = 'targetCheckedKeys';
      }
      const moveKeys: Array<TransferItemKey> = [];
      this[sourceCheckedKeys] = this[sourceCheckedKeys].filter((key: TransferItemKey) => {
        const data = this.getItemData(key) || {};
        const isMove = !data.disabled;
        if (isMove) {
          moveKeys.push(key);
        }
        return !isMove;
      });
      this.curCheckedValue = this.curCheckedValue.filter((key: TransferItemKey) => moveKeys.indexOf(key) === -1);
      if (toDirection === SOURCE) {
        targetValue = targetValue.filter((key: TransferItemKey) => moveKeys.indexOf(key) === -1);
      } else if (this.targetOrder === 'unshift') {
        targetValue = moveKeys.concat(targetValue);
      } else {
        targetValue = targetValue.concat(moveKeys);
      }
      this.setCheckedKeys();
      this.$emit('change', targetValue);
    },
    // 点击移到右边按钮触发的函数
    transferToRight() {
      this.transferTo(TARGET);
    },
    // 点击移到左边按钮触发的函数
    transferToLeft() {
      this.transferTo(SOURCE);
    },
    handleSourceCheckedChange(val: Array<any>, isChangeByUser: boolean) {
      this.sourceCheckedKeys = val;
      isChangeByUser && this.$emit('checkChange', this.sourceCheckedKeys, this.targetCheckedKeys);
    },
    handleTargetCheckedChange(val: Array<any>, isChangeByUser: boolean) {
      this.targetCheckedKeys = val;
      isChangeByUser && this.$emit('checkChange', this.sourceCheckedKeys, this.targetCheckedKeys);
    },
    filterMethod(sourceArr: Array<any>, targetArr: Array<any>, needMatch: boolean): Array<any> {
      return sourceArr.filter((item) => {
        const isMatch = targetArr.indexOf(item.key) > -1;
        return needMatch ? isMatch : !isMatch;
      });
    },
    setCheckedKeys() {
      const { curCheckedValue, targetValue } = this;
      this.sourceCheckedKeys = this.filterMethod(curCheckedValue, targetValue, false);
      this.targetCheckedKeys = this.filterMethod(curCheckedValue, targetValue, true);
    },
    setRowKey() {
      const { rowKey } = this;
      if (!rowKey) {
        return;
      }
      if (typeof rowKey === 'string') {
        this.data.forEach((item: TransferItem) => {
          item.key = this.getKey(item[rowKey], item.key); // eslint-disable-line
        });
      } else {
        this.data.forEach((item: TransferItem) => {
          item.key = this.getKey(rowKey(item), item.key); // eslint-disable-line
        });
      }
    },
    getKey(value: TransferItemKey, key: TransferItemKey): TransferItemKey {
      return typeof value === 'undefined' ? key : value;
    },
    getItemData(key: TransferItemKey): TransferItem {
      // 获取key对应的数据
      const data = this.data.filter((item: TransferItem) => item.key === key);
      return data.length ? data[0] : {};
    },
    getPaginationObj(direction: string) {
      let paginationObj = null;
      if (this.pagination && this.pagination instanceof Array) {
        const order = direction === SOURCE ? 0 : 1;
        paginationObj = this.pagination[order];
      } else {
        paginationObj = this.pagination;
      }
      return paginationObj;
    },
    getTitle(direction: string) {
      let targetTitle;
      const index = direction === SOURCE ? 0 : 1;
      const titles = ['源列表', '目标列表'];
      if (typeof this.titles === 'string') {
        targetTitle = this.titles;
      } else if (this.titles instanceof Array && this.titles[index]) {
        targetTitle = this.titles[index];
      }
      return targetTitle || titles[index];
    },
    getDisabledValue(index: number) {
      if (typeof this.disabled === 'boolean') {
        return this.disabled;
      }
      if (this.disabled instanceof Array && this.disabled.length > index) {
        return this.disabled[index];
      }
      return false;
    },
    getSearchProp(direction: TransferDirection): any {
      let searchProp;
      if (this.search && typeof this.search === 'boolean') {
        searchProp = searchObj;
      } else if (this.search instanceof Array && this.search.length) {
        const index = direction === SOURCE ? 0 : 1;
        searchProp = this.search[index];
      } else {
        // 处理this.search为false和为inputProps的object形式
        searchProp = this.search;
      }
      return searchProp;
    },
    getCheckAll(direction: string) {
      let targetCheckAll;
      if (direction === 'source') {
        targetCheckAll = this.checkAll instanceof Array && this.checkAll.length >= 1 ? this.checkAll[0] : this.checkAll;
      } else {
        targetCheckAll = this.checkAll instanceof Array && this.checkAll.length >= 2 ? this.checkAll[1] : this.checkAll;
      }
      return targetCheckAll;
    },
    scroll(e: any) {
      const bottomDistance = e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight;
      this.$emit('scroll', e, bottomDistance);
    },
  },
});
</script>
