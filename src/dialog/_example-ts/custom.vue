<template>
  <t-space direction="vertical">
    <p>自定义内容除了使用传参形式外，也可以使用 slot 插槽的形式。</p>
    <p>底部按钮有两个控制属性：confirmBtn 和 cancelBtn。属性类型有多种：string | ButtonProps | TNode。</p>
    <t-space>
      <t-button theme="primary" @click="visible1 = true">自定义底部按钮（文字）</t-button>
      <t-button theme="primary" @click="visible2 = true">自定义底部按钮（任何按钮属性）</t-button>
      <t-button theme="primary" @click="visible3 = true">自定义底部按钮（自定义组件）</t-button>
      <t-button theme="primary" @click="visible4 = true">slot方式</t-button>
      <t-dialog
        v-model:visible="visible1"
        header="提示"
        body="自定义底部按钮，直接传入文字"
        confirm-btn="前往支付"
        cancel-btn="关闭"
        :on-confirm="onConfirm"
        :on-close="close1"
      />

      <t-dialog
        :visible="visible2"
        header="提示"
        body="自定义底部按钮，传入 ButtonProps"
        :confirm-btn="{
          content: '前往购物车',
          variant: 'base',
        }"
        :cancel-btn="{
          content: '我知道了',
          variant: 'outline',
        }"
        :on-close="close2"
      />

      <t-dialog
        :visible="visible3"
        :close-btn="true"
        header="提示"
        body="自定义底部按钮，传入自定义组件"
        :confirm-btn="getConfirmBtn"
        cancel-btn="取消"
        :on-close="close3"
      />

      <t-dialog :visible="visible4" :close-btn="true" :confirm-btn="getConfirmBtn" cancel-btn="取消" :on-close="close4">
        <template #header>slot header</template>
        <template #body>slot body</template>
      </t-dialog>
    </t-space>
  </t-space>
</template>
<script lang="tsx" setup>
import { ref } from 'vue';
import { DialogProps } from 'tdesign-vue-next';
const visible1 = ref(false);
const visible2 = ref(false);
const visible3 = ref(false);
const visible4 = ref(false);
const getConfirmBtn: DialogProps['confirmBtn'] = () => {
  return (
    <t-button theme="primary" disabled>
      我知道了
    </t-button>
  );
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
const onConfirm: DialogProps['onConfirm'] = () => {
  visible1.value = false;
  alert('跳转支付~');
};
</script>
