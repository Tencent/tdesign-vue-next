<template>
  <t-steps :current="1">
    <t-step-item title="登录" content="已完成状态" :icon="renderLoginIcon"></t-step-item>
    <t-step-item title="购物" content="进行中状态" :icon="renderCartIcon"></t-step-item>
    <t-step-item title="支付" content="未开始" :icon="renderWalletIcon"></t-step-item>
    <t-step-item title="完成" content="未开始" :icon="renderSuccessIcon"></t-step-item>
  </t-steps>
</template>

<script>
import TIconLogin from '@tencent/tdesign-vue-next/lib/icon/login';
import TIconCart from '@tencent/tdesign-vue-next/lib/icon/cart';
import TIconWallet from '@tencent/tdesign-vue-next/lib/icon/wallet';
import TIconSuccess from '@tencent/tdesign-vue-next/lib/icon/check-circle';

export default {
  methods: {
    renderLoginIcon() {
      return <TIconLogin />;
    },
    renderCartIcon() {
      return <TIconCart />;
    },
    renderWalletIcon() {
      return <TIconWallet />;
    },
    renderSuccessIcon() {
      return <TIconSuccess />;
    },
  },
};
</script>
