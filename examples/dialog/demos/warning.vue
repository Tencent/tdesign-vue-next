<template>
  <div>
    <t-button variant="base" theme="primary" @click="()=>this.visible1 = true">提示反馈</t-button>
    <t-dialog
      body="对话框内容"
      v-model="visible1"
      @click-confirm="onClickConfirm"
      @click-close-btn="(close)=>close()"
    >
      <div slot="header">
        <t-icon name="info-circle-filled" color="#3881E8" />
        <span style="vertical-align: middle;">我是主要信息，我是主要信息</span>
      </div>
    </t-dialog>

    <t-button variant="base" theme="primary" @click="()=>this.visible2 = true">成功反馈</t-button>
    <t-dialog
      body="对话框内容"
      v-model="visible2"
      @click-confirm="onClickConfirm"
      @click-close-btn="(close)=>close()"
    >
      <div slot="header">
        <t-icon name="check-circle-filled" color="#3881E8" />
        <span style="vertical-align: middle;">我是主要信息，我是主要信息</span>
      </div>
    </t-dialog>

    <t-button variant="base" theme="primary" @click="()=>this.visible3 = true">警示反馈</t-button>
    <t-dialog
      body="对话框内容"
      v-model="visible3"
      @click-confirm="onClickConfirm"
      @click-close-btn="(close)=>close()"
    >
      <div slot="header">
        <t-icon name="error-circle-filled" color="#3881E8" />
        <span style="vertical-align: middle;">我是主要信息，我是主要信息</span>
      </div>
    </t-dialog>

    <t-button variant="base" theme="primary" @click="()=>this.visible4 = true">错误反馈</t-button>
    <t-dialog
      body="对话框内容"
      v-model="visible4"
      @click-confirm="onClickConfirm"
      @click-close-btn="(close)=>close()"
    >
      <div slot="header">
        <t-icon name="error-circle-filled" color="#E34D59" />
        <span style="vertical-align: middle;">我是主要信息，我是主要信息</span>
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
  },
});
</script>
<style scoped>
.t-button {
  margin-right: 20px;
}
</style>
