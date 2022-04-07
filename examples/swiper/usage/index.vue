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
const renderCode = `<div :style="{{ width: 500 }}">
            <t-swiper duration="300" interval="2000" __pointerProps__>
              <t-swiper-item>
                <div :style="{{ height: 200, background: 'var(--td-success-color-7)' }}"></div>
              </t-swiper-item>
              <t-swiper-item>
                <div :style="{{ height: 200, background: 'var(--td-warning-color-7)' }}"></div>
              </t-swiper-item>
              <t-swiper-item>
                <div :style="{{ height: 200, background: 'var(--td-error-color-7)' }}"></div>
              </t-swiper-item>
            </t-swiper>
          </div>`;

const renderComp = (data) => {
  return data?.usageCode ? compile(data.usageCode) : null;
};
</script>
