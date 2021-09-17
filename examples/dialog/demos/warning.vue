<template>
  <div>
    <t-button theme="primary" @click="visible1 = true">提示反馈</t-button>
  
    <t-dialog
      theme="info"
      header="提示"
      body="对话框内容"
      v-model:visible="visible1"
      @confirm="onClickConfirm"
      :onClose="close1"
    >
    </t-dialog>

    <t-button theme="primary" @click="visible2 = true">成功反馈</t-button>
    <t-dialog
      theme="success"
      header="恭喜"
      body="对话框内容"
      v-model:visible="visible2"
      @confirm="onClickConfirm"
      :onClose="close2"
    >
    </t-dialog>

    <t-button theme="primary" @click="visible3 = true">警示反馈</t-button>
    <t-dialog
      theme="warning"
      header="警示"
      body="对话框内容"
      v-model:visible="visible3"
      @confirm="onClickConfirm"
      :onClose="close3"
      :cancelBtn="null"

    >
    </t-dialog>

    <t-button theme="primary" @click="visible4 = true">错误反馈</t-button>
    <t-dialog
      theme="danger"
      header="错误"
      body="对话框内容"
      v-model:visible="visible4"
      @confirm="onClickConfirm"
      :onClose="close4"
      :cancelBtn="null"
    >
    </t-dialog>

    <t-button theme="primary" @click="visible5 = true">自定义icon</t-button>
    <t-dialog
      body="对话框内容"
      :closeBtn="false"
      v-model:visible="visible5"
      @confirm="onClickConfirm"
      :onClose="close5"
    >
      <template #header>
        <div>
          <t-icon name="check-circle-filled" color="orange" />
          <span style="vertical-align: middle;">对话框标题</span>
        </div>
      </template>
    </t-dialog>

  </div>
</template>
<script>
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
    onClickConfirm(context) {
      const { e } = context;
      // todo something else here
      this.sendingRequest();
      this.visible1 = false;
      this.visible2 = false;
      this.visible3 = false;
      this.visible4 = false;
      this.visible5 = false;
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
    close5() {
      this.visible5 = false;
    },
  },
});
</script>
<style scoped>
.t-button {
  margin-right: 20px;
}
</style>
