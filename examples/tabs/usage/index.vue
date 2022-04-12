<!-- 该脚本为自动生成，如有需要请在 /script/generate-usage/index.js 中调整 -->
<template>
  <base-usage :code="usageCode" :config-list="configList">
    <template #default="{ configProps }">
      <div class="tdesign-demo-block-column-large">
        <t-tabs v-model="value" v-bind="configProps">
          <t-tab-panel :value="1" label="选项卡1">
            <p style="margin: 20px">选项卡1内容区</p>
          </t-tab-panel>
          <t-tab-panel :value="2" label="选项卡2">
            <p style="margin: 20px">选项卡2内容区</p>
          </t-tab-panel>
          <t-tab-panel :value="3" label="选项卡3">
            <p style="margin: 20px">选项卡3内容区</p>
          </t-tab-panel>
        </t-tabs>
      </div>
    </template>
  </base-usage>
</template>

<script setup lang="jsx">
/* eslint-disable */
import { compile } from 'vue/dist/vue.esm-bundler.js';
import configList from './props.json';

const usageCode = `<template>
  <div class="tdesign-demo-block-column-large">
    <t-tabs v-model="value" v-bind="configProps">
      <t-tab-panel :value="1" label="选项卡1">
        <p style="margin: 20px">选项卡1内容区</p>
      </t-tab-panel>
      <t-tab-panel :value="2" label="选项卡2">
        <p style="margin: 20px">选项卡2内容区</p>
      </t-tab-panel>
      <t-tab-panel :value="3" label="选项卡3">
        <p style="margin: 20px">选项卡3内容区</p>
      </t-tab-panel>
    </t-tabs>
  </div>
</template>
`;
</script>
