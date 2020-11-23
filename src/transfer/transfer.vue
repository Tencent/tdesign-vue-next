<template>
  <div class="t-transfer">
    <transfer-list
      v-bind="$props"
      key="left"
      :title="titles[0]"
      :data-source="sourceDataSource"
      :checked-value="sourceCheckedValue"
      :disabled="disabled"
      :search="search"
    >
      <slot name="left-footer"></slot>
    </transfer-list>
    <transfer-operations />
    <transfer-list
      v-bind="$props"
      key="right"
      :title="titles[1]"
      :data-source="targetDataSource"
      :checked-value="targetCheckedValue"
      :disabled="disabled"
      :search="search"
    >
      <slot name="right-footer"></slot>
    </transfer-list>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { prefix } from '../config';
// import RenderComponent from '../utils/render-component';
import TransferList from './transfer-list';
import TransferOperations from './transfer-operations';
import { TransferItem } from './type/transfer.d';
import { CommonProps } from './interface';
const name = `${prefix}-transfer`;
export default Vue.extend({
  name,

  components: {
    // RenderComponent,
    TransferList,
    TransferOperations,
  },

  props: {
    ...CommonProps,
  },

  data() {
    return {
      name,
      // targetValue:
      // 源数据被选中的key
      sourceCheckedValue: this.checkedValue.filter(key => this.targetValue.indexOf(key) === -1),
      // 目标数据被选中的key
      targetCheckedValue: this.checkedValue.filter(key => this.targetValue.indexOf(key) !== -1),
    };
  },

  computed: {
    sourceDataSource(): Array<TransferItem> {
      // todo 左边源数据列要保留全部数据还是保留未选数据
      return this.data.filter(({ key }) => this.targetValue.indexOf(key) === -1);
    },
    targetDataSource(): Array<TransferItem> {
      if (this.targetOrder === 'original') {
        // ({ key }) 相当于item.key
        return this.data.filter(({ key }) => this.targetValue.indexOf(key) !== -1);
      }
      const arr: Array<TransferItem> = [];
      this.targetValue.forEach((str: string | number | symbol) => {
        const val = this.data[str] as TransferItem;
        if (val) {
          arr.push(val);
        }
      });
      return arr;
    },
  },
});
</script>
