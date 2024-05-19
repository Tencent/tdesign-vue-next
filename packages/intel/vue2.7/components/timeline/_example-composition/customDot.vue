<template>
  <t-space direction="vertical">
    <t-space align="center">
      <label>时间轴样式</label>
      <t-radio-group default-value="default" @change="handleChange" variant="default-filled">
        <t-radio-button value="default">默认样式</t-radio-button>
        <t-radio-button value="dot">点状样式</t-radio-button>
      </t-radio-group>
    </t-space>
    <t-timeline mode="same" :theme="docStyle">
      <t-timeline-item label="2022-01-01"
      >事件一
        <tips-icon size="medium" :style="{ color: color }" slot="dot" />
      </t-timeline-item>
      <t-timeline-item label="2022-02-01"
      >事件二
        <user-icon size="medium" :style="{ color: color }" slot="dot" />
      </t-timeline-item>
      <t-timeline-item label="2022-03-01"
      >事件三
        <heart-icon size="medium" :style="{ color: color }" slot="dot" />
      </t-timeline-item>
      <t-timeline-item label="2022-04-01"
      >事件四
        <home-icon size="medium" :style="{ color: color }" slot="dot" />
      </t-timeline-item>
    </t-timeline>
  </t-space>
</template>
<script setup>
import { ref } from 'vue';
import {
  TipsIcon, UserIcon, HeartIcon, HomeIcon,
} from 'tdesign-icons-vue';

const docStyle = ref('default');
const color = ref('var(--td-brand-color)');
const handleChange = (checkedValue) => {
  docStyle.value = checkedValue;
};
</script>
