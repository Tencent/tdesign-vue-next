<template>
  <t-space size="small">
    <t-button theme="primary" @click="visible1 = true">提示反馈</t-button>

    <t-dialog
      v-model:visible="visible1"
      theme="info"
      header="提示"
      body="对话框内容"
      :on-close="close1"
      :cancel-btn="null"
      @confirm="onClickConfirm"
    />

    <t-button theme="primary" @click="visible2 = true">成功反馈</t-button>
    <t-dialog
      v-model:visible="visible2"
      theme="success"
      header="恭喜"
      body="对话框内容"
      :on-close="close2"
      :cancel-btn="null"
      @confirm="onClickConfirm"
    />

    <t-button theme="primary" @click="visible3 = true">警示反馈</t-button>
    <t-dialog
      v-model:visible="visible3"
      theme="warning"
      header="警示"
      body="对话框内容"
      :on-close="close3"
      :cancel-btn="null"
      @confirm="onClickConfirm"
    />

    <t-button theme="primary" @click="visible4 = true">错误反馈</t-button>
    <t-dialog
      v-model:visible="visible4"
      theme="danger"
      header="错误"
      body="对话框内容"
      :on-close="close4"
      :cancel-btn="null"
      @confirm="onClickConfirm"
    />

    <t-button theme="primary" @click="visible5 = true">自定义icon</t-button>
    <t-dialog
      v-model:visible="visible5"
      body="对话框内容"
      :close-btn="false"
      :on-close="close5"
      :cancel-btn="null"
      @confirm="onClickConfirm"
    >
      <template #header>
        <div>
          <t-icon name="check-circle-filled" color="orange" />
          <span style="vertical-align: middle">对话框标题</span>
        </div>
      </template>
    </t-dialog>
  </t-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { DialogProps } from 'tdesign-vue-next';
const visible1 = ref(false);
const visible2 = ref(false);
const visible3 = ref(false);
const visible4 = ref(false);
const visible5 = ref(false);
const onClickConfirm: DialogProps['onConfirm'] = (context) => {
  const { e } = context;
  visible1.value = false;
  visible2.value = false;
  visible3.value = false;
  visible4.value = false;
  visible5.value = false;
  e.stopPropagation();
};
const close1: DialogProps['onClose'] = () => {
  visible1.value = false;
};
const close2: DialogProps['onClose'] = () => {
  visible2.value = false;
};
const close3: DialogProps['onClose'] = () => {
  visible3.value = false;
};
const close4: DialogProps['onClose'] = () => {
  visible4.value = false;
};
const close5: DialogProps['onClose'] = () => {
  visible5.value = false;
};
</script>
