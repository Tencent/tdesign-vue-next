<template>
  <t-space>
    <t-select v-model="value1" :options="options" placeholder="请选择云解决方案" />

    <t-select v-model="value2" :options="options" disabled placeholder="请选择云解决方案" />

    <t-select v-model="value3" :options="options" loading placeholder="请选择云解决方案" />
  </t-space>
</template>

<script>
export default {
  data() {
    return {
      value1: '',
      value2: '',
      value3: '',
      // 如果此处数据字段不是 label 和 value，而是 name 和 id，则可以传入参数 `keys` 定义别名
      // 示例： <t-select :options="options1" :keys="{ label: 'name', value: 'id' }" />
      options: [
        { label: '架构云', value: '1' },
        { label: '大数据', value: '2' },
        { label: '区块链', value: '3' },
        { label: '物联网', value: '4', disabled: true },
        { label: '人工智能', value: '5' },
      ],
    };
  },
};
</script>
