<template>
  <t-space :size="32">
    <t-space direction="vertical">
      <strong :style="{ fontSize: '20px' }">有遮罩</strong>
      <t-image :src="src" :style="{ width: '284px', height: '160px' }" :overlayContent="renderMask" />
    </t-space>
    <t-space direction="vertical">
      <strong :style="{ fontSize: '20px' }">无遮罩</strong>
      <t-image
        src="https://tdesign.gtimg.com/demo/demo-image-1.png"
        :style="{ width: '284px', height: '160px' }"
        :overlayContent="renderButton"
      />
    </t-space>
  </t-space>
</template>

<script lang="jsx">
import Vue from 'vue';
import { PrintIcon } from 'tdesign-icons-vue';
import { Tag } from 'tdesign-vue';

export default Vue.extend({
  data() {
    return {
      src: '',
      // renderMask 支持插槽
      // eslint-disable-next-line
      renderMask: (h) => (
        <div
          style={{
            background: 'rgba(0,0,0,.4)',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            lineHeight: '22px',
          }}
        >
          <Tag
            shape="mark"
            theme="warning"
            style={{
              borderRadius: '3px',
              background: 'transparent',
              color: '#fff',
            }}
          >
            <PrintIcon size="16" /> 高清
          </Tag>
        </div>
      ),
      // renderButton 支持插槽
      // eslint-disable-next-line
      renderButton: (h) => (
        <Tag
          shape="mark"
          theme="warning"
          style={{
            position: 'absolute',
            right: '8px',
            bottom: '8px',
            borderRadius: '3px',
            background: 'rgba(236,242,254,1)',
            color: 'rgba(0,82,217,1)',
          }}
        >
          <PrintIcon size="16" /> 高清
        </Tag>
      ),
    };
  },
  created() {
    const timer = setTimeout(() => {
      this.src = 'https://tdesign.gtimg.com/demo/demo-image-1.png';
      clearTimeout(timer);
    }, 100);
  },
  methods: {},
});
</script>
