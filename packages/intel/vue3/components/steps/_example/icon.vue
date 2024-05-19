<template>
  <t-steps :current="1" readonly>
    <t-step-item title="登录" content="已完成状态" :icon="renderLoginIcon" />
    <t-step-item title="购物" content="进行中状态" :icon="renderCartIcon" />
    <t-step-item title="支付" content="未开始" :icon="renderWalletIcon" />
    <t-step-item title="完成" content="未开始" :icon="renderSuccessIcon" />
  </t-steps>
</template>

<script setup lang="jsx">
import { LoginIcon, CartIcon, WalletIcon, CheckCircleIcon } from 'tdesign-icons-vue-next';

const renderLoginIcon = () => {
  return <LoginIcon size="24" class="icon-margin" />;
};
const renderCartIcon = () => {
  return <CartIcon size="24" class="icon-margin" />;
};
const renderWalletIcon = () => {
  return <WalletIcon size="24" class="icon-margin" />;
};
const renderSuccessIcon = () => {
  return <CheckCircleIcon size="24" class="icon-margin" />;
};
</script>
