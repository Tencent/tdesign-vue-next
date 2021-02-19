<template>
  <div>
    <t-button theme="primary" @click="visible1 = true">提示反馈</t-button>
    <t-dialog
      theme="info"
      header="提示"
      body="对话框内容"
      :visible.sync="visible1"
      @click-confirm="onClickConfirm"
      :onClose="close1"
    >
    </t-dialog>

    <t-button theme="primary" @click="visible2 = true">成功反馈</t-button>
    <t-dialog
      theme="success"
      header="恭喜"
      body="对话框内容"
      :visible.sync="visible2"
      @click-confirm="onClickConfirm"
      :onClose="close2"
    >
    </t-dialog>

    <t-button theme="primary" @click="visible3 = true">警示反馈</t-button>
    <t-dialog
      theme="warning"
      header="警示"
      body="对话框内容"
      :visible.sync="visible3"
      @click-confirm="onClickConfirm"
      :onClose="close3"
    >
    </t-dialog>

    <t-button theme="primary" @click="visible4 = true">错误反馈</t-button>
    <t-dialog
      theme="error"
      header="错误"
      body="对话框内容"
      :visible.sync="visible4"
      @click-confirm="onClickConfirm"
      :onClose="close4"
    >
    </t-dialog>

    <t-button theme="primary" @click="visible5 = true">自定义icon</t-button>
    <t-dialog
      body="对话框内容"
      :visible.sync="visible5"
      @click-confirm="onClickConfirm"
      :onClose="close4"
    >
      <div slot="header">
        <t-icon name="check-circle-filled" color="orange" />
        <span style="vertical-align: middle;">对话框标题</span>
      </div>
    </t-dialog>


  </div>
</template>
<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
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
