<template>
  <div>
    <t-button @click="()=>this.visible = true">异步加载类按钮</t-button>
    <t-dialog
      :visible.sync="visible"
      header="保存订单"
      body="订单保存中，请稍后"
      :confirmBtn="{
        content: '保存中...',
        theme: 'primary',
        loading: true
      }"
      :onClickConfirm="onConfirm"
      :onClose="close"
    >
    </t-dialog>

  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    close() {
      console.error('===close');
      this.visible = false;
    },
    onConfirm() {
      console.log('click确定');
    },
  },

};
</script>
