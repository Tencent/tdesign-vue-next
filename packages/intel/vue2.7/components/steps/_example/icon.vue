<template>
  <t-steps :current="1" readonly>
    <!-- 方式一：使用插槽自定义图标 -->
    <t-step-item title="登录" content="已完成状态">
      <t-login-icon slot="icon" />
    </t-step-item>
    <!-- 方式二：使用渲染函数 icon 自定义图标 -->
    <t-step-item title="购物" content="进行中状态" :icon="renderCartIcon"></t-step-item>
    <t-step-item title="支付" content="未开始" :icon="renderWalletIcon"></t-step-item>
    <t-step-item title="完成" content="未开始" :icon="renderSuccessIcon"></t-step-item>
  </t-steps>
</template>

<script lang="jsx">
import {
  LoginIcon, CartIcon, WalletIcon, CheckCircleIcon,
} from 'tdesign-icons-vue';

export default {
  components: {
    TLoginIcon: LoginIcon,
  },
  methods: {
    // 如果遇到 h / createElement 函数报错，请给渲染函数添加参数 h。示例：renderCartIcon(h) {}
    renderCartIcon() {
      return <CartIcon />;
    },
    renderWalletIcon() {
      return <WalletIcon />;
    },
    renderSuccessIcon() {
      return <CheckCircleIcon />;
    },
  },
};
</script>
