<template>
  <div>
    <t-drawer v-model:visible="visible" @close="handleClose" :showOverlay="false" header="抽屉标题">
      <p>抽屉的内容</p>
    </t-drawer>

    <t-button variant="outline" @click="handleClick">打开抽屉</t-button>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const visible = ref(false);

    return {
      visible,
      handleClick() {
        visible.value = true;
      },
      handleClose() {
        visible.value = false;
      }
    }
  },
});
</script>
