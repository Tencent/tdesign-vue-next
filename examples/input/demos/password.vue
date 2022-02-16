<template>
  <div class="tdesign-demo-block-column" style="max-width: 500px">
    <t-input type="password" default-value="520 TDesign">
      <template #prefix-icon>
        <lock-on-icon />
      </template>
    </t-input>
    <!-- 使用 function 的形式定义 icon -->
    <t-input type="password" default-value="520 TDesign" :prefix-icon="renderPrefixIcon" />
  </div>
</template>
<script setup lang="jsx">
import { LockOnIcon } from 'tdesign-icons-vue-next';

const renderPrefixIcon = () => <LockOnIcon />;
</script>

<style scoped>
.t-input + .t-input {
  margin-top: 16px;
}
</style>
