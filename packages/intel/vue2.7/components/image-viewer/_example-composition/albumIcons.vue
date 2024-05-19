<template>
  <div class="tdesign-demo-image-viewer__base">
    <t-image-viewer v-model="visible" :title="title" :images="images" :index="index" @index-change="onIndexChange">
      <template #trigger>
        <div class="tdesign-demo-image-viewer__ui-image">
          <img alt="test" :src="img1" class="tdesign-demo-image-viewer__ui-image--img" />
          <div class="tdesign-demo-image-viewer__ui-image--hover" @click="onOpen">
            <span> <browse-icon size="1.4em" /> 预览 </span>
          </div>
          <div class="tdesign-demo-image-viewer__ui-image--footer">
            <span class="tdesign-demo-image-viewer__ui-image--title">{{ title }}</span>
            <span class="tdesign-demo-image-viewer__ui-image--icons">
              <browse-icon @click="onOpen" />
              <t-popup
                trigger="hover"
                placement="right-bottom"
                :overlay-style="{ width: '140px', padding: '6px' }"
                destroy-on-close
                :zIndex="1000"
              >
                <template #content>
                  <ul class="tdesign-demo-select__list">
                    <li
                      v-for="(image, i) in images"
                      :key="i"
                      class="tdesign-demo-selectdesign-demo-option"
                      @click="onOpen(i)"
                    >
                      <span>图片{{ i + 1 }}</span>
                    </li>
                  </ul>
                </template>
                <ellipsis-icon class="tdesign-demo-image-viewer__ui-image--ellipsis" />
              </t-popup>
            </span>
          </div>
        </div>
      </template>
    </t-image-viewer>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BrowseIcon, EllipsisIcon } from 'tdesign-icons-vue';

const IMAGE3 = 'https://tdesign.gtimg.com/demo/demo-image-3.png';
const IMAGE2 = 'https://tdesign.gtimg.com/demo/demo-image-2.png';
const IMAGE1 = 'https://tdesign.gtimg.com/demo/demo-image-1.png';
const images = ref([IMAGE1, IMAGE2, IMAGE3]);
const index = ref(0);
const visible = ref(false);
const img1 = ref(IMAGE1);
const title = ref('相册封面标题');
const onIndexChange = (i) => {
  index.value = i;
};
const onOpen = (i) => {
  typeof i === 'number' && onIndexChange(i);
  visible.value = true;
};
</script>

<style scoped>
.tdesign-demo-image-viewer__ui-image {
  width: 240px;
  height: 240px;
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
  width: 240px;
  height: 240px;
  margin: 10px;
  border: 4px solid var(--td-bg-color-secondarycontainer);
  border-radius: var(--td-radius-medium);
}
</style>
