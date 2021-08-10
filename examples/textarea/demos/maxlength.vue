<template>
  <div>
    <t-textarea
      v-model="value"
      placeholder="请输入描述文案，最多20字符"
      :maxlength="20"
    ></t-textarea>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: '',
    };
  },
  methods: {

  },
};
</script>
<style></style>
