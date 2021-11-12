<template>
  <div>
    <t-select
      v-model="value"
      placeholder="-请选择-"
      multiple
      :min-collapsed-num="1"
      :options="options"
    />
    <br/><br/>

    <!-- 自定义选中项内容，valueDisplay 为 function -->
    <t-select
      v-model="value"
      placeholder="-请选择-"
      multiple
      :valueDisplay="valueDisplay"
      :options="options"
    />
    <br/><br/>

    <!-- 自定义选中项内容，valueDisplay 为 插槽(slot) -->
    <t-select
      v-model="value"
      placeholder="-请选择-"
      multiple
      :options="options"
    >
      <template #valueDisplay="{ value, onClose }">
        <t-tag
          v-for="(item, index) in value"
          :key="index"
          :closable="true"
          :onClose="() => onClose(index)"
          theme="success"
          variant="light"
        >
          {{item.label}}（{{item.value}}）
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
}]

export default defineComponent({
  setup(){
    const value = ref(['1', '3']);

    const valueDisplay = (h, { value, onClose }) => {
      if (!(value instanceof Array)) return;
      return value.map((item, index) => (
        <t-tag
          key={index}
          theme="warning"
          variant="light"
          closable={true}
          onClose={() => onClose(index)}
        >
          {item.label}（{item.value}）
        </t-tag>
      ));
    }

    return {
      value,
      options,
      valueDisplay
    }
  }
});
</script>
