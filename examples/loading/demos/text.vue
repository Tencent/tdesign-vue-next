<template>
  <t-loading :loading="loading" :indicator="getIndicator"></t-loading>
</template>
<script>
export default {
  name: 'loadingBase',
  data() {
    return {
      loading: true,
    };
  },
  methods: {
    getIndicator() {
      return '加载中...';
    },
  },
};
</script>

