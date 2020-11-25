<template>
  <div :class="['t-transfer', hasFooter?'t-transfer-footer':'', showPagination?'t-transfer-pagination':'']">
    <transfer-list
      v-bind="$props"
      direction="source"
      :title="titles[0]"
      :data-source="sourceList"
      :checked-value="sourceCheckedKeys"
      :disabled="disabled"
      :search="search"
      @checkedChange="handleSourceCheckedChange"
    >
    </transfer-list>
    <transfer-operations
      :left-disabled="sourceCheckedKeys.length === 0"
      :right-disabled="targetCheckedKeys.length === 0"
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
      :search="search"
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
import TransferOperations from './transfer-operations';
import { TransferItem, TransferItemKey, TransferDirection } from './type/transfer';
import { CommonProps } from './interface';

const name = `${prefix}-transfer`;
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
  mounted() {
    this.setCheckedKeys();
  },
  methods: {
    setCheckedKeys() {
      const { checkedValue, targetValue } = this;
      this.sourceCheckedKeys = this.filterMethod(checkedValue, targetValue, false);
      this.targetCheckedKeys = this.filterMethod(checkedValue, targetValue, true);
    },
    transferTo(toDirection: TransferDirection) {
      let targetValue = this.targetValue.slice();
      let sourceCheckedKeys = 'sourceCheckedKeys';
      if (toDirection === 'left') {
        sourceCheckedKeys = 'targetCheckedKeys';
      }
      const moveKeys: Array<TransferItemKey> = [];
      this[sourceCheckedKeys].filter((key: TransferItemKey) => {
        const data = this.getItemData(key) || {};
        const isMove = !data.disabled;
        if (isMove) {
          moveKeys.push(key);
        }
        return !isMove;
      });
      if (toDirection === 'left') {
        targetValue = targetValue.filter((key: TransferItemKey) => moveKeys.indexOf(key) === -1);
      } else {
        targetValue = targetValue.concat(moveKeys);
      }
      // this[sourceCheckedKeys] = [];
      this.$emit('change', targetValue);
    },
    // 点击移到右边按钮触发的函数
    transferToRight() {
      this.transferTo('right');
    },
    // 点击移到左边按钮触发的函数
    transferToLeft() {
      this.transferTo('left');
    },
    handleSourceCheckedChange(val: Array<any>) {
      this.sourceCheckedKeys = val;
      this.$emit('checkChange', val, this.targetCheckedKeys);
    },
    handleTargetCheckedChange(val: Array<any>) {
      this.targetCheckedKeys = val;
      this.$emit('checkChange', this.sourceCheckedKeys, val);
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
  },
});
</script>
