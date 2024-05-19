<template>
  <t-space direction="vertical" :style="{ width: '100%' }">
    <t-space breakLine>
      <t-space direction="vertical" align="start">
        <t-image
          src="https://tdesign.gtimg.com/demo/demo-image-1.png"
          fit="cover"
          position="center"
          :style="{ width: '120px', height: '120px' }"
        />
        <span>cover center</span>
      </t-space>
      <t-space direction="vertical" align="start">
        <t-image
          src="https://tdesign.gtimg.com/demo/demo-image-1.png"
          fit="cover"
          :style="{ width: '120px', height: '120px' }"
          position="left"
        />
        <span>cover left</span>
      </t-space>
      <t-space direction="vertical" align="start">
        <t-image
          src="https://tdesign.gtimg.com/demo/demo-image-1.png"
          fit="cover"
          :style="{ width: '120px', height: '120px' }"
          position="right"
        />
        <span>cover right</span>
      </t-space>
    </t-space>
    <t-space :style="{ marginTop: 20 }" breakLine>
      <t-space direction="vertical" align="start">
        <t-image
          src="https://tdesign.gtimg.com/demo/demo-image-1.png"
          fit="cover"
          :style="{ width: '280px', height: '120px' }"
          position="top"
        />
        <span>cover top</span>
      </t-space>
      <t-space direction="vertical" align="start">
        <t-image
          src="https://tdesign.gtimg.com/demo/demo-image-1.png"
          fit="cover"
          :style="{ width: '280px', height: '120px' }"
          position="bottom"
        />
        <span>cover bottom</span>
      </t-space>
    </t-space>
    <t-space :style="{ marginTop: 20 }" breakLine>
      <t-space direction="vertical" align="start">
        <t-image
          src="https://tdesign.gtimg.com/demo/demo-image-1.png"
          fit="contain"
          :style="{ width: '120px', height: '200px' }"
          position="top"
        />
        <span>contain top</span>
      </t-space>
      <t-space direction="vertical" align="start">
        <t-image
          src="https://tdesign.gtimg.com/demo/demo-image-1.png"
          fit="contain"
          :style="{ width: '120px', height: '200px' }"
          position="bottom"
        />
        <span>contain bottom</span>
      </t-space>
      <t-space direction="vertical" align="start">
        <t-image
          src="https://tdesign.gtimg.com/demo/demo-image-1.png"
          fit="contain"
          :style="{ width: '120px', height: '200px' }"
          position="center"
        />
        <span>contain center</span>
      </t-space>
      <t-space :style="{ marginTop: 20 }" breakLine>
        <t-space direction="vertical" align="start">
          <t-image
            src="https://tdesign.gtimg.com/demo/demo-image-1.png"
            fit="contain"
            :style="{ width: '280px', height: '120px' }"
            position="left"
          />
          <span>contain left</span>
        </t-space>
        <t-space direction="vertical" align="start">
          <t-image
            src="https://tdesign.gtimg.com/demo/demo-image-1.png"
            fit="contain"
            :style="{ width: '280px', height: '120px' }"
            position="right"
          />
          <span>contain right</span>
        </t-space>
      </t-space>
    </t-space>
  </t-space>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {};
  },
});
</script>
