<template>
  <div>
    <!-- 动画效果待开发 -->
    <t-drawer v-model:visible="visible" header="抽屉标题" destroy-on-close>
      <p>抽屉的内容</p>
    </t-drawer>

    <t-button variant="outline" @click="visible = true">打开抽屉</t-button>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const visible = ref(false);

    return {
      visible,
    };
  },
});
</script>
