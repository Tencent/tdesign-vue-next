<template>
  <div :class="['t-transfer', hasFooter ? 't-transfer-footer' : '', showPagination ? 't-transfer-pagination' : '']">
    <transfer-list
      v-bind="$props"
      direction="source"
      :title="titles[0]"
      :data-source="sourceList"
      :checked-value="sourceCheckedKeys"
      :disabled="disabled"
      :search="getSearchProp('source')"
      :pagination="getPaginationObj('source')"
      @checkedChange="handleSourceCheckedChange"
    >
    </transfer-list>
    <transfer-operations
      :left-disabled="sourceCheckedKeys.length === 0"
      :right-disabled="targetCheckedKeys.length === 0"
      :operations="operations"
      @moveToRight="transferToRight"
      @moveToLeft="transferToLeft"
    />
    <transfer-list
      v-bind="$props"
      direction="target"
      :title="titles[1]"
      :data-source="targetList"
      :checked-value="targetCheckedKeys"
      :disabled="disabled"
      :search="getSearchProp('target')"
      :pagination="getPaginationObj('target')"
      @checkedChange="handleTargetCheckedChange"
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
import { deepCloneByJson } from './utils';

const name = `${prefix}-transfer`;
const searchObj: SearchProps = { placeholder: '请输入搜索内容', suffixIcon: 'search', clearable: true };
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
      curCheckedValue: [],
      sourceCheckedKeys: [], // 源数据被选中的key
      targetCheckedKeys: [], // 目标数据被选中的key,
    };
  },
  computed: {
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
    hasFooter(): any {
      return !!this.$scopedSlots.footer || this.footer;
    },
    showPagination(): any {
      // 翻页在自定义列表无效
      return this.pagination && !this.$scopedSlots.content;
    },
  },
  watch: {
    checkedValue(val: Array<TransferItemKey>): void {
      this.curCheckedValue = deepCloneByJson(val);
    },
  },
  mounted() {
    this.curCheckedValue = this.checkedValue;
    this.setCheckedKeys();
  },
  methods: {
    getSearchProp(direction: TransferDirection): any {
      let searchProp;
      if (this.search && typeof this.search === 'boolean') {
        searchProp = searchObj;
      } else if (this.search instanceof Array && this.search.length) {
        const index = direction === 'source' ? 0 : 1;
        searchProp = this.search[index];
      } else {
        // 处理this.search为false和为inputProps的object形式
        searchProp = this.search;
      }
      return searchProp;
    },
    setCheckedKeys() {
      const { curCheckedValue, targetValue } = this;
      // const checkedValue = checked.length ? checked : this.checkedValue;
      // const targetValue = target.length ? target : this.targetValue;
      this.sourceCheckedKeys = this.filterMethod(curCheckedValue, targetValue, false);
      this.targetCheckedKeys = this.filterMethod(curCheckedValue, targetValue, true);
    },
    transferTo(toDirection: TransferDirection) {
      let targetValue: Array<TransferItemKey> = deepCloneByJson(this.targetValue);
      let sourceCheckedKeys = 'sourceCheckedKeys';
      if (toDirection === 'source') {
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
      if (toDirection === 'source') {
        targetValue = targetValue.filter((key: TransferItemKey) => moveKeys.indexOf(key) === -1);
      } else {
        targetValue = targetValue.concat(moveKeys);
      }
      this.setCheckedKeys();
      this.$emit('change', targetValue);
    },
    // 点击移到右边按钮触发的函数
    transferToRight() {
      this.transferTo('target');
    },
    // 点击移到左边按钮触发的函数
    transferToLeft() {
      this.transferTo('source');
    },
    handleSourceCheckedChange(val: Array<any>, isChangeByUser: boolean) {
      this.sourceCheckedKeys = val;
      isChangeByUser && this.$emit('checkChange', this.sourceCheckedKeys, this.targetCheckedKeys);
    },
    handleTargetCheckedChange(val: Array<any>, isChangeByUser: boolean) {
      this.targetCheckedKeys = val;
      isChangeByUser && this.$emit('checkChange', this.sourceCheckedKeys, this.targetCheckedKeys);
    },
    getItemData(key: TransferItemKey): TransferItem {
      // 获取key对应的数据
      const data = this.data.filter((item: TransferItem) => item.key === key);
      return data.length ? data[0] : {};
    },
    filterMethod(sourceArr: Array<any>, targetArr: Array<any>, needMatch: boolean): Array<any> {
      return sourceArr.filter((item) => {
        const isMatch = targetArr.indexOf(item.key) > -1;
        return needMatch ? isMatch : !isMatch;
      });
    },
    getPaginationObj(direction: string) {
      let paginationObj = null;
      if (this.pagination && this.pagination instanceof Array) {
        const order = direction === 'source' ? 0 : 1;
        paginationObj = this.pagination[order];
      } else {
        paginationObj = this.pagination;
      }
      return paginationObj;
    },
  },
});
</script>
