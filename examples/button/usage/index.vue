<template>
  <td-doc-usage ref="usageRef" :code="code" @ConfigChange="onConfigChange">
    <component :is="renderComp" v-bind="defaultProps" />
  </td-doc-usage>
</template>

<script setup lang="jsx">
import { defineComponent, compile, ref, onMounted } from 'vue/dist/vue.esm-bundler.js';

const usageRef = ref();
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
const renderComp = ref(null); // 组件实例
const defaultProps = ref({}); // 这里放组件渲染默认 mock 数据
const configProps = ref({}); // 这里放动态配置的 props
const renderCode = ref('<div>这里是组件渲染部分</div>'); // 渲染组件用的代码
const code = ref('<div>这里是组件渲染部分</div>'); // 复制的代码 defaultProps + configProps

onMounted(() => {
  usageRef.value.configList = configList;
  renderComp.value = compile(renderCode.value);
});

function onConfigChange(e) {
  // eslint-disable-next-line
  console.log('e', e);
}
</script>
