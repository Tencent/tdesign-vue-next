<template>
  <t-space direction="vertical" :key="loadingCount">
    <t-space :breakLine="true" :style="{ height: '240px', 'overflow-y': 'scroll' }">
      <t-image
        v-for="item in list"
        :key="item"
        src="https://tdesign.gtimg.com/demo/demo-image-1.png"
        :style="{ width: '230px', height: '120px' }"
        :lazy="true"
      />
    </t-space>
    <t-button variant="outline" :icon="renderRefreshIcon" @click="loadingCount = loadingCount + 1">
      重演 lazy load
    </t-button>
  </t-space>
</template>

<script lang="jsx">
import Vue from 'vue';
import { RefreshIcon } from 'tdesign-icons-vue';

export default Vue.extend({
  data() {
    return {
      loadingCount: 0,
      list: Array.from({ length: 24 }).map((_, index) => index),
    };
  },
  methods: {
    renderRefreshIcon() {
      return <RefreshIcon />;
    },
  },
});
</script>
