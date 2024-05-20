<template>
  <t-space direction="vertical">
    <t-input-number v-model="value1" largeNumber :decimalPlaces="2" step="1" style="width: 300px"></t-input-number>

    <!-- format 存在时，decimalPlaces 失效 -->
    <t-input-number v-model="value3" large-number step="100" :format="format" style="width: 300px"></t-input-number>

    <t-input-number v-model="value2" largeNumber step="0.888" style="width: 300px"></t-input-number>
  </t-space>
</template>

<script>
export default {
  data() {
    return {
      value1: '19999999999999999',
      value2: '0.8975527383412673418',
      value3: '19999999999999999.977',
    };
  },
  methods: {
    format(val) {
      return val.replace(/\d{1,3}(?=(\d{3})+(\.|$))/g, '$&,');
    },
  },
};
</script>
