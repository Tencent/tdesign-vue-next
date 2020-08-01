<template>
  <div class="tdesign-demo-item--input__input-box">
    <t-input
      clearable
      v-model="value"
      placeholder="请输入"
      @clear="onClear"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 'hello',
    };
  },
  methods: {
    onClear() {
      console.log('clear');
    },
  },
};
</script>
