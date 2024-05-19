<template>
  <t-space direction="vertical" :size="50">
    <t-space :size="180">
      <t-popconfirm v-model="visible1" content="普通事件通知类型偏向于确认">
        <t-button>默认</t-button>
      </t-popconfirm>

      <t-popconfirm v-model="visible2" theme="warning" content="事件通知类型偏向于提示">
        <t-button theme="warning">警告</t-button>
      </t-popconfirm>

      <t-popconfirm v-model="visible3" theme="danger" content="事件通知类型偏向于高危提醒">
        <t-button theme="danger">危险</t-button>
      </t-popconfirm>
    </t-space>

    <t-space :size="80">
      <t-popconfirm content="基础气泡确认框文案示意文字按钮" :popup-props="{ placement: 'bottom' }">
        <template #icon>
          <t-icon name="browse" style="color: #0052d9" />
        </template>
        <t-button variant="outline">自定义图标（插槽）</t-button>
      </t-popconfirm>

      <t-popconfirm content="基础气泡确认框文案示意文字按钮" :icon="customIcon" :popup-props="{ placement: 'bottom' }">
        <t-button variant="outline">自定义图标（属性）</t-button>
      </t-popconfirm>
    </t-space>
  </t-space>
</template>
<script lang="tsx" setup>
import { ref } from 'vue';
import { PopconfirmProps } from 'tdesign-vue-next';
import { BrowseIcon } from 'tdesign-icons-vue-next';
const visible1 = ref(false);
const visible2 = ref(false);
const visible3 = ref(false);
const customIcon: PopconfirmProps['icon'] = () => {
  return (
    <BrowseIcon
      style={{
        marginRight: 8,
        color: ' #0052d9',
      }}
    />
  );
};
</script>
