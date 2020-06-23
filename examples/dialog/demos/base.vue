<template>
  <div>
    <t-button theme="primary" @click="()=>this.visible = true">显示对话框</t-button>
    <t-dialog v-model="visible" :close="()=>this.visible = false"></t-dialog>
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
