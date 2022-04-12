<template>
  <td-doc-usage ref="usageRef" :code="usageCode">
    <slot :configProps="{ ...defaultProps, ...changedProps }" />
  </td-doc-usage>
</template>

<script setup lang="jsx">
import { ref, compile, onMounted, computed } from 'vue';

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
});

const usageRef = ref();

onMounted(() => {
  usageRef.value.configList = props.configList;
  usageRef.value.addEventListener('ConfigChange', onConfigChange);
});

const emit = defineEmits(['ConfigChange']);

function onConfigChange(e) {
  const { name, value } = e.detail;
  changedProps.value[name] = value; // 改变
}

const defaultProps = ref(
  props.configList.reduce((prev, curr) => {
    if (curr.defaultValue !== undefined) Object.assign(prev, { [curr.name]: curr.defaultValue });
    return prev;
  }, {}),
);

const changedProps = ref({});

const usageCode = computed(() => {
  const propsStrs = Object.keys(changedProps.value)
    .map((name) => `${stringifyProp(name, changedProps.value[name])}`)
    .filter(Boolean);
  const tureCode = props.code.replace(/\s*v-bind="configProps"/g, () =>
    propsStrs.length ? `\n  ${propsStrs.join('\n  ')}` : '',
  );
  return tureCode;
});
</script>
