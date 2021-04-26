<template>
  <div>
    <t-drawer v-model:visible="visible" header="Drawer" :onClickConfirm="onClickConfirm" :closeBtn="true">
      <p>This is a controlled drawer</p>
    </t-drawer>
    <t-button theme="primary" @click="handleClick">Open a Drawer</t-button>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { MessagePlugin as Message } from '@/src/message';
export default defineComponent({
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    handleClick() {
      this.visible = true;
    },
    onClickConfirm() {
      Message.info('数据保存中...', 1000);
      const timer = setTimeout(() => {
        clearTimeout(timer);
        this.visible = false;
        Message.info('数据保存成功!');
      }, 1000);
    },
  },
});
</script>
<style scoped>
.t-button {
  margin-right: 20px;
}
</style>
