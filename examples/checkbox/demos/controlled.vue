<template>
  <div>
    <!-- 单个 Checkbox 受控模式 -->
    <t-checkbox v-model="checked1" @change="onChange1">语法糖（v-model）</t-checkbox>
    <t-checkbox :checked="true" @change="onChange2">受控属性</t-checkbox>
    <t-checkbox :default-checked="false" :on-change="onChange2">非受控属性</t-checkbox>

    <br /><br /><br />
    <!-- 复选框框组受控模式 -->
    <t-checkbox-group :value="checked2" :options="options" :on-change="onChange2" />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

const options = [
  { label: '全选', checkAll: true },
  { value: 1, label: '受控模式选项一' },
  { value: 2, label: '受控模式选项二' },
  { value: 3, label: '受控模式选项三' },
];

export default defineComponent({
  setup() {
    const checked1 = ref(true);
    const checked2 = ref([1]);
    return {
      options,
      checked1,
      checked2,
      onChange1(val) {
        console.log('change:', checked1.value, val);
      },
      onChange2(value, context) {
        console.log('change: ', value, context);
      },
    };
  },
});
</script>

<style scoped>
.t-checkbox + .t-checkbox {
  margin-left: 16px;
}
</style>
