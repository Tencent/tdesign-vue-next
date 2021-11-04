<template>
  <div>
    <t-dropdown :options="options" placement="top-left" trigger="click" :hideAfterItemClick="false" >
      <t-button>click我试试</t-button>
    </t-dropdown>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

const options = [{
  content: '选项一',
  value: 1,
}, {
  content: '选项二',
  value: 2,
  children: [
    {
      content: '选项五',
      value: 5,
    }, {
      content: '选项六',
      value: 6,
    },
  ],
}, {
  content: '选项三',
  value: 3,
}, {
  content: '选项四',
  value: 4,
}]

export default defineComponent({
  setup() {
    return {
      options
    }
  }
});
</script>
<style scoped>
.t-button {
  margin-right: 20px;
}
</style>
