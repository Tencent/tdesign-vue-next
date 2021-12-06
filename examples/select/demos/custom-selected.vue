<template>
  <div>
    <!-- 自定义选中项内容，valueDisplay 为渲染函数（function） -->
    <t-select
      v-model="value1"
      :options="options"
      :value-display="valueDisplay"
      placeholder="请选择古代名人"
      multiple
      clearable
    />
    <br /><br />

    <!-- 自定义选中项内容，valueDisplay 为 插槽(slot) -->
    <t-select v-model="value2" :options="options" placeholder="请选择古代名人" multiple clearable>
      <template #valueDisplay="{ value, onClose }">
        <t-tag v-for="(item, index) in value" :key="index" :closable="true" :on-close="() => onClose(index)">
          {{ item.label }}({{ item.value[0].toUpperCase() }})
        </t-tag>
      </template>
    </t-select>
  </div>
</template>

<script lang="jsx">
import { defineComponent, ref } from 'vue';

const options = [
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' },
  { label: '选项三', value: '3' },
  { label: '选项四', value: '4' },
  { label: '选项五', value: '5' },
  { label: '选项六', value: '10' },
  { label: '选项七', value: '6' },
  { label: '选项八', value: '7' },
  { label: '选项九', value: '8' },
];

export default defineComponent({
  setup() {
    const value1 = ref(['1', '2', '3']);
    const value2 = ref(['4', '5', '6', '7']);

    const valueDisplay = (h, { value, onClose }) => {
      if (!(value instanceof Array)) return;
      return value.map((item, index) => (
        <t-tag key={index} closable={true} onClose={() => onClose(index)}>
          {item.label}({item.value[0].toUpperCase()})
        </t-tag>
      ));
    };

    return {
      value1,
      value2,
      options,
      valueDisplay,
    };
  },
  methods: {},
});
</script>
