<template>
  <div>
    <t-dropdown :options="options" placement="top-left" trigger="click" :hideAfterItemClick="false" >
      <t-button>click我试试</t-button>
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
        children: [
          {
            text: '选项五',
            id: 5,
          }, {
            text: '选项六',
            id: 6,
          },
        ],
      }, {
        text: '选项三',
        id: 3,
      }, {
        text: '选项四',
        id: 4,
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
