<template>
  <div>
    <t-checkbox v-model="checked1"> 语法糖（v-model） </t-checkbox>
    <t-checkbox :checked="true" @change="onChange"> 受控属性 </t-checkbox>
    <t-checkbox :default-checked="false" :on-change="onChange"> 非受控属性 </t-checkbox>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const checked1 = ref(true);
    const onChange = (value, context) => {
      console.log('change: ', value, context);
    };
    return {
      checked1,
      onChange,
    };
  },
});
</script>

<style scoped>
.t-checkbox + .t-checkbox {
  margin-left: 16px;
}
</style>
