<template>
  <td-doc-usage ref="usageRef" :code="usageCode">
    <div
      v-for="item in panelList"
      :slot="item.value"
      :key="item.value"
      :style="{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }"
    >
      <slot :name="item.value" :configProps="{ ...defaultProps, ...changedProps }"></slot>
    </div>
  </td-doc-usage>
</template>

<script setup lang="jsx">
import { ref, set, onMounted, computed, onBeforeUnmount, watchEffect } from "vue";

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

onBeforeUnmount(() => {
  usageRef.value.removeEventListener('ConfigChange', onConfigChange);
  usageRef.value.removeEventListener('PanelChange', onPanelChange);
});

const emit = defineEmits(['ConfigChange', 'PanelChange']);

function onConfigChange(e) {
  const { name, value } = e.detail;
  set(changedProps.value, name, value); // 改变
}

function onPanelChange(e) {
  const { value } = e.detail;
  panel.value = value;
  emit('PanelChange', panel.value);
}

const defaultProps = ref(
  props.configList.reduce((prev, curr) => {
    if (curr.name === 'visible') return prev;
    if (curr.defaultValue !== undefined) Object.assign(prev, { [curr.name]: curr.defaultValue });
    return prev;
  }, {}),
);

watchEffect(() => {
  usageRef.value.configList = props.configList.filter((config) => config.name !== 'visible');
});

const usageCode = computed(() => {
  const propsStrs = Object.keys(changedProps.value)
    .map((name) => `${stringifyProp(name, changedProps.value[name])}`)
    .filter(Boolean);
  const realCode = props.code.replace(/\s*v-bind="configProps"/g, () =>
    propsStrs.length ? `\n  ${propsStrs.join('\n  ')}` : '',
  );
  usageRef.value.code = realCode;
  return realCode;
});
</script>
