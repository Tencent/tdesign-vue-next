<template>
  <t-config-provider :globalConfig="globalConfig" style="padding: 16px">
    <t-pagination v-model="current" :total="36" show-jumper :maxPageBtn="5" />
  </t-config-provider>
</template>

<script>
import { merge } from 'lodash-es'
import enConfig from 'tdesign-vue/es/locale/en_US';

export default {
  data() {
    return {
      current: 1,
      // 全局特性配置，可以引入英文默认配置 enConfig，还可以在默认配置的基础上进行自定义配置
      globalConfig: merge(enConfig, {
        pagination: {
          itemsPerPage: '{size} / page',
          jumpTo: 'jump to',
          page: '',
          total: 'Total {total} items',
        },
      }),
    };
  },
};
</script>

<style scoped>
.tdesign-demo-item--locale-provider-base {
  margin: 24px -120px 0 0;
}
</style>
