<template>
  <div>
    <t-drawer v-model:visible="visible" header="标题名称" :on-confirm="handleClose" @close="handleClose">
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
    <t-button variant="outline" @click="handleClick"> 打开抽屉 </t-button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const visible = ref(false);

const handleClick = () => {
  visible.value = true;
};
const handleClose = () => {
  visible.value = false;
};
</script>
<style scoped>
.t-button {
  margin-right: 20px;
}
.t-drawer-demo-div {
  margin-bottom: 24px;
}
</style>
