<template>
  <t-config-provider :global-config="globalConfig">
    <div class="tdesign-demo-item--locale-provider-base">
      <t-pagination v-model="current" :total="36" show-jumper :max-page-btn="5" />
    </div>
  </t-config-provider>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { GlobalConfigProvider } from 'tdesign-vue-next';
const current = ref(1);
const globalConfig: GlobalConfigProvider = {
  pagination: {
    itemsPerPage: '{size} / page',
    jumpTo: 'jump to',
    page: '',
    total: 'Total {count} items',
  },
};
</script>
