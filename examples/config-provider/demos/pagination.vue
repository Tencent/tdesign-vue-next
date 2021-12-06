<template>
  <t-config-provider :global-config="globalConfig" style="padding: 16px">
    <t-pagination v-model="current" :total="36" show-jumper :max-page-btn="5" />
  </t-config-provider>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {
      current: 12,
      globalConfig: {
        pagination: {
          itemsPerPage: '{size} / page',
          jumpTo: 'jump to',
          page: '',
          total: 'Total {total} items',
        },
      },
    };
  },
});
</script>

<style scoped>
.tdesign-demo-item--locale-provider-base {
  margin: 24px -120px 0 0;
}
</style>
