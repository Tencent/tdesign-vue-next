<template>
  <div>
    <t-button theme="primary" @click="showDialog">显示对话框</t-button>
    <t-dialog v-model="visible"></t-dialog>
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
  methods: {
    showDialog() {
      this.visible = true;
    },
  },
});
</script>
