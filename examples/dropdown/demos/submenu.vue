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
        text: '选项二选项二选项二选项二',
        id: 2,
        children: [
          {
            text: '选项五',
            id: 5,
            children: [
              {
                text: '选项七',
                id: 7,

              }, {
                text: '选项八',
                id: 8,
              },
            ],
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
