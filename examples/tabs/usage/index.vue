<!-- 该脚本为自动生成，如有需要请在 /script/generate-usage/index.js 中调整 -->
<template>
  <base-usage :code="renderCode" :config-list="configList">
    <template #default="data">
      <component :is="renderComp(data)" />
    </template>
  </base-usage>
</template>

<script setup lang="jsx">
/* eslint-disable */
import { compile } from 'vue/dist/vue.esm-bundler.js';

import configList from './props.json';
const renderCode = `
          <div :style="{{ padding: 24, background: 'var(--bg-color-page)', borderRadius: 3 }}">
            <t-tabs defaultValue="1" __pointerProps__>
              <t-tabs-panel value="1" label="选项卡1">
                <div :style="{{ margin: '20px' }}">
                  选项卡1内容区
                </div>
              </t-tabs-panel>
              <t-tabs-panel value="2" label="选项卡2">
                <div :style="{{ margin: '20px' }}">
                  选项卡2内容区
                </div>
              </t-tabs-panel>
              <t-tabs-panel value="3" label="选项卡3">
                <div :style="{{ margin: '20px' }}">
                  选项卡3内容区
                </div>
              </t-tabs-panel>
            </t-tabs>
          </div>
        `;

const renderComp = (data) => {
  return data?.usageCode ? compile(data.usageCode) : null;
};
</script>
