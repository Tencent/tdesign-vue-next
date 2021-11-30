<template>
  <div class="tdesign-demo-item--input__input-box">
    <t-input type="password" default-value="520 TDesign">
      <template #prefix-icon>
        <t-icon-lock-on />
      </template>
    </t-input>
    <!-- 使用 function 的形式定义 icon -->
    <t-input type="password" default-value="520 TDesign" :prefix-icon="renderPrefixIcon" />
  </div>
</template>
<script lang="jsx">
import { defineComponent } from 'vue';
import TIconLockOn from 'tdesign-vue-next/icon/lock-on';

export default defineComponent({
  components: {
    TIconLockOn,
  },
  setup() {
    const renderPrefixIcon = () => <TIconLockOn></TIconLockOn>;

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
