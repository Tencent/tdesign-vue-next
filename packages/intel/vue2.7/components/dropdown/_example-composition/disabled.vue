<template>
  <div class="tdesign-demo-dropdown">
    <t-dropdown :options="options">
      <t-button variant="text">
        <span class="tdesign-demo-dropdown__text">
          下拉菜单
          <chevron-down-icon size="16" slot="suffix" />
        </span>
      </t-button>
    </t-dropdown>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { ChevronDownIcon } from 'tdesign-icons-vue';

const options = ref([
  {
    content: '操作一',
    value: 1,
  },
  {
    content: '操作二',
    value: 2,
  },
  {
    content: '操作三',
    value: 3,
    disabled: true,
  },
  {
    content: '操作四',
    value: 4,
    disabled: true,
  },
]);
</script>
