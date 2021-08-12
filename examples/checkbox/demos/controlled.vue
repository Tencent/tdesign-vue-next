<template>
  <div>
    <t-checkbox v-model="checked1">语法糖（v-model）</t-checkbox>
    <t-checkbox :checked="true" @change="onChange">受控属性</t-checkbox>
    <t-checkbox :defaultChecked="false" :onChange="onChange">非受控属性</t-checkbox>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked1: true,
    };
  },
  methods: {
    onChange(value, context) {
      console.log('change: ', value, context);
    },
  },
};
</script>

<style scoped>
.t-checkbox + .t-checkbox {
  margin-left: 16px;
}
</style>
