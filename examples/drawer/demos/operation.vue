<template>
  <div>
    <t-drawer v-model:visible="visible" @close="handleClose" header='标题名称'>
      <div class="t-drawer-demo-div">
        <span>标签 A</span>
        <t-input />
      </div>
      <div class="t-drawer-demo-div">
        <span>标签 B</span>
        <t-input />
      </div>
      <div class="t-drawer-demo-div">
        <span>标签 C</span>
        <t-input />
      </div>
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
<style scoped>
.t-button {
  margin-right: 20px;
}
.t-drawer-demo-div {
  margin-bottom: 24px;
}
</style>
