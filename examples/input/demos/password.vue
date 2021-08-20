<template>
  <div class="tdesign-demo-item--input__input-box">
    <t-input type="password" default-value="520 TDesign">
      <template v-slot:prefix-icon>
        <t-icon-lock-on></t-icon-lock-on>
      </template>

    </t-input>
    <!-- 使用 function 的形式定义 icon -->
    <t-input type="password" default-value="520 TDesign" :prefix-icon="renderPrefixIcon" />
  </div>
</template>
<script>
import TIconLockOn from '@tencent/tdesign-vue-next/lib/icon/lock-on';

export default {
  components: {
    TIconLockOn,
  },
  methods: {
    renderPrefixIcon() {
      return <TIconLockOn></TIconLockOn>;
    },
  },
};
</script>

<style scoped>
.t-input + .t-input{
  margin-top: 16px;
}
</style>
