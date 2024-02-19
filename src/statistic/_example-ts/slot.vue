<template>
  <t-space :size="32">
    <t-statistic title="Total Assets" :value="56.32" unit="%">
      <template #prefix>
        <ControlPlatformIcon />
      </template>
    </t-statistic>
    <t-statistic title="Total Assets" :value="176059" prefix="$" unit="%" trend="increase" />

    <t-statistic title="Total Assets" :value="62.58" unit="%">
      <template #suffix>
        <ArrowTriangleDownFilledIcon style="color: #ee4d38" />
      </template>
    </t-statistic>
  </t-space>
</template>
<script lang="ts" setup>
import { ControlPlatformIcon, ArrowTriangleDownFilledIcon } from 'tdesign-icons-vue-next';
</script>
