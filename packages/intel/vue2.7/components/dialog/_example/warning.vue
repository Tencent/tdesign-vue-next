<template>
  <div>
    <t-space break-line>
      <t-button theme="primary" @click="visible1 = true">提示反馈</t-button>
      <t-button theme="primary" @click="visible2 = true">成功反馈</t-button>
      <t-button theme="primary" @click="visible3 = true">警示反馈</t-button>
      <t-button theme="primary" @click="visible4 = true">错误反馈</t-button>
      <t-button theme="primary" @click="visible5 = true">自定义图标</t-button>
    </t-space>
    <t-dialog
      theme="info"
      header="提示"
      body="对话框内容"
      :visible.sync="visible1"
      @confirm="onConfirm"
      :onClose="close1"
      :cancelBtn="null"
    />
    <t-dialog
      theme="success"
      header="成功"
      body="对话框内容"
      :visible.sync="visible2"
      @confirm="onConfirm"
      :onClose="close2"
      :cancelBtn="null"
    />
    <t-dialog
      theme="warning"
      header="警示"
      body="对话框内容"
      :visible.sync="visible3"
      @confirm="onConfirm"
      :onClose="close3"
      :cancelBtn="null"
    />
    <t-dialog
      theme="danger"
      header="错误"
      body="对话框内容"
      :visible.sync="visible4"
      @confirm="onConfirm"
      :onClose="close4"
      :cancelBtn="null"
    />
    <t-dialog
      body="对话框内容"
      :closeBtn="false"
      :visible.sync="visible5"
      @confirm="onConfirm"
      :onClose="close5"
      :cancelBtn="null"
    >
      <div slot="header">
        <icon name="check-circle-filled" color="orange" />
        <span style="vertical-align: middle">对话框标题</span>
      </div>
    </t-dialog>
  </div>
</template>
<script>
import Vue from 'vue';
import { Icon } from 'tdesign-icons-vue';

export default Vue.extend({
  components: {
    Icon,
  },
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
    onConfirm(context) {
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
