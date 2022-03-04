<template>
  <t-drawer
    v-model:visible="formVisible"
    placement="right"
    mode="overlay"
    size="60%"
    header=""
    :close-btn="true"
    show-in-attached-element
  >
  </t-drawer>
</template>

<script setup>
import { ref, watch } from 'vue';

// eslint-disable-next-line no-undef
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});
const formVisible = ref(false);

// eslint-disable-next-line no-undef
const emit = defineEmits(['update:visible']);
watch(
  () => formVisible.value,
  (val) => {
    emit('update:visible', val);
  },
);

watch(
  () => props.visible,
  (val) => {
    formVisible.value = val;
  },
);
</script>
