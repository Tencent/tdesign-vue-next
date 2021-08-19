<template>
  <div>
    <t-textarea
      v-model="value"
      placeholder="请输入描述文案"
      name="description"
      @change="onChange"
    ></t-textarea>
    <t-textarea
      v-model="value2"
      placeholder="请输入描述文案"
      name="description"
      :onChange="onChange2"
    ></t-textarea>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: '',
      value2: ''
    };
  },
  methods: {
    onChange(value, e) {
      console.log('onChange：', value, e);
    },
    onChange2(value, e) {
      console.log('onChange2：', value, e);
    },
  },
};
</script>
<style></style>
