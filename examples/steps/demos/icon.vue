<template>
  <t-steps :current="1">
    <t-step-item
      title="登录"
      content="已完成状态"
      :icon="renderLoginIcon"
    />
    <t-step-item
      title="购物"
      content="进行中状态"
      :icon="renderCartIcon"
    />
    <t-step-item
      title="支付"
      content="未开始"
      :icon="renderWalletIcon"
    />
    <t-step-item
      title="完成"
      content="未开始"
      :icon="renderSuccessIcon"
    />
  </t-steps>
</template>

<script lang="jsx">
import TIconLogin from '@tencent/tdesign-vue-next/icon/login';
import TIconCart from '@tencent/tdesign-vue-next/icon/cart';
import TIconWallet from '@tencent/tdesign-vue-next/icon/wallet';
import TIconSuccess from '@tencent/tdesign-vue-next/icon/check-circle';

export default {
  setup() {
    return {
      renderLoginIcon() {
        return <TIconLogin size="24" class="icon-margin"/>;
      },
      renderCartIcon() {
        return <TIconCart size="24" class="icon-margin"/>;
      },
      renderWalletIcon() {
        return <TIconWallet size="24" class="icon-margin"/>;
      },
      renderSuccessIcon() {
        return <TIconSuccess size="24" class="icon-margin"/>;
      },
    };
  },
};
</script>
<style lang="less">
.icon-margin {
  margin-top: 3px
}
</style>
