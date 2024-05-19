<template>
  <div class="tdesign-demo-image-viewer-wrapper">
    <div v-for="(image, index) in images" :key="index">
      <div
        v-if="isError[index]"
        class="tdesign-demo-image-viewer__error tdesign-demo-image-viewer__ui-image tdesign-demo-image-viewer__base"
      >
        <div class="tdesign-demo-image-viewer__error-content">
          <image-error-icon name="image-error" size="2em" />
          <div>图片无法显示</div>
        </div>
      </div>
      <t-image-viewer v-else :visible="visible[index]" :images="images" :default-index="index" @close="onClose(index)">
        <template #trigger>
          <div class="tdesign-demo-image-viewer__ui-image tdesign-demo-image-viewer__base">
            <img alt="test" :src="image" class="tdesign-demo-image-viewer__ui-image--img" @error="onError(index)" />
            <div class="tdesign-demo-image-viewer__ui-image--hover" @click="onOpen(index)">
              <span><browse-icon size="1.4em" /> 预览</span>
            </div>
          </div>
        </template>
      </t-image-viewer>
    </div>
  </div>
</template>

<script>
import { BrowseIcon, ImageErrorIcon } from 'tdesign-icons-vue';

const img = 'https://tdesign.gtimg.com/demo/demo-image-1.png';

const images = [
  img,
  'https://tdesign.gtimg.com/demo/demo-image-error1.png',
  'https://tdesign.gtimg.com/demo/demo-image-error2.png',
  'https://tdesign.gtimg.com/demo/demo-image-error3.png',
];

export default {
  components: {
    BrowseIcon,
    ImageErrorIcon,
  },
  data() {
    return {
      images,
      visible: [false, false, false, false],
      isError: [false, false, false, false],
    };
  },
  methods: {
    onOpen(index) {
      this.visible = this.visible.map((item, i) => {
        if (i === index) return true;
        return item;
      });
    },
    onClose(index) {
      this.visible = this.visible.map((item, i) => {
        if (i === index) return false;
        return item;
      });
    },
    onError(index) {
      this.isError[index] = true;
      this.isError = this.isError.map((item, i) => {
        if (i === index) {
          return true;
        }
        return item;
      });
    },
  },
};
</script>

<style scoped>
.tdesign-demo-image-viewer-wrapper {
  display: flex;
}
.tdesign-demo-image-viewer__ui-image {
  width: 100%;
  height: 100%;
  display: inline-flex;
  position: relative;
  justify-content: center;
  align-items: center;
  border-radius: var(--td-radius-small);
  overflow: hidden;
}

.tdesign-demo-image-viewer__ui-image--hover {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.6);
  color: var(--td-text-color-anti);
  line-height: 22px;
  transition: 0.2s;
}

.tdesign-demo-image-viewer__ui-image:hover .tdesign-demo-image-viewer__ui-image--hover {
  opacity: 1;
  cursor: pointer;
}

.tdesign-demo-image-viewer__ui-image--img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  cursor: pointer;
  position: absolute;
}

.tdesign-demo-image-viewer__ui-image--footer {
  padding: 0 16px;
  height: 56px;
  width: 100%;
  line-height: 56px;
  font-size: 16px;
  position: absolute;
  bottom: 0;
  color: var(--td-text-color-anti);
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 100%);
  display: flex;
  box-sizing: border-box;
}

.tdesign-demo-image-viewer__ui-image--title {
  flex: 1;
}

.tdesign-demo-popup__reference {
  margin-left: 16px;
}

.tdesign-demo-image-viewer__ui-image--icons .tdesign-demo-icon {
  cursor: pointer;
}

.tdesign-demo-image-viewer__error {
  background-color: var(--td-bg-color-component-disabled);
  border-radius: 4px;
  color: var(--td-text-color-disabled);
  cursor: inherit;
}

.tdesign-demo-image-viewer__error-content {
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  font-size: 14px;
}

.tdesign-demo-image-viewer__base {
  width: 160px;
  height: 160px;
  margin: 10px;
  border: 4px solid var(--td-bg-color-secondarycontainer);
  border-radius: var(--td-radius-medium);
}
</style>
