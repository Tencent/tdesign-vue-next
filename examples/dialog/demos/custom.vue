<template>
  <div>
    <p>底部按钮有两个控制属性：confirmBtn 和 cancelBtn。属性类型有多种：string | ButtonProps | TNode。</p>
    <br />
    <t-button theme="primary" @click="visible1 = true"> 自定义底部按钮（文字） </t-button>
    <t-button theme="primary" @click="visible2 = true"> 自定义底部按钮（任何按钮属性） </t-button>
    <t-button theme="primary" @click="visible3 = true"> 自定义底部按钮（自定义组件） </t-button>

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
      body="自定义底部按钮，传入 ButttonProps"
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
  </div>
</template>
<script lang="jsx">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const visible1 = ref(false);
    const visible2 = ref(false);
    const visible3 = ref(false);

    return {
      visible1,
      visible2,
      visible3,
      getConfirmBtn() {
        return (
          <t-button theme="primary" disabled>
            我知道了
          </t-button>
        );
      },
      close1() {
        visible1.value = false;
      },
      close2() {
        visible2.value = false;
      },
      close3() {
        visible3.value = false;
      },
      onConfirm() {
        visible1.value = false;
        alert('跳转支付~');
      },
    };
  },
});
</script>
<style scoped>
.t-button {
  margin-right: 20px;
}
</style>
