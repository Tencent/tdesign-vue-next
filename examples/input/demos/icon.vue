<template>
  <div class="tdesign-demo-item--input__input-box">
    <t-input type="password">
      <t-icon-lock-on slot="prefix-icon"></t-icon-lock-on>
      <t-icon-info-circle slot="suffix-icon"></t-icon-info-circle>
    </t-input>
    <!-- 使用 function 的形式定义 icon -->
    <t-input type="password" :prefix-icon="renderPrefixIcon" :suffix-icon="renderSuffixIcon" />
  </div>
</template>
<script>
import TIconLockOn from '@tencent/tdesign-vue/lib/icon/lock-on';
import TIconInfoCircle from '@tencent/tdesign-vue/lib/icon/info-circle';

export default {
  components: {
    TIconLockOn,
    TIconInfoCircle,
  },
  methods: {
    renderPrefixIcon() {
      return <TIconLockOn></TIconLockOn>;
    },
    renderSuffixIcon() {
      return <TIconInfoCircle></TIconInfoCircle>;
    },
  },
};
</script>

<style scoped>
.t-input + .t-input{
  margin-top: 16px;
}
</style>
