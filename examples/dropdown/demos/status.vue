<template>
  <div>
    <t-dropdown :options="options" >
      <t-button>hover我试试</t-button>
    </t-dropdown>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  data() {
    return {
      options: [{
        text: '选项一',
        id: 1,
      }, {
        text: '选项二',
        id: 2,
      }, {
        text: '选项三',
        disabled: true,
        id: 3,
      }, {
        text: '选项四',
        id: 4,
        topSplit: true,
      }],
    };
  },
});
</script>
<style scoped>
.t-button {
  margin-right: 20px;
}
</style>
