<template>
  <div>
    <t-button theme="primary" @click="()=>this.visible = true">显示对话框</t-button>
    <t-dialog header="对话框标题" body="对话框内容" v-model="visible" @click-close-btn="(close)=>close()"></t-dialog>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  data() {
    return {
      visible: false,
    };
  },
});
</script>
<style scoped>
.t-button {
  margin-right: 20px;
}
</style>
