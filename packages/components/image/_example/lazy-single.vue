<template>
  <t-space direction="vertical">
    <t-image
      :key="loadingCount"
      src="https://tdesign.gtimg.com/demo/demo-image-1.png"
      :style="{ width: '284px', height: '160px' }"
      :lazy="true"
      :placeholder="renderPlaceholder"
      :loading="renderLoading"
    />
    <t-button variant="outline" :icon="renderRefreshIcon" @click="loadingCount = loadingCount + 1">
      重演 lazy load
    </t-button>
  </t-space>
</template>

<script setup lang="jsx">
import { ref } from 'vue';
import { RefreshIcon } from 'tdesign-icons-vue-next';
import { Loading } from 'tdesign-vue-next';

const loadingCount = ref(0);
const renderPlaceholder = () => (
  <img width="100%" height="100%" src="https://tdesign.gtimg.com/demo/demo-image-5.png" />
);
const renderLoading = () => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      background: 'rgba(255,255,255,.4)',
      backdropFilter: 'blur(10px)',
    }}
  >
    <Loading
      delay={0}
      fullscreen={false}
      indicator
      inheritColor={false}
      loading
      preventScrollThrough
      showOverlay
      size="small"
    />
  </div>
);
const renderRefreshIcon = () => {
  return <RefreshIcon />;
};
</script>
