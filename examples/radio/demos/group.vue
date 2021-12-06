<template>
  <div class="tdesign-demo-block-column">
    <div>
      <t-radio-group v-model="value" name="city" :options="options" @change="onChange"></t-radio-group>
    </div>

    <div>
      <t-radio-group default-value="1" @change="onChange">
        <t-radio value="1">选项一</t-radio>
        <t-radio value="2">选项二</t-radio>
        <t-radio value="3">选项三</t-radio>
        <t-radio value="4" disabled>选项四</t-radio>
      </t-radio-group>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

const options = [
  {
    value: '1',
    label: '选项一',
  },
  {
    value: '2',
    label: '选项二',
  },
  {
    value: '3',
    label: '选项三',
  },
  {
    value: '4',
    label: () => '选项四',
  },
];

export default defineComponent({
  setup() {
    const value = ref('');
    const onChange = (checkedValues) => {
      console.log('checkedValues:', value.value, checkedValues);
    };

    return {
      value,
      options,
      onChange,
    };
  },
});
</script>

<style scoped>
.t-radio-group {
  margin-bottom: 16px;
}
</style>
