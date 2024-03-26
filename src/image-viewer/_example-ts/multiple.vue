<template>
  <div>
    <t-image-viewer :key="img1" v-model:visible="visible" :default-index="0" :images="images">
      <template #trigger>
        <div class="tdesign-demo-image-viewer__ui-image tdesign-demo-image-viewer__base">
          <img alt="test" :src="img1" class="tdesign-demo-image-viewer__ui-image--img" />
          <div class="tdesign-demo-image-viewer__ui-image--hover" @click="onOpen">
            <span><BrowseIcon size="1.4em" /> 预览</span>
          </div>
        </div>
      </template>
    </t-image-viewer>
    <t-image-viewer :key="1" v-model:visible="visible2" :default-index="1" :images="images">
      <template #trigger>
        <div class="tdesign-demo-image-viewer__ui-image tdesign-demo-image-viewer__base">
          <img alt="test" :src="img2" class="tdesign-demo-image-viewer__ui-image--img" />
          <div class="tdesign-demo-image-viewer__ui-image--hover" @click="onOpen2">
            <span><BrowseIcon size="1.4em" /> 预览</span>
          </div>
        </div>
      </template>
    </t-image-viewer>
    <t-image-viewer :key="2" v-model:visible="visible3" :default-index="2" :images="images">
      <template #trigger>
        <div class="tdesign-demo-image-viewer__ui-image tdesign-demo-image-viewer__base">
          <img alt="test" :src="img3" class="tdesign-demo-image-viewer__ui-image--img" />
          <div class="tdesign-demo-image-viewer__ui-image--hover" @click="onOpen3">
            <span><BrowseIcon size="1.4em" /> 预览</span>
          </div>
        </div>
      </template>
    </t-image-viewer>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ImageViewerProps } from 'tdesign-vue-next';
import { BrowseIcon } from 'tdesign-icons-vue-next';
const visible = ref(false);
const visible2 = ref(false);
const visible3 = ref(false);
const onOpen = () => (visible.value = true);
const onOpen2 = () => (visible2.value = true);
const onOpen3 = () => (visible3.value = true);
const img3 = 'https://tdesign.gtimg.com/demo/demo-image-3.png';
const img2 = 'https://tdesign.gtimg.com/demo/demo-image-2.png';
const img1 = 'https://tdesign.gtimg.com/demo/demo-image-1.png';
const images: ImageViewerProps['images'] = [img1, img2, img3];
</script>
<style scoped>
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

.tdesign-demo-image-viewer__base {
  width: 160px;
  height: 160px;
  margin: 10px;
  border: 4px solid var(--td-bg-color-secondarycontainer);
  border-radius: var(--td-radius-medium);
}
</style>
