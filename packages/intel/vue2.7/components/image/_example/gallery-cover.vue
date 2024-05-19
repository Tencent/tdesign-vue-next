<template>
  <t-image
    src="https://tdesign.gtimg.com/demo/demo-image-1.png"
    :style="{ width: '284px', height: '160px' }"
    :gallery="true"
    :overlayContent="label"
  />
</template>

<script lang="jsx">
import Vue from 'vue';
import { Tag } from 'tdesign-vue';

export default Vue.extend({
  data() {
    return {
      // overlayContent 支持插槽
      // eslint-disable-next-line
      label: (h) => (
        <Tag
          shape="mark"
          theme="warning"
          style={{
            margin: '8px',
            borderRadius: '3px',
            background: 'rgba(236,242,254,1)',
            color: 'rgba(0,82,217,1)',
          }}
        >
          标签一
        </Tag>
      ),
    };
  },
  methods: {},
});
</script>
