<template>
  <div>
    <t-button theme="primary" @click="showDialog">打开对话框</t-button>
    <t-dialog
      :showOverlay="true"
      draggable
      v-model="visible" theme="primary"
      destroyOnClose>
      <!-- :offset="{left:'100px',top:'200px'}" -->

      <!-- <div slot="footer">sdfsdf</div> -->
    </t-dialog>
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
