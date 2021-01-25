<template>
  <div>
    <t-button variant="base" @click="()=>this.visible = true">异步加载类按钮</t-button>

    <t-dialog
      v-model="visible"
      @click-close-btn="(close)=>close()"
      header="提示"
      body="自定义底部按钮，传入 ButttonProps"
      :confirmContent="{
        content: '确定',
        variant: 'base',
        loading: true
      }"
      :cancelContent="{
        content: '取消',
        variant: 'outline',
      }"
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
};
</script>
