<template>
  <div class="t-transfer">
    <transfer-list
      v-bind="$props"
      direction="left"
      :title="titles[0]"
      :data-source="sourceList"
      :checked-value="sourceCheckedKeys"
      :disabled="disabled"
      :search="search"
      @checked-change="handleSourceCheckedChange"
    >
      <slot name="left-footer"></slot>
    </transfer-list>
    <transfer-operations
      :left-active="targetCheckedKeys.length !== 0"
      :right-active="sourceCheckedKeys.length !== 0"
      @moveToRight="transferToRight"
      @moveToLeft="transferToLeft"
    />
    <transfer-list
      v-bind="$props"
      direction="right"
      :title="titles[1]"
      :data-source="targetList"
      :checked-value="targetCheckedKeys"
      :disabled="disabled"
      :search="search"
      @checked-change="handleTargetCheckedChange"
    >
      <slot name="right-footer"></slot>
    </transfer-list>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { prefix } from '../config';
// import RenderComponent from '../utils/render-component';
// import { TransferItems } from './type/transfer';
import TransferList from './transfer-list';
import TransferOperations from './transfer-operations';
import { TransferItem } from './type/transfer.d';
import { CommonProps } from './interface';
// import { AnyARecord } from 'dns';

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
      sourceCheckedKeys: [], // 源数据被选中的key
      targetCheckedKeys: [], // 目标数据被选中的key
    };
  },

  computed: {
    sourceList(): Array<TransferItem> {
      return this.filterMethod(this.data, this.targetValue, false);
    },
    targetList(): Array<TransferItem> {
      if (this.targetOrder === 'original') {
        // return this.data.filter(({ key }) => this.targetValue.indexOf(key) !== -1);
        return this.filterMethod(this.data, this.targetValue, true);
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
  mounted() {
    this.initConfig();
  },
  methods: {
    initConfig() {
      const { checkedValue, targetValue } = this;
      this.sourceCheckedKeys = this.filterMethod(checkedValue, targetValue, false);
      this.targetCheckedKeys = this.filterMethod(checkedValue, targetValue, true);
    },
    // transferTo(toDirection: string) {
    //   let keysName = {
    //     sourceCheckedKeys: 'sourceCheckedKeys',
    //     targetCheckedKeys: 'targetCheckedKeys',
    //   };
    //   // const { sourceCheckedKeys, targetCheckedKeys } = this;
    //   if (toDirection === 'left') {
    //     keysName = {
    //       sourceCheckedKeys: 'targetCheckedKeys',
    //       targetCheckedKeys: 'sourceCheckedKeys',
    //     };
    //   }
    //   // const fromKeys = toDirection === 'right' ? sourceCheckedKeys : targetCheckedKeys;
    //   // const toKeys = toDirection === 'right' ? targetCheckedKeys : sourceCheckedKeys;
    //   const moveKeys: Array<string | number | symbol> = [];
    //   const newFromKeys = this[keysName.sourceCheckedKeys].filter((key: any) => {
    //     const data = this.getItemData(key) || {};
    //     const isMove = !data.disabled;
    //     if (isMove) {
    //       moveKeys.push(key);
    //     }
    //     return !isMove;
    //   });
    //   const newToKeys = this[keysName.targetCheckedKeys].concat(moveKeys);
    //   console.log('newFromKeys', newFromKeys);
    //   this[keysName.targetCheckedKeys] = newToKeys;
    // },
    // 点击移到右边按钮触发的函数
    transferToRight() {
      // this.transferTo('right');
    },
    // 点击移到左边按钮触发的函数
    transferToLeft() {
      // this.transferTo('left');
    },
    handleSourceCheckedChange(val: Array<any>) {
      this.sourceCheckedKeys = val;
      this.$emit('check-change', val, this.targetCheckedKeys);
    },
    handleTargetCheckedChange(val: Array<any>) {
      this.targetCheckedKeys = val;
      this.$emit('check-change', this.sourceCheckedKeys, val);
    },
    getItemData(key: string): TransferItem {
      // 获取key对应的数据
      const data = this.data.filter((item: TransferItem) => item.key === key);
      return data.length ? data[0] : {};
    },
    filterMethod(sourceArr: Array<any>, targetArr: Array<any>, needMatch: boolean): Array<any> {
      return sourceArr.filter((key) => {
        const isMatch = targetArr.indexOf(key) > -1;
        return needMatch ? isMatch : !isMatch;
      });
    },
  },
});
</script>
