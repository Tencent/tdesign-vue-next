<template>
  <td-doc-usage ref="usageRef" :code="props.code">
    <slot />
  </td-doc-usage>
</template>

<script setup lang="jsx">
import { ref, onMounted } from 'vue';

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
  const changedPropsStr = `:${name}="${value}"`;

  emit('ConfigChange', e, changedPropsStr);
}
</script>
