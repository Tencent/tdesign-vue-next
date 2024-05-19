<template>
  <t-space direction="vertical">
    <t-input-number
      v-model="value1"
      :max="15"
      :min="-2"
      :format="(value) => `${value} %`"
      autoWidth
      @change="onChange"
    ></t-input-number>

    <!-- 小数位数和格式化函数组合使用 -->
    <t-input-number
      v-model="value2"
      :decimalPlaces="2"
      :format="(value, { fixedNumber }) => `${fixedNumber} %`"
      autoWidth
      @change="onChange"
    ></t-input-number>
  </t-space>
</template>

<script>
export default {
  data() {
    return {
      value1: 3,
      value2: 3.01,
    };
  },
  methods: {
    onChange(ev) {
      console.info(ev);
    },
  },
};
</script>
