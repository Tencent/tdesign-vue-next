<template>
  <div>
    <t-space :size="24" direction="vertical">
      <div>
        <h3 :style="{ 'margin-bottom': '15px' }">加载中的图片</h3>
        <t-space>
          <t-space direction="vertical">
            <span>默认占位</span>
            <t-image
              src="https://tdesign.gtimg.com/demo/demo-image-1.png"
              :key="loadingCount"
              :style="{ width: '284px', height: '160px' }"
            />
            <t-button variant="outline" @click="loadingCount = loadingCount + 3">
              <template #icon><refresh-icon /></template>
              重演 loading
            </t-button>
          </t-space>

          <t-space direction="vertical">
            <span>自定义占位</span>
            <t-image
              :key="loadingCount"
              src="https://tdesign.gtimg.com/demo/demo-image-1.png"
              :style="{ width: '284px', height: '160px' }"
            >
              <template #loading>
                <qrcode-icon />
              </template>
            </t-image>
          </t-space>
        </t-space>
      </div>
      <div>
        <h3 :style="{ 'margin-bottom': '15px' }">加载失败的图片</h3>
        <t-space>
          <t-space direction="vertical">
            <span>默认错误</span>
            <t-image src="" :key="errorCount" :style="{ width: '284px', height: '160px' }" />

            <t-button variant="outline" @click="errorCount = errorCount + 3">
              <template #icon><refresh-icon /></template>
              重演 error
            </t-button>
          </t-space>

          <t-space direction="vertical">
            <span>自定义错误</span>
            <t-image
              src=""
              :key="errorCount"
              :style="{ width: '284px', height: '160px' }"
              :error="renderErrorContent"
            />
          </t-space>
        </t-space>
      </div>
    </t-space>
  </div>
</template>

<script setup lang="jsx">
import { ref } from 'vue';
import { RefreshIcon, ImageErrorIcon, QrcodeIcon } from 'tdesign-icons-vue';

const loadingCount = ref(0);
const errorCount = ref(0);
const renderErrorContent = () => <ImageErrorIcon size="24" />;
</script>
