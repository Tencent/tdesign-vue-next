<template>
  <t-space direction="vertical">
    <t-space align="center">
      <h3>时间轴样式</h3>
      <t-radio-group v-model="dot" variant="default-filled">
        <t-radio-button value="default">默认样式</t-radio-button>
        <t-radio-button value="dot">点状样式</t-radio-button>
      </t-radio-group>
    </t-space>
    <t-timeline mode="same" :theme="dot">
      <t-timeline-item
        v-for="(item, index) in options"
        :key="index"
        :label="item.label"
        :dot="item.dot"
        dot-color="primary"
      >
        {{ item.content }}
      </t-timeline-item>
    </t-timeline>
  </t-space>
</template>
<script lang="tsx" setup>
import { ref } from 'vue';
import { TimelineProps } from 'tdesign-vue-next';
import { TipsIcon, UserIcon, HeartIcon, HomeIcon } from 'tdesign-icons-vue-next';
const color = 'var(--td-brand-color)';
const dot = ref<TimelineProps['theme']>('default');
const options = [
  {
    label: '2022-01-01',
    content: '事件一',
    dot: () => <TipsIcon size="medium" color={color} />,
  },
  {
    label: '2022-02-01',
    content: '事件二',
    dot: () => <UserIcon size="medium" color={color} />,
  },
  {
    label: '2022-03-01',
    content: '事件三',
    dot: () => <HeartIcon size="medium" color={color} />,
  },
  {
    label: '2022-04-01',
    content: '事件四',
    dot: () => <HomeIcon size="medium" color={color} />,
  },
];
</script>
