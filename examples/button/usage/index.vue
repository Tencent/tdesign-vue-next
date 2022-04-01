<template>
  <base-usage :code="code" :config-list="configList" @ConfigChange="onConfigChange">
    <component :is="renderComp" v-bind="defaultProps" />
  </base-usage>
</template>

<script setup lang="jsx">
import { defineComponent, compile, ref, watchEffect, computed } from 'vue/dist/vue.esm-bundler.js';

const configList = [
  { name: 'disabled', defaultValue: false, type: 'boolean' },
  {
    name: 'select',
    type: 'enum',
    defaultValue: 'value1',
    options: [
      { label: 'value1', value: 'value1' },
      { label: 'value 1', value: 'value 1' },
    ],
  },
];

const defaultProps = ref({}); // 这里放组件渲染默认 mock 数据
const renderCode = ref('<t-button>这里是组件渲染部分</t-button>'); // 渲染组件用的代码
const code = ref('<t-button>这里是组件渲染部分</t-button>'); // 复制的代码 defaultProps + configProps

const renderComp = computed(() => {
  return renderCode.value ? compile(renderCode.value) : null;
});

function onConfigChange(e) {
  // eslint-disable-next-line
  console.log('e', e);
}
</script>
