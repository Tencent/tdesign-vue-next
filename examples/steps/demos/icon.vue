<template>
  <t-steps :current="1">
    <t-step-item title="登录" content="已完成状态" :icon="renderLoginIcon" />
    <t-step-item title="购物" content="进行中状态" :icon="renderCartIcon" />
    <t-step-item title="支付" content="未开始" :icon="renderWalletIcon" />
    <t-step-item title="完成" content="未开始" :icon="renderSuccessIcon" />
  </t-steps>
</template>

<script lang="jsx">
import { LoginIcon, CartIcon, WalletIcon, CheckCircleIcon } from 'tdesign-icons-vue-next';

export default {
  setup() {
    return {
      renderLoginIcon() {
        return <LoginIcon size="24" class="icon-margin" />;
      },
      renderCartIcon() {
        return <CartIcon size="24" class="icon-margin" />;
      },
      renderWalletIcon() {
        return <WalletIcon size="24" class="icon-margin" />;
      },
      renderSuccessIcon() {
        return <CheckCircleIcon size="24" class="icon-margin" />;
      },
    };
  },
};
</script>
<style lang="less">
.icon-margin {
  margin-top: 3px;
}
</style>
