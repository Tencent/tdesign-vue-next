<template>
  <t-space direction="vertical" size="large">
    <t-tabs v-model="value">
      <t-tab-panel :value="1" label="选项卡1" :destroy-on-hide="false">
        <p style="padding: 25px">选项卡1的内容，使用 t-tab-panel 渲染</p>
      </t-tab-panel>
      <t-tab-panel :value="2" label="选项卡2" :destroy-on-hide="false">
        <template #panel>
          <p style="padding: 25px">选项卡2的内容，使用 t-tab-panel 渲染</p>
        </template>
      </t-tab-panel>
      <t-tab-panel :value="3" label="选项卡3" :panel="panelRender" />
    </t-tabs>

    <!-- 方式二：使用 list 定义 Tab -->
    <t-tabs v-model="tab" :list="tabList" />
  </t-space>
</template>

<script lang="tsx" setup>
import { ref } from 'vue';
import { TabsProps, TabPanelProps } from 'tdesign-vue-next';
const tabList: TabsProps['list'] = [
  {
    label: '选项卡一',
    value: 1,
    panel: () => <p style="padding: 25px">这是选项卡一的内容，使用 t-tabs 渲染</p>,
  },
  {
    label: '选项卡二',
    value: 2,
    panel: () => <p style="padding: 25px">这是选项卡二的内容，使用 t-tabs 渲染</p>,
  },
  {
    label: '选项卡三',
    value: 3,
    panel: () => <p style="padding: 25px">这是选项卡三的内容，使用 t-tabs 渲染</p>,
  },
];
const value = ref(1);
const tab = ref(1);
const panelRender: TabPanelProps['panel'] = () => {
  return <p style="padding: 25px;">选项卡3的内容，使用 t-tab-panel 渲染</p>;
};
</script>
