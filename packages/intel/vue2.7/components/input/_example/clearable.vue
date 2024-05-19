<template>
  <t-input clearable v-model="value" placeholder="请输入" @clear="onClear" style="max-width: 500px" />
</template>

<script>
export default {
  data() {
    return {
      value: 'Hello TDesign',
    };
  },
  methods: {
    onClear() {
      console.log('clear');
    },
  },
};
</script>
