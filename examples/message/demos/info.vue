<template>
  <div class="t-demo-message">
    <t-message theme="info">用于表示普通操作信息提示</t-message>
    <t-message theme="info" v-if="closableMsg" closeBtn @click-close-btn="closableMsg = false"
      >用于表示普通操作信息提示, 可关闭, 通常信息较长</t-message
    >
    <t-button :disabled="closableMsg" @click="closableMsg = !closableMsg">显示关闭信息</t-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      closableMsg: true,
    };
  },
};
</script>
