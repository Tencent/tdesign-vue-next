<!-- 该脚本为自动生成，如有需要请在 /script/generate-usage/index.js 中调整 -->
<template>
  <base-usage :code="usageCode" :config-list="configList">
    <template #default="{ configProps }">
      <div :style="{ width: '500px' }">
        <t-swiper duration="300" interval="2000" v-bind="configProps">
          <t-swiper-item>
            <div :style="{ height: '200px', background: 'var(--td-success-color-7)' }" />
          </t-swiper-item>
          <t-swiper-item>
            <div :style="{ height: '200px', background: 'var(--td-warning-color-7)' }" />
          </t-swiper-item>
          <t-swiper-item>
            <div :style="{ height: '200px', background: 'var(--td-error-color-7)' }" />
          </t-swiper-item>
        </t-swiper>
      </div>
    </template>
  </base-usage>
</template>

<script setup lang="jsx">
/* eslint-disable */
import { compile } from 'vue/dist/vue.esm-bundler.js';
import configList from './props.json';

const usageCode = `<template>
  <div :style="{ width: '500px' }">
            <t-swiper duration="300" interval="2000" v-bind="configProps">
              <t-swiper-item>
                <div :style="{ height: '200px', background: 'var(--td-success-color-7)' }" />
              </t-swiper-item>
              <t-swiper-item>
                <div :style="{ height: '200px', background: 'var(--td-warning-color-7)' }" />
              </t-swiper-item>
              <t-swiper-item>
                <div :style="{ height: '200px', background: 'var(--td-error-color-7)' }" />
              </t-swiper-item>
            </t-swiper>
          </div>
</template>
`;
</script>
