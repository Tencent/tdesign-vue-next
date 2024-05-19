<!-- 该脚本为自动生成，如有需要请在 /script/generate-usage.js 中调整 -->
<script setup lang="jsx">
import { onMounted, ref } from 'vue';
import configJson from './props.json';

const configList = ref(configJson);
const panelList = [{ label: 'swiper', value: 'swiper' }];

const usageCodeMap = {
  swiper:
    '\n        <div :style="{ width: \'500px\' }">\n          <t-swiper :duration="300" :interval="2000" v-bind="configProps">\n            <t-swiper-item>\n              <div :style="{ height: \'200px\', background: \'var(--td-success-color-7)\' }" />\n            </t-swiper-item>\n            <t-swiper-item>\n              <div :style="{ height: \'200px\', background: \'var(--td-warning-color-7)\' }" />\n            </t-swiper-item>\n            <t-swiper-item>\n              <div :style="{ height: \'200px\', background: \'var(--td-error-color-7)\' }" />\n            </t-swiper-item>\n          </t-swiper>\n        </div>\n      ',
};
const usageCode = ref(`<template>${usageCodeMap[panelList[0].value].trim()}</template>`);

function onPanelChange(panel) {
  usageCode.value = `<template>${usageCodeMap[panel].trim()}</template>`;
}
</script>

<template>
  <base-usage :code="usageCode" :config-list="configList" :panel-list="panelList" @panel-change="onPanelChange">
    <template #swiper="{ configProps }">
      <div :style="{ width: '500px' }">
        <t-swiper :duration="300" :interval="2000" v-bind="configProps">
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
