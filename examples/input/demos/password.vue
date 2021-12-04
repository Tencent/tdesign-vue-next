<template>
  <div class="tdesign-demo-item--input__input-box">
    <t-input type="password" default-value="520 TDesign">
      <template #prefix-icon>
        <lock-on-icon />
      </template>
    </t-input>
    <!-- 使用 function 的形式定义 icon -->
    <t-input type="password" default-value="520 TDesign" :prefix-icon="renderPrefixIcon" />
  </div>
</template>
<script lang="jsx">
import { defineComponent } from 'vue';
import { LockOnIcon } from 'tdesign-icons-vue-next';

export default defineComponent({
  components: {
    LockOnIcon,
  },
  setup() {
    const renderPrefixIcon = () => <LockOnIcon />;

    return {
      renderPrefixIcon,
    };
  },
});
</script>

<style scoped>
.t-input + .t-input {
  margin-top: 16px;
}
</style>
