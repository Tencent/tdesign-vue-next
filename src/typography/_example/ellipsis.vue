<template>
  <div style="width: 100%">
    <t-typography-paragraph ellipsis>{{ content }}</t-typography-paragraph>
    <t-typography-paragraph :ellipsis="ellipsisState1">{{ content }}</t-typography-paragraph>
    <t-typography-paragraph :ellipsis="ellipsisState2" style="width: 200px">{{ content }}</t-typography-paragraph>
    <t-typography-paragraph :ellipsis="ellipsisState3">{{ content }}</t-typography-paragraph>
  </div>
</template>

<script setup lang="tsx">
import { ChevronDownIcon } from 'tdesign-icons-vue-next';
const content = `TDesign was founded with the principles of open-source collaboration from the beginning. The collaboration scheme discussion, component design, and API design, including source code, are fully open within the company, garnering widespread attention from internal developers and designers. TDesign follows an equal, open, and strict policy, regardless of the participants' roles.`;
const ellipsisState1 = {
  row: 2,
  expandable: true,
  collapsible: true,
};

const ellipsisState2 = {
  row: 1,
  tooltipProps: {
    content: 'long long long text',
    showArrow: false,
  },
};

const ellipsisState3 = {
  row: 1,
  suffix: <ChevronDownIcon />,
  expandable: true,
  collapsible: false,
};
</script>
