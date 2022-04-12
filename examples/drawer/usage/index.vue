<!-- 该脚本为自动生成，如有需要请在 /script/generate-usage/index.js 中调整 -->
<template>
  <base-usage :code="usageCode" :config-list="configList">
    <template #default="{ configProps }">
      <div>
        <t-button @click="handleClick">Open Drawer</t-button>
        <t-drawer v-bind="configProps" v-model:visible="visible" header="header" :close-btn="true">
          <p>This is a Drawer</p>
        </t-drawer>
      </div>
    </template>
  </base-usage>
</template>

<script setup lang="jsx">
/* eslint-disable */
import { compile } from 'vue/dist/vue.esm-bundler.js';
import configList from './props.json';
import { ref } from 'vue';
const visible = ref(false);
const handleClick = () => {
  visible.value = true;
};

const usageCode = `<template>
  <div>
  <t-button @click="handleClick">Open Drawer</t-button>
  <t-drawer v-bind="configProps" v-model:visible="visible" header="header" :close-btn="true">
    <p>This is a Drawer</p>
  </t-drawer>
</div>
</template>
\<script\>
import { ref } from 'vue'; const visible = ref(false); const handleClick = () => { visible.value = true; };
\</script\>`;
</script>
