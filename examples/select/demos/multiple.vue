<template>
  <div>
    <t-select
      v-model="value"
      placeholder="-请选择-"
      multiple
      :min-collapsed-num="1"
      :options="options"
    />
    <br><br>

    <!-- 自定义选中项内容，valueDisplay 为 function -->
    <t-select
      v-model="value"
      placeholder="-请选择-"
      multiple
      :value-display="valueDisplay"
      :options="options"
    />
    <br><br>

    <!-- 自定义选中项内容，valueDisplay 为 插槽(slot) -->
    <t-select
      v-model="value"
      placeholder="-请选择-"
      multiple
      :options="options"
    >
      <template #valueDisplay="{ value: val, onClose }">
        <t-tag
          v-for="(item, index) in val"
          :key="index"
          :closable="true"
          :on-close="() => onClose(index)"
          variant="light"
        >
          {{ item.label }}（{{ item.value }}）
        </t-tag>
      </template>
    </t-select>
  </div>
</template>

<script lang='jsx'>

import { defineComponent, ref } from 'vue';

const options = [{
  label: '选项一',
  value: '1',
}, {
  label: '选项二',
  value: '2',
}, {
  label: '选项三',
  value: '3',
}];

export default defineComponent({
  setup() {
    const value = ref(['1', '3']);

    const valueDisplay = (h, { value: val, onClose }) => {
      if (!(val instanceof Array)) return;
      return val.map((item, index) => (
        <t-tag
          key={index}
          variant="light"
          closable={true}
          onClose={() => onClose(index)}
        >
          {item.label}（{item.value}）
        </t-tag>
      ));
    };

    return {
      value,
      options,
      valueDisplay,
    };
  },
});
</script>
