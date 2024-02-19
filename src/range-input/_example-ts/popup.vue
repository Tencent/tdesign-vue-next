<template>
  <t-range-input-popup :panel="panel" />
</template>

<script lang="tsx" setup>
import { RangeInputPopupProps } from 'tdesign-vue-next';
const panel: RangeInputPopupProps['panel'] = () => <div>hello world</div>;
</script>
