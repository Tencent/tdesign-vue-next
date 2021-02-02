<template>
  <div>
    <p>底部按钮有两个控制属性：confirmBtn 和 cancelBtn。属性类型有多种：string/function/object/boolean。</p><br>
    <t-button theme="primary" @click="()=>this.visible1 = true">自定义底部按钮（文字）</t-button>
    <t-button theme="primary" @click="()=>this.visible2 = true">自定义底部按钮（任何按钮属性）</t-button>
    <t-button theme="primary" @click="()=>this.visible3 = true">自定义底部按钮（自定义组件）</t-button>

    <t-dialog
      v-model="visible1"
      header="提示"
      body="自定义底部按钮，直接传入文字"
      confirmBtn="前往支付"
      cancelBtn="关闭"
    >
    </t-dialog>

    <t-dialog
      v-model="visible2"
      header="提示"
      body="自定义底部按钮，传入 ButttonProps"
      :confirmBtn="{
        content: '前往购物车',
        variant: 'base',
      }"
      :cancelBtn="{
        content: '我知道了',
        variant: 'outline',
      }"
    >
    </t-dialog>

    <t-dialog
      v-model="visible3"
      header="提示"
      body="自定义底部按钮，传入自定义组件"
      :confirmBtn="getConfirmBtn"
      :cancelBtn="false"
    >
    </t-dialog>

  </div>
</template>
<script>

export default {
  data() {
    return {
      visible1: false,
      visible2: false,
      visible3: false,
    };
  },
  methods: {
    getConfirmBtn() {
      return <t-button theme='primary' disabled>我知道了</t-button>;
    },
  },
};
</script>
<style scoped>
.t-button {
  margin-right: 20px;
}
</style>
