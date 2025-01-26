<template>
  <t-space direction="vertical" size="large">
    <t-tabs v-model="value">
      <t-tab-panel :value="1" label="选项卡1" :destroy-on-hide="true" :lazy="true">
        <p style="padding: 25px">选项卡1的内容，隐藏会销毁</p>
      </t-tab-panel>
      <t-tab-panel :value="2" label="选项卡2" :destroy-on-hide="false" :lazy="true">
        <template #panel>
          <p style="padding: 25px">选项卡2的内容，隐藏不会销毁</p>
        </template>
      </t-tab-panel>
      <t-tab-panel :value="3" label="选项卡3" :panel="panelRender" :destroy-on-hide="true" :lazy="true" />
    </t-tabs>
  </t-space>
</template>

<script lang="tsx" setup>
import { ref } from 'vue';
import { TabPanelProps } from 'tdesign-vue-next';
const value = ref(1);
const panelRender: TabPanelProps['panel'] = () => {
  return <p style="padding: 25px;">选项卡3的内容，隐藏会销毁</p>;
};
</script>
