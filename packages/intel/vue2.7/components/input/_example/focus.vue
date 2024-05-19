<template>
  <t-input placeholder="请输入内容" @focus="onFocus" style="max-width: 500px" />
</template>
<script>
export default {
  methods: {
    onFocus() {
      console.log('focused');
    },
  },
};
</script>
