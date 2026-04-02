<template>
  <t-space :key="loadingCount" direction="vertical">
    <t-space :break-line="true" :style="{ height: '240px', 'overflow-y': 'scroll' }">
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

<script lang="tsx" setup>
import { ref } from 'vue';
import { ButtonProps } from 'tdesign-vue-next';
import { RefreshIcon } from 'tdesign-icons-vue-next';
const loadingCount = ref(0);
const list = ref(
  Array.from({
    length: 24,
  }).map((_, index) => index),
);
const renderRefreshIcon: ButtonProps['icon'] = () => {
  return <RefreshIcon />;
};
</script>
