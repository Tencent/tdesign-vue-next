<template>
  <div>
    <t-dialog
      v-model:visible="visible1"
      header="下单确认"
      body="信息已全部保存，是否确认下单？"
      mode="normal"
      theme="info"
      :on-confirm="close1"
    />

    <t-dialog
      v-model:visible="visible2"
      header="温馨提示"
      body="系统重启后会短暂影响页面访问，确认重启吗？"
      mode="normal"
      theme="warning"
      :on-confirm="close2"
    />

    <t-dialog
      v-model:visible="visible3"
      header="推送失败"
      body="请检查推送数据是否符合要求"
      mode="normal"
      theme="danger"
      :on-confirm="close3"
    />

    <t-dialog
      v-model:visible="visible4"
      header="操作成功"
      body="是否前往查看订单列表"
      mode="normal"
      theme="success"
      :on-confirm="close4"
    />

    <t-space>
      <t-button v-if="!visible1" theme="primary" @click="visible1 = true">theme: info</t-button>
      <t-button v-if="!visible2" theme="primary" @click="visible2 = true">theme: warning</t-button>
      <t-button v-if="!visible3" theme="primary" @click="visible3 = true">theme: error</t-button>
      <t-button v-if="!visible4" theme="primary" @click="visible4 = true">theme: success</t-button>
    </t-space>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { DialogProps } from 'tdesign-vue-next';
const visible1 = ref(false);
const visible2 = ref(false);
const visible3 = ref(false);
const visible4 = ref(false);
const close1: DialogProps['onConfirm'] = () => {
  visible1.value = false;
};
const close2: DialogProps['onConfirm'] = () => {
  visible2.value = false;
};
const close3: DialogProps['onConfirm'] = () => {
  visible3.value = false;
};
const close4: DialogProps['onConfirm'] = () => {
  visible4.value = false;
};
</script>
