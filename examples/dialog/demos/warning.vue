<template>
  <div>
    <t-button theme="primary" @click="visible1 = true">提示反馈</t-button>
    <t-dialog
      theme="info"
      header="提示"
      body="对话框内容"
      v-model:visible="visible1"
      @click-confirm="onClickConfirm"
      :onClose="close1"
    >
    </t-dialog>

    <t-button theme="primary" @click="visible2 = true">成功反馈</t-button>
    <t-dialog
      theme="success"
      header="恭喜"
      body="对话框内容"
      v-model:visible="visible2"
      @click-confirm="onClickConfirm"
      :onClose="close2"
    >
    </t-dialog>

    <t-button theme="primary" @click="visible3 = true">警示反馈</t-button>
    <t-dialog
      theme="warning"
      header="警示"
      body="对话框内容"
      v-model:visible="visible3"
      @click-confirm="onClickConfirm"
      :onClose="close3"
    >
    </t-dialog>

    <t-button theme="primary" @click="visible4 = true">错误反馈</t-button>
    <t-dialog
      theme="danger"
      header="错误"
      body="对话框内容"
      v-model:visible="visible4"
      @click-confirm="onClickConfirm"
      :onClose="close4"
    >
    </t-dialog>

    <t-button theme="primary" @click="visible5 = true">自定义icon</t-button>
    <t-dialog
      body="对话框内容"
      v-model:visible="visible5"
      @click-confirm="onClickConfirm"
      :onClose="close4"
    >
      <template #header>
        <t-icon name="check-circle-filled" color="orange" />
        <span style="vertical-align: middle;">对话框标题</span>
      </template>
    </t-dialog>


  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  data() {
    return {
      visible1: false,
      visible2: false,
      visible3: false,
      visible4: false,
      visible5: false,
    };
  },
  methods: {
    onClickConfirm(close: Function, e: Event): void {
      // todo something else here
      this.sendingRequest();
      // close dialog
      close();
      // stop propagation
      e.stopPropagation();
    },
    sendingRequest() {
      console.log('sending request');
    },

    close1() {
      this.visible1 = false;
    },
    close2() {
      this.visible2 = false;
    },
    close3() {
      this.visible3 = false;
    },
    close4() {
      this.visible4 = false;
    },
  },
});
</script>
<style scoped>
.t-button {
  margin-right: 20px;
}
</style>
