<template>
  <t-space direction="vertical">
    <t-image
      src="https://tdesign.gtimg.com/demo/demo-image-1.png"
      :style="{ width: '284px', height: '160px' }"
      :lazy="true"
      :placeholder="renderPlaceholder"
      :loading="renderLoading"
      :key="loadingCount"
    />
    <t-button variant="outline" :icon="renderRefreshIcon" @click="loadingCount = loadingCount + 1">
      重演 lazy load
    </t-button>
  </t-space>
</template>

<script lang="jsx">
import Vue from 'vue';
import { RefreshIcon } from 'tdesign-icons-vue';
import { Loading } from 'tdesign-vue';

export default Vue.extend({
  data() {
    return {
      loadingCount: 0,

      // renderPlaceholder 支持插槽
      // eslint-disable-next-line
      renderPlaceholder: (h) => (
        <img width="100%" height="100%" src="https://tdesign.gtimg.com/demo/demo-image-5.png" />
      ),

      // renderLoading 支持插槽
      // eslint-disable-next-line
      renderLoading: (h) => (
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
      ),
    };
  },
  methods: {
    renderRefreshIcon() {
      return <RefreshIcon />;
    },
  },
});
</script>
