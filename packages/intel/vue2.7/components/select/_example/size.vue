<template>
  <t-space align="center">
    <t-select
      size="small"
      v-model="value1"
      :popupProps="popupProps"
      placeholder="请选择"
      style="width: 200px; display: inline-block; margin-right: 20px"
      clearable
    >
      <t-option v-for="(item, index) in options" :value="item.value" :label="item.label" :key="index">
        {{ item.label }}
      </t-option>
    </t-select>
    <t-select
      v-model="value"
      placeholder="请选择"
      :options="options"
      size="medium"
      style="width: 200px; display: inline-block; margin-right: 20px"
    />
    <t-select
      v-model="value2"
      placeholder="请选择"
      :options="options"
      size="large"
      style="width: 200px; display: inline-block"
    />
  </t-space>
</template>

<script>
export default {
  data() {
    return {
      options: [
        { label: '选项一', value: '1' },
        { label: '选项二', value: '2' },
        { label: '选项三', value: '3' },
      ],
      value: '',
      value1: '',
      value2: '',
      popupProps: {
        overlayStyle: {
          width: '300px',
        },
      },
    };
  },
};
</script>
