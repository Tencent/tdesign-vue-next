<template>
  <div>
    <t-image-viewer v-for="(img, index) in images" :key="img" :default-index="index" :images="images" :z-index="10000">
      <template #trigger="{ open }">
        <div class="tdesign-demo-image-viewer__ui-image tdesign-demo-image-viewer__base">
          <img alt="test" :src="img" class="tdesign-demo-image-viewer__ui-image--img" />
          <div class="tdesign-demo-image-viewer__ui-image--hover" @click="open(index)">
            <span><BrowseIcon size="1.4em" /> 预览</span>
          </div>
        </div>
      </template>
    </t-image-viewer>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BrowseIcon } from 'tdesign-icons-vue-next';

const img3 = 'https://tdesign.gtimg.com/demo/demo-image-3.png';
const img2 = 'https://tdesign.gtimg.com/demo/demo-image-2.png';
const img1 = 'https://tdesign.gtimg.com/demo/demo-image-1.png';

const images = ref([img1, img2, img3]);
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
