<template>
  <td-doc-usage ref="usageRef" :code="usageCode">
    <div
      v-for="item in panelList"
      :slot="item.value"
      :key="item.value"
      :style="{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }"
    >
      <slot :name="item.value" :config-props="{ ...defaultProps, ...changedProps }"></slot>
    </div>
  </td-doc-usage>
</template>

<script setup lang="jsx">
import { ref, compile, onMounted, computed, onBeforeUnmount, watchEffect } from 'vue';

const stringifyProp = (name, value) => {
  if (value === true) return name; // 为 true 只展示 name
  if (value === defaultProps.value[name]) return ''; // 为默认值不展示
  if (value === undefined) return ''; // 为 undefined 不展示
  if (typeof value === 'string') return `${name}="${value}"`;
  return `:${name}="${value}"`;
};

const props = defineProps({
  code: String,
  configList: Array,
  panelList: Array,
});

const panel = ref(props.panelList[0].value);
const usageRef = ref({});
const changedProps = ref({});

onMounted(() => {
  usageRef.value.panelList = props.panelList;
  usageRef.value.addEventListener('ConfigChange', onConfigChange);
  usageRef.value.addEventListener('PanelChange', onPanelChange);
});

watchEffect(() => {
  usageRef.value.configList = props.configList.filter((config) => config.name !== 'visible');
});

onBeforeUnmount(() => {
  usageRef.value.removeEventListener('ConfigChange', onConfigChange);
  usageRef.value.removeEventListener('PanelChange', onPanelChange);
});

const emit = defineEmits(['ConfigChange', 'PanelChange']);

function onConfigChange(e) {
  const { name, value } = e.detail;
  changedProps.value[name] = value; // 改变
}

function onPanelChange(e) {
  const { value } = e.detail;
  panel.value = value;
  emit('PanelChange', panel.value);
}

const defaultProps = ref(
  props.configList.reduce((prev, curr) => {
    if (curr.defaultValue !== undefined) Object.assign(prev, { [curr.name]: curr.defaultValue });
    return prev;
  }, {}),
);

function formatCode(code) {
  const stack = [];
  let indent = '';
  let result = code.replace(/(\<\/?[^>]+>)|([^<>]+)|\n+/g, (match, p1, p2, offset) => {
    if (match === '\n') {
      return '';
    }
    let addNewLine = '\n';
    if (p1) {
      if (p1.startsWith('</')) {
        stack.pop();
        indent = '  '.repeat(stack.length);
      }
      if (offset > 0 && code[offset - 1] !== '\n' && !p1.startsWith('</')) {
        addNewLine = '\n';
      }
      if (!p1.startsWith('</')) {
        indent = '  '.repeat(stack.length);
        if (!p1.endsWith('/>')) {
          stack.push(p1);
        }
      }
      return `${addNewLine}${indent}${p1}`;
    } else if (p2) {
      return p2.trim();
    }
  });
  return result.replace(/\n{2,}/g, '\n').trim();
}

const usageCode = computed(() => {
  const propsStr = Object.keys(changedProps.value)
    .map((name) => `${stringifyProp(name, changedProps.value[name])}`)
    .filter(Boolean);
  const trueCode = props.code.replace(/\s*v-bind="configProps"/g, () =>
    propsStr.length ? `\n  ${propsStr.join('\n  ')}` : '',
  );
  return formatCode(trueCode);
});
</script>
