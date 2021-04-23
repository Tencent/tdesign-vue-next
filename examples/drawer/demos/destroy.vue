<template>
  <div>
    <!-- 动画效果待开发 -->
    <t-drawer v-model:visible="visible" header='标题名称' destroyOnClose>
      <p>This is the body of drawer</p>
    </t-drawer>

    <t-button @click="visible = true">Open</t-button>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  data() {
    return {
      visible: false,
    };
  },
});
</script>
